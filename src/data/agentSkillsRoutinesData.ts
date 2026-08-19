export interface CustomSkillTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  triggerExample: string;
  directoryStructure: string;
  skillMdContent: string;
}

export interface RuleFileTemplate {
  id: string;
  toolName: string;
  fileName: string;
  purpose: string;
  content: string;
}

export interface DailyRoutineGuide {
  icon: string;
  timeSlot: string;
  routineName: string;
  objective: string;
  triggerCommand: string;
  steps: {
    stepNumber: number;
    title: string;
    desc: string;
    commandSnippet?: string;
  }[];
  expectedOutput: string;
  proTip: string;
}

export const AGENT_ARCHITECTURE_GUIDE = {
  title: '2026 에이전트 & 멀티에이전트 오케스트레이션 아키텍처',
  tagline: '단일 AI 코딩을 넘어 상호 협업하는 다중 에이전트(Multi-Agent)와 자율 워크플로우 표준',
  principles: [
    {
      step: '1. Intent Analysis',
      desc: '사용자의 요청을 분석하여 필요한 스킬과 도구를 스마트하게 판별'
    },
    {
      step: '2. Planning Mode',
      desc: '대형 작업 착수 전 위험 분석 및 implementation_plan.md 사전 수립'
    },
    {
      step: '3. Human in the Loop',
      desc: '치명적 변경 전 사용자의 명시적 승인(Proceed) 획득'
    },
    {
      step: '4. Subagent Dispatch',
      desc: '격리된 브랜치 워크스페이스에 전문 서브에이전트 병렬 투입'
    },
    {
      step: '5. Reactive Verification',
      desc: '작업 완료 알림 수신 후 npm run build 및 walkthrough.md 검증'
    }
  ]
};

