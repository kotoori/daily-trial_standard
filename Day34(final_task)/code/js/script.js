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
  slidesPerView: 2.5,
  spaceBetween: 40,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});