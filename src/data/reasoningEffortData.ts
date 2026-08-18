import { ReasoningEffortTier } from '../types/ai';

export interface ScenarioStepResult {
  level: 'Low' | 'Medium' | 'High' | 'Extra High' | 'Max';
  thinkingTime: string;
  tokensUsed: string;
  cost: string;
  verdict: '🔴 실패 (버그 지속)' | '🟡 부분 해결 (엣지케이스 미흡)' | '🟢 완전 해결 (100% 성공)' | '👑 초과 달성 (운영 가이드 동봉)';
  thoughtSummary: string;
  outputCodeOrSnippet: string;
  explanation: string;
}

export interface ReasoningBenchmarkScenario {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  whyThinkingMatters: string;
  levels: ScenarioStepResult[];
}

export interface ApiPlatformPreset {
  platform: string;
  parameterName: string;
  codeSnippet: string;
  minBudget: string;
  maxBudget: string;
  docsUrl: string;
}

export const REASONING_BENCHMARK_SCENARIOS: ReasoningBenchmarkScenario[] = [
  {
    id: 'scenario-async-race-condition',
    title: '🐛 비동기 WebSocket 재연결 큐(Queue) 메모리 누수 & Race Condition 해결',
    category: '동시성 / 실전 디버깅',
    problemStatement: '클라이언트 네트워크가 끊겼다 재연결될 때, 큐에 쌓인 메시지가 중복 전송되거나 누락되고, 이벤트 리스너 클로저(Closure)가 해제되지 않아 Node.js 프로세스 메모리가 계속 증가하는 복합 버그',
    whyThinkingMatters: '단순 타이머로는 동시성(Race Condition)을 잡을 수 없으며, 이벤트 리스너 해제와 락(Lock) 메커니즘을 다단계로 검증해야만 해결할 수 있습니다.',
    levels: [
      {
        level: 'Low',
        thinkingTime: '1.2초',
        tokensUsed: '650 토큰',
        cost: '$0.006',
        verdict: '🔴 실패 (버그 지속)',
        thoughtSummary: '질문 텍스트만 보고 단순히 setTimeout으로 재시도 시간만 늘림.',
        outputCodeOrSnippet: `function reconnect() {\n  setTimeout(() => ws.connect(), 3000); // ❌ 리스너 누수 방치\n}`,
        explanation: '클로저에 바인딩된 old socket 이벤트 핸들러가 해제되지 않아 MaxListenersExceededWarning 발생 및 메모리 누수 해결 실패.'
      },
      {
        level: 'Medium',
        thinkingTime: '6.5초',
        tokensUsed: '3,200 토큰',
        cost: '$0.028',
        verdict: '🟡 부분 해결 (엣지케이스 미흡)',
        thoughtSummary: '지수 백오프(Exponential Backoff)를 도입했으나 큐 플러시 도중 들어오는 신규 메시지 순서 보장 누락.',
        outputCodeOrSnippet: `let attempts = 0;\nfunction retry() {\n  const delay = Math.min(1000 * 2 ** attempts++, 30000);\n  setTimeout(() => connect(), delay);\n}`,
        explanation: '재연결 지연 시간은 정상화되었으나, 재연결 순간 병렬로 인큐(Enqueue)되는 데이터의 순서가 뒤바뀌는 Race Condition 미해결.'
      },
      {
        level: 'High',
        thinkingTime: '18.5초',
        tokensUsed: '12,400 토큰',
        cost: '$0.115',
        verdict: '🟢 완전 해결 (100% 성공)',
        thoughtSummary: '락 프리(Lock-free) 순차 큐 구현 + 이전 소켓의 removeAllListeners() 및 WeakRef 기반 클로저 해제 전수 반영.',
        outputCodeOrSnippet: `class SafeQueue {\n  async flush() {\n    if (this.isFlushing) return;\n    this.isFlushing = true;\n    try {\n      while (this.queue.length > 0) {\n        const item = this.queue.shift();\n        await this.send(item);\n      }\n    } finally { this.isFlushing = false; }\n  }\n}`,
        explanation: '동시성 락(Lock) 플래그와 완벽한 소켓 이벤트 클린업으로 메모리 누수 및 메시지 순서 뒤바뀜 100% 박멸.'
      },
      {
        level: 'Extra High',
        thinkingTime: '52초',
        tokensUsed: '34,000 토큰',
        cost: '$0.320',
        verdict: '👑 초과 달성 (운영 가이드 동봉)',
        thoughtSummary: '유한 상태 머신(XState/FSM) 기반 WebSocket 생명주기 설계 + 백프레셔(Backpressure) 버퍼 제한 및 Jest 동시성 재현 테스트 10종 자동 생성.',
        outputCodeOrSnippet: `// FSM State Machine: DISCONNECTED -> CONNECTING -> CONNECTED -> RECONNECTING\n// + Jest Concurrency Stress Test Suite included`,
        explanation: '10만 건의 초당 재연결 동시성 부하 테스트를 통과하는 완벽한 프로덕션 레벨 회복 탄력성(Resilience) 아키텍처 완성.'
      },
      {
        level: 'Max',
        thinkingTime: '3분 10초',
        tokensUsed: '78,000 토큰',
        cost: '$1.450',
        verdict: '👑 초과 달성 (운영 가이드 동봉)',
        thoughtSummary: '다중 인스턴스 분산 환경(Redis Pub/Sub) 장애 복구 프로토콜 + 커널 TCP 버퍼(SO_KEEPALIVE) 튜닝 가이드라인까지 동봉.',
        outputCodeOrSnippet: `// Multi-node Cluster WebSocket Bridge with Redis Streams\n// + Linux Kernel TCP Buffer Optimization Guide (sysctl.conf)`,
        explanation: '단일 노드를 넘어 글로벌 멀티 리전 클러스터 환경에서의 무중단 WebSocket 세션 유지 및 인프라 설정까지 전수 완결.'
      }
    ]
  },
  {
    id: 'scenario-aime-math-olympiad',
    title: '🧮 AIME 2026 미국 수학 올림피아드 15번 초고난도 조합론 난제',
    problemStatement: '특정 격자점 위를 이동하는 로봇이 동일 좌표를 2회 이상 방문하지 않으면서 N단계 후 원점으로 돌아오는 경로의 경우의 수를 구하는 다단계 정수론/조합론 복합 문제',
    category: '수학 / 알고리즘 추론',
    whyThinkingMatters: '직관이나 암기된 공식으로 풀면 3~4단계에서 대칭성 누락으로 반드시 오답이 발생하며, 생성함수와 이중 검산을 거쳐야 정답을 맞출 수 있습니다.',
    levels: [
      {
        level: 'Low',
        thinkingTime: '1.5초',
        tokensUsed: '700 토큰',
        cost: '$0.007',
        verdict: '🔴 실패 (버그 지속)',
        thoughtSummary: '단순 대칭 경로만 고려하여 2단계에서 계산 실수 발생.',
        outputCodeOrSnippet: `Result: 486 (❌ 오답 - 회전 대칭성 중복 계산)`,
        explanation: '좌표계 회전 시 발생하는 자가 교차(Self-intersection) 경우의 수를 거르지 못해 오답 출력.'
      },
      {
        level: 'Medium',
        thinkingTime: '7.2초',
        tokensUsed: '3,500 토큰',
        cost: '$0.030',
        verdict: '🟡 부분 해결 (엣지케이스 미흡)',
        thoughtSummary: '점화식을 세워 전개했으나 N=8일 때의 특수 엣지 케이스 2개 누락.',
        outputCodeOrSnippet: `Result: 512 (❌ 오답 - 경계 조건 누락)`,
        explanation: '경계면에서의 반사 경로를 독립 사건으로 잘못 가정하여 최종 정답에서 42 차이 발생.'
      },
      {
        level: 'High',
        thinkingTime: '22.0초',
        tokensUsed: '14,200 토큰',
        cost: '$0.130',
        verdict: '🟢 완전 해결 (100% 성공)',
        thoughtSummary: '생성함수(Generating Function) 및 폴리아 열거 정리(Polya Enumeration)를 적용하여 정답 도출.',
        outputCodeOrSnippet: `Result: 554 (🟢 정답 - 공식 정답표와 100% 일치)`,
        explanation: '대칭군(Symmetric Group) 분석과 역추적 점화식을 크로스체크하여 정확한 정답 도출.'
      },
      {
        level: 'Extra High',
        thinkingTime: '65초',
        tokensUsed: '38,000 토큰',
        cost: '$0.360',
        verdict: '🟢 완전 해결 (100% 성공)',
        thoughtSummary: '3가지 완전히 다른 수학적 풀이법(1. 행렬 거듭제곱, 2. 좌표 변환, 3. 다이나믹 프로그래밍)으로 교차 검증.',
        outputCodeOrSnippet: `Method 1: Generating Function -> 554\nMethod 2: Matrix Exponentiation -> 554\nMethod 3: DP Enumeration -> 554 (All Verified)`,
        explanation: '세 가지 독립된 수학적 증명을 병렬 전개하여 계산 실수 가능성을 0%로 차단.'
      },
      {
        level: 'Max',
        thinkingTime: '2분 45초',
        tokensUsed: '72,000 토큰',
        cost: '$1.350',
        verdict: '👑 초과 달성 (운영 가이드 동봉)',
        thoughtSummary: '임의의 N차원 격자 공간으로 일반화(Generalization)된 정리 증명 및 학술 LaTeX 논문 포맷 수식 도출.',
        outputCodeOrSnippet: `Theorem 1 (Generalized Self-Avoiding Loops in Z^d):\n\\[ C(N, d) = \\frac{1}{2d} \\sum_{k=1}^{2d} \\dots \\]\n+ Python verification script included`,
        explanation: '문제를 푸는 것을 넘어 해당 조합론 문제의 일반화된 닫힌 형식(Closed-form) 수식과 파이썬 시뮬레이션 검증 코드까지 완성.'
      }
    ]
  }
];

