---
layout: post
title: AWS SAA 試験準備ワークショップ①
image: img/computer.jpg
author: [UH]
date: 2020-09-16T18:00:00.000+09:00
tags: ['techblog', 'awssaa']
draft: false
---

###### 目次

```toc
exclude: 目次
tight: false,
from-heading: 2
to-heading: 6
```

## `多層アーキテクチャソリューションの設計`および`AWSのサービスを使用したデカップリングメカニズムの設計`

疎結合とは、1つのサービスに問題が起きた場合に、全体に対して問題が波及するのではなく、問題を局所化しサービスを動かすことができることを指す。

WEBサーバがEメールサービスと直接通信している場合で、Eメールサーバがダウンした時、引きずられてWEBサーバに関わる処理ができなくなり、問題が大きくなるが間にSQS（メッセージキューイングサービス）を入れることでWEBサーバ自体は問題なく処理できることを担保できる。

### ELBについて

- Classic Load Balancer  
旧式のロードバランサーとなっている。

- Application Load Balancer  
OSI参照モデルのレイヤー7で実行されリクエストの内容に基づいてトラフィックをルーティングしてくれる。  
`固定レスポンス`となっている。

- Network Load Balancer  
OSI参照モデルのレイヤー4で実行され、TCPパケットのロードバランシングで、高パフォーマンスのアプリケーション向けとなっている。

## 可用性の高いアーキテクチャやフォールトトレラントなアーキテクチャの設計

`あらゆるものは必ず壊れる。それが終わることはない`  
壊れることを想定し、システムを構築しておく必要があることを意味している。

**AWS Well Architected Framework**を該当程度に理解しておく必要がある。
- 運用上の優秀性
- セキュリティ
- 信頼性
- パフォーマンス効率
- コスト最適化

こらら4つの柱から成り立っている。

- 回復性の高いアーキテクチャを考える上で・・・  
AWS CloudFormation  
AWS Lambda  
等のサービスが該当する。

## 適切な回復力あるストレージの選択

### Amazon EC2インスタンスストア
`エフェメラルボリューム`は、インスタンスを停止すると揮発し、データが消えてしまうが、**高速・広帯域**なのでバッチ処理の一時ディスクやキャッシュとしての利用が好まれる。

### Amazon EBS（Amazon Elastic Block Store）
`ブロックレベル`のストレージを提供し、インスタンスから`独立した永続性`を持つ。

### EFS（Amazon Elastic File System）
EC2上で利用できる共有ファイルのディスクとなっている。  
`EBSを使った共有ファイルディスク作成は出来ないので注意が必要。`

### Amazon S3（Amazon Simple Storage Service）
インターネットからアクセス可能なオブジェクトストレージとなる。  
容量は事実上無制限。

### Amzaon S3アクセスコントロール
どのオブジェクトに誰がアクセスできるのか細かく定義することができる。

### Amazon S3 Glacier
通常は取り出さないが、なにかあった時の為に、消すことはできないが使うことも、ほとんどない場合において安価に保存ができるストレージサービスとなっている。

## 参考文献
[TAC-2：AWS 認定 - 試験準備ワークショップ 「ソリューションアーキテクト – アソシエイト」セッション 1](https://resources.awscloud.com/aws-summit-online-japan-2020-on-demand-tc-24866/tac-02-aws-summit-online-2020-tcsaa)
