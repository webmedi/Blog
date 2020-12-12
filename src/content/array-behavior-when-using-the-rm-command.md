---
layout: post
title: rmコマンドを使用した時の配列動作の挙動
image: img/bash.png
author: [UH]
date: 2020-10-08T20:55:00.000+09:00
tags: ['techblog', 'shellscript']
draft: false
---

###### 目次

```toc
exclude: 目次
tight: false,
from-heading: 2
to-heading: 6
```

## 目的

- シェルスクリプト（bash）で、rmコマンドで配列の中身（ファイル）を削除後、echoコマンド等で削除した配列の中身を出力した場合の動作について理解する。

## ゴール

- どのような場合に、配列の中身（ファイル）を削除した時の動作が理解できるようになる。

## 前提条件

- 配列についての知識を有していること。
- シェルスクリプトの独特な表現を理解している方。

## ソースコード

```bash
findDelLogList=
mapfile -t findDelLogList < <(find "$scriptDir" -name "$findDelLogName*")

# 'declare -a findDelLogList='([0]="/var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_20_13_25")''
for((i = 0; i < ${#findDelLogList[@]}; i++)); do

    # 'declare -a findDelLogList='([0]="/var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_20_13_25")''
    tmp="${findDelLogList[i]}"

    # 'declare -a findDelLogList='([0]="/var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_20_13_25")''
    if rm -f "${findDelLogList[i]}"; then

        # '/var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_20_13_25'（変数tmp)

        # '/var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log'（変数cronStdOutLogFilePath)
        echo "古いログファイル：「 $tmp 」の削除を実施しました。" >> "$cronStdOutLogFilePath" 2>&1
        isFindDelLogList="0"

    else
        echo "古いログファイル：「 $tmp 」の削除に失敗しました。" >> "$cronStdOutLogFilePath" 2>&1
        isFindDelLogList="1"

    fi

    # '0'
    if [ "$isFindDelLogList" -eq "0" ]; then
        echo "古いログファイル：$(${findDelLogList[i]})の削除を実施しました。" >> "$cronStdOutLogFilePath" 2>&1

    elif [ "$isFindDelLogList" -eq "-1" ]; then
        echo "古いログファイル：$(${findDelLogList[i]})の削除に失敗しました。" >> "$cronStdOutLogFilePath" 2>&1

    fi

done
```

## 挙動

`bash-4.2$ cat /var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log`

---

> 上記コマンド出力結果 ↓↓↓↓

- 古いログファイル：「 /var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_17_27_25 」の削除を実施しました。
- 古いログファイル：の削除を実施しました。

削除前の削除ファイル配列変数を事前に変数tmpへ待避していない場合、後者のisFindDelLogList変数で判定している条件分岐内でfindDelLogList変数の中身が出力されなくなっています。

下記、デバッグコンソールの出力結果からもわかるように、待避していない場合、rmコマンドですでにファイルを削除してしまっているので **そのようなファイルやディレクトリはありません** となっているため、出力されず空白のままになってしまっています。

シェルスクリプト（bash）で変数の中身からファイルを削除しその後、削除結果を変数から参照する場合は、事前に削除前の変数中身を待避させ、待避させた変数から参照するようにしましょう。

---

> デバッグコンソール出力結果 ↓↓↓↓

`/var/www/vhost/dev.test.com/private/shell/swap_os_reboot.sh: 行 60: /var/www/vhost/dev.test.com/.vscode-server/extensions/rogalmic.bash-debug-0.3.9/bashdb_dir/swap_os_reboot.log_20201008_17_27_25: そのようなファイルやディレクトリはありません`
