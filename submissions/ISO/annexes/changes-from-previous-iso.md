# Changes from the previous version

## Overview

The previous published version of this standard was ISO/IEC 5962:2021(E),
titled "Information technology -- SPDX® Specification V2.2.1"
published by ISO (the International Organization for Standardization)
and IEC (the International Electrotechnical Commission)
in 2021.

The present chapter outlines the changes that the current version
introduces related to that previous edition.

In SPDX v2.2.1, SPDX meant "Software Package Data Exchange".
SPDX 3.0.1 expands its scope beyond software and SPDX now means
"System Package Data Exchange".

## Serialization Formats

SPDX 3.0.1 implements a [JSON-LD](https://json-ld.org/) format
which has consistent class and property names with the model.

See the
[SPDX 3.0.1 JSON Schema](https://spdx.org/schema/3.0.1/spdx-json-schema.json)
for the format specifics.

The Tag/Value, YAML, RDF/XML and spreadsheet formats are not supported.

## SPDX License List matching guidelines

License List matching is now using License List XML format.

## Properties Removed

The following table lists properties that were included in version 2.2.1
but have been removed in 3.0.1.

| Field | Range / Where Used in V2.2.1 Model | V2.2.1 Model Name | V2.2.1 Tag/Value Name | Rationale |
|-------|------------------------------------|-------------------|-----------------------|-----------|
| Example | LicenseException | example | Not used | This field has not been used. |
| Files analyzed | Package | filesAnalyzed | FilesAnalyzed | Many users of the SPDX 2.2.1 spec reported this property as very confusing. NOTE: There is no longer a way to specific checksums are required for files. This is being tracked in [Issue #84](https://github.com/spdx/spdx-3-model/issues/84). |
| License information in files | Package | licenseInfoInFiles | LicenseInfoInFiles | This field is redundant with the declaredLicense property in the Files contained in the Package. It is recommended that the licenseInfoInFiles can be added as an Annotation to the Package in the format: “SPDX 2.2.1 LicenseInfoInFiles: [expression1], [expression2]” where the [expressions] are the string representation of the license expressions. |

## Naming Differences

The following table lists properties and classes that have been renamed from
version 2.2.1 to 3.0.1.

| Field | Range / Where Used in V2.2.1 Model | V2.2.1 Model Name | V2.2.1 Tag/Value Name | V3.0.1 Name | Rationale |
|-------|------------------------------------|-------------------|-----------------------|-------------|-----------|
| Annotation comment | Element (File, Package, Snippet) | rdfs:comment | AnnotationComment | statement | The rdfs:comment property is optional and has slightly different semantics in other uses (e.g. comments on Elements). Changing the property name clearly distinguishes this usage as a mandatory property for an Annotation. |
| Checksum algorithm | File, Package | checksumAlgorithm | N/A - parsed from a string following the Checksum: keyword. | hashAlgorithm | The term “hash” better represents the intent of this property which is to validate the integrity of the data whereas the term “checksum” is typically for the purpose of error checking. |
| Checksum class / data type | File, Package | Checksum class name and checksum property name | FileChecksum, PackageChecksum | verifiedUsing property and Hash class | More general concept allowing for different verification algorithms for different scenarios. |
| External document reference | SpdxDocument (Creation Information) | externalDocumentRef | ExternalDocumentRef | import | Feedback from SPDX 2.2.1 usage is that externalDocumentRef is confusing due to the similar externalRef property. NOTE: See structural changes related to this property. |
| Extracted license information | File, Document, Package, Snippet | ExtractedLicenseInfo | ExtractedText | CustomLicense | The SPDX 2.2.1 term implied that the only property was text when in fact there are several properties in common with the listed licenses. See [model issue #233](https://github.com/spdx/spdx-3-model/issues/223) for context. |
| Home page | N/A | doap:homepage | PackageHomePage | homePage | Uses a consistent namespace for SPDX properties. |
| License comment | License, ListedLicense | licenseComment | LicenseComment | comment | “comment” is used in the Element class. Since License is a type of (subclass of) Element, it should use the same field otherwise there would be redundant fields for the same purpose. |
| License exception | File, Package, Snippet | LicenseException | Not used | ListedLicenseException, additionId, additionName, additionText | Custom Additions have been added in SPDX 3.0.1 which operate in a similar manner to listed License Exceptions. The new type and property names are more general to accommodate both custom additions and listed License Exceptions. |
| License ID | License, ListedLicense | licenseId | LicenseId | spdxId | “spdxId” is used in the Element class. Since License is a type of (subclass of) Element, it should use the same field otherwise there would be redundant fields for the same purpose. |
| License name | ExtractedText, License, ListedLicense | licenseName | LicenseName | name | “name” is used in the Element class. Since License is a type of (subclass of) Element, it should use the same field otherwise there would be redundant fields for the same purpose. |
| Name | File, Package | fileName, packageName | FileName, PackageName | name | In the SPDX 2.2.1 RDF Ontology, both spdx:fileName and spdx:packageName are sub-properties of spdx:name. The OWL has a restriction that spdx:File has exactly one spdx:fileName and spdx:Package has exactly one spdx:packageName. Changing these restrictions to just spdx:name would simplify the model. |
| Version | Package | versionInfo | PackageVersion | packageVersion | This change would make the Tag/Value and RDF values consistent. |
| With exception operator | File, Package, Snippet | WithExceptionOperator | With (part of License Expression) | WithAdditionOperator, subjectAddition, subjectLicense | Custom Additions have been added in SPDX 3.0.1 which operate in a similar manner to listed License Exceptions. The new type and property names are more general to accommodate both custom additions and listed License Exceptions. |

## Structural Differences

These are the most significant breaking changes requiring a change in logic
to handle a different model or structure for the information.

Each structural difference will describe the change,
describe an approach to translate from 2.2.1 to 3.0.1,
and provide a rationale for the change.

### External Document Reference

#### Description of Change

The purpose of the SPDX 2.2.1 structure “ExternalDocumentRef” is now covered by
two separate structures:

- **NamespaceMap** which maps short identifiers used in serializations to full
  namespace URI’s to support terseness in serialization of element identifiers
- **ExternalMap** which maps an element identifier for an element defined
  externally to verification and location information

The externalDocumentRef property on the SpdxDocument has been replaced by
import property and namespace property.

Another change is the SPDX document checksum field has been replaced with a
“verifiedUsing” property on the ElementCollection. The “verifiedUsing” which
has 0 or more “IntegrityMethod” which should be the checksum of the SPDX
document.

#### Translating from 2.2.1 to 3.0.1

Each ExternalDocumentRef instance will translate as follows:

- An entry would be created in the namespace map for the external document
  namespace
  - The value of the DocumentRef-[idstring] would be used for the prefix
    property in the NamespaceMap.
  - The value of the documentNamespace appended with a “#” would be used for
    the namespace in the NamespaceMap.
- An entry would be created in the ExternalMap for the external document ref
  - A string identifier consisting of the DocumentRef-[idstring] (the same
    value as the prefix in the NamespaceMap) concatenated with a “:” and then
    concatenated with “SPDXRef-DOCUMENT” would be used for the externalSpdxId
    in the ExternalMap.
  - An integrity method of “Hash” will be created with the same information as
    the checksum property and will be referenced using the “verifiedUsing”
    property on the ExternalMap entry.
- An entry would be created in the ExternalMap for each element referenced in
  the current SpdxDocument that is originally specified in the referenced
  SpdxDocument.
  - A string identifier consisting of the DocumentRef-[idstring] (the same
    value as the prefix in the NamespaceMap) concatenated with a “:” and then
    concatenated with the local portion of the element identifier would be used
    for the externalSpdxId in the ExternalMap
  - A “definingArtifact” property would be specified containing a string
    identifier consisting of the DocumentRef-[idstring] concatenated with
    a “:” and then concatenated with “SPDXRef-DOCUMENT”. This is a shortcut
    linkage to tie the referenced element to its defining SpdxDocument for
    verification and location information.

#### Rationale

A key difference between SPDX 2.2.1 and SPDX 3.0.1 is that in SPDX 2.2.1
elements are always expressed within or referenced in relation to a single
enclosing SpdxDocument while in SPDX 3.0.1 a key design principle is that
all elements may be expressed and referenced independent of any other
element including SpdxDocument.
This independence is required to support a variety of content exchange and
analysis use cases.

For example, in SPDX 2.2.1 if you wish to express even a single package you
specify it within an SpdxDocument and its identifier namespace is restricted
to the namespace of the SpdxDocument.
In SPDX 3.0.1 you could specify a single package within an SpdxDocument element
(or any other subclass of ElementCollection such as Bundle, Bom, Sbom, etc.)
but you could also simply specify it on its own without any enclosing
collection element.
In addition, in SPDX 3.0.1 the identifier of the package may share a namespace
with an enclosing collection element such as SpdxDocument if desired but it is
equally valid for it to have any namespace desired unconstrained by any other
element namespace whether it is expressed within a collection element such as
SpdxDocument or not.

In this example, in SPDX 2.2.1 if you referenced the package within the same
SpdxDocument that it is defined in you would utilize the local portion of its
identifier and presume that the namespace is the same as the SpdxDocument
namespace.

If you referenced it from an SpdxDocument other than the one it is defined in
you would use an ExternalDocumentRef to specify a prefix name for the other
SpdxDocument to be used within the current SpdxDocument, the
URI namespace/identifier for the other SpdxDocument, and a checksum for the
other SpdxDocument. To reference the package you would then use an identifier
combining the external document ref prefix and the local portion of the
identifier.

The ExternalDocumentRef structure in SPDX 2.2.1 is based on the presumptions:

1) that elements are always defined within SpdxDocuments,
2) that external elements can always be referenced via a containing
    SpdxDocument and
3) that element identifiers have a namespace from their original containing
    SpdxDocument.

None of these three presumptions hold true for SPDX 3.0.1 so a slightly
modified structure is necessary to support the two use cases previously
covered by ExternalDocumentRef in SPDX 2.2.1:

1) the ability to specify identifier namespace prefixes and accompanying
    namespaces for SPDX elements to support more terse serialized expression
    of content with integrity across serialization forms,
