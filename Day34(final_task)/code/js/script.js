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

