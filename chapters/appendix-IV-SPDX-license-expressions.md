# Appendix IV: SPDX License Expressions

## IV.1 Overview <a name="IV.1"></a>

Often a single license can be used to represent the licensing terms of a source code or binary file, but there are situations where a single license identifier is not sufficient. A common example is when software is offered under a choice of one or more licenses (e.g., `GPL-2.0 OR BSD-3-Clause`). Another example is when a set of licenses is needed to represent a binary program constructed by compiling and linking two (or more) different source files each governed by different licenses (e.g., `LGPL-2.1 AND BSD-3-Clause`).

SPDX License Expressions allow accurate representations of the licensing terms typically found in open source software. A license expression could be a single license identifier found on the [SPDX License List](appendix-I-SPDX-license-list.md); a user defined license reference denoted by the `LicenseRef-[idString]`; a license identifier combined with an SPDX exception; or some combination of license identifiers, license references and exceptions constructed using a small set of defined operators (`AND`, `OR`, `WITH` and `+`).  We provide the definition of what constitutes a valid an SPDX License Expression in this section.

## IV.2 Syntax <a name="IV.2"></a>

The exact syntax of license expressions is described below in [ABNF][rfc5234].  `ALPHA`, `DIGIT`, and `WSP` are from the [ABNF core rules][rfc5234-aB].

```
idstring                       = 1*(ALPHA / DIGIT / "-" / "." )
license-id                     = <short form license identifier>
license-exception-id           = <short form license exception identifier>
license-ref                    = ["DocumentRef-" idstring ":"] "LicenseRef-" idstring
license                        = license-id / license-ref
space                          = 1*WSP
simple-expression              = license ["+"] [space "WITH" space license-exception-id]
binary-expression-operator     = "AND" / "OR"
license-expression             = simple-expression
                               / license-expression space binary-expression-operator space license-expression
                               / "(" license-expression ")"
                               / space license-expression
                               / license-expression space
enclosed-license-expression    = [space] simple-expression [space]
                               / [space] "(" [space] license-expression [space] ")" [space]
```

Where:

