# AI 모델 비교 데이터 출처와 해석 기준

## 데이터 스냅샷

- 검증일: 2026-08-21
- 화면 데이터 원본: `src/data/modelRankingData.ts`
- 원칙: 공식 API 사양과 원문이 공개된 평가 결과만 수록한다. 출처·버전·하네스가 다른 점수를 합산하거나 임의 종합 순위로 바꾸지 않는다.

### 날짜와 가격값의 해석 순서

1. 시험 실행일이 원문에 있으면 시험·토큰·비용 지표의 기준일로 사용한다.
2. 시험 실행일이 없으면 결과 공개일 또는 사이트의 원문 확인일을 **별도 이름으로** 표시하며, 이를 시험일로 바꾸지 않는다.
3. 나중에 공지된 가격 인하·캐시·한시 가격은 `별도 가격·토큰 효율 업데이트`에 발표일과 함께 기록한다.
4. 후속 가격 발표는 과거 시험의 점수, 토큰 수, 평가 비용을 소급 수정하지 않는다. 현재 운영 비용은 최신 공식 단가와 실제 사용 로그로 새로 계산한다.

## 1. 공식 사양과 가격

| 제공사 | 확인 항목 | 원문 |
|---|---|---|
| OpenAI | GPT-5.6 Sol·Terra·Luna 컨텍스트, 최대 출력, Standard API 가격, 장문 컨텍스트 조건 | [Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol), [Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra), [Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna), [가격 인하 발표](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/) |
| Anthropic | Claude Opus 5·Fable 5·Sonnet 5 컨텍스트, 최대 출력, API 가격과 한시 가격 | [Opus 5](https://www.anthropic.com/news/claude-opus-5), [Fable 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5), [Sonnet 5](https://platform.claude.com/docs/en/about-claude/models/whats-new-sonnet-5) |
| SpaceXAI | Grok 4.6 컨텍스트와 API 가격 | [모델·가격 문서](https://docs.x.ai/developers/models), [모델 카드](https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf) |
| Google | Gemini 3.7 Flash 입력·출력 한도, 멀티모달 입력, 한시 Standard 가격 | [모델 사양](https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash), [가격](https://ai.google.dev/gemini-api/docs/pricing) |

가격 계산기는 입력·출력 토큰의 기본 Standard 단가만 계산한다. 캐시, 배치, 우선 처리, Fast mode, 내장 도구 사용료는 제외한다. OpenAI 모델은 입력이 272K 토큰을 초과할 때 문서에 기재된 장문 컨텍스트 할증을 반영한다.

공식 사양 표의 가격 칸에는 `현재 적용`, `이전`, `예정·변경`을 날짜와 함께 표시한다. 날짜를 공식 문서에서 확인하지 못한 경우에는 `가격 효력 시작일 원문 미공개`로 남기며, 모델 출시일이나 사이트 확인일을 임의로 가격 시작일로 바꾸지 않는다. 현재 원문 재확인일은 2026-08-21이다.

### 최근 가격·토큰 효율 발표의 확인 결과

최근 발표를 “모든 모델의 토큰 비용이 계속 내려간다”는 단일 추세로 표현하지 않는다. 아래는 2026-08-21에 제공사 원문을 다시 확인해 화면의 **시험 결과와 분리된** 가격 카드에 반영한 항목이다. 표의 날짜는 시험일이 아니라 가격·정책 발표일이다.

| 제공사·항목 | 원문으로 확인한 사실 | 해석 제한 |
|---|---|---|
| OpenAI GPT-5.6 Terra·Luna | 2026-07-30부터 Terra는 $2/$12, Luna는 $0.20/$1.20 (입력/출력 100만 토큰당). 발표는 Terra 20%, Luna 80% 인하라고 설명 | Sol 가격은 그대로이며, Fast mode는 2배 가격이다. 장문 컨텍스트와 도구 사용료는 별도다. [원문](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/) |
| OpenAI GPT-5.6 캐시 | 캐시 읽기는 일반 입력 단가의 10%, 캐시 쓰기는 1.25배 | 정확히 재사용되는 프롬프트에만 해당한다. 첫 요청·출력·추론 토큰에 일괄 90% 할인을 적용하지 않는다. [원문](https://openai.com/index/gpt-5-6/) |
| Google Gemini 3.7 Flash | 2026-12-31까지 Standard 입력/출력 $0.75/$3.75, 2027-01-01부터 $1.50/$7.50로 안내 | thinking token은 출력 가격에 포함되지만, Batch·Flex·Priority·grounding은 별도 조건과 요금이 있다. [원문](https://ai.google.dev/gemini-api/docs/latest-model) |
| Anthropic Claude Sonnet 5 | 도입 가격 $2/$10은 2026-08-31까지이며 이후 표준 가격은 $3/$15 | 현재 저가가 장기 가격을 보장하지 않는다. 플랫폼·지역·캐시·배치 가격도 분리해 확인한다. [원문](https://platform.claude.com/docs/en/about-claude/models/overview) |

제공사가 말하는 “토큰 효율”은 같은 과제·품질·프롬프트·도구 사용 조건을 맞춘 독립 실측이 아니다. 이 사이트는 이를 제공사 발표로 표시하며, 실제 도입 전에는 대표 작업에서 입력·캐시·추론·출력·도구 호출을 분리해 측정하도록 안내한다.

## 2. 독립 동일조건 비교

Artificial Analysis의 Intelligence Index v4.1.1 모델 페이지에서 다음 세 측정값을 사용한다.

- Intelligence Index
- first-party API 출력 속도(tokens/s)
- Intelligence Index 평가 과제당 비용

한 표에는 같은 기관의 같은 스냅샷과 max effort 결과만 넣었다. **결과·비용 스냅샷 확인일은 2026-08-20**이며, Artificial Analysis 모델 페이지가 각 시험의 실제 실행일을 공통으로 공개하지 않아 화면에는 `시험 실행일: 모델별 원문 미공개`로 표시한다. 특히 `평가 과제당 비용`은 이 확인일에 원문 페이지에 표시된 값이며, 2026-07-30 OpenAI 가격 인하나 이후의 가격·캐시 정책을 소급 반영해 다시 계산하지 않는다. Claude Fable 5는 원문처럼 Opus 4.8 fallback 허용 결과라고 표시한다. Grok 4.6과 Gemini 3.7 Flash는 확인 시점에 같은 스냅샷의 모델 페이지가 확인되지 않아 값이나 순위를 추정하지 않았다.

모델별 원문: [Claude Opus 5](https://artificialanalysis.ai/models/claude-opus-5), [Claude Fable 5](https://artificialanalysis.ai/models/claude-fable-5/), [GPT-5.6 Sol](https://artificialanalysis.ai/models/gpt-5-6-sol), [GPT-5.6 Terra](https://artificialanalysis.ai/models/gpt-5-6-terra), [Claude Sonnet 5](https://artificialanalysis.ai/models/claude-sonnet-5), [GPT-5.6 Luna](https://artificialanalysis.ai/models/gpt-5-6-luna)

## 3. 공개된 실제 비교 평가

### Grok 4.6 모델 카드

[Grok 4.6 Model Card](https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf)에 최신 세대 모델이 함께 보고된 다음 평가를 옮겼다.

- FrontierCode v1.1: 오픈소스 저장소 유지관리 관점의 코드 변경 품질
- DeepSWE v1.1: 장기 실행 소프트웨어 엔지니어링 Pass@1
- Terminal-Bench 3.0: 컨테이너 기반 터미널 과제 성공률
- GDPval-AA v2: 전문 지식 업무 산출물의 쌍대 비교 Elo
- APEX-Agents: 투자은행·컨설팅·기업 법무 장기 업무 Pass@1
- 3DCodeBench: 코드로 생성한 3D 자산의 실행 가능성과 형상 충실도

이 자료의 발행 주체는 SpaceXAI다. 일부 표는 비-Grok 모델의 모델 카드 최고 보고치나 서로 다른 에이전트 하네스를 사용하므로 완전한 동일조건 대조가 아니다. 화면에 각 표의 평가자, 하네스, 표본과 제한을 함께 표시한다.

각 표에는 결과 공개일과 시험 실행일을 구분한다. Grok 4.6 모델 카드는 `2026-08`까지만 공개되어 있어 개별 시험 실행일을 추정하지 않는다.

### OpenAI GPT-5.6 공개 평가표

[GPT-5.6 공개 발표](https://openai.com/index/gpt-5-6/)의 원문 표에 함께 실린 결과를 분야별로 옮겼다. 기존 화면은 Sol·Terra·Luna·Fable 5 네 열만 표시했지만, 현재 화면은 원문에 수치가 있는 비교 모델을 누락하지 않도록 다음 범위를 제공한다.

- 전문 업무·종합 지능: 8개 모델, 3개 공개 평가
- 코딩 에이전트: 10개 모델, 4개 공개 평가
- 컴퓨터 사용·웹 탐색·CAD: 9개 모델, 4개 공개 평가

원문이 대시(`—`)로 둔 값은 `미보고`로 표시한다. 이는 0점이나 실패가 아니며 다른 출처의 숫자로 보충하지 않는다. 2026년 8월 Grok 모델 카드의 갱신된 수치와는 시점·버전·하네스가 달라 별도 표로 유지한다.

OpenAI 발표의 결과 공개일은 2026-07-09다. 원문이 행별 시험 실행일을 일괄 공개하지 않은 경우, 공개일을 시험 실행일로 대체하지 않는다.

쉬운 설명은 다음 벤치마크 소유자·연구진의 방법론을 바탕으로 작성했다.

- [Agents' Last Exam 문서](https://agents-last-exam.org/docs/ale/index.html): 55개 전문 분야의 장기 실제 업무
- [Artificial Analysis Intelligence 방법론](https://artificialanalysis.ai/methodology/intelligence-benchmarking): GDPval-AA v2와 Intelligence Index 구성·채점
- [Artificial Analysis Coding Agent Index 방법론](https://artificialanalysis.ai/methodology/coding-agents-benchmarking): DeepSWE·Terminal-Bench·저장소 질의 평가와 pass@1
- [Scale AI SWE-Bench Pro](https://labs.scale.com/leaderboard/swe_bench_pro_public): 실제 저장소 이슈와 재현 가능한 테스트 환경
- [OpenAI SWE-Bench Pro 데이터 감사](https://openai.com/index/separating-signal-from-noise-coding-evaluations/): 과제 약 30%가 깨졌다는 추정과 해석 주의
- [Terminal-Bench 2.1](https://www.tbench.ai/news/terminal-bench-2-1): 터미널 과제의 갱신·수정 범위
- [OSWorld 2.0 논문](https://arxiv.org/abs/2606.29537): 108개 장기 컴퓨터 사용 워크플로
- [BrowseComp](https://openai.com/index/browsecomp/): 찾기 어렵고 검증하기 쉬운 1,266개 웹 탐색 문제
- [BenchCAD](https://benchcad.com/): 실행 검증된 산업용 CadQuery 부품과 3D 공간 추론

### Model ML 문서·스프레드시트 제작 평가

[Model ML Composite 사례](https://openai.com/index/model-ml/)에 공개된 에이전트의 네이티브 PowerPoint·Excel 제작 결과를 옮겼다. 단순 질의응답이 아니라 파일을 실제 생성하고 품질, 정답성, 파일 생성 성공률, 토큰, 소요 시간을 측정한 자료다. 다만 Model ML의 자체 벤치마크가 OpenAI 고객 사례에 게시된 것이므로 독립 연구기관 결과로 표현하지 않는다.

이 자료가 공개한 비교 대상은 GPT-5.6 Sol, Claude Opus 5, Claude Fable 5, GPT-5.6 Terra 네 모델이다. 나머지 모델 칸은 비교 대상이 아니므로 추가하지 않으며, 각 영문 측정 항목 아래에 한국어 쉬운 뜻을 함께 표시한다.

### 추가로 참고할 공식 벤치마크와 리더보드

화면에는 아래 자료를 별도 참고 카드로 추가했다. 서로 다른 도구 권한, 프롬프트, 실행 시간, 비용 한도, 에이전트 하네스를 쓰므로 점수를 한 표로 합치거나 자체 종합 순위로 만들지 않는다.

| 자료 | 무엇을 확인하는가 | 원문 |
|---|---|---|
| Agents' Last Exam | 검증 가능한 성공 조건이 있는 장기 전문 업무 수행 | [공식 리더보드](https://agents-last-exam.org/leaderboard) |
| Terminal-Bench 3 | 격리된 컨테이너에서 터미널 명령과 파일 작업을 끝까지 완료하는 능력 | [공식 리더보드](https://www.tbench.ai/leaderboard) |
| τ³-bench | 항공·소매·통신·은행 환경에서 정책을 지키며 도구와 사용자 상호작용을 처리하는 능력 | [공식 저장소·방법](https://github.com/sierra-research/tau2-bench) |
| SWE-Bench Pro | 전문 소프트웨어 저장소의 실제 이슈를 수정하고 테스트를 통과하는 능력 | [공식 리더보드](https://labs.scale.com/leaderboard/swe_bench_pro_public) |
| LiveCodeBench | 오염을 줄이기 위해 최신 문제를 지속 반영한 프로그래밍 문제 풀이 | [공식 리더보드](https://huggingface.co/spaces/livecodebench/leaderboard) |
| BrowseComp | 웹에서 찾기 어려운 정보를 찾아, 짧고 검증 가능한 답을 내는 능력 | [OpenAI 소개](https://openai.com/index/browsecomp/) |
| OSWorld 2.0 | 실제 운영체제·앱을 넘나드는 긴 컴퓨터 사용 워크플로 | [논문](https://arxiv.org/abs/2606.29537) |
| ARC-AGI-2 | 예시에서 새로운 규칙을 추론해 낯선 시각 퍼즐을 푸는 일반화 능력 | [ARC Prize 설명](https://arcprize.org/arc-agi/2) |

Agents' Last Exam은 2026-08-20에 확인한 공식 공개 리더보드의 실행 기록도 별도 표로 옮겼다. 이 표의 pass rate는 완전 성공한 과제의 비율이고, score는 부분 성공을 포함한 평균 점수다. 리더보드의 각 실행은 서로 다른 하네스와 설정일 수 있으므로 **모델 자체의 공정한 단독 순위가 아니라 공개된 에이전트 실행 기록**으로 해석한다. 모델별로 원문에 공개된 실행이 없는 경우 숫자나 빈 칸을 만들지 않는다.

## 4. 수록하지 않는 데이터

- 실행 로그와 원본 산출물이 없는 사이트 자체 ‘실측’ 수치
- 출처를 확인할 수 없는 코딩 성공률, 자동 복구 점수, 빌드 시간, FPS
- 모델명만 가렸다고 주장하고 평가자·루브릭·원점수를 공개하지 않은 블라인드 리뷰
- 서로 다른 벤치마크·버전·하네스를 평균낸 자체 종합 점수
- 원문에서 보고하지 않은 모델의 추정값 또는 0점 대체

## 5. 향후 자체 실측을 추가할 때의 최소 조건

1. 고정 입력 파일, 공개 프롬프트, 모델 snapshot/alias, effort, 도구 권한을 기록한다.
2. 모델·과제별 최소 20회 반복하고 성공 수/전체 수와 95% 신뢰구간을 함께 계산한다.
3. 입력·캐시·추론·출력 토큰을 분리하고 공식 가격표로 비용을 재계산한다.
4. 코드는 동일 컨테이너에서 빌드·테스트·정적 분석하며 원본 로그를 보존한다.
5. UI·게임은 같은 브라우저, CPU, GPU, 해상도에서 uncapped FPS와 p50/p95를 기록한다.
6. 블라인드 평가는 모델명을 가린 산출물, 평가자 수, 루브릭, 원점수를 공개한다.

이 조건을 충족하지 않는 공개 벤치마크는 ‘외부 공개 평가’, 공식 문서의 수치는 ‘제공사 보고’, 독립 기관의 측정은 ‘독립 측정’으로 명확히 구분한다.
