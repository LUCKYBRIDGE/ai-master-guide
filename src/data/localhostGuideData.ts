export interface LocalhostStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  explanation: string;
  terminalCommand?: string;
  terminalOutput?: string;
  proTips: string[];
}

export interface FrameworkCommand {
  framework: string;
  tech: string;
  defaultPort: string;
  devCommand: string;
  buildCommand: string;
  notes: string;
}

export interface TroubleshootingItem {
  id: string;
  symptom: string;
  cause: string;
  solutionCode?: string;
  solutionSteps: string[];
}

export const LOCALHOST_STEPS: LocalhostStep[] = [
  {
    stepNumber: 1,
    title: '터미널 열기 및 프로젝트 디렉토리 이동',
    subtitle: 'AI가 코드를 작성해둔 폴더 위치로 터미널의 위치를 맞추는 단계',
    explanation: '터미널(명령 프롬프트, PowerShell, 또는 VS Code 터미널)을 열고, 프로젝트 폴더로 이동합니다. 윈도우 파일 탐색기 주소창에 cmd를 치고 엔터를 누르면 해당 폴더에서 즉시 터미널이 열립니다.',
    terminalCommand: '# 윈도우 PowerShell / 명령 프롬프트 예시\ncd c:\\ai_dev\\apps\\STUDY',
    terminalOutput: 'PS C:\\ai_dev\\apps\\STUDY>',
    proTips: [
      '⚡ 꿀팁 1: 윈도우 파일 탐색기에서 작업 중인 폴더로 들어간 뒤, 상단 주소창을 클릭하고 cmd 입력 후 엔터를 치면 해당 경로에서 검은색 터미널 창이 바로 뜹니다.',
      '⚡ 꿀팁 2: VS Code나 Antigravity IDE를 쓰고 있다면 키보드 단축키 Ctrl + ` (백틱)을 누르면 아래에 통합 터미널이 바로 열립니다.'
    ]
  },
  {
    stepNumber: 2,
    title: '필수 부품(패키지) 설치 (최초 1회)',
    subtitle: 'AI가 작성한 package.json의 라이브러리 부품들을 내 컴퓨터로 다운로드하는 단계',
    explanation: 'AI가 React, Tailwind, 아이콘 등의 코드를 작성해 주었다면, 이 부품들을 실제로 구동하기 위해 npm install을 1회 실행해야 합니다. 이미 node_modules 폴더가 있다면 이 단계는 생략해도 됩니다.',
    terminalCommand: 'npm install',
    terminalOutput: 'added 140 packages, and audited 141 packages in 3s\nfound 0 vulnerabilities',
    proTips: [
      'Node.js가 컴퓨터에 깔려 있어야 npm 명령어가 작동합니다. 만약 "npm 명령어를 찾을 수 없다"고 뜨면 nodejs.org에서 LTS 버전을 설치하세요.',
      '새로운 라이브러리가 추가되었거나 처음 프로젝트를 내려받았을 때 딱 한 번만 실행하면 됩니다.'
    ]
  },
  {
    stepNumber: 3,
    title: '로컬 개발 서버 실행 및 브라우저 접속',
    subtitle: '내 컴퓨터를 미니 웹 서버로 만들어 브라우저에서 실시간으로 화면을 띄우는 단계',
    explanation: 'npm run dev 명령어를 입력하면 수 초 만에 로컬 웹 서버가 켜집니다. 터미널에 뜨는 주소(보통 http://localhost:3000 또는 http://localhost:5173)를 웹 브라우저 주소창에 입력하면 AI가 만든 웹앱이 눈앞에 나타납니다.',
    terminalCommand: 'npm run dev',
    terminalOutput: '  VITE v5.4.21  ready in 240 ms\n\n  ➜  Local:   http://localhost:3000/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help',
    proTips: [
      '🌐 크롬, 엣지, 웨일 등 아무 웹 브라우저를 열고 주소창에 http://localhost:3000 을 입력하고 엔터를 치세요.',
      '🔄 Hot Reload 지원: 개발 서버가 켜져 있는 동안 AI가 소스코드를 수정하면 브라우저를 새로고침하지 않아도 화면이 실시간 자동 업데이트됩니다.',
      '🛑 서버 종료법: 터미널 창에서 Ctrl + C 를 누르고 Y(예)를 누르면 로컬 웹 서버가 꺼집니다.'
    ]
  }
];

