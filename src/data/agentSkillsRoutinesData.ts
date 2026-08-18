export interface CustomSkillTemplate {
  id: string;
  name: string;
  category: 'Git/DevOps' | 'Database' | '보안/감사' | '아키텍처/컨벤션';
  description: string;
  directoryStructure: string;
  skillMdContent: string;
  triggerExample: string;
}

export interface RuleFileTemplate {
  id: string;
  toolName: 'Google Antigravity' | 'Claude Code' | 'Cursor IDE' | 'OpenAI ChatGPT';
  fileName: string;
  purpose: string;
  content: string;
}

export interface DailyRoutineGuide {
  timeSlot: string;
  routineName: string;
  icon: string;
  persona: string;
  triggerCommand: string;
  objective: string;
  steps: { stepNumber: number; title: string; desc: string; commandSnippet?: string }[];
  expectedOutput: string;
  proTip: string;
}

export const AGENT_ARCHITECTURE_GUIDE = {
  title: '2026 자율형 에이전트 & 멀티 에이전트(Multi-agent) 시스템 아키텍처',
  tagline: '단순 프롬프트 질의응답에서 "스스로 계획하고 검증하는 자율 개발팀"으로의 진화',
  principles: [
    {
      step: '1. 사전 기획 & 사용자 승인 (Planning Mode)',
      desc: '코드를 바로 건드려 망가뜨리지 않고, `implementation_plan.md`를 먼저 작성하여 변경 범위, 아키텍처, 위험 요소를 사용자에게 검토 및 승인받은 후 착수합니다.'
    },
    {
      step: '2. 도구 호출 & 샌드박스 실행 루프 (Tool Execution Loop)',
      desc: '파일 읽기/쓰기(`view_file`, `write_to_file`), 터미널 명령어 실행(`run_command`), 웹 검색(`search_web`), MCP 서버 호출을 순차적으로 수행하며 상태를 갱신합니다.'
    },
    {
      step: '3. 전문 서브에이전트 병렬 오케스트레이션 (Subagents)',
      desc: '메인 에이전트(Supervisor)가 리서치 전담 서브에이전트, 코딩 전담 에이전트, 테스트 전담 에이전트를 백그라운드에 동시 스폰하여 컨텍스트 오염 없이 협업합니다.'
    },
    {
      step: '4. 반응형 비동기 깨움 (Reactive Wakeup & Task Management)',
      desc: '긴 빌드(`npm run build`)나 대규모 테스트 동안 폴링 루프를 돌지 않고, 작업 완료 이벤트 발생 시 자동으로 에이전트가 깨어나 결과를 처리합니다.'
    },
    {
      step: '5. 사후 검증 & 자가 치유 (Verification & Self-healing Walkthrough)',
      desc: '단위 테스트(`npm test`) 실패 시 오류 스택트레이스를 스스로 분석해 자가 수정(Self-healing)을 거친 후, `walkthrough.md`로 최종 산출물을 증명합니다.'
    }
  ]
};

