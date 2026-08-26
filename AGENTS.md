# AI Master Guide Working Agreements

## Project state and scope

- State: active
- Root: `/Volumes/WAN2/apps/ai-master-guide`
- Scope: React/Vite website containing AI model comparisons, measured artifact reviews, and AI development guides.
- Source of truth: `src/` for website content and behavior. `dist/` is generated output, is ignored by Git, and must not be edited or treated as source.
- Public release target: GitHub `main` branch and GitHub Pages workflow. Commit, push, merge, or deploy only when the user explicitly requests the corresponding write action.
- Cloudflare Pages/Workers may be used for preview or secondary validation; `wrangler.jsonc` consumes a fresh `./dist` build.

## Commands

- Development server: `npm run dev`
- Production build and TypeScript check: `npm run build`
- Built-site preview: `npm run preview`
- No test or lint script is currently defined in `package.json`. Do not claim either check ran and do not invent substitute commands.

## Content accuracy

- Prefer provider documentation, official repositories, standards bodies, and benchmark owners as primary sources.
- Separate provider-reported results, independent benchmarks, and this project's own artifact evaluations.
- Every numerical performance claim needs a named source, model/version, evaluation condition, and date or snapshot context.
- Do not present invented composite scores, estimated timings, popularity rankings, or unsupported labels such as “gold standard”, “expert-certified”, “perfect”, or “100% compatible”.
- Product features, pricing, model names, package names, commands, laws, and education policies must be checked against current authoritative sources before publication.
- Tests and builds show evidence for the checked scope; they do not prove that software or AI output is bug-free.
- Files marked `@deprecated` are unpublished legacy content and must not be reconnected until their factual claims satisfy the source requirements above.

## Harness v2 execution model

- Work in the current AI client by default. Do not choose, rank, or switch to another AI client on the user's behalf.
- Cross-client handoff occurs only when the user explicitly requests it. Persist only the minimum repository-local state needed for a safe continuation.
- A recommendation document or config example does not prove that an MCP, browser, connector, subagent, or external service is installed or available. Inspect the capabilities of the current client/session first.
- Do not install MCP servers, authenticate accounts, widen permissions, or commit credentials unless explicitly requested.
- Existing-project adoption is merge/diff-first. Preserve project-specific rules and inspect existing config before introducing generic Harness files.

### Core 6 procedural skills

The repository keeps these shared procedures under `.agents/skills/` and mirrors them under `.claude/skills/` for Claude Code:

1. `plan-feature`
2. `continue-work`
3. `implement-feature`
4. `debug`
5. `code-review`
6. `verify-release`

Optional procedures are added only when the project has a concrete recurring need. Core workflow transitions do not require a router skill.

## Evidence-driven implementation

- Make narrow changes in source files and preserve unrelated work.
- Frame the smallest coherent change, execute it, inspect the closest useful evidence, and adjust from that evidence rather than repeating the same failed action.
- Use only checks that exist or can be run in the current environment. A missing check is not a passing result.
- For visible changes, run `npm run build` and check affected flows in a real browser at representative desktop and mobile widths when browser tooling is available.
- For release readiness, verify the exact branch/revision, production build, relevant browser flows, generated-output policy, external links, secret exposure, and final diff scope. Release verification is an additional gate, not a substitute for implementation feedback.

## Git and deployment safety

- Do not edit `main` directly for implementation work; use a branch and pull request unless the user explicitly directs otherwise.
- Never force-push or delete branches without explicit approval.
- The PR build workflow validates `npm ci` + `npm run build` and does not deploy.
- Production deployment remains a `main` push workflow. Do not trigger or merge a production release without explicit user approval.

## Final review

- Review the final diff for stale generated files, secrets, unsupported claims, broken official links, accidental complexity, and unrelated edits.
- Keep durable source notes in `docs/reference/content-audit-sources.md` when factual claims or source policy changes.
