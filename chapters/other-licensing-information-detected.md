# 10 Other licensing information detected fields

## 10.1 License identifier field <a name="10.1"></a>

**Description**

Provide a locally unique identifier to refer to licenses that are not found on the SPDX License List. This unique identifier can then be used in the packages and files sections of the SPDX file (Clause [7](package-information.md) and Clause [8](file-information.md), respectively).

**Intent**

Create a human readable short form license identifier for a license not on the SPDX License List. This identifier shall be unique within the SPDX file. In previous versions of SPDX, the references were required to be sequential numbers, but as of version 1.2, creators may specify references that are easier for humans to remember and mentally map.

**Metadata**

The metadata for the license identifier field is shown in Table 63.

Table 63 — Metadata for the license identifier field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (mandatory, one) if license is not on SPDX License List. |
| Format | "LicenseRef-"`[idstring]`<br>where<br>`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`. |

**Examples**

EXAMPLE 1 Tag: `LicenseID:`

```text
LicenseID: LicenseRef-1
```

```text
LicenseID: LicenseRef-Beerware-4.2
```

EXAMPLE 2 RDF: Property `spdx:licenseID` in class `spdx:ExtractedLicensingInfo`

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

## 10.2 Extracted text field <a name="10.2"></a>

**Description**

Provide a copy of the actual text of the license reference extracted from the package or file that is associated with the License Identifier to aid in future analysis.

**Intent**

Provide the actual text as found in the package or file for a license that is not on the SPDX License List.

**Metadata**

The metadata for the extracted text field is shown in Table 64.

Table 64 — Metadata for the extracted text field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one) if there is a License Identifier assigned. |
| Format | Free form text field that may span multiple lines. |

**Examples**

EXAMPLE 1 Tag: `ExtractedText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

If only short reference to license present in File:

```text
ExtractedText: <text>This software is licensed under the Beer License.</text>
```

If indeed full text of license present in File:

```text
ExtractedText: <text>"THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return </text>
```

EXAMPLE 2 RDF: Property `spdx:extractedText` in class `spdx:ExtractedLicensingInfo`

If only short reference to license present in File:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
    <licenseId>LicenseRef-Whiskeyware</licenseId>
    <extractedText>This software is licensed under the WHISKEY-WARE LICENSE.</extractedText>
</ExtractedLicensingInfo>
```

If indeed full text of license present in File:

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskeyware">
    <licenseId>LicenseRef-Whiskeyware</licenseId>
    <extractedText>""THE WHISKEY-WARE LICENSE": whiskeyfan@example.com wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a bottle of whiskey in return.</extractedText>
</ExtractedLicensingInfo>
```

## 10.3 License name field <a name="10.3"></a>

**Description**

Provide a common name of the license that is not on the SPDX list.

Use `NOASSERTION` If there is no common name or it is not known.

**Intent**

Provides a human readable name suitable for use as a title or label of the license when showing compact lists of licenses from the SPDX data to humans.

**Metadata**

The metadata for the license name field is shown in Table 65.

Table 65 — Metadata for the license name field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (mandatory, one) if license is not on SPDX License List. |
| Format | Single line of text | `NOASSERTION` |

**Examples**

EXAMPLE 1 Tag: `LicenseName:`

```text
LicenseName: Whiskey-Ware License
```

EXAMPLE 2 RDF: Property `spdx:name` in class `spdx:ExtractedLicensingInfo`

```text
<ExtractedLicensingInfo rdf:about="licenseRef-Whiskey-Ware">
   <name>Whiskey-Ware License </name>
</ExtractedLicensingInfo>
```

## 10.4 License cross reference field <a name="10.4"></a>

**Description**

Provide a pointer to the official source of a license that is not included in the SPDX License List, that is referenced by the License Identifier.

**Intent**

Canonical source for a license currently not on the SPDX License List.

**Metadata**

The metadata for the license cross reference field is shown in Table 66.

Table 66 — Metadata for the license cross reference field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..* conditional (optional, one or more) if license is not on SPDX License List. |
| Format | Uniform Resource Locator |

**Examples**

EXAMPLE 1 Tag: `LicenseCrossReference:`

```text
LicenseCrossReference: http://people.freebsd.org/~phk/
```

EXAMPLE 2 RDF: Property `rdfs:seeAlso` in class `spdx:ExtractedLicensingInfo`

```text
<ExtractedLicensingInfo rdf:about="licenseRef-1">
    <rdfs:seeAlso>http://people.freebsd.org/~phk/</rdfs:seeAlso>
</ExtractedLicensingInfo>
```

## 10.5 License comment field <a name="10.5"></a>

**Description**

This field provides a place for the SPDX file creator to record any general comments about the license.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of a license, or addition cross references.

**Metadata**

The metadata for the license comment field is shown in Table 67.

Table 67 — Metadata for the license comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines |

**Examples**

EXAMPLE 1 Tag: `LicenseComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
LicenseComment: <text>The Whiskey-Ware License has a couple of other standard variants.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:ExtractedLicensingInfo`

```text
<ExtractedLicensingInfo rdf:about="licenseRef-1">
    <rdfs:comment> The Whiskey-Ware License has a couple of
    other standard variants.</rdfs:comment>
</ExtractedLicensingInfo>
```
