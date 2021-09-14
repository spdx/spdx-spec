# 13 Review information section (deprecated)

## 13.1 Reviewer field (deprecated) <a name="13.1"></a>

This field has been deprecated since SPDX 2.0.

### 13.1.1 Description

This field identifies the person, organization or tool that has reviewed the SPDX document. This field is optional and thus there is no requirement for any reviewer to add a set of review information to the SPDX document. This can be considered as an equivalent to “signed off” or “reviewed by.” Additional reviewers can be added after the original version of the SPDX document is created and be appended to the original SPDX document. The metadata for the reviewer field is shown in Table 76.

**Table 76 — Metadata for the reviewer field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text with the following keywords.<br><pre>"Person: person name" and optional "(email)"<br>"Organization: organization" and optional "(email)"<br>"Tool: tool identifier - version"</pre> |

### 13.1.2 Intent

Here, as time progresses certain reviewers will begin to gain credibility as reliable. This field intends to make such information transparent. It may also be important for participants in the software supply chain to validate whether upstream providers have reviewed the SPDX document.

### 13.1.3 Examples

EXAMPLE 1 Tag: `Reviewer:`

```text
Reviewer: Person: Jane Doe ()
```

EXAMPLE 2 RDF: Property `spdx:reviewer` in class `spdx:Review`

```text
<Review>
    <reviewer> Person: Jane Doe () </reviewer>
</Review>
```

## 13.2 Review date field (deprecated) <a name="13.2"></a>

This field has been deprecated since SPDX 2.0.

### 13.2.1 Description

Identify when the review was done. This shall be specified according to the combined date and time in the UTC format, as specified in the ISO 8601 standard. The metadata for the review date field is shown in Table 77.

**Table 77 — Metadata for the review date field**

| Attribute | Value |
| --------- | ----- |
| Required | Conditional |
| Cardinality | 0..1 conditional (Mandatory, one), if there is a Reviewer. |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24-hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |

### 13.2.2 Intent

Here, the `ReviewDate` can serve as a verification as to when the actual review was done.

### 13.2.3 Examples

EXAMPLE 1 Tag: `ReviewDate:`

```text
ReviewDate: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:reviewDate` in class `spdx:Review`

```text
<Review>
    <reviewDate> 2010-01-29T18:30:22Z </reviewDate>
</Review>
```

## 13.3 Review comment field (deprecated) <a name="13.3"></a>

This field is deprecated since SPDX 2.0.

### 13.3.1 Description

This optional free form text field permits the reviewer to provide commentary on the analysis. The metadata for the review comment field is shown in Table 78.

**Table 78 — Metadata for the review comment field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that may span multiple lines. |

### 13.3.2 Intent

This allows the reviewer to provide independent assessment and note any points where there is disagreement with the analysis.

### 13.3.3 Examples

EXAMPLE 1 Tag: `ReviewComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
ReviewComment: <text>All of the licenses seen in the file, are matching what was seen during manual inspection.
There are some terms that can influence the concluded license, and some alternatives may be possible,
but the concluded license is one of the options.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:Review`

```text
<Review>
    <rdfs:comment>All of the licenses seen in the file, are
    matching what was seen during manual inspection. There
    are some terms that can influence the concluded license, 
    and some alternatives may be possible, but the concluded
    license is one of the options.</rdfs:comment>
</Review>
```
