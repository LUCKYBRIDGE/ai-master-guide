export const MODEL_DATA_SNAPSHOT = {
  verifiedAt: '2026-08-22',
  localeDate: '2026년 8월 22일',
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
  maxOutputNote?: string;
  inputCostPer1M: number;
  outputCostPer1M: number;
  priceLabel: string;
  priceNote: string;
  priceTiming: {
    current: string;
    previous?: string;
    scheduled?: string;
  };
  longContextPricing?: {
    thresholdTokens: number;
    inputCostPer1M: number;
    cachedInputCostPer1M?: number;
    outputCostPer1M: number;
    label: string;
  };
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
  easyExplanation: string;
  exampleTask: string;
  scoreMeaning: string;
  evaluator: string;
  harness: string;
  sampleInfo: string;
  source: SourceReference;
  warning: string;
  results: BenchmarkResult[];
}

export interface PublishedComparisonColumn {
  id: string;
  label: string;
}

export interface PublishedComparisonRow {
  benchmark: string;
  metric: string;
  easyExplanation: string;
  scoreMeaning: string;
  caveat?: string;
  values: Record<string, number | null>;
}

export interface PublishedComparisonGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  columns: PublishedComparisonColumn[];
  rows: PublishedComparisonRow[];
}

export interface ArtifactBenchmarkMetric {
  metric: string;
  easyExplanation: string;
  unit: '%' | 'M tokens' | 'minutes';
  higherIsBetter: boolean;
  sol: number;
  opus: number;
  fable: number;
  terra: number;
}

export interface OfficialLeaderboardRun {
  harness: string;
  modelName: string;
  effort: string;
  passRate: number;
  partialScore: number;
  estimatedCostUsd: number | null;
  totalRuntime: string | null;
  note?: string;
}

export interface ExternalBenchmarkResource {
  id: string;
  title: string;
  category: string;
  easyExplanation: string;
  bestFor: string;
  scoreGuide: string;
  comparabilityNote: string;
  source: SourceReference;
}

export interface CostEfficiencyUpdate {
  id: string;
  provider: string;
  priceAnnouncementDate: string;
  title: string;
  summary: string;
  practicalMeaning: string;
  caveat: string;
  source: SourceReference;
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
    priceTiming: { current: '모델 공개 시점부터 적용 · 2026-07-24' },
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
    priceTiming: { current: '모델 공개 시점부터 적용 · 2026-06-09' },
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
    priceTiming: { current: '모델 공개 시점 기준 · 2026-07-09', scheduled: '2026-07-30 가격 인하 발표에서 Sol 단가는 변경 없음' },
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
    maxOutputNote: '텍스트 출력 제한 없음',
    inputCostPer1M: 2,
    outputCostPer1M: 6,
    priceLabel: '$2 / $6 (≤200K) · $4 / $12 (>200K)',
    priceNote: '입력 200K 토큰 이하/초과에 서로 다른 Standard API 단가 적용. 캐시 입력은 각각 $0.50 / $1.',
    priceTiming: { current: '출시와 가격 동시 공지 · 2026-08-12' },
    longContextPricing: {
      thresholdTokens: 200_000,
      inputCostPer1M: 4,
      cachedInputCostPer1M: 1,
      outputCostPer1M: 12,
      label: 'Grok 4.6 200K 초과 장문 컨텍스트 단가',
    },
    inputModalities: '텍스트·이미지',
    outputModalities: '텍스트',
    badgeColor: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    sources: [
      {
        title: 'Grok 4.6 release notes',
        publisher: 'SpaceXAI',
        url: 'https://docs.x.ai/developers/release-notes',
        publishedAt: '2026-08-12',
      },
      {
        title: 'Grok 4.6 model specification',
        publisher: 'SpaceXAI',
        url: 'https://docs.x.ai/developers/grok-4-6',
      },
      {
        title: 'Grok 4.6 model card',
        publisher: 'SpaceXAI',
        url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf',
        publishedAt: '2026-08-12',
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
    priceTiming: { current: '현재 단가 적용 · 2026-07-30부터', previous: '이전 $2.50 / $15 · 2026-07-29까지' },
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
    priceNote: '$2 / $10 도입 가격이 2026-08-10부터 표준 가격으로 전환됨.',
    priceTiming: { current: '표준 가격 $2 / $10 · 2026-08-10부터', previous: '도입 가격 $2 / $10 · 2026-06-30~2026-08-09' },
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
      {
        title: 'Claude Platform release notes',
        publisher: 'Anthropic',
        url: 'https://platform.claude.com/docs/en/release-notes/overview',
        publishedAt: '2026-08-10',
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
    priceTiming: { current: '현재 단가 적용 · 2026-07-30부터', previous: '이전 $1 / $6 · 2026-07-29까지' },
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
    releaseDate: '2026-08-13 (GA)',
    role: '에이전트 워크플로와 멀티모달 추론을 위한 Flash 모델',
    contextWindowTokens: 1_048_576,
    maxOutputTokens: 65_536,
    inputCostPer1M: 0.75,
    outputCostPer1M: 3.75,
    priceLabel: '$0.75 / $3.75',
    priceNote: '2026-12-31까지 Standard 도입 가격. 출력 가격에는 thinking tokens 포함.',
    priceTiming: { current: '도입 가격 적용 · 2026-12-31까지', scheduled: '예정 표준 가격 $1.50 / $7.50 · 2027-01-01부터' },
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
        title: 'Gemini API changelog',
        publisher: 'Google',
        url: 'https://ai.google.dev/gemini-api/docs/changelog',
        publishedAt: '2026-08-13',
      },
      {
        title: 'Gemini Developer API pricing',
        publisher: 'Google',
        url: 'https://ai.google.dev/gemini-api/docs/pricing',
      },
    ],
  },
];

