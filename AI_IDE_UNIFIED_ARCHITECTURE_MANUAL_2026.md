# 📘 2026 AI IDE 통합 아키텍처 & 하네스 엔지니어링 마스터 핸드북
> **Standard Version**: 2026 Universal Tri-IDE Gold Standard  
> **Target AI Engines**: OpenAI Codex · Anthropic Claude Code · Google Antigravity · Cursor  
> **Base Environment**: `C:\ai_dev\projects\<프로젝트명>\` & `~/.claude/`  
> **Core Principle**: Single Source of Truth (단일 진실 공급원) · Clean Root · Zero Rule Drift

---

## 📑 목차 (Table of Contents)
1. [아키텍처 핵심 철학 & 전체 토폴로지](#1-아키텍처-핵심-철학--전체-토폴로지)
2. [표준 디렉토리 구조 & 파일별 역할 총람](#2-표준-디렉토리-구조--파일별-역할-총람)
3. [전문가 공인 8대 핵심 필수 스킬 (Core Essentials)](#3-전문가-공인-8대-핵심-필수-스킬-core-essentials)
4. [에이전트(Agent) · MCP · 스킬(Skill) 3총사 개념 정리](#4-에이전트agent--mcp--스킬skill-3총사-개념-정리)
5. [단일 AI 대비 통합 구조의 압도적 효율성](#5-단일-ai-대비-통합-구조의-압도적-효율성)
6. [신규 프로젝트 생성 및 1초 셋업 마스터 프롬프트](#6-신규-프로젝트-생성-및-1초-셋업-마스터-프롬프트)

---

## 1. 아키텍처 핵심 철학 & 전체 토폴로지

이 아키텍처는 **"규칙은 헌법 1곳에만 작성하고, 모든 AI가 충돌 없이 공용 지식과 스킬을 공유하며, 프로젝트 폴더만 압축해 이동해도 100% 즉시 구동되는 완전 독립체(Self-Contained Unit)"**를 목표로 설계되었습니다.

```text
[ 🌐 내 PC 글로벌 프로필: ~/.claude/CLAUDE.md ]
  ➔ 개인 공통 취향 1회 설정 ("모든 답변은 한국어로", "친절한 어조", "Git 커밋 규칙")
                         │
                         ▼ (하위 프로젝트로 자동 상속)
[ 📦 각 프로젝트 폴더 (C:\ai_dev\projects\STUDY\) - Clean Root & 완전 독립체 ]
  ├── 📄 AGENTS.md        (1. 프로젝트 단일 진실 공급원 헌법)
  ├── 🟣 CLAUDE.md        (2. @AGENTS.md 임포트 포인터)
  ├── 🔌 mcp.json         (3. 외부 도구 연결 명세서: 브라우저, DB)
  ├── 🔑 .env.example     (4. 환경변수 및 비밀키 템플릿)
  │
  ├── 📁 .agents/         (5. Antigravity & Codex & Claude 3대 AI 공용 공간)
  │   ├── 📜 rules/       (ui-design.md, testing.md, security_policy.md)
  │   └── ⚡ skills/      (전문가 8대 핵심 스킬 + 도메인 맞춤 스킬)
  │
  ├── 📁 .claude/         (6. Claude Code CLI 전용 공간)
  │   ├── 📜 rules/       (frontend.md: 클로드 CLI 전용 동작 오버라이드)
  │   └── ⚡ skills/      (클로드 CLI 전용 슬래시 명령어/스킬 저장소)
  │
  └── 📁 docs/            (7. 영구 프로젝트 지식 & 디자인 보관소)
      ├── architecture/   (overview.md: 시스템 구조도 및 컴포넌트 책임)
      ├── design/         (tokens.md: 브랜드 색상, 폰트, 여백 규격)
      ├── plans/          (대형 기능 구현 계획서)
      ├── tasks/          (지속적 태스크 추적)
      ├── decisions/      (ADR 기술적 의사결정 기록)
      └── reference/      (도메인 지침 및 레퍼런스 문서)
