# The System Package Data Exchange (SPDX®) Specification

The System Package Data Exchange (SPDX®) specification is an open standard
capable of representing systems with software components in as SBOMs
(Software Bill of Materials) and other AI, data and security references
supporting a range of risk management use cases.

The SPDX standard helps facilitate compliance with free and open source
software licenses by standardizing the way license information is shared across
the software supply chain. SPDX reduces redundant work by providing a common
format for companies and communities to share important data about software
licenses and copyrights, thereby streamlining and improving compliance.

This repository holds under active development version of the specification as:

- Markdown:
  [`development/v3.0.1`](https://github.com/spdx/spdx-spec/tree/development/v3.0.1/docs)
  branch
- HTML: `gh-pages` branch, built on every commit to the development branch,
  see the workflow in
  [`.github/workflows/publish_v3.yml`](.github/workflows/publish_v3.yml)
  - Current stable (v3.0.1): <https://spdx.github.io/spdx-spec/v3.0.1/>
<!--  - Development (v3.1): <https://spdx.github.io/spdx-spec/v3.1-draft/> -->

The model itself is under active development at
[spdx/spdx-3-model](https://github.com/spdx/spdx-3-model/)
repo (`main` branch).

See for the official
[releases of the specification](https://spdx.org/specifications)
or additional information also the SPDX website at <https://spdx.org>.

Information on how to use the SPDX specification is available at
[spdx/using](https://github.com/spdx/using/) repo.
Demonstrations of SPDX for various scenarios and use cases are available at
[spdx/spdx-examples](https://github.com/spdx/spdx-examples).

See [change log](./CHANGELOG.md) for changes between versions.
Contributions are welcome,
please see the [contributing guidelines](./CONTRIBUTING.md)
and [governance practices](https://github.com/spdx/governance/).

## Specification structure

This repository consists of these files and directories:

- `bin/` - Scripts for spec generation.
- `docs/` - Specification content:
  - `annexes/` - Annexes for the specification.
  - `css/` - Style sheets for HTML.
  - `images/` - Model diagrams. These image files are to be generated from a
    diagram description file
    [model.drawio](https://github.com/spdx/spdx-3-model/blob/main/model.drawio)
    in `spdx/spdx-3-model` repo and manually copied here.
  - `licenses/` - Licenses that used by the SPDX specifications.
  - `model/` - Model files*. This subdirectory _is to be created_ by a script
    from `spdx/spec-parser` repo, using model information from
    `spdx/spdx-3-model` repo (see the build instructions below).
- `examples/` - Examples of various SPDX serializations for the current version
  of the spec.
- `mkdocs.yml` - MkDocs recipe for the spec documentation generation. The
  inclusion of model files and the order of chapters are defined here.

The specification consists of documents in the `docs/` directory from this
`spdx/spdx-spec` repository and a model which is generated from Markdown files
in the `spdx/spdx-3-model` repository.

Note: The model files in the `spdx/spdx-3-model` repository use a constrained
format of Markdown. Only a limited set of headings are allowed to be processed
by the spec-parser.

## Building the specification

The specification building flow looks like this:

```text
  +-------------------+
  |[spdx-3-model]     |
  | |                 |
  | +- model/        ---- Constrained-Markdown files -+
  | |                 |                               |
  | +- model.drawio  -----------------+               |
  +-------------------+               |               |
                                      |               |
                                      |               |
  +-------------------+               v               |
  |[spdx-spec]        |            draw.io            |
  | |                 |            (manual)           |
  | +- docs/          |               |               |
  |    |              |               |               |
  |    +- annexes/    |               |               v
  |    |              |               |         spec-parser
  |    +- images/  <---- PNG images --+               |
  |    |              |                               |
  |    +- licenses/   |                               |
  |    |              |                               |
  |    +- model/   <----- Processed Markdown files ---+
  |    |              |
  |    +- index.md    |
  |    |              |
  |    +- *.md        |
  +-------------------+
          |
    mike & mkdocs
          |
          v
  +-------------------+
  |   HTML website    |
  +-------------------+
```

### Prerequisites

Apart from Git and Python, you have to have [MkDocs](http://mkdocs.org)
installed on your machine. If you don't have it yet installed please follow
these [installation instructions](http://www.mkdocs.org/#installation).

[WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation)
is also required for generating PDF files. To disable PDF generation, comment
out the these lines in your `mkdocs.yml` configuration file:

```yaml
#- pdf-export:
#    combined: true
```

### Preparing input files

Next, you have to prepare the model files, the other specification files,
and the model parser, by cloning these repositoriess:
[`spdx/spdx-3-model`](https://github.com/spdx/spdx-3-model),
[`spdx/spdx-spec`](https://github.com/spdx/spdx-spec), and
[`spdx/spec-parser`](https://github.com/spdx/spec-parser)
to these paths: `spdx-3-model`, `spdx-spec`, and `spec-parser`, respectively:

```shell
git clone https://github.com/spdx/spdx-3-model.git
git clone https://github.com/spdx/spdx-spec.git
git clone https://github.com/spdx/spec-parser.git
```

Install prerequisites for Python:

```shell
pip3 install -r spdx-spec/requirements.txt
pip3 install -r spec-parser/requirements.txt
```

### Generating formatted Markdown files for MkDocs

Model files in `spdx/spdx-3-model` repo are written in a specific format of
Markdown, with a limited set of allowed headings. The `spec-parser` processes
these model files to generate both ontology and final Markdown files suitable
for MkDocs.

The `spec-parser` also performs automatic formatting on the resulting Markdown
files. For instance, it converts a list under the "Properties" heading into a
table.

To check the model files and generate formatted files for MkDocs, run the
following command:

```shell
python3 spec-parser/main.py spdx-3-model/model spdx-spec/docs/model
```

This will create well-formatted model files in the `spdx-spec/docs/model/`
directory. This directory contains two components:

- Model ontology and diagram files: These files (`model.plantuml`,
  `spdx-context.jsonld`, `spdx-model.dot`, `spdx-model.json-ld`,
  `spdx-model.pretty-xml`, `spdx-model.ttl`, `spdx-model.xml`)
  are ready for immediate use.
- Formatted Makdown files: These files (`.md` extension) are located in various
  subdirectories and are intended for processing by MkDocs in the next step.

If the output directory already exists, the `spec-parser` will not overwrite
it. If you edited a model file and want to regenerate the formatted files, you
have to delete the existing `spdx-spec/docs/model` directory first:

```shell
rm -rf spdx-spec/docs/model
```

### Building HTML

With all spec and model files prepared, we will use MkDocs to assemble them
into a website.

In side `spdx-spec/` directory, execute a built-in dev-server that let you
preview the specification:

```shell
mkdocs serve
```

Or building a static HTML site:

```shell
mkdocs build
```

To abort the build immediately when there is a warning, enables strict mode:

```shell
mkdocs build --strict
```

To get debug messages, enables verbose output:

```shell
mkdocs build --verbose
```

## Configuring the website

Inside `spdx-spec/` directory, there is a file `mkdocs.yml`. This is a
configuration file for MkDocs.

Files intended for display and linking in the navigation bar should be
included in the `nav:` section. The order of filenames in this section
determines their order on the navigation bar.

## Specification versions on spdx.github.io/spdx-spec/

The SPDX specifications on <https://spdx.github.io/spdx-spec/> are built
by using a workflow in
[`.github/workflows/publish_v3.yml`](.github/workflows/publish_v3.yml).
This workflow uses [mike](https://github.com/jimporter/mike) to publish
multiple versions of MkDocs-powered documentation.

The published versions, their titles, and aliases are listed in the file
[versions.json](https://github.com/spdx/spdx-spec/blob/gh-pages/versions.json)
located in the `gh-pages` branch. These versions populate the version selector
dropdown on the website. The line `run: mike deploy` in the GitHub workflow
file determines the title and alias.

mike is not needed for local testing of a specific spec version.
