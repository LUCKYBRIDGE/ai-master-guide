import { AITool } from '../types/ai';

export const AI_TOOLS_DATA: AITool[] = [
  // =========================================================================
  // 1. OpenAI Family (GPT-5.6 Sol · Terra · Luna · Codex · Deep Research)
  // =========================================================================
  {
    id: 'gpt-5-6-sol',
    name: 'GPT-5.6 Sol',
    subName: 'Flagship Deep Reasoning & Math SOTA (OpenAI)',
    company: 'openai',
    companyName: 'OpenAI',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    borderHover: 'hover:border-emerald-500/50',
    category: 'General',
    version: 'GPT-5.6 Sol (2026.08 Flagship)',
    verifiedDate: '2026.08',
    tagline: 'AIME 96.7% 수학 올림피아드 1위, 고난도 시스템 아키텍처 및 자체 검증 최강 플래그십',
    overview: 'OpenAI의 2026년 정식 플래그십 최고봉 모델입니다. 극단적인 다단계 수학/과학/시스템 엔지니어링 문제를 위해 수십 번의 자체 반례 검증(Self-Consistency)을 거치며, 복잡한 비즈니스 로직과 시스템 설계에서 무결점의 신뢰도를 제공합니다.',
    strengths: [
      'AIME 2026 수학 올림피아드 96.7% 만점급 추론 및 GPQA Diamond 94.9%',
      '자체 반례 검증(Self-Consistency)을 통한 환각 및 논리적 오류 99% 차단',
      'Advanced Voice 및 실시간 비전 센서 연동 완성형 멀티모달',
      'Canvas 실시간 분할 편집기 및 엔터프라이즈 워크스페이스 직결'
    ],
    limitations: [
      '토큰당 단가(입력 $15.00 / 출력 $60.00 per 1M)가 높으므로 단순 질의나 대량 배치 작업에는 Terra/Luna 권장'
    ],
    bestFor: [
      '최고 난도의 금융 퀀트 알고리즘, 암호학 수식 증명 및 물리 시뮬레이션',
      '엔터프라이즈 클라우드 인프라 아키텍처 의사결정 및 장애 방어 설계',
      '100만 건 DB 슬로우 쿼리 튜닝 및 무중단 마이그레이션 DDL 작성'
    ],
    keyFeatures: [
      { title: 'Sol Deep Reasoning Engine', desc: '다단계 인과 추론 및 자체 검산 루프를 통한 최고 신뢰도 도출' },
      { title: 'Canvas Integration', desc: '코드 및 문서를 분할 화면에서 줄 단위로 실시간 인라인 편집' },
      { title: 'Advanced Voice Engine', desc: '화자의 감정, 억양, 호흡을 완벽하게 재현하는 양방향 음성 대화' }
    ],
    pricing: {
      freeTier: '제공 안 됨 (Plus/Pro/Team 및 API 전용)',
      paidTier: 'ChatGPT Plus ($20/월 - 일일 한도), Pro ($200/월 - 무제한)',
      apiPricing: 'Input $15.00 / Output $60.00 per 1M tokens'
    },
    promptTips: {
      title: 'GPT-5.6 Sol 심층 추론 프롬프팅 팁',
      dos: [
        '고난도 엔지니어링 문제 시 "Sol 엔진으로 잠재적 엣지 케이스 3가지를 자체 검증한 후 답변해줘"라고 명시하세요.'
      ],
      donts: [
        '단순 오타 수정이나 단답형 질문에는 가벼운 Terra나 Luna를 사용하세요.'
      ],
      examplePrompt: `[목표] 분산 트랜잭션 2PC(Two-Phase Commit)의 네트워크 파티션 장애 시나리오 분석 및 SAGA 패턴 전환 설계도 작성`
    },
    recommendedWorkflow: [
      '1. GPT-5.6 Sol로 핵심 아키텍처 및 상태 머신(FSM) 검증',
      '2. Canvas 분할 창에서 코드 인라인 수정 및 버전 관리'
    ],
    officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
  },
  {
    id: 'gpt-5-6-terra',
    name: 'GPT-5.6 Terra',
    subName: 'Balanced Workhorse Engine (OpenAI)',
    company: 'openai',
    companyName: 'OpenAI',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    borderHover: 'hover:border-emerald-500/50',
    category: 'General',
    version: 'GPT-5.6 Terra (2026.08 Standard)',
    verifiedDate: '2026.08',
    tagline: 'Sol 대비 40% 비용으로 실무 프로덕션 코딩과 비즈니스 문서를 완벽 커버하는 표준 워크호스',
    overview: 'OpenAI의 표준 실무 워크호스 모델입니다. Sol의 고성능 지능을 40% 비용으로 제공하여 일상적인 웹/앱 개발, API 연동, 기획서 작성, 데이터 시각화 작업을 빠르고 경제적으로 처리합니다.',
    strengths: [
      'SWE-bench 89.7% 및 LiveCodeBench 84.8%의 견고한 실무 코딩력',
      'Sol 대비 60% 빠른 응답 속도 및 40% 저렴한 토큰 비용',
      'ChatGPT Plus/Team 기본 제공으로 넉넉한 일일 사용량 보장'
    ],
    limitations: [
      'AIME 만점급 극단적 난제는 Sol 대비 약간의 정밀도 차이 존재'
    ],
    bestFor: [
      'React/Next.js/Node.js 실무 프로덕션 컴포넌트 및 API 구현',
      '비즈니스 요구사항 정의서(PRD) 및 기술 문서 작성',
      'SQL 쿼리 작성 및 일상 데이터 분석'
    ],
    keyFeatures: [
      { title: 'Balanced Compute', desc: '속도와 지능의 황금 균형으로 대부분의 개발 작업 최적화' },
      { title: 'Fast Generation', desc: '낮은 지연 시간으로 즉각적인 피드백 제공' }
    ],
    pricing: {
      freeTier: 'Plus 체험 지원',
      paidTier: 'ChatGPT Plus ($20/월 - 기본 디폴트 모델)',
      apiPricing: 'Input $1.50 / Output $6.00 per 1M tokens'
    },
    promptTips: {
      title: 'GPT-5.6 Terra 실무 프롬프팅 팁',
      dos: ['구체적인 기술 스택과 요구사항을 명시하여 직통 코드를 생성하세요.'],
      donts: ['군더더기 설명 없이 코드 블록 위주로 요청하면 더 빠릅니다.'],
      examplePrompt: `TypeScript + Tailwind CSS로 다크모드가 지원되는 모달 팝업 컴포넌트를 작성해줘.`
    },
    recommendedWorkflow: [
      '1. Terra로 일상 기능 구현 및 컴포넌트 개발',
      '2. 복잡한 시스템 난제 발생 시에만 Sol로 전환'
    ],
    officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
  },
  {
    id: 'gpt-5-6-luna',
    name: 'GPT-5.6 Luna',
    subName: 'Lightweight & Ultra-Fast (OpenAI)',
    company: 'openai',
    companyName: 'OpenAI',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    borderHover: 'hover:border-emerald-500/50',
    category: 'General',
    version: 'GPT-5.6 Luna (2026.08 Light)',
    verifiedDate: '2026.08',
    tagline: 'Sol 대비 1/25 초저비용 & 0.5초 저지연 응답의 초경량 고속 모델',
    overview: 'OpenAI의 초경량 고속 모델로, 비용 민감한 대규모 배치 데이터 전처리, 실시간 챗봇, 단순 번역 및 오타 교정 작업에 최적화되어 있습니다.',
    strengths: [
      'Sol 대비 1/25, Terra 대비 1/10의 파격적인 초저비용 ($0.60/1M)',
      '0.5~1초 내외의 경이로운 저지연 실시간 응답',
      'ChatGPT 무료 사용자에게도 넉넉하게 제공'
    ],
    limitations: [
      '복잡한 다단계 추론이나 대형 레포지토리 버그 수정은 불가'
    ],
    bestFor: [
      '수만 건의 텍스트 분류, 감성 분석, 키워드 추출',
      '실시간 고객센터 1차 응대 챗봇',
      '단순 문법 교정 및 다국어 기본 번역'
    ],
    keyFeatures: [
      { title: 'Sub-second Latency', desc: '초고속 실시간 응답으로 사용자 대기 시간 제로화' },
      { title: 'Extreme Cost-Efficiency', desc: '백만 토큰당 $0.60 수준의 최저가 요율' }
    ],
    pricing: {
      freeTier: 'ChatGPT 웹/앱 무제한 무료 이용',
      paidTier: '모든 유료 플랜 기본 포함',
      apiPricing: 'Input $0.15 / Output $0.60 per 1M tokens'
    },
    promptTips: {
      title: 'GPT-5.6 Luna 대량 처리 팁',
      dos: ['입력 데이터와 원하는 JSON 출력 스키마를 명확히 제시하세요.'],
      donts: ['장황한 배경 설명보다는 핵심 분류 기준만 제공하세요.'],
      examplePrompt: `다음 리뷰 10개를 긍정/부정으로 분류하고 JSON 배열로 출력해줘.`
    },
    recommendedWorkflow: ['1. 대량 데이터 전처리 파이프라인에 Luna 배치 연동'],
    officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
  },
  {
    id: 'openai-deep-research-tool',
    name: 'OpenAI Deep Research',
    subName: 'Autonomous Web Research Agent (OpenAI)',
    company: 'openai',
    companyName: 'OpenAI',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    borderHover: 'hover:border-emerald-500/50',
    category: 'Research',
    version: 'Deep Research 2.0 (2026.08)',
    verifiedDate: '2026.08',
    tagline: '수십 개 웹 소스를 자율 탐색하여 전문가 수준의 20페이지 심층 백서 자동 작성',
    overview: 'OpenAI의 자율형 웹 리서치 전문 에이전트입니다. 사용자의 복잡한 조사 질문을 받으면 스스로 탐색 계획을 수립하고 수십 개의 글로벌 웹페이지, 학술 논문, 공식 백서를 크롤링하여 완벽한 출처 각주가 포함된 종합 분석 리포트를 작성합니다.',
    strengths: [
      '40~50개 이상의 글로벌 웹 소스를 자율적으로 검색하고 교차 검증',
      '각 주장마다 클릭 가능한 원문 출처 각주 완벽 탑재',
      '수십 페이지 분량의 체계적인 기술 백서 및 시장 분석 리포트 완성'
    ],
    limitations: [
      '조사 완료까지 수 분~수십 분이 소요되는 비동기 작업'
    ],
    bestFor: [
      '차세대 AI 반도체 칩셋 및 클라우드 기술 심층 비교 백서 작성',
      '특정 산업군의 글로벌 규제 변화 및 경쟁사 동향 분석',
      '투자 심사 및 신규 사업 타당성 검토 리포트'
    ],
    keyFeatures: [
      { title: 'Autonomous Multi-step Browsing', desc: '검색 쿼리를 스스로 확장하며 심층 정보 수집' },
      { title: 'Citation Grounding', desc: '모든 사실과 수치에 정확한 원문 웹 링크 각주 첨부' }
    ],
    pricing: {
      freeTier: '제공 안 됨',
      paidTier: 'ChatGPT Pro ($200/월) 무제한 / Plus 월 10~20회 한도',
      apiPricing: 'Agentic Usage 기반 과금'
    },
    promptTips: {
      title: 'Deep Research 프롬프팅 팁',
      dos: ['조사할 대상의 비교 기준(스펙, 가격, 출시일)을 구체적으로 나열하세요.'],
      donts: ['단순 단문 질문에는 일반 SearchGPT를 쓰세요.'],
      examplePrompt: `Nvidia Blackwell(GB200), Google TPU v6, AWS Trainium 3의 HBM3e 대역폭, FP8 TFLOPS, 인터커넥트 토폴로지를 비교분석하는 15페이지 심층 백서를 작성해줘.`
    },
    recommendedWorkflow: ['1. Deep Research로 심층 백서 초안 작성 -> 2. Word/PDF 내보내기'],
    officialDocsUrl: 'https://openai.com/index/introducing-deep-research/'
  },

  // =========================================================================
  // 2. Anthropic Claude 5 Family (Fable 5 · Opus 5 · Sonnet 5 · Haiku · Code)
  // =========================================================================
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    subName: 'Ultra-Thinking & Literature / Academic SOTA (Anthropic)',
    company: 'anthropic',
    companyName: 'Anthropic',
    badgeColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    borderHover: 'hover:border-purple-500/50',
    category: 'Research',
    version: 'Claude Fable 5 (2026.08 Ultra-Flagship)',
    verifiedDate: '2026.08',
    tagline: '인류 최후 시험(HLE 66.2%) 및 GPQA 박사 과학 1위, Anthropic 최고난도 심층 추론 플래그십',
    overview: 'Anthropic이 극단적인 심층 추론, 박사급 학술 연구, 초장문 문학/논문 집필 및 복합 다학제 인과 분석을 위해 특별히 훈련시킨 최상위 울트라 플래그십 모델입니다. HLE(Humanity\'s Last Exam) 66.2%와 GPQA Diamond 96.4%로 전 세계 1위를 기록하며, 인간 최고 전문가 수준의 통찰을 제공합니다.',
    strengths: [
      '인류 최후 시험(HLE 66.2%) 및 GPQA Diamond(96.4%) 공식 벤치마크 전 세계 1위',
      '수백 페이지 분량의 학술 논문, 특허, 법률 문서의 인과관계 초정밀 분석',
      '독보적인 문학적 완성도와 비유, 철학적 사유를 담아내는 산문 작성 능력',
      'Extended Thinking 무제한 CoT를 통한 수학 및 과학적 가설 자체 반증 루프'
    ],
    limitations: [
      '단순 UI/UX 프론트엔드 변환에 최적화되어 대규모 레포지토리 리팩토링에는 Opus 5 권장'
    ],
    bestFor: [
      'Figma/와이어프레임 시안의 정밀한 React Tailwind 컴포넌트 변환',
      '인터랙티브 웹앱 애니메이션 및 프론트엔드 UI/UX 디자인',
      '가성비 높은 일상 프론트엔드 개발'
    ],
    keyFeatures: [
      { title: 'Vision-to-Code 92.4%', desc: '디자인 시안을 픽셀 단위로 분석하여 React 컴포넌트로 직결' },
      { title: 'UI Animation Engine', desc: 'Framer Motion 및 Tailwind 애니메이션 최적화 코드 생성' },
      { title: 'Cost-Effective Front', desc: '100만 토큰당 $1.00/$5.00의 경제적인 가성비' }
    ],
    pricing: {
      freeTier: '제공 안 됨',
      paidTier: 'Claude Pro / Team / Max 플랜 전용',
      apiPricing: 'Input $1.00 / Output $5.00 per 1M tokens'
    },
    promptTips: {
      title: 'Claude Fable 5 심층 연구 팁',
      dos: ['상반된 두 학설의 인과관계를 비교 비판하고 통합 가설을 도출하도록 요청하세요.'],
      donts: ['단순 프론트엔드 버튼 스타일링에는 Sonnet을 쓰세요.'],
      examplePrompt: `양자 컴퓨팅에서의 위상 양자 오류 정정(Topological QEC) 한계와 최근 실험 결과들의 반증 가능성을 분석해줘.`
    },
    recommendedWorkflow: ['1. 논문 PDF 주입 -> 2. Extended Thinking 모드로 학술 백서 작성'],
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison-table'
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    subName: 'Enterprise Coding SOTA & System Architecture (Anthropic)',
    company: 'anthropic',
    companyName: 'Anthropic',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    borderHover: 'hover:border-amber-500/50',
    category: 'Coding',
    version: 'Claude Opus 5 (2026.08 SOTA)',
    verifiedDate: '2026.08',
    tagline: 'SWE-bench 96.8% 실전 코딩 SOTA 1위, 엔터프라이즈 에이전틱 개발의 정점',
    overview: 'Anthropic의 주력 플래그십 코딩 AI 모델입니다. SWE-bench Verified 96.8%로 전 세계 1위를 기록하고 있으며, 다중 파일 소프트웨어 아키텍처 설계, 비동기 버그 수정, 인터랙티브 Artifacts UI 렌더링에서 독보적인 완성도를 자랑합니다.',
    strengths: [
      'SWE-bench Verified 96.8% 공식 1위의 압도적인 실전 코딩 및 자율 디버깅 능력',
      'Artifacts 전용 창을 통한 React 컴포넌트, SVG, HTML, 다이어그램 실시간 렌더링',
      'Projects 지식 베이스 및 Prompt Caching(최대 90% 비용 절감) 완벽 지원',
      '개발자 친화적인 XML 태그 프롬프트 파싱 및 정밀한 지침 준수력'
    ],
    limitations: [
      '무료 티어는 사용량 제한이 있으므로 헤비 개발자는 Pro/Team 플랜 권장'
    ],
    bestFor: [
      '엔터프라이즈 레벨의 복잡한 소프트웨어 아키텍처 설계 및 대규모 리팩토링',
      '프론트엔드 인터랙티브 UI 컴포넌트 개발 및 데이터 시각화',
      '복합 비동기 동시성(Concurrency) 버그 및 메모리 누수 해결'
    ],
    keyFeatures: [
      { title: 'SWE-bench 96.8% 1위', desc: '실제 GitHub 이슈를 스스로 분석하고 단위 테스트를 통과시키는 자율 코딩력' },
      { title: 'Interactive Artifacts', desc: '코드, UI 컴포넌트, 다이어그램을 별도 창에서 즉시 렌더링' },
      { title: 'Prompt Caching', desc: '대규모 코드베이스 주입 시 90% 비용 절감 및 속도 향상' }
    ],
    pricing: {
      freeTier: '제공 안 됨',
      paidTier: 'Claude Pro ($20/월 - Opus 5 우선 접속, Thinking 모드)',
      apiPricing: 'Input $5.00 / Output $25.00 per 1M tokens'
    },
    promptTips: {
      title: 'Claude Opus 5 코딩 팁',
      dos: ['XML 태그(`<context>`, `<instructions>`)로 프롬프트를 명확히 분리하세요.'],
      donts: ['단순 단문 질문에는 무거운 Opus 대신 Sonnet을 사용하세요.'],
      examplePrompt: `<task>React + Tailwind 기반 실시간 트레이딩 대시보드 단일 파일 Artifact 작성</task>`
    },
    recommendedWorkflow: ['1. Project 지식베이스 생성 -> 2. Thinking 모드로 아키텍처 설계 -> 3. Artifacts 검증'],
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison-table'
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    subName: 'Balanced High-Throughput Workhorse (Anthropic)',
    company: 'anthropic',
    companyName: 'Anthropic',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    borderHover: 'hover:border-amber-500/50',
    category: 'General',
    version: 'Claude Sonnet 5 (2026.08)',
    verifiedDate: '2026.08',
    tagline: 'Opus급 지능을 1/2.5 비용과 빠른 속도로 제공하는 Anthropic 표준 워크호스',
    overview: 'Anthropic의 메인 워크호스 모델로, 탁월한 코딩 능력(SWE-bench 92.5%)과 빠른 처리 속도, 합리적인 비용을 겸비하여 개발자들의 일상 코딩과 비즈니스 업무를 전천후로 지원합니다.',
    strengths: [
      'SWE-bench 92.5% 및 LiveCodeBench 85.2%의 강력한 코딩력',
      'Opus 5 대비 2.5배 빠른 생성 속도 및 저렴한 토큰 비용',
      'Claude 무료 사용자 및 Pro 사용자에게 가장 넉넉한 쿼리 한도 제공'
    ],
    limitations: ['초고난도 다학제 학술 논제는 Fable 5나 Opus 5 대비 단순할 수 있음'],
    bestFor: [
      '일상 웹/앱 풀스택 개발, 컴포넌트 생성, 단위 테스트 작성',
      '비즈니스 문서 작성, 메일 초안, 번역 및 요약',
      '대화형 챗봇 및 데이터 파싱'
    ],
    keyFeatures: [
      { title: 'High-Throughput Generation', desc: '초당 수십 토큰의 빠른 속도로 개발 대기 시간 단축' },
      { title: 'Prompt Caching Ready', desc: '문서/코드 재사용 시 최대 90% 비용 절감' }
    ],
    pricing: {
      freeTier: 'Claude 웹/앱 기본 무료 이용',
      paidTier: 'Claude Pro ($20/월 - 넉넉한 사용량)',
      apiPricing: 'Input $2.00 / Output $10.00 per 1M tokens'
    },
    promptTips: {
      title: 'Claude Sonnet 5 실무 팁',
      dos: ['컴포넌트 단위의 빠른 프로토타이핑에 적극 활용하세요.'],
      donts: ['아키텍처 전체를 한 번에 엎을 때는 Opus 5를 추천합니다.'],
      examplePrompt: `React 18과 Tailwind CSS로 반응형 로그인 폼을 작성해줘.`
    },
    recommendedWorkflow: ['1. 일상 작업은 Sonnet 5로 빠르게 완결'],
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison-table'
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    subName: 'Lightweight & Real-Time API (Anthropic)',
    company: 'anthropic',
    companyName: 'Anthropic',
    badgeColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    borderHover: 'hover:border-amber-500/50',
    category: 'General',
    version: 'Claude Haiku 4.5 (2026.08 Light)',
    verifiedDate: '2026.08',
    tagline: '초저지연 실시간 응답과 가성비 파이프라인을 위한 경량 모델',
    overview: 'Anthropic의 초경량 고속 모델로, 실시간 대화형 서비스, 고객 지원 봇, 대규모 텍스트 분류 및 라우팅 파이프라인에 최적화되어 있습니다.',
    strengths: [
      '밀리초(ms) 단위의 초고속 지연시간',
      '경량 모델임에도 정교한 JSON 포맷 출력 및 린트 검증 수행',
      'API 대량 배치 호출 시 비용 최적화'
    ],
    limitations: ['복잡한 동시성 버그 수정 불가'],
    bestFor: ['실시간 텍스트 라우팅, 간단한 데이터 추출, FAQ 챗봇'],
    keyFeatures: [
      { title: 'Sub-second Latency', desc: '초고속 응답' },
      { title: 'Cost Optimized', desc: '초저비용 API 요율' }
    ],
    pricing: {
      freeTier: '무료 티어 지원',
      paidTier: 'Claude 플랜 포함',
      apiPricing: 'Input $1.00 / Output $5.00 per 1M tokens'
    },
    promptTips: {
      title: 'Haiku 활용 팁',
      dos: ['JSON 출력을 명확히 지정하여 백엔드 파이프라인에 직결하세요.'],
      donts: ['복잡한 아키텍처 설계를 요구하지 마세요.'],
      examplePrompt: `다음 고객 문의를 카테고리(결제, 배송, 환불)로 분류해줘.`
    },
    recommendedWorkflow: ['1. 백엔드 라우터 및 데이터 분류에 연동'],
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models#model-comparison-table'
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    subName: 'Terminal-based Agentic Coding CLI (Anthropic)',
    company: 'anthropic',
    companyName: 'Anthropic',
    badgeColor: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 border-orange-500/30',
    borderHover: 'hover:border-orange-500/50',
    category: 'Agent',
    version: 'Claude Code CLI (Claude 5 Integration)',
    verifiedDate: '2026.08',
    tagline: '터미널에서 직접 파일 수정, Git 커밋, 테스트 실행을 수행하는 개발자용 CLI 에이전트',
    overview: '개발자의 터미널 환경에서 직접 실행되는 Anthropic의 에이전틱 코딩 도구입니다. Claude 5 모델들을 탑재하여 전체 코드베이스를 검색하고, 파일을 직접 편집하며, 터미널 명령어를 실행하고, Git 워크플로우(커밋, PR 작성)까지 자연어로 완벽하게 수행합니다.',
    strengths: [
      '터미널 내에서 빠르고 직관적인 자연어 명령으로 전체 레포지토리 제어',
      'CLAUDE.md 파일을 통한 프로젝트별 커맨드/아키텍처 컨텍스트 완벽 인지',
      '`/init`, `/compact`, `/cost` 등 실용적인 터미널 슬래시 커맨드 생태계',
      '린트/테스트 에러 발생 시 스스로 터미널 출력을 읽고 자동 수정(Self-debugging)'
    ],
    limitations: ['Anthropic API 키 또는 Claude Pro/Team 계정 연동 필요'],
    bestFor: [
      '터미널 중심의 실전 소프트웨어 엔지니어링 및 빠른 버그 픽스',
      '프로젝트 전체 리팩토링, 레거시 마이그레이션, 의존성 업그레이드',
      'Git 커밋 메시지 자동 생성, 브랜치 작업, Pull Request 초안 작성'
    ],
    keyFeatures: [
      { title: 'Direct File Editing', desc: 'ripgrep 및 fd 기반으로 파일 직접 검색 및 인라인 수정' },
      { title: 'CLAUDE.md Memory', desc: '빌드 명령어, 테스트 규칙을 영구 학습' },
      { title: 'Self-Healing Test Runner', desc: '`npm test` 실패 시 오류 스택을 읽고 자가 수정' }
    ],
    pricing: {
      freeTier: '도구 자체 오픈/무료 설치 (npm)',
      paidTier: 'Anthropic API 토큰 사용량에 따라 과금',
      apiPricing: 'Claude 5 토큰 요율'
    },
    promptTips: {
      title: 'Claude Code CLI 활용 팁',
      dos: ['작업 전 `/compact`를 실행하여 컨텍스트 비용을 절약하세요.'],
      donts: ['테스트 코드가 없는 상태에서 대규모 리팩토링을 맡기지 마세요.'],
      examplePrompt: `claude "JWT 만료 처리 로직을 Refresh Token 회전 방식으로 리팩토링하고 Jest 테스트를 통과시켜줘"`
    },
    recommendedWorkflow: ['1. `claude` 실행 -> 2. 자연어 버그 수정 지시 -> 3. 자동 커밋 및 PR'],
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#core-features'
  },

  // =========================================================================
  // 3. Google DeepMind Family (Gemini 3.7 Flash · 3.1 Pro · Antigravity)
  // =========================================================================
  {
    id: 'gemini-3-7-flash',
    name: 'Gemini 3.7 Flash',
    subName: '2M+ Long-Context & High-Throughput SOTA (Google)',
    company: 'google',
    companyName: 'Google',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    borderHover: 'hover:border-blue-500/50',
    category: 'General',
    version: 'Gemini 3.7 Flash (2026.08 SOTA)',
    verifiedDate: '2026.08',
    tagline: '200만 토큰 롱컨텍스트 & 네이티브 오디오/비디오 멀티모달 최강 가성비 챔피언',
    overview: 'Google DeepMind의 최신 주력 플래그십 모델입니다. 2026년 8월 출시된 Gemini 3.7 Flash는 초고속 응답 속도와 탁월한 코딩 성능(SWE-bench 91.8%)을 자랑하며, 200만 토큰(2M+) 이상의 초대형 컨텍스트 윈도우를 통해 대용량 코드베이스, 수시간 분량의 동영상, 방대한 PDF 문서를 한 번에 누락 없이 분석합니다.',
    strengths: [
      '2026년 8월 출시된 최신 Gemini 3.7 Flash의 압도적인 코딩 쓰루풋 및 저지연 응답',
      '2M+ 토큰의 독보적 컨텍스트 윈도우 (책 30권 분량, 1시간+ 고화질 영상 통째 분석)',
      '동영상, 음성, 텍스트, 이미지를 동일한 신경망에서 처리하는 네이티브 멀티모달',
      'Google Workspace(Drive, Gmail, Docs), YouTube, Google Search 실시간 연동'
    ],
    limitations: ['초대용량 문서 입력 시 구체적 질문을 프롬프트 후반부에 배치 권장'],
    bestFor: [
      '수백 페이지에 달하는 금융/의료/기술 백서 및 계약서 일괄 교차 분석',
      '1시간 이상의 회의 녹화 영상 또는 음성 파일을 타임스탬프와 함께 정밀 요약',
      '초대형 레포지토리의 아키텍처 파악 및 레거시 코드 전체 마이그레이션'
    ],
    keyFeatures: [
      { title: 'Gemini 3.7 Flash Engine', desc: '코딩 및 에이전틱 워크플로우에 특화된 2026.08 최신 모델' },
      { title: '2M+ Token Context', desc: '프로젝트 소스코드 전체나 대용량 문서를 한 번에 주입' },
      { title: 'Native Audio/Video', desc: '동영상과 음성 파일에서 타임스탬프를 초단위 정밀 추출' }
    ],
    pricing: {
      freeTier: 'Gemini 웹/앱 기본 무료 지원',
      paidTier: 'Gemini Advanced ($19.99/월 - 2TB 클라우드 포함)',
      apiPricing: 'Input $0.10 / Output $0.40 per 1M tokens (초가성비)'
    },
    promptTips: {
      title: 'Gemini 3.7 롱 컨텍스트 팁',
      dos: ['대용량 자료를 먼저 넣고, 맨 마지막에 구체적인 질문/지침을 배치하세요.'],
      donts: ['방대한 문서를 넣고 단순 "요약해줘"라고만 하지 마세요.'],
      examplePrompt: `첨부된 200페이지 표준 규격서를 분석하여 핵심 프로토콜 5가지를 비교표로 정리해줘.`
    },
    recommendedWorkflow: ['1. 대용량 PDF/영상 통째 업로드 -> 2. Gemini 3.7 Flash로 구조 파악 및 분석'],
    officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini#gemini-3.7-flash'
  },
  {
    id: 'gemini-3-1-pro',
    name: 'Gemini 3.1 Pro',
    subName: 'Heavy Multimodal & Deep Think (Google)',
    company: 'google',
    companyName: 'Google',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    borderHover: 'hover:border-blue-500/50',
    category: 'General',
    version: 'Gemini 3.1 Pro (2026.08)',
    verifiedDate: '2026.08',
    tagline: '복잡한 다중 모달리티 결합 및 딥 씽킹(Deep Think)을 지원하는 프로 플래그십',
    overview: 'Google DeepMind의 고연산 프로페셔널 모델로, 고해상도 위성 사진, 의료 영상, 복잡한 비디오 시퀀스 분석 및 심층 수학/물리 추론 작업에 최적화되어 있습니다.',
    strengths: [
      '초고해상도 멀티모달 이미지/영상 정밀 객체 감지 및 공간 추론',
      'Deep Think 확장 모드를 통한 다단계 과학/알고리즘 검증',
      'Google Cloud Vertex AI 엔터프라이즈 환경 완벽 호환'
    ],
    limitations: ['Flash 모델 대비 생성 속도가 무거우므로 일반 코딩은 3.7 Flash 권장'],
    bestFor: ['의료/위성/특허 등 정밀 멀티모달 비전 분석', '대규모 엔터프라이즈 데이터 파이프라인'],
    keyFeatures: [
      { title: 'Deep Think Mode', desc: '다단계 사고 검증을 통한 논리적 오류 방지' },
      { title: 'Enterprise SLA', desc: 'Google Cloud Vertex AI 보안 및 안정성 보장' }
    ],
    pricing: {
      freeTier: 'AI Studio 테스트 지원',
      paidTier: 'Gemini Advanced 및 Vertex AI',
      apiPricing: 'Input $3.00 / Output $12.00 per 1M tokens'
    },
    promptTips: {
      title: 'Gemini Pro 멀티모달 팁',
      dos: ['복잡한 도표나 다이어그램 이미지를 주입하고 픽셀 단위 분석을 요구하세요.'],
      donts: ['단순 텍스트 질의에는 3.7 Flash를 쓰는 것이 3배 이상 빠릅니다.'],
      examplePrompt: `첨부된 위성 사진에서 건물 면적 변화를 계산하고 토지 이용 계획을 분석해줘.`
    },
    recommendedWorkflow: ['1. Vertex AI 및 심층 멀티모달 분석에 활용'],
    officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini#gemini-3.1-pro'
  },
  {
    id: 'google-antigravity',
    name: 'Google Antigravity (AGY)',
    subName: 'DeepMind Antigravity 2.0 Agentic Platform (Google)',
    company: 'google',
    companyName: 'Google',
    badgeColor: 'text-sky-400',
    badgeBg: 'bg-sky-500/10 border-sky-500/30',
    borderHover: 'hover:border-sky-500/50',
    category: 'Agent',
    version: 'Antigravity 2.0 / CLI / SDK',
    verifiedDate: '2026.08',
    tagline: 'Google DeepMind의 차세대 자율형 에이전트 코딩 플랫폼 & 다중 서브에이전트 오케스트레이션',
    overview: 'Google DeepMind에서 개발한 자율형 에이전트 개발 플랫폼으로, 데스크톱 앱(Antigravity 2.0), CLI, Python SDK를 통합 제공합니다. 사전 계획 모드(Planning Mode), 다중 서브에이전트 병렬 협업, 커스텀 스킬(Skills) 및 MCP 연동을 통해 복잡한 풀스택 프로젝트를 스스로 계획하고 검증합니다.',
    strengths: [
      'Planning Mode를 통한 사전 설계-검토-승인-실행-검증의 무결점 라이프사이클',
      '다양한 전문 서브에이전트(Subagents)를 백그라운드에서 동시 실행 및 통신',
      '도메인별(Bio, Fin, Dev, Systems) 커스텀 스킬(`SKILL.md`) 및 MCP 서버 완벽 지원',
      '비동기 빌드/테스트 완료 시 자동 감지 및 지능형 에러 자가 치유(Self-healing)'
    ],
    limitations: ['도구 호출(Tool Calling) 권한 및 워크스페이스 격리 구조에 대한 이해 필요'],
    bestFor: [
      '복잡한 풀스택 웹/앱 프로젝트의 기획부터 아키텍처 설계, 구현, 단위 테스트까지 전 과정 자율 개발',
      '대규모 레포지토리 리팩토링 및 다중 파일 일괄 마이그레이션',
      '도메인 특화 스킬(Bio, Fin, Dev)을 결합한 지능형 연구 및 엔지니어링 파이프라인 구축'
    ],
    keyFeatures: [
      { title: 'Planning Mode & Artifacts', desc: 'implementation_plan.md 및 walkthrough.md 자동 관리' },
      { title: 'Subagent Parallel Orchestration', desc: '연구, 코딩, 테스트 전담 서브에이전트 동시 병렬 실행' },
      { title: 'Extensible Skills & Rules', desc: 'SKILL.md와 AGY Rules를 통한 프로젝트 맞춤형 규칙 확장' }
    ],
    pricing: {
      freeTier: '개발자 프리뷰 / AI Studio 연동',
      paidTier: 'Google Cloud Vertex AI Enterprise 및 Pro 개발자 티어',
      apiPricing: 'Agentic Workload 기반'
    },
    promptTips: {
      title: 'Antigravity 에이전트 지침 팁',
      dos: ['새로운 기능 구현 시 먼저 계획 모드를 통해 아키텍처와 검증 계획을 수립하도록 요청하세요.', '/goal 명령어로 장시간 비동기 자율 개발을 위임하세요.'],
      donts: ['컴포넌트 단위로 점진 검증을 거치게 하세요.'],
      examplePrompt: `[목표] 실시간 주식 포트폴리오 트래커 웹앱 구축\n1. Planning Mode로 설계 문서를 먼저 작성하고 승인 후 구현`
    },
    recommendedWorkflow: ['1. implementation_plan.md 승인 -> 2. 자율 코드 작성 및 테스트 -> 3. walkthrough.md 증명'],
    officialDocsUrl: 'https://deepmind.google/technologies/gemini/'
  },

  // =========================================================================
  // 4. xAI Family (Grok 4.6 · Grok 4.5 · Grok Build)
  // =========================================================================
  {
    id: 'grok-4-6',
    name: 'Grok 4.6',
    subName: 'Colossus 2 Cluster Flagship & Real-Time X (xAI)',
    company: 'xai',
    companyName: 'xAI',
    badgeColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    borderHover: 'hover:border-cyan-500/50',
    category: 'General',
    version: 'Grok 4.6 (2026.08.12 Release)',
    verifiedDate: '2026.08',
    tagline: 'X(트위터) 실시간 데이터 피드 직결 & 비검열 직설적 추론 엔진',
    overview: '일론 머스크의 xAI가 개발한 플래그십 AI 모델입니다. 세계 최대 규모의 Colossus 2 슈퍼클러스터에서 훈련되어 2026년 8월 12일 Grok 4.6으로 공식 릴리즈되었습니다. X 플랫폼의 전 세계 실시간 트렌드와 뉴스를 0초 딜레이로 반영하는 DeepSearch와 풀스택 앱 자율 빌더인 Grok Build를 탑재했습니다.',
    strengths: [
      'X(구 트위터) 글로벌 실시간 데이터 피드 직통 연결을 통한 속보 및 트렌드 포착',
      '검열이나 필터링을 최소화하여 과감하고 직접적인 원인 분석 및 다각도 비판 제공',
      'Grok Build를 통한 자연어 웹앱 원스톱 생성 및 클라우드 즉시 배포',
      'Colossus 2 클러스터 기반의 초고속 토큰 생성 쓰루풋'
    ],
    limitations: ['X 플랫폼 외의 레거시 엔터프라이즈 ERP 연동은 발전 중'],
    bestFor: [
      '글로벌 실시간 금융 시장 속보, 암호화폐 여론 및 소셜 트렌드 분석',
      '검열 없는 솔직한 기술 비교, 제품 장단점 크리틱 및 반대 의견 수렴',
      'Grok Build를 통한 신속한 인터랙티브 웹 프로토타입 제작 및 배포'
    ],
    keyFeatures: [
      { title: 'X Real-time Firehose', desc: 'X에 게시되는 수억 건의 포스트를 실시간 색인하여 속보 파악' },
      { title: 'Grok Build Agent', desc: '프롬프트 하나로 풀스택 웹앱을 생성하고 브라우저에서 즉시 실행' },
      { title: 'Unfiltered Reasoning', desc: '객관적 사실과 데이터 위주로 직설적 답변' }
    ],
    pricing: {
      freeTier: '기본 질의 한정 무료 체험',
      paidTier: 'X Premium / SuperGrok ($16~$30/월)',
      apiPricing: 'Input $2.00 / Output $10.00 per 1M tokens'
    },
    promptTips: {
      title: 'Grok 4.6 실시간 검색 팁',
      dos: ['"지난 6시간 동안 X에서 화제가 된 ~의 반응을 요약해줘"처럼 시간 범위를 지정하세요.'],
      donts: ['정형화된 교과서적 답변만 요구하지 마세요.'],
      examplePrompt: `지난 24시간 동안 테크 커뮤니티에서 가장 뜨겁게 논쟁 중인 AI 전력 소모 이슈의 찬반 논점을 정리해줘.`
    },
    recommendedWorkflow: ['1. Grok DeepSearch로 실시간 트렌드 분석 -> 2. Grok Build로 시각화 웹앱 생성'],
    officialDocsUrl: 'https://docs.x.ai/docs/models#grok-4'
  },
  {
    id: 'grok-build-agent',
    name: 'Grok Build',
    subName: 'Natural Language Full-Stack App Builder (xAI)',
    company: 'xai',
    companyName: 'xAI',
    badgeColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    borderHover: 'hover:border-cyan-500/50',
    category: 'Agent',
    version: 'Grok Build (2026.08)',
    verifiedDate: '2026.08',
    tagline: '손그림 스케치나 자연어 프롬프트 하나로 웹앱을 즉시 생성하고 배포하는 AI 빌더',
    overview: 'xAI의 에이전틱 웹 애플리케이션 빌더로, 와이어프레임 이미지나 요구사항 텍스트를 입력하면 React, Three.js, Tailwind 기반의 완성형 웹앱을 15초 내외로 생성하고 브라우저에서 바로 호스팅합니다.',
    strengths: [
      '15초 내외의 경이로운 생성 속도',
      'Three.js 기반 3D 물리 시뮬레이션 및 그래픽 구현 특화',
      '클라우드 즉시 배포 URL 제공'
    ],
    limitations: ['초대형 레포지토리의 복잡한 비즈니스 로직 유지보수는 CLI 도구 권장'],
    bestFor: ['아이디어 프로토타이핑, 3D 인터랙티브 랜딩페이지, 데이터 시각화 위젯'],
    keyFeatures: [
      { title: 'Instant Hosting', desc: '생성 즉시 공유 가능한 라이브 웹 URL 제공' },
      { title: 'Three.js 3D Engine', desc: '3D 파티클 및 물리 법칙 시뮬레이션 코드 특화' }
    ],
    pricing: {
      freeTier: '체험 지원',
      paidTier: 'SuperGrok 플랜 포함',
      apiPricing: 'Compute 기반'
    },
    promptTips: {
      title: 'Grok Build 활용 팁',
      dos: ['원하는 인터랙션(버튼 클릭 시 파티클 효과 등)을 구체적으로 서술하세요.'],
      donts: ['너무 많은 백엔드 DB 스키마를 한 프롬프트에 넣지 마세요.'],
      examplePrompt: `Three.js를 사용해 마우스 움직임에 반응하는 은하계 3D 시뮬레이션 웹앱을 만들어줘.`
    },
    recommendedWorkflow: ['1. 프롬프트 입력 -> 2. 브라우저 실시간 렌더링 -> 3. 배포'],
    officialDocsUrl: 'https://docs.x.ai/docs/guides/vision'
  },

  // =========================================================================
  // 5. OpenSource & Specialized Leaders (DeepSeek · Meta Llama · Qwen)
  // =========================================================================
  {
    id: 'deepseek-v3-5',
    name: 'DeepSeek-V3.5 / R2',
    subName: 'Open Weight Reasoning Champion (DeepSeek)',
    company: 'opensource',
    companyName: 'DeepSeek',
    badgeColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    borderHover: 'hover:border-purple-500/50',
    category: 'General',
    version: 'DeepSeek-V3.5 / R2 (2026.08)',
    verifiedDate: '2026.08',
    tagline: '상용 플래그십급 추론 성능을 1/30 비용으로 제공하는 오픈 가중치 혁신의 정점',
    overview: '중국의 DeepSeek이 개발한 오픈 가중치 추론 전문 모델입니다. MoE(Mixture-of-Experts) 아키텍처와 강화학습(RL) 기반의 자체 CoT 추론을 통해 상용 플래그십 모델에 육박하는 SWE-bench(90.6%) 및 수학 올림피아드(93.8%) 성적을 기록하면서도 1/30의 파격적인 초저비용을 자랑합니다.',
    strengths: [
      '상용 플래그십에 필적하는 압도적 추론 성능 (AIME 93.8% / SWE-bench 90.6%)',
      '백만 토큰당 $0.55 수준의 전 세계 최저가 오픈소스 API 요율',
      '자체 온프레미스 및 프라이빗 클라우드에 가중치 직접 배포 가능'
    ],
    limitations: ['상용 클라우드 웹 검색 및 비전 멀티모달 기능은 기본 API에 미포함'],
    bestFor: [
      '비용 효율성이 극도로 중요한 대규모 AI 에이전트 백엔드 구축',
      '데이터 보안이 필수적인 금융/의료 사내 폐쇄망 LLM 온프레미스 구축',
      '복잡한 알고리즘 문제 해결 및 코드 생성'
    ],
    keyFeatures: [
      { title: 'MoE Architecture', desc: '필요한 전문가 신경망만 활성화하여 극단적 연산 효율 달성' },
      { title: 'Deep Reasoning CoT', desc: '강화학습으로 최적화된 다단계 추론 체인' }
    ],
    pricing: {
      freeTier: '오픈소스 가중치 무료 다운로드 (Hugging Face)',
      paidTier: '공식 API 서비스',
      apiPricing: 'Input $0.14 / Output $0.55 per 1M tokens (초저비용)'
    },
    promptTips: {
      title: 'DeepSeek Reasoner 팁',
      dos: ['복잡한 수학 문제나 알고리즘 문제를 주입하고 <think> 과정을 확인하세요.'],
      donts: ['단순 대화에는 일반 V3 모델을 쓰는 것이 더 빠릅니다.'],
      examplePrompt: `동적 계획법(DP)을 사용해 배낭 문제(Knapsack Problem)의 최적화 파이썬 코드를 작성해줘.`
    },
    recommendedWorkflow: ['1. 사내 온프레미스 배포 또는 API 연동 -> 2. 백엔드 추론 파이프라인 가동'],
    officialDocsUrl: 'https://api-docs.deepseek.com/guides/reasoning_model'
  },
  {
    id: 'meta-llama-4-405b',
    name: 'Meta Llama 4 (405B)',
    subName: 'Open Weight Global Industry Standard (Meta)',
    company: 'meta',
    companyName: 'Meta',
    badgeColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10 border-indigo-500/30',
    borderHover: 'hover:border-indigo-500/50',
    category: 'General',
    version: 'Llama 4 (405B / 70B - 2026.08)',
    verifiedDate: '2026.08',
    tagline: '글로벌 엔터프라이즈 오픈소스 AI의 표준, 4050억 파라미터 초대형 오픈 모델',
    overview: '메타(Meta)가 공개한 오픈 가중치 최고봉 모델입니다. 4,050억 파라미터의 거대한 용량을 바탕으로 다국어 지식, 박사급 과학 추론(GPQA 88.7%), 코딩, 복합 도메인 지식에서 상용 플래그십과 대등한 성능을 제공하며, 글로벌 엔터프라이즈의 사내 파인튜닝 표준으로 자리잡았습니다.',
    strengths: [
      '오픈소스 모델 중 가장 광범위한 생태계(도구, 프레임워크, 파인튜닝) 지원',
      '기업의 자체 도메인 데이터로 추가 학습 및 LoRA 파인튜닝에 최적',
      'AWS, Azure, GCP 등 모든 주요 클라우드에서 원클릭 배포 지원'
    ],
    limitations: ['405B 모델 로컬 구동 시 8×H100 이상의 고사양 GPU 클러스터 필요'],
    bestFor: [
      '엔터프라이즈 사내 전용 특화 LLM 파인튜닝 및 온프레미스 구축',
      '다국어 번역 및 글로벌 지식 기반 질의응답 시스템',
      '합성 데이터(Synthetic Data) 생성 및 소형 모델 증류(Distillation)'
    ],
    keyFeatures: [
      { title: '405B Parameter Scale', desc: '상용 플래그십과 대등한 방대한 지식 베이스' },
      { title: 'Open Commercial License', desc: '기업의 상업적 활용 및 가중치 수정 허용' }
    ],
    pricing: {
      freeTier: '오픈소스 가중치 무료 다운로드',
      paidTier: '클라우드 GPU 인스턴스 비용',
      apiPricing: '호스팅 업체별 $1.50~$2.50 per 1M tokens'
    },
    promptTips: {
      title: 'Llama 4 프롬프팅 팁',
      dos: ['시스템 프롬프트에 기업 고유의 도메인 룰과 응답 템플릿을 명시하세요.'],
      donts: ['파인튜닝 없이 너무 긴 사내 문서를 주입할 때는 RAG 파이프라인을 결합하세요.'],
      examplePrompt: `사내 보안 가이드라인에 맞춰 클라우드 인프라 접근 제어 정책 문서를 작성해줘.`
    },
    recommendedWorkflow: ['1. Llama 4 가중치 다운로드 -> 2. 사내 데이터 파인튜닝 -> 3. 온프레미스 서빙'],
    officialDocsUrl: 'https://ai.meta.com/research/publications/the-llama-3-herd-of-models/'
  },
  {
    id: 'qwen-3-coder',
    name: 'Qwen 3 Coder',
    subName: 'Specialized Open-Source Coding Champion (Alibaba)',
    company: 'opensource',
    companyName: 'Alibaba Qwen',
    badgeColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    borderHover: 'hover:border-purple-500/50',
    category: 'Coding',
    version: 'Qwen 3 Coder (2026.08)',
    verifiedDate: '2026.08',
    tagline: '가벼운 파라미터 대비 압도적인 코딩 벤치마크 점수를 기록하는 오픈소스 코딩 특화 최강자',
    overview: '알리바바가 개발한 오픈소스 코딩 특화 모델로, LiveCodeBench(85.9%)와 SWE-bench(88.9%)에서 놀라운 합격률을 기록하며 IDE 플러그인(Cursor, VS Code) 및 로컬 자율 코딩 에이전트의 핵심 엔진으로 급부상했습니다.',
    strengths: [
      '상용 모델을 위협하는 뛰어난 실전 코딩 및 알고리즘 문제 해결력',
      '단일 GPU(RTX 4090/A100)에서도 구동 가능한 가벼운 모델 사이즈 제공',
      '128K 컨텍스트 지원으로 대형 소스코드 파일 직접 분석'
    ],
    limitations: ['일반 인문학/철학 지식은 범용 모델 대비 코딩에 집중되어 있음'],
    bestFor: [
      'Cursor, VS Code 등 로컬 IDE의 인라인 자동완성 및 코드 리뷰 봇',
      'GitHub CI/CD 파이프라인 자동 코드 리뷰 및 단위 테스트 생성',
      '오프라인 폐쇄망 환경에서의 로컬 개발 보조 도구'
    ],
    keyFeatures: [
      { title: 'Coding SOTA Open-Model', desc: '오픈소스 중 최고 수준의 LeetCode/SWE-bench 점수' },
      { title: 'Local Deployment Ready', desc: 'Ollama 및 vLLM으로 개인 PC에서 즉시 구동' }
    ],
    pricing: {
      freeTier: '오픈소스 가중치 무료 다운로드',
      paidTier: 'Alibaba Cloud API',
      apiPricing: 'Input $0.10 / Output $0.40 per 1M tokens'
    },
    promptTips: {
      title: 'Qwen Coder 활용 팁',
      dos: ['Ollama와 연결하여 Cursor IDE의 커스텀 로컬 모델로 등록해 사용하세요.'],
      donts: ['긴 산문 작성에는 범용 모델을 사용하세요.'],
      examplePrompt: `주어진 C++ 코드를 Rust로 안전하게 변환하고 메모리 안정성을 검증해줘.`
    },
    recommendedWorkflow: ['1. Ollama로 `ollama run qwen3-coder` 실행 -> 2. 로컬 IDE 연동'],
    officialDocsUrl: 'https://github.com/QwenLM/Qwen2.5-Coder#leaderboard'
  }
];