2) the ability to specify which elements in the current subclass of
    ElementCollection (e.g., SpdxDocument) are only referenced from that
    collection and defined elsewhere, along with details regarding their
    verification and location.

The NamespaceMap structure in SPDX 3.0.1 fully supports the namespace
prefixing use case for SpdxDocuments previously covered by ExternalDocumentRef
but also equally covers the same use case capability for all element types
and for any number of element identifier namespaces
(in SPDX 3.0.1 all elements within an SpdxDocument are not required to have
the same namespace and can actually be any desired mix of namespaces)
to support this capability required in SPDX 3.0.1.

The ExternalMap structure in SPDX 3.0.1 fully supports the external element
(including SpdxDocument elements) referencing use case for SpdxDocuments
previously covered by ExternalDocumentRef but also equally covers the same
use case capability for any elements whether they were originally defined
within an SpdxDocument or not to support this capability required in
SPDX 3.0.1.

The ExternalMap structure in SPDX 3.0.1 provides the ability to specify
verification and location details for any element, not just SpdxDocuments,
if appropriate but also provides simple linkage, using the “definingArtifact”
property, from element entries in the ExternalMap to SpdxDocument entries in
the ExternalMap where the elements were defined within the SpdxDocument and
verification of the elements can be achieved via proxy to the SpdxDocument
“verifiedUsing” information (this is how the SPDX 2.2.1 ExternalDocumentRef
structure currently works).

