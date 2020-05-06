# Conformance

## SPDX Versions

This edition has the version number 2.2.1 as part of its title. Although this is the first ISO edition of the SPDX Specification, earlier editions were published by the SPDX Working Group via the Linux Foundation (which also copublished this edition). [Those earlier editions are: 1.0 (August 2011), 1.1 (August 2012), 1.2 (October 2013), 2.0 (May 2015), 2.1 (November 2016), and 2.2 (May 2020).] Differences between this edition and earlier ones are reported in [Annex XX](annexXX.md).

## Obsolete features

Over the life of a standard, some older approaches can become obsolete and are dropped from subsequent editions, possibly with a replacement approach being provided. Such action involves *deprecating* those out-dated features. This edition identifies all currently deprecated features.

## Alternate notation for some requirements

This standard contains more than a few *cardinality assertions*, each of which indicates absolute, optional, or conditional requirements. Here are some examples:

* Cardinality: Mandatory, one.
* Cardinality: Optional, one or many.
* Cardinality: Mandatory, one if <condition> is true or <feature> omitted, zero (must be omitted) if <condition> is false.

Each of these assertions can easily be understood as to whether a feature is required, and if so, how many occurrences are required; also whether a feature is permitted, and if so, in what number. As this is the format long familiar to the SPDX community, it has been preserved in this document.

## Standard data format requirements

The data format specification and recommendations are subject to the following:

* **1.6.1** Shall be in a human readable form.
* **1.6.2** Shall be in a syntax that a software tool can read and write.
* **1.6.3** Shall be suitable to be checked for syntactic correctness independent of how it was generated (human or tool).
* **1.6.4** Shall support UTF-8 character encoding.
* **1.6.5** Shall permit automated specification syntax validation.
* **1.6.6** Shall be able to be represented using Resource Description Framework (RDF); shall also be able to be represented by an annotated tag value flat text file.
* **1.6.7** Shall allow the preservation of interoperability with an annotate `tag:value` format and the RDF.
* **1.6.8** Shall treat tags and RDF properties as being case sensitive.
* **1.6.9** Should be easy to recognize in a file system without opening the representation file. (A suggested file-naming convention is to use \*.spdx (for `tag:value` format) and \*-spdx.rdf for RDF format.)
* **1.6.10** The convention in this standard is for the RDF examples to use `rdf:about="..."` to represent that a proper Universal Resource Indicator (URI) should be present.

## ??? Heading TBD

 > TODO: Write an intro para here.
 
* **1.7.1** A file may be designated an SPDX document, if it is compliant with the requirements of the SPDX Trademark License (See the SPDX Trademark Page).
* **1.7.2** The official copyright notice that shall be used with any verbatim reproduction and/or distribution of this SPDX Specification 2.1.1 is:

> "Official SPDX® Specification 2.1.1 Copyright © 2010-2018 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved."

* **1.7.3** The official copyright notice that shall be used with any non-verbatim reproduction and/or distribution of this SPDX Specification 2.1.1, including without limitation any partial use or combining this SPDX Specification with another work, is:

> "This is not an official SPDX Specification. Portions herein have been reproduced from SPDX® Specification 2.1.1 found at spdx.org. These portions are Copyright © 2010-2018 Linux Foundation and its Contributors, and are licensed under the Creative Commons Attribution License 3.0 Unported by the Linux Foundation and its Contributors. All other rights are expressly reserved by Linux Foundation and its Contributors."
