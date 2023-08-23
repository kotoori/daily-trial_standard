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