export const API_PLATFORM_PRESETS: ApiPlatformPreset[] = [
  {
    platform: 'OpenAI (GPT-5.6 Sol / Terra & o-Series)',
    parameterName: 'reasoning_effort',
    codeSnippet: `const response = await openai.chat.completions.create({
  model: "gpt-5.6-sol", // 또는 gpt-5.6-terra
  reasoning_effort: "high", // 'low' | 'medium' | 'high'
  messages: [{ role: "user", content: "..." }]
});`,
    minBudget: 'Low (최소 500 토큰)',
    maxBudget: 'High (최대 25,000+ 토큰)',
    docsUrl: 'https://platform.openai.com/docs/guides/reasoning'
  },
  {
    platform: 'Anthropic (Claude Opus 5 / Fable 5 / Sonnet 5)',
    parameterName: 'thinking.budget_tokens',
    codeSnippet: `const response = await anthropic.messages.create({
  model: "claude-opus-5",
  max_tokens: 20000,
  thinking: {
    type: "enabled",
    budget_tokens: 16000 // 1,024 ~ 64,000 토큰 직접 지정
  },
  messages: [{ role: "user", content: "..." }]
});`,
    minBudget: '1,024 토큰 (Low)',
    maxBudget: '64,000 토큰 (Max / Ultra)',
    docsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
  },
  {
    platform: 'Google DeepMind (Gemini 3.7 Flash & Pro)',
    parameterName: 'thinking_config.thinking_budget',
    codeSnippet: `const response = await ai.models.generateContent({
  model: "gemini-3.7-flash",
  config: {
    thinkingConfig: {
      thinkingBudget: 8192 // 1,024 ~ 24,576 토큰 (0은 Thinking Off)
    }
  },
  contents: "..."
});`,
    minBudget: '1,024 토큰 (Low)',
    maxBudget: '24,576 토큰 (High)',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
  },
  {
    platform: 'DeepSeek (R1 / R2 / V3.5)',
    parameterName: '<think> tokens parser',
    codeSnippet: `const response = await openai.chat.completions.create({
  baseURL: "https://api.deepseek.com",
  model: "deepseek-reasoner", // R2 / V3.5
  max_tokens: 16384,
  messages: [{ role: "user", content: "..." }]
});
// reasoning_content 필드로 CoT 사고 과정 분리 전달됨`,
    minBudget: '512 토큰',
    maxBudget: '32,768 토큰',
    docsUrl: 'https://api-docs.deepseek.com/guides/reasoning_model'
  }
];