export const CUSTOM_SKILL_TEMPLATES: CustomSkillTemplate[] = [
  {
    id: 'skill-mcp-router',
    name: '🧭 skill-mcp-router (도구 스마트 자동 라우터)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '사용자의 요청을 분석하여 불필요한 도구 호출을 막고 최적의 스킬을 1순위로 자동 매칭하는 지능형 메타 라우터',
    triggerExample: '"로그인 화면에 카카오 로그인 버튼 추가하려고 하는데 어떤 스킬 순서로 진행해야 해?"',
    directoryStructure: `.agents/skills/skill-mcp-router/
└── SKILL.md`,
    skillMdContent: `---
name: skill-mcp-router
description: Analyzes user intent, automatically discovers matching skills from .agents/skills/ and tools from mcp.json, and executes the optimal tool chain with minimal steps.
tools: [file_reader, shell]
---

# Skill & MCP 스마트 라우팅 워크플로우
1. 사용자의 요청에서 [목표], [필요 데이터], [기대 산출물]을 추출한다.
2. \`.agents/skills/\` 디렉토리와 \`mcp.json\`을 조회하여 가장 일치율이 높은 스킬/도구를 판별한다.
3. 선택된 도구를 실행하고, 에러 발생 시 대안 도구로 폴백(Fallback)하여 작업을 완수한다.`
  },
  {
    id: 'skill-session-compactor',
    name: '⚡ session-context-compactor (Claude 세션 압축 & 토큰 다이어트)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '터미널 작업이 길어질 때 진행 상황을 docs/tasks/ 에 요약 저장하고 컨텍스트를 /compact 압축하여 10배 빠른 속도 유지',
    triggerExample: '"지금까지 한 작업 요약해서 docs에 남기고 컨텍스트 다이어트해줘."',
    directoryStructure: `.agents/skills/session-context-compactor/
└── SKILL.md`,
    skillMdContent: `---
name: session-context-compactor
description: Compacts long CLI conversational history into persistent task summaries under docs/tasks/ to save context window tokens.
tools: [file_writer]
---

# Session Compactor Workflow
1. Summarize completed tasks and remaining backlog items.
2. Append status to \`docs/tasks/current.md\`.
3. Clear conversational noise and retain only active implementation focus.`
  },
  {
    id: 'skill-tdd-testing',
    name: '🧪 tdd-test-generator (테스트 주도 개발 TDD & 무결점 검증)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '코드 작성 전에 tests/ 폴더에 실패하는 테스트를 먼저 작성하고, 이를 통과하는 코드를 작성하도록 강제',
    triggerExample: '"회비 정산기 1원 단위 올림/내림 처리 함수 TDD로 테스트 먼저 짜줘."',
    directoryStructure: `.agents/skills/tdd-test-generator/
└── SKILL.md`,
    skillMdContent: `---
name: tdd-test-generator
description: Generates failing unit test cases before code implementation and validates pass status.
tools: [file_writer, shell]
---

# TDD Generator Workflow
1. Define test cases for normal inputs, edge cases, and error boundaries.
2. Write unit tests under \`tests/\`.
3. Execute \`npm test\` and implement code until all tests pass.`
  },
  {
    id: 'skill-plan-feature',
    name: '📋 plan-feature (사전 기획 & 영향도 분석)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '기능 구현 전 기존 코드와 docs/를 먼저 분석하여 위험 요소와 최소 변경 계획서 작성',
    triggerExample: '"게시판 검색 기능 추가 전에 plan-feature 스킬로 docs/plans 에 기획서 먼저 작성해줘."',
    directoryStructure: `.agents/skills/plan-feature/
└── SKILL.md`,
    skillMdContent: `---
name: plan-feature
description: Use this skill before implementing a significant feature to inspect architecture and produce an implementation plan.
tools: [file_reader]
---

# Plan Feature

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
9. Record a persistent plan under \`/docs/plans/\` only when the work is large enough to justify it.`
  },
  {
    id: 'skill-implement-feature',
    name: '⚡ implement-feature (무결점 최소 변경 구현)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '불필요한 리팩토링을 배제하고 기존 패턴을 재사용하여 가장 작고 응집력 있는 코드 작성 및 npm run build 검증',
    triggerExample: '"docs/plans에 있는 기획서대로 implement-feature 스킬을 써서 구현하고 빌드 검증해줘."',
    directoryStructure: `.agents/skills/implement-feature/
└── SKILL.md`,
    skillMdContent: `---
name: implement-feature
description: Use this skill when implementing an approved feature or plan with smallest coherent change and zero regression.
tools: [file_writer, shell]
---

# Implement Feature

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
10. Summarize completed work, verification, and remaining limitations.`
  },
  {
    id: 'skill-debug',
    name: '🔍 debug (Root Cause 추적 & 자가 치유)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '단순 증상만 덮지 않고 에러의 근본 원인을 추적하여 최소 안전 패치 및 회귀 방지 테스트 수행',
    triggerExample: '"로그인 시 401 에러 발생하는 원인 debug 스킬로 추적해서 최소 패치 적용해줘."',
    directoryStructure: `.agents/skills/debug/
└── SKILL.md`,
    skillMdContent: `---
name: debug
description: Use this skill to diagnose defects, find root causes, and apply minimal safe fixes without regression.
tools: [file_reader, file_writer, shell]
---

# Debug

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
10. Explain the root cause and the fix.`
  },
  {
    id: 'skill-code-review',
    name: '🛡️ code-review (10단계 다차원 정밀 코드 리뷰)',
    category: '4대 개발 표준 (DevOps/SOP)',
    description: '기능 정확성, 회귀 위험, 데이터 유실, 타입 안정성, 아키텍처 일관성 등 10개 관점에서 변경점 전수 검사',
    triggerExample: '"이번에 수정한 5개 파일에 대해 code-review 스킬 10단계 기준으로 정밀 검토 리포트 뽑아줘."',
    directoryStructure: `.agents/skills/code-review/
└── SKILL.md`,
    skillMdContent: `---
name: code-review
description: Review changes systematically across 10 dimensions including correctness, regression, security, types, and docs.
tools: [file_reader]
---

# Code Review

Review changes for correctness, regressions, maintainability, and consistency.

## Review Order
1. Functional correctness
2. Regression risk
3. Data loss or security risk
4. Error handling
5. Type safety
6. Test coverage
7. Architecture consistency
8. Maintainability
9. UI / UX consistency where relevant
10. Documentation impact

Report concrete findings first. Do not invent issues solely to produce a longer review.`
  },
  {
    id: 'skill-student-record-writer',
    name: '📋 student-record-writer (생기부 과세특·행특 문구 작성기)',
    category: '교사/교육자 특화',
    description: '학생 관찰 키워드만 넣으면 나이스 1,500Byte 규격 및 교육부 기재 금지어를 100% 필터링한 생기부 문구 생성',
    triggerExample: '"중2 과학 수업에서 태양계 행성 크기 비교 실험을 주도적으로 진행한 김철수 학생 과세특 써줘."',
    directoryStructure: `.agents/skills/student-record-writer/
├── SKILL.md
└── banned_words.json`,
    skillMdContent: `---
name: student-record-writer
description: Generates compliant NEIS student record narratives (Subject-specific talents, behavioral traits) with built-in banned phrase validation and byte count checks.
tools: [file_writer]
---

# 생기부 문구 생성 워크플로우
1. 학생의 과목명, 수행 과제 주제, 핵심 관찰 키워드를 분석한다.
2. 기재 금지어 사전을 대조하여 위반 단어가 없는지 1차 검사한다.
3. [동기 ➔ 활동 ➔ 성장 역량] 3단 논법으로 400~500자 내외의 자연스러운 문장을 생성한다.`
  },
  {
    id: 'skill-lesson-worksheet-generator',
    name: '🏫 lesson-worksheet-generator (교과 단원 수업 활동지)',
    category: '초중고 수업/활동지',
    description: '국어·수학·사회·과학 학년별 단원 맞춤 활동지, 생각 열기 질문, 4지선다·서술형 퀴즈 및 정답 해설지 자동 제작',
    triggerExample: '"초등 4학년 1학기 과학 3단원 \'화산과 지진\' 단원 수업 활동지와 4지선다 퀴즈 3문제 만들어줘."',
    directoryStructure: `.agents/skills/lesson-worksheet-generator/
└── SKILL.md`,
    skillMdContent: `---
name: lesson-worksheet-generator
description: 과목과 학년, 단원 주제를 입력받아 출력용 A4 수업 활동지 및 해설지 생성
tools: [file_writer]
---

# 교과 활동지 생성 워크플로우
1. 대상 학년과 과목(국어/수학/사회/과학/도덕/영어)의 교육과정 성취기준을 확인한다.
2. [생각 열기 그림/글] ➔ [핵심 개념 빈칸 채우기] ➔ [선택형 3문항] ➔ [창의 서술형 1문항]을 구성한다.
3. 교사용 해설 및 지도 팁을 함께 출력한다.`
  }
];

