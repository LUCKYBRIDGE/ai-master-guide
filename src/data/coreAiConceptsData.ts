/**
 * @deprecated Unpublished legacy glossary and examples. This file is not rendered by the
 * current app. Revalidate product-specific instructions and remove absolute outcome
 * claims before reconnecting it.
 */
export interface EasyGlossaryTerm {
  id: string;
  term: string;
  englishTerm: string;
  category: '디자인/UI' | '개발/연동' | 'AI/에이전트';
  easyMeaning: string;
  realLifeMetaphor: string;
  realDevExample: string;
  promptTip: string;
}

export interface UniversalPromptRule {
  stepNumber: number;
  partName: string;
  partRole: string;
  exampleSnippet: string;
  whyNeeded: string;
}

export interface DesignToDevHandoffGuide {
  id: string;
  sourceDesignTool: string;
  sourceToolCategory: string;
  summaryTitle: string;
  step1Design: {
    title: string;
    actionDescription: string;
  };
  step2Extract: {
    title: string;
    actionDescription: string;
    fileFormat: string;
    whereToSave: string;
  };
  step3InjectPrompt: {
    title: string;
    actionDescription: string;
    copyablePrompt: string;
  };
  step4AgentExecution: {
    title: string;
    actionDescription: string;
    finalDeliverable: string;
  };
}

export interface ConceptDetail {
  id: string;
  name: string;
  englishName: string;
  category: '통합/오케스트레이션' | '프롬프트/디자인' | '에이전트/자동화' | '도메인/지식' | '프로토콜/인프라';
  oneLineSummary: string;
  whyItMatters: string;
  howItWorks: string[];
  visualDiagram: string;
  realWorldExample: {
    scenario: string;
    beforeWithoutIt: string;
    afterWithIt: string;
    codeOrConfigSnippet: string;
  };
  bestPractices: string[];
  commonMistakes: string[];
  officialDocAnchorUrl: string;
}

// 1. 모든 AI 모델(Claude, GPT, Gemini, Cursor) 공통 만능 프롬프트 원칙
export const UNIVERSAL_PROMPT_FORMULA: UniversalPromptRule[] = [
  {
    stepNumber: 1,
    partName: '1. 만들려는 목표 (Goal)',
    partRole: '어떤 기능이나 화면을 만들 것인지 명확히 1줄로 정의',
    exampleSnippet: '"사용자가 주식을 매수/매도할 수 있는 호가창 컴포넌트를 만들어줘."',
    whyNeeded: 'AI가 엉뚱한 페이지를 만들지 않고 작업 범위를 좁히기 위함'
  },
  {
    stepNumber: 2,
    partName: '2. 참고할 파일/디자인 (Context)',
    partRole: '디자인이나 기존 코드가 어디에 있는지 파일 경로 지정',
    exampleSnippet: '"루트의 ./DESIGN.md 색상 규칙과 src/types/trading.ts 타입을 참고해줘."',
    whyNeeded: 'AI가 임의로 색상이나 데이터 형식을 지어내지(환각) 못하게 방지'
  },
  {
    stepNumber: 3,
    partName: '3. 기술 조건 및 규칙 (Constraints)',
    partRole: '사용할 프레임워크, CSS 도구, 상태 관리 라이브러리 명시',
    exampleSnippet: '"React, Tailwind CSS, TypeScript로 작성하고 상태 관리는 Zustand를 써줘."',
    whyNeeded: '프로젝트의 기존 기술 스택과 어긋나는 코드가 나오는 것 방지'
  },
  {
    stepNumber: 4,
    partName: '4. 저장 위치 및 검증 (Output & Test)',
    partRole: '완성된 코드를 어느 파일에 저장하고 어떻게 확인할지 지시',
    exampleSnippet: '"src/components/OrderBook.tsx에 저장하고 npm run build로 에러를 확인해줘."',
    whyNeeded: '에이전트가 코드를 직접 파일에 쓰고 스스로 빌드 검증까지 완결하도록 유도'
  }
];