// 2026-08-22에 제공사 원문에서 다시 확인한 가격·토큰 효율 변경이다.
// 제공사 발표의 효율 수치는 해당 제공사의 설명이므로, 독립 성능 측정이나 보편적 절감률로 바꾸지 않는다.
export const VERIFIED_COST_EFFICIENCY_UPDATES: CostEfficiencyUpdate[] = [
  {
    id: 'openai-gpt-5-6-price-cut',
    provider: 'OpenAI',
    priceAnnouncementDate: '2026-07-30',
    title: 'GPT-5.6 Terra·Luna API 가격 인하',
    summary: 'Terra는 입력/출력 $2.50/$15에서 $2/$12로 20%, Luna는 $1/$6에서 $0.20/$1.20로 80% 인하됐습니다. (각 100만 토큰당)',
    practicalMeaning: '대량 분류·정형 작업에는 Luna, 품질과 비용을 함께 보려면 Terra의 현재 Standard 단가를 계산기에 적용하면 됩니다.',
    caveat: 'Sol 가격은 그대로입니다. Fast mode는 더 빠르지만 Standard의 2배 가격이며, 긴 요청·도구 호출 비용도 별도로 발생할 수 있습니다.',
    source: {
      title: 'GPT-5.6 가격·속도 업데이트',
      publisher: 'OpenAI',
      url: 'https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/',
      publishedAt: '2026-07-30',
    },
  },
  {
    id: 'openai-gpt-5-6-cache-pricing',
    provider: 'OpenAI',
    priceAnnouncementDate: '2026-07-09',
    title: '반복 입력은 캐시 읽기 요금으로 분리',
    summary: 'GPT-5.6부터 캐시 읽기는 일반 입력 단가의 10%이고, 캐시 쓰기는 일반 입력 단가의 1.25배입니다.',
    practicalMeaning: '같은 긴 시스템 지침·문서를 정확히 재사용하는 다회 요청이라면, 단순 입력 토큰 합계보다 실제 비용이 낮아질 수 있습니다.',
    caveat: '캐시 적중은 프롬프트 구성과 재사용 방식에 좌우됩니다. 첫 요청·캐시 쓰기·출력·추론 토큰은 별도로 청구되므로 90% 절감을 모든 요청에 적용하면 안 됩니다.',
    source: {
      title: 'GPT-5.6 출시 및 프롬프트 캐싱 안내',
      publisher: 'OpenAI',
      url: 'https://openai.com/index/gpt-5-6/',
      publishedAt: '2026-07-09',
    },
  },
  {
    id: 'google-gemini-3-7-introductory-pricing',
    provider: 'Google',
    priceAnnouncementDate: '2026-08',
    title: 'Gemini 3.7 Flash 도입 가격과 만료일',
    summary: 'Gemini 3.7 Flash Standard는 2026-12-31까지 입력 $0.75·출력 $3.75이며, 이후 $1.50·$7.50로 안내됩니다. 출력 가격에는 thinking tokens가 포함됩니다. (각 100만 토큰당)',
    practicalMeaning: '현재 단가를 기준으로 예산을 잡되, 2027년 이후 장기 운영 예산은 표준 가격으로도 계산해 두어야 합니다.',
    caveat: '무료 티어와 Standard·Batch·Flex·Priority는 서로 다르고, Search/Maps grounding은 별도 사용량 요금이 생길 수 있습니다.',
    source: {
      title: 'Gemini 3.7 Flash 최신 모델·가격 안내',
      publisher: 'Google',
      url: 'https://ai.google.dev/gemini-api/docs/latest-model',
    },
  },
  {
    id: 'anthropic-sonnet-5-introductory-pricing',
    provider: 'Anthropic',
    priceAnnouncementDate: '2026-08-10',
    title: 'Claude Sonnet 5 도입 가격을 표준 가격으로 전환',
    summary: 'Sonnet 5의 입력/출력 $2/$10 도입 가격이 2026-08-10부터 표준 가격이 됐습니다. 기존에 안내되던 2026-09-01 $3/$15 전환은 최신 공식 릴리스 노트 기준으로 적용 예정 가격이 아닙니다. (각 100만 토큰당)',
    practicalMeaning: '9월 이후 예산에도 현재 Standard $2/$10을 기준으로 계산하되, 실제 도입 전 최신 Pricing 문서를 다시 확인합니다.',
    caveat: '캐시·배치·Fast mode·지역·플랫폼 조건은 별도 요금일 수 있습니다. 과거에 안내됐던 $3/$15를 현재 예정 가격으로 표시하지 않습니다.',
    source: {
      title: 'Claude Platform release notes',
      publisher: 'Anthropic',
      url: 'https://platform.claude.com/docs/en/release-notes/overview',
      publishedAt: '2026-08-10',
    },
  },
];

