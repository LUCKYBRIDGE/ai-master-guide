export type AICompany = 'openai' | 'google' | 'anthropic' | 'xai' | 'opensource' | 'meta';

export interface KeyFeature {
  title: string;
  desc: string;
  iconName?: string;
}

export interface PromptTip {
  title: string;
  dos: string[];
  donts: string[];
  examplePrompt?: string;
}

export interface AITool {
  id: string;
  name: string;
  subName?: string;
  company: AICompany;
  companyName: string;
  badgeColor: string;
  badgeBg: string;
  borderHover: string;
  category: 'General' | 'Coding' | 'Agent' | 'Research';
  version: string;
  verifiedDate: string;
  tagline: string;
  overview: string;
  strengths: string[];
  limitations: string[];
  bestFor: string[];
  keyFeatures: KeyFeature[];
  pricing: {
    freeTier: string;
    paidTier: string;
    apiPricing?: string;
  };
  promptTips: PromptTip;
  recommendedWorkflow: string[];
  officialDocsUrl: string;
}

export interface ComparisonRow {
  id: string;
  category: '추론/기본성능' | '코딩/개발' | '에이전트/자동화' | '멀티모달/비전' | '컨텍스트/검색' | '가격/접근성';
  feature: string;
  openai: string;
  google: string;
  anthropic: string;
  xai: string;
  winner?: AICompany;
  note: string;
  verifiedDate: string;
}

export interface PromptParameter {
  key: string;
  label: string;
  defaultValue: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: '코딩 & 아키텍처' | '심층 리서치 & 분석' | '문서 작성 & 기획' | '데이터 분석 & 시각화' | '에이전트 시스템 프롬프트';
  targetTool: '전체' | 'ChatGPT / Canvas' | 'Gemini / AGY' | 'Claude / Claude Code' | 'Grok / Grok Build';
  description: string;
  difficulty: '초급' | '중급' | '고급 / 전문가';
  tags: string[];
  promptText: string;
  parameters?: PromptParameter[];
  outputExample?: string;
  proTips: string[];
  verifiedDate: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  content: string;
  codeSnippet?: string;
  commandSnippet?: string;
}

export interface WorkflowGuide {
  id: string;
  toolId: string;
  title: string;
  subtitle: string;
  company: AICompany;
  icon: string;
  summary: string;
  prerequisites: string[];
  steps: WorkflowStep[];
  copyableConfig?: {
    fileName: string;
    content: string;
    description: string;
  };
  verifiedDate: string;
  officialDocUrl: string;
}

// ----------------------------------------------------
// Usage Quota & Token Pricing Types (2026.08.16 Verified)
// ----------------------------------------------------

export interface AccountBankSummary {
  company: AICompany;
  companyName: string;
  accountType: '여러 통장형' | '제품별 분리형' | '큰 통장 하나형' | '자유배분형 주간 풀';
  badgeBg: string;
  badgeColor: string;
  chatAgentSeparation: '🟢 분리' | '🔴 공유';
  codingInternalShare: string;
  imageHandling: string;
  videoHandling: string;
  voiceHandling: string;
  fileAnalysisHandling: string;
  computeFormula: string;
  overageMethod: string;
  officialSourceUrl: string;
  corePros: string;
  coreCons: string;
  bestPersona: string;
}

export interface ModelWeightItem {
  id: string;
  company: AICompany;
  modelName: string;
  inputCost1M: string;
  cachedInput1M?: string;
  outputCost1M: string;
  relativeWeight: string;
  contextWindow: string;
  weightCategory: '최상위 고연산 (Heavy)' | '중간 균형 (Balanced)' | '초경량 고속 (Light)';
  notes: string;
}

export interface MediaPricingItem {
  company: AICompany;
  modelOrFeature: string;
  resolutionOrQuality: string;
  costOrTokens: string;
  notes: string;
}

export interface PlanTierComparison {
  tierName: '$20/월 급 (표준)' | '$100~$200/월 급 (헤비/프로)';
  openai: { planName: string; price: string; features: string; bestFor: string };
  google: { planName: string; price: string; features: string; bestFor: string };
  anthropic: { planName: string; price: string; features: string; bestFor: string };
  xai: { planName: string; price: string; features: string; bestFor: string };
}

// ----------------------------------------------------
// Detailed Tool & Plugin & Connector Types (2026.08.18)
// ----------------------------------------------------

export type ToolCategory = '파일/데이터' | '미디어/시각화' | '웹/심층리서치' | '외부 앱 연동' | '개발/에이전트';

export interface DetailedToolFeature {
  id: string;
  company: AICompany;
  name: string;
  iconName: string;
  category: ToolCategory;
  purpose: string;
  representativeOutput: string;
  chatUsageNote: string;
  chatUsageType: '🟢 Chat 기본' | '🔵 별도 도구 한도' | '🟢 전용 샌드박스';
  workAgentUsageNote: string;
  workAgentUsageType: '🟠 Work/Codex 공용' | '🔴 API 별도 과금' | '🟠 대량 Compute 차감';
  limitsAndStorage: string;
  bestUseCases: string[];
  interactiveFeature?: string;
  officialSourceUrl: string;
}