export const RULE_FILE_TEMPLATES: RuleFileTemplate[] = [
  {
    id: 'rule-testing',
    toolName: 'Antigravity & Codex & Claude',
    fileName: '.agents/rules/testing.md',
    purpose: '단위 테스트 검증 및 회귀 방지 정책',
    content: `# Testing & Verification Policy
1. Run the most relevant available checks after changes.
2. Verify behavior, not only compilation.
3. Fix regressions introduced by the current change.`
  },
  {
    id: 'rule-ui-design',
    toolName: 'Antigravity & Codex & Claude',
    fileName: '.agents/rules/ui-design.md',
    purpose: 'UI 디자인 토큰 및 인터랙션 안전 정책',
    content: `# UI / UX Design Principles & Rules
1. Preserve the established visual language defined in DESIGN.md.
2. Keep interaction patterns consistent across all screens.
3. Verify responsive behavior after UI changes (mobile, tablet, desktop).`
  },
  {
    id: 'rule-security',
    toolName: 'Antigravity & Codex & Claude',
    fileName: '.agents/rules/security_policy.md',
    purpose: '보안 인증 및 비밀키 유출 방지 정책',
    content: `# Security Policy & Secret Key Management
1. 모든 비밀번호는 단방향 암호화하여 저장한다.
2. .env 파일은 절대 Git 레포지토리에 커밋하지 않는다 (.gitignore 필수 등록).`
  }
];

export const DAILY_ROUTINES_GUIDES: DailyRoutineGuide[] = [
  {
    icon: 'Sun',
    timeSlot: '오전 09:00 (모닝 스타트)',
    routineName: '아침 기획 & 태스크 셋업 루틴',
    objective: '오늘 개발할 기능에 대해 plan-feature 스킬로 위험 요소를 사전 분석하고 docs/plans 에 계획서 수립',
    triggerCommand: '/plan-feature "오늘 작업할 [기능명]에 대한 단계별 구현 계획서 작성해줘"',
    steps: [
      {
        stepNumber: 1,
        title: 'AGENTS.md 및 docs/ 아키텍처 조회',
        desc: '프로젝트의 코딩 규칙과 기존 컴포넌트 구조를 확인합니다.'
      },
      {
        stepNumber: 2,
        title: '최소 변경 범위 정의 & 계획서 수립',
        desc: 'docs/plans/ 에 단계별 변경 계획과 테스트 방법을 기록합니다.'
      }
    ],
    expectedOutput: 'docs/plans/feature_plan.md 기획서 작성 완료',
    proTip: '복잡한 기능일수록 코드를 바로 짜지 말고 기획서를 먼저 검토하면 버그 발생률이 80% 줄어듭니다.'
  },
  {
    icon: 'Moon',
    timeSlot: '오후 18:00 (클로징 검증)',
    routineName: '퇴근 전 빌드 검증 & PR 백업 루틴',
    objective: '오늘 작성된 코드에 대해 code-review 스킬로 10단계 점검을 거친 후 npm run build 0에러를 증명하고 GitHub에 안전하게 커밋',
    triggerCommand: '/code-review "오늘 작업 내용 전수 검토하고 npm run build 검증해줘"',
    steps: [
      {
        stepNumber: 1,
        title: '10단계 다차원 정밀 리뷰 실행',
        desc: '기능 정확성, 회귀 위험, 타입 안전성을 점검합니다.'
      },
      {
        stepNumber: 2,
        title: 'npm run build 빌드 검증',
        desc: 'TypeScript 타입 오류 0건을 확인하고 Git 커밋을 생성합니다.'
      }
    ],
    expectedOutput: '빌드 0에러 통과 증명 및 깔끔한 Git 커밋 기록',
    proTip: '작업이 끝났다고 바로 커밋하지 말고, 빌드 검증과 세션 압축을 거치면 다음 날 작업 속도가 훨씬 빨라집니다.'
  }
];
