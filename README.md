# 🚀 AI Master Guide & Knowledge Hub (AI 마스터 가이드)
> **Universal Tri-IDE AI Engineering Platform** (OpenAI Codex · Claude Code · Google Antigravity · Cursor)  
> **2026 Gold Standard Architecture** · 교사/교육자 실무 특화 도구 · 8대 핵심 표준 스킬

---

## 🌟 프로젝트 소개 (Overview)

**AI Master Guide**는 프론트엔드/풀스택 엔지니어링과 초·중·고 교사 및 교육자를 위한 **올인원 AI 에이전트 개발 & 실무 지원 웹 플랫폼**입니다.

- **실시간 모델 비교 & 벤치마크**: SWE-bench, 코딩 속도, 토큰 단가, 프롬프트 엔지니어링 실전 매트릭스
- **2026 골드 스탠다드 개발 환경 구축**: 3대 AI 통합 하네스(AGENTS.md, CLAUDE.md, .agents/skills/, mcp.json) 원클릭 맞춤 ZIP 다운로드
- **교사/교육자 실무 특화 모듈**: 생기부(과세특/행특) 나이스 금지어 자동 검사기, 차시별 지도안 & 루브릭, 초중고 교과 활동지, 학급 칭찬 룰렛 & N분의 1 정산기
- **영구 지식 보관소 (docs/)**: 시스템 아키텍처 개요서 및 디자인 시스템 토큰 규격

---

## 🏛️ 2026 AI IDE 통합 골드 스탠다드 아키텍처

`	ext
my-project/ (Clean & Minimalist Root)
├── 📄 AGENTS.md                   [1. 최상위 마스터 헌법: 빌드/테스트 명령, DoD, 룰 링크]
├── 🟣 CLAUDE.md                   [2. @AGENTS.md 임포트 포인터 (Claude Code용)]
├── 🔌 mcp.json                    [3. 외부 도구 연결 명세서 (Puppeteer, DB)]
├── 🔑 .env.example                [4. 환경변수 및 비밀키 템플릿]
│
├── 📁 .agents/                    [Antigravity & Codex & Claude 3대 AI 공용]
│   ├── 📜 rules/                  (ui-design.md, testing.md, security_policy.md)
│   └── ⚡ skills/                 (전문가 8대 핵심 스킬 + 맞춤 스킬)
│
├── 📁 .claude/                    [Claude Code CLI 전용 공간]
│   ├── 📜 rules/                  (frontend.md: 클로드 CLI 전용 동작 오버라이드)
│   └── ⚡ skills/                 (클로드 CLI 전용 슬래시 명령어/스킬 저장소)
│
└── 📁 docs/                       [영구 프로젝트 지식 & 디자인 보관소]
    ├── architecture/overview.md   (시스템 구조도 및 컴포넌트 책임)
    ├── design/tokens.md           (🎨 디자인 시스템 토큰: 색상, 폰트, 여백 규격)
    ├── plans/                     (대형 기능 구현 계획서)
    ├── tasks/                     (지속적 태스크 추적)
    ├── decisions/                 (ADR 아키텍처 의사결정 기록)
    └── reference/                 (교육부 생기부 기재요령 등 레퍼런스)
`

---

## ⚡ 빠른 시작 (Quick Start)

### 1. 패키지 설치
`ash
npm install
`

### 2. 로컬 개발 서버 실행
`ash
npm run dev
`
브라우저에서 http://localhost:3000 으로 접속합니다.

### 3. 무결성 빌드 검증
`ash
npm run build
`

---

## 📄 라이선스 (License)
MIT License. 자유롭게 수정 및 활용하실 수 있습니다.
