import { ComparisonRow } from '../types/ai';

export const COMPARISON_MATRIX_DATA: ComparisonRow[] = [
  // 1. 추론 및 기본 지능
  {
    id: 'reasoning-benchmark',
    category: '추론/기본성능',
    feature: '심층 추론 & 복합 문제해결',
    openai: 'GPT-5.6 Sol / GPT-5.6 Terra (최상위 시스템 엔지니어링 및 수학/과학 추론)',
    google: 'Gemini 3.7 Flash / 3.1 Pro (초고속 추론 & 2M+ 롱컨텍스트 결합)',
    anthropic: 'Claude Opus 5 / Fable 5 (코딩 및 지식 작업 분야 압도적 SOTA)',
    xai: 'Grok 4.6 (Colossus 2 기반 장기 에이전틱 CoT 추론)',
    winner: 'anthropic',
    note: 'Claude Opus 5와 GPT-5.6 Sol이 최상위 추론 벤치마크를 양분하여 이끌고 있음.',
    verifiedDate: '2026.08'
  },
  {
    id: 'general-writing',
    category: '추론/기본성능',
    feature: '자연스러운 작문 & 톤앤매너',
    openai: 'GPT-5.6 Family의 전문적이고 구조화된 문체 (Sol · Terra · Luna)',
    google: '객관적이고 명료한 정보 전달 중심의 어조',
    anthropic: 'Claude 5의 독보적으로 섬세하고 자연스러운 뉘앙스, 문학적 완성도',
    xai: 'Grok 4.6의 직설적이고 위트 넘치며 필터링이 덜한 개성적 문체',
    winner: 'anthropic',
    note: '전문 기획서, 보고서, 문학적 글쓰기에서 Claude 5의 표현력이 가장 뛰어남.',
    verifiedDate: '2026.08'
  },

  // 2. 코딩 및 개발
  {
    id: 'code-generation',
    category: '코딩/개발',
    feature: '프론트엔드 UI & 인터랙티브 컴포넌트',
    openai: 'Canvas (GPT-5.6 기반 실시간 Side-by-side 인라인 수정)',
    google: 'Gemini 3.7 Flash (경이로운 속도와 최신 웹 프레임워크 지원)',
    anthropic: 'Claude 5 Artifacts (별도 창에서 즉시 렌더링 및 인터랙션)',
    xai: 'Grok Build (와이어프레임/스케치 비전-투-코드 초고속 복원)',
    winner: 'anthropic',
    note: 'Artifacts 샌드박스에서 즉시 UI를 테스트하고 피드백을 주는 생산성이 가장 탁월함.',
    verifiedDate: '2026.08'
  },
  {
    id: 'system-architecture',
    category: '코딩/개발',
    feature: '대규모 레포지토리 아키텍처 & 리팩토링',
    openai: 'GPT-5.6 Sol 기반의 시스템 아키텍처 설계 및 장애 방어 검증',
    google: 'Gemini 3.7 Flash / Pro의 2M+ 토큰 전체 레포지토리 통째 분석',
    anthropic: 'Claude Opus 5의 정교한 디자인 패턴 설계 및 대규모 마이그레이션',
    xai: 'Grok 4.6 기반 고성능 분산 연산 및 시뮬레이션 백엔드 로직',
    winner: 'google',
    note: 'Gemini의 2M+ 토큰 컨텍스트는 수백 개 파일 전체를 한 번에 조망하는 데 독보적임.',
    verifiedDate: '2026.08'
  },

  // 3. 에이전트 & 자동화 (CLI / IDE)
  {
    id: 'agentic-cli',
    category: '에이전트/자동화',
    feature: '터미널 기반 CLI 에이전트 (Terminal Agent)',
    openai: 'GPT-5.6 Operator & CUA 생태계 연동',
    google: 'Antigravity CLI (DeepMind AGY 2.0 플랫폼, 서브에이전트 병렬 오케스트레이션)',
    anthropic: 'Claude Code (`claude` CLI, CLAUDE.md 영구 메모리, Git/테스트 자동 수선)',
    xai: 'Grok Build CLI & xAI Console Tools',
    winner: 'anthropic',
    note: 'Claude Code와 Antigravity 2.0이 개발자 터미널 자율 코딩 시장을 선도함.',
    verifiedDate: '2026.08'
  },
  {
    id: 'planning-mode',
    category: '에이전트/자동화',
    feature: '계획 모드 및 자가 치유 검증 (Planning & Self-healing)',
    openai: 'GPT-5.6 Workflows & Canvas 실시간 코드 리뷰',
    google: 'Antigravity Planning Mode (implementation_plan.md 승인 후 실행, walkthrough.md 검증)',
    anthropic: 'Claude Code 커맨드 루프 및 테스트 실패 시 자동 힐링',
    xai: 'Grok Build 에이전틱 인터랙션 및 피드백 반영',
    winner: 'google',
    note: 'Antigravity의 사전 계획-승인-실행-검증 라이프사이클이 대규모 프로젝트에서 가장 안전함.',
    verifiedDate: '2026.08'
  },

  // 4. 멀티모달 & 비전 & 실시간성
  {
    id: 'multimodal-input',
    category: '멀티모달/비전',
    feature: '초대용량 동영상 / 오디오 / PDF 일괄 분석',
    openai: 'GPT-5.6 Advanced Voice (인간 수준 실시간 양방향 음성/비전)',
    google: 'Gemini 3.7 네이티브 비디오(1시간+), 오디오, 대용량 문서 직통 분석',
    anthropic: 'Claude 5 정밀 OCR 및 고해상도 테크니컬 다이어그램 해석',
    xai: 'Grok Vision & 실시간 이미지-코드 변환',
    winner: 'google',
    note: '1시간짜리 회의 녹화 영상이나 200페이지 규격서를 통째로 던져서 타임스탬프 요약하는 능력은 Gemini가 압도적.',
    verifiedDate: '2026.08'
  },
  {
    id: 'realtime-data',
    category: '컨텍스트/검색',
    feature: '실시간 글로벌 트렌드 & 소셜 팩트체크',
    openai: 'SearchGPT 통합 웹 검색 (정확한 인라인 출처 링크)',
    google: 'Google Search 실시간 인덱스 & Workspace 연동',
    anthropic: 'Claude 5 통합 웹 검색',
    xai: 'Grok 4.6 + X(트위터) 초단위 실시간 데이터 피드 + DeepSearch',
    winner: 'xai',
    note: '초단위로 발생하는 글로벌 속보, 개발자 여론, 오픈소스 실시간 이슈는 Grok 4.6이 가장 빠름.',
    verifiedDate: '2026.08'
  },

  // 5. 컨텍스트 윈도우
  {
    id: 'context-window',
    category: '컨텍스트/검색',
    feature: '컨텍스트 윈도우 크기 (메모리 용량)',
    openai: 'GPT-5.6 Family (256K 토큰 지원)',
    google: 'Gemini 3.7 Series (2,000,000+ 토큰, 책 30권 분량)',
    anthropic: 'Claude 5 Series (1,000,000+ 토큰, 1M 컨텍스트 & Prompt Caching 지원)',
    xai: 'Grok 4.3 / 4.6 (최대 1,000,000 토큰 지원)',
    winner: 'google',
    note: '수백 페이지 문서와 전체 프로젝트를 한 번에 주입하는 롱 컨텍스트는 Google Gemini가 압승.',
    verifiedDate: '2026.08'
  },

  // 6. 가격 및 개발자 비용 효율성
  {
    id: 'pricing-efficiency',
    category: '가격/접근성',
    feature: '개발자 API 비용 및 무료 티어 혜택',
    openai: 'GPT-5.6 3단 체제 (Sol $15/$60 · Terra $2.50/$10 · Luna $0.15/$0.60 per 1M)로 맞춤형 비용 설계',
    google: 'AI Studio에서 Gemini 3.7 Flash의 관대한 무료 티어 & 파격적 초저비용 ($0.10 / $0.40 per 1M)',
    anthropic: 'Claude 5 프롬프트 캐싱 적용 시 최대 90% 비용 절감 (Fable $1/$5, Sonnet $3/$15, Opus $15/$75)',
    xai: 'X Premium 구독 기본 포함 및 xAI Cloud 크레딧 (Grok 4.6 $2.00 / $10.00 per 1M)',
    winner: 'google',
    note: 'Gemini 3.7 Flash의 무료 API 티어와 백만 토큰당 가격(입력 $0.10 / 출력 $0.40)은 가장 경제적임.',
    verifiedDate: '2026.08'
  }
];
