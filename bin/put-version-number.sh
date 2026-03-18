#!/bin/sh
#
# SPDX-License-Identifier: MIT
# SPDX-FileCopyrightText: Copyright 2026 The SPDX Contributors
#
# Replace version placeholders in the repository files.
# Usage: put-version-number.sh VERSION VERSION_DEFAULT [file...]
# If no files are provided, the script updates the following defaults:
# - docs/index.md
# - mkdocs.yml
# - setup.py

set -eu

usage() {
	cat <<EOF >&2
Usage: $0 VERSION VERSION_DEFAULT [file...]

Replaces __VERSION__ and __VERSION_DEFAULT__ placeholders in the given files.
If no files are provided, the defaults are: docs/index.md mkdocs.yml setup.py
EOF
	exit 2
}

if [ "$#" -lt 2 ]; then
	usage
fi

VERSION=$1
VERSION_DEFAULT=$2
shift 2

if [ "$#" -gt 0 ]; then
	FILES="$@"
else
	FILES="docs/index.md mkdocs.yml setup.py"
fi

# timestamp for tempfiles
timestamp=$(date +%Y%m%d%H%M%S 2>/dev/null || echo "$$")

for f in $FILES; do
	if [ ! -f "$f" ]; then
		echo "Skipping: $f (not found)" >&2
		continue
	fi

	tmp="${f}.tmp.${timestamp}"
	awk -v v="$VERSION" -v dv="$VERSION_DEFAULT" '{ gsub(/__VERSION__/, v); gsub(/__VERSION_DEFAULT__/, dv); print }' "$f" > "$tmp" && mv "$tmp" "$f"
	echo "Updated: $f"
done

exit 0
