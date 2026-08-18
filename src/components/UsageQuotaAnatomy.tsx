import React, { useState } from 'react';
import { 
  ACCOUNT_BANKS_SUMMARY, 
  MODEL_WEIGHTS_DATA, 
  MEDIA_PRICING_DATA, 
  ACTION_CONSUMPTION_MATRIX, 
  PLAN_TIERS_COMPARISON 
} from '../data/usageQuotaData';
import { 
  WalletCards, 
  Scale, 
  Film, 
  AlertOctagon, 
  Flame, 
  CalendarCheck, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Info, 
  HelpCircle, 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Coins,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export const UsageQuotaAnatomy: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'banks' | 'weights' | 'media' | 'actions' | 'plans'>('banks');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  const filteredWeights = MODEL_WEIGHTS_DATA.filter((m) => {
    return selectedCompany === 'all' || m.company === selectedCompany;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <WalletCards className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                AI 사용량 통장(Quota) & 요금·토큰 구조 정밀 해부
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              단순히 “누가 많이 주느냐”가 아니라, <strong>내 사용량이 실제로 어떤 통장(Quota)에서 차감되는지</strong> 분해하여 정리한 2026년 8월 16일 기준 공식 지침서입니다.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs text-emerald-400 font-bold px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 self-start md:self-auto">
            <CalendarCheck className="w-4 h-4" />
            <span>2026.08.16 공식 문서 기준</span>
          </div>
        </div>

        {/* 3 Core Insights Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-indigo-500/20 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" /> 구독 Quota ≠ API 토큰 가격
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              구독 서비스는 “토큰 몇 개 = 몇 %” 환산식을 공개하지 않으며, 작업 복잡도·모델·추론 깊이·도구 사용량을 종합해 동적 계산합니다.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> 통장 구조의 2대 진영
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              <strong>ChatGPT/Gemini</strong>는 Chat과 코딩 Agent가 분리된 “여러 통장형”, <strong>Claude/Grok</strong>은 모든 기능이 하나의 한도를 깎는 “큰 통장 하나형”입니다.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-indigo-500/20 space-y-1">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Film className="w-4 h-4" /> 이미지 & 영상의 초고연산
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Grok 720p 영상 10초는 약 $0.70 상당의 거대 compute를 소모하여 주간 풀을 빠르게 잠식합니다. Claude는 사진 생성 모델이 없습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800">
        <button
          onClick={() => setActiveSubTab('banks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'banks'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <WalletCards className="w-4 h-4" />
          <span>1. 4사 사용량 통장 분해표</span>
        </button>

        <button
          onClick={() => setActiveSubTab('weights')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'weights'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>2. 모델별 상대적 무게 (1M 토큰)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('media')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'media'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>3. 이미지 & 영상 연산 비용</span>
        </button>

        <button
          onClick={() => setActiveSubTab('actions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'actions'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>4. 사용량 폭식 행동 비교</span>
        </button>

        <button
          onClick={() => setActiveSubTab('plans')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'plans'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>5. $20급 vs $200급 가성비</span>
        </button>
      </div>

      {/* SubTab 1: 4대 AI 사용량 통장 분해표 */}
      {activeSubTab === 'banks' && (
        <div className="space-y-6">
          {/* Bento Cards of 4 Banks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ACCOUNT_BANKS_SUMMARY.map((bank) => (
              <div
                key={bank.company}
                className="rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-xl"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${bank.badgeBg} ${bank.badgeColor}`}>
                        {bank.companyName}
                      </span>
                      <span className="text-xs font-extrabold text-white px-2.5 py-0.5 rounded-md bg-slate-800">
                        {bank.accountType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      <span className="text-slate-400">Chat↔코딩:</span>
                      <span>{bank.chatAgentSeparation}</span>
                    </div>
                  </div>

                  {/* Detail Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">💻 코딩 / Agent 통장</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{bank.codingInternalShare}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">🖼️ 이미지 생성 처리</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{bank.imageHandling}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">🎬 영상 / 음성 처리</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">
                        영상: {bank.videoHandling}<br />
                        음성: {bank.voiceHandling}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">📁 파일 분석 & 계산 방식</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{bank.computeFormula}</p>
                    </div>
                  </div>

                  {/* Core Pros & Cons */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                      <strong>👍 핵심 장점:</strong> {bank.corePros}
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-rose-300">
                      <strong>⚠️ 주의할 점:</strong> {bank.coreCons}
                    </div>
                  </div>
                </div>

                {/* Best Persona & Source Link */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-[11px]">
                  <div className="text-slate-400">
                    <span className="text-indigo-400 font-bold">추천 대상:</span> {bank.bestPersona}
                  </div>
                  <a
                    href={bank.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-slate-200 flex items-center gap-1 shrink-0 font-mono"
                  >
                    <span>공식 문서</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Full Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-300">
                  <th className="py-3.5 px-4 min-w-[160px]">구분 항목</th>
                  <th className="py-3.5 px-4 min-w-[200px] text-emerald-400 bg-emerald-950/20">ChatGPT (OpenAI)</th>
                  <th className="py-3.5 px-4 min-w-[200px] text-blue-400 bg-blue-950/20">Gemini (Google)</th>
                  <th className="py-3.5 px-4 min-w-[200px] text-amber-400 bg-amber-950/20">Claude (Anthropic)</th>
                  <th className="py-3.5 px-4 min-w-[200px] text-cyan-400 bg-cyan-950/20">Grok (xAI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">통장 구조 형태</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">세분화된 여러 통장형</td>
                  <td className="py-3 px-4 font-bold text-blue-400">제품별 분리 통장형</td>
                  <td className="py-3 px-4 font-bold text-amber-400">큰 통장 하나형</td>
                  <td className="py-3 px-4 font-bold text-cyan-400">자유배분형 주간 풀</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">Chat ↔ 코딩 분리 여부</td>
                  <td className="py-3 px-4 text-emerald-300">🟢 분리 (Chat 보존)</td>
                  <td className="py-3 px-4 text-blue-300">🟢 분리 (App 보존)</td>
                  <td className="py-3 px-4 text-rose-300">🔴 공유 (동시 차감)</td>
                  <td className="py-3 px-4 text-rose-300">🔴 공유 (동시 차감)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">코딩/에이전트 공유</td>
                  <td className="py-3 px-4">Work · Codex 공용 Agentic</td>
                  <td className="py-3 px-4">Antigravity 자체 Quota</td>
                  <td className="py-3 px-4">Claude Chat + Code 전액 공용</td>
                  <td className="py-3 px-4">Grok 전체 제품 공용</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">이미지 생성 한도</td>
                  <td className="py-3 px-4">별도 이미지 한도 (Codex와 분리)</td>
                  <td className="py-3 px-4">Gemini Compute 더 많이 소모</td>
                  <td className="py-3 px-4 text-slate-500">❌ 사진 생성 모델 없음</td>
                  <td className="py-3 px-4">Weekly pool에서 차감</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">영상 생성 한도</td>
                  <td className="py-3 px-4">별도 미디어 한도</td>
                  <td className="py-3 px-4">미디어 생성 시 큰 폭 소모</td>
                  <td className="py-3 px-4 text-slate-500">❌ 자체 영상 모델 없음</td>
                  <td className="py-3 px-4 text-rose-300">Weekly pool 매우 크게 소비</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">추가 사용량 (초과 시)</td>
                  <td className="py-3 px-4">ChatGPT Credits (12개월)</td>
                  <td className="py-3 px-4">Google AI Credits</td>
                  <td className="py-3 px-4">Usage Credits (API 요금 전환)</td>
                  <td className="py-3 px-4">Extra Credits ($5~, 1년)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">토큰→% 공식 공개</td>
                  <td className="py-3 px-4 text-slate-500">❌ 비공개 (동적 계산)</td>
                  <td className="py-3 px-4 text-slate-500">❌ 비공개 (Compute 기반)</td>
                  <td className="py-3 px-4 text-slate-500">❌ 비공개 (Effort/모델 기반)</td>
                  <td className="py-3 px-4 text-slate-500">❌ 비공개 (Weekly Pool)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 2: 모델별 상대적 무게 (100만 토큰당 크레딧 / 단가) */}
      {activeSubTab === 'weights' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">생태계 필터:</span>
              <div className="flex gap-1">
                {['all', 'openai', 'anthropic', 'google', 'xai'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCompany(c)}
                    className={`px-2.5 py-1 rounded-lg font-semibold uppercase text-[11px] transition-colors ${
                      selectedCompany === c
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-slate-400 text-[11px]">
              * 100만(1M) 토큰 기준 공식 API 및 Codex Credit Rate
            </div>
          </div>

          {/* Weights Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-300">
                  <th className="py-3.5 px-4">모델명</th>
                  <th className="py-3.5 px-4">입력 단가 / 1M</th>
                  <th className="py-3.5 px-4">캐시 입력 / 1M</th>
                  <th className="py-3.5 px-4">출력(Thinking) / 1M</th>
                  <th className="py-3.5 px-4">상대적 무게</th>
                  <th className="py-3.5 px-4">컨텍스트</th>
                  <th className="py-3.5 px-4 min-w-[220px]">특징 및 비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {filteredWeights.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div>{row.modelName}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                        row.company === 'openai' ? 'bg-emerald-500/10 text-emerald-400' :
                        row.company === 'google' ? 'bg-blue-500/10 text-blue-400' :
                        row.company === 'anthropic' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                      }`}>
                        {row.company}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{row.inputCost1M}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{row.cachedInput1M || '-'}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">{row.outputCost1M}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        row.weightCategory === '최상위 고연산 (Heavy)' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        row.weightCategory === '중간 균형 (Balanced)' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {row.relativeWeight}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">{row.contextWindow}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Claude Tokenizer Note */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1.5">
            <h4 className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4" /> 💡 중요: Claude의 토크나이저 변경으로 인한 토큰 수 증가 주의
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Anthropic은 Claude 4.7 이후 모델의 새로운 tokenizer가 동일한 텍스트에 대해 이전보다 <strong>약 30% 더 많은 토큰을 생성할 수 있음</strong>을 공식 명시하고 있습니다. 단순히 표면적인 단가 하락만 보지 말고, 실제 요청 시 발생하는 총 토큰 소비량 증가분까지 고려해야 정확한 비용 계산이 가능합니다.
            </p>
          </div>
        </div>
      )}

      {/* SubTab 3: 이미지 & 영상 미디어 연산 비용 */}
      {activeSubTab === 'media' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEDIA_PRICING_DATA.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{item.modelOrFeature}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    item.company === 'openai' ? 'bg-emerald-500/10 text-emerald-400' :
                    item.company === 'google' ? 'bg-blue-500/10 text-blue-400' :
                    item.company === 'anthropic' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    {item.company}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">품질/해상도: {item.resolutionOrQuality}</span>
                  <span className="font-bold text-indigo-300">{item.costOrTokens}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 4: 사용량 폭식 행동 비교 */}
      {activeSubTab === 'actions' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-300">
                <th className="py-3.5 px-4 min-w-[180px]">사용자 행동 (Action)</th>
                <th className="py-3.5 px-4 min-w-[180px] text-emerald-400">ChatGPT (OpenAI)</th>
                <th className="py-3.5 px-4 min-w-[180px] text-blue-400">Gemini (Google)</th>
                <th className="py-3.5 px-4 min-w-[180px] text-amber-400">Claude (Anthropic)</th>
                <th className="py-3.5 px-4 min-w-[180px] text-cyan-400">Grok (xAI)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {ACTION_CONSUMPTION_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-white">{row.action}</td>
                  <td className="py-3.5 px-4 text-[11px]">{row.chatgpt}</td>
                  <td className="py-3.5 px-4 text-[11px]">{row.gemini}</td>
                  <td className="py-3.5 px-4 text-[11px]">{row.claude}</td>
                  <td className="py-3.5 px-4 text-[11px]">{row.grok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SubTab 5: $20급 vs $200급 가성비 */}
      {activeSubTab === 'plans' && (
        <div className="space-y-8">
          {PLAN_TIERS_COMPARISON.map((tier, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">{tier.tierName} 비교</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* OpenAI */}
                <div className="p-5 rounded-2xl glass-panel border border-emerald-500/20 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      OpenAI
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{tier.openai.planName}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.openai.features}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-300">
                    <strong>추천:</strong> {tier.openai.bestFor}
                  </div>
                </div>

                {/* Google */}
                <div className="p-5 rounded-2xl glass-panel border border-blue-500/20 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase">
                      Google
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{tier.google.planName}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.google.features}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-blue-300">
                    <strong>추천:</strong> {tier.google.bestFor}
                  </div>
                </div>

                {/* Anthropic */}
                <div className="p-5 rounded-2xl glass-panel border border-amber-500/20 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                      Anthropic
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{tier.anthropic.planName}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.anthropic.features}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-300">
                    <strong>추천:</strong> {tier.anthropic.bestFor}
                  </div>
                </div>

                {/* xAI */}
                <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase">
                      xAI
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{tier.xai.planName}</h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.xai.features}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-[11px] text-cyan-300">
                    <strong>추천:</strong> {tier.xai.bestFor}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
