# SPDX License List matching guidelines and templates (Normative)

## SPDX License List matching guidelines

The SPDX License List Matching Guidelines provide guidelines to be used for the purposes of matching licenses and license exceptions against those included on the [SPDX License List](https://spdx.org/licenses/).
There is no intent here to make a judgment or interpretation, but merely to ensure that when one SPDX user identifies a license as "BSD-3-Clause," for example, it is indeed the same license as what someone else identifies as "BSD-3-Clause" and the same license as what is listed on the SPDX License List.
As noted here, some of the matching guidelines are implemented in the XML files of the SPDX License List repository.

## How these guidelines are applied

### Purpose

To ensure consistent results by different SPDX document creators when matching
license information that will be included in SPDX data.
SPDX document creators or tools may match on the license or exception text
itself, the official license header, or the SPDX License List short identifier.

### Guideline: official license headers

The matching guidelines apply to license and exception text, as well as official license headers.
Official license headers are defined by the SPDX License List as specific text specified within the license itself to be put in the header of files.
(see [explanation of SPDX License List fields](https://github.com/spdx/license-list-XML/blob/v3.25.0/DOCS/license-fields.md) for more info).

The following XML tag is used to implement this guideline: `<standardLicenseHeader>`

## Substantive text

### Purpose

To ensure that when matching licenses and exceptions to the SPDX License List, there is an appropriate balance between matching against the substantive text and disregarding parts of the text that do not alter the substantive text or legal meaning. Further guidelines of what can be disregarded or considered replaceable for purposes of matching are listed below here and in the subsequent specific guidelines. A conservative approach is taken in regard to rules relating to disregarded or replaceable text.

### Guideline: verbatim text

License and exception text should be the same verbatim text (except for the guidelines stated here). The text should be in the same order, e.g., differently ordered paragraphs would not be considered a match.

### Guideline: no additional text

Matched text should only include that found in the vetted license or exception text. Where a license or exception found includes additional text or clauses, this should not be considered a match.

### Guideline: replaceable text

Some licenses include text that refers to the specific copyright holder or author, yet the rest of the license is exactly the same. The intent here is to avoid the inclusion of a specific name in one part of the license resulting in a non-match where the license is otherwise an exact match to the legally substantive terms (e.g., the third clause and disclaimer in the BSD licenses, or the third, fourth, and fifth clauses of Apache-1.1). In these cases, there should be a positive license match.

The text indicated as such can be replaced with similar values (e.g., a different name or generic term; different date) and still be considered a positive match.
This rule also applies to text-matching in official license headers,
see [Guideline: official license headers](#guideline-official-license-headers).

The following XML tag is used to implement this guideline. `<alt>` with 2 attributes:

- `match` - a POSIX extended regular expression (ERE) to match the replaceable text
- `name` - an identifier for the variable text unique to the license XML document

The original text is enclosed within the beginning and ending alt tags.

For example:
`<alt match="(?i:copyright.{0,200})." name="copyright1">Copyright The Linux Foundation</alt>`

The original replaceable text appears on the SPDX License List webpage in red text.

### Guideline: omittable text

Some licenses have text that can simply be ignored. The intent here is to avoid the inclusion of certain text that is superfluous or irrelevant in regards to the substantive license text resulting in a non-match where the license is otherwise an exact match (e.g., directions on how to apply the license or other similar exhibits). In these cases, there should be a positive license match.

The license should be considered a match if the text indicated is present and matches OR the text indicated is missing altogether.

The following XML tag is used to implement this guideline: `<optional>`

For example:
`<optional>Apache License Version 2.0, January 2004 http://www.apache.org/licenses/</optional>`

Omittable text appears on the SPDX License List webpage in blue text.

## Whitespace

### Purpose

To avoid the possibility of a non-match due to different spacing of words, line breaks, or paragraphs.

### Guideline

All whitespace should be treated as a single blank space.

XML files do not require specific markup to implement this guideline.

## Capitalization

### Purpose

To avoid the possibility of a non-match due to lowercase or uppercase letters in otherwise the same words.

### Guideline

All uppercase and lowercase letters should be treated as lowercase letters.

XML files do not require specific markup to implement this guideline.

## Punctuation

### Purpose

Because punctuation can change the meaning of a sentence, punctuation needs to be included in the matching process.

XML files do not require specific markup to implement this guideline, unless to indicate an exception to the guideline.

### Guideline: punctuation

Punctuation should be matched, unless otherwise stated in these guidelines or unless specific markup is added.

### Guideline: hyphens, dashes

Any hyphen, dash, en dash, em dash, or other variation should be considered equivalent.

### Guideline: Quotes

Any variation of quotations (single, double, curly, etc.) should be considered equivalent.

## Code Comment Indicators or Separators

### Purpose

To avoid the possibility of a non-match due to the existence or absence of code
comment indicators placed within the license text, e.g., at the start of each
line of text, or repetitive characters to establish a separation of text,
e.g., `---`, `===`, `___`, or `***`.

### Guideline

Any kind of code comment indicator or prefix which occurs at the beginning of each line in a matchable section should be ignored for matching purposes.

XML files do not require specific markup to implement this guideline.

### Guideline

A non-letter character repeated 3 or more times to establish a visual separation should be ignored for matching purposes.

XML files do not require specific markup to implement this guideline.

## Bullets and numbering

### Purpose

To avoid the possibility of a non-match due to the otherwise same license using bullets instead of numbers, number instead of letter, or no bullets instead of bullet, etc., for a list of clauses.

### Guideline

Where a line starts with a bullet, number, letter, or some form of a list item (determined where list item is followed by a space, then the text of the sentence), ignore the list item for matching purposes.

The following XML tag is used to implement this guideline: `<bullet>`

For example: `<bullet>1.0</bullet>`

## Varietal word spelling

### Purpose

English uses different spelling for some words. By identifying the spelling variations for words found or likely to be found in licenses, we avoid the possibility of a non-match due to the same word being spelled differently. This list is not meant to be an exhaustive list of all spelling variations, but meant to capture the words most likely to be found in open source software licenses.

### Guideline

The words in each line of the text file available at the
[equivalent words list](https://spdx.org/licenses/equivalentwords.txt)
are considered equivalent and interchangeable.

XML files do not require specific markup to implement this guideline.

## Copyright symbol

### Purpose

By having a rule regarding the use of "©", "(c)", or "copyright", we avoid the possibility of a mismatch based on these variations.

### Guideline

"©", "(c)", or "Copyright" should be considered equivalent and interchangeable.

XML files do not require specific markup to implement this guideline.
The copyright symbol is part of the copyright notice,
see implementation of that guideline in [Copyright notice](#copyright-notice).

## Copyright notice

### Purpose

To avoid a license mismatch merely because the copyright notice (usually found above the actual license or exception text) is different. The copyright notice is important information to be recorded elsewhere in the SPDX document, but for the purposes of matching a license to the SPDX License List, it should be ignored because it is not part of the substantive license text.

### Guideline

Ignore copyright notices. A copyright notice consists of the following elements, for example: "2012 Copyright, John Doe. All rights reserved." or "(c) 2012 John Doe."

The following XML tag is used to implement this guideline: `<copyrightText>`

For example: `<copyrightText>Copyright 2022 The Linux Foundation</copyrightText>`

## License name or title

### Purpose

To avoid a license mismatch merely because the name or title of the license is different than how the license is usually referred to or different than the SPDX full name. This also avoids a mismatch if the title or name of the license is simply not included.

### Guideline

Ignore the license name or title for matching purposes, so long as what ignored is the title only and there is no additional substantive text added here.

The following XML tag is used to implement this guideline: `<titleText>`

For example: `<titleText>Attribution Assurance License</titleText>`

## Extraneous text at the end of a license

### Purpose

To avoid a license mismatch merely because extraneous text that appears at the end of the terms of a license is different or missing. This also avoids a mismatch if the extraneous text merely serves as a license notice example and includes a specific copyright holder's name.

### Guideline

Ignore any text that occurs after the obvious end of the license and does not include substantive text of the license, for example: text that occurs after a statement such as, "END OF TERMS AND CONDITIONS," or an exhibit or appendix that includes an example or instructions on to how to apply the license to your code. Do not apply this guideline or ignore text that is comprised of additional license terms (e.g., permitted additional terms under GPL-3.0, section 7).

To implement this guideline, use the `<optional>` XML element tag as described
in [Guideline: omittable text](#guideline-omittable-text).

## HTTP protocol

### Purpose

To avoid a license mismatch due to a difference in a hyperlink protocol (e.g. HTTP vs. HTTPS).

### Guideline

`http://` and `https://` should be considered equivalent.

XML files do not require specific markup to implement this guideline.

## SPDX License List

### Template access

The license XML can be accessed in the license-list-data repository under the
license-list-XML directory. Although the license list XML files can also be
found in the
[license-list-XML](https://github.com/spdx/license-list-XML) repository,
users are encouraged to use the published versions in the
[license-list-data](https://github.com/spdx/license-list-data) repository.
The license-list-data repository is tagged by release.
Only tagged released versions of the license list are considered stable.

### License List XML format

A full schema for the License List XML can be found at
[SPDX License List XML Schema](https://github.com/spdx/license-list-XML/blob/v3.25.0/schema/ListedLicense.xsd).

### Legacy Text Template format

Prior to the XML format, a text template was used to express variable and
optional text in licenses.
This text template is still supported, however, users are encouraged to use
the more expressive XML format.

A legacy template is composed of text with zero or more rules embedded in it.

A rule is a variable section of a license wrapped between double angle brackets
`<<>>` and is composed of 4 fields.
Each field is separated with a semi-colon `;`.
Rules cannot be embedded within other rules.
Rule fields begin with a case sensitive tag followed by an equal sign `=`.

Rule fields:

- **type:** indicates whether the text is replaceable or omittable as per
  [Substantive text guidelines](#substantive-text).
  - Indicated by `<<var; . . . >>` or
  - Indicated by `<<beginOptional; . . .>>` and `<<endOptional>>` respectively.
  - This field is the first field and is required.
- **name:** name of the field in the template.
  - This field is unique within each license template.
  - This field is required.
- **original:** the original text of the rule.
  - This field is required for a rule type: `<<var; . . . >>`
- **match:** a POSIX extended regular expression (ERE).
  - This field is required for a rule type: `<<var; . . . >>`

The [POSIX ERE](http://pubs.opengroup.org/onlinepubs/9699919799/) in the match
field has the following restrictions and extensions:

- Semicolons are escaped with `\;`
- POSIX Bracket Extensions are not allowed

For example:
`<<var;name=organizationClause3;original=the copyright holder;match=.+>>`