// ----------------------------------------------------
// Multi-Model Benchmark Graph Types (with Verified Sources)
// ----------------------------------------------------

export type ModelTier = 'flagship' | 'balanced' | 'light' | 'opensource';

export interface ModelBenchmarkScore {
  modelId: string;
  modelName: string;
  company: AICompany;
  tier: ModelTier;
  score: number;
  unit: '%' | 'pts';
  isWinner?: boolean;
  costNote?: string;
  sourceDocUrl?: string;
}

export interface BenchmarkMetric {
  id: string;
  name: string;
  category: '실전 코딩' | '수학/알고리즘' | '박사급 과학 추론' | '종합 지능' | '에이전트 실무력';
  whatItMeasures: string;
  realWorldMeaning: string;
  maxScore: number;
  scores: ModelBenchmarkScore[];
  verifiedDate: string;
  sourceOrgName: string;
  officialLeaderboardUrl: string;
}

export interface ModelRadarProfile {
  modelId: string;
  modelName: string;
  company: AICompany;
  tier: ModelTier;
  codingStrength: number;
  mathReasoning: number;
  phdScience: number;
  longContext: number;
  costEfficiency: number;
  agentAutonomy: number;
  costTierLabel: string;
  highlightSummary: string;
  officialPricingUrl: string;
}

// ----------------------------------------------------
// Reasoning Effort & Thinking Budget Types (Low ~ Max)
// ----------------------------------------------------

export type ReasoningLevel = 'Low' | 'Medium' | 'High' | 'Extra High' | 'Max';

export interface ReasoningLevelModelData {
  company: AICompany;
  modelName: string;
  settingName: string;
  latencySeconds: string;
  thinkingTokens: string;
  sweBenchScore: number;
  aimeMathScore: number;
  estimatedCostPerQuery: string;
  officialDocsUrl: string;
}

export interface ReasoningEffortTier {
  level: ReasoningLevel;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  summary: string;
  avgThinkingTime: string;
  tokenConsumption: string;
  costMultiplier: string;
  bestUseCases: string[];
  cautionNote: string;
  models: ReasoningLevelModelData[];
}

// ----------------------------------------------------
// YouTuber Review Comparison Types (Exact Date & Real Output)
// ----------------------------------------------------

export interface YouTuberScore {
  modelName: string;
  company: AICompany;
  score: number;
  highlight: string;
  isTopPick?: boolean;
}

export interface YouTuberTestItem {
  testName: string;
  testDate: string;
  promptExact: string;
  inputSpecification: string;
  openaiResult: { status: string; outputDetail: string; errorLog?: string };
  googleResult: { status: string; outputDetail: string; errorLog?: string };
  anthropicResult: { status: string; outputDetail: string; errorLog?: string };
  xaiResult: { status: string; outputDetail: string; errorLog?: string };
  winner: AICompany;
  reviewerComment: string;
}

export interface YouTuberReview {
  id: string;
  creatorName: string;
  channelName: string;
  subscriberCount: string;
  avatarUrl: string;
  videoTitle: string;
  videoPublishDate: string;
  videoUrl: string;
  videoSummary: string;
  topPickModel: string;
  topPickReason: string;
  scores: YouTuberScore[];
  testDetails: YouTuberTestItem[];
}

// ----------------------------------------------------
// Head-to-Head Mission Benchmark Types (Exact Date & Time & Cost)
// ----------------------------------------------------

export type MissionStatus = 
  | '🟢 100% 성공 (원샷)' 
  | '🟡 부분 성공 (수동 1~2회 수정)' 
  | '🟡 부분 성공 (수동 1회 수정)' 
  | '🟡 텍스트 사전 추출 필요'
  | '🔴 실패 (런타임 에러)'
  | '🔴 실패 (지원 불가)';

export interface MissionResultItem {
  modelName: string;
  toolName: string;
  company: AICompany;
  timeSeconds: number;
  timeDisplay: string;
  costEstimated: string;
  tokenCountDisplay: string;
  status: MissionStatus;
  qualityScore: number;
  iterationCount: number;
  resultDetail: string;
  errorLog?: string;
  isFastest?: boolean;
  isCheapest?: boolean;
  isHighestQuality?: boolean;
}

export interface HeadToHeadMission {
  id: string;
  title: string;
  testExactDate: string;
  category: '풀스택 웹앱 코딩' | '대용량 데이터 분석' | '심층 리서치 백서' | '대형 레포 버그 픽스';
  promptGiven: string;
  inputDataSpec: string;
  missionGoal: string;
  winnerCompany: AICompany;
  winnerReason: string;
  sourceReportName: string;
  sourceReportUrl: string;
  results: MissionResultItem[];
}
