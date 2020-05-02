# 9 Review Information (deprecated)

The review information section is included for compatibility with SPDX 1.2, and is deprecated since SPDX 2.0. Any review information should use an Annotation (as described in [section 8](./8-annotations.md)) with an annotation type of `REVIEW`.

Review information can be added after the initial SPDX file has been created. The set of fields are optional and multiple instances can be added. Once a Reviewer entry is added, the Review Date associated with the review is mandatory. The Created date should not be modified as a result of the addition of information regarding the conduct of a review. A Review Comments is optional.

Fields:

## 9.1 Reviewer (deprecated) <a name="9.1"></a>

This field has been deprecated since SPDX 2.0.

**9.1.1** Purpose: This field identifies the person, organization or tool that has reviewed the SPDX file. This field is optional and thus there is no requirement for any reviewer to add a set of review information to the file. This can be considered as an equivalent to “signed off” or “reviewed by.” Additional reviewers can be added after the original version of the SPDX file is created and be appended to the original file.

**9.1.2** Intent: Here, as time progresses certain reviewers will begin to gain credibility as reliable. This field intends to make such information transparent. It may also be important for participants in the software supply chain to validate whether upstream providers have reviewed the SPDX file.

**9.1.3** Cardinality: Optional, one.

**9.1.4** Data Format: Single line of text with the following keywords.

```text
"Person: person name" and optional "(email)"
"Organization: organization" and optional "(email)"
"Tool: tool identifier - version"
```

**9.1.5** Tag: `Reviewer:`

Example:

```text
Reviewer: Person: Jane Doe ()
```

**9.1.6** RDF: Property `spdx:reviewer` in class `spdx:Review`

Example:

```text
<Review>
    <reviewer> Person: Jane Doe () </reviewer>
</Review>
```

## 9.2 Review Date (deprecated) <a name="9.2"></a>

This field has been deprecated since SPDX 2.0.

**9.2.1** Purpose: Identify when the review was done. This is to be specified according to the combined date and time in the UTC format, as specified in the ISO 8601 standard.

**9.2.2** Intent: Here, the `ReviewDate` can serve as a verification as to when the actual review was done.

**9.2.3**  Cardinality: Conditional (Mandatory, one), if there is a Reviewer.

**9.2.4** Data Format: `YYYY-MM-DDThh:mm:ssZ`

where:

* `YYYY` is year
* `MM` is month with leading zero
* `DD` is day with leading zero
* `T` is delimiter for time
* `hh` is hours with leading zero in 24 hour time
* `mm` is minutes with leading zero
* `ss` is seconds with leading zero
* `Z` is universal time indicator

**9.2.5** Tag: `ReviewDate:`

Example:

```text
ReviewDate: 2010-01-29T18:30:22Z
```

**9.2.6** RDF: Property `spdx:reviewDate` in class `spdx:Review`

Example:

```text
<Review>
    <reviewDate> 2010-01-29T18:30:22Z </reviewDate>
</Review>
```

## 9.3 Review Comment (deprecated) <a name="9.3"></a>

This field is deprecated since SPDX 2.0.

**9.3.1** Purpose: This optional free form text field permits the reviewer to provide commentary on the analysis.

**9.3.2** Intent: This allows the reviewer to provide independent assessment and note any points where there is disagreement with the analysis.

**9.3.3** Cardinality: Optional, one.

**9.3.4** Data Format: Free form text that can span multiple lines.

**9.3.5** Tag: `ReviewComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
ReviewComment: <text>All of the licenses seen in the file, are matching what was seen during manual inspection.
There are some terms that can influence the concluded license, and some alternatives may be possible,
but the concluded license is one of the options.</text>
```

**9.3.6** RDF: Property `rdfs:comment` in class `spdx:Review`

Example:

```text
<Review>
    <rdfs:comment>All of the licenses seen in the file, are matching what was seen during manual inspection.
    There are some terms that can influence the concluded license, and some alternatives may be possible,
    but the concluded license is one of the options.</rdfs:comment>
</Review>
```
