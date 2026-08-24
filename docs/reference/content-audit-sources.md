# 웹 콘텐츠 정확성 감사 기록

## 감사 범위

- 검토일: 2026-08-24
- 대상: 현재 앱에서 접근 가능한 모델 비교, 주요 이슈·변경사항, 디자인 사전 설계, 프로젝트 하네스, MCP, 개발 로드맵, 인프라 가이드와 공개 README/아키텍처 문서
- 원칙: 숫자와 순위는 측정 조건이 있는 원문만 사용하고, 제품 기능·명령·보안 지침은 공식 1차 자료를 우선한다.

모델 비교의 벤치마크별 원문과 해석 제한은 [model-comparison-sources.md](model-comparison-sources.md)에 별도로 기록한다.
주요 이슈·변경사항의 날짜·영향 범위·사용자 논의 규모 판정 근거는 [major-issues-sources.md](major-issues-sources.md)에 별도로 기록한다.
AI Development Harness v2의 클라이언트별 경로·DESIGN.md·MCP·Loop Engineering 근거는 [ai-harness-v2-sources.md](ai-harness-v2-sources.md)에 별도로 기록한다.

### 공개 범위와 레거시 자료의 구분

- 현재 공개 앱은 `src/App.tsx`가 연결한 6개 상위 화면만 렌더링하며, 주요 이슈·변경사항은 모델 비교 화면의 하위 자료 탭으로 제공한다.
- `reasoningEffortData.ts`, `missionsBenchmarkData.ts`, `benchmarkData.ts`, `usageQuotaData.ts` 등 미사용 레거시 모듈에는 재현 절차나 1차 출처가 없는 합성 수치가 남아 있다.
- 이 레거시 모듈은 현재 공개 화면의 근거로 사용하지 않으며 파일 상단에 `@deprecated` 게시 금지 경고를 추가했다. 향후 연결하려면 원시 결과, 프롬프트, 환경, 모델 버전, 날짜, 반복 횟수, 채점 기준을 먼저 공개해야 한다.

## 이번 감사에서 확인한 주요 오류와 조치

