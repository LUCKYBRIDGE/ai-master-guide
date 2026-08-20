export const MODEL_DATA_SNAPSHOT = {
  verifiedAt: '2026-08-20',
  localeDate: '2026년 8월 20일',
  policy:
    '공식 API 사양과 원문이 공개된 평가 결과만 수록합니다. 출처가 다른 점수는 합산하거나 임의 순위로 변환하지 않습니다.',
};

export interface SourceReference {
  title: string;
  publisher: string;
  url: string;
  publishedAt?: string;
}

export interface VerifiedModelSpec {
  id: string;
  modelName: string;
  koreanName: string;
  companyName: string;
  apiModelId: string;
  releaseDate: string;
  role: string;
  contextWindowTokens: number;
  maxOutputTokens: number | null;
  inputCostPer1M: number;
  outputCostPer1M: number;
  priceLabel: string;
  priceNote: string;
  inputModalities: string;
  outputModalities: string;
  badgeColor: string;
  sources: SourceReference[];
}

export interface IndependentMeasurement {
  modelId: string;
  modelName: string;
  effort: string;
  intelligenceIndex: number;
  outputTokensPerSecond: number;
  costPerIndexTaskUsd: number;
  sourceUrl: string;
  caveat?: string;
}

export interface BenchmarkResult {
  modelId: string;
  modelName: string;
  score: number | null;
  effort: string;
}

export interface PublishedBenchmark {
  id: string;
  title: string;
  category: '코딩' | '터미널' | '업무' | '에이전트' | '3D·게임';
  metric: string;
  description: string;
  evaluator: string;
  harness: string;
  sampleInfo: string;
  source: SourceReference;
  warning: string;
  results: BenchmarkResult[];
}

export interface OpenAiPublishedBenchmarkRow {
  benchmark: string;
  metric: string;
  sol: number;
  terra: number;
  luna: number;
  fable: number;
}

export interface ArtifactBenchmarkMetric {
  metric: string;
  unit: '%' | 'M tokens' | 'minutes';
  higherIsBetter: boolean;
  sol: number;
  opus: number;
  fable: number;
  terra: number;
}

