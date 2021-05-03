# Vulnerabilities Profile

The Vulnerabilities profile describes fields and classes used to convey information regarding the vulnerabilities applicable to Artifacts.
A SPDX document using this profile must include 'vulnerabilities' in the SPDX Document `profile` field.

## Vulnerabilities

### Format Overview

```
vulnerabilities:[
    {
        "id": "string, unique SPDX id for this element within SPDX doc.",
        "name": "string, id given by org of person(s) who identified it.",
        "summary": "string, one-liner summary of max 120 chars.",
        "details": "string, multi line may include steps to reproduce, detail impact analysis or remediation guidance.",
        "relationships": [
            {
                "completeness": "TO_COMPLETE",
                "to": [
                    "string, id of SPDX package."
                ],
                "type": "AFFECTS"
            },
            {
                "completeness": "TO_COMPLETE",
                "to": [
                    "string, id of SPDX Identity (org, person or tool)."
                ],
                "type": "FOUND_BY"
            },
            {
                "completeness": "TO_COMPLETE",
                "to": [
                    "string, id of SPDX Identity (org, person or tool)."
                ],
                "type": "SUPPLIED_BY"
            },
            {
                "cwes": [
                    "integer, representation of a Common Weaknesses Enumerations (CWE).
                      For example 470 of https://cwe.mitre.org/data/definitions/470.html."
                ],
                "rating": [
                    {
                        "method": "string, rating method used either `CVSS_2`, `CVSS_3`, `OWASP` or `OTHER`",
                        "score": {
                            "base": "string, base score of the vulnerability (see e.g. CVSS standard).",
                            "exploitability": "string, exploitability score of the vulnerability (see e.g. CVSS standard).",
                            "impact": "string, impact score of the vulnerability (see e.g. CVSS standard)."
                        },
                        "severity": "string, textual representation of the vulnerability adopted by the risk analysis method. 
                            If method is CVSS then value is either None, Low, Medium, High or Critical.",
                        "vector": "string, textual representation of the metric values used to score the vulnerability."
                    }
                ],
                "to": [
                    "string, id of SPDX Identity (org, person or tool)."
                ],
                "type": "RATED_BY"
            }
        ],
        "externalReferences": [
            {
                "category": "string, either ADVISORY, ARTICLE, FIX, REPORT or OTHER.",
                "locator": "string"
            }
        ],
        "modified": "string, optional field for last modification date, formatted YYYY-MM-DDThh:mm:ssZ.",
        "published": "string, optional field for publication date, formatted YYYY-MM-DDThh:mm:ssZ.",
        "witdrawn": "string, optional field for withdrawal date, formatted YYYY-MM-DDThh:mm:ssZ.",
    }
]
```

### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | vulnerabilities |
| Min Count | 0 |
| Max Count | 1 |
| Status    | unstable |

### Fields

#### Id

The `id` field contains the unique identifier for the vulnerability within the current SPDX document.

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | id |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### Name

The `name` field contains an identifier of the vulnerability as given by the organization or person(s) who identified it.
This field is commonly a string of the format that starts with the provider's database name followed by entry identifier
within the database.
For example: "CVE-2018-3728", "RHSA-2018:1264", "npm:hoek:20180212" or "GHSA-jp4x-w63m-7wgm".

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | name |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |


#### Summary

The `summary` field is a short one-liner summary of the vulnerability, ideally not more than 120 characters of plain-text.

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | summary |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### Details

The `details` field provides additional details about the vulnerability such as steps to reproduce, detail impact analysis
or remediation guidance.

// TODO Should we allow details field to be MarkDown or HTML to allow richer user experience? 

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | details |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### Relationships

The `relationships` field provides information about the relationships between the vulnerability and other SPDX elements.

A _SPDX Vulnerability_ must have the following relationships:

- `AFFECTS`: pointing to the _SPDX Package_ or _SPDX File_ affected by the vulnerability
- `RATED_BY`: an instance of _SPDX Vulnerability Rating__ relationship 

A _SPDX Vulnerability_ may include the following relationships:

- `FOUND_BY`: pointing to an _SPDX Identity_ e.g. the organization, tool or person(s) who identified the vulnerability
- `SUPPLIED_BY`: pointing to an _SPDX Identity_ e.g. the organization, tool or person(s) who supplied information about the vulnerability

##### Vulnerability Rating Relationship

