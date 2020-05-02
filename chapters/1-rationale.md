# 1 Rationale

## 1.1 Charter <a name="1.1"></a>

To create a set of data exchange standards that enable companies and organizations to share human-readable and machine-processable software package metadata to facilitate software supply chain processes.

## 1.2 Definition <a name="1.2"></a>

The Software Package Data Exchange (SPDX®) specification is a standard format for communicating the component and metadata information associated with software packages. An SPDX file can be associated with a set of software packages, set of files or snippets and contains information about the software in the SPDX format described in this specification.

## 1.3 Why is a common format for data exchange needed? <a name="1.3"></a>

Companies and organizations (collectively “Organizations”) are widely using and reusing open source and other software packages.  Accurate identification of software is key for many supply chain processes.  Vulnerability remediation starts with knowing the details of which version of software is in use on a system. Compliance with the associated licenses requires a set of analysis activities and due diligence that each Organization performs independently, which may include a manual and/or automated scan of software and identification of associated licenses followed by manual verification. Software development teams across the globe use the same open source packages, but little infrastructure exists to facilitate collaboration on the analysis or share the results of these analysis activities. As a result, many groups are performing the same work leading to duplicated efforts and redundant information. The SPDX working group seeks to create a data exchange format so that information about software packages and related content may be collected and shared in a common format with the goal of saving time and improving data accuracy.

## 1.4 What does this specification cover? <a name="1.4"></a>

**1.4.1** SPDX Document Creation Information: Metadata to associate analysis results with a specific version of the SPDX file and license for use, and provide information on how, when, and by whom the SPDX file was created.

**1.4.2** Package Information: Facts that are common properties of an entire package.

**1.4.3** File Information: Facts that are specific to files which may be included in packages.

**1.4.4** Snippet Information: Facts that are specific to only a part of a file.

**1.4.5** Other Licensing Information Detected: A way to capture information about and refer to licenses that are not on the SPDX License List.

**1.4.6** Relationships Between SPDX Elements: Information on how Documents, Packages & Files relate to each other.

**1.4.7** Annotations: Information about when and by whom the SPDX file was reviewed

![Overview of SPDX 2.2 document contents](img/spdx-2.2-document.png)

## 1.5 What is not covered in the specification? <a name="1.5"></a>

**1.5.1** Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.

**1.5.2** How the data stored in an SPDX file is used by the recipient.

**1.5.3** Any identification of any patent(s) which may or may not relate to the package.

**1.5.4** Legal interpretation of the licenses or any compliance actions that have been or may need to be taken.

**1.5.5** Examples may contain `...` which indicate detailed text specific to the SPDX Document

## 1.6 What does "Package" mean in the context of SPDX? <a name="1.6"></a>

In SPDX, a 'Package' refers to any unit of content that can be associated with a distribution of software. Typically, a Package is composed of one or more files. An SPDX document may, but is not required to, provide details about the individual files comprising a Package (see the "File Information" details in section 4).

Any of the following non-limiting examples may be (but are not required to be) represented in SPDX as a Package:

* a tarball, zip file or other archive
* a directory or sub-directory
* a separately-distributed piece of software which another Package or File uses or depends upon (e.g., a Python package, a Go module, ...)
* a container image, and/or each image layer within a container image
* a collection of one or more sub-packages
* a Git repository snapshot from a particular point in time

Note that some of these could be represented in SPDX as a File as well.

In an SPDX document, Relationship elements can be used to indicate relationships between Packages, such as dependency relationships.

## 1.7 Format Requirements <a name="1.7"></a>

**1.7.1** Must be in a human readable form.

**1.7.2** Must be in a syntax that a software tool can read and write.

**1.7.3** Must be suitable to be checked for syntactic correctness automatically, independent of how it was generated (human or tool).

**1.7.4** The SPDX file character set must support UTF-8 encoding.

**1.7.5** Multiple file formats can be used to represent the information being exchanged.   Current supported formats include:

* **YAML 1.2** see: <https://yaml.org/spec/1.2/spec.html>
* **JavaScript Object Notation** (JSON) see: [ECMA-404](https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)
    * The JSON Schema for SPDX can be found in the [SPDX Spec Git Repository Schema directory](https://github.com/spdx/spdx-spec/blob/master/schemas/spdx-schema.json)
* **Resource Description Framework** (RDF also referred to as RDF/XML) see: <https://www.w3.org/TR/rdf-syntax-grammar/>
* **tag:value** flat text file as described in this specification
* **.xls** spreadsheets

In addition to the supported formats, the following format is in development with a plan to complete the specification by SPDX 3.0:

* **Extensible Markup Language** (XML) see: https://www.w3.org/TR/2008/REC-xml-20081126/

**1.7.6** Interoperability between all the supported file formats will be preserved. SPDX defines how to validate a document in each supported format, and how to translate a valid document without loss to each other supported format.

**1.7.7** Tags and format properties are case sensitive.

**1.7.8** Should be easy to recognize in a file system without opening the file. A suggested naming convention is:

| Format      | Extension   |
| ----------- | ----------- |
| tag:value   | *.spdx      |
| RDF         | *.spdx.rdf  |
| JSON        | *.spdx.json |
| XML         | *.spdx.xml  |
| YAML        | \*.spdx.yaml or \*.spdx.yml |

**1.7.9** The convention in this specification is for the RDF examples to use `rdf:about="..."` to represent that a proper Universal Resource Indicator (URI) should be present.

## 1.8 Conformance <a name="1.8"></a>

**1.8.1** A file can be designated an SPDX document, if it is compliant with the requirements of the SPDX Trademark License (See the SPDX Trademark Page on the spdx.org web site).

**1.8.2** The official copyright notice to be used with any verbatim reproduction and/or distribution of this SPDX Specification 2.2 is:

"Official SPDX® Specification 2.2 Copyright © 2010-2020 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved."

**1.8.3** The official copyright notice to be used with any non-verbatim reproduction and/or distribution of this SPDX Specification, including without limitation any partial use or combining this SPDX Specification with another work, is:

"This is not an official SPDX Specification. Portions herein have been reproduced from SPDX® Specification 2.2 found at spdx.org. These portions are Copyright © 2010-2020 Linux Foundation and its Contributors, and are licensed under the Creative Commons Attribution License 3.0 Unported by the Linux Foundation and its Contributors. All other rights are expressly reserved by Linux Foundation and its Contributors."

## 1.9 Differences from SPDX Specification 2.1 <a name="1.9"></a>

**1.9.1** JSON, YAML, and a development version of XML have been added as supported file formats.

**1.9.2** A new appendix "SPDX File Tags" has been added to describe a method that developers can use to document other SPDX file-specific information (such as copyright notices, file type, etc.) in a standardized and easily machine-readable manner. See [Appendix IX](appendix-IX-file-tags.md) for more information.

**1.9.3** A new appendix "SPDX Lite" has been added to document a lightweight subset of the SPDX specification for scenarios where a full SPDX document is not required. See [Appendix VIII](appendix-VIII-SPDX-Lite.md) for more information.

**1.9.4** Additional relationship options have been added to enable expression of different forms of dependencies between SPDX elements. As well, NONE and NOASSERTION keywords are now permitted to be used with relationships to indicate what is unknown.

**1.9.5** Miscellaneous bug fixes and non-breaking improvements as reported on the mailing list and reported as issues on the [spdx-spec GitHub repository](https://github.com/spdx/spdx-spec).
