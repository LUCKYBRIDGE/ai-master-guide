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
  category: '프론트엔드/UI' | '교육/학습용' | '비즈니스/문서' | '데이터/시각화' | '백엔드/DB' | '보안/결제' | '협업/DevOps' | '데이터/자동화' | '게임/시뮬레이션' | 'AI챗봇/어시스턴트';
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
    practicalExample: '"로그인 기능 만들어줘"라고 요청하면 [기획 검토 ➔ 화면 제작 ➔ 빌드 테스트 ➔ 버그 수정 ➔ 완료 보고]를 알아서 진행',
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

// 2. 실무 작업 모듈 목록 (STEP 2: 중복 선택 체크박스 - 비전공자/실무자 모두 이해하기 쉬운 직관적 구성)
export const TASK_FEATURE_MODULES: TaskFeatureModule[] = [
  // --- [1] 프론트엔드 & 화면 디자인 ---
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

  // --- [2] 교육/학습용 & 비즈니스 문서 ---
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

  // --- [3] 백엔드 & 데이터베이스 ---
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
    defaultSelected: true,
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
    defaultSelected: true,
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

  // --- [4] 보안 & 결제 ---
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
    defaultSelected: true,
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

  // --- [5] 협업 & DevOps & 자동화 ---
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
  },

  // --- [6] 미니게임 & AI 챗봇 ---
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
