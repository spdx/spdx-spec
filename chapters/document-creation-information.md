# 6 Document creation information fields

## 6.1 SPDX version field <a name="6.1"></a>

**Description**

Provide a reference number that can be used to understand how to parse and interpret the rest of the file. It will enable both future changes to the specification and to support backward compatibility. The version number consists of a major and minor version indicator. The major field shall be incremented when incompatible changes between versions are made (one or more sections are created, modified or deleted). The minor field shall be incremented when backwards compatible changes are made.

**Intent**

Here, parties exchanging information in accordance with the SPDX specification need to provide 100% transparency as to which SPDX specification version such information is conforming to.

**Metadata**

The metadata for the SPDX version field is shown in Table 2.

Table 2 — Metadata for the SPDX version field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `SPDX-M.N` where:<br>* `M` is major version number<br>* `N` is minor version number. |

**Examples**

EXAMPLE 1 Tag: `SPDXVersion:`

```text
SPDXVersion: SPDX-2.2
```

EXAMPLE 2 RDF: `spdx:specVersion`

```text
<SpdxDocument rdf:about="...">
   <specVersion>SPDX-2.2</specVersion>
</SpdxDocument>
```

This specification uses the prefix `rdf:` to refer to the [RDF/XML][rdf] namespace:

```text
http://www.w3.org/1999/02/22-rdf-syntax-ns#
```

## 6.2 Data license field <a name="6.2"></a>

**Description**

Compliance with this document includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata"). This document contains numerous fields where an SPDX document creator may provide relevant explanatory text in SPDX-Metadata.
Without opining on the lawfulness of "database rights" (in jurisdictions where applicable), such explanatory text is copyrightable subject matter in most Berne Convention countries.
By using this document, or any portion hereof, you hereby agree that any copyright rights (as determined by your jurisdiction) in any SPDX-Metadata, including without limitation explanatory text, shall be subject to the terms of the Creative Commons CC0 1.0 Universal license.  For SPDX-Metadata not containing any copyright rights, you hereby agree and acknowledge that the SPDX-Metadata is provided to you "as-is" and without any representations or warranties of any kind concerning the SPDX-Metadata, express, implied, statutory or otherwise, including without limitation warranties of title, merchantability, fitness for a particular purpose, non-infringement, or the absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not discoverable, all to the greatest extent permissible under applicable law.

**Intent**

This is to alleviate any concern that content (the data or database) in an SPDX file is subject to any form of intellectual property right that could restrict the re-use of the information or the creation of another SPDX file for the same project(s). This approach avoids intellectual property and related restrictions over the SPDX file, however individuals can still contract with each other to restrict release of specific collections of SPDX files (which map to software bill of materials) and the identification of the supplier of SPDX files.

**Metadata**

The metadata for the data license field is shown in Table 3.

Table 3 — Metadata for the data license field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `CC0-1.0` |

**Examples**

EXAMPLE 1 Tag: `DataLicense:`

```text
DataLicense: CC0-1.0
```

EXAMPLE 2 RDF: `spdx:dataLicense`

```text
<SpdxDocument rdf:about="...">
  <dataLicense rdf:resource="http://spdx.org/licenses/CC0-1.0" />
</SpdxDocument>
```

## 6.3 SPDX identifier field <a name="6.3"></a>

**Description**

Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally. To reference another SPDX document in total, this identifier should be used with the external document identifier preceding it. See [Clause 11](relationships-between-SPDX-elements.md) for examples.

**Intent**

Provide a way for the document to refer to itself in relationship to other elements.

**Metadata**

The metadata for the SPDX identifier field is shown in Table 4.

Table 4 — Metadata for SPDX identifier field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `SPDXRef-DOCUMENT` |

**Examples**

EXAMPLE 1 Tag: `SPDXID:`

```text
SPDXID: SPDXRef-DOCUMENT
```

EXAMPLE 2 RDF:

The URI for the document is the document namespace appended by

`#SPDXRef-DOCUMENT`

```text
<spdx:SpdxDocument 
  rdf:about="http://spdx.org/spdxdocs/spdx-example-444504E0-4F89-41D3-9A0C-0305E82C33123#SPDXRef-DOCUMENT">
...
</spdx:SpdxDocument>
```

