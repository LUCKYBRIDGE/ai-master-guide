import { 
  AccountBankSummary, 
  ModelWeightItem, 
  MediaPricingItem, 
  PlanTierComparison 
} from '../types/ai';

// 1. 4대 AI 사용량 통장 분해 요약
export const ACCOUNT_BANKS_SUMMARY: AccountBankSummary[] = [
  {
    company: 'openai',
    companyName: 'ChatGPT / OpenAI',
    accountType: '여러 통장형',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeColor: 'text-emerald-400',
    chatAgentSeparation: '🟢 분리',
    codingInternalShare: 'Work·Codex 등이 공용 (Agentic Allowance)',
    imageHandling: '🖼️ 별도 이미지 한도 (최근 하루 50장 등 동적 제한, Codex 한도와 별개)',
    videoHandling: '별도 기능/한도 적용 (Codex와 분리)',
    voiceHandling: '🎙️ Chat Voice 별도 한도 (Codex 한도와 별개)',
    fileAnalysisHandling: '📁 Chat의 별도 도구 한도',
    computeFormula: '모델·도구별 독립 동적 쿼터 (정확한 토큰→% 비공개)',
    overageMethod: 'ChatGPT Credits (구매 후 12개월 유효, Work/Codex 공유)',
    officialSourceUrl: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan',
    corePros: 'Codex/Work 에이전트 작업을 다 써도 일반 Chat이 안전하게 보존됨. 기능별 병렬 작업에 최적화.',
    coreCons: '통장이 너무 세분화되어 있어 각 기능별 리셋 시점과 잔여 한도를 각각 신경 써야 함.',
    bestPersona: '평소 대화(Chat) + 이미지 생성 + 무거운 에이전트 코딩을 모두 병행하는 올라운더'
  },
  {
    company: 'google',
    companyName: 'Gemini / Google',
    accountType: '제품별 분리형',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    badgeColor: 'text-blue-400',
    chatAgentSeparation: '🟢 분리',
    codingInternalShare: 'Antigravity 자체 quota (Gemini Apps와 독립)',
    imageHandling: 'Gemini App 내 compute usage를 일반 대화보다 더 많이 소모',
    videoHandling: '1시간+ 고화질 비디오 분석 시 compute usage 급증',
    voiceHandling: 'Gemini 기능 사용량 내 통합 계산',
    fileAnalysisHandling: 'Gemini compute usage에 직접 영향 (대용량 문서 주입)',
    computeFormula: '2026.05.17 도입된 Compute-based 방식 (질문 복잡도, 모델, thinking level, 5시간/주간 한도)',
    overageMethod: 'Google AI Credits (Antigravity 추가 사용 등)',
    officialSourceUrl: 'https://support.google.com/gemini/answer/16275805?hl=en-GB',
    corePros: 'Gemini Chat을 100% 써도 Antigravity 코딩에 영향이 없고, 반대도 마찬가지. Flash-Lite 무제한 폴백.',
    coreCons: 'Gemini Apps 안에서는 Pro 모델, Deep Think, 이미지 생성이 같은 compute 한도를 빠르게 잠식함.',
    bestPersona: '사내 자료/논문 분석(Gemini App)과 자율 코딩(Antigravity)을 완전히 분리해 쓰고 싶은 개발자'
  },
  {
    company: 'anthropic',
    companyName: 'Claude / Anthropic',
    accountType: '큰 통장 하나형',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeColor: 'text-amber-400',
    chatAgentSeparation: '🔴 공유',
    codingInternalShare: 'Claude Chat + Desktop + Claude Code 전체 공용 (단일 통장)',
    imageHandling: '❌ 사진/일러스트 자체 생성 모델 없음 (SVG, HTML, 차트, Artifacts 시각화로 대체)',
    videoHandling: '❌ 자체 영상 생성 모델 없음 (비디오 프레임 분석 중심)',
    voiceHandling: 'Claude 전체 세션 정책 적용',
    fileAnalysisHandling: '전체 Claude usage에 직접 영향 (컨텍스트 누적 시 급증)',
    computeFormula: '길이·모델·effort·thinking budget 기반 (5시간 세션 + 주간 한도)',
    overageMethod: 'Usage Credits 켜기 (소진 시 표준 API 요율로 자동 결제 전환)',
    officialSourceUrl: 'https://support.anthropic.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan',
    corePros: '원하는 작업(코딩 몰입 or 심층 작문)에 사용량을 100% 집중 투입하기가 가장 용이함.',
    coreCons: '낮에 Claude Code로 대형 프로젝트를 돌리면 저녁에 일반 Claude Chat 한도까지 함께 바닥남.',
    bestPersona: '하나의 고품질 모델(Opus 5)에 모든 리소스를 집중하고 싶은 프로페셔널 엔지니어'
  },
  {
    company: 'xai',
    companyName: 'Grok / xAI (SpaceXAI)',
    accountType: '자유배분형 주간 풀',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    badgeColor: 'text-cyan-400',
    chatAgentSeparation: '🔴 공유',
    codingInternalShare: 'Chat · Imagine · Voice · Build · Video가 단일 Weekly Pool 공유 (2026.06 개편)',
    imageHandling: 'Imagine 생성 시 Weekly compute pool에서 Chat보다 더 크게 차감',
    videoHandling: '고화질 영상(720p 등) 생성 시 Weekly pool을 극도로 대량 소비',
    voiceHandling: 'Weekly pool에 포함',
    fileAnalysisHandling: '기능별 compute가 Weekly pool에서 직접 차감',
    computeFormula: '단일 주간 총 연산량(Weekly Compute Pool) 기반 (소진 시 무료 티어로 fallback)',
    overageMethod: 'Extra Usage Credits (최소 $5부터 구매, 1년 유효, Auto Top-up)',
    officialSourceUrl: 'https://docs.x.ai/grok/faq',
    corePros: '완전한 자유 배분(이번 주는 Build에 100%, 다음 주는 Imagine에 100% 등 극단적 유연성).',
    coreCons: 'Build나 고화질 Video를 무리하게 돌리면 일반 Grok Chat의 유료 한도까지 단숨에 증발함.',
    bestPersona: '실시간 X 트렌드 분석, 영상/이미지 생성, 앱 빌더를 유연하게 번갈아 가며 쓰는 크리에이터'
  }
];