// Artificial Analysis Intelligence Index v4.1.1. 아래 값은 2026-08-20에 각 모델 페이지에서
// 관측해 고정한 스냅샷이다. 이후 페이지의 속도·비용 수치가 갱신되어도 이 과거 관측값을 최신값처럼 덮어쓰지 않는다.
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

export const INDEPENDENT_UNAVAILABLE_MODELS = [
  {
    modelId: 'grok-4-6',
    modelName: 'Grok 4.6',
    reason: 'v4.1.1 동일 조건의 완결된 모델 페이지를 확인하지 못함',
  },
  {
    modelId: 'gemini-3-7-flash',
    modelName: 'Gemini 3.7 Flash',
    reason: 'v4.1.1 동일 조건의 완결된 모델 페이지를 확인하지 못함',
  },
] as const;

export const INDEPENDENT_METHODOLOGY_SOURCE: SourceReference = {
  title: 'Artificial Analysis Intelligence Benchmarking methodology',
  publisher: 'Artificial Analysis',
  url: 'https://artificialanalysis.ai/methodology/intelligence-benchmarking',
};

export const INDEPENDENT_MEASUREMENT_SNAPSHOT = {
  version: 'Artificial Analysis Intelligence Index v4.1.1',
  snapshotLabel: '2026-08-20 관측 스냅샷',
  sourceCheckedAt: '2026-08-20',
  resultRunDate: '모델별 원문 미공개',
  costBasis: '각 모델 페이지에 표시된 “평가 과제당 비용”을 2026-08-20에 옮긴 값',
  warning:
    '이 값은 2026-08-20 관측 스냅샷이며 실시간 최신값이 아닙니다. 가격 인하·캐시·추론 토큰 정책 발표가 있더라도 자동 재계산하지 않고, 현재 비용은 최신 단가와 실제 사용 로그로 별도 계산해야 합니다.',
};

