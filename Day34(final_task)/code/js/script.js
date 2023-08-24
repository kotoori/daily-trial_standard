/*===============================
drawer.js
===============================*/
$(document).ready(function() {
  $('.drawer').drawer();

  //メニュークリックでdrawerを閉じる
  $('.drawer-nav').on('click', function() {
    $('.drawer').drawer('close');
  });
});

/*===============================
Swiper
===============================*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  //slidesPerViewをAutoにし、横幅とギャップはCSSで固定値を指定する
  slidesPerView: 'auto',
  //width: 400,
  //spaceBetween: 40,

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