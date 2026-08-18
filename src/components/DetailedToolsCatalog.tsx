import React, { useState, useMemo } from 'react';
import { DETAILED_TOOLS_DATA } from '../data/toolsDetailedData';
import { DetailedToolFeature } from '../types/ai';
import { 
  PlusCircle, 
  Paperclip, 
  BookOpen, 
  Image, 
  Globe, 
  SearchCode, 
  LayoutGrid, 
  Key, 
  Mail, 
  FolderGit2, 
  Film, 
  Terminal, 
  ExternalLink, 
  CalendarCheck, 
  SlidersHorizontal, 
  Sparkles, 
  GraduationCap,
  Briefcase,
  Layers
} from 'lucide-react';

export const DetailedToolsCatalog: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Paperclip': return <Paperclip className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Image': return <Image className="w-5 h-5 text-rose-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'SearchCode': return <SearchCode className="w-5 h-5 text-amber-400" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-purple-400" />;
      case 'Key': return <Key className="w-5 h-5 text-yellow-400" />;
      case 'Mail': return <Mail className="w-5 h-5 text-red-400" />;
      case 'FolderGit2': return <FolderGit2 className="w-5 h-5 text-emerald-400" />;
      case 'Film': return <Film className="w-5 h-5 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-orange-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const filteredTools = useMemo(() => {
    return DETAILED_TOOLS_DATA.filter((tool: DetailedToolFeature) => {
      const matchCompany = selectedCompany === 'all' || tool.company === selectedCompany;
      const matchCategory = selectedCategory === '전체' || tool.category === selectedCategory;
      const matchSearch = 
        !searchQuery ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.representativeOutput.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.bestUseCases.some((u: string) => u.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCompany && matchCategory && matchSearch;
    });
  }, [selectedCompany, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Intro Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <PlusCircle className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                4대 AI 세부 도구 · 플러그인 · 커넥터 도감
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              ChatGPT의 <strong>+ 메뉴(첨부, Visualize, Gmail, Drive, Deep Research)</strong>부터 Gemini Workspace, Claude Artifacts, Grok Build까지—<strong>어느 모드(Chat vs Work/Agent)에서 실행하느냐에 따른 사용량 판정</strong>과 활용법을 완벽히 정리했습니다.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-bold px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 self-start md:self-auto">
            <CalendarCheck className="w-4 h-4" />
            <span>2026.08.18 공식 문서 기준</span>
          </div>
        </div>

        {/* Core Principles & Color Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-purple-500/20 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-emerald-500/30 flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shrink-0"></div>
            <div>
              <span className="font-bold text-emerald-300">🟢 Chat 기본 한도</span>
              <p className="text-[10px] text-slate-400">일반 대화 플랜에서 안전하게 소비</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-blue-500/30 flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-400 shrink-0"></div>
            <div>
              <span className="font-bold text-blue-300">🔵 별도 도구 Quota</span>
              <p className="text-[10px] text-slate-400">이미지·Deep Research 전용 한도</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-amber-500/30 flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shrink-0"></div>
            <div>
              <span className="font-bold text-amber-300">🟠 Work/Codex 공용량</span>
              <p className="text-[10px] text-slate-400">Agentic 워크플로우 수행량 차감</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-rose-500/30 flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shrink-0"></div>
            <div>
              <span className="font-bold text-rose-300">🔴 API 별도 과금</span>
              <p className="text-[10px] text-slate-400">Platform 키 호출 시 종량제 과금</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Company Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">AI 생태계:</span>
          {[
            { id: 'all', label: '전체 도구' },
            { id: 'openai', label: 'OpenAI (ChatGPT/Work)' },
            { id: 'google', label: 'Google (Gemini/Workspace)' },
            { id: 'anthropic', label: 'Anthropic (Claude/Artifacts)' },
            { id: 'xai', label: 'xAI (Grok/Build)' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCompany(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCompany === c.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['전체', '파일/데이터', '미디어/시각화', '웹/심층리서치', '외부 앱 연동', '개발/에이전트'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTools.map((tool: DetailedToolFeature) => (
          <div
            key={tool.id}
            className="rounded-3xl glass-panel border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/40 hover:shadow-2xl transition-all group"
          >
            <div>
              {/* Card Top: Icon & Company Badge */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700/80 group-hover:scale-105 transition-transform shadow-inner">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">{tool.category}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  tool.company === 'openai' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                  tool.company === 'google' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                  tool.company === 'anthropic' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {tool.company}
                </span>
              </div>

              {/* Purpose & Output */}
              <div className="my-3 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">주요 용도</span>
                  <p className="text-slate-200 leading-relaxed">{tool.purpose}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-indigo-300">대표 산출물:</strong> {tool.representativeOutput}
                </div>
              </div>

              {/* Dual Usage Metering Box (Chat vs Work/Agent) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                {/* In Chat Mode */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">💬 Chat에서 실행 시</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-emerald-300 border border-emerald-500/30">
                      {tool.chatUsageType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tool.chatUsageNote}</p>
                </div>

                {/* In Work/Agent Mode */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">🤖 Work/Agent에서 실행 시</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-500/30">
                      {tool.workAgentUsageType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tool.workAgentUsageNote}</p>
                </div>
              </div>

              {/* Interactive Highlight (if any) */}
              {tool.interactiveFeature && (
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span><strong>인터랙티브 기능:</strong> {tool.interactiveFeature}</span>
                </div>
              )}

              {/* Best Use Cases */}
              <div className="space-y-1.5 my-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  추천 실무/교육 활용처
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {tool.bestUseCases.map((useCase: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer: Limits & Official Link */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-400">
                <strong className="text-slate-300">규격/용량:</strong> {tool.limitsAndStorage}
              </span>
              <a
                href={tool.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 shrink-0"
              >
                <span>공식 가이드</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scenarios Recommendation Section */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              실무 & 수업자료 제작 상황별 최적 도구 가이드
            </h3>
            <p className="text-xs text-slate-400">
              하려는 작업 목적에 따라 가장 가성비 높고 효과적인 AI 도구를 매칭해 드립니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> 1. 최신 속보 및 빠른 사실 확인
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>추천:</strong> <code>🌐 OpenAI 웹 검색</code> 또는 <code>🐦 Grok Real-time X</code><br />
              • 일반 Chat 한도만 소비하며 Codex/Agent 사용량을 아낄 수 있습니다.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-400 flex items-center gap-1.5">
            <LayoutGrid className="w-4 h-4" /> 2. 학생이 조작 가능한 시뮬레이션
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-blue-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> 3. 대용량 문서 & PPT/Docs 완성
            </h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>추천:</strong> <code>📁 Google Drive + Work</code> 또는 <code>📁 Gemini 2M Video Upload</code><br />
              • Work에서 실행하면 네이티브 Google Docs/Slides 파일로 자동 완성되어 업무 시간을 90% 절약합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
