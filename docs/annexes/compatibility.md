# Compatibility with earlier versions (Informative)

This annex explains the rules for legacy IRIs in
[Legacy version-qualified IRIs](../serializations.md#legacy-version-qualified-iris)
and for SPDX 2 in
[Relationship to SPDX 2 IRIs](../serializations.md#relationship-to-spdx-2-iris),
and describes optional means of working with data from earlier SPDX versions.
It contains no requirements.

## Rewriting rather than aliasing

SPDX 3.0.1 published term IRIs that included the full
`{major}.{minor}.{patch}` version, for example
`https://spdx.org/rdf/3.0.1/terms/Software/Package`.
Such an IRI and its canonical form,
`https://spdx.org/rdf/3/terms/Software/Package`, identify the same term.

In RDF, however, two distinct IRIs are two distinct nodes, and no assertion
about them changes that.
Validation against the SPDX 3 OWL ontology and its SHACL shapes is part of
conformance to this specification
(see [JSON-LD validation](../serializations.md#json-ld-validation)),
and SHACL does not perform OWL reasoning.
A node typed with a legacy IRI is therefore not selected by a shape that
targets the canonical IRI, whatever axioms relate the two.

For this reason, the identity of a legacy IRI and its canonical form is
established by rewriting legacy IRIs on ingest.
After the rewrite the two are the same node, and validation, SPARQL query,
graph merging and federated query behave identically without a reasoner.

## SPDX 3.0.0

This section is a historical record of SPDX 3.0.0 and its relationship to
later versions.

SPDX 3.0.0 was published in April 2024, and SPDX 3.0.1 in December 2024.
The changes to term names described below were made in the weeks following
the publication of SPDX 3.0.0, while its adoption was still low, and little
SPDX data is known to use its IRIs.
Like SPDX 3.0.1, SPDX 3.0.0 published term IRIs that included the full
version, under `https://spdx.org/rdf/3.0.0/terms/`.

SPDX 3.0.1 changed SPDX 3.0.0 in two ways.

First, it renamed some terms, mostly to correct spelling and to use singular
names, and it removed `Software/contentType`, which duplicated
`Core/contentType` with the same definition and constraints.
Every other SPDX 3.0.0 term has the same name in the canonical namespace.
The terms whose names differ are:

| SPDX 3.0.0 term | Canonical term |
| --------------- | -------------- |
| `Build/parameters` | `Build/parameter` |
| `Core/imports` | `Core/import` |
| `Core/RelationshipType/hasInputs` | `Core/RelationshipType/hasInput` |
| `Core/RelationshipType/hasOutputs` | `Core/RelationshipType/hasOutput` |
| `Core/RelationshipType/hasPrerequsite` | `Core/RelationshipType/hasPrerequisite` |
| `Software/contentType` | `Core/contentType` |

For example, the SPDX 3.0.0 term
`https://spdx.org/rdf/3.0.0/terms/Core/imports` corresponds to the canonical
term `https://spdx.org/rdf/3/terms/Core/import`.
This correspondence allows SPDX 3.0.0 data to be read and queried alongside
later data.

Second, it tightened some constraints, so that data valid under SPDX 3.0.0 is
not always valid under SPDX 3.0.1 or later versions, even when its terms have
been mapped to canonical terms.
In particular:

- properties that refer to elements, such as `from` and `to` of
  `Relationship`, `element` and `rootElement` of `ElementCollection`, and
  `createdBy` of `CreationInfo`, require an IRI rather than a blank node, so
  that an element cannot be a blank node;
- `actionStatement` is required on `VexAffectedVulnAssessmentRelationship`,
  and `actionStatementTime` occurs at most once; and
- `assessedElement` of `VulnAssessmentRelationship` refers to an `Artifact`
  rather than to any `Element`.

For this reason the correspondence is not a path to validation.
The rewrite of legacy IRIs defined in
[Legacy version-qualified IRIs](../serializations.md#legacy-version-qualified-iris)
applies to SPDX 3.0.1 only, and SPDX 3.1 does not declare backward
compatibility with SPDX 3.0.0.

## Bridge ontology

A bridge ontology relates legacy term IRIs to their canonical counterparts
using `owl:equivalentClass` and `owl:equivalentProperty`.
It is intended for consumers that load legacy data as raw triples and cannot
rewrite IRIs on ingest.

A bridge ontology is an optional convenience and is not an alternative means of
achieving conformance.
It assists query answering in a store that already performs RDFS or OWL 2 RL
inference.
It does not assist validation: a node typed with a legacy IRI is not selected
by a shape targeting the canonical IRI merely because a bridge ontology has
been loaded.
Rewriting IRIs on ingest remains the only mechanism that satisfies the
validation criteria of this specification.

Where SPDX publishes a bridge ontology, it is a separate artifact with its own
version IRI and its own lifecycle.
It imports the SPDX ontology; the SPDX ontology does not import it.
Consumers that rewrite IRIs on ingest, and consumers that never encounter data
from an earlier SPDX 3.x version, do not need to load it and incur no cost
from it.

## Mapping between SPDX 2 and SPDX 3

SPDX 2 is organized around documents and SPDX 3 around elements, so
correspondences between the two vocabularies are frequently partial.

A partial correspondence is best expressed using a predicate that does not
license unsound inferences, such as `skos:closeMatch` or `skos:broadMatch`.
`owl:equivalentClass` and `owl:equivalentProperty` assert that two terms have
exactly the same extension, and are appropriate only for exact
correspondences.
The distinction matters when SPDX 2 and SPDX 3 data are queried together in a
federated graph, where an overstated equivalence propagates into query
results.
