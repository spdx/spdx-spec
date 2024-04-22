# 4 Model and serializations

## 4.1 Overview

This specification defines the data model of the SPDX standard, describing every piece of information about systems with software components. The data model is based on the Resource Description Framework (RDF) extensible knowledge representation data model, which provides a flexible and extensible way to represent and exchange information.

The data may be serialized in a variety of formats for storage and transmission.

## 4.2 RDF Serialization

Since the data model is based on RDF, any SPDX data can be serialized in any of the multiple RDF serialization formats, including but not limited to:

- JSON-LD format as defined in [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/);
- Turtle (Terse RDF Triple Language) format as defined in [RDF 1.1 Turtle](https://www.w3.org/TR/turtle/);
- N-Triples format as defined in [RDF 1.1 N-Triples](https://www.w3.org/TR/n-triples/); and
- RDF/XML format as defined in [RDF 1.1 XML Syntax](https://www.w3.org/TR/rdf-syntax-grammar/).

The SPDX specification is accompanied by a [JSON-LD context](https://www.w3.org/TR/json-ld11/#the-context) definition file that can be used to serialize SPDX in a much simpler and more human-readable JSON-LD format.

## 4.3 Canonical serialization

Canonical serialization is single, consistent, normalized, deterministic, and reproducible form.

Such a canonical form normalizes things like ordering and formatting.

The content of the canonical serialization is exactly the same as the JSON-LD serialization of RDF data (see 4.2), just represented in a consistent way.

Canonical serialization is in JSON format, as defined in RFC 8259 (IETF STD 90), with the following additional characteristics:

- no line breaks
- key names MUST be wrapped in double quotes
- no whitespace outside of strings
- true, false and null: the literal names must be lowercase; no other literal names are allowed
- integers: represented in base 10 using decimal digits. This designates an integer component that may be prefixed with an optional minus sign. Leading zeros are not allowed.
- strings: UTF-8 representation without specific canonicalisation. A string begins and ends with quotation marks (%x22). Any Unicode characters may be placed within the quotation marks, except for the two characters that MUST be escaped by a reverse solidus: quotation mark, reverse solidus, and the control characters (U+0000 through U+001F).
- arrays: An array structure is represented as square brackets surrounding zero or more items. Items are separated by commas.
- objects: An object structure is represented as a pair of curly brackets surrounding zero or more name/value pairs (or members). A name is a string containing only ASCII characters (0x21-0x7F). The names within an object must be unique. A single colon comes after each name, separating the name from the value. A single comma separates a value from a following name. The name/value pairs are ordered by name.
