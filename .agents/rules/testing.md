# Verification & Quality Rules

- Use the closest useful verifier for each changed slice and broaden verification as confidence grows.
- The repository currently defines no `test` or `lint` script. Do not claim those checks ran and do not invoke nonexistent scripts.
- `npm run build` is the repository's production TypeScript + Vite build check and must succeed for code changes before completion is claimed.
- For visible UI changes, verify affected behavior in a real browser at representative desktop and mobile widths when browser tooling is available.
- A successful build proves only build/type compatibility for that revision; it does not establish runtime, browser, content, or release correctness.
- If a required verifier cannot run, record the missing evidence instead of treating it as success.
