# Contributing to Jam-Sw

Sections are cited by number, for example "missing §1.3". The format check
(§5) uses the same numbers in its comments.

## §1 Every pull request

A PR body contains these three sections, in order:

### §1.1 Summary

Why the change exists and what it affects, in one or two sentences. Not
"what I did": *why it matters*.

### §1.2 Changes

A bullet list. Each bullet is one observable difference in behavior or
structure.

### §1.3 Verification

A checkbox list of what was run or checked to prove the change works. Tick
each box as you verify it.

```markdown
## Summary

Apply the license the product register assigns to this repo.

## Changes

- Add `LICENSE` and `EULA.txt`
- Link both from the README

## Verification

- [x] `swift build` passes
- [x] README links resolve
```

The headings `Why` and `What Changes` are accepted in place of `Summary`
and `Changes`.

## §2 Spec changes

A PR that adds, changes, or removes product behavior carries the `openspec`
label and, in addition to §1, the two parts below. Chores, docs, CI,
licensing, and dependency updates do not need them.

### §2.1 Requirements

The correct behavior, stated in RFC 2119 language (§4), under one of three
headings: `ADDED Requirements`, `MODIFIED Requirements`, or
`REMOVED Requirements` (with the rationale).

```markdown
## ADDED Requirements

### Requirement: Draft preservation
The capture panel SHALL preserve unsaved draft content when dismissed,
and MUST restore it when the panel is next summoned.
```

### §2.2 Scenario

At least one concrete **GIVEN / WHEN / THEN** case a reviewer can follow
step by step. It may sit under its requirement or under its own `Scenario`
heading. Embed before/after screenshots where they help.

```text
GIVEN the capture panel is open with the text "buy milk" typed
WHEN the user presses Escape and then re-opens the panel
THEN the panel displays "buy milk" in the input field
```

## §3 Issues

- **§3.1** Bug reports use the bug form, which asks for Why, What Changes,
  MODIFIED Requirements, Scenario, and Verification, and applies the
  `openspec` label.
- **§3.2** Feature requests use the feature form (Problem Statement,
  Proposed Solution, Solution Landscape) and are not format-checked.
- **§3.3** Any other issue has a Summary (or Why) and a Changes (or What
  Changes) section.

## §4 RFC 2119 conventions

Requirement language follows [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119):

| Keyword | Meaning |
| --- | --- |
| **MUST** / **SHALL** | An absolute requirement. The change is wrong if this does not hold. |
| **MUST NOT** / **SHALL NOT** | An absolute prohibition. |
| **SHOULD** / **SHOULD NOT** | A strong recommendation; deviations need a documented reason. |
| **MAY** | Truly optional behavior. |

- **§4.1** Write keywords in UPPERCASE so they are unambiguous and
  machine-checkable.
- **§4.2** Each requirement statement names its subject explicitly ("The
  capture panel SHALL…", never "It should…").

## §5 Enforcement

- **§5.1** Blank issues are disabled by the organization's default issue
  templates. A repository with its own templates sets this itself (§6).
- **§5.2** The reusable workflow
  [`validate-openspec.yml`](.github/workflows/validate-openspec.yml) checks
  every PR for §1.1–§1.3. Feature PRs are additionally checked for §2.1,
  §2.2, and a numbered §1.3 checklist. A PR is classified as a feature when
  its title starts with `feat:`
  (optionally scoped or marked as breaking), its source branch starts with
  `feat/`, or it has the `feature` or `enhancement` label. Repositories opt in
  with the caller in [`examples/validate.yml`](examples/validate.yml).
- **§5.3** Issues labeled `feature` or `enhancement`, or with a title beginning
  `[Feature`, use the feature-request form and are skipped. Other issues are
  checked for Summary (or Why) and Changes (or What Changes); issues labeled
  `openspec` are also checked for §2.1, §2.2, and a numbered Verification
  checklist. The workflow does not require or apply the `openspec` label;
  maintainers apply it as required by §2.
- **§5.4** Bot-authored PRs and issues are exempt.
- **§5.5** A body missing applicable sections fails the check, gets a
  `needs-info` label, and gets a comment listing the missing sections by
  number. The label is removed once the body is fixed or no longer subject to
  the checks.

## §6 Repository-local overrides

A repository that defines its own templates overrides these organization
defaults. Only do this when a repo needs extra fields, and keep §1 intact.
