---
layout: post
title: シンタックスハイライトテスト(*´∀`*)ﾎﾟｯ
image: img/computer.jpg
author: [UH]
date: 2020-09-12T13:00:00.000Z
tags:
  - techblog
draft: false
---

###### 目次

```toc
exclude: 目次
tight: false,
from-heading: 2
to-heading: 6
```

## はじめに

**gatsby-remark-vscode** および **robb0wen/synthwave-vscode**を使ったハイライトコーディングテストです。

`テーマは「Dark (Visual Studio)」`を使用しています。

公式？テーマとして提供されているのが感無量ですね。  
[リンク先](https://www.gatsbyjs.com/plugins/gatsby-remark-vscode/#using-languages-and-themes-from-an-extension)

---

### "C"

```c
#include<stdio.h>

void main( void ) {
    printf( "%s\n", "ようこそ ! C 言語の世界へ(*･ω･*)" );

}
```

### "C++"

```c++
#include<iostream>

using namespace std;

int main( void ) {
    cout << "ようこそ C++ の世界へ(*´∀`*)ﾎﾟｯ" << endl;

	return 0;

}
```

### "C#"

```c#
using System.Collections.Generic;

class DictionaryExample {

	List<Items> myItems;
	Items myItems2;
	public List<Items> ItemsList { get { return myItems; } set { myItems = value; } }
	public Items ItemsList2 { get { return myItems2; } set { myItems2 = value; } }

	const int N = 6;

	public DictionaryExample( ) {
		myItems = new List<Items>( );

		for( int i = 0; i < N; i++ ) {
			myItems.Add( new Items( ) );
			myItems[ i ].dictionaryList = new Dictionary<int, string>( );

		}

		myItems2 = new Items( );
		myItems2.dictionaryList = new Dictionary<int, string>( );


	}

	public class Items {
		public Dictionary<int, string> dictionaryList;


	}


}
```
