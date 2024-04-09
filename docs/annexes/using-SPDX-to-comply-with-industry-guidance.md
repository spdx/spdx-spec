# 1. Satisfying NTIA Minimum Elements for an SBOM using SPDX

US Executive Order 14028 in conjunction with the National Telecommunications and Information Administration (NTIA) outlined minimum elements for an SBOM. The minimum elements are detailed in [NTIA's Framing Software Component Transparency: Establishing a Common Software Bill of Maternials](https://www.ntia.gov/files/ntia/publications/framingsbom_20191112.pdf) and [The Minimum Elements for a SBOM](https://www.ntia.doc.gov/files/ntia/publications/sbom_minimum_elements_report.pdf) documents and summarized below:

| SBOM Minimum Field | Description |
| ----------- | :----------- |
| Author Name | Author of the SBOM entry (this may not always be the supplier). |
| Supplier Name  | Name or identity of the supplier of the component in the SBOM entry. |
| Component Name | Designation assigned to a unit of software defined by the original supplier. |
| Version String | Version used to identify a component. |
| Component Hash | A cryptographic hash to uniquely identify a component. |
| Unique Identifier | A unique identifier to help identify components or serve as a look-up key for relevant databases. |
| Relationship | Characterizing the relationship that an upstream component X is included in software Y. |
| Timestamp | Record of the date and time of the SBOM data assembly. |


The SPDX Specification contains fields able to address each of the NTIA minimum required data fields.

| NTIA SBOM Minimum Field | Satisfying SPDX field model location |
| ----------- | :----------- |
| Author Name | [Core/Classes/CreationInfo.createdBy](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/CreationInfo/) |
| Supplier Name | [Core/Classes/Artifact.suppliedBy ](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Artifact/) |
| Component Name | [Software/Classes/Package.name](https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/Package/) |
| Version String | [Software/Classes/Package.packageVersion](https://spdx.github.io/spdx-spec/v3.0/model/Software/Classes/Package/) |
| Component Hash | [Core/Classes/Hash](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Hash/) |
| Unique Identifier | [Core/Properties/spdxId](https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/spdxId/) for SPDX Elements <br>or [Core/Classes/ExternalIdentifier](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/ExternalIdentifier/) for resources outside the scope of SPDX-3.0 content </br> |
| Relationship | [Core/Classes/Relationship](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Relationship/) |
| Timestamp | [Core/Classes/CreationInfo.created](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/CreationInfo/) |
