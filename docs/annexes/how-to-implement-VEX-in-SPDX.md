# Annex J: How to Implement VEX in SPDX

Vulnerability Exploitability eXchange (VEX) was designed to allow a software supplier or other parties to assert the status of specific vulnerabilities in a particular product. The SPDX security profile supports the communication of VEX metadata using subclassed [VEX Vulnerability Assessment Relationships](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/VexVulnAssessmentRelationship/). SPDX uses relationships to convey the [minimum elements](https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf) of a vulnerability assessment (severity, impact, exploitability).

VEX centers on the notion of a statement. A statement can be defined as an assertion intersecting product, a vulnerability, and an impact status:
```text
   statement = product(s)             + vulnerability              + status
               │                        │                            │
               └ The software product   └ Typically a CVE related    └ One of the impact
                 we are talking about     to one of the product's      statuses as identified
                                          components                   by the VEX working group.
```
The `product` is a piece of software that can be correlated to an entry in an SBOM. `vulnerability` is the ID of a security vulnerability as understood by scanners, which can be looked up in a vulnerability tracking system. `status` is one of the impact status labels defined by VEX (See https://www.ntia.gov/files/ntia/publications/vex_one-page_summary.pdf).

## J.1 Linking vs Embedding VEX information in SPDX

SPDX 3.0 provides support to include VEX information in two ways:
1) Linking to external VEX information
2) Embed VEX metdata directly in an SPDX security document

### J.1.1 Linking to VEX

To link to an external VEX document, include an external reference of type `vulnerabilityExploitabilityAssessment` on the Vulnerability Element that encapsulates the CVE described in the VEX document.
```json
{
  "@type": "Vulnerability",
  "@id": "urn:spdx.dev:vuln-2",
  "name": "cve-1234-5678",
  "publishedTime": "2024-01-01T16:28:45Z",
  "externalRefs": [
    {
      "@type": "ExternalRef",
      "externalRefType": "vulnerabilityExploitabilityAssessment",
      "locator": "https://github.com/openvex/vexctl/blob/main/examples/openvex/document1.vex.json"
    }
  ]
}
```

### J.1.2 Embedding VEX information in SPDX

In order to embed VEX metadata in an SPDX document, you can utilize the SPDX 3.0 Security Profile. See the following sections for examples.


## J.2 Assembling a VEX Statement

A VEX statement is assembled by a triad of (at least):

```a software product + a vex status + a vulnerability```

In SPDX the VEX product can be any software package. There are four VEX status labels, each of which is represented in SPDX with a subclassed VEX Relationship:
| VEX Status | SPDX VEX Relationship |
| --- | --- |
| not_affected | [VexNotAffectedVulnAssessmentRelationship](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/VexNotAffectedVulnAssessmentRelationship/) |
| affected | [VexAffectedVulnAssessmentRelationship](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/VexAffectedVulnAssessmentRelationship/) |
| fixed | [VexFixedVulnAssessmentRelationship](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/VexFixedVulnAssessmentRelationship/) |
| under_investigation | [VexUnderInvestigationVulnAssessmentRelationship](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/VexUnderInvestigationVulnAssessmentRelationship/) | 

