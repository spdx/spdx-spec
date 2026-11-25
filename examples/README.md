# Examples

The `jsonld` directory contains 2 files:

- `package_sbom.json` - An example of an SBOM containing a single package.
- `spdx-full-example.json` - A fabricated example containing all the classes
  for the current version of the Specification

The full example has three `CreationInfo` objects with different `created`
timestamps, and this is intended. `created` records when an Element was
originally created, not when the document holding it was serialized. A
document that combines Elements from several sources, like the SPDX License
List Agent here, will often carry several `CreationInfo` objects with
timestamps far apart. Each `CreationInfo` in the example has a `comment`
saying which Elements use it.

A JSON schema can be found in the `schemas` directory of this repository.

An RDF OWL Ontology and a JSON-LD context can be found in the `ontology`
directory of this repository.

For more SPDX examples, including examples using different SPDX versions,
please see:

- Examples by scenarios and use cases for a particular domain (e.g., security,
  license compliance): <https://github.com/spdx/spdx-examples>
- Code snippets demonstrating examples of how to use a particular field can be
  found on the page for that field in the
  [SPDX Specification](https://spdx.github.io/spdx-spec/).
