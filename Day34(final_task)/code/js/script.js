/*===============================
drawer.js
===============================*/
$(document).ready(function() {
  $('.drawer').drawer();

  //メニュークリックでdrawerを閉じる
  $('.drawer-menu-item').on('click', function() {
    $('.drawer').drawer('close');
  });
});

/*===============================
Swiper
===============================*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  slidesPerView: 1,
  width: 274,
  spaceBetween: 20,
  breakpoints: {
    768:{
      width: 400,
      spaceBetween: 40,

    },
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/*===============================
FAQ button
===============================*/
jQuery(function(){
  const item = '.faq__item';
  const accordion = '.faq__item__a';
  const btnMark = '.faq__item__btn-mark';
  const openClass = 'is-open';

  jQuery(item).on('click', function(){
    //ボタンマークのアニメーションを発火させる
    const targetBtnMark = jQuery(this).find(btnMark);
    jQuery(targetBtnMark).toggleClass(openClass);

    //アコーディオンを開閉する
    const targetAccordion = jQuery(this).find(accordion);
    jQuery(targetAccordion).slideToggle();
  });
});

/*===============================
Contact form
===============================*/
jQuery(function(){
  /***
  * Contact formの必須項目の入力状態をチェックする
  * 必須項目入力済みならSubmitボタンを有効にする
  ***/

  /*===============================
  Contactの必須項目を全て入力したら、
  有効化&activeクラスを付与する処理
  ===============================*/
  const formInputText = '.contact__form__input[type="text"].js-form-check';
  const formInputEmail = '.contact__form__input[type="email"].js-form-check';
  const formInputRadio = '.contact__form__input[type="radio"].js-form-check';
  const formInputCheckBox = '.contact__form__input[type="checkbox"].js-form-check';
  const formTextarea = '.contact__form__textarea.js-form-check';
  const formSelectBox = '.contact__form__select.js-form-check'

  const formSubmitBtn = '.contact__form__btn';
  const activeClass = 'is-active';

  /* .js-form-check要素が変更されるたびに、全必須項目(.js-form-check)をチェックする */
  jQuery('.js-form-check').on('input change click', function(){
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

});

/***
* チェックしたradioボタンをクリックでチェック解除する
* 必須項目ではないradioボタンを誤ってチェックしたときの救済機能
***/
let checkedItem = 0;
function jsRadioToggle(target, num){
  if(checkedItem === num){
    target.checked = false;
    checkedItem = 0;
  }else{
    checkedItem = num;
  }
}


/*===============================
ページ内リンク
===============================*/
jQuery(function(){
/***
 *Topに戻るボタン 画面スクロールでボタン表示/非表示
 ***/
  const topButton = $('.to-top');
  const scrollAmount = 80;
  const fadeTime = 300;

  $(window).scroll(function(){
    if($(window).scrollTop() >= scrollAmount){
      topButton.fadeIn(fadeTime);
    }else{
      topButton.fadeOut(fadeTime);
    }
  });
});

/***
 *スムーススクロール
 ***/

jQuery('a[href^="#"]').on('click', function(e){
	e.preventDefault();

  let targetY = 0;
  let href = jQuery(this).attr("href");
  if(href === "#"){
    targetY = jQuery('html').offset().top;
  }else{
    let headerHight = jQuery('header').innerHeight();
    targetY = jQuery(href).offset().top - headerHight;
  }

  // animateで移動します
  jQuery('html, body').animate({scrollTop : targetY}, 500, 'swing');

	return false;
});

/*===============================
Contactフォームの送信処理 for googleForm
===============================*/
jQuery(function () {

  jQuery('#js-form').submit(function (event) {
    const formData = jQuery(this).serialize();
    const actionUrl = jQuery(this).attr("action");
//    const actionUrl = "https://asdfsafdsasdfbb.com/";

    $.ajax({
      url: actionUrl,
      data: formData,
      type: "POST",
      dataType: "html",
      statusCode: {
        0: function () {
          //送信成功したと仮定する
          
          jQuery('#js-form').addClass('js-hidden');
          jQuery('.js-message-on').slideDown();
        },
        200: function () {
          //本来は送信成功したらこのコールバックが呼ばれる
          //しかし、COSRエラーのため、ここにくることはない()
          console.log("$.ajax statusCode:200");
        },
      },
      // success: function(){
      //   console.log("success");
      // },
      // error: function(){
      //   console.log("error");
      // },
    });
    event.preventDefault();
  });

});

/*===============================
WOW.js
===============================*/
new WOW().init();

/*===============================
  WOW.js option
  ===============================*/
jQuery(function(){

  if(window.matchMedia('(min-width:768px)').matches) {
    /* PC（768px以上)のとき、特定のアイテムのWOWオプションを指定 */

    setWowDelayForItem('.comments__image__wrap',0.2);
    setWowDelayForItem('.access__map__wrap',0.4);

    /* 指定された横並びCardにWOW.jsアニメーションのdelayTimeを設定 */
    /* delayTimeはdelayIntervalずつ、ずらして設定する */
    function setWowDelayForItem(item,time){
        $(item).attr('data-wow-delay',time + "s");
    }
  }
});