For all VEX Relationships, the `from` element  must be a [Vulnerability](https://spdx.github.io/spdx-spec/v3.0/model/Security/Classes/Vulnerability/) and the `to` end of the relationship must point to one or more elements that represent the VEX product(s). 

VEX inherits information from the document level down to its statements. When a statement is missing information it can be completed by reading the equivalent field from the containing document. For example, if a VEX relationship is missing data in its createdBy property, tools must consider the entity listed in the CreationInfo section of the document as the VEX author. In the same way, when a VEX relationship does not have a created property, the document's date must be considered as authoritative.

The following example shows how you would communicate that a vulnerability is under investigation to determine whether or not it affects a software product.

```json
  "@type": "VexUnderInvestigationVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-underInvestigation-1",
  "relationshipType": "underInvestigationFor",
  "from": "urn:spdx.dev:vuln-cve-2020-28498",
  "to": ["urn:product-acme-application-1.3"],
  "assessedElement": "urn:npm-elliptic-6.5.2",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-03-09T11:04:53Z"
```

To communicate that a product is affected by a vulnerability, you would instead use the `VexAffectedVulnAssessmentRelationship`:

```json
  "@type": "VexAffectedVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-affected-1",
  "relationshipType": "affects",
  "from": "urn:spdx.dev:vuln-cve-2020-28498",
  "to": ["urn:product-acme-application-1.3"],
  "assessedElement": "urn:npm-elliptic-6.5.2",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-03-09T11:04:53Z"
```

VEX relationships in SPDX will always point `to` element(s) representing the VEX *products*. A product is a logical unit representing a piece of software, typically composed of one or more software packages/libraries/components. To specify an element (typially a software package) contained *in* a product where the vulnerability was detected, the VEX relationship can optionally specify this subcomponent using the [assessedElement](https://spdx.github.io/spdx-spec/v3.0/model/Security/Properties/assessedElement/) property. Using the `assessedElement` can be helful in situations where a particular CVE may affect software products differently. For example, perhaps you have two software products which both contain the log4j vulnerability (CVE-2021-44228) but only one of the products is exploitable by the vulnerability. The `to` product in your SPDX VEX statements and the VEX status relationships would be different but the `assessedElement` would be the same log4j package.

Product A, affected by CVE-2021-44228:
```json
  "@type": "VexAffectedVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-affected-1",
  "relationshipType": "affects",
  "from": "urn:spdx.dev:vuln-cve-2021-44228",
  "to": ["urn:product-acme-application-1.3"],
  "assessedElement": "urn:apache-log4j-2.12",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-12-10T11:04:53Z",
  "actionStatement": "Recommend to update logj4 version to 2.16.0 or later"
  "actionStatementTime": "2021-12-12T12:09:23Z"
```

Product B, not affected by CVE-2021-44228:
```json
  "@type": "VexNotAffectedVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-not-affected-1",
  "relationshipType": "doesNotAffect",
  "from": "urn:spdx.dev:vuln-cve-2021-44228",
  "to": ["urn:product-acme-application-1.4"],
  "assessedElement": "urn:apache-log4j-2.12",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-12-10T11:04:53Z",
  "justificationType": "vulnerableCodeNotInExecutePath"
```



## J.3 Changing the Status of a Vulnerability

VEX is designed to communicate status of a vulnerability in a software product which is inherently dynamic and prone to change over time.

Because [Elements](https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Element/) in SPDX are immutable, it is best best practice to issue a new VulnAssessmentRelationship of type `amendedBy` each time the VEX status of a vulnerability changes (i.e. `underInvestigationFor` --> `affects`) in addition to creating the new type of VEX status relationship. Linking the two VEX relationships this way creates a more complete graph while making it easier for tools to track the changing status of a vulnerability in a software product.  The following example shows how you would communicate that a vulnerability was under investigation before determining that the vulnerability indeed affects a product.

```json
  "@type": "VexUnderInvestigationVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-underInvestigation-1",
  "relationshipType": "underInvestigationFor",
  "from": "urn:spdx.dev:vuln-cve-2020-28498",
  "to": ["urn:product-acme-application-1.3"],
  "assessedElement": "urn:npm-elliptic-6.5.2",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-03-09T11:04:53Z"

  "@type": "VulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-update-acme-1.3",
  "relationshipType": "amendedBy",
  "from": "urn:spdx.dev:vex-underInvestigation-1",
  "to": ["urn:spdx.dev:vex-affected-1"],

  "@type": "VexAffectedVulnAssessmentRelationship",
  "@id": "urn:spdx.dev:vex-affected-1",
  "relationshipType": "affects",
  "from": "urn:spdx.dev:vuln-cve-2020-28498",
  "to": ["urn:product-acme-application-1.3"],
  "assessedElement": "urn:npm-elliptic-6.5.2",
  "suppliedBy": ["urn:spdx.dev:agent-jane-doe"],
  "publishedTime": "2021-03-15T08:10:43Z"
```

Note that it is not required to include an `amendedBy` relationship for evolving impact statements but it is considered best practice. One could also simply create a new VEX status relationship for tools/consumers to piece together using context clues like product names, ids and time stamps.
