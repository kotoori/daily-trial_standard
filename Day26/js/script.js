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
=========================*/
const section = ['card','news','price','access','contact'];
const navItem = '.header__nav .header__nav__item';

jQuery(window).scroll(function() {
	let scrollTop = jQuery(window).scrollTop(); // スクロール上部の位置
  scrollTop += 100; /* 固定ヘッダの高さ100px分をスクロール位置に足す */

  let cnt = 1;
  for(let target of section){
    jQuery(`${navItem}:nth-child(${cnt}) a`).removeClass('is-active');
    let areaTop = jQuery(`#${target}`).offset().top; // 対象エリアの上部の位置
    let areaBottom = areaTop + jQuery(`#${target}`).innerHeight(); // 対象エリアの下部の位置
    if((scrollTop > areaTop) && (scrollTop <= areaBottom)){
      jQuery(`${navItem}:nth-child(${cnt}) a`).addClass('is-active');
    }
    cnt++;
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
const closeButton = $('.header__nav__close');
const drawerBg = $('.nav-bg');
const drawerMenu = $('.header__nav');
const drawerItem = $('.header__nav__item a');
const openClass = 'is-open';

$(function(){
  hamburger.on('click',function(){
    console.log('drawer open');
    bodyFix();
    hamburger.addClass(openClass);
    drawerBg.addClass(openClass);
    drawerMenu.addClass(openClass);
  })

  closeButton.on('click',function(){
    console.log('drawer close');
    bodyFixReset();
    hamburger.removeClass(openClass);
    drawerBg.removeClass(openClass);
    drawerMenu.removeClass(openClass);
  })

  drawerItem.on('click',function(){
    console.log('drawer close');
    bodyFixReset();
    hamburger.removeClass(openClass);
    drawerBg.removeClass(openClass);
    drawerMenu.removeClass(openClass);
  })

  //bodyを固定する関数
function bodyFix() {
  const scrollPosition = $(window).scrollTop();
  $('body').css({
    'position': 'fixed',
    'width': '100%',
    'z-index': '1',
    'top': -scrollPosition
  });
}

//body固定を解除する関数
function bodyFixReset() {
  const offsetPosition = $('body').offset().top;
  const scrollPosition = $(window).scrollTop();
  $('body').css({
    'position': 'relative',
    'width': 'auto',
    'top': 'auto'
  });
  /* scroll位置を調整 */
  $('html, body').scrollTop(scrollPosition - offsetPosition);
}

});

