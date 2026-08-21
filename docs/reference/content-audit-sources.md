# 웹 콘텐츠 정확성 감사 기록

## 감사 범위

- 검토일: 2026-08-21
- 대상: 현재 앱에서 접근 가능한 모델 비교, 디자인 사전 설계, 프로젝트 하네스, MCP, 개발 로드맵, 인프라 가이드와 공개 README/아키텍처 문서
- 원칙: 숫자와 순위는 측정 조건이 있는 원문만 사용하고, 제품 기능·명령·보안 지침은 공식 1차 자료를 우선한다.

모델 비교의 벤치마크별 원문과 해석 제한은 [model-comparison-sources.md](model-comparison-sources.md)에 별도로 기록한다.

### 공개 범위와 레거시 자료의 구분

- 현재 공개 앱은 `src/App.tsx`가 연결한 6개 화면만 렌더링한다.
- `reasoningEffortData.ts`, `missionsBenchmarkData.ts`, `benchmarkData.ts`, `usageQuotaData.ts` 등 미사용 레거시 모듈에는 재현 절차나 1차 출처가 없는 합성 수치가 남아 있다.
- 이 레거시 모듈은 현재 공개 화면의 근거로 사용하지 않으며 파일 상단에 `@deprecated` 게시 금지 경고를 추가했다. 향후 연결하려면 원시 결과, 프롬프트, 환경, 모델 버전, 날짜, 반복 횟수, 채점 기준을 먼저 공개해야 한다.

## 이번 감사에서 확인한 주요 오류와 조치

| 기존 내용 | 판정 | 조치 |
|---|---|---|
| Puppeteer, PostgreSQL, 구형 GitHub, 구형 Brave MCP를 현재 추천 서버로 안내 | MCP 공식 reference 저장소에서 archived 상태이거나 공식 제작사 대체 구현이 존재 | Puppeteer→Microsoft Playwright MCP, GitHub→GitHub 공식 서버, Brave→Brave 공식 서버로 교체. archived PostgreSQL reference server 제거 |
| `@modelcontextprotocol/server-fetch`를 `npx`로 실행 | 공식 Fetch reference server의 현재 안내는 Python `uvx mcp-server-fetch` | 명령 수정 |
| `@modelcontextprotocol/server-docker` | MCP 공식 서버 목록과 Docker 공식 안내에서 해당 패키지를 현재 공식 서버로 확인할 수 없음 | 목록에서 제거. Docker MCP Toolkit은 서버 패키지가 아닌 별도 gateway/catalog로 구분 |
| 루트 `mcp.json` 하나로 Claude·Codex·Antigravity 자동 호환 | 클라이언트별 설정 경로와 JSON 스키마가 다름 | Antigravity workspace 예시를 `.agents/mcp_config.json`으로 표시하고 다른 클라이언트는 변환·공식 문서 확인 필요 명시 |
| `.agents/skills`가 세 도구에서 100% 자동 공유 | 자동 발견 경로와 스킬 메타데이터 지원은 제품별로 다름 | 이식 가능한 절차 원본으로 설명하고 자동 호환 보증 제거 |
| Google Stitch가 10초 안에 `DESIGN.md` 생성 | Google은 `DESIGN.md` import/export 기능은 안내하지만 고정 생성 시간은 보증하지 않음 | 기능은 유지하고 시간 보증 제거, 공식 Google 출처 연결 |
| Figma 수치를 주면 완벽 일치 | 브라우저·폰트·콘텐츠·반응형 조건에 따라 차이가 발생 | 구현 참고자료로 수정하고 실제 화면 비교 필요 명시 |
| bcrypt “암호화”, 고정 salt 10, JWT 15분/7일을 보편 정답으로 제시 | 비밀번호는 해시해야 하며 알고리즘·비용·세션 정책은 현재 지침과 위협 모델에 따라 결정 | Argon2id 우선 검토, 세션/토큰 비교, CSRF/XSS·회전·취소·MFA 범위 포함 |
| Redis는 항상 1ms, 초당 수만 건 | Redis 공식 문서도 네트워크·명령·데이터·지속성·하드웨어에 따라 측정값이 달라짐을 경고 | 고정 수치 제거, 실제 워크로드 벤치마크와 애플리케이션 지연 측정 요구 |
| 테스트 100% 통과·0 error·무결점·버그 완벽 해결 | 테스트는 실행한 범위의 증거이며 미실행 경로의 무결함을 보증하지 않음 | 실제 명령·결과·수동 QA·미검증 범위를 기록하도록 수정 |
| “실리콘밸리 전문가 공인”, “Gold Standard”, “Top 8 MCP” | 조사 방법·표본·공인 기관 근거 없음 | 프로젝트 제공 템플릿·공식 출처로 검증한 목록으로 명칭 변경 |
| OpenAI 공개 평가표의 8~10개 모델 중 4개 모델만 화면에 표시 | 원문에는 GPT-5.5, Claude Mythos·Opus 4.8, Gemini 비교값 등이 더 존재 | 전문 업무·코딩·컴퓨터 사용 분야별 원문 전체 열로 확장. 원문 미보고만 명시적으로 유지 |
| 벤치마크 이름과 숫자만 표시해 실제 시험 내용을 이해하기 어려움 | 서로 다른 `%`, Elo, Index, Reward를 같은 성공률처럼 오해할 위험 | 모든 비교 시험에 쉬운 설명·예시 과제·점수 읽는 법·하네스 주의사항 추가 |
| 최근 AI 비용 인하 소식을 모든 모델·모든 요청의 보편적 절감으로 해석 | 모델별 가격 인하, 캐시 적중, 한시 가격 종료, 도구 사용료는 서로 다른 조건 | OpenAI·Google·Anthropic 원문을 기준으로 가격 변화와 적용 조건을 별도 카드·출처 문서에 분리. 캐시·Batch·Fast mode·grounding은 기본 단가 계산기에서 제외한다고 명시 |
| 가격 변경 후에도 과거 측정의 비용 지표를 최신 단가처럼 해석 | 시험 실행일, 결과 공개일, 사이트 확인일, 가격 기준일, 후속 가격 발표일은 서로 다를 수 있음 | 시험 실행일을 최우선 기준으로 표시하되 원문 미공개 시 그 사실을 명시. 비용 지표를 최신 가격으로 소급 재계산하지 않고, 후속 가격 발표는 날짜가 있는 별도 카드로 분리 |
| 공식 사양 표의 현재 단가만 보고 가격 변경 시점을 알기 어려움 | 가격 효력일, 이전 단가 종료일, 예정 단가 시작일을 모델 출시일과 혼동할 수 있음 | 각 공식 사양의 가격 칸에 `현재 적용`·`이전`·`예정·변경`과 날짜를 표기. 원문 미공개 시작일은 추정하지 않고 명시적으로 표시 |

