export interface CustomSkillTemplate {
  id: string;
  name: string;
  category: 
    | '도구 라우팅/오케스트레이션' 
    | '교사/교육자 특화'
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
  tagline: '단순 프롬프트 질의응답에서 "스스로 계획하고 검증하는 자율 개발·수업 설계팀"으로의 진화',
  principles: [
    {
      step: '1. 사전 기획 & 사용자 승인 (Planning Mode)',
      desc: '코드를 바로 건드려 망가뜨리지 않고, `implementation_plan.md`를 먼저 작성하여 변경 범위, 수업 구성안, 위험 요소를 사용자에게 검토 및 승인받은 후 착수합니다.'
    },
    {
      step: '2. 도구 호출 & 샌드박스 실행 루프 (Tool Execution Loop)',
      desc: '파일 읽기/쓰기(`view_file`, `write_to_file`), 터미널 명령어 실행(`run_command`), 웹 검색(`search_web`), MCP 서버 호출을 순차적으로 수행하며 상태를 갱신합니다.'
    },
    {
      step: '3. 전문 서브에이전트 병렬 오케스트레이션 (Subagents)',
      desc: '메인 에이전트(Supervisor)가 교육과정 분석 에이전트, 활동지 제작 에이전트, 브라우저 렌더링 검사 에이전트를 백그라운드에 동시 스폰하여 컨텍스트 오염 없이 협업합니다.'
    },
    {
      step: '4. 반응형 비동기 깨움 (Reactive Wakeup & Task Management)',
      desc: '대규모 빌드나 복잡한 문서 변환 동안 무한 대기하지 않고, 완료 이벤트 발생 시 자동으로 에이전트가 깨어나 결과를 처리합니다.'
    },
    {
      step: '5. 사후 검증 & 자가 치유 (Verification & Self-healing Walkthrough)',
      desc: '타입/빌드 실패나 나이스 글자수 초과 시 오류를 스스로 분석해 자가 수정(Self-healing)을 거친 후, `walkthrough.md`로 최종 산출물을 증명합니다.'
    }
  ]
};

