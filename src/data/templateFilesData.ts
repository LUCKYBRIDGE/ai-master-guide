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
    | '4대 개발 표준 (DevOps/SOP)'
    | '스킬/MCP 자동추천' 
    | '교사/교육자 특화'
    | '초중고 수업/활동지' 
    | '독서/문화/글쓰기' 
    | '학급/모임/도구' 
    | '프론트엔드/UI' 
    | '백엔드/DB' 
    | '보안/결제';
  badge: string;
  badgeColor: string;
  shortDesc: string;
  detailedImpact: {
    agentRuleSummary: string;
    mcpServerName?: string;
    mcpType?: 'zero-config' | 'needs-auth'; // 즉시 동작(No Key) vs 인증/키 필요
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
  triIdePrinciple: {
    title: string;
    diagram: string;
    rules: string[];
  };
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

// 템플릿 파일 3대장 (AGENTS.md, CLAUDE.md, DESIGN.md)
export const TEMPLATE_CONFIG_FILES: TemplateConfigFile[] = [
  {
    id: 'template-agents-md',
    filename: 'AGENTS.md',
    badge: '통합 헌법 (단일 진실 공급원)',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    targetLocation: '프로젝트 최상위 루트 (./AGENTS.md)',
    supportedTools: 'OpenAI Codex · Claude Code · Google Antigravity 3대 AI 공용',
    description: '모든 AI 도구가 공통으로 준수하는 프로젝트 단일 진실 공급원(Single Source of Truth)이자 헌법 문서',
    whyNeeded: '도구마다 규칙이 분산되면 AI들이 서로 다른 스타일로 코드를 짜거나 충돌합니다. AGENTS.md에 핵심 빌드 명령, 코딩 규칙, 안전 수칙을 일원화합니다.',
    customizationTips: [
      'Commands: 프로젝트의 실제 개발/빌드/테스트 명령어(npm run dev, npm run build)를 기입합니다.',
      'Definition of Done: 작업 완료 판정 기준(0에러 빌드 증명, 회귀 테스트 확인)을 명시합니다.'
    ],
    rawContent: `# AGENTS.md - Unified Project Constitution & Single Source of Truth
> Supported AI Engines: OpenAI Codex · Claude Code · Google Antigravity

## 1. Project Overview & Tech Stack
- Framework: React 18+ (Vite) / TypeScript Strict Mode
- Styling: Tailwind CSS v3 / Icons: lucide-react
- State Management: Zustand (Global) & useState (Local UI)

## 2. Essential Commands
- Dev Server: \`npm run dev\`
- Build & Typecheck: \`npm run build\`
- Unit Tests: \`npm test\`
- Lint & Format: \`npm run lint\`

## 3. Development Principles & Safety Rules
- **Smallest Coherent Change**: Prefer small, focused changes over broad rewrites.
- **Component Reuse**: Inspect existing components and utilities before creating new ones.
- **Single Source of Truth**: Durable project instructions live centrally in \`AGENTS.md\`. Do not duplicate in \`docs/rules/\`.
- **Zero Regression**: Verify behavior, not just compilation. Never break existing working features.
- **Secrets Management**: Never hardcode credentials; use \`.env\` environment variables.
- **User Approval Required**: Destruction commands (\`DROP TABLE\`, \`DELETE FROM\`), \`git push -f\`, paid API calls.

## 4. Documentation Architecture
- \`docs/architecture/\`: Describes current system structure.
- \`docs/plans/\`: Implementation plans for major features.
- \`docs/decisions/\`: Architectural Decision Records (ADRs).
- \`docs/tasks/\`: Persistent task tracking.
- \`docs/reference/\`: Project reference materials and policies.

## 5. Definition of Done
A task is complete ONLY when:
1. Requested behavior is fully implemented.
2. \`npm run build\` passes with 0 TypeScript/Lint errors.
3. Relevant tests pass and obvious regressions are checked.
4. No unnecessary unrelated files were modified.
5. Persistent documentation under \`docs/\` is updated when persistent behavior changed.`
  },
  {
    id: 'template-claude-md',
    filename: 'CLAUDE.md',
    badge: 'Claude Code 포인터',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    targetLocation: '프로젝트 최상위 루트 (./CLAUDE.md)',
    supportedTools: 'Claude Code CLI, Claude Desktop MCP',
    description: '규칙 중복을 방지하기 위해 `@AGENTS.md`를 임포트하여 통합 헌법을 참조하는 클로드 코드 전용 포인터',
    whyNeeded: 'AGENTS.md의 내용을 그대로 복사-붙여넣기하면 규칙 변경 시 두 파일을 동시에 수정해야 하는 관리 부채가 발생합니다.',
    customizationTips: [
      '단일 진실 공급원 유지: 공통 규칙은 AGENTS.md에 두고, CLAUDE.md는 @AGENTS.md 임포트 구조를 유지합니다.',
      'Claude 전용 규칙: 필요 시 .claude/rules/ 디렉토리에 클로드 전용 추가 지침만 작성합니다.'
    ],
    rawContent: `@AGENTS.md

# Claude Code Specific Instructions

Follow the shared project instructions in \`AGENTS.md\`.

- Follow applicable Claude-specific rules under \`.claude/rules/\`.
- Use shared procedural skills under \`.agents/skills/\` or \`.claude/skills/\`.
- Consult persistent project documentation under \`/docs\` when relevant.
- Do not duplicate shared rules here unless Claude Code requires tool-specific behavioral overrides.`
  },
  {
    id: 'template-design-md',
    filename: 'DESIGN.md',
    badge: '디자인 시스템 토큰',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    targetLocation: '프로젝트 최상위 루트 (./DESIGN.md)',
    supportedTools: '모든 AI 도구 및 프론트엔드 에이전트 공통',
    description: 'AI가 조잡한 무지개색 UI나 임의의 인라인 스타일을 작성하지 못하도록 색상, 폰트, 여백 그리드를 통제하는 디자인 가이드',
    whyNeeded: '디자인 규격서가 없으면 AI가 페이지마다 제각각 다른 색상과 스타일을 마구잡이로 작성합니다.',
    customizationTips: [
      'Primary Color: 브랜드 고유의 헥사코드(예: Toss Blue #3182F6, Slate #0F172A)를 입력합니다.',
      'Radius & Spacing: 버튼과 카드의 둥글기(rounded-xl, rounded-2xl)와 4px 그리드를 통일합니다.'
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
- Heading 2: 18px / SemiBold (600)
- Body: 14px / Regular (400) / Line-height: 1.5
- Caption: 11px / Medium (500)

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
    description: '교과 활동지 자동 생성, 생기부 문구 검사, Git PR 자동 생성 등 반복되는 실무 작업을 AI가 실수 없이 일관되게 수행하도록 절차를 정리해 둔 재사용 문서입니다.',
    practicalExample: '에이전트에게 `/plan-feature` 또는 `/student-record-writer` 스킬을 실행시키면 표준 워크플로우에 따라 3초 만에 작성',
    keyBenefits: [
      '매번 프롬프트를 길게 쓸 필요 없이 짧은 명령어 하나로 표준화된 작업 수행',
      '팀원 전체가 동일한 품질의 산출물을 얻을 수 있도록 프로세스 표준화',
      '.agents/skills/{이름}/SKILL.md 파일로 Codex 및 Antigravity에서 즉시 공용 로딩'
    ],
    sampleFile: '.agents/skills/{skill-name}/SKILL.md'
  }
];

// 1. 사용할 AI 도구 목록 (STEP 1: 4대 핵심 도구 다중 선택)
export const AI_TOOLS_CATALOG: AiToolItem[] = [
  {
    id: 'tool-antigravity',
    name: '구글 안티그래비티 (Google Antigravity)',
    vendor: 'Google',
    badge: 'Agentic IDE',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    description: '서브에이전트 병렬 실행, MCP 도구 연동 및 .agents/skills 공용 IDE',
    defaultSelected: true,
    ruleHint: 'AGENTS.md 마스터 지침 & .agents/rules 연동'
  },
  {
    id: 'tool-claude-code',
    name: '클로드 코드 (Claude Code)',
    vendor: 'Anthropic',
    badge: 'CLI Agent',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    description: '터미널 기반 자율 코딩 및 @AGENTS.md 단일 진실 공급원 임포트',
    defaultSelected: true,
    ruleHint: 'CLAUDE.md (@AGENTS.md 포인터) & .claude/rules 연동'
  },
  {
    id: 'tool-codex',
    name: '오픈AI 코덱스 (OpenAI Codex)',
    vendor: 'OpenAI',
    badge: 'IDE / Agent',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    description: 'AGENTS.md 헌법 및 .agents/skills 재사용 스킬 자율 실행',
    defaultSelected: true,
    ruleHint: '루트 AGENTS.md & .agents/skills 연동 (.codex/rules 지양)'
  },
  {
    id: 'tool-grok-build',
    name: 'xAI 그록 빌드 (xAI Grok Build)',
    vendor: 'xAI',
    badge: 'High-speed Agent',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    description: '초고속 추론 및 최소 스텝(Minimum Steps) 자율 실행 에이전트',
    defaultSelected: false,
    ruleHint: 'Grok 최소 스텝 자율 완결 지침 주입'
  }
];

// 2. 실무 작업 모듈 목록 (STEP 2: AI_IDE_Codex_Claude_Antigravity_Setup_Prompt.md 규격 100% 반영)
export const TASK_FEATURE_MODULES: TaskFeatureModule[] = [
  // =========================================================================
  // --- [1] 4대 핵심 개발 표준 스킬 (Plan, Implement, Debug, Review, Test, Docs) ---
  // =========================================================================
  {
    id: 'mod-plan-feature',
    name: '📋 plan-feature (작업 착수 전 사전 기획 & 위험 분석 스킬)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '기획 & 위험분석',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    shortDesc: '코드를 바로 건드려 망가뜨리지 않고, 변경 범위와 위험 요소를 분석하여 단계별 구현 계획서를 docs/plans/ 에 사전 작성',
    detailedImpact: {
      agentRuleSummary: '기존 코드 사전 분석, 최소 변경 범위 설정, docs/plans/ 계획서 수립',
      skillPath: '.agents/skills/plan-feature/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [plan-feature 기획 원칙]
- 코드를 작성하기 전에 AGENTS.md와 관련 문서를 먼저 읽고 영향을 받는 모듈을 파악할 것.
- 3개 이상의 파일이 변경되는 복잡한 작업은 반드시 docs/plans/ 에 사전 계획서를 작성하여 위험을 예방할 것.`,
    skillFile: {
      path: '.agents/skills/plan-feature/SKILL.md',
      description: '기능 구현 전 사전 아키텍처 및 리스크 분석 스킬',
      content: `# Plan Feature

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
    }
  },
  {
    id: 'mod-implement-feature',
    name: '⚡ implement-feature (무결점 최소 변경 구현 & 빌드 검증 스킬)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '최소변경 구현',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: '불필요한 리팩토링을 배제하고 기존 패턴을 재사용하여 가장 작고 응집력 높은 코드를 안전하게 작성 및 npm run build 검증',
    detailedImpact: {
      agentRuleSummary: '최소 응집 변경, 기존 패턴 재사용, npm run build 검증 필수',
      skillPath: '.agents/skills/implement-feature/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [implement-feature 구현 원칙]
- 불필요한 전면 재작성을 피하고 가장 작은 단위의 변경을 적용할 것.
- 작업 완료 전 반드시 npm run build와 테스트를 실행해 0에러를 증명할 것.`,
    skillFile: {
      path: '.agents/skills/implement-feature/SKILL.md',
      description: '안전한 최소 단위 기능 구현 및 사후 검증 스킬',
      content: `# Implement Feature

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
    }
  },
  {
    id: 'mod-debug-skill',
    name: '🔍 debug (원인 분석 ➔ 최소 안전 패치 ➔ 회귀 방지 스킬)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '디버깅 & 자가치유',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    shortDesc: '단순 증상만 덮지 않고 에러의 근본 원인(Root Cause)을 추적하여 다른 기능이 망가지지 않게 안전하게 수정',
    detailedImpact: {
      agentRuleSummary: '원인 추적, 최소 안전 패치, 회귀 오류 방지 검증',
      skillPath: '.agents/skills/debug/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [debug 디버깅 원칙]
- 에러 발생 시 로그와 실행 흐름을 먼저 추적하여 근본 원인을 식별할 것.
- 엉뚱한 코드를 건드리지 말고 최소한의 안전한 패치를 적용한 뒤 회귀 테스트를 수행할 것.`,
    skillFile: {
      path: '.agents/skills/debug/SKILL.md',
      description: '결함 진단, 근본 원인 분석 및 안전한 패치 스킬',
      content: `# Debug

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
    }
  },
  {
    id: 'mod-code-review',
    name: '🛡️ code-review (10단계 다차원 정밀 코드 리뷰 스킬)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '10단계 코드리뷰',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: '기능 정확성, 회귀 위험, 데이터 유실, 타입 안정성, 아키텍처 일관성, 문서 반영까지 10개 관점에서 꼼꼼히 점검',
    detailedImpact: {
      agentRuleSummary: '10단계 리뷰 기준, 보안/타입/회귀 위험 점검, 구체적 개선점 리포트',
      skillPath: '.agents/skills/code-review/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [code-review 리뷰 원칙]
- 1. 기능 정확성 ➔ 2. 회귀 위험 ➔ 3. 보안/데이터 유실 ➔ 4. 에러 핸들링 ➔ 5. 타입 안전성 ➔ 6. 테스트 ➔ 7. 아키텍처 ➔ 8. 유지보수성 ➔ 9. UI 일관성 ➔ 10. 문서 반영 순으로 리뷰할 것.`,
    skillFile: {
      path: '.agents/skills/code-review/SKILL.md',
      description: '10단계 체계적 다차원 코드 리뷰 스킬',
      content: `# Code Review

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
    }
  },
  {
    id: 'mod-testing-rule',
    name: '🧪 testing-rule (단위 테스트 & 회귀 방지 자동 검증 룰)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '테스트 & 회귀방지',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    shortDesc: '컴파일 성공뿐만 아니라 실제 기능 동작을 테스트하고, 현재 변경으로 인한 회귀 오류를 방지하는 테스트 정책',
    detailedImpact: {
      agentRuleSummary: '동작 검증, 회귀 테스트, Definition of Done 충족',
      policyPath: '.agents/rules/testing.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [테스트 및 검증 규칙]
- **동작 검증 필수**: 단순 컴파일 확인을 넘어 실제 비즈니스 로직과 UI 인터랙션이 정상 동작하는지 테스트할 것.
- **회귀 오류 차단**: 변경 사항 적용 후 기존 테스트 스위트(\`npm test\`)를 실행하여 부수 효과가 없는지 증명할 것.`,
    extraFile: {
      path: '.agents/rules/testing.md',
      description: '프로젝트 단위 테스트 및 사후 검증 안전 정책',
      content: `# Testing and Verification Policy
1. Run the most relevant available checks after changes.
2. Verify behavior, not only compilation.
3. Fix regressions introduced by the current change.
4. Do not claim success without verification.`
    }
  },
  {
    id: 'mod-docs-knowledge-base',
    name: '🏛️ docs-knowledge-base (영구 아키텍처 & ADR 의사결정 보관소)',
    category: '4대 개발 표준 (DevOps/SOP)',
    badge: '영구 지식보관소',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: '프롬프트 컨텍스트를 낭비하지 않고, 시스템 구조도(overview.md)와 기술 의사결정(ADR)을 docs/ 에 영구 보관',
    detailedImpact: {
      agentRuleSummary: '시스템 아키텍처 문서화, ADR 기술 결정 기록, 지속적 태스크 추적',
      policyPath: 'docs/architecture/overview.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [영구 지식 문서화 규칙]
- 프로젝트 영구 지식은 \`/docs\` 아래에 보관하며, 일시적 작업 내용은 프롬프트에 남기지 말 것.
- \`docs/architecture/\`: 현재 시스템 아키텍처 / \`docs/decisions/\`: 기술 결정(ADR) / \`docs/plans/\`: 대형 구현 계획서.`,
    extraFile: {
      path: 'docs/architecture/overview.md',
      description: '프로젝트 전체 아키텍처 및 모듈 경계 개요서',
      content: `# Project Architecture Overview

## 1. System Structure
- Frontend: React 18+ (Vite) / TypeScript / Tailwind CSS
- State Management: Zustand (Global) & useState (Local UI)
- Tooling: Single Source of Truth via AGENTS.md

## 2. Directory Responsibilities
- \`src/components/\`: UI presentation components
- \`src/data/\`: Type-safe static datasets and configurations
- \`src/types/\`: Explicit TypeScript interfaces and models
- \`.agents/skills/\`: Reusable procedural workflow skills`
    }
  },

  // =========================================================================
  // --- [2] 스킬 & MCP 지능형 자동 라우터 (스마트 도구 선택기) ---
  // =========================================================================
  {
    id: 'mod-skill-mcp-router',
    name: '🧭 스킬 & MCP 자동 탐색 및 스마트 추천 라우터 (Skill & MCP Smart Selector)',
    category: '스킬/MCP 자동추천',
    badge: '스마트 도구 라우터',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    shortDesc: '등록된 수십 개의 .agents/skills/ 와 mcp.json 도구 중, 내가 내린 지시(프롬프트)에 딱 맞는 최적의 스킬/도구를 AI가 스스로 찾아 실행하는 메타 오케스트레이터',
    detailedImpact: {
      agentRuleSummary: '질의 의도 분석 ➔ 1순위 적합 스킬 탐색 ➔ 불필요한 도구 호출 최소화 ➔ 최적 도구 자동 체이닝',
      skillPath: '.agents/skills/skill-mcp-router/SKILL.md',
      policyPath: '.agents/rules/tool-selection.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [스킬 & MCP 도구 스마트 라우팅 및 선택 규칙]
- **작업 의도 파악**: 사용자의 요청이 들어오면 \`.agents/skills/\` 폴더의 스킬 목록과 \`mcp.json\` 도구 명세를 먼저 스캔하여 가장 적합한 도구를 1순위로 선정할 것.
- **불필요한 도구 호출 금지**: 단순 질의나 파일 작성에는 무거운 외부 MCP를 호출하지 말고, 꼭 필요한 순간에만 정확한 파라미터로 호출할 것.
- **도구 조합 체이닝**: "자료 검색 ➔ 요약 활동지 작성 ➔ 브라우저 검증"과 같이 2개 이상의 도구가 필요할 때 순서대로 자연스럽게 연결(Pipeline)하여 완결할 것.`,
    skillFile: {
      path: '.agents/skills/skill-mcp-router/SKILL.md',
      description: '사용자 명령에 가장 적합한 스킬과 MCP를 스스로 탐색하고 실행하는 스마트 라우터 스킬',
      content: `---
name: skill-mcp-router
description: Analyzes user intent, automatically discovers matching skills from .agents/skills/ and tools from mcp.json, and executes the optimal tool chain with minimal steps.
tools: [file_reader, shell]
---

# Skill & MCP 스마트 라우팅 워크플로우
1. 사용자의 요청에서 [목표(Goal)], [필요 데이터(Input)], [기대 산출물(Output)]을 추출한다.
2. \`.agents/skills/\` 디렉토리와 \`mcp.json\`을 조회하여 가장 일치율이 높은 스킬/도구를 판별한다.
3. 선택된 도구를 실행하고, 에러 발생 시 대안 도구로 폴백(Fallback)하여 작업을 완수한다.`
    },
    extraFile: {
      path: '.agents/rules/tool-selection.md',
      description: 'AI 도구 및 스킬 자동 선택 최적화 정책',
      content: `# Tool & Skill Selection Policy
1. 항상 최소 비용과 최소 스텝으로 목적을 달성할 수 있는 도구를 우선 선택한다.
2. 동일 작업에 여러 스킬이 존재할 경우, 대상 사용자(초등/일반/전문가)에 맞춘 특화 스킬을 선택한다.`
    }
  },

  // =========================================================================
  // --- [3] 교사/교육자 특화 실무 (생기부, 지도안, 가정통신문, 피드백, STEAM) ---
  // =========================================================================
  {
    id: 'mod-student-record',
    name: '📋 학생생활기록부(생기부) 과세특·행특 문구 생성 & 나이스 금지어 검사기',
    category: '교사/교육자 특화',
    badge: '교사 필수 생기부',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: '학생 관찰 키워드만 넣으면 교육부 NEIS 글자수(바이트)에 맞추고 기재 금지어(외부 수상, 부모 직업 등)를 자동 검사하여 수려한 학생부 문장으로 완성',
    detailedImpact: {
      agentRuleSummary: 'NEIS 글자수/바이트 검사, 교육부 기재 금지어 자동 필터링, 개별 학생 역량 중심 문장화',
      skillPath: '.agents/skills/student-record-writer/SKILL.md',
      policyPath: 'docs/reference/neis_record_guideline.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [학생생활기록부(생기부) 과세특/행특 작성 규칙]
- **교육부 기재 금지어 엄격 배제**: 공인어학시험, 교외 수상 실적, 부모 직업/사회경제적 지위 암시 문구, 외부 기관명 절대 기재 금지.
- **NEIS 바이트 수 규격 준수**: 한글 1자=3바이트, 띄어쓰기/영문=1바이트 기준으로 과목별 세특(1,500바이트), 행특(1,500바이트) 상한선 초과 방지.
- **성장과 역량 중심 문체**: 단순 '참여함' 나열이 아닌, [동기/계기] ➔ [구체적 활동 과정] ➔ [배우고 성장한 점(자기주도성)] 구조로 서술.`,
    skillFile: {
      path: '.agents/skills/student-record-writer/SKILL.md',
      description: '학생 관찰 키워드 기반 생기부 과세특 및 행동특성 자동 작성 스킬',
      content: `---
name: student-record-writer
description: Generates compliant NEIS student record narratives (Subject-specific talents, behavioral traits) with built-in banned phrase validation and byte count checks.
tools: [file_writer]
---

# 생기부 문구 생성 워크플로우
1. 학생의 과목명, 수행 과제 주제, 핵심 관찰 키워드를 분석한다.
2. 기재 금지어 사전을 대조하여 위반 단어가 없는지 1차 검사한다.
3. [동기 ➔ 활동 ➔ 성장 역량] 3단 논법으로 400~500자 내외의 자연스러운 문장을 생성한다.`
    },
    extraFile: {
      path: 'docs/reference/neis_record_guideline.md',
      description: '교육부 학생생활기록부 기재 요령 준수 정책',
      content: `# NEIS Student Record Guideline
1. 교외 경시대회, 외부 인증시험 성적은 기재 불가.
2. 학생의 잠재력, 탐구 열정, 긍정적인 협업 태도를 구체적 사례를 들어 긍정형 종결어미(~함, ~을 보임)로 서술.`
    }
  },
  {
    id: 'mod-lesson-plan-rubric',
    name: '📐 차시별 교수학습 지도안(수업계획서) & 수행평가 채점 루브릭 생성기',
    category: '교사/교육자 특화',
    badge: '지도안 & 루브릭',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    shortDesc: '2022 개정 교육과정 성취기준 연계, 45분/50분 차시별 [도입-전개-정리] 교수학습 과정안 및 상/중/하 3단계 수행평가 채점 기준표(루브릭) 자동 설계',
    detailedImpact: {
      agentRuleSummary: '교육과정 성취기준 연계, 시간대별 발문-활동 흐름표, 상/중/하 루브릭 채점표',
      skillPath: '.agents/skills/lesson-plan-rubric-gen/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [교수학습 지도안 및 채점 루브릭 작성 규칙]
- **성취기준 코드 연계**: 국가 교육과정 성취기준(예: [6과02-01])을 명시하고 핵심 질문과 학습 목표를 일치시킬 것.
- **시간대별 타임라인**: 40분/45분/50분 수업에 맞춰 [도입 5분] ➔ [전개 30~35분] ➔ [정리 5~10분]으로 발문과 학생 활동을 표로 구성.
- **객관적 루브릭**: 평가 기준을 '매우 잘함' 같은 모호한 표현 대신, 구체적인 도달 행동 지표(상/중/하)로 명시할 것.`,
    skillFile: {
      path: '.agents/skills/lesson-plan-rubric-gen/SKILL.md',
      description: '차시별 교수학습 지도안 및 수행평가 루브릭 자동 생성 스킬',
      content: `---
name: lesson-plan-rubric-gen
description: Creates comprehensive lesson plans (timeline, teacher prompts, student activities) and 3-tier scoring rubrics.
tools: [file_writer]
---

# 지도안 & 루브릭 생성 워크플로우
1. 교과, 학년, 단원명, 차시 목표를 확인한다.
2. [도입: 동기유발] ➔ [전개: 활동 1, 2, 3] ➔ [정리: 배움 확인 및 차시 예고] 표를 생성한다.
3. 지식/기능/태도 영역별 상/중/하 3단계 채점 기준표를 출력한다.`
    }
  },
  {
    id: 'mod-parent-notice',
    name: '✉️ 학부모 가정통신문 & 학생 모바일 알림장 작성기',
    category: '교사/교육자 특화',
    badge: '가정통신문 공문',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: '현장체험학습, 학부모 상담주간, 계절별 안전수칙 등 격식을 갖춘 학교장 명의 공문 서식 및 알림장 앱용 친절한 모바일 요약본 생성',
    detailedImpact: {
      agentRuleSummary: '공식 공문 인사말/서식, 일정/준비물 표, 모바일 알림장 앱용 3줄 요약',
      skillPath: '.agents/skills/parent-notice-newsletter/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [가정통신문 및 학급 알림장 작성 규칙]
- **예의 바른 공문 서식**: 계절 인사 ➔ 행사 목적 ➔ 일시/장소/준비물 ➔ 회신서(절취선) ➔ 학교장 명의 직인란 구조 유지.
- **모바일 알림장 버전 병기**: 스마트폰 앱(하이클래스, 클래스팅 등)으로 복사해 붙여넣기 좋은 가독성 높은 3줄 요약본을 함께 제공할 것.`,
    skillFile: {
      path: '.agents/skills/parent-notice-newsletter/SKILL.md',
      description: '학교 공식 가정통신문 및 학급 모바일 알림장 메시지 자동 생성 스킬',
      content: `---
name: parent-notice-newsletter
description: Generates formal parent newsletters with return slips and concise mobile notification drafts for school apps.
tools: [file_writer]
---

# 가정통신문 작성 워크플로우
1. 안내 행사(체험학습, 상담, 방학, 안전교육)와 주요 일정을 수집한다.
2. 격식 있는 학교 공식 가정통신문 서식(A4 1장)을 작성한다.
3. 학부모 모바일 앱용 핵심 요약 알림장 문구를 함께 출력한다.`
    }
  },
  {
    id: 'mod-feedback-coach',
    name: '💬 학생 맞춤형 성장 피드백 & 과제 샌드위치 첨삭 코멘트 생성기',
    category: '교사/교육자 특화',
    badge: '성장 피드백',
    badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    shortDesc: '학생 과제나 시험 답안을 보고 [구체적 칭찬 ➔ 핵심 개선점 ➔ 따뜻한 격려]의 3단계 샌드위치 피드백 코멘트를 학생 눈높이에 맞게 다정하게 작성',
    detailedImpact: {
      agentRuleSummary: '3단계 샌드위치 코멘트, 자존감 향상 피드백, 실천 가능한 개선 힌트 제공',
      skillPath: '.agents/skills/student-feedback-coach/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [학생 과제 피드백 및 샌드위치 첨삭 규칙]
- **3단계 샌드위치 기법**: [1. 노력과 강점 칭찬] ➔ [2. 한 가지만 짚어주는 구체적 개선 조언] ➔ [3. 다음 도전을 응원하는 격려] 순서 엄수.
- **친절하고 명확한 문체**: 지적이나 평가가 아닌, 학생의 성장을 돕는 친절한 조언자(코치)의 언어로 서술할 것.`,
    skillFile: {
      path: '.agents/skills/student-feedback-coach/SKILL.md',
      description: '학생 과제물에 대한 3단계 샌드위치 성장 피드백 생성 스킬',
      content: `---
name: student-feedback-coach
description: Produces constructive, encouraging 3-stage sandwich feedback (Praise -> Actionable Improvement -> Motivation).
tools: [file_writer]
---

# 학생 피드백 생성 워크플로우
1. 학생의 과제 제출물 요약과 주요 장단점을 파악한다.
2. [장점 발견 칭찬] ➔ [스스로 고쳐볼 수 있는 힌트] ➔ [따뜻한 응원 문구]를 조립한다.`
    }
  },
  {
    id: 'mod-steam-project',
    name: '🔬 교과 융합(STEAM) & 메이커 창의체험 프로젝트 수업 설계기',
    category: '교사/교육자 특화',
    badge: 'STEAM 융합수업',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '과학+미술, 수학+음악, 사회+AI 등 2개 이상 교과를 엮은 문제해결형(PBL) 융합 프로젝트 수업, 모둠 미션지 및 산출물 평가서 설계',
    detailedImpact: {
      agentRuleSummary: '실생활 문제 기반 PBL 시나리오, 모둠별 역할 분담표, 준비물 예산 및 평가표',
      skillPath: '.agents/skills/steam-project-designer/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [교과 융합 STEAM 프로젝트 수업 규칙]
- **실생활 맥락(Context) 기반**: "기후변화에 대응하는 우리 동네 스마트 쉼터 만들기"처럼 실제 생활 속 문제를 해결하는 프로젝트로 기획할 것.
- **융합 교과 명시**: 각 단계에서 발휘되는 교과별 역량(과학적 탐구, 수학적 계산, 예술적 표현 등)을 구조화할 것.`,
    skillFile: {
      path: '.agents/skills/steam-project-designer/SKILL.md',
      description: '교과 융합 STEAM 프로젝트 및 메이커 수업 설계 스킬',
      content: `---
name: steam-project-designer
description: Designs interdisciplinary STEAM projects (Science, Tech, Engineering, Arts, Math) with group challenge briefs.
tools: [file_writer]
---

# STEAM 수업 설계 워크플로우
1. 융합할 2~3개 교과와 중심 탐구 질문을 설정한다.
2. 모둠별 4차시 프로젝트 활동 안내서와 준비물 체크리스트를 만든다.
3. 최종 결과물 전시 및 동료 평가 루브릭을 생성한다.`
    }
  },

  // =========================================================================
  // --- [4] 초중고 교과 수업 활동지 & 독서 감상문 & 학급 도구 ---
  // =========================================================================
  {
    id: 'mod-lesson-worksheet',
    name: '🏫 초등·중고등 교과 수업 활동지 & 단원 평가 문제지',
    category: '초중고 수업/활동지',
    badge: '교과 활동지',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    shortDesc: '국어·수학·사회·과학 학년별 단원 맞춤 활동지, 생각 열기 질문, 4지선다·서술형 퀴즈 및 정답 해설지 자동 제작',
    detailedImpact: {
      agentRuleSummary: '학년별 어휘 난이도 맞춤, 3단계 생각 열기 발문, 정답 및 교사용 지도 팁 포함',
      skillPath: '.agents/skills/lesson-worksheet-generator/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [초등·중고등 교과 수업 활동지 작성 규칙]
- **학년별 눈높이 어휘**: 초등 저학년(1~2), 중학년(3~4), 고학년(5~6) 및 중고등학생의 발달 단계에 맞는 친절하고 명확한 문체 사용.
- **3단계 구조화 발문**: [1단계: 흥미 유발 생각 열기] ➔ [2단계: 본문 핵심 내용 확인 퀴즈] ➔ [3단계: 내 생각 적용 서술형 질문]으로 구성할 것.
- **교사용 정답표 동봉**: 활동지 하단 또는 별도 섹션에 학생 지도용 정답 및 채점 기준표를 반드시 포함할 것.`,
    skillFile: {
      path: '.agents/skills/lesson-worksheet-generator/SKILL.md',
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
      skillPath: '.agents/skills/book-movie-review-worksheet/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [독서·영화 감상문 및 토론 활동지 규칙]
- **열린 질문(Open Question) 중심**: "네/아니오" 단답형 대신 "만약 내가 주인공이었다면?"과 같은 생각 확장 질문 배치.
- **감상 카드 포맷**: 제목, 지은이/감독, 한 줄 평, 별점(★ 5점 만점), 명장면/명대사 기록란을 시각적으로 구조화할 것.
- **스포일러 주의 표기**: 결말을 포함한 심층 토론 문항은 사전에 안내 문구를 둘 것.`,
    skillFile: {
      path: '.agents/skills/book-movie-review-worksheet/SKILL.md',
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
      skillPath: '.agents/skills/class-activity-picker/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [학급·동아리 인터랙티브 도구 규칙]
- **공평한 무작위 추첨**: 편향 없는 랜덤 알고리즘과 긴장감 있는 룰렛/사다리타기 시각 애니메이션 제공.
- **전자칠판 및 모바일 터치 최적화**: 버튼과 글자를 큼직하게 만들어 교실 TV나 태블릿에서 터치하기 쉽게 구현.
- **브라우저 로컬 저장**: 명단이나 스티커 현황이 새로고침해도 날아가지 않도록 \`localStorage\`에 자동 보관할 것.`,
    skillFile: {
      path: '.agents/skills/class-activity-picker/SKILL.md',
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
      skillPath: '.agents/skills/sns-card-news-writer/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [SNS 콘텐츠 및 홍보 글쓰기 규칙]
- **시선 끄는 제목(Hook)**: 클릭하고 싶어지는 호기심 유발형 제목 3가지 추천.
- **카드뉴스 슬라이드 규격**: [1장: 표지 질문] ➔ [2~4장: 핵심 꿀팁/정보] ➔ [5장: 행동 촉구 및 저장 유도] 5단 슬라이드로 구성.
- **이모지와 해시태그**: 본문 가독성을 높이는 이모지와 인스타그램/네이버 블로그 검색 유입용 해시태그 10개 추출.`,
    skillFile: {
      path: '.agents/skills/sns-card-news-writer/SKILL.md',
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
      skillPath: '.agents/skills/dutch-pay-calculator/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [모임 정산 및 간편 계산기 규칙]
- **1원 단위 정확한 정산**: 나머지 금액(자투리) 처리 방식(올림/내림/주최자 부담)을 선택할 수 있게 구현.
- **카카오톡 공유 텍스트**: 정산 금액, 입금 계좌번호, 정산 대상자 목록을 한 번에 복사할 수 있는 [카톡 공유 복사] 버튼 제공.
- **엑셀(CSV) 내역 내보내기**: 동아리 회계 보고용 엑셀 다운로드 기능 포함.`,
    skillFile: {
      path: '.agents/skills/dutch-pay-calculator/SKILL.md',
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

  // =========================================================================
  // --- [5] 전문 UI/DB/보안 개발 모듈 ---
  // =========================================================================
  {
    id: 'mod-react-ui',
    name: '🎨 깔끔한 웹/앱 화면 만들기 (버튼·카드·메뉴 디자인)',
    category: '프론트엔드/UI',
    badge: '화면 디자인',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '내 브랜드 컬러와 글꼴(DESIGN.md)을 준수하여 조잡하지 않고 완성도 높은 버튼, 입력창, 카드 UI 제작',
    detailedImpact: {
      agentRuleSummary: '디자인 색상·글꼴 통일, 완성도 높은 UI 컴포넌트 규칙',
      policyPath: '.agents/rules/ui-design.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [프론트엔드 UI 및 디자인 토큰 규칙]
- **프레임워크**: React 18+, TypeScript Strict Mode (\`any\` 타입 사용 엄격 금지), Tailwind CSS v3
- **디자인 토큰 준수**: 인라인 style 금지. 반드시 \`./DESIGN.md\`의 컬러(#3182F6 등)와 4px 여백 그리드 규격 준수
- **상태 관리 & 아이콘**: \`lucide-react\` 아이콘 사용, 전역 상태는 \`zustand\`, 로컬 상태는 \`useState\`
- **타입 정의**: 모든 컴포넌트 Props는 \`src/types/\` 내 인터페이스로 명시적 정의`,
    extraFile: {
      path: '.agents/rules/ui-design.md',
      description: 'UI 디자인 토큰 및 인터랙션 안전 정책',
      content: `# UI / UX Design Principles & Rules
1. Preserve the established visual language defined in DESIGN.md.
2. Keep interaction patterns consistent across all screens.
3. Verify responsive behavior after UI changes (mobile, tablet, desktop).
4. Maintain accessible color contrast and keyboard navigable elements.`
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
      skillPath: '.agents/skills/api-endpoint-test/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [백엔드 REST API 아키텍처 규칙]
- **표준 HTTP 상태 코드**: 성공(200, 201), 사용자 실수(400, 401, 404), 서버 에러(500) 코드를 명확히 반환
- **입력 데이터 검증**: 모든 API 요청과 응답은 잘못된 값이 들어오지 못하도록 엄격히 검증할 것.
- **친절한 에러 안내**: 알기 쉬운 에러 JSON 포맷(\`{ error: { code, message } }\`)으로 반환하여 프론트엔드에서 안내 팝업을 띄우기 쉽게 만들 것.`,
    skillFile: {
      path: '.agents/skills/api-endpoint-test/SKILL.md',
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
      skillPath: '.agents/skills/db-migration-gen/SKILL.md'
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
      path: '.agents/skills/db-migration-gen/SKILL.md',
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
      policyPath: '.agents/rules/security_policy.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [보안 및 비밀키 관리 규칙]
- **비밀키 코드 노출 금지**: API Key, DB 비밀번호, 토큰 키를 소스코드에 절대 직접 적지 말고 \`.env\` 환경변수로만 참조할 것.
- **인증 토큰 검증**: 마이페이지, 주문내역 등 로그인 전용 화면은 로그인 여부를 철저히 검증할 것.
- **비밀번호 암호화**: 비밀번호를 원문 그대로 저장하지 말고, 반드시 안전한 암호화(bcrypt 등)를 거쳐 저장할 것.`,
    extraFile: {
      path: '.agents/rules/security_policy.md',
      description: '사내 보안 인증 및 시크릿 키 관리 정책',
      content: `# Security Policy & Secret Key Management
1. 모든 비밀번호는 단방향 암호화하여 저장한다.
2. 로그인 토큰 유효기간을 설정하고 안전한 쿠키 방식으로 관리한다.
3. .env 파일은 절대 Git 레포지토리에 커밋하지 않는다 (.gitignore 필수 등록).`
    }
  },
  {
    id: 'mod-git-pr-skill',
    name: '🚀 작업 내용 깃허브(GitHub) 자동 백업 & 에러 발생 시 스스로 수정',
    category: '보안/결제',
    badge: '자동 백업 & 치유',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: 'AI가 수정한 코드 내용을 일목요연하게 요약해 깃허브에 백업하고, 터미널 오류 발생 시 멈추지 않고 스스로 고치도록 지시',
    detailedImpact: {
      agentRuleSummary: '코드 변경 내역 자동 요약, 에러 발생 시 AI 스스로 자동 수정',
      mcpServerName: 'github',
      mcpType: 'needs-auth',
      mcpSetupGuide: '.env의 GITHUB_PERSONAL_ACCESS_TOKEN 입력 필요',
      skillPath: '.agents/skills/git-auto-pr/SKILL.md'
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
      path: '.agents/skills/git-auto-pr/SKILL.md',
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
  }
];

// 3. 신규 프로젝트 시작 시 스캐폴딩 4단계 가이드 데이터 (Codex + Claude + Antigravity 통합 아키텍처)
export const NEW_PROJECT_SCAFFOLD_GUIDE: NewProjectScaffoldGuide = {
  title: 'Codex + Claude Code + Antigravity 3대 AI IDE 통합 스캐폴딩 로드맵',
  summary: '도구마다 규칙을 중복 작성하지 않고, [AGENTS.md(단일 진실 공급원) ➔ @AGENTS.md 임포트(CLAUDE.md) ➔ .agents/skills/ 공용 스킬 ➔ docs/ 영구 지식] 구조로 구축하는 2026 표준 아키텍처입니다.',
  triIdePrinciple: {
    title: '3대 AI IDE 단일 진실 공급원(Single Source of Truth) 메커니즘',
    diagram: `                         AGENTS.md
                   (프로젝트 단일 진실 공급원 헌법)
                    /          |          \\
                   /           |           \\
             OpenAI Codex   Antigravity   Claude Code
                  |            |              |
                  |     .agents/rules/   .claude/rules/
                  |            |              |
                  +------> .agents/skills/ <--+ (CLAUDE.md -> @AGENTS.md)
                               |
                    영구 지식 보관소 (docs/)
                    ├── architecture/  ├── plans/
                    ├── tasks/         ├── decisions/`,
    rules: [
      '1. 규칙 일원화: 모든 AI 공통 규칙은 루트 AGENTS.md 에만 작성하며, CLAUDE.md는 @AGENTS.md 임포트 포인터로 작동합니다.',
      '2. 스킬 공용화: 재사용 가능한 워크플로우는 .agents/skills/ 에 배치하여 Codex와 Antigravity가 100% 공유합니다.',
      '3. Codex 규칙 금지: .codex/rules/ 는 일반 코딩 규칙용이 아니므로 생성하지 않고 루트 AGENTS.md를 활용합니다.',
      '4. 영구 지식 분리: 일시적 태스크가 아닌 지속적 지식(아키텍처, ADR 결정)은 docs/ 디렉토리에 보관합니다.'
    ]
  },
  hierarchyDiagram: `프로젝트 루트 (Root Directory)
├── AGENTS.md                   [마스터 헌법: 모든 AI 도구 단일 진실 공급원]
├── CLAUDE.md                   [@AGENTS.md 임포트 포인터 (Claude Code 전용)]
├── DESIGN.md                   [디자인 시스템: 컬러 팔레트, 폰트, 4px 그리드]
├── mcp.json                    [외부 도구: DB, 브라우저, GitHub MCP 연동]
├── .env.example                [환경변수: API 시크릿 키 템플릿]
│
├── .agents/                    [Antigravity & Codex 공용]
│   ├── rules/                  [전용 안전 정책 (testing.md, ui-design.md)]
│   └── skills/                 [공용 워크플로우 스킬]
│       ├── plan-feature/       [사전 기획 & 위험 분석]
│       ├── implement-feature/  [최소 변경 안전 구현]
│       ├── debug/              [원인 분석 & 자가 치유]
│       ├── code-review/        [10단계 다차원 리뷰]
│       ├── skill-mcp-router/   [지능형 도구 라우터]
│       └── student-record-writer/ [생기부 과세특 작성기]
│
├── .claude/                    [Claude Code 전용]
│   └── rules/                  [Claude 전용 행동 오버라이드]
│
└── docs/                       [영구 프로젝트 지식 베이스]
    ├── architecture/           [현재 시스템 아키텍처 (overview.md)]
    ├── plans/                  [대형 기능 구현 계획서]
    ├── decisions/              [ADR 기술적 의사결정]
    └── reference/              [교육과정 및 사내 규정]`,
  steps: [
    {
      stepNumber: 1,
      title: '1단계: 통합 마스터 헌법 (AGENTS.md & CLAUDE.md) 배치',
      action: '프로젝트 루트에 AGENTS.md를 단일 진실 공급원으로 배치하고, CLAUDE.md는 @AGENTS.md를 임포트하도록 설정합니다.',
      outputFile: 'AGENTS.md, CLAUDE.md'
    },
    {
      stepNumber: 2,
      title: '2단계: 디자인 시스템 규격 (DESIGN.md) 주입',
      action: 'DESIGN.md에 브랜드 메인 컬러(#3182F6 등), 폰트, 버튼 곡률(12px)을 정의하여 일관된 UI를 강제합니다.',
      outputFile: 'DESIGN.md'
    },
    {
      stepNumber: 3,
      title: '3단계: 4대 표준 스킬 (.agents/skills/) & MCP 도구 장착',
      action: '.agents/skills/ 에 plan-feature, implement-feature, debug, code-review 및 맞춤 스킬을 장착하고 mcp.json을 구성합니다.',
      outputFile: '.agents/skills/*, mcp.json'
    },
    {
      stepNumber: 4,
      title: '4단계: 영구 지식 베이스 (docs/) 초기화 & 검증',
      action: 'docs/architecture, docs/plans 폴더를 생성하고, npm run build 를 실행하여 0에러를 검증합니다.',
      outputFile: 'docs/*, npm run build'
    }
  ],
  copyableScaffoldPrompt: `"이 프로젝트의 AGENTS.md, DESIGN.md, mcp.json, .agents/skills/ 를 먼저 읽고 프로젝트 기본 뼈대(Scaffold)를 생성한 뒤, npm run build 를 실행하여 타입 오류 0건임을 입증해줘."`
};
