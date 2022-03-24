# 6 SPDX document creation information section

## 6.1 SPDX version field <a name="6.1"></a>

### 6.1.1 Description

Provide a reference number that can be used to understand how to parse and interpret the rest of the file. It will enable both future changes to the specification and to support backward compatibility. The version number consists of a major and minor version indicator. The major field shall be incremented when incompatible changes between versions are made (one or more sections are created, modified or deleted). The minor field shall be incremented when backwards compatible changes are made. The metadata for the SPDX version field is shown in Table 2.

**Table 2 — Metadata for the SPDX version field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `SPDX-M.N` where:<br><ul><li>`M` is major version number</li><li>`N` is minor version number.</li></ul> |

### 6.1.2 Intent

Here, parties exchanging information in accordance with the SPDX specification need to provide 100% transparency as to which SPDX specification version such information is conforming to.

### 6.1.3 Examples

EXAMPLE 1 Tag: `SPDXVersion:`

```text
SPDXVersion: SPDX-2.2
```

EXAMPLE 2 RDF: Property spdx:specVersion in class spdx:SpdxDocument

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

### 6.2.1 Description

Compliance with this document includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata"). This document contains numerous fields where an SPDX document creator may provide relevant explanatory text in SPDX-Metadata.
Without opining on the lawfulness of "database rights" (in jurisdictions where applicable), such explanatory text is copyrightable subject matter in most Berne Convention countries.
By using the SPDX specification, or any portion hereof, you hereby agree that any copyright rights (as determined by your jurisdiction) in any SPDX-Metadata, including without limitation explanatory text, shall be subject to the terms of the Creative Commons CC0 1.0 Universal license. For SPDX-Metadata not containing any copyright rights, you hereby agree and acknowledge that the SPDX-Metadata is provided to you “as-is” and without any representations or warranties of any kind concerning the SPDX-Metadata, express, implied, statutory or otherwise, including without limitation warranties of title, merchantability, fitness for a particular purpose, non-infringement, or the absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not discoverable, all to the greatest extent permissible under applicable law.
The metadata for the data license field is shown in Table 3.

**Table 3 — Metadata for the data license field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `CC0-1.0` |

### 6.2.2 Intent

This is to alleviate any concern that content (the data or database) in an SPDX document is subject to any form of intellectual property right that could restrict the re-use of the information or the creation of another SPDX document for the same project(s). This approach avoids intellectual property and related restrictions over the SPDX document, however individuals can still contract with each other to restrict release of specific collections of SPDX documents (which map to software bill of materials) and the identification of the supplier of SPDX documents.

### 6.2.3 Examples

EXAMPLE 1 Tag: `DataLicense:`

```text
DataLicense: CC0-1.0
```

EXAMPLE 2 RDF: Property spdx:dataLicense in class spdx:SpdxDocument

```text
<SpdxDocument rdf:about="...">
  <dataLicense rdf:resource="http://spdx.org/licenses/CC0-1.0" />
</SpdxDocument>
```

## 6.3 SPDX identifier field <a name="6.3"></a>

### 6.3.1 Description

Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally. To reference another SPDX document in total, this identifier should be used with the external document identifier preceding it. See [Clause 11](relationships-between-SPDX-elements.md) for examples. The metadata for the SPDX identifier field is shown in Table 4.

**Table 4 — Metadata for SPDX identifier field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `SPDXRef-DOCUMENT` |

### 6.3.2 Intent

Provide a way for the document to refer to itself in relationship to other elements.

### 6.3.3 Examples

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

### 6.4.1 Description

Identify name of this document as designated by creator. The metadata for the document name field is shown in Table 5.

**Table 5 — Metadata for the document name field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Single line of text. |

### 6.4.2 Intent

Here, the name of each document is an important convention and easier to refer to than the URI.

### 6.4.3 Examples

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

### 6.5.1 Description

Provide an SPDX document-specific namespace as a unique absolute [Uniform Resource Identifier][URI] (URI) as specified in [RFC-3986][rfc3986], with the exception of the ‘#’ delimiter. The SPDX document URI shall not contain a URI "part" (e.g. the "#" character), since the ‘#’ is used in SPDX element URIs (packages, files, snippets, etc) to separate the document namespace from the element’s SPDX identifier. Additionally, a scheme (e.g. “https:”) is required.

The URI shall be unique for the SPDX document including the specific version of the SPDX document. If the SPDX document is updated, thereby creating a new version, a new URI for the updated document shall be used. There may only be one URI for an SPDX document and only one SPDX document for a given URI. The metadata for the SPDX document namespace field is shown in Table 6.

