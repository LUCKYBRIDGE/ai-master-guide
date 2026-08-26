import React, { Suspense, lazy, useState } from 'react';
import { Header, TabType } from './components/Header';
import { ModelRankingComparisonView } from './components/ModelRankingComparisonView';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const DesignPreExtractionView = lazy(() =>
  import('./components/DesignPreExtractionView').then((module) => ({ default: module.DesignPreExtractionView })),
);
const SystemHarnessEngineeringView = lazy(() =>
  import('./components/SystemHarnessEngineeringView').then((module) => ({ default: module.SystemHarnessEngineeringView })),
);
const McpHubGuideView = lazy(() =>
  import('./components/McpHubGuideView').then((module) => ({ default: module.McpHubGuideView })),
);
const VisualDevRoadmapView = lazy(() =>
  import('./components/VisualDevRoadmapView').then((module) => ({ default: module.VisualDevRoadmapView })),
);
const InfraArchitectureGuideView = lazy(() =>
  import('./components/InfraArchitectureGuideView').then((module) => ({ default: module.InfraArchitectureGuideView })),
);

function TabLoadingFallback() {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/50 text-sm text-slate-400">
      화면을 불러오는 중입니다.
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('models-ranking');
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
        showToast('클립보드 복사 완료');
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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6">
        {activeTab === 'models-ranking' ? (
          <ModelRankingComparisonView />
        ) : (
          <Suspense fallback={<TabLoadingFallback />}>
            {activeTab === 'design-pre-extraction' && <DesignPreExtractionView onCopy={handleCopyText} />}
            {activeTab === 'system-engineering' && <SystemHarnessEngineeringView onCopy={handleCopyText} />}
            {activeTab === 'mcp-hub' && <McpHubGuideView onCopy={handleCopyText} />}
            {activeTab === 'dev-roadmap' && <VisualDevRoadmapView onCopy={handleCopyText} />}
            {activeTab === 'infra-architecture' && <InfraArchitectureGuideView onCopy={handleCopyText} />}
          </Suspense>
        )}
      </main>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      <Footer />
    </div>
  );
}

export default App;
