# Jam&Sw organization defaults

This repository provides organization-wide defaults for every Jam-Sw repo:

- **[`profile/README.md`](profile/README.md)**: the public organization
  profile shown at [github.com/Jam-Sw](https://github.com/Jam-Sw).
- **[`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/)**: OpenSpec issue
  forms (blank issues disabled), inherited by every repo without its own
  templates.
- **[`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md)** -
  OpenSpec pull request template.
- **[`CONTRIBUTING.md`](CONTRIBUTING.md)**: the OpenSpec format and RFC 2119
  conventions.
- **[`.github/workflows/validate-openspec.yml`](.github/workflows/validate-openspec.yml)** -
  reusable workflow that validates issue/PR bodies contain the required
  OpenSpec sections, labeling and commenting when they don't.
- **[`examples/validate.yml`](examples/validate.yml)**: the two-line caller
  workflow each repo copies to opt in to validation.

A repository with its own community health files overrides these defaults.
