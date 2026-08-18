import React, { useState } from 'react';
import { WorkflowGuide } from '../types/ai';
import { 
  Workflow, 
  Terminal, 
  Cpu, 
  Layout, 
  Zap, 
  CalendarCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  FileText, 
  Download, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface WorkflowSectionProps {
  guides: WorkflowGuide[];
  onCopy: (text: string, title: string) => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
  guides,
  onCopy
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(guides[0]?.id || '');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const activeGuide = guides.find((g) => g.id === selectedGuideId) || guides[0];

  const handleCopySnippet = (snippet: string, title: string, id: string) => {
    onCopy(snippet, title);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleDownloadConfigFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-orange-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-cyan-400" />;
      default:
        return <Workflow className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Workflow className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">차세대 AI 에이전트 실전 워크플로우 & 규칙</h2>
          </div>
          <p className="text-sm text-slate-300">
            Claude Code CLI, Google Antigravity, OpenAI Canvas, Grok Build를 실무에 도입하는 공식 표준 프로세스와 프로젝트별 규칙 템플릿을 제공합니다.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CalendarCheck className="w-4 h-4" />
          <span>2026.08 에이전트 지침</span>
        </div>
      </div>

      {/* Guide Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {guides.map((guide) => {
          const isSelected = guide.id === selectedGuideId;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-800/90 border-blue-500/60 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                  {getGuideIcon(guide.icon)}
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {guide.verifiedDate}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{guide.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{guide.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Guide Content */}
      {activeGuide && (
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-8">
          {/* Guide Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {getGuideIcon(activeGuide.icon)}
                <h3 className="text-2xl font-extrabold text-white">
                  {activeGuide.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 font-medium">{activeGuide.subtitle}</p>
              <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
                {activeGuide.summary}
              </p>
            </div>

            <a
              href={activeGuide.officialDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 py-2.5 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 transition-all self-start md:self-auto"
            >
              <span>공식 가이드 문서</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Prerequisites */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 사전 준비사항 (Prerequisites)
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
              {activeGuide.prerequisites.map((req, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step by Step Workflow */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-amber-400" />
              단계별 실전 실행 프로세스
            </h4>
            <div className="space-y-4">
              {activeGuide.steps.map((step) => {
                const snippet = step.commandSnippet || step.codeSnippet;
                const snippetId = `${activeGuide.id}-step-${step.stepNumber}`;

                return (
                  <div
                    key={step.stepNumber}
                    className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs border border-blue-500/30">
                        {step.stepNumber}
                      </span>
                      <h5 className="text-sm font-bold text-slate-100">{step.title}</h5>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed ml-10 mb-3">
                      {step.content}
                    </p>

                    {snippet && (
                      <div className="ml-10 relative">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
                          <span className="font-mono text-slate-400">명령어 / 스니펫</span>
                          <button
                            onClick={() =>
                              handleCopySnippet(snippet, `${step.title} 스니펫`, snippetId)
                            }
                            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
                          >
                            {copiedSnippetId === snippetId ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">복사 완료</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>복사</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800/80">
                          {snippet}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copyable Project Configuration (CLAUDE.md / .gemini/rules) */}
          {activeGuide.copyableConfig && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>프로젝트 설정 파일:</span>
                      <code className="text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded text-xs font-mono">
                        {activeGuide.copyableConfig.fileName}
                      </code>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeGuide.copyableConfig.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleDownloadConfigFile(
                        activeGuide.copyableConfig!.fileName,
                        activeGuide.copyableConfig!.content
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>파일 다운로드</span>
                  </button>

                  <button
                    onClick={() =>
                      onCopy(
                        activeGuide.copyableConfig!.content,
                        `${activeGuide.copyableConfig!.fileName} 설정 파일`
                      )
                    }
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-950 px-4 py-2 rounded-xl bg-indigo-400 hover:bg-indigo-300 shadow-md shadow-indigo-500/20 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-950" />
                    <span>원클릭 복사</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-64 overflow-y-auto">
                {activeGuide.copyableConfig.content}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