**Table 6 — Metadata for the SPDX document namespace field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Unique absolute Uniform Resource Identifier (URI) as specified in [RFC-3986](https://tools.ietf.org/html/rfc3986), with the following exceptions:<br><br>The SPDX document URI cannot contain a URI "part" (e.g., the `#` delimiter), since the `#` is used to uniquely identify SPDX element identifiers. The URI shall contain a scheme (e.g., `https:`).<br><br>The URI shall be unique for the SPDX document including the specific version of the SPDX document. If the SPDX document is updated, thereby creating a new version, a new URI for the updated document shall be used. There can only be one URI for an SPDX document and only one SPDX document for a given URI. |

### 6.5.2 Intent

The URI provides an unambiguous mechanism for other SPDX documents to reference SPDX elements within this SPDX document. See [6.6](#6.6) for a description on how external documents are referenced. Although it is not required, the URI can be constructed in a way which provides information on how the SPDX document can be found. For example, the URI can be a URL referencing the SPDX document itself, if it is available on the internet. A best practice for creating the URI for SPDX documents available on the public internet is `http://[CreatorWebsite]/[pathToSpdx]/[DocumentName]-[UUID]` where:

* `CreatorWebsite` is a website hosted by the creator of the document. (e.g. an SPDX document provided by SPDX would be spdx.org)
* `PathToSpdx` is a path to where SPDX documents are stored on the website (e.g. /spdx/spdxdocs)
* `DocumentName` is a name given to the SPDX document itself, typically the (set of) package name(s) followed by the version. (See [6.4](#6.4).)
* `UUID` is a [universally unique identifier][UUID]. The UUID could be a version 4 random UUID which can be generated from the [Online UUID Generator][uuid-gen] or a version 5 UUID generated from a sha1 checksum known to be unique for this specific SPDX document version.
* If the creator does not own their own website, a default SPDX CreatorWebsite and PathToSpdx can be used `spdx.org/spdxdocs`. Note that the SPDX documents are not currently stored or accessible on this website. The URI is only used to create a unique ID following the above conventions.

NOTE: The URI does not have to be accessible. It is only intended to provide a unique ID. In many cases, the URI will point to a Web accessible document, but this should not be assumed to be the case.

[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier
[rfc3986]: https://tools.ietf.org/html/rfc3986
[uuid-gen]: https://www.uuidgenerator.net/

### 6.5.3 Examples

EXAMPLE 1 Tag: `DocumentNamespace:`

```text
DocumentNamespace: http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...
```

EXAMPLE 2 RDF: The unique ID is the URI for the SPDX document

```text
<SpdxDocument rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...">
    <rdfs:comment>This document was created using SPDX 2.0 using
    licenses from the web site.</rdfs:comment>
</SpdxDocument>
```

This specification uses the prefix `rdfs:` to refer to the [RDF Schema][rdf-schema] namespace:

```text
http://www.w3.org/2000/01/rdf-schema#
```

## 6.6 External document references field <a name="6.6"></a>

### 6.6.1 Description

Identify any external SPDX documents referenced within this SPDX document. The metadata for the external document references field is shown in Table 7.

**Table 7 — Metadata for the external document references field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..* |
| Format | DocumentRef-`[idstring]` `[SPDX document URI]` `[Checksum]`<br>where<br>`[idstring]` is a unique string containing letters, numbers, `.`, `-` and/or `+`.<br>`[SPDX document URI]` is the unique ID for the external document as defined in [6.5](#6.5) of that referenced document,<br>`[Checksum]` is a checksum of the external document following the checksum format defined in [8.4](file-information.md#8.4). |

### 6.6.2 Intent

SPDX elements within this document may be related to other SPDX elements referenced from external SPDX documents. An SPDX element could be a snippet, file, package, license reference or SPDX document.

### 6.6.3 Examples

EXAMPLE 1 Tag: `ExternalDocumentRef:`

```text
ExternalDocumentRef:DocumentRef-spdx-tool-1.2 http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82C3301 SHA1: d6a770ba38583ed4bb4525bd96e50461655d2759
```

EXAMPLE 2 RDF: Property `spdx:externalDocumentRef` in class `spdx:SpdxDocument range ExternalDocumentRef`.

The ExternalDocumentRef contains two properties:

* spdxDocument - the SpdxDocument being referenced
* checksum - the checksum of the referenced SPDX document

```text
<SpdxDocument rdf:about="...">
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
</SpdxDocument>
```

NOTE: In RDF, a namespace can be created for the external document reference if a short form name for the external reference is desired.

## 6.7 License list version field <a name="6.7"></a>

### 6.7.1 Description

An optional field for creators of the SPDX document to provide the version of the SPDX License List used when the SPDX document was created. The metadata for the license list version field is shown in Table 8.

**Table 8 — Metadata for the license list version field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | `M.N`<br>where:<br>`M` is major version number<br>`N` is minor version number. |

### 6.7.2 Intent

Recognizing that licenses are added to the SPDX License List with each subsequent version, the intent is to provide recipients of the SPDX document with the version of the SPDX License List used. This anticipates that in the future, an SPDX document might have used a version of the SPDX License List that is older than the then current one.

### 6.7.3 Examples

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

### 6.8.1 Description

Identify who (or what, in the case of a tool) created the SPDX document. If the SPDX document was created by an individual, indicate the person's name. If the SPDX document was created on behalf of a company or organization, indicate the entity name. If the SPDX document was created using a software tool, indicate the name and version for that tool. If multiple participants or tools were involved, use multiple instances of this field. Person name or organization name may be designated as “anonymous” if appropriate. The metadata for the creator field is shown in Table 9.

**Table 9 — Metadata for the creator field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..* |
| Format | Single line of text with the following keywords:<br>`"Person: person name" and optional "(email)"`<br>`"Organization: organization" and optional "(email)"`<br>`"Tool: toolidentifier-version"` |

### 6.8.2 Intent

Here, the generation method will assist the recipient of the SPDX document in assessing the general reliability/accuracy of the analysis information.

### 6.8.3 Examples

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

### 6.9.1 Description

Identify when the SPDX document was originally created. The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard. This field is distinct from the fields in Clause [12](annotations.md), which involves the addition of information during a subsequent review. The metadata for the created field is shown in Table 10.

**Table 10 — Metadata for the created field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24-hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |

### 6.9.2 Intent

Here, the time stamp can serve as an indication as to whether the analysis needs to be updated.

### 6.9.3 Examples

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

### 6.10.1 Description

An optional field for creators of the SPDX document to provide general comments about the creation of the SPDX document or any other relevant comment not included in the other fields. The metadata for the Creator comment field is shown in Table 11.

**Table 11 — Metadata for the Creator comment field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines.<br>In `tag:value` format this is delimited by `<text> .. </text>`, in RDF, it is delimited by `<rdfs:comment>`. |

### 6.10.2 Intent

Here, the intent is to provide recipients of the SPDX document with comments by the creator of the SPDX document.

### 6.10.3 Examples

EXAMPLE 1 Tag: `CreatorComment:`

```text
CreatorComment: <text>This SPDX document was created by a combination of
using a free tool, as indicated above, and manual analysis by several
authors of the code.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:CreationInfo`

```text
<CreationInfo>
    <rdfs:comment>This SPDX document was created by a combination of 
    using a free tool, as indicated above, and manual analysis 
    by several authors of the code.</rdfs:comment>
</CreationInfo>
```

## 6.11 Document comment field <a name="6.11"></a>

### 6.11.1 Description

An optional field for creators of the SPDX document content to provide comments to the consumers of the SPDX document. The metadata for the document comment field is shown in Table 12.

**Table 12 — Metadata for the document comment field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines. In `tag:value` format this is delimited by `<text> .. </text>`, in RDF, it is delimited by `<rdfs:comment>`. |

### 6.11.2 Intent

Here, the intent is to provide readers/reviewers with comments by the creator of the SPDX document about the SPDX document.

### 6.11.3 Examples

EXAMPLE 1 Tag: `DocumentComment:`

```text
DocumentComment: <text>This document was created using SPDX 2.0,
version 2.3 of the SPDX License List and refering to licenses
in file MyCompany.Approved.Licenses.spdx.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `SpdxDocument`

```text
<SpdxDocument rdf:about="...">
    <rdfs:comment>
      This document was created using SPDX 2.0, version 2.3 of the SPDX
      License List and refering to licenses in file
      MyCompany.Approved.Licenses.spdx.
    </rdfs:comment>
</SpdxDocument>
```

[rdf]: https://www.w3.org/TR/2014/REC-rdf-syntax-grammar-20140225/
[rdf-schema]: https://www.w3.org/TR/2014/REC-rdf-schema-20140225/
