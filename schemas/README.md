# SPDX JSON Schema

This directory contains the JSON Schemas for SPDX.

Files follow the semantic versioning pattern:
`spdx-schema-X.Y.Z.json`

Where X, Y, and Z represent the major, minor, and patch versions.

For backward compatibility, `spdx-schema.json` always points to the latest
schema in the SPDX 2 series.

## Do not remove this directory

Do not remove this directory or rename `spdx-schema.json`.

This directory structure and filename must remain intact to ensure backward
compatibility. `spdx-schema.json` serves as the canonical reference for the
[application/spdx+json] IANA media type registration.

[application/spdx+json]: https://www.iana.org/assignments/media-types/application/spdx+json
