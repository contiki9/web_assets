$(document).ready(function(){
    // Add target="_blank" when user opens external link
    $('a').each(function() {
      var a = this;
      if (a.js-origin !== location.origin) {
//�u���E�U�T�C�Y�ʂ�JS�t�@�C���ǂݍ��݊Ǘ�
////////////////////////////////////////////////
//jQuery(document).ready(function($) {
//	//PC���̏ꍇ
//	if (window.matchMedia( '(min-width: 769px)' ).matches) {�@//�؂�ւ����ʃT�C�Y
//		$.ajax({
//			url: 'js/pc.js',
//			dataType: 'script',
//			cache: false
//	   });
//	//���o�C�����̏ꍇ
//	} else {
//	    $.ajax({
//			url: 'js/sp.js',
//			dataType: 'script',
//			cache: false
//		});
//	};
//});


//�u���E�U�T�C�Y�ʂ�JS�t�@�C���ǂݍ��݊Ǘ�
////////////////////////////////////////////////
//$(function () {
//	$(window).bind("load resize", init);//�E�B���h�E���w�Ǎ��݁x�������́w�E�B���h�E�T�C�Y�ύX�x���ꂽ���A�֐��winit�x�����s
//	function init() {//���L�̏������֐��winit�x�Ƃ��Ē�`����
//		var _width = $(window).width();//�f�o�C�X�i�E�B���h�E�j�����擾
//		if (_width <= 480) {
//			//�f�o�C�X�i�E�B���h�E�j����480px�ȉ��̎��̏���
//
//		} else {
//
//		}
//	}//init
//});