* Short form license identifiers are drawn from sections [I.1](appendix-I-SPDX-license-list.md#I.1) and [I.3](appendix-I-SPDX-license-list.md#I.3).
* Short form license exception identifiers are drawn from [section I.2](appendix-I-SPDX-license-list.md#I.2).

License expressions are case sensitive, and license expressions must use the canonical case for all components.
However, the SPDX Licence List commits to [never contain identifiers which differ only in case but have different semantics][list-case-commitment].
Similarly, SPDX License Expressions will never contain operators or other local components which differ only in case but have different semantics.
Tools are encouraged, but not required, to take advantage of those commitments and support parsing license expressions which alter the canonical casing of any expression components.

When a particular rule is not referenced, “SPDX License Expressions” means the more general `license-expression`.
Consumers that need the more limited `enclosed-license-expression` (which may be easier to parse depending on the surrounding context) SHOULD say so explicitly.

Tag:value authors SHOULD use `enclosed-license-expression` instead of the more general `license-expression`.

### IV.2.1 The `+` Operator <a name="IV.2.1"></a>

The unary `+` suffix operator represents the given version of the license or any later version.

For example, a grant like:

> This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

could be be represented as `GPL-2.0+`, although that form has been deprecated in favor of `GPL-2.0-or-later`.

The set of alternatives may depend on the specific license text.  For example, `AGPL-1.0+` (and its successor `AGPL-1.0-or-later`) invokes the “any later version” condition from §9 of the [`AGPL-1.0`][AGPL-1.0], allowing you to redistribute and/or modify it under the terms of the [AGPL-2.0][] (a later version published by Affero) or under the terms of the [`GPL-3.0-or-later`][GPL-3.0-or-later] (specifically allowed via the AGPL-1.0's §9).

### IV.2.2 Exception `WITH` Operator <a name="IV.2.2"></a>

Sometimes a set of license terms apply except under special circumstances.  In this case, use the binary `WITH` operator to construct a new simple expression to represent the exception situation.  A valid `simple-expression` is where the left operand is a `license` value (with an optional `+` suffix) and the right operand is a `license-exception-id` that represents the exception terms.

For example, when the Bison exception is applied to `GPL-2.0-or-later`, the `simple-expression` would be:

    GPL-2.0-or-later WITH Bison-exception-2.2

The current set of valid exceptions can be found in [Appendix I, section 2](appendix-I-SPDX-license-list.md#I.2).  For the most up to date set of exceptions please see [spdx.org/licenses](https://spdx.org/licenses).  If the applicable exception is not found on the SPDX License Exception List, then use a single `license-ref` to represent the entire license terms (including the exception).

### IV.2.3 Conjunctive `AND` Operator <a name="IV.2.3"></a>

If required to simultaneously comply with two or more licenses, use the conjunctive binary `AND` operator to construct a new license expression, where both the left and right operands are valid `license-expression` values.

For example, when one is required to comply with both the `LGPL-2.1` or `MIT` licenses, a valid `license-expression` would be:

    LGPL-2.1 AND MIT

An example where all three different licenses apply would be:

    LGPL-2.1 AND MIT AND BSD-2-Clause

### IV.2.4 Disjunctive `OR` Operator <a name="IV.2.4"></a>

If presented with a choice between two or more licenses, use the disjunctive binary `OR` license operator to construct a new license expression, where both the left and right operands are valid `license-expression` values.

For example, when given a choice between the `LGPL-2.1` or `MIT` licenses, a valid `license-expression` would be:

    LGPL-2.1 OR MIT

An example representing a choice between three different licenses would be:

    LGPL-2.1 OR MIT OR BSD-3-Clause

### IV.2.5 Grouping <a name="IV.2.5"></a>

Parentheses (`()`) can be used to specify an explicit grouping to override [operator precedence](#IV.2.6).  This is similar to the use of parentheses in algebraic expressions like `(5+7)/2`.

For instance, the following expression:

    MIT AND (LGPL-2.1-or-later OR BSD-3-Clause)

represents a license requring both `MIT` and the expression `LGPL-2.1-or-later OR BSD-3-Clause`, because the parenthesis require the enclosed expression take precedence over (is applied before) the `AND` operator.

### IV.2.6 Operator Precedence <a name="IV.2.6"></a>

The operators described above have the following precedence, from highest (binding tightest) at the top, to lowest (loosest) at the bottom:

    Grouping
    +
    WITH
    AND
    OR

For example, the following expression:

    LGPL-2.1 OR BSD-3-Clause AND MIT

represents a license choice between either `LGPL-2.1` and the expression `BSD-3-Clause AND MIT` because the `AND` operator takes precedence over (is applied before) the `OR` operator.

## IV.3 License Expressions in XML <a name="IV.3"></a>

### IV.3.1 The `+` Operator <a name="IV.3.1"></a>

The [`+` operator](#IV.2.1) can be expressed in XML via an `<spdx:OrLaterOperator>` element, with a single `<spdx:member`> child for the license preceeding the `+` operator.

    <spdx:OrLaterOperator>
        <spdx:member rdf:resource="http://spdx.org/licenses/GPL-2.0"/>
    </spdx:OrLaterOperator>

### IV.3.2 Exception `WITH` Operator <a name="IV.3.2"></a>

The [`WITH` operator](#IV.2.2) can be expressed in XML via a `<spdx:WithExceptionOperator>` element, with an `<spdx:member>` property for the license and an `<spdx:licenseException>` property for the exception.

    <spdx:WithExceptionOperator>
        <spdx:member rdf:resource="http://spdx.org/licenses/GPL-2.0"/>
        <spdx:licenseException rdf:resource="https://spdx.org/licenses/FLTK-exception.html">
    </spdx:WithExceptionOperator>

### IV.3.3 Conjunctive `AND` Operator <a name="IV.3.3"></a>

A [conjunctive license](#IV.2.3) can be expressed in XML via an `<spdx:ConjunctiveLicenseSet>` element, with an `<spdx:member>` child for each element in the conjunctive license.  Two or more members are required.

    <spdx:ConjunctiveLicenseSet>
        <spdx:member rdf:resource="http://spdx.org/licenses/GPL-2.0"/>
            <spdx:ExtractedLicensingInfo rdf:about="http://example.org#LicenseRef-EternalSurrender">
                <spdx:extractedText>
                    In exchange for using this software, you agree to give its author all your worldly possessions.
                    You will not hold the author liable for all the damage this software will inevitably cause not only
                    to your person and property, but to the entire fabric of the cosmos.
                </spdx:extractedText>
                <spdx:licenseId>LicenseRef-EternalSurrender</spdx:licenseId>
            </spdx:ExtractedLicensingInfo>
        </spdx:member>
    </spdx:ConjunctiveLicenseSet>

### IV.3.4 Disjunctive `OR` Operator <a name="IV.3.4"></a>

A [disjunctive license](#IV.2.4) can be expressed in XML via an `<spdx:DisjunctiveLicenseSet>` element, with an `<spdx:member>` child for each element in the disjunctive license.  Two or more members are required.

    <spdx:DisjunctiveLicenseSet>
        <spdx:member rdf:resource="http://spdx.org/licenses/GPL-2.0"/>
        <spdx:member>
            <spdx:ExtractedLicensingInfo rdf:about="http://example.org#LicenseRef-EternalSurrender">
                <spdx:extractedText>
                    In exchange for using this software, you agree to give its author all your worldly possessions.
                    You will not hold the author liable for all the damage this software will inevitably cause
                    not only to your person and property, but to the entire fabric of the cosmos.
                </spdx:extractedText>
                <spdx:licenseId>LicenseRef-EternalSurrender</spdx:licenseId>
            </spdx:ExtractedLicensingInfo>
        </spdx:member>
    </spdx:DisjunctiveLicenseSet>

[AGPL-1.0]: https://spdx.org/licenses/AGPL-1.0.html
[AGPL-2.0]: http://www.affero.org/agpl2.html
[GPL-3.0]: https://spdx.org/licenses/GPL-3.0-or-later.html
[list-case-commitment]: https://github.com/spdx/license-list-XML/pull/651#FIXME:get-this-released
[rdfs:comment]: https://www.w3.org/TR/2014/REC-rdf-schema-20140225/#ch_comment
[rdfs:seeAlso]: https://www.w3.org/TR/2014/REC-rdf-schema-20140225/#ch_seealso
[rfc5234]: http://tools.ietf.org/html/rfc5234
[rfc5234-aB]: https://tools.ietf.org/html/rfc5234#appendix-B
