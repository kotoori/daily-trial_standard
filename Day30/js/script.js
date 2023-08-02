/*========================
Swiper
=========================*/
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  autoplay: {
    delay: 3000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



/*========================
nav active　
toTopボタンの表示/非表示
=========================*/
const headerItem = $('header');
const section = ['#card','#news','#price','#access','#qa','#contact'];
const navItem = '.header__nav .header__nav__item';


//固定ヘッダーの高さを返す関数 
function headerHight(){
  return jQuery(headerItem).innerHeight();
}

jQuery(window).on('scroll', function() {

  const scrollTop = jQuery(window).scrollTop(); // スクロール上部の位置

  //スクロール量に応じてNavのラインを切り替える
  let scrollArea = scrollTop + headerHight(); /* 固定ヘッダの高さ100px分をスクロール位置に足す */
  scrollArea += 5;  /* スクロール量の小数点以下の誤差を吸収 ＆ 残り5pxになったら次のセクションに入ったと判定する */

  let cnt = 1;
  for(let target of section){
    jQuery(`${navItem}:nth-child(${cnt}) a`).removeClass('is-active');
    let areaTop = jQuery(target).offset().top; // 対象エリアの上部の位置
    let areaBottom = areaTop + jQuery(target).innerHeight(); // 対象エリアの下部の位置
    if((scrollArea >= areaTop) && (scrollArea < areaBottom)){
      jQuery(`${navItem}:nth-child(${cnt}) a`).addClass('is-active');
    }
    cnt++;
  }

  //スクロール量に応じてtoTopボタンの表示を切り替える
  const toTop = $('.goto-top');
  const activeClass = 'is-visible';
  if(scrollTop >= 100){
    toTop.addClass(activeClass);
  }else{
    toTop.removeClass(activeClass);
}
});

/*========================
wow
=========================*/
new WOW().init();

/*========================
drawer
=========================*/
const hamburger = $('.hamburger');
const drawerBg = $('.nav-bg');
const drawerMenu = $('.header__nav');
const drawerItem = $('.header__nav__item a');
const openClass = 'is-open';

$(function(){
  const bodyPositionDefault = $('body').css('position'); 

  hamburger.on('click',function(e){
    e.preventDefault();
    if(hamburger.hasClass(openClass)){
      drawerClose();
    }else{
      drawerOpen();
    }
    return false;
  })

  drawerItem.on('click',function(e){
    drawerClose();
    return true;
  })

  /* ドロワーメニューをオープンする関数 */
  function drawerOpen(){
    bodyFix();
    hamburger.addClass(openClass);
    drawerBg.addClass(openClass);
    drawerMenu.addClass(openClass);
  }
  /* ドロワーメニューをクローズする関数 */
  function drawerClose(){
    drawerMenu.removeClass(openClass);
    drawerBg.removeClass(openClass);
    hamburger.removeClass(openClass);
    bodyFixReset();
  }

  //bodyを固定する関数
  function bodyFix() {
    const bodyPosition = jQuery('body').css('position');
    if(bodyPosition !== 'fixed'){  /* 画面が固定されていない時だけ実行 */
      const scrollPosition = $(window).scrollTop();
      $('body').css({
        'position': 'fixed',
        'width': '100%',
        'z-index': '1',
        'top': -scrollPosition
      });
    }
  }

  //body固定を解除する関数
  function bodyFixReset() {
    const bodyPosition = jQuery('body').css('position');
    if(bodyPosition === 'fixed'){  /* 画面が固定されている時だけ実行 */
      const offsetPosition = $('body').offset().top;
      const scrollPosition = $(window).scrollTop();
      $('body').css({
        'position': bodyPositionDefault,
        'width': 'auto',
        'top': 'auto'
      });
      /* scroll位置を調整 */
      $('html, body').scrollTop(scrollPosition - offsetPosition);
    }
  }

/*========================
スムーススクロール
=========================*/
  jQuery('a[href^="#"]').on('click', function(e){
    e.preventDefault();

    let href = jQuery(this).attr("href");
    let target = jQuery(href === "#" ? 'html' : href);
    let targetY = target.offset().top;

    //固定headerの高さをスクロール量からひく
    if(href !== "#"){
      targetY -= headerHight();
      if(targetY < 0){
        targetY = 0;
      }
    }

    //画面固定されていたら、スクロール実行前に固定を解除する
    bodyFixReset();

    // animateで移動します
    jQuery('html, body').animate({scrollTop : targetY}, 500, 'swing');

    return false;
  })

/*========================
Q&A アコーディオン
=========================*/
  const qaButton = ('.qa__question__button');
  jQuery(qaButton).on('click', function(){
    const qaIcon = ('.qa__question__icon');
    const qaTarget = jQuery(this).parents('.qa__item');
    const qaAnswer = jQuery(qaTarget).find('.qa__answer');

    jQuery(this).siblings(qaIcon).toggleClass(openClass);
    jQuery(qaAnswer).slideToggle();
  });

  const qa2Button = ('.qa2__question__button');
  jQuery(qa2Button).on('click', function(){
    const qa2Target = jQuery(this).parents('.qa2__item');
    const qa2Answer = jQuery(qa2Target).find('.qa2__answer');

    jQuery(this).toggleClass(openClass);
    jQuery(qa2Answer).slideToggle();
  });

/*========================
policy modal
=========================*/
  const modalOpen = ('.policy-open');
  const modalClose = ('.js-policy-close');
  const modalWindow = ('.contact__policy-check__modal');

  jQuery(modalOpen).on('click', function(e){
    jQuery(e).preventDefault;
    bodyFix();
    jQuery(modalWindow).fadeIn();
    return false;
  });

  jQuery(modalClose).on('click', function(e){
    jQuery(e).preventDefault;
    jQuery(modalWindow).fadeOut();
    bodyFixReset();
    return false;
  });


}); /* $(function(){}) */
