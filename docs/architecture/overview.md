# Architecture Overview - AI Master Guide (STUDY)
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, JSZip
- **Application Type**: Interactive AI education & prompt engineering guide web app
- **Key Modules**:
  - `src/App.tsx`: Main application coordinator and router
  - `src/components/`: Modular UI components (Navigation, GuideCards, InteractiveEditor)
  - `src/data/`: Comprehensive AI prompts, study guides, and source-traceable comparison data
- **Model Comparison Evidence**: `docs/reference/model-comparison-sources.md` records the source hierarchy, benchmark limitations, and minimum requirements for future first-party measurements.
- **Build & Verification**: `npm run build` (`tsc && vite build`) produces static assets in `dist/`.
