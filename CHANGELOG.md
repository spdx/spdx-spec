# Change Log

All notable changes to this project will be documented in this file.

## 2.3.1 (2026-10-30)

V2.3.1 is a maintenance release of V2.3.
It corrects errors, aligns the text with the machine-readable artifacts,
and adds informative guidance.
No new fields or relationship types were added.
See also
[Annex I](chapters/diffs-from-previous-editions.md) of the specification and
the [v2.3.1 GitHub release notes](https://github.com/spdx/spdx-spec/releases/tag/v2.3.1).

### JSON schema ([`spdx-schema.json`](schemas/spdx-schema.json))

* Fixed a `primaryPackagePurpose` enum entry typo,
  from the wrong `OPERATING_SYSTEM`, to the correct `OPERATING-SYSTEM`.
* Added `documentNamespace` to the required properties of the document.
* Removed `name` from the required properties of a snippet,
  as the Snippet name field ([9.10](chapters/snippet-information.md)) is optional.
* Added `pattern` constraints for:
  * `SPDXID` of packages, files and snippets (`^SPDXRef-[a-zA-Z0-9.-]+$`);
  * `checksumValue` (hexadecimal digits); and
  * dates and timestamps: `annotationDate`, `created`, `reviewDate`,
    `builtDate`, `releaseDate`, `validUntilDate` and `timestamp`.
    The leap second `23:59:60` is accepted.
* Added an optional top-level `$schema` property.
* Added `PERSISTENT_ID` and `PACKAGE_MANAGER` to the allowed values of
  `referenceCategory`, in addition to `PERSISTENT-ID` and `PACKAGE-MANAGER`.
* Marked `revieweds`, `documentDescribes`, `hasFiles` and `fileDependencies`
  as `deprecated`.
* Changed the JSON Schema dialect from draft-07 to 2019-09,
  which defines the `deprecated` keyword.
* Fixed typos in descriptions.

### RDF ontology ([`spdx-ontology.owl.*`](ontology/))

* Changed `@base` to `http://spdx.org/rdf/terms#`.
* Made the cardinality of snippet `name` optional (0..1),
  as stated in the Snippet name field ([9.10](chapters/snippet-information.md)).
* Fixed typos in descriptions.
* Regenerated the ontology files and the HTML documentation
  with a newer version of the OWL API.
  This reorders some statements and replaces `owl:AllDifferent` axioms with
  `owl:differentFrom`, without changing their meaning.

### Specification text

* Package verification code field
  ([7.9](chapters/package-information.md)): changed `Required` to `No`
  and revised the description.
  The description of the Package checksum field
  ([7.10](chapters/package-information.md)) was revised to explain when to use it
  instead of the package verification code.
* Corrected the cardinality of the External document references field
  ([6.6](chapters/document-creation-information.md)) to 0..\*, and of the
  Primary package purpose field ([7.24](chapters/package-information.md)) to 0..1.
* Clarified in [4.3](chapters/conformance.md) that, unless specified otherwise,
  omission of an optional field should be interpreted as signaling `NOASSERTION`.
* Added [K.2](chapters/how-to-use.md) (Verifying SPDX packages) to Annex K.
* Moved the mapping of the 2021 NTIA Minimum Elements for an SBOM from
  Annex K to the new Annex L
  ([Compliance with regulatory frameworks](chapters/regulations-compliance.md)),
  and added the mapping of the 2026 CISA Minimum Elements for an SBOM.
* Fixed the rendering of examples and lists in Annex K,
  the NVD CPE link and the CPE regular expression in Annex F,
  the SWID example, a broken image link in Annex C,
  and various typos.

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
