# 6 Other Licensing Information Detected

This section is used for any detected, declared or concluded licenses that are NOT on the SPDX License List. For the most up-to-date version of the list see: [https://spdx.org/licenses/](https://spdx.org/licenses/). The SPDX License List can also be found here in [Appendix I](appendix-I-SPDX-license-list.md).

One instance should be created for every unique license or licensing information reference detected in package that does not match one of the licenses on the SPDX License List. Each license instance should have the following fields.

Fields:

## 6.1 License Identifier <a name="6.1"></a>

**6.1.1** Purpose: Provide a locally unique identifier to refer to licenses that are not found on the SPDX License List. This unique identifier can then be used in the packages and files sections of the SPDX file (sections [3](3-package-information.md) and [4](4-file-information.md), respectively).

**6.1.2** Intent: Create a human readable short form license identifier for a license not on the SPDX License List. This identifier should be unique within the SPDX file. In previous versions of SPDX, the references were required to be sequential numbers, but as of version 1.2, creators may specify references that are easier for humans to remember and mentally map.

**6.1.3** Cardinality: Conditional (mandatory, one) if license is not on SPDX License List.

**6.1.4** Data Format: "LicenseRef-"`[idstring]`

where

`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`.

**6.1.5** Tag: `LicenseID:`

Examples:

```text
LicenseID: LicenseRef-1
```

```text
LicenseID: LicenseRef-Beerware-4.2
```

**6.1.6** RDF: Property `spdx:licenseID` in class `spdx:ExtractedLicensingInfo`

Examples:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-1">
   <licenseId>LicenseRef-1</licenseId>
</ExtractedLicensingInfo>
```

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Beerware-4.2">
    <licenseId>LicenseRef-Beerware-4.2</licenseId>
</ExtractedLicensingInfo>
```

## 6.2 Extracted Text <a name="6.2"></a>

**6.2.1** Purpose: Provide a copy of the actual text of the license reference extracted from the package or file that is associated with the License Identifier to aid in future analysis.

**6.2.2** Intent: Provide the actual text as found in the package or file for a license that is not on the SPDX License List.

**6.2.3** Cardinality: Conditional (Mandatory, one) if there is a License Identifier assigned.

**6.2.4** Data Format: Free form text field that may span multiple lines.

**6.2.5** Tag: `ExtractedText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example 1 (if only short reference to license present in File):

```text
ExtractedText: <text>This software is licensed under the Beer License.</text>
```

Example 2 (if indeed full text of license present in File):

```text
ExtractedText: <text>"THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return </text>
```

**6.2.6** RDF: Property `spdx:extractedText` in class `spdx:ExtractedLicensingInfo`

Example 1 (if only short reference to license present in File):

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
    <licenseId>LicenseRef-Whiskeyware</licenseId>
    <extractedText>This software is licensed under the WHISKEY-WARE LICENSE.</extractedText>
</ExtractedLicensingInfo>
```

Example 2 (if indeed full text of license present in File):

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
    <licenseId>LicenseRef-Whiskeyware</licenseId>
    <extractedText>""THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return.</extractedText>
</ExtractedLicensingInfo>
```

## 6.3 License Name <a name="6.3"></a>

**6.3.1** Purpose: Provide a common name of the license that is not on the SPDX list.

Use `NOASSERTION` If there is no common name or it is not known.

**6.3.2** Intent: Provides a human readable name suitable for use as a title or label of the license when showing compact lists of licenses from the SPDX data to humans.

**6.3.3** Cardinality: Conditional (mandatory, one) if license is not on SPDX License List.

**6.3.4** Data Format: Single line of text | `NOASSERTION`.

**6.3.5** Tag: `LicenseName:`

Example:

```text
LicenseName: Whiskey-Ware License
```

**6.3.6** RDF: Property `spdx:name` in class `spdx:ExtractedLicensingInfo`

Example:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskey-Ware">
   <name>Whiskey-Ware License </name>
</ExtractedLicensingInfo>
```

## 6.4 License Cross Reference <a name="6.4"></a>

**6.4.1** Purpose: Provide a pointer to the official source of a license that is not included in the SPDX License List, that is referenced by the License Identifier.

**6.4.2** Intent: Canonical source for a license currently not on the SPDX License List.

**6.4.3** Cardinality: Conditional (optional, one or more) if license is not on SPDX License List.

**6.4.4** Data Format: Uniform Resource Locator

**6.4.5** Tag: `LicenseCrossReference:`

Example:

```text
LicenseCrossReference: http://people.freebsd.org/~phk/
```

**6.4.6** RDF: Property `rdfs:seeAlso` in class `spdx:ExtractedLicensingInfo`

Example:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-1">
    <rdfs:seeAlso>http://people.freebsd.org/~phk/</rdfs:seeAlso>
</ExtractedLicensingInfo>
```

## 6.5 License Comment <a name="6.5"></a>

**6.5.1** Purpose: This field provides a place for the SPDX file creator to record any general comments about the license.

**6.5.2** Intent: Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of a license, or addition cross references.

**6.5.3** Cardinality: Optional, one.

**6.5.4** Data Format: Free form text that can span multiple lines

**6.5.5** Tag: `LicenseComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
LicenseComment: <text>The Whiskey-Ware License has a couple of other standard variants.</text>
```

**6.5.6** RDF: Property `rdfs:comment` in class `spdx:ExtractedLicensingInfo`

Example:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-1">
    <rdfs:comment> The Whiskey-Ware License has a couple of other standard variants.</rdfs:comment>
</ExtractedLicensingInfo>
```
