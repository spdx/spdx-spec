# Annex G: Including Security Information in a SPDX document

The flexibility of SPDX 3.0 allows users to either link SBOMs to external security vulnerability data or to embed security vulnerability information in the SPDX 3.0 data format. For more details about the differences, read ["Capturing Software Vulnerability Data in SPDX 3.0"](https://spdx.dev/capturing-software-vulnerability-data-in-spdx-3-0/).

## G.1 External References and External Identifiers

SPDX 3.0 has the concept of an [__External Reference__](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Classes/ExternalRef.md) for an Element which points to a general resource outside the scope of the SPDX 3.0 content that provides additional context or information about an Element.

The specification for External Reference types has many [type options](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Vocabularies/ExternalRefType.md), a large handful of which pertain specifically to security use cases:

- cwe
- secureSoftwareAttestation
- securityAdvisory
- securityAdversaryModel
- securityFix
- securityOther
- securityPenTestReport
- securityPolicy
- securityThreatModel
- vulnerabilityDisclosureReport
- vulnerabilityExploitabilityAssessment

SPDX 3.0 also has the concept of [__External Identifier__](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Classes/ExternalIdentifier.md) which should be used in cases where an identifier scheme exists and is already defined for an Element outside of SPDX-3.0.

There are several External Identifier [types](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Vocabularies/ExternalIdentifierType.md) that may be used in a security context:

- cpe22
- cpe23
- cve
- packageUrl
- securityOther

This section provides usage scenarios of how to leverage the Security External References and External Identifiers specified above to refer to external security information. Examples of how to use each category can be found in the [Security/Classes](https://github.com/spdx/spdx-3-model/tree/main/model/Security/Classes) pages. Multiple instances and types of external security information may be included within a SPDX document.

## G.1.1 Linking to an Advisory

To reference a Common Vulnerabilities and Exposures (CVE) advisory applicable to a package, you must first create a [Vulnerability Element](https://github.com/spdx/spdx-3-model/blob/main/model/Security/Classes/Vulnerability.md). You can then use ExternalIdentifiers or ExternalRefs to supplement the CVE with associated external metadata.

```json
{
  "type": "security_Vulnerability",
  "spdxId": "urn:spdx.dev:cve-2020-2849",
  "creationInfo": "_:creationInfo",
  "summary": "Use of a Broken or Risky Cryptographic Algorithm",
  "description": "The npm package `elliptic` before version 6.5.4 are vulnerable to Cryptographic Issues via the secp256k1 implementation in elliptic/ec/key.js. There is no check to confirm that the public key point passed into the derive function actually exists on the secp256k1 curve. This results in the potential for the private key used in this implementation to be revealed after a number of ECDH operations are performed.",
  "security_modifiedTime": "2021-03-08T16:06:43Z",
  "security_publishedTime": "2021-03-08T16:02:50Z",
  "externalIdentifier": [
    {
      "type": "ExternalIdentifier",
      "externalIdentifierType": "cve",
      "identifier": "CVE-2020-2849",
      "identifierLocator": [
        "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-28498",
        "https://www.cve.org/CVERecord?id=CVE-2020-28498"
      ],
      "issuingAuthority": "urn:spdx.dev:agent-cve.org"
    },
    {
      "type": "ExternalIdentifier",
      "externalIdentifierType": "securityOther",
      "identifier": "GHSA-r9p9-mrjm-926w",
      "identifierLocator": ["https://github.com/advisories/GHSA-r9p9-mrjm-926w"]
    }
  ],
  "externalRef": [
    {
        "type": "ExternalRef",
        "externalRefType": "securityAdvisory",
        "locator": ["https://nvd.nist.gov/vuln/detail/CVE-2020-28498"]
    },
    {
      "type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": ["https://ubuntu.com/security/CVE-2020-28498"]
    },
    {
      "type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": ["https://github.com/indutny/elliptic/pull/244/commits"]
    }
  ]
},
```

## G.1.2 Linking to a CSAF Document

To reference [CSAF](https://docs.oasis-open.org/csaf/csaf/v2.0/cs01/csaf-v2.0-cs01.html) formatted security information see below for examples.

### G.1.2.1 Linking to a CSAF VEX

To reference a CSAF VEX document, include an external reference of type `vulnerabilityExploitabilityAssessment` on the Vulnerability Element that encapsulates the CVE described in the CSAF VEX document.

```json
{
  "type": "security_Vulnerability",
  "spdxId": "urn:spdx.dev:vuln-2",
  "creationInfo": "_:creationInfo",
  "name": "cve-2021-44228",
  "description": "Apache Log4j2 2.0-beta9 through 2.15.0 (excluding security releases 2.12.2, 2.12.3, and 2.3.1) JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP and other JNDI related endpoints. An attacker who can control log messages or log message parameters can execute arbitrary code loaded from LDAP servers when message lookup substitution is enabled.",
  "security_modifiedTime": "2021-03-08T16:02:43Z",
  "security_publishedTime": "2021-03-08T16:06:50Z",
  "externalIdentifier": [
    {
      "type": "ExternalIdentifier",
      "externalIdentifierType": "cve",
      "identifier": "CVE-2021-44228",
      "identifierLocator": [
        "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228",
        "https://www.cve.org/CVERecord?id=CVE-2021-44228"
      ],
      "issuingAuthority": "http://spdx.dev/agent-cve.org"
    }
  ],
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "vulnerabilityExploitabilityAssessment",
      "locator": ["https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/examples/csaf/csaf_vex/2022-evd-uc-01-a-001.json"]
    }
  ]
},
```

### G.1.2.2 Linking to a CSAF Advisory

To reference a CSAF Advisory document, include the document locator as an external reference of type `securityAdvisory` on a Package Element.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-rh-open-shift",
  "creationInfo": "_:creationInfo",
  "name": "Red Hat OpenShift Enterprise",
  "software_packageVersion": "3.6",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": ["https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/examples/csaf/rhsa-2019_1862.json"]
    }
  ]
},
```

## G.1.3 Linking to CycloneDX Security Data

To reference to [CycloneDX](https://cyclonedx.org) formatted security information applicable to a package you need to first create a Package Element.

Using an External Reference, link the package to the matching component in the CycloneDX BOM. Link to it using its [BOM link](https://cyclonedx.org/capabilities/bomlink/), a URN formed by combining the CycloneDX serial number, version and bom-ref which contains the security information about the package.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-stack-cors",
  "creationInfo": "_:creationInfo",
  "name": "stack-cors",
  "software_packageVersion": "1.3.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": ["https://cyclonedx.org/capabilities/bomlink/17cfc349-c637-4685-856c-81196420c7f5/2#componentRef"]
    }
  ]
},
```

## G.1.4 Linking to an OSV

To include a reference to [Open Source Vulnerability](https://github.com/google/osv) (OSV) formatted security information applicable to a package you need to first create a Package Element. Then use an External Reference to link to the OSV advisory.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-Django",
  "creationInfo": "_:creationInfo",
  "name": "Django",
  "software_packageVersion": "2.2",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": ["https://github.com/github/advisory-database/blob/6b9d5bc96a62bb845ee71e4551a214eb1457e2c6/advisories/github-reviewed/2022/04/GHSA-2gwj-7jmv-h26r/GHSA-2gwj-7jmv-h26r.json"]
    }
  ]
},
```

## G.1.5 Linking to an OmniBOR (formerly known as GitBOM)

To identify a Package with an [OmniBOR](https://omnibor.io/) (Universal Bill Of Receipts, formerly known as GitBOM) gitoid, use an External Identifier to add gitoid to the package.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-example",
  "creationInfo": "_:creationInfo",
  "name": "Example",
  "software_packageVersion": "1.2.3",
  "externalIdentifier": [
    {
      "type": "ExternalIdentifier",
      "externalIdentifierType": "gitoid",
      "identifier": "gitoid:blob:sha1:bcb99b819dadaebdf2c8f88d92ee9024c45f9df3"
    }
  ]
},
```

