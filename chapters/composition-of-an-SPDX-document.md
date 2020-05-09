# Composition of an SPDX document

## What this specification covers

This document contains the specification for an SPDX document, which is made up of a set of **zero/one** or more Facts, instances of which contain information in the form of *fields*. The following subclause introduces the different kinds of Facts allowed. The fields for each kind of Fact are defined in the clause corresponding to that Fact.

## Facts

### **1.4.1** SPDX Document Creation Information Fact

> For demonstation purposes, the hanging paragraph(s) from the beginning of Chapter 2 have been copied here and slightly edited.

An instance of this kind of Fact provides the necessary information for forward and backward compatibility for processing tools.

One instance is required for each SPDX file produced. 

Cardinality: Mandatory, one.

See [Clause X](xxx.md) for details of the fields in this kind of Fact.

### **1.4.2** Package Information Fact

> For demonstation purposes, the hanging paragraph(s) from the beginning of Chapter 3 have been copied here and slightly edited.

An instance of this kind of Fact describes ...

One instance is required per package being described. A package may contain sub-packages, but the information in this section is a reference to the entire contents of the package listed. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

Cardinality: Optional, one or many.

In `tag:value` format, the order in which package and files occur is syntactically significant.

A new Package Information section is denoted by the [Package Name](#3.1) field.

All Package Information fields shall be grouped together before the start of a [Files section](4-file-information.md), if file(s) are present.

All files contained in a package shall immediately follow the applicable Package Information.

A new Package Information section (via Package Name) denotes the start of another package.

Sub-packages should not be nested inside a Package Information section, but should be separate and should use a Relationship to clarify.
Annotations and Relationships for the package may appear after the Package Information before any file information.

[see Clause X](xxx.md) for details of the field in this kind of Fact.

### **1.4.3** File Information Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

### **1.4.4** Snippet Information Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

### **1.4.5** Other Licensing Information Detected Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

### **1.4.6** Relationships Between SPDX Elements Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

### **1.4.7** Annotations Fact

[see Clause X](xxx.md) for details of the fields in this kind of Fact.

### Review information Fact

The review information section is included for compatibility with SPDX 1.2, and is deprecated since SPDX 2.0. Any review information shall use an Annotation (as described in [section 8](./8-annotations.md)) with an annotation type of `REVIEW`.

Review information may be added after the initial SPDX file has been created. The set of fields are optional and multiple instances may be added. Once a Reviewer entry is added, the Review Date associated with the review is mandatory. The Created date shall not be modified as a result of the addition of information regarding the conduct of a review. A Review Comments is optional.

See [Clause I](9-review-information-deprecated.md) for details of the fields in this kind of Fact.

## Fact organization

Within an SPDX document, Facts may be organized, as follows:

![Overview of SPDX 2.2 document contents](img/spdx-2.2-document.png)

## What this specification does not cover

This document does not address the following:

* **1.5.1** Information that cannot be derived from an inspection (whether manual or using automated tools) of the package to be analyzed.
* **1.5.2** How the data stored in an SPDX file is used by the recipient.
* **1.5.3** Any identification of any patent(s) which may or may not relate to the package.
* **1.5.4** Legal interpretation of the licenses or any compliance actions that have been or may need
