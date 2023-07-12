
$(function(){

  /*==============================
  ドロワーメニュー開閉
  ==============================*/
  let drawerMenu = $('.drawer__menu');
  let drawerList = $('.drawer__list');

  drawerMenu.on('click',function(){
    console.log("click");
    drawerList.slideToggle();
  })

  
}); /* $(function(){ */