## 6.4 Document name field <a name="6.4"></a>

**Description**

Identify name of this document as designated by creator.

**Intent**

Here, the name of each document is an important convention and easier to refer to than the URI.

**Metadata**

The metadata for the document name field is shown in Table 5.

Table 5 — Metadata for the document name field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Single line of text. |

**Examples**

EXAMPLE 1 Tag: `DocumentName:`

```text
DocumentName: glibc-v2.3
```

```text
DocumentName: ubuntu-14.04
```

EXAMPLE 2 RDF: Property `spdx:name` in class `spdx:SpdxDocument`

```text
<SpdxDocument rdf:about="...">
  <name>glibc-v2.3</name>
</SpdxDocument>
```

```text
<SpdxDocument rdf:about="...">
  <name>ubuntu-14.04</name>
</SpdxDocument>
```

## 6.5 SPDX document namespace field <a name="6.5"></a>

**Description**

Provide an SPDX document-specific namespace as a unique absolute [Uniform Resource Identifier][URI] (URI) as specified in [RFC-3986][rfc3986], with the exception of the ‘#’ delimiter. The SPDX Document URI shall not contain a URI "part" (e.g. the "#" character), since the ‘#’ is used in SPDX element URIs (packages, files, snippets, etc) to separate the document namespace from the element’s SPDX identifier. Additionally, a scheme (e.g. “https:”) is required.

The URI shall be unique for the SPDX document including the specific version of the SPDX document. If the SPDX document is updated, thereby creating a new version, a new URI for the updated document shall be used. There may only be one URI for an SPDX document and only one SPDX document for a given URI.

**Intent**

