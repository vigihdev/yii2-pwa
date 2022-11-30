// @ts-nocheck

(function($){
"use strict";

var TAG = 'Modal';
const ELEMENT_MODAL = '#modal-fixed-bottom';
const SELECTOR = '[data-modal-id="'+ELEMENT_MODAL.replace('#','')+'"]';

class Modals {
	
    constructor(selector){
		this.$selector = $(selector);
		this.options = $(selector).data();

		if(typeof this.options.url !== undefined && this.options.modalId !== undefined){
			const self = this;
			$(selector).on('click',function(e){
				let modal = $('#' + self.options.modalId );
				modal.find('.modal-body').load(self.options.url)
				modal.modal('show');
			});
		}
    }

    static validate(){
    	return $(ELEMENT_MODAL).length > 0 && $(SELECTOR).length > 0;
    }

    static instance(){
    	if (Modals.validate()) {
			$(SELECTOR).each(function(i,element){
				new Modals(element);
			});
    	}
    }
}

Modals.instance();
})(jQuery); 


