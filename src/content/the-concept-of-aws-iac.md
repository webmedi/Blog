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
[インフラ技術を網羅的に学ぶ Infra Study Meetup シリーズ](https://www.youtube.com/playlist?list=PLa7KKuU8Ysnv3cJJUMCeG8fECnhGYRvBo)  
[search results for "Infrastructure as Code"](https://www.oreilly.com/search/?query=Infrastructure%20as%20Code&extended_publisher_data=true&highlight=true&include_assessments=false&include_case_studies=true&include_courses=true&include_playlists=true&include_collections=true&include_notebooks=true&is_academic_institution_account=false&source=user&sort=relevance&facet_json=true&page=0&include_facets=false&include_scenarios=true&include_sandboxes=true&json_facets=true)  
[「Infrastructure as Codeに疲れたので、僕たちが本来やりたかったことを整理する」を１年掛けて整理した](https://medium.com/@shogomuranushi/infrastructure-as-code%E3%81%AB%E7%96%B2%E3%82%8C%E3%81%9F%E3%81%AE%E3%81%A7-%E5%83%95%E3%81%9F%E3%81%A1%E3%81%8C%E6%9C%AC%E6%9D%A5%E3%82%84%E3%82%8A%E3%81%9F%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8%E3%82%92%E6%95%B4%E7%90%86%E3%81%99%E3%82%8B-%E3%82%92%EF%BC%91%E5%B9%B4%E6%8E%9B%E3%81%91%E3%81%A6%E6%95%B4%E7%90%86%E3%81%97%E3%81%9F-ad435d953471)  