export const CUSTOM_SKILL_TEMPLATES: CustomSkillTemplate[] = [
  // =========================================================================
  // --- [1] 도구 라우팅/오케스트레이션 ---
  // =========================================================================
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
- Extract [Goal], [Target Audience (Teachers, Students, Devs)], [Input Format], [Expected Output] from the user's prompt.

## 2. Matchmaking & Tool Selection
- Scan available \`skills/\` directories and inspect \`mcp.json\` tool definitions.
- Rank candidate tools by precision, token cost, and execution safety.

## 3. Chained Execution
- Route execution to the #1 matched skill (e.g., student-record-writer for NEIS, lesson-worksheet-generator for quizzes).
- If an MCP tool returns an error, automatically fallback to secondary tools without stopping.`,
    triggerExample: '"초등 과학 활동지 만들고 브라우저로 화면 캡처해서 확인해줘 (적절한 스킬/도구 알아서 선택해줘)."'
  },

  // =========================================================================
  // --- [2] 교사/교육자 특화 스킬 5종 (생기부, 지도안, 가정통신문, 피드백, STEAM) ---
  // =========================================================================
  {
    id: 'student-record-writer',
    name: '📋 student-record-writer (생기부 과세특·행특 문구 작성기)',
    category: '교사/교육자 특화',
    description: '학생의 관찰 키워드를 입력받아 교육부 NEIS 바이트 수(세특 1,500Byte)를 검증하고, 기재 금지어(외부 수상, 부모 직업, 공인인증)를 전수 필터링하여 수려한 문장으로 자동 작성합니다.',
    directoryStructure: `skills/
└── student-record-writer/
    ├── SKILL.md
    └── references/
        └── neis_banned_words.json`,
    skillMdContent: `---
name: student-record-writer
description: Generates compliant NEIS student record narratives (Subject-specific talents, behavioral traits) with strict banned-phrase checks and byte calculations.
tools: [file_writer]
---

# 생기부 과세특 및 행특 작성 워크플로우

## 1. 관찰 키워드 분석
- 교과목, 수행평가 주제, 학생의 구체적 탐구 내용 및 협업 태도 파악.

## 2. 교육부 NEIS 기재 규정 준수 검사
- **금지어 필터링**: 공인어학시험(TOEIC 등), 교외 경시대회 수상, 부모 직업/사회경제적 지위 암시 단어 전수 배제.
- **바이트 계산**: 한글 1자=3바이트, 띄어쓰기=1바이트 기준으로 1,500바이트 한도 내 최적 분량 구성.

## 3. 3단 구조 서술 문체
- [동기 및 계기] ➔ [구체적 탐구/수행 과정] ➔ [성장한 역량 및 인성적 배려]
- 긍정적 종결어미(~함, ~을 보임, ~로 평가됨)로 전문성 있는 교사 서술체 완성.`,
    triggerExample: '"중2 과학 태양계 행성 모형 만들기 수업에서 모둠장 맡아 성실히 발표한 학생 과세특 500자 써줘."'
  },
  {
    id: 'lesson-plan-rubric-gen',
    name: '📐 lesson-plan-rubric-gen (교수학습 지도안 & 채점 루브릭)',
    category: '교사/교육자 특화',
    description: '2022 개정 교육과정 성취기준을 연계하여 45분/50분 차시별 [도입-전개-정리] 교수학습 과정안과 상/중/하 3단계 수행평가 채점 기준표(루브릭)를 생성합니다.',
    directoryStructure: `skills/
└── lesson-plan-rubric-gen/
    ├── SKILL.md
    └── references/
        └── 2022_revised_curriculum.md`,
    skillMdContent: `---
name: lesson-plan-rubric-gen
description: Creates structured 45-min/50-min lesson plans (timelines, teacher prompts, student activities) and 3-level assessment rubrics aligned with national standards.
tools: [file_writer]
---

# 교수학습 지도안 및 루브릭 생성 워크플로우

## 1. 성취기준 매핑
- 국가 교육과정 성취기준 코드 및 학습 목표(지식, 기능, 태도) 설정.

## 2. 차시별 타임라인 (50분 기준)
- [도입 5분]: 전시 학습 상기, 생각 열기 동기유발 질문, 학습 목표 제시.
- [전개 35분]: [활동 1: 핵심 개념 탐구] ➔ [활동 2: 모둠 협동 과제] ➔ [활동 3: 적용 및 공유].
- [정리 10분]: 배움 정리, 형성평가 퀴즈, 차시 예고 및 과제 안내.

## 3. 상/중/하 3단계 채점 루브릭
- 모호한 표현 대신 관찰 가능한 행동 지표로 평가 기준 명시.`,
    triggerExample: '"초등 5학년 2학기 사회 \'조선 후기 서민 문화\' 1차시 교수학습 과정안이랑 수행평가 채점 루브릭 표 만들어줘."'
  },
  {
    id: 'parent-notice-newsletter',
    name: '✉️ parent-notice-newsletter (가정통신문 & 모바일 알림장)',
    category: '교사/교육자 특화',
    description: '현장체험학습, 학부모 상담주간, 계절별 안전교육 등 공손하고 격식 있는 학교 공식 가정통신문 서식과 알림장 앱(하이클래스, 클래스팅)용 친절한 3줄 요약본을 자동 작성합니다.',
    directoryStructure: `skills/
└── parent-notice-newsletter/
    ├── SKILL.md
    └── templates/
        └── official_notice_a4.md`,
    skillMdContent: `---
name: parent-notice-newsletter
description: Drafts polite, formal school parent newsletters with return slips and concise mobile notification summaries for classroom communication apps.
tools: [file_writer]
---

# 가정통신문 및 알림장 작성 워크플로우

## 1. 안내 목적 및 일정 구조화
- 행사명, 일시, 장소, 대상, 준비물, 1인당 소요 경비, 안전 수칙 취합.

## 2. 공식 문서 서식 (A4 1장 출력용)
- 계절 인사말 ➔ 행사 취지 ➔ 세부 안내 표 ➔ 참가 신청 및 동의서(절취선) ➔ 학교장 직인란.

## 3. 모바일 알림장 요약본 (스마트폰 앱용)
- 바쁜 학부모님을 위한 핵심 일정/준비물 3줄 요약 및 제출 마감일 강조.`,
    triggerExample: '"가을 현장체험학습(경주 국립박물관) 안내 가정통신문과 참가 신청서 양식, 학부모 알림장 문구 작성해줘."'
  },
  {
    id: 'student-feedback-coach',
    name: '💬 student-feedback-coach (과제 샌드위치 성장 피드백 코칭)',
    category: '교사/교육자 특화',
    description: '학생 과제물이나 서술형 답안을 보고 [구체적 칭찬 ➔ 1가지 핵심 개선 조언 ➔ 따뜻한 격려]의 3단계 샌드위치 피드백 코멘트를 학생 눈높이에 맞게 다정하게 작성합니다.',
    directoryStructure: `skills/
└── student-feedback-coach/
    ├── SKILL.md
    └── references/
        └── growth_mindset_phrases.md`,
    skillMdContent: `---
name: student-feedback-coach
description: Produces growth-mindset oriented 3-tier sandwich feedback (Praise Effort -> Actionable Next Step -> Warm Encouragement) for student assignments.
tools: [file_writer]
---

# 학생 피드백 코칭 워크플로우

## 1. 학생 과제 분석
- 잘된 점(독창성, 성실성, 논리성)과 개선이 필요한 핵심 영역 파악.

## 2. 3단계 샌드위치 피드백 작성
1. **[1단계 칭찬]**: 결과보다 과정과 노력을 구체적으로 칭찬 (예: "자료 조사를 3가지나 꼼꼼히 찾은 점이 돋보여요!").
2. **[2단계 개선 팁]**: 스스로 고쳐볼 수 있는 질문형 힌트 (예: "결론에서 내 생각을 한 줄만 더 보태면 훨씬 설득력 있어질 거예요.").
3. **[3단계 격려]**: 다음 학습에 대한 기대와 자신감 북돋움 (예: "다음 발표도 정말 기대할게요! 멋져요.").`,
    triggerExample: '"초등 6학년 학생이 쓴 환경오염 주장하는 글 읽고 다정한 샌드위치 피드백 코멘트 써줘."'
  },
  {
    id: 'steam-project-designer',
    name: '🔬 steam-project-designer (교과 융합 STEAM 프로젝트 설계기)',
    category: '교사/교육자 특화',
    description: '과학+예술, 사회+인공지능 등 2개 이상 교과를 엮은 문제해결형(PBL) 융합 프로젝트 수업, 모둠 미션지, 준비물 리스트 및 산출물 전시 평가서를 설계합니다.',
    directoryStructure: `skills/
└── steam-project-designer/
    ├── SKILL.md
    └── templates/
        └── pbl_challenge_brief.md`,
    skillMdContent: `---
name: steam-project-designer
description: Designs real-world interdisciplinary STEAM projects (Science, Tech, Engineering, Arts, Math) with PBL challenge briefs and peer review rubrics.
tools: [file_writer]
---

# STEAM 융합 프로젝트 설계 워크플로우

## 1. 실생활 중심 탐구 질문 (Driving Question)
- 예: "지속 가능한 친환경 스마트 시티를 모형으로 제작한다면?"

## 2. 교과 연계 및 4차시 모둠 활동 구성
- [1차시]: 문제 탐색 및 과학적/사회적 배경 조사.
- [2차시]: 수학적 수치 계산 및 기술적 설계도 스케치.
- [3차시]: 메이커 제작 및 예술적 디자인 완성.
- [4차시]: 모둠별 부스 전시 발표 및 상호 동료 평가.

## 3. 준비물 & 동료 평가 양식
- 재료 목록, 안전 유의사항, 학생 상호 평가표 동봉.`,
    triggerExample: '"중학교 1학년 과학(빛과 파동)+미술(착시 예술) 연계한 4차시 STEAM 프로젝트 수업 계획서 짜줘."'
  },

  // =========================================================================
  // --- [3] 교육/수업/활동지 & 독서 감상문 & 학급 도구 ---
  // =========================================================================
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

  // =========================================================================
  // --- [4] 전문 개발 및 보안/DB/DevOps ---
  // =========================================================================
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
- You are a senior educator and software architect.
- Provide production-grade, copy-paste ready educational content with full rubrics and clean code.
- Format structured tables and breakdown lists for clarity.`
  }
];

export const DAILY_ROUTINES_GUIDES: DailyRoutineGuide[] = [
  {
    timeSlot: '08:30 AM (출근 / 아침 조회 전)',
    routineName: '아침 알림장 & 일일 수업 브리핑',
    icon: 'Sun',
    persona: '학급 담임 및 교과 전문 어시스턴트',
    triggerCommand: '/parent-notice-newsletter',
    objective: '오늘 진행할 수업 일정 확인, 학부모 모바일 알림장 문구 발송 및 아침 조회 사항 1분 만에 점검',
    steps: [
      { stepNumber: 1, title: '오늘의 학급 일정 확인', desc: '1~6교시 시간표와 준비물, 특별실 이동 일정 자동 점검' },
      { stepNumber: 2, title: '모바일 알림장 문구 생성', desc: '하이클래스/클래스팅에 바로 복사해 올릴 친절한 알림장 3줄 메시지 작성' }
    ],
    expectedOutput: '당일 학급 알림장 텍스트 및 아침 조회 브리핑 메모',
    proTip: '학급 칠판이나 TV 화면에 띄워 학생들이 등교하자마자 준비물을 챙기게 하세요.'
  },
  {
    timeSlot: '01:30 PM (오후 수업 / 공강)',
    routineName: '스마트 수업 활동지 & 단원 평가 퀴즈 제작',
    icon: 'Terminal',
    persona: '교과 수업 설계 전문가',
    triggerCommand: '/lesson-worksheet-generator',
    objective: '내일 진행할 단원의 A4 출력용 수업 활동지, 생각 열기 질문 및 4지선다 퀴즈를 3초 만에 생성',
    steps: [
      { stepNumber: 1, title: '단원 성취기준 입력', desc: '과목과 단원명을 입력하면 skill-mcp-router가 최적 활동지 템플릿 호출' },
      { stepNumber: 2, title: 'A4 양식 및 해설지 완결', desc: '생각 열기 발문 ➔ 개념 정리 ➔ 퀴즈 ➔ 교사용 정답표 일괄 출력' }
    ],
    expectedOutput: '인쇄 즉시 가능한 A4 수업 활동지 마크다운 및 HWP 복사용 텍스트',
    proTip: '학교 인쇄실에 넘기기 전에 교사용 지도 팁과 정답지를 별도로 분리해 인쇄하세요.'
  },
  {
    timeSlot: '04:30 PM (방과 후 / 교무실)',
    routineName: '생기부 과세특 작성 & 나이스 금지어 검사',
    icon: 'ShieldCheck',
    persona: '생기부 전문 행정 및 평가관',
    triggerCommand: '/student-record-writer',
    objective: '오늘 관찰한 학생들의 수업 태도와 발표 내용을 나이스 글자수 및 금지어 위반 없이 학생부 문장으로 저장',
    steps: [
      { stepNumber: 1, title: '학생 관찰 키워드 입력', desc: '학생별 수행 과제 키워드를 입력해 400~500자 세특 초안 생성' },
      { stepNumber: 2, title: 'NEIS 바이트 및 금지어 전수 검사', desc: '사외 수상, 부모 직업 등 기재 금지어 위반 0건 확인' }
    ],
    expectedOutput: 'NEIS 나이스 시스템에 바로 복사해 붙여넣을 수 있는 학생별 과세특 문장 목록',
    proTip: '학기말에 몰아서 쓰지 말고, 매주 방과 후에 3~4명씩 꾸준히 기록해두면 학기말 업무가 90% 줄어듭니다.'
  },
  {
    timeSlot: '09:00 PM (야간 / 교재 연구)',
    routineName: 'STEAM 융합 프로젝트 & 창의 수행평가 기획',
    icon: 'Moon',
    persona: '창의 융합 수업 기획 파트너',
    triggerCommand: '/steam-project-designer',
    objective: '다음 주 진행할 교과 융합(STEAM) 모둠 프로젝트 미션지와 상/중/하 채점 루브릭 미리 완성하기',
    steps: [
      { stepNumber: 1, title: '융합 교과 및 주제 설정', desc: '과학+미술, 사회+인공지능 등 실생활 문제 해결 중심 테마 선정' },
      { stepNumber: 2, title: '모둠 미션지 및 루브릭 출력', desc: '차시별 활동 흐름표와 학생 상호 평가표 완비' }
    ],
    expectedOutput: '4차시 분량의 융합 프로젝트 수업 계획서 및 평가 기준표',
    proTip: '동학년 선생님들과 공유하여 공동 수업 연구 자료로 활용하세요.'
  }
];
