# 🏛️ 2026 AI 개발 환경 마이그레이션 & 자동 업그레이드 마스터 명세서 (World-Class Edition)
> Architecture: OpenAI Codex · Claude Code · Google Antigravity · Cursor (Universal Tri-IDE Standard)
> Target Scope: `C:\ai_dev\` (전체 작업실) 및 `projects/` 하위 모든 프로젝트
> Execution Reliability: 100% Idempotent (멱등성 보장: 여러 번 실행해도 무결성 유지)

---

## 🤖 AI 에이전트 자율 실행 지침 (Autonomous Agent Directives)

당신은 세계 최고 수준의 AI 에이전트 시스템 아키텍트(Principal System Architect)입니다.  
사용자가 **"이 파일(`UPGRADE_WORKSPACE_TO_2026_GOLD_STANDARD.md`)을 읽고 작업해줘"**라고 요청하면, 아래의 **5대 안전 원칙**과 **5단계 실행 절차**에 따라 작업 공간을 완벽하게 마이그레이션하고 검증하십시오.

---

### 🛡️ 5대 엔지니어링 안전 원칙 (Absolute Safety Principles)
1. **데이터 100% 보존 (Zero Data Loss)**: 기존 프로젝트의 소스코드(`src/`), 비즈니스 로직, `.git/` 커밋 이력은 절대 삭제하거나 임의로 수정하지 않는다.
2. **멱등성(Idempotency) 보장**: 이 작업은 여러 번 반복 실행해도 기존 코드를 오염시키지 않고 항상 동일한 최적의 상태로 수렴해야 한다.
3. **스택 자율 인식(Tech-Stack Auto-Detection)**: `package.json`, `pyproject.toml`, `requirements.txt` 등을 탐색하여 프로젝트별 빌드/테스트 명령어(`npm run build`, `pytest` 등)를 `AGENTS.md`에 맞춤형으로 기입한다.
4. **보안 격리 (.gitignore Hygiene)**: `.env`, 세션 로그, API 시크릿 키가 깃허브에 커밋되지 않도록 `.gitignore` 무결성을 검증한다.
5. **0에러 빌드 증명 (Proof of Build)**: 모든 재배치 완료 후 각 프로젝트에서 실제 빌드 명령을 실행해 0건의 오류(0 Errors)를 증명한다.

---

## 📋 5단계 정밀 마이그레이션 실행 절차

### [1단계] 글로벌 사용자 프로필 점검 및 생성
- 사용자 홈 디렉토리(`~/.claude/CLAUDE.md` 또는 `%USERPROFILE%\.claude\CLAUDE.md`)를 확인한다.
- 파일이 없다면 아래 내용으로 1회 안전하게 생성한다 (이미 있다면 사용자 고유 설정을 보존):
```markdown
# Global Claude Profile (~/.claude/CLAUDE.md)
- 기본 응답 언어: 모든 설명과 답변은 한국어로 친절하고 명확하게 작성할 것.
- 개발 원칙: 프로젝트 루트의 AGENTS.md 및 .agents/skills/ 를 최우선 준수할 것.
- Git 규칙: 커밋 메시지는 Conventional Commits (feat:, fix:, refactor:) 규칙을 따를 것.
```

---

### [2단계] 최상위 디렉토리 토폴로지 표준화 (`apps` & `projects`)
- 현재 작업 디렉토리가 `C:\ai_dev\` 최상위인 경우:
  - 기존에 `apps/` 가 있고 `projects/` 가 없다면:
    - 진행 중인 세션 경로 호환 및 무중단 전환을 위해 Windows Junction 또는 폴더 연동을 수행한다:
    ```powershell
    # Windows Junction 생성 (apps와 projects 두 경로 동시 100% 호환)
    if (Test-Path "C:\ai_dev\apps") {
        if (-not (Test-Path "C:\ai_dev\projects")) {
            New-Item -ItemType Junction -Path "C:\ai_dev\projects" -Target "C:\ai_dev\apps"
        }
    }
    ```

---

### [3단계] 각 프로젝트 탐색 및 정갈한 루트(Clean Root) 구축
`projects/` (또는 `apps/`) 내부의 모든 개별 프로젝트 디렉토리(예: `STUDY`, `new-project` 등)를 탐색하여 각각 다음을 표준화한다:

#### 1. 루트 `AGENTS.md` (프로젝트 단일 진실 공급원 헌법)
- 기술 스택을 자동 분석하여 해당 프로젝트에 맞는 빌드/테스트 명령을 반영한다:
```markdown
# AGENTS.md - Unified Project Constitution & Single Source of Truth
> Standard AI Engines: OpenAI Codex · Claude Code · Google Antigravity (Universal Tri-IDE Support)