An _SPDX Vulnerability Rating Relationship_ includes the following fields:
  - `cwes`: array of [Common Weaknesses Enumerations](https://cwe.mitre.org/data/index.html) (CWE) integers
  - `rating`: an _SPDX Vulnerability Rating_ object, see defintion below.
  - `to`: array of _SPDX Identity_ elements
  - `type`: "RATED_BY"

An _SPDX Vulnerability Rating object_ includes the following fields:
  - `method`: rating method used either `CVSS_2`, `CVSS_3`, `OWASP_RISK` or `OTHER` if none of other values apply.
  - `score`: base score of the vulnerability
  - `severity`: exploitability score of the vulnerability 
  - `vector`: textual representation of the metric values used

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | rating |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### ExternalReferences

The `externalReferences` contains referencea to external sources of additional information believed to be relevant to the vulnerability.

Typically the external references of a _SPDX Vulnerability_ only contain relationships of types:

- `ADVISORY`: a published security advisory for the vulnerability
- `ARTICLE`: an article or blog post describing the vulnerability
- `REPORT`: a report, typically on bug or issue tracker of the vulnerability
- `FIX`: points to the the source code change with a fix for the vulnerability (e.g., a GitHub commit)
- `OTHER`: use for a relationship not covered by any of the above

Note that all of the above references should link to URLs that can be viewed with a web browser.

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name        | externalReferences |
| Min Count | 0 |
| Max Count | 1 |
| Status | unstable |

#### Modified

Identity when the vulnerability was last changed, formated as `YYYY-MM-DDThh:mm:ssZ` (ISO 8601) string. 

where:

- `YYYY` is year
- `MM` is month with leading zero
- `DD` is day with leading zero
- `T` is delimiter for time
- `hh` is hours with leading zero in 24 hour time
- `mm` is minutes with leading zero
- `ss` is seconds with leading zero
- `Z` is universal time indicator

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name        | modified |
| Min Count | 0 |
| Max Count | 1 |
| Status | unstable |

#### Published

Identity when the vulnerability was published, formated as `YYYY-MM-DDThh:mm:ssZ` (ISO 8601) string. 

where:

- `YYYY` is year
- `MM` is month with leading zero
- `DD` is day with leading zero
- `T` is delimiter for time
- `hh` is hours with leading zero in 24 hour time
- `mm` is minutes with leading zero
- `ss` is seconds with leading zero
- `Z` is universal time indicator

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name        | published |
| Min Count | 0 |
| Max Count | 1 |
| Status | unstable |

#### Withdrawn

The `withdrawn` field identifies when the vulnerability was withdrawn, formated as `YYYY-MM-DDThh:mm:ssZ` (ISO 8601) string.

where:

- `YYYY` is year
- `MM` is month with leading zero
- `DD` is day with leading zero
- `T` is delimiter for time
- `hh` is hours with leading zero in 24 hour time
- `mm` is minutes with leading zero
- `ss` is seconds with leading zero
- `Z` is universal time indicator

A rationale for why the vulnerability was withdrawn may be captured in an _SPDX Annotation_.

## Defect Responses

A _Defect Response_ allows an _SPDX Identity_ to communicate a mitigation to an defect such as a _SPDX Vulnerabilty_.

### Format Overview

```
"defectResponses": [
    {
        "id": "string",
        "type": "string",
        "created": "string, optional field for last modification date, formatted YYYY-MM-DDThh:mm:ssZ.",
        "comment": "string",
        "relationships": [
            {
                "to": [
                    "string"
                ],
                "type": "string"
            }
        ]
    }
]
```

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | defectResponses |
| Min Count | 0 |
| Max Count | 1 |
| Status    | unstable |

### Fields

#### Id

The `id` field contains the unique identifier for the response within the current SPDX document.

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | id |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### Type

The `type` field provides information about the type of response and can have one of the following values:

- `CANT_FIX_VULNERABILITY` if no remediation is available for this vulnerability, e.g., because it requires a change to be made by a third party that is not responsive.
- `INEFFECTIVE_VULNERABILITY` if the code in which the vulnerability was found is neither invoked in the root package's code nor indirectly via another open source component
- `INVALID_MATCH_VULNERABILITY` if the vulnerability is irrelevant due to a tooling or database mismatch
- `MITIGATED_VULNERABILITY` if the vulnerability has been mitigated, e.g., measures have been taken to ensure
     * this vulnerability can not be exploited.
- `ROLLBACK` if remediation for the vulnerability is to downgrade to an older version of the root package // TODO: Decide whether to include  in the spec the downgrade version
- `UPDATE` if remediation for the vulnerability is to update to a newer version of the root package // TODO: Decide whether to include in the spec the fixed version
- `WILL_NOT_FIX_VULNERABILITY` if the vulnerability will never be fixed, e.g., because the package which is affected is orphaned declared end-of-life, or otherwise deprecated
- `WORKAROUND_FOR_VULNERABILITY` if a temporary workaround has been put in place to avoid exposure to the vulnerability

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | type |
| Min Count | 1 |
| Max Count | 1 |
| Status    | unstable |

#### Comment

The optional `comment` field provide a place for the _Vulnerability Response_ creator to record any additional comments about the
mitigation to the vulnerability.

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name        | type |
| Min Count | 0 |
| Max Count | 1 |
| Status | unstable |

#### Created

The `created` field identifies when the response was created, formated as `YYYY-MM-DDThh:mm:ssZ` (ISO 8601) string.

where:

- `YYYY` is year
- `MM` is month with leading zero
- `DD` is day with leading zero
- `T` is delimiter for time
- `hh` is hours with leading zero in 24 hour time
- `mm` is minutes with leading zero
- `ss` is seconds with leading zero
- `Z` is universal time indicator

##### Metadata

| Attribute | Value |
| --------- | ----- |
| Name      | type |
| Min Count | 0 |
| Max Count | 1 |
| Status    | unstable |

#### Relationships

The `relationships` field links a reponse to a vulnerability.

A Vulnerability must have the following relationships:

- `RESPOND`: pointing to the _SPDX Package_ or _SPDX File_ affected by this Vulnerability

A Vulnerability may include the following relationships:

- `CREATED_BY`: pointing to the _SPDX Identity_ e.g. the organization, tool or person(s) who identified the Vulnerability

## Examples

For a full SPDX document using the Vulnerability profile see [SPDX Vulnerability example](../examples/SPDXVulnerabilityJSONExample-v3.0.spdx.json).

```
"vulnerabilities": [
    {
        "id": "SPDXRef-vuln-1-hoek",
        "name": "CVE-2018-3728",
        "summary": "Moderate severity vulnerability that affects hoek",
        "details": "hoek node module before 4.2.0 and 5.0.x before 5.0.3 suffers from ... will exist on all objects.",
        "relationships": [
            {
                "to": [
                    "SPDXRef-hoek-vcs"
                ],
                "type": "AFFECTS"
            },
            {
                "to": [
                    "SPDXRef-hackerone"
                ],
                "type": "FOUND_BY"
            },
            {
                "to": [
                    "SPDXRef-hackerone"
                ],
                "type": "SUPPLIED_BY"
            },
            {
                "cwes": [
                    471
                ],
                "rating": [
                    {
                        "method": "CVSS_3",
                        "rating": null,
                        "score": {
                            "base": 6.5,
                            "exploitability": null,
                            "impact": null
                        },
                        "severity": "Medium",
                        "vector": "CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N"
                    }
                ],
                "to": [
                    "SPDXRef-hackerone"
                ],
                "type": "RATED_BY"
            }
        ],
        "externalReferences": [
            {
                "category": "ADVISORY",
                "locator": "https://hackerone.com/reports/310439"
            },
            {
                "category": "ADVISORY",
                "locator": "https://www.npmjs.com/advisories/566"
            },
            {
                "category": "ADVISORY",
                "locator": "https://snyk.io/vuln/npm:hoek:20180212",
            },
            {
                "category": "ADVISORY",
                "locator": "https://access.redhat.com/errata/RHSA-2018:1264"
            },
            {
                "category": "FIX",
                "locator": "https://github.com/hapijs/hoek/commit/32ed5c9413321fbc37da5ca81a7cbab693786dee"
            }
        ],
        "modified": "2019-10-09T23:40:00Z",
        "published": "2018-03-30T19:29:00Z",
        "witdrawn": "2050-04-01T10:00:00Z"
    }
],
"defectResponses": [
    {
        "id": "SPDXRef-response-hoek",
        "type": "INEFFECTIVE_VULNERABILITY",
        "created": "2020-07-17T14:39:00Z",
        "commment": "Only used in functional tests, not part of delivery.",
        "relationships": [
            {
                "to": [
                    "SPDXRef-vuln-1-hoek"
                ],
                "type": "RESPOND"
            },
            {
                "to": [
                    "SPDXRef-tsteenbe"
                ],
                "type": "CREATED_BY"
            }
        ]
    }
]
```