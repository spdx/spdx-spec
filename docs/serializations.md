# Model and serializations

## Overview

This document defines the data model of the SPDX standard, describing
every piece of information about systems with software components. The data
model is based on the Resource Description Framework (RDF) extensible
knowledge representation data model, which provides a flexible and extensible
way to represent and exchange information.

The data may be serialized in a variety of formats for storage and
transmission.

## RDF serialization

Since the data model is based on RDF, any SPDX data can be serialized in any of
the multiple RDF serialization formats, including but not limited to:

- JSON-LD format as defined in
  [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/);
- Turtle (Terse RDF Triple Language) format as defined in
  [RDF 1.1 Turtle](https://www.w3.org/TR/turtle/);
- N-Triples format as defined in
  [RDF 1.1 N-Triples](https://www.w3.org/TR/n-triples/); and
- RDF/XML format as defined in
  [RDF 1.1 XML Syntax](https://www.w3.org/TR/rdf-syntax-grammar/).

The SPDX specification is accompanied by a
[JSON-LD context](https://www.w3.org/TR/json-ld11/#the-context) definition file
that can be used to serialize SPDX in a much simpler and more human-readable
JSON-LD format.

### Namespace and IRIs

SPDX data can be serialized in RDF.
This can be saved in a variety of formats, like XML, JSON-LD, Turtle, etc.

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

#### Term identity and stability

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
remains valid.
See [Version identifiers](#version-identifiers).

Because term IRIs do not carry a minor version, the evolution of the
vocabulary within a major version is constrained.
See [Version identifiers](#version-identifiers).

#### Specification-defined individuals

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

#### Legacy version-qualified IRIs

SPDX 3.0.0 and SPDX 3.0.1 published term IRIs that included the full
`{major}.{minor}.{patch}` version, for example
`https://spdx.org/rdf/3.0.1/terms/Software/Package`.
A legacy IRI and its canonical form identify the same term.
However, in RDF two distinct IRIs are two distinct nodes, and no assertion
about them changes that.
Conformance to this specification is defined in terms of validation against
the SPDX 3 OWL ontology and its SHACL shapes
(see [JSON-LD validation](#json-ld-validation)), and SHACL does not perform
OWL reasoning.
A node typed with a legacy IRI is therefore not selected by a shape that
targets the canonical IRI.
For this reason, equality is established by rewriting the IRIs rather than
by asserting axioms about them.

A consumer shall rewrite legacy IRIs to their canonical form on ingest,
before validation, query, or merging into a graph.
After the rewrite, data originating from any SPDX 3.x version uses one set of
term IRIs, and validation, SPARQL query, graph merging and federated query all
behave identically without requiring a reasoner.

The rewrite shall be applied to the following IRIs, where `{v}` is `3.0.0` or
`3.0.1`:

| Legacy IRI | Canonical IRI |
| ---------- | ------------- |
| `https://spdx.org/rdf/{v}/terms/…` | `https://spdx.org/rdf/3/terms/…` |
| `https://spdx.org/rdf/{v}/creationInfo_…` | `https://spdx.org/rdf/3/creationInfo_…` |

The second row covers the `CreationInfo` instances described in
[Specification-defined individuals](#specification-defined-individuals), which
are published directly under the version segment rather than under `terms/`.
These are distinct from the `creationInfo` property, whose IRI is
`https://spdx.org/rdf/3/terms/Core/creationInfo` and which is covered by the
first row.
A rewrite restricted to `terms/` would cover the property but would not cover
these instances.

The rewrite shall not be applied to the resource URLs listed in
[Resources](#resources).
Those identify versioned documents rather than terms, and they remain
version-qualified.
A rewrite of the whole `https://spdx.org/rdf/{v}/` prefix would corrupt them
and shall not be used.

A producer shall emit only canonical term IRIs.

Each legacy IRI shall resolve, by permanent redirect, to its canonical form.

#### Bridge ontology (Informative)

For consumers that load legacy data as raw triples and cannot rewrite IRIs on
ingest, SPDX may publish a bridge ontology that relates legacy term IRIs to
their canonical counterparts using `owl:equivalentClass` and
`owl:equivalentProperty`.

A bridge ontology is an optional convenience and is not an alternative means of
achieving conformance.
It assists query answering in a store that already performs RDFS or OWL 2 RL
inference.
It does not assist validation: SHACL does not perform OWL reasoning, so a node
typed with a legacy IRI is not selected by a shape targeting the canonical IRI
merely because a bridge ontology has been loaded.
Rewriting IRIs on ingest remains the only mechanism that satisfies the
validation criteria in [JSON-LD validation](#json-ld-validation).

Where published, a bridge ontology is a separate artifact with its own version
IRI and its own lifecycle.
It imports the SPDX ontology; the SPDX ontology does not import it.
Consumers that rewrite IRIs on ingest, and consumers that never encounter data
from an earlier SPDX 3.x version, need not load it and incur no cost from it.

#### Relationship to SPDX 2 IRIs

The SPDX 2 vocabulary, whose namespace is `http://spdx.org/rdf/terms#`,
is a distinct vocabulary.
It is not governed by this clause, and its terms shall not be treated as
equivalent to SPDX 3 terms in the absence of an explicitly published mapping.
The rewriting rules in
[Legacy version-qualified IRIs](#legacy-version-qualified-iris) do not apply
to it.

SPDX 2 is organized around documents and SPDX 3 around elements, so
correspondences between the two vocabularies are frequently partial.
A published mapping should express a partial correspondence using a predicate
that does not license unsound inferences, such as `skos:closeMatch` or
`skos:broadMatch`, and should reserve `owl:equivalentClass` and
`owl:equivalentProperty` for exact correspondences.
This matters when SPDX 2 and SPDX 3 data are queried together in a federated
graph, where an overstated equivalence propagates into query results.

Guidance on the differences between SPDX 2 and SPDX 3 is available at
<https://spdx.github.io/using/diffs-from-previous-editions/>.

### Version identifiers

SPDX uses three distinct identifiers, which are versioned differently and
shall not be conflated:

| Identifier | Form | Versioned by | Identifies |
| ---------- | ---- | ------------ | ---------- |
| Term IRI | `https://spdx.org/rdf/3/terms/…` | major version only | A class, property, vocabulary, or individual in the SPDX vocabulary. |
| Resource URL | `https://spdx.org/rdf/3.1/spdx-model.ttl` | major and minor version | A published document: the ontology, the context file, the annotations file, or the JSON schema. |
| `specVersion` | `3.1.0` | major, minor and patch version | The edition of this specification that a given SPDX document claims conformance to. |

The SPDX ontology declares the version of the document it contains using
`owl:versionIRI` and `owl:versionInfo`.
The version IRI identifies one released snapshot of the vocabulary and is
distinct from the namespace of the terms that snapshot describes.

Version numbers follow *Semantic Versioning 2.0.0*, with the following
consequences for the vocabulary.

A patch version shall not change the model.
Changes between patch versions are editorial.
Data that is valid under one patch version is valid under every other patch
version of the same minor version, and the term IRIs are identical.

A minor version may add classes, properties, vocabularies, individuals and
profiles.
A minor version shall not remove a term, change the IRI of a term, or
introduce a constraint that would cause data valid under an earlier minor
version of the same major version to become invalid.
A term that is no longer recommended shall be retained and marked with
`owl:deprecated`.
A minor version shall not change the property values recorded for the
individuals described in
[Specification-defined individuals](#specification-defined-individuals).

A change that cannot satisfy these constraints requires a new major version,
and a new term namespace.

### Resources

The resources listed below are published per major and minor version of this
specification.
In the URLs below, `{X}` is the minor version, so that for SPDX 3.1 the
ontology is published at `https://spdx.org/rdf/3.1/spdx-model.ttl`.

For a minor version X of the SPDX spec:

1. The ontology is available at:
  `https://spdx.org/rdf/3.{X}/spdx-model.ttl`

1. The JSON-LD serialization annotations file is available at:
  `https://spdx.org/rdf/3.{X}/spdx-json-serialize-annotations.ttl`

1. The JSON-LD context definition is available at:
  `https://spdx.org/rdf/3.{X}/spdx-context.jsonld`

1. The JSON schema is available at:
  `https://spdx.org/schema/3.{X}/spdx-json-schema.json`

These resource URLs are immutable.
Once published for a released version of this specification, the content
served at a given resource URL shall not change.
A correction is published as a new version rather than as a replacement of an
existing resource.

Resources published for a pre-release version, identified by a version
suffixed with `-dev`, are not immutable and may change at any time.
They shall not be referenced from SPDX data that claims conformance to a
released version of this specification.

## Canonical serialization

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

## Serialization information

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

## Serialization in SPDX 3 JSON

### A strict subset of JSON-LD

The SPDX 3 JSON format is a strict subset of JSON-LD.
It requires data to be serialized according to the defined serialization
specification and validated against the SPDX 3 JSON Schema.
It may be parsed – not serialized – using standard JSON-LD libraries.

### SpdxDocument

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
In both forms, the string member shall be the resource URL of the SPDX global
context file for the version the document claims conformance to.

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
Because the resource URLs are immutable, a consumer should resolve the
`@context` value against a locally stored copy of the context file.

A producer shall use the resource URL of the context file that corresponds to
the major and minor version of the `specVersion` the document declares.
A producer shall not reference a context file by an alias, by an unversioned
URL, or by the URL of a pre-release resource.

Because term IRIs do not carry a minor version, the context files of
different SPDX 3.x versions expand the terms they share to identical IRIs.
Data produced against different SPDX 3.x versions can therefore be merged and
queried together without any mapping between term IRIs.

#### Integrity verification

A cryptographic digest of each released resource listed in
[Resources](#resources) should be published alongside it, expressed as a
SHA-256 digest in the form defined by *Subresource Integrity*.

A consumer that retrieves a resource over the network should verify it against
the published digest before use.
A consumer that has stored a local copy of a resource should verify that copy
against the published digest.

### JSON-LD validation

An SPDX serialization in JSON-LD format is considered conformant to the SPDX
specification if it adheres to the following two validation criteria:

- Structural validation: The JSON-LD document shall structurally validate
  against the SPDX 3 JSON Schema. This schema defines the expected structure of
  the JSON-LD document, including the required elements, data types, and
  permissible values.
- Semantic validation: The JSON-LD document shall successfully validate against
  the SPDX 3 OWL ontology. This ontology defines the expected relationships and
  constraints between SPDX elements. The SPDX 3 OWL ontology also incorporates
  SHACL shape restrictions to further specify these constraints.

The SPDX 3 JSON Schema is available at:
<https://spdx.org/schema/3.1/spdx-json-schema.json>

The SPDX 3 OWL ontology is available at:
<https://spdx.org/rdf/3.1/spdx-model.ttl>

### Examples

Informational JSON-LD serialization examples can be found at:
<https://github.com/spdx/spdx-examples>

## Reading JSON serialization

### Parsing JSON-LD as JSON

This section specifies the procedure for deserializing JSON-LD as a pure JSON
format, independent of RDF semantics.

At the top level, the JSON-LD shall contain two keys: `@context` and `@graph`.

#### Parsing "@context"

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

#### Parsing "@graph"

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

## File naming

An SPDX 3 file should be identifiable within a file system without inspecting
its contents.

A suggested naming convention is:

| Format  | Extension     |
| ------- | ------------- |
| JSON-LD | \*.spdx3.json |
| RDF/XML | \*.spdx3.rdf  |