| 기존 내용 | 판정 | 조치 |
|---|---|---|
| Harness가 cross-client handoff 중심으로 보일 수 있음 | Codex·Claude Code·Antigravity 중 하나만 사용해도 계획→구현→검증이 완결되어야 함 | single-client end-to-end engineering을 기본 경로로 재정의하고 cross-session/client handoff는 보조 portability layer로 낮춤 |
| 큰 구현 요청에서 `plan-feature`가 계획만 만들고 멈출 가능성 | 계획은 구현 요청의 중간 단계이며 기본 종료 지점이 아님 | 명시적 plan-only가 아니고 gate/blocker가 없으면 같은 세션에서 implementation/evidence loop로 계속하도록 공통 계약과 Skill에 명시 |
| 검증을 마지막 테스트 한 번으로 해석할 위험 | 현재 agent/harness engineering은 실행→관찰→판정→수정→재검증 feedback loop가 핵심 | `Frame → Act → Observe → Evaluate → Adjust` bounded evidence loop를 `AGENTS.md`와 실행 Skill에 내장 |
| 모든 작업에 테스트가 필수라는 인상을 줄 수 있음 | 프로젝트마다 가장 강한 피드백 채널이 다름 | test/build/type/lint/runtime/browser/log/diff 등 실제 존재하는 strongest proportional evidence를 사용하도록 수정 |
| verifier 실패를 곧바로 제품 코드 결함으로 처리 | 실패가 specification/assumption, tooling/environment, flaky external dependency, observability 문제일 수 있음 | 다음 edit 전에 실패 유형을 분류하고 새 evidence로 diagnosis를 갱신하도록 implement/debug 규칙 강화 |
| 같은 실패 행동을 반복하는 무한 loop 위험 | 새 evidence 없이 동일 retry는 engineering progress가 아님 | retry는 hypothesis/implementation/scope/environment/verifier 중 하나를 바꾸거나 새 evidence를 만들어야 한다는 progress invariant와 stop condition 추가 |
| 반복 작업이 temporary script/debug log/stale note/duplicate helper를 남김 | 반복 agent work는 repository entropy를 키울 수 있음 | final diff hygiene·loop residue cleanup·durable learning 규칙 추가 |
| 같은 세션의 “계속해”에도 `continue-work` recovery가 개입 | current context가 충분하면 ACTIVE/checkpoint 재탐색은 불필요 | same-session은 현재 workflow 직접 계속, context loss/new session/cross-client에서만 durable recovery 사용 |
| 모든 plan/verification iteration이 ACTIVE/task가 될 위험 | 단일 세션 작업에 handoff bureaucracy 유발 | ACTIVE/task는 multi-session/multi-agent/cross-client/high-context에서만 사용하고 inner-loop iteration은 영속화하지 않음 |
| ACTIVE의 완료 task와 checkpoint status가 혼재 | 완료 작업을 새 agent가 활성 작업으로 오인할 수 있음 | checkpoint는 `completed` 상태 허용, 완료 시 ACTIVE row 제거, checkpoint는 필요 시 history로 보존 |
| Harness가 직접 참조하는 Core Skill도 UI에서 해제 가능 | AGENTS/behavior eval이 실제 ZIP에 없는 Skill을 지시할 수 있음 | 7개 lifecycle Core Skill을 고정하고 browser/git/security/fresh-review만 선택형으로 유지 |
| Antigravity `.agents/rules/project-core.md`를 필수 bridge처럼 취급 | `.agents/rules` Rule은 Manual/Always On/Model Decision/Glob activation이 client-local이고 active-directory AGENTS도 지원 | root `AGENTS.md`를 portable SoT로 확정하고 project-core는 optional thin note로 축소; AGENTS/DESIGN 중복 import 제거 |
| DESIGN.md starter의 `Status`, `Spacing and layout`, `Shapes and elevation` 등 비정규 heading | Google `design.md` alpha spec은 알려진 section order를 정의 | `Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts` 순서로 정렬, project token은 여전히 실제 근거가 있을 때만 채움 |
| validator가 MCP config가 영원히 비어 있어야 한다고 요구 | 사용자가 정상적으로 MCP를 연결한 adopted project도 실패함 | 기본 project mode는 valid non-empty MCP 허용, `--starter`에서만 downloaded starter의 empty-MCP invariant 강제 |
| Claude Skill sync가 삭제/rename된 canonical Skill의 mirror도 안전하게 자동 제거한다고 오해 가능 | unrelated Claude-only Skill을 보존하는 merge-only sync는 삭제 ownership을 안전하게 추론할 수 없음 | merge-only임을 명시하고 obsolete Harness-managed mirror는 의도적으로 제거하도록 안내 |
| 빈 native config starter를 기존 프로젝트에 그대로 덮어씀 | 실제 working config를 파괴할 수 있음 | starter와 live config 역할을 구분하고 기존 프로젝트에서는 merge하도록 UI/README/AGENTS에 명시 |
| Puppeteer, PostgreSQL, 구형 GitHub, 구형 Brave MCP를 현재 추천 서버로 안내 | MCP 공식 reference 저장소에서 archived 상태이거나 공식 제작사 대체 구현이 존재 | Puppeteer→Microsoft Playwright MCP, GitHub→GitHub 공식 서버, Brave→Brave 공식 서버로 교체. archived PostgreSQL reference server 제거 |
| `@modelcontextprotocol/server-fetch`를 `npx`로 실행 | 공식 Fetch reference server의 현재 안내는 Python `uvx mcp-server-fetch` | 명령 수정 |
| `@modelcontextprotocol/server-docker` | MCP 공식 서버 목록과 Docker 공식 안내에서 해당 패키지를 현재 공식 서버로 확인할 수 없음 | 목록에서 제거. Docker MCP Toolkit은 서버 패키지가 아닌 별도 gateway/catalog로 구분 |
| 루트 `mcp.json` 하나로 Claude·Codex·Antigravity 자동 호환 | 클라이언트별 설정 경로와 JSON/TOML 스키마가 다름 | Codex `.codex/config.toml`, Claude `.mcp.json`, Antigravity `.agents/mcp_config.json`으로 분리 |
| `.agents/skills`가 세 도구에서 100% 자동 공유 | 자동 발견 경로와 Skill 메타데이터 지원은 제품별로 다름 | Codex/Antigravity canonical `.agents/skills` + Claude native `.claude/skills` mirror 구조로 수정 |
| Harness에서 공통 원본과 클라이언트 설정이 명확히 분리되지 않음 | Codex·Claude Code·Antigravity는 프로젝트 지침·Skill·MCP의 네이티브 경로가 서로 다름 | `AGENTS.md`·`DESIGN.md`·`.agents/skills` 공통 원본 + 최소 native adapter 구조로 분리 |
| Harness가 선택한 MCP를 ZIP 안의 세 클라이언트 config에 자동 주입 | MCP 연결·인증·권한은 사용자 환경 소유 | 세 config는 starter에서 비워 두고 root `MCP_추천_목록.md`는 recommendation/reference만 제공 |
| 현재 연결된 Skill·MCP·내장 도구를 구분하지 않고 고정 capability를 가정 | 클라이언트와 세션마다 실제 capability가 다름 | `capability-router`는 실제 사용 가능한 capability만 고려하고 recommendation/config를 availability signal로 보지 않음 |
| 디자인 규칙이 `DESIGN.md`와 `docs/design/tokens.md`로 갈릴 수 있음 | 동일 토큰을 두 원본으로 유지하면 drift 위험 | root `DESIGN.md`만 canonical design contract, `docs/design/`은 supplemental implementation notes로 제한 |
| Google Stitch가 10초 안에 `DESIGN.md` 생성 | Google은 import/export 기능은 안내하지만 고정 생성 시간은 보증하지 않음 | 시간 보증 제거, 기능과 alpha status만 공식 근거로 설명 |
| Figma 수치를 주면 완벽 일치 | 브라우저·폰트·콘텐츠·반응형 조건에 따라 차이 발생 | 구현 참고자료로 수정하고 실제 화면 비교 필요 명시 |
| bcrypt “암호화”, 고정 salt 10, JWT 15분/7일을 보편 정답으로 제시 | 비밀번호는 해시해야 하며 알고리즘·비용·세션 정책은 현재 지침과 위협 모델에 따라 결정 | Argon2id 우선 검토, 세션/토큰 비교, CSRF/XSS·회전·취소·MFA 범위 포함 |
| Redis는 항상 1ms, 초당 수만 건 | Redis 공식 문서도 네트워크·명령·데이터·지속성·하드웨어에 따라 측정값이 달라짐을 경고 | 고정 수치 제거, 실제 워크로드 벤치마크와 애플리케이션 지연 측정 요구 |
| 테스트 100% 통과·0 error·무결점·버그 완벽 해결 | 테스트는 실행한 범위의 증거이며 미실행 경로의 무결함을 보증하지 않음 | actual evidence가 커버하는 범위만 주장하고 미검증 범위를 분리 |
| “실리콘밸리 전문가 공인”, “Gold Standard”, “Top 8 MCP” | 조사 방법·표본·공인 기관 근거 없음 | 프로젝트 제공 템플릿·공식 출처로 검증한 목록으로 명칭 변경 |
| OpenAI 공개 평가표의 8~10개 모델 중 4개 모델만 화면에 표시 | 원문에는 GPT-5.5, Claude Mythos·Opus 4.8, Gemini 비교값 등이 더 존재 | 전문 업무·코딩·컴퓨터 사용 분야별 원문 전체 열로 확장. 원문 미보고만 명시적으로 유지 |
| 벤치마크 이름과 숫자만 표시해 실제 시험 내용을 이해하기 어려움 | 서로 다른 `%`, Elo, Index, Reward를 같은 성공률처럼 오해할 위험 | 모든 비교 시험에 쉬운 설명·예시 과제·점수 읽는 법·하네스 주의사항 추가 |
| 최근 AI 비용 인하 소식을 모든 모델·모든 요청의 보편적 절감으로 해석 | 모델별 가격 인하, 캐시 적중, 한시 가격 종료, 도구 사용료는 서로 다른 조건 | OpenAI·Google·Anthropic 원문을 기준으로 가격 변화와 적용 조건을 별도 카드·출처 문서에 분리 |
| 가격 변경 후에도 과거 측정의 비용 지표를 최신 단가처럼 해석 | 시험 실행일, 결과 공개일, 사이트 확인일, 가격 기준일, 후속 가격 발표일은 서로 다름 | 비용 지표를 최신 가격으로 소급 재계산하지 않고 후속 가격 발표를 별도 날짜로 분리 |
| 공식 사양 표의 현재 단가만 보고 가격 변경 시점을 알기 어려움 | 가격 효력일과 모델 출시일을 혼동할 수 있음 | 현재/이전/예정 가격과 효력 날짜를 분리 |
| Claude Sonnet 5를 2026-08-31까지 $2/$10 도입 가격, 이후 $3/$15 예정으로 안내 | Anthropic 최신 릴리스 노트는 $2/$10이 2026-08-10부터 표준 가격이라고 명시 | $3/$15 예정 표기 제거, 표준 가격 전환 이력으로 수정 |
| Grok 4.6 가격을 모든 입력 길이에 $2/$6으로 계산 | 현재 SpaceXAI Pricing은 200K 미만/이상 가격 구간을 분리 | 장문 가격 구간 반영 |
| Grok 4.6 최대 출력을 `공식 문서 미기재`로 표시 | 공식 모델 사양은 `No text output limit`이라고 명시 | `텍스트 출력 제한 없음`으로 수정 |
| Gemini 3.7 Flash의 2026-08-13을 `문서 갱신`으로 표시 | Google 변경 기록은 2026-08-13을 GA로 명시 | `2026-08-13 (GA)`로 정밀화 |
| Artificial Analysis 값을 현재 페이지의 최신값처럼 읽을 여지 | 후속 갱신될 수 있는 시계열 관측값 | `2026-08-20 관측 스냅샷`으로 명시 |
| 커뮤니티에서 많이 언급된 AI 이슈를 실제 피해 규모와 동일시할 위험 | 게시물 수·추천 수는 관심도 보조 신호일 뿐 실제 영향률 아님 | 사용자 논의 규모·근거 수준·공식 영향 범위·확인 상태 분리 |
| 오래된 이슈를 오늘 다시 확인했다는 이유로 최신 이슈처럼 올라올 위험 | 재확인일과 사건 최신 업데이트일은 다른 의미 | `lastMajorUpdateAt` 정렬, `lastCheckedAt`은 정렬에 사용하지 않음 |

