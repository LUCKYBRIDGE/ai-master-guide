# Skill: TDD Test Generator (tdd-test-generator)
> Purpose: Generate structured test suites (Unit, Integration, Component) before or alongside implementation.

## Workflow
1. **Define Test Scenarios**:
   - Happy paths: Standard expected workflows.
   - Boundary & Edge cases: Null/undefined, empty lists, extreme values.
   - Error cases: Network failure, invalid inputs, timeout handling.
2. **Generate Test Code**:
   - Structure tests with clear `describe` / `it` or test function blocks.
   - Use clean mock fixtures and assertions.
3. **Execute & Iterate**:
   - Run test suite and ensure tests provide actionable failure messages.
