import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Palette, 
  ExternalLink,
  Laptop,
  Code2
} from 'lucide-react';

interface DesignPreExtractionViewProps {
  onCopy?: (text: string, title: string) => void;
}

export const DesignPreExtractionView: React.FC<DesignPreExtractionViewProps> = ({ onCopy }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<'stitch' | 'figma' | 'artifacts'>('stitch');

  const sampleDesignMd = `# DESIGN.md - 프로젝트 디자인 규격서

## 1. 컬러 팔레트 (Color Palette)
- Primary (메인 포인트): #3182F6 (Toss Blue)
- Background (기본 배경): #0F172A (Slate 900)
- Surface / Card (카드 배경): #1E293B (Slate 800)
- Text Primary (기본 글자): #F8FAFC (Slate 50)
- Text Secondary (보조 글자): #94A3B8 (Slate 400)
- Success / Danger: #10B981 / #EF4444

## 2. 타이포그래피 (Typography)
- Font Family: Pretendard, -apple-system, sans-serif
- Title / Heading: 20px Bold (700)
- Body: 14px Regular (400)
- Caption: 11px Medium (500)

## 3. 여백 및 곡률 규칙 (Spacing & Radius)
- Base Grid: 4px 기준 (p-2=8px, p-4=16px, p-6=24px)
- Button Radius: rounded-xl (12px)
- Card Radius: rounded-2xl (16px)`;

  const handleCopy = () => {
    if (onCopy) {
      onCopy(sampleDesignMd, 'DESIGN.md');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(sampleDesignMd);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Palette className="w-5 h-5 text-purple-300" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                앱·웹 디자인 & 토큰(DESIGN.md) 사전 확립 가이드
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              앱과 웹을 개발할 때는 <strong>코딩을 시작하기 전에 디자인과 디자인 토큰(DESIGN.md)을 먼저 확립</strong>해야 합니다. 그래야 추후 화면을 수정할 때 레이아웃 깨짐과 비효율적인 중복 수정을 원천 차단할 수 있습니다.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs text-purple-300 font-medium px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Design-First Architecture</span>
          </div>
        </div>
      </div>

      {/* Why Design-First is Critical */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
        <div className="space-y-1 pb-3 border-b border-slate-800">
          <span className="text-xs font-mono text-amber-400 uppercase">골든 룰 (Golden Rule)</span>
          <h4 className="text-lg font-bold text-white">
            왜 코딩보다 디자인 토큰을 먼저 만들어야 하는가?
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
            <span className="font-bold text-rose-400 flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-4 h-4" /> 디자인 없이 바로 코딩부터 시작할 때 (위험)
            </span>
            <ul className="space-y-1.5 text-slate-300 leading-relaxed">
              <li>• 버튼 색상, 여백 크기, 폰트 규격이 컴포넌트마다 제각각으로 작성됨</li>
              <li>• 나중에 버튼 색이나 패딩 하나 바꿀 때 30개 파일의 CSS를 일일이 수동 수정해야 함</li>
              <li>• 모바일 반응형 화면으로 전환 시 레이아웃이 깨지고 정렬이 틀어짐</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" /> DESIGN.md를 먼저 만들고 코딩할 때 (권장)
            </span>
            <ul className="space-y-1.5 text-slate-300 leading-relaxed">
              <li>• AI 에이전트가 DESIGN.md에 적힌 색상 코드(#3182F6)와 4px 여백만 엄격히 준수</li>
              <li>• 프론트엔드 전체 화면의 룩앤필(Look & Feel)이 통일되어 완성도 극대화</li>
              <li>• 디자인을 바꿀 때 DESIGN.md 파일 1개만 수정하면 AI가 전체 컴포넌트를 일괄 리팩토링</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3 Design Sources Workflow */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h4 className="text-base sm:text-lg font-bold text-white">
            3대 디자인 도구에서 디자인 & 토큰 뽑아내기
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedTool('stitch')}
            className={`p-4 rounded-2xl text-left transition-all border ${
              selectedTool === 'stitch'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-400 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <span className="text-[10px] block opacity-70">AI 무한 캔버스</span>
            <span className="text-sm font-bold block mt-0.5">1. Google Stitch</span>
          </button>

          <button
            onClick={() => setSelectedTool('figma')}
            className={`p-4 rounded-2xl text-left transition-all border ${
              selectedTool === 'figma'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-400 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <span className="text-[10px] block opacity-70">디자이너 시안</span>
            <span className="text-sm font-bold block mt-0.5">2. Figma Dev Mode</span>
          </button>

          <button
            onClick={() => setSelectedTool('artifacts')}
            className={`p-4 rounded-2xl text-left transition-all border ${
              selectedTool === 'artifacts'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-400 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800'
            }`}
          >
            <span className="text-[10px] block opacity-70">실시간 React 미리보기</span>
            <span className="text-sm font-bold block mt-0.5">3. Claude Artifacts</span>
          </button>
        </div>

        {/* Selected Tool Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl text-xs">
          {selectedTool === 'stitch' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-sm">🎨 Google Stitch (stitch.withgoogle.com)</span>
                <a
                  href="https://stitch.withgoogle.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:underline"
                >
                  <span>웹사이트 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed">
                피그마를 다룰 줄 몰라도 "토스 느낌의 다크모드 주식 호가창 UI 만들어줘"라고 말하거나 종이 스케치 사진을 올리면 10초 만에 화면 레이아웃과 <strong>`DESIGN.md` (디자인 토큰 규격)</strong>를 자동 생성합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                👉 우측 상단 [Export] ➔ `DESIGN.md` 다운로드 후 내 프로젝트 루트(`./DESIGN.md`)에 저장하면 끝!
              </div>
            </div>
          )}

          {selectedTool === 'figma' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-sm">📐 Figma Dev Mode (피그마 개발자 모드)</span>
                <a
                  href="https://www.figma.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:underline"
                >
                  <span>Figma 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed">
                디자이너가 완성해준 피그마 화면에서 Auto Layout(Flexbox) 속성과 CSS Variables(패딩 24px, 둥글기 12px, 메인 색상)를 확인하여 텍스트로 복사하거나 화면을 캡처해 `docs/preview.png`로 저장합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                👉 피그마 Dev Mode에서 추출한 CSS 수치를 프롬프트의 [참고자료]에 넣어주면 완벽히 일치하게 코딩됩니다.
              </div>
            </div>
          )}

          {selectedTool === 'artifacts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-sm">💻 Claude Artifacts (클로드 미리보기 창)</span>
                <a
                  href="https://docs.anthropic.com/en/docs/build-with-claude/artifacts"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:underline"
                >
                  <span>공식 가이드</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed">
                클로드 대화창에서 원하는 화면을 요청하고, 우측 Artifacts 창에서 실제 버튼을 클릭해보며 동작과 애니메이션을 검증합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                👉 [Copy Code]를 눌러 `temp/Prototype.tsx`에 저장한 뒤, 에이전트에게 모듈 분할을 요청하세요.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Sample DESIGN.md Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-indigo-300 font-bold flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> 표준 DESIGN.md 파일 예시
            </span>
            <p className="text-xs text-slate-400">내 프로젝트 루트에 `./DESIGN.md` 파일로 저장하여 사용하세요.</p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md self-start sm:self-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : 'DESIGN.md 복사'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-[500px]">
          {sampleDesignMd}
        </pre>
      </div>
    </div>
  );
};
