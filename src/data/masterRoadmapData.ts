export interface DevRoadmapStage {
  stageNumber: number;
  stageName: string;
  stageSubtitle: string;
  iconName: string;
  badge: string;
  badgeColor: string;
  whatYouDo: string;
  whyThisStepIsCritical: string;
  primaryDeliverable: string;
  deliverableFileExample: string;
  practicalActionChecklist: string[];
  universalPromptTemplate: string;
}

export const DEV_ROADMAP_STAGES: DevRoadmapStage[] = [
  // 1단계: 기획 & 요구사항 정의
  {
    stageNumber: 1,
    stageName: '1. 기획 & 요구사항 정의 (개발 표준 수립)',
    stageSubtitle: '서비스 핵심 기능 명세와 프로젝트 코딩 규칙·환경 설정',
    iconName: 'Building2',
    badge: '기획 & 개발 규칙',
    badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    whatYouDo: '개발을 시작하기 전에 서비스의 핵심 기능 요구사항을 정의하고, 기술 스택, 코딩 컨벤션, 보안 정책을 프로젝트 설정 파일(CLAUDE.md, AGENTS.md 등)에 명시하여 개발 기준을 확립합니다.',
    whyThisStepIsCritical: '명확한 요구사항과 코딩 규칙이 사전에 정의되지 않으면, 개발 도중 타입이 오용되거나 사내 규칙과 맞지 않는 잘못된 구조의 코드가 작성되어 재작업 비용이 급증합니다.',
    primaryDeliverable: '요구사항 명세서 및 프로젝트 규칙 설정 파일 (CLAUDE.md / AGENTS.md)',
    deliverableFileExample: `./CLAUDE.md
# 프로젝트 개발 가이드라인
- 기술 스택: React 18, TypeScript (Strict 모드), Tailwind CSS, Vite
- 코딩 규칙: 함수형 컴포넌트 작성, any 타입 사용 금지, 세미콜론 필수
- 실행 명령어: npm run dev (개발), npm run build (빌드), npm test (테스트)`,
    practicalActionChecklist: [
      '사용자 스토리 및 핵심 기능 요구사항(기능 명세서) 정리',
      '기술 스택(React, TypeScript, Tailwind) 및 코딩 컨벤션 정의',
      '프로젝트 루트에 기본 가이드라인 파일(CLAUDE.md 또는 AGENTS.md) 생성'
    ],
    universalPromptTemplate: `[목표] 프로젝트 요구사항 명세서 및 기본 개발 규칙 가이드(CLAUDE.md)를 작성해줘.
[프로젝트] 인터랙티브 웹 애플리케이션
[기술 스택] React 18, TypeScript, Tailwind CSS, Vite
[포함 내용] 1) 핵심 기능 목록 2) TypeScript strict 규칙 3) 폴더 구조 컨벤션 4) 빌드 및 테스트 명령어.`
  },

  // 2단계: UI/UX 화면 설계 & 스타일 가이드
  {
    stageNumber: 2,
    stageName: '2. UI/UX 화면 설계 & 디자인 가이드 수립',
    stageSubtitle: '사용자 화면 와이어프레임 기획 및 공통 스타일 규격(DESIGN.md) 정의',
    iconName: 'Sparkles',
    badge: '화면 기획 & 스타일 가이드',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    whatYouDo: 'Figma, 디자인 도구, 화면 시안을 바탕으로 전체 화면 레이아웃과 와이어프레임을 구성하고, 브랜드 색상, 폰트 크기, 버튼 여백 등을 정리한 디자인 가이드(DESIGN.md)를 작성합니다.',
    whyThisStepIsCritical: '디자인 기준 없이 코딩을 시작하면 화면마다 색상, 버튼 크기, 여백이 제각각 달라져 UI 완성도가 크게 떨어지고 레이아웃 깨짐이 빈번하게 발생합니다.',
    primaryDeliverable: '화면 레이아웃 와이어프레임 & 디자인 가이드 규격서 (DESIGN.md)',
    deliverableFileExample: `./DESIGN.md
# 프로젝트 디자인 시스템 규격서
- Primary Color: #3182F6 (Toss Blue)
- Background: #0F172A (Slate 900)
- Surface / Card: #1E293B (Slate 800)
- Typography: Pretendard (Heading 20px Bold, Body 14px Regular)
- Spacing: 4px 그리드 스케일 (p-4 = 16px, p-6 = 24px)
- Radius: rounded-xl (12px), rounded-2xl (16px)`,
    practicalActionChecklist: [
      '주요 화면별 레이아웃 및 사용자 동선(와이어프레임) 설계',
      '색상 팔레트, 폰트, 여백 규격을 정리한 DESIGN.md 생성',
      '반응형 웹(모바일/태블릿/데스크톱) 뷰포트 기준 설정'
    ],
    universalPromptTemplate: `[목표] 화면 와이어프레임을 바탕으로 일관된 스타일 가이드(DESIGN.md)를 작성해줘.
[참고] 현대적이고 직관적인 다크모드 대시보드 테마
[포함 내용] 1) Primary/Background/Card 색상 코드 2) Pretendard 폰트 계층 3) 4px 그리드 기반 여백(Spacing) 및 둥근 모서리(Border Radius) 규격.`
  },

  // 3단계: 시스템 아키텍처 & 구현 계획
  {
    stageNumber: 3,
    stageName: '3. 시스템 아키텍처 설계 & 작업 계획 수립',
    stageSubtitle: '데이터 흐름 설계, 컴포넌트 구조화 및 파일 단위 작업 계획서 수립',
    iconName: 'FileCode',
    badge: '아키텍처 & 작업 계획서',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    whatYouDo: '본격적인 코딩에 앞서 전체 시스템 아키텍처, 상태 관리 구조, 생성/수정할 파일 목록과 검증 방법을 담은 상세 구현 계획서(implementation_plan.md)를 수립하고 검토합니다.',
    whyThisStepIsCritical: '사전 구조 설계 없이 개발에 들어가면 파일 간 순환 참조가 생기거나 상태 관리가 뒤엉켜 버그 발생 시 원인 추적이 매우 어려워집니다.',
    primaryDeliverable: '상세 아키텍처 다이어그램 & 구현 계획서 (implementation_plan.md)',
    deliverableFileExample: `# implementation_plan.md
## 1. 아키텍처 및 상태 관리
- 상태 관리: Zustand (전역 상태, 사용자 데이터)
- 라우팅: React Router (홈, 상세, 설정)
## 2. 생성 및 수정할 파일 목록
- [NEW] src/components/DataView.tsx
- [NEW] src/store/useAppStore.ts
- [NEW] src/types/data.ts
## 3. 품질 검증 계획
- TypeScript 컴파일 무결점 검증 (npm run build)
- 단위 테스트 100% 통과 (npm test)`,
    practicalActionChecklist: [
      '컴포넌트 계층도 및 데이터 흐름(단방향 데이터 플로우) 설계',
      '생성할 파일 목록과 인터페이스 명세를 implementation_plan.md에 작성',
      '작업 전 아키텍처 타당성 및 누락 요구사항 검토'
    ],
    universalPromptTemplate: `[목표] 신규 기능 개발을 위한 상세 구현 계획서(implementation_plan.md)를 작성해줘.
[참고자료] ./CLAUDE.md 및 ./DESIGN.md
[요구사항] 코드를 작성하기 전에 1) 아키텍처 다이어그램 2) 생성/수정할 파일 목록 3) 상태 관리 흐름 4) 빌드 및 검증 테스트 계획을 체계적으로 기술해줘.`
  },

  // 4단계: 프론트엔드 UI 컴포넌트 개발
  {
    stageNumber: 4,
    stageName: '4. 프론트엔드 UI 개발 & 컴포넌트 모듈화',
    stageSubtitle: '디자인 시스템 준수, 재사용 가능한 컴포넌트 개발 및 UI 상태 관리',
    iconName: 'LayoutGrid',
    badge: '프론트엔드 컴포넌트 개발',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    whatYouDo: 'DESIGN.md의 규격을 정확히 준수하여 React 컴포넌트를 개발하고, 단일 책임 원칙에 따라 재사용 가능한 하위 컴포넌트로 깔끔하게 모듈화합니다.',
    whyThisStepIsCritical: '컴포넌트 분리 없이 하나의 파일에 1,000줄 이상의 코드를 몰아넣으면 유지보수가 불가능해지고 중복 코드가 양산됩니다.',
    primaryDeliverable: '모듈화된 프론트엔드 컴포넌트 소스코드 (src/components/)',
    deliverableFileExample: `src/components/
├── Dashboard/
│   ├── KPIHeader.tsx      # 핵심 지표 카드
│   ├── SalesChart.tsx     # Recharts 매출 그래프
│   └── OrderTable.tsx     # 주문 내역 테이블
└── Common/
    ├── Button.tsx         # 공통 버튼 컴포넌트
    └── Modal.tsx          # 팝업 모달`,
    practicalActionChecklist: [
      './DESIGN.md 규격을 준수하여 일관된 색상 및 여백 적용',
      '대형 컴포넌트를 200줄 이내의 재사용 가능한 단위로 분리',
      'TypeScript Props 인터페이스를 명시적으로 선언'
    ],
    universalPromptTemplate: `[목표] ./DESIGN.md 규격을 준수하여 프론트엔드 UI 컴포넌트를 구현해줘.
[참고자료] ./DESIGN.md
[기술 조건] React 18, TypeScript, Tailwind CSS, Lucide 아이콘
[요구사항] 단일 컴포넌트에 몰아넣지 말고, 기능별로 모듈을 분리하여 src/components/ 아래에 저장해줘.`
  },

  // 5단계: 백엔드 API & 데이터베이스 연동
  {
    stageNumber: 5,
    stageName: '5. 백엔드 API 개발 & 데이터베이스(DB) 연동',
    stageSubtitle: '클라이언트-서버 통신 연동, 비즈니스 로직 처리 및 DB 데이터 영속화',
    iconName: 'Layers',
    badge: '클라이언트-서버 API 연동',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    whatYouDo: '프론트엔드와 백엔드 서버(REST API, WebSocket)를 연동하고, 데이터베이스(PostgreSQL, Redis 등) 트랜잭션과 비즈니스 로직을 연결하여 실제 데이터가 안정적으로 오가도록 구현합니다.',
    whyThisStepIsCritical: 'UI와 백엔드가 분리되어 있으면 데이터 필드명 불일치나 비동기 통신 에러로 런타임 오류가 발생하기 쉽습니다.',
    primaryDeliverable: '실제 데이터가 흐르는 API 클라이언트 및 상태 스토어 (src/services/, src/store/)',
    deliverableFileExample: `// src/services/apiClient.ts
export const fetchItems = async (category: string): Promise<Item[]> => {
  const response = await fetch(\`/api/items?category=\${category}\`);
  if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.');
  return response.json();
};

// src/store/useAppStore.ts
export const useAppStore = create<AppState>((set) => ({
  items: [],
  loadItems: async (cat) => {
    const data = await fetchItems(cat);
    set({ items: data });
  }
}));`,
    practicalActionChecklist: [
      '공용 데이터 전송 객체(DTO) 및 API 인터페이스(src/types/api.ts) 정의',
      '비동기 통신 에러(네트워크 오류, 로딩, 재시도) 예외 처리',
      '상태 관리 스토어와 실제 백엔드 API 엔드포인트 연동'
    ],
    universalPromptTemplate: `[목표] 프론트엔드 UI와 백엔드 REST API를 연동하는 API 클라이언트 및 Zustand 스토어를 작성해줘.
[참고자료] src/types/api.ts
[요구사항] 목업 데이터를 실제 API 통신으로 교체하고, 로딩 상태(Loading) 및 에러(Error) 발생 시 사용자 안내 팝업이 뜨도록 예외 처리를 구현해줘.`
  },

  // 6단계: 품질 검증 & 배포
  {
    stageNumber: 6,
    stageName: '6. 품질 검증(테스트·QA) & 빌드 · 클라우드 배포',
    stageSubtitle: '코드 린트, 단위·통합 테스트 무결점 검증, 최적화 빌드 및 배포(CI/CD)',
    iconName: 'ShieldCheck',
    badge: '품질 검증 & 프로덕션 배포',
    badgeColor: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    whatYouDo: 'TypeScript 타입 검사, 린트 검사, 단위 및 통합 테스트(npm test)를 자동 실행하여 버그를 완벽히 해결하고, 프로덕션 최적화 빌드(npm run build) 후 Vercel, AWS, Cloudflare 등에 배포합니다.',
    whyThisStepIsCritical: '테스트와 빌드 검증을 거치지 않고 배포하면 사용자 환경에서 치명적인 런타임 에러나 결제 오류가 발생하여 서비스 신뢰도가 실추됩니다.',
    primaryDeliverable: '0 에러 빌드 검증 보고서 & 프로덕션 배포 완료 URL',
    deliverableFileExample: `$ npm test
✓ tests/logic.test.ts (8 tests passed)
✓ tests/api.test.ts (5 tests passed)

$ npm run build
✓ 1609 modules transformed.
dist/index.html                   1.10 kB
dist/assets/index-Dk9.js        430.82 kB
✓ built in 2.78s (0 errors)`,
    practicalActionChecklist: [
      'npm run build를 실행하여 TypeScript 컴파일 에러 0건 확인',
      '핵심 비즈니스 로직 단위 테스트(npm test) 통과 확인',
      'Git 커밋 및 GitHub Actions CI/CD 파이프라인 배포'
    ],
    universalPromptTemplate: `[목표] 프로젝트 전체 빌드(npm run build) 및 단위 테스트(npm test)를 실행하여 무결성을 검증해줘.
[요구사항] 1) TypeScript 타입 에러나 린트 경고가 있다면 즉시 수정해줘 2) 모든 테스트가 100% 통과하는 것을 확인한 후 배포 가능한 상태로 완료해줘.`
  }
];
