#! /bin/sh
#
# SPDX-License-Identifier: MIT
#
# Finds MODEL_PLACEHOLDER string in BASE_YML,
# replaces it with the content from MODEL_YML.

usage() {
    echo "Make MkDocs config"
    echo ""
    echo "Combines model file list (MODEL_YML)"
    echo "with the base MkDocs configuration file (BASE_YML),"
    echo "to produce the full MkDocs configuration file (FULL_YML)."
    echo ""
    echo "Usage: $0 -b <BASE_YML> -m <MODEL_YML> -f <FULL_YML> [-p <MODEL_PLACEHOLDER>]"
    echo ""
    echo "Inputs:"
    echo "  BASE_YML  : a base MkDocs configuration file (usually, it is 'mkdocs.yml')."
    echo "  MODEL_YML : a model file list ('mkdocs-files.yml' from spec-parser)."
    echo ""
    echo "Output:"
    echo "  FULL_YML  : a full MkDocs configuration, combining BASE_YML and MODEL_YML."
    echo ""
    echo "Option:"
    echo "  MODEL_PLACEHOLDER : a string inside BASE_YML that will be replaced by"
    echo "      a content from MODEL_YML. Default: '__MODEL_PLACEHOLDER__'"
    echo ""
    exit 1
}

while getopts "b:p:m:f:" opt; do
    case $opt in
        b) BASE_YML="$OPTARG" ;;
        m) MODEL_YML="$OPTARG" ;;
        f) FULL_YML="$OPTARG" ;;
        p) MODEL_PLACEHOLDER="$OPTARG" ;;
        *) usage ;;
    esac
done

# Set default value for MODEL_PLACEHOLDER if not provided
if [ -z "$MODEL_PLACEHOLDER" ]; then
    MODEL_PLACEHOLDER="__MODEL_PLACEHOLDER__"
fi

if [ -z "$BASE_YML" ] || [ -z "$MODEL_PLACEHOLDER" ] || [ -z "$MODEL_YML" ] || [ -z "$FULL_YML" ]; then
    usage
fi

sed -e "\|- model.*#.*$MODEL_PLACEHOLDER.*|{
    r $MODEL_YML
    a\\

    d
}" "$BASE_YML" > "$FULL_YML"

TEMP_FILE=$(mktemp)
sed "/$MODEL_PLACEHOLDER/d" "$FULL_YML" > "$TEMP_FILE"
mv "$TEMP_FILE" "$FULL_YML"
