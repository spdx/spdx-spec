# Annex L: Compliance with regulatory frameworks

## L.1 Satisfying NTIA Minimum Elements for an SBOM using SPDX

### L.1.1 US Executive Order 14028 Minimum Elements for an SBOM

US Executive Order 14028 in conjunction with the National Telecommunications and Information Administration (NTIA) outlined minimum elements for an SBOM. The minimum elements are detailed in [NTIA's Framing Software Component Transparency: Establishing a Common Software Bill of Maternials](https://www.ntia.gov/files/ntia/publications/framingsbom_20191112.pdf) and [The Minimum Elements for a SBOM](https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf) documents and summarized below:

| SBOM Minimum Field | Description |
| ----------- | :----------- |
| Author Name | Author of the SBOM entry (this may not always be the supplier). |
| Supplier Name | Name or identity of the supplier of the component in the SBOM entry. |
| Component Name | Designation assigned to a unit of software defined by the original supplier. |
| Version String | Version used to identify a component. |
| Component Hash | A cryptographic hash to uniquely identify a component. |
| Unique Identifier | A unique identifier to help identify components or serve as a look-up key for relevant databases. |
| Relationship | Characterizing the relationship that an upstream component X is included in software Y. |
| Timestamp | Record of the date and time of the SBOM data assembly. |

### L.1.2 Mapping NTIA Minimum Elements to SPDX Fields

The SPDX Specification contains fields able to address each of the NTIA minimum required data fields.

| NTIA SBOM Minimum Field | Satisfying SPDX field |
| ----------- | :----------- |
| Author Name | (6.8) Creator |
| Supplier Name | (7.5) Package Supplier |
| Component Name | (7.1) Package Name |
| Version String | (7.3) Package Version |
| Component Hash | (7.10) Package Checksum |
| Unique Identifier | (7.2) Package SPDX Identifier <br>(6.5) SPDX Document Namespace</br> |
| Relationship | (11.1) Relationship: `CONTAINS`, `DESCRIBES` <br>The document must `DESCRIBES` at least one package.</br> |
| Timestamp | (6.9) Created |

## L.2 Satisfying 2026 CISA Minimum Elements for an SBOM using SPDX

### L.2.1 2026 Minimum Elements for a Software Bill of Materials (SBOM)

In July 2026, the U.S. Cybersecurity and Infrastructure Security Agency (CISA), in partnership with international co-authoring organizations, published the "[2026 Minimum Elements for a Software Bill of Materials (SBOM)](https://www.cisa.gov/sites/default/files/2026-07/2026_cisa_sbom_minimum_elements_508c.pdf)" document.
This document "updates and replaces the [Minimum Elements for a Software Bill of Materials published by the National Telecommunications and Information Administration (NTIA)](https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf)".

The Minimum Elements are summarized below:

| SBOM Metatdata Minimum Field | Description  |
| ---------------------------- | :----------- |
| SBOM Author                  | The name of the entity that creates the SBOM data for the target component. |
| SBOM Author signature        | A digital signature attributable to the SBOM author. |
| SBOM Data Format Name        | The name of the data format used to represent the SBOM data. |
| SBOM Data Format Version     | Identifier designated by the SBOM data format to specify the version of the data format. |
| SBOM Generation Context      | The relative software lifecycle phase and data available at the time the SBOM author generated the SBOM. |
| SBOM Timestamp               | Record of the date and time of the most recent update to the SBOM data. |
| SBOM Tool Name               | The name of the tool used by the SBOM author to generate or amend the SBOM. |
| SBOM Tool Version            | Identifier for the version of the tool identified in the SBOM Tool Name element. |
| SBOM Version                 | Identifier designated by the SBOM author to specify a change in the SBOM document from a previously identified version or to indicate that it is the first version. |

| Component Data Minimum Field      | Description  |
| --------------------------------- | :----------- |
| Component Producer                | The name of an entity that creates, defines, and identifies components. |
| Component Dependency Relationship | The relationship between two components, where one component is necessary for the operation of the other. |
| Component Hash Value              | The output generated from applying a cryptographic hash algorithm to an executable component artifact. |
| Component Hash Algorithm          | The cryptographic algorithm used to compute the Component Hash Value of the software component. |
| Component Identifiers             | Identifiers used to identify a component or serve as a look-up key for relevant databases. |
| Component License                 | The identifier(s) for the license(s) under which the software component is available. |
| Component Name                    | The name assigned by the component producer to a software component. |
| Component Version                 | Identifier used by the component producer to specify a change in a software component from a previously identified version or to indicate that it is the first version. |

### L.2.2 Mapping 2026 CISA Minimum Elements to SPDX Fields

The SPDX Specification contains fields able to address some of the 2026 CISA minimum required data fields.

| SBOM Metatdata Minimum Field | Satisfying SPDX field |
| ---------------------------- | :-------------------- |
| SBOM Author                  | (6.8) Creator |
| SBOM Author signature        | _(see note below)_ |
| SBOM Data Format Name        | (6.1) SPDX version |
| SBOM Data Format Version     | (6.1) SPDX version |
| SBOM Generation Context      | (6.10) Creator Comment |
| SBOM Timestamp               | (6.9) Created |
| SBOM Tool Name               | (6.8) Creator, Tool entry |
| SBOM Tool Version            | (6.8) Creator, Tool entry |
| SBOM Version                 | (6.5) SPDX Document Namespace |

Notes:

* There is no field in SPDX 2.3.1 to represent the SBOM Author signature inside the SBOM. It should be put in an external document.
* The “Creator Comment” should contain the “SBOM Generation Context” using one of the six keywords “Design,” “Source,” “Build,” “Analyzed,” “Deployed,” “Runtime” as defined in CISA document [Types of Software Bill of Material (SBOM) Documents](https://www.cisa.gov/sites/default/files/2023-04/sbom-types-document-508c.pdf).
* The “Tool Name” and the “Tool Version” are in the same field; they should be separated by a “-” (see section 6.8.1).
* The “SPDX Document Namespace” is the best approximation for the “SBOM Version”.

| Component Data Minimum Field      | Satisfying SPDX field |
| --------------------------------- | :-------------------- |
| Component Producer                | (7.6) Package Originator |
| Component Dependency Relationship | (11.1) Relationship: `DEPENDS_ON` |
| Component Hash Value              | (7.10) Package Checksum (checksums[].checksumValue) |
| Component Hash Algorithm          | (7.10) Package Checksum (checksums[].algorithm) |
| Component Identifiers             | (7.21) External reference: PACKAGE-MANAGER for PURL (Package-URL); OTHER for SWID/gitoid |
| Component License                 | (7.13) Concluded License or (7.15) Declared License |
| Component Name                    | (7.1) Package Name |
| Component Version                 | (7.1) Package Version |

Notes:

* The “Component License” can be represented either by “Concluded License” or “Declared License”. At least one of these fields must be different from NOASSERTION.
