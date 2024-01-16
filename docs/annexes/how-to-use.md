# Annex K: How To Use SPDX in Different Scenarios

TODO: re-write for SPDXv3

## K.1 Including security information in a SPDX document

SPDX 2.x has the concept of an External Reference for a Package to "reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package." 

The specification for External Reference identifiers (Annex F) has four defined categories:
- Security: CPE, SWID tag identifier, or reference to security information 
- Package-Manager: package identifier and locator
- Persistent-id:  identifier which is guaranteed to remain stable (persistent) over time
- Other: Use if none of the above match your use case

This section provides usage scenarios of how to leverage the Security and Persistent-id category external references specified above to refer to external security information. A complete SPDX document using these can be found in the examples directory within the SPDX code repository. Multiple instances and types of external security information may be included within a SPDX document.

Note that identifiers (e.g. CPE, GitBOM, SWID)  are spread throughout Annex F and sometimes locators refer to identifiers.

### K.1.1 Linking to an advisory

Including a reference to a Common Vulnerabilities and Exposures (CVE) advisory applicable to a package is shown in the example below. A SPDX creator should include current publicly known vulnerabilities at the time of document creation. SPDX consumers should always assume vulnerabilities enumerated by a SPDX creator to be out-of-date.

```
"externalRefs" : [ {
 "referenceCategory" : "SECURITY",
 "referenceLocator" : "https://nvd.nist.gov/vuln/detail/CVE-2020-29573",
 "referenceType" : "advisory"
}, {
 "referenceCategory" : "SECURITY",
 "referenceLocator" : "https://nvd.nist.gov/vuln/detail/CVE-2020-6096",
 "referenceType" : "advisory"
}, {
}, {
 "referenceCategory" : "SECURITY",
 "referenceLocator" : "https://nvd.nist.gov/vuln/detail/CVE-2020-3326",
 "referenceType" : "advisory"
} ]
```

### K.1.2 Linking to a CSAF

To learn how to reference to [CSAF](https://docs.oasis-open.org/csaf/csaf/v2.0/cs01/csaf-v2.0-cs01.html) formatted security information
applicable to a package see the example below, and additional examples here and here.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/examples/csaf/csaf_vex/2022-evd-uc-01-a-001.json",
  "referenceType" : "advisory"
} ]
```

### K.1.3 Linking to a CycloneDX

To reference to [CycloneDX](https://cyclonedx.org) formatted security information applicable to a package see the example below.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://raw.githubusercontent.com/CycloneDX/bom-examples/ed522d1f051c364e045b87c20665003a0c4ea777/SBOM/laravel-7.12.0/bom.json",
  "referenceType" : "advisory"
} ]
```

### K.1.4 Linking to an OSV

To learn how to include a reference to [Open Source Vulnerability](https://github.com/google/osv) (OSV) formatted security information applicable to a package see the example below.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/github/advisory-database/tree/6b9d5bc96a62bb845ee71e4551a214eb1457e2c6/advisories/github-reviewed/2022/04/GHSA-2gwj-7jmv-h26r/GHSA-2gwj-7jmv-h26r.json",
  "referenceType" : "advisory"
} ]
```

### K.1.5 Linking to a GitBOM

To reference to [GitBOM](https://gitbom.dev) formatted security information applicable to a package see the example below.

```
"externalRefs" : [ {
  "referenceCategory" : "PERSISTENT-ID",
  "referenceLocator" : "gitoid:blob:sha1:d8bcd58df2b14818b8237bb70c979d62c7df5747",
  "referenceType" : "gitbom"
  "referenceComment" : "GitBOM Object Id for the HeartBleed fix in ssl/d1_both.c"
} ,
{
  "referenceCategory" : "PERSISTENT-ID",
  "referenceLocator" : "gitoid:blob:sha1:bcb99b819dadaebdf2c8f88d92ee9024c45f9df3",
  "referenceType" : "gitbom"
  "referenceComment" : "GitBOM Object Id for the HeartBleed fix in ssl/t1_lib.c"
} ]
```

### K.1.6 Linking to a vulnerability disclosure document

To express a reference to a vulnerability disclosure document for a package such Cisco’s response to Apache log4j vulnerability.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-apache-log4j-qRuKNEbd",
  "referenceType" : "advisory"
} ]
```

To communicate that a package is not vulnerable to a specific vulnerability it is recommended to reference a web page indicating why given vulnerabilities are not applicable.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://example.com/product-x/security-info.html",
  "referenceType" : "advisory"
} ]
```

To refer to a security disclosure feed, such as the security bulletins from [CERT-EU](https://cert.europa.eu).

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://cert.europa.eu/cert/Data/newsletter/reviewlatest-SecurityBulletins.xml",
  "referenceType" : "advisory"
} ]
```

### K.1.7 Linking to a code fix for a security issue

To reference a code fix for a security issue applicable to a package see the example below.
In this example, the link points to a specific code revision containing the fix for [CVE-2020-28498](https://nvd.nist.gov/vuln/detail/CVE-2020-28498).

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/indutny/elliptic/commit/441b7428b0e8f6636c42118ad2aaa186d3c34c3f",
  "referenceType" : "fix"
} ]
```

A fix reference may point to a configuration change for example the patch file as one of the fixes for [CVE-2022-26499](https://nvd.nist.gov/vuln/detail/CVE-2022-26499).

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://downloads.digium.com/pub/security/AST-2022-002-16.diff",
  "referenceType" : "fix"
} ]
```

