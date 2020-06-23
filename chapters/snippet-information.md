# 9 Snippet information fields

## 9.1 Snippet SPDX identifier field <a name="9.1"></a>

### 9.1.1 Description

Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX Document Identifier. The metadata for the snippet SPDX identifier field is shown in Table 52.

Table 52 — Metadata for the snippet SPDX identifier field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `SPDXRef-[idstring]`<br>where `[idstring]` is a unique string containing letters, numbers, `.` and/or `-`. |

### 9.1.2 Intent

There may be several instances of a snippet within an SPDX document. Each snippet is an element which needs to be able to be referred to uniquely so that relationships between it and other elements can be clearly articulated.

### 9.1.3 Examples

EXAMPLE 1 Tag: `SnippetSPDXID:`

```text
SnippetSPDXID: SPDXRef-1
```

EXAMPLE 2 RDF: 

The URI for the element shall follow the form: `[SpdxDocumentURI]#SPDXRef-[idstring]` where `[SpdxDocumentURI]` is the URI for the SPDX Document containing the element.

Using xml:base:

```text
<rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B"
    ...
    <Snippet rdf:about="#SPDXRef-1">
        ...
    </Snippet>
```

Using document URI:

```text
<Snippet rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</Snippet>
```

## 9.2 Snippet from file SPDX identifier field <a name="9.2"></a>

### 9.2.1 Description

Uniquely identify the file in an SPDX document which this snippet is associated with. The metadata for the snippet from file SPDX identifier field is shown in Table 53.

