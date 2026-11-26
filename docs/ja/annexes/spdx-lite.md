# SPDX Lite (規定)

## Liteプロファイルについて

Liteプロファイルは、プロセスに新しい項目を取り入れるのに人員やリソースを割けないような企業でも、ソフトウェア部品表をスムーズに取り入れられるように設計されています。Liteプロファイルは、ソフトウェアサプライチェーンにおけるライセンスコンプライアンスに必要な最小限の情報をまとめたものです。これには、SBOMの作成に関する情報、ライセンス情報やその他の関連情報を含むパッケージリスト、およびそれらの依存関係が含まれています。

Liteプロファイルのすべての要素は、ライセンスの遵守に必要不可欠です。ライセンス情報に関する十分な知識がない人でも、Liteプロファイルを使用してSPDXドキュメントを簡単に活用することができ、以前のバージョンのSPDX Lite形式のファイルからライセンス情報をインポートすることも簡単にできます。Liteプロファイルは、ソフトウェアサプライチェーンにおけるSPDXドキュメントとして単独で使用することも、他のSPDXプロファイルと組み合わせても使用することもできる柔軟性を備えています。

## 必須および推奨プロパティ

Liteプロファイルでは、いくつかのプロパティは**必須**であり、他のいくつかのプロパティは**可能な限り必須**であると規定しています。

以下のリストは、SPDXデータに存在するすべてのクラスについて、簡潔でわかりやすい形式でこの情報をまとめて表示します。プロパティのリストは、参照しやすいようにアルファベット順になっています。

### /Core/SpdxDocument

- 必須
    1. creationInfo
    1. element （複数可）、/Core/Sbom オブジェクトを少なくとも1つ持たなければ**ならない**
    1. rootElement （複数可）、/Core/Sbom 型のオブジェクトであることが**望ましい**
    1. spdxId
- 推奨
    1. comment
    1. dataLicense
    1. name
    1. namespaceMap （複数可）
    1. verifiedUsing （複数可）、/Core/Hash 型のオブジェクトであることが**望ましい**

### /Software/Sbom

- 必須
    1. creationInfo
    1. element （複数可）、/Software/Package オブジェクトを少なくとも1つ持たなければ**ならない**
    1. rootElement （複数可）、/Software/Package 型のオブジェクトであることが**望ましい**
    1. spdxId
- 推奨
    1. sbomType （複数可）

### /Software/Package

- 必須
    1. copyrightText
    1. creationInfo
    1. name
    1. packageVersion
    1. spdxId
    1. suppliedBy、/Core/Agent 型のオブジェクトであることが**望ましい**
- 推奨
    1. attributionText （複数可）
    1. builtTime
    1. comment
    1. downloadLocation
    1. homepage
    1. originatedBy （複数可）、/Core/Agent 型のオブジェクトであることが**望ましい**
    1. packageUrl
    1. releaseTime
    1. supportLevel （複数可）
    1. validUntilTime
    1. verifiedUsing （複数可）、/Core/Hash 型のオブジェクトであることが**望ましい**

ただし、少なくとも "downloadLocation" または "packageUrl" プロパティがなければ**なりません**。

さらに

1. すべての /Software/Package オブジェクトごとに、その要素を `from` プロパティとして、/SimpleLicensing/AnyLicenseInfo を `to` プロパティとする `hasConcludedLicense` 型の /Core/Relationship オブジェクトが1つだけ存在しなければ**なりません**。
1. すべての /Software/Package オブジェクトごとに、その要素を `from` プロパティとして、 /SimpleLicensing/AnyLicenseInfo オブジェクトを `to` プロパティとする `hasDeclaredLicense` 型の /Core/Relationship オブジェクトが1つだけ存在しなければ**なりません**。

### /Core/Hash

- 必須
    1. algorithm
    1. hashValue
- 推奨
    1. comment

### /SimpleLicensing/LicenseExpression

- 必須
    1. creationInfo
    1. licenseExpression
    1. spdxId
- 推奨
    1. licenseListVersion

### /SimpleLicensing/SimpleLicensingText

- 必須
    1. creationInfo
    1. licenseText
    1. spdxId
- 推奨
    1. comment

### /Core/Agent (createdBy, suppliedBy, originatedBy)

- 必須
    1. creationInfo、“BlankNode”であることが望ましい(SHOULD)
    1. name
    1. spdxId
- 推奨
    1. externalIdentifier（複数可）

### /Core/CreationInfo

- 必須
    1. created
    1. createdBy （複数可）、/Core/Agent型のオブジェクトであることが**望ましい**
    1. specVersion、“3.0.1”の固定文字列でなければ**ならない**
- 推奨
    1. comment

### /Core/ExternalIdentifier

- 必須
    1. externalIdentifierType
    1. identifier

### /Core/NameSpaceMap

- 必須
    1. namespace
    1. prefix

### /Core/Relationship

- 必須
    1. creationInfo
    1. from
    1. relationshipType
    1. spdxId
    1. to （複数可）
