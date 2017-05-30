# The Software Package Data Exchange (SPDX​®​) ​Specification

The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

See for additonal information also the [SPDX website](https://spdx.org).

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
    $ gitbook mobi ./ ./spdx-specification.mobi

Or alternatively you can also use [Gulp](https://gulpjs.com) and then the commands are

    # Install via npm document build toochain 
    $ npm install -g gitbook-cli
    
    # Install all dependencies (GitBook + plugins, etc)
    $ npm install

    # Generate static HTML website in ./build/html
    $ gitbook build

    # Generate a PDF document 
    $ gulp pdf

    # Generate an ePub document
    $ gulp epub

    # Generate a Mobi document
    $ gulp mobi
    
    # Publish HTML to GitHub's GH pages
    $ gulp publish