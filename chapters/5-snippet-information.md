---
header-left: "Header"
footer-left: "Footer"
...
# 5 Snippet Information{#snippet-information}

Snippets can optionally be used when a file is known to have some content that has been included from another original source. They are useful for denoting when part of a file may have been originally created under another license.

Each instance of Snippet Information needs to be associated with a specific File in an SPDX Document.

When implementing `tag:value` format, the positioning of Snippet elements is syntactically significant:

If a File contains Snippets, the Snippet Information section should follow a related File Information section (if it exists in the document).
Presence of a new file or package section signals the end of the set of snippets associated with the original file, unless an explicit Relationship is used.
The first field to start off the description of a Snippet must be the Snippet Identifier in `tag:value` format.
Annotations on the Snippet and Relationships from the Snippet may appear after the Snippet Information, before the next file or Package section.

## 5.1 Snippet SPDX Identifier <a name="5.1"></a>

**5.1.1** Purpose: Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX Document Identifier.

**5.1.2** Intent: There may be several instances of a snippet within an SPDX document. Each snippet is an element which needs to be able to be referred to uniquely so that relationships between it and other elements can be clearly articulated.

**5.1.3** Cardinality: Mandatory, one.

**5.1.4** DataFormat: `SPDXRef-[idstring]`

where `[idstring]` is a unique string containing letters, numbers, `.` and/or `-`.

**5.1.5** Tag: `SnippetSPDXID:`

Example:

    SnippetSPDXID: SPDXRef-1

**5.1.6** RDF: The URI for the element will follow the form: `[SpdxDocumentURI]#SPDXRef-[idstring]` where `[SpdxDocumentURI]` is the URI for the SPDX Document containing the element.

Example using xml:base:

    <rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B"
        ...
        <Snippet rdf:ID=”SPDXRef-1”>
            ...
        </Snippet>

Example using document URI:

    <Snippet rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349...">
        ...
    </Snippet>

## 5.2 Snippet from File SPDX Identifier <a name="5.2"></a>{#section5.2}

**5.2.1** Purpose: Uniquely identify the file in an SPDX document which this snippet is associated with.

**5.2.2** Intent: There may be several versions of the same file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

**5.2.3** Cardinality: Mandatory, one.

**5.2.4** DataFormat: ["DocumentRef-"[idstring]":"] SPDXID

where `DocumentRef-[idstring]`: is an optional reference to an external

