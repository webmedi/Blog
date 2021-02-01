---
layout: post
title: zabbix ユーザパラメータ監視設定メモ
image: img/computer.jpg
author: [UH]
date: 2020-11-09T13:30:00.000+09:00
modifiedDate: 2021-02-02T00:09:00.000+09:00
tags: ['techblog']
draft: false
---

###### 目次

```toc
exclude: 目次
tight: false,
from-heading: 2
to-heading: 6
```

## リンク

[Zabbix Official Repository](https://repo.zabbix.com/zabbix/5.0/rhel/6/x86_64/)  
**↳zabbix-releaseを使用する。**  
[ホスト監視追加手順](https://knowledge.sakura.ad.jp/13655/), [関連度合い強](https://colabmix.co.jp/tech-blog/install-zabbix-agent-centos6/)  
[監視追加仕様 アイテムの作成](https://www.zabbix.com/documentation/2.2/jp/manual/config/items/item)  
[ZabbixにQmailのメールキューの監視を設定](http://sersha.net/ja/centos6/zabbix-qmail-mailqueue-setup)  
[監視設定確認](https://networkengineer.it-study.info/zabbix/zabbix-get-sender.html#text2)  
[カスタムグラフ設定](https://www.zabbix.com/documentation/2.0/jp/manual/config/visualisation/graphs/custom)  
[ユーザパラメータ設定](https://www.atmarkit.co.jp/ait/articles/1003/03/news146.html)  
[リモートコマンド](https://www.zabbix.com/documentation/2.2/jp/manual/config/notifications/action/operation/remote_command)  
**↳リモートコマンドにより、監視しているホストで、ある条件を満たした時、あらかじめ設定したコマンドを自動的に実行されます。**  
**↳アプリケーション（Webサーバ、ミドルウェア、CRM）が応答しない場合に自動的に再起動する。等**  
