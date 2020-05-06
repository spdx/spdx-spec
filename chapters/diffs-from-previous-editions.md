# Differences from previous editions

**This annex is informative**

The following are differences from V2.1:

* **1.8.1** Snippets have been added to allow a portion of a file to be identified as having different properties from the file it resides in. The use of snippets is completely optional and it is not mandatory for snippets to be identified. See [Clause 5 Snippet Information](./5-snippet-information.md) for further details on the fields available to describe snippets.

* **1.8.2** External Packages can now be referred to in SPDX documents. When there is no SPDX file information available to document the content of these external packages, then the `filesAnalyzed` attribute on a package should be set to false. See [3.8](3-package-information.md#3.8) `Files Analyzed` for more information.

* **1.8.3** Packages are now able to associate with an "External Reference" which allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package. See [3.21 External Reference](3-package-information.md#3.21), [3.22 External Reference Comment](3-package-information.md#3.22) and [Appendix VI: External Repository Identifiers](./appendix-VI-external-repository-identifiers.md) for more information.

* **1.8.4** The "Artifact of Project" fields at the file level are now deprecated, as they can be replaced by a relationship to the more descriptive External Packages.

* **1.8.5** A new annex "Using SPDX short identifiers in Source Files" has been added to document the best practices to refer to the licenses in the SPDX license list that have emerged from the development community. See [Appendix V: Using SPDX short identifiers in Source Files](./appendix-V-using-SPDX-short-identifiers-in-source-files.md) for more information.

* **1.8.6** Miscellaneous bug fixes as reported on the mailing list and reported as issues on the [spdx-spec GitHub repository](https://github.com/spdx/spdx-spec).
