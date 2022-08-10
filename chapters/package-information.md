# 7 Package information section

If the SPDX information describes a package, the following fields shall be included per package.

## 7.1 Package name field <a name="7.1"></a>

The existence of the Package name fields indicates the existence of package information in the SPDX information. Hence in order to describe package information, this field is mandatory.

### 7.1.1 Description

Identify the full name of the package as given by the Package Originator ([7.6](#7.6)). The metadata for the package name field is shown in Table 13.

**Table 13 — Metadata for the package name field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Single line of text. |

### 7.1.2 Intent

The name of each package is an important conventional technical identifier to be maintained for each package.

### 7.1.3 Examples

EXAMPLE 1 Tag: `PackageName:`

```text
PackageName: glibc
```

EXAMPLE 2 RDF: Property `spdx:name` in class `spdx:Package`

```text
<Package rdf:about="...">
    <name>glibc</name>
</Package>
```

## 7.2 Package SPDX identifier field <a name="7.2"></a>

### 7.2.1 Description

Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX document identifier. The metadata for the package SPDX identifier field is shown in Table 14.

**Table 14 — Metadata for the package SPDX identifier field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | "SPDXRef-"`[idstring]` <br> where `[idstring]` is a unique string containing letters, numbers, `.`, and/or `-`. |

### 7.2.2 Intent

There may be several versions of the same package within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

### 7.2.3 Examples

EXAMPLE 1 Tag: `SPDXID:`

```text
SPDXID: SPDXRef-1
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
    <Package rdf:about="#SPDXRef-1">
    ...
    </Package>
</rdf:RDF>
```

Using document URI:

```text
<Package rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</Package>
```

## 7.3 Package version field <a name="7.3"></a>

### 7.3.1 Description

Identify the version of the package. The metadata for the package version field is shown in Table 15.

**Table 15 — Metadata for the package version field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text. |

### 7.3.2 Intent

The versioning of a package is a useful for identification purposes and for indicating later changes of the package version.

### 7.3.3 Examples

EXAMPLE 1 Tag: `PackageVersion:`

```text
PackageVersion: 2.11.1
```

EXAMPLE 2 RDF: Property `spdx:versionInfo` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <versionInfo>2.11.1</versionInfo>
    ...
</Package>
```

## 7.4 Package file name field <a name="7.4"></a>

### 7.4.1 Description

Provide the actual file name of the package, or path of the directory being treated as a package. This may include the packaging and compression methods used as part of the file name, if appropriate. The metadata for the package file name field is shown in Table 16.

**Table 16 — Metadata for the package file name field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text. |

### 7.4.2 Intent

The actual file name of the compressed file containing the package may be a significant technical element that needs to be included with each package identification information. If a grouping, like a set of files in a sub-directory, is being treated as a package, the sub-directory name may be appropriate to provide. Sub-directory name is preceded with a `./`. See [RFC 3986][rfc3986] for syntax.

### 7.4.3 Examples

EXAMPLE 1 Tag: `PackageFileName:`

```text
PackageFileName: glibc-2.11.1.tar.gz
```

Sub-directory being treated as a package:

```text
PackageFileName: ./myrootdir/mysubdir1
```

EXAMPLE 2 RDF: Property `spdx:packageFileName` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <packageFileName>glibc-2.11.1.tar.gz</packageFileName>
    ...
</Package>
```

Sub-directory being treated as a package:

```text
<Package rdf:about="...">
   ...
   <packageFileName>./myrootdir/mysubdir1</packageFileName>
   ...
</Package>
```

## 7.5 Package supplier field <a name="7.5"></a>

### 7.5.1 Description

Identify the actual distribution source for the package/directory identified in the SPDX document. This might or might not be different from the originating distribution source for the package. The name of the Package Supplier shall be an organization or recognized author and not a web site. For example, [SourceForge][] is a host website, not a supplier, the supplier for https://sourceforge.net/projects/bridge/ is “[The Linux Foundation][LinuxFoundation].”

Use `NOASSERTION` if:

- the SPDX document creator has attempted to but cannot reach a reasonable objective determination;

- the SPDX document creator has made no attempt to determine this field; or

- the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

The metadata for the package supplier field is shown in Table 17.

**Table 17 — Metadata for the package supplier field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text with one of the following:<ul><li>`NOASSERTION`</li><li>`Person:` person name and optional `(<email>)`</li><li>`Organization:` organization name and optional `(<email>)`</li></ul> |

### 7.5.2 Intent

Assist with understanding the point of distribution for the code in the package. This field is vital for ensuring that downstream package recipients can address any ambiguity or concerns that might arise with the information in the SPDX document or the contents of the package it documents.

### 7.5.3 Examples

EXAMPLE 1 Tag: `PackageSupplier:`

```text
PackageSupplier: Person: Jane Doe (jane.doe@example.com)
```

EXAMPLE 2 RDF: Property `spdx:supplier` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <supplier>Person: Jane Doe (jane.doe@example.com)</supplier>
    ...
</Package>
```

## 7.6 Package originator field <a name="7.6"></a>

### 7.6.1 Description

If the package identified in the SPDX document originated from a different person or organization than identified as Package Supplier (see [7.5](#7.5) above), this field identifies from where or whom the package originally came. In some cases, a package may be created and originally distributed by a different third party than the Package Supplier of the package. For example, the SPDX document identifies the package as [glibc][] and the Package Supplier as [Red Hat][], but the [Free Software Foundation][FSF] is the Package Originator.

Use `NOASSERTION` if:

- the SPDX document creator has attempted to but cannot reach a reasonable objective determination;

- the SPDX document creator has made no attempt to determine this field; or

- the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

The metadata for the package originator field is shown in Table 18.

**Table 18 — Metadata for the package originator field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Single line of text with one of the following:<ul><li>`NOASSERTION`</li><li>`Person:` person name and optional `(<email>)`</li><li>`Organization:` organization name and optional `(<email>)`</li></ul> |

### 7.6.2 Intent

Assist with understanding the point of origin of the code in the package. This field is vital for understanding who originally distributed a package and should help in addressing any ambiguity or concerns that might arise with the information in the SPDX document or the contents of the Package it documents.

### 7.6.3 Examples

EXAMPLE 1 Tag: `PackageOriginator:`

```text
PackageOriginator: Organization: ExampleCodeInspect (contact@example.com)
```

EXAMPLE 2 RDF: Property `spdx:originator` in class `spdx:Package`

```text
<Package rdf:about="...">
    <originator>Organization: ExampleCodeInspect 
    (contact@example.com)</originator>
</Package>
```

## 7.7 Package download location field <a name="7.7"></a>

### 7.7.1 Description

This section identifies the download Uniform Resource Locator (URL), or a specific location within a version control system (VCS) for the package at the time that the SPDX document was created.

Use:

* `NONE` if there is no download location whatsoever.
* `NOASSERTION` if:

    - the SPDX document creator has attempted to but cannot reach a reasonable objective determination;

    - the SPDX document creator has made no attempt to determine this field; or

    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

The metadata for the package download location field is shown in Table 19.

**Table 19 — Metadata for the package download location field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 1..1 |
| Format | Uniform resource locator \| VCS location \| `NONE` \| `NOASSERTION`<br><br>For version-controlled files, a VCS location is similar to a URL and has the following syntax:<br><br>`<vcs_tool>+<transport>://<host_name>[/<path_to_repository>][@<revision_tag_or_branch>][#<sub_path>]`<br><br>For git, `<revision_tag_or_branch>` is a `<rev>` as described by [gitrevisions(1)](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/gitrevisions.html). It is RECOMMENDED to use the unambiguous `refs/heads/<branch>` or `refs/tags/<tag>`, rather than only `<branch>` or `<tag>`, in order to prevent issues caused by shadowing. Formats that are local to the client (`...@...` and `:[<n>:]<path>`) or involve regular expressions (`<rev>^{/<text>}` and `:/<text>`) SHOULD NOT be used.<br><br>This VCS location compact notation (inspired and mostly adopted from [pip][pip-vcs] as of 2015-02-20) supports referencing locations in version control systems such as [Git][], [Mercurial][], [Subversion][] and [Bazaar][], and specifies the type of VCS tool using url prefixes: `git+`, `hg+`, `bzr+`, `svn+` and specific transport schemes such as SSH or HTTPS.<br><br>Specifying sub-paths, branch names, a commit hash, a revision or a tag name is recommended, and supported using the `@` delimiter for commits and the `#` delimiter for sub-paths.<br><br>Using user names and password in the `<host_name>` is not supported and should be considered as an error. User access control to URLs or VCS repositories shall be handled outside of an SPDX document.<br><br>In VCS location compact notations, the trailing slashes in `<host_name>`, `<path_to_repository>` are not significant. Leading and trailing slashes in `<sub_path>` are not significant. |

### 7.7.2 Intent

Where and how to download the exact package being referenced is critical verification and tracking data.

### 7.7.3 Examples

EXAMPLE 1 Tag: `PackageDownloadLocation:`

If ambiguous:

```text
PackageDownloadLocation: NOASSERTION
```

```text
PackageDownloadLocation: NONE
```

For a plain URL:

```text
PackageDownloadLocation: http://ftp.gnu.org/gnu/glibc/glibc-ports-2.15.tar.gz
```

For [Git][]:

SPDX supported schemes are: `git`, `git+git`, `git+https`, `git+http`, and `git+ssh`. `git` and `git+git` are equivalent.

Here are the supported forms:

```text
PackageDownloadLocation: git://git.myproject.org/MyProject
```

```text
PackageDownloadLocation: git+https://git.myproject.org/MyProject.git
```

```text
PackageDownloadLocation: git+http://git.myproject.org/MyProject
```

```text
PackageDownloadLocation: git+ssh://git.myproject.org/MyProject.git
```

```text
PackageDownloadLocation: git+git://git.myproject.org/MyProject
```

```text
PackageDownloadLocation: git+git@git.myproject.org:MyProject
```

To specify a sub-path to a file or directory inside a repository use the `#` delimiter:

```text
PackageDownloadLocation: git://git.myproject.org/MyProject#src/somefile.c
```

```text
PackageDownloadLocation: git+https://git.myproject.org/MyProject#src/Class.java
```

To specify branch names, a commit hash or a tag name, use the `@` delimiter:

```text
PackageDownloadLocation: git://git.myproject.org/MyProject.git@master
```

```text
PackageDownloadLocation: git+https://git.myproject.org/MyProject.git@v1.0
```

```text
PackageDownloadLocation: git://git.myproject.org/MyProject.git@da39a3ee5e6b4b0d3255bfef95601890afd80709
```

Sub-paths and branch names or commit hash can be combined too:

```text
PackageDownloadLocation: git+https://git.myproject.org/MyProject.git@master#/src/MyClass.cpp
```

```text
PackageDownloadLocation: git+https://git.myproject.org/MyProject@da39a3ee5e6b4b0d3255bfef95601890afd80709#lib/variable.rb
```

For [Mercurial][]:

SPDX supported schemes are: `hg+http`, `hg+https`, `hg+static-http`, and `hg+ssh`.

The supported forms are:

```text
PackageDownloadLocation: hg+http://hg.myproject.org/MyProject
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject
```

```text
PackageDownloadLocation: hg+ssh://hg.myproject.org/MyProject
```

To specify a sub-path to a file or directory inside a repository use the `#` delimiter:

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject#src/somefile.c
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject#src/Class.java
```

To pass branch names, a commit hash, a tag name or a local branch name use the `@` delimiter:

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@da39a3ee5e6b
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@2019
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@v1.0
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@special_feature
```

Sub-paths and branch names or commit hash can be combined too:

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@master#/src/MyClass.cpp
```

```text
PackageDownloadLocation: hg+https://hg.myproject.org/MyProject@da39a3ee5e6b#lib/variable.rb
```

For [Subversion][]:

SPDX supported schemes are: `svn`, `svn+svn`, `svn+http`, `svn+https`, `svn+ssh`. `svn` and `svn+svn` are equivalent.

The supported forms are:

```text
PackageDownloadLocation: svn://svn.myproject.org/svn/MyProject
```

```text
PackageDownloadLocation: svn+svn://svn.myproject.org/svn/MyProject
```

```text
PackageDownloadLocation: svn+http://svn.myproject.org/svn/MyProject/trunk
```

```text
PackageDownloadLocation: svn+https://svn.myproject.org/svn/MyProject/trunk
```

To specify a sub-path to a file or directory inside a repository use the `#` delimiter:

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject#src/somefile.c
```

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject#src/Class.java
```

This support is less important for SVN since the URL path can also contain sub-paths; this two forms are equivalent:

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject/trunk#src/somefile.c
```

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject/trunk/src/somefile.c
```

You can specify a revision using the `@` delimiter:

```text
PackageDownloadLocation: svn+https://svn.myproject.org/svn/MyProject/trunk@2019
```

Sub-paths and revisions can be combined too:

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject@123#/src/MyClass.cpp
```

```text
PackageDownloadLocation: svn+https://svn.myproject.org/MyProject/trunk@1234#lib/variable/variable.rb
```

For [Bazaar][]:

SPDX supported schemes are: `bzr+http`, `bzr+https`, `bzr+ssh`, `bzr+sftp`, `bzr+ftp`, and `bzr+lp`.

The supported forms are:

```text
PackageDownloadLocation: bzr+https://bzr.myproject.org/MyProject/trunk
```

```text
PackageDownloadLocation: bzr+http://bzr.myproject.org/MyProject/trunk
```

```text
PackageDownloadLocation: bzr+sftp://myproject.org/MyProject/trunk
```

```text
PackageDownloadLocation: bzr+ssh://myproject.org/MyProject/trunk
```

```text
PackageDownloadLocation: bzr+ftp://myproject.org/MyProject/trunk
```

```text
PackageDownloadLocation: bzr+lp:MyProject
```

To specify a sub-path to a file or directory inside a repository use the `#` delimiter:

```text
PackageDownloadLocation: bzr+https://bzr.myproject.org/MyProject/trunk#src/somefile.c
```

```text
PackageDownloadLocation: bzr+https://bzr.myproject.org/MyProject/trunk#src/Class.java
```

You can specify a revision or tag using the `@` delimiter:

```text
PackageDownloadLocation: bzr+https://bzr.myproject.org/MyProject/trunk@2019
```

```text
PackageDownloadLocation: bzr+http://bzr.myproject.org/MyProject/trunk@v1.0
```

Sub-paths and revisions can be combined too:

```text
PackageDownloadLocation: bzr+https://bzr.myproject.org/MyProject/trunk@2019#src/somefile.c
```

EXAMPLE 2 RDF: Property `spdx:downloadLocation` in class `spdx:Package`

```text
<Package rdf:about="...">
    <downloadLocation>http://ftp.gnu.org/gnu/glibc/glibc-ports-2.15.tar.gz</downloadLocation>
</Package>
```

```text
<Package rdf:about="...">
    <downloadLocation>
        git+https://git.myproject.org/MyProject.git@v10.0#src/lib.c
    </downloadLocation>
</Package>
```

```text
<Package rdf:about="...">
    <downloadLocation rdf:resource="spdx:noassertion"/>
</Package>
```

```text
<Package rdf:about="...">
    <downloadLocation rdf:resource="spdx:none"/>
</Package>
```

## 7.8 Files analyzed field <a name="7.8"></a>

### 7.8.1 Description

Indicates whether the file content of this package has been available for or subjected to analysis when creating the SPDX document. If `false`, indicates packages that represent metadata or URI references to a project, product, artifact, distribution or a component. If `false`, the package shall not contain any files. The metadata for the files analyzed field is shown in Table 20.

**Table 20 — Metadata for the files analyzed field**

| Attribute | Value |
| --------- | ----- |
| Required | No. If omitted, the default value of `true` is assumed. |
| Cardinality | 0..1 |
| Format | Boolean |

### 7.8.2 Intent

A package can refer to a project, product, artifact, distribution or a component that is external to the SPDX document.

Some examples:

1. **A bundle of external products**: Package A can be metadata about Packages and their dependencies. It may also be a loosely organized manifest of references to Packages involved in a product or project. Build or execution may transitively discover more Packages and dependencies. All of these referenced Packages can have their own SPDX documents. In this case, Package A may be defined with its File Analyzed attribute set to `false`. Package A includes External Document References to SPDX documents containing Packages referenced in all the available relationships. The Relationships section then relates the SPDX documents and contained SPDX elements with appropriate semantics per the dependencies in the scope of Package A.
2. **Package relation to external product**: Package A can have a STATIC_LINK relationship to Package B, but the binary representation of Package B is furnished by the build process and thus not contained in the file list of Package A. In this case, Package B needs to be defined with its Files Analyzed attribute set to false and all the other attributes subject to the subsequently defined constraints. Then, the relationship between Package A and Package B can be documented as described in Clause [11](relationships-between-SPDX-elements.md).
3. **File derived from external product**: Package A contains multiple files derived from an outside project. Rather than use the `artifactOf*` attributes (F.9-4.11) to describe the relation of these files to their project, the outside project can be represented by another package, Package B, whose `FilesAnalyzed` ([7.8](#7.8)) attribute is set to `false`. Each of the binary files can then have a relationship to package B (Clause 10). This allows the outside project to be represented by a single SPDX identifier (the identifier of Package B). It also allows the relationship(s) between the outside project and each of the files be represented in much more detail.

### 7.8.3 Examples

EXAMPLE 1 Tag: `FilesAnalyzed`

```text
FilesAnalyzed: false
```

EXAMPLE 2 RDF: Property `spdx:filesAnalyzed` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <filesAnalyzed>false</filesAnalyzed>
    ...
</Package>
```

## 7.9 Package verification code field <a name="7.9"></a>

### 7.9.1 Description

This field provides an independently reproducible mechanism identifying specific contents of a package based on the actual files (except the SPDX document itself, if it is included in the package) that make up each package and that correlates to the data in this SPDX document. This identifier enables a recipient to determine if any file in the original package (that the analysis was done on) has been changed and permits inclusion of an SPDX document as part of a package. The metadata for the package verification code field is shown in Table 21.

**Table 21 — Metadata for the package verification code field**

| Attribute | Value |
| --------- | ----- |
| Required | Yes |
| Cardinality | 0..1 if `FilesAnalyzed` ([7.8](#7.8)) is `true` or omitted, 0..0 (must be omitted) if `FilesAnalyzed` is `false`.|
| Algorithm | (see the algorithm below) |
| Format | Single line of text with 160 bit binary represented as 40 lowercase hexadecimal digits |

Algorithm
```text
verificationcode = 0
filelist = templist = ""
for all files in the package {
    if file is an "excludes" file, skip it /* exclude SPDX analysis file(s) */

        append templist with "SHA1(file)/n"
    }
sort templist in ascending order by SHA1 value
filelist = templist with "/n"s removed. /* ordered sequence of SHA1 values with no separators */
verificationcode = SHA1(filelist)
```

Where SHA1(file) applies a SHA1 algorithm on the contents of file and returns the result in lowercase hexadecimal digits.

Required sort order: '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f' (ASCII order)

---------------------------------------------------------------------

### 7.9.2 Intent

Provide a unique identifier based on the files inside each package, eliminating confusion over which version or modification of a specific package the SPDX document refers to. This field also permits embedding the SPDX document within the package without altering the identifier.

### 7.9.3 Examples

EXAMPLE 1 Tag: `PackageVerificationCode:` (and optionally `(excludes: FileName)`)

`FileName` is specified in [8.1](file-information.md#8.1).

```text
PackageVerificationCode: d6a770ba38583ed4bb4525bd96e50461655d2758 (excludes: ./package.spdx)
```

EXAMPLE 2 RDF: Properties `spdx:packageVerificationCodeValue`, `spdx:packageVerificationCodeExcludedFile` in class `spdx:PackageVerificationCode` in class `spdx:Package`

```text
<Package rdf:about="...">
    <packageVerificationCode>
        <PackageVerificationCode>
            <packageVerificationCodeValue>
                d6a770ba38583ed4bb4525bd96e50461655d2758
            </packageVerificationCodeValue>
            <packageVerificationCodeExcludedFile>
                ./package.spdx
            </packageVerificationCodeExcludedFile>
        </PackageVerificationCode>
    </packageVerificationCode>
</Package>
```

## 7.10 Package checksum field <a name="7.10"></a>

### 7.10.1 Description

Provide an independently reproducible mechanism that permits unique identification of a specific package that correlates to the data in this SPDX document. This identifier enables a recipient to determine if any file in the original package has been changed. If the SPDX document is to be included in a package, this value should not be calculated. The [SHA1][SHA-1] algorithm shall be used to provide the checksum by default. The metadata for the package checksum field is shown in Table 22.

**Table 22 — Metadata for the package checksum field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Algorithm | Algorithms that can be used: [`SHA1`][SHA-1], [`SHA224`][SHA-224], [`SHA256`][SHA-256], [`SHA384`][SHA-384], [`SHA512`][SHA-512], [`SHA3-256`][SHA3-256], [`SHA3-384`][SHA3-384], [`SHA3-512`][SHA3-512], [`BLAKE2b-256`][BLAKE2b-256], [`BLAKE2b-384`][BLAKE2b-384], [`BLAKE2b-512`][BLAKE2b-512], [`BLAKE3`][BLAKE3], [`MD2`][MD2], [`MD4`][MD4], [`MD5`][MD5], [`MD6`][MD6], [`ADLER32`][ADLER32] |
| Format | There are three components, an algorithm identifier (e.g. `SHA1`), a colon separator `:`, and a bit value represented as lowercase hexadecimal digits (appropriate as output to the algorithm). |

### 7.10.2 Intent

Eliminate confusion over which version or modification of a specific package the SPDX document references by providing a unique identifier of the package.

### 7.10.3 Examples

EXAMPLE 1 Tag: `PackageChecksum:`

```text
PackageChecksum: SHA1: 85ed0817af83a24ad8da68c2b5094de69833983c
```

```text
PackageChecksum: SHA256: 11b6d3ee554eedf79299905a98f9b9a04e498210b59f15094c916c91d150efcd
```

```text
PackageChecksum: MD5: 624c1abb3664f4b35547e7c73864ad24
```

EXAMPLE 2 RDF: Properties `spdx:algorithm`, `spdx:checksumValue` in class `spdx:checksum` in class `spdx:Package`

```text
<Package rdf:about="...">
    <checksum>
        <Checksum>
            <algorithm rdf:resource="spdx:checksumAlgorithm_sha1"/>
            <checksumValue>85ed0817af83a24ad8da68c2b5094de69833983c
            </checksumValue>
        </Checksum>
    </checksum>
    <checksum>
        <Checksum>
            <algorithm rdf:resource="spdx:checksumAlgorithm_sha256"/>
            <checksumValue>
                11b6d3ee554eedf79299905a98f9b9a04e498210b59f15094c916c91d150efcd
            </checksumValue>
        </Checksum>
    </checksum>
    <checksum>
        <Checksum>
            <algorithm rdf:resource="spdx:checksumAlgorithm_md5"/>
            <checksumValue>624c1abb3664f4b35547e7c73864ad24</checksumValue>
        </Checksum>
    </checksum>
</Package>
```

## 7.11 Package home page field <a name="7.11"></a>

### 7.11.1 Description

Provide a place for the SPDX document creator to record a web site that serves as the package's home page. This link can also be used to reference further information about the package referenced by the SPDX document creator.

Use:

* `NONE` if there is no package home page whatsoever.
* `NOASSERTION` if:

    - the SPDX document creator has attempted to but cannot reach a reasonable objective determination;

    - the SPDX document creator has made no attempt to determine this field; or

    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

The metadata for the package home page field is shown in Table 23.

**Table 23 — Metadata for the package home page field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Uniform resource locator \| `NONE` \| `NOASSERTION` |

### 7.11.2 Intent

Save the recipient of the SPDX document who is looking for more info from having to search for and verify a match between the package and the associated project homepage.

### 7.11.3 Examples

EXAMPLE 1 Tag: `PackageHomePage:`

```text
PackageHomePage: http://ftp.gnu.org/gnu/glibc
```

EXAMPLE 2 RDF: Property `doap:homepage` in class `spdx:Package`

```text
<Package rdf:about="...">
    <doap:homepage >http://ftp.gnu.org/gnu/glibc/</doap:homepage>
</Package>
```

This specification uses the prefix `doap:` to refer to the [DOAP][doap] namespace:

```text
http://usefulinc.com/ns/doap#
```
## 7.12 Source information field <a name="7.12"></a>

### 7.12.1 Description

Provide a place for the SPDX document creator to record any relevant background information or additional comments about the origin of the package. For example, this field might include comments indicating whether the package was pulled from a source code management system or has been repackaged. The metadata for the source information field is shown in Table 24.

Table 24 — Metadata for the source information field

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines.<br><br>In `tag:value` format this is delimited by `<text>...</text>`. |

### 7.12.2 Intent

The SPDX document creator can provide additional information to describe any anomalies or discoveries in the determination of the origin of the package.

### 7.12.3 Examples

EXAMPLE 1 Tag: `PackageSourceInfo:`

```text
PackageSourceInfo: <text>uses glibc-2_11-branch from git://sourceware.org/git/glibc.git.</text>
```

EXAMPLE 2 RDF: Property `spdx:sourceInfo` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <sourceInfo>uses glibc-2_11-branch from 
    git://sourceware.org/git/glibc.git.</sourceInfo>
    ...
</Package>
```

## 7.13 Concluded license field <a name="7.13"></a>

### 7.13.1 Description

Contain the license the SPDX document creator has concluded as governing the package or alternative values, if the governing license cannot be determined.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md);
* `NONE`, if the SPDX document creator concludes there is no license available for this package; or
* `NOASSERTION` if:

    - the SPDX document creator has attempted to but cannot reach a reasonable objective determination;

    - the SPDX document creator has made no attempt to determine this field; or

    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the Declared License ([7.15](#7.15)), a written explanation should be provided in the Comments on License field ([7.16](#7.16)). With respect to `NOASSERTION`, a written explanation in the Comments on License field ([7.16](#7.16)) is preferred. If the Concluded License field is not present in a package, it implies an equivalent meaning to `NOASSERTION`.

The metadata for the concluded license field is shown in Table 25.

**Table 25 — Metadata for the concluded license field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `<SPDX License Expression>` \| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md). |

### 7.13.2 Intent

Here, the intent is for the SPDX document creator to analyze the license information in package, and other objective information, e.g., COPYING file, together with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the package.

### 7.13.3 Examples

EXAMPLE 1 Tag: `PackageLicenseConcluded:`

```text
PackageLicenseConcluded: LGPL-2.0-only
```

```text
PackageLicenseConcluded: (LGPL-2.0-only OR LicenseRef-3)
```

EXAMPLE 2 RDF: Property `spdx:licenseConcluded` in `class spdx:Package`

```text
<Package rdf:about="...">
  ...
  <licenseConcluded rdf:resource="http://spdx.org/licenses/LGPL-2.0-only"/>
  ...
</Package>
```

```text
<Package rdf:about="...">
  ...
  <licenseConcluded>
     <DisjunctiveLicenseSet>
        <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
        <member rdf:resource="LicenseRef-3" />
     </DisjunctiveLicenseSet>
  </licenseConcluded>
    ...
</Package>
```

## 7.14 All licenses information from files field <a name="7.14"></a>

### 7.14.1 Description

This field is to contain a list of all licenses found in the package. The relationship between licenses (i.e., conjunctive, disjunctive) is not specified in this field – it is simply a listing of all licenses found.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md);
* `NONE`, if no license information is detected in any of the files; or
* `NOASSERTION`, if:

    - the SPDX document creator has made no attempt to determine this field; or
    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the All Licenses Information from Files field is not present for a package and `FilesAnalyzed` field ([7.8](#7.8)) for that same pacakge is `true` or omitted, it implies an equivalent meaning to `NOASSERTION`. The metadata for all license information from files field is shown in Table 26.

**Table 26 — Metadata for the all licenses information from files field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..\* (optional) if `FilesAnalyzed` ([7.8](#7.8)) is `true` or omitted, 0..0 (must be omitted) if `FilesAnalyzed` is `false`. |
| Format | `<SPDX License Expression>` \| `NONE` \| `NOASSERTION`<br>where:<br>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md). |

### 7.14.2 Intent

Here, the intention is to capture all license information detected in the actual files.

### 7.14.3 Examples

EXAMPLE 1 Tag: `PackageLicenseInfoFromFiles:`

```text
PackageLicenseInfoFromFiles: GPL-2.0-only
```

```text
PackageLicenseInfoFromFiles: LicenseRef-1
```

```text
PackageLicenseInfoFromFiles: LicenseRef-2
```

EXAMPLE 2 RDF: Property `spdx:licenseInfoFromFiles` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <licenseInfoFromFiles rdf:resource
      ="https://spdx.org/licenses/GPL-2.0-only" />
    <licenseInfoFromFiles rdf:resource="#LicenseRef-1" />
    <licenseInfoFromFiles rdf:resource="#LicenseRef-2" />
    ...
</Package>
```

## 7.15 Declared license field <a name="7.15"></a>

### 7.15.1 Description

List the licenses that have been declared by the authors of the package. Any license information that does not originate from the package authors, e.g. license information from a third-party repository, should not be included in this field.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md);
* `NONE`, if the package contains no license information whatsoever; or
* `NOASSERTION` if:

    - the SPDX document creator has made no attempt to determine this field; or

    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Declared License field is not present for a package, it implies an equivalent meaning to `NOASSERTION`. The metadata for the declared license field is shown in Table 27.

**Table 27 — Metadata for the declared license field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `<SPDX License Expression>` \| `NONE` \| `NOASSERTION`<br>where:<br><ul><li>`<SPDX License Expression>` is a valid SPDX License Expression as defined in Annex [D](SPDX-license-expressions.md).</li></ul> |

### 7.15.2 Intent

This is simply the license identified in text in one or more files (for example COPYING file) in the source code package. This field is not intended to capture license information obtained from an external source, such as the package website. Such information can be included in Concluded License ([7.13](#7.13)). This field may have multiple Declared Licenses, if multiple licenses are declared at the package level.

### 7.15.3 Examples

EXAMPLE 1 Tag: `PackageLicenseDeclared:`

```text
PackageLicenseDeclared: LGPL-2.0-only
```

```text
PackageLicenseDeclared: (LGPL-2.0-only AND LicenseRef-3)
```

EXAMPLE 2 RDF: Property `spdx:licenseDeclared` in class `spdx:Package`

```text
<Package rdf:about="...">
  ...
  <licenseDeclared rdf:resource="http://spdx.org/licenses/LGPL-2.0-only"/>
  ...
</Package>
```

```text
<Package rdf:about="...">
  ...
  <licenseDeclared>
     <ConjunctiveLicenseSet>
        <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only"/>
        <member rdf:resource="#LicenseRef-3" />
     </ConjunctiveLicenseSet>
  </licenseDeclared>
    ...
</Package>
```

## 7.16 Comments on license field <a name="7.16"></a>

### 7.16.1 Description

This field provides a place for the SPDX document creator to record any relevant background information or analysis that went in to arriving at the Concluded License for a package. If the Concluded License does not match the Declared License or License Information from Files, this should be explained by the SPDX document creator. It is also preferable to include an explanation here when the Concluded License is `NOASSERTION`. The metadata for the comments on license field is shown in Table 28.

**Table 28 — Metadata for the comments on license field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines.<br><br>In `tag:value` format this is delimited by `<text>...</text>`. |

### 7.16.2 Intent

Here, the intent is to provide the recipient of the SPDX document with a detailed explanation of how the Concluded License was determined if it does not match the License Information from the files or the source code package, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the package.

### 7.16.3 Examples

EXAMPLE 1 Tag: `PackageLicenseComments:`

```text
PackageLicenseComments: <text>The license for this project changed with
the release of version 1.4. The version of the project included here
post-dates the license change.</text>
```

EXAMPLE 2 RDF: Property `spdx:licenseComments` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <licenseComments>
        This package has been shipped in source and binary form.
        The binaries were created with gcc 4.5.1 and expect to link to
        compatible system run time libraries.
    </licenseComments>
    ...
</Package>
```

## 7.17 Copyright text field <a name="7.17"></a>

### 7.17.1 Description

Identify the copyright holders of the package, as well as any dates present. This will be a free form text field extracted from package information files. The options to populate this field are limited to:

* Any text related to a copyright notice, even if not complete;
* `NONE` if the package contains no copyright information whatsoever; or
* `NOASSERTION`, if

    - the SPDX document creator has made no attempt to determine this field; or

    - the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

If the Copyright Text field is not present for a package, it implies an equivalent meaning to `NOASSERTION`. The metadata for the copyright text field is shown in Table 29.

**Table 29 — Metadata for the copyright text field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines \| `NONE` \| `NOASSERTION` |

### 7.17.2 Intent

Record any copyright notices for the package.

### 7.17.3 Examples

EXAMPLE 1 Tag: `PackageCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

```text
PackageCopyrightText: <text>Copyright 2008-2010 John Smith</text>
```

EXAMPLE 2 RDF: Property `spdx:copyrightText` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <copyrightText>Copyright 2008-2010 John Smith</copyrightText>
    ...
</Package>
```

## 7.18 Package summary description field <a name="7.18"></a>

### 7.18.1 Description

This field is a short description of the package. The metadata for the package summary description field is shown in Table 30.

**Table 30 — Metadata for the package summary description field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines. |

### 7.18.2 Intent

Here, the intent is to allow the SPDX document creator to provide concise information about the function or use of the package without having to parse the source code of the actual package.

### 7.18.3 Examples

EXAMPLE 1 Tag: `PackageSummary:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

```text
PackageSummary: <text>GNU C library.</text>
```

EXAMPLE 2 RDF: Property `spdx:summary` in class `spdx:Package`

```text
<Package rdf:about="...">
    ...
    <summary>GNU C library.</summary>
    ...
</Package>
```

## 7.19 Package detailed description field <a name="7.19"></a>

### 7.19.1 Description

This field is a more detailed description of the package. It may also be extracted from the packages itself. The metadata for the package detailed description field is shown in Table 31.

**Table 31 — Metadata for the package detailed description field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text than can span multiple lines. |

### 7.19.2 Intent

Here, the intent is to provide recipients of the SPDX document with a detailed technical explanation of the functionality, anticipated use, and anticipated implementation of the package. This field may also include a description of improvements over prior versions of the package.

### 7.19.3 Examples

EXAMPLE 1 Tag: `PackageDescription:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

```text
PackageDescription: <text>The GNU C Library defines functions that are
specified by the ISO C standard, as well as additional features
specific to POSIX and other derivatives of the Unix operating system,
and extensions specific to GNU systems.</text>
```

EXAMPLE 2 RDF: Property `spdx:description` in class `spdx:Package`

```text
<Package rdf:about="...">
  ...
  <description>
    The GNU C Library defines functions that are specified by the
    ISO C standard, as well as additional features specific to POSIX and
    other derivatives of the Unix operating system, and extensions
    specific to GNU systems.
  </description>
    ...
</Package>
```

## 7.20 Package comment field <a name="7.20"></a>

### 7.20.1 Description

This field provides a place for the SPDX document creator to record any general comments about the package being described. The metadata for the package comment field is shown in Table 32.

**Table 32 — Metadata for the package comment field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | Free form text that can span multiple lines. |

### 7.20.2 Intent

Here, the intent is to provide the recipient of the SPDX document with more information determined after careful analysis of a package.

### 7.20.3 Examples

EXAMPLE 1 Tag: `PackageComment:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

```text
PackageComment: <text>The package includes several sub-packages; see Relationship
information.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:Package`

```text
<Package rdf:about="...">
  ...
  <rdfs:comment>
    The package includes several sub-packages; see Relationship information.
  </rdfs:comment>
  ...
</Package>
```

## 7.21 External reference field <a name="7.21"></a>

### 7.21.1 Description

An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package. The metadata for the external reference field is shown in Table 33.

**Table 33 — Metadata for the external reference field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | `<category> <type> <locator>`<br>where:<ul><li>`<category>` is `SECURITY` \| `PACKAGE-MANAGER` \| `PERSISTENT-ID` \| `OTHER`</li><li>`<type>` is one of the types listed in Annex [F](external-repository-identifiers.md).</li><li>`<locator>` is the unique string with no spaces necessary to access the package-specific information, metadata, or content within the target location. The format of the locator is subject to constraints defined by the `<type>`.</li></ul> |

### 7.21.2 Intent

To indicate an outside source of information, metadata enumerations, asset identifiers, or content relevant to the Package, such as a structured naming scheme identifying Packages with known security vulnerabilities.

### 7.21.3 Examples

EXAMPLE 1 Tag: `ExternalRef:`

```text
ExternalRef: SECURITY cpe23Type cpe:2.3:a:pivotal_software:spring_framework:4.1.0:*:*:*:*:*:*:*
```

```text
ExternalRef: PERSISTENT-ID swh swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2
```

```text
ExternalRef: OTHER LocationRef-acmeforge acmecorp/acmenator/4.1.3-alpha
```

EXAMPLE 2 RDF: Property `externalRef` in class `spdx:Package` of type `spdx:ExternalRef` 

For a listed location:

```text
<spdx:Package rdf:about="...">
    ...
    <spdx:externalRef>
        <spdx:ExternalRef>
            <spdx:referenceCategory rdf:resource
              ="spdx:referenceCategory_packageManager" />
            <spdx:referenceType rdf:resource
              ="http://spdx.org/rdf/refeferences/maven-central" />
            <spdx:referenceLocator>org.apache.commons:commons-lang:3.2.1
            </spdx:referenceLocator>
        </spdx:ExternalRef>
    </spdx:externalRef>
    ...
</spdx:package>
```

For an unlisted location:

```text
<spdx:Package rdf:about="...">
    ...
    <spdx:externalRef>
        <spdx:ExternalRef>
            <spdx:referenceCategory rdf:resource="spdx:referenceCategory_other" />
            <spdx:referenceType rdf:resource="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...LocationRef-acmeforge" />
            <spdx:referenceLocator>acmecorp/acmenator/4.1.3-alpha</spdx:referenceLocator>
        </spdx:ExternalRef>
    </spdx:externalRef>
    ...
</spdx:package>
```

The referenceType value for a non-listed location consists of the SPDX document namespace (see [6.5](document-creation-information.md#6.5)) followed by a `#` and the category as defined in [7.21](#7.21).

## 7.22 External reference comment field <a name="7.22"></a>

### 7.22.1 Description

To provide human-readable information about the purpose and target of the reference. The metadata for the external reference comment field is shown in Table 34.

**Table 34 — Metadata for the external reference comment field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 for each External Reference ([7.21](#7.21)) |
| Format | Free form text that can span multiple lines.<br><br>In `tag:value` format this is delimited by `<text>...</text>` and is expected to follow an External Reference ([7.21](#7.21)) so that the association can be made. |

### 7.22.2 Intent

To inform a human consumer why the reference exists, what kind of information, content or metadata can be extracted. The target's relationship to artifactOf values of files in the package might need to be explained here. If the reference is BINARY, its relationship to PackageDownloadLocation might need to be explained. If the reference is SOURCE, its relationship to PackageDownloadLocation and SourceInformation might need to be explained.

### 7.22.3 Examples

EXAMPLE 1 Tag: `ExternalRefComment:`

```text
ExternalRefComment: <text>NIST National Vulnerability Database (NVD)
describes security vulnerabilities (CVEs) which affect Vendor Product
Version acmecorp:acmenator:6.6.6.</text>
```

EXAMPLE 2 RDF: Property `rdfs:comment` in class `spdx:ExternalRef`

```text
<spdx:Package rdf:about="...">
    ...
    <spdx:externalRef>
        <spdx:ExternalRef>
            <spdx:referenceCategory rdf:resource
              ="spdx:referenceCategory_packageManager" />
            <spdx:referenceType rdf:resource
              ="http://spdx.org/rdf/refeferences/maven-central" />
            <spdx:referenceLocator>org.apache.commons:commons-lang:3.2.1
            </spdx:referenceLocator>
            <rdfs:comment>
              NIST National Vulnerability Database (NVD) describes
              security vulnerabilities (CVEs) which affect Vendor Product
              Version acmecorp:acmenator:6.6.6
            </rdfs:comment>
        </spdx:ExternalRef>
    </spdx:externalRef>
    ...
</spdx:package>
```

## 7.23 Package attribution text field <a name="7.23"></a>

### 7.23.1 Description

This field provides a place for the SPDX document creator to record, at the package level, acknowledgements that might be required to be communicated in some contexts. This is not meant to include the package's actual complete license text (see `PackageLicenseConcluded`, `PackageLicenseDeclared` and `PackageLicenseInfoFromFiles`), and might or might not include copyright notices (see also `PackageCopyrightText`). The SPDX document creator might use this field to record other acknowledgements, such as particular clauses from license texts, which might be necessary or desirable to reproduce. The metadata for the package attribution text field is shown in Table 35.

**Table 35 — Metadata for the package attribution text field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | Free form text that can span multiple lines. |

### 7.23.2 Intent

The intent is to provide the recipient of the SPDX document with acknowledgement content at a package level, to assist redistributors of the package with reproducing those acknowledgements. This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation, advertising materials, etc.) and the SPDX document creator might or might not explain elsewhere how they intend for this field to be used.

### 7.23.3 Examples

EXAMPLE 1 Tag: `PackageAttributionText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

```text
PackageAttributionText: <text>
All advertising materials mentioning features or use of this software
must display the following acknowledgement:  This product includes
software developed by the AT&T.
</text>
```

EXAMPLE 2 RDF: Property `spdx:attributionText` in class `spdx:Package`

```text
<Package rdf:about="...">
    <attributionText>
        All advertising materials mentioning features or use of this
        software must display the following acknowledgement:  This 
        product includes software developed by the AT&T.
    </attributionText>
</Package>
```

## 7.24 Primary Package Purpose field <a name="7.24"></a>

### 7.24.1 Description

This field provides information about the primary purpose of the identified package. Package Purpose is intrinsic to how the package is being used rather than the content of the package. The options to populated this field are limited to:

`APPLICATION` if the package is a software application;
`FRAMEWORK` if the package is a software framework;
`LIBRARY` if the package is a software library;
`CONTAINER` if the package refers to a container image which can be used by a container runtime application;
`OPERATING-SYSTEM` if the package refers to an operating system;
`DEVICE` if the package refers to a chipset, processor, or electronic board;
`FIRMWARE` if the package provides low level control over a device's hardware;
`SOURCE` if the package is a collection of source files;
`ARCHIVE` if the package refers to an archived collection of files (.tar, .zip, etc);
`FILE` if the package is a single file which can be independently distributed (configuration file, statically linked binary, Kubernetes deployment, etc);
`INSTALL` if the package is used to install software on disk;
`OTHER` if the package doesn't fit into the above categories.

The metadata for the Primary Package Purpose field is shown in Table 36.

**Table 36 — Metadata for the primary package purpose field**

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..* |
| Format | `APPLICATION` \| `FRAMEWORK` \| `LIBRARY` \| `CONTAINER` \| `OPERATING-SYSTEM` \| `DEVICE` \| `FIRMWARE` \| `SOURCE` \| `ARCHIVE` \| `FILE` \| `INSTALL` \| `OTHER` \|

### 7.24.2 Intent

This field is a reasonable estimate of the most likely package usage from the producer and consumer perspective from which both parties can draw conclusions about the context in which the package exists.

### 7.24.3 Examples

EXAMPLE 1 Tag: `PrimaryPackagePurpose:`

```text
PrimaryPackagePurpose: FRAMEWORK
```

EXAMPLE 2 RDF: Property `spdx:purpose` in class `spdx:Package`

```text
<Package rdf:about="cluster-api">
    <primaryPackagePurpose rdf:resource="packagePurpose_container" />
</Package>
```
  
## 7.25 Release Date <a name="7.25"></a>
### 7.25.1 Description

This field provides a place for recording the date the package was released.

Table 37 — Metadata for the release date

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24 hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |


### 7.25.2 Intent

The release date is helpful for strict identification of the prerequisite assumptions of usage.

### 7.25.3 Examples

EXAMPLE 1 Tag: `ReleaseDate:`

```text
ReleaseDate: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:releaseDate` in class `spdx:Package`

```text
<Package rdf:about="...">
    <releaseDate> 2010-01-29T18:30:22Z </releaseDate>
</Package>
```

## 7.26 Built Date <a name="7.26"></a>
### 7.26.1 Description

This field provides a place for recording the actual date the package was built.

Table 38 — Metadata for the built date

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24 hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |


### 7.26.2 Intent

The date when the package was built is helpful for strict identification of the prerequisite assumptions of usage.  
Ideally it should be recorded from build system tools directly or the creation date of the package itself.

### 7.26.3 Examples

EXAMPLE 1 Tag: `BuiltDate:`

```text
BuiltDate: 2010-01-29T18:30:22Z
```

EXAMPLE 2 RDF: Property `spdx:builtDate` in class `spdx:Package`

```text
<Package rdf:about="...">
    <builtDate> 2010-01-29T18:30:22Z </builtDate>
</Package>
```
## 7.27 Valid Until Date <a name="7.27"></a>
### 7.27.1 Description

This field provides a place for recording the end of the support period for a package from the supplier.

Table 39 — Metadata for the valid until date

| Attribute | Value |
| --------- | ----- |
| Required | No |
| Cardinality | 0..1 |
| Format | `YYYY-MM-DDThh:mm:ssZ`<br>where:<br><ul><li>`YYYY` is year</li><li>`MM` is month with leading zero</li><li>`DD` is day with leading zero</li><li>`T` is delimiter for time</li><li>`hh` is hours with leading zero in 24 hour time</li><li>`mm` is minutes with leading zero</li><li>`ss` is seconds with leading zero</li><li>`Z` is universal time indicator</li></ul> |


### 7.27.2 Intent

The date when support for the package ends from the supplier.  Usage is considered valid until this date.

### 7.27.3 Examples

EXAMPLE 1 Tag: `ValidUntilDate:`

```text
ValidUntilDate: 2030-12-30T18:00:00Z
```

EXAMPLE 2 RDF: Property `spdx:validUntilDate` in class `spdx:Package`

```text
<Package rdf:about="...">
    <validUntilDate> 2030-12-30T18:00:00Z </validUntilDate>
</Package>
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
[SHA3-256]: https://en.wikipedia.org/wiki/SHA-3
[SHA3-384]: https://en.wikipedia.org/wiki/SHA-3
[SHA3-512]: https://en.wikipedia.org/wiki/SHA-3
[BLAKE2b-256]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2
[BLAKE2b-384]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2
[BLAKE2b-512]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2
[BLAKE3]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE3
[ADLER32]: https://en.wikipedia.org/wiki/Adler-32
[SourceForge]: https://sourceforge.net/
[Subversion]: https://subversion.apache.org/
[doap]: http://usefulinc.com/ns/doap
