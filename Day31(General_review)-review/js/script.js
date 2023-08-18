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
