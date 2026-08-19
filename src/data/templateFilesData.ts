// 1. 지원하는 AI 도구 정의 (STEP 1: 다중 선택 가능)
export interface AiToolItem {
  id: string;
  name: string;
  vendor: string;
  badge: string;
  badgeColor: string;
  description: string;
  defaultSelected: boolean;
  ruleHint: string;
}

// 2. 실무 작업 모듈 정의 (중복 다중 선택 가능)
export interface TaskFeatureModule {
  id: string;
  name: string;
  category: 
    | '스킬/MCP 자동추천' 
    | '초중고 수업/활동지' 
    | '독서/문화/글쓰기' 
    | '학급/모임/도구' 
    | '교육/학습용' 
    | '데이터/시각화' 
    | '비즈니스/문서' 
    | '게임/시뮬레이션' 
    | 'AI챗봇/어시스턴트' 
    | '프론트엔드/UI' 
    | '백엔드/DB' 
    | '보안/결제' 
    | '협업/DevOps' 
    | '데이터/자동화';
  badge: string;
  badgeColor: string;
  shortDesc: string;
  detailedImpact: {
    agentRuleSummary: string;
    mcpServerName?: string;
    mcpType?: 'zero-config' | 'needs-auth';
    mcpSetupGuide?: string;
    skillPath?: string;
    policyPath?: string;
  };
  defaultSelected: boolean;
  agentRuleSection: string;
  mcpServer?: {
    key: string;
    mcpType: 'zero-config' | 'needs-auth';
    envVarNeeded?: string;
    config: {
      command: string;
      args: string[];
      env?: Record<string, string>;
      description: string;
    };
  };
  skillFile?: {
    path: string;
    description: string;
    content: string;
  };
  extraFile?: {
    path: string;
    description: string;
    content: string;
  };
}

export interface NewProjectScaffoldGuide {
  title: string;
  summary: string;
  hierarchyDiagram: string;
  steps: {
    stepNumber: number;
    title: string;
    action: string;
    outputFile: string;
  }[];
  copyableScaffoldPrompt: string;
}

export interface McpSkillAgentSummary {
  id: string;
  name: string;
  englishName: string;
  role: string;
  metaphor: string;
  description: string;
  practicalExample: string;
  keyBenefits: string[];
  sampleFile: string;
}

export interface TemplateConfigFile {
  id: string;
  filename: string;
  badge: string;
  badgeColor: string;
  targetLocation: string;
  supportedTools: string;
  description: string;
  whyNeeded: string;
  customizationTips: string[];
  rawContent: string;
}

// 템플릿 파일 3대장 (CLAUDE.md, AGENTS.md, DESIGN.md)
export const TEMPLATE_CONFIG_FILES: TemplateConfigFile[] = [
  {
    id: 'template-claude-md',
    filename: 'CLAUDE.md',
    badge: 'Claude Code 전용',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    targetLocation: '프로젝트 최상위 루트 (./CLAUDE.md)',
    supportedTools: 'Claude Code CLI, Claude Desktop MCP',
    description: '터미널에서 `claude`를 실행했을 때 빌드 명령어, 프로젝트 컨벤션, 자동 검증 규칙을 즉시 주입하는 핵심 지침서',
    whyNeeded: '이 파일이 없으면 Claude Code가 매번 패키지 매니저가 무엇인지, 빌드 명령어가 무엇인지 물어보거나 엉뚱한 테스트를 돌립니다.',
    customizationTips: [
      '1줄 수정: 프로젝트의 실행 명령어(예: npm run dev 또는 yarn start)를 맞춥니다.',
      '2줄 수정: 사용하는 UI 프레임워크(React, Next.js, Vue)와 CSS 도구(Tailwind)를 명시합니다.'
    ],
    rawContent: `# CLAUDE.md - Claude Code Project Working Agreements

## 1. Project Overview & Framework
- Framework: React 18+ (Vite) / TypeScript Strict Mode
- Styling: Tailwind CSS v3
- Icons: lucide-react

## 2. Essential Commands
- Dev Server: \`npm run dev\`
- Build & Typecheck: \`npm run build\`
- Lint & Format: \`npm run lint\`

## 3. Workflow & Verification Rules
- Verification: Always run \`npm run build\` to verify zero TypeScript errors before marking tasks complete.
- Preservation: Preserve all existing code comments and untouched logic.
- Secrets: Never hardcode API keys or credentials; use \`.env\` environment variables.`
  },
  {
    id: 'template-agents-md',
    filename: 'AGENTS.md',
    badge: '자율 에이전트 공용',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    targetLocation: '프로젝트 최상위 루트 (./AGENTS.md)',
    supportedTools: 'Google Antigravity, OpenAI Codex, Cursor, Roo Code, Windsurf',
    description: '2026 차세대 자율 코딩 에이전트들을 위한 통합 지침서로, 권한 범위와 자가 치유(Self-Healing) 원칙을 규정',
    whyNeeded: '자율 에이전트가 데이터베이스 파괴 명령을 함부로 실행하지 못하게 막고, 빌드 에러 발생 시 스스로 고치도록 가이드합니다.',
    customizationTips: [
      '권한 제어: 사용자의 명시적 승인이 필요한 위험 명령어(DROP TABLE, git push -f 등)를 지정합니다.',
      '계획 모드: 3개 이상의 파일을 수정할 때 사전 기획서(Implementation Plan)를 작성하도록 강제합니다.'
    ],
    rawContent: `# AGENTS.md - Unified Autonomous Coding Agent Instructions

## 1. Commands & Environment
- Dev Server: \`npm run dev\`
- Verification Build: \`npm run build\`
- Unit Tests: \`npm test\`

## 2. Agent Role & Permissions Boundary
- Autonomous Tasks: File editing, dependency install (\`npm i\`), build/test verification.
- User Approval Required: Database destruction commands (\`DROP\`, unbounded \`DELETE\`), force push (\`git push -f\`), external paid API calls.

## 3. Self-Healing & Planning
- Planning: For complex tasks modifying 3+ files, outline the architecture in an implementation plan before writing code.
- Self-Healing: When a terminal command fails, analyze the error log and attempt a self-fix before giving up.
- Completion Proof: Always verify that \`npm run build\` passes with 0 errors before declaring task completion.`
  },
  {
    id: 'template-design-md',
    filename: 'DESIGN.md',
    badge: '디자인 시스템 규격',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    targetLocation: '프로젝트 최상위 루트 (./DESIGN.md)',
    supportedTools: '모든 AI 도구 및 프론트엔드 에이전트 공통',
    description: 'AI가 조잡한 무지개색 UI를 만들지 않도록 메인 컬러, 폰트, 여백 그리드, 곡률 토큰을 완벽하게 통제하는 디자인 가이드',
    whyNeeded: '디자인 규격서가 없으면 AI가 페이지마다 제각각 다른 색상(#ff0000, 핫핑크 등)과 인라인 style을 마구잡이로 작성합니다.',
    customizationTips: [
      'Primary Color: 브랜드 고유의 헥사코드(예: Toss Blue #3182F6, Slate #0F172A)를 입력합니다.',
      'Radius & Spacing: 버튼과 카드의 둥글기(rounded-xl, rounded-2xl)를 통일합니다.'
    ],
    rawContent: `# DESIGN.md - Design System Tokens & Guidelines

## 1. Color Palette
- Primary Brand: \`#3182F6\` (Toss Blue)
- Secondary Accent: \`#6366F1\` (Indigo 500)
- Background Base: \`#0F172A\` (Slate 900)
- Surface / Card: \`#1E293B\` (Slate 800) / Border: \`1px solid rgba(255,255,255,0.1)\`
- Text Primary: \`#F8FAFC\` (Slate 50)
- Text Muted: \`#94A3B8\` (Slate 400)

## 2. Typography & Hierarchy
- Font Family: Pretendard, -apple-system, sans-serif
- Heading 1: 24px / Bold (700)
- Body: 14px / Regular (400) / Line-height: 1.5

## 3. Spacing & Radius
- Base Grid: 4px increments (p-2=8px, p-4=16px, p-6=24px)
- Button Radius: \`rounded-xl\` (12px)
- Card Radius: \`rounded-2xl\` (16px)`
  }
];

