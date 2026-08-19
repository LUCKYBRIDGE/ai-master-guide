# Testing & Quality Assurance Rules

## 1. Core Testing Tenets
- **Smallest Verifiable Unit**: Test isolated functions, pure utilities, and edge cases.
- **Zero Regressions**: Existing passing tests must remain green. Verify behavior, not just compilation.
- **Deterministic Tests**: Avoid test flakiness; mock external network calls and time-sensitive APIs.
- **Build Verification**: Any code change must be validated with the project build command (`npm run build`) resulting in 0 errors.

## 2. Test Execution Workflow
1. Write/review test cases before or alongside feature changes (TDD mindset).
2. Run project tests: check test suite before committing.
3. Validate bundle build: ensure zero TypeScript/linter/bundler errors.
