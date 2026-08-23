# 주요 이슈·변경사항 출처와 판정 기록

## 범위

- 수록 시작일: 2026-05-01
- 원문 재확인일: 2026-08-23
- 대상: OpenAI/Codex, Anthropic/Claude Code, Google/Gemini, xAI/Grok의 사용량·한도, reset·보상, 장애, 가격·결제, 모델·기능 변경, 정책 이슈
- 화면 데이터: `src/data/majorIssuesData.ts`
- 화면 컴포넌트: `src/components/MajorIssuesView.tsx`

이 문서는 이슈 카드에 들어가는 날짜, 영향 범위, 사용자 논의 규모, 공식 확인 수준을 다시 추적할 수 있도록 근거와 해석 제한을 기록한다.

## 판정 원칙

1. **사용자 논의 규모와 실제 영향 범위를 분리한다.** Reddit, 포럼, GitHub 등의 반응이 크더라도 실제 피해 사용자 비율로 환산하지 않는다.
2. **공식 영향 범위는 제공사가 밝힌 범위만 기록한다.** 예를 들어 `해당 reset 사용자의 10% 미만`을 `전체 사용자 10%`로 바꾸지 않는다.
3. **관계자 발언과 회사 공식 문서를 구분한다.** 관계자 직접 발언은 중요한 근거지만 정책 문서나 Status와 같은 수준으로 합치지 않는다.
4. **확인된 사실과 미확인 주장을 분리한다.** 사용자 자체 계산, 체감 배수, 원인 추정은 별도 `미확인` 영역에 둔다.
5. **정렬은 `lastMajorUpdateAt`을 사용한다.** 단순히 원문을 다시 확인한 `lastCheckedAt` 때문에 오래된 사건이 최신 이슈 위로 올라오지 않는다.
6. **날짜가 불명확하면 정밀도를 낮춰 표시한다.** `2026년 8월 중순경`, `2026년 6월부터 순차 적용`처럼 원문이 허용하는 범위만 사용한다.
7. **공식 원문을 우선한다.** 공식 문서·Status·회사 발표를 1차 근거로 쓰고, 관계자·커뮤니티 자료는 규모 판정이나 공식 문서에 없는 맥락을 보완할 때 사용한다.

## 사용자 논의 규모 기준

| 표시 | 판정 기준 |
|---|---|
| 개별 사례 | 독립 사례가 거의 없거나 단일 보고 수준 |
| 복수 보고 | 서로 다른 사용자 또는 스레드에서 같은 현상이 반복됨 |
| 다수 보고 | 여러 독립 보고가 반복되거나 관계자가 다수 피드백을 직접 언급함 |
| 광범위한 논의 | 여러 대형 스레드·복수 날짜에 걸쳐 논의가 지속되고 반응이 큰 경우 |
| 규모 판단 어려움 | 정책·공식 장애 자체는 확인됐지만 커뮤니티 규모를 신뢰성 있게 판정할 근거가 부족함 |

추천·댓글 수는 `광범위한 논의` 여부를 판단하는 보조 신호일 뿐 실제 피해율이 아니다.

## 이슈별 근거

### 2026-08-21 · Codex 사용량 빠른 소진 보고

- 판정: `광범위한 논의` / `관계자 직접 언급` / `관찰 중`
- 관계자 원문: https://x.com/thsottiaux/status/2090766694897619318
- 사용자 논의 예시:
  - https://www.reddit.com/r/codex/comments/1vtiymv/is_the_usage_limit_nerfed/
  - https://www.reddit.com/r/codex/comments/1vrjady/the_real_reason_behind_my_sudden_75x_drop_in/
  - https://www.reddit.com/r/codex/comments/1vqwcbs/codex_usage_and_operation_discussion_updated/
- 해석 제한:
  - 관계자는 플랫폼 전체에서 비정상적인 현상을 아직 보지 못했다고 설명하면서 조사 중이라고 밝혔다.
  - 커뮤니티의 `7~7.5배`, `약 44%` 등의 계산은 각 사용자의 자체 측정이므로 공식 총량 축소 수치로 사용하지 않는다.
  - 실제 영향을 받은 계정 비율은 공개되지 않았다.

### 2026-08-21 · Codex 20M Banked Reset

- 판정: `관계자 직접 언급` / `공식 확인`
- 관계자 원문: https://x.com/thsottiaux/status/2090766694897619318
- 현재 Banked Reset 도움말: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- 해석 제한: 같은 게시물에서 사용량 조사도 언급했지만 reset 지급의 명시된 사유는 `20M active users` 이정표다. 사용량 오류 보상으로 재분류하지 않는다.

### 2026-08-19 · Claude Code +50% 주간 한도 프로모션 종료

