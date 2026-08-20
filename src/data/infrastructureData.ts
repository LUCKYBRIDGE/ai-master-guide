export interface InfraDecisionSection {
  id: string;
  categoryTitle: string;
  categoryBadge: string;
  badgeColor: string;
  iconName: string;
  oneLineSummary: string;
  whenDoYouNeedIt: string[];
  whenYouDoNotNeedIt: string[];
  recommendedTechStack: {
    name: string;
    description: string;
    bestFor: string;
  }[];
  architectureChecklist: string[];
  copyableAgentPrompt: string;
}

export const INFRA_DECISION_DATA: InfraDecisionSection[] = [
  // 1. 보안 (Security & Auth)
  {
    id: 'infra-security',
    categoryTitle: '🔐 보안 및 사용자 인증 (Security & Authentication)',
    categoryBadge: '보안 · 인증 · 권한 분리',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    iconName: 'ShieldCheck',
    oneLineSummary: '로그인·개인정보·결제·역할별 권한이 있으면 위협 모델에 맞는 인증과 서버 측 권한 검사가 필요',
    whenDoYouNeedIt: [
      '사용자별 개인 데이터(주문 내역, 장바구니, 프로필)를 분리해서 저장해야 할 때',
      '결제, 금융, 의료, 민감한 개인정보를 취급할 때',
      '관리자(Admin) 전용 페이지와 일반 사용자 페이지의 접근 권한을 분리해야 할 때',
      '외부 공격(SQL Injection, XSS, CSRF, DDoS)으로부터 API 서버를 방어해야 할 때'
    ],
    whenYouDoNotNeedIt: [
      '로그인이 없는 정적 사이트는 사용자 인증 시스템이 필요하지 않을 수 있음',
      '로컬 전용 유틸리티는 백엔드 인증이 필요하지 않을 수 있지만 XSS, 의존성, 개인정보 최소 수집 같은 기본 웹 보안은 여전히 필요'
    ],
    recommendedTechStack: [
      {
        name: '서버 세션 또는 토큰 기반 인증',
        description: '둘 다 가능한 선택지입니다. 취소·회전·다중 기기·CSRF·XSS·운영 복잡성을 비교해 위협 모델에 맞게 선택합니다.',
        bestFor: '서비스 구조와 인증 제공자에 맞춰 결정'
      },
      {
        name: 'OAuth 2.0 / 소셜 로그인 (Google, Kakao)',
        description: '외부 신원 제공자의 표준 흐름을 사용합니다. OIDC 여부, redirect URI, state/nonce, 계정 연결 정책을 검토해야 합니다.',
        bestFor: '자체 비밀번호 운영을 줄이거나 외부 계정 로그인이 필요한 서비스'
      },
      {
        name: 'Argon2id 또는 적절한 비밀번호 해시',
        description: 'OWASP는 새 시스템에 Argon2id를 우선 권고하며, bcrypt는 Argon2/scrypt를 사용할 수 없는 레거시 환경의 선택지로 설명합니다.',
        bestFor: '자체 비밀번호를 저장하는 서비스'
      }
    ],
    architectureChecklist: [
      '실제 시크릿은 Git에 커밋하지 않고 배포 환경의 시크릿 저장소와 최소 권한을 사용',
      '비밀번호 해시 알고리즘과 비용은 현재 OWASP 지침·라이브러리·서버 성능을 함께 검토',
      '서버 측 객체·역할 권한 검사, 세션 만료·회전·로그아웃, CSRF/XSS 방어를 위협 모델에 포함',
      'Prepared Statement를 사용하고 입력 검증·rate limit·감사 로그·보안 헤더를 필요한 범위에 적용'
    ],
    copyableAgentPrompt: `[목표] 이 프로젝트의 인증 구조를 구현하기 전에 위협 모델과 현재 스택을 분석해줘.
[필수 조사]
1. 사용자 유형, 민감 데이터, 세션 취소·회전·다중 기기 요구사항과 서버 배포 구조를 확인
2. 서버 세션, OIDC/OAuth, 토큰 방식의 장단점을 비교하고 선택 근거 제시
3. 자체 비밀번호가 필요하면 최신 OWASP Password Storage 지침과 사용 라이브러리 문서를 확인
4. 객체 수준 권한 검사, CSRF/XSS, rate limit, 감사 로그, 시크릿 저장, 계정 복구·MFA 범위를 설계
[안전 조건] 임의의 만료 시간·해시 비용·쿠키 정책을 보편값처럼 정하지 말고 근거와 가정을 표시해줘. 구현 후에는 관련 자동 테스트와 실제 로그인/로그아웃/권한 거부 흐름을 검증해줘.`
  },

  // 2. 데이터베이스 (Database & Caching)
  {
    id: 'infra-database',
    categoryTitle: '🗄️ 데이터베이스 및 캐시 (Database & Caching)',
    categoryBadge: '영구 저장 · 관계형 · 실시간 캐시',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    iconName: 'Database',
    oneLineSummary: '영구 데이터, 여러 사용자 간 공유, 검색·정합성 요구가 있으면 요구사항에 맞는 저장소를 선택',
    whenDoYouNeedIt: [
      '사용자가 새로고침하거나 브라우저를 닫아도 글, 결제, 회원 정보가 유지되어야 할 때',
      '여러 사용자 간에 데이터(댓글, 좋아요, 실시간 채팅)가 서로 공유되어야 할 때',
      '전체 데이터를 한 번에 메모리에 올리기 어려워 페이지네이션·검색·인덱스가 필요할 때'
    ],
    whenYouDoNotNeedIt: [
      '계산기, 단위 변환기, 타이머처럼 일회성 계산만 수행하는 앱',
      '데이터가 브라우저를 끄면 사라져도 무방한 임시 미리보기 도구'
    ],
    recommendedTechStack: [
      {
        name: 'PostgreSQL + Prisma ORM (또는 Drizzle)',
        description: '관계, 제약 조건, 트랜잭션이 중요한 범용 관계형 DB와 TypeScript ORM 조합 예시',
        bestFor: '회원·주문처럼 관계와 정합성이 중요한 서비스'
      },
      {
        name: 'SQLite',
        description: '별도 서버 설치 없이 파일 하나로 동작하는 초경량 DB',
        bestFor: '초기 프로토타입, 로컬 테스트, 모바일 앱 내부 저장소'
      },
      {
        name: 'Redis',
        description: '인메모리 데이터 저장소입니다. 실제 처리량과 지연은 명령, 데이터 크기, 네트워크, 지속성, 하드웨어에 따라 달라 반드시 해당 워크로드로 측정해야 합니다.',
        bestFor: '캐시, rate limit, 단기 상태 등 명확한 만료·복구 정책이 있는 용도'
      }
    ],
    architectureChecklist: [
      '테이블 간 관계(1:N, N:M)를 명확히 정의하고 자주 검색하는 컬럼에 인덱스(Index) 생성',
      'DB 스키마 변경 시 직접 SQL을 날리지 말고 마이그레이션 도구(Prisma Migrate)로 버전 관리',
      '결제나 송금처럼 여러 테이블을 동시에 수정할 때는 트랜잭션(Transaction)으로 묶어 롤백 보장',
      'AI 도구의 DB 접근이 필요하면 공식·유지관리되는 서버인지 확인하고 읽기 전용 계정, 네트워크 제한, 감사 로그 적용'
    ],
    copyableAgentPrompt: `[목표] PostgreSQL 데이터베이스 연동을 위한 Prisma 스키마와 CRUD 레포지토리를 작성해줘.
[기술조건] PostgreSQL, Prisma ORM, TypeScript
[데이터 모델]
1. User: id(UUID), email(unique), passwordHash, name, role(USER/ADMIN), createdAt
2. Order: id(UUID), userId(User 외래키), totalAmount(Decimal), status(PENDING/PAID/CANCELLED), createdAt
3. OrderItem: id, orderId, productName, price, quantity
[요구사항]
1. prisma/schema.prisma에 모델 관계 및 인덱스 정의
2. 결제 완료 시 Order 상태를 PAID로 변경하고 재고를 차감하는 트랜잭션 함수 작성
[출력위치] prisma/schema.prisma, src/repositories/order.repository.ts에 저장하고 prisma validate를 통과시켜줘.`
  },

  // 3. 서버 및 네트워크 (Server, API & Real-time)
  {
    id: 'infra-server',
    categoryTitle: '🖥️ 백엔드 서버 및 실시간 통신 (Server & Real-Time)',
    categoryBadge: 'REST API · WebSocket · 백엔드',
    badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    iconName: 'Server',
    oneLineSummary: '비밀정보·서버 권한·외부 결제·실시간 공유 상태가 있으면 백엔드 또는 관리형 서버 기능이 필요',
    whenDoYouNeedIt: [
      '비즈니스 핵심 로직(정산 공식, 가격 할인 알고리즘)을 클라이언트에 노출하지 않고 숨겨야 할 때',
      '외부 결제 PG사, SMS 발송, 소셜 로그인 API와 서버 대 서버(Server-to-Server) 통신할 때',
      '주식 호가창, 실시간 채팅, 협업 도구처럼 서버가 여러 클라이언트에 변경을 전달해야 할 때'
    ],
    whenYouDoNotNeedIt: [
      'HTML/CSS/JS만으로 화면이 다 돌아가고 외부 DB나 API 통신이 전혀 없는 정적 웹앱'
    ],
    recommendedTechStack: [
      {
        name: 'Node.js / Express or Next.js API Routes',
        description: '프론트엔드와 동일한 TypeScript 언어로 풀스택 개발 가능',
        bestFor: '팀이 TypeScript 생태계와 해당 런타임 운영 경험을 가진 경우'
      },
      {
        name: 'FastAPI (Python)',
        description: 'Python 타입 힌트와 ASGI를 활용하는 API 프레임워크. 성능은 구현·서버·워크로드에 따라 달라집니다.',
        bestFor: 'AI/머신러닝 기능이 포함된 백엔드 서비스'
      },
      {
        name: 'WebSocket / Socket.IO',
        description: '서버와 클라이언트가 연결을 끊지 않고 실시간으로 데이터를 주고받는 양방향 통신',
        bestFor: '실시간 채팅, 주식/코인 호가창, 다자간 동시 편집'
      }
    ],
    architectureChecklist: [
      'RESTful API 엔드포인트 네이밍 규칙 준수 (GET /orders, POST /orders, DELETE /orders/:id)',
      '실제 HTTP 상태 코드는 유지하되 응답에는 일반화된 오류 코드·메시지만 보내고 스택·내부 경로·시크릿은 노출하지 않음',
      'WebSocket 통신 시 연결 끊김에 대비한 재연결(Reconnection) 및 하트비트(Ping-Pong) 로직 구현',
      '배포 환경(Vercel, AWS ECS, Docker)을 고려하여 포트 번호와 환경변수를 분리'
    ],
    copyableAgentPrompt: `[목표] 실시간 주식 호가 데이터를 브로드캐스팅하는 WebSocket 서버와 REST API 서버를 설계해줘.
[기술조건] Node.js, Express, ws(WebSocket 라이브러리), TypeScript
[요구사항]
1. GET /api/market/summary: 현재가, 전일대비 등락률, 거래량 반환
2. ws://.../ws/orderbook: 데이터 공급자의 실제 갱신 주기와 호출 제한에 맞춰 매수/매도 호가를 전송
3. 인증·구독 권한, backpressure, 연결 제한, heartbeat, 재연결, 서버 종료 시 정리 방식을 설계
[검증] 가짜 호가를 실제 시장 데이터로 표현하지 말고 테스트 fixture로 명시해줘. 프로젝트에 정의된 빌드·테스트 명령과 연결/해제 부하 테스트 결과를 보고해줘.`
  }
];