export const FRAMEWORK_COMMANDS: FrameworkCommand[] = [
  {
    framework: 'Vite + React (현재 프로젝트)',
    tech: 'React 18 / 19, TypeScript, Tailwind',
    defaultPort: '3000 또는 5173',
    devCommand: 'npm run dev',
    buildCommand: 'npm run build',
    notes: '초고속 번들러로 실행 속도가 0.2초 수준으로 가장 빠르고 가벼움.'
  },
  {
    framework: 'Next.js (App Router)',
    tech: 'React Fullstack Framework',
    defaultPort: '3000',
    devCommand: 'npm run dev',
    buildCommand: 'npm run build && npm start',
    notes: '서버 사이드 렌더링(SSR) 및 풀스택 웹 애플리케이션 표준.'
  },
  {
    framework: 'Create React App (레거시)',
    tech: 'Webpack 기반 React',
    defaultPort: '3000',
    devCommand: 'npm start',
    buildCommand: 'npm run build',
    notes: '과거 표준 방식. dev 대신 npm start로 실행.'
  },
  {
    framework: '단일 HTML/JS 파일 (Static)',
    tech: 'HTML5, CSS, Vanilla JS',
    defaultPort: '3000 / 8000',
    devCommand: 'npx serve  또는  python -m http.server 3000',
    buildCommand: '해당 없음 (정적 파일)',
    notes: 'Node.js 없이 파이썬만으로도 즉시 3000 포트 웹 서버 구동 가능.'
  }
];

export const TROUBLESHOOTING_LIST: TroubleshootingItem[] = [
  {
    id: 'port-in-use',
    symptom: '❌ 포트 충돌 에러 (EADDRINUSE: address already in use :::3000)',
    cause: '이전에 켜둔 터미널 창이나 다른 프로그램이 이미 3000번 포트를 사용 중일 때 발생합니다.',
    solutionCode: '# 윈도우 PowerShell에서 3000번 포트 강제 종료\nStop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force',
    solutionSteps: [
      '방법 1: 이전에 열어둔 다른 터미널 창을 찾아 Ctrl + C를 눌러 끕니다.',
      '방법 2: Vite는 자동으로 3001번이나 다음 빈 포트로 실행해 주므로 터미널에 뜬 새 주소(http://localhost:3001)로 접속합니다.',
      '방법 3: 위의 PowerShell 명령어를 실행하여 3000 포트를 점유한 이전 프로세스를 강제 종료합니다.'
    ]
  },
  {
    id: 'npm-not-found',
    symptom: '❌ \'npm\' 또는 \'node\' 명령어를 찾을 수 없습니다',
    cause: '컴퓨터에 Node.js 실행 환경이 설치되어 있지 않거나 환경변수 PATH가 등록되지 않았을 때 발생합니다.',
    solutionSteps: [
      '1. 공식 웹사이트 https://nodejs.org 에 접속합니다.',
      '2. [LTS (안정적인 버전)] 다운로드 버튼을 눌러 설치 파일을 받습니다.',
      '3. 설치 마법사에서 Next를 눌러 기본값으로 설치를 완료합니다.',
      '4. 열려 있던 터미널 창을 완전히 닫았다가 다시 열면 npm 명령어가 정상 작동합니다.'
    ]
  },
  {
    id: 'module-not-found',
    symptom: '❌ Module not found: Error: Can\'t resolve \'lucide-react\' 등',
    cause: 'AI가 코드에 작성한 부품(패키지)이 아직 로컬 컴퓨터에 설치되지 않은 상태입니다.',
    solutionCode: 'npm install',
    solutionSteps: [
      '터미널에 npm install 을 입력하여 package.json에 정의된 부품들을 일괄 다운로드합니다.',
      '특정 패키지 하나만 없을 때는 npm install 패키지이름 (예: npm install lucide-react)을 실행합니다.'
    ]
  }
];
