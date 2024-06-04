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

- [Markdown](https://github.com/spdx/spdx-spec/tree/development/v3.0.1/docs)
  (`development/v3.0.1` branch)
- HTML (`gh-pages` branch, built on every commit to `master` and `development`
  branches)
  - Current: <https://spdx.github.io/spdx-spec/v3.0/>

The model itself is under active development at
[spdx/spdx-3-model](https://github.com/spdx/spdx-3-model/)
repo (`main` branch).

See for the official
[releases of the specification](https://spdx.org/specifications)
or additional information also the [SPDX website](https://spdx.org).

## Specification structure

This repository consists of these files and directories:

- `bin/` - Scripts for spec generation.
- `docs/` - Additional documentations:
  - `annexes/` - Annexes for the specification.
  - `css/` - Style sheets for HTML.
  - `images/` - Model diagrams. These files are to be generated from a diagram
    file [model.drawio](https://github.com/spdx/spdx-3-model/blob/main/model.drawio)
    in `spdx/spdx-3-model` repo and manually copied here.
  - `licenses/` - Licenses that used by the SPDX specifications.
  - `model/` - Model files. *This subdirectory _is to be created_ by a script
    from `spdx/spec-parser` repo, using model information from
    `spdx/spdx-3-model` repo (see the build instructions below).
- `examples/` - Examples of various SPDX serializations for the current version
  of the spec.
- `mkdocs.yml` - MkDocs recipe for the spec documentation generation. The
  inclusion of model files and the order of chapters are defined here.

The specification consists of a model which is generated from Markdown files in
the [`spdx/spdx-3-model`](https://github.com/spdx/spdx-3-model) repository and
additional information in the `docs` directory from this `spdx/spdx-spec`
repository.

## Building the specification

The specification building flow looks like this:

```text
  +-------------------+
  |[spdx-3-model]     |
  | |                 |
  | +- model/        ---- Constrainted-Markdown files ----+
  | |                 |                                   |
  | +- model.drawio  -----------------+                   |
  +-------------------+               |                   |
                                      |                   |
                                      |                   |
  +-------------------+               v                   |
  |[spdx-spec]        |            draw.io                |
  | |                 |            (manual)               |
  | +- docs/          |               |                   |
  |    |              |               |                   |
  |    +- annexes/    |               |                   v
  |    |              |               |             spec-parser
  |    +- images/  <---- PNG images --+                   |
  |    |              |                                   |
  |    +- licenses/   |                                   |
  |    |              |                                   |
  |    +- model/   <--------- Processed Markdown files ---+
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

### Generating intermediate Markdown files for MkDocs

Validate model files and generate intermediate files to be used by the HTML
builder (MkDocs):

```shell
python3 spec-parser/main.py spdx-3-model/model spdx-spec/docs/model
```

Now you will have your well-formatted model files ready in
`spdx-spec/docs/model` directory.

Inside this directory there will be two components:

- Model ontology and diagram files (`model.plantuml`, `spdx-context.jsonld`,
  `spdx-model.dot`, `spdx-model.json-ld`, `spdx-model.pretty-xml`,
  `spdx-model.ttl`, `spdx-model.xml`) -- these files are ready to be consumed
  directly.
- Formatted Makdown files (`*.md`) in a number of subdirectories -- these
  files are to be consumed by MkDocs in the next step.

### Building HTML

Execute a built-in dev-server that let you preview the specification:

```shell
mkdocs serve
```

Building a static HTML site:

```shell
mkdocs build
```