// 에이전트, MCP, 스킬 3총사 핵심 정리 데이터
export const MCP_SKILL_AGENT_CONCEPTS: McpSkillAgentSummary[] = [
  {
    id: 'concept-agent',
    name: '1. 에이전트 (Agent)',
    englishName: 'Autonomous AI Coding Agent',
    role: '두뇌이자 자율 실행자 (Agent)',
    metaphor: '👨‍🍳 전문 셰프: 목표를 전달하면 스스로 계획을 세우고, 재료를 준비해 완성된 요리를 만들어내는 주체',
    description: '단순히 질문에 답하는 챗봇이 아니라, 목표를 주면 파일 생성, 코드 작성, 터미널 명령어 실행, 에러 자동 수정까지 스스로 수행하는 자율 코딩 AI입니다.',
    practicalExample: '"초등 3학년 과학 수업 활동지와 퀴즈 웹앱 만들어줘"라고 요청하면 [단원 분석 ➔ 문제 생성 ➔ 화면 제작 ➔ 빌드 테스트 ➔ 완성]을 알아서 진행',
    keyBenefits: [
      '개발자가 코드를 일일이 타이핑할 필요 없이 핵심 목표만 지시',
      '여러 파일을 동시에 수정하고 빌드 에러를 스스로 테스트하며 해결',
      'Google Antigravity, Claude Code, OpenAI Codex 등이 대표적'
    ],
    sampleFile: 'AGENTS.md / CLAUDE.md'
  },
  {
    id: 'concept-mcp',
    name: '2. MCP (Model Context Protocol)',
    englishName: 'Standard Tool & Data Connector',
    role: '외부 시스템 연결 도구 (Connectors)',
    metaphor: '🔌 외부 연결선: AI에게 데이터베이스, 웹 브라우저, GitHub를 안전하게 연결해주는 표준 규격',
    description: 'AI가 회사 데이터베이스(PostgreSQL), GitHub 저장소, 내 컴퓨터 파일, 웹 브라우저 등 외부 시스템과 안전하게 통신할 수 있도록 만든 오픈소스 표준 프로토콜입니다.',
    practicalExample: 'AI가 내 로컬 DB에 직접 쿼리를 날려 테이블 구조를 확인하거나, 브라우저를 띄워 실제 화면 캡처 후 디자인 검증',
    keyBenefits: [
      '무설정 MCP(Puppeteer, Filesystem)는 별도 키 없이 npx로 즉시 구동',
      '인증형 MCP(GitHub, PostgreSQL)는 .env 환경변수 설정으로 안전하게 연결',
      '보안 정책에 맞춰 읽기 전용(Read-only) 권한으로 안전하게 제한 가능'
    ],
    sampleFile: 'mcp.json & .env.example'
  },
  {
    id: 'concept-skill',
    name: '3. 스킬 (Skill)',
    englishName: 'Reusable Workflow Recipe',
    role: '반복 작업 자동화 매뉴얼 (Workflows)',
    metaphor: '📖 표준 작업 레시피: 복잡한 작업을 언제나 동일한 품질로 빠르게 처리하도록 적어둔 실무 가이드',
    description: '교과 활동지 자동 생성, Git PR 자동 생성 등 반복되는 실무 작업을 AI가 실수 없이 일관되게 수행하도록 절차를 정리해 둔 재사용 문서입니다.',
    practicalExample: '에이전트에게 `/lesson-worksheet` 스킬을 실행시키면 초등학교 국어 1단원 맞춤 활동지를 A4 양식으로 3초 만에 작성',
    keyBenefits: [
      '매번 프롬프트를 길게 쓸 필요 없이 짧은 명령어 하나로 표준화된 작업 수행',
      '팀원 전체가 동일한 품질의 산출물을 얻을 수 있도록 프로세스 표준화',
      'Antigravity 및 Claude Code 환경에서 skills/{이름}/SKILL.md 파일로 즉시 로딩'
    ],
    sampleFile: 'skills/{skill-name}/SKILL.md'
  }
];

// 1. 사용할 AI 도구 목록 (STEP 1: 4대 핵심 도구 다중 선택)
export const AI_TOOLS_CATALOG: AiToolItem[] = [
  {
    id: 'tool-claude-code',
    name: '클로드 코드 (Claude Code)',
    vendor: 'Anthropic',
    badge: 'CLI',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    description: '터미널 기반 자율 코딩 및 명령어 실행 도구',
    defaultSelected: true,
    ruleHint: 'CLAUDE.md 및 @AGENTS.md 포인터 연동'
  },
  {
    id: 'tool-antigravity',
    name: '안티그래비티 (Antigravity)',
    vendor: 'Google',
    badge: 'IDE',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    description: '서브에이전트 병렬 실행 및 MCP 도구 연동 IDE',
    defaultSelected: true,
    ruleHint: 'AGENTS.md 마스터 지침 및 mcp.json 연동'
  },
  {
    id: 'tool-codex',
    name: '코덱스 (Codex)',
    vendor: 'OpenAI',
    badge: 'IDE / Agent',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    description: '코드 자동 완성, 리팩토링 및 자율 실행 지원',
    defaultSelected: false,
    ruleHint: 'AGENTS.md 표준 마스터 지침 준수'
  },
  {
    id: 'tool-grok-build',
    name: '그록 빌드 (Grok Build)',
    vendor: 'xAI',
    badge: 'Agent',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    description: '초고속 추론 및 최소 스텝 자율 실행 에이전트',
    defaultSelected: false,
    ruleHint: 'Grok 최소 스텝 자율 완결 지침 주입'
  }
];