## Harness v2 구조 감사 결론

현재 generated structure는 역할을 다음과 같이 분리한다.

- `AGENTS.md`: canonical execution contract, scoped instructions, bounded evidence loop, security/verification/handoff rules
- `CLAUDE.md`: Claude thin import/adapter
- `DESIGN.md`: UI/design canonical contract
- `.agents/skills/`: Codex/Antigravity canonical Core + selected optional Skills
- `.claude/skills/`: Harness-managed Claude mirrors
- `.agents/rules/project-core.md`: optional Antigravity workspace Rule note; canonical policy 아님
- `.codex/config.toml`, `.mcp.json`, `.agents/mcp_config.json`: native config starters
- `docs/architecture/`: current architecture
- `docs/design/`: supplemental design implementation notes
- `docs/plans/`: durable implementation intent
- `docs/decisions/`: architecture decisions
- `docs/tasks/ACTIVE.md`: resumable work discovery index
- `docs/tasks/<task-id>.md`: checkpoint/current reality
- `docs/reference/`: durable source/reference notes
- `docs/ai-harness/`: compatibility/behavior/loop guidance
- `scripts/sync-ai-harness.mjs`: merge-only Claude Skill mirror helper
- `scripts/validate-ai-harness.mjs`: project/starter structural validator

새 폴더를 더 추가하는 것보다 현재 역할 경계를 유지하고 중복 source of truth를 만들지 않는 것이 적합하다고 판단했다.

