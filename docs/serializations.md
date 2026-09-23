# Model and serializations

## Overview

The SPDX data model represents information about systems and their software
components, and about related topics such as licensing, security and
provenance.
This information is expressed as a set of elements.

An element is an instance of a subclass of `Element`.
It is a unit of information that has its own identifier,
such as a software package, a physical hardware device, a file, a person,
a vulnerability, or a relationship between other elements.
Elements refer to each other by their identifiers.
A collection of elements, such as an `SpdxDocument` or a `Bom`, is itself an
element.
Information that has no identity of its own, such as `CreationInfo`, a `Hash`,
or an `ExternalRef`, is represented by instances of classes that are not
elements, and is attached to the elements it describes.

The terms of the model are organized into namespaces.
A namespace is a named group of related terms for one domain, such as `Core`,
`Software` or `Security`, and its name forms part of the IRI of each term it
contains (see [Vocabulary namespace](#vocabulary-namespace)).
A namespace defines classes, properties, vocabularies (enumerated value
lists), and individuals (named instances, such as `NoneElement`).
The `Core` namespace defines the foundational terms on which the other
namespaces build.
SPDX data can use terms from any namespace.

A namespace is distinct from a profile.
A profile is a conformance point that identifies the terms, drawn from one or
more namespaces, that a tool supports, and may add constraints on their use
(see [Introduction to profiles](conformance.md#introduction-to-profiles)).
For example, the Lite profile defines no terms of its own, and adds
constraints on `Package` from the `Software` namespace.

The model is defined as an RDF vocabulary.
Its classes and properties form an OWL ontology, and the constraints on them
are expressed as SHACL shapes
(see [Annex A](annexes/rdf-model.md)).
SPDX data is therefore RDF data, and each term of the model is identified by
an IRI.

The remainder of this clause specifies the IRIs of the terms, the resources
published for each version of this specification, and the serialization of
SPDX data.

## Namespace and IRIs

### Vocabulary namespace

1. The namespace for SPDX is
  `https://spdx.org/rdf/3/terms/`

1. IRIs for a namespace/profile are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}`

1. IRIs for a class are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}/{Classname}`

1. IRIs for a property are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}/{Propertyname}`

1. IRIs for a vocabulary (an enumerated value list) are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}/{Vocabularyname}`

1. IRIs for an enumerated value are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}/{Vocabularyname}/{Entryname}`

1. IRIs for an individual value are of the form:
  `https://spdx.org/rdf/3/terms/{Namespacename}/{Individualname}`

Please note that entries appearing in the
[SPDX License List](https://spdx.org/licenses/) are not under this namespace.

### Version identifiers

SPDX uses the following identifiers, which are versioned differently and
shall not be conflated:

| Identifier | Form | Versioned by | Identifies |
| ---------- | ---- | ------------ | ---------- |
| Term IRI | `https://spdx.org/rdf/3/terms/…` | major version only | A class, property, vocabulary, or individual in the SPDX vocabulary. |
| Series URL | `https://spdx.org/rdf/3.1/spdx-model.ttl` | major and minor version | The latest released patch version of a published document within one minor version. |
| Release URL | `https://spdx.org/rdf/3.1.0/spdx-model.ttl` | major, minor and patch version | One released version of a published document. |
| `specVersion` | `3.1` | major and minor version | The minor version of this specification that SPDX data claims conformance to. |

The published documents and their URLs are listed in
[Published resources](#published-resources).

Version numbers follow *Semantic Versioning 2.0.0*.
The following subclauses set out which changes to the vocabulary are permitted
at each level of version.

#### Patch versions

A patch version shall not change the model.
Between patch versions of the same minor version:

- the only permitted changes are corrections to human-readable text, namely
  the prose of this specification and the descriptions of terms carried in the
  ontology as `rdfs:comment` values, and such a correction shall not change the
  meaning of any requirement;
- no term shall be added, removed or renamed, and the name of a term,
  including an `rdfs:label` value, shall not change; and
- no class, property, datatype, vocabulary entry, individual or constraint
  shall change.

The metadata that identifies the ontology document itself, namely its
`owl:versionIRI`, its `owl:versionInfo` and its date of publication, differs
between patch versions, and is not part of the model.

At the level of the model, all patch versions of one minor version are
therefore identical.
They define the same terms, with the same IRIs and the same constraints, and
data that is valid under one patch version is valid under every other patch
version of the same minor version.
A correction that would change the model, including the correction of a
disagreement between the text of this specification and an artifact, is
published in a new minor version.

#### Minor versions

A minor version may add classes, properties, vocabularies, individuals and
profiles.
A minor version shall not:

- remove a term, or change the IRI of a term;
- except as permitted below, introduce a constraint that would cause data
  valid under an earlier minor version of the same major version to become
  invalid; or
- change the property values recorded for the individuals described in
  [Specification-defined individuals](#specification-defined-individuals).

A term that is no longer recommended shall be retained and marked with
`owl:deprecated`.

A minor version may correct a constraint in an artifact that disagrees with the
text of this specification, even where the correction causes data that was
valid against the earlier artifact to become invalid.
Such data did not conform to this specification, because the text prevails
over the artifact
(see [Normative text and machine-readable artifacts](conformance.md#normative-text-and-machine-readable-artifacts)).
Each such correction shall be listed as an erratum of the minor version in
[Annex G](annexes/changes.md).

#### Major versions

A change that cannot satisfy the rules for patch and minor versions requires a
new major version, and a new term namespace.

#### Value of specVersion

The value of `specVersion` in SPDX data should consist of the major and minor
version only, such as `3.1`.
Because the patch versions of one minor version are identical at the level of
the model, such a value claims conformance to every patch version of that
minor version.

The `VersionNumber` datatype also permits a patch version, such as `3.1.0`.
A value that includes a patch version claims conformance to the same minor
version, and is equivalent to the value without it.

#### Ontology version metadata

The SPDX ontology identifies the document it contains using `owl:versionIRI`
and `owl:versionInfo`, and should identify its relationship to earlier
releases using `owl:priorVersion` and `owl:backwardCompatibleWith`:

- `owl:versionIRI` is the release URL of the ontology document.
  It identifies one released snapshot of the vocabulary, and is distinct from
  the namespace of the terms that snapshot describes.
- `owl:versionInfo` is the version number of that release, such as `3.1.1`.
- `owl:priorVersion` is the release URL of the release that precedes it.
- `owl:backwardCompatibleWith` is the release URL of each earlier release of
  the same major version with which it is backward compatible.

#### SPDX 3.0.0 and SPDX 3.0.1

This versioning policy applies from SPDX 3.1.
SPDX 3.0.0 and SPDX 3.0.1 were published before it was adopted, and do not
follow it.
In particular, their term IRIs carry the full version, so that the same term
has a different IRI in each of them.

- Data that uses SPDX 3.0.1 term IRIs is handled as described in
  [Legacy version-qualified IRIs](#legacy-version-qualified-iris).
  Once its term IRIs have been rewritten, data that is valid under SPDX 3.0.1
  is valid under SPDX 3.1 and later minor versions.
- Data that uses SPDX 3.0.0 term IRIs is not covered by that rewrite, because
  SPDX 3.0.1 renamed some of its terms and tightened some of its constraints
  (see [Annex F](annexes/compatibility.md#spdx-300)).

### Term identity and stability

The `3` in a term IRI denotes the major version of the SPDX specification.
It is an opaque part of the name and not an assertion about which version of
the specification a term belongs to.

Term IRIs shall not carry a minor or patch version.
A term introduced in SPDX 3.0 retains the same IRI in SPDX 3.1 and in every
subsequent SPDX 3.x version.
The IRIs of the terms are therefore stable across the whole SPDX 3 series,
and data expressed against different SPDX 3.x versions can be merged and
queried without any translation of term IRIs.

A term IRI denotes exactly one concept for the lifetime of the major version.
A term IRI shall not be reused to denote a different concept.
Where the meaning of a term changes incompatibly, a new term IRI shall be
minted instead.

Extending the description of a term does not change the term.
A later minor version may describe a class more fully, for example by adding a
property to it, without minting a new IRI.
The class denotes the same concept, described in more detail, and data
expressed against the earlier version remains data about that same class.
What distinguishes an extension from an incompatible change is not whether the
description grew, but whether data that was valid under the earlier version
remains valid, as set out in [Minor versions](#minor-versions).

### Specification-defined individuals

This specification defines a small number of individuals in the ontology
itself, together with the `CreationInfo` instances that record when and by whom
those individuals were defined.
The individuals are terms and their IRIs follow the rules above.
The `CreationInfo` instances are published directly under
`https://spdx.org/rdf/3/` rather than under `terms/`:

- `https://spdx.org/rdf/3/creationInfo_NoAssertionElement`
- `https://spdx.org/rdf/3/creationInfo_NoAssertionLicense`
- `https://spdx.org/rdf/3/creationInfo_NoneElement`
- `https://spdx.org/rdf/3/creationInfo_NoneLicense`
- `https://spdx.org/rdf/3/creationInfo_SpdxOrganization`

The property values of each of these instances are those with which the
instance was first published in a released version of this specification.
A later version of this specification shall not change them.
In particular, `specVersion` and `created` shall retain the values first
published together, and shall not be updated to the version or the date of the
ontology document in which the instance appears.
For example, the instance describing `NoneElement` was first published in
SPDX 3.0.1 with a `specVersion` of `3.0.1` and a `created` of
`2024-11-22T03:00:01Z`, and it records those values in every subsequent
SPDX 3.x version of the ontology.

The IRIs of these instances are stable across the SPDX 3 series, so if each
version of the ontology asserted different values for the same instance,
merging the ontologies of two versions into a single graph would give that
instance more than one `specVersion` and more than one `created`.
The cardinality of each is exactly one, so the merged graph would not satisfy
the SHACL shapes of this specification.

### Legacy version-qualified IRIs

SPDX 3.0.1, which predates the versioning policy in
[Version identifiers](#version-identifiers), published term IRIs that
included the full `{major}.{minor}.{patch}` version, for example
`https://spdx.org/rdf/3.0.1/terms/Software/Package`.
A legacy IRI and its canonical form identify the same term.
This identity is established by rewriting the IRIs, not by asserting axioms
about them
(see [Annex F](annexes/compatibility.md#rewriting-rather-than-aliasing)).

A consumer shall rewrite legacy IRIs to their canonical form on ingest,
before validation, query, or merging into a graph.
After the rewrite, data originating from SPDX 3.0.1 and from later SPDX 3.x
versions uses one set of term IRIs, and validation, SPARQL query, graph
merging and federated query all behave identically without requiring a
reasoner.

The rewrite shall be applied to the following IRIs:

| Legacy IRI | Canonical IRI |
| ---------- | ------------- |
| `https://spdx.org/rdf/3.0.1/terms/…` | `https://spdx.org/rdf/3/terms/…` |
| `https://spdx.org/rdf/3.0.1/creationInfo_…` | `https://spdx.org/rdf/3/creationInfo_…` |

The second row covers the `CreationInfo` instances described in
[Specification-defined individuals](#specification-defined-individuals), which
are published directly under the version segment rather than under `terms/`.
These are distinct from the `creationInfo` property, whose IRI is
`https://spdx.org/rdf/3/terms/Core/creationInfo` and which is covered by the
first row.
A rewrite restricted to `terms/` would cover the property but would not cover
these instances.

The rewrite shall not be applied to the resource URLs listed in
[Published resources](#published-resources).
Those identify versioned documents rather than terms, and they remain
version-qualified.
A rewrite of the whole `https://spdx.org/rdf/3.0.1/` prefix would corrupt them
and shall not be used.

A producer shall emit only canonical term IRIs.

Each legacy IRI shall resolve, by permanent redirect, to its canonical form.

SPDX 3.0.0 also published version-qualified term IRIs, under
`https://spdx.org/rdf/3.0.0/terms/`.
They are not legacy IRIs in the sense of this clause, and the rewrite does not
apply to them.
The correspondence between SPDX 3.0.0 terms and canonical terms is recorded in
[Annex F](annexes/compatibility.md#spdx-300) as a historical record.
A consumer may use that correspondence to interpret SPDX 3.0.0 data, but data
converted in this way is not thereby valid under this specification.

### Relationship to SPDX 2 IRIs

The SPDX 2 vocabulary, whose namespace is `http://spdx.org/rdf/terms#`,
is a distinct vocabulary.
It is not governed by this clause, and its terms shall not be treated as
equivalent to SPDX 3 terms in the absence of an explicitly published mapping.
The rewriting rules in
[Legacy version-qualified IRIs](#legacy-version-qualified-iris) do not apply
to it.

Considerations for mapping between the two vocabularies are described in
[Annex F](annexes/compatibility.md#mapping-between-spdx-2-and-spdx-3).

Guidance on the differences between SPDX 2 and SPDX 3 is available at
<https://spdx.github.io/using/diffs-from-previous-editions/>.

## Published resources

The resources listed below are published for each released version of this
specification.
In the URLs below, `{X}` is the minor version and `{Z}` is the patch version.

| Resource | Series URL | Release URL |
| -------- | ---------- | ----------- |
| Ontology | `https://spdx.org/rdf/3.{X}/spdx-model.ttl` | `https://spdx.org/rdf/3.{X}.{Z}/spdx-model.ttl` |
| JSON-LD serialization annotations | `https://spdx.org/rdf/3.{X}/spdx-json-serialize-annotations.ttl` | `https://spdx.org/rdf/3.{X}.{Z}/spdx-json-serialize-annotations.ttl` |
| JSON-LD context | `https://spdx.org/rdf/3.{X}/spdx-context.jsonld` | `https://spdx.org/rdf/3.{X}.{Z}/spdx-context.jsonld` |
| JSON schema | `https://spdx.org/schema/3.{X}/spdx-json-schema.json` | `https://spdx.org/schema/3.{X}.{Z}/spdx-json-schema.json` |

The two forms serve different purposes.
A series URL is intended for general use.
It is the URL by which SPDX data, and the tools that produce, consume and
process SPDX data, should reference a resource, so that they follow the latest
release of the minor version without change.
A release URL is intended for exact reference.
It identifies one released version of a resource, whose content does not
change, and is used where that exact content matters, such as for archiving,
for citation, as the version IRI of the ontology, and for integrity
verification (see [Integrity verification](#integrity-verification)).

Conformance to this specification is claimed and determined against a minor
version, which is identified by its series URL.
A release URL does not identify a separate target of conformance.
Because the patch versions of one minor version are identical at the level of
the model, validation against the resources at any release URL of that minor
version gives the same result as validation against the resources at its
series URL.

Once published, the content served at a release URL shall not change.
A correction is published as a new patch version rather than as a replacement
of an existing release.

A series URL is an alias for the release URL of the latest released patch
version of the same minor version.
It is updated to the new release when a patch version is released.
For example, when SPDX 3.0.1 and SPDX 3.1.0 are the latest releases,
the series URLs for `3.0` and `3.1` serve SPDX 3.0.1 and SPDX 3.1.0
respectively; when SPDX 3.1.1 is released, the series URL for `3.1` serves
SPDX 3.1.1, while the release URL for `3.1.0` continues to serve SPDX 3.1.0.
Because the patch versions of one minor version are identical at the level of
the model (see [Patch versions](#patch-versions)),
data that references a series URL keeps the same meaning when the series URL
begins to serve a new patch version.

A series URL shall not serve a pre-release version.

Resources published for a pre-release version, identified by a version
suffixed with `-dev` or with a release candidate suffix, may change at any
time.
They shall not be referenced from SPDX data that claims conformance to a
released version of this specification.

## Serialization of SPDX data

### Serialization formats

SPDX data can be serialized in any RDF serialization format, including but not limited to:

- JSON-LD format as defined in
  [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/);
- Turtle (Terse RDF Triple Language) format as defined in
  [RDF 1.1 Turtle](https://www.w3.org/TR/turtle/);
- N-Triples format as defined in
  [RDF 1.1 N-Triples](https://www.w3.org/TR/n-triples/); and
- RDF/XML format as defined in
  [RDF 1.1 XML Syntax](https://www.w3.org/TR/rdf-syntax-grammar/).

This specification also provides a
[JSON-LD context](https://www.w3.org/TR/json-ld11/#the-context) file that maps
the terms of the model to short JSON keys, for use when SPDX data is serialized
as JSON-LD (see [SPDX 3 JSON serialization](#spdx-3-json-serialization)).

### File naming

An SPDX 3 file should be identifiable within a file system without inspecting
its contents.

A suggested naming convention is:

| Format  | Extension     |
| ------- | ------------- |
| JSON-LD | \*.spdx3.json |
| RDF/XML | \*.spdx3.rdf  |

### SpdxDocument and serialization

A collection of elements may be serialized in multiple formats.

An SpdxDocument element represents a collection of
elements across all serialization data formats within the model.

The actual serialized bytes is represented by an Artifact element within the
model.

A Relationship of type serializedInArtifact links an SpdxDocument to one or
more serialized forms of itself.

When serializing a physical SpdxDocument, any property of the logical element
that can be natively represented within the chosen serialization format
(e.g., `@context` prefixes in JSON-LD instead of the namespaceMap) may utilize
these native mechanisms. All remaining properties shall be serialized within
the SpdxDocument element itself.

A serialization shall not contain more than one SpdxDocument.

A given instance of serialization shall not define more than one SpdxDocument
element.

### Canonical serialization

Canonical serialization is a single, consistent, normalized, deterministic, and
reproducible form.

Such a canonical form normalizes things like ordering and formatting.

The content of the canonical serialization is exactly the same as the JSON-LD
serialization of RDF data, just represented in a consistent way.

Canonical serialization is in JSON format, as defined in
[RFC 8259 (IETF STD 90)](https://datatracker.ietf.org/doc/rfc8259/),
with the following additional characteristics:

- No line breaks
- Key names shall be wrapped in double quotes
- No whitespace outside of strings
- `true`, `false` and `null`: the literal names shall be lowercase; no other
  literal names are allowed
- Integers: represented in base 10 using decimal digits. This designates an
  integer component that may be prefixed with an optional minus sign.
  Leading zeros are not allowed.
- Strings: UTF-8 representation without specific normalization. A string
  begins and ends with quotation marks (%x22). Any Unicode characters may be
  placed within the quotation marks, except for the two characters that shall be
  escaped by a reverse solidus: quotation mark, reverse solidus, and the
  control characters (U+0000 through U+001F).
- Arrays: An array structure is represented as square brackets surrounding zero
  or more items. Items are separated by commas.
- Objects: An object structure is represented as a pair of curly brackets
  surrounding zero or more name/value pairs (or members). A name is a string
  containing only ASCII characters (0x21-0x7F). The names within an object shall
  be unique. A single colon comes after each name, separating the name from the
  value. A single comma separates a value from a following name. The name/value
  pairs are ordered by name.

## SPDX 3 JSON serialization

### A strict subset of JSON-LD

The SPDX 3 JSON format is a strict subset of JSON-LD.
It requires data to be serialized according to the defined serialization
specification and validated against the SPDX 3 JSON Schema.
It may be parsed – not serialized – using standard JSON-LD libraries.

### JSON-LD context file

JSON-LD contexts allow JSON documents to use simple, human-readable, locally
defined terms while ensuring data interoperability across different systems.

The SPDX global JSON-LD context file shall be used universally for all SPDX
documents in JSON-LD format that adhere to a specific SPDX version.

SPDX global JSON-LD context file is available at:
<https://spdx.org/rdf/3.1/spdx-context.jsonld>

All SPDX documents in JSON-LD format shall include a reference to the SPDX
global context file at the top level.
This reference is achieved using the following JSON construct:

```json
{ "@context": "https://spdx.org/rdf/3.1/spdx-context.jsonld" }
```

The value of `@context` may also be an array whose first member is the string
above and whose second member is an object carrying additional namespace
mappings, as described in
[Parsing "@context"](#parsing-context).
In both forms, the string member shall be the series URL of the SPDX global
context file for the minor version the document claims conformance to
(see [Offline processing and context pinning](#offline-processing-and-context-pinning)).

The SPDX context file defines aliases for specific JSON-LD properties to
improve compatibility with the SPDX model. These aliases are:

- `spdxId`: An alias for the `@id` property.
- `type`: An alias for the `@type` property.

Additional namespace mappings may be defined within a separate object within
the context.

#### Offline processing and context pinning

The value of `@context` is an identifier of the context definition.
It is not an instruction to retrieve that definition.

A conformant consumer shall be able to process an SPDX document in JSON-LD
format without network access, and shall not require the `@context` value to
be dereferenced.
A consumer should resolve the `@context` value against a locally stored copy
of the context file.

A producer shall reference the context file by the series URL for the major
and minor version of the `specVersion` the document declares.
A producer shall not reference a context file by a release URL, by an
unversioned URL, or by the URL of a pre-release resource.

A consumer shall accept a reference to the context file by the release URL of
any released patch version of a minor version, and shall treat it as a
reference by the series URL of that minor version.
SPDX data produced before this rule was adopted, such as data that references
`https://spdx.org/rdf/3.0.1/spdx-context.jsonld`, uses such references.

Because the patch versions of one minor version are identical at the level of
the model, their context files expand every term to the same IRI.
A locally stored copy of the context file of any released patch version can
therefore be used to resolve the series URL, and any release URL, of that
minor version.

Because term IRIs do not carry a minor version, the context files of
different SPDX 3.x versions expand the terms they share to identical IRIs.
Data produced against different SPDX 3.x versions can therefore be merged and
queried together without any mapping between term IRIs.

#### Integrity verification

A cryptographic digest of each resource listed in
[Published resources](#published-resources) should be published alongside its
release URL, expressed as a SHA-256 digest in the form defined by
*Subresource Integrity*.
A series URL has no digest of its own, because its content changes when a new
patch version is released.

A consumer that retrieves a resource over the network should retrieve it from
its release URL, and should verify it against the published digest before use.
A consumer that has stored a local copy of a resource should verify that copy
against the digest published for the release URL from which it was obtained.

### Mapping of SpdxDocument properties

The following SpdxDocument properties are mapped to native JSON-LD mechanisms
in accordance with JSON-LD syntax specifications. Any property not explicitly
listed below shall be serialized directly within the SpdxDocument element of
the JSON-LD data.

During deserialization of JSON-LD formatted SPDX content, the inverse of these
native mappings shall be expanded to ensure the logical SpdxDocument element
directly contains its complete set of properties.

#### namespaceMap

The namespaceMap shall utilize the
[term to IRI mapping](https://www.w3.org/TR/json-ld11/#example-11-term-expansion-from-context-definition)
defined within the
[JSON-LD context](https://www.w3.org/TR/json-ld11/#the-context).

#### element

The [graph objects](https://www.w3.org/TR/json-ld11/#graph-objects), `@graph`,
shall enumerate the elements comprising the SpdxDocument.

Within the RDF graph of an SPDX model instance, all Element nodes
(i.e., objects that are subclasses of Element) shall be represented as
a top-level list under the `@graph` key.
Accordingly, all references to Element nodes shall use the URI of the
referenced Element.

Element nodes shall not be inlined or embedded into other nodes.

Non-element data (e.g., instances of ExternalRef or comparable complex data
classes) may be inlined, or they may be included as a top-level
[blank node](https://www.w3.org/TR/rdf12-concepts/#section-blank-nodes)
under the `@graph`.

### JSON-LD serialization annotations

To assist implementers in developing software bindings and serialization
tooling, a serialization annotations file is provided.
While the core RDF model defines the semantic data relationships,
this file provides supplementary metadata to guide how specific elements
should be structured in code and subsequently serialized.

For example, the annotations are used to instruct serialization logic to:

- Map logical identifier properties of core model elements to specific JSON-LD
  field names.
- Flag designated extension classes as extensible, indicating that software
  implementations should permit the inclusion of custom or arbitrary properties.

The SPDX JSON-LD serialization annotations file is available at:
<https://spdx.org/rdf/3.1/spdx-json-serialize-annotations.ttl>

### JSON-LD validation

In addition to the other requirements of this specification, an SPDX
serialization in JSON-LD format shall satisfy the following two validation
criteria:

- Structural validation: The JSON-LD document shall structurally validate
  against the SPDX 3 JSON Schema. This schema defines the expected structure of
  the JSON-LD document, including the required elements, data types, and
  permissible values.
- Semantic validation: The JSON-LD document shall successfully validate against
  the SPDX 3 OWL ontology. This ontology defines the expected relationships and
  constraints between SPDX elements. The SPDX 3 OWL ontology also incorporates
  SHACL shape restrictions to further specify these constraints.

Some requirements of this specification are not expressed in the JSON Schema
or in the ontology.
Where either disagrees with the text of this specification, the text prevails
(see [Normative text and machine-readable artifacts](conformance.md#normative-text-and-machine-readable-artifacts)).

The JSON Schema and the ontology used for validation are those published at
the series URLs of the minor version the document claims conformance to
(see [Published resources](#published-resources)).
A copy of the resources at a release URL of that minor version may be used in
their place, because it gives the same result.
For SPDX 3.1, the series URLs are:

- JSON Schema: <https://spdx.org/schema/3.1/spdx-json-schema.json>
- Ontology: <https://spdx.org/rdf/3.1/spdx-model.ttl>

## Parsing SPDX 3 JSON as plain JSON

This section specifies the procedure for deserializing JSON-LD as a pure JSON
format, independent of RDF semantics.

At the top level, the JSON-LD shall contain two keys: `@context` and `@graph`.

### Parsing "@context"

The `@context` key contains either a string, or an array comprising a string
and an object.
The string is the resource URL of the SPDX global context file.
Because this procedure does not interpret RDF semantics, the string may be
ignored.
Where present, the object contains key-value pairs used for substituting
identifiers with shorter abbreviations, hereafter referred to as the
"namespace map".
Where no object is present, the namespace map is empty.

During deserialization, the following procedure shall be applied:

- Each string functioning as an identifier (including values of the `spdxId`
  and `@id` keys, as well as all strings where objects are expected in
  accordance with the SPDX 3 model) shall be split at the first colon into
  a "prefix:suffix" format.
- If the suffix does not begin with "//" and the prefix corresponds to a key
  within the namespace map, the "prefix:" shall be replaced with the
  corresponding value from the namespace map.
- Otherwise, the string shall remain unmodified.

Upon completion of this procedure for all identifiers, the `@context` shall
be ignored.

### Parsing "@graph"

The `@graph` key contains an array of objects.
Each object includes a `type` key specifying its corresponding class within
the SPDX 3 model.
The remaining keys within the object represent the properties of that class.
The `spdxId` key specifies the identifier used to reference the object.

Not all objects within this array are subclasses of Element.
Because the `spdxId` key is exclusive to Element instances,
non-element objects utilize an `@id` key instead.
The `@id` value functions identically to `spdxId` for the purpose of
identifying and referencing the object.

During deserialization, if a string is present in a position where the SPDX 3
model specifies an object, that string shall be substituted with the resolved
object possessing the matching `spdxId` or `@id` value.

## Examples

Informational JSON-LD serialization examples can be found at:
<https://github.com/spdx/spdx-examples>
