---
agent: builder
model: GPT-5 mini (copilot)
name: build-next-step
description: "Implement the next step of the CoreInstancer build plan. Run this prompt and let the agent work autonomously."
---

Read `docs/project-plan` and find the next step with status `not-started`. Then implement it fully following your workflow: update status, write code, write tests, run quality gates, update checklist and agent notes.

If all steps are completed, report that the build plan is finished.
