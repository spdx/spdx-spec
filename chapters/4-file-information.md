# 8 File information fields

## 8.1 File name field <a name="4.1"></a>

**Description**

Identify the full path and filename that corresponds to the file information in this section.

**Intent**

To aid finding the correct file which corresponds to the file information.

**Metadata**

The metadata for the file name field is shown in Table 36.

Table 36 — Metadata for the file name field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | A relative filename with the root of the package archive or directory.<br><br>In general, every filename is preceded with a `./`, see [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt) for syntax. |

**Examples**

EXAMPLE 1 Tag: `FileName:`

```text
FileName: ./package/foo.c
```

EXAMPLE 2 RDF: Property `spdx:fileName` in class `spdx:File`

```text
<File rdf:about="...">
    <fileName>./package/foo.c</fileName>
    ...
</File>
```

## 8.2 File SPDX identifier field <a name="4.2"></a>

**Description**

Uniquely identify any element in an SPDX document which might be referenced by other elements. These might be referenced internally and externally with the addition of the SPDX Document Identifier.

**Intent**

There may be several versions of the same file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

**Metadata**

The metadata for the file SPDX identifier field is shown in Table 37.

Table 37 — Metadata for the file SPDX identifier field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | "SPDXRef-"`[idstring]`<br>where `[idstring]` is a unique string containing letters, numbers, `.` and/or `-`. |

**Examples**

EXAMPLE 1 Tag: `SPDXID:`

```text
SPDXID: SPDXRef-1
```

EXAMPLE 2 RDF: The URI for the element will follow the form: [SpdxDocumentURI]#SPDXRef-[idstring] where [SpdxDocumentURI] is the URI for the SPDX Document containing the element.

Using `xml:base:`

```text
<rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B"
    ...
    <File rdf:about="#SPDXRef-1">
        ...
    </File>
```

Using document URI:

```text
<File rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</File>
```

## 8.3 File type field <a name="4.3"></a>

**Description**

This field provides information about the type of file identified. File Type is intrinsic to the file, independent of how the file is being used. A file may have more than one file type assigned to it, however the options to populate this field are limited to:

