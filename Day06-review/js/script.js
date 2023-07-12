
$(function(){

  /*==============================
  ドロワーメニュー開閉
  ==============================*/
  const drawerMenu = $('.drawer__menu');
  const drawerList = $('.drawer__list');

  drawerMenu.on('click',function(){
    console.log("click");
    drawerList.slideToggle();
  })

  /*==============================
  Topに戻るボタン
  ==============================*/
  /* 画面スクロールでボタン表示/非表示 */
  const topButton = $('.return-top');
  const scrollAmount = 80;
  const fadeTime = 300;

  $(window).scroll(function(){
    if($(window).scrollTop() >= scrollAmount){
      topButton.fadeIn(fadeTime);
    }else{
      topButton.fadeOut(fadeTime);
    }
  })

  /*==============================
  ページ内スクロールを緩やかにする
  ==============================*/
  const scrollTime = 500;

  $('a[href^="#"]').click(function(){
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let targetY = target.offset().top;
    // animateで移動します
    $('html, body').animate({scrollTop : targetY}, scrollTime, 'swing');
    return false;
  })
}); /* jQuery  $(function(){ */