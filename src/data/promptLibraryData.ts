import { PromptTemplate } from '../types/ai';

export const PROMPT_LIBRARY_DATA: PromptTemplate[] = [
  {
    id: 'prompt-coding-master',
    title: '무결점 풀스택 기능 구현 & 자가 검증 프롬프트',
    category: '코딩 & 아키텍처',
    targetTool: 'Claude / Claude Code',
    description: 'Claude Opus 5 및 Claude Code 환경에서 타입 안정성, 에러 핸들링, 엣지 케이스, 단위 테스트까지 한 번에 완성하는 엔지니어링 프롬프트입니다.',
    difficulty: '고급 / 전문가',
    tags: ['Claude 5', 'TypeScript', 'React', 'Clean Code', 'Test-Driven'],
    verifiedDate: '2026.08',
    promptText: `[Role & Goal]
당신은 10년차 수석 풀스택 엔지니어이자 아키텍트입니다.
아래 명시된 [기능 요구사항]을 만족하는 프로덕션 레벨의 완전 자립형 코드를 작성하세요.

[Tech Stack]
- Frontend: React 18+ (TypeScript, Tailwind CSS, Lucide React)
- State Management: React Hooks (useReducer / Custom Hooks)
- Testing: Vitest / React Testing Library

[Requirements]
1. 기능 명세: {FEATURE_DESCRIPTION}
2. 비기능적 요구사항:
   - 엄격한 TypeScript 타입 선언 (any 사용 절대 금지)
   - 네트워크 지연, 빈 데이터(Empty State), 에러 발생 시 UI 피드백(Skeleton, Toast) 처리
   - 접근성(WAI-ARIA) 준수 및 모바일 반응형 완벽 대응
3. 자가 검증(Self-Verification):
   - 코드 작성 후 발생 가능한 3가지 엣지 케이스를 나열하고 이를 방어하는 로직을 코드 내 주석으로 표시할 것.

[Output Format]
- 1. 컴포넌트 아키텍처 및 상태 흐름 요약
- 2. 완전한 동작 코드 (생략 부분 없이 전체 작성)
- 3. 주요 엣지 케이스 검증 단위 테스트 코드`,
    parameters: [
      { key: 'FEATURE_DESCRIPTION', label: '구현할 기능 설명', defaultValue: '실시간 검색 필터와 정렬, 페이지네이션이 포함된 사용자 데이터 테이블 컴포넌트' }
    ],
    proTips: [
      'Claude Opus 5의 심층 추론 모드에서 사용 시 엣지 케이스 방어 로직의 품질이 비약적으로 상승합니다.',
      'Canvas나 Artifacts 창을 띄워놓고 실행하면 실시간으로 인터랙션을 테스트할 수 있습니다.'
    ]
  },

  {
    id: 'prompt-gemini-longcontext',
    title: '초대용량(100p+) 문서/논문/영상 심층 분석 & 구조화 프롬프트',
    category: '심층 리서치 & 분석',
    targetTool: 'Gemini / AGY',
    description: 'Gemini 3.7 Flash의 2M+ 롱 컨텍스트를 활용하여 방대한 백서, 계약서, 회의 녹취록에서 핵심 인사이트와 표를 추출합니다.',
    difficulty: '중급',
    tags: ['Long Context', 'Gemini 3.7', '논문 요약', '계약서 분석'],
    verifiedDate: '2026.08',
    promptText: `[Context: 첨부된 대용량 자료 전체]

[Task Directive]
제공된 전체 문서를 꼼꼼히 검토하고, 아래 4가지 관점에 따라 전문가 수준의 심층 브리핑 문서를 작성해 주세요. 
단순 개괄 요약이 아닌, 본문에 실제 등장하는 수치와 인용을 기반으로 엄밀하게 작성해야 합니다.

1. Executive Summary (핵심 요약)
   - 이 문서가 다루는 핵심 문제 정의 및 제안된 해결책 (3줄 요약)

2. 핵심 메커니즘 & 아키텍처 분석
   - 문서의 주요 방법론을 단계별 프로세스 또는 시스템 구조도로 설명
   - 각 구성 요소의 역할과 상호작용 매트릭스 표(Table) 작성

3. 정량적 성과 및 벤치마크 데이터
   - 본문에 언급된 주요 실험 결과, 수치, 퍼센트, 지표를 비교표로 정리 (원본 페이지/타임스탬프 표기)

4. 비판적 검토 및 한계점 (Critical Review)
   - 저자/문서가 인정하거나 잠재적으로 내포된 리스크 3가지와 실무 적용 시 고려사항

[Constraint]
- 추측이나 환각을 배제하고 오직 제공된 본문 데이터에 기반하여 답변할 것.`,
    proTips: [
      'Gemini 3.7 Flash에 자료를 먼저 업로드하고 맨 마지막에 이 프롬프트를 입력하면 정확도가 극대화됩니다.',
      '타임스탬프 또는 페이지 번호 표기를 요구하면 환각(Hallucination)이 완전히 배제됩니다.'
    ]
  },

  {
    id: 'prompt-grok-realtime',
    title: '실시간 글로벌 트렌드 & 소셜 여론 팩트체크 프롬프트',
    category: '심층 리서치 & 분석',
    targetTool: 'Grok / Grok Build',
    description: 'X(트위터) 실시간 데이터 피드와 Grok 4.6 DeepSearch를 결합하여 최신 이슈의 다양한 반응과 팩트를 교차 검증합니다.',
    difficulty: '초급',
    tags: ['Real-time', 'Grok 4.6', 'DeepSearch', '트렌드 분석'],
    verifiedDate: '2026.08',
    promptText: `[실시간 다각도 분석 지침]
주제: {TOPIC}

위 주제와 관련하여 최근 24~48시간 동안 X(트위터) 및 글로벌 테크 커뮤니티에서 발생한 실시간 논의를 Grok DeepSearch로 조사하고 다음 양식으로 브리핑해줘:

1. 팩트 요약 (Breaking Facts)
   - 공식 발표 내용, 주요 변경 사항, 핵심 릴리즈 노트

2. 커뮤니티 여론 및 반응 대조 (Sentiments)
   - 긍정적 평가 (개발자/사용자들이 가장 열광하는 부분)
   - 비판 및 우려 (버그, 가격 인상, 성능 저하 등 실제 이슈 제기)

3. 실제 유저 검증 사례 (Field Evidence)
   - 커뮤니티에 공유된 실제 벤치마크 스크린샷, 코드 예제, 사용 후기 요약

4. 결론 및 실무 시사점 (Actionable Insight)
   - 지금 당장 도입해야 할지, 지켜봐야 할지에 대한 실질적 권고`,
    parameters: [
      { key: 'TOPIC', label: '분석할 최신 테크/이슈 주제', defaultValue: '2026년 8월 최신 AI 모델 릴리즈 및 개발자 반응' }
    ],
    proTips: [
      'Grok 4.6에서 [DeepSearch]와 [Think] 모드를 둘 다 켜고 실행하면 훨씬 심도 깊은 분석을 얻을 수 있습니다.'
    ]
  },

  {
    id: 'prompt-prd-planner',
    title: '실리콘밸리 스타일 프로덕트 기획서(PRD) 자동 생성 프롬프트',
    category: '문서 작성 & 기획',
    targetTool: 'ChatGPT / Canvas',
    description: 'GPT-5의 심층 추론을 활용하여 아이디어 단계의 서비스를 개발팀과 비즈니스팀이 즉시 구현 가능한 완벽한 형태의 PRD 문서로 구조화합니다.',
    difficulty: '중급',
    tags: ['GPT-5', 'PRD', 'Product Manager', '기획서', 'User Story'],
    verifiedDate: '2026.08',
    promptText: `[Role] 
실리콘밸리 유니콘 스타트업의 수석 프로덕트 매니저(Principal PM)

[Task] 
제공된 [기능 아이디어]를 바탕으로, 엔지니어링팀과 디자인팀이 즉시 스프린트에 착수할 수 있는 상세 제품 기획서(PRD)를 작성해주세요.

[Feature Idea]
{PRODUCT_IDEA}

[PRD Structure Requirements]
1. Problem Statement & Why Now (왜 이 기능이 지금 필요한가?)
2. Target Persona & User Journey (타겟 사용자의 핵심 Pain Point)
3. Goals & Non-Goals (이번 버전의 범위와 범위 밖인 것 명확히 분리)
4. User Stories & Acceptance Criteria (Gherkin 문법 Given-When-Then 적용)
5. UI/UX Wireframe Concept & Key Interactions
6. Technical Considerations (데이터 모델, API 엔드포인트 초안, 보안)
7. Success Metrics & North Star Metric (KPI, 가드레일 지표)
8. Rollout Strategy & Phased Plan (Phase 1 MVP -> Phase 2 고도화)`,
    parameters: [
      { key: 'PRODUCT_IDEA', label: '서비스/기능 아이디어', defaultValue: '사내 슬랙 채널의 모든 질문과 답변을 자동 학습하여 즉시 답변해주는 AI 지식베이스 봇' }
    ],
    proTips: [
      'ChatGPT Canvas 모드에서 열어두고 슬라이더로 길이나 독자 수준을 조절하며 다듬으면 최상입니다.'
    ]
  },

  {
    id: 'prompt-claude-md-config',
    title: 'CLI 에이전트용 완벽한 프로젝트 규칙(CLAUDE.md / Rules) 템플릿',
    category: '에이전트 시스템 프롬프트',
    targetTool: 'Claude / Claude Code',
    description: 'Claude Code 또는 Antigravity CLI가 프로젝트의 컨벤션을 완벽히 이해하고 실수 없이 개발하도록 돕는 마크다운 설정 템플릿입니다.',
    difficulty: '고급 / 전문가',
    tags: ['CLAUDE.md', 'Agent Rules', 'CLI Config', 'Antigravity'],
    verifiedDate: '2026.08',
    promptText: `# Project Overview & Engineering Standards

## 1. Project Tech Stack
- Frontend: React 18 (TypeScript), Tailwind CSS, Lucide React
- Build Tool: Vite
- Package Manager: npm / pnpm

## 2. Core Commands
- Development: \`npm run dev\` (Runs on http://localhost:3000)
- Production Build: \`npm run build\`
- Linting: \`npm run lint\`
- Testing: \`npm run test\`

## 3. Code Architecture & Guidelines
- All UI components must reside in \`src/components/\`.
- State logic must be extracted into custom hooks or pure helper functions in \`src/utils/\`.
- Always prefer functional components with strict TypeScript types (never use \`any\`).
- Use Tailwind CSS utility classes; avoid inline styles.

## 4. Agent Behavior & Guardrails
- **Self-Verification**: After making code changes, ALWAYS run the build or test command to ensure zero regressions.
- **Atomic Commits**: Group related changes together with clear semantic commit messages (e.g. \`feat:\`, \`fix:\`, \`refactor:\`).
- **No Destructive Overwrites**: Do not delete existing comments or refactor unrelated modules unless explicitly requested.`,
    proTips: [
      '이 내용을 프로젝트 최상위 루트에 `CLAUDE.md` 파일로 저장해두면 Claude Code가 실행 시 자동으로 로드합니다.',
      'Google Antigravity의 경우 `.gemini/rules`에 동일한 규칙을 적용할 수 있습니다.'
    ]
  },

  {
    id: 'prompt-data-analyst',
    title: '데이터셋(CSV/Excel) 자동 인사이트 도출 및 시각화 코드 프롬프트',
    category: '데이터 분석 & 시각화',
    targetTool: 'ChatGPT / Canvas',
    description: '수치 데이터셋을 업로드한 후 탐색적 데이터 분석(EDA), 통계적 가설 검정, 시각화 차트 파이썬 코드를 자동 생성합니다.',
    difficulty: '중급',
    tags: ['Python', 'Pandas', 'EDA', 'Data Visualization'],
    verifiedDate: '2026.08',
    promptText: `[Role: Senior Data Scientist & Business Analyst]

업로드된 데이터셋에 대해 다음 4단계에 걸쳐 전문적인 탐색적 데이터 분석(EDA)을 수행하고 비즈니스 인사이트를 도출해줘:

1. 데이터 무결성 점검 (Data Health Check)
   - 결측치(Missing Values), 이상치(Outliers), 데이터 타입 불일치 여부 진단

2. 기술 통계 및 핵심 분포 분석
   - 주요 수치형 변수의 평균, 중앙값, 왜도, 주요 범주형 변수의 비율 요약

3. 상관관계 및 숨겨진 패턴 발굴
   - 변수 간 상관계수 상위 조합 도출 및 유의미한 비즈니스적 인과관계 해석

4. 시각화 대시보드 Python 코드 제공
   - Seaborn / Matplotlib 기반의 고품질 차트 (히트맵, 박스플롯, 시계열 추이선) 작성
   - 한국어 폰트 깨짐 방지 설정 및 다크 테마 팔레트 적용`,
    proTips: [
      'ChatGPT Canvas(Python 코드 인터프리터) 기능과 결합하면 차트 이미지를 즉시 렌더링받을 수 있습니다.'
    ]
  }
];
