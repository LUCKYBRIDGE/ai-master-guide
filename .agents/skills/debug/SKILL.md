# Skill: Root Cause Debugging & Self-Healing (debug)
> Purpose: Systematic investigation of bugs, runtime crashes, and regression issues using the 5-Whys methodology.

## Workflow
1. **Reproduce & Isolate**:
   - Capture exact error messages, stack traces, and failing inputs.
   - Isolate whether the bug is in UI state, business logic, API communication, or build configuration.
2. **Root Cause Analysis (RCA)**:
   - Trace the execution flow backwards from the failure point.
   - Identify the fundamental flaw rather than applying superficial patches.
3. **Surgical Fix**:
   - Apply the minimal change required to fix the root cause.
   - Avoid modifying unrelated code or formatting.
4. **Regression Verification**:
   - Run the build and test suite to confirm the fix works and creates no collateral regressions.