- 판정: `공식 문서` / `공식 확인`
- 원문: https://support.claude.com/en/articles/15910845-claude-code-may-august-2026-weekly-limits-promotion
- 확인 사항:
  - 기간: 2026-05-13 ~ 2026-08-19 11:59 PM PT
  - 주간 사용량 한도 +50%
  - 5시간 한도는 변경 없음
  - Pro, Max, Team, legacy seat-based Enterprise 대상
  - Free와 consumption-based Enterprise seats는 제외
  - 종료 후 주간 한도가 표준 수준으로 복귀하며 요금제·결제 방식은 바뀌지 않음

### 2026-07-29 · GPT-5.6 Sol의 Codex 사용량 소진 개선

- 판정: `다수 보고` / `관계자 직접 언급` / `해결`
- 관계자 원문: https://x.com/thsottiaux/status/2082317452755751098
- OpenAI Developer Community 보존 맥락: https://community.openai.com/t/has-the-5-hour-usage-session-been-removed-from-codex-cli/1387701/4
- 확인 사항:
  - 관계자는 subscription의 총량 자체를 줄인 것이 아니라고 설명했다.
  - Sol이 더 오래 작업하고 도구 호출·subagent·복합 workflow를 더 적극적으로 수행해 일부 작업의 소모가 의도보다 컸다고 설명했다.
  - 개선 후 `typical use`가 약 18% 더 오래 지속될 것으로 예상한다고 밝혔다.
- 해석 제한: 18%는 모든 사용자·모든 작업의 보장된 절감률이 아니다.

### 2026-07-20 · Claude Fable 5 플랜별 사용 방식 변경

- 판정: `공식 문서` / `공식 확인`
- 원문: https://support.claude.com/en/articles/15424964-claude-fable-5-on-your-plan
- 확인 사항:
  - Max 및 premium Team/seat-based Enterprise: Fable 5가 plan usage에 포함되며 주간 한도의 최대 50%를 Fable 5에 사용 가능
  - Pro 및 standard Team/seat-based Enterprise: Fable 5는 usage credits 사용
- 해석 제한: `50%`는 주간 총량이 50% 늘어난다는 뜻이 아니라, 기존 주간 한도 중 Fable 5에 쓸 수 있는 최대 비중이다.

### 2026-07-12 · Codex Banked Reset 적용 실패

- 판정: `관계자 직접 언급` / `해결`
- 관계자 원문: https://x.com/thsottiaux/status/2076418567143408112
- 확인 사항:
  - 약 2시간의 영향 구간에서 banked reset을 사용한 사용자 중 10% 미만이 reset 적용 실패를 겪었다고 설명됐다.
  - 영향 구간에 reset 버튼을 누른 사용자에게 추가 banked reset이 지급됐다.
- 해석 제한: `10% 미만`의 분모는 전체 Codex 사용자가 아니라 해당 시간대 banked reset을 사용한 사용자다.

### 2026-07-01 · Claude Fable 5 재배포

- 판정: `공식 발표` / `해결`
- 원문: https://www.anthropic.com/news/redeploying-fable-5
- 확인 사항:
  - 6월 12일 수출통제 지침이 즉시 적용돼 실시간 국적 확인이 어려워 Fable 5와 Mythos 5를 모든 사용자에게 일시 중단
  - 6월 30일 통제 해제
  - Fable 5는 7월 1일부터 Claude Platform, Claude.ai, Claude Code, Claude Cowork에 글로벌 재배포
- 해석 제한: Mythos 5의 재배포 범위를 Fable 5와 같은 글로벌 일반 공개로 단순화하지 않는다.

### 2026-06-29 · Codex 사용량 빠른 소진 공식 장애 종료

- 판정: `복수 보고` / `공식 Status` / `해결`
- 원문: https://status.openai.com/incidents/6enf4645
- 확인 사항:
  - 6월 26일 조사 시작, 6월 29일 해결
  - 일부 사례는 abuse/fraud prevention 시스템이 특정 계정을 잘못 rate-limit한 것과 관련
  - OpenAI의 공식 영향 판단은 `limited`
  - 광범위한 Codex usage degradation은 관측하지 않았다고 명시

### 2026년 6월 · Grok 공유 주간 usage pool 전환

- 판정: `공식 문서` / `공식 확인`
- 원문: https://docs.x.ai/grok/faq
- 확인 사항:
  - 과거 제품별 일일 한도에서 하나의 공유 weekly usage pool로 전환
  - Chat, Imagine, Voice, Build 등 여러 제품이 공유
  - 작업별 compute가 달라 같은 횟수라도 소모량이 같지 않음
  - Settings → Usage에서 주간 reset 및 제품별 사용 비중 확인
- 해석 제한: 기존 대비 총 사용 가능량이 정확히 몇 % 바뀌었는지는 공식 단일 수치가 없다.

### 2026-06-11 · Codex Banked Reset 공식 도입

