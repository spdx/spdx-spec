# Appendix II: License Matching Guidelines and Templates

The [SPDX License List Matching Guidelines](http://spdx.org/spdx-license-list/matching-guidelines) provide guidelines to be used for the purposes of matching licenses and license exceptions against those found on the SPDX License List. There is no intent here to make a judgment or interpretation, but merely to ensure that when one SPDX creator identifies a license as “BSD 3-clause,” for example, it is indeed the same license as what someone else identifies as “BSD 3-clause” and the same license as what is listed on the SPDX License List. Examples of how to apply some of the matching guidelines to a license or exception are provided via templates. Templates are comprised of technical markup within the master license text file to provide further or specific guidance to SPDX document creators or tool makers. Not all licenses or exceptions will have templates with markups.

## SPDX License List Template Access

The master files for the SPDX License List includes a spreadsheet listing all the licenses, deprecated licenses, and license exceptions; and the text for each license in a .txt file. These files are available in a [Git repository](http://git.spdx.org/?p=license-list.git%3Ba=summary). Text that can be considered replaceable or omitable for matching purposes is indicated in the .txt file with markup as per the description below.

RDFa Access: The template text for the license can be accessed using the RDF tag licenseTemplate on the web page containing the license.

## Template Format

A template is composed of text with zero or more rules embedded in it.

A rule is a variable section of a license wrapped between double angle brackets “<<>>” and is composed of 4 fields. Each field is separated with a semi-colon “;”. Rules can be embedded only inside rules with a rule type of optional.  Rule fields begin with a case sensitive tag followed by an equal sign “=”.

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

        Semicolons are escaped with \;

        POSIX Bracket Extensions are not allowed

Example:

    <<var;name=organizationClause3;original=the copyright holder;match=.+>>