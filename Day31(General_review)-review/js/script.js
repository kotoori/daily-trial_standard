jQuery(function(){
  /*===============================
  drawer.js
  ===============================*/
  $('.drawer').drawer();

  /* drawerメニュー内のリンククリックで、drawerメニューを閉じる */
  const drawerMenu = '.header__nav__link';
  $(drawerMenu).on('click', function() {
    $('.drawer').drawer('close');
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
      let headerHight = jQuery('header').innerHeight();
      targetY = jQuery(href).offset().top - headerHight;
    }

    // animateで移動します
    jQuery('html, body').animate({scrollTop : targetY}, 500, 'swing');

    return false;
  });
});

/*===============================
WOW.js
===============================*/
new WOW().init();

jQuery(function(){
  /*===============================
  WOW.js option
  ===============================*/
  const delayInterval = 0.2; /* 0.2s */

  if(window.matchMedia('(min-width:768px)').matches) {
    /* PC（768px以上)のとき、横並びカードのWOWオプションを指定 */

    setWowDelayForCard('.feature__list','.feature__item');
    setWowDelayForCard('.products__list','.products__item');

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
});

/*===============================
Contactフォーム入力チェック
===============================*/
/*===============================
Contactの必須項目を全て入力したら、
有効化&activeクラスを付与する処理
===============================*/
const formInputText = '.contact__form__input[type="text"].js-form-check';
const formInputEmail = '.contact__form__input[type="email"].js-form-check';
const formInputRadio = '.contact__form__input[type="radio"].js-form-check';
const formInputCheckBox = '.contact__form__input[type="checkbox"].js-form-check';
const formTextarea = '.contact__form__textarea.js-form-check';

const formSubmitBtn = '.contact__form__submit';
const activeClass = 'is-active';

/* .js-form-check要素が変更されるたびに、全必須項目(.js-form-check)をチェックする */
jQuery('.js-form-check').on('change', function(){
  let isInput = true;

//  /* checkValidity()を使ってチェック */
//  /* ※ 今回はあえて自作のチェック処理を使うため、checkValidity()は使わないでおく */
//  if(jQuery('.contact__form')[0].checkValidity() !== true){
//    isInput = false;
//  }

  if(isInput){
    /* input[type="text"]を全てチェック */
    for(let target of jQuery(formInputText)){
      if(target.value === ""){
        isInput = false;
      }
    }
  }

  if(isInput){
    /* input[type="email"]を全てチェック */
    for(let target of jQuery(formInputEmail)){
      if(target.value === ""){
        isInput = false;
      }
    }
  }

  if(isInput){
    /* textareaを全てチェック */
    for(let target of jQuery(formTextarea)){
      if(target.value === ""){
        isInput = false;
      }
    }
  }

  if(isInput){
    /* input[type="radio"]を全てチェック */
    for(let target of jQuery(formInputRadio)){
      let attrName = jQuery(target).attr('name');
      let targetName = `${formInputRadio}[name="${attrName}"]:checked`;
      if(jQuery(targetName).val() === undefined){
        isInput = false;
      }
    }
  }

  if(isInput){
    /* input[type="checkbox"]を全てチェック */
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
googleフォーム
===============================*/
jQuery(function () {

  jQuery('#js-form').submit(function (event) {
    const formData = jQuery(this).serialize();
    const actionUrl = jQuery(this).attr("action");
    console.log(actionUrl);
    $.ajax({
      url: actionUrl,
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //$(".end-message").slideDown();
          //$(".submit-btn").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          //$(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

});
