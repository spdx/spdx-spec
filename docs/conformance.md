# Conformance

## Alternate notation for some conformance requirements

This document contains more than a few cardinality assertions, each of which
indicates the minimum and maximum number of times a property may appear.
These are represented by using "minCount" and "maxCount" respectively.
The absolute minimum number of occurrences is zero (0),
while for an unbounded maximum number of occurrences a star (\*) is being used.

Here are some examples:

- minCount: 1
- maxCount: *
- Cardinality: 0..1
- Cardinality: 0..*
- Cardinality: 1..1
- Cardinality: 1..*

Each of these assertions can easily be understood as to whether a feature is
required, and if so, how many occurrences are required; also, whether a feature
is permitted, and if so, in what number. As this is the format long familiar to
the SPDX community, it has been preserved in this document.

## Introduction to profiles

Profile is the term for a compliance point within the SPDX community across The
Linux Foundation and OMG. The System Package Data Exchange (SPDX) specification
defines the following thirteen compliance points, defined as “profiles”:

- Core profile
- Software profile
- Security profile
- Licensing profile
- Dataset profile
- AI profile
- Build profile
- Lite profile
- Extension profile
- Hardware profile
- Service profile
- SupplyChain profile
- Operations profile
- FunctionalSafety profile

The Core profile is mandatory. All others are optional.

## Core profile compliance point

The Core profile includes the definitions of classes properties and
vocabularies usable by all SPDX profiles when producing or consuming SPDX
content. Although the classes, properties and vocabularies are somewhat
extensive, the required fields are rather minimal to allow maximum flexibility
while meeting minimum SBOM requirements. Software that conforms to the SPDX
specification at the Core profile compliance point shall be able to import and
export serialized documents that conform with one of the defined SPDX
serialization formats.

Conformance to the Core profile compliance point is mandatory for all other
SPDX profiles.

This compliance point, in combination with the Software profile compliance
point, provides a baseline of functionality that facilitates interchange of the
bills of materials information produced by tools supporting SPDX.

## Software profile compliance point

The Software profile includes the definitions of classes, properties and
vocabularies for referring to and conveying information about software and is
usable by all SPDX profiles when producing or consuming SPDX content.

Software that conforms to the SPDX specification at the Software profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats.

Conformance to the Software profile compliance point does not entail support
for the Licensing, Dataset, AI, Build, Lite, or Extension profiles of the
SPDX.

This compliance point, in combination with the Core profile compliance point,
provides a baseline of functionality that facilitates interchange of the bills
of materials information produced by tools supporting SPDX.

## Security profile compliance point

The Security profile captures security-related information when producing or
consuming SPDX content.

Software that conforms to the SPDX specification at the security profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats, including the properties and relationships specified in the security
profile, which are in support of exchanging information about software
vulnerabilities that may exist, the severity of those vulnerabilities, and a
mechanism to express how a vulnerability may affect a specific software element
including if a fix is available.

Conformance to the Security profile compliance point does not entail support
for the Licensing, Dataset, AI, Build, Lite, or Extension profiles of the
SPDX.

This compliance point facilitates interchange of the security information
produced by tools supporting SPDX.

## Licensing profile compliance point

