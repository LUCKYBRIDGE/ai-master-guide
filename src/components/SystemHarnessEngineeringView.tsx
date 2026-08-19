import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import { 
  TASK_FEATURE_MODULES,
  NEW_PROJECT_SCAFFOLD_GUIDE,
  MCP_SKILL_AGENT_CONCEPTS,
  TaskFeatureModule,
  McpSkillAgentSummary
} from '../data/templateFilesData';
import { 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  Workflow, 
  RefreshCw, 
  ShieldCheck, 
  FolderArchive,
  Layers,
  Code2,
  Lightbulb,
  Cpu,
  CheckCircle2,
  Sliders,
  Sparkles,
  FolderTree,
  FolderPlus,
  Plug,
  BookOpen,
  Bot,
  Filter,
  CheckSquare,
  Square,
  FileCode,
  PackageCheck,
  Zap,
  Tag,
  Palette,
  Database,
  Lock,
  Rocket,
  BarChart3,
  Wrench,
  Key,
  HelpCircle,
  Compass,
  GraduationCap,
  Scale,
  Folder,
  FileText,
  Eye,
  AlertTriangle,
  ArrowRight,
  Info,
  Boxes,
  CheckCheck,
  Shield,
  Star,
  PlusCircle,
  Globe,
  Monitor
} from 'lucide-react';

interface SystemHarnessEngineeringViewProps {
  onCopy?: (text: string, title: string) => void;
}

// Visual Folder Hierarchy Role Definition
interface FolderRoleDefinition {
  id: string;
  folderPath: string;
  folderName: string;
  badge: string;
  badgeColor: string;
  targetEngines: string;
  whyNeeded: string;
  files: {
    filename: string;
    path: string;
    icon: string;
    roleSummary: string;
    targetConsumers: string[];
    riskIfMissing: string;
    isDynamic: boolean;
  }[];
}

