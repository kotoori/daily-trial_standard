/*===============================
WOW.js
===============================*/
new WOW().init();


jQuery(function(){
  /*============================
  drawer.js
  ============================*/
  $('.drawer').drawer();


  /*===============================
  WOW.js option
  ・PC時だけ、横並びカード等のWOWアニメーション時間をdelayIntervalずつずらす
  ===============================*/
  const delayInterval = 0.2; /* 0.2s */

  if(window.matchMedia('(min-width:768px)').matches) {
    /* PC（768px以上)のとき、横並びカードのWOWオプションを指定 */

    setWowDelayForCard('.feature__contents','.feature__card');
    setWowDelayForCard('.product__contents','.product__card');

    /* 指定された横並びCardにWOW.jsアニメーションのdelayTimeを設定 */
    /* delayTimeはdelayIntervalずつ、ずらして設定する */
    function setWowDelayForCard(list,card){
      let delayTime = 0;
      $(list).children(card).each(function(index){
        delayTime = index * delayInterval;
        $(this).attr('data-wow-delay',delayTime + "s");
      });
    }
  }

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
      let headerHight = jQuery('header').innerHeight();
      targetY = jQuery(href).offset().top - headerHight;
    }

    // animateで移動します
    jQuery('html, body').animate({scrollTop : targetY}, 500, 'swing');

    return false;
  });

  /*===============================
  Contactの必須項目を全て入力したら、
  ボタン色を反転&有効化する処理
  ===============================*/
  /* .js-form-check要素が変更されるたびに、全必須項目(.js-form-check)をチェックする */
  const formInputText = '.contact__form__input[type="text"].js-form-check';
  const formInputEmail = '.contact__form__input[type="email"].js-form-check';
  const formInputRadioType = '.contact__form__input[type="radio"][name="entry.622663929"]:checked.js-form-check';
  const formInputCheckBox = '.contact__form__input[type="checkbox"].js-form-check';
  const formTextarea = '.contact__form__textarea.js-form-check';

  const formSubmitBtn = '.contact__form__btn';
  const activeClass = 'is-active';

  jQuery('.js-form-check').on('change', function(){
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
      /* textareaを全てチェック 未入力があればreturn */
      for(let target of jQuery(formTextarea)){
        if(target.value === ""){
          isInput = false;
        }
      }
    }

    if(isInput){
      /* radioボタン[name="Type"]をチェック 未選択ならreturn */
      if(jQuery(formInputRadioType).val() === undefined){
        isInput = false;
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
      /* 必須項目が全て入力された時の処理 */
      jQuery(formSubmitBtn).prop("disabled",false);
      jQuery(formSubmitBtn).addClass(activeClass);
    }else{
      /* 必須項目が全て入力されていない時の処理 */
      jQuery(formSubmitBtn).prop("disabled",true);
      jQuery(formSubmitBtn).removeClass(activeClass);
    }

    return false;
  });

  /*===============================
  contactフォームをクリアする
  ===============================*/
  function contactFormClear(){
    for(let target of jQuery(formInputText)){
      target.value = "";
    }

    for(let target of jQuery(formInputEmail)){
      target.value = "";
    }

    for(let target of jQuery(formTextarea)){
      target.value = "";
    }

    const formRadioTypeDefault = '.contact__form__input[type="radio"][name="entry.622663929"][value="法人"]';
    jQuery(formRadioTypeDefault).prop("checked", true);

    for(let target of jQuery(formInputCheckBox)){
      jQuery(target).prop("checked",false);
    }
  }
  
  /*===============================
  contactフォームをgoogleフォームで実装
  送信時にgoogleフォームに飛ばないようにする
  ===============================*/
  const contactForm = '#contact__form';
  jQuery(contactForm).submit(function (event) {
    let formData = jQuery(contactForm).serialize();
    console.log(formData);
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfPbRB2p8Bfo211ELoB_WKlhgGiKA7VokBKzpFiDYBWH_29Q/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          jQuery(formSubmitBtn).prop("disabled",true);
          jQuery(formSubmitBtn).removeClass(activeClass);
          contactFormClear();
        },
        200: function () {
          jQuery(formSubmitBtn).prop("disabled",true);
          jQuery(formSubmitBtn).removeClass(activeClass);
        }
      }
    });
    event.preventDefault();
  });

});// jQuery
