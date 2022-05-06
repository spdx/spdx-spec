# 31 Usage Profile section

## 31.1 Usage Scope field <a name="31.1"></a>

### 31.1.1 Description

Software packages are sometimes generated with specific Build conditions based on package supplier's license conditions and intended usage in addition to original software source code. In those cases, it prefer to package supplier clearly state into the SPDX document that the intended usage of the package as envisioned when setting the Build conditions by the package supplier.
In other cases, some specific licenses out of dual or multiple licenses of original software source code may be applied to the package according to the Build conditions. Or, the inspection conditions for packages may also have to be clearly stated for each package.

With this "Usage Scope" field, the intended usage and license conditions assumed by the package supplier are appended to the generated package in a manner that supplements those conditions contained in the source code.


Table 31.1 — Metadata for the usage scope field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | ["DocumentRef-"[idstring]":"]SPDXID \<single line of text\> \| `NONE` \| `NOASSERTION`<br>where "DocumentRef-"`[idstring]`":" is an optional reference to an external SPDX document as described in [6.6](document-creation-information.md#6.6)<br>where `SPDXID` is a string containing letters, numbers, `.` and/or `-`. to designate SPDX document/package/file as described in [6.3](document-creation-information.md#6.3), [7.2](package-information.md#7.2), [8.2](file-information.md#8.2).<br>where `<single line of text>` is the intended usage and license conditions assumed by the package supplier.<br>where `NONE` can be used to explicitly indicate there are NO other "usage scope".<br>where `NOASSERTION` can be used to explicitly indicate it is not clear if there are "usage scope" that may apply or not. |

<br>

### 31.1.2 Intent

To describe detail intended usage and/or license conditions assumed by the package supplier in a manner that supplements those conditions contained in the software.

### 31.1.3 Examples

EXAMPLE 1 Tag: `UsageScope:`

```text
UsageScope: SPDXRef-a_specific_binary_verNNN: shipped for consumer product/ medical system / automotive system
```

EXAMPLE 2 RDF: Property `spdx:UsageScope` in any `spdx:SpdxDocument`, `spdx:Package` or `spdx:File`

```text
    <UsageScope>
      <UsageScopeElement>
        <File rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82..."
      </UsageScopeElement>
      <Usage>SPDXRef-a_specific_binary_verNNN: shipped for consumer product/ medical system / automotive system
      </Usage>
    </UsageScope>
  ...

```

## 31.2 Usage Scope Comment field <a name="31.2"></a>

### 31.2.1 Description

This field provides a place for the SPDX document creator to record any general comments about the "usage scope".

Table 31.2 — Metadata for the usage scope comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that may span multiple lines, refers only to the immediately preceding usagescope.  |


### 31.2.2 Intent

To describe prerequisite assumptions of usage scope by the package supplyer.

### 31.2.3 Examples

EXAMPLE 1 Tag: `UsageScopeComment:`

```text
UsageScope: SPDXRef-a_specific_binary_verNNN: shipped for consumer product/ medical system / automotive system
UsageScopeComment: A_specific_binary_verNNN is compiled and velified as production level quality
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:UsageScope`

```text
<UsageScope>
         <rdfs:comment> A_specific_binary_verNNN is compiled and velified as production level quality</rdfs:comment>
</UsageScope>
```


## 31.3 UsageScope SPDX identifier field <a name="31.3"></a>

### 31.3.1 Description

Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX document identifier. The metadata for the SPDX identifier field is shown in Table NN.

**Table 31.3 — Metadata for the UsageScope SPDX identifier field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | "SPDXRef-"`[idstring]` <br> where `[idstring]` is a unique string containing letters, numbers, `.`, and/or `-`. |

### 31.3.2 Intent

There may be several usecase of the same package within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

### 31.3.3 Examples

EXAMPLE 1 Tag: `UsageScopeSPDXID:`

```text
UsageScopeSPDXID: SPDXRef-1
```

EXAMPLE 2 RDF: The URI for the element will follow the form:

```text
[SPDX document namespace]#[SPDX identifier]
```

See [6.5](document-creation-information.md#6.5) for the definition of the SPDX document namespace and [6.3](document-creation-information.md#6.3) for the definition of the SPDX identifier

Using `xml:base`:

```text
<rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B">
    ...
    <UsageScope rdf:about="#SPDXRef-1">
    ...
    </UsageScope>
</rdf:RDF>
```

Using document URI:

```text
<UsageScope rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</UsageScope>
```

## 31.4 Package Release Date field <a name="31.4"></a>

### 31.4.1 Description

This field provides a place for recording package release date

Table 31.4 — Metadata for the package release date

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24 hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |


### 31.4.2 Intent

Description of the package release date for strict identification of the prerequisite assumptions of usage scope by the package supplyer.

### 31.4.3 Examples

EXAMPLE 1 Tag: `PackageReleaseDate:`

```text
PackageReleaseDate: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:packageReleseDate` in class `spdx:UsageScope`

```text
<UsageScope rdf:about="...">
    <packageReleaseDate> 2010-01-29T18:30:22Z </packageReleaseDate>
</UsageScope>
```