// 2. 모델별 상대적 무게 (100만 토큰당 크레딧 / 단가)
export const MODEL_WEIGHTS_DATA: ModelWeightItem[] = [
  // OpenAI Codex / API 기준
  {
    id: 'gpt-5-6-sol',
    company: 'openai',
    modelName: 'GPT-5.6 Sol (Flagship)',
    inputCost1M: '$15.00',
    cachedInput1M: '$7.50',
    outputCost1M: '$60.00',
    relativeWeight: '100% (기준)',
    contextWindow: '256K',
    weightCategory: '최상위 고연산 (Heavy)',
    notes: '심층 추론(Reasoning) 및 고난도 시스템 엔지니어링 작업용. Thinking 토큰 포함.'
  },
  {
    id: 'gpt-5-6-terra',
    company: 'openai',
    modelName: 'GPT-5.6 Terra (Balanced)',
    inputCost1M: '$2.50',
    cachedInput1M: '$1.25',
    outputCost1M: '$10.00',
    relativeWeight: '약 17% (Sol 대비)',
    contextWindow: '128K',
    weightCategory: '중간 균형 (Balanced)',
    notes: '성능과 비용의 최적 균형. Sol의 1/6 수준 비용으로 대다수 프로덕션 코딩 커버.'
  },
  {
    id: 'gpt-5-6-luna',
    company: 'openai',
    modelName: 'GPT-5.6 Luna (Light)',
    inputCost1M: '$0.15',
    cachedInput1M: '$0.075',
    outputCost1M: '$0.60',
    relativeWeight: '약 1% (Sol 대비 1/100)',
    contextWindow: '128K',
    weightCategory: '초경량 고속 (Light)',
    notes: '비용 민감·실시간 자동완성에 최적화. 100만 토큰당 $0.15/$0.60 초저비용.'
  },

  // Anthropic API / Usage Credits 기준
  {
    id: 'claude-opus-5',
    company: 'anthropic',
    modelName: 'Claude Opus 5 (Flagship)',
    inputCost1M: '$15.00',
    cachedInput1M: '$1.50',
    outputCost1M: '$75.00',
    relativeWeight: '125% (최고가 티어)',
    contextWindow: '500K',
    weightCategory: '최상위 고연산 (Heavy)',
    notes: '엔터프라이즈 코딩 SOTA 플래그십. 다중 파일 대규모 리팩토링 및 시스템 설계.'
  },
  {
    id: 'claude-sonnet-5',
    company: 'anthropic',
    modelName: 'Claude Sonnet 5',
    inputCost1M: '$3.00',
    cachedInput1M: '$0.30',
    outputCost1M: '$15.00',
    relativeWeight: '약 25% (Opus의 1/5)',
    contextWindow: '300K',
    weightCategory: '중간 균형 (Balanced)',
    notes: '일상적인 코딩 및 대화의 주력 모델. Prompt Caching 시 입력 비용 90% 절감.'
  },
  {
    id: 'claude-fable-5',
    company: 'anthropic',
    modelName: 'Claude Fable',
    inputCost1M: '$1.00',
    cachedInput1M: '$0.10',
    outputCost1M: '$5.00',
    relativeWeight: '약 8% (가성비)',
    contextWindow: '300K',
    weightCategory: '초경량 고속 (Light)',
    notes: 'UI/UX 피그마 시안 변환 및 프론트엔드 인터랙션 특화 모델.'
  },

  // Google Gemini API 기준
  {
    id: 'gemini-3-7-flash',
    company: 'google',
    modelName: 'Gemini 3.7 Flash (2026.08 최신)',
    inputCost1M: '$0.10',
    cachedInput1M: '$0.025',
    outputCost1M: '$0.40',
    relativeWeight: '약 0.7% (압도적 가성비)',
    contextWindow: '2,000K (2M)',
    weightCategory: '초경량 고속 (Light)',
    notes: '2026.08 릴리즈. 초당 210토큰 속도와 200만 토큰 컨텍스트를 $0.10/$0.40에 제공.'
  },
  {
    id: 'gemini-3-5-flash-lite',
    company: 'google',
    modelName: 'Gemini 3.5 Flash-Lite',
    inputCost1M: '$0.075',
    cachedInput1M: '$0.018',
    outputCost1M: '$0.30',
    relativeWeight: '약 0.5% (최저가)',
    contextWindow: '1,000K (1M)',
    weightCategory: '초경량 고속 (Light)',
    notes: '유료 플랜 한도 소진 시 무료로 무제한 이어쓰기 가능한 백업 모델.'
  },

  // xAI (SpaceXAI) 기준
  {
    id: 'grok-4-6',
    company: 'xai',
    modelName: 'Grok 4.6 (2026.08 Flagship)',
    inputCost1M: '$2.00',
    cachedInput1M: '$0.20',
    outputCost1M: '$10.00',
    relativeWeight: '약 16% (중간)',
    contextWindow: '256K',
    weightCategory: '중간 균형 (Balanced)',
    notes: '장기 에이전틱 작업 및 고속 190 t/s 자율 코딩 특화. Colossus 2 클러스터 기반.'
  }
];

