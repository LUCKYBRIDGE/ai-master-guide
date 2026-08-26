# Skill: verify-release

## Purpose
Evaluate whether an exact branch/revision has enough evidence to be considered merge or release ready.

## Procedure
1. Record the exact branch and commit being verified and confirm the intended production target.
2. Run `npm ci` and `npm run build` in a clean CI-compatible environment.
3. Verify representative desktop/mobile flows for changed behavior when browser tooling is available, including console/page errors.
4. For this repository, verify Harness ZIP download when the Harness UI changes and confirm Vite relative asset paths remain compatible with GitHub Pages.
5. Confirm `dist/` is generated and untracked, deployment workflows consume fresh `./dist`, and no secrets/credentials are introduced.
6. Inspect dependency audit output proportionally; distinguish runtime exposure from development-only tooling and avoid forced breaking fixes.
7. Review final diff scope and CI results. Missing required evidence remains an explicit risk, not a pass.
8. Do not merge or deploy unless the user explicitly requested that write action.
