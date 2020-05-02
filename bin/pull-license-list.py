#!/usr/bin/env python3
#
# Automatically update the license- and exception-list Markdown based
# on the currently-live JSON.
#
# usage: ./bin/pull-license.py
#
# Script licensed under SPDX-License-Identifier: MIT

import codecs
import itertools
import json
import os.path
import re
import sys
import urllib.request


if sys.version_info < (3, 6):
    raise RuntimeError('this script requires Python 3.6+')


VERSION_REGEXP = re.compile(
    pattern='(.* SPDX License List, v)([^ ]*)( which was released )([^.]*)(\..*)',
    flags=re.DOTALL)


def get_json(url):
    with urllib.request.urlopen(url=url) as body:
        return json.load(body)


def format_table(headers, rows):
    widths = [
        max(len(row[i]) for row in rows + [headers])
        for i, _ in enumerate(headers)
    ]
    template = '| {} |\n'.format(' | '.join(
        ('{' + '{}:{{{}}}'.format(2*i, 2*i + 1) + '}')
        for i, _ in enumerate(headers)
    ))
    yield template.format(*itertools.chain(*zip(headers, widths)))
    yield '|{}|\n'.format('|'.join('-' * (width + 2) for width in widths))
    for row in rows:
        yield template.format(*itertools.chain(*zip(row, widths)))
    yield '\n'

    
def format_license_table(license_list):
    yield from format_table(
        headers=['Full Name of License', 'Short Identifier', 'OSI?'],
        rows=[
            [
                license['name'],
                '[{0}](https://spdx.org/licenses/{0}.html)'.format(
                    license['licenseId']),
                'Y' if license['isOsiApproved'] else '',
            ]
            for license in sorted(
                license_list['licenses'],
                key=lambda license: license['licenseId'].lower())
            if not license.get('isDeprecatedLicenseId')
        ],
    )


def format_deprecated_license_table(license_list):
    yield from format_table(
        headers=['Full Name of License', 'Deprecated SDPX Short Identifier'],
        rows=[
            [
                license['name'],
                '[{0}](https://spdx.org/licenses/{0}.html)'.format(
                    license['licenseId']),
            ]
            for license in sorted(
                license_list['licenses'],
                key=lambda license: license['licenseId'].lower())
            if license.get('isDeprecatedLicenseId')
        ],
    )


def format_exception_table(exception_list):
    yield from format_table(
        headers=['Full Name of Exception', 'SPDX License Exception'],
        rows=[
            [
                exception['name'].replace('\n', ' '),
                '[{0}](https://spdx.org/licenses/{0}.html)'.format(
                    exception['licenseExceptionId']),
            ]
            for exception in sorted(
                exception_list['exceptions'],
                key=lambda exception: exception['licenseExceptionId'].lower())
            if not exception.get('isDeprecatedLicenseId')
        ],
    )


if __name__ == '__main__':
    license_list = get_json(url='https://spdx.org/licenses/licenses.json')
    exception_list = get_json(url='https://spdx.org/licenses/exceptions.json')
    for key in ['licenseListVersion', 'releaseDate']:
        if license_list.get(key) != exception_list.get(key):
            raise ValueError(
                '{} mismatch: {} (license list) != {} (exception list)'
                .format(
                    key,
                    license_list.get(key),
                    exception_list.get(key)))
    table_content = [
        format_license_table(license_list=license_list),
        format_exception_table(exception_list=exception_list),
        format_deprecated_license_table(license_list=license_list),
    ]
    path = os.path.join('chapters', 'appendix-I-SPDX-license-list.md')
    lines = []
    with open(path, 'r') as f:
        in_table = False
        for line in f.readlines():
            if in_table:
                if not line.startswith('|'):
                    in_table = False
                    if table_content:
                        lines.extend(table_content.pop(0))
            elif line.startswith('|'):
                in_table = True
            else:
                match = VERSION_REGEXP.match(line)
                if match:
                    leader, version, middle, release_date, tail = match.groups()
                    lines.append('{}{}{}{}{}'.format(
                        leader,
                        license_list['licenseListVersion'],
                        middle,
                        license_list['releaseDate'],
                        tail,
                    ))
                else:
                    lines.append(line)
    if in_table and table_content:
        lines.extend(table_content.pop(0))
    while lines[-1] == '\n':
        lines.pop()
    with open(path, 'w') as f:
        for line in lines:
            f.write(line)
