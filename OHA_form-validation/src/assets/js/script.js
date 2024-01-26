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
form validation
===============================*/
/* 必須入力の要素を取得 */
const form = document.querySelector('.contact__form form');
const requiredElements = document.querySelectorAll('.contact__form .required');
const emailElements = document.querySelectorAll('.contact__form [type="email"]');
const telElements = document.querySelectorAll('.contact__form [type="tel"]');

form.addEventListener('submit', function(e){

	//エラー表示の初期化（一度全てのエラーを削除）
	const errorElements = form.querySelectorAll('.error-message');
	errorElements.forEach( (elem) => {
		elem.remove(); 
	});

	let isError = false;
	console.log('チェック中');
	/*** requiredの要素をチェック ***/
	for(let target of requiredElements){
		console.log(target.tagName + "," + target.getAttribute('type'));
		/* text, email, textarea */
		if( (target.tagName === 'INPUT' && target.getAttribute('type') === 'text') ||
				(target.tagName === 'INPUT' && target.getAttribute('type') === 'email') ||
				(target.tagName === 'TEXTAREA') ||
				(target.tagName === 'SELECT') ){
			if(target.value === ''){
				console.log('入力されていません');
				target.classList.add('is-error');
				isError = true;
				createError(target, '入力してください');
			}else{
				console.log('入力されています');
				target.classList.remove('is-error');
			}
		}
		/* radio */		
		else if(target.tagName === 'INPUT' && target.getAttribute('type') === 'radio'){
			const radioName = target.getAttribute('name');
			const radioChecked = target.parentElement.querySelector(`input[name="${radioName}"]:checked`);
			const radioGroup = target.closest('.form-radio-group');
			if(radioChecked === null){
				console.log('選択されていません');
				radioGroup.classList.add('is-error');
				isError = true;
				createError(radioGroup, '選択してください');
			}else{
				console.log('選択されています');
				radioGroup.classList.remove('is-error');
			}
		}
		/* checkbox */		
		else if(target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox'){
			if(target.checked === false){
				console.log('選択されていません');
				target.classList.add('is-error');
				isError = true;
				createError(target, '選択してください');
			}else{
				console.log('選択されています');
				target.classList.remove('is-error');
			}
		}
	}
	/*** emailの要素をチェック ***/
	for(let target of emailElements){
		if(target.value !== ''){
			const pattern = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ui;
			if(!target.value.match(pattern)){
				console.log('メールアドレスの形式が違います');
				target.classList.add('is-error');
				isError = true;
				createError(target, 'メールアドレスの形式が違います');
			}else{
				console.log('メールアドレスの形式が正しいです');
				target.classList.remove('is-error');
			}
		}
	}
	/*** telの要素をチェック ***/
	for(let target of telElements){
		if(target.value !== ''){
			const pattern = /^\(?\d{2,5}\)?[-(\.\s]{0,2}\d{1,4}[-)\.\s]{0,2}\d{3,4}$/;
			if(!target.value.match(pattern)){
				console.log('電話番号の形式が違います');
				target.classList.add('is-error');
				isError = true;
				createError(target, '電話番号の形式が違います');
			}else{
				console.log('電話番号の形式が正しいです');
				target.classList.remove('is-error');
			}
		}
	}
});

//errorMessage ：表示するエラーメッセージ
function createError(elem, errorMessage){
  //span 要素を生成
  const errorSpan = document.createElement('span');
	const errorClassName = 'error-message';
  //エラー用のクラス（errorClassName）を追加
  errorSpan.classList.add(errorClassName);
  //aria-live 属性を設定
  errorSpan.setAttribute('aria-live', 'polite');
  //引数に指定されたエラーメッセージを設定
  errorSpan.textContent = errorMessage;
  //elem の親要素の子要素として追加
  elem.parentNode.appendChild(errorSpan);
}
/*===============================
contact from
===============================*/
// const formInputText = '.contact__form [type="text"][required]';
// const formInputEmail = '.contact__form [type="email"][required]';
// const formInputRadio = '.contact__form [type="radio"][required]';
// const formInputCheckBox = '.contact__form [type="checkbox"][required]';
// const formTextarea = '.contact__form textarea[required]';
// const formSelectBox = '.contact__form select[required]'
// const formSubmitBtn = '.contact__submit button';


// /* .js-form-check要素が変更されるたびに、全必須項目(.js-form-check)をチェックする */
// jQuery('[required]').on('input change click', function(){
// 	let isInput = true;

// 	if(isInput){
// 		/* input[type="text"]を全てチェック */
// 		for(let target of jQuery(formInputText)){
// 			if(target.value === ""){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* input[type="email"]を全てチェック 未入力があればreturn */
// 		for(let target of jQuery(formInputEmail)){
// 			if(target.value === ""){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* input[type="radio"]を全てチェック 未チェックがあればreturn */
// 		for(let target of jQuery(formInputRadio)){
// 			let attrName = jQuery(target).attr('name');
// 			let targetName = `${formInputRadio}[name="${attrName}"]:checked`;
// 			if(jQuery(targetName).val() === undefined){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* input[type="checkbox"]を全てチェック 未チェックがあればreturn */
// 		for(let target of jQuery(formInputCheckBox)){
// 			if(jQuery(target).prop("checked") === false){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* textareaを全てチェック 未入力があればreturn */
// 		for(let target of jQuery(formTextarea)){
// 			if(target.value === ""){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* selectを全てチェック 未入力があればreturn */
// 		for(let target of jQuery(formSelectBox)){
// 			if(target.value === ""){
// 				isInput = false;
// 			}
// 		}
// 	}

// 	if(isInput){
// 		/* 必須項目が全て入力された時の処理 */
// 		jQuery(formSubmitBtn).prop("disabled",false);
// 		jQuery(formSubmitBtn).addClass(activeClass);
// 	}else{
// 		/* 必須項目が全て入力されていない時の処理 */
// 		jQuery(formSubmitBtn).prop("disabled",true);
// 		jQuery(formSubmitBtn).removeClass(activeClass);
// 	}

// 	return true;
// });

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