# Appendix-VIII SPDX Lite

## 1. Explanation of SPDX Lite 

The SPDX Lite defines the subset of the SPDX specification, from the point of view of use cases in industries. The SPDX Lite aims at the balance between the SPDX standard and actual workflows in industries. 

The SPDX Lite is the subset of the SPDX specification. The SPDX Lite consists of mandatory part of the Document Creation and Package Information and other basic information. 

The mandatory part of the Package information in the SDPX Lite is basic but indispensable for complying with licenses. It is easy to understand licensing information by reading an SPDX Lite file. It is easy to create manually an SPDX Lite file by anyone who does not have enough knowledge about licensing infomation, so that tools are not necessarily required to create an SPDX Lite file. 

The SPDX Lite has the affinity with SPDX tools due to its containing the mandatory part of the Document Creation and Package Information in the SDPX Lite. 

An SPDX Lite file can be used parallel with an SPDX file in software supply chains. 


## 2. format of SPDX Lite

The SPDX Lite is the subset of the SPDX specification. The SPDX Lite consists of mandatory part of the Document Creation and Package Information and other basic information. 

The mandatory part of the Document Creation (those are Document Name, SPDX Document Namespace and Creator) is used for keeping the compatibility with SPDX tools.

The main part of the Package Information (those are Package Name,  Package Version, Package File Name, Package Download Location,  Package Home Page, Concluded License, Declared License, Comments on License and Copyright Text) is used for exchanging license information.

In the Package Information, Package SPDX Identifier and Files Analyzed are used for keeping the compatiblity with SPDX tools. 

File Analyzed must be set to "false", when SPDX Lite is used.

Other information (License Identifier, Extracted Text, License Name and License Comment) is used for exchanging license information.


## Table of SPDX Lite

| # | corresponding SPDX section no. | License Info. | Tag  | Rationale      |
|:-----|:----|:--------|:-------|:------------------|
|L1.1	 |2.4	 |Document Name	| DocumentName |To identify SPDX Lite document	|
|L1.2	 |2.5	 |SPDX Document Namespace	| DocumentNamespace |To identify SPDX Lite document name	|
|L1.3	 |2.8	 |Creator	      | Creator |To identify creator	|
|L2.1	 |3.1	 |Package Name	| PackageName |To identify software	|
|L2.2	 |3.2	 |Package SPDX Identifier	| SPDXID | To keep compatibility with SPDX. Feedback from SPDX team. |
|L2.3	 |3.3	 |Package Version	| PackageVersion |To identify specific version	|
|L2.4	 |3.4	 |Package File Name	| PackageFileName	|To identify specific package|
|L2.5	 |3.7	 |Package Download Location 	| PackageDownloadLocation |To get the identical software	|
|L2.6	 |3.8	 |Files Analyzed| FilesAnalyzed | In SPDX Lite, to set "false". To keep compatibility with SPDX. Feedback from SPDX team. |
|L2.7  |3.11 |Package Home Page	| PackageHomePage	|To verify relevant information|
|L2.8	 |3.13 |Concluded License	| PackageLicenseConcluded	||
|L2.9	 |3.15 |Declared License	| PackageLicenseDeclared	||
|L2.10 |3.16 |Comments on License	| PackageLicenseComments	|To verify additional conditions|
|L2.11 |3.17 |Copyright Text| PackageCopyrightText	||
|L3.1	 |6.1	 |License Identifier	| LicenseID	|To specify licenses which are not on the SPDX license list / To specify dual license|
|L3.2	 |6.2	 |Extracted Text| ExtractedText	|To specify licenses which are not on the SPDX license list / To specify dual license|
|L3.3	 |6.3	 |License Name	| LicenseName	|To specify licenses which are not on the SPDX license list / To specify dual license|
|L3.4	 |6.5	 |License Comment| LicenseComment	|To specify licenses which are not on the SPDX license list / To specify dual license|