// 2. 담백하고 쉬운 한국어 단어사전 (미사여구 제거)
export const EASY_AI_GLOSSARY_DATA: EasyGlossaryTerm[] = [
  {
    id: 'glossary-stitch',
    term: '구글 스티치 (Google Stitch)',
    englishTerm: 'Google Stitch (stitch.withgoogle.com)',
    category: '디자인/UI',
    easyMeaning: '텍스트나 스케치 이미지를 바탕으로 UI 시안을 생성하는 Google의 AI 디자인 도구. 생성 시간과 품질은 입력·서비스 상태에 따라 달라짐',
    realLifeMetaphor: '말만 하면 스케치를 대신 그려주는 스케치북',
    realDevExample: '피그마를 다룰 줄 몰라도 "다크모드 주식 호가창 만들어줘"라고 치면 웹 화면 레이아웃과 DESIGN.md를 만들어 줍니다.',
    promptTip: '모든 AI 공통: "Google Stitch에서 추출한 DESIGN.md를 참고해서 컴포넌트를 작성해줘."'
  },
  {
    id: 'glossary-design-md',
    term: 'DESIGN.md',
    englishTerm: 'Design Markdown Specification',
    category: '디자인/UI',
    easyMeaning: '화면에 쓰일 색상 코드(#3182F6), 글자 크기, 여백 크기를 적어둔 일반 텍스트 메모장',
    realLifeMetaphor: '가구 조립할 때 나사 크기와 색상이 적힌 부품 설명서',
    realDevExample: '프로젝트에 넣어두면 AI가 임의로 색을 쓰지 않고 이 파일에 적힌 색상과 여백만 사용합니다.',
    promptTip: '모든 AI 공통: "./DESIGN.md에 적힌 색상과 여백 규칙을 그대로 지켜서 코딩해줘."'
  },
  {
    id: 'glossary-design-tokens',
    term: '디자인 토큰 (Design Tokens)',
    englishTerm: 'Design Tokens',
    category: '디자인/UI',
    easyMeaning: '자주 쓰는 색상이나 여백에 이름을 붙여놓은 것 (예: 파란색 = primary, 여백 16px = spacing-m)',
    realLifeMetaphor: '식당에서 소스마다 붙여둔 고유 번호표',
    realDevExample: '나중에 메인 색상을 바꿀 때 파일 100개를 고칠 필요 없이 토큰 파일 1개만 바꾸면 전체 적용됩니다.',
    promptTip: '모든 AI 공통: "직접 색상 코드를 쓰지 말고 정의된 디자인 토큰 변수를 사용해줘."'
  },
  {
    id: 'glossary-artifacts',
    term: '클로드 아티팩트 (Claude Artifacts)',
    englishTerm: 'Anthropic Artifacts',
    category: '개발/연동',
    easyMeaning: '클로드 대화창 옆에 뜨는 미리보기 창으로, 버튼을 직접 눌러보며 동작을 확인할 수 있는 공간',
    realLifeMetaphor: '옷 사기 전에 피팅룸에서 직접 입어보는 것',
    realDevExample: '코드가 실제로 화면에서 어떻게 돌아가는지 브라우저에서 바로 클릭해보고 복사할 수 있습니다.',
    promptTip: '모든 AI 공통: "버튼 클릭이 동작하는 단일 React 컴포넌트로 작성해줘."'
  },
  {
    id: 'glossary-figma-dev-mode',
    term: '피그마 개발자 모드 (Figma Dev Mode)',
    englishTerm: 'Figma Dev Mode',
    category: '디자인/UI',
    easyMeaning: '디자이너가 그린 피그마 화면을 개발자가 CSS 코드와 치수로 바로 볼 수 있는 화면',
    realLifeMetaphor: '건축 도면의 가로/세로 치수 측정기',
    realDevExample: '피그마에서 버튼을 누르면 패딩 16px, 둥글기 8px 같은 CSS 값이 바로 보여 개발에 참고할 수 있습니다.',
    promptTip: '모든 AI 공통: "피그마 Dev Mode의 여백(p-4)과 둥글기(rounded-lg)를 반영해줘."'
  },
  {
    id: 'glossary-coding-agents',
    term: 'AI 코딩 에이전트 (Claude Code, Antigravity, Cursor, Codex)',
    englishTerm: 'AI Coding Agents',
    category: 'AI/에이전트',
    easyMeaning: '채팅만 하는 챗봇과 달리, 내 컴퓨터의 소스코드 파일을 직접 수정하고 터미널 명령어를 실행하는 AI 도구',
    realLifeMetaphor: '지시한 대로 직접 코드를 고치고 테스트까지 돌려보는 보조 개발자',
    realDevExample: '파일을 일일이 복사해서 붙여넣지 않아도, AI가 알아서 `src/components/`에 파일을 만들고 `npm test`를 돌려줍니다.',
    promptTip: '모든 AI 공통: "src/components/Header.tsx 파일을 생성하고 npm run build로 에러를 점검해줘."'
  },
  {
    id: 'glossary-mcp',
    term: 'MCP (Model Context Protocol)',
    englishTerm: 'Model Context Protocol',
    category: '개발/연동',
    easyMeaning: 'AI가 내 컴퓨터의 DB나 깃허브, 파일시스템을 안전하게 읽을 수 있게 해주는 표준 연결 방식',
    realLifeMetaphor: '기기 종류에 상관없이 다 꽂히는 표준 C타입 충전 케이블',
    realDevExample: '복잡한 연결 코드 없이 Postgres MCP 플러그인만 켜면 AI가 데이터베이스 테이블 구조를 직접 읽습니다.',
    promptTip: '모든 AI 공통: "Postgres MCP를 통해 users 테이블 스키마를 확인해줘."'
  },
  {
    id: 'glossary-stitching',
    term: '스티칭 (Stitching / 모듈 연결)',
    englishTerm: 'Stitching / Glue Code',
    category: '개발/연동',
    easyMeaning: '따로따로 만들어진 프론트엔드 화면과 백엔드 DB를 서로 데이터가 통하도록 이어붙이는 작업',
    realLifeMetaphor: '따로 만든 모니터와 본체에 케이블을 꽂아 화면이 나오게 연결하는 작업',
    realDevExample: 'AI가 만든 목업 화면에 실제 서버 API 주소를 연결하여 화면에 진짜 데이터가 뜨게 만듭니다.',
    promptTip: '모든 AI 공통: "이 UI 컴포넌트에 백엔드 /api/orders 데이터를 연결해줘."'
  },
  {
    id: 'glossary-self-healing',
    term: '자가 수정 (Self-healing)',
    englishTerm: 'Self-Healing Error Loop',
    category: 'AI/에이전트',
    easyMeaning: '코드 빌드나 테스트 중 에러가 났을 때, AI가 에러 메시지를 읽고 스스로 코드를 고쳐서 해결하는 과정',
    realLifeMetaphor: '오타를 냈을 때 지우개로 스스로 지우고 다시 바르게 쓰는 것',
    realDevExample: 'TypeScript 타입 에러가 나면 사람이 개입하지 않아도 AI가 실패 로그를 보고 타입을 알맞게 수정합니다.',
    promptTip: '모든 AI 공통: "npm test를 실행하고 실패하는 부분이 있으면 스스로 고쳐서 완료해줘."'
  },
  {
    id: 'glossary-project-rules',
    term: '프로젝트 룰 (CLAUDE.md / .cursorrules)',
    englishTerm: 'Project Rules & Instructions',
    category: 'AI/에이전트',
    easyMeaning: '우리 프로젝트의 코딩 스타일이나 금기사항을 적어두어 AI가 매번 자동으로 읽게 하는 설정 파일',
    realLifeMetaphor: '사무실 벽에 붙여둔 사내 기본 규칙 안내문',
    realDevExample: '"세미콜론 쓰지 마라", "any 타입 쓰지 마라" 같은 규칙을 적어두면 AI가 매번 알아서 지킵니다.',
    promptTip: '모든 AI 공통: "CLAUDE.md에 적힌 코딩 규칙을 지켜줘."'
  }
];

