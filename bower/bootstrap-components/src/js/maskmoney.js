(function($){
    'use strict';

	var delay = function(ms){
		var _ms = typeof ms === 'undefined' ? 700 : ms;
		return new Promise(resolve => setTimeout(resolve, _ms));
	};

	var MaskMoneyOption = function($element,option){
		this.$element = $element
		this.option = typeof option !== 'object' ? {} : option
		this.$field = $element.closest('.field-' + $element.attr('id'))
		this.init();
	}

	MaskMoneyOption.prototype = {
		constructor:MaskMoneyOption,

		init:function(){
			var self = this
			this.$element.maskMoney(this.option)
			this.field();
		},

		field:function(){
			var self = this

			this.$element
			.on('click.maskMoney',function(e){
				if ( self.$field.hasClass('has-error') ) {
					self.$field.removeClass('has-error').find('.help-block-error').empty()
				}
			})
			.on('blur.maskMoney',function(e){
				if ( $(this).val().length == 0 ) {
					self.$field.find('.textfield').removeClass('textfield-floating-label-completed')
				}
			})
		},
	};

	function initialize(){
		$('.form-control.maskmoney').each(function(i,input){
			var $input = $(input);
			var data = $input.data();
			var maskMoney = new MaskMoneyOption($input,data)
		}); 
	}
	// initialize();

	// delay(1000).then(() => {})
	// $(document).on('show.bs.modal',function(e){
	// 	delay(1000).then(() => {initialize() })
	// })
})(window.jQuery); 