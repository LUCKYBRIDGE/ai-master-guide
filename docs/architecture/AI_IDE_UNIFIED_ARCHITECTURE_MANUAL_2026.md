# AI 코딩 도구용 프로젝트 지침 구성 가이드

> 검토일: 2026-08-20
>
> 대상: OpenAI Codex, Anthropic Claude Code, Google Antigravity
>
> 성격: 이 저장소가 제공하는 예시 구조. 업계 표준이나 도구 간 완전 호환 규격이 아닙니다.

## 핵심 원칙

프로젝트 규칙을 사람이 관리하는 공통 문서에 모으고, 각 AI 도구가 실제로 읽는 파일과 설정으로 연결합니다. 파일 이름이 같거나 Markdown으로 작성됐다는 이유만으로 모든 도구가 자동 발견·상속·실행한다고 가정하지 않습니다.

```text
project/
├── AGENTS.md                    공통 프로젝트 지침의 관리 원본
├── CLAUDE.md                    Claude Code용 import/추가 지침
├── .agents/
│   ├── mcp_config.json          Antigravity workspace MCP 설정 예시
│   ├── rules/                   도구가 지원할 때 사용하는 정책 원본
│   └── skills/                  이식 가능한 작업 절차 원본
├── .claude/
│   ├── rules/                   Claude Code 전용 규칙
│   └── skills/                  Claude Code가 지원하는 형식으로 설치한 스킬
└── docs/
    ├── architecture/            현재 시스템 구조
    ├── design/                  디자인 토큰과 화면 규칙
    ├── decisions/               ADR
    └── reference/               공식 근거와 도메인 자료
```

## 파일별 판단 기준

| 파일/경로 | 역할 | 주의점 |
|---|---|---|
| `AGENTS.md` | 빌드·테스트 명령, 범위, 안전 규칙의 관리 원본 | Codex 외 도구의 자동 지원은 각각 확인 |
| `CLAUDE.md` | Claude Code 전용 지침과 지원되는 경우 `@AGENTS.md` 참조 | 설치 버전의 import 문법 확인 |
| `.agents/mcp_config.json` | Antigravity workspace MCP 설정 예시 | 다른 클라이언트의 스키마와 경로는 다를 수 있음 |
| `.agents/skills/` | 반복 절차의 이식 가능한 원본 | 모든 도구가 같은 메타데이터·경로를 읽는 것은 아님 |
| `.env.example` | 필요한 환경변수 이름과 설명 | 실제 시크릿을 넣거나 Git에 커밋하지 않음 |
| `docs/` | 사람과 AI가 함께 보는 지속 문서 | 코드와 달라지면 신뢰할 수 없으므로 함께 갱신 |

## 기본 작업 템플릿

이 프로젝트의 ZIP 생성기는 기획, 최소 변경 구현, 디버깅, 코드 리뷰, 세션 요약, 테스트, 문서화, 도구 선택 예시를 제공합니다. “전문가 공인 8대 표준”이라는 근거는 없으며, 모두를 기본 설치해야 성능이 좋아진다는 비교 실험도 없습니다.

필요한 절차만 고르고 다음을 확인합니다.

1. 현재 클라이언트가 해당 스킬 경로와 메타데이터를 지원하는가?
2. 템플릿에 적힌 명령이 실제 `package.json`이나 빌드 파일에 존재하는가?
3. MCP 서버가 공식 제작사 또는 유지관리되는 구현인가?
4. 파일·브라우저·GitHub·DB 접근이 최소 권한인가?
5. 외부 상태 변경과 민감정보 접근 전에 사람의 승인을 받는가?

## MCP 설정 원칙

- MCP 프로젝트의 reference server는 학습·예시 구현이며 운영 적합성을 보증하지 않습니다.
- 보관된(archived) 패키지를 현재 권장 서버처럼 안내하지 않습니다.
- `npx`, `uvx`, Docker 등 실제 공식 실행 방식을 그대로 표시합니다.
- 클라이언트마다 JSON 스키마, 설정 경로, 환경변수 치환 방식이 다를 수 있습니다.
- 데이터베이스는 읽기 전용 계정, 네트워크 제한, 감사 로그, 백업을 우선합니다.
- GitHub는 공식 서버와 최소 권한 토큰 또는 지원되는 OAuth를 사용하고 쓰기 작업은 승인 후 수행합니다.

## 시작 프롬프트 예시

```markdown
이 저장소의 기존 파일과 프로젝트 지침을 먼저 조사해줘.

1. package.json과 CI 설정에서 실제 실행 가능한 개발·빌드·테스트 명령을 확인한다.
2. 현재 AI 클라이언트가 자동으로 읽는 규칙·스킬·MCP 경로를 공식 문서와 로컬 설정에서 확인한다.
3. 필요한 파일만 제안하고 기존 파일을 덮어쓰기 전에 diff를 보여준다.
4. 공식·유지관리되는 MCP만 사용하고 권한·인증·시크릿 처리 방식을 설명한다.
5. 실행한 검증 결과와 실행하지 못한 검증을 분리해서 보고한다.

테스트 성공을 무결성 보증으로 표현하지 말고, push·배포·외부 서비스 변경은 명시적 승인 없이 하지 마.
```

## 확인할 공식 자료

- [OpenAI 개발자 문서](https://developers.openai.com/)
- [Anthropic Claude Code 문서](https://code.claude.com/docs/en/overview)
- [Google Antigravity MCP 문서](https://antigravity.google/docs/mcp)
- [MCP 공식 reference servers](https://github.com/modelcontextprotocol/servers)
- [GitHub 공식 MCP server](https://github.com/github/github-mcp-server)
