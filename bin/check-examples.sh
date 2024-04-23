#! /bin/bash
#
# Validates SPDX example, both in separate files and inline in the
# documentation
#
# SPDX-License-Identifier: MIT

set -e

THIS_DIR=$(dirname $0)

for f in examples/jsonld/*.json; do
    echo "Checking $f"

    check-jsonschema \
        -v \
        --schemafile https://spdx.org/schema/3.0.0/spdx-json-schema.json \
        $f

    pyshacl \
        -s https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        -e https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        $f
done

T=$(mktemp -d)

for f in $THIS_DIR/../docs/annexes/*.md; do
    if ! grep -q '```json' $f; then
        continue
    fi
    echo "Checking $f"
    echo "" > $T/temp.json

    if ! grep -q '@context' $f; then
        cat >> $T/temp.json <<HEREDOC
{
    "@context": "https://spdx.org/rdf/3.0.0/spdx-context.jsonld",
    "@graph": [
HEREDOC
    fi

    cat $f | awk '/^```json/, $0=="```" {if ($0 !~ /^```.*/ ) print}' >> $T/temp.json

    if ! grep -q '@context' $f; then
        cat >> $T/temp.json <<HEREDOC
        {
            "type": "CreationInfo",
            "@id": "_:creationInfo",
            "specVersion": "3.0.0",
            "created": "2024-04-23T00:00:00Z",
            "createdBy": [
                {
                    "type": "Agent",
                    "spdxId": "http://spdx.dev/dummy-agent",
                    "creationInfo": "_:creationInfo"
                }
            ]
        }
    ]
}
HEREDOC
    fi

    check-jsonschema \
        -v \
        --schemafile https://spdx.org/schema/3.0.0/spdx-json-schema.json \
        $T/temp.json

    pyshacl \
        -s https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        -e https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        $T/temp.json
done


