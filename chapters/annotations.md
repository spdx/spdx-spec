# 12 Annotation information fields

## 12.1 Annotator field <a name="12.1"></a>

### 12.1.1 Description

This field identifies the person, organization or tool that has commented on a snippet, file, package, or the entire document. The metadata for the annotator field is shown in Table 71.

Table 71 — Metadata for the annotator field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is an Annotation. |
| Format | Single line of text with the following keywords.<br><pre>"Person: person name" and optional  "(email)"<br>"Organization: organization" and optional "(email)"<br>"Tool: tool identifier - version"</pre> |

### 12.1.2 Intent

It may also be important for participants in the software supply chain to validate and add information on ambiguous snippets, files and packages.

### 12.1.3 Examples

EXAMPLE 1 Tag: `Annotator:`

```text
Annotator: Person: Jane Doe ()
```

EXAMPLE 2 RDF: Property `spdx:annotator` in class `spdx:Annotation`

```text
<Annotation>
    <annotator> Person: Jane Doe () </annotator>
</Annotation>
```

## 12.2 Annotation date field <a name="12.2"></a>

### 12.2.1 Description

Identify when the comment was made. This shall be specified according to the combined date and time in the UTC format, as specified in the ISO 8601 standard. The metadata for the annotation date field is shown in Table 72.

Table 72 — Metadata for the annotation date field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is an Annotation. |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24-hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |

### 12.2.2 Intent

Here, the Annotation Date can serve as a verification as to when the actual review was done.

### 12.2.3 Examples

EXAMPLE 1 Tag: `AnnotationDate:`

```text
AnnotationDate: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:annotationDate` in class `spdx:Annotation`

```text
</Annotation>
    <annotationDate> 2010-01-29T18:30:22Z </annotation Date>
</Annotation>
```

## 12.3 Annotation type field <a name="12.3"></a>

### 12.3.1 Description

This field describes the type of annotation. Annotations are usually created when someone reviews the SPDX document, and if this is the case the annotation type should be `REVIEW`. If the author wants to store extra information about one of the elements during creation, it is recommended to use the type of `OTHER`. The metadata for the annotation type field is shown in Table 73.

Table 73 — Metadata for the annotation type field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is an Annotation. |
| Format | `REVIEW` \| `OTHER` |

### 12.3.2 Intent

This allows the type of annotation to be recorded.

### 12.3.3 Examples

EXAMPLE 1 Tag: `AnnotationType:`

```text
AnnotationType: REVIEW
```

EXAMPLE 2 RDF: property `spdx:annotationType` in class `spdx:Annotation`

```text
<Annotation>
    <annotationType rdf:resource
      ="http://spdx.org/rdf/terms#annotationType_other"/>
</Annotation>
```

## 12.4 SPDX identifier reference field <a name="12.4"></a>

### 12.4.1 Description

Uniquely identify the element in an SPDX document which is being referenced. These may be referenced internally and externally with the addition of the SPDX document identifier. The metadata for the SPDX identifier reference field is shown in Table 74.

Table 74 — Metadata for the SPDX identifier reference field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is an Annotation. |
| Format | `[DocumentRef-[idstring]:]SPDXID`<br>where:<br>`["DocumentRef-"[idstring]":"]` is an optional reference to an external SPDX document as described in [6.6](document-creation-information.md#6.6)<br>`SPDXID` is a unique string containing letters, numbers, `.` and/or `-` as described in [6.3](document-creation-information.md#6.3), [7.2](package-information.md#7.2) and [8.2](file-information.md#8.2). |

### 12.4.2 Intent

There may be several versions of the same snippet, package or file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

### 12.4.3 Examples

EXAMPLE 1 Tag: `SPDXREF:`

```text
SPDXREF: SPDXRef-45
```

```text
SPDXREF: DocumentRef-spdx-tool-1.2:SPDXRef-5
```

EXAMPLE 2 RDF:

For RDF, the annotations are a property of the SPDX document, package, file, or snippet they are annotating.

```text
<File rdf:about="#SPDXRef-45">
    <annotation>
        <Annotation>
            ...
        </Annotation>
    </annotation>
</File>
```

## 12.5 Annotation comment field <a name="12.5"></a>

### 12.5.1 Description

This required free form text field permits the annotator to provide commentary on the analysis. The metadata for the annotation comment field is shown in Table 75.

Table 75 — Metadata for the annotation comment field

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is an Annotation. |
| Format | Free form text that may span multiple lines. |

### 12.5.2 Intent

This allows the annotator to provide independent assessment and note any points where there is disagreement with the analysis.

### 12.5.3 Examples

EXAMPLE 1 Tag: `AnnotationComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
AnnotationComment: <text>All of the licenses seen in the file, are matching what was seen during manual inspection.
There are some terms that can influence the concluded license, and some alternatives may be possible,
but the concluded license is one of the options.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:Annotation`

```text
<Annotation>
    <rdfs:comment>All of the licenses seen in the file, are 
    matching what was seen during manual inspection. There
    are some terms that can influence the concluded license,
    and some alternatives may be possible, but the concluded
    license is one of the options.
    </rdfs:comment>
</Annotation>
```