## G.1.6 Linking to a vulnerability disclosure document

To express a reference to a vulnerability disclosure document for a package, use an External Reference for a Package Element. The example below shows Cisco’s response to Apache log4j vulnerability.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-apache-log4j",
  "creationInfo": "_:creationInfo",
  "name": "log4j",
  "software_packageVersion": "2.14.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": ["https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-apache-log4j-qRuKNEbd"]
    }
  ]
},
```

To communicate that a package is not vulnerable to a specific vulnerability it is recommended to reference a web page indicating why given vulnerabilities are not applicable using an External Reference on the package.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:example-1",
  "creationInfo": "_:creationInfo",
  "name": "example",
  "software_packageVersion": "1.0.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": ["https://example.com/product-x/security-info-not-affected.html"]
    }
  ]
},
```

To refer to a security disclosure feed, such as the security bulletins from [CERT-EU](https://cert.europa.eu), include an External Reference in the package Element.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:example-2",
  "creationInfo": "_:creationInfo",
  "name": "example",
  "software_packageVersion": "2.0.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": ["https://cert.europa.eu/cert/Data/newsletter/reviewlatest-SecurityBulletins.xml"]
    }
  ]
},
```

## G.1.7 Linking to a Code Fix for a Security Issue

You can include a reference to a code fix for a security issue applicable to a Package or Vulnerability Element.

Using the Vulnerability Element from example 1.1 above or a Package Element, you would add a code fix External Reference to the Element as follows. In this example, the link points to a specific code revision containing the fix for [CVE-2020-28498](https://nvd.nist.gov/vuln/detail/CVE-2020-28498).

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:example-2",
  "creationInfo": "_:creationInfo",
  "name": "example",
  "software_packageVersion": "2.0.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": ["https://github.com/indutny/elliptic/commit/441b7428b0e8f6636c42118ad2aaa186d3c34c3f"],
      "comment": "elliptic before version 6.5.4 are vulnerable to Cryptographic Issues via the secp256k1 implementation in elliptic/ec/key.js. This patch fixes CVE-2020-28498."
    }
  ]
},
```

