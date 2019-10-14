# Appendix-VIII SPDX Lite

## 1. Explanation of SPDX Lite 

The SPDX Lite defines the subset of the SPDX specification, from the point of view of use cases in some industries. The SPDX Lite aims at the balance between the SPDX standard and actual workflows in some industries. 

The SPDX Lite is the subset of the SPDX specification. The SPDX Lite consists of mandatory part of the Document Creation and Package Information and other basic information. 

The mandatory part of the Package information in the SPDX Lite is basic but useful for complying with licenses. It is easy to understand licensing information by reading an SPDX Lite file. It is easy to create manually an SPDX Lite file by anyone who does not have enough knowledge about licensing infomation, so that tools are not necessarily required to create an SPDX Lite file. 

The SPDX Lite has the affinity with SPDX tools due to its containing the mandatory part of the Document Creation and Package Information in the SPDX Lite. 

An SPDX Lite file can be used parallel with an SPDX file in software supply chains. 


## 2. format of SPDX Lite

The SPDX Lite is the subset of the SPDX specification. The SPDX Lite consists of mandatory part of the Document Creation and Package Information and other basic information. Cardinality of each item is not changed.


The mandatory part of the Document Creation (those are SPDX Version, Data License, SPDX Idetifier, Document Name, SPDX Document Namespace, Creator and Created) is used for keeping the compatibility with SPDX.

The main part of the Package Information (those are Package Name,  Package Version, Package File Name, Package Download Location,  Package Home Page, Concluded License, Declared License, Comments on License and Copyright Text) is used for exchanging license information.

In the Package Information, Package SPDX Identifier and Files Analyzed are used for keeping the compatiblity with SPDX tools. 

File Analyzed must be set to "false", when SPDX Lite is used.

Package Comment can be used to describe additional explanation, such as compiling option, where a license may change with a different compiling option. 

Other information (License Identifier, Extracted Text, License Name and License Comment) is used for exchanging license information.


## Table of SPDX Lite

| # | corresponding SPDX section no. | License Info. |
|:-----|:----|:-----------------------|
|L1.1  |2.1  | SPDX Version           |
|L1.2  |2.2  | Data License           |
|L1.3  |2.3  | SPDX Identifier        |
|L1.4	 |2.4	 | Document Name	        | 
|L1.5	 |2.5	 | SPDX Document Namespace| 
|L1.6	 |2.8	 | Creator	              | 
|L1.7  |2.9  | Created                |
|L2.1	 |3.1	 | Package Name	          | 
|L2.2	 |3.2	 | Package SPDX Identifier| 
|L2.3	 |3.3	 | Package Version        | 
|L2.4	 |3.4	 | Package File Name      | 
|L2.5	 |3.7	 | Package Download Location | 
|L2.6	 |3.8	 | Files Analyzed         | 
|L2.7  |3.11 | Package Home Page      | 
|L2.8	 |3.13 | Concluded License      | 
|L2.9	 |3.15 | Declared License       | 
|L2.10 |3.16 | Comments on License    | 
|L2.11 |3.17 | Copyright Text         | 
|L2.12 |3.20 | Package Comment        | 
|L3.1	 |6.1	 | License Identifier     | 
|L3.2	 |6.2	 | Extracted Text         | 
|L3.3	 |6.3	 | License Name           | 
|L3.4	 |6.5	 | License Comment        | 