// 3. 이미지 및 영상 미디어 연산 비용 상세
export const MEDIA_PRICING_DATA: MediaPricingItem[] = [
  {
    company: 'openai',
    modelOrFeature: 'GPT-Image-2.0 (Output Image)',
    resolutionOrQuality: '표준 / 고해상도',
    costOrTokens: '$30 / 1M Tokens (이미지 입력 $8 / 1M)',
    notes: '해상도와 복잡도에 따라 토큰 수 가변. Chat 이미지 한도(하루 50장 등)는 Codex와 완전 별개.'
  },
  {
    company: 'google',
    modelOrFeature: 'Gemini 3.1 Flash Image (Nano Banana 2)',
    resolutionOrQuality: '0.5K / 1K / 2K / 4K',
    costOrTokens: '장당 약 $0.045 (0.5K) ~ $0.151 (4K)',
    notes: 'Output rate $60 / 1M tokens. 4K 기준 약 2,520 output tokens 소모.'
  },
  {
    company: 'google',
    modelOrFeature: 'Gemini 3 Pro Image (Nano Banana Pro)',
    resolutionOrQuality: '1K / 2K / 4K',
    costOrTokens: '장당 약 $0.134 (1K/2K) ~ $0.24 (4K)',
    notes: 'Output rate $120 / 1M tokens. 프로급 디테일 렌더링.'
  },
  {
    company: 'anthropic',
    modelOrFeature: 'Claude 5 Visuals',
    resolutionOrQuality: 'SVG / HTML / Charts / Artifacts',
    costOrTokens: '일반 텍스트/코드 토큰과 동일 요율 ($5~$75 / 1M)',
    notes: '사진/일러스트 생성 모델 없음. 코드로 렌더링하므로 별도 이미지 Quota 없이 일반 세션 토큰 소비.'
  },
  {
    company: 'xai',
    modelOrFeature: 'Grok Imagine Quality (1K / 2K)',
    resolutionOrQuality: '1K / 2K 고품질 이미지',
    costOrTokens: '장당 $0.05 (1K) / $0.07 (2K)',
    notes: 'Weekly Compute Pool에서 Chat보다 큰 폭으로 차감. 일반 Imagine은 장당 $0.02.'
  },
  {
    company: 'xai',
    modelOrFeature: 'Grok Video (480p / 720p)',
    resolutionOrQuality: '480p / 720p 동영상',
    costOrTokens: '초당 $0.05 (480p) / $0.07 (720p)',
    notes: '720p 10초 영상 생성 시 약 $0.70 상당의 초고연산 소모. Weekly Pool 급격히 감소.'
  }
];

