# Annex J Differences from previous editions (Informative)

# J.1 Differences between V2.0 and V1.2 <a name="J.1"></a>

* Abstraction has been applied to the underlying model with the inclusion of SPDX elements. With SPDX 2.0, the concept of an SPDX element is introduced (see Appendix III). This includes SPDX documents, SPDX files, and SPDX packages, each of which gets associated with an SPDX identifier which is denoted by “SPDXRef-”.

* SPDX relationships have been added to allow any SPDX element to have a relationship to other SPDX elements. This can be used for a variety of purposes including documenting a Software Package Data Exchange (SPDX®) Specification – Version 2.0 Copyright © 2010-2015 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved. hierarchy of sub-packages, documenting the origin of an SPDX element, and documenting modifications or corrections (annotations) to an SPDX element.

* The ability to reference SPDX elements outside the current SPDX document itself (external references).

* Additional file types are now supported.

* Additional checksum algorithms are now supported.

* Review Information section is deprecated. It is recommended to provide document reviews with Annotations (Section 7).

* A License Expression Syntax has been introduced and documented in Appendix IV.

# J.2 Differences between V2.1 and V2.0 <a name="J.2"></a>

* Snippets have been added to allow a portion of a file to be identified as having different properties from the file it resides in.  The use of snippets is completely optional and it is not manditory for snippets to be identified. See section 5 Snippet Information for further details on the fields available to describe snippets.

* External Packages can now be refered to in SPDX documents.  When there is no SPDX file information available to document the content of these external packages, then the filesAnnalyzed attribute on a package should be set to false. See section 3.8 Files Analyzed for more information. Copyright © 2010-2016 Linux Foundation and its Contributors. Licensed under the Creative Commons Attribution License 3.0 Unported. All other rights are expressly reserved.

* Packages are now able to associate with an “External Reference” which allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package.   See: section 3.21  External Reference, 3.22 External Reference Comment and Appendix VI:  External Repository Identifiers for
more information.

* The “Artifact of Project” fields at the file level are now deprecated, as they can be replaced by a relationship to the more descriptive External Packages.

* A new appendix “Using SPDX short identifiers in Source Files” has been added to document the best practices to refer to the licenses in the SPDX license list that have emerged from the development community.  See Appendix V: Using SPDX short identifiers in Source Files for more information.

* Miscellaneous bug fixes.

# J.3 Differences from V2.2 and V2.1 <a name="J.3"></a>

* JSON, YAML, and a development version of XML have been added as supported file formats.

* A new appendix "SPDX File Tags" has been added to describe a method that developers can use to document other SPDX file-specific information (such as copyright notices, file type, etc.) in a standardized and easily machine-readable manner. See Appendix IX for more information.

* A new appendix "SPDX Lite" has been added to document a lightweight subset of the SPDX specification for scenarios where a full SPDX document is not required. See Appendix VIII for more information.

* Additional relationship options have been added to enable expression of different forms of dependencies between SPDX elements. As well, NONE and NOASSERTION keywords are now permitted to be used with relationships to indicate what is unknown.

* Miscellaneous bug fixes and non-breaking improvements as reported on the mailing list and reported as issues on the spdx-spec GitHub repository.

# J.4 Differences between V2.2.1 and V2.2 <a name="J.4"></a>

There were no technical differences; V2.2.1 is V2.2 reformatted for submission to ISO via the PAS process. As a result, new clauses were added causing the previous clause-numbering sequence to change. Also, Annexes went from having Roman numbers to Latin letters. Here is the translation between numbering in the current and previous editions:

Current edition   | Title | V2.2
:---------------: | ----- | :----:
Clause 1  | Scope     | N/A
Clause 2  | Normative references | N/A
Clause 3  | Terms and definitions | N/A
Clause 4  | Conformance | N/A
Clause 5  | Composition of an SPDX document | N/A
Clause 6  | Document creation information | Chapter 2
Clause 7  | Package information | Chapter 3
Clause 8  | File information | Chapter 4
Clause 9  | Snippet information | Chapter 5
Clause 10 | Other licensing information detected | Chapter 6
Clause 11 | Relationships between SPDX elements | Chapter 7
Clause 12 | Annotations | Chapter 8
Clause 13 | Review information (deprecated) | Chapter 9
Annex A   | SPDX license list | Appendix I
Annex B   | License matching guidelines and templates | Appendix II
Annex C   | RDF object model and identifier syntax | Appendix III
Annex D   | SPDX license expressions | Appendix IV
Annex E   | Using SPDX short identifiers in source files | Appendix V
Annex F   | External repository identifiers | Appendix VI
Annex G   | Creative Commons Attribution License 3.0 Unported | Appendix VII
Annex H   | SPDX Lite | Appendix VIII
Annex I   | SPDX file tags | Appendix IX
Annex J   | Differences from previous editions | N/A

# J.5 Differences between V3.0-DRAFT and V2.2.1 <a name="J.5"></a>

* TODO