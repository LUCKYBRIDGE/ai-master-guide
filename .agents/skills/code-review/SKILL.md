# Skill: 10-Dimensional Code Review (code-review)
> Purpose: Rigorous multi-dimensional code quality inspection prior to completion.

## 10-Point Inspection Matrix
1. **Correctness**: Does the code accurately satisfy all user requirements and edge cases?
2. **Type Safety & Contracts**: Are TypeScript types/interfaces strict and free of arbitrary `any`?
3. **Security & Secrets**: Are inputs sanitized? Are secrets excluded from code?
4. **Performance**: Are there unnecessary re-renders, memory leaks, or unmemoized heavy loops?
5. **Component & Pattern Reuse**: Does it follow existing architecture without reinventing wheels?
6. **Error Handling**: Are asynchronous errors gracefully caught with user-friendly fallbacks?
7. **Accessibility (a11y)**: Are ARIA roles, alt texts, and keyboard navigation supported?
8. **Design Consistency**: Does UI strictly follow `docs/design/tokens.md` and Tailwind rules?
9. **Zero Dead Code**: Are unused imports, console logs, and temporary variables removed?
10. **Build & Test Pass**: Does `npm run build` succeed with 0 errors and 0 warnings?
