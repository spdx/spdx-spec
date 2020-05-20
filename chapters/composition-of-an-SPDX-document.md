# 5 Composition of an SPDX document

## 5.1 What this specification covers

This document contains the specification for an SPDX document, which is made up of a set of **zero/one** or more Facts, instances of which contain information in the form of *fields*. The following subclauses introduce the different kinds of Facts allowed. The fields for each kind of Fact are defined in the clause corresponding to that Fact.

## 5.2 Facts

### 5.2.1 SPDX document creation information Fact

An instance of this kind of Fact provides the necessary information for forward and backward compatibility for processing tools.

One instance shall be present for each SPDX file produced. 

Cardinality: Mandatory, one.

See [Clause 6](2-document-creation-information.md) for details of the fields in this kind of Fact.

### 5.2.2 Package information Fact

If SPDX information is organized by grouping into packages, then one instance of the Package Information per package being described shall exist. A package may contain sub-packages, but the information in this section is a reference to the entire contents of the package listed. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

Cardinality: Optional, one or many.

In `tag:value` format, the order in which package and files occur is syntactically significant.

* A new Package Information section is denoted by the [Package Name](#3.1) field.
* All Package Information fields shall be grouped together before the start of a [Files section](4-file-information.md), if file(s) are present.
* All files contained in a package shall immediately follow the applicable Package Information.
* A new Package Information section (via Package Name) denotes the start of another package.
* Sub-packages shall not be nested inside a Package Information section, but shall be separate and shall use a Relationship to clarify.
* Annotations and Relationships for the package may appear after the Package Information before any file information.

See [Clause 7](3-package-information.md) for details of the fields in this kind of Fact.

### 5.2.3 File information Fields

One instance of the File Information shall exist for each file in the software package. It provides important meta information about a given file including licenses and copyright. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

When implementing `tag:value` format, the positioning of File elements is syntactically significant:

* Files are assumed to be associated with the Package Information that immediately precedes it, if a package exists.
* Presence of a new Package Information signals the end of the set of files associated with the preceding package, unless an explicit Relationship is used.
* If a package contains files, the File Information section shall follow its Package Information section.
* If a File is not part of any package, it shall precede any Package Information section reference in the SPDX document.
* The first field to start off the description of a File shall be the File Name in `tag:value` format.
* File information is associated with the File Name that precedes it.
* Annotations on the file and Relationships from the file may appear after the file information, before the next file or Package Information section.

When implementing file information in RDF, the `spdx:hasFile` property is used to associate the package with the file.

See [Clause 8](4-file-information.md) for details of the fields in this kind of Fact.

### 5.2.4 Snippet information Fact

Snippets can optionally be used when a file is known to have some content that has been included from another original source. They are useful for denoting when part of a file may have been originally created under another license.

Each instance of Snippet Information shall be associated with a specific File in an SPDX Document.

When implementing `tag:value` format, the positioning of Snippet elements is syntactically significant:

* If a File contains Snippets, the Snippet Information section shall follow a related File Information section (if it exists in the document).
* Presence of a new file or package section signals the end of the set of snippets associated with the original file, unless an explicit Relationship is used.
* The first field to start off the description of a Snippet shall be the Snippet Identifier in `tag:value` format.
* Annotations on the Snippet and Relationships from the Snippet may appear after the Snippet Information, before the next file or Package section.

See [Clause 9](5-snippet-information.md) for details of the fields in this kind of Fact.

### 5.2.5 Other licensing information detected

This section is used for any detected, declared or concluded licenses that are NOT on the SPDX License List. For the most up-to-date version of the list, see [https://spdx.org/licenses/](https://spdx.org/licenses/). The SPDX License List can also be found here in [Annex A](appendix-I-SPDX-license-list.md).

One instance shall be created for every unique license or licensing information reference detected in package that does not match one of the licenses on the SPDX License List. Each license instance should have the following fields.

See [Clause 10](6-other-licensing-information-detected.md) for details of the fields in this kind of Fact.

### 5.2.6 Relationships Between SPDX Elements Fact

> ToDo: there was no intro text in Chapter 7 to move here, but, presumably, we should say something.

See [Clause 11](7-relationships-between-SPDX-elements.md) for details of the fields in this kind of Fact.

### 5.2.7 Annotations Fact

> ToDo: there was no intro text in Chapter 8 to move here, but, presumably, we should say something.

See [Clause 12](8-annotations.md) for details of the fields in this kind of Fact.

### 5.2.8 Review information Fact

The review information section is included for compatibility with SPDX 1.2, and is deprecated since SPDX 2.0. Any review information shall use an Annotation (as described in [Clause 12](./8-annotations.md)) with an annotation type of `REVIEW`.

Review information may be added after the initial SPDX file has been created. The set of fields are optional and multiple instances may be added. Once a Reviewer entry is added, the Review Date associated with the review is mandatory. The Created date shall not be modified as a result of the addition of information regarding the conduct of a review. A Review Comments is optional.

See [Clause 13](9-review-information-deprecated.md) for details of the fields in this kind of Fact.

## 5.3 Fact organization

Within an SPDX document, Facts may be organized, as follows:

![Overview of SPDX document contents](img/spdx-2.2-document.png)

## 5.4 What this specification does not cover

This document does not address the following:

* Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.
* How the data stored in an SPDX file is used by the recipient.
* Any identification of any patent(s) which may or may not relate to the package.
* Legal interpretation of the licenses or any compliance actions that have been or may need
