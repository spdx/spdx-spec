# 4 File Information

One instance of the File Information is required for each file in the software package. It provides important meta information about a given file including licenses and copyright. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

When implementing `tag:value` format, the positioning of File elements is syntactically significant:

* Files are assumed to be associated with the Package Information that immediately precedes it, if a package exists.
* Presence of a new Package Information signals the end of the set of files associated with the preceding package, unless an explicit Relationship is used.
* If a package contains files, the File Information section must follow its Package Information section.
* If a File is not part of any package, it must precede any Package Information section reference in the SPDX document.
* The first field to start off the description of a File must be the File Name in `tag:value` format.
* File information is associated with the File Name that precedes it.
* Annotations on the file and Relationships from the file may appear after the file information, before the next file or Package Information section.

When implementing file information in RDF, the `spdx:hasFile` property is used to associate the package with the file.

## 4.1 File Name <a name="4.1"></a>

**4.1.1** Purpose: Identify the full path and filename that corresponds to the file information in this section.

**4.1.2** Intent: To aid finding the correct file which corresponds to the file information.

**4.1.3** Cardinality: Mandatory, one.

**4.1.4** Data Format: A relative filename with the root of the package archive or directory.

In general, every filename is preceded with a `./`, see [http://www.ietf.org/rfc/rfc3986.txt](http://www.ietf.org/rfc/rfc3986.txt) for syntax.

**4.1.5** Tag: `FileName:`

Example:

```text
FileName: ./package/foo.c
```

**4.1.6** RDF: Property `spdx:fileName` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <fileName>./package/foo.c</fileName>
    ...
</File>
```

## 4.2 File SPDX Identifier <a name="4.2"></a>

**4.2.1** Purpose: Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX Document Identifier.

**4.2.2** Intent: There may be several versions of the same file within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

**4.2.3** Cardinality: Mandatory, one.

**4.2.4** Data Format: "SPDXRef-"`[idstring]`

where `[idstring]` is a unique string containing letters, numbers, `.` and/or `-`.

**4.2.5** Tag: `SPDXID:`

Example:

```text
SPDXID: SPDXRef-1
```

**4.2.6** RDF: The URI for the element will follow the form: [SpdxDocumentURI]#SPDXRef-[idstring] where [SpdxDocumentURI] is the URI for the SPDX Document containing the element.

Example using `xml:base:`

```text
<rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B"
    ...
    <File rdf:about="#SPDXRef-1">
        ...
    </File>
```

Example using document URI:

```text
<File rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</File>
```

## 4.3 File Type <a name="4.3"></a>

**4.3.1** Purpose: This field provides information about the type of file identified. File Type is intrinsic to the file, independent of how the file is being used. A file may have more than one file type assigned to it, however the options to populate this field are limited to:

* `SOURCE` if the file is human readable source code (.c, .html, etc.);
* `BINARY` if the file is a compiled object, target image or binary executable (.o, .a, etc.);
* `ARCHIVE` if the file represents an archive (.tar, .jar, etc.);
* `APPLICATION` if the file is associated with a specific application type (MIME type of application/*);
* `AUDIO` if the file is associated with an audio file (MIME type of audio/* , e.g. .mp3);
* `IMAGE` if the file is associated with an picture image file (MIME type of image/*, e.g., .jpg, .gif);
* `TEXT` if the file is human readable text file (MIME type of text/*);
* `VIDEO` if the file is associated with a video file type (MIME type of video/*);
* `DOCUMENTATION` if the file serves as documentation;
* `SPDX` if the file is an SPDX document;
* `OTHER` if the file doesn't fit into the above categories (generated artifacts, data files, etc.)

**4.3.2** Intent: Here, this field is a reasonable estimation of the file type, from a developer perspective.

**4.3.3** Cardinality: Optional, multiple.

**4.3.4** Data Format: `SOURCE` | `BINARY` | `ARCHIVE` | `APPLICATION` | `AUDIO` | `IMAGE` | `TEXT` | `VIDEO` | `DOCUMENTATION` | `SPDX` | `OTHER`

**4.3.5** Tag: `FileType:`

Example:

```text
FileType: BINARY
```

Example: (for a `README.TXT`)

```text
FileType: TEXT
FileType: DOCUMENTATION
```

Example (foo.exe)

```text
FileType: BINARY
FileType: APPLICATION
```

**4.3.6** RDF: Property `spdx:fileType` in class `spdx:File`

Example:

```text
<File rdf:about="file1">
    <fileType rdf:resource="fileType_binary" />
</File>
```

Example: (where file2 is a `README.TXT`)

```text
<File rdf:about="file2">
    <fileType rdf:resource="http://spdx.org/rdf/terms#fileType_text" />
    <fileType rdf:resource="http://spdx.org/rdf/terms#fileType_documentation" />
</File>
```

## 4.4 File Checksum <a name="4.4"></a>


**4.4.1** Purpose: Provide a unique identifier to match analysis information on each specific file in a package.

**4.4.2** Intent: Here, by providing a unique identifier of each file, confusion over which version/modification of a specific file should be eliminated.

**4.4.3** Cardinality: Mandatory, one [`SHA1`][SHA-1], others may be optionally provided.

**4.4.4** Algorithm: [`SHA1`][SHA-1]is to be used on the file. Other algorithms that can be provided optionally include [`SHA224`][SHA-224], [`SHA256`][SHA-256], [`SHA384`][SHA-384], [`SHA512`][SHA-512], [`MD2`][MD2], [`MD4`][MD4], [`MD5`][MD5], [`MD6`][MD6]

**4.4.5** Data Format: In `tag:value` there are three components, an algorithm identifier (SHA1), a separator (“:”) and a checksum value. The RDF must also contain an algorithm identifier and a checksum value. For example, when the algorithm identifier is SHA1, the checksum value should be a 160 bit value represented as 40 lowercase hexadecimal digits. For other algorithms, an appropriate number of hexadecimal digits is expected.

**4.4.6** Tag: `FileChecksum:`

Example:

```text
FileChecksum: SHA1: d6a770ba38583ed4bb4525bd96e50461655d2758
```

```text
FileChecksum: MD5: 624c1abb3664f4b35547e7c73864ad24
```

**4.4.7** RDF: Property `spdx:Checksum` in class `spdx:File`

Example:

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

## 4.5 Concluded License <a name="4.5"></a>

**4.5.1** Purpose: This field contains the license the SPDX file creator has concluded as governing the file or alternative values if the governing license cannot be determined.

The options to populate this field are limited to:

A valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md);

`NONE`, if the SPDX file creator concludes there is no license available for this file; or

`NOASSERTION`, if:

(i) the SPDX file creator has attempted to, but cannot reach a reasonable objective determination;

(ii) the SPDX file creator has made no attempt to determine this field; or

(iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the License Information in File, a written explanation should be provided in the Comments on License field [(section 4.7)](#4.7). With respect to `NOASSERTION`, a written explanation in the Comments on License field [(section 4.7)](#4.7) is preferred.

**4.5.2** Intent: Here, the intent is for the SPDX file creator to analyze the License Information in File [(section 4.6)](#4.6) and other objective information, e.g., “COPYING FILE,” along with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the file.

**4.5.3** Cardinality: Mandatory, one.

**4.5.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression as defined in Appendix IV.

**4.5.5** Tag: `LicenseConcluded:`

Example:

```text
LicenseConcluded: LGPL-2.0-only
```

Example:

```text
LicenseConcluded: (LGPL-2.0-only OR LicenseRef-2)
```

**4.5.6** RDF: Property `spdx:licenseConcluded` in class `spdx:File`

Example:

```text
<File rdf:about="file">
    <licenseConcluded>LGPL-2.0-only</licenseConcluded>
</File>
```

Example:

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

## 4.6 License Information in File <a name="4.6"></a>

**4.6.1** Purpose: This field contains the license information actually found in the file, if any. This information is most commonly found in the header of the file, although it may be in other areas of the actual file. Any license information not actually in the file, e.g., “COPYING.txt” file in a top level directory, should not be reflected in this field.

The options to populate this field are limited to:

The SPDX License List short form identifier, if the license is on the SPDX License List;
A reference to the license, denoted by LicenseRef-`[idstring]`, if the license is not on the SPDX License List;

`NONE`, if the file contains no license information whatsoever; or

`NOASSERTION`, if:

(i) the SPDX file creator has made no attempt to determine this field; or

(ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If license information for more than one license is contained in the file or if the license information offers the package recipient a choice of licenses, then each of the choices should be listed as a separate entry.

**4.6.2** Intent: Here, the intent is to provide the license information actually in the file, as compared to the Concluded License field.

**4.6.3** Cardinality: Mandatory, one or many.

**4.6.4** Data Format: `<SPDX License Expression>` |

 ["DocumentRef-"`[idstring]`":"]"LicenseRef-"`[idstring]` |

 | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression

as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

"DocumentRef-"`[idstring]`: is an optional reference to an external SPDX

document as described in [section 2.6](2-document-creation-information.md#2.6)

`[idstring]` is a unique string containing letters, numbers, `.` and/or `-`

**4.6.5** Tag: `LicenseInfoInFile:`

Example:

```text
LicenseInfoInFile: GPL-2.0-only
LicenseInfoInFile: LicenseRef-2
```

**4.6.6** RDF: Property `spdx:licenseInfoInFile` in class `spdx:File`

Example:

```text
<File rdf:about="file1">
    <licenseInfoInFile rdf:resource="http://spdx.org/licenses/GPL-2.0-only" />
    <licenseInfoInFile rdf:resource="#LicenseRef-2" />
</File>
```

## 4.7 Comments on License <a name="4.7"></a>

**4.7.1** Purpose: This field provides a place for the SPDX file creator to record any relevant background references or analysis that went in to arriving at the Concluded License for a file. If the Concluded License does not match the License Information in File, this should be explained by the SPDX file creator. It is also preferable to include an explanation here when the Concluded License is `NOASSERTION`.

**4.7.2** Intent: Here, the intent is to provide the recipient of the SPDX file with a detailed explanation of how the Concluded License was determined if it does not match the License Information in File, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the file.

**4.7.3** Cardinality: Optional, one.

**4.7.4** Data Format: Free form text that can span multiple lines

**4.7.5** Tag: `LicenseComments:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
LicenseComments: <text>The concluded license was taken from the package level that the file was included in.
This information was found in the COPYING.txt file in the xyz directory.</text>
```

**4.7.6** RDF: Property `spdx:licenseComments` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <licenseComments>
        The concluded license was taken from the package level that the file
        was included in. This information was found in the COPYING.txt file
        in the xyz directory. This package has been shipped in source and binary form.
    </licenseComments>
</File>
```

## 4.8 Copyright Text <a name="4.8"></a>

**4.8.1** Purpose: Identify the copyright holder of the file, as well as any dates present. This will be a free-form text field extracted from the actual file.

The options to populate this field are limited to:

Any text relating to a copyright notice, even if not complete;

`NONE`, if the file contains no copyright information whatsoever; or

`NOASSERTION`, if

(i) the SPDX document creator has made no attempt to determine this field; or

(ii) the SPDX document creator has intentionally provided no information (no meaning should be implied from the absence of an assertion).

**4.8.2** Intent: Record any copyright notice for the file.

**4.8.3** Cardinality: Mandatory, one.

**4.8.4** Data Format: Free form text that can span multiple lines | `NONE` | `NOASSERTION`

**4.8.5** Tag: `FileCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
FileCopyrightText: <text> Copyright 2008-2010 John Smith </text>
```

**4.8.6** RDF: Property `spdx:copyrightText` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <copyrightText>
        Copyright 2008-2010 John Smith
    </copyrightText>
</File>
```

## 4.9 Artifact of Project Name (deprecated) <a name="4.9"></a>

**4.9.1** Purpose: To indicate that a file has been derived from a specific project.

**4.9.2** Intent: To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is not described in an SPDX Document, then ArtifactOf can be used.

If the project is described in another SPDX Document, then Relationship should be used.

**4.9.3** Cardinality: Optional, one or many.

**4.9.4** Data Format: Single line of text. In `tag:value` format the ArtifactOfProjectName must precede any optional ArtifactOf optional properties (e.g. ArtifactOfHomePage and ArtifactOfURI).

**4.9.5** Tag: `ArtifactOfProjectName:`

Example:

```text
ArtifactOfProjectName: Jena
```

**4.9.6** RDF: Property `spdx:artifactOf/doap:Project/doap:name`

Example:

```text
<File>
    <artifactOf>
        <doap:Project>
            <doap:name>Jena</doap:name>
        </doap:Project>
    </artifactOf>
</File>
```

## 4.10 Artifact of Project Homepage (deprecated) <a name="4.10"></a>

**4.10.1** Purpose: To indicate the location of the project from which the file has been derived.

**4.10.2** Intent: To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is described in another SPDX Document, then Relationship should be used.

**4.10.3** Cardinality: Optional, one or many.

**4.10.4** Data Format: Uniform Resource Locator | `UNKNOWN`.

In `tag:value` format all optional `ArtifactOf` fields must follow immediately below the ArtifactOfProjectName.

**4.10.5** Tag: `ArtifactOfProjectHomePage:`

Example:

```text
ArtifactOfProjectHomePage: http://www.openjena.org/
```

**4.10.6** RDF: `spdx:artifactOf/doap:Project/doap:homepage`

Example:

```text
<File>
    <artifactOf>
        <doap:Project>
            <doap:homepage >rttp://www.openjena.org/</doap:homepage>
        </doap:Project>
    </artifactOf>
</File>
```

## 4.11 Artifact of Project Uniform Resource Identifier (deprecated) <a name="4.11"></a>

**4.11.1** Purpose: To provide a linkage to the project resource in the DOAP document and permit interoperability between the different formats supported.

**4.11.2** Intent: To make it easier for recipients of the SPDX file to determine the original source of the identified file. If the project is described in another SPDX Document, then Relationship should be used.

**4.11.3** Cardinality: Optional, one or many.

**4.11.4** Data Format: Uniform Resource Identifier.

In `tag:value` format all optional ArtifactOf fields must follow immediately below the ArtifactOfProjectName.

**4.11.5** Tag: `ArtifactOfProjectURI:`

Example:

```text
ArtifactOfProjectURI: http://subversion.apache.org/doap.rdf
```

**4.11.6** RDF: `spdx:artifactOf/doap`

Example:

```text
<File>
    <artifactOf rdf:resource="http://subversion.apache.org/" />
</File>
<!-- Note: within the DOAP file at http://subversion.apache.org/doap.rdf
the value "http://subversion.apache.org/" is the URI of the describes
resource of type doap:Project -->
```

## 4.12 File Comment <a name="4.12"></a>

**4.12.1** Purpose: This field provides a place for the SPDX file creator to record any general comments about the file.

**4.12.2** Intent: Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of a file.

**4.12.3** Cardinality: Optional, one.

**4.12.4** Data Format: Free form text that can span multiple lines

**4.12.5** Tag: `FileComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
FileComment: <text>
This file appears in other packages, such as Foo and Ufoo.
</text>
```

**4.12.6** RDF: Property `rdfs:comments` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <rdfs:comment>
        This file appears in other packages, such as Foo and Ufoo.
    </rdfs:comment>
</File>
```

## 4.13 File Notice <a name="4.13"></a>

**4.13.1** Purpose: This field provides a place for the SPDX file creator to record license notices or other such related notices found in the file. This may or may not include copyright statements.

**4.13.2** Intent: Here, the intent is to provide the recipient of the SPDX file with notices that may require additional review or otherwise contribute to the determination of the Concluded License.

**4.13.3** Cardinality: Optional, one.

**4.13.4** Data Format: Free form text that can span multiple lines

**4.13.5** Tag: `FileNotice:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example:

```text
FileNotice: <text>This file is licensed under GPL.</text>
```

**4.13.6** RDF: Property `noticeText` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <noticeText>
        This file is licensed under GPL.
    </noticeText>
</File>
```

## 4.14 File Contributor <a name="4.14"></a>

**4.14.1** Purpose: This field provides a place for the SPDX file creator to record file contributors. Contributors could include names of copyright holders and/or authors who may not be copyright holders, yet contributed to the file content.

**4.14.2** Intent: Here, the intent is to provide the recipient of the SPDX file with a list of one or more contributors (credits). This is one way of providing acknowledgement to the contributors of a file. This would be useful, for example, if a recipient company wanted to contact copyright holders to inquire about alternate licensing.

**4.14.3** Cardinality: Optional, one or many.

**4.14.4** Data Format: Free form text on a single line.

**4.14.5** Tag: `FileContributor:`

In `tag:value` format single line per contributor.

Example:

```text
FileContributor: Modified by Paul Mundt lethal@linux-sh.org
FileContributor: The Regents of the University of California
FileContributor: IBM Corporation
```

**4.14.6** RDF: Property `spdx:fileContributor` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <fileContributor> Modified by Paul Mundt lethal@linux-sh.org </fileContributor>
    <fileContributor> The Regents of the University of California </fileContributor>
    <fileContributor> IBM Corporation </fileContributor>
</File>
```

## 4.15 File Attribution Text <a name="4.15"></a>

**4.15.1** Purpose: This field provides a place for the SPDX data creator to record, at the file level, acknowledgements that may be required to be communicated in some contexts. This is not meant to include the file's actual complete license text (see `LicenseConcluded` and `LicenseInfoInFile`), and may or may not include copyright notices (see also `FileCopyrightText`). The SPDX data creator may use this field to record other acknowledgements, such as particular clauses from license texts, which may be necessary or desirable to reproduce.

**4.15.2** Intent: The intent is to provide the recipient of the SPDX file with acknowledgement content at a file level, to assist redistributors of the file with reproducing those acknowledgements. This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation, advertising materials, etc.) and the SPDX data creator may or may not explain elsewhere how they intend for this field to be used.

**4.15.3** Cardinality: Optional, one or many.

**4.15.4** Data Format: free form text that can span multiple lines.

**4.15.5** Tag: `FileAttributionText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example: 

```text
FileAttributionText: <text>
All advertising materials mentioning features or use of this software must display the
following acknowledgement:  This product includes software developed by the AT&T.
</text>
```

**4.15.6** RDF: property `spdx:attributionText` in class `spdx:File`

Example:

```text
<File rdf:about="...">
    <attributionText>
        All advertising materials mentioning features or use of this software must display the
        following acknowledgement:  This product includes software developed by the AT&T.
    </attributionText>
</File>
```

## 4.16 File Dependencies (deprecated) <a name="4.16"></a>

This field is deprecated since SPDX 2.0 in favor of using [Section 7](7-relationships-between-SPDX-elements.md) which provides more granularity about relationships.

**4.16.1** Purpose: The field provides a place for the SPDX file creator to record a list of other files (referenceable within this SPDX file) which the file is a derivative of and/or depends on for the build (e.g., source file or build script for a binary program or library). The list of files may not necessarily represent the list of all file dependencies, but possibly the ones that impact the licensing and/or may be needed as part of the file distribution obligation.

**4.16.2** Intent: Here, the intent is to provide the recipient of the SPDX file with file dependency information based on the build system that created the file. These other files may impact the licensing of the file and/or may be required to satisfy the distribution obligation of the file (e.g., source files subject to a copyleft license).

**4.16.3** Cardinality: Optional, one or many.

**4.16.4** Data Format: Reference to the file within the SPDX document. For the `tag:value` format, this will be the filename. For the RDF format, it will be a reference to the actual file node.

**4.16.5** Tag: `FileDependency:`

Example:

```text
FileDependency: ./busybox-1.20.2/shell/match.h
FileDependency: ./busybox-1.20.2/shell/match.c
FileDependency: ./busybox-1.20.2/shell/ash.c
```

**4.16.6** RDF: Property `spdx:fileDependency` in class `spdx:File`

Example:

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
