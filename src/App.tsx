import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { ModelRankingComparisonView } from './components/ModelRankingComparisonView';
import { DesignPreExtractionView } from './components/DesignPreExtractionView';
import { SystemHarnessEngineeringView } from './components/SystemHarnessEngineeringView';
import { McpHubGuideView } from './components/McpHubGuideView';
import { VisualDevRoadmapView } from './components/VisualDevRoadmapView';
import { InfraArchitectureGuideView } from './components/InfraArchitectureGuideView';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('models-ranking');
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
  };

  const handleCopyText = (text: string, title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`'${title}' 내용이 클립보드에 복사되었습니다!`);
      }).catch(() => {
        showToast(`클립보드 복사 완료`);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(`'${title}' 내용이 클립보드에 복사되었습니다!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header with 6 Master Tabs */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Tab 1: AI 모델 공식 데이터와 출처별 성능 비교 */}
        {activeTab === 'models-ranking' && (
          <ModelRankingComparisonView />
        )}

        {/* Tab 2: 앱·웹 디자인 사전 추출 (Stitch, Figma, Tokens) */}
        {activeTab === 'design-pre-extraction' && (
          <DesignPreExtractionView onCopy={handleCopyText} />
        )}

        {/* Tab 3: 개발 환경 & ZIP 다운로드 (지침, 스킬, 서브에이전트) */}
        {activeTab === 'system-engineering' && (
          <SystemHarnessEngineeringView onCopy={handleCopyText} />
        )}

        {/* Tab 4: MCP 연결 허브 & 가이드 (Playwright, Filesystem, GitHub 등) */}
        {activeTab === 'mcp-hub' && (
          <McpHubGuideView onCopy={handleCopyText} />
        )}

        {/* Tab 5: 시각적 웹·앱 개발 로드맵 & 계획 수립 */}
        {activeTab === 'dev-roadmap' && (
          <VisualDevRoadmapView onCopy={handleCopyText} />
        )}

        {/* Tab 6: 인프라 의사결정: 보안 · DB · 서버 가이드 */}
        {activeTab === 'infra-architecture' && (
          <InfraArchitectureGuideView onCopy={handleCopyText} />
        )}
      </main>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