The Licensing profile includes capturing details relevant to software licensing
and intellectual property information when producing or consuming SPDX content.
Specifically, software that conforms to the SPDX specification at the Licensing
profile compliance point shall be able to import and export serialized
documents that conform with one of the SPDX serialization formats defined SPDX
serialization formats, including the classes and fields that comprise the SPDX
License Expression syntax and that relate to the
[SPDX License List](https://spdx.org/licenses/).

There are two associated profiles, the SimpleLicensing profile
and the ExpandedLicensing profile.
Both allow expression of the same information,
albeit in different ways.

Conformance to the Licensing profile compliance point does not entail support
for the Software, Security, Dataset, AI, Build, Lite, or Extension profiles of
the SPDX.

This compliance point facilitates interchange of the licensing documents
expressing which licenses and copyright notices are determined by persons or
automated tooling to apply to distributions of software that are produced by
tools supporting SPDX.

## Dataset profile compliance point

The Dataset profile captures the relevant information about the datasets used
in an AI system or other applications when producing or consuming SPDX content.

Software that conforms to the SPDX specification at the Dataset profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats, including details such as dataset names, versions, sources, associated
metadata, licensing information, and any other relevant attributes.
The Dataset profile can covey a description or summary of a dataset, including
metadata, characteristics, and statistical information about the data.
The Dataset profile can convey insights into the structure, format, content,
and properties of a dataset, helping users understand and analyze the data more
effectively.

Conformance to the Dataset profile compliance point does not entail support
for the Software, Licensing, Security, AI, Build, Lite, or Extension profiles
of the SPDX.

This compliance point facilitates interchange of the information about
datasets produced by tools supporting SPDX.

## AI profile compliance point

The AI profile captures an inventory list of software components and
dependencies associated with an AI system when producing or consuming SPDX
content.

Software that conforms to the SPDX specification at the AI profile compliance
point shall be able to import and export serialized documents that conform with
one of the SPDX serialization formats defined SPDX serialization formats,
including the information about software components and dependencies associated
with artificial intelligence and machine learning (AI/ML) models and systems.
This inventory includes the software frameworks, libraries, and other
components used to build or deploy the AI system, along with relevant
information about their versions, licenses, and useful security references
including ethical and security information.

Conformance to the AI profile compliance point does not entail support for the
Software, Licensing, Security, Dataset, Build, Lite, or Extension profiles of
the SPDX.

This compliance point facilitates interchange of the AI model related
information produced by tools supporting SPDX.

## Build profile compliance point

The Build profile captures build-related information when producing or
consuming SPDX content.

Software that conforms to the SPDX specification at the Build profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats, including associated definitions to help express how software is
generated and transformed. This includes encoding the inputs, outputs,
procedures/instructions, environments and actors from the build process along
with the associated evidence.

Conformance to the Build profile compliance point does not entail support for
the Software, Licensing, Security, Dataset, AI, Lite, or Extension profiles of
the SPDX.

This compliance point facilitates interchange of the build information produced
by tools supporting SPDX.

## Lite profile compliance point

The Lite profile captures the minimum set of information required for license
compliance in the software supply chain for producing or consuming SPDX
content.

Software that conforms to the SPDX specification at the Lite profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats, including creation of the SBOM, package lists with licensing and other
related items, and their relationships.

Conformance to the Lite profile compliance point does not entail support for
the Software, Licensing, Security, Dataset, AI, Build, or Extension profiles
of the SPDX.

This compliance point facilitates interchange of minimal licensing information
when produced by tools supporting SPDX.

## Extension profile compliance point

The Extension profile captures extended tailored information when producing or
consuming non-standard SPDX content in three ways:

- Support profile-based extended characterization of Elements. Enables
  specification and expression of Element characterization extensions within
  any profile and namespace of SPDX without requiring changes to other profiles
  or namespaces and without requiring local subclassing of remote classes
  (which could inhibit ecosystem interoperability in some cases).

- Support extension of SPDX by adopting individuals or communities with Element
  characterization details uniquely specialized to their particular context.
  Enables adopting individuals or communities to utilize SPDX expressive
  capabilities along with expressing more arcane Element characterization
  details specific to them and not appropriate for standardization across SPDX.

- Support structured capture of expressive solutions for gaps in SPDX coverage
  from real-world use. Enables adopting individuals or communities to express
  Element characterization details they require that are not currently defined
  in SPDX but likely should be. Enables a practical pipeline that identifies
  gaps in SPDX that should be filled, expresses solutions to those gaps in a
  way that allows the identifying adopters to use the extended solutions with
  SPDX and does not conflict with current SPDX, can be clearly detected among
  the SPDX content exchange ecosystem, provides a clear and structured
  definition of gap solution that can be used as submission for revision to the
  SPDX standard.

Software that conforms to the SPDX specification at the Extension profile
compliance point shall be able to import and export serialized documents that
conform with one of the SPDX serialization formats defined SPDX serialization
formats, including the abstract Extension class serving as the base for all
defined Extension subclasses.

Conformance to the Extension profile compliance point does not entail support
for the Licensing, Security, Dataset, AI, Build, or profiles of the SPDX but
is expected to be used in combination with the other profiles to extend them.

This compliance point facilitates interchange of extended information that goes
beyond the standard SPDX produced by tools supporting SPDX and is used between
cooperating parties that understand the form of the extension and can produce
and consume its non-standard content.

## Trademark compliance

To be designated an SPDX document, a file shall comply with the requirements of the SPDX Trademark
License, as stated in the [SPDX Trademark Page](https://spdx.dev/trademark).

The official copyright notice that shall be used with any verbatim reproduction and/or distribution of
this SPDX Specification 3.1 is:

"Official SPDX® Specification 3.1 Copyright © 2010–2026 Linux Foundation and its Contributors.
Licensed under the Community Specification License 1.0. All other rights are expressly reserved."

The official copyright notice that shall be used with any non-verbatim reproduction and/or distribution
of this SPDX Specification 3.1, including without limitation any partial use or combining this SPDX
Specification with another work, is:

"This is not an official SPDX Specification. Portions herein have been reproduced from SPDX®
Specification 3.1 found at spdx.dev. These portions are Copyright © 2010–2026 Linux Foundation and
its Contributors, and are licensed under the Community Specification License 1.0 by the
Linux Foundation and its Contributors. All other rights are expressly reserved by Linux Foundation and
its Contributors."
