
jQuery( '#file-test' ).change( function() {
  jQuery( '#file-test-name' ).val( jQuery( this ).val() );
	jQuery( '#file-test-name' ).show();
	jQuery( this ).val( '' );
});