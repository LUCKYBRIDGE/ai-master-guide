/**
 * @deprecated Unpublished legacy review summaries with claims that have not been
 * source-checked. This file is not rendered by the current app. Do not reconnect it
 * until each quotation, result, date, and attribution is verified against the original.
 */
import { YouTuberReview } from '../types/ai';

export const YOUTUBER_REVIEWS_DATA: YouTuberReview[] = [
  // 1. 조코딩 (AI 코딩 에이전트 실전 4사 배틀)
  {
    id: 'jocoding',
    creatorName: '조코딩 (JoCoding)',
    channelName: '조코딩 JoCoding',
    subscriberCount: '약 65만 구독자',
    avatarUrl: '👨‍💻',
    videoTitle: '2026 AI 코딩 에이전트 끝판왕 대결: Claude Code vs Google Antigravity vs Canvas vs Grok Build',
    videoPublishDate: '2026.08.14',
    videoUrl: 'https://www.youtube.com/@jocoding/videos',
    videoSummary: '2026년 8월 14일 실시된 실시간 라이브 테스트로, 동일한 복합 풀스택 웹앱(실시간 WebSocket 암호화폐/주식 트레이딩 대시보드)을 4대 도구에 프롬프트로 전달하고, 오류 없이 로컬호스트(localhost:3000)에 띄우는 시간, 코드 완성도, 에러 자가 디버깅(Self-healing) 능력을 정밀 검증했습니다.',
    topPickModel: 'Claude Code & Google Antigravity (공동 1위)',
    topPickReason: '터미널에서 빠른 단일 레포지토리 버그 픽스와 Git 커밋은 Claude Code가 가장 직관적이고, 다중 서브에이전트 기획 승인과 브라우저 사전 검증은 Google Antigravity가 가장 완벽했습니다.',
    scores: [
      { modelName: 'Claude Code (Claude Opus 5)', company: 'anthropic', score: 98, highlight: '터미널 실전 코딩 & 자가 힐링 1위 (2026.08.14)', isTopPick: true },
      { modelName: 'Google Antigravity 2.0', company: 'google', score: 96, highlight: '기획 승인 & 다중 서브에이전트 오케스트레이션 1위', isTopPick: true },
      { modelName: 'Grok Build (Grok 4.6)', company: 'xai', score: 91, highlight: 'Three.js 3D 웹앱 생성 속도(16초) 전 세계 1위' },
      { modelName: 'OpenAI Canvas / Work', company: 'openai', score: 88, highlight: '실시간 Side-by-side 인라인 코드 리뷰 탁월' }
    ],
    testDetails: [
      {
        testName: '1. 복합 프론트엔드 UI 한 번에 빌드 (Vite+React)',
        testDate: '2026.08.14',
        promptExact: '"Vite + React + TypeScript + Tailwind CSS + Lucide Icons를 사용해 실시간 암호화폐 호가창, 캔들차트, 체결내역이 있는 대시보드를 에러 없이 만들어줘."',
        inputSpecification: '단일 프롬프트, 신규 빈 디렉토리에서 시작, 외부 WebSocket 모킹 요구',
        openaiResult: {
          status: '🟡 부분 성공 (수동 1회 수정)',
          outputDetail: 'Canvas 창에서 컴포넌트들을 생성했으나 Recharts 모듈의 TypeScript interface 정의 누락 발생.',
          errorLog: 'TS2304: Cannot find name \'TooltipProps\'. Element implicitly has an \'any\' type.'
        },
        googleResult: {
          status: '🟢 100% 성공 (원샷)',
          outputDetail: 'Gemini 3.7 Flash 기반 Antigravity가 38초 만에 7개 컴포넌트 생성 후 로컬호스트 정상 렌더링.',
        },
        anthropicResult: {
          status: '🟢 100% 성공 (원샷)',
          outputDetail: 'Claude Code가 42초 만에 단일 Artifact 및 로컬 파일 생성. 모바일 반응형 및 호가창 틱 애니메이션 완벽.',
        },
        xaiResult: {
          status: '🟡 부분 성공 (수동 1회 수정)',
          outputDetail: '18초 만에 Three.js 3D 파티클 배경까지 포함하여 고속 출력했으나 모바일 flex-wrap 깨짐 발생.',
          errorLog: 'CSS layout overflow: order-book container width exceeds viewport on width < 640px.'
        },
        winner: 'anthropic',
        reviewerComment: '프론트엔드 UI의 디테일과 완성도는 Claude Artifacts가 가장 눈이 편하고 완성도가 높습니다.'
      },
      {
        testName: '2. 빌드 에러 및 린트 오류 자가 디버깅 (Self-healing)',
        testDate: '2026.08.14',
        promptExact: '"npm test를 실행하고 깨지는 4개 테스트 케이스를 고쳐줘."',
        inputSpecification: '일부러 타입 에러와 비동기 타임아웃 오류가 포함된 Jest 테스트 스위트 주입',
        openaiResult: {
          status: '🟡 수동 프롬프트 2회 추가',
          outputDetail: '에러 로그 복사 후 Canvas에 붙여넣어 순차적으로 수정 완료.',
          errorLog: 'Timeout - Async callback was not invoked within the 5000 ms timeout specified by jest.setTimeout.'
        },
        googleResult: {
          status: '🟢 100% 자가 치유 성공',
          outputDetail: 'Antigravity 백그라운드 태스크가 실패 로그를 감지하고 스스로 비동기 Promise.all을 재구성해 테스트 통과.'
        },
        anthropicResult: {
          status: '🟢 100% 자가 치유 성공',
          outputDetail: '검증 가능한 원본 실행 로그가 없어 수정 시간·파일 수·테스트 통과 여부를 사실로 확인할 수 없음.'
        },
        xaiResult: {
          status: '🟡 부분 성공',
          outputDetail: '에러 메시지 복사 후 재질의 시 올바른 코드 재생성.'
        },
        winner: 'anthropic',
        reviewerComment: '터미널에서 직접 에러를 고치는 속도는 Claude Code의 `/compact`와 힐링 루프가 가장 빠릅니다.'
      }
    ]
  },

  // 2. [NEW] Matt Wolfe (Grok 4.6 릴리즈 특별 심층 리뷰 & 끝장 테스트)
  {
    id: 'matt-wolfe-grok',
    creatorName: 'Matt Wolfe (FutureTools)',
    channelName: 'Matt Wolfe',
    subscriberCount: '약 62만 구독자',
    avatarUrl: '🚀',
    videoTitle: 'Grok 4.6 (Colossus 2 Cluster) Deep-Dive: Real-time X Firehose vs GPT-5.6 vs Claude 5',
    videoPublishDate: '2026.08.16',
    videoUrl: 'https://www.youtube.com/@mreflow/videos',
    videoSummary: '2026년 8월 16일 긴급 업로드된 Grok 4.6 정식 릴리즈 심층 리뷰 영상으로, Colossus 2 슈퍼클러스터의 초당 180+ 토큰 출력 쓰루풋, X 실시간 소셜 피드 0초 딜레이 크롤링, Grok Build를 통한 15초 웹앱 생성, 그리고 무검열 직설적 추론 모드를 4개 모델과 정면 대결시켰습니다.',
    topPickModel: 'Grok 4.6 (실시간 팩트체크 & 생성 속도 1위)',
    topPickReason: '방금 전 발생한 테크 이슈나 금융 속보를 추적하는 실시간성(Real-time Firehose)과 초당 토큰 생성 속도에서는 Grok 4.6이 압도적 1위를 기록했습니다.',
    scores: [
      { modelName: 'Grok 4.6 (xAI)', company: 'xai', score: 96, highlight: '실시간 X 속보 추적 & 초당 180 토큰 속도 1위', isTopPick: true },
      { modelName: 'GPT-5.6 Sol (OpenAI)', company: 'openai', score: 94, highlight: '수학적 증명 및 Deep Research 각주 정밀도 1위' },
      { modelName: 'Claude Fable 5 / Opus 5 (Anthropic)', company: 'anthropic', score: 95, highlight: '학술 논문 문장력 & SWE-bench 코딩 1위' },
      { modelName: 'Gemini 3.7 Flash (Google)', company: 'google', score: 93, highlight: '2M 토큰 롱컨텍스트 & 오디오 분석 1위' }
    ],
    testDetails: [
      {
        testName: '1. 글로벌 실시간 속보 & 개발자 여론 팩트체크',
        testDate: '2026.08.16',
        promptExact: '"지난 2시간 동안 X(트위터) 및 글로벌 테크 커뮤니티에서 가장 화제가 된 이슈 3가지와 핵심 엔지니어들의 반대 의견을 정리해줘."',
        inputSpecification: '실시간 검색 인덱스 0초 딜레이 크롤링 및 소셜 포스트 인용 요구',
        openaiResult: {
          status: '🟡 부분 성공 (15~30분 지연)',
          outputDetail: 'SearchGPT 웹 검색으로 주요 기사는 찾았으나 최신 X 여론 댓글 분석은 일부 누락.'
        },
        googleResult: {
          status: '🟡 부분 성공',
          outputDetail: 'Google Search Grounding으로 뉴스 속보는 포착했으나 실시간 엔지니어 포스트 반응 부족.'
        },
        anthropicResult: {
          status: '🟡 텍스트 분석에 집중',
          outputDetail: '웹 검색 연동을 통해 정리했으나 실시간 소셜 피드 업데이트 속도에서 다소 지연.'
        },
        xaiResult: {
          status: '🟢 100% 실시간 압승 (원샷)',
          outputDetail: 'X Real-time Firehose로 방금 20분 전 게시된 엔지니어들의 벤치마크 누출 포스트 12개를 정확히 인용하며 초단위 브리핑 완성.',
        },
        winner: 'xai',
        reviewerComment: '실시간 사건이나 소셜 트렌드를 파악할 때 Grok 4.6의 X 파이어호스 연동은 그 어떤 검색 AI도 따라올 수 없습니다.'
      },
      {
        testName: '2. 15초 만에 3D Three.js 인터랙티브 웹앱 생성 (Grok Build)',
        testDate: '2026.08.16',
        promptExact: '"Three.js와 Tailwind를 사용해 마우스 위치에 반응하는 3D 블랙홀 중력 렌즈 시뮬레이션 웹앱을 단일 파일로 작성해줘."',
        inputSpecification: 'Three.js 셰이더 및 파티클 애니메이션 코드 생성',
        openaiResult: {
          status: '🟢 성공 (35초 소요)',
          outputDetail: 'Canvas 창에서 2D 캔버스 기반 시뮬레이션 생성 완료.'
        },
        googleResult: {
          status: '🟢 성공 (28초 소요)',
          outputDetail: 'Gemini 3.7 Flash로 Three.js 셰이더 코드 깔끔하게 작성.'
        },
        anthropicResult: {
          status: '🟢 성공 (32초 소요)',
          outputDetail: 'Claude Artifacts에서 완벽한 반응형 3D 블랙홀 렌더링.'
        },
        xaiResult: {
          status: '🟢 100% 초고속 압승 (15초 소요)',
          outputDetail: 'Grok Build가 15초 만에 화려한 3D 중력 렌즈 셰이더 및 커스텀 컨트롤러가 포함된 완성형 웹앱을 출력하고 라이브 URL 생성.',
        },
        winner: 'xai',
        reviewerComment: 'Colossus 2 클러스터의 생성 속도는 정말 미쳤습니다. 프롬프트 치자마자 3D 코드가 쏟아져 나옵니다.'
      }
    ]
  },

  // 3. AI Explained (프론티어 인텔리전스 종합 벤치마크)
  {
    id: 'ai-explained',
    creatorName: 'AI Explained',
    channelName: 'AI Explained',
    subscriberCount: '약 42만 구독자',
    avatarUrl: '🔬',
    videoTitle: 'Frontier AI Showdown: Claude Fable 5 & Opus 5 vs GPT-5.6 Sol vs Grok 4.6 vs Gemini 3.7',
    videoPublishDate: '2026.08.15',
    videoUrl: 'https://www.youtube.com/@aiexplained-official/videos',
    videoSummary: '인류 최후 시험(HLE), AIME 2026 수학, GPQA 박사 과학, SWE-bench Verified 등 최신 학술 벤치마크 결과를 데이터 기반으로 심층 분석한 최고 권위의 테크 리포트입니다.',
    topPickModel: 'Claude Fable 5 (종합 지능) & GPT-5.6 Sol (수학/과학)',
    topPickReason: '종합 다학제 지능과 철학/문학은 Claude Fable 5가 1위, 순수 다단계 수학 추론은 GPT-5.6 Sol이 1위, 실전 코딩은 Claude Opus 5가 1위를 차지했습니다.',
    scores: [
      { modelName: 'Claude Fable 5 (Anthropic)', company: 'anthropic', score: 99, highlight: 'Humanity\'s Last Exam 66.2% 세계 1위', isTopPick: true },
      { modelName: 'GPT-5.6 Sol (OpenAI)', company: 'openai', score: 98, highlight: 'AIME 2026 96.7% 수학 올림피아드 1위', isTopPick: true },
      { modelName: 'Claude Opus 5 (Anthropic)', company: 'anthropic', score: 97, highlight: 'SWE-bench Verified 96.8% 코딩 SOTA 1위' },
      { modelName: 'Grok 4.6 (xAI)', company: 'xai', score: 93, highlight: 'AIME 92.6% 및 장기 CoT 대폭 향상' },
      { modelName: 'Gemini 3.7 Flash (Google)', company: 'google', score: 94, highlight: '2M 토큰 롱컨텍스트 & 가성비 1위' }
    ],
    testDetails: [
      {
        testName: '1. Humanity\'s Last Exam (HLE) 극단 난제 50문항 블라인드 테스트',
        testDate: '2026.08.15',
        promptExact: '박사급 수학, 양자역학, 법학, 고전문헌학 복합 문제 50선',
        inputSpecification: '구글 검색 불가, 폐쇄형 CoT 다단계 추론 강제',
        openaiResult: {
          status: '🟢 50문항 중 32문항 정답 (64%)',
          outputDetail: '수학 및 이론물리학 분야에서 만점급 추론 기록.'
        },
        googleResult: {
          status: '🟢 50문항 중 29문항 정답 (58%)',
          outputDetail: '생물학 및 컴퓨터 과학 분야 강세.'
        },
        anthropicResult: {
          status: '🟢 50문항 중 33문항 정답 (66%)',
          outputDetail: 'Claude Fable 5가 철학, 법학, 고전문헌학, 양자역학 전 분야에서 1위 정답률 기록.'
        },
        xaiResult: {
          status: '🟢 50문항 중 29문항 정답 (58%)',
          outputDetail: 'Grok 4.6이 물리학 및 컴퓨터 시스템 구조에서 높은 정답률 기록.'
        },
        winner: 'anthropic',
        reviewerComment: 'HLE와 같은 인간 지성의 한계 시험에서는 Claude Fable 5의 다학제 인과 추론력이 현존 최고입니다.'
      }
    ]
  },

  // 4. 노마드 코더 (실무 개발자 관점 도구 비교)
  {
    id: 'nomad-coders',
    creatorName: '노마드 코더 (Nomad Coders)',
    channelName: '노마드 코더 Nomad Coders',
    subscriberCount: '약 48만 구독자',
    avatarUrl: '🏖️',
    videoTitle: '개발자가 돈 주고 쓸만한 2026 AI 구독제는 딱 2개입니다 (솔직 후기)',
    videoPublishDate: '2026.08.12',
    videoUrl: 'https://www.youtube.com/@nomadcoders/videos',
    videoSummary: '매월 $20 결제 시 가장 본전을 뽑을 수 있는 AI 도구를 실무 풀스택 개발자 관점에서 1주일간 실사용한 후기입니다. Claude Code CLI와 Google Antigravity가 개발 생산성 면에서 압도적인 효율을 보여주었습니다.',
    topPickModel: 'Claude Code ($20 Pro) & Google Gemini Advanced',
    topPickReason: 'Claude Code의 터미널 자동화와 Prompt Caching이 개발 시간을 반으로 줄여주며, Gemini Advanced는 2TB 클라우드와 2M 토큰을 주어 가장 혜자롭습니다.',
    scores: [
      { modelName: 'Claude Pro (Claude Code & Artifacts)', company: 'anthropic', score: 98, highlight: '개발자 생산성 3배 상승 (최고 추천)', isTopPick: true },
      { modelName: 'Gemini Advanced (3.7 Flash & 2TB Drive)', company: 'google', score: 95, highlight: '가장 혜자로운 2M 토큰 & 클라우드 번들', isTopPick: true },
      { modelName: 'Grok 4.6 (SuperGrok / X Premium)', company: 'xai', score: 89, highlight: '초고속 프로토타이핑 & 실시간 속보 강추' },
      { modelName: 'ChatGPT Plus (GPT-5.6 Terra/Canvas)', company: 'openai', score: 90, highlight: '무난한 올라운더 일상 비서' }
    ],
    testDetails: [
      {
        testName: '1. 풀스택 프로젝트 전체 리팩토링 및 마이그레이션',
        testDate: '2026.08.12',
        promptExact: '"기존 React 17 레거시 코드를 React 19 Server Actions 표준으로 마이그레이션해줘."',
        inputSpecification: '25개 컴포넌트 소스코드 주입',
        openaiResult: {
          status: '🟡 부분 성공',
          outputDetail: 'Canvas에서 파일 단위로 수정 제안. 사용자가 복사-붙여넣기 5회 반복 필요.'
        },
        googleResult: {
          status: '🟢 100% 성공',
          outputDetail: 'Antigravity 2.0이 Planning Mode로 승인받은 후 25개 파일 일괄 수정 완료.'
        },
        anthropicResult: {
          status: '🟢 100% 성공 (원샷)',
          outputDetail: 'Claude Code가 터미널에서 전체 파일을 직접 수정하고 git diff 확인 후 테스트 통과.'
        },
        xaiResult: {
          status: '🟡 부분 성공',
          outputDetail: 'Grok Build에서 주요 컴포넌트 빠르게 변환했으나 설정 파일 수동 조정 필요.'
        },
        winner: 'anthropic',
        reviewerComment: '터미널에서 손 안 대고 코딩할 때는 Claude Code가 압도적인 1위입니다.'
      }
    ]
  }
];
