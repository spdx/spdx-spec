# The Software Package Data Exchange (SPDX​®​) ​Specification

The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages.

The SPDX standard helps facilitate compliance with free and open source software licenses by standardizing the way license information is shared across the software supply chain. SPDX reduces redundant work by providing a common format for companies and communities to share important data about software licenses and copyrights, thereby streamlining and improving compliance.

See for additonal information also the [SPDX website](https://spdx.org).

# Building the specification

The SPDX specification is written in MarkDown and HTML, PDF, ePUB, Mobipocket version can be generated using [GitBook](https://www.gitbook.com/).
Note that for generating eBooks and PDF you have to install Callibre using these [instructions](https://toolchain.gitbook.com/ebook.html).

    # Install via npm document build toochain 
    $ npm install -g gitbook-cli
    
    # Install all dependencies (GitBook + plugins, etc)
    $ npm install

    # Generate static HTML website in ./_book
    $ gitbook build

    # Generate a PDF document 
    $ gitbook pdf ./ ./spdx-specification.pdf

    # Generate an ePUB document
    $ gitbook epub ./ ./spdx-specification.epub

    # Generate a Mobipocket document
    $ gitbook mobi ./ ./spdx-specification.mobi

Or alternatively you can also use [Gulp](https://gulpjs.com) and then the commands are

    # Install via npm document build toochain 
    $ npm install -g gitbook-cli
    
    # Install all dependencies (GitBook + plugins, build tools, etc)
    $ npm install

    Usage
      gulp [TASK] [OPTIONS...]

    Available tasks
      all      Generates all document versions
      epub     Generates ePUB of the SPDX specification Gitbook in ./build/
      help     Display this help text.
      html     Generates HTML website in ./build/
      mobi     Generates Mobipocket of the SPDX specification Gitbook in ./build/
      pdf      Generates PDF of the SPDX specification Gitbook in ./build/