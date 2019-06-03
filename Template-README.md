# spdx-pdf-template
This is a template for the spdx specifications in the markdown format and will generate cover-page, header, footer and the table of contents for the pdf version of the specifications.

* Clone the spdx-spec repository

    git clone https://github.com/spdx/spdx-spec.git
    
    and
    
    get the template file from this repository.

* Next you need to install dependencies

  * Latex: https://en.wikibooks.org/wiki/LaTeX/Installation#Distributions

  * Pandoc: http://pandoc.org/

* Copy spdx-latex-template in your latex templates folder and rename the file to .latex 

   extension.
 
   Default location of the folder, if not present create one:

   Unix, Linux, macOS: $XDG_DATA_HOME/pandoc/templates or ~/.pandoc/templates/

   Windows XP: C:\Documents And Settings\USERNAME\Application Data\pandoc\templates

* To include titlepage, header footers you must provide the YAML metadata block at the very starting of the md file content    which you are going to convert.


```markdown---
---
title: "Software Package Data Exchange® (SPDX®) Specifications"
titlepage: true
titlepage-text-color: "123F66"
titlepage-rule-color: "213E4C"
titlepage-rule-height: 2
header-left: "Here comes header"
footer-left: "Here comes footer"
logo: "logo.pdf"
logo-width: 220
...
```

## Usage

  * Run the following command in the directory where your markdown files are present to create a pdf version of the markdown 
    along with toc


     pandoc example.md -o example.pdf --from markdown --template spdx-pdf-template --table-of-contents

