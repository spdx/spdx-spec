# The Software Package Data Exchange (SPDX®) Specification

The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

This `support/2.3.1` branch holds under development 2.3.x version of the specification as:

- [Markdown](https://github.com/spdx/spdx-spec/tree/support/2.3.1/chapters) (`support/2.3.1` branch)
- HTML (gh-pages branch)
  - <https://spdx.github.io/spdx-spec/v2.3.1-dev/>

See for the official [releases of the specification](https://spdx.org/specifications) or additional information also the [SPDX website](https://spdx.org).

## Building the specification

## Prerequisites

You have to [MkDocs](http://mkdocs.org) installed on your machine. If you don't have it yet installed please follow these [installation instructions](http://www.mkdocs.org/#installation).

## Building HTML

Execute built-in dev-server that lets you preview the specification

```shell
mkdocs serve
```

Building static HTML site:

```shell
mkdocs build
```
