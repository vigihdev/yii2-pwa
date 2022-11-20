(function($){

"use strict";

var TAG = 'TextCustomPlaceholder';

let $StopEvent = function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
}

function delay(ms){
    var _ms = typeof ms === 'undefined' ? 1000 : ms;
    return new Promise((resolve, reject) => {setTimeout(() => {resolve(this); }, _ms); });
}

class TextCustomPlaceholder{

    constructor($element){
    	this.$element = $element;
    	this.$textfield = this.$element.closest('.textfield');
    	this.$input = this.$textfield.find('input[id][name]');
    	this.init();
    	// console.log(TAG)
    }

    init(){
    	var self = this;

    	this.$input
    	.on('focusin',function(e){
    		self.onfocus();
    	})
    	.on('keydown keypress',function(e){
    		self.onkeydown();
    	})    	
    	.on('focusout',function(e){
    		self.onfocusout();
    	});    	
    }

    onfocus(){
    	if (this.$input.val().length == 0 ) {
    		this.$element.show()
    	}
    }

    onfocusout(){
    	this.$element.hide()
    }

    onkeydown(){
		delay(300).then(() => {
			if (this.$input.val().length > 0 ) {
    			this.$element.hide()
			}else{
    			this.$element.show()
			}
		});    	
    }

    static instance(){
   		var $textCustom = $('#text-custom-placeholder');
    	$textCustom.each(function(i, element) {
    		var textCustom = new TextCustomPlaceholder($(element));
    	});
    }

}

TextCustomPlaceholder.instance();

$(document).on('afterShow.bs.modal',function(e){
	TextCustomPlaceholder.instance();
})

})(jQuery); 


