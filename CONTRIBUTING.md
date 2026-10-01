# Contributing to Jam&Sw

Feature work in the Jam&Sw organization follows the **OpenSpec format**. It
makes changes reviewable, testable, and honest: a reader should be able to
understand why a change exists, what the correct behavior is, and exactly how
to verify it, without reading the diff first.

## When the OpenSpec format is required

The format applies to **feature changes**: anything that adds or alters a
requirement or user-visible behavior. The reusable workflow classifies a PR
as a feature when its title starts with `feat:` (optionally with a scope or
breaking-change marker), its source branch starts with `feat/`, or it has the
`feature` or `enhancement` label. It classifies an issue as a feature request
when its title starts with `[Feature` or it has either label; feature-request
issues are then skipped because their form is not format-checked.

Everything else is exempt from the spec sections: `docs:`, `chore:`, `fix:`,
`ci:`, `test:`, `refactor:`, `style:`, `build:`, and `perf:` changes, along
with bug reports and other non-feature issues. Write a plain Summary / Changes
/ Verification body for PRs. Forcing requirement language and
GIVEN/WHEN/THEN scenarios onto a docs typo or a dependency bump adds noise,
not clarity.

Feature changes must carry the `openspec` label. The reusable workflow does
not verify or apply that label; maintainers are responsible for applying it.

## The OpenSpec format

A **feature PR** body contains the general PR sections (Summary, Changes,
and Verification) plus the OpenSpec sections below. Feature-request issues
use the feature form and are skipped by the reusable workflow; bug reports
and other issues follow the issue checks described under Enforcement.

### 1. Why

A concise statement of the problem and its impact. Not "what I did": *why
it matters*. One or two sentences is usually enough.

### 2. What Changes

A bullet summary of the change. Each bullet is one observable difference in
behavior or structure.

### 3. MODIFIED Requirements

The correct behavior, stated formally in **RFC 2119 language** (see below).
For changed behavior, include a `(Previously: ...)` note describing the old
or broken state, so the delta is explicit:

```markdown
### Requirement: Draft preservation
The capture panel SHALL preserve unsaved draft content when dismissed,
and MUST restore it when the panel is next summoned.
(Previously: dismissing the panel discarded the draft silently.)
```

New requirements use `ADDED Requirements`; removed ones use
`REMOVED Requirements` with the rationale.

### 4. Scenario

A concrete, observable **GIVEN / WHEN / THEN** test case a reviewer can
follow step-by-step to verify the change. Embed before/after screenshots
directly in context where they help.

```text
GIVEN the capture panel is open with the text "buy milk" typed
WHEN the user presses Escape and then re-opens the panel
THEN the panel displays "buy milk" in the input field
```

### 5. Verification

A numbered checklist using hierarchical numbering (`1.1`, `1.2`, …) that
maps directly onto the scenario. In PRs, check the boxes off as you verify
each step.

## RFC 2119 conventions

Requirement language follows [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119):

| Keyword | Meaning |
| --- | --- |
| **MUST** / **SHALL** | An absolute requirement. The change is wrong if this does not hold. |
| **MUST NOT** / **SHALL NOT** | An absolute prohibition. |
| **SHOULD** / **SHOULD NOT** | A strong recommendation; deviations need a documented reason. |
| **MAY** | Truly optional behavior. |

Write keywords in UPPERCASE so they are unambiguous and machine-checkable.
Each requirement statement names its subject explicitly ("The capture panel
SHALL…", never "It should…").

## Enforcement

- The reusable workflow
  [`validate-openspec.yml`](.github/workflows/validate-openspec.yml) checks
  every PR body for Summary and Changes; it also checks Verification for PRs.
  When a PR is classified as a feature, it additionally requires Why, What
  Changes, a Requirements heading and SHALL/MUST keyword, a GIVEN/WHEN/THEN
  scenario, and a numbered Verification checklist. Repositories opt in with
  the caller in [`examples/validate.yml`](examples/validate.yml).
- Issues labeled `feature` or `enhancement`, or with a title beginning
  `[Feature`, are skipped by the workflow. Other issue bodies are checked for
  Summary (or Why) and Changes (or What Changes); if labeled `openspec`, they
  are also checked for the requirements, keyword, scenario, and verification
  checklist. The workflow does not require or apply the `openspec` label.
- A body missing its applicable sections fails the check, gets a `needs-info`
  label, and gets a comment listing what's missing. The label is removed once
  the body is fixed or no longer subject to the checks.

## Repository-local overrides

A repository that defines its own templates overrides these organization
defaults. Only do this when a repo genuinely needs extra fields: keep the
OpenSpec sections intact.
