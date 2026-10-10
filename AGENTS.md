# AGENTS.md

## Project Workflow

Apply these rules to all future work in this repository.

### Before implementation

- Start substantial work with a concise brief that defines the client problem, target audience, demo story, inputs, outputs, scope boundaries, acceptance criteria, and definition of done.
- Consolidate related product decisions into one structured requirements review. Avoid a long sequence of isolated micro-questions when the choices can be presented together.
- Before changing the interface, inventory the relevant states: empty, loading, processing, success, warning, error, review, disabled, recovery, mobile, and dark theme.
- Treat features introduced after scope approval as scope changes. Explain their effect on architecture, tests, documentation, interface states, and release work before implementing them.

### Implementation

- Establish and preserve one documented local development path, one stable localhost preview, a deterministic build, automated tests, and CI.
- Implement and verify a complete vertical slice early: input, analysis, transformation, review, and export.
- Keep generated artifacts reproducible from source with one command. Do not manually maintain both TypeScript source and generated JavaScript.
- Use realistic demo data that visibly exercises every advertised capability and important failure case.
- Preserve original data for uncertain corrections. Present a recommendation and require an explicit user choice before replacing uncertain values.
- Dynamic hints, warnings, and validation messages must not shift neighboring controls.
- Every visible status must represent real application state. Every button and selector must perform a necessary, understandable action.
- Remove redundant information, decorative statuses, inactive controls, stale comments, and obsolete code.

### Verification

- During development, run focused regression checks for the behavior being changed. Reserve the complete audit matrix for meaningful milestones and the final release.
- Test real browser behavior, not only internal functions. Include manual editing, warnings, exported files, responsive widths, dark theme, keyboard accessibility, errors, and recovery.
- After integrating all approved features, run an end-to-end smoke test because cross-feature interactions may expose defects that isolated tests miss.
- Inspect generated output directly; a successful download alone is not sufficient verification.
- When a local toolchain failure is confirmed to be environmental, stop repeating the same attempt. Use a clean CI environment where appropriate and report the verification boundary honestly.
- Do not attribute browser tooling, annotation, or cursor behavior to application code without a reproducible comparison against an unrelated control page.

### Release and completion

- Do not describe the project as finished or publish repeatedly while major features remain undecided.
- Release through a separate branch, verified CI, explicit approval immediately before the external update, and a smoke test of the deployed public version.
- Before declaring completion, confirm that:
  - every visible status reflects real state;
  - every control is necessary and functional;
  - the interface is understandable without technical explanation;
  - critical success, boundary, failure, and recovery paths are covered;
  - small-screen and dark-theme layouts remain stable;
  - CI passed on the intended release commit;
  - the public deployment was checked;
  - remaining risks and limitations are stated explicitly.

## Process Goal

Front-load decisions, keep the delivery path deterministic, minimize repeated audits and releases, and finish with one comprehensive verification and gated release cycle.
