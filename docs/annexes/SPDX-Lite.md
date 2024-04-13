# Annex G SPDX Lite  

## G.1 Definition of the Lite profile <a name="G.1"></a>  

The Lite profile is designed to make it quick and easy to start a Software Bill of Materials in situations where a company may have limited capacity for introducing new items into its process.  
The Lite profile captures the minimum set of information required for license compliance in the software supply chain. It contains information about the creation of the SBOM, package lists with licensing and other related items, and their relationships.  

All elements in Lite profile are essential for complying with licenses. It is easy to use a SPDX document with the Lite profile for anyone who does not have enough knowledge about licensing information and easy to import license information from former versions of SPDX Lite format files.  
The Lite profile offers the flexibility to be used either alone or in combination with other SPDX profiles as a SPDX document in the software supply chain.  

## G.2 Table of the Lite profile elements <a name="G.2"></a>  

A SPDX document with the Lite profile must include properties for each class listed in **Table G.1**. And ```Cardinality 1..1``` means a **REQUIRED** element, and the others **SHOULD** be filled in as much as possible if necessary.  

**Table G.1 — the Lite profile elements**  

1. For a /Core/SpdxDocument to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/SpdxDocument/spdxId    		| 1..1	| |  
   | 2 | /Core/SpdxDocument/name            | 0..1	| |  
   | 3 | /Core/SpdxDocument/comment			| 0..1	| |  
   | 4 | /Core/SpdxDocument/creationInfo	| 1..1	| |  
   | 5 | /Core/SpdxDocument/verifiedUsing	| 0..1	| This should be an object of /Core/Hash |  
   | 6 | /Core/SpdxDocument/element			| 1..*	| MUST have at least one element |  
   | 7 | /Core/SpdxDocument/rootElement		| 1..1	| This should be an object of /Core/Sbom |  
   | 8 | /Core/SpdxDocument/namespaceMap	| 0..*	| |  
   | 9 | /Core/SpdxDocument/dataLicense		| 0..1	| |  

2. For a /Core/NameSpaceMap to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/NameSpaceMap/prefix		| 1..1	| |  
   | 2 | /Core/NameSpaceMap/namespace	| 1..1	| |  

3. For a /Software/Sbom to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Software/Sbom/spdxId			| 1..1	| |  
   | 2 | /Software/Sbom/creationInfo	| 1..1	| |  
   | 3 | /Software/Sbom/element			| 1..*	| MUST have at least one element |  
   | 4 | /Software/Sbom/rootElement    | 1..1	| This should be an object of /Software/Package |  
   | 5 | /Software/Sbom/sbomType		   | 0..1	| |  

4. For a /Core/CreationInfo to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/CreationInfo/specVersion | 1..1	| This should be a fixed string, “3.0”. |  
   | 2 | /Core/CreationInfo/comment 	| 0..1	| |  
   | 3 | /Core/CreationInfo/created 	| 1..1	| |  
   | 4 | /Core/CreationInfo/createdBy	| 1..1	| This should be an object of /Core/Agent |  

5. For a /Core/Agent (createdBy, suppliedBy, originatedBy) to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/Agent/spdxId				| 1..1	| |  
   | 2 | /Core/Agent/name			    | 1..1	| |  
   | 3 | /Core/Agent/creationInfo		| 1..1	| This should be “BlankNode” |  
   | 4 | /Core/Agent/externalIdentifier	| 0..1	| |  

6. For a /Core/ExternalIdentifier to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/ExternalIdentifier/externalIdentifierType	| 1..1	| |  
   | 2 | /Core/ExternalIdentifier/identifier		        | 1..1	| |  

7. For a /Software/Package to be conformant with this profile, the following has to hold:  
And all /Software/Package objects MUST have “downloadLocation” OR “packageUrl” if present.  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Software/Package/spdxId			    | 1..1	| |  
   | 2 | /Software/Package/name			        | 1..1	| |  
   | 3 | /Software/Package/comment			    | 0..1	| |  
   | 4 | /Software/Package/creationInfo			| 1..1	| |  
   | 5 | /Software/Package/verifiedUsing		| 0..1	| This should be an object of /Core/Hash |  
   | 6 | /Software/Package/originatedBy		    | 0..*	| This should be an object of /Core/Agent |  
   | 7 | /Software/Package/suppliedBy			| 1..1	| This should be an object of /Core/Agent |  
   | 8 | /Software/Package/builtTime			| 0..1	| |  
   | 9 | /Software/Package/releaseTime			| 0..1	| |  
   | 10 | /Software/Package/validUntilTime		| 0..1	| |  
   | 11 | /Software/Package/supportLevel		| 0..1	| |  
   | 12 | /Software/Package/copyrightText		| 1..1	| |  
   | 13 | /Software/Package/attributionText		| 0..1	| |  
   | 14 | /Software/Package/packageVersion		| 1..1	| |  
   | 15 | /Software/Package/downloadLocation	| 0..1	| |  
   | 16 | /Software/Package/packageUrl			| 0..1	| |  
   | 17 | /Software/Package/homepage			| 0..1	| |  

8. For a /Core/Hash to be conformant with this profile, the following has to hold:  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/Hash/algorithm	| 1..1	| |  
   | 2 | /Core/Hash/hashValue	| 1..1	| |  
   | 3 | /Core/Hash/comment		| 0..1	| |  

9. For a /Core/Relationship to be conformant with this profile, the following has to hold:  

   1. for every /Software/Package object MUST exist exactly one /Core/Relationship object of type ```concludedLicense``` having that element as its ```from``` property and an /SimpleLicensing/AnyLicenseInfo as its ```to``` property.  
   2. for every /Software/Package object MUST exist exactly one /Core/Relationship object of type ```declaredLicense``` having that element as its ```from``` property and  /SimpleLicensing/AnyLicenseInfo object as its ```to``` property.  

   | # | Property Name | Cardinality | Comments |  
   |:-:|:--|:--|:--|  
   | 1 | /Core/Relationship/spdxId			    | 1..1	| |  
   | 2 | /Core/Relationship/creationInfo		| 1..1	| |  
   | 3 | /Core/Relationship/from 				| 1..1	| |  
   | 4 | /Core/Relationship/to 			    	| 1..*	| |  
   | 5 | /Core/Relationship/relationshipType	| 1..1	| |  

10. For a /SimpleLicensing/LicenseExpression to be conformant with this profile, the following has to hold:  

    | # | Property Name | Cardinality | Comments |  
    |:-:|:--|:--|:--|  
    | 1 | /SimpleLicensing/LicenseExpression/spdxId			| 1..1	| |  
    | 2 | /SimpleLicensing/LicenseExpression/creationInfo		| 1..1	| |  
    | 3 | /SimpleLicensing/LicenseExpression/licenseExpression	| 1..1	| |  
    | 4 | /SimpleLicensing/LicenseExpression/licenseListVersion	| 0..1	| |  

11. For a /SimpleLicensing/SimpleLicensingText to be conformant with this profile, the following has to hold:  

    | # | Property Name | Cardinality | Comments |  
    |:-:|:--|:--|:--|  
    | 1 | /SimpleLicensing/SimpleLicensingText/spdxId			| 1..1	| |  
    | 2 | /SimpleLicensing/SimpleLicensingText/creationInfo		| 1..1	| |  
    | 3 | /SimpleLicensing/SimpleLicensingText/licenseText		| 1..1	| |  
    | 4 | /SimpleLicensing/SimpleLicensingText/comment		| 0..1	| |  