export const CUSTOM_SKILL_TEMPLATES: CustomSkillTemplate[] = [
  {
    id: 'git-auto-pr',
    name: '🚀 git-auto-pr (자동 브랜치 · 커밋 · PR 생성 스킬)',
    category: 'Git/DevOps',
    description: '작업한 변경 내역(git diff)을 분석하여 Conventional Commits 표준 커밋 메시지를 생성하고 GitHub PR 본문을 마크다운으로 자동 작성합니다.',
    directoryStructure: `skills/
└── git-auto-pr/
    ├── SKILL.md
    └── scripts/
        └── generate_pr_body.py`,
    skillMdContent: `---
name: git-auto-pr
description: Analyzes uncommitted git changes, formats conventional commits, and creates a comprehensive GitHub Pull Request. Use whenever the user asks to "commit my work", "create a PR", or "wrap up changes".
---

# Git Auto-PR Skill

## Workflow
1. Run \`git status\` and \`git diff --stat\` to inspect all modified files.
2. Group related changes by feature or fix.
3. Commit each logical unit using Conventional Commits:
   - \`feat(scope): ...\`
   - \`fix(scope): ...\`
   - \`refactor(scope): ...\`
4. Run \`npm test\` to ensure all tests pass before opening the PR.
5. Create a GitHub PR with title, summary, test validation table, and issue links.`,
    triggerExample: '"방금 작업한 내용으로 브랜치 따고 테스트 통과 확인해서 PR 본문까지 작성해줘."'
  },
  {
    id: 'db-query-optimizer',
    name: '🗄️ db-query-optimizer (PostgreSQL 슬로우 쿼리 튜닝 스킬)',
    category: 'Database',
    description: 'EXPLAIN ANALYZE 실행 계획을 파싱하여 Seq Scan 병목을 찾고, 무중단 CONCURRENT 인덱스 및 쿼리 재작성 가이드를 제공합니다.',
    directoryStructure: `skills/
└── db-query-optimizer/
    ├── SKILL.md
    └── references/
        └── postgres_indexing_guide.md`,
    skillMdContent: `---
name: db-query-optimizer
description: Parses SQL query execution plans (EXPLAIN ANALYZE), identifies sequential scans, and suggests zero-downtime indexing and partitioning strategies.
---

# DB Query Optimizer Skill

## Rules
- Never use \`CREATE INDEX\` directly on production tables (Always use \`CREATE INDEX CONCURRENTLY\`).
- Check for high buffer reads (\`shared hit\`, \`shared read\`).
- For tables over 10M rows, evaluate BRIN indexing or monthly RANGE partitioning.
- Output estimated latency improvement and rollback DDL.`,
    triggerExample: '"이 쿼리 실행 계획 로그 첨부할 테니 슬로우 쿼리 튜닝하고 무중단 마이그레이션 SQL 만들어줘."'
  },
  {
    id: 'owasp-security-auditor',
    name: '🔒 owasp-security-auditor (소스코드 보안 취약점 전수 감사)',
    category: '보안/감사',
    description: 'BOLA, SQLi, SSRF, 하드코딩된 시크릿 키 등 OWASP Top 10 취약점을 정적 분석하고 완벽한 방어 패치 diff를 생성합니다.',
    directoryStructure: `skills/
└── owasp-security-auditor/
    ├── SKILL.md
    └── references/
        └── owasp_top10_cheatsheet.md`,
    skillMdContent: `---
name: owasp-security-auditor
description: Scans repository files for OWASP Top 10 vulnerabilities (SQLi, SSRF, BOLA, weak JWT), provides risk scores (CVSS), and generates secure code diffs.
---

# OWASP Security Auditor Skill

## Audit Checklist
1. **Broken Object Level Authorization (BOLA)**: Ensure all resource IDs match the authenticated session user ID.
2. **SSRF**: Block private IPv4/IPv6 ranges (127.0.0.1, 10.0.0.0/8, 169.254.169.254, ::1).
3. **SQL Injection**: Replace string concatenations with parameterized ORM queries.
4. **Hardcoded Secrets**: Scan for API keys using regex pattern matching.`,
    triggerExample: '"src/api/ 디렉토리 내 20개 엔드포인트 보안 취약점 전수 스캔하고 패치 diff 뽑아줘."'
  },
  {
    id: 'tech-stack-enforcer',
    name: '📐 tech-stack-enforcer (팀 코딩 컨벤션 & 아키텍처 강제)',
    category: '아키텍처/컨벤션',
    description: 'React Clean Architecture, Tailwind CSS 규칙, TypeScript strict 타입 가이드라인을 AI가 작업 시 100% 준수하도록 강제합니다.',
    directoryStructure: `skills/
└── tech-stack-enforcer/
    ├── SKILL.md
    └── references/
        └── architecture_rules.md`,
    skillMdContent: `---
name: tech-stack-enforcer
description: Enforces team architecture conventions (Strict TypeScript, Tailwind CSS, Component separation, Zero any-types).
---

# Tech Stack Enforcer Skill

## Mandatory Rules
- **No \`any\` Types**: Every interface must be explicitly typed.
- **Server/Client Separation**: Mark client components with \`'use client'\` explicitly.
- **Error Boundaries**: Wrap network calls with try/catch and structured error toasts.
- **Tailwind Only**: Never use inline style objects (\`style={{...}}\`).`,
    triggerExample: '"새 기능 만들 때 우리 팀 컨벤션 규칙 엄격하게 지켜서 작업해줘."'
  }
];

