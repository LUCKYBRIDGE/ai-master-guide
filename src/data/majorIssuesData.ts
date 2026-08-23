export type IssueProvider = 'OpenAI' | 'Anthropic' | 'Google' | 'xAI';

export type IssueCategory =
  | 'usage-limit'
  | 'reset-compensation'
  | 'outage'
  | 'pricing-billing'
  | 'model-feature-change'
  | 'policy';

export type CommunityScale =
  | 'individual'
  | 'multiple'
  | 'many'
  | 'broad-discussion'
  | 'unknown';

export type EvidenceLevel =
  | 'user-reports'
  | 'multi-source-reports'
  | 'staff-comment'
  | 'official-status'
  | 'official-doc';

export type VerificationStatus =
  | 'watching'
  | 'partially-confirmed'
  | 'confirmed'
  | 'resolved'
  | 'refuted';

export type IssueSourceType =
  | 'official-doc'
  | 'official-status'
  | 'official-announcement'
  | 'staff'
  | 'support'
  | 'github'
  | 'media'
  | 'community';

export interface IssueSource {
  title: string;
  publisher: string;
  url: string;
  sourceType: IssueSourceType;
  publishedAt?: string;
}

export interface OfficialImpact {
  label: string;
  detail?: string;
}

export interface MajorIssue {
  id: string;
  title: string;
  provider: IssueProvider;
  product: string;
  category: IssueCategory;
  communityScale: CommunityScale;
  evidenceLevel: EvidenceLevel;
  verificationStatus: VerificationStatus;
  officialImpact?: OfficialImpact;
  displayDate: string;
  lastMajorUpdateAt: string;
  firstObservedAt?: string;
  periodStart?: string;
  periodEnd?: string;
  officialMentionAt?: string;
  resolvedAt?: string;
  lastCheckedAt: string;
  datePrecision: 'exact' | 'range' | 'approximate';
  affectedScope: string[];
  summary: string;
  confirmedFacts: string[];
  unverifiedPoints: string[];
  communityScaleBasis?: string;
  sources: IssueSource[];
}

export const MAJOR_ISSUES_SNAPSHOT = {
  earliestIncludedDate: '2026-05-01',
  verifiedAt: '2026-08-23',
  localeDate: '2026년 8월 23일',
  policy:
    '사용자 논의 규모와 공식 영향 범위를 분리하고, 마지막 확인일이 아니라 실제 주요 업데이트 날짜를 기준으로 최신순 정렬합니다.',
};

export const PROVIDER_LABELS: Record<IssueProvider, string> = {
  OpenAI: 'OpenAI',
  Anthropic: 'Anthropic',
  Google: 'Google',
  xAI: 'xAI',
};

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  'usage-limit': '사용량·한도',
  'reset-compensation': '초기화·보상',
  outage: '장애',
  'pricing-billing': '가격·결제',
  'model-feature-change': '모델·기능 변경',
  policy: '정책',
};

export const COMMUNITY_SCALE_LABELS: Record<CommunityScale, string> = {
  individual: '개별 사례',
  multiple: '복수 보고',
  many: '다수 보고',
  'broad-discussion': '광범위한 논의',
  unknown: '규모 판단 어려움',
};

export const EVIDENCE_LEVEL_LABELS: Record<EvidenceLevel, string> = {
  'user-reports': '사용자 보고',
  'multi-source-reports': '복수 독립 출처',
  'staff-comment': '관계자 직접 언급',
  'official-status': '공식 상태 페이지',
  'official-doc': '공식 문서·공지',
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  watching: '관찰 중',
  'partially-confirmed': '부분 확인',
  confirmed: '공식 확인',
  resolved: '해결',
  refuted: '반박',
};