### Agent

#### Description of Change

The creator property in SPDX 2.2.1 has been replaced by createdBy and
createdUsing properties with a type Agent and Tool resp.
The supplier property has been replaced by a property suppliedBy with a type
Agent.
Additional suppliers can be provided with a a relationship to an availableFrom
relationship.
The originator property type has been replaced with the originatedBy property
with a type Agent.

An Agent can be a Person, Organization, or Software Agent.
It can also just be an Agent if it is not known what specific type an Agent is.

#### Translating from 2.2.1 to 3.0.1

The SPDX 2.2.1 creator string would be parsed and the appropriate Person,
Organization or Tool would be created depending on if the prefix is “Person:”,
“Organization:” or “Tool:” resp.
The required createdBy field for Agent or Tool may point to itself if no other
information is available.
The createdUsing property would be used for Tool whereas the createdBy
property would be used for Person and Organization.
The name would map to the “name” property.
If an email address is present, it would translate to an external identifier.

Note that in 3.0.1 the createdBy is a required field.
There will be situations where only a Tool is provided.
In that case, createdBy should point to a SoftwareAgent should be created
using the same information as the Tool.

#### Rationale

The 3.0.1 format is more machine readable and structured (e.g. you do not need
to parse the type from the string value).
It is also more flexible in that an Agent can be used even if it is not known
what the Agent type is.

