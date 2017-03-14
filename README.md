
# ディレクトリ構成
##dist
コンパイル後のディレクトリ。
※コンパイルするためこのディレクトリはバージョン管理しない

##src
コンパイル用のファイルディレクトリ。
画像やpugなどはこちらをつかう。

###***src/assets***
SASS/images/js/font/など読み込むファイルはこのディレクトリにまとめる。

***src/assets/fonts***

WEBfontを格納
主に使用しているのは[NotoSans](https://www.google.com/get/noto/)
※日本語fontでなければCDNを使うのを推奨

***src/assets/js***

 汎用的なJSの関数を格納
 
***src/assets/scss***

SCSSを格納

***src/assets/scss/assets***
- _ggc_palette.scss
    - マテリアルカラーを変数化したファイル
    - 別に使わなくても良い
- _mixin.scss
    - 汎用的なMixin
    - 接頭語にcnt-が付きます

***src/assets/scss/assets/vendor***
外部で制作されたライブラリなどをまとめて置く場所※汎用的にいつも使うものを格納
個々のプロジェクト単位でディレクトリで区切る。

- [bourbon](http://neat.bourbon.io/)
    - MIXIN集

- [neat](http://neat.bourbon.io/)
    - GlidのMIXIN集

- [dlex](https://contiki9.github.io/dlex/)
    - FlexboxのCSSフレームワーク

- [skeleton](http://getskeleton.com/)
    - シンプルなレスポンシブ対応のフレームワーク。
    - 主にhtmlのみ見栄えとして活用
    
- [UIKIT](https://getuikit.com/)
    - なんでも揃ったCSSフレームワーク。
    - 接頭語に`uk-*`がつくのが特徴
     

***src/assets/images***

プロジェクトで共通して使う画像の格納場所

***src/assets/js***

プロジェクトで共通して使うJSの格納場所

---


## プロジェクト用CSS構成

```
このスタイルシートは[FLOCSS](https://github.com/hiloki/flocss)をベースにしています。
 定義されているレイヤー以外にも追加してもOKです。
```

## src/assets/scss/style.scss
 プロジェクトで使うscssの格納場所
 
 ***作成するscssはすべてここにまとめる。***
 
-  _mixin.scss
    - プロジェクト用のMixin
    - 接頭語に`mx-*`をつけてください
    
-  _extend.scss
    - プロジェクト用のExtend集
    - 接頭語に`ex-*`をつけてください

-  _variable.scss
    - プロジェクト用のSCSSの変数をまとめたもの
    
***src/assets/scss/foundation***

Foundationレイヤーでは`html`や`body`のような広範囲にわたるベーススタイル、
`h2`や`ul`のような基本的なタイプセレクタのデフォルトスタイルを定義します。
装飾的なスタイルは避けて、できる限り低詳細度に保ちます。
ここではidセレクタやclassセレクタは使用しません。
 
* _foundation.scss
    * このディレクトリ内にあるファイルの集約させる
    * ファイルが分散していない場合はこのファイルにすべてclassを記入する。　
 
* _base.scss
    * HTMLの基本的な設計。
    * /assets/から読み込んでいるものがさればそれの上書きとなる。

* _font.scss
    * font-faceの管理場所

***html/common/scss/layout***

Layoutレイヤーはヘッダーやフッターのような、ページを構成するコンテナブロックのスタイルを定義します。
目安としてはワイヤーフレームに書かれるような大きな単位のブロックです。
汎用性のあるグリッドシステムは次のObject/Componentレイヤーで定義します。
基本的にはclass属性を使用しますが、id属性を使用することもできます。
プレフィックス（接頭辞）として`l-`をつけます。

* _header.scss
    * headerに関わるclassの管理場所
    
* _gnav.scss
    * glavalNavigationに関わるclassの管理場所
    * ※サイドバーやページ内のナビゲーションには使用しません。
　
* _sidebar.scss
    * Sidebarの中で使用するClassを管理。
    * 他のComponentで使用しているClassはそちらを優先する。

***html/common/scss/object***
 
 Objectレイヤーはプロジェクトにおけるビジュアルパターンです。抽象度や詳細度、
 拡張性などによって、5つのレイヤーにわけられます。
 それぞれのレイヤーにはプレフィックス（接頭辞）をつけます。
　詳細はstyle.scssにコメントアウトいているのでそちらで確認してください。
 
 * Component（`c-`）
 * Project（`p-`）
 * Scope(`s-`)
 * Utility（`u-`）
 * js（`js-`）
 
 ランディングページのようにページ特有のスタイルを多く含む場合は、
 ページ専用のCSSファイルを作成することもできます。
 ページ専用のスタイルは、そのページにだけ読み込ませることでスコープをつくります。
 
 ***src/assets/scss/vendor***

外部で制作されたライブラリなどをまとめて置く場所。
個々のプロジェクト単位でディレクトリで区切る。
```
//jqueryの場合

/jquert/jquery.js
```

## Pugについて
pugはHTML生成のジェネレーターです。
PHPなどがなくてもコードの共通化が可能になるので積極的に使っていきます。

 * index.pug
    * TOPページの.pug。構成のサンプル用
 
***src/_include/***

* _layout..pug
    * ページの構成をまとめるベースの.pug

* _mixin..pug
    * .pugのMixin用ファイル
    
***src/_data/***

サイト共通の情報を登録するjson

    
