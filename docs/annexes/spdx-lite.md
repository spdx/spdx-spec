# SPDX Lite (Normative)

## Explanation of the Lite profile

The Lite profile is designed to make it quick and easy to start a Software Bill of Materials
in situations where a company may have limited capacity for introducing new items into their processes.
The Lite profile captures the minimum set of information required
for license compliance in the software supply chain.
It contains information about the creation of the SBOM,
package lists with licensing and other related information,
and their relationships.

All elements in Lite profile are essential for complying with licenses.
It is easy to use a SPDX document with the Lite profile
for anyone who does not have enough knowledge about licensing information
and easy to import license information from former versions of SPDX Lite format files.
The Lite profile offers the flexibility to be used either alone
or in combination with other SPDX profiles
as a SPDX document in the software supply chain.

## Mandatory and recommended properties

The Lite profile specifies that some properties MUST be present
and some others SHOULD be present, as much as possible.

The following lists collect and present this information
for every class present in the SPDX data,
in a concise and easy-to-follow format.
The lists of properties are in alphabetical order, for easy reference.

### /Core/SpdxDocument

- Mandatory
    1. creationInfo
    1. element (may be multiple), MUST have at least one /Core/Sbom object
    1. rootElement (may be multiple), SHOULD be objects of type /Core/Sbom
    1. spdxId
- Recommended
    1. comment
    1. dataLicense
    1. name
    1. namespaceMap (may be multiple)
    1. verifiedUsing (may be multiple), SHOULD be objects of type /Core/Hash

### /Software/Sbom

- Mandatory
    1. creationInfo
    1. element (may be multiple), MUST have at least one /Software/Package object
    1. rootElement (may be multiple), SHOULD be objects of type /Software/Package
    1. spdxId
- Recommended
    1. sbomType (may be multiple)

### /Software/Package

- Mandatory
    1. copyrightText
    1. creationInfo
    1. name
    1. packageVersion
    1. spdxId
    1. suppliedBy, SHOULD be an object of type /Core/Agent
- Recommended
    1. attributionText (may be multiple)
    1. builtTime
    1. comment
    1. downloadLocation
    1. homepage
    1. originatedBy (may be multiple), SHOULD be objects of type /Core/Agent
    1. packageUrl
    1. releaseTime
    1. supportLevel (may be multiple)
    1. validUntilTime
    1. verifiedUsing (may be multiple), SHOULD be objects of type /Core/Hash

However, there MUST be at least a “downloadLocation” or “packageUrl” property.

Additionally:

1. for every /Software/Package object MUST exist exactly one /Core/Relationship object of type `hasConcludedLicense` having that element as its `from` property and an /SimpleLicensing/AnyLicenseInfo as its `to` property.
1. for every /Software/Package object MUST exist exactly one /Core/Relationship object of type `hasDeclaredLicense` having that element as its `from` property and  /SimpleLicensing/AnyLicenseInfo object as its `to` property.

### /Core/Hash

- Mandatory
    1. algorithm
    1. hashValue
- Recommended
    1. comment

### /SimpleLicensing/LicenseExpression

- Mandatory
    1. creationInfo
    1. licenseExpression
    1. spdxId
- Recommended
    1. licenseListVersion

### /SimpleLicensing/SimpleLicensingText

- Mandatory
    1. creationInfo
    1. licenseText
    1. spdxId
- Recommended
    1. comment

### /Core/Agent (createdBy, suppliedBy, originatedBy)

- Mandatory
    1. creationInfo, SHOULD be “BlankNode”
    1. name
    1. spdxId
- Recommended
    1. externalIdentifier (may be multiple)

### /Core/CreationInfo

- Mandatory
    1. created
    1. createdBy (may be multiple), SHOULD be objects of type /Core/Agent
    1. specVersion, MUST be a fixed string, “3.0.*” - where * is any supported dot version of the SPDX specification
- Recommended
    1. comment

### /Core/ExternalIdentifier

- Mandatory
    1. externalIdentifierType
    1. identifier

### /Core/NameSpaceMap

- Mandatory
    1. namespace
    1. prefix

### /Core/Relationship

- Mandatory
    1. creationInfo
    1. from
    1. relationshipType
    1. spdxId
    1. to (may be multiple)
