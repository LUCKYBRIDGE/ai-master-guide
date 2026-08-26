# AI 코딩 도구용 프로젝트 Harness 구성 가이드

> 검토일: 2026-08-26
>
> 대상: OpenAI Codex, Anthropic Claude Code, Google Antigravity
>
> 성격: 이 저장소의 Portable AI Development Harness v2 설계 설명. 업계 표준이나 도구 간 완전 호환 규격이 아니다.

## 1. 기본 원칙

Harness v2는 **current-client first**를 기본 경로로 한다. 사용자가 현재 쓰는 AI 클라이언트 안에서 계획, 구현, 디버깅, 검토, 검증을 이어가며, 다른 클라이언트로의 이동은 사용자가 명시적으로 요청한 경우에만 수행한다.

공통 Markdown 파일이 존재한다는 이유만으로 모든 클라이언트가 같은 경로를 자동 발견하거나 같은 기능을 제공한다고 가정하지 않는다. 프로젝트 규칙은 관리 원본을 두되, 실제 자동 발견 경로·MCP 설정·권한은 각 제품의 현재 공식 문서와 설치 환경에서 확인한다.

## 2. 저장소용 구조

```text
project/
├── AGENTS.md                    프로젝트 공통 실행 계약
├── CLAUDE.md                    Claude Code용 얇은 어댑터
├── .agents/
│   ├── rules/                   프로젝트 규칙 보조 문서
│   └── skills/                  Core 6 canonical procedures
├── .claude/
│   ├── rules/                   Claude 전용 규칙
│   └── skills/                  Core 6 mirrors
└── docs/
    ├── architecture/            현재 구조와 경계
    ├── design/                  디자인 규칙
    ├── decisions/               ADR
    ├── tasks/                   장기 작업의 durable state가 필요할 때 사용
    └── reference/               공식 근거와 검증 기록
```

이 저장소 자체에는 live MCP server 설정을 커밋하지 않는다. MCP 추천, 설치 예시, 실제 연결 상태는 서로 다른 개념이며 자격 증명은 저장소에 넣지 않는다.

## 3. Core 6

| Skill | 역할 |
|---|---|
| `plan-feature` | 요구사항·영향 범위·위험·검증 기준을 코드와 함께 조사한다. |
| `continue-work` | 세션을 넘어 이어갈 때 durable state를 실제 저장소 상태와 대조한다. |
| `implement-feature` | 가장 작은 coherent change를 만들고 가까운 verifier로 반복 검증한다. |
| `debug` | 재현 가능한 증거에서 원인을 좁히고 최소 수정 후 재검증한다. |
| `code-review` | 정확성·회귀·보안·성능·접근성·문서·diff 범위를 검토한다. |
| `verify-release` | 정확한 revision을 대상으로 production build와 release evidence를 확인한다. |

Optional skill은 반복되는 실제 필요가 있을 때만 추가한다. `capability-router`가 있더라도 현재 클라이언트 내부 capability 선택을 돕는 용도이며 다른 AI 클라이언트를 자동 선택하지 않는다.

## 4. MCP와 외부 capability

- recommendation은 availability가 아니다.
- starter config는 비어 있는 것이 기본이며 기존 프로젝트에서는 덮어쓰지 않고 merge/diff한다.
- 서버의 유지관리 상태, 실행 명령, 권한 범위, 인증 방식을 현재 공식 자료에서 확인한다.
- 계정 인증, 토큰, workspace trust, 쓰기 권한은 client-local 상태로 다룬다.
- 브라우저·GitHub·DB 등 외부 write capability는 최소 권한에서 시작하고 사용자가 요청한 범위만 사용한다.

과거 `@modelcontextprotocol/server-puppeteer`를 pre-populated한 root `mcp.json`처럼 특정 서버가 연결돼 있다고 오해하게 만드는 설정은 Harness v2의 기본값으로 사용하지 않는다.

## 5. 기존 프로젝트 adoption

1. `AGENTS.md`, package/build 설정, CI, docs, 기존 client config를 먼저 읽는다.
2. generic starter와 기존 파일의 diff를 만든다.
3. 실제 프로젝트의 build command, content policy, deployment approval, 보안 경계를 보존한다.
4. 충돌하는 legacy procedure만 교체하고 unrelated client-only 설정은 유지한다.
5. 설정 파일의 존재와 실제 capability 연결 상태를 구분한다.
6. 변경 후 존재하는 build/runtime/browser 검증을 수행하고 실행하지 못한 검증을 명시한다.

## 6. Release evidence

Harness 파일의 존재만으로 동작 호환성을 입증하지 않는다. 이 저장소는 production build, 대표 UI 흐름, ZIP 생성, relative asset path, console/page error, generated output 정책, secret scan, final diff를 가능한 범위에서 실제 evidence로 확인한다. 3-client replay는 선택적 진단이며 필수 release gate가 아니다.

## 공식 확인 자료

- OpenAI Codex: https://developers.openai.com/codex/
- Anthropic Claude Code: https://code.claude.com/docs/en/overview
- Google Antigravity: https://antigravity.google/
- Model Context Protocol: https://modelcontextprotocol.io/
- GitHub MCP server: https://github.com/github/github-mcp-server