### File Contributor

#### Description of Change

The fileContributor property on File has been replaced by the originatedBy
property on Artifact.

#### Translating from 2.2.1 to 3.0.1

For each fileContributor string in SPDX 2.2.1, an Person should be created and
added to the originatedBy list for the File artifact.

#### Rationale

The Artifact property originatedBy should be used to describe file contributor
information in place of the fileContributor property.

### File Type

#### Description of Change

The FileType enumeration has been replaced by two fields, the
[media type](https://www.iana.org/assignments/media-types/media-types.xhtml)
string as maintained by IANA for the content of the file
and an enumeration of SoftwarePurpose for the purpose of the file.

The property name fileType has been replaced by a property name contentType.

#### Translating from 2.2.1 to 3.0.1

#### Rationale

One of the things that we identified is that `FileType` was being used
for two things:

1. Describing the purpose of the file.
2. Describing the type of content in the file.

For SPDX 3.0.1 we split this into two properties:

- `SoftwarePurpose` to capture the purpose
  (which is of type `SoftwarePurpose`).
- `ContentType` to capture the type of content
  (which is of type `MediaType`).

The name `ContentType` was chosen to mirror the Content-Type header in HTTP
(which is also of type MediaType) and to express that this is describing the
type of content (as opposed to metadata, headers, or something else).
For example, if (and not saying we would) we extended `File` in the future to
be able to capture the type of executable header a file has (e.g. ELF), that
could also be of type `MediaType` but the property name might be
`ExecutableHeaderType`.

An example conversion table from SPDX 2.2.1 `FileType`
to SPDX 3.0.1 `contentType` or `softwarePurpose` can look like this:

| SPDX 2 File Type | SPDX 3 Software Purpose | SPDX 3 Content Type |
|------------------|-------------------------|---------------------|
| ARCHIVE | Archive | |
| BINARY | | application/octet-stream |
| SOURCE | Source | |
| TEXT | | text/plain |
| APPLICATION | Application | |
| AUDIO | | audio/* |
| IMAGE | | image/* |
| VIDEO | | video/* |
| DOCUMENTATION | Documentation | |
| SPDX | | text/spdx |
| OTHER | Other | |

### Package File Name

#### Description of Change

The packageFileName property and packageChecksum property has been replaced by
a relationship from a Package to a File.
A relationship type of hasDistributionArtifact should be used.

#### Translating from 2.2.1 to 3.0.1

Create an SPDX File with the name from the packageFileName and a verifiedUsing
value from the packageChecksum for a single file.
If the packageFileName is a directory, then the SPDX File is created with the
directory name and is verified using the contentIdentifier property on the
File and a fileKind of directory.
Create a hasDistributionArtifact relationship from the SPDX Package to the SPDX
File.

#### Rationale

Providing a File relationship to the download location will include more
detailed and complete information about the package file name used.

### External Identifiers

#### Description of Change

In SPDX 3.0.1, a properties externalIdentifier and contentIdentifier with types
ExternalIdentifier and ContentIdentifier were introduced.
This is in addition to retaining the ExternalRef property and classes.

In SPDX 2.2.1, both identifiers and references were captured in the externalRef
property for packages.

In addition to the structural changes, the “url” ExternalRef type was removed
and is replaced by the “securityOther” ExternalRef type.

#### Translating from 2.2.1 to 3.0.1

The following ExternalRef Types should be converted to ExternalIdentifiers:

- cpe22Type
- cpe23Type
- swid
- purl

The following ExternalRef Types should be converted to ContentIdentifiers:

- gitoid
- swh

All other ExternalRef types should remain as ExternalRef’s.

The url ExternalRef type should be converted to a “securityOther”.

#### Rationale

Distinguishing identifiers from references is key to several integrity and
provenance use cases.
Creating a separate property and type enables easier identification of
identifiers.

### Package URL

#### Description of Change

In SPDX 3.0.1, Package URL is a new property for Artifact which is a superclass
of Package.

Package URL is an External Ref type in SPDX 2.2.1.

#### Translating from 2.2.1 to 3.0.1

If there is a single ExternalReference of type purl without the optional
ExternalRef comment property, place that in the packageUrl property.

#### Rationale

Package URL is a very common method of identifying software packages.
Moving this to a property makes it significantly simpler to find and correlate
Package URL identifiers.

### Annotation

#### Description of Change

Annotations are now subclasses of Element, so it inherits a number of new
optional properties including names, annotations, and its own relationships.

Annotations are no longer a property of an Element.
It is now a standalone element with a “subject” field which points to the
Element being annotated.

#### Translating from 2.2.1 to 3.0.1

A new Annotation element would be created for every annotation property in an
element (Package, File or Snippet).
The subject property would point to the Element which has the Annotation as a
property.

The annotator from SPDX 2.2.1 should be translated to one of the creators for
the creationInfo for the Annotation and the annotationDate should be translated
to the created field in the same creationInfo.
The creationInfo for the Annotation should be the creationInfo of the SPDX 2.2.1
document.

The SPDX 2.2.1 “comment” should use the statement field in SPDX 3.0.1.

#### Rationale

Changing from a property to a standalone element allows for relationships to
exist outside the element itself (e.g. you can now create an amended SPDX
document which has a new annotation for an element defined in the original
document).
This also supports third parties' ability to assert Annotations on Elements
that they did not create.

### Relationship

#### Description of Change

The structure of the Relationship class has changed to have a single direction
and allow more than one related SPDX Elements.
Relationships are now subclasses of Element, so it inherits a number of new
optional properties including names, annotations, and its own relationships.

Relationships are no longer a property of an Element.
It is now a standalone element with a “from” and “to” field.

A new property “completeness” complements the use of NONE and NOASSERTION for
the related SPDX elements.

#### Translating from 2.2.1 to 3.0.1

The “from” property would be populated by the SPDX Element which has the
relationship property. The “to” property will be the relatedSpdxElement.

When translating the relationshipType, the “from” and “to” may need to be
swapped - the table below will have a “Y” in the “Swap to and from?” column
when this is necessary.

The completeness property would be constructed based on the following:

- “to” value is NONE: complete
- “to” value is NOASSERTION: noAssertion
- “to” value is an SPDX element: No value for the completeness - uses the
  default

The following table reflects the translation for relationship types
from SPDX 2.2.1 to SPDX 3.0.1:

| SPDX 2.2.1 Relationship Type | SPDX 3.0.1 Relationship Type | Swap to and from? | LifecycleScopeType |
|----------------------------|----------------------------|-------------------|--------------------|
| AMENDS | amendedBy | Y | |
| ANCESTOR_OF | ancestorOf | | |
| BUILD_DEPENDENCY_OF | dependsOn | Y | build |
| BUILD_TOOL_OF | usesTool | Y | build |
| CONTAINED_BY | contains | Y | |
| CONTAINS | contains | | |
| COPY_OF | copiedTo | Y | |
| DATA_FILE_OF | hasDataFile | Y | |
| DEPENDENCY_MANIFEST_OF | hasDependencyManifest | Y | |
| DEPENDENCY_OF | dependsOn | Y | various lifecycle scope |
| DEPENDS_ON | dependsOn | | various lifecycle scope |
| DESCENDANT_OF | descendantOf | | |
| DESCRIBED_BY | describes | Y | |
| DESCRIBES | describes | | |
| DEV_DEPENDENCY_OF | dependsOn | Y | development |
| DEV_TOOL_OF | usesTool | Y | development |
| DISTRIBUTION_ARTIFACT | hasDistributionArtifact | | |
| DOCUMENTATION_OF | hasDocumentation | Y | |
| DYNAMIC_LINK | hasDynamicLink | Y | build, runtime |
| EXAMPLE_OF | hasExample | Y | |
| EXPANDED_FROM_ARCHIVE | expandsTo | Y | |
| FILE_ADDED | hasAddedFile | Y | |
| FILE_DELETED | hasDeletedFile | Y | |
| FILE_MODIFIED | modifiedBy | | |
| GENERATED_FROM | generates | Y | |
| GENERATES | generates | | |
| HAS_PREREQUISITE | hasPrerequisite | | various lifecycle scope |
| METAFILE_OF | hasMetadata | Y | |
| OPTIONAL_COMPONENT_OF | hasOptionalComponent | Y | |
| OPTIONAL_DEPENDENCY_OF | hasOptionalDependency | Y | various lifecycle scope |
| OTHER | other | | |
| PACKAGE_OF | packagedBy | Y | |
| PATCH_FOR | patchedBy | Y | |
| PATCH_APPLIED | patchedBy | Y | |
| PREREQUISITE_FOR | hasPrerequisite | Y | various lifecycle scope |
| PROVIDED_DEPENDENCY_OF | hasProvidedDependency | Y | various lifecycle scope |
| REQUIREMENT_DESCRIPTION_FOR | hasRequirement | Y | various lifecycle scope |
| RUNTIME_DEPENDENCY_OF | dependsOn | Y | runtime |
| SPECIFICATION_FOR | hasSpecification | Y | various lifecycle scope |
| STATIC_LINK | hasStaticLink | | various lifecycle scope |
| TEST_CASE_OF | hasTestCase | Y | |
| TEST_DEPENDENCY_OF | dependsOn | Y | test |
| TEST_OF | hasTest | Y | various lifecycle scope |
| TEST_TOOL_OF | usesTool | Y | test |
| VARIANT_OF | hasVariant | Y | |

#### Rationale

The addition of the completeness attribute is clearer than the use of NONE and
NOASSERTION.

Changing from a property to a standalone element allows for relationships to
exist outside the element itself (e.g. you can now create an amended SPDX
document which has a new relationship for an element defined in the original
document). This enables primary Element creating parties as well as third
parties to express significantly greater contextual detail among content they
create as well as content created by others.

### Snippet

#### Description of Change

Byte and line range types have been changed from a StartEndPointer type to a
PositiveIntegerRange. Byte range is now optional.

#### Translating from 2.2.1 to 3.0.1

Iterate through the “ranges” property.
Any startPointer and endPointer with a property of “offset” would be translated
to a snippetByteRange property.
Any startPointer and endPointer with a property of “lineNumber” would translate
to a snippetLineRange property.

A new Relationship would be created with the “from” pointing to the
snippetFromFile and the “to” pointing to the Snippet.
The relationshipType would be CONTAINS.

#### Rationale

Using the W3C Pointer standard introduced significant complexity in the SPDX
2.2.1 specification. Although there may be some benefit in using a published
standard, we have not found any instances where the W3C Pointer ontology was
useful for SPDX use cases.

Changing the snippetFromFile from a property to a relationship
[to be filled in].

### SpecVersion

#### Description of Change

The type of SpecVersion is changed from a simple string without constraints to
a SemVer string which must follow the
[Semantic Versioning format](https://semver.org/).

This adds a constraint where a patch version is required.
Previous usage of the SpecVersion only included the major and minor version.

#### Translating from 2.2.1 to 3.0.1

Add a patch version of “0” to any previous spec version.

#### Rationale

### The additional constraints align with best practices for versioning strings

### LicenseListVersion

#### Description of Change

The type of LicenseListVersion is changed from a simple string without
constraints to a SemVer string which must follow the
[Semantic Versioning format](https://semver.org/).

This adds a constraint where a patch version is required.
Previous usage of the SPDX License List only included the major and minor
version.

#### Translating from 2.2.1 to 3.0.1

Add a patch version of “0” to any previous License List version.

#### Rationale

The additional constraints align with best practices for versioning strings.

## Hash Algorithms Added

The following hash algorithms have been newly supported in this version:

- Adler-32
- BLAKE2b-256
- BLAKE2b-384
- BLAKE2b-512
- BLAKE3
- SHA3-256
- SHA3-384
- SHA3-512
