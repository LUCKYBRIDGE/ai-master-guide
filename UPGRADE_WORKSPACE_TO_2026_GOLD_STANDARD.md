# 🏛️ 2026 AI 개발 환경 마이그레이션 & 자동 업그레이드 마스터 명세서
> File Name: `UPGRADE_WORKSPACE_TO_2026_GOLD_STANDARD.md`
> Target Location: `C:\ai_dev\` (또는 개별 프로젝트 루트)
> Target Engines: OpenAI Codex · Claude Code · Google Antigravity · Cursor

---

## 🤖 AI 에이전트 실행 지침 (Agent Execution Instructions)

당신은 최고 수준의 AI 에이전트 시스템 아키텍트입니다.  
사용자가 **"이 파일(`UPGRADE_WORKSPACE_TO_2026_GOLD_STANDARD.md`)을 읽고 작업해줘"**라고 요청하면, 아래의 **5단계 마이그레이션 절차**를 한 단계씩 안전하게 자율 실행하십시오.

---

### 🛡️ 절대 안전 원칙 (Safety First)
1. **데이터 100% 보존**: 기존 프로젝트의 소스코드(`src/`), `.git/` 이력, 패키지 파일(`package.json`)은 절대 삭제하거나 훼손하지 않는다.
2. **무중단 점진적 마이그레이션**: 열려 있는 터미널이나 IDE가 깨지지 않도록 안전하게 파일을 생성 및 재배치한다.
3. **0에러 빌드 검증**: 모든 작업 완료 후 각 프로젝트에서 `npm run build`를 실행하여 0에러임을 최종 증명한다.

---

## 📋 5단계 자동 마이그레이션 실행 절차

### [1단계] 글로벌 사용자 프로필 점검 및 생성
- 사용자 홈 디렉토리(`~/.claude/CLAUDE.md` 또는 `%USERPROFILE%\.claude\CLAUDE.md`)를 확인한다.
- 파일이 없다면 아래 내용으로 1회 생성한다:
```markdown
# Global Claude Profile (~/.claude/CLAUDE.md)
- 기본 응답 언어: 한국어로 친절하고 명확하게 작성할 것.
- 개발 원칙: 프로젝트 루트의 AGENTS.md 및 .agents/skills/ 를 최우선 준수할 것.
- Git 규칙: 커밋 메시지는 Conventional Commits (feat:, fix:, refactor:) 규칙을 따를 것.
```

---

### [2단계] 최상위 디렉토리 구조 표준화 (`apps` & `projects`)
- 현재 작업 디렉토리가 `C:\ai_dev\` 최상위인 경우:
  - 기존에 `C:\ai_dev\apps` 가 있고 `C:\ai_dev\projects` 가 없다면:
    - 진행 중인 세션 경로 호환을 위해 Junction 또는 폴더 이동을 안전하게 수행한다:
    ```powershell
    # Windows Junction 생성 (apps와 projects 두 경로 동시 호환)
    if (Test-Path "C:\ai_dev\apps") {
        if (-not (Test-Path "C:\ai_dev\projects")) {
            New-Item -ItemType Junction -Path "C:\ai_dev\projects" -Target "C:\ai_dev\apps"
        }
    }
    ```

---

### [3단계] 각 프로젝트 폴더 탐색 및 정갈한 루트(Clean Root) 구성
`projects/` (또는 `apps/`) 내부의 모든 프로젝트 디렉토리(예: `STUDY`, `math-worksheet` 등)를 탐색하여 각각 아래 표준 파일들을 주입한다:

#### 1. 루트 최상위 헌법: `AGENTS.md`
```markdown
# AGENTS.md - Unified Project Constitution & Single Source of Truth
> Standard AI Engines: OpenAI Codex · Claude Code · Google Antigravity (Universal Tri-IDE Support)

## 1. Essential Commands
- Dev Server: `npm run dev`
- Verification Build: `npm run build`
- Unit Tests: `npm test`
- Lint & Format: `npm run lint`

