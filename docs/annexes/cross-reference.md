# Annex I: Cross referencing in SPDX 3 (Informative)

This document will walk though how to refer to SPDX Elements across documents
(e.g. cross reference).

If you do would like to construct the complete example documents from this
Markdown file, use the following command:

```shell
cat cross-reference.md | awk 'BEGIN{flag=0} /^```json/, $0=="```" { if (/^---$/){flag++} else if ($0 !~ /^```.*/ ) print $0 > "doc-" flag ".spdx.json"}'
```

## Linking via spdxId

It is frequently desired (and necessary) to reference an SPDX 3
[Element][Class_Element] that lives in one document from another. Since SPDX
documents are valid [JSON-LD][JSON_LD] documents, linking elements together can
be as simple as referencing the spdxId of one element from another (in the same
way that doing so within a document links Elements together. For example,
assume we have this document that contains a [Person][Class_Person] we want to
reference in another document:

```json
{
    "@context": "https://spdx.org/rdf/3.0.0/spdx-context.jsonld",
    "@graph": [
        {
            "type": "Person",
            "spdxId": "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f",
            "creationInfo": "_:creationinfo",
            "name": "Joshua Watt",
            "externalIdentifier": [
                {
                    "type": "ExternalIdentifier",
                    "externalIdentifierType": "email",
                    "identifier": "JPEWhacker@gmail.com"
                }
            ]
        },
        {
            "type": "CreationInfo",
            "@id": "_:creationinfo",
            "specVersion": "3.0.0",
            "createdBy": [
                "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f"
            ],
            "created": "2024-03-06T00:00:00Z"
        },
        {
            "type": "SpdxDocument",
            "spdxId": "https://spdx.org/spdxdocs/Document1-7bd25aaf-64b7-4ccc-aa85-84695cef4c17",
            "creationInfo": "_:creationinfo",
            "profileConformance": [
                "core"
            ],
            "rootElement": [
                "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f"
            ]
        }
    ]
}
```

Now, in our new document we can reference the "Joshua Watt" person by simply
referring to it by its spdxId. For example, to indicate that this new document
was also written by the same person, we can reference it in the creation info
(note the [createdBy][Property_createdBy] property):

```json
---
{
    "@context": "https://spdx.org/rdf/3.0.0/spdx-context.jsonld",
    "@graph": [
        {
            "type": "CreationInfo",
            "@id": "_:creationinfo1",
            "specVersion": "3.0.0",
            "createdBy": [
                "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f"
            ],
            "created": "2024-05-08T00:00:00Z"
        },
```

## Imports

This is sufficient to link documents in JSON-LD, but it is missing some useful
information that SPDX requires you to specify. Namely, since spdxIds are _not_
necessarily resolvable URLs, this gives no indication as to where the
[Person][Class_Person] can be found. In order to provide this information, SPDX
requires that all externally referenced spdxIds be enumerated in the
[imports][Property_imports] property of the local
[SpdxDocument][Class_SpdxDocument]. Lets start by writing the preamble for the
SpdxDocument:

```json
        {
            "type": "SpdxDocument",
            "spdxId": "https://spdx.org/spdxdocs/Document2-72d52ac3-3642-47be-9f83-8fbef6a962b4",
            "creationInfo": "_:creationinfo1",
            "profileConformance": [
                "core",
                "software"
            ],
            "imports": [
```

The [imports][Property_imports] property is a list of
[ExternalMap][Class_ExternalMap] objects, one for each external spdxId being
referenced. The class has one required property called
[externalSpdxId][Property_externalSpdxId] which is the external spdxId being
described:

```json
                {
                    "type": "ExternalMap",
                    "externalSpdxId": "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f",

```

In addition to this, there are a few optional fields. The first is the
[locationHint][Property_locationHint] property which is a URI that indicates
where the document that contains the external spdxId may be located. Since this
is an actual resolvable URI, consumers of the document can use locate the
unresolved spdxId. While optional, this field is recommended:

```json
                    "locationHint": "http://downloads.example.com/Document1.spdx.json",
```

In addition to the location, the [verifiedUsing][Property_verifiedUsing]
property indicates how a user can verify the integrity of the external document
to ensure it has not been tampered with. It can be 0 or more
[IntegrityMethod][Class_IntegrityMethod] objects. While also optional, it is
recommended to include at least one:

```json
                    "verifiedUsing": [{
                        "type": "Hash",
                        "algorithm": "sha256",
                        "hashValue": "3ba8c249c1ba1b6fe20582de88a5123b317632a5a94ba27199d01724df4eb149"
                    }],
```

Finally, the [definingArtifact][Property_definingArtifact] allows a much richer
expression of information about the document that contains the external spdxId
by linking to a complete [Artifact][Class_Artifact] element. This field is also
optional, but if you need the impressive expressive power of the `Artifact`
class, it is also recommended:

```json
                    "definingArtifact": "https://spdx.org/spdxdocs/Artifact-4762f4c5-3362-47e9-9595-5182235ef577"
```

It should be noted that it is reasonable for the `definingArtifact` itself to
be an external spdxId, as long as it also has the relevant entry in `imports`.

We also need to add an import for the [SpdxDocument][Class_SpdxDocument] that
contains the author, as we will be referencing it later, so lets do that now:

```json
                },
                {
                    "type": "ExternalMap",
                    "externalSpdxId": "https://spdx.org/spdxdocs/Document1-7bd25aaf-64b7-4ccc-aa85-84695cef4c17",
                    "locationHint": "http://downloads.example.com/Document1.spdx.json",
                    "verifiedUsing": [{
                        "type": "Hash",
                        "algorithm": "sha256",
                        "hashValue": "3ba8c249c1ba1b6fe20582de88a5123b317632a5a94ba27199d01724df4eb149"
                    }],
                    "definingArtifact": "https://spdx.org/spdxdocs/Artifact-4762f4c5-3362-47e9-9595-5182235ef577"
                }
```

And that is it! By providing this information you are explaining to consumer of
the document how they can resolve the external spdxIds.

Lets close out our SpdxDocument

```json
            ]
        },
```

Since we are using an [Artifact][Class_Artifact] that describes the SpdxDocument
containing the external spdxId, we need to write that now:

```json
        {
            "type": "software_File",
            "spdxId": "https://spdx.org/spdxdocs/Artifact-4762f4c5-3362-47e9-9595-5182235ef577",
            "creationInfo": "_:creationinfo1",
            "software_fileKind": "file",
            "software_primaryPurpose": "file",
            "software_contentType": "application/spdx+json",
            "verifiedUsing": [{
                "type": "Hash",
                "algorithm": "sha256",
                "hashValue": "3ba8c249c1ba1b6fe20582de88a5123b317632a5a94ba27199d01724df4eb149"
            }],
            "originatedBy": [
                "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f"
            ],
            "suppliedBy": "https://spdx.org/spdxdocs/Person/JoshuaWatt-0ef7e15a-5628-4bd9-8485-a3eace6dcc4f",
            "releaseTime": "2024-03-06T00:00:00Z",
            "builtTime": "2024-03-06T00:00:00Z"
        },
```

Finally, since we are using an [Artifact][Class_Artifact], we need to add a
[Relationship][Class_Relationship] with type `serailizedInArtifact` to link the
artifact and the serialized [SpdxDocument][Class_SpdxDocument]. Note that this
is where the `spdxId` of the `SpdxDocument` is referenced which is why we
needed to import it earlier:

```json
        {
            "spdxId": "https://spdx.org/spdxdocs/Relationship/serializedInArtifact-141ec767-40f2-4aad-9658-ac2703f3a7d9",
            "type": "Relationship",
            "creationInfo": "_:creationinfo1",
            "relationshipType": "serializedInArtifact",
            "from": "https://spdx.org/spdxdocs/Document1-7bd25aaf-64b7-4ccc-aa85-84695cef4c17",
            "to": [
                "https://spdx.org/spdxdocs/Artifact-4762f4c5-3362-47e9-9595-5182235ef577"
            ]
        }
    ]
}
```

Happy Linking!

[Class_Artifact]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Artifact
[Class_Element]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Element
[Class_ExternalMap]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/ExternalMap
[Class_IntegrityMethod]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/IntegrityMethod
[Class_Person]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Person
[Class_SpdxDocument]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/SpdxDocument
[Class_Relationship]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Classes/Relationship
[JSON_LD]: https://json-ld.org/
[Property_createdBy]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/createdBy
[Property_definingArtifact]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/definingArtifact
[Property_externalSpdxId]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/externalSpdxId
[Property_imports]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/imports
[Property_verifiedUsing]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/verifiedUsing
[Property_locationHint]: https://spdx.github.io/spdx-spec/v3.0/model/Core/Properties/locationHint
