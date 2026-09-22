# RDF model definition and diagrams (Informative)

## Model definition

The SPDX RDF ontology is expressed in RDF/OWL/SHACL format
and is published online at
[SPDX 3.1 Model](https://spdx.org/rdf/3.1/spdx-model.ttl)

The terms the ontology defines are identified in the SPDX 3 vocabulary
namespace, `https://spdx.org/rdf/3/terms/`, which does not carry a minor or
patch version.
The URL above identifies the published document for one minor version of the
specification, and the ontology records that version using `owl:versionIRI`
and `owl:versionInfo`.
These two identifiers are distinct and are not interchangeable.

The ontology header therefore takes the following form, where the subject is
the version-independent namespace and the version IRI is the published
document for one minor version:

```turtle
<https://spdx.org/rdf/3/terms/>
    a owl:Ontology ;
    owl:versionIRI <https://spdx.org/rdf/3.1/spdx-model.ttl> ;
    owl:versionInfo "3.1" .
```

The values of the three identifiers look like this:

| Identifier | Example value |
| ---------- | ------------- |
| Term IRI | `https://spdx.org/rdf/3/terms/Software/Package` |
| Ontology version IRI | `https://spdx.org/rdf/3.1/spdx-model.ttl` |
| `specVersion`, as recorded in SPDX data | `3.1.0` |

The term IRI carries no minor or patch version, the version IRI carries the
major and minor version, and `specVersion` carries the major, minor and patch
version.

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
