# Appendix II: License Matching Guidelines and Templates

The [SPDX License List Matching Guidelines](https://spdx.org/spdx-license-list/matching-guidelines) provide guidelines to be used for the purposes of matching licenses and license exceptions against those included on the SPDX License List. There is no intent here to make a judgment or interpretation, but merely to ensure that when one SPDX user identifies a license as "BSD-3-Clause," for example, it is indeed the same license as what someone else identifies as "BSD-3-Clause" and the same license as what is listed on the SPDX License List. Examples of how to apply some of the matching guidelines to a license or exception are provided via templates.  Templates are comprised of technical markup within the master license text file to provide further or specific guidance to SPDX document creators or tool makers.  Not all licenses or exceptions will have templates.

## SPDX License List Matching Guidelines, v2.1

## 1 How These Guidelines Are Applied

**1.1 Purpose**

To ensure consistent results by different SPDX document creators when matching license information that will be included in the License Information in File field. SPDX document creators or tools may match on the license or exception text itself, the official license header, or the SPDX License List short identifier.

**1.1.1 Guideline: Official License Headers**

The same matching guidelines used for license and exception text apply to the official license headers. Where applicable, an official license header template file with markup is included with the SPDX License List. Official license headers are defined by the SPDX License List as specific text specified within the license itself to be put in the header of files. (see https://spdx.org/spdx-license-list/license-list-overview for more info).

## 2 Substantive Text

**2.1 Purpose**

To ensure that when matching licenses and exceptions to the SPDX License List, there is an appropriate balance between matching against the substantive text and disregarding parts of the text that do not alter the substantive text. Further guidelines of what can be disregarded or considered replaceable for purposes of matching are listed below here and in the subsequent specific guidelines. A conservative approach is taken in regards to rules about disregarded or replaceable text.

**2.1.1 Guideline: Verbatim Text**

License and exception text should be the same verbatim text (except for the guidelines stated here). The text should be in the same order, e.g., differently ordered paragraphs would not be considered a match.

**2.1.2 Guideline: No Additional Text**

Matched text should only include that found in the vetted license or exception text. Where a license or exception found includes additional text or clauses, this should not be considered a match.

**2.1.3 Guideline: Replaceable Text**

Some licenses include text that refers to the specific copyright holder or author, yet the rest of the license is exactly the same as a generic version. The intent here is to avoid the inclusion of a specific name in one part of the license resulting in a non-match where the license is otherwise an exact match (e.g., the third clause and disclaimer in the BSD licenses, or the third, fourth, and fifth clauses of Apache-1.1). In these cases, there should be a positive license match.

Text that can be considered replaceable for matching purposes is indicated in the SPDX License List template with mark-up and in the corresponding HTML pages with colored text. The text indicated as such can be replaced with similar values (e.g., a different name or generic term; different date) and still be considered a positive match. This rule also applies to text-matching in official license headers (see Guideline #1).

**2.1.4 Guideline: Omitable Text**

Some licenses have text that can simply be ignored. The intent here is to avoid the inclusion of certain text that is superfluous or irrelevant in regards to the substantive license text resulting in a non-match where the license is otherwise an exact match (e.g., directions on how to apply the license or other similar non-substantive exhibits). In these cases, there should be a positive license match.

Text that can be considered omitable for matching purposes is indicated in the SPDX License List template with mark-up and in the corresponding HTML pages with colored text. The license should be considered a match if the text indicated is present and matches OR the text indicated is missing altogether.

## 3 Whitespace

**3.1 Purpose**

To avoid the possibility of a non-match due to different spacing of words, line breaks, or paragraphs.

**3.1.1 Guideline**

All whitespace should be treated as a single blank space. Templates do not include markup for this guideline.

## 4 Capitalization

**4.1 Purpose**

To avoid the possibility of a non-match due to lower case or upper case letters in otherwise the same words.

**4.1.1 Guideline**

All upper case and lower case letters should be treated as lower case letters. Templates do not include markup for this guideline.

## 5 Punctuation

**5.1 Purpose**

Because punctuation can change the meaning of a sentence, punctuation needs to be included in the matching process. License template files do not include markup for this guideline.

**5.1.1 Guideline: Punctuation**

Punctuation should be matched, unless otherwise stated in these guidelines.

**5.1.2 Guideline: Hyphens, Dashes**

Any hyphen, dash, en dash, em dash, or other variation should be considered equivalent.

**5.1.3 Guideline: Quotes**

Any variation of quotations (single, double, curly, etc.) should be considered equivalent.

## 6 Code Comment Indicators

**6.1 Purpose**

To avoid the possibility of a non-match due to the existence or absence of code comment indicators placed within the license text, e.g. at the start of each line of text.

**6.1.1 Guideline**

Any kind of code comment indicator or prefix which occurs at the beginning of each line in a matchable section should be ignored for matching purposes. Templates do not include markup for this guideline.

## 7 Bullets and Numbering

**7.1 Purpose**

To avoid the possibility of a non-match due to the otherwise same license using bullets instead of numbers, number instead of letter, or no bullets instead of bullet, etc., for a list of clauses.

**7.1.1 Guideline**

Where a line starts with a bullet, number, letter, or some form of a list item (determined where list item is followed by a space, then the text of the sentence), ignore the list item for matching purposes. Templates do not include markup for this guideline.

## 8 Varietal Word Spelling

**8.1 Purpose**

English uses different spelling for some words. By identifying the spelling variations for words found or likely to be found in licenses, we avoid the possibility of a non-match due to the same word being spelled differently. This list is not meant to be an exhaustive list of all spelling variations, but meant to capture the words most likely to be found in open source software licenses.

**8.1.1 Guideline**

The words in each line of the text file available at https://github.com/spdx/license-list-XML/blob/master/equivalentwords.txt are considered equivalent and interchangeable. Templates do not include markup for this guideline.

## 9 Copyright Symbol

**9.1 Purpose**

By having a rule regarding the use of "©", "(c)", or "copyright", we avoid the possibility of a mismatch based on these variations.

**9.1.1 Guideline**

"©", "(c)", or "Copyright" should be considered equivalent and interchangeable. Templates do not include markup for this guideline.

## 10 Copyright Notice

**10.1 Purpose**

To avoid a license mismatch merely because the copyright notice (usually found above the actual license or exception text) is different. The copyright notice is important information to be recorded elsewhere in the SPDX file, but for the purposes of matching a license to the SPDX License List, it should be ignored because it is not part of the substantive license text.

**10.1.1 Guideline**

Ignore copyright notices. A copyright notice consists of the following elements, for example: "2012 Copyright, John Doe. All rights reserved." or "(c) 2012 John Doe." Templates may or may not include markup for this guideline.

## 11 License Name or Title

**11.1 Purpose**

To avoid a license mismatch merely because the name or title of the license is different than how the license is usually referred to or different than the SPDX full name. This also avoids a mismatch if the title or name of the license is simply not included.

**11.1.1 Guideline**

Ignore the license name or title for matching purposes, so long as what ignored is the title only and there is no additional substantive text added here. Templates do not include markup for this guideline.

## 12 Extraneous Text At the End of a License

**12.1 Purpose**

To avoid a license mismatch merely because extraneous text that appears at the end of the terms of a license is different or missing. This also avoids a mismatch if the extraneous text merely serves as a license notice example and includes a specific copyright holder's name.

**12.1.1 Guideline**

Ignore any text that occurs after the obvious end of the license and does not include substantive text of the license, for example: text that occurs after a statement such as, "END OF TERMS AND CONDITIONS," or an exhibit or appendix that includes an example or instructions on to how to apply the license to your code. Do not apply this guideline or ignore text that is comprised of additional license terms (e.g., permitted additional terms under GPL-3.0, section 7). Templates do not include markup for this guideline.

## 13 HTTP Protocol

**13.1 Purpose**

To avoid a license mismatch due to a difference in a hyperlink protocol (e.g. http vs. https).

**13.1.1 Guideline**

HTTP:// and HTTPS:// should be considered equivalent. Templates may or may not include markup for this guideline.

## SPDX License List Template Access

The master files for the SPDX License List includes a spreadsheet listing all the licenses, deprecated licenses, and license exceptions; and the text for each license in a .txt file. These files are available in a [Git repository](https://github.com/spdx/license-list-XML). Text that can be considered replaceable or omitable for matching purposes is indicated in the .txt file with markup as per the description below.

RDFa Access: The template text for the license can be accessed using the RDF tag licenseTemplate on the web page containing the license.

**Template Format**

A template is composed of text with zero or more rules embedded in it.

A rule is a variable section of a license wrapped between double angle brackets “<<>>” and is composed of 4 fields. Each field is separated with a semi-colon “;”. Rules cannot be embedded within other rules. Rule fields begin with a case sensitive tag followed by an equal sign “=”.

Rule fields:

* type: indicates whether the text is replaceable or omitable as per [Matching Guideline #2](http://spdx.org/spdx-license-list/matching-guidelines) (“Substantive Text”).
    * Indicated by <<var; . . . >> or...
    * Indicated by <<beginOptional; . . .>> and <<endOptional>> respectively.
    * This field is the first field and is required.
* name: name of the field in the template.
    * This field is unique within each license template.
    * This field is required.
* original: the original text of the rule.
    * This field is required for a rule type: <<var; . . . >>
* match: a [POSIX extended regular expession (ERE)](http://pubs.opengroup.org/onlinepubs/9699919799/).
    * This field is required for a rule type: <<var; . . . >>

The [POSIX ERE]( http://pubs.opengroup.org/onlinepubs/9699919799/) in the match field has the following restrictions and extensions:

```text
Semicolons are escaped with \;
```

```text
POSIX Bracket Extensions are not allowed
```

Example:

```text
<<var;name=organizationClause3;original=the copyright holder;match=.+>>
```
