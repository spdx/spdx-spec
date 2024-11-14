# The System Package Data Exchange (SPDX®) Specification

The System Package Data Exchange (SPDX®) specification is an open standard
designed to represent systems containing software components as
Software Bill of Materials (SBOMs).
Additionally, SPDX supports AI, data, and security references,
making it suitable for a wide range of risk management use cases.

The SPDX standard helps facilitate compliance with free and open source
software licenses by standardizing the way license information is shared across
the software supply chain. SPDX reduces redundant work by providing a common
format for companies and communities to share important data about software
licenses and copyrights, thereby streamlining and improving compliance.

## Specification development

The specification is comprised of documents located in the `docs/` directory
of this `spdx/spdx-spec` repository, as well as a model documentation
generated from Markdown files within the
[spdx/spdx-3-model](https://github.com/spdx/spdx-3-model/) repository.

This `spdx/spdx-spec` repository holds under active development version
of the specification as:

- Markdown:
  [`development/v3.0.1`](https://github.com/spdx/spdx-spec/tree/development/v3.0.1/docs)
  branch
- HTML: `gh-pages` branch, built on every commit to the development branch
  - Current stable (v3.0.1): <https://spdx.github.io/spdx-spec/v3.0.1/>
<!--  - Development (v3.1): <https://spdx.github.io/spdx-spec/v3.1-draft/> -->

Contributions are welcome. Contributions to this repository are made pursuant to the
[SPDX Community Specification Contributor License Agreement 1.0](https://github.com/spdx/governance/blob/main/0._SPDX_Contributor_License_Agreement.md).
Please see the contributing guidelines, governance practices,
and build instructions in the
[related documents](#related-documents-and-repositories) section.

## Repository structure

This repository consists of these files and directories (partial):

- `.github/workflow` - Workflow definitions.
  - [`publish_v3.yml`](.github/workflows/publish_v3.yml)
    The website (HTML) generation workflow.
- `bin/` - Scripts for spec generation.
- `docs/` - Specification content:
  - `annexes/` - Annexes for the specification.
  - `css/` - Style sheets for HTML.
  - `front/` - Front matter.
  - `images/` - Model diagrams. These image files are to be generated from a
    diagram description file
    [model.drawio](https://github.com/spdx/spdx-3-model/blob/main/model.drawio)
    in `spdx/spdx-3-model` repo and manually copied here.
  - `licenses/` - Licenses that used by the SPDX specifications.
  - `model/` - Model files. This subdirectory _is to be created_ by a script
    from `spdx/spec-parser` repo, using model information from
    `spdx/spdx-3-model` repo (see the build instructions below).
- `examples/` - Examples of various SPDX serializations for the current version
  of the spec.
- `mkdocs.yml` - MkDocs recipe for the spec documentation generation. The
  inclusion of model files and the order of chapters are defined here.

## Branch structre

The SPDX spec repo follows the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow with the addition of support branches.

The branches in use are:

- `main` - This will always be the latest released specification.
- `develop` - This branch will be where the active development for the next major or minor version takes place.  Once released, the `develop` branch will be merged into the `main` branch.
- `support/x.y` - These branches will be long lived and contain any updates to a minor version of the specification.  Additions such as translations can be added to the support branch.  `x.y` represents the major.minor version.  Once any changes are accepted and released, the support branch will be tagged and merged into both the develop and main branches.
- General feature or fix branches - there may be feature branches made for specific enhancements or fixes to the spec.  These will be short lived and merged into either a support branch or the develop branch.

## Related documents and repositories

| Documentation | Link |
|---------|------|
| Changes between versions | [CHANGELOG.md](./CHANGELOG.md) |
| Contributing guidelines | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Building the specification website (for testing purpose) | [build.md](build.md) |
| Governance practices | [spdx/governance](https://github.com/spdx/governance/) |
| SPDX 3 model development | [spdx/spdx-3-model](https://github.com/spdx/spdx-3-model/) |
| Model specification parser | [spdx/spec-parser](https://github.com/spdx/spec-parser/) |
| How to use the specification | [spdx/using](https://github.com/spdx/using/) |
| Use cases and scenarios | [spdx/spdx-examples](https://github.com/spdx/spdx-examples/) |
| SPDX website, with more information about the specification | <https://spdx.org> |
| Official releases of the specification, including PDFs | <https://spdx.org/specifications> |
