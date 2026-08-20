import React, { useState } from 'react';
import { 
  EASY_AI_GLOSSARY_DATA,
  DESIGN_TO_DEV_HANDOFF_GUIDES,
  UNIVERSAL_PROMPT_FORMULA,
  EasyGlossaryTerm,
  DesignToDevHandoffGuide,
  UniversalPromptRule
} from '../data/coreAiConceptsData';
import { 
  TEMPLATE_CONFIG_FILES,
  TemplateConfigFile
} from '../data/templateFilesData';
import { 
  Sparkles, 
  Layers, 
  LayoutGrid, 
  Zap, 
  FileCode, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Code2, 
  Clock, 
  HelpCircle, 
  Laptop, 
  Scale, 
  RefreshCw, 
  FolderInput, 
  Terminal, 
  Search, 
  BookMarked, 
  Lightbulb,
  CheckCheck,
  Download,
  FileDown
} from 'lucide-react';

interface CoreAiConceptsGuideProps {
  onCopy?: (text: string, title: string) => void;
}

export const CoreAiConceptsGuide: React.FC<CoreAiConceptsGuideProps> = ({ onCopy }) => {
  const [activeSubTab, setActiveSubTab] = useState<'templates' | 'universal-prompt' | 'handoff' | 'glossary' | 'honest-truth'>('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('template-claude-md');
  const [selectedGlossaryId, setSelectedGlossaryId] = useState<string>('glossary-stitch');
  const [glossaryCategoryFilter, setGlossaryCategoryFilter] = useState<string>('전체');
  const [glossarySearchQuery, setGlossarySearchQuery] = useState<string>('');
  const [selectedHandoffId, setSelectedHandoffId] = useState<string>('handoff-stitch-to-dev');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedTemplate = TEMPLATE_CONFIG_FILES.find((t: TemplateConfigFile) => t.id === selectedTemplateId) || TEMPLATE_CONFIG_FILES[0];
  const selectedGlossaryTerm = EASY_AI_GLOSSARY_DATA.find((g: EasyGlossaryTerm) => g.id === selectedGlossaryId) || EASY_AI_GLOSSARY_DATA[0];
  const selectedHandoff = DESIGN_TO_DEV_HANDOFF_GUIDES.find((h: DesignToDevHandoffGuide) => h.id === selectedHandoffId) || DESIGN_TO_DEV_HANDOFF_GUIDES[0];

  const filteredGlossary = EASY_AI_GLOSSARY_DATA.filter((term: EasyGlossaryTerm) => {
    const matchCategory = glossaryCategoryFilter === '전체' || term.category === glossaryCategoryFilter;
    const matchSearch = term.term.toLowerCase().includes(glossarySearchQuery.toLowerCase()) ||
                        term.englishTerm.toLowerCase().includes(glossarySearchQuery.toLowerCase()) ||
                        term.easyMeaning.toLowerCase().includes(glossarySearchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCopyCode = (id: string, code: string, title: string) => {
    if (onCopy) {
      onCopy(code, title);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case '디자인/UI': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case '개발/연동': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'AI/에이전트': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <FileDown className="w-5 h-5 text-indigo-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                AI 프로젝트 필수 템플릿 & 실무 가이드
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              내 프로젝트에 바로 다운받아 쓸 수 있는 <strong>CLAUDE.md, AGENTS.md, DESIGN.md 템플릿</strong>과, <strong>전 모델 공통 프롬프트 원칙</strong>을 제공합니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-300 font-medium px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 self-start md:self-auto">
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready-to-use Templates</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'templates'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20 scale-102'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>📥 1. 템플릿 다운로드: CLAUDE.md & AGENTS.md</span>
          </button>

          <button
            onClick={() => setActiveSubTab('universal-prompt')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'universal-prompt'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-300" />
            <span>📋 2. 모든 AI 모델 공통 만능 프롬프트 원칙</span>
          </button>

          <button
            onClick={() => setActiveSubTab('handoff')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'handoff'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-cyan-300" />
            <span>🔄 3. 디자인 ➔ 내 프로젝트 개발로 가져오는 법</span>
          </button>

          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'glossary'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookMarked className="w-4 h-4 text-yellow-300" />
            <span>📖 4. 쉬운 한국어 AI 단어사전</span>
          </button>

          <button
            onClick={() => setActiveSubTab('honest-truth')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'honest-truth'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>🎯 5. 솔직 팩트체크: 피그마 vs 스티치 vs 클로드</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Template Download (CLAUDE.md & AGENTS.md) */}
      {activeSubTab === 'templates' && (
        <div className="space-y-6">
          {/* Template Selector Pills */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="space-y-1 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileDown className="w-4 h-4" /> 프로젝트 필수 템플릿 파일 선택
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                내 프로젝트 루트에 다운받아 바로 사용하는 표준 설정 파일 3선
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TEMPLATE_CONFIG_FILES.map((tpl: TemplateConfigFile) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    selectedTemplateId === tpl.id
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl scale-102 border-emerald-400 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-black text-white px-2 py-0.5 rounded-md bg-slate-900/80 border border-white/10">
                      📄 {tpl.filename}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                      {tpl.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-2">
                    {tpl.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Template Preview & Download Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-2xl">
            {/* Action Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedTemplate.badgeColor}`}>
                    {selectedTemplate.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    저장 위치: <strong className="text-emerald-300">{selectedTemplate.targetLocation}</strong>
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mt-1">
                  📄 {selectedTemplate.filename}
                </h4>
                <p className="text-xs text-slate-300">
                  지원 도구: {selectedTemplate.supportedTools}
                </p>
              </div>

              {/* Action Buttons: Copy All & Download File */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleCopyCode(
                    selectedTemplate.id,
                    selectedTemplate.rawContent,
                    selectedTemplate.filename
                  )}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700 shadow-md"
                >
                  {copiedId === selectedTemplate.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === selectedTemplate.id ? '복사됨!' : '전체 복사'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(selectedTemplate.filename, selectedTemplate.rawContent)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30"
                >
                  <Download className="w-4 h-4" />
                  <span>파일 즉시 다운로드 ({selectedTemplate.filename})</span>
                </button>
              </div>
            </div>

            {/* Why Needed & 1-Minute Customization Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <Lightbulb className="w-4 h-4" /> 왜 이 파일이 꼭 필요한가요?
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedTemplate.whyNeeded}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <Zap className="w-4 h-4" /> 1분 만에 내 프로젝트에 맞게 고치는 법
                </span>
                <div className="space-y-1 text-slate-300 leading-relaxed">
                  {selectedTemplate.customizationTips.map((tip: string, idx: number) => (
                    <div key={idx} className="text-[11px]">• {tip}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Markdown Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono font-bold flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-indigo-400" /> 파일 내용 미리보기 ({selectedTemplate.filename})
                </span>
                <span className="text-[11px]">프로젝트 루트에 이 내용 그대로 저장하면 자동 적용됩니다.</span>
              </div>

              <pre className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-96 whitespace-pre-wrap">
                {selectedTemplate.rawContent}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Universal Prompt Formula */}
      {activeSubTab === 'universal-prompt' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 모델/회사별 차이 없이 통일되는 본질
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                "결국 모델이 달라도 원하는 건 똑같습니다. 프롬프트는 1가지 공식으로 통일됩니다."
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                OpenAI GPT-5든, Anthropic Claude든, Google Gemini든, Cursor나 Antigravity든 <strong>AI가 코드를 짤 때 필요한 정보는 정확히 아래 4가지뿐</strong>입니다. 모델마다 다른 프롬프트를 외울 필요 없이 이 4단 구조만 맞춰주면 어떤 AI든 완벽하게 코드를 작성합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {UNIVERSAL_PROMPT_FORMULA.map((rule: UniversalPromptRule) => (
                <div key={rule.stepNumber} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm text-indigo-300">
                      {rule.partName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      필수 요소
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {rule.partRole}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 font-mono text-emerald-300 text-xs">
                    {rule.exampleSnippet}
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">
                    💡 <strong>이유:</strong> {rule.whyNeeded}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-400" /> 모든 AI 모델에 그대로 복사해서 쓸 수 있는 표준 프롬프트 예시
                  </span>
                  <span className="text-[11px] text-slate-400">Claude Code, Antigravity, Cursor, ChatGPT, Codex 공통 사용 가능</span>
                </div>

                <button
                  onClick={() => handleCopyCode(
                    'universal-prompt-copy',
                    `[목표] 사용자가 주식을 주문할 수 있는 호가창 컴포넌트를 만들어줘.
[참고자료] 루트의 ./DESIGN.md 파일에 적힌 색상(#3182F6, Slate 900)과 여백 규칙을 그대로 참고해줘.
[기술조건] React, Tailwind CSS, TypeScript로 작성하고 상태 관리는 Zustand를 써줘.
[출력위치] src/components/OrderBook.tsx에 저장하고 npm run build로 에러를 점검해줘.`,
                    '만능 프롬프트'
                  )}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
                >
                  {copiedId === 'universal-prompt-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'universal-prompt-copy' ? '복사됨!' : '표준 프롬프트 복사'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
{`[목표] 사용자가 주식을 주문할 수 있는 호가창 컴포넌트를 만들어줘.
[참고자료] 루트의 ./DESIGN.md 파일에 적힌 색상(#3182F6, Slate 900)과 여백 규칙을 그대로 참고해줘.
[기술조건] React, Tailwind CSS, TypeScript로 작성하고 상태 관리는 Zustand를 써줘.
[출력위치] src/components/OrderBook.tsx에 저장하고 npm run build로 에러를 점검해줘.`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Design to Dev Handoff */}
      {activeSubTab === 'handoff' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="space-y-1 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <FolderInput className="w-4 h-4" /> 디자인 출처 선택
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                어디서 디자인을 만들었는지 선택하세요
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DESIGN_TO_DEV_HANDOFF_GUIDES.map((handoff: DesignToDevHandoffGuide) => (
                <button
                  key={handoff.id}
                  onClick={() => setSelectedHandoffId(handoff.id)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    selectedHandoffId === handoff.id
                      ? 'bg-indigo-600 text-white shadow-lg border-indigo-400 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-white/10 block w-fit mb-2">
                    {handoff.sourceToolCategory}
                  </span>
                  <p className="font-bold text-xs sm:text-sm text-white leading-snug">
                    {handoff.sourceDesignTool}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
            <div className="pb-3 border-b border-slate-800">
              <h4 className="text-lg font-bold text-white">
                {selectedHandoff.summaryTitle}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-white block text-xs">
                  {selectedHandoff.step1Design.title}
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedHandoff.step1Design.actionDescription}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-white block text-xs">
                  {selectedHandoff.step2Extract.title}
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedHandoff.step2Extract.actionDescription}
                </p>
                <div className="pt-2 text-[11px] text-slate-400">
                  • 추출 포맷: <strong className="text-emerald-300 font-mono">{selectedHandoff.step2Extract.fileFormat}</strong><br />
                  • 저장 위치: <strong className="text-cyan-300 font-mono">{selectedHandoff.step2Extract.whereToSave}</strong>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-400" /> {selectedHandoff.step3InjectPrompt.title}
                </span>

                <button
                  onClick={() => handleCopyCode(
                    selectedHandoff.id,
                    selectedHandoff.step3InjectPrompt.copyablePrompt,
                    selectedHandoff.summaryTitle
                  )}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                >
                  {copiedId === selectedHandoff.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === selectedHandoff.id ? '복사됨!' : '프롬프트 복사'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {selectedHandoff.step3InjectPrompt.copyablePrompt}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400">{selectedHandoff.step4AgentExecution.title}: </span>
              <strong className="text-slate-200">{selectedHandoff.step4AgentExecution.actionDescription}</strong>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Easy Glossary */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="단어 검색 (예: DESIGN.md, 스티칭, MCP, 에이전트...)"
                  value={glossarySearchQuery}
                  onChange={(e) => setGlossarySearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['전체', '디자인/UI', '개발/연동', 'AI/에이전트'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGlossaryCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      glossaryCategoryFilter === cat
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2 border-t border-slate-800">
              {filteredGlossary.map((term: EasyGlossaryTerm) => (
                <button
                  key={term.id}
                  onClick={() => setSelectedGlossaryId(term.id)}
                  className={`p-3 rounded-2xl text-left transition-all border ${
                    selectedGlossaryId === term.id
                      ? 'bg-indigo-600 text-white shadow-md font-bold border-indigo-400'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <span className="text-[10px] block opacity-70 uppercase">{term.category}</span>
                  <span className="text-xs font-bold mt-0.5 truncate text-white block">
                    {term.term.split(' (')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
            <div className="pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(selectedGlossaryTerm.category)}`}>
                  {selectedGlossaryTerm.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedGlossaryTerm.englishTerm}</span>
              </div>
              <h4 className="text-xl font-bold text-white">
                {selectedGlossaryTerm.term}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <Lightbulb className="w-4 h-4" /> 쉬운 설명
                </span>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {selectedGlossaryTerm.easyMeaning}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4" /> 쉬운 비유
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedGlossaryTerm.realLifeMetaphor}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 font-bold block">실제 개발에서의 쓰임:</span>
              <p className="text-slate-300 leading-relaxed">{selectedGlossaryTerm.realDevExample}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono">
              <span className="text-emerald-400 font-bold block font-sans">모든 AI 공통 프롬프트 팁:</span>
              <p className="text-emerald-300">{selectedGlossaryTerm.promptTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: The Honest Truth */}
      {activeSubTab === 'honest-truth' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4" /> 솔직한 팩트체크
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                "개발에서 구글 스티치, 클로드 디자인, 피그마 사실 같은 거 아닌가요?"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                👉 <strong>맞습니다. 개발자 입장에서 셋 다 궁극적인 목적은 똑같이 "화면 UI 만들어서 프론트엔드 코드 얻기"입니다.</strong><br />
                다만, <strong>어디서 작업을 시작하느냐(시작점)</strong>만 다릅니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 text-sm block">1. 피그마 (Figma)</span>
                <p className="text-slate-300 leading-relaxed">
                  사람(디자이너)이 손으로 직접 그린 화면 시안을 넘겨받아 개발할 때 씁니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 text-sm block">2. 구글 스티치 (Stitch)</span>
                <p className="text-slate-300 leading-relaxed">
                  텍스트나 스케치 이미지로 화면 시안 초안을 만들고, 지원되는 경우 DESIGN.md 디자인 시스템을 가져오거나 내보낼 때 씁니다. 결과는 직접 검토해야 합니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 text-sm block">3. 클로드 아티팩트 (Artifacts)</span>
                <p className="text-slate-300 leading-relaxed">
                  그림이 아니라 브라우저에서 버튼이 바로 클릭되는 React 코드를 눈으로 보며 복사할 때 씁니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
