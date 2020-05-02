# 3 Package Information

If you organize your SPDX information by grouping into packages, then one instance of the Package Information is required per package being described. A package can contain sub-packages, but the information in this section is a reference to the entire contents of the package listed. Starting with SPDX 2.0, it is not necessary to have a package wrapping a set of files.

Cardinality: Optional, one or many.

In `tag:value` format, the order in which package and files occur is syntactically significant.

* A new Package Information section is denoted by the [Package Name](#3.1) field.
* All Package Information fields must be grouped together before the start of a [Files section](4-file-information.md), if file(s) are present.
* All files contained in a package must immediately follow the applicable Package Information.
* A new Package Information section (via Package Name) denotes the start of another package.
* Sub-packages should not be nested inside a Package Information section, but should be separate and should use a Relationship to clarify.
* Annotations and Relationships for the package may appear after the Package Information before any file information.

Fields:

## 3.1 Package Name <a name="3.1"></a>

**3.1.1** Purpose: Identify the full name of the package as given by the [Package Originator](#3.6).

**3.1.2** Intent: The name of each package is an important conventional technical identifier to be maintained for each package.

**3.1.3** Cardinality: Mandatory, one.

**3.1.4** Data Format: Single line of text.

**3.1.5** Tag: `PackageName:`

Example:

```text
PackageName: glibc
```

**3.1.6** RDF: property `spdx:name` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    <name>glibc</name>
</Package>
```

## 3.2 Package SPDX Identifier <a name="3.2"></a>

**3.2.1** Purpose: Uniquely identify any element in an SPDX document which may be referenced by other elements. These may be referenced internally and externally with the addition of the SPDX Document Identifier.

**3.2.2** Intent: There may be several versions of the same package within an SPDX document. Each element needs to be able to be referred to uniquely so that relationships between elements can be clearly articulated.

**3.2.3** Cardinality: Mandatory, one.

**3.2.4** Data Format: "SPDXRef-"`[idstring]`

where `[idstring]` is a unique string containing letters, numbers, `.`, and/or `-`.

**3.2.5** Tag: `SPDXID:`

Example:

```text
SPDXID: SPDXRef-1
```

**3.2.6** RDF: The URI for the element will follow the form:

```text
[SPDX DocumentNamespace]#[SPDX Identifier]
```

See [section 2.5](2-document-creation-information.md#2.5) for the definition of the SPDX Document Namespace and [section 2.3](2-document-creation-information.md#2.3) for the definition of the SPDX Identifier

Example using `xml:base`:

```text
<rdf:RDF xml:base="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B">
    ...
    <Package rdf:about="#SPDXRef-1">
    ...
    </Package>
</rdf:RDF>
```

Example using document URI:

```text
<Package rdf:about="http://acme.com/spdxdocs/acmeproj/v1.2/1BE2A4FF-5F1A-48D3-8483-28A9B0349A1B#SPDXRef-1">
    ...
</Package>
```

## 3.3 Package Version <a name="3.3"></a>

**3.3.1** Purpose: Identify the version of the package.

**3.3.2** Intent: The versioning of a package is a useful for identification purposes and for indicating later changes of the package version.

**3.3.3** Cardinality: Optional, one.

**3.3.4** Data Format: Single line of text.

**3.3.5** Tag: `PackageVersion:`

Example:

```text
PackageVersion: 2.11.1
```

**3.3.6** RDF: property `spdx:versionInfo` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <versionInfo>2.11.1</versionInfo>
    ...
</Package>
```

## 3.4 Package File Name <a name="3.4"></a>

**3.4.1** Purpose: Provide the actual file name of the package, or path of the directory being treated as a package. This may include the packaging and compression methods used as part of the file name, if appropriate.

**3.4.2** Intent: The actual file name of the compressed file containing the package may be a significant technical element that needs to be included with each package identification information. If a grouping, like a set of files in a sub-directory, is being treated as a package, the sub-directory name may be appropriate to provide. Sub-directory name is preceded with a `./`. See [RFC 3986][rfc3986] for syntax.

**3.4.3** Cardinality: Optional, one.

**3.4.4** Data Format: Single line of text.

**3.4.5** Tag: `PackageFileName:`

Example:

```text
PackageFileName: glibc-2.11.1.tar.gz
```

Example (sub-directory being treated as a package):

```text
PackageFileName: ./myrootdir/mysubdir1
```

**3.4.6** RDF: property `spdx:packageFileName` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <packageFileName>glibc 2.11.1.tar.gz</packageFileName>
    ...
</Package>
```

Example (sub-directory being treated as a package):

```text
<Package rdf:about="...">
   ...
   <packageFileName>./myrootdir/mysubdir1</packageFileName>
   ...
</Package>
```

## 3.5 Package Supplier <a name="3.5"></a>

**3.5.1** Purpose: Identify the actual distribution source for the package/directory identified in the SPDX file. This may or may not be different from the originating distribution source for the package. The name of the Package Supplier must be an organization or recognized author and not a web site. For example, [SourceForge][] is a host website, not a supplier, the supplier for https://sourceforge.net/projects/bridge/ is “[The Linux Foundation][LinuxFoundation].”

Use `NOASSERTION` if:

(i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

(ii) the SPDX file creator has made no attempt to determine this field; or

(iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.5.2** Intent: Assist with understanding the point of distribution for the code in the package. This field is vital for ensuring that downstream package recipients can address any ambiguity or concerns that might arise with the information in the SPDX file or the contents of the package it documents.

**3.5.3** Cardinality: Optional, one.

**3.5.4** Data Format: Single line of text with the following keywords | `NOASSERTION`

* `Person:` person name and optional `(<email>)`
* `Organization:` organization name and optional `(<email>)`

**3.5.5** Tag: `PackageSupplier:`

Example:

```text
PackageSupplier: Person: Jane Doe (jane.doe@example.com)
```

**3.5.6** RDF: property `spdx:supplier` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <supplier>Person: Jane Doe (jane.doe@example.com)</supplier>
    ...
</Package>
```

## 3.6 Package Originator <a name="3.6"></a>

**3.6.1** Purpose: If the package identified in the SPDX file originated from a different person or organization than identified as Package Supplier (see [section 3.5](#3.5) above), this field identifies from where or whom the package originally came. In some cases a package may be created and originally distributed by a different third party than the Package Supplier of the package. For example, the SPDX file identifies the package [glibc][] and [Red Hat][] as the Package Supplier, but the [Free Software Foundation][FSF] is the Package Originator.

Use `NOASSERTION` if:

(i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

(ii) the SPDX file creator has made no attempt to determine this field; or

(iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.6.2** Intent: Assist with understanding the point of origin of the code in the package. This field is vital for understanding who originally distributed a package and should help in addressing any ambiguity or concerns that might arise with the information in the SPDX file or the contents of the Package it documents.

**3.6.3** Cardinality: Optional, one.

**3.6.4** Data Format: Single line of text with the following keywords | `NOASSERTION`

* `Person:` person name and optional `(<email>)`
* `Organization:` organization name and optional `(<email>)`

**3.6.5** Tag: `PackageOriginator:`

Example:

```text
PackageOriginator: Organization: ExampleCodeInspect (contact@example.com)
```

**3.6.6** RDF: property `spdx:originator` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    <originator>Organization: ExampleCodeInspect (contact@example.com)</originator>
</Package>
```

## 3.7 Package Download Location <a name="3.7"></a>

**3.7.1** Purpose: This section identifies the download Universal Resource Locator (URL), or a specific location within a version control system (VCS) for the package at the time that the SPDX file was created.

Use:

* `NONE` if there is no download location whatsoever.
* `NOASSERTION` if:

    (i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

    (ii) the SPDX file creator has made no attempt to determine this field; or

    (iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.7.2** Intent: Where and how to download the exact package being referenced is critical verification and tracking data.

**3.7.3** Cardinality: Mandatory, one.

**3.7.4** Data Format: uniform resource locator | VCS location | `NONE` | `NOASSERTION`

For version-controlled files, the VCS location syntax is similar to a URL and has the:

```text
<vcs_tool>+<transport>://<host_name>[/<path_to_repository>][@<revision_tag_or_branch>][#<sub_path>]
```

This VCS location compact notation (inspired and mostly adopted from [pip][pip-vcs] as of 2015-02-20) supports referencing locations in version control systems such as [Git][], [Mercurial][], [Subversion][] and [Bazaar][], and specifies the type of VCS tool using url prefixes: `git+`, `hg+`, `bzr+`, `svn+` and specific transport schemes such as SSH or HTTPS.

Specifying sub-paths, branch names, a commit hash, a revision or a tag name is recommended, and supported using the `@` delimiter for commits and the `#` delimiter for sub-paths.

Using user names and password in the `<host_name>` is not supported and should be considered as an error. User access control to URLs or VCS repositories must be handled outside of an SPDX document.

In VCS location compact notations, the trailing slashes in `<host_name>`, `<path_to_repository>` are not significant. Leading and trailing slashes in `<sub_path>` are not significant.

**3.7.5** Tag: `PackageDownloadLocation:`

Examples if ambiguous:

```text
PackageDownloadLocation: NOASSERTION
```

```text
PackageDownloadLocation: NONE
```

Example for a plain URL:

```text
PackageDownloadLocation: http://ftp.gnu.org/gnu/glibc/glibc-ports-2.15.tar.gz
```

Example for [Git][]:

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

Example for [Mercurial][]:

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

Example for [Subversion][]:

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

Example for [Bazaar][]:

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

**3.7.6** RDF: property `spdx:downloadLocation` in class `spdx:Package`

Example:

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

## 3.8 Files Analyzed <a name="3.8"></a>

**3.8.1** Purpose: Indicates whether the file content of this package has been available for or subjected to analysis when creating the SPDX document. If `false`, indicates packages that represent metadata or URI references to a project, product, artifact, distribution or a component. If `false`, the package must not contain any files.

**3.8.2** Intent: A package can refer to a project, product, artifact, distribution or a component that is external to the SPDX document.

Some examples:

1. **A bundle of external products**: Package A can be metadata about Packages and their dependencies. It may also be a loosely organized manifest of references to Packages involved in a product or project. Build or execution may transitively discover more Packages and dependencies. All of these referenced Packages can have their own SPDX Documents. In this case, Package A may be defined with its File Analyzed attribute set to `false`. Package A includes External Document References to SPDX documents containing Packages referenced in all the available relationships. The Relationships section then relates the SPDX documents and contained SPDX elements with appropriate semantics per the dependencies in the scope of Package A.
2. **Package relation to external product**: Package A can have a STATIC_LINK relationship to Package B, but the binary representation of Package B is furnished by the build process and thus not contained in the file list of Package A. In this case, Package B needs to be defined with its Files Analyzed attribute set to false and all the other attributes subject to the subsequently defined constraints. Then, the relationship between Package A and Package B can be documented as described in [Section 7](7-relationships-between-SPDX-elements.md).
3. **File derived from external product**: Package A contains multiple files derived from an outside project. Rather than use the `artifactOf*` attributes (Sections 4.9-4.11) to describe the relation of these files to their project, the outside project can be represented by another package, Package B, whose [`FilesAnalyzed`](#3.8) attribute is set to `false`. Each of the binary files can then have a relationship to package B (Section 6). This allows the outside project to be represented by a single SPDX identifier (the identifier of Package B). It also allows the relationship(s) between the outside project and each of the files be represented in much more detail.

**3.8.3** Cardinality: Optional, one.  If omitted, the default value of `true` is assumed.

**3.8.4** Data Format: Boolean

**3.8.5** Tag: `FilesAnalyzed`

Example:

```text
FilesAnalyzed: false
```

**3.8.6** RDF: property `spdx:filesAnalyzed` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <filesAnalyzed>false</filesAnalyzed>
    ...
</Package>
```

## 3.9 Package Verification Code <a name="3.9"></a>

**3.9.1** Purpose: This field provides an independently reproducible mechanism identifying specific contents of a package based on the actual files (except the SPDX file itself, if it is included in the package) that make up each package and that correlates to the data in this SPDX file. This identifier enables a recipient to determine if any file in the original package (that the analysis was done on) has been changed and permits inclusion of an SPDX file as part of a package.

**3.9.2** Intent: Provide a unique identifier based on the files inside each package, eliminating confusion over which version or modification of a specific package the SPDX file refers to. This field also permits embedding the SPDX file within the package without altering the identifier.

**3.9.3** Cardinality: Mandatory, one if [`FilesAnalyzed`](#3.8) is `true` or omitted, zero (must be omitted) if `FilesAnalyzed` is `false`.

**3.9.4** Algorithm:

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

**3.9.5** Data Format: single line of text with 160 bit binary represented as 40 lowercase hexadecimal digits

**3.9.6** Tag: `PackageVerificationCode:` (and optionally `(excludes: FileName)`)

`FileName` is specified in [section 4.1](4-file-information.md#4.1).

Example:

```text
PackageVerificationCode: d6a770ba38583ed4bb4525bd96e50461655d2758 (excludes: ./package.spdx)
```

**3.9.7** RDF: `spdx:packageVerificationCodeValue`, `spdx:packageVerificationCodeExcludedFile` in class `spdx:PackageVerificationCode` in class `spdx:Package`

Example:

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

## 3.10 Package Checksum <a name="3.10"></a>

**3.10.1** Purpose: Provide an independently reproducible mechanism that permits unique identification of a specific package that correlates to the data in this SPDX file. This identifier enables a recipient to determine if any file in the original package has been changed. If the SPDX file is to be included in a package, this value should not be calculated. The [SHA-1][] algorithm will be used to provide the checksum by default.

**3.10.2** Intent: Eliminate confusion over which version or modification of a specific package the SPDX file references by providing a unique identifier of the package.

**3.10.3** Cardinality: Optional, one or many.

**3.10.4** Algorithms that can be used: [`SHA1`][SHA-1], [`SHA224`][SHA-224], [`SHA256`][SHA-256], [`SHA384`][SHA-384], [`SHA512`][SHA-512], [`MD2`][MD2], [`MD4`][MD4], [`MD5`][MD5], [`MD6`][MD6]

**3.10.5** Data Format: There are three components, an algorithm identifier (e.g. `SHA1`), a colon separator `:`, and a bit value represented as lowercase hexadecimal digits (appropriate as output to the algorithm).

**3.10.6** Tag: `PackageChecksum:`

Example:

```text
PackageChecksum: SHA1: 85ed0817af83a24ad8da68c2b5094de69833983c
```

```text
PackageChecksum: SHA256: 11b6d3ee554eedf79299905a98f9b9a04e498210b59f15094c916c91d150efcd
```

```text
PackageChecksum: MD5: 624c1abb3664f4b35547e7c73864ad24
```

**3.10.7** RDF: properties `spdx:algorithm`, `spdx:checksumValue` in class `spdx:checksum` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    <checksum>
        <Checksum>
            <algorithm rdf:resource="spdx:checksumAlgorithm_sha1"/>
            <checksumValue>85ed0817af83a24ad8da68c2b5094de69833983c</checksumValue>
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

## 3.11 Package Home Page <a name="3.11"></a>

**3.11.1** Purpose: Provide a place for the SPDX file creator to record a web site that serves as the package's home page. This link can also be used to reference further information about the package referenced by the SPDX file creator.

Use:

* `NONE` if there is no package home page whatsoever.
* `NOASSERTION` if:

    (i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

    (ii) the SPDX file creator has made no attempt to determine this field; or

    (iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.11.2** Intent: Save the recipient of the SPDX file who is looking for more info from having to search for and verify a match between the package and the associated project homepage.

**3.11.3** Cardinality: Optional, one.

**3.11.4** Data Format: uniform resource locator | `NONE` | `NOASSERTION`

**3.11.5** Tag: `PackageHomePage:`

Example:

```text
PackageHomePage: http://ftp.gnu.org/gnu/glibc
```

**3.11.6** RDF: property `doap:homepage` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    <doap:homepage >http://ftp.gnu.org/gnu/glibc/</doap:homepage>    </Package>
```

This specification uses the prefix `doap:` to refer to the [DOAP][doap] namespace:

```text
http://usefulinc.com/ns/doap#
```
## 3.12 Source Information <a name="3.12"></a>

**3.12.1** Purpose: Provide a place for the SPDX file creator to record any relevant background information or additional comments about the origin of the package. For example, this field might include comments indicating whether the package was pulled from a source code management system or has been repackaged.

**3.12.2** Intent: The SPDX file creator can provide additional information to describe any anomalies or discoveries in the determination of the origin of the package.

**3.12.3** Cardinality: Optional, one.

**3.12.4** Data Format: free form text that can span multiple lines.

In `tag:value` format this is delimited by `<text>...</text>`.

**3.12.5** Tag: `PackageSourceInfo:`

Example:

```text
PackageSourceInfo: <text>uses glibc-2_11-branch from git://sourceware.org/git/glibc.git.</text>
```

**3.12.6** RDF: `spdx:sourceInfo`

Example:

```text
<Package rdf:about="...">
    ...
    <sourceInfo>uses glibc-2_11-branch from git://sourceware.org/git/glibc.git.</sourceInfo>
    ...
</Package>
```

## 3.13 Concluded License <a name="3.13"></a>

**3.13.1** Purpose: Contain the license the SPDX file creator has concluded as governing the package or alternative values, if the governing license cannot be determined.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md);
* `NONE`, if the SPDX file creator concludes there is no license available for this package; or
* `NOASSERTION` if:

    (i) the SPDX file creator has attempted to but cannot reach a reasonable objective determination;

    (ii) the SPDX file creator has made no attempt to determine this field; or

    (iii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

If the Concluded License is not the same as the [Declared License](#3.15), a written explanation should be provided in the Comments on License field [(section 3.16)](#3.16). With respect to `NOASSERTION`, a written explanation in the Comments on License field [(section 3.16)](#3.16) is preferred.

**3.13.2** Intent: Here, the intent is for the SPDX file creator to analyze the license information in package, and other objective information, e.g., COPYING file, together with the results from any scanning tools, to arrive at a reasonably objective conclusion as to what license governs the package.

**3.13.3** Cardinality: Mandatory, one.

**3.13.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

`<SPDX License Expression>` is a valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

**3.13.5** Tag: `PackageLicenseConcluded:`

Example:

```text
PackageLicenseConcluded: LGPL-2.0-only
```

Example:

```text
PackageLicenseConcluded: (LGPL-2.0-only OR LicenseRef-3)
```

**3.13.6** RDF: property `spdx:licenseConcluded` in `class spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <licenseConcluded rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
    ...
</Package>
```

Example:

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

## 3.14 All Licenses Information from Files <a name="3.14"></a>

**3.14.1** Purpose: This field is to contain a list of all licenses found in the package. The relationship between licenses (i.e., conjunctive, disjunctive) is not specified in this field – it is simply a listing of all licenses found.

The options to populate this field are limited to:

* The SPDX License List short form identifier, if a detected license is on the SPDX License List;
* A user defined license reference denoted by `LicenseRef-<idstring>` (for a license not on the SPDX License List);
* `NONE`, if no license information is detected in any of the files; or
* `NOASSERTION`, if:

    (i) the SPDX file creator has made no attempt to determine this field; or

    (ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.14.2** Intent: Here, the intention is to capture all license information detected in the actual files.

**3.14.3** Cardinality: Mandatory, one or many if [`FilesAnalyzed`](#3.8) is `true` or omitted, zero (must be omitted) if `FilesAnalyzed` is `false`.

**3.14.4** Data Format: [`<shortIdentifier>`](appendix-I-SPDX-license-list.md#I.1) |
  ["DocumentRef-"`[idstring]`:]"LicenseRef-"`[idstring]` |
  `NONE` | `NOASSERTION`

where:

* "DocumentRef-"`[idstring]` is an optional reference to an external SPDX document as described in [section 2.6](2-document-creation-information.md#2.6).
* `[idstring]` is a unique string containing letters, numbers, `.`, or `-`.

**3.14.5** Tag: `PackageLicenseInfoFromFiles:`

Example:

```text
PackageLicenseInfoFromFiles: GPL-2.0-only
```

```text
PackageLicenseInfoFromFiles: LicenseRef-1
```

```text
PackageLicenseInfoFromFiles: LicenseRef-2
```

**3.14.6** RDF: property `spdx:licenseInfoFromFiles` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <licenseInfoFromFiles rdf:resource="https://spdx.org/licenses/GPL-2.0-only" />
    <licenseInfoFromFiles rdf:resource="#LicenseRef-1" />
    <licenseInfoFromFiles rdf:resource="#LicenseRef-2" />
    ...
</Package>
```

## 3.15 Declared License <a name="3.15"></a>

**3.15.1** Purpose: List the licenses that have been declared by the authors of the package. Any license information that does not originate from the package authors, e.g. license information from a third party repository, should not be included in this field.

The options to populate this field are limited to:

* A valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md);
* `NONE`, if the package contains no license information whatsoever; or
* `NOASSERTION` if:

    (i) the SPDX file creator has made no attempt to determine this field; or

    (ii) the SPDX file creator has intentionally provided no information (no meaning should be implied by doing so).

**3.15.2** Intent: This is simply the license identified in text in one or more files (for example COPYING file) in the source code package. This field is not intended to capture license information obtained from an external source, such as the package website. Such information can be included in Concluded License [(section 3.13)](#3.13). This field may have multiple Declared Licenses, if multiple licenses are declared at the package level.

**3.15.3** Cardinality: Mandatory, one.

**3.15.4** Data Format: `<SPDX License Expression>` | `NONE` | `NOASSERTION`

where:

* `<SPDX License Expression>` is a valid SPDX License Expression as defined in [Appendix IV](appendix-IV-SPDX-license-expressions.md).

**3.15.5** Tag: `PackageLicenseDeclared:`

Example:

```text
PackageLicenseDeclared: LGPL-2.0-only
```

Example:

```text
PackageLicenseDeclared: (LGPL-2.0-only AND LicenseRef-3)
```

**3.15.6** RDF: property `spdx:licenseDeclared` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <licenseDeclared rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
    ...
</Package>
```

Example:

```text
<Package rdf:about="...">
    ...
     <licenseDeclared>
         <ConjunctiveLicenseSet>
             <member rdf:resource="http://spdx.org/licenses/LGPL-2.0-only" />
             <member rdf:resource="#LicenseRef-3" />
         </ConjunctiveLicenseSet>
    </licenseDeclared>
    ...
</Package>
```

## 3.16 Comments on License <a name="3.16"></a>

**3.16.1** Purpose: This field provides a place for the SPDX file creator to record any relevant background information or analysis that went in to arriving at the Concluded License for a package. If the Concluded License does not match the Declared License or License Information from Files, this should be explained by the SPDX file creator. Its is also preferable to include an explanation here when the Concluded License is `NOASSERTION`.

**3.16.2** Intent: Here, the intent is to provide the recipient of the SPDX file with a detailed explanation of how the Concluded License was determined if it does not match the License Information from the files or the source code package, is marked `NOASSERTION`, or other helpful information relevant to determining the license of the package.

**3.16.3** Cardinality: Optional, one.

**3.16.4** Data Format: free form text that can span multiple lines.

In `tag:value` format this is delimited by `<text>...</text>`.

**3.16.5** Tag: `PackageLicenseComments:`

Example:

```text
PackageLicenseComments: <text>The license for this project changed with the release of version 1.4.
The version of the project included here post-dates the license change.</text>
```

**3.16.6** RDF: property `spdx:licenseComments` in class `spdx:Package`

Example:

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

## 3.17 Copyright Text <a name="3.17"></a>

**3.17.1** Purpose: Identify the copyright holders of the package, as well as any dates present. This will be a free form text field extracted from package information files. The options to populate this field are limited to:

* Any text related to a copyright notice, even if not complete;
* `NONE` if the package contains no copyright information whatsoever; or
* `NOASSERTION`, if

    (i) the SPDX document creator has made no attempt to determine this field; or

    (ii) the SPDX document creator has intentionally provided no information (no meaning should be implied by doing so).

**3.17.2** Intent: Record any copyright notices for the package.

**3.17.3** Cardinality: Mandatory, one.

**3.17.4** Data Format: free form text that can span multiple lines | `NONE` | `NOASSERTION`

**3.17.5** Tag: `PackageCopyrightText:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

Example:

```text
PackageCopyrightText: <text>Copyright 2008-2010 John Smith</text>
```

**3.17.6** RDF: property `spdx:copyrightText` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <copyrightText>Copyright 2008-2010 John Smith</copyrightText>
    ...
</Package>
```

## 3.18 Package Summary Description <a name="3.18"></a>

**3.18.1** Purpose: This field is a short description of the package.

**3.18.2** Intent: Here, the intent is to allow the SPDX file creator to provide concise information about the function or use of the package without having to parse the source code of the actual package.

**3.18.3** Cardinality: Optional, one.

**3.18.4** Data Format: free form text that can span multiple lines.

**3.18.5** Tag: `PackageSummary:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

Example:

```text
PackageSummary: <text>GNU C library.</text>
```

**3.18.6** RDF: property `spdx:summary` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <summary>GNU C library.</summary>
    ...
</Package>
```

## 3.19 Package Detailed Description <a name="3.19"></a>

**3.19.1** Purpose: This field is a more detailed description of the package. It may also be extracted from the packages itself.

**3.19.2** Intent: Here, the intent is to provide recipients of the SPDX file with a detailed technical explanation of the functionality, anticipated use, and anticipated implementation of the package. This field may also include a description of improvements over prior versions of the package.

**3.19.3** Cardinality: Optional, one.

**3.19.4** Data Format: free form text than can span multiple lines.

**3.19.5** Tag: `PackageDescription:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

Example:

```text
PackageDescription: <text>The GNU C Library defines functions that are specified by the ISO C standard,
as well as additional features specific to POSIX and other derivatives of the Unix operating system,
and extensions specific to GNU systems.</text>
```

**3.19.6** RDF: property `spdx:description` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <description>
        The GNU C Library defines functions that are specified by the
        ISO C standard, as well as additional features specific to POSIX and other
        derivatives of the Unix operating system, and extensions specific to GNU systems.
    </description>
    ...
</Package>
```

## 3.20 Package Comment <a name="3.20"></a>

**3.20.1** Purpose: This field provides a place for the SPDX file creator to record any general comments about the package being described.

**3.20.2** Intent: Here, the intent is to provide the recipient of the SPDX document with more information determined after careful analysis of a package.

**3.20.3** Cardinality: Optional, one.

**3.20.4** Data Format: free form text that can span multiple lines.

**3.20.5** Tag: `PackageComment:`

In `tag:value` format multiple lines are delimited by `<text>...</text>`.

Example:

```text
PackageComment: <text>The package includes several sub-packages; see Relationship information.</text>
```

**3.20.6** RDF: property `rdfs:comment` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    ...
    <rdfs:comment>
        The package includes several sub-packages; see Relationship information.
    </rdfs:comment>
    ...
</Package>
```

## 3.21 External Reference <a name="3.21"></a>

**3.21.1** Purpose: An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package.

**3.21.2** Intent: To indicate an outside source of information, metadata enumerations, asset identifiers, or content relevant to the Package, such as a structured naming scheme identifying Packages with known security vulnerabilities.

**3.21.3** Cardinality: Optional (one or many)

**3.21.4** Data Format: `<category> <type> <locator>`

where:

* `<category>` is `SECURITY` | `PACKAGE-MANAGER` | `PERSISTENT-ID` | `OTHER`
* `<type>` is one of the types listed in [Appendix VI](appendix-VI-external-repository-identifiers.md).

`<locator>` is the unique string with no spaces necessary to access the package-specific information, metadata, or content within the target location. The format of the locator is subject to constraints defined by the `<type>`.

**3.21.5** Tag: `ExternalRef:`

Example:

```text
ExternalRef: SECURITY cpe23Type cpe:2.3:a:pivotal_software:spring_framework:4.1.0:*:*:*:*:*:*:*
```

```text
ExternalRef: PERSISTENT-ID swh swh:1:cnt:94a9ed024d3859793618152ea559a168bbcbb5e2
```

```text
ExternalRef: OTHER LocationRef-acmeforge acmecorp/acmenator/4.1.3-alpha
```

**3.21.6** RDF: property `externalRef` in class `spdx:Package` of type `spdx:ExternalRef` 

Example (for a listed location):

```text
<spdx:Package rdf:about="...">
    ...
    <spdx:externalRef>
        <spdx:ExternalRef>
            <spdx:referenceCategory rdf:resource="spdx:referenceCategory_packageManager" />
            <spdx:referenceType rdf:resource="http://spdx.org/rdf/refeferences/maven-central" />
            <spdx:referenceLocator>org.apache.commons:commons-lang:3.2.1</spdx:referenceLocator>
        </spdx:ExternalRef>
    </spdx:externalRef>
    ...
</spdx:package>
```

Example (for an unlisted location):

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

The referenceType value for a non-listed location consists of the SPDX document namespace (per [section 2.5](2-document-creation-information.md#2.5)) followed by a `#` and the category as defined in [3.21.4](#3.21).

## 3.22 External Reference Comment <a name="3.22"></a>

**3.22.1** Purpose: To provide human-readable information about the purpose and target of the reference.

**3.22.2** Intent: To inform a human consumer why the reference exists, what kind of information, content or metadata can be extracted. The target's relationship to artifactOf values of files in the package may need to be explained here. If the reference is BINARY, its relationship to PackageDownloadLocation may need to be explained. If the reference is SOURCE, its relationship to PackageDownloadLocation and SourceInformation may need to be explained.

**3.22.3** Cardinality: Conditional (Optional, one) for each [External Reference](#3.21).

**3.22.4** Data format: Free form text that can span multiple lines.

In `tag:value` format this is delimited by `<text>...</text>` and is expected to follow an [External Reference](#3.21) so that the association can be made.

**3.22.5** Tag: `ExternalRefComment:`

Example:

```text
ExternalRefComment: <text>NIST National Vulnerability Database (NVD) describes
security vulnerabilities (CVEs) which affect Vendor Product Version
acmecorp:acmenator:6.6.6.</text>
```

**3.22.6** RDF: Property `rdfs:comment` in class `spdx:ExternalRef`

```text
<spdx:Package rdf:about="...">
    ...
    <spdx:externalRef>
        <spdx:ExternalRef>
            <spdx:referenceCategory rdf:resource="spdx:referenceCategory_packageManager" />
            <spdx:referenceType rdf:resource="http://spdx.org/rdf/refeferences/maven-central" />
            <spdx:referenceLocator>org.apache.commons:commons-lang:3.2.1</spdx:referenceLocator>
            <rdfs:comment>
                NIST National Vulnerability Database (NVD) describes
                security vulnerabilities (CVEs) which affect Vendor Product Version
                acmecorp:acmenator:6.6.6
            </rdfs:comment>
        </spdx:ExternalRef>
    </spdx:externalRef>
    ...
</spdx:package>
```

## 3.23 Package Attribution Text <a name="3.23"></a>

**3.23.1** Purpose: This field provides a place for the SPDX data creator to record, at the package level, acknowledgements that may be required to be communicated in some contexts. This is not meant to include the package's actual complete license text (see `PackageLicenseConcluded`, `PackageLicenseDeclared` and `PackageLicenseInfoFromFiles`), and may or may not include copyright notices (see also `PackageCopyrightText`). The SPDX data creator may use this field to record other acknowledgements, such as particular clauses from license texts, which may be necessary or desirable to reproduce.

**3.23.2** Intent: The intent is to provide the recipient of the SPDX file with acknowledgement content at a package level, to assist redistributors of the package with reproducing those acknowledgements. This field does not necessarily indicate where, or in which contexts, the acknowledgements need to be reproduced (such as end-user documentation, advertising materials, etc.) and the SPDX data creator may or may not explain elsewhere how they intend for this field to be used.

**3.23.3** Cardinality: Optional, one or many.

**3.23.4** Data Format: free form text that can span multiple lines.

**3.23.5** Tag: `PackageAttributionText:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

Example: 

```text
PackageAttributionText: <text>
All advertising materials mentioning features or use of this software must display the
following acknowledgement:  This product includes software developed by the AT&T.
</text>
```

**3.23.6** RDF: property `spdx:attributionText` in class `spdx:Package`

Example:

```text
<Package rdf:about="...">
    <attributionText>
        All advertising materials mentioning features or use of this software must display the
        following acknowledgement:  This product includes software developed by the AT&T.
    </attributionText>
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
[SourceForge]: https://sourceforge.net/
[Subversion]: https://subversion.apache.org/
[doap]: http://usefulinc.com/ns/doap
