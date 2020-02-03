# 3 Licensing Profile

## Overview

### Entities
| Entity | Parent | Required | Cardinality |
| ------ | ------ | -------- | ----------- |
| [License Information](#license-information) | [Artifact](2-base-profile.md#artifact) ([Package](2-base-profile.md#package), [File](2-base-profile.md#file), [Snippet](2-base-profile.md#snippet)) | Yes | 1..1 |
| [License Reference](#license-reference) | [Document Root](2-base-profile.md#document-root) | No | 0..* |

## License Information

Parent: Package, File, Snippet, or External Artifact
Cardinality: 1 per Artifact

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Discovered License](#discovered-license) | Yes | 1..1 |
| [Declared License](#declared-license) | Yes | 1..1 |
| [Concluded License](#concluded-license) | Yes | 1..1 |
| [Distributed License](#distributed-license) | Yes | 1..1 |
| [Copyright Text](#copyright-text) | Yes | 1..1 |

### Discovered License
#### Purpose
This field contains the license information actually found in the file, if any. This information is most commonly found in the header of the file, although it may be in other areas of the actual file. Any license information not actually in the file, e.g., “COPYING.txt” file in a top level directory, should not be reflected in this field.

The options to populate this field are limited to:

The SPDX License List short form identifier, if the license is on the SPDX License List;
A reference to the license, denoted by LicenseRef-`[idstring]`, if the license is not on the SPDX License List;

`NONE`, if the file contains no license information whatsoever; or

`NOASSERTION`, if:

(i) the SPDX file creator has made no attempt to determine this field; or

(ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If license information for more than one license is contained in the file or if the license information offers the package recipient a choice of licenses, then each of the choices should be listed as a separate entry.

#### Intent
Here, the intent is to provide the license information actually in the file, as compared to the Concluded License field.

**4.6.3** Cardinality: Mandatory, one or many.

**4.6.4** Data Format: `<SPDX License Expression>` |

 ["DocumentRef-"`[idstring]`":"]"LicenseRef-"`[idstring]` |

 | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression

as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX

document as described in [section 2.6](2-document-creation-information.md#2.6)

`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`

**4.6.5** Tag: `LicenseInfoInFile:`

Example:

    LicenseInfoInFile: GPL-2.0-only
    LicenseInfoInFile: LicenseRef-2

**4.6.6** RDF: Property `spdx:licenseInfoInFile` in class `spdx:File`

Example:

    <File rdf:about="file1">
        <licenseInfoInFile rdf:resource="http://spdx.org/licenses/GPL-2.0-only" />
        <licenseInfoInFile rdf:resource="#LicenseRef-2" />
    </File>

### Declared License
#### Purpose
List the licenses that have been declared by the authors of the package. Any license information that does not originate from the package authors, e.g. license information from a third party repository, should not be included in this field.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md);
* `NONE`, if the package contains no license information whatsoever; or
* `NOASSERTION` if:

    (i) the SPDX file creator has made no attempt to determine this field; or

    (ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

#### Intent
This is simply the license identified in text in one or more files (for example COPYING file) in the source code package. This field is not intended to capture license information obtained from an external source, such as the package website. Such information can be included in Concluded License [(section 3.13)](#3.13). This field may have multiple Declared Licenses, if multiple licenses are declared at the package level.

**3.15.3** Cardinality: Mandatory, one.

**3.15.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

* `<SPDX License Expression>` is a valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

**3.15.5** Tag: `PackageLicenseDeclared:`

Example:

    PackageLicenseDeclared: LGPL-2.0-only

Example:

    PackageLicenseDeclared: (LGPL-2.0-only AND LicenseRef-3)

**3.15.6** RDF: property `spdx:licenseDeclared` in class `spdx:Package`

Example:

    <Package rdf:about="...">
        ...
        <licenseDeclared rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
        ...
    </Package>


Example:

    <Package rdf:about="...">
        ...
         <licenseDeclared>
             <ConjunctiveLicenseSet>
                 <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
                 <member rdf:resource="#LicenseRef-3" />
             </ConjunctiveLicenseSet>
        </licenseDeclared>
        ...
    </Package>

### Concluded License
#### Purpose
Contain the license the SPDX file creator has concluded as governing the package or alternative values, if the governing license cannot be determined.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md);
* `NONE`, if the SPDX file creator concludes there is no license available for this package; or
* `NOASSERTION` if:

    (i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

    (ii) the SPDX file creator has made no attempt to determine this field; or

    (iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the [Declared License](#3.15), a written explanation should be provided in the Comments on License field [(section 3.16)](#3.16). With respect to `NOASSERTION`, a written explanation in the Comments on License field [(section 3.16)](#3.16) is preferred.

#### Intent
Here, the intent is for the SPDX file creator to analyze the license information in package, and other objective information, e.g., COPYING file, together with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the package.

**3.13.3** Cardinality: Mandatory, one.

**3.13.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

**3.13.5** Tag: `PackageLicenseConcluded:`

Example:

    PackageLicenseConcluded: LGPL-2.0-only

Example:

    PackageLicenseConcluded: (LGPL-2.0-only OR LicenseRef-3)

**3.13.6** RDF: property `spdx:licenseConcluded` in `class spdx:Package`

Example:

    <Package rdf:about="...">
        ...
        <licenseConcluded rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
        ...
    </Package>

Example:

    <Package rdf:about="...">
        ...
        <licenseConcluded>
             <DisjunctiveLicenseSet>
                 <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
                 <member rdf:resource="LicenseRef-3" />
            </DisjunctiveLicenseSet>
        </licenseConcluded>
        ...
    </Package>


### Distributed License

### Copyright Text
#### Purpose
Identify the copyright holders of the package, as well as any dates present. This will be a free form text field extracted from package information files. The options to populate this field are limited to:

* Any text related to a copyright notice, even if not complete;
* `NONE` if the package contains no copyright information whatsoever; or
* `NOASSERTION`, if

    (i) the SPDX document creator has made no attempt to determine this field; or

    (ii) the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

#### Intent
Record any copyright notices for the package.

**3.17.3** Cardinality: Mandatory, one.

**3.17.4** Data Format: free form text that can span multiple lines | `NONE` | `NOASSERTION`

**3.17.5** Tag: `PackageCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

Example:

    PackageCopyrightText: <text>Copyright 2008-2010 John Smith</text>

**3.17.6** RDF: property `spdx:copyrightText` in class `spdx:Package`

Example:

    <Package rdf:about="...">
        ...
        <copyrightText>Copyright 2008-2010 John Smith</copyrightText>
        ...
    </Package>

## License Reference

This section is used for any detected, declared or concluded licenses that are NOT on the SPDX License List. For the most up-to-date version of the list see: http://spdx.org/licenses/. The SPDX License List can also be found here in [Appendix I](appendix-I-SPDX-license-list.md).

One instance should be created for every unique license or licensing information reference detected in package that does not match one of the licenses on the SPDX License List. Each license instance should have the following fields.

Fields:

## 6.1 License Identifier <a name="6.1"></a>

#### Purpose
Provide a locally unique identifier to refer to licenses that are not found on the SPDX License List. This unique identifier can then be used in the packages and files sections of the SPDX file (sections [3](3-package-information.md) and [4](4-file-information.md), respectively).

#### Intent
Create a human readable short form license identifier for a license not on the SPDX License List. This identifier should be unique within the SPDX file. In previous versions of SPDX, the references were required to be sequential numbers, but as of version 1.2, creators may specify references that are easier for humans to remember and mentally map.

**6.1.3** Cardinality: Conditional (mandatory, one) if license is not on SPDX License List.

**6.1.4** Data Format: "LicenseRef-"`[idstring]`

where

`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`.

**6.1.5** Tag: `LicenseID:`

Examples:

    LicenseID: LicenseRef-1

    LicenseID: LicenseRef-Beerware-4.2

**6.1.6** RDF: Property `spdx:licenseID` in class `spdx:ExtractedLicensingInfo`

Examples:

    <ExtractedLicensingInfo rdf:about="licenseRef-1">
       <licenseId>LicenseRef-1</licenseId>
    </ExtractedLicensingInfo>

    <ExtractedLicensingInfo rdf:about="licenseRef-Beerware-4.2">
        <licenseId>LicenseRef-Beerware-4.2</licenseId>
    </ExtractedLicensingInfo>

### Extracted Text

#### Purpose
Provide a copy of the actual text of the license reference extracted from the package or file that is associated with the License Identifier to aid in future analysis.

#### Intent
Provide the actual text as found in the package or file for a license that is not on the SPDX License List.

**6.2.3** Cardinality: Conditional (Mandatory, one) if there is a License Identifier assigned.

**6.2.4** Data Format: Free form text field that may span multiple lines.

**6.2.5** Tag: `ExtractedText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example 1 (if only short reference to license present in File):

    ExtractedText: <text>This software is licensed under the Beer License.</text>

Example 2 (if indeed full text of license present in File):

    ExtractedText: <text>"THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return </text>

**6.2.6** RDF: Property `spdx:extractedText` in class `spdx:ExtractedLicensingInfo`

Example 1 (if only short reference to license present in File):

    <ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
        <licenseId>LicenseRef-Whiskeyware</licenseId>
        <extractedText>This software is licensed under the WHISKEY-WARE LICENSE.</extractedText>
    </ExtractedLicensingInfo>

Example 2 (if indeed full text of license present in File):

    <ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
        <licenseId>LicenseRef-Whiskeyware</licenseId>
        <extractedText>""THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return.</extractedText>
    </ExtractedLicensingInfo>

### License Name

#### Purpose
Provide a common name of the license that is not on the SPDX list.

Use `NOASSERTION` If there is no common name or it is not known.

#### Intent
Provides a human readable name suitable for use as a title or label of the license when showing compact lists of licenses from the SPDX data to humans.

**6.3.3** Cardinality: Conditional (mandatory, one) if license is not on SPDX License List.

**6.3.4** Data Format: Single line of text | `NOASSERTION`.

**6.3.5** Tag: `LicenseName:`

Example:

    LicenseName: Whiskey-Ware License

**6.3.6** RDF: Property `spdx:licenseName` in class `spdx:ExtractedLicensingInfo`

Example:

    <ExtractedLicensingInfo rdf:about="licenseRef-Whiskey-Ware">
       <name>Whiskey-Ware License </name>
    </ExtractedLicensingInfo>


### License Cross Reference

#### Purpose
Provide a pointer to the official source of a license that is not included in the SPDX License List, that is referenced by the License Identifier.

#### Intent
Canonical source for a license currently not on the SPDX License List.

**6.4.3** Cardinality: Conditional (optional, one or more) if license is not on SPDX License List.

**6.4.4** Data Format: Uniform Resource Locator

**6.4.5** Tag: `LicenseCrossReference:`

Example:

    LicenseCrossReference: http://people.freebsd.org/~phk/

**6.4.6** RDF: Property `rdfs:seeAlso` in class `spdx:ExtractedLicensingInfo`

Example:

    <ExtractedLicensingInfo rdf:about="licenseRef-1">
        <rdfs:seeAlso>http://people.freebsd.org/~phk/</rdfs:seeAlso>
    </ExtractedLicensingInfo>

### License Comment

#### Purpose
This field provides a place for the SPDX file creator to record any general comments about the license.

#### Intent
Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of a license, or addition cross references.

**6.5.3** Cardinality: Optional, one.

**6.5.4** Data Format: Free form text that can span multiple lines

**6.5.5** Tag: `LicenseComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

    LicenseComment: <text>The Whiskey-Ware License has a couple of other standard variants.</text>

**6.5.6** RDF: Property `rdfs:comment` in class `spdx:ExtractedLicensingInfo`

Example:

    <ExtractedLicensingInfo rdf:about="licenseRef-1">
        <rdfs:comment> The Whiskey-Ware License has a couple of other standard variants.</rdfs:comment>
    </ExtractedLicensingInfo>
