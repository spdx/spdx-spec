
# License Profile (proposals to additional tag which correspond to Usage Profile)

## Overview

While required license conditions or any requirements for software packages are changed dynamically, such as in each development phase transition or in the final product shipment to the public, software package supplyer need to tell its consumers detail conditions to be obey.
Especially in the large scale development which operated via multi layer software supply chain through upstream to downstream, community to industorial company, license conditions must be carried through upstream side to downstream side along with the software package through such multi layer supply chain.

On the other hand, each software package are used as in consumer's own will and purpose under the license condition. Even though the software package supplyer able to notice detail usage and condition just their own prerequisite assumption.

With this profile, software package supplyer able to describe detail license conditions or any requirements to use software package along with its prerequisite assumptions of the detail descriptions. And also it's able to focus those information in the SPDX for specific usage of specific downstream consumer with mention the prerequisite product and the expiration date. 

### Entities
| Entity | Parent | Required | Cardinality |
| ------ | ------ | -------- | ----------- |
| [Prerequisite Product Information](usage-profile.md#prerequisite-product-information) | [Artifact](2-base-profile.md#artifact) ([Package](2-base-profile.md#package), [File](2-base-profile.md#file), [Snippet](2-base-profile.md#snippet)) | Yes | 1..1 |
| [License Constraint With Prerequisite Product](#license-constraint-with-prerequisite-product) | [Prerequisite Product Information](usage-profile.md#prerequisite-product-information) | No | 0..* |
| [Expiration Condition Of Usage Information](usage-profile.md#expiration-condition-of-usage-information) |  [Prerequisite Product Information](usage-profile.md#prerequisite-product-information) | No | 0..* |



## License Constraint With Prerequisite Product

Parent: Prerequisite Product Information, or External Artifact

### Fields
| Field | Required | Cardinality |
| ----- | -------- | ----------- |
| [License Compatibility For Prerequisite Product](#license-compatibility-for-prerequisite-product) | No | 0..* |
| [Acceptable Condition](#acceptable-condition) | No | 0..* |
| [Acceptable Artifact Inventory Deadline](#acceptable-artifact-inventory-deadline ) | No | 0..* |


### License Compatibility For Prerequisite Product

#### Purpose

Identify the compatibility of the license of the artifact compatible to the prerequisite product.

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `<SPDX License Expression>` \| ["DocumentRef-"`[idstring]`":"`[SPDXID]`] \| `NONE` \| `NOASSERTION` |

where:

`<SPDX License Expression>` is a valid SPDX License Expression
as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX
document as described in [section 2.6](2-document-creation-information.md#2.6)
`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`

`[NONE]`, if the file contains no target product information whatsoever; or

`[NOASSERTION]`, if:

(i) the SPDX file creator has made no attempt to determine this field; or

(ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

<br>



#### Intent

To describe license compatibility with the prerequisite product when it used in the public or the market. 
Especially the artifact had multiple license, it able to use identify the specific license to be apply when the artifact combined with the prerequisite product.

#### Tag: `LicenseCompatibilityForPrerequisiteProduct:`

### Acceptable Condition 

Parent: Prerequisite Product Information, or External Artifact

#### Purpose

Identify the acceptable usage or acceptable license condition on the prerequisite product development.

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Single line of text. |

#### Intent

To describe any notice correspond to usage of Artifact, especially license compatibility, conditions to ovey license terms and/or usage limitations under the conditions for development of prerequisite product.

In the case of description of license compatibility which depend on development phase of the prerequisite product development, it able to identfy with this field mentioned as "verification", "evaluation", etc.

In other case, it use to describe specific notation such as some sort of advertizing closure correspond to Prerequsite Product. 

#### Tag: `AcceptableCondition:`


Examples:

```text
AcceptableCondition: <text>evaluation | coding | verificatoin</text>
AcceptableCondition: <text>Concluded License of this software package had Advirtizing Closure, and it must obey on the Final Products</text>
```


### Acceptable Artifact Inventory Deadline

#### Purpose

Identify the inventory deadline when the license/condition of the artifact is acceptable on the specific development phase.

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Single line of text.  |


#### Intent

To describe final deadline to eliminate the artifact from the prerequisite product development environment, such as "Review for the mass production", "Preparation of final product build-up", "YYYY-MM-DDThh:mm:ssZ", etc.

#### Tag: `AcceptableArtifactInventoryDeadLine:`

```text
AcceptableArtifactInventoryDeadline: <text>This software must use for software verification only due to license condition of [Prerequisite Product]</text>
```