- 판정: `공식 문서` / `공식 확인`
- 원문: https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- 현재 사용법: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- 확인 사항:
  - eligible Plus·Pro에 rate-limit reset banking 도입
  - 출시 시 free reset 1개
  - 당시 지급된 banked reset은 30일 동안 사용 가능
  - 현재 full banked reset은 5시간·주간 창을 함께 reset하며 주간 reset 날짜도 사용 시점 기준으로 이동

### 2026-06-02~03 · Codex HTTP 429 장애

- 판정: `공식 Status` / `해결`
- 원문: https://status.openai.com/incidents/01KT5XJ5ATD6RMYP908WS69FVD/write-up
- 확인 사항:
  - 약 2026-06-02 21:46 PDT ~ 06-03 00:01 PDT
  - 일부 Codex 요청이 정상인데도 HTTP 429로 잘못 거부
  - ChatGPT 로그인·인증·대화, Responses API 지연에도 부분 영향
  - infrastructure configuration rollout이 공유 dependency의 용량을 소진한 것이 근본 원인

### 2026-05-28 · Gemini compute 기반 한도 후속 조정

- 판정: `광범위한 논의` / `공식 문서 + 관계자 후속 설명` / `공식 확인`
- 공식 한도 문서: https://support.google.com/gemini/answer/16275805?hl=en
- 후속 보도(관계자 발표 인용): https://9to5google.com/2026/05/28/gemini-new-usage-limits/
- 사용자 논의 예시:
  - https://www.reddit.com/r/GeminiAI/comments/1ti0coz/canceled_my_pro_sub_today_the_new_5hour_compute/
  - https://www.reddit.com/r/GeminiAI/comments/1thmta0/i_understand_that_compute_is_limited_but_these/
- 확인 사항:
  - 5월 17일부터 prompt complexity, model/features, chat length를 반영하는 compute-based usage limits 도입
  - 5시간마다 갱신되며 weekly limit에 도달할 때까지 반복
  - 5월 28일 한도에 너무 빨리 도달한다는 feedback을 반영해 복잡한 단일 Pro prompt 상한, 실패 요청 제외, Flash-Lite quota 제외 등 후속 조정 발표
- 해석 제한: compute 기반이므로 모든 요청을 `주당 N회`로 단일 환산하지 않는다.

### 2026-05-23 · Codex 장기 세션 cache-hit 문제

- 판정: `복수 보고` / `공식 Status + 관계자 직접 언급` / `해결`
- Status: https://status.openai.com/incidents/tcc95qa3
- 관계자 원문: https://x.com/thsottiaux/status/2058280452851638313
- 확인 사항:
  - OpenAI Status에 `Increase in users hitting Codex rate limits` 사건으로 등록
  - 관계자는 장시간 세션 compaction 최적화가 cache hit rate를 악화시킨 것이 원인이라고 설명
  - rollback 후 모든 계정의 usage limit reset을 발표
- 해석 제한: 개별 사용자의 소모 배수나 전체 영향률은 공식 수치가 아니다.

### 2026-05-15 · xAI API 모델 종료

- 판정: `공식 문서` / `공식 확인`
- 원문: https://docs.x.ai/developers/migration/may-15-retirement
- 확인 사항:
  - 2026-05-15 12:00 PM PT부터 8개 legacy model slug 종료
  - 기존 slug는 replacement model로 redirect
  - replacement model의 가격이 다를 수 있어 예상치 못한 비용 변화에 주의하라고 안내

### 2026-05-06 · Claude Code 5시간 한도 확대

- 판정: `공식 발표` / `공식 확인`
- 원문: https://www.anthropic.com/news/higher-limits-spacex
- 확인 사항:
  - Pro, Max, Team, seat-based Enterprise의 Claude Code 5시간 rate limit을 2배로 확대
  - Pro·Max의 peak-hours limit reduction 제거
- 해석 제한: 이 변경은 5월 13일부터 시작된 별도의 `주간 +50%` 프로모션과 구분한다.

## 게시·갱신 체크리스트

1. 새 이슈의 `lastMajorUpdateAt`이 실제 주요 사건·공식 후속 업데이트 날짜인가?
2. `lastCheckedAt`만 바뀌었는데 정렬 순서가 변하지 않는가?
3. 사용자 논의 규모와 공식 영향 범위를 한 숫자로 합치지 않았는가?
4. 비율이 있으면 분모와 적용 대상을 함께 적었는가?
5. 관계자 발언을 회사 공식 정책 문서로 과장하지 않았는가?
6. 커뮤니티 자체 계산을 공식 수치처럼 쓰지 않았는가?
7. 해결된 장애와 현재 조사 중인 논란을 같은 상태로 표시하지 않았는가?
8. 정확한 발생일이 없으면 임의 날짜 대신 대략적 기간을 표시했는가?
9. 공식 미보고 항목은 추정값으로 채우지 않았는가?
10. 출처 URL을 게시 전 다시 열어 확인했는가?
