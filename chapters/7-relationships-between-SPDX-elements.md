---
header-left: "Header"
footer-left: "Footer"
...
# 7 Relationships between SPDX Elements{#Relationships-between-SPDX-Elements}

## 7.1 Relationship <a name="7.1"></a>

**7.1.1** Purpose: This field provides information about the relationship between two SPDX elements. For example, you can represent a relationship between two different Files, between a Package and a File, between two Packages, or between one SPDXDocument and another SPDXDocument. The relationships between two elements that are supported are:

| Relationship           | Description | Example |
|------------------------|-------------|---------|
| DESCRIBES              | Is to be used when SPDXRef-DOCUMENT describes SPDXRef-A                                               | An SPDX document `WildFly.spdx` describes package ‘WildFly’. Note this is a logical relationship to help organize related items within an SPDX document that is mandatory if more than one package or set of files (not in a package) is present. |
| DESCRIBED_BY           | Is to be used when SPDXRef-A is described by SPDXREF-Document                                         | The package ‘WildFly’ is described by SPDX document `Wildfly.spdx`. |
| CONTAINS               | Is to be used when SPDXRef-A contains SPDXRef-B.                                                      | An ARCHIVE file `bar.tgz` contains a SOURCE file `foo.c`. |
| CONTAINED_BY           | Is to be used when SPDXRef-A is contained by SPDXRef-B.                                               | A SOURCE file `foo.c` is contained by ARCHIVE file `bar.tgz` |
| GENERATES              | Is to be used when SPDXRef-A generates the SPDXRef-B.                                                 | A SOURCE file `makefile.mk` generates a BINARY file `a.out` |
| GENERATED_FROM         | Is to be used when SPDXRef-A was generated from SPDXRef-B.                                            | A BINARY file `a.out` has been generated from a SOURCE file `makefile.mk`. A BINARY file `foolib.a` is generated from a SOURCE file `bar.c`. |
| ANCESTOR_OF            | Is to be used when SPDXRef-A is an ancestor (same lineage but pre-dates) SPDXRef-B                    | A SOURCE file `makefile.mk` is a version of the original ancestor SOURCE file ‘makefile2.mk’ |
| DESCENDANT_OF          | Is to be used when SPDXRef-A is a descendant of (same lineage but postdates) SPDXRef-B.               | A SOURCE file `makefile2.mk` is a descendant of the original SOURCE file ‘makefile.mk’ |
| VARIANT_OF             | Is to be used when SPDXRef-A is a variant of (same lineage but not clear which came first) SPDXRef-B. | A SOURCE file `makefile2.mk` is a variant of SOURCE file `makefile.mk` if they differ by some edit, but there is no way to tell which came first (no reliable date information). |
| DISTRIBUTION_ARTIFACT  | Is to be used when distributing SPDXRef-A requires that SPDXRef-B also be distributed.                | A BINARY file `foo.o` requires that the ARCHIVE file `bar-sources.tgz` be made available on distribution. |
| PATCH_FOR              | Is to be used when SPDXRef-A is a patch file for (to be applied to) SPDXRef-B.                        | A SOURCE file `foo.diff` is a patch file for SOURCE file `foo.c`. |
| PATCH_APPLIED          | Is to be used when SPDXRef-A is a patch file that has been applied to SPDXRef-B.                      | A SOURCE file `foo.diff` is a patch file that has been applied to SOURCE file ‘foo-patched.c’. |
| COPY_OF                | Is to be used when SPDXRef-A is an exact copy of SPDXRef-B.                                           | A BINARY file `alib.a` is an exact copy of BINARY file `a2lib.a`. |
| FILE_ADDED             | Is to be used when SPDXRef-A is a file added to SPDXRef-B.                                            | A SOURCE file `foo.c` has been added to package ARCHIVE `bar.tgz`. |
| FILE_DELETED           | Is to be used when SPDXRef-A is a file was deleted from to SPDXRef-B.                                 | A SOURCE file `foo.diff` has been deleted from package ARCHIVE `bar.tgz`. |
| FILE_MODIFIED          | Is to be used when SPDXRef-A is a file that was modified from SPDXRef-B.                              | A SOURCE file `foo.c` has been modified from SOURCE file `foo.orig.c`. |
| EXPANDED\_FROM_ARCHIVE | Is to be used when SPDXRef-A is expanded from the archive SPDXRef-B.                                  | A SOURCE file `foo.c`, has been expanded from the archive ARCHIVE file `xyz.tgz`. |
| DYNAMIC_LINK           | Is to be used when SPDXRef-A dynamically links to SPDXRef-B.                                          | An APPLICATION file ‘myapp’ dynamically links to BINARY file `zlib.so`. |
| STATIC_LINK            | Is to be used when SPDXRef-A statically links to SPDXRef-B.                                           | An APPLICATION file ‘myapp’ statically links to BINARY `zlib.a`. |
| DATA\_FILE_OF          | Is to be used when SPDXRef-A is a data file used in SPDXRef-B.                                        | An IMAGE file ‘kitty.jpg’ is a data file of an APPLICATION ‘hellokitty’. |
| TEST\_CASE_OF          | Is to be used when SPDXRef-A is a test case used in testing SPDXRef-B.                                | A SOURCE file `testMyCode.java` is a unit test file used to test an APPLICATION MyPackage. |
| BUILD\_TOOL_OF         | Is to be used when SPDXRef-A is used to to build SPDXRef-B.                                           | A SOURCE file `makefile.mk` is used to build an APPLICATION ‘zlib’. |
| DOCUMENTATION_OF       | Is to be used when SPDXRef-A provides documentation of SPDXRef-B.                                     | A DOCUMENTATION file `readme.txt` documents the APPLICATION ‘zlib’. |
| OPTIONAL\_COMPONENT_OF | Is to be used when SPDXRef-A is an optional component of SPDXRef-B.                                   | A SOURCE file `fool.c` (which is in the contributors directory) may or may not be included in the build of APPLICATION ‘atthebar’. |
| METAFILE_OF            | Is to be used when SPDXRef-A is a metafile of SPDXRef-B.                                              | A SOURCE file `pom.xml` is a metafile of the APPLICATION ‘Apache Xerces’. |
| PACKAGE_OF             | Is to be used when SPDXRef-A is used as a package as part of SPDXRef-B.                               | A Linux distribution contains an APPLICATION package gawk as part of the distribution MyLinuxDistro. |
| AMENDS                 | Is to be used when (current) SPDXRef-DOCUMENT amends the SPDX information in SPDXRef-B.               | (Current) SPDX document A version 2 contains a correction to a previous version of the SPDX document A version 1. Note the reserved identifier SPDXRef-DOCUMENT for the current document is required. |
| PREREQUISITE_FOR       | Is to be used when SPDXRef-A is a prerequisite for SPDXRef-B | A library `bar.dll` is aprerequisite or dependency for APPLICATION `foo.exe`|
| HAS_PREREQUISITE       | Is to be used when SPDXRef-A has as a prerequisite SPDXRef-B | An APPLICATION `foo.exe` has prerequisite or dependency of `bar.dll` |
| OTHER                  | Is to be used for a relationship which has not been defined in the formal SPDX specification. A description of the relationship should be included in the Relationship comments field. | |

