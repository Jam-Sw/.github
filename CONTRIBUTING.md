# Contributing to Jam&Sw

Feature work in the Jam&Sw organization follows the **OpenSpec format**. It
makes changes reviewable, testable, and honest: a reader should be able to
understand why a change exists, what the correct behavior is, and exactly how
to verify it, without reading the diff first.

## When the OpenSpec format is required

The format applies to **feature changes**: anything that adds or alters a
requirement or user-visible behavior. A change is treated as a feature when
its title uses the conventional `feat:` prefix or its branch starts with
`feat/`.

Everything else is exempt and needs no spec sections: `docs:`, `chore:`,
`fix:`, `ci:`, `test:`, `refactor:`, `style:`, `build:`, and `perf:` changes,
along with bug reports and other non-feature issues. Write a plain Summary /
Changes / Verification body for those. Forcing requirement language and
GIVEN/WHEN/THEN scenarios onto a docs typo or a dependency bump adds noise,
not clarity.

## The OpenSpec format

Every **feature** issue and PR body contains these sections, in order:

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
  feature issue and PR bodies for the required sections. Repositories opt in
  with the two-line caller in [`examples/validate.yml`](examples/validate.yml).
- The workflow only runs its checks on feature changes (title `feat:` or
  branch `feat/`, or an issue labeled `feature`/`enhancement`). Non-feature
  changes pass automatically.
- Feature bodies missing sections get a `needs-info` label and a comment
  listing what's missing; the label is removed automatically once the body is
  fixed, or once the change is reclassified as non-feature.

## Repository-local overrides

A repository that defines its own templates overrides these organization
defaults. Only do this when a repo genuinely needs extra fields: keep the
OpenSpec sections intact.
