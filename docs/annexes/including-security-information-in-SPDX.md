# 1. Including security information in a SPDX document

SPDX 3.0 has the concept of an [__External Reference__](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Classes/ExternalRef.md) for an Element which points to "a resource outside the scope of the SPDX-3.0 content that provides additional characteristics of an Element." 

The specification for External Reference types has many [type options](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Vocabularies/ExternalRefType.md), a large handful of which pertain specifically to security use cases:

* secureSoftwareAttestation: A reference to information assuring that the software is developed using security practices as defined by [NIST SP 800-218 Secure Software Development Framework (SSDF)](https://csrc.nist.gov/publications/detail/sp/800-218/final) or [CISA Secure Software Development Attestation Form](https://www.cisa.gov/sites/default/files/2023-04/secure-software-self-attestation_common-form_508.pdf).
* securityAdvisory: A reference to a published security advisory (where advisory as defined per ISO 29147:2018) that may affect one or more elements, e.g., vendor advisories or specific NVD entries.
* securityAdversaryModel: A reference to the security adversary model for a package.
* securityFix: A reference to the patch or source code that fixes a vulnerability.
* securityOther: A reference to related security information of unspecified type.
* securityPenTestReport: A reference to a [penetration test](https://en.wikipedia.org/wiki/Penetration_test) report for a package.
* securityPolicy: A reference to instructions for reporting newly discovered security vulnerabilities for a package.
* securityThreatModel: A reference the [security threat model](https://en.wikipedia.org/wiki/Threat_model) for a package.
* vulnerabilityDisclosureReport: A reference to a Vulnerability Disclosure Report (VDR) which provides the software supplier's analysis and findings describing the impact (or lack of impact) that reported vulnerabilities have on packages or products in the supplier's SBOM as defined in [NIST SP 800-161](https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final).
* vulnerabilityExploitabilityAssessment: A reference to a Vulnerability Exploitability eXchange (VEX) statement which provides information on whether a product is impacted by a specific vulnerability in an included package and, if affected, whether there are actions recommended to remediate.


SPDX 3.0 also has the concept of [__External Identifier__](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Classes/ExternalIdentifier.md) which should be used to "...".

There are several External Identifier [types](https://github.com/spdx/spdx-3-model/blob/main/model/Core/Vocabularies/ExternalIdentifierType.md) that may be used in a security context:

* cpe22: https://cpe.mitre.org/files/cpe-specification_2.2.pdf
* cpe23: https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir7695.pdf
* cve: An identifier for a specific software flaw defined within the official CVE Dictionary and that conforms to the CVE specification as defined by https://csrc.nist.gov/glossary/term/cve_id. 
* securityOther: Used when there is a security related identifier of unspecified type.


This section provides usage scenarios of how to leverage the Security External References and External Identifiers specified above to refer to external security information. Examples of how to use each category can be found in the [Security/Classes](https://github.com/spdx/spdx-3-model/tree/main/model/Security/Classes) pages. Multiple instances and types of external security information may be included within a SPDX document.

## 1.1 Linking to an advisory

To reference a Common Vulnerabilities and Exposures (CVE) advisory applicable to a package, you must first create a [Vulnerability Element](https://github.com/spdx/spdx-3-model/blob/main/model/Security/Classes/Vulnerability.md). You can then use ExternalIdentifiers or ExternalRefs to supplement the CVE with associated external metadata.

```json
{
  "@type": "Vulnerability",
  "@id": "urn:spdx.dev:vuln-1",
  "summary": "Use of a Broken or Risky Cryptographic Algorithm",
  "description": "The npm package `elliptic` before version 6.5.4 are vulnerable to Cryptographic Issues via the secp256k1 implementation in elliptic/ec/key.js. There is no check to confirm that the public key point passed into the derive function actually exists on the secp256k1 curve. This results in the potential for the private key used in this implementation to be revealed after a number of ECDH operations are performed.",      
  "modified": "2021-03-08T16:06:43Z",
  "published": "2021-03-08T16:02:50Z",
  "externalIdentifiers": [
    {
      "@type": "ExternalIdentifier",
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
      "identifierLocator": "https://github.com/advisories/GHSA-r9p9-mrjm-926w"
    }
  ],
  "externalRefs": [
    {
        "@type": "ExternalRef",
        "externalRefType": "securityAdvisory",
        "locator": "https://nvd.nist.gov/vuln/detail/CVE-2020-28498"
    },
    {
      "@type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": "https://ubuntu.com/security/CVE-2020-28498"
    },
    {
      "@type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": "https://github.com/indutny/elliptic/pull/244/commits"
    }
  ]
}
```

## 1.2 Linking to a CSAF

To reference [CSAF](https://docs.oasis-open.org/csaf/csaf/v2.0/cs01/csaf-v2.0-cs01.html) formatted security information, you would 
applicable to a package see the example below.


## 1.3 Linking to a CycloneDX

To reference to [CycloneDX](https://cyclonedx.org) formatted security information applicable to a package you need to first create a Package Element. Then use an External Reference to link to the CycloneDX document which contains information about the package.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:pkg-stack-cors",
  "name": "stack-cors",
  "packageVersion": "1.3.0",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": "https://raw.githubusercontent.com/CycloneDX/bom-examples/ed522d1f051c364e045b87c20665003a0c4ea777/SBOM/laravel-7.12.0/bom.json"
    }
  ]
}
```

## 1.4 Linking to an OSV
**TODO: Do we create a vulnerability element from the OSV then use ExternalRef on the vulnerability or do we create a package and reference the OSV from there?**

To include a reference to [Open Source Vulnerability](https://github.com/google/osv) (OSV) formatted security information applicable to a package you need to first create a Package Element. Then use an External Reference to link to the OSV advisory.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:pkg-Django",
  "name": "Django",
  "packageVersion": "2.2",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": "https://github.com/github/advisory-database/blob/6b9d5bc96a62bb845ee71e4551a214eb1457e2c6/advisories/github-reviewed/2022/04/GHSA-2gwj-7jmv-h26r/GHSA-2gwj-7jmv-h26r.json"
    }
  ]
}
```


## 1.5 Linking to an OmniBOR (formerly known as GitBOM)

To reference an [OmniBOR](https://omnibor.io/) (Universal Bill Of Receipts) formatted security information applicable to a package you must first create a Package Element. Then use an External Identifier to link to the OmniBOR document.
**TODO: Why do we use External Identifier vs Ref here? and what's the identifier locator? do we want a different example here?**

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:pkg-example",
  "name": "Example",
  "packageVersion": "1.2.3",
  "externalIdentifiers": [
    {
      "@type": "ExternalIdentifier",
      "externalIdentifierType": "gitoid",
      "identifier": "gitoid:blob:sha1:bcb99b819dadaebdf2c8f88d92ee9024c45f9df3"
    }
  ]
}
```

## 1.6 Linking to a vulnerability disclosure document

To express a reference to a vulnerability disclosure document for a package such Cisco’s response to Apache log4j vulnerability. First create a package element, then use an External Reference to refer to the vulnerability disclosure document.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:apache-log4j",
  "name": "log4j",
  "packageVersion": "2.14.0",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-apache-log4j-qRuKNEbd"
    }
  ]
}
```

To communicate that a package is not vulnerable to a specific vulnerability it is recommended to reference a web page indicating why given vulnerabilities are not applicable using an External Reference on the package.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:example-1",
  "name": "example",
  "packageVersion": "1.0.0",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": "https://example.com/product-x/security-info-not-affected.html"
    }
  ]
}
```

To refer to a security disclosure feed, such as the security bulletins from [CERT-EU](https://cert.europa.eu), include an External Reference in the package Element.

**TODO: is this on the package element? We also need a new link as current one is invalid**

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:example-2",
  "name": "example",
  "packageVersion": "2.0.0",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityAdvisory",
      "locator": "https://cert.europa.eu/cert/Data/newsletter/reviewlatest-SecurityBulletins.xml"
    }
  ]
}
```

## 1.7 Linking to a code fix for a security issue

You can include a reference to a code fix for a security issue applicable to a Package or Vulnerability Element. 

Using the Vulnerability Element from example 1.1 above or a Package Element, you would add a code fix External Reference to the Element as follows. In this example, the link points to a specific code revision containing the fix for [CVE-2020-28498](https://nvd.nist.gov/vuln/detail/CVE-2020-28498).

```json
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": "https://github.com/indutny/elliptic/commit/441b7428b0e8f6636c42118ad2aaa186d3c34c3f",
      "comment": "elliptic before version 6.5.4 are vulnerable to Cryptographic Issues via the secp256k1 implementation in elliptic/ec/key.js. This patch fixes CVE-2020-28498."
    }
  ]
```

A fix reference may point to a configuration change for example the patch file as one of the fixes for [CVE-2022-26499](https://nvd.nist.gov/vuln/detail/CVE-2022-26499).

```json
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": "https://downloads.digium.com/pub/security/AST-2022-002-16.diff"
    }
  ]
```

Alternatively, it may also link to a landing page with patches for a variety of products such as Oracle patch information for [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228).

```json
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityFix",
      "locator": "https://www.oracle.com/security-alerts/cpujan2022.html"
    }
  ]
```


## 1.8 Linking to any security related document

If you want to reference any security information related to a package but cannot or do not wish to specify its kind, use the `securityOther` externalRefType.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:pkg-elliptic",
  "name": "elliptic",
  "packageVersion": "6.5.4",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": "https://github.com/christianlundkvist/blog/blob/aa3a69b5e4c06e4435070610c0c4a2b1e8731783/2020_05_26_secp256k1_twist_attacks/secp256k1_twist_attacks.md",
      "comment": "Blog post from author who wrote fix for CVE-2020-28498."
    }
  ]
}
```

One can also use it to refer to guidance related to a vulnerability such as CISA guidance for Apache Log4j.
**TODO: Is this still for the pakage element?**

```json
"externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "securityOther",
      "locator": "https://www.cisa.gov/uscert/apache-log4j-vulnerability-guidance"
    }
  ]
