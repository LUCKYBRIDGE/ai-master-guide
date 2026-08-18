import React, { useState } from 'react';
import { HEAD_TO_HEAD_MISSIONS_DATA } from '../data/missionsBenchmarkData';
import { HeadToHeadMission, MissionResultItem } from '../types/ai';
import { 
  Swords, 
  Clock, 
  Coins, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Trophy, 
  Sparkles, 
  Zap, 
  CalendarCheck, 
  Layers, 
  Terminal, 
  Code2, 
  FileSpreadsheet, 
  SearchCode, 
  Bug, 
  AlertTriangle, 
  FileText,
  Filter,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const HeadToHeadMissionArena: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMissionId, setSelectedMissionId] = useState<string>('mission-crypto-dashboard');

  const filteredMissions = HEAD_TO_HEAD_MISSIONS_DATA.filter((m: HeadToHeadMission) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  const currentMission = HEAD_TO_HEAD_MISSIONS_DATA.find((m: HeadToHeadMission) => m.id === selectedMissionId) || filteredMissions[0] || HEAD_TO_HEAD_MISSIONS_DATA[0];

  const getCompanyColor = (company: string) => {
    switch (company) {
      case 'anthropic': return { border: 'border-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'openai': return { border: 'border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'google': return { border: 'border-blue-500/40', text: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
      case 'xai': return { border: 'border-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      default: return { border: 'border-indigo-500/40', text: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '풀스택 웹앱 코딩': return <Code2 className="w-4 h-4 text-emerald-400" />;
      case '대용량 데이터 분석': return <FileSpreadsheet className="w-4 h-4 text-blue-400" />;
      case '심층 리서치 백서': return <SearchCode className="w-4 h-4 text-purple-400" />;
      case '대형 레포 버그 픽스': return <Bug className="w-4 h-4 text-rose-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-orange-950/30 to-slate-900 border border-orange-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
                <Swords className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                동일 업무 4사 실전 8대 배틀 (시간 · 비용 · 성공/실패 여부)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              <strong>테스트 실시 일자(YYYY.MM.DD), 투입된 실제 프롬프트, 입력 데이터 규격, 소요 시간(초), 투입 비용($), 성공/실패 여부(원샷 vs 수동 수정), 실제 에러 로그 및 공인 출처</strong>를 정밀 계측하여 투명하게 비교합니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs text-orange-400 font-bold px-3.5 py-2 rounded-xl bg-orange-500/10 border border-orange-500/30 self-start md:self-auto">
            <CalendarCheck className="w-4 h-4" />
            <span>실측 일자: {currentMission.testExactDate}</span>
          </div>
        </div>

        {/* Category Filter & Mission Selector Tabs */}
        <div className="space-y-2 pt-2 border-t border-orange-500/20">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-500" /> 분야 필터:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              전체 8개 미션
            </button>
            <button
              onClick={() => setSelectedCategory('풀스택 웹앱 코딩')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '풀스택 웹앱 코딩'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-emerald-300'
              }`}
            >
              💻 풀스택 코딩 & Figma UI
            </button>
            <button
              onClick={() => setSelectedCategory('대용량 데이터 분석')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '대용량 데이터 분석'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-blue-300'
              }`}
            >
              📊 10만 행 CSV & DB 튜닝
            </button>
            <button
              onClick={() => setSelectedCategory('대형 레포 버그 픽스')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '대형 레포 버그 픽스'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-rose-300'
              }`}
            >
              🔒 버그 픽스 & 50개 파일 보안감사
            </button>
            <button
              onClick={() => setSelectedCategory('심층 리서치 백서')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === '심층 리서치 백서'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-purple-300'
              }`}
            >
              🔭 15p 반도체 백서 & 1시간 회의 오디오
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {filteredMissions.map((mission: HeadToHeadMission) => (
              <button
                key={mission.id}
                onClick={() => setSelectedMissionId(mission.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  selectedMissionId === mission.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 scale-102'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {getCategoryIcon(mission.category)}
                <span>{mission.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Mission Details Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded border border-orange-500/30">
                📅 실측 일자: {currentMission.testExactDate}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {currentMission.category}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              {currentMission.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-3 rounded-2xl bg-orange-950/30 border border-orange-500/30 flex items-center gap-2 text-xs">
              <Trophy className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-orange-300 font-bold">미션 종합 승자:</span>{' '}
                <strong className="text-white uppercase">{currentMission.winnerCompany}</strong>
                <p className="text-[11px] text-slate-300 mt-0.5">{currentMission.winnerReason}</p>
              </div>
            </div>

            {/* Official Source Report Link */}
            {currentMission.sourceReportUrl && (
              <a
                href={currentMission.sourceReportUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all shadow-md shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>출처: {currentMission.sourceReportName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Prompt & Input Spec Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-orange-400" />
              투입된 실제 동일 프롬프트 (Prompt Given)
            </span>
            <p className="text-slate-200 font-mono text-[11px] leading-relaxed">
              {currentMission.promptGiven}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              투입 데이터 규격 및 계측 목표
            </span>
            <p className="text-slate-200 text-[11px] leading-relaxed">
              <strong>데이터 규격:</strong> {currentMission.inputDataSpec}
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>계측 목표:</strong> {currentMission.missionGoal}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Models Quantitative Metric Cards (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentMission.results.map((res: MissionResultItem, idx: number) => {
          const colors = getCompanyColor(res.company);
          return (
            <div
              key={idx}
              className={`rounded-3xl glass-panel border ${colors.border} p-6 sm:p-7 space-y-4 hover:shadow-2xl transition-all flex flex-col justify-between`}
            >
              <div>
                {/* Card Top: Model Name & Badges */}
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${colors.bg} ${colors.text}`}>
                      {res.company}
                    </span>
                    <h4 className="text-lg font-extrabold text-white mt-1">
                      {res.modelName}
                    </h4>
                    <span className="text-xs text-slate-400">{res.toolName}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                      res.status.includes('100% 성공')
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}>
                      {res.status.includes('100% 성공') ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{res.status}</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {res.iterationCount === 1 ? '1회차 원샷 성공' : `${res.iterationCount}회차 시도 성공`}
                    </span>
                  </div>
                </div>

                {/* 4 Quantitative Metric Bars */}
                <div className="grid grid-cols-2 gap-3 my-3">
                  {/* Time Card */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-blue-400" /> 소요 시간
                      </span>
                      {res.isFastest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          ⚡ 최단 시간
                        </span>
                      )}
                    </div>
                    <div className="font-mono font-extrabold text-base text-white">
                      {res.timeDisplay}
                    </div>
                  </div>

                  {/* Cost Card */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Coins className="w-3.5 h-3.5 text-yellow-400" /> 투입 비용
                      </span>
                      {res.isCheapest && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          🏆 최저 비용
                        </span>
                      )}
                    </div>
                    <div className="font-mono font-extrabold text-base text-white">
                      {res.costEstimated}
                    </div>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      {res.tokenCountDisplay}
                    </span>
                  </div>
                </div>

                {/* Quality Score Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 결과물 완성도 & 품질
                    </span>
                    <div className="flex items-center gap-1.5">
                      {res.isHighestQuality && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          🥇 최고 품질
                        </span>
                      )}
                      <span className="font-mono font-extrabold text-xs text-purple-300">
                        {res.qualityScore} / 10.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${res.qualityScore * 10}%` }}
                    />
                  </div>
                </div>

                {/* Detailed Result Note */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-200 block mb-0.5 text-[11px]">실제 산출물 판정:</strong>
                  <p className="text-[11px] leading-relaxed">{res.resultDetail}</p>
                </div>

                {/* Console Error Log (if any) */}
                {res.errorLog && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-rose-400">
                      <AlertTriangle className="w-3 h-3" /> 수동 수정 필요 원인 (콘솔 에러):
                    </span>
                    <pre className="whitespace-pre-wrap text-[10px] text-rose-200">
                      {res.errorLog}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Matrix Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <h4 className="text-base font-extrabold text-white">
            미션 결과 종합 리더보드 (시간 vs 비용 vs 성공률)
          </h4>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-300">
                <th className="py-3.5 px-4 min-w-[160px]">모델 및 도구</th>
                <th className="py-3.5 px-4 min-w-[120px]">소요 시간</th>
                <th className="py-3.5 px-4 min-w-[130px]">투입 비용 / 토큰</th>
                <th className="py-3.5 px-4 min-w-[150px]">성공 여부 & 시도</th>
                <th className="py-3.5 px-4 min-w-[110px]">품질 점수</th>
                <th className="py-3.5 px-4 min-w-[200px]">핵심 강점 & 판정</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {currentMission.results.map((r: MissionResultItem, idx: number) => {
                return (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div>{r.modelName}</div>
                      <span className="text-[10px] text-slate-400">{r.toolName}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={r.isFastest ? 'text-cyan-400' : 'text-slate-300'}>
                        {r.timeDisplay}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      <div className={`font-bold ${r.isCheapest ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {r.costEstimated}
                      </div>
                      <span className="text-[10px] text-slate-500">{r.tokenCountDisplay}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        r.status.includes('100% 성공')
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-purple-300">
                      {r.qualityScore}/10
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-300 leading-relaxed">
                      {r.resultDetail}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
