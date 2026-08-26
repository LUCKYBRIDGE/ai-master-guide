# Skill: code-review

## Purpose
Review the exact proposed revision for defects and regression risk before approval.

## Review order
1. Functional correctness against the request and repository invariants.
2. Type/contracts and error handling.
3. Security, secrets, permissions, and unsafe external writes.
4. Regression risk, state/data loss, deployment behavior, and generated-output boundaries.
5. Performance and bundle impact where relevant.
6. Accessibility and responsive behavior for visible UI changes.
7. Architecture consistency and unnecessary abstractions.
8. Documentation/source accuracy and stale links.
9. Dead code, temporary artifacts, accidental generated files, and unrelated diff.
10. Verification evidence actually run. Do not convert a green build into a claim of zero warnings or bug-free behavior.

Report findings by severity and cite concrete files/lines when possible.
