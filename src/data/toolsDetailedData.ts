/**
 * @deprecated Unpublished legacy feature catalog containing unverified limits, prices,
 * and product claims. This file is not rendered by the current app. Do not reconnect it
 * without a dated official source for each mutable claim.
 */
import { DetailedToolFeature } from '../types/ai';

export const DETAILED_TOOLS_DATA: DetailedToolFeature[] = [
  // ==========================================
  // 1. OpenAI (ChatGPT / Work / Codex)
  // ==========================================
  {
    id: 'openai-file-upload',
    company: 'openai',
    name: '사진 및 파일 추가 (Upload)',
    iconName: 'Paperclip',
    category: '파일/데이터',
    purpose: '내 PC나 휴대폰의 PDF, Excel, Word, CSV, 이미지 등을 ChatGPT 대화에 직접 주입',
    representativeOutput: '문서 요약, 특정 항목 발췌, 엑셀 데이터 분석, 통계 표 및 차트',
    chatUsageNote: '파일 업로드 자체의 별도 제한(최대 512MB, 파일당 2M 토큰) + Data Analysis 도구 한도 적용 (Codex 미차감)',
    chatUsageType: '🔵 별도 도구 한도',
    workAgentUsageNote: 'Work에서 대용량 분석 및 PPT/보고서 자동 제작 시 Work/Codex 공용 Agentic Pool에서 작업량 차감',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '파일 1개 최대 512MB, CSV ~50MB, 이미지 20MB, 업로드 속도 최대 80개 / 3시간',
    bestUseCases: [
      'PDF 논문 및 교과 자료에서 특정 단원 내용 발췌',
      '설문조사 Excel 파일 업로드 후 문항별 평균 계산 및 그래프 렌더링',
      '영수증/보고서 이미지 업로드 후 텍스트 추출 및 표로 정리'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/8555545-file-uploads-faq'
  },
  {
    id: 'openai-library',
    company: 'openai',
    name: '라이브러리에서 가져오기 (Library)',
    iconName: 'BookOpen',
    category: '파일/데이터',
    purpose: '예전에 ChatGPT에 올렸거나 ChatGPT가 만들어준 문서/스프레드시트/이미지를 다시 불러와 재작업',
    representativeOutput: '기존 자료를 컨텍스트로 불러와 연속 수정 및 버전 업데이트',
    chatUsageNote: 'Library는 저장공간이므로 파일 선택 자체는 사용량 소모 없음 (Chat 대화 분석 시 일반 Chat 한도)',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Library의 파일을 Work로 넘겨 자동 문서 제작을 시키면 Work/Codex 사용량 차감',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'Free: 500MB, Go: 4GB, Plus: 20GB, Pro: 100GB, Business: 20GB',
    bestUseCases: [
      '지난 학기에 ChatGPT로 작성한 평가계획서.xlsx를 불러와 새 학기 문항 추가',
      '과거에 생성한 회사 로고 이미지를 불러와 배경 투명화 및 비율 수정',
      '장기 프로젝트용 참조 문서를 Library에 보관해 두고 반복 활용'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt'
  },
  {
    id: 'openai-images',
    company: 'openai',
    name: '이미지 만들기 (Images 2.0)',
    iconName: 'Image',
    category: '미디어/시각화',
    purpose: '텍스트 프롬프트로 고화질 이미지 생성, 기존 이미지 편집, 개체 추가/제거, 투명 배경 처리',
    representativeOutput: '고화질 PNG 이미지 (다양한 가로세로 비율)',
    chatUsageNote: '일반 Chat 이미지 생성은 Codex/Work와 분리된 별도 Image Quota (하루 50장 등 동적 제한) 적용',
    chatUsageType: '🔵 별도 도구 한도',
    workAgentUsageNote: 'Work 안에서 이미지 생성을 포함하면 일반 턴보다 약 3~5배 빠르게 Agentic Usage 소비',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '출력 단가 $30/1M tokens 상당 (Enterprise Rate Card 기준)',
    bestUseCases: [
      '프레젠테이션 및 보고서용 맞춤 일러스트 생성',
      '인스타그램/유튜브 썸네일 그래픽 및 3D 렌더링 이미지 제작',
      '기존 제품 사진의 배경을 투명화하거나 특정 오브젝트 교체'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/8555544-dall-e-3-in-chatgpt'
  },
  {
    id: 'openai-canvas',
    company: 'openai',
    name: 'Canvas (코드 및 텍스트 실시간 전용 편집기)',
    iconName: 'LayoutGrid',
    category: '개발/에이전트',
    purpose: '대화창 옆에 분할 화면(Split View)을 띄워 코드나 긴 글을 줄 단위로 직접 수정하고 실시간 피드백 반영',
    representativeOutput: '버전 히스토리가 관리되는 완성형 소스코드 및 긴 기획 문서',
    chatUsageNote: '일반 대화와 동일한 턴(Turn)으로 처리되나 수정 횟수마다 컨텍스트 토큰 누적',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Canvas 작업을 Work 에이전트 모드로 전환하면 다중 파일 생성 시 Agentic Allowance 소모',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '버전 복원(Restore) 및 특정 블록 선택 수정 지원',
    bestUseCases: [
      '파이썬 스크립트 작성 중 특정 함수만 인라인으로 리팩토링',
      '블로그 글이나 보고서 초안의 문체 변경, 분량 조절, 이모지 추가',
      '코드 리뷰 시 줄 단위 주석 및 디버깅 팁 즉시 반영'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/9930777-using-canvas-in-chatgpt'
  },
  {
    id: 'openai-deep-research',
    company: 'openai',
    name: '심층 리서치 (Deep Research)',
    iconName: 'Search',
    category: '웹/심층리서치',
    purpose: '수십 개 웹페이지를 자율적으로 크롤링하고 교차 검증하여 수십 페이지 분량의 종합 분석 리포트 자동 작성',
    representativeOutput: '출처 각주가 완벽히 표기된 10~20페이지 분량의 심층 시장 조사 보고서',
    chatUsageNote: '일반 Chat에서 활성화 시 월 10~100회 등 별도의 Deep Research 전용 월간 한도 차감',
    chatUsageType: '🔵 별도 도구 한도',
    workAgentUsageNote: 'Work에서 리서치 에이전트로 구동 시 대량의 Agentic Compute 동시 소모',
    workAgentUsageType: '🟠 대량 Compute 차감',
    limitsAndStorage: '1회 질의당 수십~수백 건의 웹페이지 탐색 (수분~수십분 소요)',
    bestUseCases: [
      '차세대 AI 반도체 3사 아키텍처 및 벤치마크 심층 기술 백서 작성',
      '특정 산업군의 최근 3개년 글로벌 규제 변화 및 경쟁사 동향 분석',
      '신규 사업 기획을 위한 학술 논문 및 시장 보고서 전수 크로스체크'
    ],
    officialSourceUrl: 'https://openai.com/index/introducing-deep-research/'
  },
  {
    id: 'openai-gmail',
    company: 'openai',
    name: 'Gmail 연동 (Connectors)',
    iconName: 'Mail',
    category: '외부 앱 연동',
    purpose: 'ChatGPT 내에서 수신 메일 검색, 긴 메일 타래 요약, 답장 초안 작성 및 관리 작업',
    representativeOutput: '메일 요약 브리핑, 답장 초안, 일정/액션 아이템 추출',
    chatUsageNote: 'Gmail 자체의 추가 요금 없이 사용 중인 ChatGPT 플랜의 일반 Rate Limit 적용',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Work에서 "Gmail 30통 분석 후 종합 보고서 작성" 시 Work/Codex Agentic 사용량 차감',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'Google 계정 OAuth 권한 연동 (Google 자체 API 제한 적용 가능)',
    bestUseCases: [
      '오늘 수신된 읽지 않은 고객/파트너사 문의 메일 중 긴급 건만 요약',
      '지난주 특정 프로젝트 관련 메일 타래를 읽고 진행 상황 정리',
      '상대방 메일 어조에 맞춘 정중한 비즈니스 답장 초안 작성'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/11487775-connectors-in-chatgpt'
  },
  {
    id: 'openai-google-drive',
    company: 'openai',
    name: 'Google Drive (Docs · Sheets · Slides)',
    iconName: 'FolderGit2',
    category: '외부 앱 연동',
    purpose: 'Google Drive 내 문서 검색 및 Work에서 Native Docs, Sheets, Slides 파일 직접 제작/수정',
    representativeOutput: '구글 드라이브 문서 분석 요약 및 Work를 통한 실시간 Google Slides/Docs 생성',
    chatUsageNote: 'Chat에서 Drive 문서 검색 및 분석 시 일반 ChatGPT Rate Limit 적용',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Work에서 드라이브 자료를 분석해 슬라이드 15장을 자동 생성하면 Work/Codex 공용량 소비',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'Docs, Sheets, Slides가 Google Drive 하나로 통합 연동',
    bestUseCases: [
      '드라이브의 프로젝트 자료를 읽고 제안서 Doc + 발표용 Slides 12장 동시 생성',
      '사내 재무 Sheets 데이터를 조회하여 경영진 보고서 초안 작성',
      '팀 공유 드라이브의 이전 회의록을 요약하여 이번 주 아젠다 도출'
    ],
    officialSourceUrl: 'https://help.openai.com/en/articles/20001278-creating-and-editing-documents-spreadsheets-and-presentations-with-chatgpt-work'
  },

  // ==========================================
  // 2. Google (Gemini / Workspace / Antigravity)
  // ==========================================
  {
    id: 'google-video-upload',
    company: 'google',
    name: '초대용량 파일 & 1시간+ 비디오 직통 분석',
    iconName: 'Film',
    category: '파일/데이터',
    purpose: '2M+ 토큰 컨텍스트를 활용해 수백 페이지 PDF나 1시간 이상의 고화질 회의 영상을 업로드하여 분석',
    representativeOutput: '타임스탬프가 포함된 정밀 비디오 요약, 대용량 코드베이스 구조도',
    chatUsageNote: 'Gemini Apps Compute Usage에서 차감 (긴 영상은 일반 대화보다 더 많은 Compute 소비)',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Antigravity에서는 Gemini App과 완전히 분리된 자체 Quota 적용',
    workAgentUsageType: '🟠 대량 Compute 차감',
    limitsAndStorage: '컨텍스트 윈도우 최대 2,000,000+ 토큰 (책 30권 분량)',
    bestUseCases: [
      '1시간 30분짜리 학술 세미나 영상을 업로드하고 핵심 논쟁 타임스탬프 추출',
      '200페이지 분량의 정부 제안요청서(RFP)를 한 번에 넣고 요구사항 표 생성'
    ],
    officialSourceUrl: 'https://ai.google.dev/gemini-api/docs/vision#video'
  },
  {
    id: 'google-search-grounding',
    company: 'google',
    name: 'Google Search Grounding & Maps',
    iconName: 'Globe',
    category: '웹/심층리서치',
    purpose: '구글 검색 엔진의 실시간 인덱스와 구글 지도 데이터를 연동하여 팩트 기반 응답 도출',
    representativeOutput: '검색 출처 링크, 지도 위치 카드, 실시간 데이터 인용',
    chatUsageNote: 'Gemini 일반 대화 한도 내 포함 (Grounding 출처 표시)',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Antigravity 에이전트 리서치 시 자체 스킬로 구글 검색 활용',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '실시간 구글 검색 인덱스 100% 반영',
    bestUseCases: [
      '실시간 교통/장소 정보 및 구글 맵 기반 최적 이동 경로 탐색',
      '오늘 발표된 구글 공식 테크 릴리즈 팩트 확인'
    ],
    officialSourceUrl: 'https://ai.google.dev/gemini-api/docs/grounding'
  },
  {
    id: 'google-workspace-extension',
    company: 'google',
    name: '@Workspace (Gmail · Drive · Docs · YouTube)',
    iconName: 'FolderGit2',
    category: '외부 앱 연동',
    purpose: '@Gmail, @Google Drive, @YouTube 멘션을 통해 개인/사내 구글 데이터와 유튜브 영상 직접 연동',
    representativeOutput: '내 드라이브 파일 요약, 메일 초안 작성, 유튜브 영상 세부 분석',
    chatUsageNote: 'Gemini App 내 Workspace 확장 기능 사용량에 통합 계산',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Antigravity 코딩 쿼터와는 별도로 분리 유지',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'Google 계정 보안 권한 기반 (개인 데이터는 모델 훈련에 미사용 옵션 제공)',
    bestUseCases: [
      '@Google Drive 지난 분기 매출 보고서를 찾아서 요약해줘',
      '@YouTube 이 테크 리뷰 영상에서 언급된 장단점 3가지를 정리해줘'
    ],
    officialSourceUrl: 'https://support.google.com/googleone/answer/14534406'
  },

  // ==========================================
  // 3. Anthropic (Claude / Artifacts / Claude Code)
  // ==========================================
  {
    id: 'claude-artifacts',
    company: 'anthropic',
    name: 'Interactive Artifacts (실시간 React/SVG/HTML 렌더링)',
    iconName: 'LayoutGrid',
    category: '미디어/시각화',
    purpose: '별도 샌드박스 창에서 React 컴포넌트, SVG 그래픽, Mermaid 다이어그램을 실시간으로 실행하고 조작',
    representativeOutput: '실시간 클릭/조작 가능한 인터랙티브 웹앱, 차트, 데이터 시뮬레이터',
    chatUsageNote: '별도의 이미지 Quota 없이 일반 Claude 세션 토큰으로 소비 (사진 생성 모델 없음)',
    chatUsageType: '🟢 전용 샌드박스',
    workAgentUsageNote: 'Claude Code와 100% 동일한 단일 세션 Quota를 공유하므로 토큰 관리 필요',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '단일 파일 완전 자립형 React/HTML 렌더링',
    interactiveFeature: '브라우저 안에서 사용자가 버튼, 폼, 차트를 직접 조작 가능',
    bestUseCases: [
      'React + Tailwind 기반의 인터랙티브 데이터 대시보드 즉시 실행 및 테스트',
      '복잡한 시스템 아키텍처를 인터랙티브 Mermaid 다이어그램으로 시각화'
    ],
    officialSourceUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/artifacts'
  },
  {
    id: 'claude-projects',
    company: 'anthropic',
    name: 'Projects 지식 베이스 (Custom Memory)',
    iconName: 'BookOpen',
    category: '파일/데이터',
    purpose: '프로젝트마다 사내 코딩 컨벤션, 기획 문서, 스타일 가이드를 영구 등록하고 팀과 공유',
    representativeOutput: '맞춤형 프로젝트 컨텍스트가 주입된 일관된 고품질 코드 및 문서',
    chatUsageNote: 'Prompt Caching이 자동 적용되어 반복 주입 문서의 입력 비용을 최대 90% 절감',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Claude Code의 CLAUDE.md와 상호 보완적으로 작동',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '프로젝트당 수십 권 분량의 문서 영구 저장',
    bestUseCases: [
      '회사 프론트엔드 디자인 시스템 규칙을 올려두고 컴포넌트 일관성 유지',
      '특정 법률/회계 프로젝트의 판례와 규정을 사전 등록하고 법률 문서 작성'
    ],
    officialSourceUrl: 'https://support.anthropic.com/en/articles/11049741-what-is-the-max-plan'
  },
  {
    id: 'claude-code-connector',
    company: 'anthropic',
    name: 'Claude Code CLI (터미널 자율 코딩 도구)',
    iconName: 'Terminal',
    category: '개발/에이전트',
    purpose: '개발자의 터미널에서 전체 코드베이스 검색, 파일 인라인 수정, 빌드/테스트 자동 수선, Git 커밋 수행',
    representativeOutput: '로컬 파일 시스템 직접 수정, 자동 Git 커밋, 테스트 통과',
    chatUsageNote: 'Claude Chat과 동일한 통장(단일 Quota)을 공유하므로 낮에 많이 쓰면 저녁 Chat 한도 소진',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: '한도 소진 시 Usage Credits를 켜면 표준 API 요율로 즉시 연속 작업 가능',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'CLAUDE.md 기반 프로젝트 메모리 학습, `/compact` 지원',
    bestUseCases: [
      '터미널에서 `claude "npm test 에러를 통과할 때까지 자가 수정해줘"` 실행',
      '전체 레포지토리의 오래된 라이브러리 일괄 마이그레이션'
    ],
    officialSourceUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview'
  },

  // ==========================================
  // 4. xAI (Grok / Grok Build / SpaceXAI)
  // ==========================================
  {
    id: 'grok-realtime-x',
    company: 'xai',
    name: 'Real-time X Firehose (실시간 소셜 데이터)',
    iconName: 'Globe',
    category: '웹/심층리서치',
    purpose: '전 세계 X(트위터) 포스트를 초단위로 실시간 탐색하여 방금 터진 뉴스, 개발자 여론, 벤치마크 팩트체크',
    representativeOutput: '실시간 속보 요약, 찬반 여론 대조, 커뮤니티 벤치마크 반응',
    chatUsageNote: '통합 Weekly Compute Pool에서 차감 (일반 텍스트 쿼리는 소모량 미미)',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: 'Grok Build와 100% 동일한 Weekly Pool을 공유',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: '초단위 실시간 데이터 직통 연결',
    bestUseCases: [
      '오늘 발표된 AI 모델에 대한 글로벌 개발자들의 실시간 피드백 및 버그 제보 확인',
      '실시간 테크 컨퍼런스 발표 내용 초단위 브리핑'
    ],
    officialSourceUrl: 'https://docs.x.ai/docs/guides/tools'
  },
  {
    id: 'grok-video-imagine',
    company: 'xai',
    name: 'Grok Imagine & Video (이미지·영상 생성)',
    iconName: 'Film',
    category: '미디어/시각화',
    purpose: '1K/2K 고품질 이미지 생성 및 480p/720p 텍스트-비디오 생성',
    representativeOutput: '고해상도 이미지 및 AI 생성 고화질 동영상',
    chatUsageNote: '단일 Weekly Pool에서 차감되며, 720p 10초 영상은 약 $0.70 상당의 초거대 Compute를 소비',
    chatUsageType: '🔵 별도 도구 한도',
    workAgentUsageNote: '영상을 과도하게 생성하면 Grok Build 및 유료 Chat 한도까지 함께 바닥남',
    workAgentUsageType: '🟠 대량 Compute 차감',
    limitsAndStorage: 'Imagine: 장당 $0.02~$0.07 / Video: 초당 $0.05~$0.07',
    bestUseCases: [
      '소셜 미디어 홍보용 고화질 숏폼 비디오 클립 생성',
      '창의적인 미래 콘셉트 아트 및 사실적 일러스트 제작'
    ],
    officialSourceUrl: 'https://docs.x.ai/docs/guides/image-generation'
  },
  {
    id: 'grok-build-vision',
    company: 'xai',
    name: 'Grok Build & Vision-to-Code',
    iconName: 'LayoutGrid',
    category: '개발/에이전트',
    purpose: '스케치/와이어프레임 이미지를 업로드하면 즉시 동작하는 모던 웹앱 코드로 변환하고 Three.js 시뮬레이션 구축',
    representativeOutput: 'React/Tailwind 웹앱 코드, Three.js 3D 인터랙티브 캔버스',
    chatUsageNote: 'Grok 유료 주간 풀(Weekly Pool)을 공유하여 긴 코딩 작업 시 사용량 증가',
    chatUsageType: '🟢 Chat 기본',
    workAgentUsageNote: '주간 풀 소진 시 Extra Usage Credits로 자동 충전 지원',
    workAgentUsageType: '🟠 Work/Codex 공용',
    limitsAndStorage: 'Colossus 2 슈퍼컴퓨터 기반의 초고속 토큰 출력 쓰루풋',
    interactiveFeature: 'Three.js 기반 3D 파티클 및 물리 법칙 시뮬레이션 코드 특화',
    bestUseCases: [
      '화이트보드 손그림 UI 사진을 찍어 즉시 반응형 React 대시보드로 복원',
      '수학적/물리학적 3D 궤적 시뮬레이션 웹앱 프로토타이핑'
    ],
    officialSourceUrl: 'https://docs.x.ai/docs/guides/vision'
  }
];