// 4. "사용량을 많이 잡아먹는 행동" 4사 비교
export const ACTION_CONSUMPTION_MATRIX = [
  {
    action: '짧은 일반 질문 (FAQ, 단답)',
    chatgpt: '🟢 매우 적음 (Luna 모드 처리)',
    gemini: '🟢 매우 적음 (Flash 계열 처리)',
    claude: '🟢 매우 적음 (Haiku/Sonnet)',
    grok: '🟢 매우 적음 (Weekly pool 미미한 소모)'
  },
  {
    action: '긴 대화 세션 계속 유지 (컨텍스트 누적)',
    chatgpt: '⚠️ 점진적 증가 (이전 히스토리 토큰)',
    gemini: '⚠️ 2M 컨텍스트로 안정적이나 compute 증가',
    claude: '🚨 급격히 증가 (이전 턴 전체가 새 프롬프트로 재계산)',
    grok: '⚠️ 세션 길이에 따라 compute 비례 증가'
  },
  {
    action: '최고 난도 심층 추론 (High Reasoning)',
    chatgpt: '🚨 GPT-5.6 Sol 고연산 CoT 토큰 소모',
    gemini: '🚨 Extended/Deep Think 시 compute 대폭 소모',
    claude: '🚨 Thinking Budget(예산)만큼 출력 토큰 급증',
    grok: '🚨 Think 모드 가동 시 CoT 토큰 소모'
  },
  {
    action: '대용량 파일/문서 여러 개 주입',
    chatgpt: '📁 Chat 도구 한도 + 파일 입력 토큰',
    gemini: '⚡ 2M 토큰 소화, compute 증가',
    claude: '🚨 공용 Claude usage 일괄 증가 (세션 압박)',
    grok: '⚡ Weekly pool에서 파일 크기만큼 차감'
  },
  {
    action: '이미지 단건/대량 생성',
    chatgpt: '🖼️ 별도 Image Quota (Codex와 분리 보존)',
    gemini: '⚠️ Gemini compute allowance에서 추가 차감',
    claude: '❌ 생성 모델 없음 (코드/SVG로 대체)',
    grok: '🚨 Weekly pool에서 Chat보다 빠르게 차감'
  },
  {
    action: '고화질 AI 동영상 생성',
    chatgpt: '🎬 별도 Media 기능 적용',
    gemini: '🚨 매우 무거운 미디어 작업으로 compute 소모',
    claude: '❌ 자체 영상 생성 없음',
    grok: '💥 720p 10초당 $0.70 상당 Weekly pool 초거대 차감'
  },
  {
    action: '장시간 코딩 에이전트 실행 (Claude Code / Antigravity / Work / Build)',
    chatgpt: '🟢 Work/Codex 한도만 감소 (일반 Chat 100% 안전)',
    gemini: '🟢 Antigravity quota만 감소 (Gemini App 100% 안전)',
    claude: '🚨 Chat 한도까지 함께 감소 (저녁 대화 불가 가능)',
    grok: '🚨 Chat 유료 한도까지 함께 감소 (무료 티어로 강등)'
  }
];

