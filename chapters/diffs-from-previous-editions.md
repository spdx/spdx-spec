# Annex J Differences from previous editions

**This annex is informative**

# J.1 Differences from V2.1

* Snippets have been added to allow a portion of a file to be identified as having different properties from the file it resides in. The use of snippets is completely optional and it is not mandatory for snippets to be identified. See Clause [9](./5-snippet-information.md) for further details on the fields available to describe snippets.

* External Packages can now be referred to in SPDX documents. When there is no SPDX file information available to document the content of these external packages, then the `filesAnalyzed` attribute on a package should be set to false. See [7.8](3-package-information.md#3.8) `Files Analyzed` for more information.

* Packages are now able to associate with an "External Reference" which allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package. See [7.21](3-package-information.md#3.21), [7.22](3-package-information.md#3.22) and Annex [F](./appendix-VI-external-repository-identifiers.md) for more information.

* The "Artifact of Project" fields at the file level are now deprecated, as they can be replaced by a relationship to the more descriptive External Packages.

* A new annex "Using SPDX short identifiers in Source Files" has been added to document the best practices to refer to the licenses in the SPDX license list that have emerged from the development community. See Annex [E](./appendix-V-using-SPDX-short-identifiers-in-source-files.md) for more information.

* Miscellaneous bug fixes as reported on the mailing list and reported as issues on the [spdx-spec GitHub repository](https://github.com/spdx/spdx-spec).

# J.2 Differences between V2.1 and V2.0

...

# J.3 Differences between V2.0 and V1.2

...

# J.4 Differences between V1.2 and V1.1

...

# J.5 Differences between V1.1 and V1.0

...