export const SystemHarnessEngineeringView: React.FC<SystemHarnessEngineeringViewProps> = ({ onCopy }) => {
  // Core default modules IDs (Always pre-selected)
  const coreDefaultModuleIds = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => m.isCoreDefault).map(m => m.id);
  }, []);

  // Selected Task Module IDs (includes core defaults + optional add-ons)
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    ...TASK_FEATURE_MODULES.filter(m => m.isCoreDefault).map(m => m.id)
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFileKey, setSelectedFileKey] = useState<string>('AGENTS.md');
  const [activeFolderTab, setActiveFolderTab] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Toggle Optional Task Module Checkbox
  const toggleTaskModule = (id: string) => {
    setSelectedModuleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Quick Preset Handlers (Adds optional add-ons on top of Core Defaults)
  const applyPresetTeacherMaster = () => {
    setSelectedModuleIds([
      ...coreDefaultModuleIds,
      'mod-student-record',
      'mod-lesson-plan-rubric',
      'mod-parent-notice',
      'mod-lesson-worksheet',
      'mod-feedback-coach'
    ]);
  };

  const applyPresetStudentRecord = () => {
    setSelectedModuleIds([
      ...coreDefaultModuleIds,
      'mod-student-record',
      'mod-feedback-coach'
    ]);
  };

  const applyPresetLessonPlan = () => {
    setSelectedModuleIds([
      ...coreDefaultModuleIds,
      'mod-lesson-plan-rubric',
      'mod-lesson-worksheet'
    ]);
  };

  const applyPresetClassActivities = () => {
    setSelectedModuleIds([
      ...coreDefaultModuleIds,
      'mod-class-activity',
      'mod-dutch-pay',
      'mod-review-worksheet'
    ]);
  };

  const applyPresetFullstackDev = () => {
    setSelectedModuleIds([
      ...coreDefaultModuleIds,
      'mod-react-ui',
      'mod-responsive-browser',
      'mod-rest-api',
      'mod-postgres-db',
      'mod-security-auth',
      'mod-git-pr-skill'
    ]);
  };

  const resetToCoreDefaultsOnly = () => {
    setSelectedModuleIds([...coreDefaultModuleIds]);
  };

  const selectAllModules = () => {
    setSelectedModuleIds(TASK_FEATURE_MODULES.map(m => m.id));
  };

  // Separate Core Modules and Optional Add-on Modules
  const coreModules = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => m.isCoreDefault);
  }, []);

  const optionalModules = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => !m.isCoreDefault);
  }, []);

  const displayedOptionalModules = useMemo(() => {
    if (selectedCategory === 'ALL') return optionalModules;
    return optionalModules.filter(m => m.category === selectedCategory);
  }, [selectedCategory, optionalModules]);

  const activeModules = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => selectedModuleIds.includes(m.id));
  }, [selectedModuleIds]);

  // Aggregate counts of generated components
  const counts = useMemo(() => {
    let mcps = 0;
    let zeroConfigMcps = 0;
    let authRequiredMcps = 0;
    let skills = 0;
    let extraFiles = 0;

    activeModules.forEach(m => {
      if (m.mcpServer) {
        mcps += 1;
        if (m.detailedImpact.mcpType === 'zero-config') zeroConfigMcps += 1;
        else authRequiredMcps += 1;
      }
      if (m.skillFile) skills += 1;
      if (m.extraFile) extraFiles += 1;
    });

    return { mcps, zeroConfigMcps, authRequiredMcps, skills, extraFiles };
  }, [activeModules]);

  // Dynamic Rule Sections
  const rulesSections = useMemo(() => {
    return activeModules
      .map(m => m.agentRuleSection)
      .filter(s => s && s.trim().length > 0)
      .join('\n\n');
  }, [activeModules]);

  // Dynamically assemble AGENTS.md (Single Source of Truth Constitution for ALL 3 AI engines)
  const dynamicAgentsMd = useMemo(() => {
    return `# AGENTS.md - Unified Project Constitution & Single Source of Truth
> Standard AI Engines: OpenAI Codex · Claude Code · Google Antigravity (Universal Tri-IDE Support)

## 1. Project Overview & Technology Stack
- Framework: React 18+ (Vite) / TypeScript Strict Mode
- Styling: Tailwind CSS v3 / Icons: lucide-react (See \`docs/design/tokens.md\` & \`.agents/rules/ui-design.md\`)
- State Management: Zustand (Global) & useState (Local UI)

## 2. Essential Commands
- Dev Server: \`npm run dev\`
- Verification Build: \`npm run build\`
- Unit Tests: \`npm test\`
- Lint & Format: \`npm run lint\`

## 3. Development Principles & Safety Rules
- **Smallest Coherent Change**: Prefer small, focused changes over broad speculative rewrites.
- **Component & Pattern Reuse**: Inspect existing components and utilities before creating new ones.
- **Single Source of Truth**: Durable project instructions live centrally in \`AGENTS.md\`. Do not duplicate in \`docs/rules/\`.
- **Zero Regression**: Verify behavior, not just compilation. Never delete working functionality.
- **Autonomous Execution**: Allowed to edit code, install packages (\`npm i\`), and run builds/tests.
- **User Approval Required**: Database destruction commands (\`DROP TABLE\`, unbounded \`DELETE\`), force push (\`git push -f\`), external paid API calls.

## 4. Active Task Guidelines & Skill Directives
${rulesSections || '- Standard web engineering and education compliance guidelines apply.'}

## 5. Documentation Architecture
Project persistent knowledge lives under \`/docs\`:
- \`docs/architecture/\`: Current system and component structure.
- \`docs/design/\`: Design system tokens, color palettes, spacing grid.
- \`docs/plans/\`: Implementation plans for major features.
- \`docs/decisions/\`: Architectural Decision Records (ADRs).
- \`docs/tasks/\`: Persistent task tracking.
- \`docs/reference/\`: Project reference materials and policies.

## 6. Definition of Done
A task is complete ONLY when:
1. The requested behavior is fully implemented.
2. \`npm run build\` passes with 0 TypeScript/Lint errors.
3. Relevant tests pass and regressions are checked.
4. No unnecessary unrelated files were modified.
5. Persistent documentation under \`docs/\` is updated if persistent behavior changed.`;
  }, [rulesSections]);

  // Dynamically assemble CLAUDE.md (Imports @AGENTS.md)
  const dynamicClaudeMd = useMemo(() => {
    return `@AGENTS.md

# Claude Code Specific Instructions

Follow the shared project instructions in \`AGENTS.md\`.

- Follow applicable Claude-specific rules under \`.claude/rules/\`.
- Use shared procedural skills under \`.agents/skills/\` or \`.claude/skills/\`.
- Consult persistent project documentation under \`/docs\` when relevant.
- Do not duplicate shared rules here unless Claude Code requires tool-specific behavioral overrides.`;
  }, []);

  // Dynamically assemble mcp.json based on selected modules
  const dynamicMcpJson = useMemo(() => {
    const servers: Record<string, any> = {};
    activeModules.forEach(m => {
      if (m.mcpServer) {
        servers[m.mcpServer.key] = m.mcpServer.config;
      }
    });

    return JSON.stringify({ mcpServers: servers }, null, 2);
  }, [activeModules]);

  // Dynamically assemble .env.example if any auth-required MCP or security is chosen
  const dynamicEnvExample = useMemo(() => {
    const envVars: string[] = [
      '# .env.example - 프로젝트 환경변수 및 MCP 연결 설정 템플릿',
      '# 이 파일을 .env 로 복사한 뒤 실제 값을 입력하세요.',
      ''
    ];

    if (activeModules.some(m => m.id === 'mod-postgres-db')) {
      envVars.push('# [PostgreSQL MCP 연동]');
      envVars.push('DATABASE_URL="postgresql://user:password@localhost:5432/my_database"');
      envVars.push('');
    }

    if (activeModules.some(m => m.id === 'mod-git-pr-skill')) {
      envVars.push('# [GitHub MCP 연동 - Personal Access Token]');
      envVars.push('GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_github_token_here"');
      envVars.push('');
    }

    if (activeModules.some(m => m.id === 'mod-security-auth')) {
      envVars.push('# [보안 인증 및 JWT]');
      envVars.push('JWT_SECRET="your-super-secret-jwt-key-change-this"');
      envVars.push('');
    }

    if (activeModules.some(m => m.id === 'mod-payment-idempotency')) {
      envVars.push('# [결제 연동 API 키]');
      envVars.push('TOSS_SECRET_KEY="test_sk_xxxxxxxxxxxx"');
      envVars.push('');
    }

    return envVars.join('\n');
  }, [activeModules]);

  // Assemble list of all dynamic files generated by active selection
  const dynamicFilesList = useMemo(() => {
    const list: { key: string; filename: string; path: string; description: string; content: string }[] = [];

    // 1. Instructions Files (Root - Clean & Minimalist)
    list.push({
      key: 'AGENTS.md',
      filename: 'AGENTS.md',
      path: 'AGENTS.md',
      description: '통합 마스터 헌법 (Codex · Claude · Antigravity 3대 AI 공용 단일 진실 공급원)',
      content: dynamicAgentsMd
    });

    list.push({
      key: 'CLAUDE.md',
      filename: 'CLAUDE.md',
      path: 'CLAUDE.md',
      description: '@AGENTS.md를 참조하는 클로드 코드 전용 임포트 포인터',
      content: dynamicClaudeMd
    });

    // 2. mcp.json
    list.push({
      key: 'mcp.json',
      filename: 'mcp.json',
      path: 'mcp.json',
      description: `선택된 ${counts.mcps}개 전용 MCP 서버 설정 (무설정 ${counts.zeroConfigMcps}개 + 키필요 ${counts.authRequiredMcps}개)`,
      content: dynamicMcpJson
    });

    // 3. .env.example (if any auth-required MCP is chosen)
    if (counts.authRequiredMcps > 0 || activeModules.some(m => m.id === 'mod-security-auth')) {
      list.push({
        key: '.env.example',
        filename: '.env.example',
        path: '.env.example',
        description: '인증형 MCP(GitHub, DB) 및 시크릿 키 연결용 환경변수 템플릿',
        content: dynamicEnvExample
      });
    }

    // 4. Extra files (docs/design/tokens.md, .agents/rules/..., docs/...)
    activeModules.forEach(m => {
      if (m.extraFile) {
        list.push({
          key: m.extraFile.path,
          filename: m.extraFile.path,
          path: m.extraFile.path,
          description: m.extraFile.description,
          content: m.extraFile.content
        });
      }
    });

    // 5. Skill files (.agents/skills/...)
    activeModules.forEach(m => {
      if (m.skillFile) {
        list.push({
          key: m.skillFile.path,
          filename: m.skillFile.path,
          path: m.skillFile.path,
          description: m.skillFile.description,
          content: m.skillFile.content
        });
      }
    });

    return list;
  }, [
    activeModules, 
    dynamicAgentsMd, 
    dynamicClaudeMd, 
    dynamicMcpJson, 
    dynamicEnvExample, 
    counts
  ]);

  // Selected file for preview
  const currentFile = useMemo(() => {
    return dynamicFilesList.find(f => f.key === selectedFileKey) || dynamicFilesList[0];
  }, [dynamicFilesList, selectedFileKey]);

  // Visual Folder Hierarchy Role Definitions for Inspector (Ultra-Clean Root Standard)
  const folderRoleDefinitions: FolderRoleDefinition[] = useMemo(() => {
    return [
      {
        id: 'zone-root',
        folderPath: '/',
        folderName: '루트 최상위 (Clean & Minimalist Root)',
        badge: '단일 진실 공급원 헌법 구역',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        targetEngines: 'Codex · Claude Code · Antigravity 전체 공용',
        whyNeeded: '루트 디렉토리를 최대한 깔끔하게 유지하여, AI가 진입하자마자 최상위 헌법(AGENTS.md)과 도구 설정만 정확히 읽도록 만듭니다.',
        files: [
          {
            filename: 'AGENTS.md',
            path: 'AGENTS.md',
            icon: '📄',
            roleSummary: '프로젝트 단일 진실 공급원(헌법): 빌드/테스트 명령어, 코딩 표준, 완료 판정(Definition of Done) 명시',
            targetConsumers: ['OpenAI Codex', 'Google Antigravity', 'Claude Code'],
            riskIfMissing: 'AI들이 서로 다른 코딩 스타일로 작성하여 충돌하거나, 빌드 검증 없이 작업을 끝냈다고 거짓 보고함',
            isDynamic: true
          },
          {
            filename: 'CLAUDE.md',
            path: 'CLAUDE.md',
            icon: '🟣',
            roleSummary: '@AGENTS.md를 임포트하는 클로드 코드 전용 3줄 포인터 (규칙 복사-붙여넣기 중복 원천 차단)',
            targetConsumers: ['Claude Code CLI'],
            riskIfMissing: 'Claude Code가 공통 헌법을 인식하지 못하고 독자적인 스타일로 코드를 파괴할 수 있음',
            isDynamic: true
          },
          {
            filename: 'mcp.json',
            path: 'mcp.json',
            icon: '🔌',
            roleSummary: '외부 도구 연결 명세서: 브라우저(Puppeteer), PostgreSQL DB, GitHub PR 자동화 MCP 서버 등록',
            targetConsumers: ['Google Antigravity', 'Claude Desktop'],
            riskIfMissing: 'AI가 외부 DB를 직접 확인하거나 브라우저 화면 캡처 검사를 수행하지 못함',
            isDynamic: true
          },
          {
            filename: '.env.example',
            path: '.env.example',
            icon: '🔑',
            roleSummary: '환경변수 보안 템플릿: GitHub 토큰, DB 접속 URL, JWT 비밀키 형식 가이드 (Git 커밋 금지)',
            targetConsumers: ['개발자 & 시스템 런타임'],
            riskIfMissing: '소스코드 안에 비밀키(API Key)를 하드코딩하여 깃허브로 유출되는 치명적 사고 발생',
            isDynamic: true
          }
        ]
      },
      {
        id: 'zone-agents',
        folderPath: '.agents/',
        folderName: '.agents/ (Antigravity & Codex 공용)',
        badge: '공용 스킬 & 정책 구역',
        badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        targetEngines: 'Antigravity · Codex · Claude 공용',
        whyNeeded: '반복 가능한 작업 절차(SOP)와 UI 디자인·테스트 안전 정책을 저장하여 3대 AI 도구가 100% 공유하도록 만듭니다.',
        files: [
          {
            filename: '.agents/skills/plan-feature/SKILL.md',
            path: '.agents/skills/plan-feature/SKILL.md',
            icon: '📋',
            roleSummary: '사전 기획 스킬: 대형 작업 전 기존 코드와 docs/를 먼저 분석하여 위험 요소와 최소 변경 계획서 작성',
            targetConsumers: ['Antigravity', 'Codex', 'Claude Code'],
            riskIfMissing: '코드를 무작정 수정하다가 기존에 잘 돌아가던 핵심 기능을 망가뜨림',
            isDynamic: true
          },
          {
            filename: '.agents/skills/implement-feature/SKILL.md',
            path: '.agents/skills/implement-feature/SKILL.md',
            icon: '⚡',
            roleSummary: '안전 구현 스킬: 기존 패턴을 재사용하여 가장 작고 응집력 있는 코드 작성 및 npm run build 검증',
            targetConsumers: ['Antigravity', 'Codex', 'Claude Code'],
            riskIfMissing: '과도한 리팩토링으로 불필요한 코드 변경량이 급증하고 빌드 에러 유발',
            isDynamic: true
          },
          {
            filename: '.agents/skills/debug/SKILL.md',
            path: '.agents/skills/debug/SKILL.md',
            icon: '🔍',
            roleSummary: '디버깅 스킬: 증상만 덮지 않고 Root Cause를 추적하여 최소 안전 패치 및 회귀 방지 테스트 수행',
            targetConsumers: ['Antigravity', 'Codex', 'Claude Code'],
            riskIfMissing: '에러 하나 고치려다 다른 페이지 3개가 터지는 연쇄 장애 발생',
            isDynamic: true
          },
          {
            filename: '.agents/skills/code-review/SKILL.md',
            path: '.agents/skills/code-review/SKILL.md',
            icon: '🛡️',
            roleSummary: '10단계 정밀 리뷰 스킬: 기능/보안/타입/회귀/테스트/문서 등 10개 관점에서 변경점 전수 검사',
            targetConsumers: ['Antigravity', 'Codex', 'Claude Code'],
            riskIfMissing: '보안 취약점이나 타입 에러가 포함된 불량 코드가 그대로 프로덕션에 배포됨',
            isDynamic: true
          },
          {
            filename: '.agents/rules/ui-design.md',
            path: '.agents/rules/ui-design.md',
            icon: '📐',
            roleSummary: 'UI 디자인 규칙: 일관된 인터랙션 패턴 및 반응형 UI 레이아웃 검증 (docs/design/tokens.md 참조)',
            targetConsumers: ['Antigravity', 'Codex', 'Claude Code'],
            riskIfMissing: '페이지마다 제각각 다른 색상과 스타일을 마구잡이로 작성함',
            isDynamic: true
          },
          {
            filename: '.agents/rules/testing.md',
            path: '.agents/rules/testing.md',
            icon: '🧪',
            roleSummary: '테스트 정책: 실제 동작 검증, 회귀 테스트 실행 및 성공 입증 원칙',
            targetConsumers: ['Antigravity', 'Codex'],
            riskIfMissing: '테스트 없이 완료를 선언하거나 회귀 오류를 인지하지 못함',
            isDynamic: true
          },
          {
            filename: '.agents/skills/session-context-compactor/SKILL.md',
            path: '.agents/skills/session-context-compactor/SKILL.md',
            icon: '⚡',
            roleSummary: '클로드 세션 압축: 긴 대화 이력을 docs/tasks/ 에 요약하고 컨텍스트를 /compact 최적화',
            targetConsumers: ['Claude Code', 'Antigravity'],
            riskIfMissing: '터미널 작업이 길어지면 컨텍스트 윈도우가 가득 차서 속도가 급격히 느려지고 비용 급증',
            isDynamic: true
          },
          {
            filename: '.agents/skills/tdd-test-generator/SKILL.md',
            path: '.agents/skills/tdd-test-generator/SKILL.md',
            icon: '🧪',
            roleSummary: 'TDD 선행 테스트: 구현 전에 tests/ 에 실패하는 단위 테스트를 먼저 작성하여 무결점 검증',
            targetConsumers: ['Claude Code', 'Codex', 'Antigravity'],
            riskIfMissing: '테스트 없이 코드를 짜다가 숨겨진 버그가 배포 이후에 발견됨',
            isDynamic: true
          }
        ]
      },
      {
        id: 'zone-claude',
        folderPath: '.claude/',
        folderName: '.claude/ (Claude Code 전용)',
        badge: '클로드 CLI 특화 구역',
        badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        targetEngines: 'Claude Code CLI 전용',
        whyNeeded: 'Claude Code CLI 환경에만 필요한 전용 규칙이나 터미널 프롬프트 행동 양식을 격리 보관합니다.',
        files: [
          {
            filename: '.claude/rules/frontend.md',
            path: '.claude/rules/frontend.md',
            icon: '🟣',
            roleSummary: '클로드 프론트엔드 규칙: Tailwind 클래스 우선 적용 및 JSX 태그 닫힘 검증 오버라이드',
            targetConsumers: ['Claude Code'],
            riskIfMissing: '클로드가 터미널에서 컴포넌트를 작성할 때 인라인 CSS 스타일을 생성할 위험',
            isDynamic: false
          }
        ]
      },
      {
        id: 'zone-docs',
        folderPath: 'docs/',
        folderName: 'docs/ (영구 지식 보관소)',
        badge: '영구 아키텍처 & 디자인 & ADR 구역',
        badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        targetEngines: '모든 AI 도구 및 인간 개발자/교육자',
        whyNeeded: 'AI 컨텍스트 윈도우를 낭비하지 않고, 시스템 구조도와 디자인 토큰, 설계 결정을 영구 보관합니다.',
        files: [
          {
            filename: 'docs/architecture/overview.md',
            path: 'docs/architecture/overview.md',
            icon: '🏛️',
            roleSummary: '현재 시스템의 모듈 간 관계, 데이터 흐름도, 폴더별 책임을 도식화하여 설명',
            targetConsumers: ['전체 AI 도구 & 개발자'],
            riskIfMissing: '새로운 기능을 추가할 때 기존 시스템 구조를 이해하지 못해 엉뚱한 폴더에 파일 생성',
            isDynamic: true
          },
          {
            filename: 'docs/design/tokens.md',
            path: 'docs/design/tokens.md',
            icon: '🎨',
            roleSummary: '디자인 시스템 토큰: 브랜드 메인/서브 컬러(#3182F6), 폰트, 버튼 곡률(12px), 4px 여백 그리드 강제',
            targetConsumers: ['프론트엔드 에이전트 전체'],
            riskIfMissing: '페이지마다 조잡한 무지개색 인라인 스타일이나 들쭉날쭉한 여백이 마구잡이로 생성됨',
            isDynamic: true
          },
          {
            filename: 'docs/plans/',
            path: 'docs/plans/',
            icon: '📑',
            roleSummary: '대형 기능 개발 시 작성된 단계별 구현 계획서(Implementation Plans) 보관소',
            targetConsumers: ['전체 AI 도구'],
            riskIfMissing: '복잡한 기능 개발 중간에 맥락이 끊겨 작업이 중구난방으로 진행됨',
            isDynamic: false
          },
          {
            filename: 'docs/decisions/ (ADRs)',
            path: 'docs/decisions/',
            icon: '⚖️',
            roleSummary: '아키텍처 결정 기록: 왜 Next.js가 아닌 Vite+React를 선택했는지 등의 기술적 근거 기록',
            targetConsumers: ['전체 AI 도구 & 개발자'],
            riskIfMissing: '이유를 모르고 다른 AI가 핵심 라이브러리를 임의로 교체해버리는 사고 발생',
            isDynamic: false
          },
          {
            filename: 'docs/reference/neis_record_guideline.md',
            path: 'docs/reference/neis_record_guideline.md',
            icon: '📚',
            roleSummary: '교육부 학생생활기록부 기재 요령 및 교내 평가 규정 공식 레퍼런스',
            targetConsumers: ['student-record-writer 스킬'],
            riskIfMissing: '생기부 작성 시 최신 교육부 지침과 어긋나는 표현이 생성될 위험',
            isDynamic: true
          }
        ]
      }
    ];
  }, []);

  // Filtered folder zones for inspector
  const displayedFolderZones = useMemo(() => {
    if (activeFolderTab === 'all') return folderRoleDefinitions;
    return folderRoleDefinitions.filter(z => z.id === activeFolderTab);
  }, [activeFolderTab, folderRoleDefinitions]);

  // Copy handler
  const handleCopy = (id: string, text: string, title: string) => {
    if (onCopy) onCopy(text, title);
    else navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ZIP Download Generator
  const downloadCustomHarnessZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add all generated files to zip
      dynamicFilesList.forEach(file => {
        zip.file(file.path, file.content);
      });

      // Add a helpful README.md for the downloaded package
      const readmeContent = `# 맞춤형 AI 개발 & 교육 통합 하네스 패키지 (Universal AI Development & Education Harness)
> 생성 일시: ${new Date().toLocaleDateString('ko-KR')}
> 아키텍처: OpenAI Codex · Claude Code · Google Antigravity 3대 AI 통합 단일 진실 공급원(Single Source of Truth)
> 지원 도구: 3대 AI 엔진 100% 동시 호환 (규칙 중복 제로)
> 장착된 기능 (${activeModules.length}개): ${activeModules.map(m => m.name).join(', ')}

---

## 📂 압축 해제 후 표준 폴더 구조 및 역할
${dynamicFilesList.map(f => `- **${f.path}**: ${f.description}`).join('\n')}

---

## 🚀 사용 방법
1. 압축을 풀고 이 파일들을 내 프로젝트 **루트(최상위) 폴더**에 덮어씌웁니다.
2. 만약 \`.env.example\` 파일이 있다면, \`.env\` 로 이름을 바꾸고 본인의 GitHub 토큰이나 DB 주소를 입력합니다.
3. 터미널에서 Claude Code (\`claude\`), Google Antigravity, 또는 OpenAI Codex를 실행하면 자동으로 단일 헌법(AGENTS.md)과 .agents/skills/ 스킬이 적용됩니다!`;

      zip.file('README.md', readmeContent);

      // Generate blob and trigger download
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-ide-unified-all-in-one-${activeModules.length}features.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('ZIP 압축 다운로드 실패:', error);
      alert('압축 파일 생성 중 오류가 발생했습니다.');
    } finally {
      setIsZipping(false);
    }
  };

  const addOnCategories = [
    'ALL',
    '교사/교육자 특화',
    '초중고 수업/활동지',
    '독서/문화/글쓰기',
    '학급/모임/도구',
    '프론트엔드/UI',
    '백엔드/DB',
    '보안/결제'
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <FolderArchive className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Codex · Claude · Antigravity 통합 개발환경 & ZIP 패키지 다운로드
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              <strong>실리콘밸리 전문가 공인 8대 핵심 필수 팩</strong>이 기본 장착되어 있으며, 필요한 <strong>선택형 실무 기능</strong>을 추가로 체크하여 나만의 맞춤형 개발환경 패키지를 원클릭 ZIP으로 다운로드할 수 있습니다.
            </p>
          </div>

          <button
            onClick={downloadCustomHarnessZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/40 transition-all scale-102 shrink-0 self-start md:self-auto border border-emerald-400/40"
          >
            {isZipping ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            <span>통합 환경 ZIP 일괄 다운로드 ({dynamicFilesList.length}개 파일)</span>
          </button>
        </div>

        {/* Universal Tri-IDE Compatibility Banner */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold">
            <span>🟣 Claude Code</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
            <span>🟢 Google Antigravity</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold">
            <span>🔵 OpenAI Codex</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 font-mono">
            <span>기본 필수 <strong className="text-indigo-400">{coreModules.length}개</strong></span>
            <span>+</span>
            <span>추가 선택 <strong className="text-emerald-400">{activeModules.length - coreModules.length}개</strong></span>
            <span>=</span>
            <span>총 <strong className="text-amber-400">{activeModules.length}개 기능</strong> ({dynamicFilesList.length}개 파일)</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 2026 최종 권장 아키텍처 토폴로지 (Clean Root & docs/design 표준) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Scale className="w-5 h-5" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              🏛️ 2026 글로벌 탑 개발자 권장 아키텍처: [Clean Root & docs/design/tokens.md]
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-bold">
            Gold Standard Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Topology Architecture Diagram */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
            <pre className="text-[11px] whitespace-pre-wrap">{`[ 🌐 내 PC 글로벌 프로필: ~/.claude/CLAUDE.md ]
  ➔ 개인 공통 취향 1회 설정 ("모든 답변은 한국어로", "친절한 어조")
                         │
                         ▼ (자동 상속)
[ 📦 각 프로젝트 폴더 (C:\\ai_dev\\projects\\STUDY\\) - Clean Root ]
  ├── 📄 AGENTS.md        (프로젝트 단일 진실 공급원 헌법)
  ├── 🟣 CLAUDE.md        (@AGENTS.md 임포트 포인터)
  ├── 🔌 mcp.json         (외부 도구 연결: 브라우저, DB)
  ├── 📁 .agents/rules/   (ui-design.md, testing.md, security_policy.md)
  ├── 📁 .agents/skills/  (전문가 8대 핵심 스킬 + 맞춤 스킬)
  └── 📁 docs/            (architecture/overview.md, design/tokens.md)`}</pre>
          </div>

          {/* 4 Core Architectural Principles */}
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">1. 정갈한 최상위 루트 (Clean & Minimalist Root)</strong>
                <span className="text-slate-400 text-[11px]">루트에는 AGENTS.md와 CLAUDE.md만 남기고, 디자인 규격은 docs/design/tokens.md와 .agents/rules/ui-design.md 로 체계화합니다.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">2. 100% 저장소 독립성 (Self-Contained Portability)</strong>
                <span className="text-slate-400 text-[11px]">프로젝트 폴더만 압축해 다른 PC로 옮기거나 깃허브/Vercel에 올려도 단 1줄의 경로 깨짐 없이 즉시 구동됩니다.</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">3. 스킬 비대화(Skill Bloat) & 토큰 낭비 원천 차단</strong>
                <span className="text-slate-400 text-[11px]">스킬 50개를 마구잡이로 넣어 AI가 느려지는 것을 막고, 전문가 검증 8대 핵심 스킬만 기본 탑재합니다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 1. [기본 장착 필수 팩] 전문가 추천 핵심 스킬 & 하네스 (항상 기본 포함) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                🌟 [기본 장착 필수 팩] 전문가 공인 8대 핵심 표준 스킬 & 하네스 ({coreModules.length}개)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              스킬이 너무 많으면 AI가 혼란을 겪고 토큰이 낭비됩니다. 따라서 <strong>기획/구현/디버깅/코드리뷰 4대 표준, 스마트 라우터, Claude 긴 세션 압축기, TDD 선행 테스트기, 영구 지식 베이스</strong> 등 실리콘밸리 전문가들이 검증한 최정예 핵심 스킬만 <strong>기본으로 안전하게 내장</strong>되어 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>기본 탑재 완료 (자동 포함)</span>
          </div>
        </div>

        {/* Core Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {coreModules.map((module) => (
            <div
              key={module.id}
              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 text-white space-y-2.5 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${module.badgeColor}`}>
                    {module.badge}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <CheckCheck className="w-3.5 h-3.5" /> 기본 포함
                  </span>
                </div>

                <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {module.name}
                </h5>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {module.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-1 font-mono">
                <div className="flex items-center gap-1 text-indigo-300">
                  <span>📄 지침:</span>
                  <span className="truncate">{module.detailedImpact.agentRuleSummary}</span>
                </div>
                {module.detailedImpact.skillPath && (
                  <div className="flex items-center gap-1 text-amber-300">
                    <span>📖 스킬:</span>
                    <span className="truncate">{module.detailedImpact.skillPath}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ➕ 2. [선택형 추가 확장 모듈] 내 프로젝트에 필요한 기능 체크 (중복 선택) */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                추가 선택
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" /> ➕ 내 프로젝트에 필요한 추가 기능을 체크하세요 (선택 사항)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              기본 필수 팩 위에 <strong>교사 생기부/지도안, 교과 활동지, 학급 도구, DB, 브라우저 검증</strong> 등 원하는 도메인 기능만 쏙쏙 골라 확장할 수 있습니다.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={applyPresetTeacherMaster}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
              <span>교사 실무 올인원 팩 추가</span>
            </button>
            <button
              onClick={applyPresetStudentRecord}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all"
            >
              📋 생기부 & 피드백
            </button>
            <button
              onClick={applyPresetLessonPlan}
              className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 font-bold transition-all"
            >
              📐 지도안 & 활동지
            </button>
            <button
              onClick={applyPresetClassActivities}
              className="px-2.5 py-1 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/40 font-bold transition-all"
            >
              🎯 학급 뽑기·정산기
            </button>
            <button
              onClick={applyPresetFullstackDev}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              🚀 풀스택 웹개발 (DB/브라우저/인증)
            </button>
            <button
              onClick={resetToCoreDefaultsOnly}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-all"
            >
              기본 팩만 유지 (선택 해제)
            </button>
            <button
              onClick={selectAllModules}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체 선택
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Live Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {addOnCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md scale-102'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat === 'ALL' ? '전체 보기' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 shrink-0">
            <span>추가 선택된 기능:</span>
            <strong className="text-emerald-300 font-bold">{activeModules.length - coreModules.length}개</strong>
            <span>•</span>
            <span>연결된 MCP:</span>
            <strong className="text-teal-300 font-bold">{counts.mcps}개</strong>
          </div>
        </div>

        {/* Dynamic Optional Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {displayedOptionalModules.map((module: TaskFeatureModule) => {
            const isChecked = selectedModuleIds.includes(module.id);
            const isTeacherMod = module.category === '교사/교육자 특화';
            return (
              <div
                key={module.id}
                onClick={() => toggleTaskModule(module.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border select-none space-y-2.5 flex flex-col justify-between ${
                  isChecked
                    ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 text-white shadow-lg border-emerald-500/60 scale-101 ring-1 ring-emerald-500/20'
                    : isTeacherMod
                    ? 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-850 border-emerald-500/30'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${module.badgeColor}`}>
                        {module.category}
                      </span>
                      {isTeacherMod && <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-emerald-400">
                      {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-600" />}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {module.name}
                    </h5>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {module.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Granular Injected Components Breakdown */}
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-1 font-mono">
                  <div className="flex items-center gap-1 text-indigo-300">
                    <span>📄 지침:</span>
                    <span className="truncate">{module.detailedImpact.agentRuleSummary}</span>
                  </div>
                  {module.detailedImpact.mcpServerName && (
                    <div className="flex items-center justify-between text-teal-300">
                      <span>🔌 도구: {module.detailedImpact.mcpServerName}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded ${
                        module.detailedImpact.mcpType === 'zero-config' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {module.detailedImpact.mcpType === 'zero-config' ? '🟢 즉시 동작' : '🔑 .env 키 필요'}
                      </span>
                    </div>
                  )}
                  {module.detailedImpact.skillPath && (
                    <div className="flex items-center gap-1 text-amber-300">
                      <span>📖 매뉴얼:</span>
                      <span className="truncate">{module.detailedImpact.skillPath}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📂 시각적 파일 구조 & 폴더별 파일 역할 가시화 인스펙터 */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <FolderTree className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                📂 시각적 프로젝트 폴더 구조 & 파일 역할 가시화 인스펙터
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              어떤 폴더가 왜 존재하고, 그 아래의 파일들이 <strong>어떤 AI에게 무엇을 지시하며, 미작성 시 어떤 치명적 사고(위험)가 발생하는지</strong> 한눈에 파악할 수 있는 시각적 지도입니다.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar self-start md:self-auto text-xs">
            <button
              onClick={() => setActiveFolderTab('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border whitespace-nowrap ${
                activeFolderTab === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              전체 폴더 맵
            </button>
            <button
              onClick={() => setActiveFolderTab('zone-root')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border whitespace-nowrap ${
                activeFolderTab === 'zone-root'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              📁 루트 (/)
            </button>
            <button
              onClick={() => setActiveFolderTab('zone-agents')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border whitespace-nowrap ${
                activeFolderTab === 'zone-agents'
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              📁 .agents/
            </button>
            <button
              onClick={() => setActiveFolderTab('zone-claude')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border whitespace-nowrap ${
                activeFolderTab === 'zone-claude'
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              📁 .claude/
            </button>
            <button
              onClick={() => setActiveFolderTab('zone-docs')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all border whitespace-nowrap ${
                activeFolderTab === 'zone-docs'
                  ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              📁 docs/
            </button>
          </div>
        </div>

        {/* Visual Folder Zones Grid */}
        <div className="space-y-6">
          {displayedFolderZones.map((zone) => (
            <div
              key={zone.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl"
            >
              {/* Folder Zone Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 font-mono text-sm font-bold flex items-center gap-1.5">
                    <Folder className="w-4 h-4 text-cyan-400" />
                    <span>{zone.folderPath}</span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      {zone.folderName}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      <strong>존재 이유:</strong> {zone.whyNeeded}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${zone.badgeColor}`}>
                    {zone.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    🎯 {zone.targetEngines}
                  </span>
                </div>
              </div>

              {/* Files in this Folder (Grid Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {zone.files.map((file, fIdx) => {
                  const isCurrentlySelectedForPreview = selectedFileKey === file.path;
                  return (
                    <div
                      key={fIdx}
                      onClick={() => setSelectedFileKey(file.path)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border select-none space-y-3 flex flex-col justify-between ${
                        isCurrentlySelectedForPreview
                          ? 'bg-gradient-to-br from-cyan-950/80 via-slate-900 to-slate-950 border-cyan-400 shadow-lg ring-2 ring-cyan-500/20 scale-101'
                          : 'bg-slate-950/80 text-slate-300 hover:bg-slate-850 hover:border-slate-700 border-slate-800/90'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* File Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{file.icon}</span>
                            <span className="font-mono text-xs font-bold text-white tracking-tight">
                              {file.filename}
                            </span>
                          </div>
                          {file.isDynamic && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              자동 조립
                            </span>
                          )}
                        </div>

                        {/* File Core Role */}
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {file.roleSummary}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        {/* Consumers */}
                        <div className="flex items-center gap-1.5 text-indigo-300 font-mono text-[10px]">
                          <span>🤖 적용:</span>
                          <span className="truncate">{file.targetConsumers.join(', ')}</span>
                        </div>

                        {/* Risk if missing */}
                        <div className="p-2 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-300 text-[10px] space-y-0.5">
                          <span className="font-bold flex items-center gap-1 text-rose-400">
                            <AlertTriangle className="w-3 h-3 text-rose-400" /> 미작성 시 위험:
                          </span>
                          <p className="leading-snug text-rose-200/90">{file.riskIfMissing}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 3: Real-Time Generated Files Preview & Live Code Inspector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                검사기
              </span>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-cyan-400" /> 실시간 생성 파일 뷰어 & 코드 검사기
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              기본 필수 팩과 내가 체크한 추가 기능들이 실시간으로 조립된 실제 파일 내용을 직접 확인하고 개별 복사할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(currentFile.key, currentFile.content, currentFile.filename)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 shadow-md"
            >
              {copiedId === currentFile.key ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>현재 파일 내용 복사</span>
            </button>
            <button
              onClick={downloadCustomHarnessZip}
              disabled={isZipping}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
            >
              {isZipping ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>전체 ZIP 다운로드</span>
            </button>
          </div>
        </div>

        {/* Dynamic File Tabs (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {dynamicFilesList.map(file => (
            <button
              key={file.key}
              onClick={() => setSelectedFileKey(file.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border whitespace-nowrap ${
                selectedFileKey === file.key
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850 border-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        {/* File Description Header */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-300 font-bold">{currentFile.path}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{currentFile.description}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {currentFile.content.split('\n').length} lines
          </span>
        </div>

        {/* Live Code Viewer */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner">
          <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[480px]">
            {currentFile.content}
          </pre>
        </div>
      </div>

      {/* 3-Pillar Concept Deep Dive (Agent, MCP, Skill) */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl">
        <div className="space-y-1 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              에이전트(Agent) · MCP · 스킬(Skill) 3총사 핵심 비교 & 역할 분담
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            실무에서 무엇을 어디에 써야 할지 헷갈리지 않도록 실생활 비유와 실전 예시로 명쾌하게 정리했습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MCP_SKILL_AGENT_CONCEPTS.map((item: McpSkillAgentSummary) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                    {item.role}
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    {item.englishName}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-amber-300 font-medium leading-relaxed">
                  {item.metaphor}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                  <span className="font-bold text-[11px] text-indigo-300 block">실제 예시:</span>
                  <p className="text-[11px] leading-relaxed">{item.practicalExample}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-slate-400 text-[11px]">관련 파일:</span>
                <code className="text-emerald-300 font-mono text-[11px] block">{item.sampleFile}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
