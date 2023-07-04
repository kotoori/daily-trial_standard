$(function(){
    /*================================
    ドロワーメニュー
    =================================*/
    //ナビメニューのドロワー開閉(Click時)
    $('.header-nav-item.drawer').click(function(){
        $(this).find('.header-nav-item-drawer-item').slideToggle();
    })

    /*================================
    Topへ戻るボタン
    =================================*/
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

    /* ページ内スクロールを緩やかにする */
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
            }
        );
    })

    /*================================
    モーダル
    =================================*/

    // 変数に要素を入れる
    let open = $('.course-content-item img'),
        close = $('.modal-close'),
        container = $('.modal-container'),
        content = $('.modal-content');
    let isModalWindowOn = false;

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
        const scrollPosition = $('body').offset().top;
        $('body').css({
            'position': 'relative',
            'width': 'auto',
            'top': 'auto'
        });
        //scroll位置を調整
        $('html, body').scrollTop(-scrollPosition);
    }

    //開くボタンをクリックしたらモーダルを表示する
    open.on('click',function(){
        if(!isModalWindowOn){
            bodyFix();
            content.append(this.outerHTML);
            isModalWindowOn = true;
            container.fadeIn().css('display','flex');
            return false;
        }
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.on('click',function(){
        isModalWindowOn = false;
        container.fadeOut(function(){
            bodyFixReset();
            content.empty();
        });
    });

    //モーダルの外側をクリックしたらモーダルを閉じる
    $(document).on('click',function(e) {
        if(isModalWindowOn){
            if(!$(e.target).closest('.modal-body').length) {
                isModalWindowOn = false;
                container.fadeOut(function(){
                    bodyFixReset();
                    content.empty();
                });
            }
        }
    });

});
