#! /bin/bash
#
# Validates SPDX example, both in separate files and inline in the
# documentation
#
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: Copyright 2024 The SPDX Contributors

set -e

THIS_DIR="$(dirname "$0")"
MD_DIR=docs/annexes
JSON_DIR=examples/jsonld

SPDX_VERSION="3.0.1"
SCHEMA_URL="https://spdx.org/schema/${SPDX_VERSION}/spdx-json-schema.json"
RDF_URL="https://spdx.org/rdf/${SPDX_VERSION}/spdx-model.ttl"
CONTEXT_URL="https://spdx.org/rdf/${SPDX_VERSION}/spdx-context.jsonld"

# print validation setup
echo "Checking examples in"
echo "Snippets         : $MD_DIR"
echo "Files            : $JSON_DIR"
echo "SPDX version     : $SPDX_VERSION"
echo "Schema           : $SCHEMA_URL"
echo "Schema resolved  : $(curl -I "$SCHEMA_URL" 2>/dev/null | grep -i "location:" | awk '{print $2}')"
echo "RDF              : $RDF_URL"
echo "RDF resolved     : $(curl -I "$RDF_URL" 2>/dev/null | grep -i "location:" | awk '{print $2}')"
echo "Context          : $CONTEXT_URL"
echo "Context resolved : $(curl -I "$CONTEXT_URL" 2>/dev/null | grep -i "location:" | awk '{print $2}')"
echo "$(check-jsonschema --version)"
echo -n "$(pyshacl --version)"
echo "spdx3-validate version: $(spdx3-validate --version)"
echo ""

check_schema() {
    echo "Checking schema (check-jsonschema): $1"
    check-jsonschema \
        --verbose \
        --schemafile $SCHEMA_URL \
        "$1"
}

check_model() {
    echo "Checking model (pyschacl): $1"
    pyshacl \
        --shacl $RDF_URL \
        --ont-graph $RDF_URL \
        "$1"
}

check_spdx() {
    echo "SPDX 3 Validating (spdx3-validate): $1"
    spdx3-validate --json $1
}

# Check examples in JSON files in examples/jsonld/
if [ "$(ls $THIS_DIR/../$JSON_DIR/*.json 2>/dev/null)" ]; then
    for f in $THIS_DIR/../$JSON_DIR/*.json; do
        check_schema $f
        echo ""
        # check_model $f
        # echo ""
        check_spdx $f
        echo ""
    done
fi

# Check examples in inline code snippets in Markdown files in docs/annexes/
TEMP=$(mktemp -d)
for f in $THIS_DIR/../$MD_DIR/*.md; do
    if ! grep -q '^```json' $f; then
        continue
    fi
    echo "Extract snippets from $f"
    DEST=$TEMP/$(basename $f)
    mkdir -p $DEST

    # Read inline code snippets and save them in separate, numbered files.
    cat $f | awk -v DEST="$DEST" 'BEGIN{flag=0} /^```json/, $0=="```" { if (/^---$/){flag++} else if ($0 !~ /^```.*/ ) print $0 > DEST "/doc-" flag ".spdx.json"}'

    # Combine all JSON code snippets into a single file, with SPDX context and creation info.
    COMBINED_JSON = $DEST/__combined.jso
    echo "[" > $COMBINED_JSON

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
        echo ""
        cat $doc >> $COMBINED_JSON
        echo "," >> $COMBINED_JSON
    done

    echo "{}]" >> $COMBINED_JSON

    # check_model $COMBINED_JSON
    # echo ""
    check_spdx $COMBINED_JSON
    echo ""
done
