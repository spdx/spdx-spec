# 5 Composition of an SPDX document

## 5.1 What this specification covers <a name="5.1"></a>

This document contains the specification for an SPDX document, which is made up of a set of one or more sections, instances of which contain information in the form of *fields*. The following subclauses introduce the different kinds of sections allowed. The fields for each kind of section are defined in the clause corresponding to that section.  Within an SPDX document, sections may be organized, as follows:

![Overview of SPDX document contents](img/spdx-2.3-document.png)

The object model is illustrated by [Annex C](RDF-object-model-and-identifier-syntax.md).

## 5.2 Sections <a name="5.2"></a>

### 5.2.1 SPDX document creation information section <a name="5.2.1"></a>

An instance of this section provides the necessary information for forward and backward compatibility for processing tools.

One instance shall be present for each SPDX document produced. 

Cardinality: Mandatory, one.

See [Clause 6](document-creation-information.md) for details of the fields in this kind of section.

### 5.2.2 Package information section <a name="5.2.2"></a>

If SPDX information is being used to describe packages, then one instance of the package information per package being described shall exist.  It provides important meta information about the package as a whole.  Packages are an abstract concept that can be used to refer to any distribution of software, typically consisting of one or more files and capable of containing sub-packages.  Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

A package refers to any unit of content that can be associated with a distribution of software. Typically, a package is composed of one or more files. An SPDX document may, but is not required to, provide details about the individual files comprising a package (see [Clause 8](file-information.md)).

Any of the following non-limiting examples may be (but are not required to be) represented in SPDX as a package:

* a tarball, zip file or other archive
* a directory or sub-directory
* a separately distributed piece of software which another Package or File uses or depends upon (e.g., a Python package, a Go module, ...)
* a container image, and/or each image layer within a container image
* a collection of one or more sub-packages
* a Git repository snapshot from a particular point in time

Note that some of these could be represented in SPDX as a file as well.

In an SPDX document, relationship elements can be used to indicate relationships between packages, such as dependency relationships.

Cardinality: Optional, zero or many.

See [Clause 7](package-information.md) for details of the fields in this kind of section.

In `tag:value` format, the order in which package and files occur is syntactically significant.

* A new package Information section is denoted by the package name ([7.1](package-information.md#7.1)) field.
* All package information fields shall be grouped together before the start of a files section ([Clause 8](file-information.md)), if file(s) are present.
* All files contained in a package shall immediately follow the applicable package information.
* A new package information section (via package name) denotes the start of another package.
* Sub-packages shall not be nested inside a package information section, but shall be separate and shall use a relationship to clarify.
* Annotations and relationships for the package may appear after the package information before any file information.


### 5.2.3 File information section <a name="5.2.3"></a>

One instance of the file information may exist for each file in the software package. It provides important meta information about a given file including licenses and copyright. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

Cardinality: Optional, zero or many.

See [Clause 8](file-information.md) for details of the fields in this kind of section.

When implementing `tag:value` format, the positioning of file elements is syntactically significant:

* Files are assumed to be associated with the package information that immediately precedes it, if a package exists.
* Presence of a new package information signals the end of the set of files associated with the preceding package, unless an explicit relationship is used.
* If a package contains files, the file information sections shall follow its package information section.
* If a file is not part of any package, it shall precede any package information section reference in the SPDX document.
* The first field to start off the description of a file shall be the file name in `tag:value` format.
* File information is associated with the file name that precedes it.
* Annotations on the file and relationships from the file may appear after the file information, before the next file or package information section.

When implementing file information in RDF, the `spdx:hasFile` property is used to associate the package with the file.

### 5.2.4 Snippet information section <a name="5.2.4"></a>

Snippets can optionally be used when a file is known to have some content that has been included from another original source. They are useful for denoting when part of a file may have been originally created under another license or copied from a place with a known vulnerability.

Each instance of Snippet Information shall be associated with a specific file in an SPDX document.

Cardinality: Optional, zero or many.

See [Clause 9](snippet-information.md) for details of the fields in this kind of section.

When implementing `tag:value` format, the positioning of snippet elements is syntactically significant:

* If a file contains snippets, the snippet information section shall follow a related file information section (if it exists in the document).
* Presence of a new file or package section signals the end of the set of snippets associated with the original file, unless an explicit relationship is used.
* The first field to start off the description of a snippet shall be the snippet identifier in `tag:value` format.
* Annotations on the snippet and relationships from the snippet may appear after the snippet information, before the next file or package section.


### 5.2.5 Other licensing information detected section <a name="5.2.5"></a>

This section is used for any detected, declared or concluded licenses that are NOT on the SPDX License List. For the most up-to-date version of the list, see [https://spdx.org/licenses/](https://spdx.org/licenses/). The SPDX License List can also be found in [Annex A](SPDX-license-list.md).

One instance shall be created for every unique license or licensing information being referenced that does not match one of the licenses on the SPDX License List. 

Cardinality: Optional, zero or many.

See [Clause 10](other-licensing-information-detected.md) for details of the fields in this kind of section.

### 5.2.6 Relationships between SPDX elements information section <a name="5.2.6"></a>

Packages, files, and snippets are all considered to be SPDX elements, and relationships can be made explicit between these SPDX elements by using the fields in this section. 

Cardinality: Optional, zero or many.

See [Clause 11](relationships-between-SPDX-elements.md) for details of the fields in this kind of section.

### 5.2.7 Annotations information section <a name="5.2.7"></a>

Annotations permit the addition of information to validate and clarify ambiguous SPDX elements (packages, files or snippets).

Cardinality: Optional, zero or many.

See [Clause 12](annotations.md) for details of the fields in this kind of section.

This section is now the preferred home for review information.

### 5.2.8 Review information section <a name="5.2.8"></a>

The review information section is included for compatibility with SPDX 1.2, and is deprecated since SPDX 2.0. Any review information shall use an annotation (as described in [Clause 12](annotations.md)) with an annotation type of `REVIEW`.

Review information may be added after the initial SPDX document has been created. The set of fields are optional and multiple instances may be added. Once a reviewer entry is added, the review date associated with the review is mandatory. The created date shall not be modified as a result of the addition of information regarding the conduct of a review. A review comments is optional.

See [Clause 13](review-information-deprecated.md) for details of the fields in this kind of section.

## 5.3 What this specification does not cover <a name="5.3"></a>

This document does not address the following:

* Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.
* How the data stored in an SPDX document is used by the recipient.
* Any identification of any patent(s) which may or may not relate to the package.
* Legal interpretation of the licenses or any compliance actions that have been or may need to be taken.
