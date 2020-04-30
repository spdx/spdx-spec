# Change Log
All notable changes to this project will be documented in this file.

## 2.2 (TODO)

* Added more relationship types to [Relationships](chapters/7-relationships-between-SPDX-elements.md).
* Updated [License Matching Guidelines](chapters/appendix-II-license-matching-guidelines-and-templates.md) to allow embedded rules within optional rules.
* Updated [Charter](chapters/1-rationale.md) to broaden applicable scenarios for SPDX documents.
* Updated [License List](chapters/appendix-I-SPDX-license-list.md) to v3.7.
* Added support for [PURL](https://github.com/package-url/purl-spec) and container images to [External Repository Identifiers](chapters/appendix-VI-external-repository-identifiers.md).
* Added the license matching guideline content to [Appendix II](chapters/appendix-II-license-matching-guidelines-and-templates.md).
* Added sample documents (both for final and draft formats) under `examples/`.
* Added definitions for the `rdf:` and `rdf-schema:` namespaces.
* Added clarification of the meaning of `Package` with an SPDX document.
* Added [SPDX Lite](chapters/appendix-VIII-SPDX-Lite.md) which defines a minimal subset of SPDX for scenarios not requiring full SPDX documents.
* Added [SPDX File Tags](chapters/appendix-IX-file-tags.md) which defines a mechanism to add file-specific information from SPDX-defined fields to source code files.
* Added optional field to be able to convey attribution text information for packages & files.
* Added support for `LicenseRef-` in [short form identifiers](chapters/appendix-V-using-SPDX-short-identifiers-in-source-files.md).
* Added support for relationships to `NOASSERTION` or `NONE` as a way to indicate "known unknown" and "no dependencies" respectively.
* Added YAML, JSON, and .xls as supported formats and XML as an in-development format.
* Removed support for multi-line license expressions.
* Added `swh` as an external reference to support linking to Software Heritage persistent identifiers.
* Added clarification on the case sensitivity of license expressions.
* Numerous formatting, gramatical, and spelling fixes.

See also the [SPDX specification 2.2 release announcement](TODO)

## 2.1 (2016-10-04)

* Snippets allow a portion of a file to be identified as having different properties from the file it resides within. The use of snippets is completely optional, and it is not mandatory for snippets to be identified;
* Improvements in referencing external packages and repositories; users can now associate packages with security vulnerability databases as well as component repositories, such as npm, maven, bower, among others; and
* A new appendix has been added to explain how to use SPDX License List identifiers in source files. An increasing number of open source projects are adding these short identifiers to code, as they allow anyone to quickly scan a directory of files to identify the licenses included. SPDX license identifier tags also eliminate common mistakes based on scanning headers to conclude the license of a source file

See also the [SPDX specification 2.1 release announcement](https://www.linuxfoundation.org/announcements/linux-foundation%E2%80%99s-open-compliance-initiative-releases-new-spdx-specification)

## 2.0 (2015-05-12)

* The new relationship view makes the SPDX standard more useful for a broader range of uses, including exchanging data about software and modules introduced throughout the supply chain. The improvements are said to ease the exchange of open source and license data, streamline compliance with open source licenses, and help vendors more easily identify obligations or security vulnerabilities before shipment.
* Descriptions of multiple packages in a single SPDX document, allowing aggregation of information that should be kept together
* Expanded annotations that include replacing “review” comments, available for any specific element in an SPDX document
* New license expression syntax with improved license matching guidelines, making the capture of complex licensing within a file easier and more reliable
* Additional file types and checksum algorithms with expanded file types, allowing for more precise identification of a file
* Support for referencing software pulled from version control systems, in addition to software served as downloads

See also the [SPDX specification 2.0 release announcement](https://spdx.org/news/news/2015/05/milestone-day-spdx-release-version-20-release-great-step-forward-and-greatly)

## 1.2 (2013-10-22)

* A field to specify license list version and one to describe file dependencies
* More flexibility in locally naming non-standard licenses
* Clarity with respect to case sensitivity for existing fields
* Fields to document notices, project homepage and author credits
* The ability to identify and map standard license headers

See also the [SPDX specification 1.2 release announcement](https://spdx.org/news/news/2013/10/spdx-releases-version-12-specification)

## 1.1 (2012-08-30)

* Optional fields for including license names and cross references to license sites
* New comment fields added to capture important facts in the document, license, and file sections
* Expanded list of licenses, new short form identifiers for all licenses

See also the [SPDX specification 1.1 release announcement](https://www.linuxfoundation.org/news-media/announcements/2012/08/linux-foundation%E2%80%99s-spdx%E2%84%A2-workgroup-releases-new-version-software)

## 1.0 (2011-08-17)

* The initial release

See also the [SPDX specification 1.0 release announcement](https://wiki.spdx.org/view/Business_Team/Launch/1.0/SPDX_1.0_Press_Release)
