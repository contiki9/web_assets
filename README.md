
# ディレクトリ構成
##HTML


静的ページのディレクトリ。
jadeのコンパイル先でもある。
※jadeを使わない場合は不要

###***html/assets***
 
常に使用するベースとなる構成のファイル。
原則案件毎に更新・変更はなし。

***html/assets/font***

WEBfontを格納
使用しているのは[NotoSans](https://www.google.com/get/noto/)

***html/assets/js***

 汎用的なJSの関数を格納
 
***html/assets/scss***

汎用的なSCSSを格納

***・_ggc_palette.scss***

マテリアルカラーを変数化したファイル

***・_mixin.scss***

汎用的なMixin

***・_module.scss***

イレギュラーなときに単体で使うCSSをまとめたもの。
原則頭に`u-`をつける。

***・_variable.scss***

SCSSの変数をまとめたもの

       
###***html/common***

プロジェクトの共通ファイルを格納

***html/common/css***

プロジェクトの共通のCSSを格納
SCSSを使用している場合コンパイルする

***html/common/images***

プロジェクトで共通して使う画像の格納場所

***html/common/js***

プロジェクトで共通して使うJSの格納場所

***html/assets/scss/vendor***
外部で制作されたライブラリなどをまとめて置く場所※汎用的にいつも使うものを格納
個々のプロジェクト単位でディレクトリで区切る。

* [bourbon](http://neat.bourbon.io/)
    * MIXIN集

* [neat](http://neat.bourbon.io/)
    * GlidのMIXIN集

* [dlex](https://contiki9.github.io/dlex/)
    * FlexboxのCSSフレームワーク

* [skeleton](http://getskeleton.com/)
    * シンプルなレスポンシブ対応のフレームワーク。
    * 主にhtmlのみ見栄えとして活用



## プロジェクト用CSS構成

---
このスタイルシートは[FLOCSS](https://github.com/hiloki/flocss)をベースにしています。
 定義されているレイヤー以外にも追加してもOKです。
---
 プロジェクトで使うscssの格納場所
 ***scssはすべてここにまとめる。***
 

*  _mixin.scss

    * プロジェクト用のMixin

*  _variable.scss

    * プロジェクト用のSCSSの変数をまとめたもの
    * 場合によってはassetsのものを上書きする。

***html/common/scss/foundation***

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
 拡張性などによって、4つのレイヤーにわけられます。
 それぞれのレイヤーにはプレフィックス（接頭辞）をつけます。
　詳細はstyle.scssにコメントアウトいているのでそちらで確認してください。
 
 * Component（`c-`）
 * Project（`p-`）
 * Scope(`s-`)
 * Utility（`u-`）
 
 ランディングページのようにページ特有のスタイルを多く含む場合は、
 ページ専用のCSSファイルを作成することもできます。
 ページ専用のスタイルは、そのページにだけ読み込ませることでスコープをつくります。
 
 ***html/common/scss/vendor***

外部で制作されたライブラリなどをまとめて置く場所※このプロジェクトで使用するもの
個々のプロジェクト単位でディレクトリで区切る。

## jade

 * index.jade
    * TOPページのjade。構成のサンプル用
 
***jade/include/***

* _layout.jade
    * ページの構成をまとめるベースのjade

* _mixin.jade
    * jadeのMixin用ファイル
    