## 사용한 1차 자료

### MCP와 AI 도구 설정 / Harness Engineering

- [OpenAI Codex AGENTS.md 가이드](https://developers.openai.com/codex/guides/agents-md): 프로젝트 지침 계층과 `AGENTS.md` discovery
- [OpenAI Codex Skills](https://developers.openai.com/codex/skills): `.agents/skills` 프로젝트 Skill 구조
- [OpenAI Codex MCP](https://developers.openai.com/codex/mcp): Codex MCP 구성과 project config
- [OpenAI Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/): user/model/tools를 조정하는 agent loop
- [OpenAI Harness Engineering](https://openai.com/index/harness-engineering/): repository-local feedback, agent legibility, quality gates와 entropy control
- [Claude Code memory/CLAUDE.md](https://code.claude.com/docs/en/memory): 프로젝트 지침과 `@AGENTS.md` import
- [Claude Code best practices](https://code.claude.com/docs/en/best-practices): explore/plan/code와 verification feedback
- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works): agentic context/action/verification loop
- [Claude Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview): 프로젝트 Skill 구조
- [Claude Code MCP](https://docs.anthropic.com/en/docs/claude-code/mcp): 프로젝트 `.mcp.json`과 보안 경계
- [Google Antigravity Rules](https://antigravity.google/docs/ide/rules/): workspace `.agents/rules/`와 Manual/Always On/Model Decision/Glob activation
- [Google Antigravity Skills](https://antigravity.google/docs/ide/skills/): workspace `.agents/skills/`와 `SKILL.md`
- [Google Antigravity MCP](https://antigravity.google/docs/mcp): workspace `.agents/mcp_config.json`과 `mcpServers`
- [Google Antigravity best practices](https://antigravity.google/docs/cli/best-practices/): local verification loop 권고
- [Gemini CLI migration / AGENTS compatibility](https://antigravity.google/docs/cli/gcli-migration/): active-directory AGENTS parsing
- [MCP 공식 reference servers](https://github.com/modelcontextprotocol/servers): maintained/archived reference 목록
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp): 공식 브라우저 MCP
- [GitHub 공식 MCP Server](https://github.com/github/github-mcp-server): GitHub MCP와 권한 안내
- [Context7 MCP](https://github.com/upstash/context7): 최신 라이브러리·SDK 문서 조회용 MCP
- [Brave 공식 Search MCP Server](https://github.com/brave/brave-search-mcp-server): 현재 npm 패키지와 stdio 실행 방식
- [Docker MCP Toolkit](https://docs.docker.com/ai/mcp-catalog-and-toolkit/get-started/): Docker Desktop catalog/gateway

### 디자인 도구

- [Google Labs DESIGN.md 공개](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/): DESIGN.md 공개와 Stitch import/export
- [Google DESIGN.md repository](https://github.com/google-labs-code/design.md): alpha 사양, YAML front matter, linter
- [Google DESIGN.md spec config](https://github.com/google-labs-code/design.md/blob/main/packages/cli/src/linter/spec-config.yaml): canonical section order와 aliases
- [Google Stitch AI-native UI design 업데이트](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/): 디자인 시스템 추출과 DESIGN.md import/export
- [Google Developers Stitch 소개](https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/): 텍스트·이미지 입력, 코드, Figma 이동

### 보안과 성능

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): 해시와 암호화 구분, Argon2id·scrypt·bcrypt 지침
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html): 인증·세션·MFA 원칙
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html): 오류 응답, 관리 endpoint, 감사 로그, 보안 헤더
- [Redis 공식 benchmark 가이드](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/): 측정 방법과 환경 변인

### AI 모델 가격·토큰 효율

- [OpenAI GPT-5.6 가격·속도 업데이트](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/)
- [OpenAI GPT-5.6 발표](https://openai.com/index/gpt-5-6/)
- [SpaceXAI Grok API Pricing](https://docs.x.ai/developers/pricing)
- [SpaceXAI Grok 4.6 릴리스 노트](https://docs.x.ai/developers/release-notes)
- [SpaceXAI Grok 4.6 모델 사양](https://docs.x.ai/developers/grok-4-6)
- [Gemini API 변경 기록](https://ai.google.dev/gemini-api/docs/changelog)
- [Gemini 3.7 Flash 최신 모델 안내](https://ai.google.dev/gemini-api/docs/latest-model)
- [Claude Platform 릴리스 노트](https://platform.claude.com/docs/en/release-notes/overview)

### AI 주요 이슈·변경사항

- 세부 근거와 판정 기준은 [major-issues-sources.md](major-issues-sources.md)에 기록한다.
- 커뮤니티 논의 규모는 실제 피해율로 사용하지 않으며, 회사가 공개한 영향 범위가 있을 때 별도 필드로 표시한다.
- 관계자 발언, 공식 Status, 공식 문서·공지의 근거 수준을 구분한다.

## 게시 전 체크리스트

1. 숫자마다 원문 링크, 모델/패키지 버전, 측정일, 조건이 있는가?
2. 제작사 주장과 독립 측정을 시각적으로 구분했는가?
3. 서로 다른 벤치마크·하네스 점수를 합산하거나 순위로 만들지 않았는가?
4. `100%`, `완벽`, `무결점`, `즉시`, `최고`, `공인`을 근거 없이 사용하지 않았는가?
5. 패키지와 설치 명령이 현재 공식 저장소에 존재하고 maintained 상태인가?
6. 인증정보·파일·브라우저·GitHub·DB 권한을 최소화하고 실제 외부 변경에 승인을 요구하는가?
7. test/build/type/lint/runtime/browser/log/diff evidence가 실제로 무엇을 검증했는지 범위를 구분했는가?
8. 법률·의료·금융·교육 정책은 최신 관할 공식 원문과 담당 전문가 검토를 요구하는가?
9. `@deprecated` 레거시 데이터나 화면을 근거 없이 다시 연결하지 않았는가?
10. 주요 이슈에서 사용자 논의 규모와 공식 영향 범위를 분리했는가?
11. 주요 이슈의 `lastCheckedAt`을 최신순 정렬 키로 잘못 사용하지 않았는가?
12. 사용자 자체 계산과 미확인 원인을 공식 사실처럼 표시하지 않았는가?
13. AI Harness에서 canonical Source of Truth와 client-native adapter를 구분했는가?
14. MCP starter를 live connection으로 오인하거나 기존 config에 blind overwrite하지 않는가?
15. capability-router가 실제 available capability만 고려하며 일반 verification failure를 중앙 router loop로 되돌리지 않는가?
16. 구현 요청에서 planning이 불필요한 stopping point가 되지 않는가?
17. 같은 failed action을 새 evidence 없이 반복하지 않는 bounded loop인가?
18. 같은 세션의 continuation과 durable recovery를 구분하는가?
19. 완료 task를 `docs/tasks/ACTIVE.md`에 남기지 않는가?
20. `DESIGN.md` starter가 현재 alpha canonical section order를 따르며 임의 디자인 값을 주입하지 않는가?
21. Antigravity optional Rule activation을 shared correctness의 전제로 삼지 않는가?
22. Core Skill을 제거해 계약이 존재하지 않는 Skill을 참조하는 package inconsistency를 만들지 않는가?

## 마지막 Harness 정적 감사 범위

이번 마지막 Loop/구조 보완 단계는 사용자의 요청에 따라 새 실행 테스트를 필수로 돌리지 않았다. 이전 validation-only PR의 성공은 해당 당시 revision에 대한 evidence이며 이후 source-level 정적 보완을 자동으로 증명한다고 소급 해석하지 않는다.

이번 단계에서 수행한 검토는 공식 현재 문서와 generated path/schema/section semantics 대조, generator source와 UI의 역할·문구 일관성 감사, PR changed-file 범위 확인, 발견된 구조 모순의 source-level correction이다. 실제 vendor model behavior는 generated `docs/ai-harness/behavior-evals.md`를 실제 Codex/Claude Code/Antigravity에서 표본 실행할 때 가장 강하게 검증할 수 있다.
