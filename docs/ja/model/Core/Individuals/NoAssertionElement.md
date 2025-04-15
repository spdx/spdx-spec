<!-- Manually copied -->
<!-- SPDX-License-Identifier: Community-Spec-1.0 -->

# NoAssertionElement

## 概要

不明な識別子やカーディナリティ (数) を持つ要素の集合を表す個別の値。  

## 説明

NoAssertionElement は、以下の場合に利用されるべきです。

- SPDX ドキュメントの作成者が、合理的、客観的な判断を試みたが解決できなかった場合
- SPDX ドキュメントの作成者が、この部分を判断しなかった場合
- SPDX ドキュメントの作成者が、意図的に情報を提供しなかった場合（その行為に意味を含ませるべきではありません）

例えば、
`relationshipType`="ancestorOf"、
`from`=Element1
の時に、
`to`=NoAssertionElement
という関係は、Element1 が子エレメントを持つかどうかは分からないということを明示的に表しています。

## メタデータ

`https://spdx.org/rdf/3.0.1/terms/Core/NoAssertionElement`

| | |
|---|---|
| **Name** | NoAssertionElement |
| **Type** | [IndividualElement](../Classes/IndividualElement.md) |
| **IRI** | `https://spdx.org/rdf/3.0.1/terms/Core/NoAssertionElement` |
