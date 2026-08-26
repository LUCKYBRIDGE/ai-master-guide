# Skill: continue-work

## Purpose
Resume work safely when the current session does not contain enough reliable state.

## Procedure
1. Prefer current-session context when it is sufficient; do not create recovery documents unnecessarily.
2. When durable recovery is needed, read the active task/checkpoint under `docs/tasks/` if one exists.
3. Reconcile that checkpoint with the actual branch, revision, diff, current files, and available CI evidence. Repository reality wins over stale notes.
4. Confirm completed work, unresolved risks, and one best next action.
5. Resume the normal implementation/debug/review loop in the current client.
6. Use cross-client handoff metadata only when the user explicitly requested a handoff.
