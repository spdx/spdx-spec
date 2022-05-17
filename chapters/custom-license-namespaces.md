# Annex Z Custom License Namespaces


## Z.1 Rationale

The
[SPDX License List](https://spdx.org/licenses)
is a curated list of commonly found licenses and exceptions
used in free and open or collaborative software,
data, hardware, or documentation.
Licenses in the SPDX License List have stable license identifiers
and canonical permanent URLs
pointing to specified license texts,
with markup and matching guidelines
to capture non-substantive variations to the text.

The SPDX specification also defines a mechanism
for creators of SPDX documents
to define custom license texts and identifiers.
This enables SPDX documents to refer to licenses
that might never be included on the SPDX License List,
for a variety of reasons.
These custom license identifiers are prefixed with `LicenseRef-`
as defined in
[Annex D - SPDX license expressions](./SPDX-license-expressions.md).
This identifier format
was originally assumed to be used
in the context of an SPDX document,
so that the license text for that
identifier would be specified
in a corresponding
[Other licensing information detected](./other-licensing-information-detected.md) section.

This annex defines mechanisms to use stable identifiers for custom licenses
outside the context of a single SPDX document.
For example, developers might wish to insert
SPDX short-form license identifiers
into their source code
for licenses that are not on the SPDX License List,
as described in
[Annex E - Using SPDX license list short identifiers in source files](./using-SPDX-short-identifiers-in-source-files.md)
Additionally,
tools may want to interchange information about such licenses
without having to use the same internal format
to generate identifiers,
or without having to compare license texts included in SPDX documents
to confirm that they are in fact the same text.


## Z.2 Brief overview

This annex defines two formats and mechanisms
for using the existing `LicenseRef-` format
in a manner that enables stable identifier usage.
Under this system:

1. each license namespace consists of
   either a standard order DNS name (such as `example.com`)
   or an organization name (such as `ExampleCorp`)
   that is under the control of the namespace maintainer's organization;
2. the namespace maintainer creates
   an SPDX document defining license texts
   and corresponding identifiers
   which include the namespave,
   as described below;
3. the namespace and the SPDX document
   are registered with the SPDX project; and
4. identifiers in the format described below
   can then be used by anyone,
   as long as they are defined in the SPDX document
   available at the registered URL.


## Z.3 License name format

The following sections
define the two formats
for defining custom license identifiers.

## Z.3.1 DNS name format

A valid namespace using the DNS name format
is a standard order DNS name,
such as `example.com`.
This DNS name
must only use characters permitted by the license expression syntax
(i.e., letters, digits, "-" and ".").
It must not contain a period followed by a hyphen,
as that denotes the end of the namespace.

Each custom license identifier under this namespace
consists of the following, in order:
1. the prefix `LicenseRef-`
2. a period
3. the namespace
4. a period and a hyphen
5. any other characters permitted by the license expression syntax (i.e., letters, digits, "-" and ".")

For example, for the `example.com` namespace,
the following are identifiers:
* `LicenseRef-.example.com.-ABC-1.0`
* `LicenseRef-.example.com.-EULA-v3.1`
* `LicenseRef-.example.com.-anything`

## Z.3.2 Organization name format

A valid namespace using the organization name format
is the organization's name,
such as `ExampleCorp`.
This organization name
must only use characters permitted by the license expression syntax
(i.e., letters, digits, "-" and ".").
It must not contain a double hyphen,
as that denotes the end of the namespace.

Each custom license identifier under this namespace
consists of the following, in order:
1. the prefix `LicenseRef-`
2. a hyphen
3. the namespace
4. two hyphens
5. any other characters permitted by the license expression syntax (i.e., letters, digits, "-" and ".")

For example, for the `ExampleCorp` namespace, the following could be valid identifiers:
* `LicenseRef--ExampleCorp--ABC-1.0`
* `LicenseRef--ExampleCorp--EULA-v3.1`
* `LicenseRef--ExampleCorp--anything`


## Z.5 License definitions

All the licenses in a namespace
have to be defined in an SPDX document.
This annex does not provide any additional mechanism
for this task,
as the standard
[Other licensing information detected](./other-licensing-information-detected.md) sections
of an SPDX document
can be used without any special consideration.

The SPDX document should not define
any licenses with identifiers
other than those in its own namespace.


## Z.6 Namespace registration

In order for a namespace to be usable
in custom license identifiers,
it must be registered with the SPDX project.
The registration request must provide
the namespace and
the SPDX document defining the licenses.

This registration will be completed
using a mechanism to be provided by the SPDX project.
The exact details of the mechanism
for registration requests
will be made publicly available
at a later date,
but it may consist of submitting pull requests
to a public repository
or using another custom tool for this purpose.


## Z.7 Caveats

This format attempts to provide a stable mechanism
for use of custom identifiers.
However, it should be noted that the stability
will always be subject to the namespace maintainer's control.
In other words,
although maintainers should not modify a defined license text
after they publish an identifier,
there is no technical control that prohibits them from doing so.
Consumers and users of custom namespaced license identifiers
that are not under their own control should be aware
that the maintainer might disregard the above recommendations
and might modify or remove existing identifiers
from their definition document.

Creators of SPDX documents
that use custom namespaced license identifiers
are encouraged to include the
[Other Licensing Information](./other-licensing-information-detected.md) sections
in their own SPDX documents,
rather than solely relying
on the namespace maintainer's version.
Doing so will help minimize the potential instability
described in the preceding paragraph.
It will also make an SPDX document
more compatible with tools
that are unaware of the custom license namespace format
described in this annex.