**7.1.2** Intent: Here, this field is a reasonable estimation of the relation between two identified elements (i.e. files or packages, or documents), from a developer perspective.

**7.1.3** Cardinality: Optional*, multiple.

\* see `DESCRIBES` relationship for one mandatory case.

**7.1.4** Data Format:

    ["DocumentRef-"[idstring]":"]SPDXID <relationship> ["DocumentRef-"[idstring]":"]SPDXID

where "DocumentRef-"`[idstring]`":" is an optional reference to an external SPDX document as described in [section 2.6](section#2.6)

where `SPDXID` is a string containing letters, numbers, `.` and/or `-`. as described in sections (2.3, 3.2, 4.2).

where `<relationship>` is one of the documented relationship types in table 7.1.1.

**7.1.5** Tag: `Relationship:`

Examples:

    Relationship: SPDXRef-grep CONTAINS SPDXRef-make

    RelationshipComment: Package grep contains file make

    Relationship: SPDXRef-DOCUMENT AMENDS DocumentRef-SPDXA:SPDXRef-DOCUMENT

    RelationshipComment: This current document is an amendment of the SPDXA document.

**7.1.6** RDF: Property `relationship` in any SpdxElement

Examples:

    <SpdxElement rdf:about=”#SPDXRef-45”>
        <relationship>
            <Relationship>
                <spdx:relatedSpdxElement>
                    <spdx:SpdxElement rdf:about="http://spdx.org/spdxdocs/spdx-tools-v1.2-3F2504E0-4F89-41D3-9A0C-0305E82...
                    </spdx:relatedSpdxElement>

                    <relationshipType>http://spdx.org/rdf/terms#relationshipType_contains</relationshipType>
                </Relationship>
            </relationship>

        ...

    </SpdxElement>

## 7.2 Relationship Comment <a name="7.2"></a>

**7.2.1** Purpose: This field provides a place for the SPDX file creator to record any general comments about the relationship.

**7.2.2** Intent: Here, the intent is to provide the recipient of the SPDX file with more information determined after careful analysis of the relationship between two elements in an SPDX file.

**7.2.3** Cardinality: Optional, one.

**7.2.4** Data Format: Free form text that can span multiple lines, refers only to the immediately preceding relationship.

**7.2.5** Tag: `RelationshipComment:`

In `tag:value` format multiple lines are delimited by `<text> .. </text>`.

A `RelationshipComment:` must be the line immediately after a “Relationship:”

Example:

    RelationshipComment: <text>The package foo.tgz is a pre-requisite for building executable bar.</text>

**7.2.6** RDF: Property `rdfs:comment` in class `spdx:Relationship`

Example:

    <Relationship rdf:about="...">
        <rdfs:comment>
            The package foo.tgz is a pre-requisite for building executable bar.
        </rdfs:comment>

        ...

    </Relationship>