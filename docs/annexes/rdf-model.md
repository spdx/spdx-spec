# RDF model definition and diagrams (Informative)

## Model definition

The SPDX ontology defines the classes and properties of the model in OWL,
and the constraints on them as SHACL shapes.
Both are expressed as RDF, and the ontology is published as a Turtle document
at <https://spdx.org/rdf/3.1/spdx-model.ttl>.

The terms the ontology defines are identified in the SPDX 3 vocabulary
namespace, `https://spdx.org/rdf/3/terms/`, which does not carry a minor or
patch version.
The URL above is the series URL, which serves the latest released patch
version of the ontology for one minor version of the specification.
Each patch version is also published at its own release URL, such as
<https://spdx.org/rdf/3.1.1/spdx-model.ttl>, and the ontology records that
version using `owl:versionIRI` and `owl:versionInfo`.
The namespace and the version IRI are distinct and are not interchangeable.

The ontology header therefore takes the following form, where the subject is
the version-independent namespace and the version IRI is the release URL of
one patch version:

```turtle
@prefix owl: <http://www.w3.org/2002/07/owl#> .

<https://spdx.org/rdf/3/terms/>
    a owl:Ontology ;
    owl:versionIRI <https://spdx.org/rdf/3.1.1/spdx-model.ttl> ;
    owl:versionInfo "3.1.1" ;
    owl:priorVersion <https://spdx.org/rdf/3.1.0/spdx-model.ttl> ;
    owl:backwardCompatibleWith
        <https://spdx.org/rdf/3.1.0/spdx-model.ttl> ,
        <https://spdx.org/rdf/3.0.1/spdx-model.ttl> .
```

In this example, SPDX 3.1.1 follows SPDX 3.1.0.
It is backward compatible with SPDX 3.1.0, because the two patch versions are
identical at the level of the model, and with SPDX 3.0.1, because a minor
version preserves the validity of data from earlier minor versions.
For SPDX 3.0.1, compatibility applies after its version-qualified term IRIs
have been rewritten to their canonical form, as described in
[Legacy version-qualified IRIs](../serializations.md#legacy-version-qualified-iris).
SPDX 3.1.1 does not declare `owl:backwardCompatibleWith` for SPDX 3.0.0,
because SPDX 3.0.1 tightened some of its constraints
(see [Annex F](compatibility.md#spdx-300)).

The values of the identifiers look like this:

| Identifier | Example value |
| ---------- | ------------- |
| Term IRI | `https://spdx.org/rdf/3/terms/Software/Package` |
| Series URL of the ontology | `https://spdx.org/rdf/3.1/spdx-model.ttl` |
| Ontology version IRI (release URL) | `https://spdx.org/rdf/3.1.1/spdx-model.ttl` |
| `owl:versionInfo` | `3.1.1` |
| `specVersion`, as recorded in SPDX data | `3.1` |

The term IRI carries the major version only, the series URL and `specVersion`
carry the major and minor version, and the version IRI and `owl:versionInfo`
carry the major, minor and patch version.

For the normative rules governing term IRIs, resource URLs and `specVersion`,
see
[Namespace and IRIs](../serializations.md#namespace-and-iris)
and
[Version identifiers](../serializations.md#version-identifiers).

## Diagrams

### Core profile

[![Core profile diagram][fig_core]][fig_core]

### Software profile

[![Software profile diagram][fig_software]][fig_software]

### Security profile

[![Security profile diagram][fig_security]][fig_security]

### Licensing profile

[![Licensing profile diagram][fig_licensing]][fig_licensing]

### Dataset profile

[![Dataset profile diagram][fig_dataset]][fig_dataset]

### AI profile

[![AI profile diagram][fig_ai]][fig_ai]

### Build profile

[![Build profile diagram][fig_build]][fig_build]

### Extension profile

[![Extension profile diagram][fig_extension]][fig_extension]

### Hardware profile

[![Hardware profile diagram][fig_hardware]][fig_hardware]

### Service profile

[![Service profile diagram][fig_service]][fig_service]

### SupplyChain profile

[![SupplyChain profile diagram][fig_supplychain]][fig_supplychain]

### Operations profile

[![Operations profile diagram][fig_operations]][fig_operations]

### FunctionalSafety profile

[![FunctionalSafety profile diagram][fig_functionalsafety]][fig_functionalsafety]

[fig_ai]: ../images/model-AI.png "SPDX 3.1 AI profile diagram"
[fig_build]: ../images/model-Build.png "SPDX 3.1 Build profile diagram"
[fig_core]: ../images/model-Core.png "SPDX 3.1 Core profile diagram"
[fig_dataset]: ../images/model-Dataset.png "SPDX 3.1 Dataset profile diagram"
[fig_extension]: ../images/model-Extension.png "SPDX 3.1 Extension profile diagram"
[fig_licensing]: ../images/model-Licensing.png "SPDX 3.1 Licensing profile diagram"
[fig_security]: ../images/model-Security.png "SPDX 3.1 Security profile diagram"
[fig_software]: ../images/model-Software.png "SPDX 3.1 Software profile diagram"
[fig_hardware]: ../images/model-Hardware.png "SPDX 3.1 Hardware profile diagram"
[fig_service]: ../images/model-Service.png "SPDX 3.1 Service profile diagram"
[fig_supplychain]: ../images/model-SupplyChain.png "SPDX 3.1 SupplyChain profile diagram"
[fig_operations]: ../images/model-Operations.png "SPDX 3.1 Operations profile diagram"
[fig_functionalsafety]: ../images/model-FunctionalSafety.png "SPDX 3.1 FunctionalSafety profile diagram"
