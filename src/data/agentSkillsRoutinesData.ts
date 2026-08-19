export interface CustomSkillTemplate {
  id: string;
  name: string;
  category: 
    | '도구 라우팅/오케스트레이션' 
    | '교육/수업/활동지' 
    | '독서/문화/글쓰기' 
    | '학급/모임/도구' 
    | 'Git/DevOps' 
    | 'Database' 
    | '보안/감사' 
    | '아키텍처/컨벤션';
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
    id: 'skill-mcp-router',
    name: '🧭 skill-mcp-router (스킬 & MCP 스마트 라우터)',
    category: '도구 라우팅/오케스트레이션',
    description: '사용자의 요청 의도를 분석하여 수많은 skills/ 와 mcp.json 도구 중 가장 적합한 도구를 1순위로 탐색·연결해주는 2026 차세대 메타 오케스트레이터 스킬입니다.',
    directoryStructure: `skills/
└── skill-mcp-router/
    ├── SKILL.md
    └── references/
        └── tool_routing_matrix.md`,
    skillMdContent: `---
name: skill-mcp-router
description: Analyzes user intent, automatically discovers matching skills from skills/ and tools from mcp.json, and executes the optimal tool chain with minimal steps.
tools: [file_reader, shell]
---

# Skill & MCP Smart Router Workflow

## 1. Intent Extraction
- Extract [Goal], [Input Format], [Expected Output] from the user's prompt.

## 2. Matchmaking & Tool Selection
- Scan available \`skills/\` directories and inspect \`mcp.json\` tool definitions.
- Rank candidate tools by precision, token cost, and execution safety.

## 3. Chained Execution
- Route execution to the #1 matched skill.
- If an MCP tool returns an error, automatically fallback to secondary tools without stopping.`,
    triggerExample: '"초등 과학 활동지 만들고 브라우저로 화면 캡처해서 확인해줘 (적절한 스킬/도구 알아서 선택해줘)."'
  },
  {
    id: 'lesson-worksheet-generator',
    name: '🏫 lesson-worksheet-generator (교과 수업 활동지 생성기)',
    category: '교육/수업/활동지',
    description: '학년과 과목, 단원 핵심 키워드를 입력받아 생각 열기 발문, 개념 정리 빈칸, 4지선다 퀴즈 및 서술형 문항이 포함된 A4 출력용 수업 활동지를 3초 만에 생성합니다.',
    directoryStructure: `skills/
└── lesson-worksheet-generator/
    ├── SKILL.md
    └── references/
        └── curriculum_standards_2026.md`,
    skillMdContent: `---
name: lesson-worksheet-generator
description: Generates structured, print-ready A4 lesson worksheets, concept check quizzes, and teacher answer keys based on grade level and subject keywords.
tools: [file_writer]
---

# Lesson Worksheet Generator Workflow

## 1. Grade-Level Tone Adjustment
- Elementary (Grades 1-2): Simple vocabulary, friendly emojis, large font structure.
- Elementary (Grades 3-6): Clear explanations, visual concept diagrams, 4-choice quizzes.
- Middle/High School: Inquiry-based questions, critical thinking essays.

## 2. Worksheet 3-Stage Structure
1. [Stage 1: Warm-up] Curiosity-driven real-world scenario question.
2. [Stage 2: Core Check] Fill-in-the-blank concept summary & 3 multiple-choice questions.
3. [Stage 3: Think & Apply] 1 open-ended creative thinking prompt.

## 3. Teacher Answer Key
- Attach correct answers, scoring rubrics, and guidance tips at the end.`,
    triggerExample: '"초등 4학년 1학기 사회 2단원 \'우리지역의 역사\' 수업 활동지 A4 1장으로 만들어줘."'
  },
  {
    id: 'book-movie-review-worksheet',
    name: '🎬 book-movie-review-worksheet (영화·도서 감상문 학습지)',
    category: '독서/문화/글쓰기',
    description: '영화나 책의 3줄 요약, 명대사/명문장 기록, 주인공 입장 역지사지 토론 질문 및 5점 별점 감상 카드 템플릿을 자동으로 만듭니다.',
    directoryStructure: `skills/
└── book-movie-review-worksheet/
    ├── SKILL.md
    └── references/
        └── review_question_prompts.md`,
    skillMdContent: `---
name: book-movie-review-worksheet
description: Creates structured book and movie review templates, character conflict maps, and open-ended debate questions.
tools: [file_writer]
---

# Book & Movie Review Worksheet Workflow

## 1. Overview Section
- Title, Author/Director, Genre, 3-sentence plot summary.
- 5-Star Rating (★) & 1-line verdict card.

## 2. Deep Dive Prompts
- Memorable quotes / standout scenes.
- Perspective-taking debate prompt: "If you were the protagonist at that moment, what would you choose?"

## 3. Reflection Card
- Personal takeaway and recommended audience.`,
    triggerExample: '"영화 \'인사이드 아웃 2\' 보고 작성할 수 있는 중학생 독서토론 활동지 만들어줘."'
  },
  {
    id: 'class-activity-picker',
    name: '🎯 class-activity-picker (학급 팀 뽑기 & 칭찬 스티커 웹앱)',
    category: '학급/모임/도구',
    description: '학생 명단을 넣으면 랜덤 팀 배정 룰렛, 사다리타기 및 칭찬 도장 인터랙션을 지원하는 웹 도구 코드를 자동 생성합니다.',
    directoryStructure: `skills/
└── class-activity-picker/
    ├── SKILL.md
    └── scripts/
        └── team_balancer.py`,
    skillMdContent: `---
name: class-activity-picker
description: Scaffolds interactive classroom tools including random team generators, roulette pickers, and praise stamp trackers.
tools: [file_writer, shell]
---

# Class Activity Picker Workflow

## 1. Roster Input & Validation
- Textarea parsing for student names (comma or newline separated).
- Excel copy-paste parser.

## 2. Fair Random Team Generator
- Unbiased shuffle algorithm with balanced team sizes.
- Visual animation with celebratory sound effects.

## 3. Local Persistence
- Automatically save teams and stamp records to browser \`localStorage\`.`,
    triggerExample: '"우리 반 25명 이름 넣으면 5명씩 5모둠으로 공평하게 룰렛 돌려 짜주는 웹앱 만들어줘."'
  },
  {
    id: 'sns-card-news-writer',
    name: '📝 sns-card-news-writer (블로그 글 & SNS 카드뉴스 대본)',
    category: '독서/문화/글쓰기',
    description: '조회수를 부르는 후킹 제목 3종, 인스타그램 카드뉴스 5단 슬라이드 텍스트, 블로그 포스팅 본문과 맞춤 해시태그를 생성합니다.',
    directoryStructure: `skills/
└── sns-card-news-writer/
    ├── SKILL.md
    └── references/
        └── viral_copywriting_guide.md`,
    skillMdContent: `---
name: sns-card-news-writer
description: Creates viral social media card news copy (5-slide format), engaging blog posts, and optimized hashtag bundles.
tools: [file_writer]
---

# SNS Card News Writer Workflow

## 1. Headline Ideation
- 3 High-CTR hook headlines (Curiosity, Number-driven, Problem-solving).

## 2. 5-Slide Card News Structure
- Slide 1: Hooking Cover question.
- Slides 2-4: Bite-sized actionable tips (under 30 words per slide).
- Slide 5: Call to Action (Save & Share prompt).

## 3. Blog Post & Hashtags
- Scannable paragraphs with emojis and 10 targeted discovery hashtags.`,
    triggerExample: '"초등학생 AI 코딩 교육 꿀팁 주제로 인스타 카드뉴스 5장 대본이랑 블로그 글 써줘."'
  },
  {
    id: 'dutch-pay-calculator',
    name: '💰 dutch-pay-calculator (모임 회비 정산 & 가계부 계산기)',
    category: '학급/모임/도구',
    description: '영수증 내역을 입력받아 1원 단위 정확한 N분할 계산, 카카오톡 복사용 정산 문구 생성 및 엑셀 다운로드를 지원합니다.',
    directoryStructure: `skills/
└── dutch-pay-calculator/
    ├── SKILL.md
    └── scripts/
        └── split_bill.py`,
    skillMdContent: `---
name: dutch-pay-calculator
description: Computes precise N-way expense splitting, generates KakaoTalk shareable billing summaries, and exports CSV reports.
tools: [file_writer, shell]
---

# Dutch Pay Calculator Workflow

## 1. Receipt Breakdown
- Input total bill, member names, and optional custom item exclusions.

## 2. Exact Splitting
- Calculate per-person amount with clean remainder handling.

## 3. KakaoTalk Shareable Format
- One-click copy format with total, per-person share, and bank account info.
- CSV export for group bookkeeping.`,
    triggerExample: '"동아리 회식 영수증 35만원 12명 정산하고 카톡 공유 문구랑 엑셀 다운로드 기능 만들어줘."'
  },
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
tools: [git, shell]
---