export const RULE_FILE_TEMPLATES: RuleFileTemplate[] = [
  {
    id: 'agy-rules',
    toolName: 'Google Antigravity',
    fileName: '.gemini/rules 또는 AGY Rules',
    purpose: 'Antigravity IDE 및 에이전트의 기본 행동 지침과 프로젝트 코딩 원칙 영구 주입',
    content: `# Antigravity Project Rules (.gemini/rules)

## 1. Planning First Policy
- For changes touching more than 2 files, ALWAYS create/update \`implementation_plan.md\` and request user feedback before writing code.
- After code execution, ALWAYS update \`walkthrough.md\` with verification results.

## 2. Code Quality
- Language: TypeScript 5.x + Strict Mode (No 'any').
- UI: React 18+ / Tailwind CSS (No CSS Modules / No styled-components).
- State: Zustand or React Query (Avoid Redux boilerplate).

## 3. Terminal Safety
- Never run \`rm -rf /\` or hard git resets without explicit confirmation.
- Always run \`npm run build\` and \`npm test\` before concluding the task.`
  },
  {
    id: 'claude-md',
    toolName: 'Claude Code',
    fileName: 'CLAUDE.md',
    purpose: 'Claude Code CLI 실행 시 프로젝트 루트에서 자동으로 로드되는 컨텍스트 메모리',
    content: `# CLAUDE.md (Claude Code Project Guidelines)

## Build & Test Commands
- Dev Server: \`npm run dev\` (runs on localhost:3000)
- Build: \`npm run build\` (runs \`tsc && vite build\`)
- Test: \`npm test\` (Jest / Vitest)
- Lint: \`npm run lint\`

## Architecture & Code Conventions
- Store data files in \`src/data/\` with exported typed constants.
- Components live in \`src/components/\` using functional components.
- When creating UI, use Lucide React icons with consistent sizing (w-4 h-4).
- Always verify changes by running \`npm run build\` before concluding.`
  },
  {
    id: 'cursor-rules',
    toolName: 'Cursor IDE',
    fileName: '.cursorrules',
    purpose: 'Cursor Composer 및 Chat에서 상시 적용되는 프로젝트 컨벤션 룰',
    content: `# .cursorrules

You are an expert Senior Full-Stack Engineer.
- Keep components modular and under 250 lines of code.
- Prefer early returns and functional paradigms.
- When editing files, only modify the target lines rather than rewriting the entire file.
- Always output clean TypeScript code with zero lint warnings.`
  },
  {
    id: 'openai-instructions',
    toolName: 'OpenAI ChatGPT',
    fileName: 'Custom Instructions (맞춤 지침)',
    purpose: 'ChatGPT 웹/앱에서 사용자의 역할, 선호 스택, 출력 형식을 영구 기억',
    content: `[사용자 프로필 & 역할]
- 직무: 시니어 풀스택 개발자 및 솔루션 아키텍트
- 선호 스택: Next.js / TypeScript / Tailwind CSS / PostgreSQL / Python

[답변 스타일 지침]
- 군더더기 서론/결론 인사말은 생략하고 핵심 코드와 아키텍처부터 직통 제시
- 변경 사항은 Before/After diff 형식으로 명확히 표기
- 항상 엣지 케이스와 보안(OWASP) 취약점 관점을 함께 검토`
  }
];