export const MAJOR_ISSUES: MajorIssue[] = [
  {
    id: 'codex-usage-drain-aug-2026',
    title: 'Codex 주간 사용량이 이전보다 빠르게 줄어든다는 보고',
    provider: 'OpenAI',
    product: 'Codex · ChatGPT Work',
    category: 'usage-limit',
    communityScale: 'broad-discussion',
    evidenceLevel: 'staff-comment',
    verificationStatus: 'watching',
    officialImpact: {
      label: '플랫폼 전체 이상은 아직 확인되지 않음',
      detail: '8월 21일 관계자 설명 기준으로 조사는 진행 중이며, 전체적인 비정상 현상은 관측되지 않았다고 밝혔다.',
    },
    displayDate: '2026-08-21 업데이트',
    lastMajorUpdateAt: '2026-08-21T05:39:04Z',
    periodStart: '2026년 8월 중순경',
    officialMentionAt: '2026-08-21',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'approximate',
    affectedScope: ['Codex 유료 사용자 중 일부 보고', 'Plus·Pro 등 여러 요금제에서 커뮤니티 사례 존재'],
    summary:
      '8월 중순부터 비슷한 작업인데 주간 한도가 더 빨리 소모된다는 보고가 여러 스레드와 전용 사용량 메가스레드에서 반복됐다. OpenAI의 Codex·ChatGPT 관계자는 8월 21일 관련 보고를 조사 중이라고 밝혔지만, 현재 플랫폼 전체의 비정상 현상은 보지 못했다고 설명했다.',
    confirmedFacts: [
      'OpenAI 관계자가 사용량이 빨리 줄어든다는 보고를 중요하게 보고 조사 중이라고 직접 밝혔다.',
      '관계자는 플랫폼 전체에서 비정상적인 사용량 변화가 확인된 상태는 아니라고 설명했다.',
      '여러 독립적인 Reddit 스레드와 사용량 전용 메가스레드에서 유사한 체감 보고가 반복됐다.',
    ],
    unverifiedPoints: [
      '모든 구독 플랜의 주간 총량이 일괄 축소됐다는 주장은 공식 확인되지 않았다.',
      '커뮤니티에서 제시된 7~7.5배 감소, 약 44% 감소 같은 자체 계산은 전체 사용자에게 일반화할 수 없다.',
      '정확한 영향을 받은 계정 비율과 모든 사례의 공통 원인은 공개되지 않았다.',
    ],
    communityScaleBasis:
      '8월 17일 전용 메가스레드가 운영됐고, 8월 18~21일 사이 별개의 고반응 스레드에서 반복 보고가 확인됐다. 반응 수는 실제 피해 사용자 비율로 환산하지 않는다.',
    sources: [
      {
        title: 'Codex usage limits 차이 조사와 지원되지 않는 sub2api 사용 안내',
        publisher: 'Tibo Sottiaux / OpenAI',
        url: 'https://x.com/thsottiaux/status/2090675027670978569',
        sourceType: 'staff',
        publishedAt: '2026-08-21',
      },
      {
        title: 'Is the Usage limit nerfed?',
        publisher: 'Reddit r/codex',
        url: 'https://www.reddit.com/r/codex/comments/1vtiymv/is_the_usage_limit_nerfed/',
        sourceType: 'community',
        publishedAt: '2026-08-20',
      },
      {
        title: 'The real reason behind my sudden ~7.5x drop in weekly Plus limits',
        publisher: 'Reddit r/codex',
        url: 'https://www.reddit.com/r/codex/comments/1vrjady/the_real_reason_behind_my_sudden_75x_drop_in/',
        sourceType: 'community',
        publishedAt: '2026-08-18',
      },
      {
        title: 'Codex Usage and Operation Discussion',
        publisher: 'Reddit r/codex',
        url: 'https://www.reddit.com/r/codex/comments/1vqwcbs/codex_usage_and_operation_discussion_updated/',
        sourceType: 'community',
        publishedAt: '2026-08-17',
      },
    ],
  },
  {
    id: 'codex-20m-banked-reset',
    title: 'Codex 2천만 사용자 기념 Banked Reset 지급 발표',
    provider: 'OpenAI',
    product: 'Codex · ChatGPT Work',
    category: 'reset-compensation',
    communityScale: 'unknown',
    evidenceLevel: 'staff-comment',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '지급 대상이 명시됨',
      detail: '관계자 발표 기준 Codex와 ChatGPT Work 사용자에게 저장형 reset을 지급한다고 안내했다.',
    },
    displayDate: '2026-08-21',
    lastMajorUpdateAt: '2026-08-21T11:43:19Z',
    officialMentionAt: '2026-08-21',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['Codex 사용자', 'ChatGPT Work 사용자'],
    summary:
      'Codex가 2천만 active users를 넘긴 것을 기념해 Banked Reset을 지급한다고 관계자가 발표했다. 같은 날 별도 게시물에서 사용량 빠른 소진 보고에 대한 조사 내용을 설명했지만, reset 지급 사유 자체는 오류 보상이 아니라 사용자 수 이정표 기념으로 설명됐다.',
    confirmedFacts: [
      'Banked Reset은 즉시 사용하지 않고 보관했다가 필요할 때 적용할 수 있는 reset 형태다.',
      '8월 21일 발표의 명시적 사유는 2천만 active users 달성 기념이다.',
    ],
    unverifiedPoints: [
      '이 지급을 8월 사용량 논란에 대한 공식 보상으로 해석할 근거는 없다.',
      '개별 계정에서 실제로 보이는 지급 시점은 순차 적용 과정에 따라 달라질 수 있다.',
    ],
    sources: [
      {
        title: '20M active users banked reset 발표',
        publisher: 'Tibo Sottiaux / OpenAI',
        url: 'https://x.com/thsottiaux/status/2090766694897619318',
        sourceType: 'staff',
        publishedAt: '2026-08-21',
      },
      {
        title: 'Using Codex with your ChatGPT plan',
        publisher: 'OpenAI Help Center',
        url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan',
        sourceType: 'official-doc',
      },
    ],
  },
  {
    id: 'claude-code-weekly-promo-end',
    title: 'Claude Code 주간 한도 +50% 프로모션 종료',
    provider: 'Anthropic',
    product: 'Claude Code',
    category: 'usage-limit',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '대상 플랜 전체',
      detail: 'Pro, Max, Team 및 legacy seat-based Enterprise의 주간 한도가 프로모션 종료 후 표준 수준으로 복귀했다.',
    },
    displayDate: '2026-08-19',
    lastMajorUpdateAt: '2026-08-19',
    periodStart: '2026-05-13',
    periodEnd: '2026-08-19',
    resolvedAt: '2026-08-19',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['Claude Code Pro', 'Max', 'Team', 'legacy seat-based Enterprise'],
    summary:
      '5월 13일부터 한시적으로 적용되던 Claude Code 주간 사용량 +50% 프로모션이 8월 19일 종료됐다. 5시간 한도는 이 프로모션의 대상이 아니었으며, 종료 후 요금제나 결제 방식 변경 없이 주간 한도만 표준 수준으로 돌아간다고 Anthropic이 안내했다.',
    confirmedFacts: [
      '프로모션 기간은 2026-05-13부터 2026-08-19 11:59 PM PT까지였다.',
      '주간 사용량 한도만 50% 증가했고 5시간 사용량 한도는 변경되지 않았다.',
      'Free 및 consumption-based Enterprise seats는 프로모션 대상이 아니었다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Claude Code May–August 2026 weekly limits promotion',
        publisher: 'Claude Help Center',
        url: 'https://support.claude.com/en/articles/15910845-claude-code-may-august-2026-weekly-limits-promotion',
        sourceType: 'official-doc',
      },
    ],
  },
  {
    id: 'codex-sol-usage-jul29',
    title: 'GPT-5.6 Sol의 빠른 Codex 한도 소진을 OpenAI가 인정하고 개선',
    provider: 'OpenAI',
    product: 'GPT-5.6 Sol · Codex',
    category: 'usage-limit',
    communityScale: 'many',
    evidenceLevel: 'staff-comment',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '전체 비율 미공개',
      detail: '관계자는 평균보다 훨씬 빨리 소모하는 장기 꼬리 사용자군을 충분히 고려하지 못했다고 설명했다.',
    },
    displayDate: '2026-07-29',
    lastMajorUpdateAt: '2026-07-29T04:09:00Z',
    periodStart: '2026년 7월 중순경',
    officialMentionAt: '2026-07-29',
    resolvedAt: '2026-07-29',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'approximate',
    affectedScope: ['GPT-5.6 Sol을 Codex·ChatGPT Work에서 사용하는 사용자'],
    summary:
      'OpenAI 관계자는 여러 주 동안 많은 사용자가 Sol이 Codex 한도를 예상보다 빨리 사용한다고 알려왔다고 밝혔다. 구독 플랜의 총량 자체를 줄인 것은 아니라고 설명하면서, 장시간 작업·추가 tool call·subagent 조율 등 Sol의 더 적극적인 동작이 일부 작업의 사용량을 의도보다 크게 만들었다고 설명했다.',
    confirmedFacts: [
      'OpenAI 관계자는 구독 플랜의 사용량 총량을 줄인 것은 아니라고 명시했다.',
      '여러 개선을 적용한 뒤 일반적인 Sol 사용이 약 18% 더 오래 지속될 것으로 예상한다고 발표했다.',
      'Sol은 이전 세대보다 같은 reasoning effort에서도 더 오래 작업하고 더 많은 도구 호출·복합 workflow를 수행할 수 있다고 설명됐다.',
      '발표와 함께 Codex·ChatGPT Work 사용량 한도를 reset했다.',
    ],
    unverifiedPoints: [
      '18%는 일반적인 사용에 대한 예상치이며 모든 사용자·작업에 동일하게 적용되는 보장값이 아니다.',
      '개별 사용자가 관측한 소모 배수와 OpenAI 내부 quota 산정식을 동일시할 수 없다.',
    ],
    communityScaleBasis: '관계자가 직접 “many of you”라고 표현해 다수 사용자 보고로 분류했다.',
    sources: [
      {
        title: 'GPT-5.6 Sol usage limits 업데이트',
        publisher: 'Tibo Sottiaux / OpenAI',
        url: 'https://x.com/thsottiaux/status/2082317452755751098',
        sourceType: 'staff',
        publishedAt: '2026-07-29',
      },
      {
        title: 'Has the 5-hour usage session been removed from Codex CLI?',
        publisher: 'OpenAI Developer Community',
        url: 'https://community.openai.com/t/has-the-5-hour-usage-session-been-removed-from-codex-cli/1387701/4',
        sourceType: 'support',
        publishedAt: '2026-07-29',
      },
    ],
  },
  {
    id: 'claude-fable-plan-jul20',
    title: 'Claude Fable 5의 요금제별 포함 범위가 재편',
    provider: 'Anthropic',
    product: 'Claude Fable 5',
    category: 'pricing-billing',
    communityScale: 'multiple',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '유료 플랜별 정책이 다름',
      detail: 'Max·premium seats는 주간 한도 안에서 Fable 5를 쓰고, Pro·standard seats는 사용량 크레딧 방식이 적용된다.',
    },
    displayDate: '2026-07-20',
    lastMajorUpdateAt: '2026-07-20',
    officialMentionAt: '2026-07-20',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['Claude Pro', 'Max', 'Team', 'seat-based Enterprise'],
    summary:
      '7월 20일부터 Fable 5 접근 방식이 플랜별로 달라졌다. Max 및 premium seats는 주간 사용량 안에서 Fable 5를 최대 50%까지 추가 비용 없이 사용할 수 있고, Pro·standard seats는 기본 주간 한도에 포함되지 않아 usage credits를 사용한다.',
    confirmedFacts: [
      'Max 및 premium Team/seat-based Enterprise는 Fable 5를 주간 한도의 최대 50%까지 사용할 수 있다.',
      'Pro 및 standard Team seats는 Fable 5가 기본 사용량에 포함되지 않고 usage credits를 사용한다.',
      '50%는 주간 총량이 50% 늘어난다는 뜻이 아니라 기존 주간 한도 중 Fable 5에 사용할 수 있는 상한이다.',
    ],
    unverifiedPoints: [
      '정책 전환 직후 일부 사용자에게 usage credits 요구가 잘못 표시됐다는 커뮤니티 보고가 있었지만, 모든 사례의 공식 원인과 범위는 이 카드에서 일반화하지 않는다.',
    ],
    communityScaleBasis: '정책 전환 당일 여러 Claude 관련 커뮤니티 게시물에서 접근·표시 혼선을 복수 확인했다.',
    sources: [
      {
        title: 'Claude Fable 5 on your plan',
        publisher: 'Claude Help Center',
        url: 'https://support.claude.com/en/articles/15424964-claude-fable-5-on-your-plan',
        sourceType: 'official-doc',
      },
      {
        title: 'Fable requires credits 관련 사용자 사례',
        publisher: 'Reddit r/ClaudeCode',
        url: 'https://www.reddit.com/r/ClaudeCode/comments/1v1fpk4/is_fable_5_already_included_in_standard_plans/',
        sourceType: 'community',
        publishedAt: '2026-07-20',
      },
    ],
  },
  {
    id: 'codex-banked-reset-bug-jul12',
    title: 'Codex Banked Reset 적용 실패 버그와 추가 지급',
    provider: 'OpenAI',
    product: 'Codex · ChatGPT Work',
    category: 'reset-compensation',
    communityScale: 'unknown',
    evidenceLevel: 'staff-comment',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '해당 시간대 reset 사용자의 10% 미만',
      detail: '관계자는 약 2시간의 영향 구간에서 banked reset을 사용한 사용자 중 10% 미만이 실제 reset 적용 실패를 겪었다고 설명했다.',
    },
    displayDate: '2026-07-12',
    lastMajorUpdateAt: '2026-07-12T21:28:59Z',
    officialMentionAt: '2026-07-12',
    resolvedAt: '2026-07-12',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['영향 구간에 Banked Reset을 직접 사용한 일부 사용자'],
    summary:
      'Banked Reset을 웹·모바일에서도 사용할 수 있도록 확대하는 과정에서, 약 2시간 동안 reset 버튼을 누른 일부 계정에 실제 reset이 적용되지 않는 문제가 있었다. 관계자는 정확한 영향을 받은 사용자를 모두 식별하기 어려워 해당 시간대 reset 버튼을 누른 사용자에게 추가 banked reset을 지급했다고 설명했다.',
    confirmedFacts: [
      '관계자 설명의 “10% 미만” 분모는 전체 Codex 사용자가 아니라 해당 영향 구간에 banked reset을 사용한 사용자다.',
      '웹·모바일에서 banked reset을 사용하는 기능이 같은 시기에 추가됐다.',
      '영향 시간대의 reset 사용자에게 추가 banked reset을 지급하는 방식으로 보완했다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Banked Reset 적용 실패와 보완 조치',
        publisher: 'Tibo Sottiaux / OpenAI',
        url: 'https://x.com/thsottiaux/status/2076418567143408112',
        sourceType: 'staff',
        publishedAt: '2026-07-12',
      },
    ],
  },
  {
    id: 'claude-fable-redeploy-jul1',
    title: 'Claude Fable 5 전면 중단 후 글로벌 재배포',
    provider: 'Anthropic',
    product: 'Claude Fable 5 · Mythos 5',
    category: 'model-feature-change',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '초기 중단은 전체 사용자 대상',
      detail: '6월 12일 즉시 적용된 수출통제로 실시간 국적 확인이 어려워 두 모델을 모든 사용자에게 일시 중단했다.',
    },
    displayDate: '2026-07-01',
    lastMajorUpdateAt: '2026-07-01',
    periodStart: '2026-06-12',
    periodEnd: '2026-07-01',
    officialMentionAt: '2026-06-12',
    resolvedAt: '2026-07-01',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['Fable 5 전체 사용자', 'Mythos 5 접근 사용자'],
    summary:
      '미국 정부의 수출통제 지침이 6월 12일 즉시 적용되면서 Anthropic은 Fable 5와 Mythos 5 접근을 전면 중단했다. 6월 30일 통제가 해제된 뒤 Fable 5는 7월 1일부터 글로벌 사용자에게 다시 제공됐다.',
    confirmedFacts: [
      '6월 12일에는 실시간 국적 확인 수단이 없어 두 모델 모두 전체 사용자 접근을 일시 중단했다.',
      '수출통제는 6월 30일 해제됐고 Fable 5는 7월 1일부터 Claude Platform, Claude.ai, Claude Code, Cowork 등에 글로벌 재배포됐다.',
      'Mythos 5의 초기 재배포 범위는 Fable 5와 동일한 일반 공개 범위로 단순화해 해석하면 안 된다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Redeploying Claude Fable 5',
        publisher: 'Anthropic',
        url: 'https://www.anthropic.com/news/redeploying-fable-5',
        sourceType: 'official-announcement',
        publishedAt: '2026-06-30',
      },
    ],
  },
  {
    id: 'codex-fast-depletion-jun29',
    title: 'Codex 사용량 빠른 소진 공식 장애 조사 종료',
    provider: 'OpenAI',
    product: 'Codex',
    category: 'usage-limit',
    communityScale: 'multiple',
    evidenceLevel: 'official-status',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '공식 판단: 제한적',
      detail: 'OpenAI는 일부 보고가 abuse/fraud prevention의 잘못된 rate limiting과 관련됐지만 광범위한 Codex degradation은 관측하지 않았다고 밝혔다.',
    },
    displayDate: '2026-06-29 해결',
    lastMajorUpdateAt: '2026-06-29T17:06:00Z',
    periodStart: '2026-06-26',
    periodEnd: '2026-06-29',
    officialMentionAt: '2026-06-26',
    resolvedAt: '2026-06-29',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['잘못 rate-limit된 일부 Codex 계정'],
    summary:
      'OpenAI는 6월 26일부터 Codex 사용량이 예상보다 빠르게 소모된다는 보고를 조사했다. 일부 사례가 abuse·fraud prevention 시스템의 잘못된 rate limiting과 관련된 것으로 확인됐지만, 영향은 제한적이며 Codex 전반의 광범위한 성능 저하는 관측하지 않았다고 밝혔다.',
    confirmedFacts: [
      'OpenAI Status에 “Codex Usage Limits Depleting Faster Than Expected” 사건으로 등록됐다.',
      '일부 사례에서 abuse/fraud prevention 시스템의 잘못된 rate limiting이 확인됐다.',
      'OpenAI의 공식 영향 판단은 제한적이었고, 광범위한 Codex usage degradation은 관측되지 않았다.',
      '6월 29일 해결 상태로 종료됐다.',
    ],
    unverifiedPoints: [
      '공식적으로 특정되지 않은 다른 사용자 보고의 원인을 모두 같은 문제로 단정할 수 없다.',
    ],
    communityScaleBasis: '공식 Status가 복수의 사용자 보고를 조사 대상으로 기록했으나 피해 규모를 다수·광범위로 수치화하지 않았다.',
    sources: [
      {
        title: 'Codex Usage Limits Depleting Faster Than Expected',
        publisher: 'OpenAI Status',
        url: 'https://status.openai.com/incidents/6enf4645',
        sourceType: 'official-status',
        publishedAt: '2026-06-26',
      },
    ],
  },
  {
    id: 'grok-shared-weekly-pool-june',
    title: 'SuperGrok 사용량이 제품별 일일 한도에서 공유 주간 풀로 전환',
    provider: 'xAI',
    product: 'SuperGrok · Grok Apps',
    category: 'usage-limit',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '유료 사용자 대상 순차 적용',
      detail: 'Chat, Imagine, Voice, Build의 별도 일일 제한 대신 제품 전체에서 공유하는 주간 usage pool을 사용한다.',
    },
    displayDate: '2026년 6월부터 순차 적용',
    lastMajorUpdateAt: '2026-06-01',
    periodStart: '2026년 6월',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'approximate',
    affectedScope: ['SuperGrok 등 Grok 유료 사용자'],
    summary:
      'xAI는 2026년 6월부터 유료 사용자의 Grok 사용량 체계를 제품별 일일 한도에서 하나의 공유 주간 usage pool로 바꾸기 시작했다. Chat, Imagine, Voice, Build가 같은 풀을 사용하며 작업별 필요한 compute에 따라 소모량이 달라진다.',
    confirmedFacts: [
      '공유 주간 풀은 여러 Grok 제품에 걸쳐 사용할 수 있다.',
      '제품마다 필요한 compute가 달라 같은 횟수를 사용해도 소모량은 동일하지 않을 수 있다.',
      '주간 reset 시각과 제품별 사용 비중은 Settings의 Usage 화면에서 확인하도록 안내된다.',
    ],
    unverifiedPoints: [
      '기존 체계 대비 전체 사용 가능량이 정확히 몇 퍼센트 감소 또는 증가했는지는 공식 문서에 단일 수치로 공개되지 않았다.',
    ],
    sources: [
      {
        title: 'FAQ - Grok Website / Apps',
        publisher: 'SpaceXAI Docs',
        url: 'https://docs.x.ai/grok/faq',
        sourceType: 'official-doc',
      },
    ],
  },
  {
    id: 'codex-banked-reset-launch-jun11',
    title: 'Codex Banked Reset 기능 공식 도입',
    provider: 'OpenAI',
    product: 'Codex',
    category: 'reset-compensation',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: 'eligible Plus·Pro',
      detail: '출시 당시 대상 사용자에게 무료 banked rate-limit reset 1개가 포함됐다.',
    },
    displayDate: '2026-06-11',
    lastMajorUpdateAt: '2026-06-11',
    officialMentionAt: '2026-06-11',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['eligible ChatGPT Plus', 'eligible ChatGPT Pro'],
    summary:
      'OpenAI는 사용량 한도를 즉시 강제 초기화하는 방식과 별도로, 사용자가 보관했다가 필요할 때 적용할 수 있는 Banked Reset을 Codex에 도입했다. 출시 당시 eligible Plus·Pro 사용자에게 무료 reset 1개를 제공했다.',
    confirmedFacts: [
      'Banked Reset banking은 2026년 6월 11일 ChatGPT release notes에 공식 기록됐다.',
      '출시 당시 무료 reset 1개가 포함됐고, 당시 안내에서 지급 후 30일 동안 사용할 수 있다고 명시됐다.',
    ],
    unverifiedPoints: [
      '이후의 모든 reset 지급이 장애 보상이라는 뜻은 아니며, 기념·프로모션 지급과 사고 대응 지급을 구분해야 한다.',
    ],
    sources: [
      {
        title: 'ChatGPT Release Notes - Codex updates',
        publisher: 'OpenAI Help Center',
        url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
        sourceType: 'official-doc',
        publishedAt: '2026-06-11',
      },
    ],
  },
  {
    id: 'openai-429-jun2',
    title: 'Codex 요청이 잘못 HTTP 429로 거부된 장애',
    provider: 'OpenAI',
    product: 'Codex · ChatGPT · Responses API',
    category: 'outage',
    communityScale: 'unknown',
    evidenceLevel: 'official-status',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '일부 고객',
      detail: 'Codex 외에도 ChatGPT 인증·대화와 Responses API 지연에 부분적인 영향이 있었다.',
    },
    displayDate: '2026-06-02 ~ 06-03',
    lastMajorUpdateAt: '2026-06-03T07:01:00Z',
    periodStart: '2026-06-02 21:46 PDT',
    periodEnd: '2026-06-03 00:01 PDT',
    resolvedAt: '2026-06-03',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['일부 Codex 요청', '일부 ChatGPT 사용자', '일부 Responses API 트래픽'],
    summary:
      '인프라 설정 rollout이 공유 backend dependency에 반복 연결을 유발해 일부 서비스의 오류와 지연이 증가했다. Codex에서는 rate-limit dependency가 비정상 상태가 되면서 정상 요청도 rate-limited로 처리돼 HTTP 429가 반환됐다.',
    confirmedFacts: [
      'OpenAI는 incident write-up에서 Codex의 예상치 못한 HTTP 429 응답을 명시했다.',
      '원인은 인프라 설정 rollout과 공유 dependency의 용량 저하였다.',
      '설정 비활성화와 트래픽 우회·임시 Codex mitigation으로 정상화됐다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Elevated error rates on Codex, ChatGPT and Responses API - write-up',
        publisher: 'OpenAI Status',
        url: 'https://status.openai.com/incidents/01KT5XJ5ATD6RMYP908WS69FVD/write-up',
        sourceType: 'official-status',
        publishedAt: '2026-06-03',
      },
    ],
  },
  {
    id: 'gemini-compute-limits-may28',
    title: 'Gemini compute 기반 사용량 한도 도입 뒤 사용자 피드백에 후속 조정',
    provider: 'Google',
    product: 'Gemini Apps',
    category: 'usage-limit',
    communityScale: 'broad-discussion',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: 'Gemini Apps 개인 계정 사용량 체계 변경',
      detail: '프롬프트 복잡도, 모델·기능, 대화 길이를 반영하는 compute 기반 한도와 5시간·주간 제한이 도입됐다.',
    },
    displayDate: '2026-05-28 후속 조정',
    lastMajorUpdateAt: '2026-05-28',
    periodStart: '2026-05-17',
    officialMentionAt: '2026-05-17',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['Gemini Apps 개인 Google 계정 사용자', 'Google AI 구독자별 배수·한도 차이'],
    summary:
      'Google은 5월 17일부터 Gemini Apps를 고정 질문 횟수 중심에서 compute 기반 사용량 체계로 전환했다. 복잡한 프롬프트·긴 대화·무거운 기능일수록 더 많은 사용량을 쓸 수 있고, 5시간 한도가 주간 한도에 도달할 때까지 반복 갱신된다. 도입 직후 한도에 너무 빨리 도달한다는 반응이 크게 확산돼 5월 28일 Google이 여러 완화 조치를 발표했다.',
    confirmedFacts: [
      '공식 Help는 5월 17일부터 compute 기반 한도 변경을 명시한다.',
      '5월 28일 Gemini 책임자 설명을 통해 Gemini 3.1 Pro 한 번의 복잡한 prompt가 지나치게 많은 quota를 쓰지 않도록 상한을 두고, 실패한 요청은 quota에 포함하지 않도록 조정했다.',
      'Flash-Lite prompt는 quota를 소모하지 않도록 조정됐고, 특정 사용자에게 Omni 영상 1~2개만으로 quota가 크게 줄던 버그를 수정했다고 발표했다.',
    ],
    unverifiedPoints: [
      'compute 기반이므로 “Pro는 정확히 주당 N회”처럼 모든 요청을 단일 횟수로 환산할 수 없다.',
      'Reddit의 추천 수나 개별 사용자의 prompt당 소모율은 실제 전체 피해 비율을 뜻하지 않는다.',
    ],
    communityScaleBasis:
      '5월 19일 전후 여러 독립 스레드가 수백~수천 단위 반응을 얻었고, Google도 “한도에 너무 빨리 도달한다는 feedback”을 명시적으로 받아 조정했다고 밝혔다.',
    sources: [
      {
        title: 'Gemini Apps limits & upgrades for Google AI subscribers',
        publisher: 'Google Gemini Apps Help',
        url: 'https://support.google.com/gemini/answer/16275805?hl=en',
        sourceType: 'official-doc',
      },
      {
        title: 'Google adjusts Gemini’s new usage limits in response to complaints',
        publisher: '9to5Google',
        url: 'https://9to5google.com/2026/05/28/gemini-new-usage-limits/',
        sourceType: 'media',
        publishedAt: '2026-05-28',
      },
      {
        title: 'Canceled my Pro sub today; the new 5-hour compute limit',
        publisher: 'Reddit r/GeminiAI',
        url: 'https://www.reddit.com/r/GeminiAI/comments/1ti0coz/canceled_my_pro_sub_today_the_new_5hour_compute/',
        sourceType: 'community',
        publishedAt: '2026-05-19',
      },
      {
        title: 'I understand that compute is limited, but these new limits are insane',
        publisher: 'Reddit r/GeminiAI',
        url: 'https://www.reddit.com/r/GeminiAI/comments/1thmta0/i_understand_that_compute_is_limited_but_these/',
        sourceType: 'community',
        publishedAt: '2026-05-19',
      },
    ],
  },
  {
    id: 'codex-cache-drain-may23',
    title: 'Codex 장기 세션 cache 최적화가 사용량을 빠르게 소진시킨 문제',
    provider: 'OpenAI',
    product: 'Codex',
    category: 'usage-limit',
    communityScale: 'multiple',
    evidenceLevel: 'staff-comment',
    verificationStatus: 'resolved',
    officialImpact: {
      label: '정확한 영향 비율 미공개',
      detail: 'OpenAI는 문제 수정 후 모든 계정의 사용량을 reset했다.',
    },
    displayDate: '2026-05-23 해결',
    lastMajorUpdateAt: '2026-05-23T20:14:35Z',
    periodStart: '2026-05-22',
    periodEnd: '2026-05-23',
    officialMentionAt: '2026-05-22',
    resolvedAt: '2026-05-23',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'range',
    affectedScope: ['장시간 Codex 세션을 사용하는 일부 계정'],
    summary:
      'Codex 사용량 한도가 평소보다 빨리 줄어든다는 보고가 나온 뒤 OpenAI Status가 관련 장애를 조사했다. 이후 관계자는 장시간 세션을 compaction할 때 cache hit rate에 악영향을 준 최적화가 원인이었다고 설명하고 해당 변경을 rollback했으며, 모든 계정의 사용량을 reset했다.',
    confirmedFacts: [
      'OpenAI Status에 “Increase in users hitting Codex rate limits” 사건이 등록돼 5월 23일 해결됐다.',
      '관계자는 장기 세션 compaction 과정의 최적화가 cache hit rate에 영향을 줬다고 원인을 설명했다.',
      '수정 뒤 모든 계정의 Codex 사용량 한도를 reset했다고 발표했다.',
    ],
    unverifiedPoints: [
      '개별 사용자가 경험한 소모 배수와 전체 영향률은 공식적으로 수치화되지 않았다.',
    ],
    communityScaleBasis: '관계자가 “some of you”라고 표현했고 공식 Status에도 사용자들의 rate-limit 증가가 사건으로 등록됐다.',
    sources: [
      {
        title: 'Increase in users hitting Codex rate limits',
        publisher: 'OpenAI Status',
        url: 'https://status.openai.com/incidents/tcc95qa3',
        sourceType: 'official-status',
        publishedAt: '2026-05-22',
      },
      {
        title: 'Codex cache-hit optimization rollback and reset',
        publisher: 'Tibo Sottiaux / OpenAI',
        url: 'https://x.com/thsottiaux/status/2058280452851638313',
        sourceType: 'staff',
        publishedAt: '2026-05-23',
      },
    ],
  },
  {
    id: 'xai-model-retirement-may15',
    title: 'xAI API 구형 모델 8개 종료 및 자동 redirect',
    provider: 'xAI',
    product: 'Grok API',
    category: 'model-feature-change',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '해당 API slug 사용자',
      detail: '종료된 slug 요청은 Grok 4.3, grok-build-0.1 또는 이미지 품질 모델로 redirect되며 대체 모델 가격이 적용된다.',
    },
    displayDate: '2026-05-15',
    lastMajorUpdateAt: '2026-05-15T12:00:00-07:00',
    officialMentionAt: '2026-05-15',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['종료된 8개 xAI API model slug 사용자'],
    summary:
      'xAI는 5월 15일 12:00 PM PT부터 Grok 4 계열 fast 모델, grok-code-fast-1, grok-3, grok-imagine-image-pro 등 8개 API slug를 종료했다. 기존 slug는 계속 resolve되지만 새 모델로 자동 redirect되며 대체 모델의 가격으로 과금된다.',
    confirmedFacts: [
      'xAI는 종료 대상 8개 slug와 redirect 대상을 공식 migration guide에 공개했다.',
      '대체 모델 가격이 기존과 다를 수 있어 예상하지 못한 비용 증가를 피하려면 명시적으로 replacement model을 선택하라고 권고했다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Grok Model Retirement on May 15, 2026',
        publisher: 'SpaceXAI Docs',
        url: 'https://docs.x.ai/developers/migration/may-15-retirement',
        sourceType: 'official-doc',
        publishedAt: '2026-05-20',
      },
    ],
  },
  {
    id: 'claude-code-limits-may6',
    title: 'Claude Code 5시간 한도 2배 확대와 peak-hour 감축 폐지',
    provider: 'Anthropic',
    product: 'Claude Code',
    category: 'usage-limit',
    communityScale: 'unknown',
    evidenceLevel: 'official-doc',
    verificationStatus: 'confirmed',
    officialImpact: {
      label: '유료 플랜 다수',
      detail: 'Pro, Max, Team, seat-based Enterprise의 Claude Code 5시간 한도가 2배로 늘었고 Pro·Max의 peak-hour 감축이 제거됐다.',
    },
    displayDate: '2026-05-06',
    lastMajorUpdateAt: '2026-05-06',
    officialMentionAt: '2026-05-06',
    lastCheckedAt: '2026-08-23',
    datePrecision: 'exact',
    affectedScope: ['Claude Code Pro', 'Max', 'Team', 'seat-based Enterprise'],
    summary:
      'Anthropic은 5월 6일 Claude Code의 5시간 사용량 한도를 주요 유료 플랜에서 2배로 높이고, Pro·Max에 적용되던 peak-hours 한도 감축을 제거했다. 이 변경은 이후 5월 13일 시작된 별도의 주간 +50% 프로모션과 구분해야 한다.',
    confirmedFacts: [
      '5시간 사용량 한도 확대와 주간 한도 프로모션은 서로 다른 변경이다.',
      'Pro·Max의 peak-hour limit reduction이 제거됐다.',
    ],
    unverifiedPoints: [],
    sources: [
      {
        title: 'Higher usage limits for Claude and a compute deal with SpaceX',
        publisher: 'Anthropic',
        url: 'https://www.anthropic.com/news/higher-limits-spacex',
        sourceType: 'official-announcement',
        publishedAt: '2026-05-06',
      },
    ],
  },
];
