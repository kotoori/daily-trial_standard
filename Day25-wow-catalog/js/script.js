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
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'Flippers',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'Lightspeed',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'Specials',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
];

const animePatternNum = animePattern.length;
const afterLoad = true;
$(function(){
  /* cardセクションのwowアニメーション種類を変更＆初期化 */
//  const target = $('#card .card');
  const target = $('#card .card__content');
  const title = $('#card .section__title');
  let beforePattern = '';

/*** wow-catalog設定値 *********************************/
  /* 1.wowアニメーションのオプション設定 */
  const wowDuration = "--animate-duration: 1s";
  const wowDelay = "--animate-delay: 0s";
  //const wowOffset = "data-wow-offset";
  const wowIteration = "--animate-repeat: 1";

  /* 2.次のアニメーションに遷移する時間
    (wowDuration * wowIteration + wowDelay + 1000msくらいを設定するとちょうどいいかも) */
  const intervalTime = 2000;
/******************************************************/

  function wowCatalog(n){
    target.removeClass(`animate__animated animate__${beforePattern}`);  /* 現在のwowクラスを削除 */
    target.removeAttr('style');
    target.addClass(`animate__animated animate__${animePattern[n]}`); /* 次のwowクラスを付加 */
    target.attr({'style':`${wowDelay};${wowDuration};${wowIteration}`});  /* オプション追加 */

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
  /* 指定時間たったら再びcountUp()を呼び出す （setIntervalを使ってもいいけど、今回はsetTimeoutで実装)*/
  time = setTimeout(countUp, intervalTime);
  }

  /* 1s後にcountUp()を呼び出す */ 
  time = setTimeout(countUp, 1000);

  /* cardセクションにスクロール */
  function toCard(){
    let cardTop = jQuery('#card').offset().top; /* cardエリアのトップ位置 */
    $('html,body').animate({ scrollTop: cardTop }, '1');
  }
  setTimeout(toCard, 900); /* ロード直後にスクロールしてもブラウザ機能で元の位置に戻ってしまうので、時間をおいてからスクロール */

});

