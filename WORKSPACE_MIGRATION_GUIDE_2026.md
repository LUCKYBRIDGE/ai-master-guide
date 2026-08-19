# 🏛️ 2026 AI IDE 통합 골드 스탠다드 작업 공간 마이그레이션 가이드
> Target Engines: OpenAI Codex · Claude Code · Google Antigravity · Cursor  
> Base Directory: `C:\ai_dev\projects\` & `~/.claude/`

이 문서는 사용자의 로컬 컴퓨터 환경을 **[글로벌 프로필 vs 프로젝트 완전 독립체(Clean Root & Self-Contained)] 2026 최종 권장 아키텍처**로 안전하게 재배치하고 표준화하기 위한 마스터 실행 가이드입니다.

---

## 📂 1. 목표 디렉토리 아키텍처 구조 (Clean Root Standard)

```text
C:\Users\<사용자명>\                      [🌐 내 PC 홈 디렉토리]
└── .claude\
    └── CLAUDE.md                       [글로벌 개인 선호도: 한국어 답변, 친절한 어조]

C:\ai_dev\                              [🌐 로컬 최상위 개발 작업실]
└── projects\                           [📂 모든 개별 프로젝트 저장소 모음]
    │
    ├── STUDY\                          [🎯 프로젝트 A: AI 마스터 가이드 웹앱 - Clean Root]
    │   ├── AGENTS.md                   (1. 프로젝트 단일 진실 공급원 헌법)
    │   ├── CLAUDE.md                   (2. @AGENTS.md 임포트 포인터)
    │   ├── mcp.json                    (3. 외부 도구 연결 명세서)
    │   ├── .env.example                (4. 환경변수 및 비밀키 템플릿)
    │   │
    │   ├── .agents/                    (Antigravity & Codex & Claude 공용)
    │   │   ├── rules/                  (ui-design.md, testing.md, security_policy.md)
    │   │   └── skills/                 (전문가 8대 핵심 스킬 + 선택 스킬)
    │   │       ├── plan-feature/SKILL.md
    │   │       ├── implement-feature/SKILL.md
    │   │       ├── debug/SKILL.md
    │   │       ├── code-review/SKILL.md
    │   │       ├── session-context-compactor/SKILL.md
    │   │       ├── tdd-test-generator/SKILL.md
    │   │       └── skill-mcp-router/SKILL.md
    │   │
    │   ├── .claude/                    (Claude Code 전용 공간)
    │   │   ├── rules/                  (frontend.md - Claude CLI 전용 동작 오버라이드)
    │   │   └── skills/                 (Claude CLI 전용 슬래시 명령어/스킬 저장소)
    │   │
    │   └── docs/                       (영구 지식 & 디자인 보관소)
    │       ├── architecture/overview.md
    │       ├── design/tokens.md        [🎨 디자인 시스템 토큰 규격서]
    │       ├── plans/
    │       ├── tasks/
    │       ├── decisions/
    │       └── reference/
    │
    └── <기타 프로젝트 폴더>\            [🎯 프로젝트 B, C...]
```

---

## ⚡ 2. AI에게 붙여넣을 마스터 실행 프롬프트 (Master Prompt)

다른 AI(Claude Code, Antigravity, Codex 등)를 켜고 아래 블록 전체를 복사해서 붙여넣으면, AI가 이 문서를 읽고 컴퓨터 폴더 체계를 100% 안전하게 자동 정리합니다:

```markdown
당신은 세계 최고 수준의 AI 에이전트 시스템 아키텍트입니다.
현재 내 컴퓨터(`C:\ai_dev\`)의 폴더 체계와 프로젝트들을 2026 글로벌 골드 스탠다드 아키텍처에 맞춰 완벽하게 마이그레이션 및 재구축해주세요.

[필수 마이그레이션 지침]
1. 기존에 `C:\ai_dev\apps\` 폴더가 존재한다면, 데이터 유실 없이 안전하게 `C:\ai_dev\projects\` 로 이동/이름 변경할 것.
2. 내 PC 홈 디렉토리(`~/.claude/CLAUDE.md`)에 글로벌 개인화 규칙("모든 설명과 답변은 한국어로 친절하게 작성", "Git 커밋 규칙 준수")을 1회 생성할 것.
3. `C:\ai_dev\projects\` 아래의 각 개별 프로젝트 폴더(예: `STUDY`)를 정갈한 최상위 루트(Clean Root)를 가진 100% 완전 독립체(Self-Contained Unit)로 구성할 것:
   - 루트에는 오직 `AGENTS.md` (단일 진실 공급원 헌법)와 `CLAUDE.md` (`@AGENTS.md` 포인터), `mcp.json`, `.env.example` 만 둘 것.
   - 디자인 시스템 토큰은 루트에 방치하지 말고 `docs/design/tokens.md` 및 `.agents/rules/ui-design.md` 에 체계적으로 배치할 것.
   - `.agents/rules/` (ui-design.md, testing.md, security_policy.md)
   - `.agents/skills/` (plan-feature, implement-feature, debug, code-review, session-context-compactor, tdd-test-generator, skill-mcp-router)
   - `.claude/rules/` (frontend.md) & `.claude/skills/` (Claude CLI 슬래시 커맨드 저장소)
   - `docs/` (architecture/overview.md, design/tokens.md, plans/, tasks/, decisions/, reference/)
4. 상위 폴더(`C:\ai_dev\`)에 불필요한 규칙을 두지 않고, 각 프로젝트가 스스로 독립 빌드 및 테스트(`npm run build`)가 가능하도록 무결성을 검증하고 결과를 요약 보고해줄 것.
```

---

## 🛠️ 3. 수동/스크립트로 1초 만에 폴더 이름 변경하는 법 (PowerShell)

만약 터미널에서 기존 `apps/` 폴더를 `projects/` 로 직접 즉시 바꾸고 싶으시다면 PowerShell에서 아래 한 줄만 실행하시면 됩니다:

```powershell
# 1. apps 폴더를 projects 폴더로 안전하게 이름 변경 (데이터 100% 보존)
if (Test-Path "C:\ai_dev\apps") {
    Rename-Item -Path "C:\ai_dev\apps" -NewName "projects"
    Write-Host "✅ C:\ai_dev\apps -> C:\ai_dev\projects 이름 변경 완료!" -ForegroundColor Green
}
```

---

## 📋 4. 각 프로젝트별 체크리스트 (Clean Root Standard)
새 프로젝트를 만들거나 기존 프로젝트를 점검할 때 다음 6가지만 확인하면 100% 완벽합니다:
- [ ] 루트에 `AGENTS.md`가 있고 빌드 명령어(`npm run build` 등)가 적혀있는가?
- [ ] 루트에 `CLAUDE.md`가 있고 `@AGENTS.md`를 임포트하고 있는가?
- [ ] `.claude/` 아래에 `rules/`와 `skills/` 디렉토리가 모두 구성되어 있는가?
- [ ] 디자인 토큰이 `docs/design/tokens.md` 및 `.agents/rules/ui-design.md`에 정갈하게 보관되어 있는가?
- [ ] `.agents/skills/` 폴더에 8대 핵심 스킬(`plan-feature`, `implement-feature` 등)이 들어있는가?
- [ ] `docs/architecture/` 폴더가 존재하는가?
- [ ] `npm run build`를 실행했을 때 에러가 0건인가?
