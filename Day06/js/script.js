$(function(){

    console.log("jQuery ready");
    $('.header-nav-item.drawer').click(function(){
        console.log("click!");
        console.log(this.className);
        $('.header-nav-item-drawer-item').slideToggle();
    })
})