## 사용한 1차 자료

### MCP와 AI 도구 설정

- [MCP 공식 reference servers](https://github.com/modelcontextprotocol/servers): 현재 유지관리 목록, archived 목록, reference implementation의 운영 주의사항
- [Microsoft Playwright MCP](https://github.com/microsoft/playwright-mcp): 공식 실행 명령과 Node.js 전제조건
- [GitHub 공식 MCP Server](https://github.com/github/github-mcp-server): 원격/로컬 서버, Docker 이미지, Claude 명령, 최소 권한·read-only/toolset 안내
- [Brave 공식 Search MCP Server](https://github.com/brave/brave-search-mcp-server): 현재 npm 패키지와 stdio 실행 방식
- [Claude Code MCP 문서](https://docs.anthropic.com/en/docs/claude-code/mcp): `claude mcp add`, `--env`, `--` 구분과 scope 안내
- [Google Antigravity MCP 문서](https://antigravity.google/docs/mcp): 전역·workspace 설정 경로, `mcpServers` 스키마, 권한과 인증
- [Docker MCP Toolkit](https://docs.docker.com/ai/mcp-catalog-and-toolkit/get-started/): Docker Desktop 기반 catalog와 gateway의 현재 성격

### 디자인 도구

- [Google Stitch AI-native UI design 업데이트](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/): URL 기반 디자인 시스템 추출과 `DESIGN.md` import/export
- [Google Developers의 Stitch 소개](https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/): 텍스트·이미지 입력, 프론트엔드 코드, Figma 이동 기능

### 보안과 성능

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): 해시와 암호화 구분, Argon2id·scrypt·bcrypt 지침
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html): 인증·세션·MFA·민감 계정 원칙
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html): 일반화된 오류 응답, 관리 endpoint, 감사 로그와 보안 헤더
- [Redis 공식 benchmark 가이드](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/benchmarks/): 측정 방법과 네트워크·파이프라이닝·지속성·하드웨어 변인의 영향

### AI 모델 가격·토큰 효율

- [OpenAI GPT-5.6 가격·속도 업데이트](https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/): Terra 20%, Luna 80% 인하와 현재 API 가격, Fast mode 조건
- [OpenAI GPT-5.6 발표](https://openai.com/index/gpt-5-6/): prompt cache read/write 요금 조건
- [Gemini 3.7 Flash 최신 모델 안내](https://ai.google.dev/gemini-api/docs/latest-model): 2026년 도입 가격과 2027년 표준 가격
- [Claude 최신 모델 개요](https://platform.claude.com/docs/en/about-claude/models/overview): Sonnet 5 도입 가격 만료일과 표준 가격

## 게시 전 체크리스트

1. 숫자마다 원문 링크, 모델/패키지 버전, 측정일, 조건이 있는가?
2. 제작사 주장과 독립 측정을 시각적으로 구분했는가?
3. 서로 다른 벤치마크·하네스 점수를 합산하거나 순위로 만들지 않았는가?
4. `100%`, `완벽`, `무결점`, `즉시`, `최고`, `공인`을 근거 없이 사용하지 않았는가?
5. 패키지와 설치 명령이 현재 공식 저장소에 존재하고 maintained 상태인가?
6. 인증정보·파일·브라우저·GitHub·DB 권한을 최소화하고 실제 외부 변경에 승인을 요구하는가?
7. 테스트 성공과 미검증 범위를 분리했는가?
8. 법률·의료·금융·교육 정책은 최신 관할 공식 원문과 담당 전문가 검토를 요구하는가?
9. `@deprecated`로 표시된 레거시 데이터나 화면을 다시 연결하지 않았는가?
