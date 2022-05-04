# Annex G: How To Use SPDX in Different Scenarios

## G.1 Including security information in a SPDX document

SPDX 2.x has the concept of an External Reference for a Package to "reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package." 

The specification for External Reference identifiers (Annex F) has four defined categories:
- Security: CPE, SWID tag identifier, or reference to security information 
- Package-Manager: package identifier and locator
- Persistent-id:  identifier which is guaranteed to remain stable (persistent) over time
- Other: Use if none of the above match your use case

This section provides usage scenarios of how to leverage the Security and Persistent-id category external references specified above to refer to external security information. A complete SPDX document using these can be found in the examples directory within the SPDX code repository. Multiple instances and types of external security information may be included within a SPDX document.

Note that identifiers (e.g. CPE, GitBOM, SWID)  are spread throughout Annex F and sometimes locators refer to identifiers.

### G.1.1 Linking to an advisory

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

### G.1.2 Linking to a CSAF

To learn how to reference to [CSAF](https://docs.oasis-open.org/csaf/csaf/v2.0/cs01/csaf-v2.0-cs01.html) formatted security information
applicable to a package see the example below, and additional examples here and here.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/examples/csaf/csaf_vex/2022-evd-uc-01-a-001.json",
  "referenceType" : "advisory"
} ]
```

### G.1.3 Linking to a CycloneDX

To reference to [CycloneDX](https://cyclonedx.org) formatted security information applicable to a package see the example below.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://raw.githubusercontent.com/CycloneDX/bom-examples/ed522d1f051c364e045b87c20665003a0c4ea777/SBOM/laravel-7.12.0/bom.json",
  "referenceType" : "advisory"
} ]
```

### G.1.4 Linking to an OSV

To learn how to include a reference to [Open Source Vulnerability](https://github.com/google/osv) (OSV) formatted security information applicable to a package see the example below.

```
"externalRefs" : [ {
  "referenceCategory" : "SECURITY",
  "referenceLocator" : "https://github.com/github/advisory-database/tree/6b9d5bc96a62bb845ee71e4551a214eb1457e2c6/advisories/github-reviewed/2022/04/GHSA-2gwj-7jmv-h26r/GHSA-2gwj-7jmv-h26r.json",
  "referenceType" : "advisory"
} ]
```

### G.1.5 Linking to a GitBOM

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

### G.1.6 Linking to a vulnerability disclosure document

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

### G.1.7 Linking to a code fix for a security issue

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

### G.1.8 Linking to any security related document

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