export const VERIFIED_MODEL_SPECS: VerifiedModelSpec[] = [
  {
    id: 'claude-opus-5',
    modelName: 'Claude Opus 5',
    koreanName: '클로드 오퍼스 5',
    companyName: 'Anthropic',
    apiModelId: 'claude-opus-5',
    releaseDate: '2026-07-24',
    role: '복잡한 에이전트 코딩과 엔터프라이즈 작업',
    contextWindowTokens: 1_000_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 5,
    outputCostPer1M: 25,
    priceLabel: '$5 / $25',
    priceNote: 'Claude API 기본 모드. Fast mode는 기본 가격의 2배.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    sources: [
      {
        title: 'Claude Opus 5 발표',
        publisher: 'Anthropic',
        url: 'https://www.anthropic.com/news/claude-opus-5',
        publishedAt: '2026-07-24',
      },
      {
        title: 'Claude Platform release notes',
        publisher: 'Anthropic',
        url: 'https://platform.claude.com/docs/en/release-notes/overview',
      },
    ],
  },
  {
    id: 'claude-fable-5',
    modelName: 'Claude Fable 5',
    koreanName: '클로드 페이블 5',
    companyName: 'Anthropic',
    apiModelId: 'claude-fable-5',
    releaseDate: '2026-06-09',
    role: '가장 까다로운 추론과 장기 실행 에이전트 작업',
    contextWindowTokens: 1_000_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 10,
    outputCostPer1M: 50,
    priceLabel: '$10 / $50',
    priceNote: 'Claude API 표준 가격. 일부 민감 영역은 거절 또는 fallback이 발생할 수 있음.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    sources: [
      {
        title: 'Claude Fable 5 / Mythos 5 모델 안내',
        publisher: 'Anthropic',
        url: 'https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5',
        publishedAt: '2026-06-09',
      },
    ],
  },
  {
    id: 'gpt-5-6-sol',
    modelName: 'GPT-5.6 Sol',
    koreanName: 'GPT-5.6 솔',
    companyName: 'OpenAI',
    apiModelId: 'gpt-5.6-sol',
    releaseDate: '2026-07-09',
    role: '복잡한 전문 업무를 위한 GPT-5.6 플래그십',
    contextWindowTokens: 1_050_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 5,
    outputCostPer1M: 30,
    priceLabel: '$5 / $30',
    priceNote: 'OpenAI API Standard. 272K 초과 입력은 장문 컨텍스트 할증 적용.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    sources: [
      {
        title: 'GPT-5.6 Sol 모델 사양',
        publisher: 'OpenAI',
        url: 'https://developers.openai.com/api/docs/models/gpt-5.6-sol',
      },
      {
        title: 'GPT-5.6 공개 발표',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/gpt-5-6/',
        publishedAt: '2026-07-09',
      },
    ],
  },
  {
    id: 'grok-4-6',
    modelName: 'Grok 4.6',
    koreanName: '그록 4.6',
    companyName: 'SpaceXAI / xAI',
    apiModelId: 'grok-4.6',
    releaseDate: '2026-08-12',
    role: '코딩과 도구 호출을 포함한 범용 플래그십',
    contextWindowTokens: 500_000,
    maxOutputTokens: null,
    inputCostPer1M: 2,
    outputCostPer1M: 6,
    priceLabel: '$2 / $6',
    priceNote: 'SpaceXAI API 공개 모델 표 기준. 공식 페이지에 최대 출력 토큰은 별도 기재되지 않음.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    sources: [
      {
        title: 'Grok models & pricing',
        publisher: 'SpaceXAI',
        url: 'https://docs.x.ai/developers/models',
      },
      {
        title: 'Grok 4.6 model card',
        publisher: 'SpaceXAI',
        url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf',
        publishedAt: '2026-08',
      },
    ],
  },
  {
    id: 'gpt-5-6-terra',
    modelName: 'GPT-5.6 Terra',
    koreanName: 'GPT-5.6 테라',
    companyName: 'OpenAI',
    apiModelId: 'gpt-5.6-terra',
    releaseDate: '2026-07-09',
    role: '지능과 비용의 균형을 위한 일상 업무 모델',
    contextWindowTokens: 1_050_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 2,
    outputCostPer1M: 12,
    priceLabel: '$2 / $12',
    priceNote: '2026-07-30 인하된 OpenAI API Standard 가격. 272K 초과 입력은 할증 적용.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    sources: [
      {
        title: 'GPT-5.6 Terra 모델 사양',
        publisher: 'OpenAI',
        url: 'https://developers.openai.com/api/docs/models/gpt-5.6-terra',
      },
      {
        title: 'GPT-5.6 가격 인하 발표',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/',
        publishedAt: '2026-07-30',
      },
    ],
  },
  {
    id: 'claude-sonnet-5',
    modelName: 'Claude Sonnet 5',
    koreanName: '클로드 소넷 5',
    companyName: 'Anthropic',
    apiModelId: 'claude-sonnet-5',
    releaseDate: '2026-06-30',
    role: '속도와 지능의 균형, 코딩·에이전트 작업',
    contextWindowTokens: 1_000_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 2,
    outputCostPer1M: 10,
    priceLabel: '$2 / $10',
    priceNote: '2026-08-31까지 도입 가격. 이후 표준 가격은 $3 / $15.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    sources: [
      {
        title: 'Claude Sonnet 5 모델 안내',
        publisher: 'Anthropic',
        url: 'https://platform.claude.com/docs/en/about-claude/models/whats-new-sonnet-5',
        publishedAt: '2026-06-30',
      },
    ],
  },
  {
    id: 'gpt-5-6-luna',
    modelName: 'GPT-5.6 Luna',
    koreanName: 'GPT-5.6 루나',
    companyName: 'OpenAI',
    apiModelId: 'gpt-5.6-luna',
    releaseDate: '2026-07-09',
    role: '비용 민감형 대량 처리와 빠른 에이전트 작업',
    contextWindowTokens: 1_050_000,
    maxOutputTokens: 128_000,
    inputCostPer1M: 0.2,
    outputCostPer1M: 1.2,
    priceLabel: '$0.20 / $1.20',
    priceNote: '2026-07-30 인하된 OpenAI API Standard 가격. 272K 초과 입력은 할증 적용.',
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    sources: [
      {
        title: 'GPT-5.6 Luna 모델 사양',
        publisher: 'OpenAI',
        url: 'https://developers.openai.com/api/docs/models/gpt-5.6-luna',
      },
      {
        title: 'GPT-5.6 가격 인하 발표',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/',
        publishedAt: '2026-07-30',
      },
    ],
  },
  {
    id: 'gemini-3-7-flash',
    modelName: 'Gemini 3.7 Flash',
    koreanName: '제미나이 3.7 플래시',
    companyName: 'Google',
    apiModelId: 'gemini-3.7-flash',
    releaseDate: '2026-08-13 문서 갱신',
    role: '에이전트 워크플로와 멀티모달 추론을 위한 Flash 모델',
    contextWindowTokens: 1_048_576,
    maxOutputTokens: 65_536,
    inputCostPer1M: 0.75,
    outputCostPer1M: 3.75,
    priceLabel: '$0.75 / $3.75',
    priceNote: '2026-12-31까지 Standard 도입 가격. 출력 가격에는 thinking tokens 포함.',
    inputModalities: '텍스트·이미지·비디오·오디오·PDF',
    outputModalities: '텍스트',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    sources: [
      {
        title: 'Gemini 3.7 Flash 모델 사양',
        publisher: 'Google',
        url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.7-flash',
      },
      {
        title: 'Gemini Developer API pricing',
        publisher: 'Google',
        url: 'https://ai.google.dev/gemini-api/docs/pricing',
      },
    ],
  },
];