// 2. 실무 작업 모듈 목록 (STEP 2: 중복 선택 체크박스)
export const TASK_FEATURE_MODULES: TaskFeatureModule[] = [
  // --- [1] 스킬 & MCP 지능형 자동 라우터 ---
  {
    id: 'mod-skill-mcp-router',
    name: '🧭 스킬 & MCP 자동 탐색 및 스마트 추천 라우터 (Skill & MCP Smart Selector)',
    category: '스킬/MCP 자동추천',
    badge: '스마트 도구 라우터',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    shortDesc: '등록된 수십 개의 스킬과 MCP 도구 중, 내가 내린 지시(프롬프트)에 딱 맞는 최적의 스킬/도구를 AI가 스스로 찾아 실행하는 메타 오케스트레이터',
    detailedImpact: {
      agentRuleSummary: '질의 의도 분석 ➔ 1순위 적합 스킬 탐색 ➔ 불필요한 도구 호출 최소화 ➔ 최적 도구 자동 체이닝',
      skillPath: 'skills/skill-mcp-router/SKILL.md',
      policyPath: 'rules/tool_selection_policy.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [스킬 & MCP 도구 스마트 라우팅 및 선택 규칙]
- **작업 의도 파악**: 사용자의 요청이 들어오면 \`skills/\` 폴더의 스킬 목록과 \`mcp.json\` 도구 명세를 먼저 스캔하여 가장 적합한 도구를 1순위로 선정할 것.
- **불필요한 도구 호출 금지**: 단순 질의나 파일 작성에는 무거운 외부 MCP를 호출하지 말고, 꼭 필요한 순간에만 정확한 파라미터로 호출할 것.
- **도구 조합 체이닝**: "자료 검색 ➔ 요약 활동지 작성 ➔ 브라우저 검증"과 같이 2개 이상의 도구가 필요할 때 순서대로 자연스럽게 연결(Pipeline)하여 완결할 것.`,
    skillFile: {
      path: 'skills/skill-mcp-router/SKILL.md',
      description: '사용자 명령에 가장 적합한 스킬과 MCP를 스스로 탐색하고 실행하는 스마트 라우터 스킬',
      content: `---
name: skill-mcp-router
description: Analyzes user intent, automatically discovers matching skills from skills/ and tools from mcp.json, and executes the optimal tool chain with minimal steps.
tools: [file_reader, shell]
---

# Skill & MCP 스마트 라우팅 워크플로우
1. 사용자의 요청에서 [목표(Goal)], [필요 데이터(Input)], [기대 산출물(Output)]을 추출한다.
2. \`skills/\` 디렉토리와 \`mcp.json\`을 조회하여 가장 일치율이 높은 스킬/도구를 판별한다.
3. 선택된 도구를 실행하고, 에러 발생 시 대안 도구로 폴백(Fallback)하여 작업을 완수한다.`
    },
    extraFile: {
      path: 'rules/tool_selection_policy.md',
      description: 'AI 도구 및 스킬 자동 선택 최적화 정책',
      content: `# Tool & Skill Selection Policy
1. 항상 최소 비용과 최소 스텝으로 목적을 달성할 수 있는 도구를 우선 선택한다.
2. 동일 작업에 여러 스킬이 존재할 경우, 대상 사용자(초등/일반/전문가)에 맞춘 특화 스킬을 선택한다.`
    }
  },

  // --- [2] 초중고 교과 수업 & 독서/영화 감상문 & 학급/모임 도구 ---
  {
    id: 'mod-lesson-worksheet',
    name: '🏫 초등·중고등 교과 수업 활동지 & 단원 평가 문제지',
    category: '초중고 수업/활동지',
    badge: '교과 활동지',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    shortDesc: '국어·수학·사회·과학 학년별 단원 맞춤 활동지, 생각 열기 질문, 4지선다·서술형 퀴즈 및 정답 해설지 자동 제작',
    detailedImpact: {
      agentRuleSummary: '학년별 어휘 난이도 맞춤, 3단계 생각 열기 발문, 정답 및 교사용 지도 팁 포함',
      skillPath: 'skills/lesson-worksheet-generator/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [초등·중고등 교과 수업 활동지 작성 규칙]
- **학년별 눈높이 어휘**: 초등 저학년(1~2), 중학년(3~4), 고학년(5~6) 및 중고등학생의 발달 단계에 맞는 친절하고 명확한 문체 사용.
- **3단계 구조화 발문**: [1단계: 흥미 유발 생각 열기] ➔ [2단계: 본문 핵심 내용 확인 퀴즈] ➔ [3단계: 내 생각 적용 서술형 질문]으로 구성할 것.
- **교사용 정답표 동봉**: 활동지 하단 또는 별도 섹션에 학생 지도용 정답 및 채점 기준표를 반드시 포함할 것.`,
    skillFile: {
      path: 'skills/lesson-worksheet-generator/SKILL.md',
      description: '학년별 교과 단원 맞춤 활동지 및 퀴즈 자동 생성 스킬',
      content: `---
name: lesson-worksheet-generator
description: 과목과 학년, 단원 주제를 입력받아 출력용 A4 수업 활동지 및 해설지 생성
tools: [file_writer]
---

# 교과 활동지 생성 워크플로우
1. 대상 학년과 과목(국어/수학/사회/과학/도덕/영어)의 교육과정 성취기준을 확인한다.
2. [생각 열기 그림/글] ➔ [핵심 개념 빈칸 채우기] ➔ [선택형 3문항] ➔ [창의 서술형 1문항]을 구성한다.
3. 교사용 해설 및 지도 팁을 함께 출력한다.`
    }
  },
  {
    id: 'mod-review-worksheet',
    name: '🎬 영화·도서 감상문 & 독서 토론 활동지 만들기',
    category: '독서/문화/글쓰기',
    badge: '감상문 양식',
    badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    shortDesc: '영화/도서 줄거리 3줄 요약, 인상 깊은 명대사/문장 발췌, 주인공 입장 역지사지 토론 질문 및 5점 별점 감상문 템플릿',
    detailedImpact: {
      agentRuleSummary: '스포일러 방지, 주인공 역지사지 열린 질문, 인물 관계도 및 별점 감상 카드',
      skillPath: 'skills/book-movie-review-worksheet/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [독서·영화 감상문 및 토론 활동지 규칙]
- **열린 질문(Open Question) 중심**: "네/아니오" 단답형 대신 "만약 내가 주인공이었다면?"과 같은 생각 확장 질문 배치.
- **감상 카드 포맷**: 제목, 지은이/감독, 한 줄 평, 별점(★ 5점 만점), 명장면/명대사 기록란을 시각적으로 구조화할 것.
- **스포일러 주의 표기**: 결말을 포함한 심층 토론 문항은 사전에 안내 문구를 둘 것.`,
    skillFile: {
      path: 'skills/book-movie-review-worksheet/SKILL.md',
      description: '영화/책 감상문 및 모둠 토론 활동지 자동 생성 스킬',
      content: `---
name: book-movie-review-worksheet
description: 영화나 책 제목을 입력받아 감상문 양식, 인물 관계도 및 토론 발제문 생성
tools: [file_writer]
---

# 감상문 활동지 생성 워크플로우
1. 작품의 핵심 배경과 등장인물 갈등 구도를 3줄로 요약한다.
2. [인상 깊은 장면/문장] ➔ [인물 행동에 대한 찬반 토론 질문] ➔ [나의 별점과 한 줄 평] 템플릿을 생성한다.`
    }
  },
  {
    id: 'mod-class-activity',
    name: '🎯 우리 반/동아리 칭찬 스티커판 & 마니또·팀 뽑기 웹앱',
    category: '학급/모임/도구',
    badge: '학급/모임 도구',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: '학생/팀원 이름만 넣으면 룰렛으로 팀을 짜주고, 칭찬 도장을 찍어주며, 비밀 마니또를 자동 매칭해주는 재미있는 인터랙티브 웹앱',
    detailedImpact: {
      agentRuleSummary: '공평한 무작위 룰렛 추첨, 귀여운 스탬프 효과, 모바일/전자칠판 터치 UI',
      skillPath: 'skills/class-activity-picker/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [학급·동아리 인터랙티브 도구 규칙]
- **공평한 무작위 추첨**: 편향 없는 랜덤 알고리즘과 긴장감 있는 룰렛/사다리타기 시각 애니메이션 제공.
- **전자칠판 및 모바일 터치 최적화**: 버튼과 글자를 큼직하게 만들어 교실 TV나 태블릿에서 터치하기 쉽게 구현.
- **브라우저 로컬 저장**: 명단이나 스티커 현황이 새로고침해도 날아가지 않도록 \`localStorage\`에 자동 보관할 것.`,
    skillFile: {
      path: 'skills/class-activity-picker/SKILL.md',
      description: '학급 팀 뽑기, 칭찬 스티커 및 마니또 추첨 웹앱 생성 스킬',
      content: `---
name: class-activity-picker
description: 학생 명단을 입력받아 랜덤 팀 배정 룰렛 및 칭찬 도장 웹 컴포넌트 자동 생성
tools: [file_writer, shell]
---

# 학급 도구 컴포넌트 생성 워크플로우
1. 이름 명단 텍스트 입력창과 엑셀 붙여넣기 파서를 만든다.
2. 룰렛 회전 애니메이션과 사운드 효과를 포함한 팀 추첨 화면을 렌더링한다.
3. 스티커판 현황을 이미지로 다운로드하거나 인쇄할 수 있는 버튼을 추가한다.`
    }
  },
  {
    id: 'mod-sns-card-news',
    name: '📝 블로그 글 & 인스타그램/SNS 카드뉴스 홍보 문구 작성',
    category: '독서/문화/글쓰기',
    badge: 'SNS 글쓰기',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '조회수 부르는 매력적인 제목 3가지, 카드뉴스 5장 슬라이드 대본, 해시태그 및 읽기 편한 줄바꿈 블로그 글 자동 작성',
    detailedImpact: {
      agentRuleSummary: '후킹 헤드라인 3가지, 1장당 30자 이내 카드뉴스 요약, 맞춤 해시태그 생성',
      skillPath: 'skills/sns-card-news-writer/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [SNS 콘텐츠 및 홍보 글쓰기 규칙]
- **시선 끄는 제목(Hook)**: 클릭하고 싶어지는 호기심 유발형 제목 3가지 추천.
- **카드뉴스 슬라이드 규격**: [1장: 표지 질문] ➔ [2~4장: 핵심 꿀팁/정보] ➔ [5장: 행동 촉구 및 저장 유도] 5단 슬라이드로 구성.
- **이모지와 해시태그**: 본문 가독성을 높이는 이모지와 인스타그램/네이버 블로그 검색 유입용 해시태그 10개 추출.`,
    skillFile: {
      path: 'skills/sns-card-news-writer/SKILL.md',
      description: '카드뉴스 5장 대본 및 블로그 홍보 글 자동 생성 스킬',
      content: `---
name: sns-card-news-writer
description: 주제를 입력받아 카드뉴스 5장 대본과 블로그 포스팅 초안 자동 생성
tools: [file_writer]
---

# SNS 글쓰기 워크플로우
1. 핵심 주제의 타겟 독자(학부모, 학생, 직장인, 고객)를 설정한다.
2. 매력적인 제목 3개와 5장 분량의 카드뉴스 슬라이드 텍스트를 구조화한다.
3. 블로그 본문용 줄글과 해시태그 모음을 생성한다.`
    }
  },
  {
    id: 'mod-dutch-pay',
    name: '💰 모임 회비 정산 & 엑셀 가계부 자동 계산기',
    category: '학급/모임/도구',
    badge: '정산 계산기',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: '영수증 내역이나 금액을 입력하면 N분의 1 정산, 동아리 회비 잔액 계산, 카톡 공유 문구 복사 및 엑셀 다운로드 웹앱',
    detailedImpact: {
      agentRuleSummary: '1원 단위 정확한 N분할 계산, 카카오톡 복사용 정산 문구, 엑셀 다운로드',
      skillPath: 'skills/dutch-pay-calculator/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [모임 정산 및 간편 계산기 규칙]
- **1원 단위 정확한 정산**: 나머지 금액(자투리) 처리 방식(올림/내림/주최자 부담)을 선택할 수 있게 구현.
- **카카오톡 공유 텍스트**: 정산 금액, 입금 계좌번호, 정산 대상자 목록을 한 번에 복사할 수 있는 [카톡 공유 복사] 버튼 제공.
- **엑셀(CSV) 내역 내보내기**: 동아리 회계 보고용 엑셀 다운로드 기능 포함.`,
    skillFile: {
      path: 'skills/dutch-pay-calculator/SKILL.md',
      description: '모임 회비 N분의 1 정산 및 카톡 공유 계산기 컴포넌트 스킬',
      content: `---
name: dutch-pay-calculator
description: 참여 인원과 영수증 항목을 입력받아 N분의 1 정산표 및 카톡 공유 메시지 생성
tools: [file_writer, shell]
---

# 정산 계산기 워크플로우
1. 총금액, 참여자 명단, 제외 대상자(지각자/불참자) 입력 필드를 만든다.
2. 1인당 부담 금액 계산 및 카카오톡 복사용 메시지를 포맷팅한다.
3. 정산 결과를 CSV 파일로 다운로드할 수 있게 연결한다.`
    }
  },

  // --- [3] 교육용 인터랙티브 웹 & 엑셀 시각화 & 문서화 ---
  {
    id: 'mod-edu-quiz',
    name: '📚 카드 뒤집기 단어장 & 자동 채점 퀴즈 (교육용 웹/앱)',
    category: '교육/학습용',
    badge: '교육용 기능',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    shortDesc: '카드가 3D로 휙 뒤집히는 단어장, 발음 읽어주기(TTS), 4지선다 퀴즈 및 틀린 문제 오답 노트 저장 기능',
    detailedImpact: {
      agentRuleSummary: '3D 카드 뒤집기 애니메이션, 발음 듣기, 틀린 문제 오답 노트 저장',
      skillPath: 'skills/edu-quiz-generator/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [교육용 웹/앱 및 인터랙티브 학습 규칙]
- **학습자 친화 인터랙션**: 카드가 뒤집히는 3D 플립 애니메이션과 즉각적인 정답/오답 사운드/시각 피드백을 제공할 것.
- **오답 노트 영속화**: 틀린 문제는 \`localStorage\`에 저장하여 언제든 다시 복습할 수 있도록 설계할 것.
- **음성 재생(TTS) 예외 처리**: \`window.speechSynthesis\` 지원 여부를 사전에 체크하고 음성 안내를 안정적으로 제공할 것.`,
    skillFile: {
      path: 'skills/edu-quiz-generator/SKILL.md',
      description: '인터랙티브 퀴즈 및 플래시카드 단어장 컴포넌트 자동 생성 스킬',
      content: `---
name: edu-quiz-generator
description: 단어 목록을 입력받아 플래시카드, 4지선다 퀴즈 및 오답 노트 컴포넌트 자동 생성
tools: [file_writer, shell]
---

# 교육용 퀴즈 컴포넌트 생성 워크플로우
1. 단어/문제 JSON 데이터 구조(id, question, options, answer, explanation)를 정의한다.
2. 카드 뒤집기 애니메이션과 즉각적인 채점 상태 머신(State Machine)을 구현한다.
3. 오답 복습용 필터링 및 브라우저 로컬 저장 로직을 추가한다.`
    }
  },
  {
    id: 'mod-chart-dashboard',
    name: '📈 엑셀 파일 올리면 바로 그려지는 인터랙티브 차트·그래프',
    category: '데이터/시각화',
    badge: '차트 시각화',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    shortDesc: '엑셀이나 CSV 파일을 마우스로 끌어다 놓으면(드래그) 매출 추이 꺾은선·막대·도넛 그래프와 핵심 수치 요약 카드가 자동 생성',
    detailedImpact: {
      agentRuleSummary: '스마트폰에서도 안 깨지는 반응형 차트, 엑셀 파일 드래그 자동 인식',
      skillPath: 'skills/chart-dashboard-scaffold/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [데이터 시각화 및 대시보드 규칙]
- **반응형 차트**: 모든 차트는 \`ResponsiveContainer\`로 감싸 화면 크기에 따라 너비와 높이가 유연하게 조절되도록 할 것.
- **CSV/Excel 결측치 정제**: 빈 행, 비정상적인 문자열 금액, 누락된 날짜 데이터를 사전에 걸러내는 파싱 유틸을 구현할 것.
- **KPI 요약 카드**: 대시보드 상단에 총매출, 건수, 평균 객단가 등 핵심 지표 카드를 눈에 띄게 배치할 것.`,
    skillFile: {
      path: 'skills/chart-dashboard-scaffold/SKILL.md',
      description: 'CSV 데이터 분석 및 인터랙티브 차트 대시보드 자동 생성 스킬',
      content: `---
name: chart-dashboard-scaffold
description: CSV 데이터 파싱 및 반응형 그래프 대시보드 자동 스캐폴딩
tools: [file_writer, shell]
---

# 차트 대시보드 자동 생성 워크플로우
1. CSV/JSON 데이터를 파싱하고 빈칸이나 잘못된 값을 정제하는 유틸 함수를 작성한다.
2. 꺾은선, 막대, 도넛 차트 컴포넌트를 보기 쉬운 반응형 그리드로 배치한다.
3. 마우스 호버 시 상세 말풍선(Tooltip) 및 핵심 수치 요약 카드를 렌더링한다.`
    }
  },
  {
    id: 'mod-biz-docs',
    name: '📄 한눈에 들어오는 서비스 기획서 & 사업 제안서(IR) 양식',
    category: '비즈니스/문서',
    badge: '기획서 양식',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    shortDesc: '누가 봐도 설득력 있는 핵심 아이디어 정리, 사용자 타겟 분석, 개발 일정 계획표가 포함된 깔끔한 기획서 자동 작성',
    detailedImpact: {
      agentRuleSummary: '핵심 요약 표, 사용자 분석, 월별 개발 일정표 표준 양식',
      policyPath: 'rules/documentation_standards.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [비즈니스 기획 및 문서화 표준 규칙]
- **구조화된 문서 양식**: 모든 기획서는 [1. 문제 정의], [2. 시장 기회], [3. 핵심 기능], [4. 수익 모델], [5. 개발 로드맵 표] 순서로 작성할 것.
- **정량적 지표 제시**: 단순 줄글 대신 표(Table), 불릿 포인트, 구체적인 목표 수치를 명시할 것.`,
    extraFile: {
      path: 'rules/documentation_standards.md',
      description: '사내 표준 비즈니스 기획서 및 기술 문서 작성 가이드',
      content: `# Documentation Standards
1. 모든 서비스 기획서는 문제 정의와 해결책을 첫 페이지에 요약한다.
2. 개발 로드맵은 월별 마일스톤과 담당 항목을 표로 구조화한다.`
    }
  },
  {
    id: 'mod-mini-game',
    name: '🎮 손맛 나는 2D 미니게임 & 물리 시뮬레이션 (웹게임)',
    category: '게임/시뮬레이션',
    badge: '게임/물리',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    shortDesc: '벽돌깨기·슬링샷 탄도학 물리 엔진, 점수 콤보 시스템, 효과음 및 최고 기록 저장이 들어간 인터랙티브 웹게임 제작',
    detailedImpact: {
      agentRuleSummary: '60FPS 부드러운 물리 렌더링, Web Audio 효과음, 최고 기록 저장',
      skillPath: 'skills/game-physics-scaffold/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [인터랙티브 웹 게임 및 물리 시뮬레이션 규칙]
- **부드러운 화면 갱신**: 프레임 끊김 없이 부드럽게 60FPS로 동작하도록 \`requestAnimationFrame\` 게임 루프를 유지할 것.
- **물리 충돌 및 사운드**: 충돌 반발력 계산과 함께 Web Audio API를 활용해 타격감 있는 효과음을 즉각 재생할 것.
- **점수 및 최고 기록**: 콤보 점수 시스템과 최고 점수를 브라우저에 저장하여 재도전 동기를 부여할 것.`,
    skillFile: {
      path: 'skills/game-physics-scaffold/SKILL.md',
      description: '2D 아케이드 물리 웹게임 컴포넌트 자동 생성 스킬',
      content: `---
name: game-physics-scaffold
description: 2D Canvas 및 물리 엔진 기반 인터랙티브 웹게임 자동 스캐폴딩
tools: [file_writer, shell]
---

# 웹게임 생성 워크플로우
1. 게임 오브젝트(플레이어, 장애물, 점수)의 좌표 및 물리 상태를 정의한다.
2. 키보드/마우스/터치 입력 이벤트와 충돌 감지 알고리즘을 연결한다.
3. 게임 오버, 다시 시작, 최고 점수 랭킹 UI를 깔끔하게 구현한다.`
    }
  },
  {
    id: 'mod-ai-chatbot',
    name: '🤖 카톡 스타일 AI 챗봇 대화창 & 프롬프트 어시스턴트',
    category: 'AI챗봇/어시스턴트',
    badge: 'AI 챗봇',
    badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    shortDesc: '말풍선에 타자 치듯 글자가 찍히는(스트리밍) 깔끔한 AI 채팅창, 이전 대화 기억 및 추천 질문 버튼 기능',
    detailedImpact: {
      agentRuleSummary: '실시간 말풍선 타이핑 스트리밍, 대화 기억 저장, 질문 추천 버튼',
      skillPath: 'skills/ai-chat-interface/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [AI 챗봇 인터페이스 및 대화형 UI 규칙]
- **실시간 타이핑 효과**: AI 답변 생성 시 텍스트가 한 글자씩 매끄럽게 흘러나오는 스트리밍(Streaming) 말풍선을 구현할 것.
- **대화 내역 보존**: 사용자가 페이지를 새로고침해도 이전 대화 타래가 유지되도록 안전하게 저장할 것.
- **추천 질문 칩**: 사용자가 무엇을 물어볼지 쉽게 고를 수 있도록 첫 화면에 추천 질문 버튼(Quick Chips)을 배치할 것.`,
    skillFile: {
      path: 'skills/ai-chat-interface/SKILL.md',
      description: '카카오톡 스타일 AI 채팅 인터페이스 자동 생성 스킬',
      content: `---
name: ai-chat-interface
description: 실시간 스트리밍 답변과 대화 히스토리 관리를 지원하는 AI 챗봇 UI 생성
tools: [file_writer, shell]
---

# AI 챗봇 UI 생성 워크플로우
1. 메시지 말풍선(사용자 질문, AI 답변, 로딩 애니메이션) 컴포넌트를 설계한다.
2. 실시간 텍스트 스트리밍 렌더링 및 자동 스크롤 하단 고정 로직을 구현한다.
3. 코드 블록 복사 버튼과 추천 질문 퀵 버튼을 추가한다.`
    }
  },

  // --- [4] 프론트엔드/백엔드/보안/자동화 개발 ---
  {
    id: 'mod-react-ui',
    name: '🎨 깔끔한 웹/앱 화면 만들기 (버튼·카드·메뉴 디자인)',
    category: '프론트엔드/UI',
    badge: '화면 디자인',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '내 브랜드 컬러와 글꼴(DESIGN.md)을 준수하여 조잡하지 않고 완성도 높은 버튼, 입력창, 카드 UI 제작',
    detailedImpact: {
      agentRuleSummary: '디자인 색상·글꼴 통일, 완성도 높은 UI 컴포넌트 규칙',
      skillPath: 'skills/ui-component-scaffold/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [프론트엔드 UI 및 디자인 토큰 규칙]
- **프레임워크**: React 18+, TypeScript Strict Mode (\`any\` 타입 사용 엄격 금지), Tailwind CSS v3
- **디자인 토큰 준수**: 인라인 style 금지. 반드시 \`./DESIGN.md\`의 컬러(#3182F6 등)와 4px 여백 그리드 규격 준수
- **상태 관리 & 아이콘**: \`lucide-react\` 아이콘 사용, 전역 상태는 \`zustand\`, 로컬 상태는 \`useState\`
- **타입 정의**: 모든 컴포넌트 Props는 \`src/types/\` 내 인터페이스로 명시적 정의`,
    skillFile: {
      path: 'skills/ui-component-scaffold/SKILL.md',
      description: 'DESIGN.md 규격을 준수하는 깔끔한 UI 컴포넌트 자동 생성 스킬',
      content: `---
name: ui-component-scaffold
description: DESIGN.md 규격을 준수하는 깔끔한 React 컴포넌트 자동 생성
tools: [file_writer, shell]
---

# UI 컴포넌트 자동 생성 워크플로우
1. 생성할 컴포넌트의 Props 인터페이스를 명시적으로 정의한다.
2. DESIGN.md의 토큰(컬러, 폰트, 여백)을 Tailwind CSS 클래스로 매핑한다.
3. 반응형 디자인(sm, md, lg)과 마우스 호버/클릭 상태 애니메이션을 포함한다.
4. \`npm run build\`를 실행하여 TypeScript 타입 오류가 없는지 검증한다.`
    },
    extraFile: {
      path: 'DESIGN.md',
      description: '프로젝트 디자인 시스템 토큰 규격서',
      content: `# DESIGN.md - 프로젝트 디자인 시스템 규격

## 1. 컬러 팔레트 (Color Palette)
- Primary (메인 포인트): \`#3182F6\` (Toss Blue)
- Secondary (보조 포인트): \`#6366F1\` (Indigo 500)
- Background (기본 배경): \`#0F172A\` (Slate 900)
- Surface / Card (카드 배경): \`#1E293B\` (Slate 800) / Border: \`1px solid rgba(255,255,255,0.1)\`
- Text Primary (기본 글자): \`#F8FAFC\` (Slate 50)
- Text Secondary (보조 글자): \`#94A3B8\` (Slate 400)
- Success / Danger: \`#10B981\` / \`#EF4444\`

## 2. 타이포그래피 (Typography)
- Font Family: \`Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif\`
- Heading 1: \`24px\` / Bold (700) / Line-height: 1.3
- Heading 2: \`18px\` / SemiBold (600) / Line-height: 1.4
- Body: \`14px\` / Regular (400) / Line-height: 1.5
- Caption: \`11px\` / Medium (500)

## 3. 여백 및 곡률 (Spacing & Radius)
- Base Grid: 4px 기준 (p-2=8px, p-4=16px, p-6=24px)
- Button Radius: \`rounded-xl\` (12px)
- Card Radius: \`rounded-2xl\` (16px)`
    }
  },
  {
    id: 'mod-responsive-browser',
    name: '📱 스마트폰·태블릿·PC 화면 맞춤 & 화면 자동 검사',
    category: '프론트엔드/UI',
    badge: '화면 검증',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '스마트폰, 태블릿, PC 어디서 열어도 글자나 버튼이 깨지지 않게 맞추고, AI가 직접 화면을 캡처해 검사',
    detailedImpact: {
      agentRuleSummary: '모바일·태블릿 화면 자동 최적화, 브라우저 화면 캡처 검사',
      mcpServerName: 'puppeteer-browser',
      mcpType: 'zero-config',
      mcpSetupGuide: 'API 키 없이 npx로 즉시 브라우저 구동'
    },
    defaultSelected: true,
    agentRuleSection: `### [반응형 디자인 및 브라우저 검증 규칙]
- **반응형 필수 대응**: 모바일(sm: 640px), 태블릿(md: 768px), 데스크톱(lg: 1024px) 화면 크기에서 글자나 버튼 깨짐이 없도록 설계
- **화면 렌더링 검증**: UI 컴포넌트 작성 후 Puppeteer 브라우저 도구를 활용해 렌더링 화면을 캡처하고 시각적 결함을 점검할 것.`,
    mcpServer: {
      key: 'puppeteer-browser',
      mcpType: 'zero-config',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-puppeteer'],
        description: '실제 웹 브라우저를 띄워 UI 스크린샷 캡처 및 화면 레이아웃 자동 검사 (무설정 즉시 실행)'
      }
    }
  },
  {
    id: 'mod-rest-api',
    name: '⚙️ 데이터 주고받기 & 서버 통신 규격 (로그인/회원가입/데이터 전송)',
    category: '백엔드/DB',
    badge: '서버 통신',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: '화면과 서버 간에 데이터를 안전하게 주고받고, 잘못된 입력값이 들어오면 친절한 안내 메시지를 띄우는 서버 통신 규칙',
    detailedImpact: {
      agentRuleSummary: '서버 통신 데이터 정밀 검증, 알기 쉬운 에러 메시지 반환',
      skillPath: 'skills/api-endpoint-test/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [백엔드 REST API 아키텍처 규칙]
- **표준 HTTP 상태 코드**: 성공(200, 201), 사용자 실수(400, 401, 404), 서버 에러(500) 코드를 명확히 반환
- **입력 데이터 검증**: 모든 API 요청과 응답은 잘못된 값이 들어오지 못하도록 엄격히 검증할 것.
- **친절한 에러 안내**: 알기 쉬운 에러 JSON 포맷(\`{ error: { code, message } }\`)으로 반환하여 프론트엔드에서 안내 팝업을 띄우기 쉽게 만들 것.`,
    skillFile: {
      path: 'skills/api-endpoint-test/SKILL.md',
      description: '서버 API 엔드포인트 자동 테스트 및 응답 구조 검증 스킬',
      content: `---
name: api-endpoint-test
description: 백엔드 API 엔드포인트의 정상/예외 케이스 자동 테스트
tools: [shell]
---

# API 엔드포인트 테스트 워크플로우
1. 200/201 성공 응답 데이터 구조와 타입 일치 여부를 검증한다.
2. 400 유효하지 않은 입력값 전송 시 에러 안내 문구가 정확한지 확인한다.
3. 401/403 미인증 요청에 대한 안전한 차단 상태를 검증한다.`
    }
  },
  {
    id: 'mod-postgres-db',
    name: '🗄️ 회원 정보·게시글 데이터베이스(DB) 안전 저장 및 조회',
    category: '백엔드/DB',
    badge: 'DB 연동',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: '회원 정보나 게시글 데이터를 DB에 안전하게 저장하고, 실수로 전체 데이터가 날아가는(삭제) 사고를 완벽 차단',
    detailedImpact: {
      agentRuleSummary: '안전한 데이터 읽기/쓰기, 데이터 전체 삭제 사고 원천 차단',
      mcpServerName: 'postgres',
      mcpType: 'needs-auth',
      mcpSetupGuide: '.env의 DATABASE_URL 또는 로컬 postgresql 연결 URL 입력 필요',
      skillPath: 'skills/db-migration-gen/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [데이터베이스 보안 및 스키마 관리 규칙]
- **DB 접근 제한**: 데이터베이스 조회 시 쓰기(Write) 대신 읽기 전용(Read-Only) 조회를 우선 활용할 것.
- **위험 명령 차단**: 데이터 전체 삭제 명령(\`DROP TABLE\`, 조건 없는 \`DELETE\`)은 사람의 확인 승인 없이 절대 실행 금지.
- **조회 속도 최적화**: 자주 검색하는 데이터 항목에는 인덱스를 생성하여 서비스가 버벅거리지 않게 할 것.`,
    mcpServer: {
      key: 'postgres',
      mcpType: 'needs-auth',
      envVarNeeded: 'DATABASE_URL=postgresql://user:password@localhost:5432/my_database',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/my_database'],
        description: '데이터베이스 테이블 구조 조회 및 안전한 읽기 쿼리 실행 (.env DATABASE_URL 연결)'
      }
    },
    skillFile: {
      path: 'skills/db-migration-gen/SKILL.md',
      description: 'DB 테이블 변경 및 되돌리기(롤백) SQL 스크립트 자동 생성 스킬',
      content: `---
name: db-migration-gen
description: 테이블 스키마 변경 시 안전한 Up/Down SQL 마이그레이션 스크립트 생성
tools: [file_writer, shell]
---

# DB 스키마 생성 워크플로우
1. 변경할 테이블의 관계와 데이터 영향도를 사전에 분석한다.
2. 신규 테이블 생성 또는 컬럼 추가 쿼리를 작성한다.
3. 문제 발생 시 즉시 이전 상태로 되돌릴 수 있는 원상복구(롤백) 쿼리를 세트로 작성한다.`
    }
  },
  {
    id: 'mod-security-auth',
    name: '🔐 카카오/구글 간편 로그인 & 비밀번호 암호화 보안',
    category: '보안/결제',
    badge: '보안 수칙',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    shortDesc: '카카오·구글 소셜 로그인, 비밀번호 안전 암호화 저장, 비밀키(API Key) 외부 유출 방지 보안 수칙',
    detailedImpact: {
      agentRuleSummary: '소셜 로그인 연동, 비밀번호 암호화 저장, 비밀키 유출 방지',
      policyPath: 'rules/security_policy.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [보안 및 비밀키 관리 규칙]
- **비밀키 코드 노출 금지**: API Key, DB 비밀번호, 토큰 키를 소스코드에 절대 직접 적지 말고 \`.env\` 환경변수로만 참조할 것.
- **인증 토큰 검증**: 마이페이지, 주문내역 등 로그인 전용 화면은 로그인 여부를 철저히 검증할 것.
- **비밀번호 암호화**: 비밀번호를 원문 그대로 저장하지 말고, 반드시 안전한 암호화(bcrypt 등)를 거쳐 저장할 것.`,
    extraFile: {
      path: 'rules/security_policy.md',
      description: '사내 보안 인증 및 시크릿 키 관리 정책',
      content: `# Security Policy & Secret Key Management
1. 모든 비밀번호는 단방향 암호화하여 저장한다.
2. 로그인 토큰 유효기간을 설정하고 안전한 쿠키 방식으로 관리한다.
3. .env 파일은 절대 Git 레포지토리에 커밋하지 않는다 (.gitignore 필수 등록).`
    }
  },
  {
    id: 'mod-payment-idempotency',
    name: '💳 카드 결제 연동 & 중복 결제(돈 두 번 빠짐) 방지',
    category: '보안/결제',
    badge: '결제 안전장치',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    shortDesc: '토스·KG이니시스·스트라이프 결제 연동 시, 새로고침이나 더블 클릭으로 돈이 두 번 빠져나가지 않도록 완벽 방지',
    detailedImpact: {
      agentRuleSummary: '중복 결제 방지 안전장치, 1원 단위 오차 없는 정확한 금액 계산',
      policyPath: 'rules/payment_policy.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [결제 및 금액 계산 안전 규칙]
- **중복 결제 방지**: 사용자가 결제 버튼을 연타하거나 새로고침해도 주문이 1번만 승인되도록 고유 결제 키를 검증할 것.
- **금액 계산 오차 방지**: 자바스크립트 소수점 오차로 1원이 어긋나지 않도록 정밀 계산 라이브러리(Decimal)를 사용할 것.
- **주문-결제 묶음 처리**: 결제 성공과 재고 차감, 주문서 생성을 하나의 안전한 거래 단위(트랜잭션)로 묶어 처리할 것.`,
    extraFile: {
      path: 'rules/payment_policy.md',
      description: '결제 트랜잭션 및 금액 연산 무결성 정책',
      content: `# Payment & Transaction Policy
1. 모든 결제 승인 API는 중복 결제를 방지하기 위해 중복 요청 방지 락(Lock)을 적용한다.
2. 부동소수점 오차 방지를 위해 모든 금액 및 수수료 계산 시 정밀 연산 모듈을 사용한다.`
    }
  },
  {
    id: 'mod-git-pr-skill',
    name: '🚀 작업 내용 깃허브(GitHub) 자동 백업 & 에러 발생 시 스스로 수정',
    category: '협업/DevOps',
    badge: '자동 백업 & 치유',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: 'AI가 수정한 코드 내용을 일목요연하게 요약해 깃허브에 백업하고, 터미널 오류 발생 시 멈추지 않고 스스로 고치도록 지시',
    detailedImpact: {
      agentRuleSummary: '코드 변경 내역 자동 요약, 에러 발생 시 AI 스스로 자동 수정',
      mcpServerName: 'github',
      mcpType: 'needs-auth',
      mcpSetupGuide: '.env의 GITHUB_PERSONAL_ACCESS_TOKEN 입력 필요',
      skillPath: 'skills/git-auto-pr/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [Git 커밋 및 자가 검증 규칙]
- **에러 자동 수정 (Self-Healing)**: 터미널 빌드/테스트 중 에러가 발생하면 멈추지 말고 에러 로그를 읽고 스스로 1차 수정을 시도할 것.
- **작업 완료 입증**: 작업을 마쳤다고 선언하기 전에 반드시 \`npm run build\`를 돌려 에러가 0건임을 확인할 것.`,
    mcpServer: {
      key: 'github',
      mcpType: 'needs-auth',
      envVarNeeded: 'GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_github_token_here',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-github'],
        env: {
          GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_PERSONAL_ACCESS_TOKEN}'
        },
        description: 'GitHub 저장소 이슈 조회, 코드 백업 및 PR 생성 자동화 (.env 토큰 연결)'
      }
    },
    skillFile: {
      path: 'skills/git-auto-pr/SKILL.md',
      description: '작업 내역 요약 커밋 및 GitHub 백업 스킬 교본',
      content: `---
name: git-auto-pr
description: 소스코드 변경점을 자동 분석하여 알기 쉬운 커밋 및 GitHub PR 생성
tools: [git, shell]
---

# Git 변경 사항 백업 워크플로우
1. \`git status\` 및 변경된 코드를 확인한다.
2. 어떤 기능이 추가/수정되었는지 50자 이내로 명확히 요약하여 커밋 메시지를 작성한다.
3. 주요 변경 사항과 테스트 완료 결과를 정리하여 기록한다.`
    }
  },
  {
    id: 'mod-data-pipeline',
    name: '📊 대용량 엑셀·고객 데이터 자동 정리 & 분석 (파이썬)',
    category: '데이터/자동화',
    badge: '데이터 정리',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: '수만 줄의 엑셀/CSV 데이터에서 빈칸이나 오타를 자동으로 찾아내 깨끗하게 정리하고 통계 요약 추출',
    detailedImpact: {
      agentRuleSummary: '빈칸·오타 자동 정리, 대용량 파일 멈춤 없이 고속 처리',
      mcpServerName: 'filesystem',
      mcpType: 'zero-config',
      mcpSetupGuide: 'API 키 없이 로컬 data 폴더 즉시 탐색',
      skillPath: 'skills/data-pipeline/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [데이터 처리 및 파이썬 가상환경 규칙]
- **독립 가상환경 준수**: 내 컴퓨터 전역 파이썬을 어지럽히지 말고 프로젝트 로컬 가상환경(\`.venv\`)을 사용할 것.
- **빈칸 및 이상치 검증**: 데이터를 불러올 때 빈칸(Null)이나 비정상적인 데이터가 몇 %인지 먼저 검사하고 보고할 것.
- **대용량 파일 메모리 최적화**: 용량이 큰 파일도 컴퓨터가 멈추지 않도록 나누어서 안전하게 읽어들일 것.`,
    mcpServer: {
      key: 'filesystem',
      mcpType: 'zero-config',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', './data'],
        description: 'data 폴더의 대용량 데이터 파일 고속 탐색 (무설정 즉시 실행)'
      }
    },
    skillFile: {
      path: 'skills/data-pipeline/SKILL.md',
      description: '데이터 정제 및 요약 통계 자동화 스킬',
      content: `---
name: data-pipeline
description: 원본 엑셀/CSV 데이터의 빈칸 채우기, 오타 제거 및 표준 데이터 정리
tools: [file_writer, shell]
---

# 데이터 정리 자동화 워크플로우
1. 입력 데이터의 컬럼별 데이터 종류와 빈칸 비율을 분석한다.
2. 이상한 값이나 중복 데이터를 찾아 정제한 뒤 깔끔한 파일로 저장한다.`
    }
  }
];

// 3. 신규 프로젝트 시작 시 스캐폴딩 4단계 가이드 데이터
export const NEW_PROJECT_SCAFFOLD_GUIDE: NewProjectScaffoldGuide = {
  title: '신규 프로젝트 시작 4단계 스캐폴딩 로드맵 (Scaffolding Roadmap)',
  summary: '처음부터 코드를 무작정 짜지 않고, [지침서 ➔ 디자인 규격 ➔ 뼈대 생성 ➔ 검증] 순서로 완성도 높은 프로젝트를 구축하는 2026 표준 절차입니다.',
  hierarchyDiagram: `프로젝트 루트 (Root Directory)
├── AGENTS.md / CLAUDE.md       [1단계: 에이전트 마스터 지침서 & 빌드 명령어]
├── DESIGN.md                   [2단계: 컬러 팔레트, 폰트, 4px 그리드 디자인 규격]
├── mcp.json                    [3단계: DB, 브라우저, GitHub MCP 외부 도구 연동]
├── .env.example                [3단계: 시크릿 키 및 환경변수 템플릿]
├── rules/                      [4단계: 보안, 결제 정책 영구 룰]
│   ├── security_policy.md
│   └── payment_policy.md
└── skills/                     [4단계: 반복 작업 자동화 스킬 교본]
    ├── skill-mcp-router/
    ├── lesson-worksheet-generator/
    ├── book-movie-review-worksheet/
    ├── class-activity-picker/
    ├── sns-card-news-writer/
    ├── dutch-pay-calculator/
    └── git-auto-pr/`,
  steps: [
    {
      stepNumber: 1,
      title: '1단계: 에이전트 지침서 배치',
      action: '다운로드한 AGENTS.md 및 CLAUDE.md를 프로젝트 루트에 배치하여 AI의 역할과 자율 권한을 선언합니다.',
      outputFile: 'AGENTS.md, CLAUDE.md'
    },
    {
      stepNumber: 2,
      title: '2단계: 디자인 시스템 규격 주입',
      action: 'DESIGN.md에 브랜드 메인 컬러(#3182F6 등), 폰트, 버튼 곡률(12px)을 정의하여 조잡하지 않은 UI를 강제합니다.',
      outputFile: 'DESIGN.md'
    },
    {
      stepNumber: 3,
      title: '3단계: MCP 도구 및 환경변수 연결',
      action: 'mcp.json 설정으로 브라우저 캡처 및 DB를 연결하고, .env.example을 복사하여 .env를 만듭니다.',
      outputFile: 'mcp.json, .env.example'
    },
    {
      stepNumber: 4,
      title: '4단계: 스킬 교본 & 영구 규칙(Rules) 장착',
      action: 'skills/ 폴더에 스마트 라우터, 교과 활동지, 자동 PR 등 실무 레시피를 장착해 AI가 실수 없이 작업하게 합니다.',
      outputFile: 'skills/*, rules/*'
    }
  ],
  copyableScaffoldPrompt: `"이 프로젝트의 AGENTS.md, DESIGN.md, mcp.json, skills/ 를 먼저 읽고 프로젝트 기본 뼈대(Scaffold)를 생성한 뒤, npm run build 를 실행하여 타입 오류 0건임을 입증해줘."`
};
