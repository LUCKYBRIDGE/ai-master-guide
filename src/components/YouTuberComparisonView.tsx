import React, { useState } from 'react';
import { YOUTUBER_REVIEWS_DATA } from '../data/youtuberReviewsData';
import { YouTuberReview, YouTuberScore, YouTuberTestItem } from '../types/ai';
import { 
  Youtube, 
  ExternalLink, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  BarChart3, 
  PlaySquare, 
  Award, 
  CalendarCheck, 
  Users, 
  Layers,
  Terminal,
  MessageSquare,
  FileCode2,
  AlertTriangle
} from 'lucide-react';

export const YouTuberComparisonView: React.FC = () => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('jocoding');

  const currentReview = YOUTUBER_REVIEWS_DATA.find((r: YouTuberReview) => r.id === selectedCreatorId) || YOUTUBER_REVIEWS_DATA[0];

  const getCompanyColor = (company: string) => {
    switch (company) {
      case 'anthropic': return { bar: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'openai': return { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
      case 'google': return { bar: 'bg-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' };
      case 'xai': return { bar: 'bg-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      default: return { bar: 'bg-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                <Youtube className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                유명 테크 유튜버 실전 비교 리뷰 & 정확한 계측 데이터
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              <strong>테스트 실시 일자(YYYY.MM.DD), 투입된 실제 프롬프트 원문, 입력 데이터 규격, 모델별 실제 에러 로그 및 출력 결과</strong>를 투명하게 공개하며 공식 유튜브 출처를 명시합니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs text-rose-400 font-bold px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 self-start md:self-auto">
            <CalendarCheck className="w-4 h-4" />
            <span>최신 검증일: {currentReview.videoPublishDate}</span>
          </div>
        </div>

        {/* YouTuber Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-rose-500/20">
          {YOUTUBER_REVIEWS_DATA.map((rev: YouTuberReview) => (
            <button
              key={rev.id}
              onClick={() => setSelectedCreatorId(rev.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                selectedCreatorId === rev.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-102'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-base">{rev.avatarUrl}</span>
              <span>{rev.creatorName}의 비교표 보기</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected YouTuber Video Profile Card */}
      <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Creator Info & YouTube Video Link */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-inner shrink-0">
              {currentReview.avatarUrl}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {currentReview.creatorName}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {currentReview.subscriberCount}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                  📅 영상 공개일: {currentReview.videoPublishDate}
                </span>
              </div>
              <p className="text-sm font-bold text-rose-300 flex items-center gap-1.5">
                <PlaySquare className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{currentReview.videoTitle}</span>
              </p>
            </div>
          </div>

          <a
            href={currentReview.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shrink-0 self-start lg:self-auto"
          >
            <Youtube className="w-4 h-4" />
            <span>유튜브 원본 채널 방문</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Summary & Top Pick Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-400 block uppercase tracking-wider text-[11px]">
              실전 테스트 개요 및 검증 환경
            </span>
            <p>{currentReview.videoSummary}</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5 text-xs">
            <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Trophy className="w-4 h-4" /> 크리에이터 최종 1위 (Top Pick)
            </span>
            <h4 className="text-sm font-extrabold text-white">
              {currentReview.topPickModel}
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {currentReview.topPickReason}
            </p>
          </div>
        </div>

        {/* Visual Bar Chart: Test Scores */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-rose-400" />
            <h4 className="text-base font-extrabold text-white">
              {currentReview.creatorName} 실전 테스트 채점 결과
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentReview.scores.map((scoreItem: YouTuberScore, idx: number) => {
              const colors = getCompanyColor(scoreItem.company);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white">{scoreItem.modelName}</span>
                      {scoreItem.isTopPick && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-0.5">
                          🏆 Top Pick
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-extrabold text-sm text-white">
                      {scoreItem.score}점
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${colors.bar}`}
                      style={{ width: `${scoreItem.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{scoreItem.highlight}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Test Breakdown with Exact Prompt, Output & Error Logs */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h4 className="text-base font-extrabold text-white">
              세부 과제별 4사 실제 입력 프롬프트 & 에러 로그 & 결과 대조
            </h4>
          </div>

          <div className="space-y-6">
            {currentReview.testDetails.map((test: YouTuberTestItem, idx: number) => {
              const winnerColor = getCompanyColor(test.winner);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 shadow-xl"
                >
                  {/* Test Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                          📅 {test.testDate} 실시
                        </span>
                        <h5 className="text-base font-extrabold text-white">{test.testName}</h5>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        <strong>투입 데이터 규격:</strong> {test.inputSpecification}
                      </p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-xl border self-start sm:self-auto ${winnerColor.bg} ${winnerColor.text}`}>
                      🏆 승자: {test.winner.toUpperCase()}
                    </span>
                  </div>

                  {/* Exact Prompt Box */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-rose-400" /> 투입된 프롬프트 원문:
                    </span>
                    <p className="text-slate-200 leading-relaxed">{test.promptExact}</p>
                  </div>

                  {/* 4 Models Output Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* OpenAI */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400">OpenAI (ChatGPT / Canvas)</span>
                        <span className="text-[10px] text-slate-400">{test.openaiResult.status}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{test.openaiResult.outputDetail}</p>
                      {test.openaiResult.errorLog && (
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300 whitespace-pre-wrap">
                          <strong>🚨 콘솔 에러 로그:</strong><br />
                          {test.openaiResult.errorLog}
                        </div>
                      )}
                    </div>

                    {/* Google */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-400">Google (Gemini / Antigravity)</span>
                        <span className="text-[10px] text-slate-400">{test.googleResult.status}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{test.googleResult.outputDetail}</p>
                      {test.googleResult.errorLog && (
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300 whitespace-pre-wrap">
                          <strong>🚨 콘솔 에러 로그:</strong><br />
                          {test.googleResult.errorLog}
                        </div>
                      )}
                    </div>

                    {/* Anthropic */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400">Anthropic (Claude / Claude Code)</span>
                        <span className="text-[10px] text-slate-400">{test.anthropicResult.status}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{test.anthropicResult.outputDetail}</p>
                      {test.anthropicResult.errorLog && (
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300 whitespace-pre-wrap">
                          <strong>🚨 콘솔 에러 로그:</strong><br />
                          {test.anthropicResult.errorLog}
                        </div>
                      )}
                    </div>

                    {/* xAI */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400">xAI (Grok / Grok Build)</span>
                        <span className="text-[10px] text-slate-400">{test.xaiResult.status}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{test.xaiResult.outputDetail}</p>
                      {test.xaiResult.errorLog && (
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300 whitespace-pre-wrap">
                          <strong>🚨 콘솔 에러 로그:</strong><br />
                          {test.xaiResult.errorLog}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reviewer Comment */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
                    <strong className="text-white flex items-center gap-1 inline-flex mr-2">
                      <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                      {currentReview.creatorName} 실전 총평:
                    </strong>
                    {test.reviewerComment}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
