# riemann-app — 「소수의 음악」(가제)

리만 가설을 A to Z로 이해시키는 스테이지형 학습 웹앱. 스펙은 `docs/PRD.md`, 이야기 원고는 `content/ko/story-draft.md`가 정본이다.

## 작업 방식 (오너는 주로 폰에서 지시한다)
- 오너 허가(2026-11): 작업 브랜치에서 커밋 후 **main에 직접 push** 가능(PR 생략). push 전 `npm test`·`npm run build`·검증 스크립트 통과 필수. 결정이 필요한 것은 세션 응답에 모은다.
- 오너는 Claude 앱 Code 탭(클라우드 세션)에서 짧게 지시한다. 지시가 모호하면 PRD 기준으로 가장 합리적인 해석을 택하고, PR 설명 맨 위에 그 해석을 한 줄로 적는다.
- 한 세션 = 한 PR = 한 가지 목표 (예: "Stage 6 슬라이더", "소리 엔진"). 범위가 커지면 쪼개서 다음 작업으로 남긴다.
- PR 설명은 폰에서 읽기 좋게 쓴다:
  1. 한 줄 요약
  2. 무엇이 바뀌었나 (불릿 3~5개)
  3. 확인 방법: 확인할 화면·조작. PR 미리보기 URL이 없으므로 **스크린샷(모바일 폭 390px 포함)을 반드시 첨부**한다. 머지 후 https://jwj-nick.github.io/riemann-app/ 에 자동 배포된다.
  4. 스크린샷 (가능하면)
  5. 남은 일 / 결정이 필요한 것 (질문은 여기에 모은다)
- 수치·수식을 다루는 변경은 검증 스크립트를 돌리고 결과(예: π(x) 대조, 영점 값 대조)를 PR에 붙인다.

## 기술 스택
- React + Vite + TypeScript, 배포 **GitHub Pages** (`.github/workflows/deploy.yml`, main 푸시 시 자동 배포)
  - Vite `base`는 `/riemann-app/`. 라우팅은 HashRouter(또는 404.html 폴백)로 Pages의 새로고침 404를 피한다.
  - 정적 사이트이므로 서버 코드 없음. 비밀 키를 클라이언트 번들에 절대 넣지 않는다.
- KaTeX(수식), D3 + Canvas(그래프), WebGL(제타 풍경), Web Audio(소리)
- i18n: react-i18next, `ko` 기본, `en`은 키만 맞춰 둔다. UI 문자열·콘텐츠 하드코딩 금지.
- 수치 데이터는 `scripts/`의 Python(mpmath)로 미리 계산해 `public/data/*.json`에 둔다. 브라우저에서 무거운 계산을 하지 않는다(필요하면 Web Worker).

## 콘텐츠 규칙
- 스테이지 콘텐츠는 `content/{ko,en}/stage-XX.md`(MDX 아님: 수식 원고의 `{}`가 MDX와 충돌), 중고생판은 `content/{lang}/junior/`.
  - `content/ko/stage-XX.md`는 `python3 scripts/split_story.py`로 `story-draft.md`에서 생성한다. 원고를 고친 뒤 다시 생성하고, 생성물은 직접 고치지 않는다.
  - `[그래픽:id]` 줄은 컴포넌트 자리(매핑은 `split_story.py`의 GRAPHICS), `**팩트체크**`·`**Junior 한 줄**` 단락과 `## 구현 메모` 이후는 빌드 시 제외(`scripts/vite-content-md.ts`).
- Stage 6 Lv3 수식 원고: `content/ko/stage-06-lv3-derivation.md` (구현 메모 포함). 검증: `python3 scripts/verify_explicit_formula.py`
- 그 외 Lv3 원고 `content/ko/stage-0X-lv3.md`는 AI 초안(앱에 "초안" 표시). 수치·항등식 검증: `python3 scripts/verify_lv3_drafts.py`
- Lv4 원고 `content/ko/stage-0X-lv4.md`(AI 초안, "초안" 표시). 코드 블록 실행 검증: `python3 scripts/verify_lv4_code.py`
- 예측 질문 형식: `**예측 질문**: "질문" → 답` + 같은 단락 끝 줄 `**힌트**: h1 || h2` (AI 튜터, 힌트→답 순서로만 열림)
- 2026 AI 사건(Stage 9) 원문 대조 기록: `docs/factcheck-stage9.md`
- Stage 8 원자핵 데이터: `python3 scripts/compute_nuclear.py` (JEFF-3.3 U-238, GOE)
- 원고의 [그래픽] 표시는 인터랙션 컴포넌트를 넣을 자리다.
- 원고의 "팩트체크" 항목은 앱 화면에 내보내지 않는다. 검증 전 일화는 "전해진다" 표현을 유지한다.
- AI 튜터는 힌트만 주고 답은 사용자가 말하게 한다(소크라테스식). 사전 작성된 유도가 정본이다.
- 외부 이미지·영상은 쓰지 않는다. 그래픽은 전부 직접 생성한다.

## 마일스톤
PRD 8장 참고. 완료: M1(스캐폴드·데이터·Stage 6), M2(Stage 1~4), M3(Stage 5·7·8), M4 일부(Stage 0·9, Lv3 초안). M4: AI 튜터(정적 힌트)·Lv4·진행 저장 완료, 남은 것은 Lv3/Lv4 초안 오너 검토 후 `lv3Draft`/`lv4Draft` 해제. 이후 M5(Junior), M6(영어판·Manim).
