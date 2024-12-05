# Change Log

All notable changes to this project will be documented in this file.

## 3.0.1 (2024-11-13)

* Changes in document structure and location.
  The following documents are now located in the
  [spdx/using](https://github.com/spdx/using/) repository and are no longer
  part of the specification.
  * [Cross referencing in SPDX 3](https://github.com/spdx/using/blob/main/docs/cross-reference.md)
  * [Differences from previous editions](https://github.com/spdx/using/blob/main/docs/diffs-from-previous-editions.md)
  * [Getting started writing SPDX 3](https://github.com/spdx/using/blob/main/docs/getting-started.md)
  * [Including Security Information in a SPDX document](https://github.com/spdx/using/blob/main/docs/including-security-information-in-SPDX.md)
  * [Using SPDX license list short identifiers in source files](https://github.com/spdx/using/blob/main/docs/using-SPDX-short-identifiers-in-source-files.md)
  * [Using SPDX to comply with Norms, Standards and Regulation](https://github.com/spdx/using/blob/main/docs/using-SPDX-to-comply-with-industry-guidance.md)
* The following documents are added for the completeness of the specification:
  * [Package URL specification v1](./docs/annexes/pkg-url-specification.md)
  * [SPDX License List matching guidelines and templates](./docs/annexes/license-matching-guidelines-and-templates.md)
* [SPDX Lite](./docs/annexes/spdx-lite.md) has been updated with more explicit
  sections on "Mandatory" and "Recommended" properties.
* See changes in the model from
  [the model change log](https://github.com/spdx/spdx-3-model/blob/main/CHANGELOG.md).

See the 3.0.1 GitHub release notes for changes
[in the spec](https://github.com/spdx/spdx-spec/releases/tag/3.0.1) and
[in the model](https://github.com/spdx/spdx-3-model/releases/tag/3.0.1).

## 3.0 (2024-04-15)

See the v3.0 GitHub release notes for changes
[in the spec](https://github.com/spdx/spdx-spec/releases/tag/v3.0) and
[in the model](https://github.com/spdx/spdx-3-model/releases/tag/3.0).

See also the [SPDX specification 3.0 release announcement](https://www.linuxfoundation.org/press/spdx-3-revolutionizes-software-management-in-systems-with-enhanced-functionality-and-streamlined-use-cases)

## 2.3 (2022-11-03)

See the [v2.3 GitHub release notes](https://github.com/spdx/spdx-spec/releases/tag/v2.3) for changes.

## 2.2 (2020-05-02)

* Added more relationship types to [Relationships](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/7-relationships-between-SPDX-elements.md).
* Updated [License Matching Guidelines](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-II-license-matching-guidelines-and-templates.md) to allow embedded rules within optional rules.
* Updated [Charter](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/1-rationale.md) to broaden applicable scenarios for SPDX documents.
* Updated [License List](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-I-SPDX-license-list.md) to v3.7.
* Added support for [PURL](https://github.com/package-url/purl-spec) and container images to [External Repository Identifiers](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-VI-external-repository-identifiers.md).
* Added the license matching guideline content to [Appendix II](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-II-license-matching-guidelines-and-templates.md).
* Added sample documents (both for final and draft formats) under `examples/`.
* Added definitions for the `rdf:` and `rdf-schema:` namespaces.
* Added clarification of the meaning of `Package` with an SPDX document.
* Added [SPDX Lite](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-VIII-SPDX-Lite.md) which defines a minimal subset of SPDX for scenarios not requiring full SPDX documents.
* Added [SPDX File Tags](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-IX-file-tags.md) which defines a mechanism to add file-specific information from SPDX-defined fields to source code files.
* Added optional field to be able to convey attribution text information for packages & files.
* Added support for `LicenseRef-` in [short form identifiers](https://github.com/spdx/spdx-spec/blob/development/v2.2/chapters/appendix-V-using-SPDX-short-identifiers-in-source-files.md).
* Added support for relationships to `NOASSERTION` or `NONE` as a way to indicate "known unknown" and "no dependencies" respectively.
* Added YAML, JSON, and .xls as supported formats and XML as an in-development format.
* Removed support for multi-line license expressions.
* Added `swh` as an external reference to support linking to Software Heritage persistent identifiers.
* Added clarification on the case sensitivity of license expressions.
* Numerous formatting, grammatical, and spelling fixes.

See also the [SPDX specification 2.2 release announcement](https://www.linuxfoundation.org/blog/2020/05/spdx-2-2-specification-released/)

## 2.1 (2016-10-04)

* Snippets allow a portion of a file to be identified as having different properties from the file it resides within. The use of snippets is completely optional, and it is not mandatory for snippets to be identified;
* Improvements in referencing external packages and repositories; users can now associate packages with security vulnerability databases as well as component repositories, such as npm, maven, bower, among others; and
* A new appendix has been added to explain how to use SPDX License List identifiers in source files. An increasing number of open source projects are adding these short identifiers to code, as they allow anyone to quickly scan a directory of files to identify the licenses included. SPDX license identifier tags also eliminate common mistakes based on scanning headers to conclude the license of a source file

See also the [SPDX specification 2.1 release announcement](https://www.linuxfoundation.org/press-release/2016/10/the-linux-foundations-open-compliance-initiative-releases-new-spdx-specification)

## 2.0 (2015-05-12)

* The new relationship view makes the SPDX standard more useful for a broader range of uses, including exchanging data about software and modules introduced throughout the supply chain. The improvements are said to ease the exchange of open source and license data, streamline compliance with open source licenses, and help vendors more easily identify obligations or security vulnerabilities before shipment.
* Descriptions of multiple packages in a single SPDX document, allowing aggregation of information that should be kept together
* Expanded annotations that include replacing “review” comments, available for any specific element in an SPDX document
* New license expression syntax with improved license matching guidelines, making the capture of complex licensing within a file easier and more reliable
* Additional file types and checksum algorithms with expanded file types, allowing for more precise identification of a file
* Support for referencing software pulled from version control systems, in addition to software served as downloads

See also the [SPDX specification 2.0 release announcement](https://spdx.dev/milestone-day-spdx-release-version-2-0-release-great-step-forward-greatly-expands-utility-applicability-spec)

## 1.2 (2013-10-22)

* A field to specify license list version and one to describe file dependencies
* More flexibility in locally naming non-standard licenses
* Clarity with respect to case sensitivity for existing fields
* Fields to document notices, project homepage and author credits
* The ability to identify and map standard license headers

See also the [SPDX specification 1.2 release announcement](https://spdx.dev/spdx-releases-version-1-2-specification)

## 1.1 (2012-08-30)

* Optional fields for including license names and cross references to license sites
* New comment fields added to capture important facts in the document, license, and file sections
* Expanded list of licenses, new short form identifiers for all licenses

See also the [SPDX specification 1.1 release announcement](https://www.linuxfoundation.org/press-release/2012/08/the-linux-foundations-spdx-workgroup-releases-new-version-of-software-package-data-exchange-standard-2/)

## 1.0 (2011-08-17)

* The initial release

See also the [SPDX specification 1.0 release announcement](https://www.linuxfoundation.org/press-release/2011/08/spdx-workgroup-releases-software-package-data-exchange-standard-to-widespread-industry-support/)
