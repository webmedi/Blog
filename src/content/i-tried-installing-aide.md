---
layout: post
title: AIDEをインストールおよび改ざんチェックしてみた
image: img/irasutoya/computer_crime.png
author: [UH]
date: 2021-02-26T05:57:00.000+09:00
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

## AIDEをインストールおよび改ざんチェックしてみた

### 概要
AIDEというOSSソフトを使い、インストールおよび改ざんチェックを行ってみたいと思います。

今回は、チェック部分までやり、次回、チェックスクリプトを作成していきたいと思っています。

### AIDEのインストール

[root@ ~]# yum install aide

[root@ ~]# yum list installed | grep aide
```
aide.x86_64                           0.15.1-13.el7                  @base
```

### 設定ファイルのバックアップ

[root@ aide]# cp -p /etc/aide.conf /etc/aide.conf.org  

[root@ aide]# cp -p /etc/aide.conf /etc/aide.conf_20210226  
初期データベース生成時に、`/etc/aide.conf`で定義されているルールセットのみチェックするので設定ファイルを変更しますのでバックアップしておきます。

### 設定ファイルの編集

[root@ aide]# vi /etc/aide.conf
100行目当りにある、「/bin/    CONTENT_EX」から最下行までのルールセットが不要なので削除します。  

削除後、「/boot/   CONTENT_EX」を「/var/www/vhosts/   CONTENT_EX」へ変更します。  

※「/var/www/vhosts/」は監視したいディレクトリを指定します。  
　複数ディレクトリを監視したい場合は、`「{監視対象ディレクトリ}   {CONTENT_EX等の監視ルール ※本設定ファイル内に記載があります。}」`のルールセットを複製します。  
　例：「/var/www/vhosts/ CONTENT_EX」  

※ファイル単体を監視する場合は、`「{監視対象ファイル}$ {CONTENT_EX等の監視ルール ※本設定ファイル内に記載があります。}」`と定義します。  
　例：「/etc/my.cnf$ CONTENT_EX」

※特定ディレクトリや特定ファイルを削除したい場合は、`監視パスの先頭に「!」を付けるようにします。`  
　例：「!/var/www/vhosts/mattermost.whitesweets.pgw.jp/LOG」

ここままでで、設定ファイルには下記のように設定しました。  
※一部分のみ抜粋しています。

```
# Next decide what directories/files you want in the database. Aide
# uses a first match system. Put file specific instructions before generic
# matches. e.g. Put file matches before directories.

/var/www/vhosts/ CONTENT_EX
/etc/my.cnf$ CONTENT_EX

# Ignore apache log files
!/var/www/vhosts/mattermost.whitesweets.pgw.jp/LOG
!/var/www/vhosts/.jp/LOG
!/var/www/vhosts/whitesweets.pgw.jp/LOG
```

### データベース生成

[root@ ~]# aide --init
```
AIDE, version 0.15.1

### AIDE database at /var/lib/aide/aide.db.new.gz initialized.
```
初期データベースを生成を行います。  
`※生成時間は設定した監視対象領域のコンテンツ数によって異なります。`  
　`コンテンツ量が多い場合、上記データベースファイルの肥大化に繋がるので、ディスク空き領域を確認し、生成中等サイズをモニタリングするようにします。`

### 設定通り記録されているか確認

[root@ aide]# grep -v -E "\/etc\/my.cnf|\/var\/www\/vhosts\/" aide.db.new
```
@@begin_db
# This file was generated by Aide, version 0.15.1
# Time of generation was 2021-02-26 03:45:56
@@db_spec name lname attr perm inode uid gid lcount sha256 acl xattrs selinux
```
先ほど、`生成した初期データベースが設定したルールセットのみ`であることが確認できます。

[root@ aide]# grep -E "\/LOG\/" aide.db.new | wc -l
```
0
```
`除外設定`をしたLOGディレクトリが除外されていることが確認できます。

