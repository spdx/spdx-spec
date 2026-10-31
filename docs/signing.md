# Signing SPDX 3 JSON documents

SPDX 3 JSON documents may be signed using [ITU-T X.590 JSON Signature Schema (JSS)][JSS].
The signature shall be placed in a `signatures` property at the top level of
the document. For the structure of the signature, see the [JSS][JSS]
specification.

For SPDX, sub-objects of the document (e.g.  individual objects in the `@graph`
list) are not allowed to be signed. Only the object at the root of the document
can contain a signature (meaning it covers the entire document).

[JSS]: https://www.itu.int/epublications/en/publication/itu-t-x-590-2023-10-json-signature-scheme-jss/en