// 3. 디자인 도구 ➔ 코딩 도구 실전 인계 가이드 (어떤 AI든 동일한 원리로 동작)
export const DESIGN_TO_DEV_HANDOFF_GUIDES: DesignToDevHandoffGuide[] = [
  // 1. Google Stitch ➔ 코딩 도구
  {
    id: 'handoff-stitch-to-dev',
    sourceDesignTool: '구글 스티치 (Google Stitch)',
    sourceToolCategory: 'AI 시안 생성 캔버스',
    summaryTitle: '구글 스티치 디자인 ➔ 코딩 에이전트(Claude Code / Antigravity / Cursor / Codex)로 가져오기',
    step1Design: {
      title: '1단계: 스티치에서 시안 만들기',
      actionDescription: 'stitch.withgoogle.com에서 말이나 스케치로 원하는 화면을 만듭니다.'
    },
    step2Extract: {
      title: '2단계: DESIGN.md 다운로드',
      actionDescription: '우측 상단 Export에서 DESIGN.md를 다운로드해 내 프로젝트 폴더(`./DESIGN.md`)에 넣습니다.',
      fileFormat: 'DESIGN.md (색상/폰트/여백 텍스트 파일)',
      whereToSave: '프로젝트 루트 디렉토리 (`./DESIGN.md`)'
    },
    step3InjectPrompt: {
      title: '3단계: 어떤 코딩 AI에든 아래 프롬프트 복붙하기',
      actionDescription: 'Claude Code, Antigravity, Cursor, ChatGPT 등 쓰는 도구에 그대로 입력합니다.',
      copyablePrompt: `[목표] 주식 호가창 대시보드 컴포넌트를 만들어줘.
[참고자료] 루트의 ./DESIGN.md 파일에 적힌 색상(#3182F6, Slate 900)과 여백 규칙을 그대로 참고해줘.
[기술조건] React, Tailwind CSS, TypeScript를 사용해줘.
[출력위치] src/components/OrderBook.tsx에 저장하고 npm run build로 에러를 확인해줘.`
    },
    step4AgentExecution: {
      title: '4단계: AI가 파일 생성 및 검증 완료',
      actionDescription: 'AI가 DESIGN.md를 읽고 색상/여백 오차 없이 파일을 만들고 빌드를 검증합니다.',
      finalDeliverable: '디자인 규격이 반영된 완성 소스코드'
    }
  },

  // 2. Claude Artifacts ➔ 코딩 도구
  {
    id: 'handoff-claude-to-dev',
    sourceDesignTool: '클로드 디자인 (Claude Artifacts)',
    sourceToolCategory: '실시간 React 미리보기',
    summaryTitle: '클로드 미리보기 코드 ➔ 코딩 에이전트(Claude Code / Antigravity / Cursor / Codex)로 가져오기',
    step1Design: {
      title: '1단계: 클로드에서 직접 눌러보며 UI 완성',
      actionDescription: '클로드 대화창에서 화면을 요청하고, 우측 창에서 버튼을 눌러보며 마음에 들 때까지 수정합니다.'
    },
    step2Extract: {
      title: '2단계: 코드 복사해서 임시 파일에 넣기',
      actionDescription: '우측 상단 Copy Code를 눌러 복사한 뒤, 프로젝트의 `src/components/temp/Prototype.tsx`에 저장합니다.',
      fileFormat: '단일 React 소스코드 (.tsx)',
      whereToSave: '`src/components/temp/Prototype.tsx`'
    },
    step3InjectPrompt: {
      title: '3단계: 어떤 코딩 AI에든 아래 프롬프트 복붙하기',
      actionDescription: '단일 파일을 깔끔하게 쪼개고 실제 데이터와 연결하도록 지시합니다.',
      copyablePrompt: `[목표] src/components/temp/Prototype.tsx에 있는 프로토타입 코드를 실제 서비스용 코드로 정리해줘.
[작업내용] 
1. 하나의 파일로 뭉쳐진 코드를 Header.tsx, Table.tsx 2개 파일로 분리해줘.
2. 가짜(Mock) 데이터를 지우고 우리 프로젝트의 실제 API와 연결해줘.
[출력위치] src/components/에 저장하고 temp 폴더는 정리한 뒤 npm test를 돌려줘.`
    },
    step4AgentExecution: {
      title: '4단계: AI가 모듈 분할 및 API 연결 완료',
      actionDescription: 'AI가 단일 코드를 여러 파일로 깔끔히 나누고 실제 백엔드 API와 연결합니다.',
      finalDeliverable: '모듈화된 React 컴포넌트 & API 연결 코드'
    }
  },

  // 3. Figma ➔ 코딩 도구
  {
    id: 'handoff-figma-to-dev',
    sourceDesignTool: '피그마 (Figma)',
    sourceToolCategory: '디자이너 원본 시안',
    summaryTitle: '피그마 시안 ➔ 코딩 에이전트(Claude Code / Antigravity / Cursor / Codex)로 가져오기',
    step1Design: {
      title: '1단계: 피그마 시안 확인',
      actionDescription: '디자이너가 완성한 피그마 화면을 엽니다.'
    },
    step2Extract: {
      title: '2단계: 화면 캡처 및 Dev Mode CSS 복사',
      actionDescription: '화면을 캡처해서 `preview.png`로 저장하고, 피그마 Dev Mode에서 주요 CSS(여백, 색상)를 확인합니다.',
      fileFormat: '화면 캡처 이미지 (.png) + CSS 치수',
      whereToSave: '`docs/preview.png`'
    },
    step3InjectPrompt: {
      title: '3단계: 어떤 코딩 AI에든 아래 프롬프트 복붙하기',
      actionDescription: '이미지 파일과 CSS 치수를 주고 똑같이 만들어달라고 지시합니다.',
      copyablePrompt: `[목표] 결제 모달 컴포넌트를 만들어줘.
[참고자료] docs/preview.png 이미지와 피그마 Dev Mode CSS 치수(패딩 24px, 배경색 #0F172A, 버튼 둥글기 12px)를 참고해줘.
[기술조건] React, Tailwind CSS, TypeScript를 사용해줘.
[출력위치] src/components/PaymentModal.tsx에 작성하고 빌드 에러를 확인해줘.`
    },
    step4AgentExecution: {
      title: '4단계: AI가 픽셀 매칭 코딩 완료',
      actionDescription: 'AI가 이미지를 보고 레이아웃을 파악해 Tailwind CSS로 동일하게 만듭니다.',
      finalDeliverable: '피그마 시안과 일치하는 React 컴포넌트'
    }
  }
];

