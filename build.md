---
SPDX-License-Identifier: Community-Spec-1.0
SPDX-FileCopyrightText: Copyright 2024 The SPDX Contributors
---

# Building the specification website

The specification website building flow looks like this:

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
       mkdocs
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
Markdown format, with a limited set of allowed headings.
The `spec-parser` processes these model files to generate both ontology files
and final Markdown files suitable for MkDocs.

The `spec-parser` also performs automatic formatting on the resulting Markdown
files. For instance, it converts a list under the "Properties" heading into a
table.

### 3.1 Generating model files with spec-parser

To verify the formatting of pre-processed model files and
prepare them for MkDocs, run the following command:

```shell
python3 spec-parser/main.py spdx-3-model/model parser_output
```

*(If `parser_output` already exists, the `spec-parser` will not overwrite it.)*

The command will create files in the `parser_output` directory.
Among its subdirectories, we're particularly interested in:

- `parser_output/mkdocs` - Processed Markdown files for MkDocs:
  These files (`.md` extension) are located in various
  subdirectories and are intended for processing by MkDocs in the next step.
- `parser_output/rdf` - Ontology (RDF) files:
  These files (`spdx-context.jsonld`, `spdx-model.json-ld`, `spdx-model.n3`,
  `spdx-model.pretty-xml`,`spdx-model.ttl`, `spdx-model.xml`, etc.)
  are ready for immediate use.

- `parser_output/mkdocs`: Processed Markdown files (`.md`) for MkDocs.
  These files will be used by MkDocs in the next step.
- `parser_output/rdf`: Ontology (RDF) files, including
  `spdx-context.jsonld`, `spdx-model.json-ld`, `spdx-model.ttl`, etc.
  These files are ready for immediate use.

Additionally, a `parser_output/model-files.yml` file will be generated.
It contains a list of the files within `parser_output/mkdocs`
and will be used for MkDocs configuration later.

### 3.2 Copying the generated files

Copy the processed Markdown files and ontology files to the `docs/` directory:

```shell
mkdir -p spdx-spec/docs/model
mkdir -p spdx-spec/docs/rdf
cp -R parser_output/mkdocs/* spdx-spec/docs/model 
cp -R parser_output/rdf/* spdx-spec/docs/rdf
```

### 3.3 Generate a complete MkDocs configuration file

To ensure MkDocs recognizes the new Markdown files,
insert the model file list from `parser_output/model-files.yml`
into the MkDocs configuration file in `spdx-spec/mkdocs.yml`.

```shell
spdx-spec/bin/make-mkdocs-config.sh \
  -b spdx-spec/mkdocs.yml \
  -m parser_output/model-files.yml \
  -f spdx-spec/mkdocs-full.yml
```

The complete MkDocs configuration will be at `spdx-spec/mkdocs-full.yml`.

## 4. Building HTML

With all specification and model files prepared,
we will use MkDocs to assemble them into a website.

*Note: all the commands below use the configuration file*
*with the model file list, `mkdocs-full.yml`,*
*generated in the [step 3.2](#32-copying-the-generated-files).*
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
you can modify its configuration.

Inside `spdx-spec/` directory, there is a file `mkdocs.yml`.
This is a configuration file for MkDocs.

For example, you can customize website details like the site name
and main URL (canonical URL) in this file.

To include a page in the navigation bar, list its filename under the `nav:`
section. The order of filenames in this section determines the order of the
page in the navigation bar.

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
