# Skill: debug

## Purpose
Find a reproducible root cause and repair it without masking the symptom.

## Procedure
1. Capture the exact failure, inputs, revision, logs, and environment facts available.
2. Reduce the problem to the smallest reproducible boundary.
3. Form a falsifiable hypothesis and choose an observation that can distinguish it from alternatives.
4. Apply the smallest correction supported by evidence.
5. Re-run the closest failed verifier, then broaden verification to relevant build/runtime/browser checks.
6. Do not repeat the same failed action without new information; report a blocker when materially different attempts stop producing progress.
