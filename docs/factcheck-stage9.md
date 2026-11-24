# Stage 9 팩트체크 메모 (2026-11-24)

원문 대조: https://www.anthropic.com/research/riemann-zeta (2026-08-10 게시, 08-13 논문 개정)만 열람 가능.
TechCrunch·Quanta·Scientific American은 이 작업 환경의 네트워크에서 막혀 미확인.

| 원고 서술 | 결과 | 원문 근거 / 수정 제안 |
|---|---|---|
| Anthropic 직원이 미공개 Claude에게 "진지하게 도전해 봐", 수학적 선택은 사람이 정하지 않음 | 확인 | "prompted Claude to 'take a real stab'… leaving the mathematical choices from there up to the model" (직원: Jarred Sumner, 비수학자) |
| "2026년 여름" | 부분 | 원문엔 날짜만(2026-08-10). "여름"은 무리 없음 |
| 리만 가설 증명 실패, "스스로도 그렇게 보고" | 부분 | 실패는 확인("it didn't succeed"). **"스스로 보고"는 원문에 없음** → "Anthropic은 실패했다고 밝혔습니다" 정도로 |
| 선 위 영점 비율 하한 41.6% → 67.2% | 확인 | "increased this bound from 41.6% to 67.2%" (원고 팩트체크의 "2차 출처 기준" 메모는 갱신 가능) |
| 사내 수학자 2명 검토, 콘레이·골드스턴도 검토 | 확인 | Levent Alpöge, Ralph Furman / Brian Conrey, Dan Goldston "examined the paper on short notice" |
| 증명 전체가 Lean에서 한 줄씩 기계적으로 확인 | 부분 | Lean 형식화가 있고 표준 검증 도구(comparator) 통과. **"한 줄씩"·"전체"는 원문 표현 아님** → "Lean 형식화로도 검증됐습니다" |
| 새 개념 없이 기존 아이디어를 새 방식으로 엮음 | 부분 | Aryan, Baluyot–Goldston–Suriajaya–Turnage-Butterbaugh, Bombieri 결과 결합 + 이차형식을 비대각으로 허용. "새 개념 없이"는 원문 표현 아님 |
| OpenAI 10월 준-리만 가설(1/8~7/8 Lean, 1/12~11/12) | 미확인 | Quanta 접근 불가 |
| 리히트먼 "가장 큰 성과", 사르낙 신중론 | 미확인 | 해당 기사 접근 불가 |

Anthropic 원문의 자기 평가: "We don't expect that the techniques Claude used will lead to proving the Riemann hypothesis."

남은 일: 환경 네트워크에 techcrunch.com, quantamagazine.org, scientificamerican.com 허용 후 나머지 대조 → 원고 수정 → Stage 9 공개.