export const CORE_AI_CONCEPTS_DATA: ConceptDetail[] = [
  // 1. Google Stitch
  {
    id: 'concept-google-stitch',
    name: '구글 스티치 (Google Stitch)',
    englishName: 'Google Stitch (stitch.withgoogle.com)',
    category: '프롬프트/디자인',
    oneLineSummary: '자연어나 이미지를 바탕으로 UI를 만들고 DESIGN.md 디자인 시스템을 가져오거나 내보낼 수 있는 Google 도구',
    whyItMatters: '피그마를 다루지 못하는 개발자나 기획자도 말 몇 마디로 깔끔한 UI 시안과 디자인 토큰을 바로 얻을 수 있습니다.',
    howItWorks: [
      '1. stitch.withgoogle.com에서 원하는 분위기(Vibe)를 텍스트나 음성으로 설명',
      '2. 스케치나 스크린샷 이미지를 캔버스에 올려 즉시 화면 생성',
      '3. 생성된 화면에서 DESIGN.md(디자인 토큰) 추출',
      '4. 코딩 에이전트에 전달하여 실제 코드로 변환'
    ],
    visualDiagram: `[아이디어 / 스케치] ➔ 🎨 Google Stitch ➔ 📄 DESIGN.md ➔ 🤖 코딩 에이전트 ➔ 🚀 실제 웹앱`,
    realWorldExample: {
      scenario: '손그림 결제 화면을 코드로 만들 때',
      beforeWithoutIt: '디자이너에게 부탁하고 기다리느라 수일 소요',
      afterWithIt: '이미지로 시안 초안을 만든 뒤 DESIGN.md 지원 범위와 결과를 직접 검토',
      codeOrConfigSnippet: `# DESIGN.md 예시
- Primary Color: #3182F6
- Background: #0F172A
- Spacing: 4px 기준 (p-4 = 16px)`
    },
    bestPractices: [
      'Stitch에서 만든 DESIGN.md를 프로젝트 루트에 저장하고 에이전트에 읽게 하세요.'
    ],
    commonMistakes: [
      '화면 이미지만 보고 DESIGN.md 텍스트 파일을 추출하지 않는 경우'
    ],
    officialDocAnchorUrl: 'https://stitch.withgoogle.com/'
  }
];
