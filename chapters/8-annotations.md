# 8 Annotations

## 8.1 Annotator <a name="8.1"></a>

**8.1.1** Purpose: This field identifies the person, organization or tool that has commented on a file, package, or the entire document.

**8.1.2** Intent: It may also be important for participants in the software supply chain to validate and add information on ambiguous files, and packages.

**8.1.3** Cardinality: Conditional (Mandatory, one), if there is an Annotation.

**8.1.4** Data Format: Single line of text with the following keywords.

```text
"Person: person name" and optional  "(email)"
"Organization: organization" and optional "(email)"
"Tool: tool identifier - version"
```

**8.1.5**  Tag: `Annotator:`

Example:

```text
Annotator: Person: Jane Doe ()
```

**8.1.6** RDF: Property `spdx:annotator` in class `spdx:Annotation`

Example:

```text
<Annotation>
    <annotator> Person: Jane Doe () </annotator>
</Annotation>
```

## 8.2 Annotation Date <a name="8.2"></a>

**8.2.1** Purpose: Identify when the comment was made. This is to be specified according to the combined date and time in the UTC format, as specified in the ISO 8601 standard.

**8.2.2** Intent: Here, the Annotation Date can serve as a verification as to when the actual review was done.

**8.2.3** Cardinality: Conditional (Mandatory, one), if there is an Annotation.

**8.2.4** Data Format: `YYYY-MM-DDThh:mm:ssZ`

where:

* `YYYY` is year
* `MM` is month with leading zero
* `DD` is day with leading zero
* `T` is delimiter for time
* `hh` is hours with leading zero in 24 hour time
* `mm` is minutes with leading zero
* `ss` is seconds with leading zero
* `Z` is universal time indicator

**8.2.5** Tag: `AnnotationDate:`

Example:

```text
AnnotationDate: 2010-01-29T18:30:22Z
```

**8.2.6** RDF: Property `spdx:annotationDate` in class `spdx:Annotation`

Example:

```text
</Annotation>
    <annotationDate> 2010-01-29T18:30:22Z </annotation Date>
</Annotation>
```

## 8.3 Annotation Type <a name="8.3"></a>

**8.3.1** Purpose: This field describes the type of annotation. Annotations are usually created when someone reviews the file, and if this is the case the annotation type should be `REVIEW`. If the author wants to store extra information about one of the elements during creation, it is recommended to use the type of `OTHER`.

**8.3.2** Intent: This allows the type of annotation to be recorded.

**8.3.3** Cardinality: Conditional (Mandatory, one), if there is an Annotation.

**8.3.4** Data Format: `REVIEW` | `OTHER`

**8.3.5** Tag: `AnnotationType:`

Example:

```text
AnnotationType: REVIEW
```

**8.3.6** RDF: property `spdx:annotationType` in class `spdx:Annotation`

Example:

```text
<Annotation>
    <annotationType rdf:resource="http://spdx.org/rdf/terms#annotationType_other"/>
</Annotation>
```

## 8.4 SPDX Identifier Reference <a name="8.4"></a>

**8.4.1** Purpose: Uniquely identify the element in an SPDX document which is being referenced. These may be referenced internally and externally with the addition of the SPDX Document Identifier.

**8.4.2** Intent: There may be several versions of the same package or file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

**8.4.3** Cardinality: Conditional (Mandatory, one), if there is an Annotation.

**8.4.4** Data Format: `[DocumentRef-[idstring]:]SPDXID`

where:

`["DocumentRef-"[idstring]":"]` is an optional reference to an external SPDX document as described in section 2.6
`SPDXID` is a unique string containing letters, numbers, `.` and/or `-` as described in Sections 2.3, 3.2 and 4.2.

**8.4.5** Tag: `SPDXREF:`

Example:

```text
SPDXREF: SPDXRef-45
```

Example:

```text
SPDXREF: DocumentRef-spdx-tool-1.2:SPDXRef-5
```

**8.4.6** RDF:

For RDF, the annotations are a property of the SPDX Document, Package, File, or Snippet they are annotating.

```text
<File rdf:about="#SPDXRef-45">
    <annotation>
        <Annotation>
            ...
        </Annotation>
    </annotation>
</File>
```

## 8.5 Annotation Comment <a name="8.5"></a>

**8.5.1** Purpose: This required free form text field permits the annotator to provide commentary on the analysis.

**8.5.2** Intent: This allows the annotator to provide independent assessment and note any points where there is disagreement with the analysis.

**8.5.3** Cardinality: Conditional (Mandatory, one), if there is an Annotation.

**8.5.4** Data Format: Free form text that can span multiple lines.

**8.5.5** Tag: `AnnotationComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
AnnotationComment: <text>All of the licenses seen in the file, are matching what was seen during manual inspection.
There are some terms that can influence the concluded license, and some alternatives may be possible,
but the concluded license is one of the options.</text>
```

**8.5.6** RDF: Property `rdfs:comment` in class `spdx:Annotation`

Example:

```text
<Annotation>
    <rdfs:comment>All of the licenses seen in the file, are matching what was seen during manual inspection.
    There are some terms that can influence the concluded license, and some alternatives may be possible,
    but the concluded license is one of the options.
    </rdfs:comment>
</Annotation>
```