[root@ aide]# head -n 6 aide.db.new;echo -e "\n---\n";tail -n 3 aide.db.new
```
@@begin_db
# This file was generated by Aide, version 0.15.1
# Time of generation was 2021-02-26 04:12:30
@@db_spec name lname attr perm inode uid gid lcount sha256 acl xattrs selinux
/etc/my.cnf 0 44025514013 100644 5210466 0 0 1 99BtTnIuXei4igc5MG31haE0EWHPej3bdSE1+QFBf4w= POSIX,dXNlcjo6cnctCmdyb3VwOjpyLS0Kb3RoZXI6OnItLQo=,0 0 0
/var/www/vhosts/whitesweets.pgw.jp 0 42951772189 40755 37782900 0 0 4 0 POSIX,dXNlcjo6cnd4Cmdyb3VwOjpyLXgKb3RoZXI6OnIteAo=,0 0 0

---

/var/www/vhosts/whitesweets.pgw.jp/WWW/wpWebCms3094X/wp-includes/widgets/class-wp-widget-media-video.php 0 44025514013 100755 50368753 48 48 1 4QeN5oYcd+7psGcjRVXhx1hNkrOUZVX1Iza9zUCZcAY= POSIX,dXNlcjo6cnd4Cmdyb3VwOjpyLXgKb3RoZXI6OnIteAo=,0 0 0
/var/www/vhosts/whitesweets.pgw.jp/WWW/wpWebCms3094X/wp-includes/widgets/class-wp-widget-media.php 0 44025514013 100755 50368754 48 48 1 qhDVwus4dDGxp4dUKP4eyfNCEaaI3dJ4JK0R14zrG7I= POSIX,dXNlcjo6cnd4Cmdyb3VwOjpyLXgKb3RoZXI6OnIteAo=,0 0 0
/var/www/vhosts/whitesweets.pgw.jp/WWW/wpWebCms3094X/wp-includes/widgets/class-wp-widget-custom-html.php 0 44025514013 100755 50368755 48 48 1 eLD9P+JtCgHyZXuBo/ORBzhi1CLE4AcvFO9C6Mw6St0= POSIX,dXNlcjo6cnd4Cmdyb3VwOjpyLXgKb3RoZXI6OnIteAo=,0 0 0
```
データベースの中身（おまけ）

[root@ ~]# cp -p /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz  
`生成したデータベースを使用できるように、「.new.」部分を削除した形でコピーします。`

### 動作確認

[root@ ~]# aide --check
```
AIDE 0.15.1 found differences between database and filesystem!!
Start timestamp: 2021-02-26 04:41:32

Summary:
  Total number of files:        24744
  Added files:                  2
  Removed files:                0
  Changed files:                0


---------------------------------------------------
Added files:
---------------------------------------------------

added: /var/www/vhosts/.jp/WWW/wp-content/uploads/wpcf7_captcha/1692799095.png
added: /var/www/vhosts/.jp/WWW/wp-content/uploads/wpcf7_captcha/1692799095.txt
```
チェックを実施した結果、ファイルが追加されていることが分かりますね。

[root@ ~]# aide --update
```
AIDE 0.15.1 found differences between database and filesystem!!
Start timestamp: 2021-02-26 04:46:45

Summary:
  Total number of files:        24744
  Added files:                  2
  Removed files:                0
  Changed files:                0


---------------------------------------------------
Added files:
---------------------------------------------------

added: /var/www/vhosts/.jp/WWW/wp-content/uploads/wpcf7_captcha/1692799095.png
added: /var/www/vhosts/.jp/WWW/wp-content/uploads/wpcf7_captcha/1692799095.txt
```
`「aide --check」`ではデータベースが更新されないので`「aide --update」`を実行し`「/var/lib/aide/aide.db.new.gz」`を`「/var/lib/aide/aide.db.gz」`へコピーするようにします。

[root@ ~]# cp -p  /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz
```
cp: `/var/lib/aide/aide.db.gz' を上書きしますか? y
```

[root@ ~]# aide --update
```
AIDE, version 0.15.1

### All files match AIDE database. Looks okay!

### New AIDE database written to /var/lib/aide/aide.db.new.gz
```
`再度、実行すると全部マッチし差違がなかったことを確認できます。`

### まとめ
設定ファイルの編集に少し迷いましたが、なれれば簡単ですね。

次回は、チェックスクリプトを作成していたいと思っています。

参考にしたサイト：https://access.redhat.com/documentation/ja-jp/red_hat_enterprise_linux/7/html/security_guide/sec-using-aide