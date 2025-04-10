<!-- Manually copied -->
<!-- SPDX-License-Identifier: Community-Spec-1.0 -->

# Agent

## 概要

Agent は、システム上で動作する可能性のあるすべてのものを表します。

## 説明

Agent クラスは、システムで動作する可能性のあるすべてのものを表します。

これは、各個人、組織、ソフトウェアエージェントなどです。

様々な作業を実行するために使用されるツール類と混同しないでください。

## メタデータ

`https://spdx.org/rdf/3.0.1/terms/Core/Agent`

| | |
|---|---|
| **Name** | Agent |
| **Instantiability** | Concrete |
| **SubclassOf** | [Element](../Classes/Element.md) |

## クラス階層

[/Core/Element](../../Core/Classes/Element.md)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[/Core/Agent](../../Core/Classes/Agent.md)

## すべてのプロパティ

| プロパティ | タイプ | minCount | maxCount |
|---|---|:---:|:---:|
| [comment](../../Core/Properties/comment.md) | xsd:string | 0 | 1 |
| [creationInfo](../../Core/Properties/creationInfo.md) | [CreationInfo](../../Core/Classes/CreationInfo.md) | 1 | 1 |
| [description](../../Core/Properties/description.md) | xsd:string | 0 | 1 |
| [extension](../../Core/Properties/extension.md) | [Extension](../../Extension/Classes/Extension.md) | 0 | * |
| [externalIdentifier](../../Core/Properties/externalIdentifier.md) | [ExternalIdentifier](../../Core/Classes/ExternalIdentifier.md) | 0 | * |
| [externalRef](../../Core/Properties/externalRef.md) | [ExternalRef](../../Core/Classes/ExternalRef.md) | 0 | * |
| [name](../../Core/Properties/name.md) | xsd:string | 0 | 1 |
| [spdxId](../../Core/Properties/spdxId.md) | xsd:anyURI | 1 | 1 |
| [summary](../../Core/Properties/summary.md) | xsd:string | 0 | 1 |
| [verifiedUsing](../../Core/Properties/verifiedUsing.md) | [IntegrityMethod](../../Core/Classes/IntegrityMethod.md) | 0 | * |
