# AGENTS.md - Unified Project Constitution & Single Source of Truth
> Standard AI Engines: OpenAI Codex · Claude Code · Google Antigravity (Universal Tri-IDE Standard)
> Project: STUDY (AI Master Guide)

## 1. Essential Commands
- Dev Server: `npm run dev`
- Verification Build: `npm run build`
- Unit Tests: `npm test`
- Lint & Format: `npm run lint`

## 2. Development Principles & Safety Rules
- **Smallest Coherent Change**: Prefer small, focused changes over broad speculative rewrites.
- **Component & Pattern Reuse**: Inspect existing components and utilities before creating new ones.
- **Single Source of Truth**: Durable project instructions live centrally in `AGENTS.md`. Do not duplicate.
- **Zero Regression**: Verify behavior, not just compilation. Never delete working functionality.
- **Autonomous Execution**: Allowed to edit code, install packages (`npm i`), and run builds/tests.
- **User Approval Required**: Database destruction commands (`DROP TABLE`), force push (`git push -f`).

## 3. Documentation & Design Architecture
- Design System: Follow `docs/design/tokens.md` and `.agents/rules/ui-design.md`.
- Architecture & ADRs: Persistent knowledge lives under `docs/architecture/` and `docs/decisions/`.
- Active Skills: Reusable procedural workflows live under `.agents/skills/`.

## 4. Definition of Done
A task is complete ONLY when:
1. The requested behavior is fully implemented.
2. `npm run build` passes with 0 TypeScript/Lint/Bundle errors.
3. Tests pass and persistent docs under `docs/` are updated if persistent behavior changed.
