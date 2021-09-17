# Annex H SPDX Lite (Normative)

## H.1 Explanation of SPDX Lite <a name="H.1"></a>

The SPDX Lite profile defines a subset of the SPDX specification, from the point of view of use cases in some industries. SPDX Lite aims at the balance between the SPDX standard and actual workflows in some industries.

The SPDX Lite profile consists of mandatory fields from the Document Creation and Package Information sections and other basic information.

The mandatory part of the Package information in SPDX Lite is basic but useful for complying with licenses. It is easy to understand licensing information by reading an SPDX Lite file. It is easy to create manually an SPDX Lite file by anyone who does not have enough knowledge about licensing information, so that tools are not necessarily required to create an SPDX Lite file.

SPDX Lite has affinity with SPDX tools due to its containing the mandatory part of the Document Creation and Package Information in the SPDX Lite definition.

An SPDX Lite document can be used in parallel with SPDX documents in software supply chains.

## H.2 Format of SPDX Lite <a name="H.2"></a>

The SPDX Lite profile is a subset of the SPDX specification. SPDX Lite consists of mandatory fields of the Document Creation and Package Information sections and other basic information. Cardinality of each item is not changed.

The mandatory part of the Document Creation Information section (which consists of SPDX Version, Data License, SPDX Identifier, Document Name, SPDX Document Namespace, Creator and Created) is used for keeping compatibility with SPDX tools.

The main part of the Package Information (those are Package Name, Package Version, Package File Name, Package Download Location, Package Home Page, Concluded License, Declared License, Comments on License and Copyright Text) is used for exchanging license information.

In the Package Information, Package SPDX Identifier and Files Analyzed are used for keeping compatibility with SPDX tools.

Files Analyzed must be set to "false" when SPDX Lite is used.

Package Comment can be used to describe additional details, such as compiling options, where a license may change with a different compiling option.

The Other License information section (License Identifier, Extracted Text, License Name and License Comment) is used for exchanging license information for licenses that are not on the [SPDX License List](https://spdx.org/licenses).

## H.3 Table of SPDX Lite fields <a name="H.3"></a>

| # | SPDX subclause | Field name |
|:-----:|:----:|:--------------------------|
|L1.1  |6.1  | SPDX Version              |
|L1.2  |6.2  | Data License              |
|L1.3  |6.3  | SPDX Identifier           |
|L1.4  |6.4	 | Document Name	           |
|L1.5  |6.5	 | SPDX Document Namespace   |
|L1.6  |6.8	 | Creator	                 |
|L1.7  |6.9  | Created                   |
|L2.1  |7.1	 | Package Name	             |
|L2.2  |7.2	 | Package SPDX Identifier   |
|L2.3  |7.3	 | Package Version           |
|L2.4  |7.4	 | Package File Name         |
|L2.5  |7.7	 | Package Download Location |
|L2.6  |7.8	 | Files Analyzed            |
|L2.7  |7.11 | Package Home Page         |
|L2.8  |7.13 | Concluded License         |
|L2.9  |7.15 | Declared License          |
|L2.10 |7.16 | Comments on License       |
|L2.11 |7.17 | Copyright Text            |
|L2.12 |7.20 | Package Comment           |
|L3.1  |10.1	 | License Identifier        |
|L3.2  |10.2	 | Extracted Text            |
|L3.3  |10.3	 | License Name              |
|L3.4  |10.5	 | License Comment           |
