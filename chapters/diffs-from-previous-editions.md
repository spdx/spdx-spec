# Annex I Differences from previous editions (Informative)

# I.1 Differences between V2.3.1 and V2.3 <a name="I.1"></a>

V2.3.1 is a maintenance release of V2.3.
It corrects errors, aligns the text with the machine-readable schema
and ontology, and adds informative guidance.
No new fields or relationship types were added, deleted, or marked as deprecated.

Key changes include:

* Corrected the JSON schema to match the text of Clause 7.24
  (Primary package purpose field):
  the enum value `OPERATING_SYSTEM` is now `OPERATING-SYSTEM`.

* Clarified in Clause 4.3 that, unless specified otherwise, omission of
  an optional field should be interpreted as signaling `NOASSERTION`.

* Clause 7.9 (Package verification code field) is now marked as not required,
  and the descriptions of 7.9 and 7.10 (Package checksum field) now explain
  when to use each.

* Corrected the cardinality of the external document references field (6.6)
  to 0..\* and of the primary package purpose field (7.24) to 0..1.

* Tightened the JSON schema, so that it validates more of the requirements
  stated in the text: SPDX identifiers, checksum values, and dates and
  timestamps are checked against patterns,
  and `documentNamespace` is now required.
  Deprecated fields are marked as such, and an optional `$schema` entry
  is allowed.
  The `name` of a snippet is no longer required in the JSON schema,
  and is optional in the ontology, as stated in Clause 9.10.

* Corrected typos in the JSON schema and the RDF ontology,
  and fixed the base IRI of the ontology.

* Added K.2 (Verifying SPDX packages) to Annex K to explain
  how to use the package verification code and package checksum fields.

* Added Annex L (Compliance with regulatory frameworks).
  It contains the mapping of the 2021 NTIA Minimum Elements for an SBOM
  (moved from Annex K) and
  a new mapping of the 2026 CISA Minimum Elements for an SBOM.

* Fixed rendering of examples and lists in Annex K, broken links,
  and other typos and formatting issues.

# I.2 Differences between V2.3 and V2.2.2 <a name="I.2"></a>

V2.3 has added new fields to improve the ability to capture security related information and to improve interoperabiility with other SBOM formats.  

Key changes include:

* Added fields to Clause 7 ( Package Information ) to describe "Primary Package Purpose" and standardize recording of "Built Date", "Release Date", "Valid Until Date".

* Added hash algorithms (SHA3-256, SHA3-384, SHA3-512, BLAKE2b-256, BLAKE2b-384, BLAKE2b-512, BLAKE3, ADLER32 ) to the set recognized by 7.10 (Package Checksum field) and 8.4 (File checksum field)

* Update Clause 7, 8, and 9 to make several of the licensing properties optional rather than requiring the use of "NOASSERTION" when no value is provided.

* Update Clause 11 to add the new relationship types: REQUIREMENT_DESCRIPTION_FOR and SPECIFICATION_FOR.

* Update Annex B ( License matching guidelines and templates ) to use the License List XML format

* Update Annex F ( External Repository Identifiers ) to expand security references to include advisory, fix, URL, SWID.  Expand persistent identifiers to include gitoid.

* Update Annex G ( SPDX Lite Profile ) to include NTIA SBOM mandatory minimum fields as required.

* Update Annex H to documented how the snippet information in files to be consistent with REUSE recommendations.

* Added Annex K ( How To Use SPDX in Different Scenarios ) to illustrate linking to external security information, and illustrate how the NTIA SBOM mandatory minimum elements map to SPDX fields.

# I.3 Differences between V2.2.2 and V2.2.1 <a name="I.3"></a>

V2.2.2 fixed formatting, grammatical and spelling issues found since ISO/IEC 5962:2021 SPDX v2.2.1 was published.
No new fields were added.

Key changes include:

* Clarify Optional Cardinality contradictions

* Update OWL document

* Update JSON schema to fix typos and add missing required fields.

* Clarify Information on using License List short form identifiers.

* It fixed annex lettering inconsistencies. It also moved CC-BY-3.0 to the end of the spec to keep annex letters more consistent in future versions. Here is the translation between lettering in V2.2.2 and the version that came before it:

**Table I.1 — SPDX V2.2.2 Organizational Changes**

