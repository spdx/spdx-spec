# Appendix X: Custom License Namespaces

## Rationale

The [SPDX License List](https://spdx.org/licenses) defines a curated subset of the most commonly used free software / open source licenses, together with other licenses that have been used in historical, prominent and/or widely used projects for other forms of open content. When a license is added to the SPDX License List, it receives a stable license identifier aligned to a specified license text, with markup and matching guidelines to capture non-substantive variations to the text. The SPDX Legal Team maintains the License List at https://github.com/spdx/license-list-XML and enables community participation in the review and addition of licenses.

The SPDX specification also defines a mechanism for creators of SPDX documents to define custom license texts and identifiers. This enables SPDX documents to refer to licenses that might never be included on the SPDX License List, for a variety of reasons (whether due to limited breadth of use, failure to meet the [license inclusion principles](https://github.com/spdx/license-list-XML/blob/master/DOCS/license-inclusion-principles.md), or otherwise).

These custom license identifiers are prefixed with `LicenseRef-` as defined in [Appendix IV of the SPDX 2.2 Specification](./appendix-IV-SPDX-license-expressions.md). The `LicenseRef-` identifier format was originally assumed to be used in the context of an SPDX document, so that the license text for that identifier would be specified in a corresponding [Other Licensing Information](./6-other-licensing-information-detected.md) section.

Subsequently, interest has been expressed in being able to use stable identifiers for custom licenses outside the context of a single SPDX document. For example, developers might wish to insert [SPDX short-form license identifiers](https://spdx.org/ids) into their source code, for licenses that are not on the License List. Additionally, tools may want to interchange information about custom licenses without having to assume that they are both using the same internal format to generate `LicenseRef-` identifiers, or without having to compare defined text from an Other License Information section of an SPDX document to confirm that they are in fact the same text.

## Brief overview

This appendix defines two formats and mechanisms for using the existing `LicenseRef-` format in a manner that enables stable identifier usage. Under this system:

1. each license "namespace" consists of either a standard order DNS name (such as `example.com`) or an organization name (such as `ExampleCorp`) that is under the control of the namespace maintainer's organization;
2. the namespace maintainer creates an SPDX document defining license texts and corresponding identifiers with the DNS name or organization name included, as described below, and publishes it publicly at a URL under the namespace domain;
3. the namespace and the SPDX document URL is registered with the SPDX project; and
4. identifiers in the format described below can then be used by anyone, as long as they are defined in the SPDX document available at the registered URL.

## Format 1: DNS name

For purposes of this appendix, a valid "namespace" using the DNS name format is a standard order DNS name, such as `example.com`. The DNS name, when represented here, can only use characters permitted by the license expression syntax (e.g., letters, digits, "-" and ".". It should not contain a period followed by a hyphen, as that denotes the end of the namespace. Each custom license identifier under this namespace consists of the following, in order:
1. the prefix `LicenseRef-`
2. the namespace, preceded by a **period**, and followed by a **period and hyphen** (e.g., `.example.com.-`)
3. any other characters permitted by the license expression syntax (e.g., letters, digits, "-" and ".")

For example, for the `example.com` namespace, the following could be valid identifiers:
* `LicenseRef-.example.com.-XYZ-1.0`
* `LicenseRef-.example.com.-EULA-v3.1`
* `LicenseRef-.example.com.-anything`

## Format 2: Organization name

For purposes of this appendix, a valid "namespace" using the organization name format is the organization's name, such as `ExampleCorp`. The organization name, when represented here, can only use characters permitted by the license expression syntax (e.g., letters, digits, "-" and ".". It should not contain a double hyphen, as that denotes the end of the namespace. Each custom license identifier under this namespace consists of the following, in order:
1. the prefix `LicenseRef-`
2. the namespace, preceded by **two hyphens**, and followed by **two hyphens** (e.g., `--ExampleCorp--`)
3. any other characters permitted by the license expression syntax (e.g., letters, digits, "-" and ".")

For example, for the `ExampleCorp` namespace, the following could be valid identifiers:
* `LicenseRef--ExampleCorp--XYZ-1.0`
* `LicenseRef--ExampleCorp--EULA-v3.1`
* `LicenseRef--ExampleCorp--anything`

## Prerequisites

There are two required prerequisites before using the custom license namespace format.

First, the creator of the identifiers must create an SPDX document that defines the custom identifiers and their corresponding license texts. This should be done using [Other Licensing Information](./6-other-licensing-information-detected.md) sections. The defined identifiers should be in the applicable format described above. Namespace maintainers may update this document from time to time in order to add new identifiers, but they must not modify or remove previously-published identifiers. The SPDX document should not define any licenses with identifiers other than those in its own namespace.

Second, the URL for the namespace's definition document must be registered with the SPDX project. The purpose for this is to ensure that consumers of the namespaced license identifiers are able to find the document defining the license text corresponding to those identifiers. This registration should occur using a mechanism to be provided by the SPDX project and made publicly available, which may consist of pull requests to a public repository or another custom tool for this purpose.

The registered namespace and URL must be for a domain name that is actually under the control of the namespace maintainer organization, at the domain level. As an example, the namespace `github.com` could be registered by GitHub itself, but not by the owner of an organization or repository on GitHub.

## Caveats

This format attempts to provide a stable mechanism for use of custom identifiers. However, the stability will be subject to the namespace maintainer's control. In other words, although maintainers should not modify a defined license text after they publish an identifier, there is no technical control that prohibits them from doing so. Consumers and users of custom namespaced license identifiers that are not under their own control should be aware that the maintainer might disregard the above requirements and might modify or remove existing identifiers from their definition document.

Creators of SPDX documents that use custom namespaced license identifiers are encouraged to include the [Other Licensing Information](./6-other-licensing-information-detected.md) sections in their own SPDX documents, rather than solely relying on the namespace maintainer's version. Doing so will help minimize the potential instability described in the preceding paragraph. It may also make an SPDX document more compatible with tools that are unaware of the custom license namespace format described in this appendix.
