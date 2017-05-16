# The Software Package Data Exchange (SPDX​®​) ​Specification

**Warning**: working in progress, **DO NOT CLONE** 

Converting the specification into MarkDown with build toolchain to create HTML and eBook output.

# Building the specification

The SPDX specification is written in MarkDown and HTML, PDF, ePub, Mobi version can be generated using [GitBook](https://www.gitbook.com/).
Note that for generating eBooks and PDF you have to install Callibre using these [instructions](https://toolchain.gitbook.com/ebook.html).

    # Install via npm document build toochain 
    $ npm install -g gitbook-cli
    
    # Install all dependencies (GitBook + plugins, etc)
    $ npm install

    # Generate static HTML website in ./_book
    $ gitbook build

    # Generate a PDF document 
    $ gitbook pdf ./ ./spdx-specification.pdf

    # Generate an ePub document
    $ gitbook epub ./ ./spdx-specification.epub

    # Generate a Mobi document
    $ .gitbook mobi ./ ./spdx-specification.mobi