# 2 Base Profile
## 2.1 Overview
The Base Profile provides the core entities for describing artifacts and the relationships between them.

{% dot base_profile_overview.svg
      digraph G {
        node [
                fontname = "Helvetica Neue"
                fontsize = 10
                shape = "record"
        ]

        edge [
                fontname = "Helvetica Neue"
                fontsize = 10
        ]

        DocumentMetadata [href="#22-document-metadata"]
        Identity [href="#24-identity"]
        Person []
        Organization []
        Tool []
        Artifact []
        Package []
        File []
        Snippet []
        Relationship []
        Annotation []

        edge [
                arrowtail = "empty"
                dir="back"
        ]
        Identity -> Person
        Identity -> Organization
        Identity -> Tool
        Artifact -> Package
        Artifact -> File
        Artifact -> Snippet

        edge [
                arrowtail = "odiamond"
                dir="back"
        ]
        SpdxDocument -> DocumentMetadata [headlabel = "1..1"]
        SpdxDocument -> Identity [headlabel = "1..*"]
        SpdxDocument -> Artifact [headlabel = "0..*"]
        SpdxDocument -> Relationship [headlabel = "0..*"]
        SpdxDocument -> Annotation [headlabel = "0..*"]
      }
%}

<!--
### 2.1.1 Entities
| Entity | Parent | Required | Cardinality |
| ------ | ------ | -------- | ----------- |
| [Document Metadata](#document-metadata) | [Document Root](#document-root) | Yes | 1..1 |
| [Package](#package) | [Document Root](#document-root) | No | 0..* |
| [External Artifact](#external-artifact) | [Document Root](#document-root) | No | 0..* |
| [Identity](#identity) | [Document Root](#document-root) | Yes | 1..* |
| [Relationship](#relationship) | [Document Root](#document-root) | No | 0..* |
| [Annotation](#annotation) | [Document Root](#document-root) | No | 0..* |
-->

## 2.2 Document Metadata
### 2.2.1 Summary
Information about the SPDX document itself.

{% dot base_profile_document_metadata.svg
      digraph G {
        node [
                fontname = "Helvetica Neue"
                fontsize = 10
                shape = "record"
        ]

        edge [
                fontname = "Helvetica Neue"
                fontsize = 10
        ]

        DocumentMetadata [label = "{DocumentMetadata|+ spdxVersion : string\l+ dataLicense : CC0-LICENSEID\l+ SPDXID : string\l+ documentNamespace : string\l+ documentName : string\l+ created : DateTime\l+ creators : Identity[1..*]\l+ externalDocumentReferences : ExternalDocumentReference[0..*]\l|}"]
      }
%}
### 2.2.2 Metadata
| Attribute   | Value |
| ----------- | ----- |
| Required    | Yes   |
| Cardinality | 1..1  |

### 2.2.3 Description
Provides necessary information to understand the provenance of the document and to enable forward and backward compatibility for processing tools.

<!--
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [SPDX Version](#spdx-version) | Yes | 1..1 |
| [Data License](#data-license) | Yes | 1..1 |
| [SPDX Identifier](#spdx-identifier) | Yes | 1..1 |
| [SPDX Document Namespace](#spdx-document-namespace) | Yes | 1..1 |
| [Document Name](#document-name) | Yes | 1..1 |
| [Created](#created) | Yes | 1..1 |
| [Creators](#creators) | Yes | 1..1 |
-->

### 2.2.4 Examples
```yaml
documentMetadata:
  spdxVersion: SPDX-3.0
  dataLicense: CC0-1.0
  SPDXID: SPDXRef-DOCUMENT
  documentNamespace: TODO
  documentName: fictitious-component 1.0 SBOM
  created: 2019-12-19T13:44:00-0700
  creator: SPDXRef-DOCUMENT#iamwillbar
identities:
- SPDXID: iamwillbar
  person:
    name: William Bartholomew
    email: iamwillbar@github.com
```
### 2.2.5 Fields
#### 2.2.5.1 SPDX Version
##### 2.2.5.1.1 Summary
Version of the SPDX Specification that the document complies with.

##### 2.2.5.1.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `SPDX-M.N` where:<br>* `M` is major version number<br>* `N` is minor version number. |

##### 2.2.5.1.3 Description
Provide a reference number that can be used to understand how to parse and interpret the rest of the file. It will enable both future changes to the specification and to support backward compatibility. The version number consists of a major and minor version indicator. The major field will be incremented when incompatible changes between versions are made (one or more sections are created, modified or deleted). The minor field will be incremented when backwards compatible changes are made.

##### 2.2.5.1.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `spdxVersion: SPDX-3.0` |
| JSON | `"spdxVersion": "SPDX-3.0"` |
| XML | `<spdx:version>SPDX-3.0</spdx:version>` |
| Tag/Value | `SPDXVersion: SPDX-3.0` |
| RDF | `<specVersion>SPDX-3.0</specVersion>` |

#### 2.2.5.2 Data License
##### 2.2.5.2.1 Summary
License that the contents of the document is available under.

##### 2.2.5.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `CC0-1.0` |

##### 2.2.5.2.3 Description
Compliance with the SPDX specification includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata"). The SPDX specification contains numerous fields where an SPDX document creator may provide relevant explanatory text in SPDX-Metadata. Without opining on the lawfulness of "database rights" (in jurisdictions where applicable), such explanatory text is copyrightable subject matter in most Berne Convention countries. By using the SPDX specification, or any portion hereof, you hereby agree that any copyright rights (as determined by your jurisdiction) in any SPDX-Metadata, including without limitation explanatory text, shall be subject to the terms of the Creative Commons CC0 1.0 Universal license. For SPDX-Metadata not containing any copyright rights, you hereby agree and acknowledge that the SPDX-Metadata is provided to you "as-is" and without any representations or warranties of any kind concerning the SPDX-Metadata, express, implied, statutory or otherwise, including without limitation warranties of title, merchantability, fitness for a particular purpose, non-infringement, or the absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not discoverable, all to the greatest extent permissible under applicable law.

This is to alleviate any concern that content (the data or database) in an SPDX file is subject to any form of intellectual property right that could restrict the re-use of the information or the creation of another SPDX file for the same project(s). This approach avoids intellectual property and related restrictions over the SPDX file, however individuals can still contract with each other to restrict release of specific collections of SPDX files (which map to software bill of materials) and the identification of the supplier of SPDX files.

##### 2.2.5.2.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `dataLicense: CC0-1.0` |
| JSON | `"dataLicense": "CC0-1.0"` |
| XML | `<spdx:dataLicense>CC0-1.0</spdx:dataLicense>` |
| Tag/Value | `DataLicense: CC0-1.0` |
| RDF | `<dataLicense>CC0-1.0</dataLicense>` |

#### 2.2.5.3 SPDX Identifier
##### 2.2.5.3.1 Summary
Identifies the current SPDX document so that it may be referenced in [relationships](#relationship) from within the current document or from external documents. 

##### 2.2.5.3.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `SPDXRef-DOCUMENT` |

##### 2.2.5.3.3 Description
Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally. To reference another SPDX document in total, this identifier should be used with the external document identifier preceding it. See [Relationship](#relationship) for more information.

##### 2.2.5.3.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `SPDXID: SPDXRef-DOCUMENT` |
| JSON | `"SPDXID": "SPDXRef-DOCUMENT"` |
| XML | `<spdx:SPDXID>SPDXRef-DOCUMENT</spdx:SPDXID>` |
| Tag/Value | `SPDXID: SPDXRef-DOCUMENT` |
| RDF | `<SPDXID>SPDXRef-DOCUMENT</SPDXID>` |

#### 2.2.5.4 SPDX Document Namespace
##### 2.2.5.4.1 Summary
Provides an unambiguous mechanism for other SPDX documents to reference SPDX elements within this SPDX document.

##### 2.2.5.4.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | URI |
| Format | Unique absolute Uniform Resource Identifier (URI) as specified in [RFC-3986][rfc3986], with the exception of the `#` delimiter. |

##### 2.2.5.4.3 Description
The SPDX Document URI cannot contain a URI "part" (e.g. the "#" character), since the ‘#’ is used in SPDX element URIs (packages, files, snippets, etc) to separate the document namespace from the element’s SPDX identifier. Additionally, a scheme (e.g. “https:”) is required.

The URI must be unique for the SPDX document including the specific version of the SPDX document. If the SPDX document is updated, thereby creating a new version, a new URI for the updated document must be used. There can only be one URI for an SPDX document and only one SPDX document for a given URI.

The URI provides an unambiguous mechanism for other SPDX documents to reference SPDX elements within this SPDX document. See [section 2.6](#2.6) for a description on how external documents are referenced. Although it is not required, the URI can be constructed in a way which provides information on how the SPDX document can be found. For example, the URI can be a URL referencing the SPDX document itself, if it is available on the internet. A best practice for creating the URI for SPDX documents available on the public internet is `https://[CreatorWebsite]/[pathToSpdx]/[DocumentName]-[UUID]` where:

* `CreatorWebsite` is a website hosted by the creator of the document. (e.g. an SPDX document provided by SPDX would be spdx.org)
* `PathToSpdx` is a path to where SPDX documents are stored on the website (e.g. /spdx/spdxdocs)
* `DocumentName` is a name given to the SPDX Document itself, typically the (set of) package name(s) followed by the version. [(see section 2.4)](#2.4).
* `UUID` is a [universally unique identifier][URI]. The UUID could be a version 4 random UUID which can be generated from the [Online UUID Generator][uuid-gen] or a version 5 UUID generated from a sha1 checksum known to be unique for this specific SPDX document version.
* If the creator does not own their own website, a default SPDX CreatorWebsite and PathToSpdx can be used `spdx.org/spdxdocs`. Note that the SPDX documents are not currently stored or accessible on this website. The URI is only used to create a unique ID following the above conventions.

Note that the URI does not have to be accessible. It is only intended to provide a unique ID. In many cases, the URI will point to a web accessible document, but this should not be assumed to be the case.

[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[rfc3986]: https://tools.ietf.org/html/rfc3986
[uuid-gen]: https://www.uuidgenerator.net/

##### 2.2.5.4.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `documentNamespace: http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...` |
| JSON | `"documentNamespace": "http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82..."` |
| XML | `<spdx:documentNamespace>http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...</spdx:documentNamespace>` |
| Tag/Value | `DocumentNamespace: http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...` |
| RDF | `<SpdxDocument rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...">...</SpdxDocument` |

#### 2.2.5.5 Document Name
##### 2.2.5.5.1 Summary
Human friendly name for the SPDX document as designed by the creator.

##### 2.2.5.5.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string (single line) |

##### 2.2.5.5.3 Description
Provides an easier way for humans to refer to the document rather than the [SPDX Document Namespace](#spdx-document-namespace), although there are no guarantees of uniqueness.

##### 2.2.5.5.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `name: glibc-v2.3` |
| JSON | `"name": "glibc-v2.3"` |
| XML | `<spdx:name>glibc-v2.3</spdx:name>` |
| Tag/Value | `name: glibc-v2.3` |
| RDF | `<name>glibc-v2.3</name>` |

#### 2.2.5.6 Created
##### 2.2.5.6.1 Summary
When the SPDX document was originally created.

##### 2.2.5.6.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard.<br><br>`YYYY-MM-DDThh:mm:ssZ` where:<br>* `YYYY` is year<br>* `MM` is month with leading zero<br>* `DD` is day with leading zero<br>* `T` is delimiter for time<br>* `hh` is hours with leading zero in 24 hour time<br>* `mm` is minutes with leading zero<br>* `ss` is seconds with leading zero<br>* `Z` is universal time indicator |

##### 2.2.5.6.3 Description
The time stamp can serve as an indication as to whether the analysis needs to be updated.

##### 2.2.5.6.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | `created: 22010-01-29T18:30:22Z` |
| JSON | `"created": "2010-01-29T18:30:22Z"` |
| XML | `<spdx:created>2010-01-29T18:30:22Z</spdx:created>` |
| Tag/Value | `Created: 2010-01-29T18:30:22Z` |
| RDF | `<spdx:created>2010-01-29T18:30:22Z</spdx:created>` |

#### 2.2.5.7 Creators
##### 2.2.5.7.1 Summary
Who (or what, in the case of a tool) created the SPDX document.

##### 2.2.5.7.2 Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..* |
| Data Type | [Identity](#identity) |

##### 2.2.5.7.3 Description

##### 2.2.5.7.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | <pre>creators:<br>- person:<br>    name: William Bartholomew<br>    email: iamwillbar@github.com<br>- organization:<br>    name: GitHub</pre>|
| JSON | TODO |
| XML | TODO |
| Tag/Value | TODO |
| RDF | TODO |

#### 2.2.5.8 External Document References
##### 2.2.5.8.1 Summary
##### 2.2.5.8.2 Metadata
##### 2.2.5.8.3 Description
##### 2.2.5.8.4 Examples
| Format | Example |
| -------- | ------- |
| YAML | TODO|
| JSON | TODO |
| XML | TODO |
| Tag/Value | TODO |
| RDF | TODO |

## 2.3 Artifact
`Artifact` is an abstract concept that can refer to a [Package](#package), [File](#file), or [Snippet](#snippet). Any of these can be used where an `Artifact` is required.

### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

## 2.4 Package

### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

## 2.5 File

#### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |


## 2.6 Snippet

### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

## 2.7 Identity
Identity is an abstract concept that can refer to a [Person](#person), [Organization](#organization), or [Tool](#tool). Any of these can be used where an `Identity` is required.

## 2.8 Person
Represents a natural person.

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Person Name](#person-name) | Yes | 1..1 |

#### Person Name

## 2.9 Organization
Represents an organization.



## 2.10 Tool

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Tool Name](#tool-name) | Yes | 1..1 |
| [Tool Version](#tool-version) | Yes | 1..1 |

#### Tool Name
#### Tool Version

## 2.11 Relationship
Establishes a relationship between `Artifact`s either in the same SPDX document or in different SPDX documents.

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Relationship From](#relationship-from) | Yes | 1..1 |
| [Relationship To](#relationship-to) | Yes | 1..1 |
| [Relationship Type](#relationship-type) | Yes | 1..1 |

### Relationship From

### Relationship To

### Relationship Type
<!-- TODO: Is the reverse direction implied or should it be declared explicitly? -->

## 2.12 Annotation

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Annotator](#annotator) | Yes | 1..1 |
| [Annotation Date](#annotation-date) | Yes | 1..1 |
| [Annotation Type](#annotation-type) | Yes | 1..1 |
| [Annotation Comment](#annotation-comment) | Yes | 1..1 |