const noScore = (modelId: string, modelName: string): BenchmarkResult => ({
  modelId,
  modelName,
  score: null,
  effort: '이 원문의 같은 버전 표에 미보고 · 0점 아님',
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
    easyExplanation: 'AI에게 실제 프로젝트의 버그 수정이나 기능 변경을 맡기고, 사람이 그 수정본을 실제로 병합해도 될 수준인지 봅니다.',
    exampleTask: '여러 파일에 걸친 버그를 고치고 기존 테스트를 깨뜨리지 않도록 새 테스트까지 추가하기',
    scoreMeaning: '정확성·회귀 방지·요구 범위·코드 품질을 합친 비율입니다. 높을수록 좋지만 하네스가 다르면 모델 자체 능력만의 차이는 아닙니다.',
    evaluator: 'Cognition',
    harness: 'Grok Build 및 각 모델 보고 설정',
    sampleInfo: 'Extended set 150 samples',
    source: {
      title: 'Grok 4.6 Model Card §2.3',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=10',
      publishedAt: '2026-08-12',
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
    easyExplanation: 'AI가 큰 코드 저장소를 직접 살펴보고, 오래 걸리는 개발 과제를 처음부터 끝까지 한 번에 해결할 수 있는지 시험합니다.',
    exampleTask: '문제 원인을 찾고 여러 파일을 수정한 뒤 빌드와 테스트를 통과시키는 저장소 단위 작업',
    scoreMeaning: 'Pass@1은 첫 번째 시도에서 검증을 통과한 비율입니다. 73%라면 평가 과제의 약 73%를 첫 시도에 통과했다는 뜻입니다.',
    evaluator: 'Datacurve',
    harness: 'Grok: mini-swe-agent · 타 모델: 모델 카드/평가기관 최고 보고치',
    sampleInfo: 'Pass@1',
    source: {
      title: 'Grok 4.6 Model Card §2.4',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=11',
      publishedAt: '2026-08-12',
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
    easyExplanation: 'AI에게 새 컴퓨터의 명령줄만 주고, 파일 편집·프로그램 실행·서버 설정 같은 일을 실제로 끝낼 수 있는지 봅니다.',
    exampleTask: '오류가 난 프로그램을 조사하거나 데이터 파일을 변환하고, 최종 검증 명령까지 성공시키기',
    scoreMeaning: '전체 터미널 과제 중 자동 검증을 통과한 비율입니다. 버전 2.1과 3.0은 과제 구성이 달라 숫자를 직접 비교하면 안 됩니다.',
    evaluator: 'Harbor',
    harness: 'Grok Build 및 평가기관 보고 하네스',
    sampleInfo: 'Terminal-Bench 3.0 refreshed task set',
    source: {
      title: 'Grok 4.6 Model Card §2.6',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=13',
      publishedAt: '2026-08-12',
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
    easyExplanation: '두 AI에게 같은 회사 업무를 시킨 뒤, 어느 쪽 보고서나 분석 결과가 더 좋은지 서로 맞대결시켜 점수를 계산합니다.',
    exampleTask: '시장 조사 자료를 읽고 의사결정에 쓸 수 있는 분석 문서나 표를 완성하기',
    scoreMeaning: 'Elo는 승률을 반영한 상대 점수입니다. 1,800점이 1,700점보다 우세하다는 뜻이지, 업무를 80% 완료했다는 뜻은 아닙니다.',
    evaluator: 'Artificial Analysis',
    harness: 'Artificial Analysis GDPval-AA v2 harness',
    sampleInfo: 'Pairwise quality rating · Elo',
    source: {
      title: 'Grok 4.6 Model Card §3.1',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=14',
      publishedAt: '2026-08-12',
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
    easyExplanation: 'AI가 금융·컨설팅·법무 업무에서 여러 자료와 도구를 오가며 실제 직원처럼 긴 작업을 완성하는지 시험합니다.',
    exampleTask: '자료를 조사하고 계산한 뒤 정해진 형식의 고객용 문서까지 만들어 모든 필수 조건 충족하기',
    scoreMeaning: '모든 필수 기준을 한 번의 실행에서 충족한 과제 비율입니다. 기준 하나라도 빠지면 해당 과제는 실패로 처리됩니다.',
    evaluator: 'Mercor',
    harness: 'Mercor harness',
    sampleInfo: 'Expert binary rubrics · all criteria required',
    source: {
      title: 'Grok 4.6 Model Card §3.3',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=16',
      publishedAt: '2026-08-12',
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
    easyExplanation: 'AI가 3D 물체를 만드는 코드를 작성했을 때, 그 코드가 실제로 실행되고 요구한 모양과 비슷한 결과가 나오는지 봅니다.',
    exampleTask: '설명이나 참조 형상을 보고 엔진에서 열리는 3D 자산 생성 코드를 작성하기',
    scoreMeaning: '실행 가능성과 형상 유사도를 합친 보상 점수입니다. 게임 프레임 속도나 일반 코딩 성공률을 뜻하지 않습니다.',
    evaluator: '3DCodeBench 연구진',
    harness: 'Grok Build 및 모델별 보고 설정',
    sampleInfo: 'Executability + shape fidelity',
    source: {
      title: 'Grok 4.6 Model Card §4.2',
      publisher: 'SpaceXAI',
      url: 'https://media.x.ai/v1/website/card-4p6-4cd2dc57.pdf#page=20',
      publishedAt: '2026-08-12',
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
const openAiCoreColumns: PublishedComparisonColumn[] = [
  { id: 'sol', label: 'GPT-5.6 Sol' },
  { id: 'terra', label: 'GPT-5.6 Terra' },
  { id: 'luna', label: 'GPT-5.6 Luna' },
  { id: 'gpt55', label: 'GPT-5.5' },
];

export const OPENAI_PUBLISHED_BENCHMARK_GROUPS: PublishedComparisonGroup[] = [
  {
    id: 'professional',
    label: '전문 업무',
    title: '전문 업무·종합 지능',
    description: '긴 실제 업무, 전문 산출물 비교, 여러 능력을 묶은 독립 종합지표를 서로 구분해 보여줍니다.',
    columns: [
      ...openAiCoreColumns,
      { id: 'fable5', label: 'Claude Fable 5' },
      { id: 'opus48', label: 'Claude Opus 4.8' },
      { id: 'gemini31pro', label: 'Gemini 3.1 Pro Preview' },
      { id: 'gemini35flash', label: 'Gemini 3.5 Flash' },
    ],
    rows: [
      {
        benchmark: "Agents' Last Exam",
        metric: '%',
        easyExplanation: '55개 전문 분야의 긴 실제 업무를 AI가 도구와 파일을 사용해 끝까지 완수하는지 봅니다.',
        scoreMeaning: '검증 가능한 성공 조건을 충족한 과제 비율이며, 높을수록 좋습니다.',
        values: { sol: 52.7, terra: 50.4, luna: 50.3, gpt55: 46.9, fable5: 40.5, opus48: 45.2, gemini31pro: 32.1, gemini35flash: null },
      },
      {
        benchmark: 'GDPval-AA v2',
        metric: 'Elo',
        easyExplanation: '같은 전문 업무 산출물을 두 모델씩 맞대결해 어느 결과가 더 좋은지 평가합니다.',
        scoreMeaning: '상대적인 Elo 점수입니다. 퍼센트가 아니며 같은 평가 풀 안에서만 비교해야 합니다.',
        values: { sol: 1747.8, terra: 1593, luna: 1591.8, gpt55: 1493.7, fable5: 1759.6, opus48: 1600.1, gemini31pro: 962.3, gemini35flash: 1348.8 },
      },
      {
        benchmark: 'AA Intelligence Index v4.1',
        metric: 'Index',
        easyExplanation: '도구 사용·터미널·과학 추론·지식·긴 문맥 등 9개 평가를 한 지표로 묶은 독립 측정입니다.',
        scoreMeaning: 'Artificial Analysis가 같은 방법으로 산출한 종합 점수입니다. 실제 모든 업무의 성공률은 아닙니다.',
        values: { sol: 58.9, terra: 55, luna: 51.2, gpt55: 54.8, fable5: 59.9, opus48: 55.7, gemini31pro: 46.5, gemini35flash: 50.2 },
      },
    ],
  },
  {
    id: 'coding',
    label: '코딩',
    title: '코딩 에이전트 평가',
    description: '코드 작성만 보는 것이 아니라 저장소 수정, 터미널 사용, 테스트 통과까지 포함한 결과입니다.',
    columns: [
      { id: 'sol', label: 'GPT-5.6 Sol' },
      { id: 'solUltra', label: 'GPT-5.6 Sol Ultra' },
      { id: 'terra', label: 'GPT-5.6 Terra' },
      { id: 'luna', label: 'GPT-5.6 Luna' },
      { id: 'gpt55', label: 'GPT-5.5' },
      { id: 'mythos5', label: 'Claude Mythos 5' },
      { id: 'mythosPreview', label: 'Claude Mythos Preview' },
      { id: 'fable5', label: 'Claude Fable 5' },
      { id: 'opus48', label: 'Claude Opus 4.8' },
      { id: 'gemini31pro', label: 'Gemini 3.1 Pro Preview' },
    ],
    rows: [
      {
        benchmark: 'AA Coding Agent Index v1.1',
        metric: 'Index',
        easyExplanation: '장기 코드 수정, 터미널 작업, 저장소 질문처럼 서로 다른 코딩 에이전트 과제를 묶어 평가합니다.',
        scoreMeaning: '여러 하위 평가를 합친 지수입니다. 개별 버그 해결률과 같은 단일 성공률은 아닙니다.',
        values: { sol: 80, solUltra: null, terra: 77.4, luna: 74.6, gpt55: 76.4, mythos5: null, mythosPreview: null, fable5: 77.2, opus48: 72.5, gemini31pro: 42.7 },
      },
      {
        benchmark: 'SWE-Bench Pro',
        metric: '%',
        easyExplanation: '실제 전문 코드 저장소의 이슈를 읽고 올바른 패치를 만들어 기존 기능을 깨뜨리지 않는지 봅니다.',
        scoreMeaning: '검증 테스트를 통과한 과제 비율입니다. 실행 하네스와 데이터 부분집합이 같을 때만 직접 비교할 수 있습니다.',
        caveat: 'OpenAI는 2026년 별도 감사에서 SWE-Bench Pro 과제 약 30%에 결함이 있다고 추정했으므로 절대적인 코딩 능력치로 해석하면 안 됩니다.',
        values: { sol: 64.6, solUltra: null, terra: 63.4, luna: 62.7, gpt55: 59.4, mythos5: 80.3, mythosPreview: 77.8, fable5: 80, opus48: 69.2, gemini31pro: 54.2 },
      },
      {
        benchmark: 'DeepSWE v1.1',
        metric: '%',
        easyExplanation: 'AI가 큰 저장소에서 오래 걸리는 개발 작업을 계획하고 수정·검증까지 끝내는지 시험합니다.',
        scoreMeaning: '첫 시도에 자동 검증을 통과한 비율입니다.',
        values: { sol: 72.7, solUltra: null, terra: 69.6, luna: 67.2, gpt55: 67, mythos5: null, mythosPreview: null, fable5: 69.7, opus48: 59, gemini31pro: 11.8 },
      },
      {
        benchmark: 'Terminal-Bench 2.1',
        metric: '%',
        easyExplanation: '격리된 명령줄 환경에서 개발·운영·데이터·보안 과제를 실제 명령으로 해결하는지 봅니다.',
        scoreMeaning: '자동 테스트를 통과한 터미널 과제 비율입니다. 에이전트 하네스와 반복 횟수의 영향을 받습니다.',
        values: { sol: 88.8, solUltra: 91.9, terra: 87.4, luna: 84.7, gpt55: 85.6, mythos5: 88, mythosPreview: null, fable5: 83.1, opus48: 78.9, gemini31pro: 70.7 },
      },
    ],
  },
  {
    id: 'computer',
    label: '컴퓨터·웹',
    title: '컴퓨터 사용·웹 탐색·CAD',
    description: '데스크톱 조작, 어려운 웹 조사, 실행 가능한 3D CAD 코드 작성 능력을 나눠 측정합니다.',
    columns: [
      { id: 'sol', label: 'GPT-5.6 Sol' },
      { id: 'solUltra', label: 'GPT-5.6 Sol Ultra' },
      { id: 'terra', label: 'GPT-5.6 Terra' },
      { id: 'luna', label: 'GPT-5.6 Luna' },
      { id: 'gpt55', label: 'GPT-5.5' },
      { id: 'mythos5', label: 'Claude Mythos 5' },
      { id: 'mythosPreview', label: 'Claude Mythos Preview' },
      { id: 'opus48', label: 'Claude Opus 4.8' },
      { id: 'gemini31pro', label: 'Gemini 3.1 Pro Preview' },
    ],
    rows: [
      {
        benchmark: 'OSWorld 2.0',
        metric: '%',
        easyExplanation: '실제 데스크톱 앱을 조작해 여러 단계의 일상·전문 업무를 완성하는지 봅니다.',
        scoreMeaning: '정해진 최종 상태에 도달한 컴퓨터 사용 과제 비율입니다.',
        values: { sol: 62.6, solUltra: null, terra: 50.2, luna: 45.6, gpt55: 47.5, mythos5: null, mythosPreview: null, opus48: 54.8, gemini31pro: null },
      },
      {
        benchmark: 'BrowseComp',
        metric: '%',
        easyExplanation: '웹 여러 곳에 흩어진 단서를 오래 탐색해 찾기 어렵지만 검증 가능한 짧은 답을 찾아내는지 봅니다.',
        scoreMeaning: '정답을 찾은 문제 비율입니다. 일반적인 검색 질문이나 장문 보고서 품질 전체를 뜻하지는 않습니다.',
        values: { sol: 90.4, solUltra: 92.2, terra: 87.5, luna: 83.3, gpt55: 84.4, mythos5: 88, mythosPreview: 87.9, opus48: 84.3, gemini31pro: 85.9 },
      },
      {
        benchmark: 'BenchCAD',
        metric: '%',
        easyExplanation: '도면이나 설명을 이해해 실제로 실행되는 CadQuery 3D 부품 코드를 만들 수 있는지 시험합니다.',
        scoreMeaning: 'OpenAI 원문이 보고한 벤치마크 백분율입니다. 세부 과제별 산식은 BenchCAD 원문을 함께 확인해야 합니다.',
        values: { sol: 70.6, solUltra: null, terra: 62.3, luna: 63.1, gpt55: 44.4, mythos5: 38.4, mythosPreview: 35.5, opus48: 27.3, gemini31pro: null },
      },
      {
        benchmark: 'BenchCAD + Python tool',
        metric: '%',
        easyExplanation: '같은 CAD 과제에서 Python 실행 도구를 허용해 계산과 코드 검증을 보조하게 합니다.',
        scoreMeaning: '도구를 허용한 조건의 백분율입니다. 도구 없는 BenchCAD 결과와 조건이 다릅니다.',
        values: { sol: 83.4, solUltra: null, terra: 78.2, luna: 73.9, gpt55: 55.8, mythos5: 65, mythosPreview: 61, opus48: 51.8, gemini31pro: null },
      },
    ],
  },
];

export const OPENAI_BENCHMARK_SOURCE: SourceReference = {
  title: 'GPT-5.6 공개 평가표',
  publisher: 'OpenAI',
  url: 'https://openai.com/index/gpt-5-6/',
  publishedAt: '2026-07-09',
};

export const BENCHMARK_EXPLANATION_SOURCES: SourceReference[] = [
  {
    title: "Agents' Last Exam framework documentation",
    publisher: "Agents' Last Exam",
    url: 'https://agents-last-exam.org/docs/ale/index.html',
  },
  {
    title: 'Intelligence Benchmarking methodology',
    publisher: 'Artificial Analysis',
    url: 'https://artificialanalysis.ai/methodology/intelligence-benchmarking',
  },
  {
    title: 'Coding Agent Index methodology',
    publisher: 'Artificial Analysis',
    url: 'https://artificialanalysis.ai/methodology/coding-agents-benchmarking',
  },
  {
    title: 'SWE-Bench Pro methodology and public dataset',
    publisher: 'Scale AI',
    url: 'https://labs.scale.com/leaderboard/swe_bench_pro_public',
  },
  {
    title: 'SWE-Bench Pro data-quality audit',
    publisher: 'OpenAI',
    url: 'https://openai.com/index/separating-signal-from-noise-coding-evaluations/',
  },
  {
    title: 'Terminal-Bench 2.1 release and corrections',
    publisher: 'Terminal-Bench',
    url: 'https://www.tbench.ai/news/terminal-bench-2-1',
  },
  {
    title: 'OSWorld 2.0 paper',
    publisher: 'OSWorld researchers',
    url: 'https://arxiv.org/abs/2606.29537',
  },
  {
    title: 'BrowseComp benchmark',
    publisher: 'OpenAI',
    url: 'https://openai.com/index/browsecomp/',
  },
  {
    title: 'BenchCAD benchmark and dataset',
    publisher: 'BenchCAD',
    url: 'https://benchcad.com/',
  },
];

export const AGENTS_LAST_EXAM_SNAPSHOT = {
  capturedAt: '2026-08-20',
  split: 'Overall · official public leaderboard',
  source: {
    title: "Agents' Last Exam official leaderboard",
    publisher: 'UC Berkeley RDI / Agents’ Last Exam',
    url: 'https://agents-last-exam.org/leaderboard',
  } satisfies SourceReference,
  warning:
    '같은 모델이라도 Codex·Claude Code·Grok Build처럼 에이전트 하네스와 설정이 다릅니다. 이 표는 공개 실행 기록을 읽는 자료이며, 모델만의 공정 순위가 아닙니다.',
  runs: [
    { harness: 'Codex', modelName: 'GPT-5.6 Sol', effort: '리더보드 등록 설정', passRate: 30.6, partialScore: 53.6, estimatedCostUsd: 762, totalRuntime: '94시간 39분' },
    { harness: 'Codex', modelName: 'GPT-5.6 Luna', effort: '리더보드 등록 설정', passRate: 29.6, partialScore: 48.3, estimatedCostUsd: 235, totalRuntime: '66시간 7분' },
    { harness: 'Codex', modelName: 'GPT-5.6 Terra', effort: '리더보드 등록 설정', passRate: 28, partialScore: 50.5, estimatedCostUsd: 545, totalRuntime: '118시간 39분' },
    { harness: 'Grok Build', modelName: 'Grok 4.5', effort: 'high', passRate: 27, partialScore: 51.2, estimatedCostUsd: 337, totalRuntime: '89시간 8분' },
    { harness: 'Claude Code', modelName: 'Claude Opus 4.8', effort: '리더보드 등록 설정', passRate: 27, partialScore: 45.1, estimatedCostUsd: 3985, totalRuntime: '179시간 18분' },
    { harness: 'Codex', modelName: 'GPT-5.5', effort: '리더보드 등록 설정', passRate: 26.6, partialScore: 47.9, estimatedCostUsd: 602, totalRuntime: '97시간 8분' },
    { harness: 'Claude Code', modelName: 'Claude Fable 5', effort: '리더보드 등록 설정', passRate: 25.7, partialScore: 48.7, estimatedCostUsd: 4340, totalRuntime: '70시간 0분', note: '원문에 “40% tasks downgraded” 표기가 있는 실행입니다.' },
  ] satisfies OfficialLeaderboardRun[],
};

export const EXTERNAL_BENCHMARK_RESOURCES: ExternalBenchmarkResource[] = [
  {
    id: 'agents-last-exam',
    title: "Agents' Last Exam",
    category: '장기 전문 업무',
    easyExplanation: '도구·파일·웹 앱을 써서 여러 산업의 실제 업무를 끝까지 수행하는지 봅니다.',
    bestFor: '에이전트가 긴 업무를 끈기 있게 완수하는지, 비용과 실행 시간까지 함께 보고 싶을 때',
    scoreGuide: 'Pass rate는 완벽 통과 비율, Score는 부분 점수 평균입니다.',
    comparabilityNote: '하네스·도구 권한·모델 설정이 다르면 같은 모델도 달라질 수 있습니다.',
    source: AGENTS_LAST_EXAM_SNAPSHOT.source,
  },
  {
    id: 'terminal-bench',
    title: 'Terminal-Bench 3',
    category: '터미널 에이전트',
    easyExplanation: '격리된 명령줄 환경에서 개발·운영·데이터·보안 과제를 실제로 해결하는지 봅니다.',
    bestFor: 'CLI 코딩 에이전트나 DevOps 자동화 도입 전',
    scoreGuide: '버전별 태스크와 하네스가 달라 동일 버전·동일 하네스 결과만 비교합니다.',
    comparabilityNote: '공식 리더보드의 무결성 정책과 실행 세부 조건을 함께 확인해야 합니다.',
    source: { title: 'Terminal-Bench official leaderboard', publisher: 'Terminal-Bench', url: 'https://www.tbench.ai/leaderboard' },
  },
  {
    id: 'tau3-bench',
    title: 'τ³-bench',
    category: '도구 사용·고객 대화',
    easyExplanation: '정책을 지키며 항공·리테일·통신·지식 기반 고객 지원 업무를 도구로 처리하는지 봅니다.',
    bestFor: '고객지원 챗봇, 예약·주문·계정 관리 에이전트',
    scoreGuide: '최종 답변의 말솜씨보다 정책 준수와 올바른 도구 조작이 핵심입니다.',
    comparabilityNote: '텍스트·음성, 도메인, 사용자 시뮬레이터 조건을 섞어 비교하면 안 됩니다.',
    source: { title: 'τ³-bench official repository and benchmark guide', publisher: 'Sierra Research', url: 'https://github.com/sierra-research/tau2-bench' },
  },
  {
    id: 'swe-bench-pro',
    title: 'SWE-Bench Pro',
    category: '실제 저장소 수정',
    easyExplanation: '긴 실제 소프트웨어 이슈를 읽고 여러 파일을 고친 뒤 테스트를 통과하는지 봅니다.',
    bestFor: '코드베이스 단위의 버그 수정·기능 구현 에이전트',
    scoreGuide: '첫 시도에서 검증을 통과한 비율을 주로 봅니다.',
    comparabilityNote: '데이터 결함·부분집합·하네스 문제가 보고돼 절대 순위가 아닌 한 가지 신호로만 봐야 합니다.',
    source: { title: 'SWE-Bench Pro public leaderboard and methodology', publisher: 'Scale AI', url: 'https://labs.scale.com/leaderboard/swe_bench_pro_public' },
  },
  {
    id: 'livecodebench',
    title: 'LiveCodeBench',
    category: '오염 저항 코딩',
    easyExplanation: '모델 학습 시점 이후에 수집한 프로그래밍 문제로 코드 생성·실행·테스트 능력을 봅니다.',
    bestFor: '알고리즘 문제 해결과 일반 코드 생성의 최신 감각을 확인할 때',
    scoreGuide: '실행·정답 기준 점수이지만, 저장소 수정이나 도구 사용 능력 전체를 대신하지는 않습니다.',
    comparabilityNote: '월별 문제 묶음·난이도·언어·평가 설정을 동일하게 맞춰야 합니다.',
    source: { title: 'LiveCodeBench official leaderboard', publisher: 'LiveCodeBench', url: 'https://huggingface.co/spaces/livecodebench/leaderboard' },
  },
  {
    id: 'browsecomp',
    title: 'BrowseComp',
    category: '웹 조사',
    easyExplanation: '웹 여러 곳에 흩어진 단서를 끈기 있게 찾아, 검증 가능한 짧은 정답을 찾는지 봅니다.',
    bestFor: '딥리서치·조사형 웹 에이전트',
    scoreGuide: '어려운 단답형 탐색 문제의 정답률이며, 장문 보고서의 품질 전체를 뜻하지는 않습니다.',
    comparabilityNote: '브라우징 도구·반복 횟수·투표 방식에 따라 결과가 달라집니다.',
    source: { title: 'BrowseComp benchmark', publisher: 'OpenAI', url: 'https://openai.com/index/browsecomp/' },
  },
  {
    id: 'osworld-2',
    title: 'OSWorld 2.0',
    category: '컴퓨터 사용',
    easyExplanation: '데스크톱 앱을 조작해 여러 단계의 일상·전문 업무를 완료하는지 봅니다.',
    bestFor: '브라우저·오피스·파일 시스템을 실제로 조작하는 컴퓨터 사용 에이전트',
    scoreGuide: '정해진 최종 상태에 도달한 과제 비율을 중심으로 읽습니다.',
    comparabilityNote: '운영체제 이미지, 앱 버전, 관찰 방식, 도구 권한이 같아야 비교가 가능합니다.',
    source: { title: 'OSWorld 2.0 paper', publisher: 'OSWorld researchers', url: 'https://arxiv.org/abs/2606.29537' },
  },
  {
    id: 'arc-agi-2',
    title: 'ARC-AGI-2',
    category: '추상 추론',
    easyExplanation: '몇 개의 예시만 보고 숨은 규칙을 찾아 새로운 격자 퍼즐에 적용하는지 봅니다.',
    bestFor: '새 규칙을 빠르게 배우고 일반화하는 추론 신호를 별도로 확인할 때',
    scoreGuide: '정답률뿐 아니라 과제당 비용·시도 횟수 등 효율 조건을 같이 봐야 합니다.',
    comparabilityNote: '일반 코딩·업무 자동화 실력을 직접 대변하지 않는 특화된 추상 추론 시험입니다.',
    source: { title: 'ARC-AGI-2 official benchmark', publisher: 'ARC Prize Foundation', url: 'https://arcprize.org/arc-agi/2' },
  },
];

export const POWERPOINT_ARTIFACT_BENCHMARK: ArtifactBenchmarkMetric[] = [
  { metric: 'Deck quality', easyExplanation: '내용 구성과 전체 완성도', unit: '%', higherIsBetter: true, sol: 59.9, opus: 56.7, fable: 59.3, terra: 52.5 },
  { metric: 'Professional readiness', easyExplanation: '수정 없이 업무에 바로 쓸 수 있는 수준', unit: '%', higherIsBetter: true, sol: 43.3, opus: 26.7, fable: 32, terra: 17.3 },
  { metric: 'PPTX produced', easyExplanation: '열 수 있는 PPTX 파일 생성 성공률', unit: '%', higherIsBetter: true, sol: 100, opus: 76, fable: 82, terra: 80 },
  { metric: 'Visual quality', easyExplanation: '레이아웃·가독성·시각 표현 품질', unit: '%', higherIsBetter: true, sol: 77.9, opus: 79.3, fable: 78.9, terra: 74.4 },
  { metric: 'Tokens per deck', easyExplanation: '프레젠테이션 하나를 만드는 데 쓴 토큰', unit: 'M tokens', higherIsBetter: false, sol: 1.1, opus: 0.953, fable: 1.4, terra: 0.72 },
];

export const EXCEL_ARTIFACT_BENCHMARK: ArtifactBenchmarkMetric[] = [
  { metric: 'Key outputs correct', easyExplanation: '중요 계산 결과가 정답과 맞는 비율', unit: '%', higherIsBetter: true, sol: 83.3, opus: 82.8, fable: 80.6, terra: 82.2 },
  { metric: 'Fully correct workbooks', easyExplanation: '워크북 전체가 완전히 맞은 비율', unit: '%', higherIsBetter: true, sol: 50, opus: 60, fable: 60, terra: 53.3 },
  { metric: 'Expected outputs located', easyExplanation: '요구한 셀·시트 위치에 결과를 넣은 비율', unit: '%', higherIsBetter: true, sol: 100, opus: 100, fable: 100, terra: 98.9 },
  { metric: 'Workbook contract passed', easyExplanation: '필수 시트·형식·파일 조건 통과율', unit: '%', higherIsBetter: true, sol: 100, opus: 100, fable: 100, terra: 100 },
  { metric: 'Tokens per workbook', easyExplanation: '워크북 하나를 만드는 데 쓴 토큰', unit: 'M tokens', higherIsBetter: false, sol: 2.44, opus: 3.83, fable: 2.59, terra: 1.64 },
  { metric: 'Wall clock', easyExplanation: '작업 시작부터 파일 완성까지 걸린 실제 시간', unit: 'minutes', higherIsBetter: false, sol: 7, opus: 7.5, fable: 8.4, terra: 4.2 },
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
  '원문 표의 비교 모델을 임의로 생략하지 않고, 미보고 값은 모델명·사유와 함께 남깁니다.',
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
