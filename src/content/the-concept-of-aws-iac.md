---
layout: post
title: AWSにおけるInfrastructure as Codeの考え方
image: img/computer.jpg
author: [UH]
date: 2021-01-27T13:28:00.000+09:00
modifiedDate: 2021-02-01T21:40:00.000+09:00
tags: ['techblog', 'aws-devops']
draft: false
---

###### 目次

```toc
exclude: 目次
tight: false,
from-heading: 2
to-heading: 6
```

## IaCのイメージ

IaC（Infrastructure as Code）のイメージとして下記に示します。

| サービス名 | 特徴 | 影響範囲 |
| ---------- | ---- | -------- |
| AWS CloudFormation | AWSリソース（VPC・EC2・RDS・Lamda等）のインフラ基盤をコード形式で管理するサービス | Global/Mutable |
| Terraform | HashiCorp社より提供されているオープンソースのインフラ基盤を宣言型コードで管理できるツールでaws・azure・gcp等の各種クラウドに対応している。 | Global/Mutable
| AWS OpsWorks | サーバの内部設定（ミドルウェア等のデプロイ自動化）管理をコード形式で管理するサービス。<br> **CloudFormationよりも上のレイヤーになる。** | Local/Mutable |
| Ansible |      | Local/Mutable |
| Kubernetes |      | Local/Immutable |
| Docker |      | Local/Immutable |

**※その他に「AWS Systems Manager（OSのパッチ適用やWindows、LinuxといたOS設定の自動化）」やAWS Config（フルマネージド型の構成履歴や構成変更通知機能を備えた監査サービス）** が存在しますがここでは扱わないものとします。

aws iac 冪等性 純粋性 再現性

**AWSにおけるサーバレスの定義は「お客様からみてサーバの存在を意識しない環境」のことをいう。**

## 参考文献

[【#CODT2020 解説】Infrastructure as Code の静的テスト戦略](https://ccvanishing.hateblo.jp/entry/2020/07/30/173935)  
[C-1-5 Infrastructure as Code の静的テスト戦略](https://www.youtube.com/watch?v=vBGWUN8s6cE)  
[AWS CloudFormationをちょっとだけ理解した](https://qiita.com/suzuki-navi/items/60c046c95c217487e4f4)
