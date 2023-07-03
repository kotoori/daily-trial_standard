$(function(){
    //ナビメニューのドロワー開閉(Click時)
    $('.header-nav-item.drawer').click(function(){
        $(this).find('.header-nav-item-drawer-item').slideToggle();
    })

    //Topへ戻るボタンの表示/非表示を切り替える
    function scrollTopButtonShow(){
        let scrollAmount = $(window).scrollTop();
        if(scrollAmount >= 80){
            $('.scroll_top').fadeIn(300);
        }else{ /* (scrollAmount < 80) */
            $('.scroll_top').fadeOut(300);
        }
    }

    let isAutoScrolling = false; /* 自動スクロール中を示すフラグ */

    $(window).scroll(function(){
        if(!isAutoScrolling){
            scrollTopButtonShow();
        }
    })

    $('a[href^="#"]').click(function(){
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let targetY = target.offset().top;
        // animateで移動します
        isAutoScrolling = true;
        $('html, body').animate({scrollTop : targetY}, 500, 'swing',
            function(){
                isAutoScrolling = false;
                scrollTopButtonShow();
            });
    })
})