$(document).ready(function(){
    // Add target="_blank" when user opens external link
    $('a').each(function() {
      var a = this;
      if (a.js-origin !== location.origin) {
//ブラウザサイズ別のJSファイル読み込み管理
////////////////////////////////////////////////
//jQuery(document).ready(function($) {
//	//PC環境の場合
//	if (window.matchMedia( '(min-width: 769px)' ).matches) {　//切り替える画面サイズ
//		$.ajax({
//			url: 'js/pc.js',
//			dataType: 'script',
//			cache: false
//	   });
//	//モバイル環境の場合
//	} else {
//	    $.ajax({
//			url: 'js/sp.js',
//			dataType: 'script',
//			cache: false
//		});
//	};
//});


//ブラウザサイズ別のJSファイル読み込み管理
////////////////////////////////////////////////
//$(function () {
//	$(window).bind("load resize", init);//ウィンドウが『読込み』もしくは『ウィンドウサイズ変更』された時、関数『init』を実行
//	function init() {//下記の処理を関数『init』として定義する
//		var _width = $(window).width();//デバイス（ウィンドウ）幅を取得
//		if (_width <= 480) {
//			//デバイス（ウィンドウ）幅が480px以下の時の処理
//
//		} else {
//
//		}
//	}//init
//});




