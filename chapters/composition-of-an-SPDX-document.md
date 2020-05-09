# Composition of an SPDX document

## What this specification covers

> correct the following zero/one statement

This document contains the specification for an SPDX document, which is made up of a set of **zero/one** or more Facts, instances of which contain information in the form of *fields*. The following subclauses introduce the different kinds of Facts allowed. The fields for each kind of Fact are defined in the clause corresponding to that Fact.

## Facts

### SPDX document creation information Fact

An instance of this kind of Fact provides the necessary information for forward and backward compatibility for processing tools.

One instance shall be present for each SPDX file produced. 

Cardinality: Mandatory, one.

See [Clause D](2-document-creation-information.md) for details of the fields in this kind of Fact.

### Package information Fact

If SPDX information is organized by grouping into packages, then one instance of the Package Information per package being described shall exist. A package may contain sub-packages, but the information in this section is a reference to the entire contents of the package listed. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

Cardinality: Optional, one or many.

In `tag:value` format, the order in which package and files occur is syntactically significant.

* A new Package Information section is denoted by the [Package Name](#3.1) field.
* All Package Information fields shall be grouped together before the start of a [Files section](4-file-information.md), if file(s) are present.
* All files contained in a package shall immediately follow the applicable Package Information.
* A new Package Information section (via Package Name) denotes the start of another package.
* Sub-packages shall not be nested inside a Package Information section, but shall be separate and shall use a Relationship to clarify.
* Annotations and Relationships for the package may appear after the Package Information before any file information.

See [Clause P](3-package-information.md) for details of the fields in this kind of Fact.

### File information Fields

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

See [Clause F](4-file-information.md) for details of the fields in this kind of Fact.

### Snippet information Fact

Snippets can optionally be used when a file is known to have some content that has been included from another original source. They are useful for denoting when part of a file may have been originally created under another license.

Each instance of Snippet Information shall be associated with a specific File in an SPDX Document.

When implementing `tag:value` format, the positioning of Snippet elements is syntactically significant:

* If a File contains Snippets, the Snippet Information section shall follow a related File Information section (if it exists in the document).
* Presence of a new file or package section signals the end of the set of snippets associated with the original file, unless an explicit Relationship is used.
* The first field to start off the description of a Snippet shall be the Snippet Identifier in `tag:value` format.
* Annotations on the Snippet and Relationships from the Snippet may appear after the Snippet Information, before the next file or Package section.

See [Clause S](5-snippet-information.md) for details of the fields in this kind of Fact.

### Other licensing information detected

This section is used for any detected, declared or concluded licenses that are NOT on the SPDX License List. For the most up-to-date version of the list, see [https://spdx.org/licenses/](https://spdx.org/licenses/). The SPDX License List can also be found here in [Appendix I](appendix-I-SPDX-license-list.md).

One instance shall be created for every unique license or licensing information reference detected in package that does not match one of the licenses on the SPDX License List. Each license instance should have the following fields.

See [Clause L](6-other-licensing-information-detected.md) for details of the fields in this kind of Fact.

### Relationships Between SPDX Elements Fact

> ToDo: there was no intro text in Chapter 7 to move here, but, presumably, we should say something.

See [Clause R](7-relationships-between-SPDX-elements.md) for details of the fields in this kind of Fact.

### **1.4.7** Annotations Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

## Fact organization

Within an SPDX document, Facts may be organized, as follows:

![Overview of SPDX 2.2 document contents](img/spdx-2.2-document.png)

## What this specification does not cover

This document does not address the following:

* **1.5.1** Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.
* **1.5.2** How the data stored in an SPDX file is used by the recipient.
* **1.5.3** Any identification of any patent(s) which may or may not relate to the package.
* **1.5.4** Legal interpretation of the licenses or any compliance actions that have been or may need