export const REASONING_EFFORT_TIERS_DATA: ReasoningEffortTier[] = [
  {
    level: 'Low',
    badge: '⚡ Low (초고속 / 저비용)',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeColor: 'text-emerald-400',
    summary: '사고 과정을 최소화하여 1~3초 내에 실시간 답변을 출력하는 모드입니다. 단순 문법 교정, 린트 검사, 단답형 질의에 최적입니다.',
    avgThinkingTime: '1~3초',
    tokenConsumption: '500 ~ 1,500 Thinking Tokens',
    costMultiplier: '1× (기본 최저가)',
    bestUseCases: [
      '단순 타이포/오타 교정 및 마크다운 포매팅',
      'HTML/CSS 인라인 스타일 조정 및 컬러 코드 변경',
      '단순 외국어 번역 및 일상적인 질의응답',
      '단일 헬퍼 함수 유닛 테스트 뼈대 생성'
    ],
    cautionNote: '다단계 인과 추론이나 비동기 버그에서는 자체 검증을 생략하므로 오답(환각) 확률이 매우 높습니다.',
    models: [
      {
        company: 'openai',
        modelName: 'GPT-5.6 Terra / Sol',
        settingName: "reasoning_effort: 'low'",
        latencySeconds: '1.8초',
        thinkingTokens: '800 토큰',
        sweBenchScore: 82.4,
        aimeMathScore: 78.5,
        estimatedCostPerQuery: '$0.008',
        officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
      },
      {
        company: 'anthropic',
        modelName: 'Claude Opus 5 / Sonnet 5',
        settingName: 'thinking_budget: 1024',
        latencySeconds: '2.1초',
        thinkingTokens: '1,024 토큰',
        sweBenchScore: 84.0,
        aimeMathScore: 80.2,
        estimatedCostPerQuery: '$0.025',
        officialDocsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
      },
      {
        company: 'google',
        modelName: 'Gemini 3.7 Flash',
        settingName: "thinking_budget: 1024",
        latencySeconds: '0.9초 (최고속)',
        thinkingTokens: '600 토큰',
        sweBenchScore: 81.5,
        aimeMathScore: 76.8,
        estimatedCostPerQuery: '$0.003',
        officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
      },
      {
        company: 'opensource',
        modelName: 'DeepSeek-R2 / V3.5',
        settingName: 'cot_steps: 4',
        latencySeconds: '1.5초',
        thinkingTokens: '750 토큰',
        sweBenchScore: 80.8,
        aimeMathScore: 79.1,
        estimatedCostPerQuery: '$0.001',
        officialDocsUrl: 'https://api-docs.deepseek.com/guides/reasoning_model'
      }
    ]
  },
  {
    level: 'Medium',
    badge: '⚖️ Medium (표준 권장 / 일상 실무)',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    badgeColor: 'text-blue-400',
    summary: '속도와 지능의 황금 균형점으로, 대부분의 실무 코딩, API 연동, 비즈니스 문서 초안 작성을 위한 기본 권장 디폴트 모드입니다.',
    avgThinkingTime: '5~12초',
    tokenConsumption: '2,000 ~ 4,000 Thinking Tokens',
    costMultiplier: '2.5× ~ 4×',
    bestUseCases: [
      'React/Vue 실무 컴포넌트 개발 및 상태 관리(Zustand/Redux) 로직',
      'REST/GraphQL API 엔드포인트 설계 및 에러 핸들링',
      'SQL 쿼리 작성 및 단일 테이블 인덱스 최적화',
      '비즈니스 기획서(PRD) 및 아키텍처 초안 작성'
    ],
    cautionNote: '대다수 일상 작업에 가장 이상적이나, 복합 동시성(Concurrency) 버그는 High 이상 권장.',
    models: [
      {
        company: 'openai',
        modelName: 'GPT-5.6 Terra / Sol',
        settingName: "reasoning_effort: 'medium'",
        latencySeconds: '6.5초',
        thinkingTokens: '2,800 토큰',
        sweBenchScore: 89.7,
        aimeMathScore: 88.4,
        estimatedCostPerQuery: '$0.028',
        officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
      },
      {
        company: 'anthropic',
        modelName: 'Claude Opus 5 / Sonnet 5',
        settingName: 'thinking_budget: 4096',
        latencySeconds: '8.2초',
        thinkingTokens: '4,096 토큰',
        sweBenchScore: 91.5,
        aimeMathScore: 89.6,
        estimatedCostPerQuery: '$0.095',
        officialDocsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
      },
      {
        company: 'google',
        modelName: 'Gemini 3.7 Flash',
        settingName: "thinking_budget: 4096",
        latencySeconds: '4.2초',
        thinkingTokens: '2,500 토큰',
        sweBenchScore: 88.6,
        aimeMathScore: 86.2,
        estimatedCostPerQuery: '$0.012',
        officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
      },
      {
        company: 'opensource',
        modelName: 'DeepSeek-R2 / V3.5',
        settingName: 'cot_steps: 12',
        latencySeconds: '5.8초',
        thinkingTokens: '3,000 토큰',
        sweBenchScore: 87.9,
        aimeMathScore: 89.0,
        estimatedCostPerQuery: '$0.003',
        officialDocsUrl: 'https://api-docs.deepseek.com/guides/reasoning_model'
      }
    ]
  },
  {
    level: 'High',
    badge: '🟠 High (심층 추론 / 복합 설계)',
    badgeBg: 'bg-orange-500/10 border-orange-500/30',
    badgeColor: 'text-orange-400',
    summary: '잠재적인 엣지 케이스와 동시성(Concurrency) 문제를 스스로 시뮬레이션하고 반례를 검증하는 심층 추론 모드입니다.',
    avgThinkingTime: '15~30초',
    tokenConsumption: '8,000 ~ 16,000 Thinking Tokens',
    costMultiplier: '8× ~ 15×',
    bestUseCases: [
      '다중 파일 아키텍처 설계 및 상태 머신(FSM) 구축',
      'WebSocket/비동기 Race Condition 및 메모리 누수 버그 해결',
      '금융 퀀트 알고리즘 및 복합 암호학 수식 구현',
      '대형 리팩토링 시 회귀 버그(Regression) 방어'
    ],
    cautionNote: '토큰 소모량이 급증하므로 단순 CRUD 질의에는 비용 낭비가 될 수 있습니다.',
    models: [
      {
        company: 'openai',
        modelName: 'GPT-5.6 Sol',
        settingName: "reasoning_effort: 'high'",
        latencySeconds: '18.4초',
        thinkingTokens: '11,500 토큰',
        sweBenchScore: 94.2,
        aimeMathScore: 94.6,
        estimatedCostPerQuery: '$0.115',
        officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
      },
      {
        company: 'anthropic',
        modelName: 'Claude Opus 5',
        settingName: 'thinking_budget: 16000',
        latencySeconds: '22.0초',
        thinkingTokens: '16,000 토큰',
        sweBenchScore: 95.8,
        aimeMathScore: 93.8,
        estimatedCostPerQuery: '$0.380',
        officialDocsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
      },
      {
        company: 'google',
        modelName: 'Gemini 3.7 Flash / Pro',
        settingName: "thinking_budget: 12288",
        latencySeconds: '12.5초',
        thinkingTokens: '9,800 토큰',
        sweBenchScore: 91.8,
        aimeMathScore: 89.4,
        estimatedCostPerQuery: '$0.045',
        officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
      },
      {
        company: 'opensource',
        modelName: 'DeepSeek-R2 / V3.5',
        settingName: 'cot_steps: 32',
        latencySeconds: '16.2초',
        thinkingTokens: '12,000 토큰',
        sweBenchScore: 90.6,
        aimeMathScore: 93.8,
        estimatedCostPerQuery: '$0.012',
        officialDocsUrl: 'https://api-docs.deepseek.com/guides/reasoning_model'
      }
    ]
  },
  {
    level: 'Extra High',
    badge: '🟣 Extra High (극한 난제 / 올림피아드)',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    badgeColor: 'text-purple-400',
    summary: 'AIME 수학 올림피아드 만점 도전 및 박사급(GPQA) 과학 역설을 풀기 위해 수십 번의 자기 검증(Self-Consistency)을 반복합니다.',
    avgThinkingTime: '45~90초',
    tokenConsumption: '24,000 ~ 48,000 Thinking Tokens',
    costMultiplier: '25× ~ 45×',
    bestUseCases: [
      'AIME/IMO급 초고난도 수학 및 조합론 알고리즘 증명',
      'GPQA Diamond 박사급 유기화학/양자역학 난제 풀이',
      '모놀리식 레거시 시스템의 MSA 전면 분할 설계',
      '보안 취약점 제로데이(0-Day) 분석 및 방어 코드'
    ],
    cautionNote: '답변 생성까지 1분 이상 소요되므로 비동기 백그라운드 작업에 적합합니다.',
    models: [
      {
        company: 'openai',
        modelName: 'GPT-5.6 Sol',
        settingName: "reasoning_effort: 'extra_high'",
        latencySeconds: '52초',
        thinkingTokens: '32,000 토큰',
        sweBenchScore: 95.8,
        aimeMathScore: 96.2,
        estimatedCostPerQuery: '$0.320',
        officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
      },
      {
        company: 'anthropic',
        modelName: 'Claude Fable 5 / Opus 5',
        settingName: 'thinking_budget: 32000',
        latencySeconds: '68초',
        thinkingTokens: '32,000 토큰',
        sweBenchScore: 96.5,
        aimeMathScore: 95.8,
        estimatedCostPerQuery: '$0.750',
        officialDocsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
      },
      {
        company: 'google',
        modelName: 'Gemini 3.1 Pro Deep Think',
        settingName: "thinking_budget: 24576",
        latencySeconds: '42초',
        thinkingTokens: '24,000 토큰',
        sweBenchScore: 93.0,
        aimeMathScore: 92.5,
        estimatedCostPerQuery: '$0.280',
        officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
      },
      {
        company: 'xai',
        modelName: 'Grok 4.6 Deep Think',
        settingName: 'grok_think_budget: 32k',
        latencySeconds: '48초',
        thinkingTokens: '30,000 토큰',
        sweBenchScore: 93.4,
        aimeMathScore: 94.2,
        estimatedCostPerQuery: '$0.180',
        officialDocsUrl: 'https://docs.x.ai/docs/models#grok-4'
      }
    ]
  },
  {
    level: 'Max',
    badge: '💥 Max / Unlimited (자율 에이전트 무제한 CoT)',
    badgeBg: 'bg-rose-500/10 border-rose-500/30',
    badgeColor: 'text-rose-400',
    summary: '토큰 예산 제한 없이 에이전트가 100% 만족할 때까지 다단계 자율 검증 및 수정을 거치는 궁극의 연산 모드입니다.',
    avgThinkingTime: '2분 ~ 5분+ (비동기)',
    tokenConsumption: '64,000 ~ 128,000+ Thinking Tokens',
    costMultiplier: '60× ~ 120×',
    bestUseCases: [
      'Deep Research 50개 글로벌 웹소스 자율 탐색 및 20페이지 백서',
      'SWE-bench Pro 전체 레포지토리 자가 빌드 및 테스트 통과',
      "Humanity's Last Exam (HLE) 극한의 다학제 인과 추론",
      '스타트업 MVP 풀스택 웹앱 전 자율 개발 (/goal 위임)'
    ],
    cautionNote: '건당 수 달러의 API 비용이 발생할 수 있으므로 상용 프로덕션에서는 반드시 예산 락(Budget Cap) 설정 필수.',
    models: [
      {
        company: 'anthropic',
        modelName: 'Claude Fable 5 / Opus 5 (Max)',
        settingName: 'thinking_budget: 64000',
        latencySeconds: '3분 15초',
        thinkingTokens: '64,000 토큰',
        sweBenchScore: 96.8,
        aimeMathScore: 96.5,
        estimatedCostPerQuery: '$1.50 ~ $2.20',
        officialDocsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking'
      },
      {
        company: 'openai',
        modelName: 'GPT-5.6 Sol (Deep Research / Max)',
        settingName: "reasoning_effort: 'max'",
        latencySeconds: '4분 12초',
        thinkingTokens: '85,000 토큰',
        sweBenchScore: 96.0,
        aimeMathScore: 96.7,
        estimatedCostPerQuery: '$1.20 ~ $1.80',
        officialDocsUrl: 'https://platform.openai.com/docs/guides/reasoning'
      },
      {
        company: 'google',
        modelName: 'Google Antigravity 2.0 (Planning Max)',
        settingName: 'agent_depth: max',
        latencySeconds: '2분 40초',
        thinkingTokens: '70,000 토큰',
        sweBenchScore: 95.2,
        aimeMathScore: 94.0,
        estimatedCostPerQuery: '$0.45 ~ $0.80',
        officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/thinking'
      },
      {
        company: 'xai',
        modelName: 'Grok 4.6 Colossus 2 Cluster',
        settingName: 'deepsearch_rounds: 10',
        latencySeconds: '2분 10초',
        thinkingTokens: '55,000 토큰',
        sweBenchScore: 94.5,
        aimeMathScore: 95.0,
        estimatedCostPerQuery: '$0.60 ~ $1.00',
        officialDocsUrl: 'https://docs.x.ai/docs/models#grok-4'
      }
    ]
  }
];
