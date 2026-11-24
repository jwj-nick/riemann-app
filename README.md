# 「소수의 음악」(가제) — 리만 가설 A to Z

소수를 잊은 성인이 이야기 → 직관(인터랙티브 그래픽) → 수식 순으로 리만 가설을 끝까지 이해하게 하는 웹앱.

- 스펙: [docs/PRD.md](docs/PRD.md)
- 이야기 원고: [content/ko/story-draft.md](content/ko/story-draft.md)
- 작업 규칙: [CLAUDE.md](CLAUDE.md)
- 클라우드 환경 setup script: [scripts/setup.sh](scripts/setup.sh)

## 개발
```bash
npm install
npm run dev        # http://localhost:5173/riemann-app/
npm test           # 명시공식 JS 구현 ↔ mpmath 수치 대조
npm run build      # dist/ (main 푸시 시 GitHub Pages 자동 배포)

python3 scripts/compute_zeros.py 1000   # public/data/zeros.json, pi_x.json 재생성 (~3분)
python3 scripts/verify_data.py          # 영점·π(x) 기준값 대조
python3 scripts/verify_explicit_formula.py
```

콘텐츠는 `content/{lang}/*.md`를 빌드 시 HTML로 변환한다(`scripts/vite-content-md.ts`). `[그래픽:id]` 줄은 인터랙션 컴포넌트 자리, `**팩트체크**`·`**Junior 한 줄**` 단락과 `## 구현 메모` 이후는 앱에 나오지 않는다.
