import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import { 
  AI_TOOLS_CATALOG,
  TASK_FEATURE_MODULES,
  NEW_PROJECT_SCAFFOLD_GUIDE,
  MCP_SKILL_AGENT_CONCEPTS,
  AiToolItem,
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
  Compass
} from 'lucide-react';

interface SystemHarnessEngineeringViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const SystemHarnessEngineeringView: React.FC<SystemHarnessEngineeringViewProps> = ({ onCopy }) => {
  // STEP 1: Selected AI Tools IDs (Multi-select)
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>(
    AI_TOOLS_CATALOG.filter(t => t.defaultSelected).map(t => t.id)
  );

  // STEP 2: Selected Task Module IDs (Multi-select)
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(
    TASK_FEATURE_MODULES.filter(m => m.defaultSelected).map(m => m.id)
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedFileKey, setSelectedFileKey] = useState<string>('AGENTS.md');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Toggle AI Tool Checkbox
  const toggleTool = (id: string) => {
    setSelectedToolIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Tool Quick Presets
  const setToolPresetClaudeAntigravity = () => setSelectedToolIds(['tool-claude-code', 'tool-antigravity']);
  const setToolPresetClaudeCodex = () => setSelectedToolIds(['tool-claude-code', 'tool-codex']);
  const setToolPresetClaudeOnly = () => setSelectedToolIds(['tool-claude-code']);
  const setToolPresetAntigravityCodex = () => setSelectedToolIds(['tool-antigravity', 'tool-codex']);
  const setToolPresetGrok = () => setSelectedToolIds(['tool-grok-build', 'tool-claude-code']);
  const selectAllTools = () => setSelectedToolIds(AI_TOOLS_CATALOG.map(t => t.id));

  // Toggle Task Module Checkbox
  const toggleTaskModule = (id: string) => {
    setSelectedModuleIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Task Quick Scenarios (비전공자/교육/기획/실무자 모두 이해하기 쉬운 실무 프리셋)
  const applyScenarioSmartRouter = () => {
    setSelectedModuleIds([
      'mod-skill-mcp-router',
      'mod-lesson-worksheet',
      'mod-react-ui'
    ]);
  };

  const applyScenarioLessonWorksheet = () => {
    setSelectedModuleIds([
      'mod-lesson-worksheet',
      'mod-skill-mcp-router'
    ]);
  };

  const applyScenarioReviewWorksheet = () => {
    setSelectedModuleIds([
      'mod-review-worksheet',
      'mod-sns-card-news'
    ]);
  };

  const applyScenarioClassActivity = () => {
    setSelectedModuleIds([
      'mod-class-activity',
      'mod-dutch-pay',
      'mod-react-ui'
    ]);
  };

  const applyScenarioSnsMarketing = () => {
    setSelectedModuleIds([
      'mod-sns-card-news',
      'mod-biz-docs'
    ]);
  };

  const applyScenarioDutchPay = () => {
    setSelectedModuleIds([
      'mod-dutch-pay',
      'mod-react-ui'
    ]);
  };

  const applyScenarioFullstack = () => {
    setSelectedModuleIds([
      'mod-react-ui', 
      'mod-responsive-browser', 
      'mod-rest-api', 
      'mod-postgres-db', 
      'mod-security-auth', 
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioFrontend = () => {
    setSelectedModuleIds([
      'mod-react-ui', 
      'mod-responsive-browser', 
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioBackend = () => {
    setSelectedModuleIds([
      'mod-rest-api', 
      'mod-postgres-db', 
      'mod-security-auth', 
      'mod-payment-idempotency', 
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioData = () => {
    setSelectedModuleIds([
      'mod-data-pipeline', 
      'mod-chart-dashboard',
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioEdu = () => {
    setSelectedModuleIds([
      'mod-edu-quiz',
      'mod-lesson-worksheet',
      'mod-react-ui',
      'mod-responsive-browser'
    ]);
  };

  const applyScenarioDocs = () => {
    setSelectedModuleIds([
      'mod-biz-docs',
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioDashboard = () => {
    setSelectedModuleIds([
      'mod-chart-dashboard',
      'mod-data-pipeline',
      'mod-react-ui'
    ]);
  };

  const applyScenarioGame = () => {
    setSelectedModuleIds([
      'mod-mini-game',
      'mod-react-ui',
      'mod-responsive-browser'
    ]);
  };

  const applyScenarioAiChat = () => {
    setSelectedModuleIds([
      'mod-ai-chatbot',
      'mod-react-ui',
      'mod-responsive-browser'
    ]);
  };

  const selectAllTasks = () => setSelectedModuleIds(TASK_FEATURE_MODULES.map(m => m.id));
  const clearAllTasks = () => setSelectedModuleIds([]);

  // Active selected tools and tasks
  const activeTools = useMemo(() => {
    return AI_TOOLS_CATALOG.filter(t => selectedToolIds.includes(t.id));
  }, [selectedToolIds]);

  const activeModules = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => selectedModuleIds.includes(m.id));
  }, [selectedModuleIds]);

  // Filtered displayed modules by category
  const displayedModules = useMemo(() => {
    if (selectedCategory === 'ALL') return TASK_FEATURE_MODULES;
    return TASK_FEATURE_MODULES.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

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

  // Tool flags
  const isClaudeSelected = selectedToolIds.includes('tool-claude-code');
  const isOtherToolsSelected = selectedToolIds.some(id => id !== 'tool-claude-code');
  const isGrokSelected = selectedToolIds.includes('tool-grok-build');

  // Dynamic Rule Sections
  const rulesSections = useMemo(() => {
    return activeModules
      .map(m => m.agentRuleSection)
      .filter(s => s && s.trim().length > 0)
      .join('\n\n');
  }, [activeModules]);

  // Dynamically assemble AGENTS.md
  const dynamicAgentsMd = useMemo(() => {
    const toolsNames = activeTools.map(t => t.name).join(' · ');
    const grokTip = isGrokSelected 
      ? '- **xAI Grok Build 최적화**: 최소한의 스텝(Minimum Steps)으로 파일 생성과 터미널 검증을 신속하게 완료할 것.' 
      : '- **자율 실행 허용**: 소스코드 파일 편집, 패키지 설치(`npm i`), 빌드/테스트 실행(`npm test`, `npm run build`).';

    return `# AGENTS.md - 통합 자율 코딩 에이전트 지침서
> 대상 도구: ${toolsNames || '범용 자율 AI 에이전트'}

## 1. 빌드 및 테스트 명령어 (Commands)
- 개발 서버 실행: \`npm run dev\`
- 빌드 검증: \`npm run build\`
- 단위 테스트 실행: \`npm test\`
- 린트 및 포맷팅: \`npm run lint\`

## 2. 에이전트 기본 역할 및 권한 경계 (Role & Permissions)
- **기본 역할**: 사용자의 지시에 따라 프로젝트 파일 생성, 수정, 터미널 빌드/테스트를 자율 실행하는 시니어 엔지니어.
${grokTip}
- **사용자 승인 필수**: 운영 DB 파괴 명령(\`DROP\`, \`DELETE FROM\` 전수), Git 강제 푸시(\`git push -f\`), 유료 API 외부 호출.

## 3. 작업별 특화 지침 (Selected Task Guidelines)
${rulesSections || '- 범용 웹 개발 표준 규칙을 준수합니다.'}

## 4. 계획 수립 및 자가 치유 원칙 (Self-Healing)
- **계획 수립 (Planning)**: 3개 이상의 파일을 수정하는 복잡한 작업은 코드를 작성하기 전에 어떤 파일을 어떻게 바꿀지 먼저 요약 보고할 것.
- **자가 치유 (Self-Healing)**: 터미널 명령어 실행 중 에러가 발생하면 멈추지 말고, 에러 로그를 읽고 원인을 파악하여 스스로 1차 수정 시도할 것.
- **최종 검증**: 작업 완료 선언 전 반드시 빌드(\`npm run build\`) 또는 테스트를 정상 통과했음을 증명할 것.`;
  }, [activeTools, isGrokSelected, rulesSections]);

  // Dynamically assemble CLAUDE.md
  const dynamicClaudeMd = useMemo(() => {
    if (isClaudeSelected && !isOtherToolsSelected) {
      return `# CLAUDE.md - Claude Code 전용 마스터 지침
## 1. 빌드 및 테스트 명령어 (Commands)
- 개발 서버 실행: \`npm run dev\`
- 빌드 검증: \`npm run build\`
- 단위 테스트 실행: \`npm test\`
- 린트 및 포맷팅: \`npm run lint\`

## 2. 작업별 특화 지침 (Selected Guidelines)
${rulesSections || '- 범용 웹 개발 표준 규칙을 준수합니다.'}

## 3. 워크플로우 및 검증 원칙 (Workflow)
- **사후 검증**: 파일 수정 후 반드시 \`npm run build\`로 타입/빌드 오류가 없는지 확인할 것.
- **기존 코드 보존**: 관련 없는 기존 주석이나 코드를 임의로 삭제하지 말 것.
- **보안**: API 시크릿 키나 비밀번호를 코드에 직접 하드코딩하지 말 것.`;
    }

    return `# CLAUDE.md

## Project Working Agreements & Unified Instructions
All project commands, architectural guidelines, code standards, and execution permissions are centrally defined in:
- @AGENTS.md
- @DESIGN.md

Please read and strictly adhere to @AGENTS.md for all build/test commands and coding workflows.`;
  }, [isClaudeSelected, isOtherToolsSelected, rulesSections]);

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

    // 1. Instructions Files
    if (isClaudeSelected && !isOtherToolsSelected) {
      list.push({
        key: 'CLAUDE.md',
        filename: 'CLAUDE.md',
        path: 'CLAUDE.md',
        description: `Claude Code 단독 마스터 지침 (${activeModules.length}개 규칙 직접 내장)`,
        content: dynamicClaudeMd
      });
    } else {
      list.push({
        key: 'AGENTS.md',
        filename: 'AGENTS.md',
        path: 'AGENTS.md',
        description: `통합 마스터 지침 (${activeTools.length}개 AI 도구 공용, ${activeModules.length}개 규칙 포함)`,
        content: dynamicAgentsMd
      });

      if (isClaudeSelected) {
        list.push({
          key: 'CLAUDE.md',
          filename: 'CLAUDE.md',
          path: 'CLAUDE.md',
          description: 'AGENTS.md를 참조하는 클로드 코드 전용 3줄 마스터 포인터',
          content: dynamicClaudeMd
        });
      }
    }

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

    // 4. Extra files (DESIGN.md, rules/...)
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

    // 5. Skill files (skills/...)
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
    isClaudeSelected, 
    isOtherToolsSelected, 
    activeTools.length, 
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
      const readmeContent = `# 맞춤형 AI 개발 하네스 패키지 (Custom AI Development Harness)
> 생성 일시: ${new Date().toLocaleDateString('ko-KR')}
> 선택된 AI 도구 (${activeTools.length}개): ${activeTools.map(t => t.name).join(', ')}
> 선택된 실무 기능 (${activeModules.length}개): ${activeModules.map(m => m.name).join(', ')}

---

## 📂 압축 해제 후 폴더 구조
${dynamicFilesList.map(f => `- **${f.path}**: ${f.description}`).join('\n')}

---

## 🚀 사용 방법
1. 압축을 풀고 이 파일들을 내 프로젝트 **루트(최상위) 폴더**에 덮어씌웁니다.
2. 만약 \`.env.example\` 파일이 있다면, \`.env\` 로 이름을 바꾸고 본인의 GitHub 토큰이나 DB 주소를 입력합니다.
3. 터미널에서 Claude Code (\`claude\`) 또는 Google Antigravity를 실행하면 자동으로 규칙과 MCP가 적용됩니다!`;

      zip.file('README.md', readmeContent);

      // Generate blob and trigger download
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-harness-custom-${activeTools.length}tools-${activeModules.length}features.zip`;
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
                개발 환경 맞춤 설정 & 실시간 ZIP 패키지 다운로드
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              사용할 AI 도구와 필요한 실무 기능을 체크하시면, <strong>스킬/도구 자동 라우터, 교과 활동지, 기획서, 지침서(AGENTS.md/CLAUDE.md), mcp.json, skills/ 교본, rules/ 정책 파일</strong>이 실시간 조립되어 원클릭 ZIP으로 다운로드됩니다.
            </p>
          </div>

          <button
            onClick={downloadCustomHarnessZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/40 transition-all scale-102 shrink-0 self-start md:self-auto border border-emerald-400/40"
          >
            {isZipping ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            <span>맞춤 환경 ZIP 일괄 다운로드 ({dynamicFilesList.length}개 파일)</span>
          </button>
        </div>

        {/* Live Indicator Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300">
            선택된 도구: <strong className="text-indigo-400">{activeTools.length}개</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300">
            선택된 실무 기능: <strong className="text-emerald-400">{activeModules.length}개</strong>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300">
            조립된 MCP: <strong className="text-teal-400">{counts.mcps}개</strong> (무설정 {counts.zeroConfigMcps} / 키필요 {counts.authRequiredMcps})
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300">
            생성될 파일: <strong className="text-amber-400">{dynamicFilesList.length}개</strong>
          </span>
        </div>
      </div>

      {/* STEP 1: Multi-Select AI Tools Catalog */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                STEP 01
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" /> 사용할 AI 개발 도구를 선택하세요 (다중 선택 가능)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              체크한 도구들의 특성에 맞춰 지침서 헤더와 포인터 파일(CLAUDE.md / AGENTS.md)이 자동으로 구성됩니다.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={setToolPresetClaudeAntigravity}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              추천: Claude + Antigravity
            </button>
            <button
              onClick={setToolPresetClaudeCodex}
              className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
            >
              Claude + Codex
            </button>
            <button
              onClick={setToolPresetClaudeOnly}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            >
              Claude Code 단독
            </button>
            <button
              onClick={selectAllTools}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체
            </button>
          </div>
        </div>

        {/* Dynamic Tool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_TOOLS_CATALOG.map((tool: AiToolItem) => {
            const isChecked = selectedToolIds.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border select-none space-y-3 ${
                  isChecked
                    ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 text-white shadow-lg border-indigo-500/60 scale-101 ring-1 ring-indigo-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                  <div className="text-indigo-400">
                    {isChecked ? <CheckSquare className="w-5 h-5 text-indigo-400" /> : <Square className="w-5 h-5 text-slate-600" />}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {tool.name}
                  </h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-cyan-300 font-mono">
                  💡 {tool.ruleHint}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Multi-Select Practical Tasks Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                STEP 02
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-400" /> 내가 만들 서비스에 필요한 실무 기능을 체크하세요 (중복 선택 가능)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              체크하신 기능에 맞춰 AI가 엉뚱한 코드를 짜지 않도록 맞춤 지침서(AGENTS.md), 외부 연결 도구(mcp.json), 자동화 매뉴얼(skills/)이 실시간 조립됩니다.
            </p>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={applyScenarioSmartRouter}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              🧭 도구 자동 라우터
            </button>
            <button
              onClick={applyScenarioLessonWorksheet}
              className="px-2.5 py-1 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/40 font-bold transition-all"
            >
              🏫 수업 활동지·시험지
            </button>
            <button
              onClick={applyScenarioReviewWorksheet}
              className="px-2.5 py-1 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 font-bold transition-all"
            >
              🎬 영화·도서 감상문
            </button>
            <button
              onClick={applyScenarioClassActivity}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all"
            >
              🎯 학급 뽑기·스티커판
            </button>
            <button
              onClick={applyScenarioSnsMarketing}
              className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
            >
              📝 SNS 카드뉴스·글
            </button>
            <button
              onClick={applyScenarioDutchPay}
              className="px-2.5 py-1 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 font-bold transition-all"
            >
              💰 모임 정산·가계부
            </button>
            <button
              onClick={applyScenarioEdu}
              className="px-2.5 py-1 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/40 font-bold transition-all"
            >
              📚 교육용 단어장·퀴즈
            </button>
            <button
              onClick={applyScenarioFullstack}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              🚀 1인 풀스택 (웹+DB)
            </button>
            <button
              onClick={applyScenarioFrontend}
              className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
            >
              🎨 화면 디자인
            </button>
            <button
              onClick={applyScenarioDashboard}
              className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-bold transition-all"
            >
              📈 차트·대시보드
            </button>
            <button
              onClick={applyScenarioGame}
              className="px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 font-bold transition-all"
            >
              🎮 2D 미니게임
            </button>
            <button
              onClick={applyScenarioAiChat}
              className="px-2.5 py-1 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/40 font-bold transition-all"
            >
              🤖 AI 챗봇
            </button>
            <button
              onClick={selectAllTasks}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체 선택
            </button>
            <button
              onClick={clearAllTasks}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체 해제
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Live Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['ALL', '스킬/MCP 자동추천', '초중고 수업/활동지', '독서/문화/글쓰기', '학급/모임/도구', '교육/학습용', '데이터/시각화', '비즈니스/문서', '게임/시뮬레이션', 'AI챗봇/어시스턴트', '프론트엔드/UI', '백엔드/DB', '보안/결제', '협업/DevOps', '데이터/자동화'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat === 'ALL' ? '전체 보기' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>실시간 구성:</span>
            <span className="text-indigo-300 font-bold">도구 {activeTools.length}개</span>
            <span>•</span>
            <span className="text-emerald-300 font-bold">기능 {activeModules.length}개</span>
            <span>•</span>
            <span className="text-teal-300 font-bold">외부 도구(MCP) {counts.mcps}개 (무설정 {counts.zeroConfigMcps} / 키필요 {counts.authRequiredMcps})</span>
          </div>
        </div>

        {/* Dynamic Checklist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3.5">
          {displayedModules.map((module: TaskFeatureModule) => {
            const isChecked = selectedModuleIds.includes(module.id);
            return (
              <div
                key={module.id}
                onClick={() => toggleTaskModule(module.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border select-none space-y-2.5 ${
                  isChecked
                    ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 text-white shadow-lg border-emerald-500/60 scale-101 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${module.badgeColor}`}>
                    {module.category}
                  </span>
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
                  {module.detailedImpact.policyPath && (
                    <div className="flex items-center gap-1 text-rose-300">
                      <span>📜 안전규칙:</span>
                      <span className="truncate">{module.detailedImpact.policyPath}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MCP Key & Connection Guide Callout */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Plug className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">
            🔌 MCP 도구 연결 및 API 키 가이드 (무설정 vs 키 필요)
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              🟢 무설정 MCP (즉시 실행형 - No Key)
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Puppeteer 브라우저, Filesystem 탐색</strong> 등은 별도의 유료 API 키나 계정 연동 없이, 다운로드된 \`mcp.json\` 설정 그대로 컴퓨터에서 100% 즉시 동작합니다.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1.5">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              🔑 인증 필요 MCP (환경변수 연결형)
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>GitHub PR 자동화, PostgreSQL DB</strong> 등은 동봉된 <strong className="text-cyan-300">.env.example</strong>을 \`.env\`로 복사 후 본인의 GitHub 토큰이나 로컬 DB URL만 1줄 입력해주시면 안전하게 연결됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* STEP 3: Real-Time Generated Files Preview & Live Code Inspector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                STEP 03
              </span>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-cyan-400" /> 실시간 생성 파일 뷰어 & 코드 검사기
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              선택한 도구와 기능에 따라 실시간으로 조립된 실제 파일 내용을 직접 확인하고 개별 복사할 수 있습니다.
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

      {/* Scaffold Guide for New Projects */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
        <div className="space-y-2 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              {NEW_PROJECT_SCAFFOLD_GUIDE.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            {NEW_PROJECT_SCAFFOLD_GUIDE.summary}
          </p>
        </div>

        {/* 4 Scaffold Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {NEW_PROJECT_SCAFFOLD_GUIDE.steps.map((st) => (
            <div
              key={st.stepNumber}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {st.stepNumber}
                </span>
                <h5 className="font-extrabold text-white text-xs">{st.title}</h5>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {st.action}
              </p>
              <span className="text-[10px] font-mono text-indigo-300 block pt-1 border-t border-slate-800">
                📄 산출물: {st.outputFile}
              </span>
            </div>
          ))}
        </div>

        {/* Copyable Scaffold Prompt */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 빈 프로젝트 시작 시 AI에게 붙여넣을 한 줄 프롬프트
            </span>
            <button
              onClick={() => handleCopy('scaffold-prompt', NEW_PROJECT_SCAFFOLD_GUIDE.copyableScaffoldPrompt, '스캐폴딩 프롬프트')}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow"
            >
              {copiedId === 'scaffold-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>프롬프트 복사</span>
            </button>
          </div>
          <p className="text-xs font-mono text-slate-200 bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
            {NEW_PROJECT_SCAFFOLD_GUIDE.copyableScaffoldPrompt}
          </p>
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