export const DAILY_ROUTINES_GUIDES: DailyRoutineGuide[] = [
  {
    timeSlot: '🌅 09:00 ~ 09:30',
    routineName: '모닝 데일리 브리핑 & 이슈 우선순위 자동화',
    icon: 'Sun',
    persona: '출근 직후 30분 만에 하루 개발 로드맵 완성',
    triggerCommand: '/schedule 또는 "밤새 쌓인 GitHub 이슈와 에러 로그 요약해줘"',
    objective: '밤사이 발생한 Sentry 에러, GitHub PR/Issue, 사내 메일을 AI가 일괄 분석하여 오늘의 Top 3 작업 목록 브리핑',
    steps: [
      {
        stepNumber: 1,
        title: '글로벌 이슈 & Sentry 에러 로그 크롤링',
        desc: '에이전트에게 밤사이 발생한 크리티컬 에러 로그와 신규 GitHub Issue 5건 수집 요청',
        commandSnippet: 'claude "Sentry 최근 24시간 Error 로그 중 P0 등급 3건과 신규 Issue를 요약해줘"'
      },
      {
        stepNumber: 2,
        title: '우선순위 매트릭스 도출',
        desc: '비즈니스 영향도와 난이도를 기준으로 오늘 오전/오후 태스크 3개 선정',
        commandSnippet: 'Antigravity: implementation_plan.md에 오늘 해결할 버그 3종 태스크 등록'
      },
      {
        stepNumber: 3,
        title: '슬랙/노션 일일 스크럼 자동 작성',
        desc: '팀 스크럼 채널에 오늘 진행할 작업 리포트 3줄 요약 자동 발행'
      }
    ],
    expectedOutput: '오늘의 P0 버그 1건, 신규 기능 2건에 대한 3단 우선순위 브리핑 및 스크럼 텍스트 완성',
    proTip: '매일 아침 9시 `/schedule Cron="0 9 * * 1-5"` 명령어로 완전 자동화 예약이 가능합니다.'
  },
  {
    timeSlot: '💻 13:00 ~ 17:00',
    routineName: '실무 TDD 코딩 & 터미널 자가 치유(Self-healing) 루틴',
    icon: 'Terminal',
    persona: '단일 프롬프트로 기획-테스트-구현-빌드 무결점 완결',
    triggerCommand: 'Planning Mode 승인 -> TDD 단위 테스트 작성 -> 코드 구현 -> 터미널 자동 검증',
    objective: 'AI가 스스로 실패하는 테스트를 먼저 작성(TDD)하고, 이를 통과하는 코드를 작성하며, 빌드 에러를 자가 치유하도록 유도',
    steps: [
      {
        stepNumber: 1,
        title: 'Planning Mode 기획 승인',
        desc: '변경할 파일 목록과 아키텍처 설계를 implementation_plan.md로 확인 후 승인',
        commandSnippet: 'Antigravity /goal "실시간 알림 기능 추가 계획서 작성해줘"'
      },
      {
        stepNumber: 2,
        title: 'TDD 단위 테스트 코드 선 작성',
        desc: '기능 구현 전 실패하는 단위 테스트(`test/notification.spec.ts`)를 먼저 작성',
        commandSnippet: 'npm test -- --watch'
      },
      {
        stepNumber: 3,
        title: '자가 치유(Self-healing) 루프 실행',
        desc: '에이전트가 터미널 빌드 에러 스택을 스스로 읽고 올패스할 때까지 코드 자가 수정'
      }
    ],
    expectedOutput: '`npm test` 및 `npm run build`가 0에러로 통과된 무결점 컴포넌트 및 walkthrough.md 생성',
    proTip: 'Claude Code에서는 `/compact`를 세션 중간에 실행해 컨텍스트 윈도우 비용을 60% 절감하세요.'
  },
  {
    timeSlot: '🌆 17:30 ~ 18:00',
    routineName: '퇴근 전 보안 감사 & 릴리즈 PR 자동 발행 루틴',
    icon: 'ShieldCheck',
    persona: '배포 사고 제로(Zero Incident)를 위한 퇴근 전 30분 안심 체크',
    triggerCommand: '"owasp-security-auditor 스킬 실행하고 검증 후 PR 본문 만들어줘"',
    objective: '오늘 작성된 코드의 보안 취약점(OWASP), 메모리 누수, 성능 병목을 전수 검사하고 GitHub PR 자동 오픈',
    steps: [
      {
        stepNumber: 1,
        title: '보안 취약점 & 시크릿 키 전수 스캔',
        desc: 'owasp-security-auditor 스킬을 호출하여 하드코딩된 키 및 BOLA 취약점 검증',
        commandSnippet: 'claude "오늘 커밋된 파일들 보안 취약점 스캔하고 위험도 리포트 작성해줘"'
      },
      {
        stepNumber: 2,
        title: '로컬호스트 브라우저 회귀 테스트',
        desc: 'Vite 로컬호스트를 띄우고 UI 깨짐 및 콘솔 에러가 없는지 최종 확인',
        commandSnippet: 'npm run build && npm run preview'
      },
      {
        stepNumber: 3,
        title: 'git-auto-pr 스킬로 릴리즈 PR 오픈',
        desc: 'Conventional Commits 기반 커밋과 테스트 검증 결과가 포함된 PR 발행'
      }
    ],
    expectedOutput: '보안 스캔 0건 취약점 확인서 + GitHub PR 자동 생성 완료',
    proTip: '퇴근 전 PR을 열어두면 야간 CI/CD 빌드가 자동으로 돌아 다음 날 아침 즉시 머지 가능합니다.'
  },
  {
    timeSlot: '🌙 22:00 ~ 익일 06:00',
    routineName: '야간 장기 실행 자율 위임 루틴 (/goal)',
    icon: 'Moon',
    persona: '잠자는 밤새 8시간 동안 대규모 레포지토리 전면 리팩토링',
    triggerCommand: '/goal "프로젝트 내 50개 컴포넌트 Next.js 15 App Router 마이그레이션"',
    objective: '인간이 자는 동안 수십 개 파일의 대규모 마이그레이션, 벤치마크 테스트, 문서화를 에이전트에게 100% 위임',
    steps: [
      {
        stepNumber: 1,
        title: '격리된 브랜치 생성 및 안전장치 설정',
        desc: '메인 브랜치를 보호하기 위해 `migration/nightly-refactor` 브랜치 자동 분기',
        commandSnippet: 'git checkout -b migration/nightly-refactor'
      },
      {
        stepNumber: 2,
        title: '/goal 장기 자율 작업 위임',
        desc: '서브에이전트들이 파일 단위로 마이그레이션 및 빌드 테스트를 밤새 반복 수행',
        commandSnippet: 'Antigravity /goal "모든 레거시 API 라우트를 Route Handler 표준으로 교체"'
      },
      {
        stepNumber: 3,
        title: '아침 출근 시 결과 검토 및 머지',
        desc: '출근 후 에이전트가 밤새 작성한 walkthrough.md와 테스트 결과를 확인하고 1-Click 머지'
      }
    ],
    expectedOutput: '아침에 출근했을 때 50개 파일이 완전히 마이그레이션되고 테스트가 100% 통과된 PR 확인',
    proTip: '야간 작업 전 반드시 유효한 테스트 스위트(`npm test`)가 갖춰져 있어야 AI가 스스로 정답 여부를 채점할 수 있습니다.'
  }
];
