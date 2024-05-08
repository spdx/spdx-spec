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

check_schema() {
    check-jsonschema \
        -v \
        --schemafile https://spdx.org/schema/3.0.0/spdx-json-schema.json \
        "$1"
}

check_model() {
    pyshacl \
        -s https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        -e https://spdx.org/rdf/3.0.0/spdx-model.ttl \
        "$1"
}


for f in $THIS_DIR/../docs/annexes/*.md; do
    if ! grep -q '^```json' $f; then
        continue
    fi
    echo "Checking $f"
    DEST=$T/$(basename $f)
    mkdir -p $DEST

    cat $f | awk -v DEST="$DEST" 'BEGIN{flag=0} /^```json/, $0=="```" { if (/^---$/){flag++} else if ($0 !~ /^```.*/ ) print $0 > DEST "/doc-" flag ".spdx.json"}'

    echo "[" > $DEST/combined.json

    for doc in $DEST/*.spdx.json; do
        if ! grep -q '@context' $doc; then
            mv $doc $doc.fragment
            cat >> $doc <<HEREDOC
{
    "@context": "https://spdx.org/rdf/3.0.0/spdx-context.jsonld",
    "@graph": [
HEREDOC
            cat $doc.fragment >> $doc
            cat >> $doc <<HEREDOC
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
        check_schema $doc
        cat $doc >> $DEST/combined.json
        echo "," >> $DEST/combined.json
    done

    echo "{}]" >> $DEST/combined.json

    check_model $DEST/combined.json
done


