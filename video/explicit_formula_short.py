"""Manim 쇼츠 파일럿: "영점을 더하면 소수 계단이 나타난다" (세로 9:16, 약 25초)

앱과 같은 데이터(public/data/zeros.json)와 같은 공식(src/lib/explicit.ts)을 쓴다.
  psi_K(x) = x − Σ_{k≤K} 2√x(½cos(γ ln x) + γ sin(γ ln x))/(¼+γ²) − ln 2π − ½ ln(1 − x⁻²)

렌더: manim -qm --resolution 1080,1920 video/explicit_formula_short.py ExplicitFormulaShort
(LaTeX 없이 동작하도록 Text만 사용. 한글 폰트는 FONT 상수로 지정)
"""
import json
import math
from pathlib import Path

import numpy as np
from manim import (
    BLUE_C,
    DOWN,
    LEFT,
    GREY_B,
    ORANGE,
    UP,
    WHITE,
    Axes,
    Create,
    FadeIn,
    FadeOut,
    Scene,
    Text,
    ValueTracker,
    VGroup,
    VMobject,
    always_redraw,
    config,
    linear,
)

config.pixel_width, config.pixel_height = 1080, 1920
config.frame_width = 9
config.frame_height = 16
config.background_color = "#0f1220"

FONT = "WenQuanYi Zen Hei"
ROOT = Path(__file__).resolve().parent.parent
GAMMA = np.array(json.loads((ROOT / "public" / "data" / "zeros.json").read_text())["gamma"][:1000])
X0, X1 = 1.5, 30.0
XS = np.linspace(X0, X1, 1600)
LNX = np.log(XS)


def psi_k(k: int) -> np.ndarray:
    s = XS - math.log(2 * math.pi) - 0.5 * np.log(1 - XS**-2.0)
    if k:
        g = GAMMA[:k, None]
        a = g * LNX[None, :]
        s = s - (2 * np.sqrt(XS) * (0.5 * np.cos(a) + g * np.sin(a)) / (0.25 + g * g)).sum(axis=0)
    return s


def psi_steps() -> list[tuple[float, float]]:
    pts, total = [(X0, 0.0)], 0.0
    for n in range(2, int(X1) + 1):
        m, p = n, next(q for q in range(2, n + 1) if n % q == 0)
        while m % p == 0:
            m //= p
        if m == 1:
            pts.append((n, total))
            total += math.log(p)
            pts.append((n, total))
    pts.append((X1, total))
    return pts


class ExplicitFormulaShort(Scene):
    def construct(self):
        title = Text("소수 계단은\n영점의 화음이다", font=FONT, font_size=64, line_spacing=1.2).to_edge(UP, buff=1.2)
        axes = Axes(x_range=[0, 30, 5], y_range=[0, 32, 10], x_length=8, y_length=8, tips=False,
                    axis_config={"color": GREY_B}).shift(DOWN * 0.8)
        # 눈금 숫자도 Text로 (LaTeX 불필요)
        ticks = VGroup(*[Text(str(v), font=FONT, font_size=24, color=GREY_B).next_to(axes.c2p(v, 0), DOWN, buff=0.15) for v in (5, 10, 15, 20, 25, 30)],
                       *[Text(str(v), font=FONT, font_size=24, color=GREY_B).next_to(axes.c2p(0, v), LEFT, buff=0.15) for v in (10, 20, 30)])
        stairs = VMobject(color=WHITE, stroke_width=4).set_points_as_corners([axes.c2p(x, y) for x, y in psi_steps()])
        k = ValueTracker(1)

        def wave():
            ys = psi_k(int(round(k.get_value())))
            return VMobject(color=BLUE_C, stroke_width=4).set_points_as_corners(
                [axes.c2p(x, min(max(y, -2), 34)) for x, y in zip(XS, ys)])

        curve = always_redraw(wave)
        label = always_redraw(lambda: Text(f"영점 {int(round(k.get_value()))}개", font=FONT, font_size=48, color=BLUE_C)
                              .next_to(axes, UP, buff=0.4))
        legend = VGroup(Text("흰색: 실제 소수 계단 ψ(x)", font=FONT, font_size=30, color=WHITE),
                        Text("파랑: 영점 파동의 합", font=FONT, font_size=30, color=BLUE_C)).arrange(DOWN, aligned_edge=0).next_to(axes, DOWN, buff=0.6)
        outro = Text("영점 = 음표\n리만 가설 = 모든 음이 같은 크기", font=FONT, font_size=34, line_spacing=1.1, color=ORANGE).move_to(legend)

        self.play(FadeIn(title), run_time=1.5)
        self.play(Create(axes), FadeIn(ticks), Create(stairs), FadeIn(legend), run_time=2)
        self.add(curve, label)
        self.wait(1.5)
        for target, t in [(10, 3), (100, 4), (1000, 6)]:
            self.play(k.animate.set_value(target), run_time=t, rate_func=linear)
            self.wait(1)
        self.play(FadeOut(legend), FadeIn(outro), run_time=1.5)
        self.wait(2)