A fix reference may point to a configuration change for example the patch file as one of the fixes for [CVE-2022-26499](https://nvd.nist.gov/vuln/detail/CVE-2022-26499).

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:example-2",
  "creationInfo": "_:creationInfo",
  "name": "example",
  "software_packageVersion": "2.0.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": ["https://downloads.digium.com/pub/security/AST-2022-002-16.diff"]
    }
  ]
},
```

Alternatively, it may also link to a landing page with patches for a variety of products such as Oracle patch information for [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228).

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:example-2",
  "creationInfo": "_:creationInfo",
  "name": "example",
  "software_packageVersion": "2.0.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": ["https://www.oracle.com/security-alerts/cpujan2022.html"]
    }
  ]
},
```

## G.1.8 Linking to any Security Related Document

If you want to reference any security information related to a package but cannot or do not wish to specify its kind, use the `securityOther` externalRefType.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-elliptic",
  "creationInfo": "_:creationInfo",
  "name": "elliptic",
  "software_packageVersion": "6.5.4",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": ["https://github.com/christianlundkvist/blog/blob/aa3a69b5e4c06e4435070610c0c4a2b1e8731783/2020_05_26_secp256k1_twist_attacks/secp256k1_twist_attacks.md"],
      "comment": "Blog post from author who wrote fix for CVE-2020-28498."
    }
  ]
},
```

One can also use it to refer to guidance related to a vulnerability such as CISA guidance for Apache Log4j.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:pkg-apache-log4j",
  "creationInfo": "_:creationInfo",
  "name": "log4j",
  "software_packageVersion": "2.14.0",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": ["https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance"]
    }
  ]
},
```

## G.1.9 Linking to a Vulnerability Disclosure Report (VDR)

The National Institute of Standards and Technology (NIST) describes the concept of correlating vulnerability and SBOM information for a software product at the component level in “[Software Security in Supply Chains: Software Bill of Materials (SBOM)](https://www.nist.gov/itl/executive-order-14028-improving-nations-cybersecurity/software-security-supply-chains-software-1)”. Use the External Reference `vulnerabilityDisclosureReport` type to report on vulnerabilities related to the components contained in a software product’s SBOM.

This enables a software producer to articulate to software consumers the status of vulnerabilities contained in the software product, by means of reporting vulnerability information at either the SBOM document or component level.

Providing a link to such data at the time the SBOM is published provides a pointer for where to find this relevant vulnerability information without promulgating vulnerability information inside the SBOM. This is advantageous because the vulnerability information has a short shelf-life (it will change frequently) while the SBOM component data isn’t likely to change if the software has not changed.

```json
{
  "type": "software_Package",
  "spdxId": "urn:spdx.dev:sag-pm",
  "creationInfo": "_:creationInfo",
  "name": "SAG-PM (TM)",
  "software_packageVersion": "1.1.8",
  "externalRef": [
    {
      "type": "ExternalRef",
      "externalRefType": "vulnerabilityDisclosureReport",
      "locator": ["https://github.com/rjb4standards/REA-Products/blob/master/SBOM_and_VDRbaseline/sag-pm-118_VDR.json"]
    }
  ]
},
```
