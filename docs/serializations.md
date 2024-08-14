# Model and serializations

## Overview

This specification defines the data model of the SPDX standard, describing
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
[JSON-LD context file](#json-ld-context-file)
that can be used to serialize SPDX in a much simpler and more human-readable
JSON-LD format.

### RDF namespace and IRI

The SPDX v3.0.1 namespace identifier (IRI) is:

    https://spdx.org/rdf/3.0.1/terms

Entries appearing in the [SPDX License List](https://spdx.org/licenses/) are
not under this namespace and use a separate mechanism for identification.

### RDF resources

1. The SPDX ontology is available at:
  [https://spdx.org/rdf/3.0.1/spdx-model.ttl](https://spdx.org/rdf/3.0.1/spdx-model.ttl)

1. The SPDX global JSON-LD context file is available at:
  [https://spdx.org/rdf/3.0.1/spdx-context.jsonld](https://spdx.org/rdf/3.0.1/spdx-context.jsonld)

1. The SPDX JSON Schema is available at:
  [https://spdx.org/schema/3.0.1/spdx-json-schema.json](https://spdx.org/schema/3.0.1/spdx-json-schema.json)

## Canonical serialization

Canonical serialization is a single, consistent, normalized, deterministic, and
reproducible form.

Such a canonical form normalizes things like ordering and formatting.

The content of the canonical serialization is exactly the same as the JSON-LD
serialization of RDF data (see 4.2), just represented in a consistent way.

Canonical serialization is in JSON format, as defined in
[RFC 8259 (IETF STD 90)](https://www.rfc-editor.org/info/rfc8259),
with the following additional characteristics:

- No line breaks
- Key names MUST be wrapped in double quotes
- No whitespace outside of strings
- `true`, `false` and `null`: the literal names must be lowercase; no other
  literal names are allowed
- Integers: represented in base 10 using decimal digits. This designates an
  integer component that may be prefixed with an optional minus sign.
  Leading zeros are not allowed.
- Strings: UTF-8 representation without specific canonicalisation. A string
  begins and ends with quotation marks (%x22). Any Unicode characters may be
  placed within the quotation marks, except for the two characters that MUST be
  escaped by a reverse solidus: quotation mark, reverse solidus, and the
  control characters (U+0000 through U+001F).
- Arrays: An array structure is represented as square brackets surrounding zero
  or more items. Items are separated by commas.
- Objects: An object structure is represented as a pair of curly brackets
  surrounding zero or more name/value pairs (or members). A name is a string
  containing only ASCII characters (0x21-0x7F). The names within an object must
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

A serialization must not contain more than one SpdxDocument.

A given instance of serialization must not define more than one SpdxDocument
element.

## Serialization in JSON-LD

JSON-LD is a JSON-based format to encode RDF graphs.
The JSON-LD is an RDF format and follows the serialization rules of the
[RDF serialization](#rdf-serialization) mentioned above.

### Serializing SpdxDocument

The following SpdxDocument properties shall be mapped to native JSON-LD
mechanisms as defined within the JSON-LD syntax specification.

Any properties not explicitly listed below must be serialized as part of the
SpdxDocument element within the JSON-LD serialized data.

Deserialization of any JSON-LD serialized SPDX content shall expand the
inverse of these native mappings such that the logical SpdxDocument element
directly contains its complete set of properties.

#### namespaceMap

The namespaceMap element utilizes the mechanism as defined in the
[term-to-IRI expansion](https://www.w3.org/TR/json-ld11/#example-11-term-expansion-from-context-definition)
of the JSON-LD specification.

#### element

The [graph objects](https://www.w3.org/TR/json-ld11/#graph-objects) `@graph`,
as defined in the JSON-LD specification, enumerates the elements of an
SpdxDocument.

The RDF graph representing an instance of the SPDX model shall adhere to the
following structure:

- All nodes representing Elements (i.e., objects that are subclasses of
  Element) must be included as a top-level list under the `@graph` key.
- References to Element nodes must utilize the corresponding URIs of the
  referenced Elements.

Inlining or embedding of Element nodes within other nodes is strictly
prohibited.

Non-Element nodes, such as those of type `ExternalRef` or similar complex data
classes, shall be inlined within the `@graph`.

### JSON-LD context file

[JSON-LD contexts](https://www.w3.org/TR/json-ld11/#the-context)
allow JSON documents to use simple, human-readable, locally
defined terms while ensuring data interoperability across different systems.

The SPDX global JSON-LD context file must be used universally for all SPDX
documents in JSON-LD format that adhere to a specific SPDX version.

All SPDX documents in JSON-LD format must include a reference to the SPDX
global context file at the top level.
This reference is achieved using the following JSON construct:

```json
"@context": "https://spdx.org/rdf/3.0.1/spdx-context.jsonld"
```

The SPDX context file defines aliases for specific JSON-LD properties to
improve compatibility with the SPDX model.  These aliases are:

- `spdxId`: An alias for the `@id` property.
- `type`: An alias for the `@type` property.

Additional namespace mappings may be defined within a separate object within
the context.

### JSON-LD validation

An SPDX serialization in JSON-LD format is considered conformant to the SPDX
specification if it adheres to the following two validation criteria:

- Structural validation: The JSON-LD document must structurally validate
  against the SPDX JSON Schema. This schema defines the expected structure of
  the JSON-LD document, including the required elements, data types, and
  permissible values.
- Semantic validation: The JSON-LD document must successfully validate against
  the SPDX OWL ontology. This ontology defines the expected relationships and
  constraints between SPDX elements. The SPDX OWL ontology also incorporates
  SHACL shape restrictions to further specify these constraints.
