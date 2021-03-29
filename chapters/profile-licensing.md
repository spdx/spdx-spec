# N Licensing Profile

The Licensing profile describes fields and classes used to convey information regarding the licenses applicable to Artifacts, as well as related information such as copyright notices.

**(TBD how to express the profile identifier)**

## N.1 Document

### N.1.1 Summary

The Licensing profile adds a field to the Document class from the Base profile.

### N.1.2 Metadata

**(TBD how to express this in the context of adding fields to the Document Class)**

| Attribute | Value |
| --------- | ----- |
| Name | Document |
| SubclassOf | **TBD whether Document or something else. “extends”?** |
| Status | stable |

### N.1.3 Description

**(TBD how to express this in the context of adding fields to the Document Class)**

### N.1.4 Fields

#### N.1.4.1 License List Version

##### N.1.4.1.1 Summary

Identify the version of the SPDX License List used when the SPDX Document was created.

##### N.1.4.1.2 Metadata

**(TBD how to express this in the context of adding fields to the Document Class)**

**(TBD whether `Format Description` is useful below)**

| Attribute | Value |
| --------- | ----- |
| Name | LicenseListVersion |
| Min Count | 0 |
| Max Count | 1 |
| Data Type | xsd:string |
| Format | `\d+\.\d+` |
| Format Description | `M.N` where:<br>* `M` is major version number<br>* `N` is minor version number |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.1.4.1.3 Description

Recognizing that licenses are added to the SPDX License List with each subsequent version, the intent is to provide recipients of the SPDX Document with the version of the SPDX License List used. This anticipates that an SPDX Document may have used a version of the SPDX License List that is older than the then-current one.

##### N.1.4.1.4 Examples

**(TBD whether examples will be included directly in the Markdown specs; retaining them for now with the understanding they may be reformatted or moved elsewhere. Also, to be added JSON, YAML and XML (and anything else? how to express spreadsheet?))**

| Format | Example |
| ------ | ------- |
| Tag-value | `LicenseListVersion: 3.12` |
| RDF | `<licenseListVersion>3.12</licenseListVersion>` |

## N.2 Artifact

### N.2.1 Summary

The Licensing profile adds multiple fields to the Artifact classes from the Base profile.

Where noted below, the following fields may have slightly different meanings or uses as applied to Packages, Files and Snippets.

See also Sections N.3 and N.4 below, which describe similar fields that are available only for the specific Artifact subclasses Packages and Files, respectively.

### N.2.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | Artifact |
| SubclassOf | **TBD whether Artifact or something else** |
| Status | stable |

**(TBD how to express this in the context of adding fields to subclasses of the Artifact class)**

### N.2.3 Description

**(TBD how to express this in the context of adding fields to subclasses of the Artifact class)**

### N.2.4 Fields

#### N.2.4.1 Declared License

##### N.2.4.1.1 Summary

Identify the license information actually found in the Artifact, for example as detected by use of automated tooling.

##### N.2.4.1.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | LicenseDeclared |
| Min Count | 0 |
| Max Count | 1 |
| Data Type | xsd:string **(TBD if this is accurate for e.g. RDF)** |
| Format | **(TBD how to express this as a regex)** |
| Format Description | `<SPDX License Expression>` or `NONE` or `NOASSERTION` where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Appendix **TBD** |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.2.4.1.3 Description

The Declared License is the license identified in text in the Artifact as the license declared by the Artifact’s authors.

This field is not intended to capture license information obtained from an external source, such as the package website. Such information can be included, as needed, in Concluded License (Section N.2.4.2).

The Declared License may be expressed differently in practice for different types of Artifacts. For example:

* for **Packages**:
  * would include license info describing the license of the Package as a whole, when it is found _in the Package itself_ (e.g., LICENSE file, README file, metadata in the repository, etc.)
  * would _not_ include any license information that is not in the Package itself (e.g., license information from the project’s website or from a third party repository or website)
* for **Files**:
  * would include license info found _in the File itself_ (e.g., license header or notice, comments, SPDX License Expression)
  * would _not_ include license info found in a different file (e.g., LICENSE file in the top directory of a repository)
