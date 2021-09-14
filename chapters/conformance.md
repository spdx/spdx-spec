# 4 Conformance

## 4.1 SPDX Current and Previous Versions <a name="4.1"></a>

This edition has the version number 2.2.1 as part of its title. Although this is the first ISO edition of the SPDX Specification, earlier editions were published by the SPDX workgroup via the Linux Foundation (which also co-published this edition). The SPDX Specification 2.2.1 was subsequently transposed into the Joint Development Foundation. [Those earlier editions are: 1.0 (August 2011), 1.1 (August 2012), 1.2 (October 2013), 2.0 (May 2015), 2.1 (November 2016), and 2.2 (May 2020).] Differences between this edition and earlier ones are reported in [Annex I](diffs-from-previous-editions.md); see also [[1]](bibliography.md).

## 4.2 Obsolete features <a name="4.2"></a>

Over the life of a standard, some older approaches can become obsolete and are dropped from subsequent editions, possibly with a replacement approach being provided. Such action involves *deprecating* those outdated features. This edition identifies all currently deprecated features.

## 4.3 Alternate notation for some conformance requirements <a name="4.3"></a>

This standard contains more than a few *cardinality assertions*, each of which indicates absolute, optional, or conditional requirements. Here are some examples:

* Cardinality: Mandatory, one.
* Cardinality: Optional, one or many.
* Cardinality: Mandatory, one if {condition} is true or {feature} omitted, zero (shall be omitted) if {condition} is false.
* Cardinality: 0..1
* Cardinality: 0..\*
* Cardinality: 1..1
* Cardinality: 1..\*

Each of these assertions can easily be understood as to whether a feature is required, and if so, how many occurrences are required; also whether a feature is permitted, and if so, in what number. As this is the format long familiar to the SPDX community, it has been preserved in this document.

## 4.4 Standard data format requirements <a name="4.4"></a>

The data format specification and recommendations are subject to the following constraints:

* Shall be in a human readable form.

* Shall be in a syntax that a software tool can read and write.

* Shall be suitable to be checked for syntactic correctness automatically, independent of how it was generated (human or tool).

* The SPDX document character set shall support UTF-8 encoding.

* Multiple serialization formats may be used to represent the information being exchanged. Current supported formats include:

    * **YAML 1.2** see: <https://yaml.org/spec/1.2/spec.html>
    * **JavaScript Object Notation** (JSON) see: [ECMA-404](https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)
        * The JSON Schema for SPDX can be found in the [SPDX Spec Git Repository Schema directory](https://github.com/spdx/spdx-spec/blob/master/schemas/spdx-schema.json)
    * **Resource Description Framework** (RDF also referred to as RDF/XML) see: <https://www.w3.org/TR/rdf-syntax-grammar/>
    * **tag:value** flat text file as described in this specification
    * **.xls** spreadsheets

* In addition to the supported formats, the following format is in development with a plan to complete the specification in the next release:

    * **Extensible Markup Language** (XML) see: <https://www.w3.org/TR/2008/REC-xml-20081126/>

* Interoperability between all the supported file formats shall be preserved. SPDX defines how to validate a document in each supported format, and how to translate a valid document without loss to each other supported format.

* Tags and format properties are case sensitive.

* Should be easy to recognize in a file system without opening the file. A suggested naming convention is:

| Format      | Extension   |
| ----------- | ----------- |
| tag:value   | \*.spdx      |
| RDF         | \*.spdx.rdf  |
| JSON        | \*.spdx.json |
| XML         | \*.spdx.xml  |
| YAML        | \*.spdx.yaml or \*.spdx.yml |

* The convention in this specification is for the RDF examples to use `rdf:about="..."` to represent that a proper Uniform Resource Indicator (URI) should be present.

## 4.5 Trademark Compliance <a name="4.5"></a>

To be designated an SPDX document, a file shall comply with the requirements of the SPDX Trademark License (See the [SPDX Trademark Page](https://spdx.dev/trademark/)).

The official copyright notice that shall be used with any verbatim reproduction and/or distribution of this SPDX Specification 2.2.1 is:

> "Official SPDX® Specification 2.2.1 Copyright © 2010-2020 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved."

The official copyright notice that shall be used with any non-verbatim reproduction and/or distribution of this SPDX Specification 2.2.1, including without limitation any partial use or combining this SPDX Specification with another work, is:

> "This is not an official SPDX Specification. Portions herein have been reproduced from SPDX® Specification 2.2.1 found at spdx.dev. These portions are Copyright © 2010-2020 Linux Foundation and its Contributors, and are licensed under the Creative Commons Attribution License 3.0 Unported by the Linux Foundation and its Contributors. All other rights are expressly reserved by Linux Foundation and its Contributors."

## 4.6 The SPDX Lite profile <a name="4.6"></a>

Rather than conforming to this whole specification, an implementation may conform with SPDX Lite only, a profile that defines a subset of the SPDX specification. SPDX Lite aims at the balance between the SPDX standard and actual workflows in some industries. See [Annex G](SPDX-Lite.md) for more information.
