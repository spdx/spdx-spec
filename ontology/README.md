# SPDX ontology

> **Note:** These files are provided for quick browsing and review on GitHub.
> They are generated automatically -- do not edit them by hand.
>
> DO NOT use GitHub repository paths in production
> -- they are not guaranteed
> to be persistent.
> Always use the canonical URLs at `spdx.org`, for example:
>
> - https://spdx.org/rdf/3.0/spdx-model.ttl
> - https://spdx.org/rdf/3.1/spdx-context.jsonld
> - https://spdx.org/rdf/MAJOR.MINOR/spdx-json-serialize-annotations.ttl

RDF ontology files for SPDX 3, organized by version. `MAJOR.MINOR` directories
are symlinks to the latest stable `MAJOR.MINOR.PATCH` of that minor series.

```text
ontology/
├── 3.0/ --> 3.0.1/        # latest stable 3.0 patch
├── 3.0.0/
├── 3.0.1/
└── 3.1-dev/
```

Current versions contain:

- `spdx-model.ttl` -- Turtle (primary format)
- `spdx-model.jsonld`, `spdx-model.json-ld` -- JSON-LD
- `spdx-model.nt` -- N-Triples
- `spdx-model.n3` -- Notation3
- `spdx-model.xml` -- RDF/XML
- `spdx-model.trig` -- TriG
- `spdx-model.longturtle` -- Long Turtle
- `spdx-model.pretty-xml` -- Pretty RDF/XML
- `spdx-model.hext` -- HexTuples
- `spdx-context.jsonld` -- JSON-LD context
- `jsonld-annotations.ttl` -- JSON-LD serialization annotations

Earlier versions (e.g. `3.0.0/`) may contain only a subset of these files.

Files are generated automatically by the [publish workflow] from [spdx-3-model].

[publish workflow]: ../.github/workflows/publish_v3.yml
[spdx-3-model]: https://github.com/spdx/spdx-3-model
