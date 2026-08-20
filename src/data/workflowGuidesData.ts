/**
 * @deprecated Unpublished legacy workflow guide containing unverified product names and
 * capabilities. This file is not rendered by the current app. Recheck all commands,
 * versions, permissions, and automation claims before future publication.
 */
import { WorkflowGuide } from '../types/ai';

export const WORKFLOW_GUIDES_DATA: WorkflowGuide[] = [
  {
    id: 'workflow-claude-code',
    toolId: 'claude-code',
    title: 'Claude Code 터미널 에이전트 마스터 가이드 (Claude 5 탑재)',
    subtitle: '설치부터 CLAUDE.md 규칙 설정, 자율 버그 수정 및 Git 커밋 자동화까지',
    company: 'anthropic',
    icon: 'Terminal',
    verifiedDate: '2026.08',
    summary: '터미널에서 직접 실행되는 Anthropic의 차세대 코딩 에이전트 도구로, 최신 Claude 5(Opus 5 / Sonnet 5) 엔진을 탑재하여 로컬 레포지토리의 파일 검색, 인라인 수정, 린트/테스트 자가 검증, Git 커밋까지 자연어로 완벽 제어합니다.',
    prerequisites: [
      'Node.js v18 이상 환경',
      'Anthropic API Key 또는 Claude Pro/Team 계정',
      'Git이 설치된 터미널 환경 (macOS, Linux, Windows PowerShell/WSL)'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Claude Code 전역 설치 및 인증',
        content: 'npm을 통해 전역(Global) 패키지로 설치한 후 터미널에서 인증을 진행합니다.',
        commandSnippet: 'npm install -g @anthropic-ai/claude-code\nclaude'
      },
      {
        stepNumber: 2,
        title: '프로젝트 맞춤 메모리(/init) 자동 생성',
        content: '프로젝트 루트 디렉토리에서 `/init` 명령어를 실행하면, Claude Code가 기존 package.json, 프레임워크 등을 분석하여 프로젝트 전용 `CLAUDE.md` 가이드 파일을 자동 생성합니다.',
        commandSnippet: '# 프로젝트 디렉토리에서\n$ claude\n> /init'
      },
      {
        stepNumber: 3,
        title: '자연어 기반 자율 기능 개발 및 테스트 루프',
        content: '기능 추가를 요청할 때 빌드/테스트 명령어 실행을 함께 지시하면, 오류 발생 시 스스로 터미널 로그를 읽고 통과할 때까지 자가 수정을 반복합니다.',
        commandSnippet: '> "src/components/UserList.tsx에 검색 필터 기능을 추가하고, npm test를 실행해서 에러가 없도록 만들어줘."'
      },
      {
        stepNumber: 4,
        title: '세션 관리 및 컨텍스트 압축(/compact)',
        content: '긴 개발 세션으로 컨텍스트가 쌓였을 때는 `/compact`를 입력하여 이전 대화의 핵심 요약본만 유지하고 토큰 비용을 대폭 절감합니다.',
        commandSnippet: '> /compact'
      }
    ],
    copyableConfig: {
      fileName: 'CLAUDE.md',
      description: '프로젝트 루트에 배치하여 Claude Code의 행동 양식과 개발 표준을 고정하는 설정 파일',
      content: `# CLAUDE.md - Project Development Guidelines

## Commands
- Build: \`npm run build\`
- Dev Server: \`npm run dev\`
- Tests: \`npm test\`
- Lint: \`npm run lint\`

## Code Style & Architecture
- Prefer TypeScript strict typing (no \`any\`).
- React 18 functional components with Tailwind CSS.
- Keep helper functions pure in \`src/utils/\`.

## Agent Guardrails
- Always run \`npm run build\` before confirming task completion.
- Provide descriptive semantic commit messages.`
    },
    officialDocUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview'
  },

  {
    id: 'workflow-google-antigravity',
    toolId: 'google-antigravity',
    title: 'Google Antigravity 2.0 (AGY) 에이전트 아키텍처 가이드',
    subtitle: '계획 모드(Planning Mode), 다중 서브에이전트 병렬 협업, 커스텀 스킬 연동',
    company: 'google',
    icon: 'Cpu',
    verifiedDate: '2026.08',
    summary: 'DeepMind의 자율형 에이전트 플랫폼으로, 사전 계획(implementation_plan.md) 수립, 사용자 승인, 서브에이전트 병렬 위임, 반응형 백그라운드 태스크 감지 및 검증(walkthrough.md)을 제공합니다.',
    prerequisites: [
      'Google Antigravity 환경 (IDE 내장 또는 CLI)',
      '프로젝트 작업 디렉토리 권한'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Planning Mode를 통한 아키텍처 설계',
        content: '복잡한 기능 요청 시 에이전트가 코드를 무작정 수정하지 않고, `implementation_plan.md` 아티팩트를 먼저 작성하여 사용자에게 승인을 요청합니다.',
        codeSnippet: '# implementation_plan.md 구조 예시\n- User Review Required (핵심 설계 결정)\n- Proposed Changes (수정/신규 파일 목록)\n- Verification Plan (자동화 테스트 및 수동 검증)'
      },
      {
        stepNumber: 2,
        title: '다중 서브에이전트(Subagents) 병렬 분업',
        content: '자료 조사(Research Agent), 코드 작성(Coder), 테스트 검증(Tester)을 동시에 백그라운드로 실행하여 협업합니다.',
        codeSnippet: '// invoke_subagent를 통한 병렬 위임\ninvoke_subagent({\n  TypeName: "research",\n  Role: "Docs Researcher",\n  Prompt: "Search latest API spec"\n})'
      },
      {
        stepNumber: 3,
        title: '커스텀 스킬(Skills) 및 MCP 도구 확장',
        content: '`SKILL.md`를 통해 데이터베이스 쿼리, 바이오인포매틱스, 클라우드 배포 등 도메인 특화 도구를 에이전트에 자유롭게 장착합니다.',
        codeSnippet: '<!-- SKILL.md -->\n---\nname: custom-db-query\ndescription: Query internal PostgreSQL database\n---\n# Instructions for querying DB...'
      },
      {
        stepNumber: 4,
        title: '자가 검증 및 Walkthrough 보고서 작성',
        content: '모든 빌드와 테스트가 완료된 후 변경 내역과 검증 결과를 `walkthrough.md`로 정리하여 투명하게 공유합니다.'
      }
    ],
    copyableConfig: {
      fileName: '.gemini/rules',
      description: 'Antigravity 에이전트가 항상 준수해야 할 프로젝트 헌장 파일',
      content: `# Antigravity Agent Guidelines

1. **Planning First**: For non-trivial changes, always prepare an implementation_plan.md before modifying files.
2. **Preserve Integrity**: Do not delete existing comments or refactor unrelated modules.
3. **Automated Verification**: Run TypeScript check and unit tests after editing.
4. **Walkthrough Document**: Document all validated changes in walkthrough.md upon completion.`
    },
    officialDocUrl: 'https://deepmind.google/technologies/gemini/'
  },

  {
    id: 'workflow-openai-canvas',
    toolId: 'openai-canvas-work',
    title: 'OpenAI Canvas & Code Interpreter (GPT-5 엔진) 워크플로우',
    subtitle: 'Side-by-side 인라인 코드 교정, 슬라이더 기반 리팩토링, 실시간 차트 생성',
    company: 'openai',
    icon: 'Layout',
    verifiedDate: '2026.08',
    summary: '대화창과 별도의 전용 Canvas 공간에서 코드를 실시간으로 공동 편집하고, Python 샌드박스를 통해 즉시 데이터 시각화 차트를 뽑아내는 최적의 협업 흐름입니다.',
    prerequisites: [
      'ChatGPT Plus 또는 Team/Enterprise 계정',
      '웹 브라우저 인터페이스'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Canvas 활성화 및 초기 코드 로드',
        content: '채팅창에 "이 코드를 Canvas에서 열어줘"라고 지시하거나, 긴 코드/문서 붙여넣기 시 자동으로 우측에 인터랙티브 작업창이 분할 렌더링됩니다.'
      },
      {
        stepNumber: 2,
        title: '핀포인트 드래그 & 국소 수정',
        content: '전체 코드를 다시 생성할 필요 없이, 수정이 필요한 특정 함수나 블록만 마우스로 드래그한 뒤 나타나는 전용 입력창에 프롬프트를 작성합니다.',
        codeSnippet: '// 드래그 후 지시:\n"이 함수에 try-catch 에러 핸들링을 추가하고 커스텀 에러 토스트를 띄워줘"'
      },
      {
        stepNumber: 3,
        title: '우측 하단 원클릭 도구 활용',
        content: '[코드 리뷰], [로그 추가], [버그 수정], [언어 변환(Python/JS/TS)] 버튼을 클릭하여 즉각적인 리팩토링 제안을 확인하고 수락(Accept)합니다.'
      },
      {
        stepNumber: 4,
        title: 'Advanced Data Analysis(파이썬 인터프리터) 연동',
        content: 'CSV/Excel 파일을 업로드하여 캔버스에서 파이썬 코드를 실행하고, 고화질 그래프 이미지 및 처리된 가공 데이터 파일을 즉시 다운로드합니다.'
      }
    ],
    officialDocUrl: 'https://openai.com/index/introducing-canvas/'
  },

  {
    id: 'workflow-grok-build',
    toolId: 'grok-build',
    title: 'Grok 4.6 & Grok Build 실시간 프로토타이핑 가이드',
    subtitle: '실시간 X 데이터 피드 분석, 와이어프레임-코드 변환, Three.js 3D 시각화',
    company: 'xai',
    icon: 'Zap',
    verifiedDate: '2026.08',
    summary: 'SpaceXAI의 Colossus 2 초고속 연산 인프라와 실시간 X(트위터) 데이터 피드를 활용하여 최신 트렌드를 팩트체크하고, 스케치 이미지를 완벽한 웹앱으로 즉각 빌드하는 워크플로우입니다.',
    prerequisites: [
      'X 계정 (Premium / Premium+ 권장) 또는 xAI Console 계정'
    ],
    steps: [
      {
        stepNumber: 1,
        title: '실시간 X DeepSearch로 최신 API/트렌드 조사',
        content: 'Grok 4.6에서 [DeepSearch]를 켜고, 오늘 발표된 신규 라이브러리나 최신 트렌드 문서를 실시간 피드에서 교차 검증합니다.'
      },
      {
        stepNumber: 2,
        title: 'Vision-to-Code: 스케치/와이어프레임 업로드',
        content: '화면 기획서 캡처본이나 손그림 스케치를 업로드하고 "React + Tailwind CSS 기반의 반응형 대시보드로 만들어줘"라고 요청합니다.'
      },
      {
        stepNumber: 3,
        title: 'Grok 4.6으로 복잡한 알고리즘 & 3D 연산 보강',
        content: 'Three.js 파티클 효과나 고성능 물리 시뮬레이션, 수학적 최적화 로직이 필요할 때 Grok 4.6을 가동하여 고난도 코드를 작성합니다.'
      },
      {
        stepNumber: 4,
        title: 'xAI API 연동 및 라이브 배포',
        content: '생성된 코드를 xAI API 엔드포인트와 연결하여 실시간 스트리밍 대시보드를 완성합니다.'
      }
    ],
    officialDocUrl: 'https://docs.x.ai/'
  }
];
