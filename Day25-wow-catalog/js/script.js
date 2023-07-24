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
const animePattern = [
'bounce' ,
'flash' ,
'pulse' ,
'shake' ,
'swing' ,
'tada' ,
'wobble' ,
'bounceIn' ,
'bounceInDown' ,
'bounceInLeft' ,
'bounceInRight' ,
'bounceInUp' ,
'bounceOut' ,
'bounceOutDown' ,
'bounceOutLeft' ,
'bounceOutRight' ,
'bounceOutUp' ,
'fadeIn' ,
'fadeInDown' ,
'fadeInDownBig' ,
'fadeInLeft' ,
'fadeInLeftBig' ,
'fadeInRight' ,
'fadeInRightBig' ,
'fadeInUp' ,
'fadeInUpBig' ,
'fadeOut' ,
'fadeOutDown' ,
'fadeOutDownBig' ,
'fadeOutLeft' ,
'fadeOutLeftBig' ,
'fadeOutRight' ,
'fadeOutRightBig' ,
'fadeOutUp' ,
'fadeOutUpBig' ,
'flip' ,
'flipInX' ,
'flipInY' ,
'flipOutX' ,
'flipOutY' ,
'lightSpeedIn' ,
'lightSpeedOut' ,
'rotateIn' ,
'rotateInDownLeft' ,
'rotateInDownRight' ,
'rotateInUpLeft' ,
'rotateInUpRight' ,
'rotateOut' ,
'rotateOutDownLeft' ,
'rotateOutDownRight' ,
'rotateOutUpLeft' ,
'rotateOutUpRight' ,
'slideInDown' ,
'slideInLeft' ,
'slideInRight' ,
'slideOutLeft' ,
'slideOutRight' ,
'slideOutUp' ,
'hinge' ,
'rollIn' ,
'rollOut',
];

const animePatternNum = animePattern.length;

$(function(){
  /* cardセクションのwowアニメーション種類を変更＆初期化 */
//  const target = $('#card .card');
  const target = $('#card .card__content');
  const title = $('#card .section__title');
  let beforePattern = '';
  const wowDuration = "data-wow-duration";
  const wowDelay = "data-wow-delay";
  const wowOffset = "data-wow-offset";
  const wowIteration = "data-wow-iteration";

/*** wow-catalog設定値 *********************************/
  /* 1.wowアニメーションのオプション設定 */
  const wowOptions = {[wowDuration]: "1s",   /* アニメーションの時間 */
                      [wowDelay]: "0s",      /* アニメーションがスタートするまでの時間 */
                      [wowOffset]: 0,     /* アニメーションがスタートする距離 */
                      [wowIteration]: 1,  /* 	アニメーションの繰り返し回数 */
                    };

  /* 2.次のアニメーションに遷移する時間
    (wowDuration * wowIteration + wowDelay + 1000msくらいを設定するとちょうどいいかも) */
  const intervalTime = 2000;
/******************************************************/

  function wowCatalog(n){
    target.removeClass(`wow ${beforePattern}`);  /* 現在のwowクラスを削除 */
    target.removeAttr('style');  /* 初期化時？につくstyle属性も削除 */
    for(let wowOption in wowOptions){
      if( wowOptions.hasOwnProperty(wowOption) ) {
        target.removeAttr(wowOption);  /* オプションもいったん削除 */
      }
    }
    // console.log(`wow ${animePattern[n]}`);
    target.addClass(`wow ${animePattern[n]}`); /* 次のwowクラスを付加 */
    for(let wowOption in wowOptions){
      if( wowOptions.hasOwnProperty(wowOption) ) {
        target.attr({[wowOption]:wowOptions[wowOption]});  /* オプション追加 */
      }
    }

    title[0].innerHTML = `${n + 1}: ${animePattern[n]}`; /* sectionタイトルにwowクラス名を表示 */
    beforePattern = animePattern[n];  /* 付加したwowクラスを保存(後で消すため) */

    new WOW().init(); /* wow 初期化 */
  }

  const cntMax = animePatternNum;
  /* wowCatalog()を呼び出す */
  let cnt = 0;
  const countUp = function() {
    wowCatalog(cnt);
    cnt++;
    if(cnt >= cntMax){
      cnt = 0;
    }
  }

  /* 指定時間ごとにcountUp()を呼び出す */
  time = setInterval(countUp, intervalTime);

  /* cardセクションにスクロール */
  function toCard(){
    let cardTop = jQuery('#card').offset().top; /* cardエリアのトップ位置 */
    $('html,body').animate({ scrollTop: cardTop }, '1');
  }
  setTimeout(toCard, 1500); /* ロード直後にスクロールしてもブラウザ機能で元の位置に戻ってしまうので、時間をおいてからスクロール */

});

