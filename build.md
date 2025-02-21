---
SPDX-FileCopyrightText: Copyright 2024-2025 The SPDX Contributors
SPDX-FileType: DOCUMENTATION
SPDX-License-Identifier: Community-Spec-1.0
---

# Building the specification website

You may want to build the specification website locally to test your additions
and edits and review if they render as intended.

```text
  +-------------------+
  |[spdx-3-model]     |
  | +- model/        ---- Constrained-Markdown files -+
  | +- model.drawio  -----------------+               |
  +-------------------+               |               |
                                      |               |
  +-------------------+               v               |
  |[spdx-spec]        |            draw.io            |
  | +- docs/          |            (manual)           v
  | |  +- annexes/    |               |          spec-parser
  | |  +- front/      |               |               |
  | |  +- images/  <---- PNG images --+               |
  | |  +- licenses/   |                               |
  | |  +- model/   <----- Processed Markdown files ---+
  | |  +- rdf/     <----- RDF files ------------------+
  | |  +- *.md        |
  | |  +- index.md    |
  | +- mkdocs.yml     |
  +-------------------+
          |
       MkDocs
          |
          v
  +-------------------+
  | HTML website      |
  | +- annexes/       |
  | +- ...            |
  | +- *.md           |
  | +- index.html     |
  +-------------------+
```

## Table of contents

1. [Prerequisites](#1-prerequisites)
1. [Getting input files](#2-getting-input-files)
1. [Processing model files (Markdown and RDF)](#3-processing-model-files-markdown-and-rdf)

    - [Generating model files with spec-parser](#31-generating-model-files-with-spec-parser)
    - [Generating a complete MkDocs configuration file](#32-generating-a-complete-mkdocs-configuration-file)

1. [Building HTML](#4-building-html)
1. [Configuring the website](#5-configuring-the-website)
1. [Specification versions on spdx.github.io](#6-specification-versions-on-spdxgithubio)

## 1. Prerequisites

Apart from Git and Python, you have to have [MkDocs](http://mkdocs.org)
installed on your machine. If you don't have it yet installed please follow
these [installation instructions](http://www.mkdocs.org/#installation).

`mkdocs.yml` is the configuration file for MkDocs.

<!--
[WeasyPrint](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation)
is also required for generating PDF files. To enable PDF generation, set the
`ENABLE_PDF_EXPORT` environment variable to `1`.
-->

## 2. Getting input files

Next, you have to get the model files, the other specification files
(main chapters, annexes, front matter, and licenses),
and the model parser, by cloning these repositories:
[`spdx/spdx-3-model`](https://github.com/spdx/spdx-3-model),
[`spdx/spdx-spec`](https://github.com/spdx/spdx-spec), and
[`spdx/spec-parser`](https://github.com/spdx/spec-parser)
to these paths: `spdx-3-model`, `spdx-spec`, and `spec-parser`, respectively:

```shell
git clone https://github.com/spdx/spdx-3-model.git
git clone https://github.com/spdx/spdx-spec.git
git clone https://github.com/spdx/spec-parser.git
```

Install their Python prerequisites:

```shell
pip3 install -r spdx-spec/requirements.txt
pip3 install -r spec-parser/requirements.txt
```

## 3. Processing model files (Markdown and RDF)

*If you only want to review the non-model parts of the specification*
*(e.g., chapters and annexes), you can skip to [step 4](#4-building-html).*

Model files in `spdx/spdx-3-model` repository are written in a constrained
Markdown format, with [a predefined set of section headings][format].
The `spec-parser` processes these model files to generate both ontology files
and final Markdown files suitable for MkDocs.

The `spec-parser` also performs automatic formatting on the resulting Markdown
files. For instance, it converts a list under the "Properties" heading into a
table.

[format]: https://github.com/spdx/spdx-3-model/blob/develop/docs/format.md

### 3.1 Generating model files with spec-parser

To verify the formatting of pre-processed model files and
prepare them for MkDocs, run the following command:

```shell
python3 spec-parser/main.py --force \
  --generate-mkdocs --output-mkdocs spdx-spec/docs/model/ \
  spdx-3-model/model/
```

The command will instruct the spec-parser to read the input from 
`spdx-3-model/model/` and generate processed Markdown files (`.md`),
placing them in the `spdx-spec/docs/model/` directory.
These files will then be used by MkDocs.

An `spdx-spec/docs/model/model-files.yml` file will also be generated.
This file contains a list of the files within `spdx-spec/docs/model`
and will be used later for MkDocs configuration.
We will move this `model-files.yml` file to the `spdx-spec/` directory
for subsequent use:

```shell
mv spdx-spec/docs/model/model-files.yml spdx-spec/
```

### 3.2 Generating a complete MkDocs configuration file

To ensure MkDocs recognizes the new Markdown files,
insert the model file list from `model-files.yml`
into the MkDocs configuration file in `spdx-spec/mkdocs.yml`,
by using this command:

```shell
spdx-spec/bin/make-mkdocs-config.sh \
  -b spdx-spec/mkdocs.yml \
  -m spdx-spec/model-files.yml \
  -f spdx-spec/mkdocs-full.yml
```

The complete MkDocs configuration will be at `spdx-spec/mkdocs-full.yml`.

## 4. Building HTML

With all specification and model files prepared,
we will use MkDocs to assemble them into a website.

*Note: all the commands below use the configuration file*
*with the model file list, `mkdocs-full.yml`,*
*generated in [step 3.2](#32-generating-a-complete-mkdocs-configuration-file).*
*If you only want to review the non-model part of the specification*
*(have skipped step 3), please use `mkdocs.yml` instead.*

These following commands should run inside the `spdx-spec/` directory.

- To preview the specification in a web browser:

  ```shell
  mkdocs serve --config-file mkdocs-full.yml
  ```

- To build a static HTML site:

  ```shell
  mkdocs build --config-file mkdocs-full.yml
  ```

- To get debug messages, enables verbose output:

  ```shell
  mkdocs build --verbose --config-file mkdocs-full.yml
  ```

## 5. Configuring the website

To make additional adjustments to the website,
you can modify the configuration file at `spdx-spec/mkdocs.yml`.

For example, you can customize website details like the site name
and main URL (canonical URL) in this file.

To include a page in the navigation bar, list its filename under the `nav:`
section. The order of filenames in this section determines the order of the
page in the navigation bar.

After you have modified the configuration file, you may need to rerun
[step 3.2](#32-generating-a-complete-mkdocs-configuration-file)
to incorporate the changes into the complete configuration file.

## 6. Specification versions on spdx.github.io

The SPDX specifications on <https://spdx.github.io/spdx-spec/> are built
by using a workflow in
[`.github/workflows/publish_v3.yml`](.github/workflows/publish_v3.yml).
This workflow uses [mike](https://github.com/jimporter/mike) to publish
multiple versions of MkDocs-powered documentation.

The published versions, their titles, and aliases are listed in the file
[versions.json](https://github.com/spdx/spdx-spec/blob/gh-pages/versions.json)
located in the `gh-pages` branch.
These versions populate the version selector dropdown on the website.
The step `name: Deploy and set aliases` in the GitHub workflow file
determines the title and alias.

mike is not needed for local testing of a specific spec version.
