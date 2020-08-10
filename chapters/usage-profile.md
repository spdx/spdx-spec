# 4 Usage Profile

## Overview

While required license conditions or any requirements for software packages are changed dynamically, such as in each development phase transition or in the final product shipment to the public, software package supplyer need to tell its consumers detail conditions to be obey.
Especially in the large scale development which operated via multi layer software supply chain through upstream to downstream, community to industorial company, license conditions must be carried through upstream side to downstream side along with the software package through such multi layer supply chain.

On the other hand, each software package are used as in consumer's own will and purpose under the license condition. Even though the software package supplyer able to notice detail usage and condition just their own prerequisite assumption.

With this profile, software package supplyer able to describe detail license conditions or any requirements to use software package along with its prerequisite assumptions of the detail descriptions. And also it's able to focus those information in the SPDX for specific usage of specific downstream consumer with mention the prerequisite product and the expiration date. 

### Entities
| Entity | Parent | Required | Cardinality |
| ------ | ------ | -------- | ----------- |
| [Prerequisite Product Information](#prerequisite-product-information) | [Artifact](2-base-profile.md#artifact) ([Package](2-base-profile.md#package), [File](2-base-profile.md#file), [Snippet](2-base-profile.md#snippet)) | Yes | 1..1 |
| [License Constraint With Prerequisite Product](licensing-profile_usage-profile.md#license-constraint-with-prerequisite-product) | [Prerequisite Product Information](#prerequisite-product-information) | No | 0..* |
| [Expiration Condition Of Usage Information](#expiration-condition-of-usage-information) |  [Prerequisite Product Information](#prerequisite-product-information) | No | 0..* |

## Prerequisite Product Information

Parent: Package, File, Snippet, or External Artifact

Cardinality: upto 1 per Artifact

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Prerequisite Product Name](#prerequisite-product-name) | No | 0..1 |
| [Prerequisite Product Identifier](#prerequisite-product-identifier) | Yes | 1..1 |
| [Prerequisite Product Version](#prerequisite-product-version) | No | 0..* |

### Prerequisite Product Name
#### Purpose

Identify the name of the target product that used as the prerequisite for license compatibility assumption. The metadata for the Product Name field is shown in Table 4.1.

Table 4.1 — Metadata for the product information field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text. |

<br>

#### Intent

Describe target product to be identified with this "usage profile" to manage Lisence Information of the artifact to be integrated. 

#### Tag: `PrerequisiteProductName:`

Examples:

```text
ProductName: <text>ABC COMPANYs Product to be Launched at 20YYMM-TBD</text>
```


### Prerequisite Product Identifier
#### Purpose

Identify the target product even if the name of product not determined yet.

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | One |
| Format | ["DocumentRef-"`[idstring]`":"`[SPDXID]`] \| `NONE` \| `NOASSERTION` |

where:

"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX
document as described in [section 2.6](2-document-creation-information.md#2.6)
`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`

`[NONE]`, if the file contains no target product information whatsoever; or

`[NOASSERTION]`, if:

(i) the SPDX file creator has made no attempt to determine this field; or
(ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

<br>

#### Intent

Describe target product to be identified with this "usage profile" to manage Lisence Information of the artifact to be integrated. 
Even if the name of the prerequisite product is not defined yet, or being changed in later phase, to be used as to trace this "usage profile" description through the history.

#### Tag: `PrerequisiteProductIdentifier:`

Examples:

```text
PrerequisiteProductIdentifier: DocumentRef-spdx-tool-1.2:SPDXRef-5
```

### Prerequisite Product Version

#### Purpose

Identify the version of the target product.


| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Single line of text. |

#### Intent

To describe license compatibility with the prerequisite product when it depend on the specific revision. 

#### Tag: `PrerequisiteProductVersion:`

## Expiration Condition Of Usage Information

Parent: Prerequisite Product Information, or External Artifact

#### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [Expiration Date Of Usage Information](#expiration-date-of-usage-information) | No | 0..1 |
| [Usage Information Are Valid For](#usage-information-are-valid-for) | No | 0..1 |


### Expiration Date Of Usage Information

#### Purpose

Identify the period of the usage information is in effect.

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | `[Date]`  |

#### Tag: `ExpirationDateOfUsageInformation:`



### Usage Information Are Valid For

#### Purpose

Identify conditions of usage information is in effect.

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Single line of text. |

#### Tag: `UsageInformationAreValidFor:`

```text
UsageInformationAreValidFor: <text>This license compatibility descriptions are valid only when this software package combind with [Prerequisite Product]</text>
```