```

## 1.9 Linking to an SBOM vulnerability report for a Software Product (per NIST Executive Order 14028)

The National Institute of Standards and Technology (NIST) describes the concept of correlating vulnerability and SBOM information for a software product at the component level in “[Software Security in Supply Chains: Software Bill of Materials (SBOM)](https://www.nist.gov/itl/executive-order-14028-improving-nations-cybersecurity/software-security-supply-chains-software-1)”. Use the External Reference `vulnerabilityDisclosureReport` type to report on vulnerabilities related to the components contained in a software product’s SBOM.

This enables a software producer to articulate to software consumers the status of vulnerabilities contained in the software product, by means of reporting vulnerability information at either the SBOM document or component level.

Providing a link to such data at the time the SBOM is published provides a pointer for where to find this relevant vulnerability information without promulgating vulnerability information inside the SBOM. This is advantageous because the vulnerability information has a short shelf-life (it will change frequently) while the SBOM component data isn’t likely to change if the software has not changed.

```json
{
  "@type": "Package",
  "@id": "urn:spdx.dev:sag-pm",
  "name": "SAG-PM (TM)",
  "packageVersion": "1.1.8",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "vulnerabilityDisclosureReport",
      "locator": "https://github.com/rjb4standards/REA-Products/blob/master/SBOM_and_VDRbaseline/sag-pm-118_VDR.json"
    }
  ]
}
```
