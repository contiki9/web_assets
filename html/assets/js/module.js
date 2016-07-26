
function js_window_maxHeight() {
	$(window).on('load scroll resize', function () {
		var h = window.innerHeight ? window.innerHeight : $(window).height();
		$('.js-window-maxHeight').css('height', h);
	});
}


function js_currentUrl() {
	$(function () {
		var activeUrl = location.pathname.split("/")[2];
		navList = $(".js-currentUrl").find("a");
		navList.each(function () {
			if ($(this).attr("href").split("/")[2] == activeUrl) {
				$(this).addClass("active");
			}
			;
		});
	});
}

var deviceFlug_ua = (function () {
	//ユーザーエージェントをフラグにする場合
//////////////////////////////////////
	var ua = navigator.userAgent;
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
		return 'sp';
	} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
		return 'tab';
	} else {
		return 'pc';
	}
})();

var deviceFlug_win = (function () {
//windowサイズをフラグにする場合
//////////////////////////////////////
	var wid = $(window).width();
	if (wid <= 480) {
		return 'sp';
	} else if (wid <= 768) {
		return 'tab';
	} else {
		return 'pc';
	}
})();


$(document).ready(function () {
//クリックしたオブジェクト自身を削除
	$('.js-click-remove').click(function () {
		$(this).remove();
	});
	$('.js-click-switch-remove').click(function () {
		link = $(this).attr('href');
		$(link).fadeIn();
		$(this).remove();
		return false;
	});
});


$(document).ready(function () {
////////////////////////////////////////////////////////////////
////スマホ用とPC用で画像を切り変える&RETINA対応
////////////////////////////////////////////////////////////////
	if (deviceFlug_win == 'sp') {
//_pcの画像を_spに変える処理
		$('.js-device-img-change').each(function () {
			$(this).attr("src", $(this).attr("src").replace('_pc', '_sp'));
		});
		//スマホ時に画像を半分にして表示する（retina対応）
		$('.js-device-img-retina').each(function () {
			var imageObj = new Image();
			// 画像のプリロード処理
			imageObj.src = $(this).attr('src');
			$(this).on('load', function () {
				width = imageObj.width;
				$(this).attr("width", width / 2);
			});
		});
	}

////////////////////////////////////////////////////////////////
//スマホ時に画像をaltのテキストに差し替える
////////////////////////////////////////////////////////////////
	if (deviceFlug_win == 'sp') {
		$(".js-device-text-change").each(function (i) {
			var txt = $("img", this).attr("alt");
			$(this).attr("data-label", txt);
		});
	}
////////////////////////////////////////////////////////////////
//PC時に電話番号のリンクを外す。
////////////////////////////////////////////////////////////////
	if (deviceFlug_win == 'pc') {
		$('.js-tel-href').each(function () {
			$(this).contents().unwrap();
		});
	}
});

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
//$(document).ready(function () {
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