## 2. Development Principles & Safety Rules
- **Smallest Coherent Change**: Prefer small, focused changes over broad speculative rewrites.
- **Component & Pattern Reuse**: Inspect existing components and utilities before creating new ones.
- **Single Source of Truth**: Durable project instructions live centrally in `AGENTS.md`.
- **Zero Regression**: Verify behavior, not just compilation. Never delete working functionality.
- **Autonomous Execution**: Allowed to edit code, install packages (`npm i`), and run builds/tests.
- **User Approval Required**: Database destruction commands (`DROP TABLE`), force push (`git push -f`).

## 3. Documentation & Design Architecture
- Design System: Follow `docs/design/tokens.md` and `.agents/rules/ui-design.md`.
- Architecture & ADRs: Persistent knowledge lives under `docs/architecture/` and `docs/decisions/`.
- Active Skills: Reusable procedural workflows live under `.agents/skills/`.

## 4. Definition of Done
A task is complete ONLY when:
1. The requested behavior is fully implemented.
2. `npm run build` passes with 0 TypeScript/Lint errors.
3. Tests pass and persistent docs under `docs/` are updated.
```

#### 2. 클로드 전용 포인터: `CLAUDE.md`
```markdown
@AGENTS.md

# Claude Code Specific Instructions
Follow the shared project instructions in `AGENTS.md`.
- Follow Claude-specific rules under `.claude/rules/`.
- Use shared procedural skills under `.agents/skills/` or `.claude/skills/`.
- Consult persistent project documentation under `/docs`.
```

#### 3. 외부 도구 연결 명세: `mcp.json` & `.env.example`
```json
{
  "mcpServers": {
    "puppeteer-browser": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "description": "브라우저 화면 캡처 및 레이아웃 자동 검사"
    }
  }
}
```

---

### [4단계] 8대 핵심 스킬 및 안전 규칙 폴더 구축

각 프로젝트 폴더 안에 다음 서브디렉토리와 파일들을 구성한다:

#### 1. `.agents/rules/`
- `.agents/rules/ui-design.md`: UI 인터랙션 및 반응형 규격 (`docs/design/tokens.md` 참조)
- `.agents/rules/testing.md`: TDD 및 빌드 0에러 검증 정책
- `.agents/rules/security_policy.md`: 비밀키(.env) 코드 하드코딩 금지 정책
- `.agents/rules/tool-selection.md`: 스킬 및 MCP 자동 라우팅 정책

#### 2. `.agents/skills/` (전문가 8대 핵심 필수 팩)
- `.agents/skills/plan-feature/SKILL.md` (사전 기획 & 리스크 분석)
- `.agents/skills/implement-feature/SKILL.md` (최소 변경 안전 구현 & 빌드 검증)
- `.agents/skills/debug/SKILL.md` (Root Cause 분석 & 자가 치유)
- `.agents/skills/code-review/SKILL.md` (10단계 다차원 정밀 리뷰)
- `.agents/skills/session-context-compactor/SKILL.md` (Claude 세션 압축 & 토큰 다이어트)
- `.agents/skills/tdd-test-generator/SKILL.md` (TDD 선행 테스트 생성기)
- `.agents/skills/skill-mcp-router/SKILL.md` (지능형 도구 자동 라우터)

#### 3. `.claude/` (Claude Code 전용 공간)
- `.claude/rules/frontend.md` (Claude CLI 전용 동작 오버라이드)
- `.claude/skills/README.md` (Claude CLI 전용 슬래시 명령어 저장소)

#### 4. `docs/` (영구 지식 보관소)
- `docs/architecture/overview.md` (시스템 구조 및 모듈 책임도)
- `docs/design/tokens.md` (디자인 시스템 토큰: 브랜드 색상 #3182F6, 폰트, 4px 여백 그리드)
- `docs/plans/`, `docs/tasks/`, `docs/decisions/`, `docs/reference/`

---

### [5단계] 무결성 검증 및 빌드 테스트
1. 각 프로젝트 폴더에서 `npm run build`를 실행하여 TypeScript / Vite 번들링 0에러를 확인한다.
2. 마이그레이션된 폴더 구조 및 변경 내역을 요약하여 사용자에게 보고한다.
