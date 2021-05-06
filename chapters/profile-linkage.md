# N Linkage Profile

The Linkage Profile describes relationships between components and sub-components that make up a deployment. One can envision the Linkage Profile as a textual representation of a directed graph where the vertices are individual documents describing one software and the edges are the relationships between the components described in the two vertices. This representation conveys information about the deployment's state and evolution through its supply chain.

## N.1 Motivation <a name="H.1"></a>

As the number of components and their interactions get more complex and distributed, the need for sharing information among more than one organization increases. A graph representation of the connections between each of the components in a Bill of Materials helps organization reason about the state and evolution of a received deployment, thus helping them make better decisions about the re-distribution of the deployment. This representation also allows information to be isolated to specific users. For example, the end user of a Kubernetes application need not know about the supply chain of that application but an application operator must be able to understand this information.

## N.2 Use Cases <a name="H.2"></a>

- Operating System
- Application
- Container
- Cloud Native Service

(use cases drawn here: https://github.com/SantiagoTorres/spdx-linking-mockups/tree/master/use-cases)

## N.4 Examples

Option 1:

```
{
  "specVersion": "SPDX-3.0-Draft",
  "@ID": "SPDXRef-DOCUMENT",
  "@type": "Document",
  "namespace": "https://github.com/org1/topapp/releases/tag/1.21.0",
  "externalReference": "https://github.com/org1/topapp/archive/refs/tags/topapp-1.21.0-spdx.json",
  "artifacts": [
    {
      "@ID": "SPDXRef-topapp",
      "@type": "File",
      "name": "topapp",
      "version": 1.21.0,
      "fileType": "BINARY",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "468164abcdef"
      }
    },
    {
      "@ID": "SPDXRef-dep1",
      "@type": "Package",
      "name": "Dep1",
      "version": 0.2.0,
      "externalReference": "git://github.com/org2/dep1@0.2.1",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256+base64",
        "hashValue": "ABCDEsoauh31556=="
      }
    },
    {
      "@ID": "SPDXRef-dep2",
      "@type": "Package",
      "name": "Dep2",
      "version": 1.0.1,
      "externalReference": "git://github.com/org3/dep2@1.0.1",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256+base64",
        "hashValue": "sahoduDHDUA387=="

    }
  ],
  "relationships": [
    {
      "@type": "Relationship",
      "relationshipType": "DESCRIBES",
      "from": "SPDXRef-DOCUMENT",
      "to": "SPDXRed-topapp"
    },
    {
      "@type": "Relationship",
      "relationshipType": "STATIC_LINK",
      "from": "SPDXRef-topapp",
      "to": "SPDXRed-dep1"
    },
    {
      "@type": "Relationship",
      "relationshipType": "STATIC_LINK",
      "from": "SPDXRef-topapp",
      "to": "SPDXRed-dep2"
    }
  ],
  "links": [
    {
      "@type": "Link",
      "@ID": "SPDXRef-dep1-doc",
      "externalReference": "https://github.com/org2/dep1/releases/download/0.2.1/dep1-0.2.1-spdx.json",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "0138abcdef3912578"
      },
      "relationships": [
      	{
	  "@type": "Relationship",
          "relationshipType": "DESCRIBES",
          "to": "SPDXRef-dep1"
        }
      ]
    },
    {
      "@type": "Link",
      "@ID": "SPDXRef-dep2-doc",
      "externalReference": "https://github.com/org3/dep2/releases/download/1.0.1/dep2-1.0.1-spdx.json",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "ab3481cd0385ed38075"
      },
      "relationships": [
      	{
	  "@type": "Relationship",
          "relationshipType": "DESCRIBES",
          "to": "SPDXRef-dep2"
        }
      ]
    }
  ]
}
```
Option 2:

```
{
  "specVersion": "SPDX-3.0-Draft",
  "@ID": "SPDXRef-DOCUMENT",
  "@type": "Document",
  "namespace": "https://github.com/org1/topapp/releases/tag/1.21.0",
  "externalReference": "https://github.com/org1/topapp/archive/refs/tags/topapp-1.21.0-spdx.json",
  "artifacts": [
    {
      "@ID": "SPDXRef-topapp",
      "@type": "File",
      "name": "topapp",
      "version": 1.21.0,
      "fileType": "BINARY",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "468164abcdef"
      }
    }
  ],
  "links": [
    {
      "@type": "Link",
      "@ID": "SPDXRef-dep1-link",
      "target": "git://github.com/org2/dep1@0.2.1",
      "relationship": "STATIC_LINK",
      "targetDocument": "https://github.com/org2/dep1/releases/download/0.2.1/dep1-0.2.1-spdx.json",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "0138abcdef3912578"
      }
    },
    {
      "@type": "Link",
      "@ID": "SPDXRef-dep2-link",
      "target": "git://github.com/org3/dep2@1.0.1",
      "relationship": "STATIC_LINK",
      "targetDocument": "https://github.com/org3/dep2/releases/download/1.0.1/dep2-1.0.1-spdx.json",
      "verifiedUsing": {
        "@type": "Hash",
        "algorithm": "sha256",
        "hashValue": "ab3481cd0385ed38075"
      }
    }
  ]
}
```

## N.3 Document

### N.3.1 Summary
The Linkage Profile adds constraints to the Document class from the Base profile and the "Link" class to the Base profile.

### N.3.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Document|
|SubclassOf|Element|
|Status|stable|

### N.3.3 Description
Refer to the Base profile for a description of the Document class

### N.3.4 Fields

#### N.3.4.1 Id
##### N.3.4.1.1 Summary
Id is a unique identifier for the SPDX Document.
##### N.3.4.1.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Id|
|Min Count|1|
|Max Count|1|
|Data Type|IdString|
|Format|**TBD** SPDXRef-UUID?|
|SubPropertyOf|**TBD** Element Id?|
|Status|stable|
##### N.3.4.1.3 Description
Id is a unique identifier for an SPDX document withing a document namespace.

#### N.3.4.2 Namespace
##### N.3.4.2.1 Summary
Namespace is the namespace within which the Document Id is valid.
##### N.3.4.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Namespace|
|Min Count|1|
|Max Count|1|
|Data Type|URI|
|Format|**TBD** scheme:[//authority]path/[?query]; authority=[userinfo@]host[:port]|
|SubPropertyOf|namespace|
|Status|unstable|
##### N.3.4.2.3 Description
Namespace is a URI indicating the web resource from which the document with Id can be retrieved.

#### N.3.4.3 Comment
##### N.3.4.3.1 Summary
Any comments about the SPDX Document that the supplier would like to add
##### N.3.4.3.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Comment|
|Min Count|0|
|Max Count|1|
|Data Type|String|
|Format|N/A|
|SubPropertyOf|**TBD** Element String?|
|Status|stable|
##### N.3.4.2.3 Description
Comment is a placeholder for any comments about the SPDX Document that a supplier would like to share.

#### N.3.4.4 SPDXSpecVersion
##### N.3.4.4.1 Summary
The version of the SPDX specification that the document conforms to.
##### N.3.4.4.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|SPDXSpecVersion|
|Min Count|1|
|Max Count|1|
|Data Type|SemVer|
|Format|`^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$`|
|SubPropertyOf|**TBD** Element specVersion?|
|Status|stable|
##### N.3.4.4.3 Description
SPDXSpecVersion is the SPDX specification version that the document conforms to. Tools may use this attribute to validate the document.

#### N.3.4.5 DocumentCreation
##### N.3.4.5.1 Summary
Created is the timestamp when the document was created.
##### N.3.4.5.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Created|
|Min Count|1|
|Max Count|1|
|Data Type|DateTime|
|Format|**TBD** yyyy-mm-ddThh:mm:ssZ?|
|SubPropertyOf|**TBD** Element created?|
|Status|stable|
##### N.3.4.5.3 Description
Created is the date and time when the document was created adjusted for timezone.

#### N.3.4.6 DataLicense
##### N.3.4.6.1 Summary
?
##### N.3.4.6.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|DataLicense|
|Min Count|1|
|Max Count|1|
|Data Type|String|
|Format|'CC0'|
|SubPropertyOf|**TBD** Element dataLicense?|
|Status|stable|
##### N.3.4.6.3 Description
?

## N.4 Artifact

### N.4.1 Summary
The Linkage Profile restricts the number of artifacts that are described in the SPDX document to 1. The restriction applies to all subclasses of Artifact i.e. Package, SoftwarePackage, File, and Snippet. Additional restrictions are added to each of the subclasses. Related artifacts which have their own SPDX documents can be referenced here using their local Artifact ID and their ExternalDocumentReferences

### N.4.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Artifact|
|SubclassOf|Element|
|Status|unstable|

**TBD** How to express the number of artifacts described in Document?

### N.4.3 Description
Refer to the Base profile for a description of the Artifact class

### N.4.4 Fields

#### N.4.4.1 Id
##### N.4.4.1.1 Summary
A unique identifier for Artifact
##### N.4.4.1.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Id|
|Min Count|1|
|Max Count|1|
|Data Type|DateTime|
|Format|**TBD** SPDXRef-UUID?|
|SubPropertyOf|**TBD** Element Id?|
|Status|stable|
##### N.4.4.1.3 Description
Id is a unique identifier for the described Artifact in the Document.

#### N.4.4.2 ArtifactURL
##### N.4.4.2.1 Summary
ArtifactURL is the URL of Artifact
##### N.3.4.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ArtifactURL|
|Min Count|0|
|Max Count|1|
|Data Type|URL|
|Format|**TBD** scheme:[//authority]path/[?query]; authority=[userinfo@]host[:port]|
|SubPropertyOf|N/A|
|Status|unstable|
##### N.3.4.2.3 Description
URL of Artifact. Optional if not known or part of a distributed ecosystem.

#### N.4.4.3 ExternalDocumentReference
##### N.4.4.3.1 Summary
ExternalDocumentReference the URI for the SPDX document describing Artifact. This may be the location where the SPDX document can be downloaded.
##### N.3.4.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ExternalDocumentReference|
|Min Count|1|
|Max Count|1|
|Data Type|URI|
|Format|**TBD** scheme:[//authority]path/[?query]; authority=[userinfo@]host[:port]|
|SubPropertyOf|ExternalReference|
|Status|unstable|
##### N.3.4.2.3 Description
A created SPDX document must have an ExternalDocumentReference which other SPDX documents may reference.

## N.5 ExternalMap

### N.5.1 Summary
The Linkage Profile requires one instance of the ExternalMap class from the Base Profile.

**TBD** How to describe the number of class instantiations?

### N.5.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ExternapMap|
|SubclassOf|N/A|
|Status|unstable|

### N.5.3 Description
ExternalMap describes the external document references to elements referred to in the SPDX document. The required fields are the ExternalId and VerifiedUsing.

### N.5.4 Fields

#### N.5.4.1 ExternalElementId
##### N.5.4.1.1 Summary
The Id of the external element referred to by the SPDX document. The Id must exist in the SPDX document in order to be used as an ExternalId
##### N.5.4.1.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ExternalElementId|
|Min Count|1|
|Max Count|1|
|Data Type|IdString|
|Format|**TBD** SPDXRef-UUID?|
|SubPropertyOf|**TBD** Element Id?|
|Status|stable|
##### N.5.4.1.3 Description
The ExternalId is the SPDX Id of the external element referred to by the SPDX document.

#### N.5.4.2 ExternalUrl
##### N.5.4.2.1 Summary
The URL of the external element referred to by the SPDX document.
##### N.5.4.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ExternalUri|
|Min Count|0|
|Max Count|1|
|Data Type|URL|
|Format|**TBD** scheme:[//authority]path/[?query]; authority=[userinfo@]host[:port]|
|SubPropertyOf|N/A|
|Status|unstable|
##### N.5.4.2.3 Description
The external URI determines where the external element can be downloaded.
**TBD** For cloud native, this is often not known. Hence this should be optional.

#### N.5.4.3 DefiningDocument
##### N.5.4.3.1 Summary


##### N.5.4.3.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|ExternalId|
|Min Count|1|
|Max Count|1|
|Data Type|IdString|
|Format|**TBD** SPDXRef-UUID?|
|SubPropertyOf|**TBD** Element Id?|
|Status|stable|
##### N.5.4.3.3 Description
The ExternalId is the SPDX Id of the external element referred to by the SPDX document.




## N.6 Relationship

### N.6.1 Summary
The Linkage Profile contains 1 or more Relationship classes

**TBD** How do describe the number of class instantiations?

### N.5.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|Relationship|
|SubclassOf|Element|
|Status|stable|

### N.5.3 Description
Refer to the Base profile for a description of the Relationship class

### N.5.4 Fields

#### N.5.4.1 RelationshipType
##### N.5.4.1.1 Summary
One of a list of SPDX relationship types (list types here)
##### N.5.4.1.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|RelationshipType|
|Min Count|0|
|Max Count|1|
|Data Type|RelationshipType|
|Format|restricted|
|SubPropertyOf|N/A|
|Status|stable|
##### N.5.4.1.3 Description
RelationshipType describes the type of relationship between the Document's artifact and other artifacts in its vicinity or it has interacted with.

#### N.5.4.2 From
##### N.5.4.2.1 Summary
The URI of the 
##### N.5.4.2.2 Metadata
| Attribute | Value |
| --------- | ----- |
|Name|RelationshipType|
|Min Count|0|
|Max Count|1|
|Data Type|RelationshipType|
|Format|restricted|
|SubPropertyOf|N/A|
|Status|stable|
##### N.5.4.2.3 Description
RelationshipType describes the type of relationship between the Document's artifact and other artifacts in its vicinity or it has interacted with.
