﻿// For Shortcode
jQuery.fn.bindFirst = function(name, fn) {
	// bind as you normally would
	// don't want to miss out on any jQuery magic
	this.bind(name, fn);
	var events = this.data('events') || jQuery._data(this[0], 'events');
	var handlers = events[name];
	// take out the handler we just inserted from the end
	var handler = handlers.splice(handlers.length - 1)[0];
	// move it at the beginning
	handlers.splice(0, 0, handler);
};

//ES
var ES = function() {}

ES.prototype = {

	init : function(form){
		jQuery(form).bindFirst('submit', function(e) {
			window.es.addSubscriber(e, jQuery(e.target));
		}); // submit Event
	},

	addSubscriber : function(e, form) {
		var form = form || undefined;
		e.preventDefault();
		if(typeof(form) !== 'undefined'){
			var fm_parent = form.closest('.es_shortcode_form');
			var formData = {};
			var formData = window.es.prepareFormData(e, form, formData);
			formData['es'] = 'subscribe';
			formData['action'] = 'es_add_subscriber';
			var action_url = es_widget_page_notices.es_ajax_url;
			jQuery(form).trigger( 'addSubscriber.es', [formData] );
			jQuery.ajax({
				type: 'POST',
				url: action_url,
				data: formData,
				dataType: 'json',
				success: function(response) {
					var typemsg = 'text', iserror = true;

					var modal = jQuery('#subscribe_send');

					if( response && typeof response.error !== 'undefined' && response.error === "" ) {
						es_msg_text = es_widget_page_notices.es_try_later;
						console.log(response, 'response.error');
					} else if ( response && response.error === 'unexpected-error' ) {
						es_msg_text = es_widget_page_notices.es_error;
					} else if ( response && response.error === 'invalid-email' ) {
						es_msg_text = es_widget_page_notices.es_invalid_email;
					} else if ( response && response.success === 'already-exist' ) {
						es_msg_text = es_widget_page_notices.es_email_exists;
					} else if ( response && response.error === 'no-email-address' ) {
						es_msg_text = es_widget_notices.es_email_notice;
					} else if( response.success && response.success === 'subscribed-pending-doubleoptin' ) {
						es_msg_text = jQuery('<p>').text(es_widget_page_notices.es_success_notice || '').text().replace('. ', '.<br />');
						iserror = false;
						typemsg = 'html';
						jQuery(form)[0].reset();
					} else if( response && response.success === 'subscribed-successfully' ) {
						es_msg_text = es_widget_page_notices.es_success_message;
						iserror = false;
						jQuery(form)[0].reset();
					}

					var esSuccessEvent = { 
											detail: { 
														es_response : "error", 
														msg: '' 
													}, 
											bubbles: true, 
											cancelable: true 
										} ;

					esSuccessEvent.detail.es_response = 'success';
					esSuccessEvent.detail.msg = es_msg_text;
					//{"success":"already-exist"}
					//jQuery(form).find('.es_msg span').text(es_msg_text).show();
					

					if (modal.length) {

						jQuery( '.cat_title', modal ).text(iserror === true ? 'Ошибка' : 'Поздравляем' );

						jQuery( '#subscribe_send_content', modal )[typemsg](es_msg_text);
						modal.fadeIn('500', function(){
							modal.modal('show');
						});
					}

					jQuery(form).trigger('es_response', [ esSuccessEvent ]);
				},
				error: function(err) {
					console.log(err, 'error');
				},
			});
		}
	},

	prepareFormData: function (e, form, formData){
		jQuery.each((jQuery(form).serializeArray() || {}), function(i, field){
				formData['esfpx_'+ field.name] = field.value;
		});
		return formData;
	},

};

if(typeof window.es === 'undefined') {
	window.es = new ES();
}

jQuery(document).ready(function() {
	// TODO :: check this later incase of undefined
	jQuery('.es_shortcode_form').each(function(i, v){
		window.es.init(v);
	});
	jQuery('.es_widget_form').each(function(i, v){
		window.es.init(v);
	});
});

// Compatibility of ES with IG
jQuery( window ).on( "init.icegram", function(e, ig) {
	if(typeof ig !== 'undefined' && typeof ig.messages !== 'undefined' ) {
		jQuery('.es_shortcode_form').each(function(i, v){
			window.es.init(v);
		});
	}
});

jQuery('#subcribe-aggry').on('click', (ev) => {
	jQuery('#subscribe_send').fadeOut(500, () => {
		jQuery('#subscribe_send').modal('hide');
	});
});