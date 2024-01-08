/*===============================
Hamburger Menu
===============================*/
jQuery(function(){
	const hamburgerButton = '.header__hamburger';
	const navMenu = '.header__nav';
	const openClass = 'is-open';
	const drawerItem = '.menu-item a'

	//ハンバーガーボタンクリックでドロワーメニュー開閉
	jQuery(hamburgerButton).on('click', function(){
		jQuery(this).toggleClass(openClass);
		jQuery(navMenu).toggleClass(openClass);
	})

	//メニュータップでドロワーメニューを閉じる
	jQuery(drawerItem).on('click',function(){
		jQuery(hamburgerButton).removeClass(openClass);
		jQuery(navMenu).removeClass(openClass);
	})
})

/*===============================
modal
===============================*/
const modalOpen = jQuery('#js-concept__modal');
const modalClose = jQuery('.js-modal-close');
const modalDisplay = jQuery('#js-modal');

jQuery(function(){
	jQuery(modalOpen).on('click',function(){
		console.log('click');
		jQuery('body').addClass('is-fixed');
		jQuery(modalDisplay).fadeIn(500);
	});
	jQuery(modalClose).on('click',function(){
		console.log('click');
		jQuery(modalDisplay).fadeOut(500);
		jQuery('body').removeClass('is-fixed');
	});

});
