# -*- coding: utf-8 -*-
import os
from setuptools import setup

with open('requirements.txt') as f:
    required = f.read().splitlines()

# Utility function to read the README.md file.
def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "spdx_specification",
    version = "2.2.0",
    author = "Linux Foundation and its Contributors",
    author_email = "opensource@steenbe.nl",
    description = ("The Software Package Data Exchange® (SPDX®) specification is a standard format for communicating the components, licenses and copyrights associated with software packages."),
    license = "CC-BY-3.0 AND MIT",
    keywords = "SPDX Software Package Data Exchange SPDX-License-Identifier specification licenses license",
    url = "https://spdx.org",
    long_description=read('README.md'),
    classifiers=[
        "Topic :: Dcoumentation",
        "License :: Other/Proprietary License",
    ],
    python_requires='>=2.7.9,!=3.0.*,!=3.1.*,!=3.2.*,!=3.3.*',
)