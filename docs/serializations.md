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
  `https://spdx.org/rdf/3/terms`

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

### Resources

For a minor version X of the SPDX spec:

1. The ontology is available at:
  `https://spdx.org/rdf/3.X/spdx-model.ttl`

1. The JSON-LD serialization annotations file is available at:
   `https://spdx.org/rdf/3.X/spdx-json-serialize-annotations.ttl`

1. The JSON-LD context definition is available at:
  `https://spdx.org/rdf/3.X/spdx-context.jsonld`

1. The JSON schema is available at:
  `https://spdx.org/schema/3.X/spdx-json-schema.json`

## Canonical serialization

The canonical serialization shall provide a single, deterministic, normalized,
and reproducible byte-level representation of the underlying data.
The semantic content of the canonical serialization
shall remain identical to the original data model (e.g., the RDF data),
irrespective of the serialization format employed.

Any serialization format applied to this specification
shall enforce strict normalization rules for data ordering, formatting,
and encoding to guarantee a consistent output.

For the JSON format, the canonical serialization shall conform to
the JSON Canonicalization Scheme (JCS) as defined in
[RFC 8785](https://datatracker.ietf.org/doc/rfc8785/),
subject to the following additional constraint:

- Object keys:
  A key name shall be a string containing only printable non-space ASCII
  characters in the range U+0021 through U+007E inclusive.

### Key characteristics of JCS (Informative)

For convenience, the following summarizes essential characteristics inherited
from JCS (RFC 8785) and its underlying I-JSON
([RFC 7493](https://datatracker.ietf.org/doc/rfc7493)) baseline.
Implementations should consult RFC 8785 for exact normative algorithms:

- No extraneous whitespace:
  Line breaks, spaces, and tabs do not occur outside of strings.
- Key uniqueness:
  Duplicate key names within a single object are strictly prohibited.
- Key ordering:
  The name/value pairs within an object are sorted lexicographically based
  on the exact UTF-16 code units of the key names.
- Number formatting:
  Integers and numeric values are represented in base 10 without leading zeros,
  trailing decimal zeros, or unnecessary exponential notation.
- String escaping:
  Strings are represented in UTF-8.
  Quotation marks (`"`, U+0022), reverse soliduses (`\`, U+005C),
  and control characters (U+0000 through U+001F, which includes line breaks
  and tabs) are always escaped.

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

The SPDX context file defines aliases for specific JSON-LD properties to
improve compatibility with the SPDX model. These aliases are:

- `spdxId`: An alias for the `@id` property.
- `type`: An alias for the `@type` property.

Additional namespace mappings may be defined within a separate object within
the context.

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

The `@context` key contains a list comprising a string and an object.
The string may be ignored.
The object contains key-value pairs used for substituting identifiers with
shorter abbreviations, hereafter referred to as the "namespace map".

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
