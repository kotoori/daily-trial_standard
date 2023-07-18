jQuery('#contact__form__file').change(function(){
  let fileName = jQuery(this).val();
  jQuery('.contact__form__file__name').val(fileName);
  jQuery('.contact__form__file__display').show();
  jQuery(this).val('');
})

jQuery('.contact__form__file__cancel').on('click',function(){
  jQuery('.contact__form__file__display').hide();
  jQuery('.contact__form__file__name').val('');
})
