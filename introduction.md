# The Software Package Data Exchange (SPDX​®​) ​Specification


# Build the specification

The SPDX specification is written in MarkDown and HTML, PDF, ePub, Mobi version can be generated using [GitBook](https://www.gitbook.com/).
Note that for generating eBoks and PDF you have to install Callibre using these [instructions](https://toolchain.gitbook.com/ebook.html).

    # Install via npm document build toochain (GitBook + plugins, etc)
    $ npm install

    # Generate static HTML website in ./_book
    $ ./node_modules/.bin/gitbook build

    # Generate a PDF document
    $ ./node_modules/.bin/gitbook pdf ./ ./spdx-specification.pdf

    # Generate an ePub document
    $ ./node_modules/.bin/gitbook epub ./ ./api-guidelines.epub

    # Generate a Mobi document
    $ ./node_modules/.bin/gitbook mobi ./ ./api-guidelines.mobi