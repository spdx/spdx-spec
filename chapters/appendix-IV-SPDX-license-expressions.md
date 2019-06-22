---
header-left: "Header"
footer-left: "Footer"
...
# Appendix IV: SPDX License Expressions{#SPDX-License-Expressions}

## Overview

Often a single license can be used to represent the licensing terms of a source code or binary file, but there are situations where a single license identifier is not sufficient. A common example is when software is offered under a choice of one or more licenses (e.g., GPL-2.0 OR BSD-3-Clause). Another example is when a set of licenses is needed to represent a binary program constructed by compiling and linking two (or more) different source files each governed by different licenses (e.g., LGPL-2.1 AND BSD-3-Clause).

SPDX License Expressions provides a way for one to construct expressions that more accurately represent the licensing terms typically found in open source software source code. A license expression could be a single license identifier found on the SPDX License List; a user defined license reference denoted by the LicenseRef-`[idString]`; a license identifier combined with an SPDX exception; or some combination of license identifiers, license references and exceptions constructed using a small set of defined operators (e.g., `AND`, `OR`, `WITH` and `+`). We provide the definition of what constitutes a valid an SPDX License Expression in this section.

The exact syntax of license expressions is described below in [ABNF](http://tools.ietf.org/html/rfc5234).

idstring = 1*(ALPHA / DIGIT / "-" / "." )

license-id = \<short form license identifier in [Appendix I.1](#Appendix-I-SPDX-License-List)>

license-exception-id = \<short form license exception identifier in [Appendix I.2](#Appendix-II-License-Matching-Guidelines-and-Templates)>

license-ref = ["DocumentRef-"1\*(idstring)":"]"LicenseRef-"1*(idstring)

simple-expression = license-id / license-id"+" / license-ref

compound-expression = 1*1(simple-expression /


simple-expression "WITH" license-exception-id /

  compound-expression "AND" compound-expression /

  compound-expression "OR" compound-expression ) /

  "(" compound-expression ")" )

license-expression = 1*1(simple-expression / compound-expression)

In the following sections we describe in more detail `<license-expression>` construct, a licensing expression string that enables a more accurate representation of the licensing terms of modern day software.

A valid `<license-expression>` string consists of either:

(i) a simple license expression, such as a single license identifier; or

(ii) a more complex expression constructed by combining smaller valid expressions using Boolean license operators.

There MUST NOT be whitespace between a license-id and any following `+`. This supports easy parsing and backwards compatibility. There MUST be whitespace on either side of the operator "WITH". There MUST be whitespace and/or parentheses on either side of the operators `AND` and `OR`.

## Simple License Expressions <a name="simple-expr"></a>

A simple `<license-expression>` is composed one of the following:

* An SPDX License List Short Form Identifier. For example: GPL-2.0
* An SPDX License List Short Form Identifier with a unary"+" operator suffix to represent the current version of the license or any later version. For example: GPL-2.0+
* A SPDX user defined license reference: ["DocumentRef-"1\*(idstring)":"]"LicenseRef-"1*(idstring)

Some examples:

    LicenseRef-23

    LicenseRef-MIT-Style-1

    DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2

## Composite License Expressions <a name="composite-expr"></a>

More expressive composite license expressions can be constructed using "OR", "AND", and "WITH" operators similar to constructing mathematical expressions using arithmetic operators. For the `tag:value` format, any license expression that consists of more than one license identifier and/or LicenseRef, should be encapsulated by parentheses: "( )". This has been specified to facilitate expression parsing. Nested parentheses can also be used to specify an order of precedence which is discussed in more detail in subsection (4).

### 1) Disjunctive "OR" Operator

If presented with a choice between two or more licenses, use the disjunctive binary "OR" operator to construct a new lincense expression, where both the left and right operands are valid license expression values.

For example, when given a choice between the LGPL-2.1 or MIT licenses, a valid expression would be:

    (LGPL-2.1 OR MIT)

An example representing a choice between three different licenses would be:

(LGPL-2.1 OR MIT OR BSD-3-Clause)

### 2) Conjunctive "AND" Operator

If required to simultaneously comply with two or more licenses, use the conjunctive binary "AND" operator to construct a new license expression, where both the left and right operands are a valid license expression values.

For example, when one is required to comply with both the LGPL-2.1 or MIT licenses, a valid expression would be:

    (LGPL-2.1 AND MIT)

An example where all three different licenses apply would be:

    (LGPL-2.1 AND MIT AND BSD-2-Clause)

### 3) Exception "WITH" Operator

Sometimes a set of license terms apply except under special circumstances. In this case, use the binary "WITH" operator to construct a new license expression to represent the special exception situation. A valid `<license-expression>` is where the left operand is a `<simple-expression>` value and the right operand is a `<license-exception-id>` that represents the special exception terms.

For example, when the Bison exception is to be applied to GPL-2.0+, the expression would be:

    (GPL-2.0+ WITH Bison-exception-2.2)

The current set of valid exceptions can be found in [Appendix I, section 2](#sectionI.2). For the most up to date set of exceptions please see [spdx.org/licenses](https://spdx.org/licenses). If the applicable exception is not found on the SPDX License Exception List, then use a single `<license-ref>` to represent the entire license terms (including the exception).

### 4) Order of Precedence and Parentheses

The order of application of the operators in an expression matters (similar to mathematical operators). The default operator order of precedence of a `<license-expression>` a is:

    +
    WITH
    AND
    OR

where a lower order operator is applied before a higher order operator.

For example, the following expression:

    LGPL-2.1 OR BSD-3-Clause AND MIT

represents a license choice between either LGPL-2.1 and the expression BSD-3-Clause AND MIT because the AND operator takes precedence over (is applied before) the OR operator.

When required to express an order of precedence that is different from the default order a `<license-expression>` can be encapsulated in pairs of parentheses: ( ), to indicate that the operators found inside the parentheses takes precedence over operators outside. This is also similar to the use of parentheses in an algebraic expression e.g., (5+7)/2.

For instance, the following expression:

    (MIT AND (LGPL-2.1+ OR BSD-3-Clause))

states the OR operator should be applied before the AND operator. That is, one should first select between the LGPL-2.1+ or the BSD-3-Clause license before applying the MIT license.

### 5) License Expressions in RDF <a name="rdf-expr"></a>

A conjunctive license can be expressed in RDF via a `<spdx:ConjunctiveLicenseSet>` element, with an spdx:member property for each element in the conjunctive license. Two or more members are required.

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
    </spdx:ConjunctiveLicenseSet>

A disjunctive license can be expressed in RDF via a `<spdx:DisjunctiveLicenseSet>` element, with an spdx:member property for each element in the disjunctive license. Two or more members are required.

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

A License Exception can be expressed in RDF via a `<spdx:LicenseException>` element. This element has the following attributes:

* Comment - An `rdfs:comment` element describing the nature of the exception.
* See Also (optional)- An `rdfs:seeAlso` element referencing external sources of information on the exception.
* Example - Text describing examples of this exception.
* Name - The full human readable name of the item.
* License Exception ID: The identifier of an exception in the SPDX License List to which the exception applies.
* License Exception Text: Full text of the license exception.

        <rdf:Description rdf:about="http://example.org#SPDXRef-ButIdDontWantToException">
            <rdfs:comment>This exception may be invalid in some jurisdictions.</rdfs:comment>
            <rdfs:seeAlso>http://dilbert.com/strip/1997-01-15</rdfs:seeAlso>
            <spdx:example>So this one time, I had a license exception…</spdx:example>
            <spdx:licenseExceptionText>
                A user of this software may decline to follow any subset of the terms of this license upon
                finding any or all such terms unfavorable.
            </spdx:licenseExceptionText>
            <spdx:name>&quot;But I Don&apos;t Want To&quot; Exception</spdx:name>
            <spdx:licenseExceptionId>SPDXRef-ButIdDontWantToException</spdx:licenseExceptionId>
            <rdf:type rdf:resource="http://spdx.org/rdf/terms#LicenseException"/>
        </rdf:Description>