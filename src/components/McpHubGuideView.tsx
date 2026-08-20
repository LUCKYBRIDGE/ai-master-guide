import React, { useState, useMemo } from 'react';
import { MCP_HUB_SERVERS, McpServerItem } from '../data/mcpHubData';
import { 
  Plug, 
  Terminal, 
  Key, 
  Copy, 
  Check, 
  Zap, 
  ShieldCheck, 
  Database, 
  Globe, 
  FolderTree, 
  GitPullRequest, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  Code2,
  FileCode,
  Layers,
  Sparkles,
  Bot,
  BrainCircuit,
  Container,
  Search,
  MessageSquareQuote
} from 'lucide-react';

interface McpHubGuideViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const McpHubGuideView: React.FC<McpHubGuideViewProps> = ({ onCopy }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabByServer, setActiveTabByServer] = useState<Record<string, 'claude' | 'json' | 'npx'>>({});

  const handleCopyCode = (id: string, text: string, title: string) => {
    if (onCopy) {
      onCopy(text, title);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredServers = useMemo(() => {
    return MCP_HUB_SERVERS.filter(s => {
      const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.koreanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getActiveTab = (serverId: string) => activeTabByServer[serverId] || 'claude';
  const setActiveTab = (serverId: string, tab: 'claude' | 'json' | 'npx') => {
    setActiveTabByServer(prev => ({ ...prev, [serverId]: tab }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Plug className="w-5 h-5 text-teal-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                공식 출처로 검증한 MCP 설정 & 활용 가이드
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              2026-08-20 기준으로 <strong>공식 제작사 서버와 MCP reference server</strong>만 선별했습니다. 설치 명령, Antigravity 설정 예시, 안전한 업무 요청문과 공식 출처를 함께 확인할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono shrink-0">
            <span className="text-emerald-400 font-bold">🟢 API 키 불필요</span>
            <span>•</span>
            <span className="text-teal-400 font-bold">🔑 .env 키 필요</span>
          </div>
        </div>
      </div>

      {/* 1. MCP vs Skill vs Subagent Clear Distinction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">1. 서브에이전트 (Subagent)</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              도구별 지원 확인
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            프론트·DB처럼 역할과 작업 범위를 나눠 실행하는 에이전트입니다. 지원 방식과 설정 파일은 제품마다 다르며, <code className="text-indigo-300">AGENTS.md</code> 하나만으로 모든 도구가 자동 실행되는 것은 아닙니다.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-950 border border-amber-500/30 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <FileCode className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">2. 스킬 (Skill)</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              클라이언트별 경로 확인
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Git PR 작성, DB 마이그레이션 같은 <strong>재사용 작업 지침</strong>입니다. 스킬 경로·형식·자동 발견 여부는 사용하는 에이전트의 공식 문서를 확인해야 합니다.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-950 border border-teal-500/40 space-y-2.5 ring-1 ring-teal-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-400">
              <Plug className="w-5 h-5" />
              <h4 className="font-bold text-sm text-white">3. MCP (외부 도구 커넥터)</h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
              터미널/환경변수 연결
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            브라우저·파일·외부 서비스 도구를 에이전트에 연결하는 표준 프로토콜입니다. 서버 설치 외에도 클라이언트 등록, 인증, 접근 권한 검토가 필요합니다.
          </p>
        </div>
      </div>

      {/* 2. Search & Category Filter Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="MCP 이름, 용도, 키워드 검색 (예: 브라우저, DB, PR, 메모리...)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['ALL', '로컬 실행/무키', '파일/데이터', '개발/협업', '웹/검색', '지속기억/메모리'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {cat === 'ALL' ? '전체 보기' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Verified MCP Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredServers.map((server: McpServerItem) => {
          const currentTab = getActiveTab(server.id);
          return (
            <div
              key={server.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-xl hover:border-slate-700 transition-all"
            >
              {/* Header & Badges & External Links */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-850">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      {server.id === 'mcp-playwright' && <Globe className="w-5 h-5 text-purple-400" />}
                      {server.id === 'mcp-github' && <GitPullRequest className="w-5 h-5 text-indigo-400" />}
                      {server.id === 'mcp-filesystem' && <FolderTree className="w-5 h-5 text-emerald-400" />}
                      {server.id === 'mcp-memory' && <BrainCircuit className="w-5 h-5 text-purple-400" />}
                      {server.id === 'mcp-fetch' && <Globe className="w-5 h-5 text-amber-400" />}
                      {server.id === 'mcp-brave-search' && <Zap className="w-5 h-5 text-amber-400" />}
                      {server.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">({server.koreanName})</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono ${server.badgeColor}`}>
                      {server.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {server.description}
                  </p>
                </div>

                {/* Links Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
                  <a
                    href={server.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-850"
                  >
                    <span>GitHub 공식 소스</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={server.officialDocUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 text-xs font-mono transition-all border border-teal-500/30"
                  >
                    <span>공식 문서</span>
                    <ExternalLink className="w-3 h-3 text-teal-300" />
                  </a>
                </div>
              </div>

              {/* Why Use Box */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                <span className="text-teal-400 font-bold shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 실무 도입 효과:
                </span>
                <span>{server.whyUse}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] leading-relaxed">
                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-100">
                  <strong className="block text-emerald-300 mb-1">유지관리 상태</strong>
                  {server.sourceStatus}
                </div>
                <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-amber-100">
                  <strong className="block text-amber-300 mb-1">설치·보안 주의</strong>
                  {server.setupNote}
                </div>
              </div>

              {/* SECTION A: Terminal Installation & Setup Commands */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab(server.id, 'claude')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                        currentTab === 'claude'
                          ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Claude Code CLI (claude mcp add)
                    </button>
                    <button
                      onClick={() => setActiveTab(server.id, 'json')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                        currentTab === 'json'
                          ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      Antigravity mcp_config.json
                    </button>
                    <button
                      onClick={() => setActiveTab(server.id, 'npx')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                        currentTab === 'npx'
                          ? 'bg-cyan-600/30 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      서버 직접 실행
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const text = currentTab === 'claude' 
                        ? server.claudeCodeCommand 
                        : currentTab === 'json' 
                          ? server.antigravityMcpJson 
                          : server.terminalInstallCommand;
                      handleCopyCode(`cmd-${server.id}-${currentTab}`, text, `${server.name} 명령어`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-mono transition-all border border-slate-750 self-start sm:self-auto"
                  >
                    {copiedId === `cmd-${server.id}-${currentTab}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === `cmd-${server.id}-${currentTab}` ? '복사됨!' : '명령어 복사'}</span>
                  </button>
                </div>

                <pre className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                  {currentTab === 'claude' && server.claudeCodeCommand}
                  {currentTab === 'json' && server.antigravityMcpJson}
                  {currentTab === 'npx' && server.terminalInstallCommand}
                </pre>
              </div>

              {/* Environment Variable Requirement Callout (if needed) */}
              {server.envExample && (
                <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1 font-mono">
                      <Key className="w-3.5 h-3.5" /> .env 파일에 추가할 환경변수:
                    </span>
                    <button
                      onClick={() => handleCopyCode(`env-${server.id}`, server.envExample || '', `${server.name} .env`)}
                      className="text-[11px] text-amber-400 hover:text-amber-200 font-mono underline"
                    >
                      {copiedId === `env-${server.id}` ? '복사됨!' : '.env 복사'}
                    </button>
                  </div>
                  <pre className="p-2 rounded-xl bg-slate-950 font-mono text-[11px] text-amber-200 overflow-x-auto">
                    {server.envExample}
                  </pre>
                </div>
              )}

              {/* SECTION B: AI에게 일 시키는 실제 업무 지시문 (AI Work Prompts) */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">
                    💬 AI에게 입력할 실제 업무 요청 프롬프트 (클릭해서 복사 후 AI에게 전송):
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {server.aiWorkPrompts.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300 text-xs font-mono">
                            예시 {idx + 1}. {item.title}
                          </span>
                          <button
                            onClick={() => handleCopyCode(
                              `prompt-${server.id}-${idx}`,
                              item.prompt,
                              `${server.name} ${item.title}`
                            )}
                            className="flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-[11px] font-mono transition-all border border-indigo-500/30"
                          >
                            {copiedId === `prompt-${server.id}-${idx}` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedId === `prompt-${server.id}-${idx}` ? '복사됨!' : '프롬프트 복사'}</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                          "{item.prompt}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
