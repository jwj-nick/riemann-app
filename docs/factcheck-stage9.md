# Stage 9 팩트체크 (2026-11-24 원문 대조 완료)

| 원고 서술 | 결과 | 근거 |
|---|---|---|
| 직원이 미공개 Claude에게 "진지하게 도전", 수학적 선택은 모델에게 | 확인 | Anthropic(2026-08-10): "take a real stab… leaving the mathematical choices… up to the model" |
| RH 증명 실패 | 확인 | Anthropic "it didn't succeed" — 원고의 "스스로 보고"는 원문에 없어 "Anthropic도 그렇게 밝혔습니다"로 수정 |
| 41.6% → 67.2% | 확인 | Anthropic, Scientific American(2026-08-12) 모두 |
| 사내 수학자 2명, 콘레이·골드스턴 검토 | 확인 | Anthropic: Alpöge, Furman / Conrey, Goldston |
| Lean으로 "전체를 한 줄씩" 확인 | 수정 | 원문: Lean 형식화가 comparator 통과 → "형식화되어 기계 검증을 통과" |
| OpenAI 10월 준-리만 가설 | 확인 | Quanta(2026-10-19): 10월 6일 발표, 1차(9/30) 1/8~7/8 Lean 검증, 2차(약 1주 뒤) 1/12~11/12 미검증 |
| RH 결론 상당수가 준-RH로 성립 | 확인 | Radziwiłł: "the vast majority of consequences of RH already follow from quasi-RH" |
| 리히트먼 "가장 큰 성과" | 확인 | "the most significant AI-for-math achievement so far, by quite a margin" |
| 사르낙 신중론 | **반박됨** | Quanta: 사르낙은 강의를 이 논문 연구로 전환, 전문가들은 대체로 결과가 옳다고 봄 → 원고 수정 |
| 원래 RH는 여전히 멂 | 부분 | SciAm(Claude 결과): "no pathway… to deal with the actual Riemann hypothesis", Anthropic도 같은 입장. 준-RH에 대해서는 원문에 그런 합의 문구 없음 → Claude 결과에 한정해 서술 |
| 새 개념 없이 기존 아이디어 결합 | 확인(귀속 수정) | Quanta는 OpenAI 증명에 대해, Anthropic은 기존 결과 결합을 서술 → "두 결과 모두"로 |
| TechCrunch | 미확인 | 403 차단. 다른 원문으로 대체 가능해 영향 없음 |

## 추가 (2026-11-25): 알푀게–Claude 리만 가설 형식 증명

출처: 영어 위키백과 "Alpöge's proof of the Riemann hypothesis"(2026-11-25 22:45 UTC 판), 검색 결과의 보도(the-decoder, SiliconANGLE, Washington Post 제목 등). 1차 출처(알푀게 메모, Lean FRO 성명) 본문은 직접 열람하지 못함.

| 원고 서술 | 근거 |
|---|---|
| 11-20 알푀게(Anthropic 수학자)가 미공개 Claude와 함께 RH 증명 공개, 4쪽 메모 | 위키백과·보도 다수 일치 |
| 일반화된 RH(디리클레 L-함수)도 포함 | 위키백과 |
| Lean 약 1,700만 줄, 개발 10-06~11-16 | 위키백과 |
| 11-21 Lean FRO·Mathlib Initiative 공동 인증 "full confidence" | 위키백과·the-decoder |
| 사람이 읽는 완전한 증명은 없음, 수학자들이 아직 다 이해하지 못함 | 위키백과·보도 |
| 콘레이 "biggest thing … in mathematics", 메이너드 "historic milestone"(if correct), 그랜빌 비판(4쪽 메모·상장 다음 날), 라지비우(사람의 이해 부재), 타오(랭글랜즈·산술기하) | 위키백과 |
| 베유(유한체 위 곡선) 기법을 정수로 옮김, 스테파노프 논법 | 위키백과 |
| 11-25 서노 압축판 7.6만 줄 | 위키백과 |
| 월스트리트저널 "켄타우로스 과학" | 위키백과(WSJ 인용) |
| 클레이 연구소 공식 인정 | **미확인** — 앱에 "확인되지 않음"으로 표기 |
| "250,000쪽" 언급 | 알푀게가 농담이었다고 정정(11-23) — 앱에 쓰지 않음 |
