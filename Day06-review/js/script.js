
$(function(){

  /*==============================
  ドロワーメニュー開閉
  ==============================*/
  const drawerMenu = $('.drawer__menu');
  const drawerList = $('.drawer__list');

  drawerMenu.on('click',function(){
    $(this).find(drawerList).slideToggle();
  })

  /* 全てのドロワーメニューを閉じる */
  function drawerClose(){
    drawerList.hide();
  }

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
    $('html, body').animate({scrollTop : targetY}, scrollTime, 'swing',
      function(){
        drawerClose();
      });
    return false;
  })

  /*==============================
  モーダルで画像を拡大表示
  ==============================*/
  const open = $('.course-content-item img');
  const close = $('.modal-close');
  const container = $('.modal-container');
  const content = $('.modal-content')

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

  //以下、body固定を解除する関数
  function bodyFixReset() {
    const offsetPosition = $('body').offset().top;
    const scrollPosition = $(window).scrollTop();
    $('body').css({
      'position': 'relative',
      'width': 'auto',
      'top': 'auto'
    });
    //scroll位置を調整
    $('html, body').scrollTop(scrollPosition - offsetPosition);
  }

  //開くボタンをクリックしたらモーダルを表示する
  open.on('click',function(){
    content.append(this.outerHTML);
    bodyFix();
    container.fadeIn().css('display','flex');
    return false;
  })

  //モーダルを閉じる関数
  function modalClose(){
    container.fadeOut(function(){
      bodyFixReset();
      content.empty();
    });
  }

  //閉じるボタンをクリックしたらモーダルを閉じる
  close.on('click',function(){
    modalClose();
  });

  //モーダルの外側をクリックしたらモーダルを閉じる
  $(document).on('click',function(e) {
    if(!$(e.target).closest('.modal-body').length) {
      modalClose();
    }
  });
}); /* jQuery  $(function(){ */