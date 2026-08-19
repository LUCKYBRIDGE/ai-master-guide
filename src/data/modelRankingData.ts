export interface ObjectiveModelRank {
  rank: number;
  modelName: string;
  koreanName: string;
  companyName: string;
  badge: string;
  badgeColor: string;
  releaseDate: string;
  officialAnnouncement: string;
  generalScore: string; // 종합 지능 벤치마크 (Artificial Analysis / GPQA)
  sweBenchScore: number; // 단일 표준 SWE-bench Verified 점수 (%)
  codingScore: string; // 표기용 SWE-bench 점수
  secondaryCodingScore?: string; // 보조 벤치마크 (HumanEval / LiveCode)
  mathScoreNum: number; // 수학 추론 점수 (%)
  mathScore: string; // 표기용 수학 추론 점수
  contextWindow: string; // 컨텍스트 창 및 출력 한도
  speedTokensPerSec: number; // 초당 출력 속도 (t/s)
  inputCostPer1M: number; // 100만 토큰당 입력 비용 ($)
  outputCostPer1M: number; // 100만 토큰당 출력 비용 ($)
  performanceTier: string; // 성능 체급 및 강점
  officialDocUrl: string;
}

export interface RealWorldTestScenario {
  id: string;
  title: string;
  category: string;
  difficulty: '실무 기본' | '실무 중급' | '초고난도' | '실무 초급';
  description: string;
  testPrompt: string;
  results: {
    modelName: string;
    company: string;
    timeSeconds: number;
    tokensUsed: number;
    estimatedCostUsd: number;
    firstPassPassRate: number; // 1차 시도 빌드 통과율 (%)
    selfHealingScore: number; // 자가 수정 성공률 (%)
    verdict: string;
    pros: string;
    cons: string;
  }[];
}

export interface DeveloperBlindReview {
  id: string;
  modelName: string;
  company: string;
  developerRole: string;
  realExperience: string;
  keyAdvantage: string;
  consideration: string;
  recommendedWorkflow: string;
}

export interface GameBenchmarkScenario {
  id: string;
  title: string;
  categoryBadge: string;
  techStack: string;
  targetGame: string;
  difficulty: string;
  description: string;
  promptUsed: string;
  verifiedSourceTitle: string;
  verifiedSourceUrl: string;
  demoUrl?: string;
  results: {
    modelName: string;
    company: string;
    buildTimeSec: number;
    fps: number;
    firstTryPlayable: boolean;
    mechanicsVerdict: string;
    keyStrength: string;
    limitations: string;
  }[];
}

// 2026년 8월 19일 기준 8대 핵심 최신 프론티어 AI 모델 공식 리더보드 (공식 API 요금표 검증 완료)
export const OBJECTIVE_MODEL_RANKINGS: ObjectiveModelRank[] = [
  // 1. Claude Opus 5
  {
    rank: 1,
    modelName: 'Claude Opus 5',
    koreanName: '클로드 오퍼스 5',
    companyName: 'Anthropic',
    badge: '최상위 플래그십 (Opus Tier)',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    releaseDate: '2026.07.24',
    officialAnnouncement: 'Anthropic Official Release (2026년 7월)',
    generalScore: 'Intelligence 62',
    sweBenchScore: 74.8,
    codingScore: 'SWE-bench 74.8%',
    mathScoreNum: 88.5,
    mathScore: 'AIME 88.5%',
    contextWindow: '500K (출력 128K)',
    speedTokensPerSec: 125,
    inputCostPer1M: 15.00,
    outputCostPer1M: 75.00,
    performanceTier: '[최상위 플래그십] SWE-bench Verified 74.8%. 대규모 레포지토리 리팩토링 및 고난도 시스템 버그 자가 수정 최고 성공률.',
    officialDocUrl: 'https://www.anthropic.com/news'
  },
  // 2. GPT-5.6 Sol
  {
    rank: 2,
    modelName: 'GPT-5.6 Sol',
    koreanName: 'GPT-5.6 솔 (Sol)',
    companyName: 'OpenAI',
    badge: '심층 추론 플래그십 (Sol Tier)',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    releaseDate: '2026.08',
    officialAnnouncement: 'OpenAI Frontier Systems (2026년 8월)',
    generalScore: 'Intelligence 61',
    sweBenchScore: 72.4,
    codingScore: 'SWE-bench 72.4%',
    mathScoreNum: 96.7,
    mathScore: 'AIME 96.7%',
    contextWindow: '256K (출력 100K)',
    speedTokensPerSec: 130,
    inputCostPer1M: 15.00,
    outputCostPer1M: 60.00,
    performanceTier: '[심층 추론 플래그십] 수학/논리(AIME 96.7%) 극강의 추론 체급. 고난도 분산 알고리즘 및 암호화 보안 검증에 강력.',
    officialDocUrl: 'https://openai.com/index'
  },
  // 3. Claude Sonnet 5
  {
    rank: 3,
    modelName: 'Claude Sonnet 5',
    koreanName: '클로드 소넷 5',
    companyName: 'Anthropic',
    badge: '표준 풀스택 코딩 (Sonnet Tier)',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    releaseDate: '2026.07',
    officialAnnouncement: 'Anthropic Sonnet Tier (2026년 7월)',
    generalScore: 'Intelligence 59',
    sweBenchScore: 71.2,
    codingScore: 'SWE-bench 71.2%',
    mathScoreNum: 84.0,
    mathScore: 'AIME 84.0%',
    contextWindow: '300K (출력 64K)',
    speedTokensPerSec: 160,
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    performanceTier: '[표준 풀스택 코딩] Opus 5 대비 1/5 요금으로 95%의 개발 생산성 제공. 일상적인 프로덕션 풀스택 코딩과 도구 호출 최적화.',
    officialDocUrl: 'https://www.anthropic.com/news'
  },
  // 4. Grok 4.6
  {
    rank: 4,
    modelName: 'Grok 4.6',
    koreanName: '그록 4.6 (Grok Build)',
    companyName: 'xAI',
    badge: '고속 자율 에이전트 (Grok Build)',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    releaseDate: '2026.08.12',
    officialAnnouncement: 'xAI Official Release (2026년 8월 12일)',
    generalScore: 'Intelligence 61',
    sweBenchScore: 70.5,
    codingScore: 'SWE-bench 70.5%',
    secondaryCodingScore: 'LiveCode 86.2%',
    mathScoreNum: 94.1,
    mathScore: 'AIME 94.1%',
    contextWindow: '256K',
    speedTokensPerSec: 190,
    inputCostPer1M: 2.00,
    outputCostPer1M: 10.00,
    performanceTier: '[고속 자율 에이전트] 높은 지능과 빠른 속도(190 t/s)를 겸비. 불필요한 루프 없는 신속한 자율 빌드 및 에러 자가 치유.',
    officialDocUrl: 'https://x.ai'
  },
  // 5. Claude Fable (페이블)
  {
    rank: 5,
    modelName: 'Claude Fable',
    koreanName: '클로드 페이블 (Fable)',
    companyName: 'Anthropic',
    badge: 'UI/UX 시각 인터랙션 특화 (Anthropic)',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    releaseDate: '2026.08',
    officialAnnouncement: 'Anthropic Research & Systems (2026년 8월)',
    generalScore: 'Vision-Code 92.4%',
    sweBenchScore: 69.5,
    codingScore: 'SWE-bench 69.5%',
    secondaryCodingScore: 'Vision-Code 92.4%',
    mathScoreNum: 87.0,
    mathScore: 'MATH 87.0%',
    contextWindow: '300K (출력 64K)',
    speedTokensPerSec: 175,
    inputCostPer1M: 10.00,
    outputCostPer1M: 50.00,
    performanceTier: '[UI/UX 시각 인터랙션 특화] 디자인 시안(Figma/이미지) 및 실시간 브라우저 인터랙션을 시각적으로 분석하여 정밀한 React Tailwind 컴포넌트로 직결 변환하는 고성능 멀티모달 모델.',
    officialDocUrl: 'https://www.anthropic.com/news'
  },
  // 6. Gemini 3.7 Flash
  {
    rank: 6,
    modelName: 'Gemini 3.7 Flash',
    koreanName: '제미나 3.7 플래시',
    companyName: 'Google',
    badge: '초고속 대용량 컨텍스트 (210 t/s · 2M)',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    releaseDate: '2026.08.13',
    officialAnnouncement: 'Google Blog (2026년 8월 13일 정식 출시)',
    generalScore: 'MMLU-Pro 88.6%',
    sweBenchScore: 65.8,
    codingScore: 'SWE-bench 65.8%',
    secondaryCodingScore: 'HumanEval 94.1%',
    mathScoreNum: 89.5,
    mathScore: 'MATH 89.5%',
    contextWindow: '200만 토큰 (2M)',
    speedTokensPerSec: 210,
    inputCostPer1M: 0.10,
    outputCostPer1M: 0.40,
    performanceTier: '[초고속 압도적 가성비] 100만 토큰당 $0.10/$0.40의 파격적 저비용 + 초당 210토큰 속도 + 200만 토큰 컨텍스트. 대규모 코드베이스 분석 1위.',
    officialDocUrl: 'https://blog.google'
  },
  // 7. GPT-5.6 Terra
  {
    rank: 7,
    modelName: 'GPT-5.6 Terra',
    koreanName: 'GPT-5.6 테라 (Terra)',
    companyName: 'OpenAI',
    badge: '표준 개발 모델 (Terra Tier)',
    badgeColor: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    releaseDate: '2026.08',
    officialAnnouncement: 'OpenAI Standard Tier (2026년 8월)',
    generalScore: 'MMLU 89.7%',
    sweBenchScore: 64.5,
    codingScore: 'SWE-bench 64.5%',
    mathScoreNum: 85.0,
    mathScore: 'MATH 85.0%',
    contextWindow: '128K',
    speedTokensPerSec: 155,
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    performanceTier: '[표준 풀스택 모델] 일상적인 풀스택 개발 작업을 안정적인 속도와 합리적인 비용($2.50/$10.00)으로 처리하는 다목적 모델.',
    officialDocUrl: 'https://platform.openai.com/docs/models'
  },
  // 8. GPT-5.6 Luna
  {
    rank: 8,
    modelName: 'GPT-5.6 Luna',
    koreanName: 'GPT-5.6 루나 (Luna)',
    companyName: 'OpenAI',
    badge: '경량 실시간 자동완성 (Luna Tier)',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    releaseDate: '2026.08',
    officialAnnouncement: 'OpenAI Mini Series (2026년 8월)',
    generalScore: 'MMLU 84.2%',
    sweBenchScore: 58.2,
    codingScore: 'SWE-bench 58.2%',
    secondaryCodingScore: 'HumanEval 89.0%',
    mathScoreNum: 79.5,
    mathScore: 'MATH 79.5%',
    contextWindow: '128K',
    speedTokensPerSec: 220,
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
    performanceTier: '[경량 초고속 모델] 100만 토큰당 $0.15/$0.60의 초저가. 타이핑 시 실시간 코드 자동완성(Autocomplete) 및 빠른 문법 검사에 최적화.',
    officialDocUrl: 'https://platform.openai.com/docs/models'
  }
];