## 1. Essential Commands
- Dev Server: `npm run dev` (또는 프로젝트 맞춤 명령)
- Verification Build: `npm run build`
- Unit Tests: `npm test`
- Lint & Format: `npm run lint`

## 2. Development Principles & Safety Rules
- **Smallest Coherent Change**: Prefer small, focused changes over broad speculative rewrites.
- **Component & Pattern Reuse**: Inspect existing components and utilities before creating new ones.
- **Single Source of Truth**: Durable project instructions live centrally in `AGENTS.md`. Do not duplicate.
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
3. Tests pass and persistent docs under `docs/` are updated if persistent behavior changed.
```

#### 2. 루트 `CLAUDE.md` (`@AGENTS.md` 임포트 포인터)
```markdown
@AGENTS.md

# Claude Code Specific Instructions
Follow the shared project instructions in `AGENTS.md`.
- Follow Claude-specific rules under `.claude/rules/`.
- Use shared procedural skills under `.agents/skills/` or `.claude/skills/`.
- Consult persistent project documentation under `/docs`.
```

#### 3. 외부 도구 연결 명세: `mcp.json` & `.env.example`
- `mcp.json`에 Puppeteer 브라우저 등 프로젝트 표준 MCP 서버를 등록한다.
- `.env.example`을 생성하고 `.gitignore`에 `.env`가 등록되어 있는지 검증한다.

---

### [4단계] 8대 핵심 스킬, 규칙 및 영구 지식 베이스 구축

각 프로젝트 폴더 안에 다음 표준 디렉토리와 파일들을 구성한다:

#### 1. `.agents/rules/` (3대 AI 공용 안전 정책)
- `ui-design.md`: UI 인터랙션 및 반응형 규격 (`docs/design/tokens.md` 참조)
- `testing.md`: TDD 및 빌드 0에러 검증 정책
- `security_policy.md`: 비밀키(.env) 코드 하드코딩 금지 정책
- `tool-selection.md`: 스킬 및 MCP 자동 라우팅 정책

#### 2. `.agents/skills/` (전문가 공인 8대 핵심 필수 팩)
- `plan-feature/SKILL.md` (사전 기획 & 리스크 분석)
- `implement-feature/SKILL.md` (최소 변경 안전 구현 & 빌드 검증)
- `debug/SKILL.md` (Root Cause 분석 & 자가 치유)
- `code-review/SKILL.md` (10단계 다차원 정밀 리뷰)
- `session-context-compactor/SKILL.md` (Claude 세션 압축 & 토큰 다이어트)
- `tdd-test-generator/SKILL.md` (TDD 선행 테스트 생성기)
- `skill-mcp-router/SKILL.md` (지능형 도구 자동 라우터)
- *(기존에 존재하던 맞춤형 도메인 스킬은 안전하게 보존)*

#### 3. `.claude/` (Claude Code 전용 공간)
- `.claude/rules/frontend.md` (Claude CLI 전용 동작 오버라이드)
- `.claude/skills/README.md` (Claude CLI 슬래시 명령어 저장소)

#### 4. `docs/` (영구 지식 보관소)
- `docs/architecture/overview.md` (시스템 구조 및 모듈 책임도)
- `docs/design/tokens.md` (디자인 시스템 토큰: 브랜드 색상 #3182F6, 폰트, 4px 여백 그리드)
- `docs/plans/`, `docs/tasks/`, `docs/decisions/`, `docs/reference/`

---

### [5단계] 무결성 검증 및 빌드 테스트 (Final Proof)
1. 각 프로젝트 폴더에서 `npm run build` (또는 해당 스택의 빌드/테스트 명령)를 실행하여 번들링 0에러를 증명한다.
2. 완료 후 다음 항목을 포함한 최종 요약 리포트를 사용자에게 출력한다:
   - [x] 글로벌 프로필(`~/.claude/CLAUDE.md`) 상태
   - [x] 최상위 디렉토리(`projects/`) 호환 상태
   - [x] 처리된 프로젝트 목록 및 각 프로젝트별 빌드 성공 여부
   - [x] 장착된 8대 핵심 스킬 및 문서 구조 현황