Alternatively, it may also link to a landing page with patches for a variety of products such as
Oracle patch information for [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228).

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://www.oracle.com/security-alerts/cpujan2022.html",
  "referenceType" : "fix"
} ]
```

### K.1.8 Linking to any security related document

If you want to reference any security information related to a package but cannot or do not wish to specify its kind, use the `url` referenceType.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/christianlundkvist/blog/blob/aa3a69b5e4c06e4435070610c0c4a2b1e8731783/2020_05_26_secp256k1_twist_attacks/secp256k1_twist_attacks.md",
  "referenceType" : "url"
} ]
```

One can also use it to refer to guidance related to a vulnerability such as CISA guidance for Apache Log4j.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance",
  "referenceType" : "url"
} ]
```

### K.1.9 Linking to an SBOM vulnerability report for a Software Product (per NIST Executive Order 14028)

The National Institute of Standards and Technology (NIST) describes the concept of correlating vulnerability and SBOM information for a software product at the component level in “[Software Security in Supply Chains: Software Bill of Materials (SBOM)](https://www.nist.gov/itl/executive-order-14028-improving-nations-cybersecurity/software-security-supply-chains-software-1)”. Use the ExternalRefs `SECURITY` category and `advisory` referenceType to report on vulnerabilities related to the components contained in a software product’s SBOM.

This enables a software producer to articulate to software consumers the status of vulnerabilities contained in the software product, by means of reporting vulnerability information at either the SBOM document or component level.

Providing a link to such data at the time the SBOM is published provides a pointer for where to find this relevant vulnerability information without promulgating vulnerability information inside the SBOM. This is advantageous because the vulnerability information has a short shelf-life (it will change frequently) while the SBOM component data isn’t likely to change if the software has not changed.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/rjb4standards/REA-Products/blob/master/SBOM_and_VDRbaseline/sag-pm-118_VDR.json",
  "referenceType" : "advisory"
} ]
```


## K.2 Satisfying NTIA Minimum Elements for an SBOM using SPDX

### K.2.1 US Executive Order 14028 Minimum Elements for an SBOM

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


### K.2.2 Mapping NTIA Minimum Elements to SPDX Fields

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


## K.3 Verifying SPDX Packages

Several use cases for SPDX depend on the consumer being able to verify the provenance and integrity of their software. SPDX can support several different scenarios depending on what information is available to the producer, what information is available to the consumer, and how the SPDX document is delivered. These scenarios are described below along with recommended approaches to verifying the SPDX packages.

### K.3.1 General Guidance

If a Package can be represented as a single blob of bytes, such as a tar archive:
  * `PackageChecksum` must be computed by applying one of the supported hashing algorithms to the package blob.
  * `PackageDownloadLocation` should be a download locator that retrieves the package blob.
  * A supplier can define a `PackageChecksum` in a Package without providing a `PackageDownloadLocation`. This lets consumers perform an offline verification of private blobs.

If a Package represents an artifact that logically binds a number of single files together (such as a zip file or a directory):
  * If the files bound by the Package are described in the document, `PackageVerificationCode` should be computed by using the files' [SHA1](https://www.rfc-editor.org/rfc/rfc3174) checksums. Additionally, the `FilesAnalyzed` field in the Package **MUST** be set to `true`.
  * If the SHA1 checksum of any files bound by the Package is not available or the File needs to be excluded from the computation, it MUST be marked so by appending `(excludes: FileName)` at the end of the package verification code value.


### K.3.2 Examples

#### K.3.2.1 SPDX Package and SPDX Document both contained in Archive File
Examples include: tarball binding one or more files to a SPDX package, installation file which installs the package and extracts SPDX document in the same directory

SPDX Field To Use: [7.9 Package verification code](package-information.md#79-package-verification-code-field-)

Guidance:
  * With the SPDX document included in the archive, it is not possible for the SPDX document to include a checksum for the archive itself. Generate a Package verification code and include the SPDX Document file name in the Excluded Files field.


#### K.3.2.2 SPDX Package Delivered as an Archive File Separate from the SPDX Document
Examples include: tarball, installation file

SPDX Field to Use: [7.10 Package checksum](package-information.md#710-package-checksum-field-)

Guidance: 
  * Generate a checksum for the archive file and include it in the SPDX Package checksum field. The archive file name should also be included in the [Package file name](package-information.md#74-package-file-name-field-) field.
  * If source files for the Package are included in the Package distribution archive, the Package verification code for that Package should also be included in the SPDX document and the [Files analyzed](package-information.md#78-files-analyzed-field-) field should be set to `true`.

#### K.3.2.3 A Single File Represented as a SPDX Package

Examples include: tarball, binary image, single executable

SPDX Field To Use: [7.10 Package checksum](package-information.md#710-package-checksum-field-)

Guidance: 
  * If a [Package download location](package-information.md#77-package-download-location-field-) exists, the Package checksum should be the cryptographic hash of the Package blob at the Package download location specified.
  * If the Package download location is not known, not available, or not accessible to the software consumer, the producer should include a Package checksum for the included Package file.


#### K.3.2.4 Directory of Software Represented as a SPDX Package

Examples include: source code, containers

SPDX Field To Use: [7.9 Package verification code](package-information.md#79-package-verification-code-field-)

Guidance:
  * Include [File name](file-information.md#81-file-name-field-) field in the SPDX document for every file in the directory, include each file’s cryptographic hash as a [File checksum](file-information.md#84-file-checksum-field-), create a [CONTAINS relationship](relationships-between-SPDX-elements.md#111-relationship-field-) between the Package and the files, and set [Files analyzed](package-information.md#78-files-analyzed-field-) to `true` on the Package. **Note**: if Files analyzed is set to `false` you __cannot__ provide a Package verification code.
