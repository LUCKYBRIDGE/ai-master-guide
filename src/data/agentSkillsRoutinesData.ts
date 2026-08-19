export interface CustomSkillTemplate {
  id: string;
  name: string;
  category: 
    | '도구 라우팅/오케스트레이션' 
    | '4대 핵심 개발 표준'
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
  toolName: 'Google Antigravity' | 'Claude Code' | 'OpenAI Codex' | 'Cursor IDE';
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
  title: '2026 Codex + Claude + Antigravity 통합 3대 AI IDE 아키텍처',
  tagline: '규칙 중복 없는 "단일 진실 공급원(AGENTS.md) + 공용 스킬(.agents/skills/) + 영구 지식(docs/)" 표준',
  principles: [
    {
      step: '1. 단일 진실 공급원 (Single Source of Truth)',
      desc: '모든 AI가 공유하는 공통 규칙, 빌드 명령, 코딩 원칙은 루트 `AGENTS.md`에만 작성하고, `CLAUDE.md`는 `@AGENTS.md`를 임포트하여 중복을 원천 차단합니다.'
    },
    {
      step: '2. 공용 스킬 저장소 (.agents/skills/)',
      desc: '반복 가능한 작업 절차(기획, 구현, 디버깅, 코드리뷰)는 `.agents/skills/`에 표준 `SKILL.md`로 배치하여 Codex와 Antigravity가 100% 공유합니다.'
    },
    {
      step: '3. 사전 기획 & 위험 분석 (Planning Mode)',
      desc: '코드를 바로 수정하지 않고 `plan-feature` 스킬로 영향받는 모듈과 회귀 위험을 분석한 후 최소 단위의 안전한 구현 계획을 수립합니다.'
    },
    {
      step: '4. 최소 응집 변경 & 자가 치유 (Implement & Self-Healing)',
      desc: '불필요한 리팩토링을 배제하고 가장 작은 단위의 변경을 적용하며, 터미널 오류 발생 시 `debug` 스킬로 원인을 분석해 스스로 패치합니다.'
    },
    {
      step: '5. 10단계 정밀 리뷰 & 완료 증명 (Definition of Done)',
      desc: '`code-review` 스킬로 기능/회귀/보안/타입 등 10개 관점에서 점검하고, `npm run build` 0에러를 통과해야 최종 완료로 인정합니다.'
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
    description: '사용자의 요청 의도를 분석하여 수많은 .agents/skills/ 와 mcp.json 도구 중 가장 적합한 도구를 1순위로 탐색·연결해주는 2026 차세대 메타 오케스트레이터 스킬입니다.',
    directoryStructure: `.agents/
└── skills/
    └── skill-mcp-router/
        ├── SKILL.md
        └── references/
            └── tool_routing_matrix.md`,
    skillMdContent: `---
name: skill-mcp-router
description: Analyzes user intent, automatically discovers matching skills from .agents/skills/ and tools from mcp.json, and executes the optimal tool chain with minimal steps.
tools: [file_reader, shell]
---

# Skill & MCP Smart Router Workflow

## 1. Intent Extraction
- Extract [Goal], [Target Domain (Dev, Education, Writing)], [Input Format], [Expected Output] from the user's prompt.

## 2. Matchmaking & Tool Selection
- Scan available \`.agents/skills/\` directories and inspect \`mcp.json\` tool definitions.
- Rank candidate tools by precision, token cost, and execution safety.

## 3. Chained Execution
- Route execution to the #1 matched skill (e.g., plan-feature for coding, student-record-writer for NEIS).
- If an MCP tool returns an error, automatically fallback to secondary tools without stopping.`,
    triggerExample: '"초등 과학 활동지 만들고 브라우저로 화면 캡처해서 확인해줘 (적절한 스킬/도구 알아서 선택해줘)."'
  },

  // =========================================================================
  // --- [2] 4대 핵심 개발 표준 스킬 (Plan, Implement, Debug, Code Review) ---
  // =========================================================================
  {
    id: 'plan-feature',
    name: '📋 plan-feature (기능 구현 전 사전 기획 & 위험 분석)',
    category: '4대 핵심 개발 표준',
    description: '코드를 바로 건드려 망가뜨리지 않고, 변경 범위와 회귀 위험을 분석하여 단계별 구현 계획서를 사전 작성하는 필수 엔지니어링 스킬입니다.',
    directoryStructure: `.agents/
└── skills/
    └── plan-feature/
        └── SKILL.md`,
    skillMdContent: `# Plan Feature

Use this skill before implementing a significant feature.

## Procedure
1. Read \`AGENTS.md\`.
2. Inspect relevant project documentation under \`docs/\`.
3. Inspect the existing implementation.
4. Identify affected modules and dependencies.
5. Identify risks, edge cases, and compatibility constraints.
6. Define the smallest reasonable implementation scope.
7. Produce a step-by-step implementation plan.
8. Identify how the result will be verified.
9. Record a persistent plan under \`/docs/plans/\` only when the work is large enough to justify it.`,
    triggerExample: '"새로운 결제 웹훅 연동 기능 만들기 전에 plan-feature 스킬로 위험 요소랑 구현 계획서 먼저 뽑아줘."'
  },
  {
    id: 'implement-feature',
    name: '⚡ implement-feature (무결점 최소 변경 구현 & 빌드 검증)',
    category: '4대 핵심 개발 표준',
    description: '불필요한 리팩토링을 배제하고 기존 패턴을 재사용하여 가장 작고 응집력 높은 코드를 안전하게 작성하고 검증합니다.',
    directoryStructure: `.agents/
└── skills/
    └── implement-feature/
        └── SKILL.md`,
    skillMdContent: `# Implement Feature

Use this skill when implementing an approved feature or plan.

## Procedure
1. Read \`AGENTS.md\`.
2. Read the relevant implementation plan if one exists.
3. Inspect affected files before modifying them.
4. Reuse existing patterns and components.
5. Implement the smallest coherent change.
6. Avoid unrelated refactoring.
7. Run relevant tests, type checks, linting, build steps (\`npm run build\`), or manual verification.
8. Review the diff for accidental changes.
9. Update documentation if persistent behavior or architecture changed.
10. Summarize completed work, verification, and remaining limitations.`,
    triggerExample: '"승인된 계획서 바탕으로 implement-feature 스킬 적용해서 타입 에러 0건으로 구현해줘."'
  },
  {
    id: 'debug-skill',
    name: '🔍 debug (근본 원인 분석 ➔ 최소 안전 패치 ➔ 회귀 방지)',
    category: '4대 핵심 개발 표준',
    description: '단순 증상만 덮지 않고 에러의 근본 원인(Root Cause)을 추적하여 다른 기능이 망가지지 않게 안전하게 수정하고 자가 치유합니다.',
    directoryStructure: `.agents/
└── skills/
    └── debug/
        └── SKILL.md`,
    skillMdContent: `# Debug

Use this skill to diagnose and fix defects.

## Procedure
1. Reproduce or clearly identify the failure.
2. Gather evidence before changing code.
3. Trace the relevant execution path.
4. Identify the root cause rather than only the visible symptom.
5. Check for related regressions.
6. Implement the smallest safe fix.
7. Verify the original failure no longer occurs.
8. Run relevant regression checks.
9. Avoid unrelated cleanup.
10. Explain the root cause and the fix.`,
    triggerExample: '"터미널 빌드 에러 로그 첨부할 테니 debug 스킬로 근본 원인 파악해서 최소 변경으로 고쳐줘."'
  },
  {
    id: 'code-review',
    name: '🛡️ code-review (10단계 다차원 정밀 코드 리뷰)',
    category: '4대 핵심 개발 표준',
    description: '기능 정확성, 회귀 위험, 데이터 유실, 타입 안정성, 아키텍처 일관성, 문서 반영까지 10개 관점에서 꼼꼼히 점검합니다.',
    directoryStructure: `.agents/
└── skills/
    └── code-review/
        └── SKILL.md`,
    skillMdContent: `# Code Review

Review changes for correctness, regressions, maintainability, and consistency.

## Review Order
1. **Functional correctness**
2. **Regression risk**
3. **Data loss or security risk**
4. **Error handling**
5. **Type safety**
6. **Test coverage**
7. **Architecture consistency**
8. **Maintainability**
9. **UI / UX consistency** where relevant
10. **Documentation impact**

Report concrete findings first. Do not invent issues solely to produce a longer review.`,
    triggerExample: '"오늘 변경된 Git diff 내역을 code-review 스킬의 10단계 기준에 맞춰 정밀 리뷰해줘."'
  },

  // =========================================================================
  // --- [3] 교사/교육자 특화 스킬 5종 ---
  // =========================================================================
  {
    id: 'student-record-writer',
    name: '📋 student-record-writer (생기부 과세특·행특 문구 작성기)',
    category: '교사/교육자 특화',
    description: '학생의 관찰 키워드를 입력받아 교육부 NEIS 바이트 수(세특 1,500Byte)를 검증하고, 기재 금지어(외부 수상, 부모 직업, 공인인증)를 전수 필터링하여 수려한 문장으로 자동 작성합니다.',
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
  // --- [4] 교과 활동지 & 독서 감상문 & 학급 도구 ---
  // =========================================================================
  {
    id: 'lesson-worksheet-generator',
    name: '🏫 lesson-worksheet-generator (교과 수업 활동지 생성기)',
    category: '교육/수업/활동지',
    description: '학년과 과목, 단원 핵심 키워드를 입력받아 생각 열기 발문, 개념 정리 빈칸, 4지선다 퀴즈 및 서술형 문항이 포함된 A4 출력용 수업 활동지를 3초 만에 생성합니다.',
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
  // --- [5] 전문 Git/DB/보안/아키텍처 스킬 ---
  // =========================================================================
  {
    id: 'git-auto-pr',
    name: '🚀 git-auto-pr (자동 브랜치 · 커밋 · PR 생성 스킬)',
    category: 'Git/DevOps',
    description: '작업한 변경 내역(git diff)을 분석하여 Conventional Commits 표준 커밋 메시지를 생성하고 GitHub PR 본문을 마크다운으로 자동 작성합니다.',
    directoryStructure: `.agents/
└── skills/
    └── git-auto-pr/
        ├── SKILL.md
        └── scripts/
            └── generate_pr_body.py`,
    skillMdContent: `---
name: git-auto-pr
description: Analyzes uncommitted git changes, formats conventional commits, and creates a comprehensive GitHub Pull Request.
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    directoryStructure: `.agents/
└── skills/
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
    id: 'rule-agents-master',
    toolName: 'Google Antigravity',
    fileName: 'AGENTS.md',
    purpose: '3대 AI IDE(Codex, Claude, Antigravity)가 공유하는 단일 진실 공급원 프로젝트 헌법',
    content: `# AGENTS.md - Unified Project Constitution
> Single Source of Truth for Codex, Claude Code, and Antigravity

## 1. Technology Stack & Framework
- Framework: React 18+ (Vite) / TypeScript Strict Mode
- Styling: Tailwind CSS v3 / Icons: lucide-react

## 2. Essential Commands
- Dev Server: \`npm run dev\`
- Build & Typecheck: \`npm run build\`
- Unit Tests: \`npm test\`

## 3. Core Principles
- Smallest Coherent Change: Avoid speculative rewrites.
- Single Source of Truth: Keep durable rules here, not duplicated in docs/rules/.
- Verification: Always verify with \`npm run build\` before declaring completion.`
  },
  {
    id: 'rule-claude-code',
    toolName: 'Claude Code',
    fileName: 'CLAUDE.md',
    purpose: 'AGENTS.md 단일 진실 공급원을 임포트하는 클로드 코드 전용 포인터',
    content: `@AGENTS.md

# Claude Code Specific Instructions
Follow the shared project instructions in \`AGENTS.md\`.
Follow applicable Claude-specific rules under \`.claude/rules/\`.
Use shared skills under \`.agents/skills/\`.
Do not duplicate shared rules here.`
  },
  {
    id: 'rule-codex',
    toolName: 'OpenAI Codex',
    fileName: 'AGENTS.md (Codex 연동)',
    purpose: 'Codex 전용 루트 헌법 및 .agents/skills 공용 스킬 연동 지침',
    content: `# Codex Instruction Strategy
- Codex reads \`AGENTS.md\` at the project root as its primary guide.
- Do NOT create \`.codex/rules/\` for ordinary coding rules.
- Procedural skills are shared from \`.agents/skills/<skill-name>/SKILL.md\`.`
  },
  {
    id: 'rule-cursor',
    toolName: 'Cursor IDE',
    fileName: '.cursorrules',
    purpose: 'Cursor Composer 및 인라인 편집 AI 전용 컨텍스트 규칙',
    content: `# .cursorrules - Cursor AI Rules
- Framework: React 18 + Vite + TypeScript Strict + Tailwind CSS
- Check DESIGN.md for token colors (#3182F6, #0F172A).
- Self-heal terminal errors during execution.`
  }
];

export const DAILY_ROUTINES_GUIDES: DailyRoutineGuide[] = [
  {
    timeSlot: '08:30 AM (출근 / 아침 조회 전)',
    routineName: '아침 알림장 & 일일 수업/업무 브리핑',
    icon: 'Sun',
    persona: '학급 담임 및 스마트 업무 비서',
    triggerCommand: '/parent-notice-newsletter',
    objective: '오늘 진행할 수업 일정 확인, 학부모 모바일 알림장 문구 발송 및 아침 조회 사항 1분 만에 점검',
    steps: [
      { stepNumber: 1, title: '오늘의 일정 & GitHub 이슈 확인', desc: '1~6교시 시간표와 미해결 태스크 자동 점검' },
      { stepNumber: 2, title: '모바일 알림장 & 브리핑 생성', desc: '하이클래스/슬랙에 바로 복사해 올릴 친절한 3줄 메시지 작성' }
    ],
    expectedOutput: '당일 학급 알림장 텍스트 및 아침 조회 브리핑 메모',
    proTip: '학급 칠판이나 사내 대시보드에 띄워 구성원들이 오늘 우선순위를 즉시 파악하게 하세요.'
  },
  {
    timeSlot: '01:30 PM (오후 수업 / 집중 개발)',
    routineName: '스마트 라우팅 ➔ 사전 기획(Plan) ➔ 안전 구현(Implement)',
    icon: 'Terminal',
    persona: '교과 수업 설계 전문가 & 시니어 엔지니어',
    triggerCommand: '/skill-mcp-router',
    objective: '자연어로 목표만 지시하면 AI가 최적 스킬을 찾아 활동지나 웹 기능을 0에러로 완성',
    steps: [
      { stepNumber: 1, title: '목표 지시 및 스킬 자동 매칭', desc: 'skill-mcp-router가 plan-feature 또는 lesson-worksheet-generator 자동 호출' },
      { stepNumber: 2, title: '사전 기획 ➔ 최소 변경 구현', desc: '계획 수립 ➔ 파일 생성 ➔ npm run build 에러 자가 치유까지 원스톱 완결' }
    ],
    expectedOutput: '실행 가능한 완전한 컴포넌트 및 검증 완료 보고서',
    proTip: '3개 이상의 파일을 건드릴 때는 반드시 plan-feature 로 계획을 먼저 확인하세요.'
  },
  {
    timeSlot: '04:30 PM (방과 후 / 퇴근 전)',
    routineName: '생기부 과세특 / 10단계 코드리뷰 & 자동 PR 백업',
    icon: 'ShieldCheck',
    persona: '평가관 & DevOps 보안 감사관',
    triggerCommand: '/code-review',
    objective: '학생 관찰 기록 나이스 검사 및 오늘 작업한 코드를 10단계로 정밀 리뷰하여 GitHub에 안전하게 백업',
    steps: [
      { stepNumber: 1, title: '생기부 금지어 / 보안 취약점 검사', desc: '나이스 글자수 검사 및 하드코딩된 API Key 유출 사전 차단' },
      { stepNumber: 2, title: '10단계 리뷰 & Conventional PR 생성', desc: '오늘 변경된 코드를 깔끔한 제목과 요약으로 깃허브에 푸시' }
    ],
    expectedOutput: 'NEIS 생기부 문장 목록 및 완전한 GitHub PR',
    proTip: '퇴근 전 PR 본문 링크를 팀원들에게 공유하여 빠른 리뷰를 유도하세요.'
  },
  {
    timeSlot: '09:00 PM (야간 / 교재 연구)',
    routineName: 'STEAM 융합 프로젝트 & 창의 수업/기획 연구',
    icon: 'Moon',
    persona: '창의 융합 수업 및 기획 파트너',
    triggerCommand: '/steam-project-designer',
    objective: '다음 주 진행할 교과 융합(STEAM) 모둠 프로젝트 미션지와 상/중/하 채점 루브릭 미리 완성하기',
    steps: [
      { stepNumber: 1, title: '융합 교과 및 주제 설정', desc: '과학+미술, 사회+AI 등 실생활 문제 해결 중심 테마 선정' },
      { stepNumber: 2, title: '모둠 미션지 및 루브릭 출력', desc: '차시별 활동 흐름표와 학생 상호 평가표 완비' }
    ],
    expectedOutput: '4차시 분량의 융합 프로젝트 수업 계획서 및 평가 기준표',
    proTip: '동료 선생님/팀원들과 공유하여 공동 연구 자료로 활용하세요.'
  }
];
