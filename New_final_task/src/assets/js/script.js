/*===============================
Hamburger Menu
===============================*/
jQuery(function(){
	const hamburgerButton = '.p-header__hamburger';
	const navMenu = '.p-header__nav';
	const drawerOverlay = '.p-header__bg';
	const openClass = 'is-open';
	const drawerItem = '.p-header__nav__item a'

	//ハンバーガーボタンクリックでドロワーメニュー開閉
	jQuery(hamburgerButton).on('click', function(){
		jQuery(this).toggleClass(openClass);
		jQuery(navMenu).toggleClass(openClass);
		jQuery(drawerOverlay).toggleClass(openClass);
	})

	//メニュータップでドロワーメニューを閉じる
	jQuery(drawerItem).on('click',function(){
		jQuery(hamburgerButton).removeClass(openClass);
		jQuery(navMenu).removeClass(openClass);
	})
})

