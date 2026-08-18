export interface TemplateConfigFile {
  id: string;
  filename: string;
  targetLocation: string;
  supportedTools: string;
  badge: string;
  badgeColor: string;
  description: string;
  whyNeeded: string;
  rawContent: string;
  customizationTips: string[];
}

// 1. 사용할 AI 도구 개별 아이템 정의 (중복 다중 선택 가능)
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
  category: '프론트엔드/UI' | '백엔드/DB' | '보안/결제' | '협업/DevOps' | '데이터/자동화' | '교육/학습용' | '비즈니스/문서' | '데이터/시각화';
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

// 에이전트, MCP, 스킬 3총사 핵심 정리 데이터
export const MCP_SKILL_AGENT_CONCEPTS: McpSkillAgentSummary[] = [
  {
    id: 'concept-agent',
    name: '1. 에이전트 (Agent)',
    englishName: 'Autonomous AI Coding Agent',
    role: '두뇌이자 자율 실행자 (Agent)',
    metaphor: '👨‍🍳 전문 셰프: 목표를 전달하면 스스로 계획을 세우고, 재료를 준비해 완성된 요리를 만들어내는 주체',
    description: '단순히 질문에 답하는 챗봇이 아니라, 목표를 주면 파일 생성, 코드 작성, 터미널 명령어 실행, 에러 자동 수정까지 스스로 수행하는 자율 코딩 AI입니다.',
    practicalExample: '"로그인 기능 만들어줘"라고 요청하면 [기획 검토 ➔ 컴포넌트 개발 ➔ 빌드 테스트 ➔ 버그 수정 ➔ 완료 보고]를 알아서 진행',
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
    description: 'AI가 회사 데이터베이스(PostgreSQL), GitHub 저장소, 로컬 파일, 웹 브라우저 등 외부 시스템과 안전하게 통신할 수 있도록 만든 오픈소스 표준 프로토콜입니다.',
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
    description: 'Git PR 자동 생성, DB 마이그레이션 스크립트 작성 등 반복되는 실무 작업을 AI가 실수 없이 일관되게 수행하도록 절차를 정리해 둔 재사용 문서입니다.',
    practicalExample: '에이전트에게 `/git-auto-pr` 스킬을 실행시키면 코드 변경점을 분석해 깔끔한 커밋과 PR 본문을 3초 만에 작성',
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

// 2. 실무 작업 모듈 8대 옵션 (STEP 2: 중복 선택 체크박스)
export const TASK_FEATURE_MODULES: TaskFeatureModule[] = [
  // --- [1] 프론트엔드 & UI/UX ---
  {
    id: 'mod-react-ui',
    name: '🎨 React/Next.js UI 컴포넌트 & 디자인 시스템 (DESIGN.md)',
    category: '프론트엔드/UI',
    badge: 'UI 토큰',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: 'React 18+, TypeScript strict, DESIGN.md 토큰(컬러/폰트/여백) 준수 및 UI 컴포넌트 자동 스캐폴딩 스킬',
    detailedImpact: {
      agentRuleSummary: 'React strict, any 금지, DESIGN.md 토큰 준수 지침 주입',
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
      description: 'DESIGN.md 규격을 준수하는 React 함수형 컴포넌트 자동 생성 스킬',
      content: `---
name: ui-component-scaffold
description: DESIGN.md 규격을 준수하는 React 함수형 컴포넌트 자동 생성
tools: [file_writer, shell]
---

# UI 컴포넌트 자동 생성 워크플로우
1. 생성할 컴포넌트의 Props 인터페이스를 명시적으로 정의한다.
2. DESIGN.md의 토큰(컬러, 폰트, 여백)을 Tailwind CSS 클래스로 매핑한다.
3. 반응형 디자인(sm, md, lg)과 마우스 호버/액티브 상태 애니메이션을 포함한다.
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
    name: '📱 반응형 모바일 대응 & Puppeteer 화면 캡처 검증',
    category: '프론트엔드/UI',
    badge: '화면 검증 MCP',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    shortDesc: '모바일(sm)/태블릿(md)/데스크톱(lg) 반응형 필수 대응 및 Puppeteer 브라우저 스크린샷 MCP 연동',
    detailedImpact: {
      agentRuleSummary: '반응형 브레이크포인트 필수 대응 및 캡처 검증',
      mcpServerName: 'puppeteer-browser',
      mcpType: 'zero-config',
      mcpSetupGuide: 'API 키 없이 npx로 즉시 브라우저 구동'
    },
    defaultSelected: true,
    agentRuleSection: `### [반응형 디자인 및 브라우저 검증 규칙]
- **반응형 필수 대응**: 모바일(sm: 640px), 태블릿(md: 768px), 데스크톱(lg: 1024px) 뷰포트에서 깨짐이 없도록 설계
- **화면 렌더링 검증**: UI 컴포넌트 작성 후 Puppeteer MCP 도구를 활용해 브라우저 렌더링 화면을 캡처하고 시각적 결함을 점검할 것.`,
    mcpServer: {
      key: 'puppeteer-browser',
      mcpType: 'zero-config',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-puppeteer'],
        description: '실제 웹 브라우저를 띄워 UI 스크린샷 캡처 및 화면 렌더링 검증 (무설정 즉시 실행)'
      }
    }
  },

  // --- [2] 백엔드 & 데이터베이스 ---
  {
    id: 'mod-rest-api',
    name: '⚙️ 백엔드 REST API 아키텍처 & DTO 타입 검증',
    category: '백엔드/DB',
    badge: 'API 표준',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: 'RESTful 상태 코드 규격, 요청/응답 DTO 인터페이스 검증, API 엔드포인트 테스트 스킬',
    detailedImpact: {
      agentRuleSummary: 'RESTful 상태 코드 및 DTO 명시적 검증',
      skillPath: 'skills/api-endpoint-test/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [백엔드 REST API 아키텍처 규칙]
- **RESTful 표준**: 리소스 기반 URI 명명, HTTP 상태 코드(200, 201, 400, 401, 404, 500) 명확히 반환
- **DTO 타입 검증**: 모든 API 요청(Request Body/Query)과 응답(Response)은 TypeScript 인터페이스 또는 Zod 스키마로 100% 검증
- **에러 핸들링**: 전역 예외 처리 미들웨어를 두어 일관된 에러 JSON 포맷(\`{ error: { code, message } }\`)으로 반환할 것.`,
    skillFile: {
      path: 'skills/api-endpoint-test/SKILL.md',
      description: 'API 엔드포인트 자동 테스트 및 응답 스키마 검증 스킬',
      content: `---
name: api-endpoint-test
description: 백엔드 REST API 엔드포인트의 정상/예외 케이스 자동 테스트
tools: [shell]
---

# API 엔드포인트 테스트 워크플로우
1. 200/201 성공 응답 데이터 구조와 타입 일치 여부를 검증한다.
2. 400 유효하지 않은 입력값 전송 시 에러 메시지가 정확한지 확인한다.
3. 401/403 미인증 요청에 대한 접근 차단 상태를 검증한다.`
    }
  },
  {
    id: 'mod-postgres-db',
    name: '🗄️ PostgreSQL / MySQL DB 연동 & 마이그레이션',
    category: '백엔드/DB',
    badge: 'DB MCP (연결 필요)',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    shortDesc: 'PostgreSQL DB 스키마 실시간 조회 MCP, DB 무단 파괴(DROP) 방어, SQL 마이그레이션 스킬',
    detailedImpact: {
      agentRuleSummary: 'DB 조회 시 읽기전용 우선, DROP/DELETE 전수 삭제 차단',
      mcpServerName: 'postgres',
      mcpType: 'needs-auth',
      mcpSetupGuide: '.env의 DATABASE_URL 또는 로컬 postgresql 연결 URL 입력 필요',
      skillPath: 'skills/db-migration-gen/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [데이터베이스 보안 및 스키마 관리 규칙]
- **DB 접근 제한**: 데이터베이스 조회 시 쓰기(Write) 대신 읽기 전용(Read-Only) 쿼리를 우선 활용할 것.
- **위험 명령 차단**: 운영 DB 파괴 명령(\`DROP TABLE\`, \`DELETE FROM\` 전수 삭제)은 사람 승인 없이 절대 실행 금지.
- **인덱스 및 관계**: 외래키(FK) 연결 시 반드시 인덱스를 생성하여 N+1 쿼리 및 성능 저하를 방지할 것.`,
    mcpServer: {
      key: 'postgres',
      mcpType: 'needs-auth',
      envVarNeeded: 'DATABASE_URL=postgresql://user:password@localhost:5432/my_database',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/my_database'],
        description: '로컬 데이터베이스 테이블 스키마 조회 및 읽기 전용 쿼리 실행 (.env DATABASE_URL 연결)'
      }
    },
    skillFile: {
      path: 'skills/db-migration-gen/SKILL.md',
      description: 'SQL 마이그레이션 스크립트 및 롤백 쿼리 자동 생성 스킬',
      content: `---
name: db-migration-gen
description: 테이블 스키마 변경 시 안전한 Up/Down SQL 마이그레이션 스크립트 생성
tools: [file_writer, shell]
---

# DB 마이그레이션 스크립트 생성 워크플로우
1. 변경할 테이블의 외래키(FK) 및 인덱스 영향도를 사전에 분석한다.
2. \`UP\` 쿼리(신규 테이블 생성 또는 컬럼 추가)를 작성한다.
3. 장애 발생 시 즉시 복구할 수 있는 \`DOWN\` 롤백 쿼리를 반드시 세트로 작성한다.`
    }
  },

  // --- [3] 보안 & 결제 ---
  {
    id: 'mod-security-auth',
    name: '🔐 보안 인증 (JWT / OAuth2 / API Key 방어)',
    category: '보안/결제',
    badge: '보안 정책',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    shortDesc: 'API Secret Key 소스코드 하드코딩 금지, JWT 만료 처리, 사내 보안 정책(security_policy.md)',
    detailedImpact: {
      agentRuleSummary: '시크릿 키 .env 강제, JWT Bearer 미들웨어 검증',
      policyPath: 'rules/security_policy.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [보안 및 시크릿 키 관리 규칙]
- **시크릿 키 하드코딩 금지**: API Key, DB 비밀번호, JWT Secret을 코드에 절대 노출하지 말고 \`.env\` 환경변수로만 참조할 것.
- **인증 토큰 검증**: 모든 보호된 API 엔드포인트는 Authorization Bearer 헤더 검증 미들웨어를 통과시킬 것.
- **비밀번호 암호화**: 평문 비밀번호 저장 금지. 반드시 bcrypt(saltRounds >= 10) 이상으로 해싱할 것.`,
    extraFile: {
      path: 'rules/security_policy.md',
      description: '사내 보안 인증 및 시크릿 키 관리 정책',
      content: `# Security Policy & Secret Key Management
1. 모든 비밀번호는 bcrypt(saltRounds >= 10) 또는 Argon2로 단방향 암호화한다.
2. JWT Access Token 유효기간은 최대 2시간, Refresh Token은 HttpOnly Cookie로 저장한다.
3. .env 파일은 절대 Git 레포지토리에 커밋하지 않는다 (.gitignore 필수 등록).`
    }
  },
  {
    id: 'mod-payment-idempotency',
    name: '💳 결제 시스템 & 트랜잭션 멱등성 (Toss / Stripe)',
    category: '보안/결제',
    badge: '결제 정책',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    shortDesc: '중복 결제 방지 멱등키(Idempotency Key), 부동소수점 오차 방지 Decimal.js 연산 규칙',
    detailedImpact: {
      agentRuleSummary: 'Idempotency-Key 필수 헤더 검증 및 Decimal.js 금액 연산',
      policyPath: 'rules/payment_policy.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [결제 및 금융 트랜잭션 규칙]
- **결제 멱등성 보장**: 모든 결제/환불 API 요청 시 \`Idempotency-Key\` 헤더를 필수로 검증하여 중복 결제를 100% 차단할 것.
- **부동소수점 오차 방지**: 자바스크립트 금액 계산 시 \`Decimal.js\` 라이브러리를 필수로 사용하여 소수점 오차를 방지할 것.
- **트랜잭션 격리**: 잔액 차감 및 주문 생성을 동일한 DB 트랜잭션(ACID)으로 묶을 것.`,
    extraFile: {
      path: 'rules/payment_policy.md',
      description: '결제 트랜잭션 및 금액 연산 무결성 정책',
      content: `# Payment & Transaction Policy
1. 모든 결제 승인 API는 중복 요청 방지를 위해 Redis 기반 멱등성 락(Lock)을 적용한다.
2. 부동소수점 오차 방지를 위해 모든 금액 및 수수료 계산 시 Decimal.js를 사용한다.`
    }
  },

  // --- [4] 협업 & DevOps ---
  {
    id: 'mod-git-pr-skill',
    name: '🚀 Git 커밋 & GitHub PR 자동 생성 (Conventional Commits)',
    category: '협업/DevOps',
    badge: '생산성 스킬 & MCP',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    shortDesc: '소스코드 변경점을 자동 분석하여 feat/fix 규격 커밋 및 GitHub PR을 3초 만에 생성하는 실무 스킬',
    detailedImpact: {
      agentRuleSummary: '빌드/테스트 자가 치유 및 0에러 입증 선언',
      mcpServerName: 'github',
      mcpType: 'needs-auth',
      mcpSetupGuide: '.env의 GITHUB_PERSONAL_ACCESS_TOKEN 입력 필요',
      skillPath: 'skills/git-auto-pr/SKILL.md'
    },
    defaultSelected: true,
    agentRuleSection: `### [Git 커밋 및 자가 검증 규칙]
- **자가 치유 (Self-Healing)**: 터미널 빌드/테스트 에러 발생 시 멈추지 말고 에러 로그를 분석하여 스스로 1차 수정을 시도할 것.
- **검증 완료 선언**: 작업 완료 선언 전 반드시 \`npm run build\`로 에러 0건을 입증할 것.`,
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
        description: 'GitHub 이슈 조회, PR 생성, 코드 리뷰 자동화 (.env 토큰 연결)'
      }
    },
    skillFile: {
      path: 'skills/git-auto-pr/SKILL.md',
      description: 'Git 커밋 및 PR 자동 생성 스킬 교본',
      content: `---
name: git-auto-pr
description: 소스코드 변경점을 자동 분석하여 Conventional Commits 규칙 커밋 및 PR 생성
tools: [git, shell]
---

# Git Auto PR 생성 워크플로우
1. \`git status\` 및 \`git diff --staged\`를 실행하여 실제 변경된 파일과 라인을 확인한다.
2. 변경 유형(feat, fix, refactor, style, docs)을 분류하여 50자 이내 요약 제목 작성.
3. PR 본문에 [주요 변경 사항], [자가 테스트 검증 결과], [관련 이슈 번호]를 포함하여 생성한다.`
    }
  },

  // --- [5] 데이터 & 자동화 ---
  {
    id: 'mod-data-pipeline',
    name: '📊 데이터 분석 & 파이썬 정제 파이프라인 (Pandas / Polars)',
    category: '데이터/자동화',
    badge: '데이터 MCP',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    shortDesc: 'Python 가상환경(.venv) 강제, 결측치(NaN) 검증, 대용량 파일 청크 처리 및 데이터 정제 스킬',
    detailedImpact: {
      agentRuleSummary: '로컬 가상환경(.venv), 결측치/타입 검증, 메모리 최적화',
      mcpServerName: 'filesystem',
      mcpType: 'zero-config',
      mcpSetupGuide: 'API 키 없이 로컬 data 폴더 즉시 탐색',
      skillPath: 'skills/data-pipeline/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [데이터 처리 및 파이썬 가상환경 규칙]
- **로컬 가상환경 준수**: 시스템 전역 파이썬 대신 반드시 로컬 가상환경(\`.venv\` / uv)을 사용할 것.
- **결측치 & 타입 검증**: 데이터 로딩 시 결측치(Null) 비율을 가장 먼저 검증하고 보고할 것.
- **대용량 메모리 최적화**: 1GB 이상의 데이터는 청크 단위로 처리하여 OOM(Out of Memory)을 방지할 것.`,
    mcpServer: {
      key: 'filesystem',
      mcpType: 'zero-config',
      config: {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', './data'],
        description: 'data 디렉토리 대용량 데이터셋 파일 고속 탐색 (무설정 즉시 실행)'
      }
    },
    skillFile: {
      path: 'skills/data-pipeline/SKILL.md',
      description: '데이터 전처리 및 정제 파이프라인 자동화 스킬',
      content: `---
name: data-pipeline
description: 원시 데이터(Raw Data)의 결측치 처리, 이상치 제거 및 표준화 자동 수행
tools: [file_writer, shell]
---

# 데이터 전처리 자동화 워크플로우
1. 입력 데이터의 컬럼별 데이터 타입과 결측치 비율을 분석한다.
2. 이상치(Outlier)를 탐지 및 정제하고 Parquet 형식으로 저장한다.`
    }
  },

  // --- [6] 교육용 웹/앱 & 비즈니스 문서 ---
  {
    id: 'mod-edu-quiz',
    name: '📚 인터랙티브 퀴즈 & 학습 단어장 교육용 웹 모듈 (EduTech)',
    category: '교육/학습용',
    badge: '교육용 스킬',
    badgeColor: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
    shortDesc: '플래시카드 뒤집기 애니메이션, Web Speech 음성 재생, 퀴즈 채점 및 오답 노트 로컬 저장 지침',
    detailedImpact: {
      agentRuleSummary: '학습자 친화 UI/UX, 오답노트 로컬 동기화, 음성 재생 예외 처리',
      skillPath: 'skills/edu-quiz-generator/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [교육용 웹/앱 및 인터랙티브 학습 규칙]
- **학습자 친화 인터랙션**: 카드가 뒤집히는 3D 플립 애니메이션과 즉각적인 정답/오답 사운드/시각 피드백을 제공할 것.
- **오답 노트 영속화**: 틀린 문제는 \`localStorage\`에 저장하여 재학습이 가능하도록 설계할 것.
- **음성 재생(TTS) 예외 처리**: \`window.speechSynthesis\` 지원 여부를 사전에 체크하고 미지원 브라우저 폴백을 둘 것.`,
    skillFile: {
      path: 'skills/edu-quiz-generator/SKILL.md',
      description: '인터랙티브 퀴즈 및 단어장 컴포넌트 자동 생성 스킬',
      content: `---
name: edu-quiz-generator
description: 단어 목록을 입력받아 플래시카드, 4지선다 퀴즈 및 오답 노트 컴포넌트 자동 생성
tools: [file_writer, shell]
---

# 교육용 퀴즈 컴포넌트 생성 워크플로우
1. 단어/문제 JSON 데이터 구조(id, question, options, answer, explanation)를 정의한다.
2. 카드 뒤집기 애니메이션과 즉각적인 채점 상태 머신(State Machine)을 구현한다.
3. 오답 복습용 필터링 및 로컬스토리지 저장 로직을 추가한다.`
    }
  },
  {
    id: 'mod-biz-docs',
    name: '📄 서비스 기획서 & 사업 제안서(IR) 표준 문서화 모듈',
    category: '비즈니스/문서',
    badge: '문서화 지침',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    shortDesc: '시장 분석(TAM/SAM/SOM), 타겟 페르소나, 핵심 기능 정의서, 6개월 로드맵 표 마크다운 자동 생성',
    detailedImpact: {
      agentRuleSummary: '표준 사업 기획서 및 개발 마일스톤 마크다운 규격 준수',
      policyPath: 'rules/documentation_standards.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [비즈니스 기획 및 문서화 표준 규칙]
- **구조화된 문서 양식**: 모든 기획서는 [1. 문제 정의], [2. 시장 기회], [3. 핵심 기능], [4. 수익 모델], [5. 개발 로드맵 표] 순서로 작성할 것.
- **정량적 지표 제시**: 단순 서술형 대신 표(Table), 불릿 포인트, 구체적인 수치(TAM/SAM/SOM, 전환율 목표)를 명시할 것.`,
    extraFile: {
      path: 'rules/documentation_standards.md',
      description: '사내 표준 비즈니스 기획서 및 기술 문서 작성 가이드',
      content: `# Documentation Standards
1. 모든 서비스 기획서는 문제 정의와 해결책을 첫 페이지에 요약한다.
2. 개발 로드맵은 월별 마일스톤과 담당 엔지니어링 항목을 표로 구조화한다.`
    }
  },
  {
    id: 'mod-chart-dashboard',
    name: '📈 엑셀·CSV 데이터 분석 & 실시간 인터랙티브 차트 대시보드',
    category: '데이터/시각화',
    badge: '차트 스킬',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    shortDesc: 'Recharts 기반 꺾은선/막대/도넛 차트, CSV 드래그 앤 드롭 파싱, 결측치 자동 정제 및 KPI 요약 카드',
    detailedImpact: {
      agentRuleSummary: 'Recharts ResponsiveContainer 반응형 차트 및 CSV 결측치 파싱 검증',
      skillPath: 'skills/chart-dashboard-scaffold/SKILL.md'
    },
    defaultSelected: false,
    agentRuleSection: `### [데이터 시각화 및 대시보드 규칙]
- **반응형 차트**: 모든 차트는 \`ResponsiveContainer\`로 감싸 화면 크기에 따라 너비와 높이가 유연하게 조절되도록 할 것.
- **CSV 결측치 정제**: 빈 행, 비정상적인 문자열 금액, 누락된 날짜 데이터를 사전에 걸러내는 파싱 유틸을 구현할 것.
- **KPI 요약 카드**: 대시보드 상단에 총매출, 건수, 평균 객단가 등 핵심 지표 카드를 눈에 띄게 배치할 것.`,
    skillFile: {
      path: 'skills/chart-dashboard-scaffold/SKILL.md',
      description: 'CSV 데이터 분석 및 인터랙티브 차트 대시보드 자동 생성 스킬',
      content: `---
name: chart-dashboard-scaffold
description: CSV 데이터 파싱 및 Recharts 기반 반응형 대시보드 자동 스캐폴딩
tools: [file_writer, shell]
---

# 차트 대시보드 자동 생성 워크플로우
1. CSV/JSON 데이터를 파싱하고 결측치를 정제하는 유틸 함수를 작성한다.
2. Recharts 꺾은선, 막대, 도넛 차트 컴포넌트를 반응형 그리드로 배치한다.
3. 마우스 호버 시 툴팁 및 KPI 카드 요약 통계를 렌더링한다.`
    }
  }
];

// 단일 템플릿 설정 파일 목록 (하위 호환성)
export const TEMPLATE_CONFIG_FILES: TemplateConfigFile[] = [
  {
    id: 'template-agents-md',
    filename: 'AGENTS.md',
    targetLocation: '프로젝트 루트 (`./AGENTS.md`)',
    supportedTools: 'Google Antigravity, Cursor, OpenAI Codex, Devin',
    badge: '자율 에이전트 통합 표준',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    description: '파일 수정, 터미널 실행, 에러 자동 수정을 수행하는 자율 코딩 에이전트의 마스터 행동 지침 및 권한 경계선 파일입니다.',
    whyNeeded: 'AI가 위험한 명령어(DB 삭제, 강제 푸시)를 멋대로 실행하는 것을 차단하고, 코딩 규칙을 한곳에서 중앙 제어합니다.',
    customizationTips: [
      '1. [1. 빌드 및 테스트 명령어] 섹션의 `npm run dev`, `npm test`를 본인 프로젝트의 실제 명령어로 바꾸세요.'
    ],
    rawContent: `# AGENTS.md - 프로젝트 마스터 지침 및 자율 에이전트 행동 규칙

## 1. 빌드 및 테스트 명령어 (Commands)
- 개발 서버 실행: \`npm run dev\`
- 빌드 검증: \`npm run build\`
- 단위 테스트 실행: \`npm test\`
- 린트 및 포맷팅: \`npm run lint\`

## 2. 에이전트 역할 및 권한 경계 (Role & Permissions)
- **기본 역할**: 사용자의 지시에 따라 프로젝트 파일 생성, 수정, 터미널 빌드/테스트를 자율 수행하는 시니어 엔지니어.
- **자율 실행 허용**: 소스코드 파일 편집, 패키지 설치(\`npm i\`), 빌드/테스트 실행(\`npm test\`, \`npm run build\`).
- **사용자 승인 필수**: 운영 DB 파괴 명령(\`DROP\`, \`DELETE FROM\` 전수), Git 강제 푸시(\`git push -f\`), 외부 유료 API 키 노출.

## 3. 계획 및 자가 치유 원칙 (Planning & Self-Healing)
- **계획 수립 (Planning)**: 3개 이상의 파일을 수정하는 복잡한 작업은 코드를 작성하기 전에 어떤 파일을 어떻게 바꿀지 먼저 요약 보고할 것.
- **자가 치유 (Self-Healing)**: 터미널 명령어 실행 중 에러가 발생하면 멈추지 말고, 에러 로그를 읽고 원인을 파악하여 스스로 1차 수정 시도할 것.`
  },
  {
    id: 'template-claude-md',
    filename: 'CLAUDE.md',
    targetLocation: '프로젝트 루트 (`./CLAUDE.md`)',
    supportedTools: 'Claude Code CLI, Claude Desktop',
    badge: '하이브리드 포인터 표준',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    description: 'AGENTS.md를 참조하게 하여 규칙을 1곳에서만 관리(Single Source of Truth)하는 포인터 파일입니다.',
    whyNeeded: '규칙을 바꿀 때 AGENTS.md 하나만 수정하면 클로드코드까지 자동으로 동일한 규칙을 따릅니다.',
    customizationTips: ['1. 프로젝트 루트에 AGENTS.md가 있어야 정상 동작합니다.'],
    rawContent: `# CLAUDE.md
@AGENTS.md
@DESIGN.md`
  },
  {
    id: 'template-mcp-json',
    filename: 'mcp.json',
    targetLocation: '프로젝트 루트 (`./mcp.json`)',
    supportedTools: 'Google Antigravity, Claude Code, Cursor',
    badge: '외부 도구 연동 표준',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    description: '로컬 DB, GitHub, 브라우저 스크린샷 연동 MCP 설정 파일입니다.',
    whyNeeded: 'AI가 외부 시스템과 안전하게 통신할 수 있게 연결합니다.',
    customizationTips: ['1. postgresql 연결 URL을 본인 DB 환경에 맞게 수정하세요.'],
    rawContent: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/my_database"]
    }
  }
}`
  },
  {
    id: 'template-design-md',
    filename: 'DESIGN.md',
    targetLocation: '프로젝트 루트 (`./DESIGN.md`)',
    supportedTools: 'Google Stitch, Figma Export, 모든 코딩 도구 공통',
    badge: '디자인 토큰 규격',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    description: '브랜드 컬러, 폰트, 여백 규격을 정의한 디자인 규격서입니다.',
    whyNeeded: 'AI가 CSS 오차 없이 정확한 디자인 시스템을 따릅니다.',
    customizationTips: ['1. 컬러 코드를 본인 서비스에 맞게 변경하세요.'],
    rawContent: `# DESIGN.md - 프로젝트 디자인 시스템 규격
- Primary: #3182F6 (Toss Blue)
- Background: #0F172A (Slate 900)`
  }
];

// 신규 프로젝트 생성 & 하위 룰 자동 생성 가이드
export const NEW_PROJECT_SCAFFOLD_GUIDE: NewProjectScaffoldGuide = {
  title: '신규 프로젝트 생성 & 하위 지침 파일(AGENTS.md / CLAUDE.md) 자동 생성 가이드',
  summary: 'ai_dev 루트 폴더 아래에 새 프로젝트 폴더(apps/ 또는 projects/)를 만들 때, 상위 글로벌 룰을 물려받으면서 해당 프로젝트 전용 하위 AGENTS.md / CLAUDE.md / DESIGN.md를 자동으로 세팅하는 방법입니다.',
  hierarchyDiagram: `ai_dev/                                 <-- [루트] 글로벌 공통 규칙, MCP 설정 & 스킬
├── AGENTS.md                           <-- 전사 공통 보안, 위험 명령 차단, 도메인 룰
├── CLAUDE.md                           <-- 글로벌 포인터 (@AGENTS.md)
├── DESIGN.md                           <-- 기본 디자인 토큰 규격
├── mcp.json                            <-- [MCP] PostgreSQL, GitHub, 브라우저 커넥터
├── .env.example                        <-- [환경변수] DB 접속 URL 및 API 키 템플릿
├── rules/                              <-- [사내 정책] 보안, 결제 멱등성 규칙
│   ├── security_policy.md
│   └── payment_policy.md
├── skills/                             <-- [스킬] Git PR 자동화, DB 마이그레이션 교본
│   ├── git-auto-pr/SKILL.md
│   └── db-migration-gen/SKILL.md
└── apps/ (또는 projects/)
    ├── STUDY/                          <-- [프로젝트 1: 현재 웹앱]
    │   ├── AGENTS.md (또는 CLAUDE.md)  <-- [하위 룰] React, Vite 빌드 커맨드
    │   ├── DESIGN.md                   <-- [하위 룰] 다크모드 토큰
    │   └── src/
    └── ecommerce-web/                  <-- [새로 생성할 신규 프로젝트 2]
        ├── AGENTS.md (또는 CLAUDE.md)  <-- [하위 룰] Next.js, Stripe 결제 커맨드
        ├── DESIGN.md                   <-- [하위 룰] 쇼핑몰 브랜드 컬러 토큰
        └── src/`,
  steps: [
    {
      stepNumber: 1,
      title: '1. 하위 프로젝트 폴더 생성',
      action: 'ai_dev/apps/ 또는 ai_dev/projects/ 아래에 새 프로젝트 폴더(예: my-new-app)를 생성합니다.',
      outputFile: 'ai_dev/apps/my-new-app/'
    },
    {
      stepNumber: 2,
      title: '2. 에이전트에 신규 프로젝트 초기화 프롬프트 전송',
      action: '터미널이나 에이전트 채팅창에 아래의 [신규 프로젝트 스캐폴딩 프롬프트]를 복사해서 붙여넣습니다.',
      outputFile: '에이전트 자율 생성 시작'
    },
    {
      stepNumber: 3,
      title: '3. 하위 전용 AGENTS.md & DESIGN.md 자동 생성',
      action: 'AI가 상위 ai_dev/AGENTS.md 규칙과 mcp/skills 설정을 상속받아, 새 프로젝트에 딱 맞는 빌드 명령어와 컴포넌트 맵을 담은 하위 AGENTS.md 및 DESIGN.md를 자동 생성합니다.',
      outputFile: 'ai_dev/apps/my-new-app/AGENTS.md, DESIGN.md'
    }
  ],
  copyableScaffoldPrompt: `[목표] ai_dev/apps/my-new-app 폴더에 신규 프로젝트를 초기화하고, 루트(ai_dev/AGENTS.md)를 상속하는 하위 전용 AGENTS.md와 DESIGN.md를 생성해줘.

[프로젝트 정보]
- 프로젝트명: my-new-app
- 기술 스택: React 18, TypeScript, Tailwind CSS, Vite, Zustand
- 주요 기능: 사용자 결제 및 대시보드 화면

[자동 생성할 하위 파일]
1. ./AGENTS.md:
   - 상위 루트 규칙(any 금지, 멱등성, 에러 자동 수정)을 상속
   - 이 프로젝트 전용 빌드 명령어(npm run dev, npm run build, npm test) 명시
   - src/components, src/types, src/services 디렉토리 맵 정의
2. ./DESIGN.md:
   - 메인 포인트 컬러(#3182F6), 다크 배경(#0F172A), 4px 그리드 여백 규격 명시
3. 프로젝트 기본 디렉토리 구조 스캐폴딩

[출력] 파일 생성을 완료하고 npm run build로 에러가 없는지 자가 검증해줘.`
};