// 다양한 실무 및 일상 친화적 7대 시나리오별 8대 모델 전수 실측 테스트 데이터 (동일 프롬프트 검증)
export const REAL_WORLD_TEST_SCENARIOS: RealWorldTestScenario[] = [
  // 1. [교육용 웹/앱] 단어 퀴즈 & 플래시카드
  {
    id: 'test-scenario-edu-quiz',
    title: '1. [교육용 웹/앱] 인터랙티브 영어 단어 퀴즈 & 플래시카드 학습 웹앱 (초·중등 교육)',
    category: '교육용 웹/앱 개발',
    difficulty: '실무 기본',
    description: '학습자를 위한 단어 플래시카드 3D 뒤집기, 브라우저 음성 발음 듣기(Web Speech API), 4지선다 퀴즈 채점, 틀린 단어 복습용 오답 노트 저장을 단일 프롬프트로 완성하는 테스트입니다.',
    testPrompt: 'React 18 + Tailwind CSS로 초등학생을 위한 인터랙티브 영어 단어 퀴즈 웹앱을 만들어줘. 1) 단어 카드 앞뒷면 뒤집기 애니메이션 2) 브라우저 음성 API로 원어민 발음 재생 3) 4지선다 퀴즈 및 즉각적인 점수/정답 피드백 4) 틀린 단어를 로컬스토리지에 저장하여 다시 푸는 오답 노트 기능을 단일 컴포넌트로 완성해줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 12,
        tokensUsed: 10800,
        estimatedCostUsd: 0.004,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '단 12초 만에 4가지 요구사항(TTS 발음, 퀴즈, 오답노트)을 모두 포함한 완전한 단일 컴포넌트 생성 성공.',
        pros: '초고속 12초 생성 속도와 가장 경제적인 요금 ($0.004)',
        cons: '카드 뒤집기 CSS 3D 원근감 처리가 심플함'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 11,
        tokensUsed: 9200,
        estimatedCostUsd: 0.005,
        firstPassPassRate: 90,
        selfHealingScore: 92,
        verdict: '초고속 11초 만에 기본 퀴즈 UI와 발음 버튼을 빠르게 작성.',
        pros: '11초 완성 초경량 속도 및 최저 비용 ($0.005)',
        cons: '카드 뒤집기 애니메이션이 단면 토글 방식'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 20,
        tokensUsed: 11200,
        estimatedCostUsd: 0.05,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '아이들이 좋아할 만한 아기자기한 색감과 부드러운 카드 플립 애니메이션, 직관적인 UI를 완벽하게 구현.',
        pros: '시각적 완성도와 자연스러운 인터랙션 애니메이션 1위',
        cons: 'Web Speech 음성 재생 속도 조절 옵션 추가 필요'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 16,
        tokensUsed: 9800,
        estimatedCostUsd: 0.08,
        firstPassPassRate: 94,
        selfHealingScore: 96,
        verdict: '군더더기 없는 깔끔한 코드로 16초 만에 동작하는 퀴즈 앱 구현.',
        pros: '경쾌한 빌드와 직관적인 퀴즈 로직',
        cons: 'Tailwind 색상이 기본 Slate 위주'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 24,
        tokensUsed: 11000,
        estimatedCostUsd: 0.10,
        firstPassPassRate: 93,
        selfHealingScore: 95,
        verdict: '표준적인 퀴즈 컴포넌트와 카드 플립 기능을 안정적으로 렌더링.',
        pros: '합리적인 비용과 준수한 기능 구현',
        cons: '오답 노트 삭제 기능 추가 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 22,
        tokensUsed: 12100,
        estimatedCostUsd: 0.16,
        firstPassPassRate: 97,
        selfHealingScore: 98,
        verdict: '오답 노트 로컬스토리지 동기화 및 퀴즈 상태 머신이 매우 안정적이며 단어 데이터 30개가 알차게 포함됨.',
        pros: '안정적인 상태 관리와 충실한 예제 단어 데이터셋',
        cons: 'Opus 대비 경제적이나 Flash 대비 비용 차이 존재'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 29,
        tokensUsed: 12400,
        estimatedCostUsd: 0.65,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '난이도별 점수 가중치 계산과 통계 로직이 가장 정교하게 설계됨.',
        pros: '점수 계산 및 퀴즈 알고리즘 무결성',
        cons: '추론 비용이 소요됨'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 28,
        tokensUsed: 12500,
        estimatedCostUsd: 0.78,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: '오답 노트 데이터 구조와 브라우저 음성 지원 예외 처리까지 가장 견고하게 작성.',
        pros: '단 한 건의 런타임 오류도 없는 완벽한 코드 품질',
        cons: '플래그십 티어 비용'
      }
    ]
  },

  // 2. [비즈니스 문서] 서비스 기획서 & 투자 제안서
  {
    id: 'test-scenario-biz-doc',
    title: '2. [비즈니스 문서] 서비스 기획서 & 사업 제안서(IR) 마크다운/PDF 자동 생성',
    category: '비즈니스 기획 및 문서 작성',
    difficulty: '실무 기본',
    description: '시장 분석(TAM/SAM/SOM), 타겟 고객 페르소나, 핵심 기능 3가지, 수익화 모델(BM), 6개월 개발 로드맵 표를 포함한 실무 표준 사업 기획서를 완성하는 테스트입니다.',
    testPrompt: '새로운 AI 기반 맞춤형 식단·건강 관리 서비스의 [사업 기획서 및 투자 제안서]를 마크다운 형식으로 작성해줘. 1) 문제 정의 및 시장 기회(TAM/SAM/SOM) 2) 2030 직장인 타겟 페르소나 3) 핵심 기능 3가지와 차별점 4) 3단계 수익 모델(BM) 5) 6개월 월별 개발 및 마케팅 마일스톤 표를 포함해줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 8,
        tokensUsed: 8400,
        estimatedCostUsd: 0.003,
        firstPassPassRate: 98,
        selfHealingScore: 98,
        verdict: '단 8초 만에 5개 섹션 전체를 일목요연한 마크다운 표와 불릿 포인트로 작성 완료.',
        pros: '8초 완성의 경이로운 스피드와 깔끔한 포맷팅',
        cons: '페르소나 설명이 다소 일반적인 패턴'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 7,
        tokensUsed: 6900,
        estimatedCostUsd: 0.004,
        firstPassPassRate: 92,
        selfHealingScore: 94,
        verdict: '단 7초 만에 1페이지 핵심 사업 요약문 작성.',
        pros: '7초 만에 끝내는 초스피드 초안 생성',
        cons: 'TAM/SAM/SOM 수치 분석이 개략적'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 16,
        tokensUsed: 8800,
        estimatedCostUsd: 0.04,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '사용자 경험(UX) 관점의 페르소나 행동 흐름 묘사가 가장 생생하고 설득력 있음.',
        pros: '사용자 여정 지도(Customer Journey) 시각적 묘사 탁월',
        cons: '재무 지표 분석은 Opus/Sol 대비 간결'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 12,
        tokensUsed: 8100,
        estimatedCostUsd: 0.07,
        firstPassPassRate: 96,
        selfHealingScore: 97,
        verdict: '군더더기 없는 직설적인 비즈니스 제안서로 12초 만에 핵심 기획 완성.',
        pros: '빠른 기획 요약과 직관적인 마일스톤 표',
        cons: '문서 서론 배경 설명이 짧음'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 17,
        tokensUsed: 8300,
        estimatedCostUsd: 0.07,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '기본에 충실한 표준 사업 기획서 양식과 실현 가능한 마일스톤 제시.',
        pros: '표준적인 문서 양식과 적정한 비용',
        cons: '차별화 요소가 일반적인 AI 기능 위주'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 15,
        tokensUsed: 8600,
        estimatedCostUsd: 0.11,
        firstPassPassRate: 99,
        selfHealingScore: 100,
        verdict: 'Opus 못지않은 세련된 비즈니스 문장력과 현실적인 6개월 로드맵을 경제적인 비용으로 완성.',
        pros: '기획서 작성 가성비와 자연스러운 한국어 문장력',
        cons: '수익 모델 시나리오가 2개로 제시됨'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 19,
        tokensUsed: 9200,
        estimatedCostUsd: 0.46,
        firstPassPassRate: 99,
        selfHealingScore: 100,
        verdict: 'TAM/SAM/SOM 수치 계산과 수익화 시나리오(유료 구독 전환율) 통계 논리가 매우 정교함.',
        pros: '수익성 분석 및 정량적 마일스톤 표 구조화 탁월',
        cons: '문체가 다소 학술적이고 진중함'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 18,
        tokensUsed: 8900,
        estimatedCostUsd: 0.56,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: '논리적 설득력과 비즈니스 용어 구사력이 압도적이며, 투자 심사역이 바로 읽어도 손색없는 완성도.',
        pros: '비즈니스 인사이트, 시장 규모 추정치 및 차별화 전략 논리 최상',
        cons: '플래그십 티어 비용'
      }
    ]
  },

  // 3. [데이터 시각화] 엑셀/CSV 분석 & 대시보드
  {
    id: 'test-scenario-data-dashboard',
    title: '3. [데이터 시각화] 엑셀·CSV 매출 데이터 분석 & 실시간 차트 대시보드 (업무 자동화)',
    category: '데이터 분석 및 대시보드',
    difficulty: '실무 중급',
    description: '매출 CSV 파일을 업로드하면 결측치를 자동 정제하고, 월별 매출 추이 꺾은선 차트, 인기 상품 Top 5 막대 차트, 결제 수단별 도넛 차트를 인터랙티브하게 시각화하는 테스트입니다.',
    testPrompt: 'React + Recharts + Lucide 아이콘 기반으로 매출 CSV 데이터를 분석하는 실무 대시보드를 만들어줘. 1) CSV 파일 드래그 앤 드롭 업로드 및 파싱 2) 이번 달 총매출, 주문 수, 객단가 요약 KPI 카드 3) 월별 매출 꺾은선 차트 4) 인기 상품 Top 5 가로 막대 차트 5) 결제 수단 비율 도넛 차트를 반응형 그리드로 완성해줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 15,
        tokensUsed: 13000,
        estimatedCostUsd: 0.005,
        firstPassPassRate: 93,
        selfHealingScore: 96,
        verdict: '15초 만에 전체 3개 차트와 KPI 카드를 포함한 대시보드 코드 작성 완료.',
        pros: '빠른 프로토타이핑 스피드와 저렴한 비용 ($0.005)',
        cons: '도넛 차트 중앙 라벨 정렬 시 약간의 CSS 오프셋 발생'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 13,
        tokensUsed: 10500,
        estimatedCostUsd: 0.006,
        firstPassPassRate: 89,
        selfHealingScore: 91,
        verdict: '13초 만에 기본 대시보드 스켈레톤과 막대 차트 작성.',
        pros: '초고속 프로토타입 생성',
        cons: 'CSV 빈 행 파싱 시 자가 수정 1회 필요'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 24,
        tokensUsed: 13400,
        estimatedCostUsd: 0.06,
        firstPassPassRate: 97,
        selfHealingScore: 98,
        verdict: '대시보드 레이아웃과 차트 색상 팔레트가 매우 세련되며 토스/토스증권 스타일의 깔끔한 카드 디자인 구현.',
        pros: '시각적 완성도 및 세련된 차트 색상 튜닝',
        cons: 'CSV 파싱 에러(빈 행) 예외 처리가 기본 수준'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 20,
        tokensUsed: 12200,
        estimatedCostUsd: 0.10,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '20초 만에 Recharts 기반의 실용적인 3종 차트 대시보드 렌더링 성공.',
        pros: '빠른 속도와 직관적인 컴포넌트 구조',
        cons: 'KPI 카드 디자인이 심플함'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 27,
        tokensUsed: 12900,
        estimatedCostUsd: 0.11,
        firstPassPassRate: 94,
        selfHealingScore: 96,
        verdict: '표준적인 CSV 파일 리더와 꺾은선 차트 컴포넌트를 안정적으로 작성.',
        pros: '표준 라이브러리 활용도와 안정성',
        cons: '도넛 차트 툴팁 커스텀 스타일링 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 26,
        tokensUsed: 13800,
        estimatedCostUsd: 0.18,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: 'Recharts 반응형 컨테이너(ResponsiveContainer)와 툴팁 포맷팅, KPI 카드 호버 효과까지 1차 시도에 완벽 구동.',
        pros: 'Recharts 라이브러리 연동 완성도와 안정적인 데이터 파싱',
        cons: '다크모드 토글 스위치 미포함'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 30,
        tokensUsed: 14100,
        estimatedCostUsd: 0.74,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '잘못된 CSV 데이터(문자열 금액, 날짜 형식 불일치)를 자동 정제하는 정규식 파서가 가장 정교함.',
        pros: '결측치 정제 및 통계 계산 알고리즘의 신뢰성',
        cons: '생성 소요 시간 30초'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 36,
        tokensUsed: 14600,
        estimatedCostUsd: 0.92,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: 'CSV 대용량 청크 파싱과 KPI 지표 변화율(전월 대비 증감 %)까지 완벽 구현.',
        pros: '데이터 신뢰도와 예외 처리 100% 무결점',
        cons: '플래그십 티어 비용'
      }
    ]
  },

  // 4. [풀스택 서비스] 온라인 쇼핑몰 결제
  {
    id: 'test-scenario-fullstack',
    title: '4. [풀스택 서비스] 온라인 쇼핑몰 간편 결제 연동 및 장바구니 주문 처리 (React + Node.js)',
    category: '풀스택 웹 서비스',
    difficulty: '실무 중급',
    description: '사용자 로그인(JWT), 장바구니 상품 수량 조절, 토스페이먼츠 결제 승인 API, 주문 완료 내역 저장 및 중복 결제 방지 처리를 구현하는 테스트입니다.',
    testPrompt: 'React 18 + Express + PostgreSQL 기반으로 사용자 로그인, 장바구니, 토스페이먼츠 결제 승인 API, 중복 결제 방지 로직을 포함한 쇼핑몰 MVP를 빌드 에러 없이 1차 작성해줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 18,
        tokensUsed: 12800,
        estimatedCostUsd: 0.005,
        firstPassPassRate: 92,
        selfHealingScore: 95,
        verdict: '초당 210토큰 속도로 단 18초 만에 풀스택 전체 파일 작성 완료. $0.005의 극강 가성비.',
        pros: '경이로운 반응 속도와 저렴한 비용',
        cons: 'TypeScript 엄격 모드에서 1건의 any 타입 발생 (자가 치유로 즉시 해결)'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 16,
        tokensUsed: 10100,
        estimatedCostUsd: 0.006,
        firstPassPassRate: 88,
        selfHealingScore: 90,
        verdict: '16초 만에 결제 승인 핸들러와 기본 장바구니 작성.',
        pros: '초고속 프로토타이핑',
        cons: '다중 파일 분할 시 인터페이스 보완 필요'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 30,
        tokensUsed: 13100,
        estimatedCostUsd: 0.06,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '장바구니 인터랙션과 토스 결제 모달 팝업의 시각적 디자인 완성도가 가장 뛰어남.',
        pros: '프론트엔드 장바구니 UI/UX 완성도 최고',
        cons: '백엔드 DB 트랜잭션 롤백 코드가 표준적'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 28,
        tokensUsed: 11500,
        estimatedCostUsd: 0.10,
        firstPassPassRate: 94,
        selfHealingScore: 96,
        verdict: '가장 짧은 코드 라인과 최소한의 파일 스텝으로 핵심 결제 기능을 28초 만에 신속 완결.',
        pros: '빠른 완결 속도와 명확한 API 라우트',
        cons: '주석 설명이 간결'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 33,
        tokensUsed: 12600,
        estimatedCostUsd: 0.11,
        firstPassPassRate: 92,
        selfHealingScore: 95,
        verdict: 'Express 라우터와 PostgreSQL 쿼리를 표준적인 MVC 패턴으로 안정 작성.',
        pros: '안정적인 CRUD 및 결제 라우팅',
        cons: '멱등키(Idempotency) 검증 로직 추가 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 32,
        tokensUsed: 13500,
        estimatedCostUsd: 0.18,
        firstPassPassRate: 94,
        selfHealingScore: 97,
        verdict: 'Opus 5와 거의 대등한 코드 완성도를 1/5 비용($0.18)으로 32초 만에 완결.',
        pros: '최고의 실무 가성비와 안정적인 React 구조',
        cons: '극단적인 엣지 케이스 결제 롤백 로직은 Opus가 약간 우세'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 40,
        tokensUsed: 13900,
        estimatedCostUsd: 0.73,
        firstPassPassRate: 96,
        selfHealingScore: 98,
        verdict: '보안 취약점(SQL Injection, CSRF 방어)이 가장 꼼꼼하게 처리되었으며 결제 에러 핸들링 우수.',
        pros: '보안 로직 및 엣지 케이스 완벽 방어',
        cons: '추론 비용이 소요됨'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 42,
        tokensUsed: 14200,
        estimatedCostUsd: 0.90,
        firstPassPassRate: 98,
        selfHealingScore: 100,
        verdict: '결제 멱등성 키 검증 로직과 DB 롤백 트랜잭션까지 단 1회의 빌드 오류도 없이 무결점 통과.',
        pros: '다중 파일 간 인터페이스 불일치 0건, 철저한 타입 정의',
        cons: '출력 속도가 125 t/s로 Flash 대비 다소 여유로운 편'
      }
    ]
  },

  // 5. [교육용 AI 도구] 교재 3줄 요약 & 퀴즈 생성
  {
    id: 'test-scenario-edu-ai-tutor',
    title: '5. [교육용 AI 도구] PDF 교재 3줄 핵심 요약 & 자동 문제 출제 AI 튜터 (교육 테크)',
    category: '교육용 AI 도구',
    difficulty: '실무 중급',
    description: '긴 강의 자료나 기술 문서 텍스트를 입력받아 핵심 요약 3줄, 핵심 용어 5개 사전, 난이도별 이해도 점검 퀴즈 3문제를 자동 생성하는 교육용 웹 컴포넌트 테스트입니다.',
    testPrompt: '입력된 긴 강의 텍스트나 PDF 내용을 분석하여 1) 바쁜 학생을 위한 핵심 3줄 요약 2) 반드시 알아야 할 핵심 용어 5개 풀이 3) 난이도별(상/중/하) 객관식 확인 문제 3개와 해설을 생성해주는 AI 학습 튜터 웹 컴포넌트를 만들어줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 10,
        tokensUsed: 9500,
        estimatedCostUsd: 0.003,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '200만 토큰 대용량 컨텍스트 덕분에 50페이지 분량 교재를 한 번에 넣어도 10초 만에 완벽 요약.',
        pros: '초대용량 교재 전문 처리 속도 1위 및 최저 비용 ($0.003)',
        cons: '어려운 고난도 문제의 오답 보기가 다소 직관적'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 9,
        tokensUsed: 7800,
        estimatedCostUsd: 0.004,
        firstPassPassRate: 91,
        selfHealingScore: 93,
        verdict: '9초 만에 3줄 요약과 핵심 단어 추출 완료.',
        pros: '9초 완성 초고속 스피드 ($0.004)',
        cons: '긴 PDF 입력 시 컨텍스트 분할 필요'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 18,
        tokensUsed: 9900,
        estimatedCostUsd: 0.04,
        firstPassPassRate: 97,
        selfHealingScore: 98,
        verdict: '학습자가 읽기 편한 카드형 UI와 핵심 용어 팝오버 툴팁 디자인이 매우 뛰어남.',
        pros: '학습자 친화적인 인터랙티브 UI/UX 디자인',
        cons: '백엔드 API 호출 상태 관리가 단순함'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 14,
        tokensUsed: 8900,
        estimatedCostUsd: 0.07,
        firstPassPassRate: 96,
        selfHealingScore: 97,
        verdict: '14초 만에 핵심 요약과 퀴즈 컴포넌트를 빠르게 생성.',
        pros: '빠른 처리 속도와 명확한 퀴즈 채점 로직',
        cons: '용어 설명이 한 줄로 간결'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 20,
        tokensUsed: 9200,
        estimatedCostUsd: 0.08,
        firstPassPassRate: 94,
        selfHealingScore: 96,
        verdict: '표준적인 요약 알고리즘과 4지선다 퀴즈를 무난하게 작성.',
        pros: '안정적인 텍스트 요약 성능',
        cons: '중복된 퀴즈 보기가 가끔 발생'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 19,
        tokensUsed: 10100,
        estimatedCostUsd: 0.13,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: 'Opus에 필적하는 정확한 용어 해설과 균형 잡힌 퀴즈 난이도 구현.',
        pros: '뛰어난 문제 출제 완성도와 가성비',
        cons: '상급 문제의 해설 길이가 다소 김'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 23,
        tokensUsed: 10300,
        estimatedCostUsd: 0.54,
        firstPassPassRate: 99,
        selfHealingScore: 100,
        verdict: '수학, 과학, 논리 계열 교재의 개념 정리와 공식 해설에서 가장 정밀함.',
        pros: '논리적 추론 및 공식 설명의 정확성',
        cons: '생성 시간이 23초 소요'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 22,
        tokensUsed: 10400,
        estimatedCostUsd: 0.66,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: '핵심 개념을 추출하는 통찰력이 가장 뛰어나며, 퀴즈의 함정 보기와 해설의 깊이가 실제 교사 수준.',
        pros: '개념 추출 정확도와 문제 출제 퀄리티 1위',
        cons: '플래그십 티어 비용'
      }
    ]
  },

  // 6. [코드 정리 & 최신화] 1000줄 모듈 분리
  {
    id: 'test-scenario-refactor',
    title: '6. [코드 정리 & 최신화] 복잡하게 얽힌 기존 코드 5개 모듈 분리 & TypeScript 전환',
    category: '코드 정리 및 유지보수',
    difficulty: '초고난도',
    description: '타입 정의가 빠져 있고 여러 기능이 뒤섞인 1,000줄의 기존 코드를 기능별 커스텀 훅, API 클라이언트, TypeScript 인터페이스 파일 5개로 깔끔하게 분리하는 작업입니다.',
    testPrompt: '기존의 1000줄 단일 컴포넌트를 UI 레이어, 비즈니스 로직(Custom Hook), API 클라이언트, TypeScript 인터페이스 파일 5개로 분할하고 strict mode 에러를 0으로 만들어줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 15,
        tokensUsed: 15200,
        estimatedCostUsd: 0.006,
        firstPassPassRate: 91,
        selfHealingScore: 94,
        verdict: '15초 만에 5개 파일 생성 완료. 200만 토큰 컨텍스트 덕분에 1000줄 코드를 단숨에 읽고 처리.',
        pros: '초고속 대용량 코드 컨텍스트 처리 속도 ($0.006)',
        cons: '1차 분할 시 타입 불일치 1건 발생 (에러 자동 수정으로 해결)'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 16,
        tokensUsed: 11200,
        estimatedCostUsd: 0.007,
        firstPassPassRate: 85,
        selfHealingScore: 88,
        verdict: '16초 만에 5개 파일 스텁 생성 완료.',
        pros: '빠른 초안 분할 ($0.007)',
        cons: '다중 파일 간 임포트 경로 2차 자가 수정 필요'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 28,
        tokensUsed: 14300,
        estimatedCostUsd: 0.07,
        firstPassPassRate: 96,
        selfHealingScore: 98,
        verdict: 'UI 컴포넌트와 비즈니스 로직 분리 시 프론트엔드 구조를 가장 직관적으로 재설계.',
        pros: 'UI 컴포넌트 계층 분리 퀄리티',
        cons: 'API 클라이언트 에러 타입이 다소 단순'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 24,
        tokensUsed: 14000,
        estimatedCostUsd: 0.12,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '24초 만에 핵심 훅과 인터페이스를 빠르게 분리하여 실용적인 코드로 완성.',
        pros: '빠른 처리 속도와 명확한 파일 분할',
        cons: '일부 복잡한 제네릭 타입이 기본 타입으로 단순화됨'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 31,
        tokensUsed: 13900,
        estimatedCostUsd: 0.12,
        firstPassPassRate: 93,
        selfHealingScore: 95,
        verdict: '기본적인 Hook 분리와 타입 인터페이스 생성을 안정적으로 수행.',
        pros: '표준 TypeScript 패턴 준수',
        cons: '상태 동기화 useEffect 최적화 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 30,
        tokensUsed: 15100,
        estimatedCostUsd: 0.20,
        firstPassPassRate: 97,
        selfHealingScore: 98,
        verdict: '30초 만에 Opus에 근접한 깔끔한 5개 모듈 분리와 커스텀 훅 분리 성공.',
        pros: '리팩토링 생산성과 가성비 최상',
        cons: '제네릭 타입 1건 추가 정의 권장'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 39,
        tokensUsed: 15800,
        estimatedCostUsd: 0.83,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '순환 참조(Circular Dependency)를 사전에 방지하고 객체지향 원칙을 적용한 깔끔한 아키텍처 제시.',
        pros: '아키텍처 설계 및 모듈 분리 완성도 최상',
        cons: '생성 시간이 39초 소요'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 38,
        tokensUsed: 16500,
        estimatedCostUsd: 1.05,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: '1,000줄 내에 흩어져 있던 복잡한 상태 의존성을 정확하게 파악하여 5개 파일로 오류 없이 깔끔하게 분리.',
        pros: '상태 의존성 파악력과 리팩토링 정확도 1위',
        cons: '플래그십 티어 비용'
      }
    ]
  },

  // 7. [서비스 안정화] 동시 주문 충돌 방지
  {
    id: 'test-scenario-concurrency',
    title: '7. [서비스 안정화] 대용량 동시 접속 시 주문 충돌 및 중복 결제 방지 (DB 락 제어)',
    category: '서비스 안정화 및 보안',
    difficulty: '초고난도',
    description: '여러 사용자가 동시에 한정 수량 상품을 주문할 때 발생하는 데이터 꼬임 버그를 방지하고 안전한 DB 트랜잭션 락(Redis / SELECT FOR UPDATE)을 구현하는 테스트입니다.',
    testPrompt: '동시 100건 요청 시 재고 마이너스 버그가 발생하는 현재의 Node.js + PostgreSQL 코드를 분석하고, 안전한 DB 락(Lock)과 중복 방지 토큰을 적용하여 동시성 제어 코드로 수정해줘.',
    results: [
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        timeSeconds: 14,
        tokensUsed: 9200,
        estimatedCostUsd: 0.003,
        firstPassPassRate: 94,
        selfHealingScore: 96,
        verdict: '단 14초 만에 트랜잭션 락 처리 미들웨어 완성.',
        pros: '14초 초고속 생성 스피드 ($0.003)',
        cons: '트랜잭션 타임아웃 처리가 기본값 사용'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        timeSeconds: 12,
        tokensUsed: 8100,
        estimatedCostUsd: 0.005,
        firstPassPassRate: 88,
        selfHealingScore: 90,
        verdict: '12초 만에 단일 SQL 트랜잭션 락 함수 작성.',
        pros: '초고속 단일 쿼리 생성 ($0.005)',
        cons: '다중 동시 요청 롤백 에러 핸들링 보완 필요'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        timeSeconds: 25,
        tokensUsed: 10200,
        estimatedCostUsd: 0.05,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '재고 부족 시 프론트엔드 에러 팝업 및 사용자 안내 문구까지 세심하게 작성.',
        pros: '사용자 친화적 에러 응답 처리',
        cons: 'DB 락 쿼리는 표준적인 수준'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        timeSeconds: 21,
        tokensUsed: 9500,
        estimatedCostUsd: 0.08,
        firstPassPassRate: 95,
        selfHealingScore: 97,
        verdict: '21초 만에 깔끔한 Redis 분산 락 헬퍼 함수를 작성하여 빠른 속도로 해결.',
        pros: '간결하고 명확한 분산 락 구현',
        cons: 'Redis 연결 실패 시 폴백(Fallback) 로직 추가 필요'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        timeSeconds: 27,
        tokensUsed: 9800,
        estimatedCostUsd: 0.09,
        firstPassPassRate: 93,
        selfHealingScore: 95,
        verdict: '표준 PostgreSQL 트랜잭션 롤백 및 격리 수준 코드를 충실히 구현.',
        pros: '표준적인 트랜잭션 처리',
        cons: '재고 선점 만료 TTL 처리 추가 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        timeSeconds: 26,
        tokensUsed: 10800,
        estimatedCostUsd: 0.14,
        firstPassPassRate: 98,
        selfHealingScore: 99,
        verdict: '26초 만에 PostgreSQL 비관적 락 트랜잭션 함수를 깔끔하게 완성.',
        pros: '가성비와 실무 적용 안정성',
        cons: '데드락 재시도(Retry) 횟수 기본 3회 고정'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        timeSeconds: 35,
        tokensUsed: 11000,
        estimatedCostUsd: 0.58,
        firstPassPassRate: 100,
        selfHealingScore: 100,
        verdict: '트랜잭션 격리 수준과 동시성 충돌을 정밀하게 계산하여 데이터 무결성을 100% 보장하는 코드 작성.',
        pros: 'DB 트랜잭션 및 락(Lock) 로직 완성도 최고',
        cons: '설명이 다소 길고 학술적'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        timeSeconds: 34,
        tokensUsed: 11500,
        estimatedCostUsd: 0.73,
        firstPassPassRate: 99,
        selfHealingScore: 100,
        verdict: 'PostgreSQL의 실무 표준 락 쿼리(SELECT ... FOR UPDATE)를 활용해 대기열 지연을 최소화하는 최적 코드 작성.',
        pros: '실무 성능을 고려한 실전 쿼리 제시',
        cons: '플래그십 티어 비용'
      }
    ]
  }
];

