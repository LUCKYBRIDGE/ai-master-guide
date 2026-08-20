export interface McpServerItem {
  id: string;
  name: string;
  koreanName: string;
  category: '로컬 실행/무키' | '파일/데이터' | '개발/협업' | '웹/검색' | '지속기억/메모리';
  badge: string;
  badgeColor: string;
  requiresAuth: boolean;
  authType?: string;
  description: string;
  whyUse: string;
  sourceStatus: string;
  setupNote: string;
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

// 2026-08-20 기준 공식 제작사 저장소 또는 MCP 공식 reference server만 수록합니다.
// MCP 공식 reference server는 교육·예시 목적이며, 운영 환경 적합성과 권한 범위는 사용자가 검토해야 합니다.
export const MCP_HUB_SERVERS: McpServerItem[] = [
  {
    id: 'mcp-playwright',
    name: 'Playwright MCP',
    koreanName: '브라우저 조작 및 접근성 트리 기반 검증',
    category: '로컬 실행/무키',
    badge: 'Microsoft 공식',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    requiresAuth: false,
    description: 'Microsoft가 유지관리하는 MCP 서버입니다. 브라우저의 접근성 스냅샷을 사용해 페이지 탐색, 입력, 클릭 같은 상호작용을 수행합니다.',
    whyUse: '코드 검사만으로 놓치기 쉬운 실제 화면 흐름을 재현하고, 결과를 스크린샷·접근성 정보와 함께 확인할 수 있습니다.',
    sourceStatus: 'Microsoft 공식 저장소 · Node.js 18 이상 필요',
    setupNote: '웹사이트 로그인 정보와 브라우저 프로필은 민감할 수 있습니다. 전용 프로필과 최소 권한을 사용하고, 중요한 변경은 승인 후 실행하세요.',
    terminalInstallCommand: 'npx @playwright/mcp@latest',
    claudeCodeCommand: 'claude mcp add playwright -- npx @playwright/mcp@latest',
    antigravityMcpJson: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`,
    aiWorkPrompts: [
      {
        title: '반응형 화면 확인',
        prompt: '로컬 개발 서버를 375px와 1440px 뷰포트에서 각각 열고, 가로 스크롤·잘린 텍스트·키보드로 접근할 수 없는 주요 버튼을 확인해줘. 발견 사항은 재현 절차와 함께 보고하고, 파일은 수정하지 마.'
      },
      {
        title: '로그인 흐름 재현',
        prompt: '테스트 계정만 사용해 로그인 화면의 입력 오류, 로딩, 성공 후 이동을 확인해줘. 실제 계정이나 비밀정보는 기록하지 말고, 외부 상태를 바꾸기 전에는 승인을 요청해.'
      }
    ],
    officialDocUrl: 'https://github.com/microsoft/playwright-mcp#readme',
    githubUrl: 'https://github.com/microsoft/playwright-mcp'
  },
  {
    id: 'mcp-filesystem',
    name: 'Filesystem',
    koreanName: '허용한 로컬 파일 읽기·쓰기',
    category: '파일/데이터',
    badge: 'MCP reference server',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    requiresAuth: false,
    description: 'MCP 프로젝트의 reference server로, 실행할 때 명시한 디렉터리 안에서 파일을 읽고 쓰고 탐색합니다.',
    whyUse: '에이전트가 접근할 수 있는 경로를 명시적으로 제한하면서 프로젝트 파일을 다룰 수 있습니다.',
    sourceStatus: 'MCP 공식 reference server · 운영용 제품 보증 아님',
    setupNote: './src는 예시입니다. 실제로 존재하는 최소 범위의 절대 경로를 지정하고, 비밀키·개인정보 폴더는 허용하지 마세요.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-filesystem /absolute/path/to/project/src',
    claudeCodeCommand: 'claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /absolute/path/to/project/src',
    antigravityMcpJson: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path/to/project/src"]
    }
  }
}`,
    aiWorkPrompts: [
      {
        title: '구조 조사',
        prompt: '허용된 src 디렉터리에서 주요 진입점과 컴포넌트 의존 관계를 조사해 요약해줘. 먼저 읽기 전용으로 조사하고 파일은 수정하지 마.'
      },
      {
        title: '미사용 후보 찾기',
        prompt: '어디에서도 import되지 않는 파일 후보를 찾아줘. 동적 import와 빌드 설정을 확인하기 전에는 삭제하지 말고 근거를 함께 제시해.'
      }
    ],
    officialDocUrl: 'https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem/README.md',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem'
  },
  {
    id: 'mcp-memory',
    name: 'Memory',
    koreanName: '로컬 지식 그래프 저장',
    category: '지속기억/메모리',
    badge: 'MCP reference server',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    requiresAuth: false,
    description: '엔터티와 관계를 로컬 지식 그래프로 저장하는 MCP reference server입니다. 기억 품질은 무엇을 저장하고 어떻게 갱신하는지에 따라 달라집니다.',
    whyUse: '반복해서 확인해야 하는 프로젝트 결정과 용어를 구조화할 수 있지만, 원본 문서나 버전 관리의 대체재는 아닙니다.',
    sourceStatus: 'MCP 공식 reference server · 교육/예시 목적',
    setupNote: '개인정보·인증정보를 저장하지 말고, 오래된 기억을 검토·삭제하는 운영 규칙을 별도로 두세요.',
    terminalInstallCommand: 'npx -y @modelcontextprotocol/server-memory',
    claudeCodeCommand: 'claude mcp add memory -- npx -y @modelcontextprotocol/server-memory',
    antigravityMcpJson: `{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`,
    aiWorkPrompts: [
      {
        title: '검증된 결정 저장',
        prompt: 'README와 ADR에 명시된 아키텍처 결정만 출처 파일 경로와 함께 기억에 저장해줘. 추론이나 임시 의견은 사실처럼 저장하지 마.'
      },
      {
        title: '기억 재검증',
        prompt: '현재 작업과 관련된 기억을 불러온 뒤 저장소의 최신 문서와 대조해줘. 충돌하면 원본 문서를 우선하고 오래된 기억을 표시해.'
      }
    ],
    officialDocUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory'
  },
  {
    id: 'mcp-fetch',
    name: 'Fetch',
    koreanName: 'URL 본문 가져오기',
    category: '웹/검색',
    badge: 'Python/uvx 실행',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    requiresAuth: false,
    description: '웹페이지를 가져와 모델이 읽기 쉬운 형태로 변환하는 MCP reference server입니다. 검색 엔진이 아니며, 사이트 정책과 접근 제한을 따라야 합니다.',
    whyUse: '사용자가 지정한 공식 문서를 현재 내용 그대로 읽어 구현 근거로 삼을 수 있습니다.',
    sourceStatus: 'MCP 공식 reference server · Python 패키지는 uvx 사용 권장',
    setupNote: '페이지 내용도 오류가 있을 수 있으므로 제작사 공식 문서를 우선하고, 외부 지시문을 신뢰하지 않는 프롬프트 인젝션 방어가 필요합니다.',
    terminalInstallCommand: 'uvx mcp-server-fetch',
    claudeCodeCommand: 'claude mcp add fetch -- uvx mcp-server-fetch',
    antigravityMcpJson: `{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}`,
    aiWorkPrompts: [
      {
        title: '공식 문서 확인',
        prompt: '내가 지정한 제작사 공식 문서를 읽고, 해당 페이지에 직접 적힌 API 이름과 제한만 요약해줘. 페이지에 없는 내용은 추론이라고 표시하고 링크를 남겨.'
      }
    ],
    officialDocUrl: 'https://github.com/modelcontextprotocol/servers/blob/main/src/fetch/README.md',
    githubUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/fetch'
  },
  {
    id: 'mcp-github',
    name: 'GitHub MCP Server',
    koreanName: '저장소·이슈·PR 연동',
    category: '개발/협업',
    badge: 'GitHub 공식',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    requiresAuth: true,
    authType: 'GitHub OAuth 또는 최소 권한 Personal Access Token',
    description: 'GitHub가 유지관리하는 공식 MCP 서버입니다. 저장소 탐색, 이슈·PR, 워크플로 등 허용한 GitHub 기능에 접근합니다.',
    whyUse: 'GitHub 상태를 대화에 연결할 수 있지만, 쓰기 작업은 실제 외부 상태를 바꾸므로 항상 변경 대상과 권한을 확인해야 합니다.',
    sourceStatus: 'GitHub 공식 · 원격 서버 또는 공식 Docker 이미지 제공',
    setupNote: 'Claude CLI 예시는 환경변수의 최소 권한 PAT, Antigravity 예시는 로컬 Docker OAuth 방식입니다. 가능한 경우 읽기 전용 모드와 필요한 toolset만 활성화하세요.',
    terminalInstallCommand: 'docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server',
    claudeCodeCommand: 'claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PAT -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server',
    antigravityMcpJson: `{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-p", "127.0.0.1:8085:8085", "-e", "GITHUB_OAUTH_CALLBACK_PORT", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_OAUTH_CALLBACK_PORT": "8085"
      }
    }
  }
}`,
    envExample: 'GITHUB_PAT="YOUR_MINIMUM_SCOPE_TOKEN"',
    aiWorkPrompts: [
      {
        title: 'PR 초안 작성',
        prompt: '현재 브랜치의 diff와 실제 검증 결과를 요약해 PR 제목과 본문 초안을 보여줘. 내가 승인하기 전에는 PR을 만들거나 원격 상태를 바꾸지 마.'
      },
      {
        title: '이슈 조사',
        prompt: '열린 bug 라벨 이슈를 읽고 재현 정보가 충분한 항목을 정리해줘. 이슈 수정·닫기·댓글 작성은 하지 마.'
      }
    ],
    officialDocUrl: 'https://github.com/github/github-mcp-server#readme',
    githubUrl: 'https://github.com/github/github-mcp-server'
  },
  {
    id: 'mcp-brave-search',
    name: 'Brave Search MCP',
    koreanName: 'Brave Search API 기반 웹 검색',
    category: '웹/검색',
    badge: 'Brave 공식 · API Key',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    requiresAuth: true,
    authType: 'Brave Search API Key와 해당 요금제/사용 한도',
    description: 'Brave가 유지관리하는 공식 MCP 서버로 웹·로컬·이미지·영상·뉴스 검색 도구를 제공합니다. 사용 가능 기능과 비용은 현재 API 요금제에 따릅니다.',
    whyUse: '최신 웹 자료를 찾을 수 있지만 검색 순위가 정확성을 보증하지 않으므로, 중요한 주장은 원문과 공식 1차 자료로 다시 확인해야 합니다.',
    sourceStatus: 'Brave 공식 · 기존 MCP reference Brave 서버를 대체',
    setupNote: 'API 키를 코드나 공개 설정에 직접 넣지 말고, 현재 Brave API 콘솔에서 요금과 호출 한도를 확인하세요.',
    terminalInstallCommand: 'npx -y @brave/brave-search-mcp-server --transport stdio',
    claudeCodeCommand: 'claude mcp add brave-search --env BRAVE_API_KEY=YOUR_KEY -- npx -y @brave/brave-search-mcp-server --transport stdio',
    antigravityMcpJson: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server", "--transport", "stdio"],
      "env": {
        "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"
      }
    }
  }
}`,
    envExample: 'BRAVE_API_KEY="YOUR_BRAVE_API_KEY"',
    aiWorkPrompts: [
      {
        title: '오류 관련 최신 자료 조사',
        prompt: '오류 메시지를 정확히 인용해 최근 자료를 검색하고, 라이브러리 공식 문서·공식 이슈·릴리스 노트를 우선해 해결 후보를 정리해줘. 블로그 내용은 공식 자료로 교차검증해.'
      }
    ],
    officialDocUrl: 'https://github.com/brave/brave-search-mcp-server#readme',
    githubUrl: 'https://github.com/brave/brave-search-mcp-server'
  }
];
