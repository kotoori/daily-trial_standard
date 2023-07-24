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


const animePattern = ['hinge' ,
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
const title = $('#card .section__title');
const cards = $('#card .card');

let cnt = 0;
let beforePattern = '';
$(function(){
  const countUp = function() {
    wowCatalog(cnt);
    cnt++;
    if(cnt >= animePatternNum){
      cnt = 0;
    }
  }
  time = setInterval(countUp, 3000);

  function wowCatalog(n){
    title[0].innerHTML = `${animePatternNum} / ${n + 1}: ${animePattern[n]}`;
    cards.removeClass(`wow ${beforePattern}`);
    beforePattern = animePattern[n];
    console.log(`wow ${animePattern[n]}`);
    cards.addClass(`wow ${animePattern[n]}`);
  }
});