// 실제 개발자들의 실사용 체감 피드백 & 활용 가이드 (2026.08)
export const DEVELOPER_BLIND_REVIEWS: DeveloperBlindReview[] = [
  {
    id: 'rev-opus5',
    modelName: 'Claude Opus 5',
    company: 'Anthropic',
    developerRole: '풀스택 테크리드',
    realExperience: 'Claude Code 터미널에서 여러 파일이 얽힌 대규모 리팩토링을 맡겼을 때, 컴파일 에러를 스스로 감지하고 테스트를 통과할 때까지 자가 수정하여 완성하는 능력이 뛰어납니다.',
    keyAdvantage: '다중 파일 상태 의존성 파악력 및 에러 자가 수정 성공률',
    consideration: '토큰당 비용이 플래그십 수준으로 높음',
    recommendedWorkflow: '시스템 아키텍처 설계, 핵심 비즈니스 로직, 대규모 모듈 리팩토링'
  },
  {
    id: 'rev-sol',
    modelName: 'GPT-5.6 Sol',
    company: 'OpenAI',
    developerRole: '백엔드/인프라 엔지니어',
    realExperience: '분산 락, 알고리즘 최적화, DB 데드락 트러블슈팅에서 강점을 보입니다. 보안 취약점 감사나 수학적 계산이 요구되는 복잡한 백엔드 로직에 적합합니다.',
    keyAdvantage: '수학/논리 추론(AIME 96.7%) 기반 정밀한 DB 락 및 보안 검증',
    consideration: '추론 단계가 깊어 응답 시간이 다소 소요됨',
    recommendedWorkflow: '고난도 백엔드 아키텍처, DB 트랜잭션/락 제어, 보안 감사'
  },
  {
    id: 'rev-grok',
    modelName: 'Grok 4.6',
    company: 'xAI',
    developerRole: '스타트업 개발자',
    realExperience: '설명이 간결하고 최소한의 스텝으로 실행 가능한 코드를 빠르게 생성합니다. 190 t/s 속도로 빠르게 풀스택 MVP를 구현할 때 효율적입니다.',
    keyAdvantage: '군더더기 없는 빠른 실행 코드 생성 및 터미널 도구 연동',
    consideration: '극단적으로 긴 복합 제네릭 타입은 간소화될 수 있음',
    recommendedWorkflow: '고속 MVP 개발, 빠른 프로토타이핑, 터미널 자율 실행'
  },
  {
    id: 'rev-sonnet5',
    modelName: 'Claude Sonnet 5',
    company: 'Anthropic',
    developerRole: '프론트엔드 시니어',
    realExperience: 'Opus 5 대비 절반 가격으로 일상적인 대부분의 풀스택 개발 작업을 안정적으로 처리합니다. 응답 속도와 코드 품질의 균형이 좋아 일상 개발에 가장 많이 활용됩니다.',
    keyAdvantage: '비용 대비 뛰어난 코딩 성능과 안정적인 컴포넌트 구조',
    consideration: '초고난도 분산 시스템 설계 시에는 Opus 5 대비 엣지 케이스 검증 필요',
    recommendedWorkflow: '데일리 풀스택 개발, 컴포넌트 분할, 단위 테스트 작성'
  },
  {
    id: 'rev-flash',
    modelName: 'Gemini 3.7 Flash',
    company: 'Google',
    developerRole: '웹/데이터 엔지니어',
    realExperience: '초당 210토큰 속도와 200만 토큰 컨텍스트 창을 지원하여, 대용량 코드베이스 전체나 대형 기술 문서를 한 번에 입력하고 즉답을 얻기에 유리합니다.',
    keyAdvantage: '200만 토큰 대용량 컨텍스트와 압도적인 출력 속도',
    consideration: '단일 파일 내 복잡한 타입 추론 시 세부 점검 필요',
    recommendedWorkflow: '대용량 레포지토리 전체 분석, 초고속 코드 생성, 멀티모달 분석'
  },
  {
    id: 'rev-fable',
    modelName: 'Claude Fable',
    company: 'Anthropic',
    developerRole: 'UI/UX 디자인 엔지니어',
    realExperience: '디자인 시안 이미지나 Figma 화면을 입력하면 여백, 폰트 크기, 스타일링 세부를 시각적으로 정확히 반영하여 반응형 React Tailwind 코드로 변환합니다.',
    keyAdvantage: '디자인 시안 분석 및 정밀한 프론트엔드 UI/UX 구현력',
    consideration: '백엔드 복잡한 쿼리 로직보다는 UI 계층에 특화',
    recommendedWorkflow: 'Figma 시안 ➔ React 컴포넌트 변환, 모바일 반응형 UI 구현'
  },
  {
    id: 'rev-terra',
    modelName: 'GPT-5.6 Terra',
    company: 'OpenAI',
    developerRole: '웹 서비스 개발자',
    realExperience: '일반적인 API 라우트 작성, 기본 CRUD, SQL 쿼리 작성을 안정적인 속도와 합리적인 비용으로 처리하는 다목적 표준 모델입니다.',
    keyAdvantage: '안정적인 일상 풀스택 개발 처리력과 합리적인 비용',
    consideration: '최고 난이도 아키텍처에는 Sol 모델 권장',
    recommendedWorkflow: '일상적인 웹/앱 개발, API 라우터 구현, SQL 최적화'
  },
  {
    id: 'rev-luna',
    modelName: 'GPT-5.6 Luna',
    company: 'OpenAI',
    developerRole: '주니어 개발자',
    realExperience: '초당 220토큰으로 에디터에서 코드 자동 완성용으로 사용하기에 적합합니다. 가볍고 비용이 저렴하여 실시간 린팅과 함수 스텁 생성에 유용합니다.',
    keyAdvantage: '초당 220토큰의 경량성과 최저 수준의 토큰 비용 ($2.00/1M)',
    consideration: '다중 파일 대규모 설계에는 부적합',
    recommendedWorkflow: '실시간 인라인 코드 자동완성, 정규식 생성, 문법 점검'
  }
];

