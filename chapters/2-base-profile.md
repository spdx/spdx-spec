# 2 Base Profile
The Base Profile provides the core functionality for describing artifacts and the relationships between them.

## 2.1 Overview

### Entities
| Entity | Parent | Required | Cardinality |
| ------ | ------ | -------- | ----------- |
| [Document Root](#document-root) | N/A | Yes | 1..1 |
| [Document Metadata](#document-metadata) | [Document Root](#document-root) | Yes | 1..1 |
| [Package](#package) | [Document Root](#document-root) | No | 0..* |
| [External Artifact](#external-artifact) | [Document Root](#document-root) | No | 0..* |
| [Identity](#identity) | [Document Root](#document-root) | Yes | 1..* |
| [Relationship](#relationship) | [Document Root](#document-root) | No | 0..* |
| [Annotation](#annotation) | [Document Root](#document-root) | No | 0..* |

## 2.2 Document Root
Some of the supported formats require the document to have a root entity.

### Examples
| Format | Example |
| -------- | ------- |
| YAML | N/A |
| JSON | N/A |
| XML | `TODO` |
| Tag/Value | N/A |
| RDF | `TODO` |

## 2.3 Document Metadata
Information about the SPDX document itself.

Provides necessary information to understand the provenance of the document and to enable forward and backward compatibility for processing tools.

### Metadata
| Attribute   | Value |
| ----------- | ----- |
| Required    | Yes   |
| Cardinality | 1..1  |

### Examples
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

### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [SPDX Version](#spdx-version) | Yes | 1..1 |
| [Data License](#data-license) | Yes | 1..1 |
| [SPDX Identifier](#spdx-identifier) | Yes | 1..1 |
| [SPDX Document Namespace](#spdx-document-namespace) | Yes | 1..1 |
| [Document Name](#document-name) | Yes | 1..1 |
| [Created](#created) | Yes | 1..1 |
| [Creators](#creators) | Yes | 1..1 |

#### SPDX Version
Version of the SPDX Specification that the document complies with.

Enables tools and humans to understand how to process the document and to support backward and forward compatibility.

The version number consists of a major and a minor portion. The major portion will be incremented when incompatible changes are made to the specification, and the minor field will be incremented when backwards compatible changes are made.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `SPDX-M.N` where:<br>* `M` is major version number<br>* `N` is minor version number. |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | `spdxVersion: SPDX-3.0` |
| JSON | `"spdxVersion": "SPDX-3.0"` |
| XML | `<spdx:version>SPDX-3.0</spdx:version>` |
| Tag/Value | `SPDXVersion: SPDX-3.0` |
| RDF | `<specVersion>SPDX-3.0</specVersion>` |

#### Data License
License that the contents of the document is available under.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `CC0-1.0` |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | `dataLicense: CC0-1.0` |
| JSON | `"dataLicense": "CC0-1.0"` |
| XML | `<spdx:dataLicense>CC0-1.0</spdx:dataLicense>` |
| Tag/Value | `DataLicense: CC0-1.0` |
| RDF | `<dataLicense>CC0-1.0</dataLicense>` |

#### SPDX Identifier
Identifies the current SPDX document so that it may be referenced in relationships from within the current document or from external documents. 

See [Relationship](#relationship) for more information.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | `SPDXRef-DOCUMENT` |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | `SPDXID: SPDXRef-DOCUMENT` |
| JSON | `"SPDXID": "SPDXRef-DOCUMENT"` |
| XML | `<spdx:SPDXID>SPDXRef-DOCUMENT</spdx:SPDXID>` |
| Tag/Value | `SPDXID: SPDXRef-DOCUMENT` |
| RDF | `<SPDXID>SPDXRef-DOCUMENT</SPDXID>` |

#### SPDX Document Namespace

#### Document Name
Human friendly name for the SPDX document as designed by the creator.

Provides an easier way for humans to refer to the document rather than the [SPDX Document Namespace](#spdx-document-namespace), although there are no guarantees of uniqueness.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | `name: glibc-v2.3` |
| JSON | `"name": "glibc-v2.3"` |
| XML | `<spdx:name>glibc-v2.3</spdx:name>` |
| Tag/Value | `name: glibc-v2.3` |
| RDF | `<name>glibc-v2.3</name>` |

### Created
When the SPDX document was originally created.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Data Type | string |
| Format | The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard.<br><br>`YYYY-MM-DDThh:mm:ssZ` where:<br>* `YYYY` is year<br>* `MM` is month with leading zero<br>* `DD` is day with leading zero<br>* `T` is delimiter for time<br>* `hh` is hours with leading zero in 24 hour time<br>* `mm` is minutes with leading zero<br>* `ss` is seconds with leading zero<br>* `Z` is universal time indicator |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | `created: 2019-12-19T14:34:00Z` |
| JSON | `"name": "2019-12-19T14:34:00Z"` |
| XML | `<spdx:created>2019-12-19T14:34:00Z</spdx:created>` |
| Tag/Value | `created: 2019-12-19T14:34:00Z` |
| RDF | `<created>2019-12-19T14:34:00Z</created>` |

### Creators
Who (or what, in the case of a tool) created the SPDX document.

##### Metadata
| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..* |
| Data Type | [Identity](#identity) |

##### Examples
| Format | Example |
| -------- | ------- |
| YAML | <pre>creators:<br>- person:<br>    name: William Bartholomew<br>    email: iamwillbar@github.com<br>- organization:<br>    name: GitHub</pre>|
| JSON | TODO |
| XML | TODO |
| Tag/Value | TODO |
| RDF | TODO |

## 2.4 Artifact
`Artifact` is an abstract concept that can refer to a [Package](#package), [File](#file), or [Snippet](#snippet). Any of these can be used where an `Artifact` is required.

### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

### Package

#### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

### File

#### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |


### Snippet

#### Fields

| Field | Required | Cardinality |
| ----- | -------- | ----------- |

## 2.5 Identity
Identity is an abstract concept that can refer to a [Person](#person), [Organization](#organization), or [Tool](#tool). Any of these can be used where an `Identity` is required.

### Person
Represents a natural person.

#### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Person Name](#person-name) | Yes | 1..1 |

##### Person Name

### Organization
Represents an organization.



### Tool

#### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Tool Name](#tool-name) | Yes | 1..1 |
| [Tool Version](#tool-version) | Yes | 1..1 |

##### Tool Name
##### Tool Version

## 2.6 Relationship
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

## 2.7 Annotation

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Annotator](#annotator) | Yes | 1..1 |
| [Annotation Date](#annotation-date) | Yes | 1..1 |
| [Annotation Type](#annotation-type) | Yes | 1..1 |
| [Annotation Comment](#annotation-comment) | Yes | 1..1 |
