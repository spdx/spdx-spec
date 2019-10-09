# 1 Rationale

## 1.1 Charter <a name="1.1"></a>

To create a set of data exchange standards that enable companies and organizations to share license and component information (metadata) for software packages and related content with the aim of facilitating license and other policy compliance.

## 1.2 Definition <a name="1.2"></a>

The Software Package Data Exchange (SPDX®) specification is a standard format for communicating the components, licenses, and copyrights associated with software packages. An SPDX file is associated with a particular software package or set of packages and contains information about it in the SPDX format.

## 1.3 Why is a common format for data exchange needed? <a name="1.3"></a>

Companies and organizations (collectively “Organizations”) are widely using and reusing open source and other software packages. Compliance with the associated licenses requires a set of analysis activities and due diligence that each Organization performs independently, which may include a manual and/or automated scan of software and identification of associated licenses followed by manual verification. Software development teams across the globe use the same open source packages, but little infrastructure exists to facilitate collaboration on the analysis or share the results of these analysis activities. As a result, many groups are performing the same work leading to duplicated efforts and redundant information. The SPDX working group seeks to create a data exchange format so that information about software packages and related content may be collected and shared in a common format with the goal of saving time and improving data accuracy.

## 1.4 What does this specification cover? <a name="1.4"></a>

**1.4.1** SPDX Document Creation Information: Meta data to associate analysis results with a specific version of the SPDX file and license for use, and provide information on how, when, and by whom the SPDX file was created.

**1.4.2** Package Information: Facts that are common properties of the entire package.

**1.4.3** File Information: Facts that are specific to each file included in the package.

**1.4.4** Snippet Information: Facts that are specific to only a part of a file.

**1.4.5** Other Licensing Information Detected: A way to capture information about and refer to licenses that are not on the SPDX License List.

**1.4.6** Relationships Between SPDX Elements: Information on how Documents, Packages & Files relate to each other.

**1.4.7** Annotations: Information about when and by whom the SPDX file was reviewed

![Overview of SPDX 3.0-DRAFT document contents](img/spdx-3.0-DRAFT-document.png)

## 1.5 What is not covered in the specification? <a name="1.5"></a>

**1.5.1** Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.

**1.5.2** How the data stored in an SPDX file is used by the recipient.

**1.5.3** Any identification of any patent(s) which may or may not relate to the package.

**1.5.4** Legal interpretation of the licenses or any compliance actions that have been or may need to be taken.

**1.5.5** Examples may contain `...` which indicate detailed text specific to the SPDX Document

## 1.6 Format Requirements <a name="1.6"></a>

**1.6.1** Must be in a human readable form.

**1.6.2** Must be in a syntax that a software tool can read and write.

**1.6.3** Must be suitable to be checked for syntactic correctness independent of how it was generated (human or tool).

**1.6.4** The SPDX file character set must support UTF-8 encoding.

**1.6.5** Must permit automated specification syntax validation.

**1.6.6** Resource Description Framework (RDF) can be used to represent this information, as can an annotated tag value flat text file.

**1.6.7** Interoperability with an annotate `tag:value` format and the RDF format will be preserved.

**1.6.8** Tags and RDF properties are case sensitive.

**1.6.9** Should be easy to recognize in a file system without opening the file. A suggested naming convention is to use \*.spdx (for `tag:value` format) and \*-spdx.rdf for RDF format.

**1.6.10** The convention in this specification is for the RDF examples to use `rdf:about="..."` to represent that a proper Universal Resource Indicator (URI) should be present.

## 1.7 Conformance <a name="1.7"></a>

**1.7.1** A file can be designated an SPDX document, if it is compliant with the requirements of the SPDX Trademark License (See the SPDX Trademark Page).

**1.7.2** The official copyright notice to be used with any verbatim reproduction and/or distribution of this SPDX Specification 3.0-DRAFT is:

"Official SPDX® Specification 3.0-DRAFT Copyright © 2010-2019 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved."

**1.7.3** The official copyright notice to be used with any non-verbatim reproduction and/or distribution of this SPDX Specification, including without limitation any partial use or combining this SPDX Specification with another work, is:

"This is not an official SPDX Specification. Portions herein have been reproduced from SPDX® Specification 3.0-DRAFT found at spdx.org. These portions are Copyright © 2010-2019 Linux Foundation and its Contributors, and are licensed under the Creative Commons Attribution License 3.0 Unported by the Linux Foundation and its Contributors. All other rights are expressly reserved by Linux Foundation and its Contributors."

## 1.8 Differences from SPDX Specification 2.0 <a name="1.8"></a>

TODO