// Artificial Analysis Intelligence Index v4.1.1. 각 행은 동일 기관의 현재 모델 페이지에서
// max effort 설정과 first-party API 측정값을 옮겼다. Grok 4.6과 Gemini 3.7 Flash는
// 이 스냅샷에서 동일 조건의 공개 모델 페이지가 확인되지 않아 임의 보간하지 않는다.
export const INDEPENDENT_MEASUREMENTS: IndependentMeasurement[] = [
  {
    modelId: 'claude-opus-5',
    modelName: 'Claude Opus 5',
    effort: 'max',
    intelligenceIndex: 63,
    outputTokensPerSecond: 60.6,
    costPerIndexTaskUsd: 2.34,
    sourceUrl: 'https://artificialanalysis.ai/models/claude-opus-5',
  },
  {
    modelId: 'claude-fable-5',
    modelName: 'Claude Fable 5',
    effort: 'max · Opus 4.8 fallback',
    intelligenceIndex: 62,
    outputTokensPerSecond: 66.4,
    costPerIndexTaskUsd: 3.14,
    sourceUrl: 'https://artificialanalysis.ai/models/claude-fable-5/',
    caveat: '안전 분류기 거절 시 Opus 4.8 fallback을 허용한 측정값.',
  },
  {
    modelId: 'gpt-5-6-sol',
    modelName: 'GPT-5.6 Sol',
    effort: 'max',
    intelligenceIndex: 61,
    outputTokensPerSecond: 67.8,
    costPerIndexTaskUsd: 1.23,
    sourceUrl: 'https://artificialanalysis.ai/models/gpt-5-6-sol',
  },
  {
    modelId: 'gpt-5-6-terra',
    modelName: 'GPT-5.6 Terra',
    effort: 'max',
    intelligenceIndex: 57,
    outputTokensPerSecond: 118.1,
    costPerIndexTaskUsd: 0.51,
    sourceUrl: 'https://artificialanalysis.ai/models/gpt-5-6-terra',
  },
  {
    modelId: 'claude-sonnet-5',
    modelName: 'Claude Sonnet 5',
    effort: 'max',
    intelligenceIndex: 55,
    outputTokensPerSecond: 84.8,
    costPerIndexTaskUsd: 1.72,
    sourceUrl: 'https://artificialanalysis.ai/models/claude-sonnet-5',
  },
  {
    modelId: 'gpt-5-6-luna',
    modelName: 'GPT-5.6 Luna',
    effort: 'max',
    intelligenceIndex: 52,
    outputTokensPerSecond: 153.7,
    costPerIndexTaskUsd: 0.05,
    sourceUrl: 'https://artificialanalysis.ai/models/gpt-5-6-luna',
  },
];

