# SPDX JSON Schema

> **Note:** These files are provided for quick browsing and review on GitHub.
> They are generated automatically -- do not edit them by hand.
>
> For **SPDX 3**, DO NOT use GitHub repository paths in production
> -- they are not guaranteed to be persistent.
> Always use the canonical URLs at `spdx.org`, for example:
>
> - <https://spdx.org/schema/3.0/spdx-json-schema.json>
> - <https://spdx.org/schema/3.1/spdx-json-schema.json>

JSON Schemas for SPDX, organized by version. `MAJOR.MINOR` directories are
symlinks to the latest stable `MAJOR.MINOR.PATCH` of that minor series.

```text
schemas/
├── spdx-schema.json    # symlink --> latest stable 2 (SPDX 2 canonical reference)
├── 2.2/ --> 2.2.2/     # latest stable 2.2 patch
├── 2.2.0/
├── 2.2.1/
├── 2.2.2/
├── 2.3/ --> 2.3.0/     # latest stable 2.3 patch
├── 2.3.0/
├── 2.3.1-dev/
├── 3.0/ --> 3.0.1/     # latest stable 3.0 patch
├── 3.0.0/
├── 3.0.1/
└── 3.1-dev/
```

Each versioned directory contains `spdx-schema.json`. SPDX 3 schemas are
generated automatically by the [publish workflow] from [spdx-3-model].

## Do not remove this directory

`spdx-schema.json` at the root is the canonical reference for the
[application/spdx+json] IANA media type registration. Do not remove or rename it.

[publish workflow]: ../.github/workflows/publish_v3.yml
[spdx-3-model]: https://github.com/spdx/spdx-3-model
[application/spdx+json]: https://www.iana.org/assignments/media-types/application/spdx+json
