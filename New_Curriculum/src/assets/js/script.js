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
		jQuery('body').addClass('is-fixed');
		jQuery(modalDisplay).fadeIn(500);
	});
	jQuery(modalClose).on('click',function(){
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

	jQuery('.faq__item__a.js-default__hidden').hide();	//初期表示は非表示のAnswerを閉じる

	jQuery(btn).on('click',function(){
		jQuery(this).toggleClass('is-open');
		jQuery(this).find('.faq__item__a').slideToggle(300);
	});

	//キーボードで開閉可能にする
	jQuery(btn).keydown(function(e){
		if (e.key === "Enter" || e.key === " ") {
			jQuery(this).trigger("click");
			return false;
		}
		return true;
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

/*===============================
contact from
===============================*/
const formInputText = '.contact__form [type="text"][aria-required="true"]';
const formInputEmail = '.contact__form [type="email"][aria-required="true"]';
const formInputRadio = '.contact__form [type="radio"][aria-required="true"]';
const formInputCheckBox = '.contact__form [type="checkbox"][aria-required="true"]';
const formTextarea = '.contact__form textarea[aria-required="true"]';
const formSelectBox = '.contact__form select[aria-required="true"]'
const formSubmitBtn = '.contact__submit button';


/* .js-form-check要素が変更されるたびに、全必須項目(.js-form-check)をチェックする */
jQuery('[aria-required="true"]').on('input change click', function(){
	let isInput = true;

	if(isInput){
		/* input[type="text"]を全てチェック */
		for(let target of jQuery(formInputText)){
			if(target.value === ""){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* input[type="email"]を全てチェック 未入力があればreturn */
		for(let target of jQuery(formInputEmail)){
			if(target.value === ""){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* input[type="radio"]を全てチェック 未チェックがあればreturn */
		for(let target of jQuery(formInputRadio)){
			let attrName = jQuery(target).attr('name');
			let targetName = `${formInputRadio}[name="${attrName}"]:checked`;
			if(jQuery(targetName).val() === undefined){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* input[type="checkbox"]を全てチェック 未チェックがあればreturn */
		for(let target of jQuery(formInputCheckBox)){
			if(jQuery(target).prop("checked") === false){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* textareaを全てチェック 未入力があればreturn */
		for(let target of jQuery(formTextarea)){
			if(target.value === ""){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* selectを全てチェック 未入力があればreturn */
		for(let target of jQuery(formSelectBox)){
			if(target.value === ""){
				isInput = false;
			}
		}
	}

	if(isInput){
		/* 必須項目が全て入力された時の処理 */
		jQuery(formSubmitBtn).prop("disabled",false);
		jQuery(formSubmitBtn).addClass(activeClass);
	}else{
		/* 必須項目が全て入力されていない時の処理 */
		jQuery(formSubmitBtn).prop("disabled",true);
		jQuery(formSubmitBtn).removeClass(activeClass);
	}

	return true;
});

$(document).ready(function () {
const form = '.contact__form form';
  jQuery(form).submit(function (event) {
    var formData = $(form).serialize();
    $.ajax({
      url: $(form).attr("action"),
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".contact__submit").hide();
          $(".submit-success").fadeIn();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".submit-failed").fadeIn();
        }
      }
    });
    event.preventDefault();
  });

});

/*===============================
Intersection Observer
===============================*/
const options = {
	root: null,
	rootMargin: '-60px 0px',
	threshold: 0,
}
const intersectionObserver = new IntersectionObserver(
	function(entries){
		entries.forEach(function(entry){
			if(entry.isIntersecting){
				entry.target.classList.add('is-in-view');
			}else{
//				entry.target.classList.remove('is-in-view');
			}
		})
	},
	options
);

const inViewItems = document.querySelectorAll('.js-in-view');
inViewItems.forEach(function(inViewItem){
	intersectionObserver.observe(inViewItem);
});