const noScore = (modelId: string, modelName: string): BenchmarkResult => ({
  modelId,
  modelName,
  score: null,
  effort: '해당 원문에 미보고',
});

// 최신 세대 모델을 함께 싣고 있는 Grok 4.6 공식 모델 카드의 수치.
// 모델별 effort/harness가 완전히 동일하지 않은 경우를 각 표의 경고에 명시한다.
export const PUBLISHED_BENCHMARKS: PublishedBenchmark[] = [
  {
    id: 'frontier-code-1-1',
    title: 'FrontierCode v1.1',
    category: '코딩',
    metric: 'Extended score (%)',
    description: '오픈소스 유지관리자가 PR을 병합할 수 있는지 정확성·회귀·범위 준수·스타일·테스트로 평가합니다.',
    evaluator: 'Cognition',
    harness: 'Grok Build 및 각 모델 보고 설정',
    sampleInfo: 'Extended set 150 samples',
    source: {
      title: 'Grok 4.6 Model Card §2.3',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=10',
      publishedAt: '2026-08',
    },
    warning: 'Cognition이 평가한 결과를 SpaceXAI 모델 카드가 인용합니다. 모델별 에이전트 하네스가 완전히 같지는 않습니다.',
    results: [
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 64.9, effort: 'max · fallback' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 63.6, effort: 'max' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 61.3, effort: 'high' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', score: 60.6, effort: 'max' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 56.2, effort: 'max' },
      noScore('gpt-5-6-terra', 'GPT-5.6 Terra'),
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
  {
    id: 'deep-swe-1-1',
    title: 'DeepSWE v1.1',
    category: '코딩',
    metric: 'Pass@1 (%)',
    description: '오염 저항성을 중시한 장기 실행 소프트웨어 엔지니어링 작업의 종단 간 완료율입니다.',
    evaluator: 'Datacurve',
    harness: 'Grok: mini-swe-agent · 타 모델: 모델 카드/평가기관 최고 보고치',
    sampleInfo: 'Pass@1',
    source: {
      title: 'Grok 4.6 Model Card §2.4',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=11',
      publishedAt: '2026-08',
    },
    warning: '비-Grok 점수는 각 모델 카드 또는 평가기관의 최고 보고치이므로 완전한 동일 하네스 대조가 아닙니다.',
    results: [
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 74, effort: 'max' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', score: 73, effort: 'max' },
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 70, effort: 'max · fallback' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 67, effort: 'xhigh' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 54, effort: 'max' },
      noScore('gpt-5-6-terra', 'GPT-5.6 Terra'),
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
  {
    id: 'terminal-bench-3',
    title: 'Terminal-Bench 3.0',
    category: '터미널',
    metric: 'Task success rate (%)',
    description: '컨테이너 안에서 소프트웨어·ML·과학·보안·운영 작업을 수행하는 터미널 에이전트 평가입니다.',
    evaluator: 'Harbor',
    harness: 'Grok Build 및 평가기관 보고 하네스',
    sampleInfo: 'Terminal-Bench 3.0 refreshed task set',
    source: {
      title: 'Grok 4.6 Model Card §2.6',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=13',
      publishedAt: '2026-08',
    },
    warning: 'Terminal-Bench 2.1 결과와 직접 비교할 수 없습니다. 3.0은 태스크와 하네스가 갱신됐습니다.',
    results: [
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 43.5, effort: 'max' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', score: 34.6, effort: 'max' },
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 34.1, effort: 'max · fallback' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 26, effort: 'high' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 14.6, effort: 'max' },
      noScore('gpt-5-6-terra', 'GPT-5.6 Terra'),
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
  {
    id: 'gdpval-aa-v2',
    title: 'GDPval-AA v2',
    category: '업무',
    metric: 'Elo',
    description: '문서·분석·전문 산출물 등 경제적 가치가 있는 지식 업무를 쌍대 비교로 평가합니다.',
    evaluator: 'Artificial Analysis',
    harness: 'Artificial Analysis GDPval-AA v2 harness',
    sampleInfo: 'Pairwise quality rating · Elo',
    source: {
      title: 'Grok 4.6 Model Card §3.1',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=14',
      publishedAt: '2026-08',
    },
    warning: 'Elo는 해당 평가 풀과 시점에 종속됩니다. 다른 버전의 GDPval 결과와 숫자를 합치지 않습니다.',
    results: [
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 1849, effort: 'max' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 1753, effort: 'high' },
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 1741, effort: 'max · fallback' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', score: 1728, effort: 'max' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 1601, effort: 'max' },
      { modelId: 'gpt-5-6-terra', modelName: 'GPT-5.6 Terra', score: 1578, effort: 'max' },
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
  {
    id: 'apex-agents',
    title: 'APEX-Agents',
    category: '에이전트',
    metric: 'Pass@1 (%)',
    description: '투자은행·컨설팅·기업 법무의 여러 앱을 오가는 장기 전문 업무를 모든 기준 통과 방식으로 평가합니다.',
    evaluator: 'Mercor',
    harness: 'Mercor harness',
    sampleInfo: 'Expert binary rubrics · all criteria required',
    source: {
      title: 'Grok 4.6 Model Card §3.3',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=16',
      publishedAt: '2026-08',
    },
    warning: '모델별 effort가 다르며 Fable 5는 fallback 허용 결과입니다.',
    results: [
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 60.6, effort: 'max' },
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 59.2, effort: 'max · fallback' },
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 57.5, effort: 'high' },
      { modelId: 'gpt-5-6-sol', modelName: 'GPT-5.6 Sol', score: 56.7, effort: 'max' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 32.5, effort: 'high' },
      noScore('gpt-5-6-terra', 'GPT-5.6 Terra'),
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
  {
    id: '3d-code-bench',
    title: '3DCodeBench',
    category: '3D·게임',
    metric: 'Reward (%)',
    description: '코드로 엔진용 3D 자산을 만들고 실행 가능성과 형상 충실도를 평가하는 공개 연구 벤치마크입니다.',
    evaluator: '3DCodeBench 연구진',
    harness: 'Grok Build 및 모델별 보고 설정',
    sampleInfo: 'Executability + shape fidelity',
    source: {
      title: 'Grok 4.6 Model Card §4.2',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=20',
      publishedAt: '2026-08',
    },
    warning: '브라우저 FPS가 아니라 생성된 3D 자산의 실행 가능성과 형상 충실도를 평가한 결과입니다.',
    results: [
      { modelId: 'grok-4-6', modelName: 'Grok 4.6', score: 54, effort: 'high' },
      { modelId: 'claude-opus-5', modelName: 'Claude Opus 5', score: 49.9, effort: 'max' },
      { modelId: 'claude-fable-5', modelName: 'Claude Fable 5', score: 43.7, effort: 'max · fallback' },
      { modelId: 'claude-sonnet-5', modelName: 'Claude Sonnet 5', score: 39.2, effort: 'max' },
      noScore('gpt-5-6-sol', 'GPT-5.6 Sol'),
      noScore('gpt-5-6-terra', 'GPT-5.6 Terra'),
      noScore('gpt-5-6-luna', 'GPT-5.6 Luna'),
      noScore('gemini-3-7-flash', 'Gemini 3.7 Flash'),
    ],
  },
];

// OpenAI의 2026-07-09 GPT-5.6 공개 자료에 실린 동일 표의 값.
// 위 SpaceXAI 카드의 갱신된 벤치마크와 섞지 않고 별도 데이터셋으로 표시한다.
export const OPENAI_PUBLISHED_BENCHMARKS: OpenAiPublishedBenchmarkRow[] = [
  { benchmark: 'AA Coding Agent Index v1.1', metric: 'Index', sol: 80, terra: 77.4, luna: 74.6, fable: 77.2 },
  { benchmark: 'SWE-Bench Pro', metric: '%', sol: 64.6, terra: 63.4, luna: 62.7, fable: 80 },
  { benchmark: 'DeepSWE v1.1', metric: '%', sol: 72.7, terra: 69.6, luna: 67.2, fable: 69.7 },
  { benchmark: 'Terminal-Bench 2.1', metric: '%', sol: 88.8, terra: 87.4, luna: 84.7, fable: 83.1 },
  { benchmark: 'GDPval-AA v2', metric: 'Elo', sol: 1747.8, terra: 1593, luna: 1591.8, fable: 1759.6 },
];

export const OPENAI_BENCHMARK_SOURCE: SourceReference = {
  title: 'GPT-5.6 공개 평가표',
  publisher: 'OpenAI',
  url: 'https://openai.com/index/gpt-5-6/',
  publishedAt: '2026-07-09',
};

export const POWERPOINT_ARTIFACT_BENCHMARK: ArtifactBenchmarkMetric[] = [
  { metric: 'Deck quality', unit: '%', higherIsBetter: true, sol: 59.9, opus: 56.7, fable: 59.3, terra: 52.5 },
  { metric: 'Professional readiness', unit: '%', higherIsBetter: true, sol: 43.3, opus: 26.7, fable: 32, terra: 17.3 },
  { metric: 'PPTX produced', unit: '%', higherIsBetter: true, sol: 100, opus: 76, fable: 82, terra: 80 },
  { metric: 'Visual quality', unit: '%', higherIsBetter: true, sol: 77.9, opus: 79.3, fable: 78.9, terra: 74.4 },
  { metric: 'Tokens per deck', unit: 'M tokens', higherIsBetter: false, sol: 1.1, opus: 0.953, fable: 1.4, terra: 0.72 },
];

export const EXCEL_ARTIFACT_BENCHMARK: ArtifactBenchmarkMetric[] = [
  { metric: 'Key outputs correct', unit: '%', higherIsBetter: true, sol: 83.3, opus: 82.8, fable: 80.6, terra: 82.2 },
  { metric: 'Fully correct workbooks', unit: '%', higherIsBetter: true, sol: 50, opus: 60, fable: 60, terra: 53.3 },
  { metric: 'Expected outputs located', unit: '%', higherIsBetter: true, sol: 100, opus: 100, fable: 100, terra: 98.9 },
  { metric: 'Workbook contract passed', unit: '%', higherIsBetter: true, sol: 100, opus: 100, fable: 100, terra: 100 },
  { metric: 'Tokens per workbook', unit: 'M tokens', higherIsBetter: false, sol: 2.44, opus: 3.83, fable: 2.59, terra: 1.64 },
  { metric: 'Wall clock', unit: 'minutes', higherIsBetter: false, sol: 7, opus: 7.5, fable: 8.4, terra: 4.2 },
];

export const MODEL_ML_BENCHMARK_SOURCE: SourceReference = {
  title: 'Model ML Composite: native PowerPoint & Excel creation',
  publisher: 'Model ML / OpenAI customer story',
  url: 'https://openai.com/index/model-ml/',
  publishedAt: '2026-08-10',
};

export const EVIDENCE_RULES = [
  '공식 사양과 가격은 각 제공사의 현재 API 문서를 우선합니다.',
  '독립 측정값은 평가기관·버전·effort가 같은 경우에만 한 표에서 비교합니다.',
  '제조사 모델 카드의 교차 비교는 발행 주체와 하네스 차이를 함께 표시합니다.',
  '보고되지 않은 값은 0점으로 처리하지 않고 “미보고”로 남깁니다.',
  '자체 실행 로그·원본 산출물·반복 횟수가 없으면 “사이트 실측”이라고 부르지 않습니다.',
];

export const REPRODUCIBLE_LAB_REQUIREMENTS = [
  '고정 입력 파일과 공개 프롬프트, 모델 snapshot/alias, effort, 도구 권한을 기록합니다.',
  '모델·과제별 최소 20회 반복하고 성공 수/전체 수와 95% 신뢰구간을 함께 계산합니다.',
  '입력·캐시·추론·출력 토큰을 분리해 공식 가격표로 비용을 재계산합니다.',
  '코드는 동일 컨테이너에서 빌드·테스트·정적 분석하고 원본 출력과 로그를 보존합니다.',
  'UI·게임은 같은 브라우저·CPU·GPU·해상도에서 uncapped FPS와 p50/p95를 측정합니다.',
  '블라인드 평가는 모델명을 가린 산출물, 평가자 수, 루브릭, 원점수를 공개합니다.',
];
