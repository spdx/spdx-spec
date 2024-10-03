# SPDX Lite (規範)

## Liteプロファイルの説明

Liteプロファイルは、企業が新しいアイテムをプロセスに導入する能力が限られているような状況で、ソフトウェア部品表を迅速かつ簡単に開始できるように設計されています。
Lite プロファイルは、ソフトウェアのサプライチェーンにおけるライセンスコンプライアンスに必要な最小限の情報を取得します。
これには、SBOMの作成に関する情報、ライセンスおよびその他の関連情報を含むパッケージリスト、およびそれらの関係が含まれています。

Lite プロファイルのすべての要素は、ライセンスの順守に不可欠です。
ライセンス情報に関する十分な知識がない人でも、Liteプロファイルを持つSPDXドキュメントを簡単に使用でき、旧バージョンのSPDX Liteフォーマットファイルからライセンス情報を簡単にインポートできます。
Liteプロファイルは、ソフトウェアのサプライチェーンにおけるSPDX文書として、単独でも他のSPDXプロファイルと組み合わせても使用できる柔軟性を備えています。

## 必須プロパティと推奨プロパティ

Liteプロファイルでは、いくつかのプロパティは必須（MUST）であり、他のいくつかのプロパティは可能な限り必須（SHOULD）であると規定しています。

以下のリストでは、SPDXデータに存在するすべてのクラスについて、この情報を収集し、簡潔でわかりやすい形式で示します。
プロパティのリストは、参照しやすいようにアルファベット順になっています。

### /Core/SpdxDocument

- 必須
    1. creationInfo
    1. element （複数可）、/Core/Sbomオブジェクトを少なくとも1つ持たなければならない(MUST)
    1. rootElement （複数可）、/Core/Sbom型のオブジェクトであることが望ましい(SHOULD)
    1. spdxId
- 推奨
    1. comment
    1. dataLicense
    1. name
    1. namespaceMap （複数可）
    1. verifiedUsing （複数可）、/Core/Hash型のオブジェクトであることが望ましい(SHOULD)

### /Software/Sbom

- 必須
    1. creationInfo
    1. element （複数可）, /Software/Packageオブジェクトを少なくとも1つ持たなければならない(MUST)
    1. rootElement （複数可）、/Software/Package型のオブジェクトであることが望ましい(SHOULD)
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
    1. suppliedBy、/Core/Agent型のオブジェクトであることが望ましい(SHOULD)
- 推奨
    1. attributionText （複数可）
    1. builtTime
    1. comment
    1. downloadLocation
    1. homepage
    1. originatedBy （複数可）、/Core/Agent型のオブジェクトであることが望ましい(SHOULD)
    1. packageUrl
    1. releaseTime
    1. supportLevel （複数可）
    1. validUntilTime
    1. verifiedUsing （複数可）、/Core/Hash型のオブジェクトであることが望ましい(SHOULD)

ただし、少なくとも "downloadLocation" または "packageUrl" プロパティがなければなりません(MUST)。

さらに

1. すべての /Software/Package オブジェクトに対して、その要素を `from` プロパティとし、/SimpleLicensing/AnyLicenseInfo を `to` プロパティとする `hasConcludedLicense` タイプの /Core/Relationship オブジェクトが正確に 1 つ存在しなければなりません(MUST)。
1. /Software/Package オブジェクトごとに、その要素を `from` プロパティとし、 /SimpleLicensing/AnyLicenseInfo オブジェクトを `to` プロパティとする `hasDeclaredLicense` タイプの /Core/Relationship オブジェクトが正確に 1 つ存在しなければなりません(MUST)。

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
    1. creationInfo, “BlankNode”であることが望ましい(SHOULD)
    1. name
    1. spdxId
- 推奨
    1. externalIdentifier（複数可）

### /Core/CreationInfo

- 必須
    1. created
    1. createdBy （複数可）、/Core/Agent型のオブジェクトであることが望ましい(SHOULD)
    1. specVersion、“3.0.1”の固定文字列でなければならない（MUST）
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
