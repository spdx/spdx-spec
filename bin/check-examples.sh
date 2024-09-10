#! /bin/bash
#
# Validates SPDX example, both in separate files and inline in the
# documentation
#
# SPDX-License-Identifier: MIT

set -e

THIS_DIR=$(dirname $0)
SPDX_VERSION="3.0.1"
SCHEMA_URL="https://spdx.org/schema/${SPDX_VERSION}/spdx-json-schema.json"
RDF_URL="https://spdx.org/rdf/3.0.1/spdx-model.ttl"
CONTEXT_URL="https://spdx.org/rdf/3.0.1/spdx-context.jsonld"
SPDX_VERSION="3.0.1"

check_schema() {
    check-jsonschema \
        -v \
        --schemafile $SCHEMA_URL \
        "$1"
}

check_model() {
    pyshacl \
        -s $RDF_URL \
        -e $RDF_URL \
        "$1"
}

# Check examples in JSON files in examples/jsonld/
if [ "$(ls $THIS_DIR/../examples/jsonld/*.json 2>/dev/null)" ]; then
    for f in $THIS_DIR/../examples/jsonld/*.json; do
        echo "Checking $f"
        check_schema $f
        check_model $f
    done
fi

TEMP=$(mktemp -d)

# Check examples in inline code snippets in Markdown files in docs/annexes/
for f in $THIS_DIR/../docs/annexes/*.md; do
    if ! grep -q '^```json' $f; then
        continue
    fi
    echo "Checking $f"
    DEST=$TEMP/$(basename $f)
    mkdir -p $DEST

    # Read inline code snippets and save them in separate, numbered files.
    cat $f | awk -v DEST="$DEST" 'BEGIN{flag=0} /^```json/, $0=="```" { if (/^---$/){flag++} else if ($0 !~ /^```.*/ ) print $0 > DEST "/doc-" flag ".spdx.json"}'

    # Combine all JSON code snippets into a single file, with SPDX context and creation info.
    echo "[" > $DEST/combined.json

    for doc in $DEST/*.spdx.json; do
        if ! grep -q '@context' $doc; then
            mv $doc $doc.fragment
            cat >> $doc <<HEREDOC
{
    "@context": "$CONTEXT_URL",
    "@graph": [
HEREDOC
            cat $doc.fragment >> $doc
            cat >> $doc <<HEREDOC
        {
            "type": "CreationInfo",
            "@id": "_:creationInfo",
            "specVersion": "$SPDX_VERSION",
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
