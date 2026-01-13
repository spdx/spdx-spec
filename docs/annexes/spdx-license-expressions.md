# SPDX license expressions (Normative)

## Overview

Often a single license can be used to represent the licensing terms of a source code or binary file, but there are situations where a single license identifier is not sufficient. A common example is when software is offered under a choice of one or more licenses (e.g., `GPL-2.0-only OR BSD-3-Clause`). Another example is when a set of licenses is needed to represent a binary program constructed by compiling and linking two (or more) different source files each governed by different licenses (e.g., `LGPL-2.1-only AND BSD-3-Clause`).

SPDX License Expressions provide a way for one to construct expressions that more accurately represent the licensing terms typically found in open source software source code. A license expression could be a single license identifier found on the SPDX License List; a user defined license reference denoted by the "LicenseRef-(idstring)"; a license identifier combined with an SPDX exception; or some combination of license identifiers, license references and exceptions constructed using a small set of defined operators (e.g., "AND", "OR", "WITH" and "+"). We provide the definition of what constitutes a valid SPDX License Expression in this section.

The general format of license expressions is described below in ABNF, as defined
in [RFC 5234](https://datatracker.ietf.org/doc/rfc5234/) and expanded
in [RFC 7405](https://datatracker.ietf.org/doc/rfc7405/).

```ABNF
idstring = 1*(ALPHA / DIGIT / "-" / "." )

license-id = <short form license identifier from SPDX License List>

license-exception-id = <short form license exception identifier from SPDX License List>

license-ref = ["DocumentRef-"(idstring)":"]"LicenseRef-"(idstring)

addition-ref = ["DocumentRef-"(idstring)":"]"AdditionRef-"(idstring)

simple-expression = license-id / license-id"+" / license-ref / "NONE" / "NOASSERTION"

addition-expression = license-exception-id / addition-ref

compound-expression = (simple-expression /

  simple-expression "WITH" addition-expression /

  compound-expression "AND" compound-expression /

  compound-expression "OR" compound-expression /

  "(" compound-expression ")" )

license-expression = (simple-expression / compound-expression)
```

In the following sections we describe in more detail `<license-expression>` construct, a licensing expression string that enables a more accurate representation of the licensing terms of modern-day software.

A valid `<license-expression>` string consists of either:

(i) a simple license expression, such as a single license identifier; or

(ii) a more complex expression constructed by combining smaller valid expressions using Boolean license operators.

There shall not be any space between a license-id and any following "+". This supports easy parsing and backwards compatibility.

There shall be at least one space on either side of the operators "AND", "OR", and "WITH".

A license expression shall be on a single line, and shall not include a line break in the middle of the expression.

## Case sensitivity

In SPDX 3, license expressions are completely *case-insensitive*.

That includes the operators ("AND", "OR", "WITH"), the special identifiers ("NONE" and "NOASSERTION"), as well as the license identifiers, including the user-defined ones.

For example, the expressions `MIT AND NOASSERTION AND (BSD-3-Clause OR LicenseRef-Name)` and `mit aNd NoaSSerTion AnD (bSd-3-clausE OR licenseref-NAME)` are equivalent.

However, please be aware that it is often important to note the case of the canonical identifier on the [SPDX License List](https://spdx.org/licenses). This is because the canonical identifier's case is used in the URL of the license's or exception's entry on the List, and because the canonical identifier is translated to a URI in RDF documents.

## Simple license expressions

A simple `<license-expression>` is composed one of the following:

- An SPDX License List Short Form Identifier. For example: `CDDL-1.0`
- An SPDX License List Short Form Identifier with a unary "+" operator suffix to represent the current version of the license or any later version. For example: `CDDL-1.0+`
- One of the special identifiers "NONE" or "NOASSERTION"
- A user defined license reference:
  `["DocumentRef-"(idstring)":"]"LicenseRef-"(idstring)`.
  For example:
  `LicenseRef-23`,
  `LicenseRef-MIT-Style-1`, and
  `DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2`

The current set of valid license identifiers can be found in the SPDX License List.

## Composite license expressions

### Introduction

More expressive composite license expressions can be constructed using "OR", "AND", and "WITH" operators similar to constructing mathematical expressions using arithmetic operators.

Any license expression that consists of more than one license identifier and/or LicenseRef, may optionally be encapsulated by parentheses: "( )".

Nested parentheses can also be used to specify an order of precedence which is discussed in more detail below.

### Disjunctive "OR" operator

If presented with a choice between two or more licenses, use the disjunctive binary "OR" operator to construct a new license expression, where both the left and right operands are valid license expression values.

For example, when given a choice between the LGPL-2.1-only or MIT licenses, a valid expression would be:

```text
LGPL-2.1-only OR MIT
```

The "OR" operator is commutative, meaning that the above expression should be considered equivalent to:

```text
MIT OR LGPL-2.1-only
```

An example representing a choice between three different licenses would be:

```text
LGPL-2.1-only OR MIT OR BSD-3-Clause
```

The special identifiers "NONE" or "NOASSERTION" shall not be used with the "OR" operator.

### Conjunctive "AND" operator

If required to simultaneously comply with two or more licenses, use the conjunctive binary "AND" operator to construct a new license expression, where both the left and right operands are valid license expression values.

For example, when one is required to comply with both the LGPL-2.1-only and MIT licenses, a valid expression would be:

```text
LGPL-2.1-only AND MIT
```

The "AND" operator is commutative, meaning that the above expression should be considered equivalent to:

```text
MIT AND LGPL-2.1-only
```

An example where three different licenses apply would be:

```text
LGPL-2.1-only AND MIT AND BSD-2-Clause
```

The "AND" operator is the only operator that can be used in conjuction with the special identifiers "NONE" or "NOASSERTION".

### Additive "WITH" operator

Sometimes license texts are found with additional text, which might or might not modify the original license terms.

In this case, use the binary "WITH" operator to construct a new license expression to represent the special situation. A valid `<license-expression>` is where the left operand is a `<simple-expression>` value and the right operand is a `<addition-expression>` that represents the additional text.

The `<addition-expression>` can be either a `<license-exception-id>` from the SPDX License List, or a user defined addition reference in the form `["DocumentRef-"(idstring)":"]"AdditionRef-"(idstring)`.

For example, when the Bison exception is to be applied to GPL-2.0-or-later, the expression would be:

```text
GPL-2.0-or-later WITH Bison-exception-2.2
```

The current set of valid license exceptions identifiers can be found in [spdx.org/licenses](https://spdx.org/licenses).

The special identifiers "NONE" or "NOASSERTION" shall not be used with the "WITH" operator.

### Order of precedence and parentheses

The order of application of the operators in an expression matters (similar to mathematical operators). The default operator order of precedence of a `<license-expression>` is:

```text
+
WITH
AND
OR
```

where a lower order operator is applied before a higher order operator.

For example, the following expression:

```text
LGPL-2.1-only OR BSD-3-Clause AND MIT
```

represents a license choice between either LGPL-2.1-only or the expression "BSD-3-Clause AND MIT" because the "AND" operator takes precedence over (is applied before) the "OR" operator.

When required to express an order of precedence that is different from the default order a `<license-expression>` can be encapsulated in pairs of parentheses: ( ), to indicate that the operators found inside the parentheses takes precedence over operators outside. This is also similar to the use of parentheses in an algebraic expression e.g., (5+7)/2.

For instance, the following expression:

```text
(LGPL-2.1-or-later OR BSD-3-Clause) AND MIT
```

states the "OR" operator should be applied before the "AND" operator. That is, one should first select between the LGPL-2.1-or-later or the BSD-3-Clause license before applying the MIT license.

## Complete grammar

The complete syntax of license expressions,
including precedence and whitespace,
is described by the following ABNF:

```ABNF
; ABNF Grammar for License Expressions

SPSX-license-expression = (or-operand *( required-ws "OR" required-ws or-operand )) / special-identifier

or-operand = (term required-ws "AND" required-ws term *( required-ws "AND" required-ws term )) / base-term

term = base-term / special-identifier

base-term = with-expression / identifier / parenthesized-expression

with-expression = identifier required-ws "WITH" required-ws addition-identifier

addition-identifier = license-exception-id / addition-ref

identifier = license-id / or-later-expression / license-ref

or-later-expression = license-id PLUS

parenthesized-expression = LPAREN optional-ws expression optional-ws RPAREN

special-identifier = "NONE" / "NOASSERTION"

; --- SPDX License List contents ---

license-id           = <short form license identifier from SPDX License List>
license-exception-id = <short form license exception identifier from SPDX License List>

; --- User-defined identifiers ---

license-ref  = [ "DocumentRef-" idstring ":" ] "LicenseRef-"  idstring
addition-ref = [ "DocumentRef-" idstring ":" ] "AdditionRef-" idstring

idstring = *id-char alnum *id-char
idchar   = alnum / DOT / DASH
alnum    = ALPHA / DIGIT

; --- Whitespace and characters ---

optional-ws = *SPACE       ; Optional whitespace (zero or more spaces)
required-ws = 1*SPACE      ; Required whitespace (one or more spaces)

SPACE  = %x20              ; Space character
LPAREN = %x28              ; ( - Left parenthesis
RPAREN = %x29              ; ) - Right parenthesis
PLUS   = %2B               ; + - Plus
DASH   = %2D               ; - - Dash, hyphen
DOT    = %2E               ; . - Dot, fullstop, period

ALPHA  = %x41-5A / %x61-7A ; A-Z / a-z
DIGIT  = %x30-39           ; 0-9

```
