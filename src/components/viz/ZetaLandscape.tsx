import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useZeros } from '../../lib/data';
import { readVar } from './useCanvas';

/**
 * 제타 풍경: ζ(s)의 도메인 컬러링 (색 = 편각, 밝기 = 크기, 0은 검정·극은 흰색).
 * ζ값은 scripts/compute_zeta.py 가 미리 계산한 격자 텍스처(zeta_grid.bin)를 WebGL로 보간해 그린다.
 */

interface GridMeta {
  sigma: [number, number];
  t: [number, number];
  width: number;
  height: number;
  logRange: [number, number];
}

const VS = `attribute vec2 p; varying vec2 uv; void main(){ uv = p*0.5+0.5; gl_Position = vec4(p,0.,1.); }`;
const FS = `precision highp float;
varying vec2 uv;
uniform sampler2D grid;
uniform vec4 view;      // σmin, σmax, tmin, tmax
uniform vec4 gridRange; // σ0, σ1, t0, t1
uniform vec2 logRange;
uniform vec3 bg;
vec3 hsv2rgb(vec3 c){ vec3 p = abs(fract(c.xxx + vec3(0.,2./3.,1./3.))*6.-3.); return c.z*mix(vec3(1.), clamp(p-1.,0.,1.), c.y); }
void main(){
  float s = mix(view.x, view.y, uv.x);
  float t = mix(view.z, view.w, uv.y);
  float conj = t < 0. ? -1. : 1.;
  float at = abs(t);
  vec2 g = vec2((s-gridRange.x)/(gridRange.y-gridRange.x), (at-gridRange.z)/(gridRange.w-gridRange.z));
  if (g.x < 0. || g.x > 1. || g.y > 1.) { gl_FragColor = vec4(bg,1.); return; }
  vec4 c = texture2D(grid, g);
  float cs = c.r*2.-1.;
  float sn = (c.g*2.-1.)*conj;
  // 16비트 log|ζ| = 상위(B)·하위(A) 바이트. hi·256+lo 는 선형이라 채널별 보간 후 합쳐도 정확
  float lm = mix(logRange.x, logRange.y, (c.b*255.*256. + c.a*255.)/65535.);
  float hue = atan(sn, cs)/6.2831853 + 0.5;
    float light = 1./(1.+exp(-0.55*lm));              // 0 → 검정, 1 → 중간, ∞ → 흰색
  float band = 0.9 + 0.1*fract(lm/0.6931472);       // |ζ|가 2배 될 때마다 옅은 등고선
  float sat = 1.0 - smoothstep(0.75, 1.0, light);
  vec3 rgb = hsv2rgb(vec3(hue, sat*0.85, mix(0.0, 1.0, light)*band + light*0.15));
  gl_FragColor = vec4(rgb, 1.);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

const SIGMA: [number, number] = [-4.5, 5];
const SPAN_T = 13;

export default function ZetaLandscape() {
  const { t } = useTranslation();
  const glRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [tc, setTc] = useState(18); // 화면 중앙의 t
  const [strip, setStrip] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const { zeros } = useZeros();
  const state = useRef<{ gl: WebGLRenderingContext; prog: WebGLProgram; meta: GridMeta } | null>(null);
  const view: [number, number, number, number] = [SIGMA[0], SIGMA[1], tc - SPAN_T / 2, tc + SPAN_T / 2];

  // WebGL 초기화 + 텍스처 로드
  useEffect(() => {
    const cv = glRef.current!;
    const gl = cv.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) return setFailed(true);
    let alive = true;
    const base = import.meta.env.BASE_URL;
    Promise.all([fetch(`${base}data/zeta_grid.json`).then((r) => r.json()), fetch(`${base}data/zeta_grid.bin`).then((r) => r.arrayBuffer())])
      .then(([meta, buf]: [GridMeta, ArrayBuffer]) => {
        if (!alive) return;
        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VS));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(prog);
        gl.useProgram(prog);
        const vb = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vb);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, meta.width, meta.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(buf));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        state.current = { gl, prog, meta };
        setReady(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  // 그리기 (WebGL 본체 + 2D 오버레이)
  useEffect(() => {
    const draw = () => {
      const cv = glRef.current;
      const ov = overlayRef.current;
      if (!cv || !ov) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      for (const c of [cv, ov]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      const st = state.current;
      if (st) {
        const { gl, prog, meta } = st;
        gl.viewport(0, 0, cv.width, cv.height);
        const bgHex = readVar('--surface') || '#ffffff';
        const n = parseInt(bgHex.slice(1), 16);
        gl.uniform3f(gl.getUniformLocation(prog, 'bg'), ((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
        gl.uniform4f(gl.getUniformLocation(prog, 'view'), ...view);
        gl.uniform4f(gl.getUniformLocation(prog, 'gridRange'), meta.sigma[0], meta.sigma[1], meta.t[0], meta.t[1]);
        gl.uniform2f(gl.getUniformLocation(prog, 'logRange'), meta.logRange[0], meta.logRange[1]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      // 오버레이
      const ctx = ov.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const X = (s: number) => ((s - view[0]) / (view[1] - view[0])) * w;
      const Y = (tt: number) => h - ((tt - view[2]) / (view[3] - view[2])) * h;
      ctx.font = '11px system-ui, sans-serif';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      // 축
      ctx.beginPath();
      ctx.moveTo(X(0), 0);
      ctx.lineTo(X(0), h);
      if (view[2] < 0) {
        ctx.moveTo(0, Y(0));
        ctx.lineTo(w, Y(0));
      }
      ctx.stroke();
      if (strip) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(X(0), 0, X(1) - X(0), h);
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(X(0.5), 0);
        ctx.lineTo(X(0.5), h);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      // 영점 표시
      if (zeros) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        for (const g of zeros) {
          if (g > view[3] + 1) break;
          for (const tt of [g, -g]) {
            if (tt < view[2] - 1 || tt > view[3] + 1) continue;
            ctx.beginPath();
            ctx.arc(X(0.5), Y(tt), 5, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
      // 눈금 라벨
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 3;
      ctx.textAlign = 'center';
      for (const s of [-4, -2, 0, 1, 2, 4]) ctx.fillText(String(s), X(s), h - 6);
      ctx.textAlign = 'left';
      const step = 5;
      for (let tt = Math.ceil(view[2] / step) * step; tt <= view[3]; tt += step) ctx.fillText(`${tt}i`, X(0) + 4, Y(tt) + 4);
      ctx.shadowBlur = 0;
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [tc, strip, ready, zeros]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <figure className="viz">
      <figcaption>
        <strong>{t('landscape.title')}</strong>
        <span className="kval">
          t ∈ [{view[2].toFixed(0)}, {view[3].toFixed(0)}]
        </span>
      </figcaption>
      <div className="canvas-wrap tall">
        <canvas ref={glRef} aria-label={t('landscape.title')} />
        <canvas ref={overlayRef} className="overlay-canvas" aria-hidden />
        {(!ready || failed) && <div className="overlay">{failed ? t('landscape.noWebgl') : t('explicit.loading')}</div>}
      </div>
      <input
        type="range"
        className="slider"
        min={-2}
        max={54}
        step={0.1}
        value={tc}
        onChange={(e) => setTc(Number(e.target.value))}
        aria-label={t('landscape.height')}
      />
      <div className="controls">
        <label className="toggle">
          <input type="checkbox" checked={strip} onChange={(e) => setStrip(e.target.checked)} /> {t('landscape.strip')}
        </label>
      </div>
      <p className="note">{t('landscape.legend')}</p>
    </figure>
  );
}
