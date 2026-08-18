import React, { useState } from 'react';
import { 
  LOCALHOST_STEPS, 
  FRAMEWORK_COMMANDS, 
  TROUBLESHOOTING_LIST 
} from '../data/localhostGuideData';
import { 
  Laptop, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  PlayCircle, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  PowerOff,
  FolderOpen,
  Code2,
  Globe
} from 'lucide-react';

interface LocalhostGuideProps {
  onCopy: (text: string, title: string) => void;
}

export const LocalhostGuide: React.FC<LocalhostGuideProps> = ({ onCopy }) => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCommand = (command: string, label: string) => {
    onCopy(command, label);
    setCopiedSnippet(command);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Laptop className="w-6 h-6" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                http://localhost:3000 로컬 테스트 완전 정복 가이드
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              AI(ChatGPT, Claude, Gemini, Grok)가 작성해 준 웹 애플리케이션 코드를 <strong>내 컴퓨터 터미널에서 명령어로 띄워 웹 브라우저에서 직접 클릭하고 테스트하는 3단계 실전 표준 프로세스</strong>입니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/30 px-3.5 py-2 rounded-xl">
            <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Target: http://localhost:3000</span>
          </div>
        </div>

        {/* What is localhost Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-blue-500/20 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/20 space-y-1">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> 1. localhost 란?
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              인터넷 세상이 아니라 <strong>"오직 내 컴퓨터 안에서만 동작하는 개인용 미니 웹 서버"</strong>를 뜻합니다. 외부에 노출되지 않아 안전하게 마음껏 테스트할 수 있습니다.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/20 space-y-1">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> 2. 포트 번호(:3000) 란?
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              내 컴퓨터라는 건물에서 <strong>"3000호실 문을 열고 접속한다"</strong>는 뜻입니다. Vite는 보통 3000 또는 5173번 방을 기본으로 사용합니다.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-blue-500/20 space-y-1">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4" /> 3. 실시간 자동 반영 (HMR)
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              서버를 켜둔 상태에서 AI나 내가 코드를 고치고 저장(Ctrl+S)하면, <strong>브라우저를 새로고침하지 않아도 화면이 0.1초 만에 즉시 바뀝니다.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* 3 Steps Interactive Walkthrough */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">
            로컬호스트 구동 3단계 표준 절차 (Step-by-Step)
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {LOCALHOST_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 space-y-4 hover:border-blue-500/40 transition-all shadow-xl"
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 font-black text-sm shadow-md">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{step.subtitle}</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                  필수 절차 {step.stepNumber}/3
                </span>
              </div>

              {/* Explanation */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.explanation}
              </p>

              {/* Terminal Code Snippet Box */}
              {step.terminalCommand && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      터미널에 입력할 명령어
                    </span>
                    <button
                      onClick={() => handleCopyCommand(step.terminalCommand!, `스텝 ${step.stepNumber} 명령어`)}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition-colors"
                    >
                      {copiedSnippet === step.terminalCommand ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>명령어 복사</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Simulation Window */}
                  <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
                    <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                        <span className="text-[11px] text-slate-400 ml-2 font-mono">Terminal (PowerShell / Command Prompt)</span>
                      </div>
                    </div>
                    <div className="p-4 font-mono text-xs text-slate-200 space-y-2 overflow-x-auto leading-relaxed">
                      <div className="text-emerald-400 font-bold">$ {step.terminalCommand}</div>
                      {step.terminalOutput && (
                        <div className="text-slate-400 text-[11px] whitespace-pre-wrap">
                          {step.terminalOutput}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pro Tips Box */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
                {step.proTips.map((tip, idx) => (
                  <p key={idx} className="text-xs text-slate-300 leading-relaxed">
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Framework Commands Comparison Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">
            주요 웹 프레임워크별 로컬 실행 명령어 치트시트
          </h3>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 font-bold uppercase tracking-wider text-slate-300">
                <th className="py-3.5 px-4 min-w-[160px]">프레임워크 / 환경</th>
                <th className="py-3.5 px-4 min-w-[140px]">기본 포트</th>
                <th className="py-3.5 px-4 min-w-[160px]">개발 서버 실행 (Dev)</th>
                <th className="py-3.5 px-4 min-w-[160px]">배포 빌드 (Build)</th>
                <th className="py-3.5 px-4 min-w-[220px]">특징 및 비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {FRAMEWORK_COMMANDS.map((fc, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{fc.framework}</div>
                    <span className="text-[10px] text-slate-400">{fc.tech}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    http://localhost:{fc.defaultPort}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <button
                      onClick={() => handleCopyCommand(fc.devCommand, `${fc.framework} 실행 명령어`)}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700/80 hover:border-blue-500 text-blue-300 font-bold flex items-center gap-1.5"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{fc.devCommand}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{fc.buildCommand}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">{fc.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">
            자주 겪는 오류 및 10초 자가 해결법 (Troubleshooting)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TROUBLESHOOTING_LIST.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-rose-400 mb-1">
                  {item.symptom}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  <strong>원인:</strong> {item.cause}
                </p>

                {item.solutionCode && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                      <span>해결 명령어</span>
                      <button
                        onClick={() => handleCopyCommand(item.solutionCode!, '해결 명령어')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        복사
                      </button>
                    </div>
                    <pre className="p-2.5 rounded-xl bg-slate-950 text-slate-200 text-[10px] font-mono whitespace-pre-wrap border border-slate-800">
                      {item.solutionCode}
                    </pre>
                  </div>
                )}

                <ul className="space-y-1 text-xs text-slate-300">
                  {item.solutionSteps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
                자가 치유 완료 후 터미널 재실행 권장
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Summary Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <PowerOff className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white">서버를 완전히 끄고 싶을 때</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">
              명령어를 실행 중인 터미널 창을 클릭하고 키보드의 <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">Ctrl + C</code>를 누르면 웹 서버가 안전하게 종료됩니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleCopyCommand('npm run dev', 'npm run dev 실행 명령어')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          <span>지금 로컬 서버 실행하기</span>
        </button>
      </div>
    </div>
  );
};