* for **Snippets**:
  * would include license info found _in the Snippet itself_ (e.g., license notice, comments, SPDX License Expression)
  * would _not_ include license info found elsewhere in the File or in a different File (e.g., comment at top of File if it is not within the Snippet, LICENSE file in the top directory of a repository)

The options to populate this field are limited to:
* a valid SPDX License Expression as defined in Appendix **TBD**;
* `NONE`, if the Artifact contains no license information whatsoever; or
* `NOASSERTION` if:
  * the SPDX Document creator has attempted to but cannot reach a reasonable objective determination;
  * the SPDX Document creator has made no attempt to determine this field; or
  * the SPDX Document creator has intentionally provided no information (no meaning should be implied by doing so).

##### N.2.4.1.4 Examples

| Format | Example |
| ------ | ------- |
| Tag-value | `LicenseDeclared: LGPL-2.0-only AND LicenseRef-3` |
| RDF | `<licenseDeclared>`<br> `<ConjunctiveLicenseSet>`<br> `<member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />`<br> `<member rdf:resource="#LicenseRef-3" />`<br> `</ConjunctiveLicenseSet>`<br> `</licenseDeclared>`|

#### N.2.4.2 Concluded License

##### N.2.4.2.1 Summary

Identify the license the SPDX Document creator has concluded as governing the Artifact.

##### N.2.4.2.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | LicenseConcluded |
| Min Count | 1 |
| Max Count | 1 |
| Data Type | xsd:string **(TBD if this is accurate for e.g. RDF)** |
| Format | **(TBD how to express this as a regex)** |
| Format Description | `<SPDX License Expression>` or `NONE` or `NOASSERTION` where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Appendix **TBD** |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.2.4.2.3 Description

The intent is for the SPDX Document creator to analyze the license information in the Artifact and other information to arrive at a reasonably objective conclusion as to what license governs the Artifact.

The options to populate this field are limited to:
* a valid SPDX License Expression as defined in Appendix IV;
* `NONE`, if the SPDX Document creator has looked and did not find any license information for this artifact; or
* `NOASSERTION`, if:
  * the SPDX Document creator has attempted to but cannot reach a reasonable objective determination;
  * the SPDX Document creator has made no attempt to determine this field; or
  * the SPDX Document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the Declared License (Section N.2.4.1), a written explanation should be provided in the Comments on License field (Section N.2.4.3). 

If the Concluded License is `NOASSERTION`, a written explanation in the Comments on License field (Section N.2.4.3) is preferred.

If the Declared License is a choice of one or more licenses - e.g., use of the License Expression operator `OR` - then the Concluded License may either retain the license choice or identify which license was chosen.

##### N.2.4.2.4 Examples

| Format | Example |
| ------ | ------- |
| Tag-value | `LicenseConcluded: LGPL-2.0-only AND LicenseRef-3` |
| RDF | `<licenseConcluded>`<br> `<ConjunctiveLicenseSet>`<br> `<member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />`<br> `<member rdf:resource="#LicenseRef-3" />`<br> `</ConjunctiveLicenseSet>`<br> `</licenseConcluded>`|

#### N.2.4.3 Comments on License

##### N.2.4.3.1 Summary

Record any background information or analysis relevant to determining the Concluded License for an Artifact.

##### N.2.4.3.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | LicenseComments |
| Min Count | 0 |
| Max Count | 1 |
| Data Type | xsd:string |
| Format | `.*` |
| Format Description | free form text that can span multiple lines |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.2.4.3.3 Description

The intent is to provide the recipient of the SPDX Document with a detailed explanation of how the Concluded License (Section N.2.4.2) was determined if:
* the Concluded License does not match the Declared License (Section N.2.4.1);
* the Concluded License is marked `NOASSERTION`; or
* the SPDX Document creator wants to provide other helpful information relevant to determining the license of the Artifact.

##### N.2.4.3.4 Examples