// 5. 플랜별 가성비 비교 ($20급 vs $100~$200급)
export const PLAN_TIERS_COMPARISON: PlanTierComparison[] = [
  {
    tierName: '$20/월 급 (표준)',
    openai: {
      planName: 'ChatGPT Plus ($20/월)',
      price: '$20 / 월',
      features: 'GPT-5.6 Terra 무제한, GPT-5.6 Sol 일일 한도, Canvas, 별도 Image Quota, Work/Codex 기본 한도',
      bestFor: '일상 대화와 코딩, 이미지를 골고루 쓰며 Chat 한도를 지키고 싶은 올라운더'
    },
    google: {
      planName: 'Google AI Pro ($19.99/월)',
      price: '$19.99 / 월',
      features: 'Gemini 3.7 Flash/Pro (4× 기준한도, 1M 컨텍스트), 2TB Google One, Antigravity 5시간+주간 quota',
      bestFor: '2TB 구글 드라이브 스토리지와 Antigravity 분리형 코딩을 원하는 연구자/개발자'
    },
    anthropic: {
      planName: 'Claude Pro ($20/월)',
      price: '$20 / 월',
      features: 'Claude Opus 5 / Sonnet 5 우선 접속, 5시간 세션당 5배 사용량, Claude Code 지원',
      bestFor: '최고 품질의 문장력과 SOTA 코딩 모델(Opus 5)에 모든 사용량을 쏟아붓고 싶은 개인'
    },
    xai: {
      planName: 'SuperGrok / Premium+ ($16~$30/월)',
      price: '$16 ~ $30 / 월',
      features: 'Grok 4.6, Imagine, Voice, Build 통합 Weekly Pool, X(트위터) 무광고',
      bestFor: '실시간 X 트렌드, 이미지/비디오 생성, 빠른 프로토타이핑을 자유롭게 오가는 유저'
    }
  },
  {
    tierName: '$100~$200/월 급 (헤비/프로)',
    openai: {
      planName: 'ChatGPT Pro ($200/월)',
      price: '$200 / 월',
      features: 'GPT-5.6 Sol 무제한/최우선 접속, 대용량 CoT 추론, Codex 대용량 Agentic Allowance',
      bestFor: '최고 난도 수학/과학/엔지니어링 시스템 설계를 하루 종일 돌리는 헤비 아키텍트'
    },
    google: {
      planName: 'Google AI Ultra ($100~$200급)',
      price: 'Enterprise / Ultra',
      features: 'Pro 대비 5×~20× 사용량, 2M+ 풀 컨텍스트, Antigravity 최고 5시간+주간 quota',
      bestFor: '수백 페이지 문서 수십 권과 대형 레포지토리를 매일 통째로 분석하는 기업 연구원'
    },
    anthropic: {
      planName: 'Claude Max (Max 5x / Max 20x)',
      price: '$100 (5x) ~ $200 (20x) / 월',
      features: '세션당 5배~20배 압도적 사용량, Opus 5 풀 리소스, Claude Code 대규모 빌드',
      bestFor: 'Claude Code로 하루 8시간 이상 상시 자율 코딩을 수행하는 전업 소프트웨어 엔지니어'
    },
    xai: {
      planName: 'xAI Enterprise / Extra Credits Tier',
      price: '$100+ 종량제 Top-up',
      features: '대용량 Weekly Pool + Extra Usage Credits 자동 충전, 고화질 Video 대량 렌더링',
      bestFor: 'AI 동영상 생성 및 Grok Build로 상용 서비스를 구축하는 스타트업'
    }
  }
];
