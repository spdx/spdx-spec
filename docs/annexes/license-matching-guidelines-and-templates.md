# Annex C License matching guidelines and templates (Informative)

## C.1 SPDX license list matching guidelines <a name="C.1"></a>

The SPDX License List Matching Guidelines provide guidelines to be used for the purposes of matching licenses and license exceptions against those included on the SPDX License List. There is no intent here to make a judgment or interpretation, but merely to ensure that when one SPDX user identifies a license as "BSD-3-Clause," for example, it is indeed the same license as what someone else identifies as "BSD-3-Clause" and the same license as what is listed on the SPDX License List.  As noted here, some of the matching guidelines are implemented in the XML files of the SPDX License List repository.

## C.2 How these guidelines are applied <a name="C.2"></a>

### C.2.1 Purpose <a name="C.2.1"></a>

To ensure consistent results by different SPDX document creators when matching license information that will be included in the License Information in File field. SPDX document creators or tools may match on the license or exception text itself, the official license header, or the SPDX License List short identifier.

### C.2.2 Guideline: official license headers <a name="C.2.2"></a>

The matching guidelines apply to license and exception text, as well as official license headers. Official license headers are defined by the SPDX License List as specific text specified within the license itself to be put in the header of files. (see [explanation of SPDX License List fields](https://github.com/spdx/license-list-XML/blob/master/DOCS/license-fields.md) for more info).

The following XML tag is used to implement this guideline: `<standardLicenseHeader>`

## C.3 Substantive text <a name="C.3"></a>

### C.3.1 Purpose <a name="C.3.1"></a>

To ensure that when matching licenses and exceptions to the SPDX License List, there is an appropriate balance between matching against the substantive text and disregarding parts of the text that do not alter the substantive text or legal meaning. Further guidelines of what can be disregarded or considered replaceable for purposes of matching are listed below here and in the subsequent specific guidelines. A conservative approach is taken in regard to rules relating to disregarded or replaceable text.

### C.3.2 Guideline: verbatim text <a name="C.3.2"></a>

License and exception text should be the same verbatim text (except for the guidelines stated here). The text should be in the same order, e.g., differently ordered paragraphs would not be considered a match.

### C.3.3 Guideline: no additional text <a name="C.3.3"></a>

Matched text should only include that found in the vetted license or exception text. Where a license or exception found includes additional text or clauses, this should not be considered a match.

### C.3.4 Guideline: replaceable text <a name="C.3.4"></a>

Some licenses include text that refers to the specific copyright holder or author, yet the rest of the license is exactly the same. The intent here is to avoid the inclusion of a specific name in one part of the license resulting in a non-match where the license is otherwise an exact match to the legally substantive terms (e.g., the third clause and disclaimer in the BSD licenses, or the third, fourth, and fifth clauses of Apache-1.1). In these cases, there should be a positive license match.

The text indicated as such can be replaced with similar values (e.g., a different name or generic term; different date) and still be considered a positive match. This rule also applies to text-matching in official license headers (see Guideline: official license headers).
  
The following XML tag is used to implement this guideline.  `<alt>` with 2 attributes:

* `match` - a POSIX extended regular expression (ERE) to match the replaceable text
* `name` - an identifier for the variable text unique to the license XML document

The original text is enclosed within the beginning and ending alt tags.

For example: `<alt match="(?i:copyright.{0,200})." name="copyright1">Copyright Linux Foundation</alt>`
  
The original replaceable text appears on the SPDX License List webpage in red text.

### C.3.5 Guideline: omittable text <a name="C.3.5"></a>

Some licenses have text that can simply be ignored. The intent here is to avoid the inclusion of certain text that is superfluous or irrelevant in regards to the substantive license text resulting in a non-match where the license is otherwise an exact match (e.g., directions on how to apply the license or other similar exhibits). In these cases, there should be a positive license match.

The license should be considered a match if the text indicated is present and matches OR the text indicated is missing altogether.

The following XML tag is used to implement this guideline: `<optional>`
  
For example: `<optional>Apache License Version 2.0, January 2004 http://www.apache.org/licenses/</optional>`

Omittable text appears on the SPDX License List webpage in blue text.

## C.4 Whitespace <a name="C.4"></a>

### C.4.1 Purpose <a name="C.4.1"></a>

To avoid the possibility of a non-match due to different spacing of words, line breaks, or paragraphs.

### C.4.2 Guideline <a name="C.4.2"></a>

All whitespace should be treated as a single blank space. 

XML files do not require specific markup to implement this guideline. 

## C.5 Capitalization <a name="C.5"></a>

### C.5.1  Purpose <a name="C.5.1"></a>

To avoid the possibility of a non-match due to lowercase or uppercase letters in otherwise the same words.

### C.5.2  Guideline <a name="C.5.2"></a>

All uppercase and lowercase letters should be treated as lowercase letters. 

XML files do not require specific markup to implement this guideline. 

## C.6 Punctuation <a name="C.6"></a>

### C.6.1  Purpose <a name="C.6.1"></a>

Because punctuation can change the meaning of a sentence, punctuation needs to be included in the matching process. 

XML files do not require specific markup to implement this guideline, unless to indicate an exception to the guideline. 

### C.6.2  Guideline: punctuation <a name="C.6.2"></a>

Punctuation should be matched, unless otherwise stated in these guidelines or unless specific markup is added.

### C.6.3  Guideline: hyphens, dashes <a name="C.6.3"></a>

Any hyphen, dash, en dash, em dash, or other variation should be considered equivalent.

### C.6.4 Guideline: Quotes

Any variation of quotations (single, double, curly, etc.) should be considered equivalent.

## C.7 Code Comment Indicators or Separators <a name="C.7"></a>

### C.7.1  Purpose <a name="C.7.1"></a>

To avoid the possibility of a non-match due to the existence or absence of code comment indicators placed within the license text, e.g., at the start of each line of text, or repetitive characters to establish a separation of text, e.g., ---, ===, ___, or ***.

### C.7.2  Guideline <a name="C.7.2"></a>

Any kind of code comment indicator or prefix which occurs at the beginning of each line in a matchable section should be ignored for matching purposes. 

XML files do not require specific markup to implement this guideline. 

### C.7.3  Guideline <a name="C.7.3"></a>

A non-letter character repeated 3 or more times to establish a visual separation should be ignored for matching purposes. 

XML files do not require specific markup to implement this guideline. 

## C.8 Bullets and numbering <a name="C.8"></a>

### C.8.1  Purpose <a name="C.8.1"></a>

To avoid the possibility of a non-match due to the otherwise same license using bullets instead of numbers, number instead of letter, or no bullets instead of bullet, etc., for a list of clauses.

### C.8.2  Guideline <a name="C.8.2"></a>

Where a line starts with a bullet, number, letter, or some form of a list item (determined where list item is followed by a space, then the text of the sentence), ignore the list item for matching purposes. 

The following XML tag is used to implement this guideline: `<bullet>`

For example: `<bullet>1.0</bullet>`

## C.9 Varietal word spelling <a name="C.9"></a>

### C.9.1  Purpose <a name="C.9.1"></a>

English uses different spelling for some words. By identifying the spelling variations for words found or likely to be found in licenses, we avoid the possibility of a non-match due to the same word being spelled differently. This list is not meant to be an exhaustive list of all spelling variations, but meant to capture the words most likely to be found in open source software licenses.

### C.9.2  Guideline <a name="C.9.2"></a>

The words in each line of the text file available at <https://spdx.org/licenses/equivalentwords.txt> are considered equivalent and interchangeable. 

XML files do not require specific markup to implement this guideline.

## C.10 Copyright symbol <a name="C.10"></a>

### C.10.1 Purpose <a name="C.10.1"></a>

By having a rule regarding the use of "©", "(c)", or "copyright", we avoid the possibility of a mismatch based on these variations.

### C.10.2 Guideline <a name="C.10.2"></a>

"©", "(c)", or "Copyright" should be considered equivalent and interchangeable. 

XML files do not require specific markup to implement this guideline. The copyright symbol is part of the copyright notice, see implementation of that guideline below.

## C.11 Copyright notice <a name="C.11"></a>

### C.11.1 Purpose <a name="C.11.1"></a>

To avoid a license mismatch merely because the copyright notice (usually found above the actual license or exception text) is different. The copyright notice is important information to be recorded elsewhere in the SPDX document, but for the purposes of matching a license to the SPDX License List, it should be ignored because it is not part of the substantive license text.

### C.11.2 Guideline <a name="C.11.2"></a>

Ignore copyright notices. A copyright notice consists of the following elements, for example: "2012 Copyright, John Doe. All rights reserved." or "(c) 2012 John Doe." 

The following XML tag is used to implement this guideline: `<copyrightText>`

For example: `<copyrightText>Copyright 2022 Linux Foundation</copyrightText>`

## C.12 License name or title <a name="C.12"></a>

### C.12.1 Purpose <a name="C.12.1"></a>

To avoid a license mismatch merely because the name or title of the license is different than how the license is usually referred to or different than the SPDX full name. This also avoids a mismatch if the title or name of the license is simply not included.

### C.12.2 Guideline <a name="C.12.2"></a>

Ignore the license name or title for matching purposes, so long as what ignored is the title only and there is no additional substantive text added here. 

The following XML tag is used to implement this guideline: `<titleText>` 

For example: `<titleText>Attribution Assurance License</titleText>`

## C.13 Extraneous text at the end of a license <a name="C.13"></a>

### C.13.1 Purpose <a name="C.13.1"></a>

To avoid a license mismatch merely because extraneous text that appears at the end of the terms of a license is different or missing. This also avoids a mismatch if the extraneous text merely serves as a license notice example and includes a specific copyright holder's name.

### C.13.2 Guideline <a name="C.13.2"></a>

Ignore any text that occurs after the obvious end of the license and does not include substantive text of the license, for example: text that occurs after a statement such as, "END OF TERMS AND CONDITIONS," or an exhibit or appendix that includes an example or instructions on to how to apply the license to your code. Do not apply this guideline or ignore text that is comprised of additional license terms (e.g., permitted additional terms under GPL-3.0, section 7). 

To implement this guideline, use the `<optional>` XML element tag as described in section C.3.5.

## C.14 HTTP Protocol <a name="C.14"></a>

### C.14.1 Purpose <a name="C.14.1"></a>

To avoid a license mismatch due to a difference in a hyperlink protocol (e.g. http vs. https).

### C.14.2 Guideline <a name="C.14.2"></a>

HTTP:// and HTTPS:// should be considered equivalent. 

XML files do not require specific markup to implement this guideline.

## C.15 SPDX License list <a name="C.15"></a>

### C.15.1 Template access <a name="C.15.1"></a>

The license XML can be accessed in the license-list-data repository under the license-list-XML directory.  Although the license list XML files can also be found in the [license-list-XML](https://github.com/spdx/license-list-XML) repo, users are encouraged to use the published versions in the [license-list-data](https://github.com/spdx/license-list-data) repository.  The license-list-data repository is tagged by release.  Only tagged released versions of the license list are considered stable.

### C.15.2 License List XML format <a name="C.15.2"></a>
  
A full schema for the License List XML can be found at https://github.com/spdx/license-list-XML/blob/master/schema/ListedLicense.xsd.

