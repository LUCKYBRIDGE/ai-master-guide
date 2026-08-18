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
  HelpCircle
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

  // Task Quick Scenarios
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
      'mod-postgres-db', 
      'mod-git-pr-skill'
    ]);
  };

  const applyScenarioEdu = () => {
    setSelectedModuleIds([
      'mod-edu-quiz',
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

  const selectAllTasks = () => setSelectedModuleIds(TASK_FEATURE_MODULES.map(m => m.id));
  const clearAllTasks = () => setSelectedModuleIds([]);

  // Active selected tools and tasks
  const activeTools = useMemo(() => {
    return AI_TOOLS_CATALOG.filter(t => selectedToolIds.includes(t.id));
  }, [selectedToolIds]);

  const activeModules = useMemo(() => {
    return TASK_FEATURE_MODULES.filter(m => selectedModuleIds.includes(m.id));
  }, [selectedModuleIds]);

  // Filtered task modules displayed in checklist
  const displayedModules = useMemo(() => {
    if (selectedCategory === 'ALL') return TASK_FEATURE_MODULES;
    return TASK_FEATURE_MODULES.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  // Counts of generated artifacts
  const counts = useMemo(() => {
    let mcps = 0;
    let zeroConfigMcps = 0;
    let authRequiredMcps = 0;
    let skills = 0;
    let policies = 0;
    activeModules.forEach(m => {
      if (m.mcpServer) {
        mcps++;
        if (m.mcpServer.mcpType === 'zero-config') zeroConfigMcps++;
        else authRequiredMcps++;
      }
      if (m.skillFile) skills++;
      if (m.extraFile && m.extraFile.path.startsWith('rules/')) policies++;
    });
    return { mcps, zeroConfigMcps, authRequiredMcps, skills, policies, totalRules: activeModules.length };
  }, [activeModules]);

  // Tool Strategy Calculation
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
      ? '- **xAI Grok Build 최적화**: 최소한의 스텝(Minimum Steps)으로 파일 작성과 터미널 검증을 신속히 완료할 것.' 
      : '- **자율 실행 허용**: 소스코드 파일 편집, 패키지 설치(`npm i`), 빌드/테스트 실행(`npm test`, `npm run build`).';

    return `# AGENTS.md - 통합 자율 코딩 에이전트 지침
> 대상 도구: ${toolsNames || '범용 자율 AI 에이전트'}

## 1. 빌드 및 테스트 명령어 (Commands)
- 개발 서버 실행: \`npm run dev\`
- 빌드 검증: \`npm run build\`
- 단위 테스트 실행: \`npm test\`
- 린트 및 포맷팅: \`npm run lint\`

## 2. 에이전트 기본 역할 및 권한 경계 (Role & Permissions)
- **기본 역할**: 사용자의 지시에 따라 프로젝트 파일 생성, 수정, 터미널 빌드/테스트를 자율 수행하는 시니어 엔지니어.
${grokTip}
- **사용자 승인 필수**: 운영 DB 파괴 명령(\`DROP\`, \`DELETE FROM\` 전수), Git 강제 푸시(\`git push -f\`), 외부 유료 API 키 노출.

## 3. 작업별 특화 지침 (Selected Task Guidelines)
${rulesSections || '- 범용 웹/앱 개발 표준 규칙을 준수합니다.'}

## 4. 계획 수립 및 자가 치유 원칙 (Self-Healing)
- **계획 수립 (Planning)**: 3개 이상의 파일을 수정하는 복잡한 작업은 코드를 작성하기 전에 어떤 파일을 어떻게 바꿀지 먼저 요약 보고할 것.
- **자가 치유 (Self-Healing)**: 터미널 명령어 실행 중 에러가 발생하면 멈추지 말고, 에러 로그를 읽고 원인을 파악하여 스스로 1차 수정 시도할 것.
- **최종 검증**: 작업 완료 선언 전 반드시 빌드(\`npm run build\`) 또는 테스트가 정상 통과했음을 증명할 것.`;
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
${rulesSections || '- 범용 웹/앱 개발 표준 규칙을 준수합니다.'}

## 3. 워크플로우 및 검증 원칙 (Workflow)
- **자가 검증**: 파일 수정 후 반드시 \`npm run build\`로 타입/빌드 오류가 없는지 확인할 것.
- **기존 코드 보존**: 관련 없는 기존 주석이나 코드를 임의로 삭제하지 말 것.
- **보안**: API 시크릿 키나 비밀번호를 코드에 절대 하드코딩하지 말 것.`;
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
      '# 본 파일을 .env 로 복사한 뒤 실제 값을 입력하세요.',
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
          description: 'AGENTS.md를 참조하는 클로드 코드 전용 3줄 싱글 소스 포인터',
          content: dynamicClaudeMd
        });
      }
    }

    // 2. mcp.json
    list.push({
      key: 'mcp.json',
      filename: 'mcp.json',
      path: 'mcp.json',
      description: `선택한 ${counts.mcps}개 전용 MCP 서버 설정 (무설정 ${counts.zeroConfigMcps}개 + 키필요 ${counts.authRequiredMcps}개)`,
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
  }, [isClaudeSelected, isOtherToolsSelected, activeTools, activeModules, dynamicAgentsMd, dynamicClaudeMd, dynamicMcpJson, dynamicEnvExample, counts]);

  // Ensure currently selected file exists
  const activeViewedFile = dynamicFilesList.find(f => f.key === selectedFileKey) || dynamicFilesList[0];

  const handleCopyCode = (id: string, code: string, title: string) => {
    if (onCopy) {
      onCopy(code, title);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSingleFile = (filename: string, content: string) => {
    const cleanFilename = filename.replace(/\//g, '_');
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', cleanFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Dynamically package custom ZIP with clean root structure (NO .gemini/ folders)
  const handleDownloadCustomZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Root folder: ai_dev/
      const aiDevFolder = zip.folder('ai_dev');
      if (!aiDevFolder) return;

      // Add dynamic files into standard clean folders (rules/, skills/, root)
      dynamicFilesList.forEach(file => {
        if (file.path.includes('/')) {
          const parts = file.path.split('/');
          const fileOnly = parts.pop()!;
          let currentFolder = aiDevFolder;
          parts.forEach(part => {
            currentFolder = currentFolder.folder(part) || currentFolder;
          });
          currentFolder.file(fileOnly, file.content);
        } else {
          aiDevFolder.file(file.path, file.content);
        }
      });

      // Add tailored README.md
      aiDevFolder.file('README.md', `# ai_dev - 맞춤형 AI 개발 환경 패키지

## 1. 선택한 AI 도구 (${activeTools.length}개)
${activeTools.map(t => `- ${t.name} (${t.vendor}): ${t.description}`).join('\n')}

## 2. 선택된 실무 작업 모듈 (${activeModules.length}개)
${activeModules.map(m => `- ${m.name}: ${m.shortDesc}`).join('\n')}

## 3. 🔌 MCP 서버 연결 안내 (${counts.mcps}개)
- 🟢 **무설정 MCP (즉시 실행)**: ${counts.zeroConfigMcps}개 (Puppeteer, Filesystem 등 - 별도 키 없이 압축 풀면 바로 작동)
- 🔑 **인증 필요 MCP (1회 설정)**: ${counts.authRequiredMcps}개 (GitHub, PostgreSQL 등 - 동봉된 \`.env.example\`을 \`.env\`로 복사 후 본인 토큰/DB URL 입력)

## 4. 생성된 파일 구성 (클린 루트 구조 - No .gemini)
${dynamicFilesList.map(f => `- ${f.path}: ${f.description}`).join('\n')}

## 5. 신규 하위 프로젝트(apps/) 생성 방법
1. \`ai_dev/apps/my-app/\` 폴더를 생성합니다.
2. 에이전트 채팅창에 "신규 프로젝트 초기화 프롬프트"를 전달합니다.
3. AI가 상위 \`ai_dev/AGENTS.md\`를 상속받아 해당 하위 폴더 전용 \`AGENTS.md\` 및 \`DESIGN.md\`를 자동 생성합니다.`);

      // Generate and download zip
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ai_dev_custom_${activeTools.length}tools_${activeModules.length}tasks.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Custom ZIP generation failed:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sliders className="w-5 h-5 text-emerald-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI 도구 & 실무 작업 완전 자유 중복 필터 빌더 & ZIP 다운로드
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              <strong>내가 쓸 AI 도구들(Claude, Antigravity, Cursor, Codex, Grok 등)을 중복 체크</strong>하고, <strong>내가 할 실무 작업들을 중복 체크</strong>하면 필요한 지침(AGENTS/CLAUDE), MCP(무설정/인증형 자동분리), 스킬이 <strong>클린 루트 표준(No .gemini)</strong>으로 자동 조립되어 다운로드됩니다.
            </p>
          </div>

          {/* Master Dynamic ZIP Download Button */}
          <button
            onClick={handleDownloadCustomZip}
            disabled={isZipping || activeTools.length === 0 || activeModules.length === 0}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xl shadow-emerald-600/30 self-start md:self-auto border border-emerald-400/30 disabled:opacity-50"
          >
            <FolderArchive className="w-5 h-5" />
            <span>{isZipping ? '압축 생성 중...' : `💾 [선택된 ${activeTools.length}개 도구 + ${activeModules.length}개 작업] ZIP 다운로드`}</span>
          </button>
        </div>
      </div>

      {/* STEP 1: Multi-Select AI Tools Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/40 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                STEP 01
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" /> 사용할 AI 코딩 도구들을 체크하세요 (중복 선택 가능)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              선택한 도구 조합에 따라 AGENTS.md(마스터)와 CLAUDE.md(포인터) 파일이 자동으로 최적화됩니다.
            </p>
          </div>

          {/* Quick Tool Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={setToolPresetClaudeAntigravity}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              클로드 코드 + 안티그래비티
            </button>
            <button
              onClick={setToolPresetClaudeCodex}
              className="px-2.5 py-1 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 font-bold transition-all"
            >
              클로드 코드 + 코덱스
            </button>
            <button
              onClick={setToolPresetClaudeOnly}
              className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
            >
              클로드 코드 단독
            </button>
            <button
              onClick={setToolPresetAntigravityCodex}
              className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold transition-all"
            >
              안티그래비티 + 코덱스
            </button>
            <button
              onClick={setToolPresetGrok}
              className="px-2.5 py-1 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 font-bold transition-all"
            >
              그록 빌드
            </button>
            <button
              onClick={selectAllTools}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체 선택
            </button>
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {AI_TOOLS_CATALOG.map((tool: AiToolItem) => {
            const isChecked = selectedToolIds.includes(tool.id);
            return (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border select-none space-y-2 flex flex-col justify-between ${
                  isChecked
                    ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xl border-indigo-400 scale-101 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                    <div className="text-emerald-400">
                      {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-600" />}
                    </div>
                  </div>

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
                <CheckSquare className="w-5 h-5 text-emerald-400" /> 처리할 실무 작업을 체크하세요 (중복 선택 가능)
              </h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              선택한 작업에 따라 지침 규칙, mcp.json 커넥터, skills/ 교본, rules/ 정책 파일이 실시간 조립됩니다.
            </p>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={applyScenarioFullstack}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              🚀 1인 풀스택
            </button>
            <button
              onClick={applyScenarioFrontend}
              className="px-2.5 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold transition-all"
            >
              🎨 프론트엔드
            </button>
            <button
              onClick={applyScenarioEdu}
              className="px-2.5 py-1 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 border border-yellow-500/40 font-bold transition-all"
            >
              📚 교육용 앱
            </button>
            <button
              onClick={applyScenarioDocs}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold transition-all"
            >
              📄 기획·문서화
            </button>
            <button
              onClick={applyScenarioDashboard}
              className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 font-bold transition-all"
            >
              📈 데이터 차트
            </button>
            <button
              onClick={applyScenarioBackend}
              className="px-2.5 py-1 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 font-bold transition-all"
            >
              ⚙️ 백엔드/결제
            </button>
            <button
              onClick={applyScenarioData}
              className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 font-bold transition-all"
            >
              📊 데이터분석
            </button>
            <button
              onClick={selectAllTasks}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              전체
            </button>
            <button
              onClick={clearAllTasks}
              className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              해제
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Live Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['ALL', '프론트엔드/UI', '교육/학습용', '비즈니스/문서', '데이터/시각화', '백엔드/DB', '보안/결제', '협업/DevOps'].map(cat => (
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
            <span className="text-emerald-300 font-bold">규칙 {activeModules.length}개</span>
            <span>•</span>
            <span className="text-teal-300 font-bold">MCP {counts.mcps}개 (무설정 {counts.zeroConfigMcps} / 키필요 {counts.authRequiredMcps})</span>
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
                      <span>🔌 MCP: {module.detailedImpact.mcpServerName}</span>
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
                      <span>📜 스킬:</span>
                      <span>{module.detailedImpact.skillPath}</span>
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

      {/* STEP 3: Dynamically Assembled File Viewer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-emerald-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                클린 루트 구조 (No .gemini)
              </span>
              <span className="text-xs text-slate-400">
                선택된 <strong className="text-indigo-300">{activeTools.length}개 AI 도구</strong> + <strong className="text-emerald-300">{activeModules.length}개 작업</strong> 기준 총 <strong className="text-cyan-300">{dynamicFilesList.length}개 파일</strong>이 실시간 조합되었습니다.
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
              🛠️ 실시간 조합된 파일 미리보기
            </h4>
          </div>

          {/* Dynamic Files Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar self-start lg:self-auto">
            {dynamicFilesList.map(file => (
              <button
                key={file.key}
                onClick={() => setSelectedFileKey(file.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border whitespace-nowrap ${
                  activeViewedFile.key === file.key
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                📄 {file.filename}
              </button>
            ))}
          </div>
        </div>

        {/* Selected File Details & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <div className="space-y-0.5">
            <span className="text-white font-mono font-bold">{activeViewedFile.path}</span>
            <p className="text-[11px] text-slate-400">{activeViewedFile.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCopyCode(`dyn-file-${activeViewedFile.key}`, activeViewedFile.content, activeViewedFile.filename)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700"
            >
              {copiedId === `dyn-file-${activeViewedFile.key}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === `dyn-file-${activeViewedFile.key}` ? '복사됨!' : '내용 복사'}</span>
            </button>

            <button
              onClick={() => handleDownloadSingleFile(activeViewedFile.filename, activeViewedFile.content)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{activeViewedFile.filename.split('/').pop()} 다운로드</span>
            </button>
          </div>
        </div>

        {/* Live File Content Viewer */}
        <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-[580px] min-h-[220px] whitespace-pre-wrap">
          {activeViewedFile.content}
        </pre>
      </div>

      {/* 4. AI 3-Pillars Concept Guide: Agent vs MCP vs Skill */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" /> AI 개발 3대 기둥: 에이전트 vs MCP vs 스킬
          </span>
          <span className="text-xs text-emerald-400 font-mono">Core Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MCP_SKILL_AGENT_CONCEPTS.map((concept: McpSkillAgentSummary) => (
            <div key={concept.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                    {concept.id === 'concept-agent' && <Bot className="w-5 h-5 text-indigo-400" />}
                    {concept.id === 'concept-mcp' && <Plug className="w-5 h-5 text-teal-400" />}
                    {concept.id === 'concept-skill' && <BookOpen className="w-5 h-5 text-amber-400" />}
                    {concept.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">{concept.englishName}</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  {concept.role.split(' (')[0]}
                </span>
              </div>

              {/* Real-life Metaphor */}
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-snug">
                <span className="font-bold text-emerald-400 block mb-1">💡 비유로 이해하기:</span>
                {concept.metaphor}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {concept.description}
              </p>

              {/* Practical Example */}
              <div className="p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                <strong className="text-indigo-300 block mb-0.5">실제 활용 예시:</strong>
                {concept.practicalExample}
              </div>

              {/* Key Benefits */}
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                {concept.keyBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-850 text-[11px] text-slate-400 font-mono">
                관련 파일: <strong className="text-cyan-300">{concept.sampleFile}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Hierarchical New Project Creation Guide */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-emerald-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              신규 프로젝트 아키텍처
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-1 flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-emerald-400" /> {NEW_PROJECT_SCAFFOLD_GUIDE.title}
            </h4>
            <p className="text-xs text-slate-300">
              {NEW_PROJECT_SCAFFOLD_GUIDE.summary}
            </p>
          </div>
        </div>

        {/* Visual Folder Tree Diagram (Clean Standard, NO .gemini) */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
            <FolderTree className="w-4 h-4 text-indigo-400" /> 상속 구조 폴더 트리 맵 (클린 루트 구조):
          </span>
          <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {NEW_PROJECT_SCAFFOLD_GUIDE.hierarchyDiagram}
          </pre>
        </div>

        {/* 3 Step Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {NEW_PROJECT_SCAFFOLD_GUIDE.steps.map((step) => (
            <div key={step.stepNumber} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs text-emerald-400">{step.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">STEP 0{step.stepNumber}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{step.action}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                결과: <strong className="text-indigo-300">{step.outputFile}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Ready-to-copy New Project Scaffolding Prompt */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-400" /> 신규 프로젝트 생성 시 에이전트에 바로 실행할 초기화 프롬프트
              </span>
              <span className="text-[11px] text-slate-400">복사해서 터미널이나 에이전트 채팅창에 붙여넣으면 하위 설정 파일과 폴더가 즉시 자동 생성됩니다.</span>
            </div>

            <button
              onClick={() => handleCopyCode(
                'scaffold-prompt-copy',
                NEW_PROJECT_SCAFFOLD_GUIDE.copyableScaffoldPrompt,
                '신규 프로젝트 초기화 프롬프트'
              )}
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
            >
              {copiedId === 'scaffold-prompt-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'scaffold-prompt-copy' ? '복사됨!' : '초기화 프롬프트 복사'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {NEW_PROJECT_SCAFFOLD_GUIDE.copyableScaffoldPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
};
