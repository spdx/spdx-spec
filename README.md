# The Software Package Data Exchange (SPDX®) Specification

[![Build Status](https://travis-ci.org/spdx/spdx-spec.svg?branch=master)](https://travis-ci.org/spdx/spdx-spec)

The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

This repository holds under active development version of the specification as:

* [MarkDown](https://github.com/spdx/spdx-spec/tree/master/chapters) (`master` branch)
* HTML (gh-pages branch, built on every commit to `master` and `development/` branches)
  * [Current](https://spdx.github.io/spdx-spec/)
  * [v2 Development](https://spdx.github.io/spdx-spec/v2-draft)
  * [v3 Development](https://spdx.github.io/spdx-spec/v3-draft)

See for the official [releases of the specification](https://spdx.org/specifications) or additional information also the [SPDX website](https://spdx.org).

# Building the specification

## Prerequisites

You have to [MkDocs](http://mkdocs.org) installed on your machine. If you don't have it yet installed please follow these [installation instrucions](http://www.mkdocs.org/#installation).

## Building HTML

    # Execute built-in dev-server that lets you preview the specification
    $ mkdocs serve

    # Building static HTML site
    $ mkdocs build
