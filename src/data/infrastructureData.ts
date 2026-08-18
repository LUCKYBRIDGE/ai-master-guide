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
    oneLineSummary: '사용자 로그인, 개인정보 보호, 결제, 권한 제어(Admin/User)가 필요한 경우 필수 구축',
    whenDoYouNeedIt: [
      '사용자별 개인 데이터(주문 내역, 장바구니, 프로필)를 분리해서 저장해야 할 때',
      '결제, 금융, 의료, 민감한 개인정보를 취급할 때',
      '관리자(Admin) 전용 페이지와 일반 사용자 페이지의 접근 권한을 분리해야 할 때',
      '외부 공격(SQL Injection, XSS, CSRF, DDoS)으로부터 API 서버를 방어해야 할 때'
    ],
    whenYouDoNotNeedIt: [
      '단순 정보 제공용 정적 블로그나 포트폴리오 사이트 (로그인 불필요)',
      '데이터가 사용자 기기 로컬(localStorage/IndexedDB)에만 저장되는 개인용 유틸리티 앱'
    ],
    recommendedTechStack: [
      {
        name: 'JWT (JSON Web Token) + Refresh Token 쿠키',
        description: '가장 널리 쓰이는 무상태(Stateless) 인증. Access Token은 메모리에, Refresh Token은 httpOnly Secure 쿠키에 저장',
        bestFor: '대부분의 모던 웹/앱 백엔드'
      },
      {
        name: 'OAuth 2.0 / 소셜 로그인 (Google, Kakao)',
        description: '사용자가 비밀번호를 입력하지 않고 소셜 계정으로 3초 만에 가입/로그인',
        bestFor: '가입 장벽을 낮춰야 하는 B2C 서비스'
      },
      {
        name: 'bcrypt / argon2',
        description: '비밀번호를 단방향 암호화하여 DB가 해킹당해도 원본 비밀번호를 알 수 없게 방어',
        bestFor: '자체 이메일/비밀번호 회원가입 서비스 필수'
      }
    ],
    architectureChecklist: [
      '환경변수(`.env`)와 API Secret Key를 절대 Git 소스코드에 올리지 않고 `.gitignore` 처리',
      '비밀번호는 반드시 bcrypt로 솔트(Salt)를 쳐서 단방향 해싱 후 저장',
      'CORS(Cross-Origin Resource Sharing) 설정 시 허용할 도메인만 화이트리스트로 제한',
      'SQL 쿼리 작성 시 직접 문자열을 결합하지 않고 Prepared Statement(ORM/Prisma) 사용'
    ],
    copyableAgentPrompt: `[목표] 프로젝트에 안전한 JWT 사용자 인증 및 보안 미들웨어를 구축해줘.
[기술조건] Node.js/Express, TypeScript, bcrypt, jsonwebtoken, helmet 사용
[구체적 요구사항]
1. POST /api/auth/register: 이메일 중복 체크, bcrypt(솔트 10) 비밀번호 암호화 후 DB 저장
2. POST /api/auth/login: 비밀번호 검증 후 15분 만료 Access Token과 httpOnly 7일 만료 Refresh Token 발급
3. authenticateToken 미들웨어: Authorization 헤더의 Bearer 토큰을 검증하여 req.user에 사용자 정보 주입
4. helmet 및 CORS 화이트리스트 보안 미들웨어를 app.ts에 적용해줘.
[출력위치] src/middleware/auth.ts, src/routes/auth.routes.ts에 저장하고 빌드 에러를 점검해줘.`
  },

  // 2. 데이터베이스 (Database & Caching)
  {
    id: 'infra-database',
    categoryTitle: '🗄️ 데이터베이스 및 캐시 (Database & Caching)',
    categoryBadge: '영구 저장 · 관계형 · 실시간 캐시',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    iconName: 'Database',
    oneLineSummary: '서버가 꺼져도 데이터가 영구적으로 보존되어야 하고, 대량 검색/정렬이 필요한 경우 필수 구축',
    whenDoYouNeedIt: [
      '사용자가 새로고침하거나 브라우저를 닫아도 글, 결제, 회원 정보가 유지되어야 할 때',
      '여러 사용자 간에 데이터(댓글, 좋아요, 실시간 채팅)가 서로 공유되어야 할 때',
      '1만 건 이상의 대량 데이터를 페이징(Pagination)하고 정렬/검색해야 할 때'
    ],
    whenYouDoNotNeedIt: [
      '계산기, 단위 변환기, 타이머처럼 일회성 계산만 수행하는 앱',
      '데이터가 브라우저를 끄면 사라져도 무방한 임시 미리보기 도구'
    ],
    recommendedTechStack: [
      {
        name: 'PostgreSQL + Prisma ORM (또는 Drizzle)',
        description: '전 세계 표준 관계형 DB. 데이터 무결성, 외래키(Foreign Key), 트랜잭션 보장',
        bestFor: '회원, 주문, 결제 등 정합성이 중요한 서비스 (가장 추천)'
      },
      {
        name: 'SQLite',
        description: '별도 서버 설치 없이 파일 하나로 동작하는 초경량 DB',
        bestFor: '초기 프로토타입, 로컬 테스트, 모바일 앱 내부 저장소'
      },
      {
        name: 'Redis',
        description: '메모리(RAM)에 데이터를 올려 초당 수만 건의 요청을 1ms 만에 처리하는 캐시',
        bestFor: '실시간 세션 저장, 조회수 카운팅, API 레이트 리미트'
      }
    ],
    architectureChecklist: [
      '테이블 간 관계(1:N, N:M)를 명확히 정의하고 자주 검색하는 컬럼에 인덱스(Index) 생성',
      'DB 스키마 변경 시 직접 SQL을 날리지 말고 마이그레이션 도구(Prisma Migrate)로 버전 관리',
      '결제나 송금처럼 여러 테이블을 동시에 수정할 때는 트랜잭션(Transaction)으로 묶어 롤백 보장',
      'AI 에이전트 연동 시 Postgres MCP 서버를 연결하여 테이블 스키마를 직접 조회하게 설정'
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
    oneLineSummary: '비즈니스 로직 연산, 외부 결제사 API 연동, 실시간 양방향 통신(채팅, 호가창)이 필요한 경우 필수 구축',
    whenDoYouNeedIt: [
      '비즈니스 핵심 로직(정산 공식, 가격 할인 알고리즘)을 클라이언트에 노출하지 않고 숨겨야 할 때',
      '외부 결제 PG사, SMS 발송, 소셜 로그인 API와 서버 대 서버(Server-to-Server) 통신할 때',
      '주식 호가창, 실시간 채팅, 협업 도구처럼 초당 수십 번 화면이 실시간 갱신되어야 할 때'
    ],
    whenYouDoNotNeedIt: [
      'HTML/CSS/JS만으로 화면이 다 돌아가고 외부 DB나 API 통신이 전혀 없는 정적 웹앱'
    ],
    recommendedTechStack: [
      {
        name: 'Node.js / Express or Next.js API Routes',
        description: '프론트엔드와 동일한 TypeScript 언어로 풀스택 개발 가능',
        bestFor: '가장 빠르고 대중적인 웹/앱 API 서버'
      },
      {
        name: 'FastAPI (Python)',
        description: 'Python 기반 초고속 비동기 서버. 데이터 분석, AI 모델 서빙에 최적',
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
      '에러 발생 시 500 에러를 그대로 노출하지 말고 정형화된 JSON 에러 포맷(`{ error, message }`)으로 응답',
      'WebSocket 통신 시 연결 끊김에 대비한 재연결(Reconnection) 및 하트비트(Ping-Pong) 로직 구현',
      '배포 환경(Vercel, AWS ECS, Docker)을 고려하여 포트 번호와 환경변수를 분리'
    ],
    copyableAgentPrompt: `[목표] 실시간 주식 호가 데이터를 브로드캐스팅하는 WebSocket 서버와 REST API 서버를 구축해줘.
[기술조건] Node.js, Express, ws(WebSocket 라이브러리), TypeScript
[요구사항]
1. GET /api/market/summary: 현재가, 전일대비 등락률, 거래량 반환
2. ws://.../ws/orderbook: 클라이언트가 연결되면 1초마다 실시간 매수/매도 호가(Asks/Bids) 10단가를 전송
3. 연결이 끊기면 자동으로 메모리 누수 없이 소켓을 정리하고 재연결 대기
[출력위치] src/server.ts, src/websocket/orderBookSocket.ts에 작성하고 npm run build로 에러를 점검해줘.`
  }
];
