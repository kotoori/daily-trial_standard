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


