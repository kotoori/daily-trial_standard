$(function(){
    //ナビメニューのドロワー開閉(Click時)
    $('.header-nav-item.drawer').click(function(){
        $(this).find('.header-nav-item-drawer-item').slideToggle();
    })

    //Topへ戻るボタン
    $(window).scroll(function(){
        let scrollAmount = $(window).scrollTop();
        console.log(scrollAmount);
        if(scrollAmount >= 80){
            console.log("Active");
            $('.scroll_top').addClass('active');
        }else if(scrollAmount < 80){
            console.log("Passive");
            $('.scroll_top').removeClass('active');
        }else{
            ;//何もしない
        }
    })
})