| Format | Example |
| ------ | ------- |
| Tag-value | `LicenseComments: <text>The license for this project changed with the release of version 1.4.`<br>The version of the project included here post-dates the license change.</text>` |
| RDF | `<licenseComments>`<br> `This package has been shipped in source and binary form. The binaries were created with gcc 4.5.1 and expect to link to compatible system run time libraries.`<br> `</licenseComments>` |

#### N.2.4.4 Copyright Text

##### N.2.4.4.1 Summary

Identify the text of copyright notice(s) for the Artifact, if any.

##### N.2.4.4.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | CopyrightText |
| Min Count | 0 |
| Max Count | no maximum |
| Data Type | xsd:string |
| Format | `.*` |
| Format Description | free form text that can span multiple lines or `NONE` or `NOASSERTION` |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.2.4.4.3 Description

The options to populate this field are limited to:
* any text related to a copyright notice, even if not complete;
* `NONE` if the Artifact contains no copyright notice whatsoever; or
* `NOASSERTION`, if
  * the SPDX Document creator has attempted to but cannot reach a reasonable objective determination;
  * the SPDX Document creator has made no attempt to determine this field; or
  * the SPDX Document creator has intentionally provided no information (no meaning should be implied by doing so).

##### N.2.4.4.4 Examples

| Format | Example |
| ------ | ------- |
| Tag-value | `CopyrightText: Copyright 2008-2010 Jane Smith` |
| RDF | `<copyrightText>Copyright 2008-2010 Jane Smith</copyrightText>` |

#### N.2.4.5 Attribution Text

##### N.2.4.5.1 Summary

Record acknowledgements, such as particular clauses from license texts, which may be necessary or desirable to reproduce in connection with particular uses or redistributions of the Artifact.

##### N.2.4.5.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | AttributionText |
| Min Count | 0 |
| Max Count | no maximum |
| Data Type | xsd:string |
| Format | `.*` |
| Format Description | free form text that can span multiple lines |
| SubPropertyOf | **TBD** |
| Status | stable |

##### N.2.4.5.3 Description

The intent is to assist users or redistributors of the Artifact with reproducing acknowledgments that may be required by certain licenses.

This is not meant to include the Artifact’s actual complete license text, which would be recorded in Declared License (Section N.2.4.1) and/or Concluded License (Section N.2.4.2).

It is also not meant to include the Artifact’s copyright notices, which would be recorded in Copyright Text (Section N.2.4.4).

This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation or advertising materials).

##### N.2.4.5.4 Examples

| Format | Example |
| ------ | ------- |
| Tag-value | `AttributionText: All advertising materials mentioning features or use of this software must display the following acknowledgment: "This product includes software developed by the OpenSSL Project for use in the OpenSSL Toolkit. (http://www.openssl.org/)"` |
| RDF | `<attributionText>All advertising materials mentioning features or use of this software must display the following acknowledgment: "This product includes software developed by the OpenSSL Project for use in the OpenSSL Toolkit. (http://www.openssl.org/)"</attributionText>` |

## N.3 Package

### N.3.1 Summary

In addition to the fields added to the Artifact classes from the Base profile as described in Section N.2, the Licensing profile also adds a field to the Package class from the Base profile.

### N.3.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | Package |
| SubclassOf | **TBD whether Package or something else** |
| Status | stable |

**(TBD how to express this in the context of adding a field to the Package class)**

### N.3.3 Description

**(TBD how to express this in the context of adding a field to the Package class)**

### N.3.4 Fields

#### N.3.4.1 All License Info From Files

**(TBD Details to be added)**

## N.4 File

### N.4.1 Summary

In addition to the fields added to the Artifact classes from the Base profile as described in Section N.2, the Licensing profile also adds a field to the File class from the Base profile.

### N.4.2 Metadata

| Attribute | Value |
| --------- | ----- |
| Name | File |
| SubclassOf | **TBD whether File or something else** |
| Status | stable |

**(TBD how to express this in the context of adding a field to the File class)**

### N.4.3 Description

**(TBD how to express this in the context of adding a field to the File class)**

### N.4.4 Fields

#### N.4.4.1 File Notice

**(Details to be added)**

## N.5 Other Licenses

**(Details to be added)**

**(TBD how to express the various elements of the License model pieces, which have not been included in sections of the spec from pre-3.0 SPDX versions)**