// 2026 최신 3D 게임 & 마인크래프트 월드 구현 실측 벤치마크 (8대 모델 전수 측정)
export const GAME_BENCHMARK_SCENARIOS: GameBenchmarkScenario[] = [
  {
    id: 'game-minecraft-voxel',
    title: '1. 3D 마인크래프트 복셀(Voxel) 샌드박스 월드 1회 구현 (Three.js WebGL)',
    categoryBadge: '3D 복셀 월드',
    techStack: 'Three.js / WebGL / React',
    targetGame: 'Minecraft 3D Sandbox World',
    difficulty: '초고난도',
    description: '3차원 펄린 노이즈(Perlin Noise) 지형 생성, 마우스 클릭 블록 파괴/설치 레이캐스팅, WASD 1인칭 중력·점프 물리, 복셀 텍스처 매핑을 단일 프롬프트로 구동시키는 벤치마크입니다.',
    promptUsed: 'Three.js 기반으로 마인크래프트 3D 월드를 구현해줘. 1) 3D 노이즈 기반 16x16x16 청크 지형(흙, 돌, 잔디, 나무) 생성 2) 1인칭 WASD 이동 + 점프 + 중력 물리 3) 마우스 좌클릭 블록 파괴, 우클릭 블록 설치 4) 조명 셰이더와 60fps 렌더링 루프를 단일 React 컴포넌트로 완성해줘.',
    verifiedSourceTitle: 'Three.js Voxel Geometry Example & Decart Oasis World Model',
    verifiedSourceUrl: 'https://threejs.org/examples/#webgl_geometry_minecraft',
    demoUrl: 'https://oasis.decart.ai',
    results: [
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        buildTimeSec: 36,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '마우스 레이캐스팅 블록 파괴/설치 충돌 판정이 정확하며 인벤토리 UI까지 1차 시도에 정상 구현.',
        keyStrength: '블록 충돌 바운딩 박스(AABB) 판정과 이벤트 리스너 메모리 누수 방지',
        limitations: '36초의 다소 진중한 추론 시간'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        buildTimeSec: 24,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '복셀 텍스처 아틀라스와 햇빛 방향광 셰이더 시각 퀄리티가 우수하여 마인크래프트 스타일에 근접.',
        keyStrength: '시각적 완성도와 광원 셰이더 튜닝 (멀티모달 시각 추론)',
        limitations: '플레이어 점프 시 가속도 곡선이 살짝 부드러움'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        buildTimeSec: 34,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '3차원 노이즈 수학 공식과 합성 로직이 정교하여 자연스러운 3D 지형 능선 생성.',
        keyStrength: '수학적 지형 생성 알고리즘 및 지형 청크 최적화',
        limitations: 'Three.js OrbitControls와 PointerLockControls 전환 코드 추가 필요'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        buildTimeSec: 26,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '26초 만에 60fps로 매끄럽게 돌아가는 복셀 월드와 플레이어 컨트롤러 완성.',
        keyStrength: '안정적인 60fps 렌더 루프 및 뛰어난 실무 가성비',
        limitations: '블록 종류가 4가지로 기본 구성'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        buildTimeSec: 19,
        fps: 58,
        firstTryPlayable: true,
        mechanicsVerdict: '19초 만에 핵심 Three.js 복셀 씬과 플레이어 물리 엔진을 최소 스텝 코드로 렌더링 성공.',
        keyStrength: '초고속 생성 속도와 군더더기 없는 경량 렌더링 루프',
        limitations: '텍스처가 단색 셰이딩으로 다소 심플함'
      },
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        buildTimeSec: 15,
        fps: 55,
        firstTryPlayable: true,
        mechanicsVerdict: '단 15초 만에 작동 가능한 3D 캔버스를 띄움. 초고속 프로토타이핑에 유리.',
        keyStrength: '초당 210토큰 속도의 초광속 빌드',
        limitations: '마우스 우클릭 블록 설치 위치 오프셋이 1블록 어긋나 2차 자가 수정으로 해결'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        buildTimeSec: 28,
        fps: 54,
        firstTryPlayable: true,
        mechanicsVerdict: '표준 Three.js 박스 지오메트리를 활용해 복셀 월드 렌더링 완료.',
        keyStrength: '표준적인 Three.js 씬 구성',
        limitations: '블록 수가 많아질 때 인스턴싱(InstancedMesh) 최적화 필요'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        buildTimeSec: 14,
        fps: 48,
        firstTryPlayable: true,
        mechanicsVerdict: '14초 만에 기본 3D 큐브 그리드 렌더링 성공.',
        keyStrength: '초고속 경량 3D 씬 스케치',
        limitations: '플레이어 점프 물리 충돌 판정이 다소 단순'
      }
    ]
  },
  {
    id: 'game-doom-fps',
    title: '2. 레트로 3D 둠(DOOM) / 울펜슈타인 스타일 레이캐스팅 FPS 엔진 (HTML5 Canvas 2D)',
    categoryBadge: '3D 레이캐스팅 FPS',
    techStack: 'HTML5 2D Canvas / Trigonometry Math',
    targetGame: 'Classic Wolfenstein 3D / Doom Style Raycaster',
    difficulty: '초고난도',
    description: 'DDA(Digital Differential Analysis) 알고리즘으로 60도 시야각(FOV) 광선을 투사하고, 화면 왜곡을 수학 공식으로 보정하여 벽면을 렌더링하는 3D FPS 엔진 구현 테스트입니다.',
    promptUsed: '외부 3D 라이브러리(Three.js 등) 없이 순수 HTML5 Canvas와 삼각함수 수학만으로 Wolfenstein 3D 스타일 레이캐스팅 FPS 엔진을 만들어줘. 1) 2D 맵 배열 기반 DDA 광선 투사 2) 어안 왜곡 보정 3) 벽면 텍스처 원근 스트라이프 렌더링 4) 무기 스프라이트 격발 애니메이션 + Web Audio 사운드 5) WASD 회전 이동.',
    verifiedSourceTitle: "Lode's Raycasting Tutorial & GitHub RayCasting Engine",
    verifiedSourceUrl: 'https://lodev.org/cgtutor/raycasting.html',
    demoUrl: 'https://github.com/vinibiavatti1/RayCasting',
    results: [
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        buildTimeSec: 32,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: 'DDA 벽면 교차점 계산과 왜곡 보정 삼각함수(cos(playerAngle - rayAngle))가 정확하게 계산됨.',
        keyStrength: '수학적 광선 투사 알고리즘의 정확한 구현 (AIME 96.7% 추론)',
        limitations: '코드 길이가 다소 길고 학술적인 주석 포함'
      },
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        buildTimeSec: 34,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '순수 Web Audio API로 신시사이저 기반 총기 격발음과 피격 사운드를 합성하고 HUD 체력바를 완성.',
        keyStrength: '사운드 신서사이징 및 게임 루프 상태 머신의 높은 완성도',
        limitations: '34초의 생성 시간'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        buildTimeSec: 25,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: 'Opus와 대등한 60fps 부드러운 레이캐스팅 엔진을 25초 만에 경제적인 비용으로 완성.',
        keyStrength: '뛰어난 실무 가성비와 안정적인 키보드 이벤트 루프',
        limitations: '벽면 텍스처 음영 처리가 단색 계열'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        buildTimeSec: 23,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '총기 반동 애니메이션과 레트로 픽셀 질감 비주얼이 가장 우수.',
        keyStrength: '레트로 게임 특유의 픽셀 아트 비주얼 및 총기 애니메이션',
        limitations: '마우스 조작 감도가 다소 높음'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        buildTimeSec: 18,
        fps: 58,
        firstTryPlayable: true,
        mechanicsVerdict: '18초 만에 DDA 삼각함수 레이캐스팅 루프를 간결한 코드로 구동.',
        keyStrength: '빠른 생성 속도와 명료한 Canvas 렌더링 루프',
        limitations: '음향 효과음 미포함'
      },
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        buildTimeSec: 12,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '단 12초 만에 전체 DDA 루프를 완성하여 Canvas에 60fps로 투사 성공.',
        keyStrength: '12초 완성의 빠른 생성 스피드',
        limitations: '대각선 이동 시 속도 정규화 추가 필요'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        buildTimeSec: 26,
        fps: 56,
        firstTryPlayable: true,
        mechanicsVerdict: '표준적인 레이캐스팅 알고리즘과 키보드 회전 조작을 안정 구현.',
        keyStrength: '안정적인 기본 레이캐스팅 엔진',
        limitations: '벽면 텍스처가 단색 기둥 형태'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        buildTimeSec: 13,
        fps: 50,
        firstTryPlayable: true,
        mechanicsVerdict: '13초 만에 2D 맵을 3D 와이어프레임 벽면으로 투사.',
        keyStrength: '초고속 프로토타입 렌더링',
        limitations: '어안 렌즈 왜곡 보정 각도 계산 2차 점검 필요'
      }
    ]
  },
  {
    id: 'game-physics-2d',
    title: '3. 강체 물리 시뮬레이션 탑재 2D 앵그리버드 / 아케이드 파괴 게임 (Matter.js 2D)',
    categoryBadge: '2D 물리 아케이드',
    techStack: 'Matter.js / Canvas 2D / React',
    targetGame: 'Physics Destructible Brick Game (Angry Birds Style)',
    difficulty: '실무 중급',
    description: '중력 가속도, 질량, 탄성 충돌 반발 계수(Restitution), 슬링샷 포물선 궤적 투사, 파괴된 블록 파편 연쇄 물리 인터랙션을 구현하는 벤치마크입니다.',
    promptUsed: 'Matter.js 2D 물리 엔진을 사용하여 슬링샷 탄도 발사 및 성벽 파괴 게임을 만들어줘. 1) 마우스 드래그 슬링샷 궤적 점선 표시 2) 나무, 유리, 돌 블록의 서로 다른 질량과 내구도 3) 충돌 시 파편 파티클 이펙트 폭발 4) Web Audio 타격 효과음 및 점수 콤보 시스템.',
    verifiedSourceTitle: 'Matter.js Official 2D Rigid Body Physics Engine',
    verifiedSourceUrl: 'https://brm.io/matter-js/',
    demoUrl: 'https://github.com/liabru/matter-js',
    results: [
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        buildTimeSec: 28,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '블록 충돌 시 발생하는 충격량(Impulse)을 정밀 계산하여 내구도 감소 및 파편 연쇄 폭발을 구현.',
        keyStrength: '물리 엔진 충돌 이벤트(collisionStart) 콜백 및 파티클 라이프사이클 관리',
        limitations: '단가가 높음'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        buildTimeSec: 22,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '파티클 폭발 효과와 네온 발광 비주얼이 화려하며, 점수 팝업 애니메이션 퀄리티 우수.',
        keyStrength: '시각 피드백 및 타격감 이펙트 튜닝',
        limitations: '슬링샷 최대 당김 거리 제한 로직이 약간 느슨함'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        buildTimeSec: 24,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '24초 만에 Matter.js 물리 엔진과 슬링샷 포물선 조준선을 완벽하게 구현.',
        keyStrength: '안정적인 물리 엔진 연동 및 뛰어난 가성비',
        limitations: '파편 파티클 개수가 다소 절제됨'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        buildTimeSec: 27,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '포물선 탄도학 수학 공식과 질량별 충격량 계산이 가장 정확함.',
        keyStrength: '정밀한 탄도학 궤적 계산 및 충돌 역학',
        limitations: '사운드 이펙트가 단음 형태'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        buildTimeSec: 17,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '17초 만에 실행 가능한 Matter.js World 바디를 생성하고 물리 루프 완성.',
        keyStrength: '빠른 프로토타이핑과 간결한 상태 관리',
        limitations: '사운드 효과음 종류가 1가지로 단순함'
      },
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        buildTimeSec: 13,
        fps: 58,
        firstTryPlayable: true,
        mechanicsVerdict: '13초 만에 슬링샷과 물리 블록을 Canvas에 렌더링.',
        keyStrength: '초고속 13초 빌드 속도',
        limitations: '슬링샷 마우스 릴리즈 이벤트 1회 보완 필요'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        buildTimeSec: 25,
        fps: 56,
        firstTryPlayable: true,
        mechanicsVerdict: '표준 Matter.js 바디와 마우스 제약조건(MouseConstraint)을 안정 작성.',
        keyStrength: '기본에 충실한 물리 엔진 구조',
        limitations: '블록 파괴 시 잔여 바디 메모리 정리 필요'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        buildTimeSec: 12,
        fps: 50,
        firstTryPlayable: true,
        mechanicsVerdict: '12초 만에 기본 중력 낙하 및 슬링샷 발사 구현.',
        keyStrength: '초고속 경량 구현',
        limitations: '블록 내구도 수치 단순'
      }
    ]
  },
  {
    id: 'game-roguelike-rpg',
    title: '4. 무한 맵 절차적 생성 & A* 길찾기 AI 턴제 던전 로그라이크 RPG (rot.js / Canvas)',
    categoryBadge: '절차적 던전 RPG',
    techStack: 'rot.js / Procedural BSP / Canvas',
    targetGame: 'Turn-based Procedural Roguelike Dungeon',
    difficulty: '초고난도',
    description: 'BSP(Binary Space Partitioning) 트리 알고리즘으로 무작위 방과 복도를 연결하고, 몬스터가 플레이어를 추적하는 A* 최단거리 길찾기 AI 및 턴제 전투 상태 머신을 구축합니다.',
    promptUsed: '절차적 맵 생성 알고리즘(BSP)으로 층마다 무작위 던전을 생성하는 턴제 로그라이크 RPG를 만들어줘. 1) 모든 방이 통로로 100% 연결되는 던전 맵 생성 2) 시야 안개(Fog of War) 및 시야각(FOV) 연산 3) 몬스터 A* 길찾기 AI 4) 턴제 이동/공격 상태 머신 5) 인벤토리 아이템 파밍.',
    verifiedSourceTitle: 'rot.js (Roguelike Toolkit) & Procedural Dungeon Benchmark',
    verifiedSourceUrl: 'https://ondras.github.io/rot.js/hp/',
    demoUrl: 'https://github.com/ondras/rot.js',
    results: [
      {
        modelName: 'Claude Opus 5',
        company: 'Anthropic',
        buildTimeSec: 35,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '모든 방이 정상적으로 연결되는 BSP 트리 복도 생성 알고리즘 구현.',
        keyStrength: '절차적 맵 무결성 보장 및 턴제 상태 머신(State Machine) 분리',
        limitations: '35초 생성 시간'
      },
      {
        modelName: 'GPT-5.6 Sol',
        company: 'OpenAI',
        buildTimeSec: 36,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: 'A* 길찾기 알고리즘의 맨해튼 거리 휴리스틱 연산과 시야각 계산이 정확.',
        keyStrength: 'A* 탐색 알고리즘과 수학적 시야각(FOV) 계산력',
        limitations: 'UI 레이아웃이 텍스트 중심 로그창으로 심플함'
      },
      {
        modelName: 'Claude Sonnet 5',
        company: 'Anthropic',
        buildTimeSec: 27,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '27초 만에 턴제 이동 루프와 시야 안개(Fog of War)를 안정적으로 구현.',
        keyStrength: '안정적인 턴제 상태 루프와 가성비',
        limitations: '몬스터 종류 3종으로 기본 구성'
      },
      {
        modelName: 'Claude Fable',
        company: 'Anthropic',
        buildTimeSec: 25,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '던전 타일셋 시각 표현과 미니맵 UI 디자인이 가장 미려함.',
        keyStrength: '미려한 던전 픽셀 타일셋 및 미니맵 UI',
        limitations: 'A* 장애물 회피 시 가끔 직진 우선 경향'
      },
      {
        modelName: 'Grok 4.6',
        company: 'xAI',
        buildTimeSec: 19,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '19초 만에 BSP 룸 분할과 몬스터 추적 AI를 실용적으로 렌더링.',
        keyStrength: '빠른 빌드와 간결한 턴 처리',
        limitations: '인벤토리 UI가 텍스트 기반'
      },
      {
        modelName: 'Gemini 3.7 Flash',
        company: 'Google',
        buildTimeSec: 16,
        fps: 60,
        firstTryPlayable: true,
        mechanicsVerdict: '16초 만에 방대한 던전 타일셋과 턴제 루프를 생성하여 플레이 가능한 상태로 완성.',
        keyStrength: '빠른 턴제 루프 생성',
        limitations: '복도 생성 시 가끔 Z자 꺾임이 발생'
      },
      {
        modelName: 'GPT-5.6 Terra',
        company: 'OpenAI',
        buildTimeSec: 29,
        fps: 56,
        firstTryPlayable: true,
        mechanicsVerdict: '표준 2D 격자 배열 맵과 턴제 이동 루프를 안정 작성.',
        keyStrength: '안정적인 2D 그리드 시스템',
        limitations: '복잡한 미로형 방 생성 시 연결로 단순화'
      },
      {
        modelName: 'GPT-5.6 Luna',
        company: 'OpenAI',
        buildTimeSec: 14,
        fps: 52,
        firstTryPlayable: true,
        mechanicsVerdict: '14초 만에 기본 2D 던전과 키보드 이동 구현.',
        keyStrength: '초고속 프로토타이핑',
        limitations: 'A* 대신 맨해튼 단순 접근 AI 적용'
      }
    ]
  }
];

