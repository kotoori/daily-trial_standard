/*========================
Swiper
=========================*/
const swiperTop = new Swiper('.swiper__top', {
  // Optional parameters
  loop: true,
  // autoplay: {
  //   delay: 3000,
  // },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiperCard = new Swiper('.swiper__card', {
  // Optional parameters
  loop: true,
  spaceBetween: 24,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 1,
  slidesPerGroup: 1,
  breakpoints: {
    //ウィンドウ幅：768px以上の時(tab)
    768: {
      slidesPerView:2,
      slidesPerGroup: 2,
    },
    //ウィンドウ幅：1101px以上の時(pc)
    1101: {
      slidesPerView:3,
      slidesPerGroup: 3,
    },
  },
});

/*========================
nav active
=========================*/
const section = ['card','news','price','access','contact'];
const navItem = ('.header__nav .header__nav__item');

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