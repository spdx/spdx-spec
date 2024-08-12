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
    version = "3.0.1",
    author = "The Linux Foundation and SPDX Contributors",
    author_email = "spdx-tech@lists.spdx.org",
    description = ("The System Package Data Exchange (SPDX®) specification is an open standard capable of representing systems with software components in as SBOMs (Software Bill of Materials) and other AI, data and security references supporting a range of risk management use cases."),
    license = "Community-Spec-1.0 AND CC-BY-3.0 AND MIT",
    keywords = "SPDX SBOM Software System Package Data Exchange SPDX-License-Identifier specification licenses license",
    url = "https://spdx.org",
    long_description=read('README.md'),
    classifiers=[
        "Topic :: Dcoumentation",
    ],
    python_requires='>=2.7.9,!=3.0.*,!=3.1.*,!=3.2.*,!=3.3.*',
)