Table 53 — Metadata for the snippet from file SPDX identifier field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | ["DocumentRef-"[idstring]":"] SPDXID<br>where `DocumentRef-[idstring]`: is an optional reference to an external SPDX document as described in [6.6](document-creation-information.md#6.6)<br>where `SPDXID` is a string containing letters, numbers, `.` and/or `-`. as described in (6.3, 7.2, 8.2). |

### 9.2.2 Intent

There may be several versions of the same file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

### 9.2.3 Examples

EXAMPLE 1 Tag: `SnippetFromFileSPDXID:`

Snippet from a File in local SPDX Doc:

```text
SnippetFromFileSPDXID: SPDXRef-filecontainingsnippet
```

Snippet from a File in an External SPDX Doc:

```text
SnippetFromFileSPDXID: DocumentRef-ExternalDoc1:SPDXRef-filecontainingsnippet
```

EXAMPLE 2 RDF: Property `spdx:snippetFromFile` in class `spdx:Snippet`

Snippet from a File in local SPDX Doc:

```text
<Snippet rdf:ID="SPDXRef-1">
    <snippetFromFile rdf:about="#SPDXRef-filecontainingsnippet">
        ...
    </Snippet>
```

Snippet from a File in an External SPDX Doc:

```text
<Snippet rdf:ID="SPDXRef-1">
    <snippetFromFile rdf:about="http://foo.org/ExternalDocument1#SPDXRef-filecontainingsnippet">
    ...
</Snippet>
```

## 9.3 Snippet byte range field <a name="9.3"></a>

### 9.3.1 Description

This field defines the byte range in the original host file (in [9.2](#9.2)) that the snippet information applies to. The metadata for the snippet byte range field is shown in Table 54.

Table 54 — Metadata for the snippet byte range field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `number1:number2`<br>where: `number1` is greater than or equal to 1 and less or equal to `number2`,<br>AND `number2` is less than or equal to the total number of bytes in file.<br><br>The byte at position number1 and position number2 are included in the range. |

### 9.3.2 Intent

A range of bytes is independent of various formatting concerns, and the most accurate way of referring to the differences. The choice was made to start the numbering of the byte range at 1 to be consistent with the W3C pointer method vocabulary (see [http://www.w3.org/TR/Pointers-in-RDF10/](http://www.w3.org/TR/Pointers-in-RDF10/)).

### 9.3.3 Examples

EXAMPLE 1 Tag: `SnippetByteRange:`

```text
SnippetByteRange: 310:420
```

EXAMPLE 2 RDF: Property `spdx:Range` in class `spdx:Snippet`. 

The RDF uses the W3C proposed pointer method vocabulary (see [http://www.w3.org/TR/Pointers-in-RDF10/](http://www.w3.org/TR/Pointers-in-RDF10/)

Supported classes from the pointer method vocabulary are `StartEndPointer` and `ByteOffsetPointer`. Supported properties from the pointer method vocabulary include:

* `startPointer`
* `endPointer`
* `reference`
* `offset`

```text
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
```

This specification uses the prefix `ptr:` to refer to the [W3C Pointers][pointers] namespace:

```text
xmlns:ptr=http://www.w3.org/2009/pointers#
```

## 9.4 Snippet line range field <a name="9.4"></a>

### 9.4.1 Description

This optional field defines the line range in the original host file (see [9.2](#9.2)) that the snippet information applies to. If there is a disagreement between the byte range and line range, the byte range values will take precedence. The metadata for the snippet line range field is shown in Table 55.

Table 55 — Metadata for the snippet line range field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `number1:number2`<br>where:<br>`number1` is greater than or equal to 1 and less than or equal to `number2`,<br>AND `number2` is less than or equal to the total number of lines in file. |

### 9.4.2 Intent

A range of lines is a convenient reference for those files where there is a known line delimiter. The choice was made to start the numbering of the lines at 1 to be consistent with the W3C pointer method vocabulary (see [http://www.w3.org/TR/Pointers-in-RDF10/](http://www.w3.org/TR/Pointers-in-RDF10/)).

### 9.4.3 Examples

EXAMPLE 1 Tag: `SnippetLineRange:`

```text
SnippetLineRange: 5:23
```

EXAMPLE 2 RDF: properties `spdx:Range` in class `spdx:Snippet`.

The RDF uses the W3C proposed pointer method vocabulary (see <http://www.w3.org/TR/Pointers-in-RDF10/>).

Supported classes from the pointer method vocabulary are `StartEndPointer` and `LineCharPointer`. Supported properties from the pointer method vocabulary include:

* `startPointer`
* `endPointer`
* `reference`
* `lineNumber`

```text
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
```

## 9.5 Snippet concluded license field <a name="9.5"></a>

### 9.5.1 Description

This field contains the license the SPDX Document creator has concluded as governing the snippet or alternative values if the governing license cannot be determined. The options to populate this field are limited to:

A valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md).

`NONE` should be used if there is no licensing information from which to conclude a license for the snippet.

`NOASSERTION` should be used if for the snippet:

- the SPDX document creator has attempted to, but cannot reach a reasonable objective determination of the Concluded License;

- the SPDX document creator is uncomfortable concluding a license, despite some license information being available;

- the SPDX document creator has made no attempt to determine a Concluded License;

- the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the License Information in File, a written explanation should be provided in the Comments on License field (see [9.7](#9.7)). With respect to `NOASSERTION`, a written explanation in the Comments on License field (see [9.7](#9.7)) is preferred. The metadata for the snippet concluded license field is shown in Table 56.

Table 56 — Metadata for the snippet concluded license field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `<SPDX License Expression>` \| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Appendix D. |

### 9.5.2 Intent

Here, the intent is for the SPDX document creator to reconcile the license information known about the snippet,  what license information is in the file itself and other objective information for a package, along with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the snippet.

### 9.5.3 Examples

EXAMPLE 1 Tag: `SnippetLicenseConcluded:`

```text
SnippetLicenseConcluded: GPL-2.0-only
```

```text
SnippetLicenseConcluded: (LGPL-2.0-only OR LicenseRef-2)
```

EXAMPLE 2 RDF: Property `spdx:licenseConcluded` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    ...
    <licenseConcluded>GPL-2.0-only</licenseConcluded>
    ...
</Snippet>
```

```text
<Snippet rdf:about="...">
    <licenseConcluded>
        <DisjunctiveLicenseSet>
            <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only"/>
            <member rdf:resource="#LicenseRef-2"/>
        </DisjunctiveLicenseSet>
    </licenseConcluded>
</Snippet>
```

## 9.6 License information in snippet field <a name="9.6"></a>

### 9.6.1 Description

This field contains the license information actually found in the snippet, if any. Any license information not actually in the snippet itself, e.g., header of the file the snippet belongs in, “COPYING.txt” file in a top level directory, should not be reflected in this field.

The options to populate this field are limited to:

The SPDX License List short form identifier, if the license is on the SPDX License List;
A reference to the license, denoted by LicenseRef-`[idstring]`, if the license is not on the SPDX License List;

`NONE`, if the snippet contains no license information whatsoever; or

`NOASSERTION`, if:

- the SPDX snippet creator has made no attempt to determine this field; or

- the SPDX snippet creator has intentionally provided no information (no meaning should be implied by doing so).

If license information for more than one license is contained in the snippet or if the license information offers a choice of licenses, then each of the choices should be listed as a separate entry. The metadata for the license information in snippet field is shown in Table 57.

Table 57 — Metadata for the license information in snippet field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | `<SPDX License Expression>` \|<br>["DocumentRef-"`[idstring]`:"]"LicenseRef-"[idstring] \|<br>\| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a valid SPDX License Expression<br>as defined in Annex [D](SPDX-license-expressions.md).<br>DocumentRef-"`[idstring]`: is an optional reference to an external SPDX<br>document as described in [6.6](document-creation-information.md#6.6)<br>`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`. |

### 9.6.2 Intent

Here, the intent is to provide the license information actually in the snippet, as compared to the Concluded License field.

### 9.6.3 Examples

EXAMPLE 1 Tag: `LicenseInfoInSnippet:`

```text
LicenseInfoInSnippet: LGPL-2.0-only
```

```text
LicenseInfoInSnippet: LicenseRef-2
```

EXAMPLE 2 RDF: Property `spdx:licenseInfoInSnippet` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    <licenseInfoInSnippet rdf:resource
      ="http://spdx.org/licenses/GPL-2.0-only" />
    <licenseInfoInSnippet rdf:resource="#LicenseRef-2" />
</Snippet>
```

## 9.7 Snippet comments on license field <a name="9.7"></a>

### 9.7.1 Description

This field provides a place for the SPDX document creator to record any relevant background references or analysis that went in to arriving at the Concluded License for a snippet. The metadata for the snippet comments on license field is shown in Table 58.

Table 58 — Metadata for the snippet comments on license field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines |

### 9.7.2 Intent

Here, the intent is to provide the recipient of the SPDX document with a detailed explanation of how the Concluded License was determined for a Snippet if it does not match the License Information in File, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the snippet in a file.

### 9.7.3 Examples

EXAMPLE 1 Tag: `SnippetLicenseComments:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
SnippetLicenseComments: <text>The concluded license was taken from package xyz, from which the snippet was copied into the current file.
The concluded license information was found in the COPYING.txt file in package xyz.</text>
```

EXAMPLE 2 RDF: Property `spdx:licenseComments` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    ...
    <licenseComments>
        The concluded license was taken from package xyz, from which the snippet
        was copied into the current file. The concluded license information was found
        in the COPYING.txt file in package xyz.
    </licenseComments>
    ...
</Snippet>
```

## 9.8 Snippet copyright text field <a name="9.8"></a>

### 9.8.1 Description

Identify the copyright holder of the snippet, as well as any dates present. This shall be a free form text field, ideally extracted from the actual snippet.  The options to populate this field are limited to:

any text relating to a copyright notice, even if not complete;

`NONE`, if the file contains no copyright information whatsoever; or

`NOASSERTION`, if the SPDX document creator has not examined the contents of the actual file or if the SPDX document creator has intentionally provided no information (no meaning should be implied from the absence of an assertion).

The metadata for the snippet copyright text field is shown in Table 59.

Table 59 — Metadata for the snippet copyright text field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines \| `NONE` \| `NOASSERTION` |

### 9.8.2 Intent

Record any copyright notice associated with the snippet.

### 9.8.3 Examples

EXAMPLE 1 Tag: `SnippetCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
SnippetCopyrightText: <text> Copyright 2008-2010 John Smith </text>
```

EXAMPLE 2 RDF: Property `spdx:copyrightText` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    ...
    <copyrightText>
        Copyright 2008-2010 John Smith
    </copyrightText>
    ...
</Snippet>
```

## 9.9 Snippet comment field <a name="9.9"></a>

### 9.9.1 Description

This field provides a place for the SPDX document creator to record any general comments about the snippet. The metadata for the snippet comment field is shown in Table 60.

Table 60 — Metadata for the snippet comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines |

### 9.9.2 Intent

Here, the intent is to provide the recipient of the SPDX document with more information determined after careful analysis of a snippet.

### 9.9.3 Examples

EXAMPLE 1 Tag: `SnippetComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
SnippetComment: <text>This snippet was identified as significant and highlighted in this Apache-2.0 file,
when a commercial scanner identified it as being derived from file foo.c in package xyz which is licensed under GPL-2.0.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    ...
    <rdfs:comment>
        This snippet was identified as significant and highlighted
        in this Apache-2.0 file, when a commercial scanner identified
        it as being derived from file foo.c in package xyz which is
        licensed under GPL-2.0.
    </rdfs:comment>
    ...
</Snippet>
```

## 9.10 Snippet name field <a name="9.10"></a>

### 9.10.1 Description

Identify a specific snippet in a human convenient manner. The metadata for the snippet name field is shown in Table 61.

Table 61 — Metadata for the snippet name field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text |

### 9.10.2 Intent

To aid in identifying a snippet under discussion that might be used in multiple locations, and for consistency with the ability to refer to any copyrightable SPDX Element by name.

### 9.10.3 Examples

EXAMPLE 1 Tag: `SnippetName:`

```text
SnippetName: from Linux kernel
```

EXAMPLE 2 RDF: Property `spdx:name` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    <name>from Linux kernel</name>
</Snippet>
```

## 9.11 Snippet attribution text field <a name="9.11"></a>

### 9.11.1 Description

This field provides a place for the SPDX data creator to record, at the snippet level, acknowledgements that may be required to be communicated in some contexts. This is not meant to include the snippet's actual complete license text (see `SnippetLicenseConcluded` and `LicenseInfoInSnippet`), and might or might not include copyright notices (see also `SnippetCopyrightText`). The SPDX data creator may use this field to record other acknowledgements, such as particular clauses from license texts, which might be necessary or desirable to reproduce. The metadata for the snippet attribution text field is shown in Table 62.

Table 62 — Metadata for the snippet attribution text field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Free form text that can span multiple lines. |

### 9.11.2 Intent

The intent is to provide the recipient of the SPDX Document with acknowledgement content at a snippet level, to assist redistributors of the file with reproducing those acknowledgements. This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation, advertising materials, etc.) and the SPDX data creator might or might not explain elsewhere how they intend for this field to be used.

### 9.11.3 Examples

EXAMPLE 1 Tag: `SnippetAttributionText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`. 

```text
SnippetAttributionText: <text>
All advertising materials mentioning features or use of this software must display the
following acknowledgement:  This product includes software developed by the AT&T.
</text>
```

EXAMPLE 2 RDF: property `spdx:attributionText` in class `spdx:Snippet`

```text
<Snippet rdf:about="...">
    <attributionText>
        All advertising materials mentioning features or use of this
        software must display the following acknowledgement:  This 
        product includes software developed by the AT&T.
    </attributionText>
</Snippet>
```

[pointers]: http://www.w3.org/TR/Pointers-in-RDF10/
