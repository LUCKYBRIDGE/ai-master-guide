import React, { useState, useMemo } from 'react';
import { PromptTemplate } from '../types/ai';
import { 
  FileCode2, 
  Copy, 
  Download, 
  SlidersHorizontal, 
  CalendarCheck, 
  Sparkles, 
  Check, 
  Tag, 
  Lightbulb, 
  Edit3
} from 'lucide-react';

interface PromptLibraryProps {
  prompts: PromptTemplate[];
  searchQuery: string;
  onCopy: (text: string, title: string) => void;
}

const CATEGORIES = [
  '전체',
  '코딩 & 아키텍처',
  '심층 리서치 & 분석',
  '문서 작성 & 기획',
  '데이터 분석 & 시각화',
  '에이전트 시스템 프롬프트'
];

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  prompts,
  searchQuery,
  onCopy
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [paramValues, setParamValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize or handle parameter changes
  const handleParamChange = (promptId: string, paramKey: string, val: string) => {
    setParamValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [paramKey]: val
      }
    }));
  };

  const getComputedPromptText = (prompt: PromptTemplate): string => {
    let text = prompt.promptText;
    if (prompt.parameters) {
      prompt.parameters.forEach((param) => {
        const val =
          paramValues[prompt.id]?.[param.key] !== undefined
            ? paramValues[prompt.id][param.key]
            : param.defaultValue;
        text = text.replaceAll(`{${param.key}}`, val);
      });
    }
    return text;
  };

  const handleCopy = (prompt: PromptTemplate) => {
    const finalText = getComputedPromptText(prompt);
    onCopy(finalText, `${prompt.title} 프롬프트`);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMD = (prompt: PromptTemplate) => {
    const finalText = getComputedPromptText(prompt);
    const mdContent = `# ${prompt.title}
- 대상 도구: ${prompt.targetTool}
- 카테고리: ${prompt.category}
- 검증 기준일: ${prompt.verifiedDate}

## 설명
${prompt.description}

## 프롬프트 본문
\`\`\`markdown
${finalText}
\`\`\`

## 프로 팁
${prompt.proTips.map((tip) => `- ${tip}`).join('\n')}
`;
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchCat =
        selectedCategory === '전체' || p.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.targetTool.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <FileCode2 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">실전 고성능 프롬프트 & 템플릿 허브</h2>
          </div>
          <p className="text-sm text-slate-300">
            실리콘밸리 엔지니어 및 AI 연구진이 검증한 고품질 프롬프트 템플릿 모음입니다. 파라미터를 입력하고 원클릭으로 복사하거나 MD 파일로 다운로드하세요.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-medium px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <CalendarCheck className="w-4 h-4" />
          <span>2026.08 최적화 프롬프트</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="rounded-2xl glass-card border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl"
          >
            <div>
              {/* Header: Target Tool & Difficulty */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {prompt.targetTool}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {prompt.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CalendarCheck className="w-3 h-3" />
                  <span>{prompt.verifiedDate}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-1.5">
                {prompt.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {prompt.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {prompt.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Parameters Customizer (if any) */}
              {prompt.parameters && prompt.parameters.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-4 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>파라미터 실시간 커스텀</span>
                  </div>
                  {prompt.parameters.map((param) => {
                    const currentVal =
                      paramValues[prompt.id]?.[param.key] !== undefined
                        ? paramValues[prompt.id][param.key]
                        : param.defaultValue;
                    return (
                      <div key={param.key} className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-300 block">
                          {param.label}:
                        </label>
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) =>
                            handleParamChange(prompt.id, param.key, e.target.value)
                          }
                          className="w-full text-xs px-3 py-1.5 rounded-lg bg-slate-950 text-slate-100 border border-slate-700/80 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Prompt Body Box */}
              <div className="relative mb-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1 px-1">
                  <span>프롬프트 템플릿 본문</span>
                  <span>(실시간 반영 완료)</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto border border-slate-800">
                  {getComputedPromptText(prompt)}
                </pre>
              </div>

              {/* Pro Tips */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>활용 팁</span>
                </div>
                {prompt.proTips.map((tip, idx) => (
                  <p key={idx} className="text-[11px] text-slate-300">
                    • {tip}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-4">
              <button
                onClick={() => handleDownloadMD(prompt)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 transition-colors"
                title="마크다운 파일(.md)로 저장"
              >
                <Download className="w-3.5 h-3.5" />
                <span>MD 다운로드</span>
              </button>

              <button
                onClick={() => handleCopy(prompt)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                  copiedId === prompt.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>프롬프트 원클릭 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="py-12 text-center text-slate-400 glass-panel rounded-2xl">
          일치하는 프롬프트 템플릿이 없습니다.
        </div>
      )}
    </div>
  );
};