```

---

## 2. 표준 디렉토리 구조 & 파일별 역할 총람

| 계층 / 파일 경로 | 핵심 역할 및 기능 | 대상 AI | 미작성 시 치명적 위험 (Risk if missing) |
| :--- | :--- | :--- | :--- |
| **`./AGENTS.md`** | **프로젝트 통합 헌법 (단일 진실 공급원)**<br/>• 빌드/테스트 명령어 (`npm run build`)<br/>• 코딩 표준 및 완료 판정(DoD) | 3대 AI 공용<br/>(Codex, Claude, Antigravity) | AI들이 서로 다른 코딩 스타일로 충돌하거나, 빌드 검증 없이 거짓 완료 보고를 함 |
| **`./CLAUDE.md`** | **Claude Code 전용 포인터**<br/>• `@AGENTS.md`를 임포트하여 규칙 중복 방지 | Claude Code CLI | Claude Code가 공통 헌법을 인식하지 못하고 독자적인 스타일로 코드를 파괴함 |
| **`./mcp.json`** | **외부 도구 연결 명세서**<br/>• Puppeteer 브라우저, PostgreSQL DB 등 연결 | Antigravity, Claude Desktop | AI가 외부 DB나 브라우저 화면 검사를 수행하지 못함 |
| **`./.env.example`** | **환경변수 보안 템플릿**<br/>• API 키, DB 접속 주소 규격 정의 | 개발자 & 시스템 | 소스코드 안에 API Key를 하드코딩하여 GitHub로 유출되는 보안 사고 발생 |
| **`.agents/rules/`** | **공용 안전 정책 저장소**<br/>• `ui-design.md`, `testing.md`, `security_policy.md` | 3대 AI 공용 | UI 스타일이 파편화되고, 회귀 버그를 잡지 못함 |
| **`.agents/skills/`** | **공용 재사용 스킬 저장소**<br/>• 기획, 구현, 디버깅, 리뷰, TDD 스킬 본체 | 3대 AI 공용 | 복잡한 작업을 할 때마다 프롬프트를 길게 써야 하고 결과물 품질이 들쭉날쭉해짐 |
| **`.claude/rules/`** | **클로드 전용 규칙**<br/>• `frontend.md` (CLI 전용 행동 오버라이드) | Claude Code CLI | 터미널에서 JSX 작성 시 태그 닫힘 누락이나 인라인 CSS 남발 |
| **`.claude/skills/`** | **클로드 전용 슬래시 명령어**<br/>• 터미널에서 `/` 입력 시 자동완성 지원 | Claude Code CLI | 클로드 CLI 전용 특화 스크립트나 커맨드를 분리 실행 불가 |
| **`docs/architecture/`** | **시스템 구조 및 모듈 책임 개요서 (`overview.md`)** | 전체 AI & 개발자 | 새 기능 추가 시 기존 시스템 구조를 몰라 엉뚱한 폴더에 파일 생성 |
| **`docs/design/`** | **디자인 시스템 토큰 (`tokens.md`)**<br/>• 브랜드 메인 컬러, 폰트, 4px 그리드 규격 | 프론트엔드 에이전트 | 페이지마다 조잡한 무지개색 인라인 스타일이 마구잡이로 생성됨 |
| **`docs/decisions/`** | **아키텍처 의사결정 기록 (ADRs)** | 전체 AI & 개발자 | 이유를 모르고 다른 AI가 핵심 라이브러리를 임의로 교체해버림 |

---

## 3. 전문가 공인 8대 핵심 필수 스킬 (Core Essentials)

모든 프로젝트에 기본으로 장착되는 최정예 8대 표준 스킬입니다:

1. 🧭 **`skill-mcp-router` (지능형 도구 자동 라우터)**
   - 사용자 질의의 의도를 분석하여 `.agents/skills/`와 `mcp.json` 중 최적의 도구를 1순위로 자동 매칭 (토큰 낭비 차단).
2. 📋 **`plan-feature` (사전 기획 & 위험 분석)**
   - 코드에 손대기 전 기존 아키텍처와 영향을 받는 모듈을 분석하고 `docs/plans/`에 단계별 계획서 사전 작성.
3. ⚡ **`implement-feature` (최소 변경 안전 구현 & 빌드 검증)**
   - 불필요한 과도한 리팩토링을 배제하고 기존 패턴을 재사용하여 가장 작고 안전한 코드 작성 및 `npm run build` 0에러 검증.
4. 🔍 **`debug` (근본 원인 Root Cause 추적 & 자가 치유)**
   - 겉으로 보이는 증상만 덮지 않고 에러의 근본 원인을 추적하여 다른 기능이 망가지지 않게 안전하게 수정.
5. 🛡️ **`code-review` (10단계 다차원 정밀 코드 리뷰)**
   - 기능 정확성, 회귀 위험, 보안/데이터 유실, 에러 핸들링, 타입 안정성, 테스트, 아키텍처, 유지보수성, UI, 문서 10개 관점 전수 검사.
6. ⚡ **`session-context-compactor` (Claude 긴 세션 압축 & 토큰 다이어트)**
   - 터미널 작업이 길어질 때 핵심 진행 상황을 `docs/tasks/`에 요약 저장하고 컨텍스트를 `/compact` 압축하여 10배 빠른 속도 유지.
7. 🧪 **`tdd-test-generator` (TDD 선행 단위 테스트 생성 & 회귀 방지)**
   - 코드 구현 전에 `tests/` 폴더에 실패하는 테스트를 먼저 작성하여 무결점 로직 강제.
8. 🏛️ **`docs-knowledge-base` (영구 지식 보관소 관리)**
   - 프롬프트 컨텍스트를 낭비하지 않고, 시스템 구조도와 기술 결정(ADR)을 `docs/`에 영구 보관.

---

## 4. 에이전트(Agent) · MCP · 스킬(Skill) 3총사 개념 정리

```
[ 👨‍🍳 에이전트 (Agent) ] ➔ 자율 실행자 (두뇌) : 목표를 전달하면 계획/작성/빌드/수정을 스스로 완수 (Google Antigravity, Claude Code)
        │
        ├── [ 🔌 MCP (Connectors) ] ➔ 외부 도구 연결선 : DB, 웹 브라우저 화면 캡처, GitHub와 통신
        │
        └── [ 📖 스킬 (Skill / SOP) ] ➔ 표준 업무 레시피 : 생기부 작성, TDD 테스트, 코드 리뷰 등 반복 작업 자동화
