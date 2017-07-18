# The Software Package Data Exchange (SPDX®) Specification

[![Build Status](https://travis-ci.org/spdx/spdx-spec.svg?branch=master)](https://travis-ci.org/spdx/spdx-spec)

The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

This repository holds under active development version of the specification as:

* [MarkDown](https://github.com/spdx/spdx-spec/tree/master/chapters) (master branch)
* [HTML](https://spdx.github.io/spdx-spec/) (gh-pages branch, build on every commit to master branch)

See for the official [releases of the specification](https://spdx.org/specifications) or additional information also the [SPDX website](https://spdx.org).

# Building the specification

## Prerequisites

You have to [Node.js](https://nodejs.org) installed on your machine. If you don't have it yet installed please follow these [installation instrucions](https://nodejs.org/en/download/package-manager/).

The OpenChain specification is written in MarkDown and HTML, PDF, ePUB, Mobipocket versions can be generated using [Gulp](https://gulpjs.com) and [GitBook](https://www.gitbook.com/). Note in order to generate PDF, ePUB, Mobipocket you have to install Callibre using these [instructions](https://toolchain.gitbook.com/ebook.html).

    # Install via npm document build toochain 
    $ npm install -g gitbook-cli gulp
    
    # Install all dependencies (GitBook + plugins, build tools, etc)
    $ npm install

## Building HTML, PDF, ePUB, Mobipocket

    # Commands to build or publish the specification
    $ gulp
    
    Usage
      gulp [TASK] [OPTIONS...]

    Available tasks
      all        Generate all documument versions.
      epub       Generate ePUB in ./build/
      help       Display this help text.
      html       Generate HTML website in ./build/
      mobi       Generate Mobipocket in ./build/
      pdf        Generate PDF in ./build/
      publish    Publish HTML to GitHub pages.
      webserver  Open a web browser to webserver and will rebuild HTML on file change.