The URI provides an unambiguous mechanism for other SPDX documents to reference SPDX elements within this SPDX document. See [6.6](#6.6) for a description on how external documents are referenced. Although it is not required, the URI can be constructed in a way which provides information on how the SPDX document can be found. For example, the URI can be a URL referencing the SPDX document itself, if it is available on the internet. A best practice for creating the URI for SPDX documents available on the public internet is `http://[CreatorWebsite]/[pathToSpdx]/[DocumentName]-[UUID]` where:

* `CreatorWebsite` is a website hosted by the creator of the document. (e.g. an SPDX document provided by SPDX would be spdx.org)
* `PathToSpdx` is a path to where SPDX documents are stored on the website (e.g. /spdx/spdxdocs)
* `DocumentName` is a name given to the SPDX Document itself, typically the (set of) package name(s) followed by the version. (See [6.4](#6.4).)
* `UUID` is a [universally unique identifier][URI]. The UUID could be a version 4 random UUID which can be generated from the [Online UUID Generator][uuid-gen] or a version 5 UUID generated from a sha1 checksum known to be unique for this specific SPDX document version.
* If the creator does not own their own website, a default SPDX CreatorWebsite and PathToSpdx can be used `spdx.org/spdxdocs`. Note that the SPDX documents are not currently stored or accessible on this website. The URI is only used to create a unique ID following the above conventions.

NOTE The URI does not have to be accessible. It is only intended to provide a unique ID. In many cases, the URI will point to a web accessible document, but this should not be assumed to be the case.

[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[rfc3986]: https://tools.ietf.org/html/rfc3986
[uuid-gen]: https://www.uuidgenerator.net/

**Metadata**

The metadata for the SPDX document namespace field is shown in Table 6.

Table 6 — Metadata for the SPDX document namespace field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Unique absolute Uniform Resource Identifier (URI) as specified in [RFC-3986](https://tools.ietf.org/html/rfc3986), with the following exceptions:<br><br>The SPDX Document URI cannot contain a URI "part" (e.g. the `#` delimiter), since the `#` is used to uniquely identify SPDX element identifiers. The URI must contain a scheme (e.g. `https:`).<br><br>The URI must be unique for the SPDX document including the specific version of the SPDX document. If the SPDX document is updated, thereby creating a new version, a new URI for the updated document must be used. There can only be one URI for an SPDX document and only one SPDX document for a given URI. |

**Examples**

EXAMPLE 1 Tag: `DocumentNamespace:`

```text
DocumentNamespace: http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...
```

EXAMPLE 2 RDF: The unique ID is the URI for the SPDX document

```text
<SpdxDocument rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...">
    <rdfs:comment>This document was created using SPDX 2.0 using licenses from the web site.</rdfs:comment>
</SpdxDocument>
```

This specification uses the prefix `rdfs:` to refer to the [RDF Schema][rdf-schema] namespace:

```text
http://www.w3.org/2000/01/rdf-schema#
```

## 6.6 External document references field <a name="6.6"></a>

**Description**

Identify any external SPDX documents referenced within this SPDX document.

**Intent**

SPDX elements within this document may be related to other SPDX elements referenced from external SPDX documents. An SPDX element could be a snippet, file, package, license reference or SPDX document.

**Metadata**

The metadata for the external document references field is shown in Table 7.

Table 7 — Metadata for the external document references field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..* |
| Format | DocumentRef-`[idstring]` `[SPDX Document URI]` `[Checksum]`<br>where<br>`[idstring]` is a unique string containing letters, numbers, `.`, `-` and/or `+`.<br>`[SPDX Document URI]` is the unique ID for the external document as defined in [6.5](#6.5) of that referenced document,<br> `[Checksum]` is a checksum of the external document following the checksum format defined in [8.4](file-information#8.4). |

**Examples**

EXAMPLE 1 Tag: `ExternalDocumentRef:`

```text
ExternalDocumentRef:DocumentRef-spdx-tool-1.2 http://spdx.org/spdxdocs/spdx-tools- v1.2-3F2504E0-4F89-41D3-9A0C-0305E82C3301 SHA1: d6a770ba38583ed4bb4525bd96e50461655d2759
```

EXAMPLE 2 RDF: Property `spdx:externalDocumentRef` in class `spdx:SpdxDocument range ExternalDocumentRef`.

The ExternalDocumentRef contains two properties:

* spdxDocument - the SpdxDocument being referenced
* checksum - the checksum of the referenced SPDX document

```text
<externalDocumentRef rdf:ID="DocumentRef-spdx-tool-1.2">
    <ExternalDocumentRef>
        <spdxDocument rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82..." />
        <checksum>
            <Checksum>
                <algorithm rdf:resource="checksumAlgorithm_sha1"/>
                <checksumValue>d6a770ba38583ed4bb4525bd96e50461655d2758
                </checksumValue>
            </Checksum>
        </checksum>
    </ExternalDocumentRef>
</externalDocumentRef>
```

NOTE In RDF, a namespace can be created for the external document reference if a short form name for the external reference is desired.

## 6.7 License list version field <a name="6.7"></a>

**Description**

An optional field for creators of the SPDX file to provide the version of the SPDX License List used when the SPDX file was created.

**Intent**

Recognizing that licenses are added to the SPDX License List with each subsequent version, the intent is to provide recipients of the SPDX file with the version of the SPDX License List used. This anticipates that in the future, an SPDX file might have used a version of the SPDX License List that is older than the then current one.

**Metadata**

The metadata for the license list version field is shown in Table 8.

Table 8 — Metadata for the license list version field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | `M.N`<br>where:<br>`M` is major version number<br>`N` is minor version number. |

**Examples**

EXAMPLE 1 Tag: `LicenseListVersion:`

```text
LicenseListVersion: 3.8
```

EXAMPLE 2 RDF: Property `licenseListVersion` in class `spdx:CreationInfo`

```text
<CreationInfo>
    <licenseListVersion>3.8</licenseListVersion>
</CreationInfo>
```

## 6.8 Creator field <a name="6.8"></a>

**Description**

Identify who (or what, in the case of a tool) created the SPDX file. If the SPDX file was created by an individual, indicate the person's name. If the SPDX file was created on behalf of a company or organization, indicate the entity name. If the SPDX file was created using a software tool, indicate the name and version for that tool. If multiple participants or tools were involved, use multiple instances of this field. Person name or organization name may be designated as “anonymous” if appropriate.

**Intent**

Here, the generation method will assist the recipient of the SPDX file in assessing the general reliability/accuracy of the analysis information.

**Metadata**

The metadata for the creator field is shown in Table 9.

Table 9 — Metadata for the creator field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..* |
| Format | Single line of text with the following keywords:<br>`"Person: person name" and optional "(email)"`<br>`"Organization: organization" and optional "(email)"`<br>`"Tool: toolidentifier-version"` |

**Examples**

EXAMPLE 1 Tag: `Creator:`

```text
Creator: Person: Jane Doe ()
Creator: Organization: ExampleCodeInspect ()
Creator: Tool: LicenseFind-1.0
```

EXAMPLE 2 RDF: Property `spdx:creator` in class `spdx:CreationInfo`

```text
<CreationInfo>
    <creator> Person: Jane Doe () </creator>
    <creator> Organization: ExampleCodeInspect () </creator>
    <creator> Tool: LicenseFind-1.0 </creator>
</CreationInfo>
```

## 6.9 Created field <a name="6.9"></a>

**Description**

Identify when the SPDX file was originally created. The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard. This field is distinct from the fields in Clause [12](annotations.md), which involves the addition of information during a subsequent review.

**Intent**

Here, the time stamp can serve as an indication as to whether the analysis needs to be updated.

**Metadata**

The metadata for the created field is shown in Table 10.

Table 10 — Metadata for the created field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br>* `YYYY` is year<br>* `MM` is month with leading zero<br>* `DD` is day with leading zero<br>* `T` is delimiter for time<br>* `hh` is hours with leading zero in 24 hour time<br>* `mm` is minutes with leading zero<br>* `ss` is seconds with leading zero<br>* `Z` is universal time indicator |

**Examples**

EXAMPLE 1 Tag: `Created:`

```text
Created: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:created` in class `spdx:CreationInfo`

```text
<CreationInfo>
    <created> 2010-01-29T18:30:22Z </created>
</CreationInfo>
```

## 6.10 Creator comment field <a name="6.10"></a>

**Description**

An optional field for creators of the SPDX file to provide general comments about the creation of the SPDX file or any other relevant comment not included in the other fields.

**Intent**

Here, the intent is to provide recipients of the SPDX file with comments by the creator of the SPDX file.

**Metadata**

The metadata for the Creator comment field is shown in Table 11.

Table 11 — Metadata for the Creator comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines.<br>In `tag:value` format this is delimited by `<text> .. </text>`, in RDF, it is delimited by `<rdfs:comment>`. |

**Examples**

EXAMPLE 1 Tag: `CreatorComment:`

```text
CreatorComment: <text>This SPDX file was created by a combination of using a free tool,
as indicated above, and manual analysis by several authors of the code.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:CreationInfo`

```text
<CreationInfo>
    <rdfs:comment>This SPDX file was created by a combination of using a free tool, as indicated above,
    and manual analysis by several authors of the code.</rdfs:comment>
</CreationInfo>
```

## 6.11 Document comment field <a name="6.11"></a>

**Description**

An optional field for creators of the SPDX file content to provide comments to the consumers of the SPDX document.

**Intent**

Here, the intent is to provide readers/reviewers with comments by the creator of the SPDX file about the SPDX document.

**Metadata**

The metadata for the document comment field is shown in Table 12.

Table 12 — Metadata for the document comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines. In `tag:value` format this is delimited by `<text> .. </text>`, in RDF, it is delimited by `<rdfs:comment>`. |

**Examples**

EXAMPLE 1 Tag: `DocumentComment:`

```text
DocumentComment: <text>This document was created using SPDX 2.0,
version 2.3 of the SPDX License List and refering to licenses in file MyCompany.Approved.Licenses.spdx.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `SpdxDocument`

```text
<SpdxDocument rdf:about="...">
    <rdfs:comment>
      This document was created using SPDX 2.0, version 2.3 of the SPDX License List and refering to licenses in file MyCompany.Approved.Licenses.spdx.
    </rdfs:comment>
</SpdxDocument>
```

[rdf]: https://www.w3.org/TR/2014/REC-rdf-syntax-grammar-20140225/
[rdf-schema]: https://www.w3.org/TR/2014/REC-rdf-schema-20140225/
