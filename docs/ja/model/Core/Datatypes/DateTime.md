<!-- Manually copied -->
<!-- SPDX-License-Identifier: Community-Spec-1.0 -->

# DateTime

## 概要

特定の日付と時刻を表す文字列。

## 説明

DateTime は、特定の日付と時刻を表す文字列です。

秒単位の解像度を持ち、常にUTCタイムゾーンで表されます。

最も一般的に使用されている形式の1つである、ISO-8601 フォーマットで記述します。

## メタデータ

`https://spdx.org/rdf/3.0.1/terms/Core/DateTime`

| | |
|---|---|
| **Name** | DateTime |
| **SubclassOf** | xsd:dateTimeStamp |

## フォーマットパターン

`^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ$`