* `SOURCE` if the file is human readable source code (.c, .html, etc.);
* `BINARY` if the file is a compiled object, target image or binary executable (.o, .a, etc.);
* `ARCHIVE` if the file represents an archive (.tar, .jar, etc.);
* `APPLICATION` if the file is associated with a specific application type (MIME type of application/\*);
* `AUDIO` if the file is associated with an audio file (MIME type of audio/* , e.g. .mp3);
* `IMAGE` if the file is associated with an picture image file (MIME type of image/\*, e.g., .jpg, .gif);
* `TEXT` if the file is human readable text file (MIME type of text/\*);
* `VIDEO` if the file is associated with a video file type (MIME type of video/\*);
* `DOCUMENTATION` if the file serves as documentation;
* `SPDX` if the file is an SPDX document;
* `OTHER` if the file doesn't fit into the above categories (generated artifacts, data files, etc.)

**Intent**

Here, this field is a reasonable estimation of the file type, from a developer perspective.

**Metadata**

The metadata for the file type field is shown in Table 38.

Table 38 — Metadata for the file type field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | `SOURCE` \| `BINARY` \| `ARCHIVE` \| `APPLICATION` \| `AUDIO` \| `IMAGE` \| `TEXT` \| `VIDEO` \| `DOCUMENTATION` \| `SPDX` \| `OTHER` |

**Examples**

EXAMPLE 1 Tag: `FileType:`

```text
FileType: BINARY
```

For a `README.TXT`

```text
FileType: TEXT
FileType: DOCUMENTATION
```

foo.exe

```text
FileType: BINARY
FileType: APPLICATION
```

EXAMPLE 2 RDF: Property `spdx:fileType` in class `spdx:File`

```text
<File rdf:about="file1">
    <fileType rdf:resource="fileType_binary" />
</File>
```

Where file2 is a `README.TXT`

```text
<File rdf:about="file2">
    <fileType rdf:resource="http://spdx.org/rdf/terms#fileType_text" />
    <fileType rdf:resource="http://spdx.org/rdf/terms#fileType_documentation" />
</File>
```

## 8.4 File checksum field <a name="4.4"></a>

**Description**

Provide a unique identifier to match analysis information on each specific file in a package.

**Intent**

Here, by providing a unique identifier of each file, confusion over which version/modification of a specific file should be eliminated.

**Metadata**

The metadata for the file checksum field is shown in Table 39.

Table 39 — Metadata for the file checksum field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 [`SHA1`][SHA-1], others may be optionally provided. |
| Algorithm | [`SHA1`][SHA-1] is to be used on the file. Other algorithms that can be provided optionally include [`SHA224`][SHA-224], [`SHA256`][SHA-256], [`SHA384`][SHA-384], [`SHA512`][SHA-512], [`MD2`][MD2], [`MD4`][MD4], [`MD5`][MD5], [`MD6`][MD6] |
| Format | In `tag:value` there are three components, an algorithm identifier (SHA1), a separator (“:”) and a checksum value. The RDF shall also contain an algorithm identifier and a checksum value. For example, when the algorithm identifier is SHA1, the checksum value should be a 160 bit value represented as 40 lowercase hexadecimal digits. For other algorithms, an appropriate number of hexadecimal digits is expected. |

**Examples**

EXAMPLE 1 Tag: `FileChecksum:`

```text
FileChecksum: SHA1: d6a770ba38583ed4bb4525bd96e50461655d2758
```

```text
FileChecksum: MD5: 624c1abb3664f4b35547e7c73864ad24
```

EXAMPLE 2 RDF: Property `spdx:Checksum` in class `spdx:File`

```text
<File rdf:about="...">
    <checksum>
        <Checksum>
            <algorithm rdf:resource="http://spdx.org/rdf/terms#checksumAlgorithm_sha1"/>
            <checksumValue>d6a770ba38583ed4bb4525bd96e50461655d2758
            </checksumValue>
        </Checksum>
    </checksum>
    <checksum>
        <Checksum>
            <algorithm rdf:resource="http://spdx.org/rdf/terms#checksumAlgorithm_md5"/>
            <checksumValue> 624c1abb3664f4b35547e7c73864ad24
            </checksumValue>
        </Checksum>
    </checksum>
</File>
```

## 8.5 Concluded license field <a name="4.5"></a>

**Description**

This field contains the license the SPDX file creator has concluded as governing the file or alternative values if the governing license cannot be determined.

The options to populate this field are limited to:

A valid SPDX License Expression as defined in Annex [D](appendix-IV-SPDX-license-expressions.md);

`NONE`, if the SPDX file creator concludes there is no license available for this file; or

`NOASSERTION`, if:

- the SPDX file creator has attempted to, but cannot reach a reasonable objective determination;

- the SPDX file creator has made no attempt to determine this field; or

- the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the License Information in File, a written explanation should be provided in the Comments on License field ([8.7](#4.7)). With respect to `NOASSERTION`, a written explanation in the Comments on License field ([8.7](#4.7)) is preferred.

**Intent**

Here, the intent is for the SPDX file creator to analyze the License Information in File ([8.6](#4.6)) and other objective information, e.g., “COPYING FILE,” along with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the file.

**Metadata**

The metadata for the concluded license field is shown in Table 40.

Table 40 — Metadata for the concluded license field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | `<SPDX License Expression>` \| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Annex [D](appendix-IV-SPDX-license-expressions.md). |

**Examples**

EXAMPLE 1 Tag: `LicenseConcluded:`

```text
LicenseConcluded: LGPL-2.0-only
```

```text
LicenseConcluded: (LGPL-2.0-only OR LicenseRef-2)
```

EXAMPLE 2 RDF: Property `spdx:licenseConcluded` in class `spdx:File`

```text
<File rdf:about="file">
    <licenseConcluded>LGPL-2.0-only</licenseConcluded>
</File>
```

```text
<File rdf:about="...">
    <licenseConcluded>
        <DisjunctiveLicenseSet>
            <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only"/>
            <member rdf:resource="#LicenseRef-2"/>
        </DisjunctiveLicenseSet>
    </licenseConcluded>
</File>
```

## 8.6 License information in file field <a name="4.6"></a>

**Description**

This field contains the license information actually found in the file, if any. This information is most commonly found in the header of the file, although it might be in other areas of the actual file. Any license information not actually in the file, e.g., “COPYING.txt” file in a top level directory, should not be reflected in this field.

The options to populate this field are limited to:

The SPDX License List short form identifier, if the license is on the SPDX License List;
A reference to the license, denoted by LicenseRef-`[idstring]`, if the license is not on the SPDX License List;

`NONE`, if the file contains no license information whatsoever; or

`NOASSERTION`, if:

- the SPDX file creator has made no attempt to determine this field; or

- the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If license information for more than one license is contained in the file or if the license information offers the package recipient a choice of licenses, then each of the choices should be listed as a separate entry.

**Intent**

Here, the intent is to provide the license information actually in the file, as compared to the Concluded License field.

**Metadata**

The metadata for the license information in file field is shown in Table 41.

Table 41 — Metadata for the license information in file field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..* |
| Format | `<SPDX License Expression>` \|<br>["DocumentRef-"`[idstring]`":"]"LicenseRef-"`[idstring]` \|<br>\| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a<br>valid SPDX License Expression<br>as defined in Annex [D](appendix-IV-SPDX-license-expressions.md).<br>"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX<br>document as described in [6.6](2-document-creation-information.md#2.6)<br>`[idstring]` is a unique string containing letters, numbers, `.` and/or `-` |

**Examples**

EXAMPLE 1 Tag: `LicenseInfoInFile:`

```text
LicenseInfoInFile: GPL-2.0-only
LicenseInfoInFile: LicenseRef-2
```

EXAMPLE 2 RDF: Property `spdx:licenseInfoInFile` in class `spdx:File`

```text
<File rdf:about="file1">
    <licenseInfoInFile rdf:resource="http://spdx.org/licenses/GPL-2.0-only" />
    <licenseInfoInFile rdf:resource="#LicenseRef-2" />
</File>
```

## 8.7 Comments on license field <a name="4.7"></a>

**Description**

This field provides a place for the SPDX file creator to record any relevant background references or analysis that went in to arriving at the Concluded License for a file. If the Concluded License does not match the License Information in File, this should be explained by the SPDX file creator. It is also preferable to include an explanation here when the Concluded License is `NOASSERTION`.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with a detailed explanation of how the Concluded License was determined if it does not match the License Information in File, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the file.

**Metadata**

The metadata for the comments on license field is shown in Table 42.

Table 42 — Metadata for the comments on license field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines |

**Examples**

EXAMPLE 1 Tag: `LicenseComments:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
LicenseComments: <text>The concluded license was taken from the package level that the file was included in.
This information was found in the COPYING.txt file in the xyz directory.</text>
```

EXAMPLE 2 RDF: Property `spdx:licenseComments` in class `spdx:File`

```text
<File rdf:about="...">
    <licenseComments>
        The concluded license was taken from the package level that the file
        was included in. This information was found in the COPYING.txt file
        in the xyz directory. This package has been shipped in source and binary form.
    </licenseComments>
</File>
```

## 8.8 Copyright text field <a name="4.8"></a>

**Description**

Identify the copyright holder of the file, as well as any dates present. This shall be a free-form text field extracted from the actual file.

The options to populate this field are limited to:

Any text relating to a copyright notice, even if not complete;

`NONE`, if the file contains no copyright information whatsoever; or

`NOASSERTION`, if

- the SPDX document creator has made no attempt to determine this field; or

- the SPDX document creator has intentionally provided no information (no meaning should be implied from the absence of an assertion).

**Intent**

Record any copyright notice for the file.

**Metadata**

The metadata for the copyright text field is shown in Table 43.

Table 43 — Metadata for the copyright text field

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Free form text that can span multiple lines \| `NONE` \| `NOASSERTION` |

**Examples**

EXAMPLE 1 Tag: `FileCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
FileCopyrightText: <text> Copyright 2008-2010 John Smith </text>
```

EXAMPLE 2 RDF: Property `spdx:copyrightText` in class `spdx:File`

```text
<File rdf:about="...">
    <copyrightText>
        Copyright 2008-2010 John Smith
    </copyrightText>
</File>
```

## 8.9 Artifact of project name field (deprecated) <a name="4.9"></a>

**Description**

To indicate that a file has been derived from a specific project.

**Intent**

To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is not described in an SPDX Document, then `ArtifactOf` can be used.

If the project is described in another SPDX Document, then Relationship should be used.

**Metadata**

The metadata for the artifact of project name field is shown in Table 44.

Table 44 — Metadata for the artifact of project name field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Single line of text. In `tag:value` format the ArtifactOfProjectName shall precede any optional ArtifactOf optional properties (e.g. ArtifactOfHomePage and ArtifactOfURI). |

**Examples**

EXAMPLE 1 Tag: `ArtifactOfProjectName:`

```text
ArtifactOfProjectName: Jena
```

EXAMPLE 2 RDF: Property `spdx:artifactOf/doap:Project/doap:name`

```text
<File>
    <artifactOf>
        <doap:Project>
            <doap:name>Jena</doap:name>
        </doap:Project>
    </artifactOf>
</File>
```

## 8.10 Artifact of project homepage field (deprecated) <a name="4.10"></a>

**Description**

To indicate the location of the project from which the file has been derived.

**Intent**

To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is described in another SPDX Document, then `Relationship` should be used.

**Metadata**

The metadata for the artifact of project homepage field is shown in Table 45.

Table 45 — Metadata for the artifact of project homepage field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Uniform Resource Locator \| `UNKNOWN`.<br><br>In `tag:value` format all optional `ArtifactOf` fields shall follow immediately below the ArtifactOfProjectName. |

**Examples**

EXAMPLE 1 Tag: `ArtifactOfProjectHomePage:`

```text
ArtifactOfProjectHomePage: http://www.openjena.org/
```

EXAMPLE 2 RDF: `spdx:artifactOf/doap:Project/doap:homepage`

```text
<File>
    <artifactOf>
        <doap:Project>
            <doap:homepage >rttp://www.openjena.org/</doap:homepage>
        </doap:Project>
    </artifactOf>
</File>
```

## 8.11 Artifact of project uniform resource identifier field (deprecated) <a name="4.11"></a>

**Description**

To provide a linkage to the project resource in the DOAP document and permit interoperability between the different formats supported.

**Intent**

To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is described in another SPDX Document, then `Relationship` should be used.

**Metadata**

The metadata for the artifact of project uniform resource identifier field is shown in Table 46.

Table 46 — Metadata for the artifact of project uniform resource identifier field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Uniform Resource Identifier.<br><br>In `tag:value` format all optional ArtifactOf fields shall follow immediately below the ArtifactOfProjectName. |

In `tag:value` format all optional ArtifactOf fields shall follow immediately below the ArtifactOfProjectName.

**Examples**

EXAMPLE 1 Tag: `ArtifactOfProjectURI:`

```text
ArtifactOfProjectURI: http://subversion.apache.org/doap.rdf
```

EXAMPLE 2 RDF: `spdx:artifactOf/doap`

```text
<File>
    <artifactOf rdf:resource="http://subversion.apache.org/" />
</File>
<!-- Note: within the DOAP file at http://subversion.apache.org/doap.rdf
the value "http://subversion.apache.org/" is the URI of the describes
resource of type doap:Project -->
```

## 8.12 File comment field <a name="4.12"></a>

**Description**

This field provides a place for the SPDX file creator to record any general comments about the file.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of a file.

**Metadata**

The metadata for the file comment field is shown in Table 47.

Table 47 — Metadata for the file comment field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that may span multiple lines |

**4.12.3** Cardinality: Optional, one.

**4.12.4** Data Format: Free form text that may span multiple lines

**Examples**

EXAMPLE 1 Tag: `FileComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
FileComment: <text>
This file appears in other packages, such as Foo and Ufoo.
</text>
```

EXAMPLE 2 RDF: Property `rdfs:comments` in class `spdx:File`

```text
<File rdf:about="...">
    <rdfs:comment>
        This file appears in other packages, such as Foo and Ufoo.
    </rdfs:comment>
</File>
```

## 8.13 File notice field <a name="4.13"></a>

**Description**

This field provides a place for the SPDX file creator to record license notices or other such related notices found in the file. This might or might not include copyright statements.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with notices that may require additional review or otherwise contribute to the determination of the Concluded License.

**Metadata**

The metadata for the file notice field is shown in Table 48.

Table 48 — Metadata for the file notice field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines |

**Examples**

EXAMPLE 1 Tag: `FileNotice:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
FileNotice: <text>This file is licensed under GPL.</text>
```

EXAMPLE 2 RDF: Property `noticeText` in class `spdx:File`

```text
<File rdf:about="...">
    <noticeText>
        This file is licensed under GPL.
    </noticeText>
</File>
```

## 8.14 File contributor field <a name="4.14"></a>

**Description**

This field provides a place for the SPDX file creator to record file contributors. Contributors could include names of copyright holders and/or authors who might not be copyright holders, yet contributed to the file content.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with a list of one or more contributors (credits). This is one way of providing acknowledgement to the contributors of a file. This would be useful, for example, if a recipient company wanted to contact copyright holders to inquire about alternate licensing.

**Metadata**

The metadata for the file contributor field is shown in Table 49.

Table 49 — Metadata for the file contributor field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Free form text on a single line. |

**Examples**

EXAMPLE 1 Tag: `FileContributor:`

In `tag:value` format single line per contributor.

```text
FileContributor: Modified by Paul Mundt lethal@linux-sh.org
FileContributor: The Regents of the University of California
FileContributor: IBM Corporation
```

EXAMPLE 2 RDF: Property `spdx:fileContributor` in class `spdx:File`

```text
<File rdf:about="...">
    <fileContributor> Modified by Paul Mundt lethal@linux-sh.org </fileContributor>
    <fileContributor> The Regents of the University of California </fileContributor>
    <fileContributor> IBM Corporation </fileContributor>
</File>
```

## 8.15 File attribution text field <a name="4.15"></a>

**Description**

This field provides a place for the SPDX data creator to record, at the file level, acknowledgements that might be required to be communicated in some contexts. This is not meant to include the file's actual complete license text (see `LicenseConcluded` and `LicenseInfoInFile`), and might or might not include copyright notices (see also `FileCopyrightText`). The SPDX data creator might use this field to record other acknowledgements, such as particular clauses from license texts, which might be necessary or desirable to reproduce.

**Intent**

The intent is to provide the recipient of the SPDX file with acknowledgement content at a file level, to assist redistributors of the file with reproducing those acknowledgements. This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation, advertising materials, etc.) and the SPDX data creator might or might not explain elsewhere how they intend for this field to be used.

**Metadata**

The metadata for the file attribution text field is shown in Table 50.

Table 50 — Metadata for the file attribution text field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Free form text that can span multiple lines. |

**Examples**

EXAMPLE 1 Tag: `FileAttributionText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
FileAttributionText: <text>
All advertising materials mentioning features or use of this software must display the
following acknowledgement:  This product includes software developed by the AT&T.
</text>
```

EXAMPLE 2 RDF: property `spdx:attributionText` in class `spdx:File`

```text
<File rdf:about="...">
    <attributionText>
        All advertising materials mentioning features or use of this software must display the
        following acknowledgement:  This product includes software developed by the AT&T.
    </attributionText>
</File>
```

## 8.16 File dependencies field (deprecated) <a name="4.16"></a>

This field is deprecated since SPDX 2.0 in favor of using Clause [11](7-relationships-between-SPDX-elements.md) which provides more granularity about relationships.

**Description**

The field provides a place for the SPDX file creator to record a list of other files (referenceable within this SPDX file) which the file is a derivative of and/or depends on for the build (e.g., source file or build script for a binary program or library). The list of files might not necessarily represent the list of all file dependencies, but possibly the ones that impact the licensing and/or might be needed as part of the file distribution obligation.

**Intent**

Here, the intent is to provide the recipient of the SPDX file with file dependency information based on the build system that created the file. These other files might impact the licensing of the file and/or might be required to satisfy the distribution obligation of the file (e.g., source files subject to a copyleft license).

**Metadata**

The metadata for the file dependencies field is shown in Table 51.

Table 51 — Metadata for the file dependencies field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Reference to the file within the SPDX document. For the `tag:value` format, this will be the filename. For the RDF format, it shall be a reference to the actual file node. |

**Examples**

EXAMPLE 1 Tag: `FileDependency:`

```text
FileDependency: ./busybox-1.20.2/shell/match.h
FileDependency: ./busybox-1.20.2/shell/match.c
FileDependency: ./busybox-1.20.2/shell/ash.c
```

EXAMPLE 2 RDF: Property `spdx:fileDependency` in class `spdx:File`

```text
<File rdf:nodeID="A0">
    <fileName>./package/source1.java</fileName>
</File>
```

```text
<File rdf:nodeID="A1">
    <fileName>./package/source2.java</fileName>
</File>
```

```text
<File rdf:nodeID="A3">
  <fileName>./package/source3.java</fileName>
</File>
```

```text
<File rdf:about="...">
    <fileName>./package/mylibrary.jar</fileName>
    <fileDependency rdf:nodeID="A0"/>
    <fileDependency rdf:nodeID="A1"/>
    <fileDependency rdf:nodeID="A2"/>
</File>
```

[Bazaar]: http://bazaar.canonical.com/
[FSF]: http://www.fsf.org/
[Git]: https://git-scm.com/
[glibc]: https://www.gnu.org/software/libc/
[LinuxFoundation]: https://www.linuxfoundation.org/
[MD2]: https://tools.ietf.org/html/rfc1319
[MD4]: https://tools.ietf.org/html/rfc1320
[MD5]: https://tools.ietf.org/html/rfc1321
[MD6]: https://groups.csail.mit.edu/cis/md6/
[Mercurial]: https://www.mercurial-scm.org/
[pip-vcs]: https://pip.pypa.io/en/latest/reference/pip_install.html#vcs-support
[Red Hat]: https://www.redhat.com/
[rfc3986]: https://tools.ietf.org/html/rfc3986
[SHA-1]: https://tools.ietf.org/html/rfc3174
[SHA-224]: https://en.wikipedia.org/wiki/SHA-2
[SHA-256]: https://tools.ietf.org/html/rfc6234
[SHA-384]: https://en.wikipedia.org/wiki/SHA-2
[SHA-512]: https://en.wikipedia.org/wiki/SHA-2
