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

