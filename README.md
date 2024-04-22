# The System Package Data Exchange (SPDX®) Specification

The System Package Data Exchange (SPDX®) specification is an open standard capable of representing systems with software components in as SBOMs (Software Bill of Materials) and other AI, data and security references supporting a range of risk management use cases.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

This repository holds under active development version of the specification as:

- [MarkDown](https://github.com/spdx/spdx-spec/tree/master/chapters) (`master` branch)
- HTML (gh-pages branch, built on every commit to `master` and `development/` branches)
  - [Current](https://spdx.github.io/spdx-spec/v3.0/)

See for the official [releases of the specification](https://spdx.org/specifications) or additional information also the [SPDX website](https://spdx.org).

## Specification Structure

The specification consists of a model which is generated from the [spdx-3-model](https://github.com/spdx/spdx-3-model) repository and additional information in the `docs` directory.

The `examples` directory contains examples of various SPDX serializations for the current version of the spec.

# Building the specification

## Prerequisites

You have to have [MkDocs](http://mkdocs.org) installed on your machine.
If you don't have it yet installed please follow these [installation instructions](http://www.mkdocs.org/#installation).

## Building HTML

Preparing model files, model parser, and other specification files by cloning
these repositoriess: [`spdx/spdx-3-model`](https://github.com/spdx/spdx-3-model),
[`spdx/spec-parser`](https://github.com/spdx/spec-parser),
and [`spdx/spdx-spec`](https://github.com/spdx/spdx-spec)
to these paths: `spdx-3-model`, `spec-parser`, and `spdx-spec`, respectively:

```shell
git clone https://github.com/spdx/spdx-3-model.git
git clone https://github.com/spdx/spec-parser.git
git clone https://github.com/spdx/spdx-spec.git
```

Install pre-requisites:

```shell
pip3 install -r spec-parser/requirements.txt
pip3 install -r spdx-spec/requirements.txt
```

Validate and build final Markdown files for model:

```shell
python3 spec-parser/main.py spdx-3-model/model spdx-spec/docs/model
```

Now you will have your model files (`.md` files in Markdown format) ready.

Execute built-in dev-server that let you preview the specification:

```shell
mkdocs serve
```

Building static HTML site:

```shell
mkdocs build
```