# Git Auto-PR Skill

## Workflow
1. Run \`git status\` and \`git diff --stat\` to inspect all modified files.
2. Group related changes by feature or fix.
3. Commit each logical unit using Conventional Commits (\`feat:\`, \`fix:\`, \`refactor:\`).
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
tools: [file_writer, shell]
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
tools: [file_reader, shell]
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
tools: [file_reader, file_writer]
---

# Tech Stack Enforcer Skill

## Enforced Standards
- React 18+, functional components with explicit Props interfaces.
- Zero \`any\` types: all data must be typed in \`src/types/\`.
- Tailwind CSS utility classes instead of inline style attributes.
- Centralized state management via Zustand and local UI state with useState.`,
    triggerExample: '"우리 팀 코딩 컨벤션 룰 준수해서 방금 작성한 컴포넌트 리팩토링해줘."'
  }
];

export const RULE_FILE_TEMPLATES: RuleFileTemplate[] = [
  {
    id: 'rule-antigravity',
    toolName: 'Google Antigravity',
    fileName: 'AGENTS.md',
    purpose: 'Google Antigravity 및 자율 에이전트의 마스터 행동 규칙 및 자가 치유 지침',
    content: `# AGENTS.md - Antigravity Autonomous Agent Rules

## 1. Role & Planning Boundary
- Always research before modifying code.
- For complex changes, prepare an implementation plan and verify with user approval.

## 2. Coding Conventions
- Strict TypeScript: Never use \`any\`. Define clean interfaces.
- CSS: Follow \`DESIGN.md\` color palette and 4px spacing scale.
- Verification: Always run \`npm run build\` and ensure 0 errors before marking done.`
  },
  {
    id: 'rule-claude-code',
    toolName: 'Claude Code',
    fileName: 'CLAUDE.md',
    purpose: 'Claude Code CLI 전용 포인터 및 간결한 커맨드 맵',
    content: `# CLAUDE.md - Claude Code Guidelines
@AGENTS.md
@DESIGN.md

## Quick Commands
- Dev Server: \`npm run dev\`
- Verification Build: \`npm run build\`
- Unit Tests: \`npm test\``
  },
  {
    id: 'rule-cursor',
    toolName: 'Cursor IDE',
    fileName: '.cursorrules',
    purpose: 'Cursor Composer 및 인라인 편집 AI 전용 컨텍스트 규칙',
    content: `# .cursorrules - Cursor AI Rules
- Framework: React 18 + Vite + TypeScript Strict + Tailwind CSS
- Always use lucide-react for icons.
- Check DESIGN.md for token colors (#3182F6, #0F172A).
- Self-heal terminal errors during execution.`
  },
  {
    id: 'rule-chatgpt',
    toolName: 'OpenAI ChatGPT',
    fileName: 'custom_instructions.md',
    purpose: 'ChatGPT Custom Instructions / Codex System Prompt 주입용 규칙',
    content: `# ChatGPT Custom Instructions
- You are a senior fullstack engineer and educational software designer.
- Provide production-grade, copy-paste ready code with full types.
- Format structured tables and breakdown lists for clarity.`
  }
];