Title | V2.2.1 ([spdx.dev](https://spdx.dev/)) | V2.2.1 (ISO) | V2.2.2
----- | -------------------------------------- | ------------ | ------
SPDX Lite                                         | Annex H/G* | Annex G   | Annex G
SPDX File Tags                                    | Annex I/H* | Annex H   | Annex H
Differences from Earlier SPDX Versions            | Annex J/I* | Annex I   | Annex I
Creative Commons Attribution License 3.0 Unported | Annex G    | [omitted] | Annex J [omitted in ISO version]

*_This edition featured inconsistent lettering._

# I.4 Differences between V2.2.1 and V2.2 <a name="I.4"></a>

There were no technical differences; V2.2.1 is V2.2 reformatted for submission to ISO via the PAS process. As a result, new clauses were added causing the previous clause-numbering sequence to change. Also, Annexes went from having Roman numbers to Latin letters. Here is the translation between numbering in V2.2.1 and the version that came before it:

**Table I.2 — SPDX V2.2.1 Organizational Changes**

Title | V2.2      | V2.2.1 ([spdx.dev](https://spdx.dev/)) | V2.2.1 (ISO)
----- | --------- | -------------------------------------- | ------------
Scope                                             | N/A           | Clause 1   | Clause 1
Normative references                              | N/A           | Clause 2   | Clause 2
Terms and definitions                             | N/A           | Clause 3   | Clause 3
Conformance                                       | N/A           | Clause 4   | Clause 4
Composition of an SPDX Document                   | N/A           | Clause 5   | Clause 5
Document Creation Information                     | Chapter 2     | Clause 6   | Clause 6
Package Information                               | Chapter 3     | Clause 7   | Clause 7
File Information                                  | Chapter 4     | Clause 8   | Clause 8
Snippet Information                               | Chapter 5     | Clause 9   | Clause 9
Other Licensing Information Detected              | Chapter 6     | Clause 10  | Clause 1
Relationship between SPDX Elements Information    | Chapter 7     | Clause 11  | Clause 1
Annotation Information                            | Chapter 8     | Clause 12  | Clause 1
Review Information (deprecated)                   | Chapter 9     | Clause 13  | Clause 1
SPDX License List                                 | Appendix I    | Annex A    | Annex A
License Matching Guidelines and Templates         | Appendix II   | Annex B    | Annex B
RDF Object Model and Identifier Syntax            | Appendix III  | Annex C    | Annex C
SPDX License Expressions                          | Appendix IV   | Annex D    | Annex D
Using SPDX short identifiers in Source Files      | Appendix V    | Annex E    | Annex E
External Repository Identifiers                   | Appendix VI   | Annex F    | Annex F
Creative Commons Attribution License 3.0 Unported | Appendix VII  | Annex G    | [omitted]
SPDX Lite                                         | Appendix VIII | Annex H/G* | Annex G
SPDX File Tags                                    | Appendix IX   | Annex I/H* | Annex H
Differences from Earlier SPDX Versions            | N/A           | Annex J/I* | Annex I

*_This edition featured inconsistent lettering._

# I.5 Differences from V2.2 and V2.1 <a name="I.5"></a>

* JSON, YAML, and a development version of XML have been added as supported file formats.

* A new appendix "SPDX File Tags" has been added to describe a method that developers can use to document other SPDX file-specific information (such as copyright notices, file type, etc.) in a standardized and easily machine-readable manner. See Appendix IX for more information.

* A new appendix "SPDX Lite" has been added to document a lightweight subset of the SPDX specification for scenarios where a full SPDX Document is not required. See Appendix VIII for more information.

* Additional relationship options have been added to enable expression of different forms of dependencies between SPDX Elements. As well, NONE and NOASSERTION keywords are now permitted to be used with relationships to indicate what is unknown.

* Miscellaneous bug fixes and non-breaking improvements as reported on the mailing list and reported as issues on the spdx-spec GitHub repository.

# I.6 Differences between V2.1 and V2.0 <a name="I.6"></a>

* Snippets have been added to allow a portion of a file to be identified as having different properties from the file it resides in.  The use of snippets is completely optional and it is not mandatory for snippets to be identified. See section 5 Snippet Information for further details on the fields available to describe snippets.

* External Packages can now be referred to in SPDX Documents.  When there is no SPDX file information available to document the content of these external packages, then the filesAnalyzed attribute on a package should be set to false. See section 3.8 Files Analyzed for more information.

* Packages are now able to associate with an “External Reference” which allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package.  See: section 3.21 External Reference, 3.22 External Reference Comment and Appendix VI: External Repository Identifiers for
more information.

* The “Artifact of Project” fields at the file level are now deprecated, as they can be replaced by a relationship to the more descriptive External Packages.

* A new appendix “Using SPDX short identifiers in Source Files” has been added to document the best practices to refer to the licenses in the SPDX license list that have emerged from the development community.  See Appendix V: Using SPDX short identifiers in Source Files for more information.

* Miscellaneous bug fixes.

# I.7 Differences between V2.0 and V1.2 <a name="I.7"></a>

* Abstraction has been applied to the underlying model with the inclusion of SPDX Elements. With SPDX 2.0, the concept of an SPDX Element is introduced (see Appendix III). This includes SPDX Documents, SPDX files, and SPDX Packages, each of which gets associated with an SPDX identifier which is denoted by “SPDXRef-”.

* SPDX relationships have been added to allow any SPDX Element to have a relationship to other SPDX Elements. Documented the origin of an SPDX hierarchy of sub-packages, documenting the origin of an SPDX Element, and documenting modifications or corrections (annotations) to an SPDX Element.

* The ability to reference SPDX Elements outside the current SPDX Document itself (external references).

* Additional file types are now supported.

* Additional checksum algorithms are now supported.

* Review Information section is deprecated. It is recommended to provide document reviews with Annotations (Section 7).

* A License Expression Syntax has been introduced and documented in Appendix IV.