```

---

## 5. 단일 AI 대비 통합 구조의 압도적 효율성

- **토큰 낭비 0%**: 각 AI는 자기 전용 파일만 읽고 타 AI 폴더는 아예 무시합니다. (오버헤드 0토큰)
- **유지보수 비용 1/3 절감**: 규칙 수정 시 `AGENTS.md` 헌법 1곳만 수정하면 3대 AI 전체에 자동 동기화됩니다.
- **적재적소 멀티 AI 스위칭**: 터미널 작업(Claude Code CLI)과 시각적 IDE 작업(Google Antigravity)을 1초 만에 자유롭게 넘나들 수 있습니다.

---

## 6. 신규 프로젝트 생성 및 1초 셋업 마스터 프롬프트

새로운 프로젝트를 만들 때 AI에게 아래 프롬프트 1회만 전달하면 이 모든 표준 구조가 3초 만에 자동 완성됩니다:

```markdown
당신은 최고 수준의 AI 에이전트 시스템 아키텍트입니다.
이 프로젝트를 2026 AI IDE 통합 골드 스탠다드 아키텍처에 맞춰 초기화해주세요.

[필수 생성 목록]
1. 루트 AGENTS.md (단일 진실 공급원 헌법: 프로젝트 스택에 맞춘 빌드/테스트 명령 명시)
2. 루트 CLAUDE.md (@AGENTS.md 임포트 포인터)
3. 루트 mcp.json & .env.example
4. .agents/rules/ (ui-design.md, testing.md, security_policy.md, tool-selection.md)
5. .agents/skills/ (plan-feature, implement-feature, debug, code-review, session-context-compactor, tdd-test-generator, skill-mcp-router)
6. .claude/rules/ (frontend.md) & .claude/skills/ (README.md)
7. docs/ (architecture/overview.md, design/tokens.md, plans/, tasks/, decisions/, reference/)

모든 파일 생성 후 빌드 검증(npm run build 등)을 실행하여 0에러임을 입증해주세요.
```