export const DAILY_ROUTINES_GUIDES: DailyRoutineGuide[] = [
  {
    timeSlot: '09:00 AM (출근 / 아침)',
    routineName: '아침 기상 & 이슈 브리핑 자동화',
    icon: 'Sun',
    persona: '스마트 업무 비서',
    triggerCommand: '/morning-briefing',
    objective: '밤새 들어온 GitHub 이슈, 미해결 버그, 오늘의 우선순위 3가지를 30초 만에 브리핑받기',
    steps: [
      { stepNumber: 1, title: 'GitHub 이슈 및 PR 조회', desc: 'GitHub MCP를 호출하여 나에게 할당된 이슈와 리뷰 대기 중인 PR 목록 수집' },
      { stepNumber: 2, title: '우선순위 3대 태스크 정렬', desc: '마감일과 중요도를 기준으로 오늘 해결할 핵심 과제 선정 및 일정 요약' }
    ],
    expectedOutput: '아침 업무 브리핑 카드 및 오늘의 액션 아이템 목록',
    proTip: '슬랙(Slack)이나 노션(Notion)에 브리핑 결과를 바로 복사해 팀원들에게 공유하세요.'
  },
  {
    timeSlot: '01:30 PM (오후 집중)',
    routineName: '스마트 도구 라우팅 & 초고속 코딩/활동지 제작',
    icon: 'Terminal',
    persona: '전문 시니어 개발자 & 교육 기획자',
    triggerCommand: '/skill-mcp-router',
    objective: '자연어로 목표만 지시하면 AI가 최적의 스킬을 찾아 활동지나 웹 기능을 0에러로 완성하기',
    steps: [
      { stepNumber: 1, title: '목표 지시 및 스킬 자동 매칭', desc: '"초등 과학 퀴즈 웹앱 만들어줘"라고 입력하면 skill-mcp-router가 최적 스킬을 자동 실행' },
      { stepNumber: 2, title: '자율 생성 및 빌드 검증', desc: '파일 생성 ➔ 단위 테스트 ➔ npm run build 에러 자가 치유까지 원스톱 완결' }
    ],
    expectedOutput: '실행 가능한 완전한 컴포넌트 및 검증 완료 보고서',
    proTip: '3개 이상의 파일을 건드릴 때는 Planning 모드로 계획을 먼저 확인하세요.'
  },
  {
    timeSlot: '05:30 PM (퇴근 전)',
    routineName: '보안 검사 & 자동 PR 커밋 백업',
    icon: 'ShieldCheck',
    persona: '보안 감사관 & DevOps 엔지니어',
    triggerCommand: '/git-auto-pr',
    objective: '코드 보안 취약점을 검사하고, 깔끔한 커밋과 PR을 생성하여 GitHub에 안전하게 백업하기',
    steps: [
      { stepNumber: 1, title: '보안 취약점 및 API Key 유출 검사', desc: 'owasp-security-auditor 스킬로 하드코딩된 키나 취약점 사전 차단' },
      { stepNumber: 2, title: 'Conventional Commits & PR 생성', desc: '오늘 변경된 코드를 깔끔한 제목과 요약으로 깃허브에 푸시' }
    ],
    expectedOutput: '완전한 GitHub PR 및 0에러 빌드 입증',
    proTip: '퇴근 전 PR 본문 링크를 팀원들에게 공유하여 빠른 리뷰를 유도하세요.'
  },
  {
    timeSlot: '10:00 PM (야간 / 학습)',
    routineName: '내일 수업/업무 준비 & 아이디어 기획',
    icon: 'Moon',
    persona: '창의적 아이디어 파트너',
    triggerCommand: '/lesson-worksheet-generator',
    objective: '내일 진행할 교과 수업 활동지나 독서 토론 질문지를 1분 만에 미리 준비해 두기',
    steps: [
      { stepNumber: 1, title: '수업 주제 입력', desc: '과목과 학년, 내일 다룰 책이나 영화 제목을 입력' },
      { stepNumber: 2, title: 'A4 출력용 활동지 생성', desc: '생각 열기 질문, 빈칸 채우기, 퀴즈, 해설지가 완비된 활동지 마크다운 출력' }
    ],
    expectedOutput: '즉시 인쇄 가능한 수업 활동지 및 교사용 가이드',
    proTip: 'PDF나 한글(HWP)로 내보내 학교/사내 공유 폴더에 저장하세요.'
  }
];
