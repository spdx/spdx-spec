# Changes from earlier versions (Informative)

This annex lists the errata and other notable changes in each minor version of
this specification, relative to the preceding version.

An erratum corrects a machine-readable artifact that disagreed with the text of
this specification.
Where the correction causes data that was valid against the earlier artifact to
become invalid, that data did not conform to the earlier version, because the
text prevails over the artifacts
(see [Normative text and machine-readable artifacts](../conformance.md#normative-text-and-machine-readable-artifacts)
and [Version identifiers](../serializations.md#version-identifiers)).

## SPDX 3.1

### Errata

The following constraints are tightened to match the normative text.

- `specVersion`: pre-release and build suffixes are no longer accepted.
  Such values do not identify a released version of this specification, as the
  definition of `specVersion` requires.
- `licenseListVersion`: pre-release and build suffixes are no longer accepted,
  and the patch version is now optional.
  Suffixed values do not identify a version of the SPDX License List.
  Actual list versions, such as `3.24`, carry no patch version.
- `DateTime`: out-of-range months, days, hours, minutes and seconds are no
  longer accepted.
  Such values are not date-times.

### Other changes

- A versioning policy for term IRIs, published resources and `specVersion` is
  introduced
  (see [Namespace and IRIs](../serializations.md#namespace-and-iris)).
- Term IRIs are published in the version-independent namespace
  `https://spdx.org/rdf/3/terms/`.
  SPDX 3.0.1 term IRIs are rewritten to this namespace as described in
  [Legacy version-qualified IRIs](../serializations.md#legacy-version-qualified-iris).
- The FunctionalSafety, Hardware, Operations, Service and SupplyChain profiles
  are added
  (see [Introduction to profiles](../conformance.md#introduction-to-profiles)).
- The `SemVer` datatype is renamed `VersionNumber`, and its patch version is
  optional.
- The "Package URL specification v1" annex is removed in favour of the
  ECMA-427 Package-URL (PURL) specification.
