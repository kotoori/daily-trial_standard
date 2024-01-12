/*===============================
Hamburger Menu
===============================*/
jQuery(function(){
	const hamburgerButton = '.header__hamburger';
	const navMenu = '.header__nav';
	const openClass = 'is-open';
	const drawerItem = '.menu-item a'

	//ハンバーガーボタンクリックでドロワーメニュー開閉
	jQuery(hamburgerButton).on('click', function(){
		jQuery(this).toggleClass(openClass);
		jQuery(navMenu).toggleClass(openClass);
	})

	//メニュータップでドロワーメニューを閉じる
	jQuery(drawerItem).on('click',function(){
		jQuery(hamburgerButton).removeClass(openClass);
		jQuery(navMenu).removeClass(openClass);
	})
})

/*===============================
modal
===============================*/
const modalOpen = jQuery('#js-concept__modal');
const modalClose = jQuery('.js-modal-close');
const modalDisplay = jQuery('#js-modal');

jQuery(function(){
	jQuery(modalOpen).on('click',function(){
		console.log('click');
		jQuery('body').addClass('is-fixed');
		jQuery(modalDisplay).fadeIn(500);
	});
	jQuery(modalClose).on('click',function(){
		console.log('click');
		jQuery(modalDisplay).fadeOut(500);
		jQuery('body').removeClass('is-fixed');
	});

});

/*===============================
スムーススクロール
===============================*/
jQuery('a[href^="#"]').on('click', function(e){
	e.preventDefault();

  let targetY = 0;
  let href = jQuery(this).attr("href");
  if(href === "#"){
    targetY = jQuery('html').offset().top;
  }else{
    let headerHeight = jQuery('header').innerHeight();
    targetY = jQuery(href).offset().top - headerHeight;
  }

  // animateで移動します
  jQuery('html, body').animate({scrollTop : targetY}, 500, 'swing');

	return false;
});

/*===============================
FAQ アコーディオン
===============================*/
jQuery(function(){
	const btn = '.js-faq__btn';
	const faqItem = ".faq__item";
	jQuery(btn).on('click',function(){
	jQuery(this).parents(faqItem).toggleClass('is-open');
	});
});

/*===============================
スライダー
===============================*/
const gallerySwiper = new Swiper('.gallery__swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
	spaceBetween: 85,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

/*===============================
to topボタン
===============================*/
jQuery(function(){
	const toTop = jQuery('.js-to-top');
	jQuery(window).on('scroll',function(){
		if(jQuery(this).scrollTop() > 100){
			toTop.fadeIn();
		}else{
			toTop.fadeOut();
		}
	});
});
