/*===============================
Hamburger Button
===============================*/
/*===============================
Hamburger Menu
===============================*/
jQuery(function(){
	const hamburgerButton = '.header__hamburger';
	const navMenu = '.header__nav';
	const openClass = 'is-open';

	jQuery(hamburgerButton).on('click', function(){
		jQuery(this).toggleClass(openClass);
		jQuery(navMenu).toggleClass(openClass);
	})
})