SPDX document as described in [section 2.6](#section2.6)

where `SPDXID` is a string containing letters, numbers, `.` and/or `-`. as

described in sections (2.3, 3.2, 4.2).

**5.2.5** Tag: `SnippetFromFileSPDXID:`

Example (snippet from a File in local SPDX Doc):

    SnippetFromFileSPDXID: SPDXRef-filecontainingsnippet

Example (snippet from a File in an External SPDX Doc):

    SnippetFromFileSPDXID: DocumentRef-ExternalDoc1:SPDXRef-filecontainingsnippet

**5.2.6** RDF: Property `spdx:snippetFromFile` in class `spdx:Snippet`

Example (snippet from a File in local SPDX Doc):

    <Snippet “rdf:ID=”SPDXRef-1”>
        <snippetFromFile rdf:about=”#SPDXRef-filecontainingsnippet”>
            ...
        </Snippet>

Example (snippet from a File in an External SPDX Doc):

    <Snippet “rdf:ID=”SPDXRef-1”>
        <snippetFromFile rdf:about=”http://foo.org/ExternalDocument1#SPDXRef-filecontainingsnippet”>
        ...
    </Snippet>

## 5.3 Snippet Byte Range <a name="5.3"></a>

**5.3.1** Purpose: This field defines the byte range in the original host file (in [5.2](#section5.2)) that the snippet information applies to.

**5.3.2** Intent: A range of bytes is independent of various formatting concerns, and the most accurate way of referring to the differences. The choice was made to start the numbering of the byte range at 1 to be consistent with the W3C pointer method vocabulary (see http://www.w3.org/TR/Pointers-in-RDF10/).

**5.3.3** Cardinality: Mandatory, one.

**5.3.4** Data Format: `number1:number2`

where: `number1` is greater than or equal to 1 and less or equal to `number2`,

AND `number2` is less than or equal to the total number of bytes in file.

The byte at position number1 and position number2 are included in the range.

**5.3.5** Tag: `SnippetByteRange:`

Example:

    SnippetByteRange: 310:420

**5.3.6** RDF: Property `spdx:byteRange` in class `spdx:Snippet`. The RDF uses the W3C proposed pointer method vocabulary (see [http://www.w3.org/TR/Pointers-in-RDF10/](http://www.w3.org/TR/Pointers-in-RDF10/)

Supported classes from the pointer method vocabulary are StartEndPointer and ByteOffsetPointer. Supported properties from the pointer method vocabulary include:

* startPointer
* endPointer
* reference
* offset

Example:

    xmlns:ptr=http://www.w3.org/2009/pointers#

    <Snippet rdf:about="...">
        <range>
            <ptr:StartEndPointer>
                <ptr:startPointer>
                    <ptr:ByteOffsetPointer>
                        <ptr:reference rdf:resource="#SPDXRef-fileReference/>
                        <ptr:offset>310</ptr:offset>
                    </ptr:ByteOffsetPointer>
                </ptr:startPointer>
                <ptr:endPointer>
                    <ptr:ByteOffsetPointer>
                        <ptr:reference  rdf:resource="#SPDXRef-fileReference/>
                        <ptr:offset>420</ptr:offset>
                    </ptr:ByteOffsetPointer>
                </ptr:endPointer>
            </ptr: StartEndPointer>
        </range>
    </Snippet>

## 5.4 Snippet Line Range <a name="5.4"></a>

**5.4.1** Purpose: This optional field defines the line range in the original host file (in [5.2](#section5.2)) that the snippet information applies to. If there is a disagreement between the byte range and line range, the byte range values will take precedence.

**5.4.2** Intent: A range of lines is a convenient reference for those files where there is a known line delimiter. The choice was made to start the numbering of the lines at 1 to be consistent with the W3C pointer method vocabulary (see http://www.w3.org/TR/Pointers-in-RDF10/).

**5.4.3** Cardinality: Optional, one.

**5.4.4** Data Format: `number1:number2`

where:

`number1` is greater than or equal to 1 and less than or equal to `number2`,
AND `number2` is less than or equal to the total number of lines in file.

**5.4.5** Tag: `SnippetLineRange:`

Example:

    SnippetLineRange: 5:23

**5.4.6** RDF: properties `spdx:byteRange` in class `spdx:Snippet`. The RDF uses the W3C proposed pointer method vocabulary (see http://www.w3.org/TR/Pointers-in-RDF10/)

Supported classes from the pointer method vocabulary are `StartEndPointer` and `LineCharPointer`. Supported properties from the pointer method vocabulary include:

* `startPointer`
* `endPointer`
* `reference`
* `lineNumber`

Example:

`xmlns:ptr=http://www.w3.org/2009/pointers#`

    <Snippet rdf:about="...">
        <range>
            <ptr:StartEndPointer>
                <ptr:startPointer>
                    <ptr:LineCharPointer>
                        <ptr:reference rdf:resource="#SPDXRef-fileReference"/>
                        <ptr:lineNumber>5</ptr:lineNumber>
                    </ptr:LineCharPointer>
                </ptr:startPointer>
                <ptr:endPointer>
                <ptr:LineCharPointer>
                    <ptr:reference rdf:resource="#SPDXRef-fileReference"/>
                    <ptr:lineNumber>23</ptr:lineNumber>
                </ptr:LineCharPointer>
            </ptr: StartEndPointer>
        </range>
    </Snippet>

## 5.5 Snippet Concluded License <a name="5.5"></a>

**5.5.1** Purpose: This field contains the license the SPDX file creator has concluded as governing the snippet or alternative values if the governing license cannot be determined. The options to populate this field are limited to:

A valid SPDX License Expression as defined in [Appendix IV](#SPDX-License-Expressions).

`NONE` should be used if there is no licensing information from which to conclude a license for the snippet.

`NOASSERTION` should be used if for the snippet:

(i) the SPDX document creator has attempted to, but cannot reach a reasonable objective determination of the Concluded License;

(ii) the SPDX document creator is uncomfortable concluding a license, despite some license information being available;

(iii) the SPDX document creator has made no attempt to determine a Concluded License;

(iv) the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the License Information in File, a written explanation should be provided in the Comments on License field ([section 5.7](#section5.7)). With respect to `NOASSERTION`, a written explanation in the Comments on License field ([section 5.7](#section5.7)) is preferred.

**5.5.2** Intent: Here, the intent is for the SPDX document creator to reconcile the license information known about the snippet,  what license information is in the file itself and other objective information for a package, along with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the snippet.

**5.5.3** Cardinality: Mandatory, one.

**5.5.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression as defined in [Appendix IV](#SPDX-License-Expressions).

**5.5.5** Tag: `SnippetLicenseConcluded:`

Example:

    SnippetLicenseConcluded: GPL-2.0

Example:

    SnippetLicenseConcluded: (LGPL-2.0 OR LicenseRef-2)

**5.5.6** RDF: Property `spdx:licenseConcluded` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...">
        ...
        <licenseConcluded>GPL-2.0</licenseConcluded>
        ...
    </Snippet>

Example:

    <Snippet rdf:about="...">
        <licenseConcluded>
            <DisjunctiveLicenseSet>
                <member rdf:resource="http://spdx.org/licenses/LGPL-2.0"/>
                <member rdf:resource="#LicenseRef-2"/>
            </DisjunctiveLicenseSet>
        </licenseConcluded>
    </Snippet>

## 5.6 License Information in Snippet <a name="5.6"></a>

**5.6.1** Purpose: This field contains the license information actually found in the snippet, if any. Any license information not actually in the snippet itself, e.g., header of the file the snippet belongs in, “COPYING.txt” file in a top level directory, should not be reflected in this field.

The options to populate this field are limited to:

The SPDX License List short form identifier, if the license is on the SPDX License List;
A reference to the license, denoted by LicenseRef-`[idstring]`, if the license is not on the SPDX License List;

`NONE`, if the snippet contains no license information whatsoever; or

`NOASSERTION`, if:

(i) the SPDX snippet creator has made no attempt to determine this field; or

(ii) the SPDX snipppet creator has intentionally provided no information (no meaning should be implied by doing so).

If license information for more than one license is contained in the snippet or if the license information offers a choice of licenses, then each of the choices should be listed as a separate entry.

**5.6.2** Intent: Here, the intent is to provide the license information actually in the snippet, as compared to the Concluded License field.

**5.6.3** Cardinality: Optional, one or many.

**5.6.4** Data Format: `<SPDX License Expression>` |

["DocumentRef-"`[idstring]`:"]"LicenseRef-"[idstring] |

| `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression

as defined in [Appendix IV](#SPDX-License-Expressions).

"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX

document as described in [section 2.6](#section2.6)

`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`.

**5.6.5** Tag: `LicenseInfoInSnippet:`

Example:

    LicenseInfoInSnippet: LGPL-2.0

    LicenseInfoInSnippet: LicenseRef-2

**5.6.6** RDF: Property `spdx:licenseInfoInSnippet` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...">
        <licenseInfoInSnippet rdf:resource="http://spdx.org/licenses/GPL-2.0" />
        <licenseInfoInSnippet rdf:resource="#LicenseRef-2" />
    </Snippet>

## 5.7 Snippet Comments on License <a name="5.7"></a>{#section5.7}

**5.7.1** Purpose: This field provides a place for the SPDX document creator to record any relevant background references or analysis that went in to arriving at the Concluded License for a snippet.

**5.7.2** Intent: Here, the intent is to provide the recipient of the SPDX document with a detailed explanation of how the Concluded License was determined for a Snippet  if it does not match the License Information in File, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the snippet in a file.

**5.7.3** Cardinality: Optional, one.

**5.7.4** Data Format: Free form text that can span multiple lines

**5.7.5** Tag: `SnippetLicenseComments:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

    SnippetLicenseComments: <text>The concluded license was taken from package xyz, from which the snippet was copied into the current file.
    The concluded license information was found in the COPYING.txt file in package xyz.</text>

**5.7.6 ** RDF: Property `spdx:licenseComments` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...”>
        ...
        <licenseComments>
            The concluded license was taken from package xyz, from which the snippet
            was copied into the current file. The concluded license information was found
            in the COPYING.txt file in package xyz.
        </licenseComments>
        ...
    </Snippet>

## 5.8 Snippet Copyright Text <a name="5.8"></a>

**5.8.1** Purpose: Identify the copyright holder of the snippet, as well as any dates present. This will be a free form text field, ideally extracted from the actual snippet.  The options to populate this field are limited to:

any text relating to a copyright notice, even if not complete;

`NONE`, if the file contains no copyright information whatsoever; or

`NOASSERTION`, if the SPDX document creator has not examined the contents of the actual file or if the SPDX document creator has intentionally provided no information (no meaning should be implied from the absence of an assertion).

**5.8.2** Intent: Record any copyright notice associated with the snippet.

**5.8.3** Cardinality: Mandatory, one.

**5.8.4** Data Format: Free form text that can span multiple lines | `NONE` | `NOASSERTION`

**5.8.5** Tag: `SnippetCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

    SnippetCopyrightText: <text> Copyright 2008-2010 John Smith </text>

**5.8.6** RDF: Property `spdx:copyrightText` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...">
        ...
        <copyrightText>
            Copyright 2008-2010 John Smith
        </copyrightText>
        ...
    </Snippet>

## 5.9 Snippet Comment <a name="5.9"></a>

**5.9.1** Purpose: This field provides a place for the SPDX document creator to record any general comments about the snippet.

**5.9.2** Intent: Here, the intent is to provide the recipient of the SPDX document with more information determined after careful analysis of a snippet.

**5.9.3** Cardinality: Optional, one.

**5.9.4** Data Format: Free form text that can span multiple lines

**5.9.5** Tag: `SnippetComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

    SnippetComment: <text>This snippet was identified as significant and highlighted in this Apache-2.0 file,
    when a commercial scanner identified it as being derived from file foo.c in package xyz which is licensed under GPL-2.0.</text>

**5.9.6** RDF: Property `rdfs:comment` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...">
        ...
        <rdfs:comment>
            This snippet was identified as significant and highlighted in this Apache-2.0
            file, when a commercial scanner identified it as being derived from file foo.c
            in package xyz which is licensed under GPL-2.0.
        </rdfs:comment>
        ...
    </Snippet>

## 5.10 Snippet Name <a name="5.10"></a>

**5.10.1** Purpose: Identify a specific snippet in a human convenient manner.

**5.10.2** Intent: To aid in identifying a snippet under discussion that may be used in multiple locations, and for consistency with the ability to refer to any copyrightable SPDX Element by name.

**5.10.3** Cardinality: Optional, one.

**5.10.4** Data Format: Single line of text

**5.10.5** Tag: `SnippetName:`

Example:

    SnippetName: from linux kernel

5.10.6 RDF: Property `spdx:snippetName` in class `spdx:Snippet`

Example:

    <Snippet rdf:about="...">
        <name>from linux kernel</name>
    </Snippet>