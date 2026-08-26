# Skill: implement-feature

## Purpose
Implement the smallest coherent change and use real feedback to guide correction.

## Procedure
1. Read applicable instructions and inspect the existing implementation before editing.
2. Make one coherent slice, reuse established patterns, and avoid unrelated refactors.
3. Run the closest available verifier for the slice; for this repository `npm run build` is the production type/build check.
4. Classify failures before changing code again and make the smallest evidence-supported correction.
5. Repeat only when a new hypothesis, implementation, environment assumption, or verifier changes the evidence.
6. For visible changes, verify representative browser behavior when tooling is available.
7. Review the final diff and remove temporary/generated residue before completion.
