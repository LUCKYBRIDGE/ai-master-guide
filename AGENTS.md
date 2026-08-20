# AI Master Guide Working Agreements

## Project state and scope

- State: active
- Root: `/Volumes/WAN2/apps/ai-master-guide`
- Scope: React/Vite website containing AI model comparisons, measured artifact reviews, and AI development guides.
- Source of truth: `src/` for website content and behavior. `dist/` is generated output and is not edited directly.
- Public release target: GitHub `main` branch and GitHub Pages workflow. Commit, push, or deploy only when the user explicitly requests it.

## Commands

- Development server: `npm run dev`
- Production build and TypeScript check: `npm run build`
- Built-site preview: `npm run preview`
- No test or lint script is currently defined in `package.json`. Do not claim either check ran.

## Content accuracy

- Prefer provider documentation, official repositories, standards bodies, and benchmark owners as primary sources.
- Separate provider-reported results, independent benchmarks, and this project's own artifact evaluations.
- Every numerical performance claim needs a named source, model/version, evaluation condition, and date or snapshot context.
- Do not present invented composite scores, estimated timings, popularity rankings, or unsupported labels such as “gold standard”, “expert-certified”, “perfect”, or “100% compatible”.
- Product features, pricing, model names, package names, commands, laws, and education policies must be checked against current authoritative sources before publication.
- Tests show evidence for the tested scope; they do not prove that software or AI output is bug-free.
- Files marked `@deprecated` are unpublished legacy content and must not be reconnected until their factual claims satisfy the source requirements above.

## Implementation and verification

- Make narrow changes in source files and preserve unrelated work.
- For visible changes, run `npm run build` and check the affected flows in a real browser at desktop and mobile widths.
- Review the final diff for stale generated files, secrets, unsupported claims, and broken official links.
- Keep durable source notes in `docs/reference/content-audit-sources.md` when factual claims or source policy changes.
