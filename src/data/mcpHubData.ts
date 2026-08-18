export interface McpServerItem {
  id: string;
  name: string;
  koreanName: string;
  category: '무설정 즉시실행' | '데이터베이스/파일' | '개발/협업' | '웹/검색' | '지속기억/메모리';
  badge: string;
  badgeColor: string;
  requiresAuth: boolean;
  authType?: string;
  description: string;
  whyUse: string;
  terminalInstallCommand: string;
  claudeCodeCommand: string;
  antigravityMcpJson: string;
  envExample?: string;
  aiWorkPrompts: {
    title: string;
    prompt: string;
  }[];
  officialDocUrl: string;
  githubUrl: string;
}

export const MCP_HUB_SERVERS: McpServerItem[] = [
  // 1. Puppeteer Browser (브라우저 화면 캡처)
  {
    id: 'mcp-puppeteer',
    name: 'Puppeteer Browser',
    koreanName: '웹 브라우저 화면 캡처 & 렌더링 검증',
    category: '무설정 즉시실행',
    badge: 'No Key 즉시 동작',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    requiresAuth: false,
    description: 'AI가 실제 크롬(Chromium) 브라우저를 띄워 웹페이지를 열고, 스크린샷을 찍거나 버튼을 클릭하며 UI 렌더링 결함을 시각적으로 점검합니다.',
    whyUse: '코드로만 보던 UI를 AI가 직접 눈으로 확인하여 반응형 모바일 깨짐이나 CSS 여백 오차를 스스로 수정합니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-puppeteer',
    claudeCodeCommand: 'claude mcp add puppeteer npx -y @modelcontextprotocol/server-puppeteer',
    antigravityMcpJson: `{
  "puppeteer-browser": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
  }
}`,
    aiWorkPrompts: [
      {
        title: '반응형 모바일 화면 캡처 검증',
        prompt: '로컬 개발 서버(http://localhost:3000)를 Puppeteer로 375px 모바일 뷰포트로 열어서 스크린샷을 찍고, 텍스트가 잘리거나 가로 스크롤이 생기는 UI 버그가 있는지 점검해줘.'
      },
      {
        title: '로그인 폼 입력 및 인터랙션 테스트',
        prompt: 'http://localhost:3000/login 페이지로 이동해서 이메일과 비밀번호 입력창에 값을 넣고 로그인 버튼을 눌렀을 때의 화면 변화를 캡처해서 보고해줘.'
      }
    ],
    officialDocUrl: 'https://modelcontextprotocol.io/docs/tools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer'
  },

  // 2. PostgreSQL Database
  {
    id: 'mcp-postgres',
    name: 'PostgreSQL Database',
    koreanName: 'PostgreSQL 데이터베이스 직접 조회 & 쿼리',
    category: '데이터베이스/파일',
    badge: 'DB URL 연결 필요',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    requiresAuth: true,
    authType: 'DATABASE_URL (로컬 또는 Supabase/AWS RDS 주소)',
    description: '로컬 PostgreSQL DB 또는 원격 Supabase/RDS에 직접 연결하여 테이블 스키마, 인덱스 구조, 외래키 관계를 조회하고 안전한 읽기 전용 쿼리를 실행합니다.',
    whyUse: 'AI가 DB 스키마를 몰라 잘못된 컬럼명을 쓰거나 존재하지 않는 테이블을 참조하는 환각(Hallucination)을 100% 방지합니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-postgres "postgresql://user:password@localhost:5432/my_database"',
    claudeCodeCommand: 'claude mcp add postgres npx -y @modelcontextprotocol/server-postgres "postgresql://user:password@localhost:5432/my_database"',
    antigravityMcpJson: `{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/my_database"]
  }
}`,
    envExample: 'DATABASE_URL="postgresql://user:password@localhost:5432/my_database"',
    aiWorkPrompts: [
      {
        title: '테이블 스키마 전수 분석 및 모델 생성',
        prompt: 'DB에 연결해서 현재 생성된 모든 테이블 목록을 확인하고, users 테이블과 orders 테이블의 컬럼 타입에 맞는 TypeScript 인터페이스(src/types/db.ts)를 자동 작성해줘.'
      },
      {
        title: 'N+1 쿼리 성능 분석 및 인덱스 제안',
        prompt: '최근 실행된 주문 조회 쿼리를 분석해서 인덱스가 누락된 외래키 컬럼을 찾고, 성능을 개선할 수 있는 CREATE INDEX 마이그레이션 SQL을 작성해줘.'
      }
    ],
    officialDocUrl: 'https://modelcontextprotocol.io/docs/tools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres'
  },

  // 3. GitHub
  {
    id: 'mcp-github',
    name: 'GitHub',
    koreanName: 'GitHub 이슈 조회 & PR 생성 자동화',
    category: '개발/협업',
    badge: 'Personal Token 필요',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    requiresAuth: true,
    authType: 'GitHub Personal Access Token (repo 권한)',
    description: 'GitHub 원격 저장소와 직접 연동하여 열려있는 이슈(Issue) 목록을 조회하고, 커밋 히스토리를 분석해 Conventional Commits 규격의 풀 리퀘스트(PR)를 자동으로 작성 및 등록합니다.',
    whyUse: '코드 작업 완료 후 번거로운 웹 브라우저 접속 없이 터미널에서 3초 만에 깔끔한 PR을 생성합니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-github',
    claudeCodeCommand: 'claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxxxxxxxxx npx -y @modelcontextprotocol/server-github',
    antigravityMcpJson: `{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_PERSONAL_ACCESS_TOKEN}"
    }
  }
}`,
    envExample: 'GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_personal_access_token_here"',
    aiWorkPrompts: [
      {
        title: '작업 브랜치 기반 PR 자동 생성',
        prompt: '현재 브랜치에서 변경된 git diff 내용을 분석해서, 주요 변경 사항과 자가 테스트 결과를 깔끔하게 요약한 GitHub PR을 생성해줘.'
      },
      {
        title: '최신 이슈 목록 요약 및 작업 착수',
        prompt: '우리 레포지토리에 등록된 이슈 중 "bug" 라벨이 붙은 열린 이슈 3개를 가져와서 원인 분석과 수정 계획을 세워줘.'
      }
    ],
    officialDocUrl: 'https://github.com/settings/tokens',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github'
  },

  // 4. Filesystem
  {
    id: 'mcp-filesystem',
    name: 'Filesystem',
    koreanName: '로컬 파일 시스템 고속 인덱싱 & 탐색',
    category: '무설정 즉시실행',
    badge: 'No Key 즉시 동작',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    requiresAuth: false,
    description: '프로젝트 내 지정한 디렉토리(src/, data/)의 파일 목록, 크기, 수정 일자를 실시간으로 고속 스캔하여 탐색합니다.',
    whyUse: '수백 개의 컴포넌트 중 수정이 필요한 대상 파일의 경로를 토큰 낭비 없이 정확하게 집어냅니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-filesystem ./src',
    claudeCodeCommand: 'claude mcp add filesystem npx -y @modelcontextprotocol/server-filesystem ./src',
    antigravityMcpJson: `{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]
  }
}`,
    aiWorkPrompts: [
      {
        title: '프로젝트 전체 컴포넌트 의존성 맵 추출',
        prompt: 'src/components 디렉토리를 탐색해서 공통 컴포넌트와 페이지별 컴포넌트의 의존 관계를 트리 구조로 요약해줘.'
      },
      {
        title: '사용하지 않는 불필요한 파일 정리',
        prompt: 'src 폴더 내에서 어디에서도 import되지 않는 미사용 파일이나 안 쓰는 스타일 파일을 찾아서 정리 목록을 작성해줘.'
      }
    ],
    officialDocUrl: 'https://modelcontextprotocol.io/docs/tools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem'
  },

  // 5. Memory (지속 기억 MCP)
  {
    id: 'mcp-memory',
    name: 'Memory (Knowledge Graph)',
    koreanName: '에이전트 장기 기억 & 지식 그래프',
    category: '지속기억/메모리',
    badge: 'No Key 즉시 동작',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    requiresAuth: false,
    description: '대화가 끝나거나 세션이 새로 열려도, 프로젝트의 코딩 스타일, 기술 스택 결정 사항, 업무 규칙을 영구적으로 기억합니다.',
    whyUse: '새로운 대화를 시작할 때마다 프로젝트 규칙이나 설정 사항을 매번 반복해서 설명할 필요가 사라집니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-memory',
    claudeCodeCommand: 'claude mcp add memory npx -y @modelcontextprotocol/server-memory',
    antigravityMcpJson: `{
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  }
}`,
    aiWorkPrompts: [
      {
        title: '핵심 아키텍처 규칙 영구 기억 저장',
        prompt: '우리 프로젝트는 결제 금액 계산 시 Decimal.js를 필수로 쓰고, 모든 모달은 Zustand 전역 상태로 관리한다는 아키텍처 규칙을 메모리에 영구 저장해줘.'
      },
      {
        title: '기억된 과거 결정 사항 회상',
        prompt: '메모리에 저장된 지난주 데이터베이스 마이그레이션 결정 사항과 배포 정책을 불러와서 현재 작업에 적용해줘.'
      }
    ],
    officialDocUrl: 'https://modelcontextprotocol.io/docs/tools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory'
  },

  // 6. Fetch (웹 실시간 리더)
  {
    id: 'mcp-fetch',
    name: 'Fetch',
    koreanName: '최신 공식 문서 & 웹 페이지 실시간 읽기',
    category: '웹/검색',
    badge: 'No Key 즉시 동작',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    requiresAuth: false,
    description: '공식 문서 사이트(Tailwind, Next.js, Stripe 등)의 URL을 입력하면 웹 페이지의 본문을 깨끗한 마크다운으로 실시간 변환하여 읽어옵니다.',
    whyUse: '학습 컷오프(2026.08) 이후의 최신 API 변경점이나 라이브러리 공식 문서를 AI가 실시간으로 보면서 코딩합니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-fetch',
    claudeCodeCommand: 'claude mcp add fetch npx -y @modelcontextprotocol/server-fetch',
    antigravityMcpJson: `{
  "fetch": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-fetch"]
  }
}`,
    aiWorkPrompts: [
      {
        title: '최신 공식 문서 기반 API 구현',
        prompt: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use 문서를 fetch로 읽어서 최신 Tool Calling 규격에 맞게 TypeScript 함수를 작성해줘.'
      }
    ],
    officialDocUrl: 'https://modelcontextprotocol.io/docs/tools',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch'
  },

  // 7. Brave Search (실시간 웹 검색)
  {
    id: 'mcp-brave-search',
    name: 'Brave Search',
    koreanName: '실시간 구글/웹 검색 & 최신 에러 솔루션 탐색',
    category: '웹/검색',
    badge: 'Brave API Key 필요',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    requiresAuth: true,
    authType: 'Brave Search API Key (월 2,000회 무료)',
    description: 'Brave 검색 엔진 API를 통해 실시간 웹 검색을 수행하여, 최신 라이브러리 빌드 오류 해결법이나 최신 테크 트렌드를 검색합니다.',
    whyUse: '생소한 빌드 에러나 최근 릴리즈된 패키지의 버그 픽스 해결책을 인터넷에서 실시간으로 찾아냅니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-brave-search',
    claudeCodeCommand: 'claude mcp add brave-search -e BRAVE_API_KEY=your_key_here npx -y @modelcontextprotocol/server-brave-search',
    antigravityMcpJson: `{
  "brave-search": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
    "env": {
      "BRAVE_API_KEY": "\${BRAVE_API_KEY}"
    }
  }
}`,
    envExample: 'BRAVE_API_KEY="BSA_your_free_brave_api_key"',
    aiWorkPrompts: [
      {
        title: '최신 빌드 에러 해결책 웹 검색',
        prompt: '"Next.js 15 Turbopack memory leak issue"를 웹 검색해서 GitHub 이슈에 올라온 가장 최신의 해결 워크어라운드를 찾아줘.'
      }
    ],
    officialDocUrl: 'https://brave.com/search/api/',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search'
  },

  // 8. Docker
  {
    id: 'mcp-docker',
    name: 'Docker',
    koreanName: '도커 컨테이너 상태 모니터링 & 로그 조회',
    category: '개발/협업',
    badge: '로컬 Docker 실행 필요',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    requiresAuth: false,
    description: '내 컴퓨터에서 실행 중인 Docker 컨테이너 목록, CPU/메모리 리소스 사용량, 컨테이너 에러 로그를 실시간으로 조회합니다.',
    whyUse: '로컬 DB 컨테이너가 죽었거나 백엔드 서버 컨테이너에서 에러가 발생했을 때 AI가 로그를 직접 읽고 원인을 진단합니다.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-docker',
    claudeCodeCommand: 'claude mcp add docker npx -y @modelcontextprotocol/server-docker',
    antigravityMcpJson: `{
  "docker": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-docker"]
  }
}`,
    aiWorkPrompts: [
      {
        title: '도커 컨테이너 실시간 로그 진단',
        prompt: '현재 실행 중인 PostgreSQL 컨테이너의 최근 50줄 로그를 확인해서 연결 실패(Connection refused) 에러 원인을 분석해줘.'
      }
    ],
    officialDocUrl: 'https://docs.docker.com/',
    githubUrl: 'https://github.com/modelcontextprotocol/servers'
  }
];
