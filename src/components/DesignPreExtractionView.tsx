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
              디자인 토큰과 주요 화면 규칙을 구현 전에 정리하면 색상·간격·타이포그래피의 일관성을 높이고 변경 범위를 줄이는 데 도움이 됩니다. 다만 <strong>DESIGN.md는 업계 표준 파일 형식이 아니라 프로젝트가 선택해 쓰는 명세</strong>이며, 실제 코드 연결과 시각 회귀 검증이 함께 필요합니다.
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
          <span className="text-xs font-mono text-amber-400 uppercase">권장 작업 순서</span>
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
              <li>• 공통 토큰이 없으면 같은 값을 여러 파일에서 반복 수정할 가능성이 커짐</li>
              <li>• 반응형 규칙을 뒤늦게 정하면 화면별 수정 비용이 늘어날 수 있음</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" /> DESIGN.md를 먼저 만들고 코딩할 때 (권장)
            </span>
            <ul className="space-y-1.5 text-slate-300 leading-relaxed">
              <li>• 사람과 AI가 같은 색상·간격·타이포그래피 기준을 참조할 수 있음</li>
              <li>• CSS 변수나 디자인 토큰 코드와 연결하면 일관된 변경이 쉬워짐</li>
              <li>• 명세 변경 후에는 구현 반영 여부를 코드 검사와 실제 화면 비교로 확인해야 함</li>
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
                Google은 Stitch가 텍스트·이미지 입력으로 UI를 만들고, 디자인 시스템을 <strong>`DESIGN.md`로 가져오거나 내보내는 기능</strong>을 제공한다고 안내합니다. 생성 시간과 결과 품질은 입력·서비스 상태에 따라 달라지며, 생성물은 접근성·반응형·브랜드 규칙을 별도로 검토해야 합니다.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                👉 현재 Stitch의 Export/Import 메뉴에서 `DESIGN.md` 지원 여부를 확인한 뒤 프로젝트 명세로 저장하세요. UI와 제공 범위는 업데이트될 수 있습니다.
              </div>
              <a
                href="https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-indigo-400 hover:underline"
              >
                <span>Google 공식 Stitch 업데이트</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
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
                👉 Dev Mode 수치는 구현 참고자료입니다. 폰트 렌더링·브라우저·콘텐츠 길이에 따른 차이가 있으므로 오버레이 또는 스크린샷 비교로 최종 확인하세요.
              </div>
            </div>
          )}

          {selectedTool === 'artifacts' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-white text-sm">💻 Claude Artifacts (클로드 미리보기 창)</span>
                <a
                  href="https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"
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
              <Code2 className="w-4 h-4" /> 프로젝트용 DESIGN.md 예시
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
