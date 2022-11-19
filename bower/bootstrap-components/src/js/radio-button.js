(function($){
    'use strict';

var VghRadioButton = function(){
	var self = this;
	var $element = $('.vgh-radio');
	$element.each(function(i,radio){
		var $radio = $(radio);
		var $input = $radio.find('input[type="radio"][id]');

		if ( $input.length > 0 ) {
			$input
			.on('change',function(e){
				self.onChange($(this))
			})
		}

		if ( $input.is(':checked')) {
			self.onChange($input)
		}

		$radio.find('.checkbox-label').on('click',function(e){
			self.onChange($input)
			self.radioHovered($input)
		})

	});

}

var _proto = VghRadioButton.prototype;
_proto.init = function(){}

_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}
_proto.onReset = function($input){
}
_proto.onChange = function($inputTarget){
	var $radio = $('input[type="radio"][name=\"'+$inputTarget.attr('name')+'\"]')
	$inputTarget.prop("checked", true);
	if ( typeof $radio == 'object' && $radio.length > 0 ) {

		$radio.each(function(i,input){
			var $input = $(input)
			if ( $input.val() != $inputTarget.val() ) {
				$input.prop("checked",false);
				$input.closest('.vgh-radio').removeClass('radio-checked');
			}
		});
	}

	this.ripple($inputTarget)
	this.onChecked($inputTarget)
}

_proto.radioHovered = function($input){
	var hovered = 'radio-hovered';
	var $ripple = $input.closest('.vgh-radio').find('.radio-ripple');
	$ripple.addClass(hovered)
	this.delay(2000).then(() => $ripple.removeClass(hovered) );
}

_proto.onChecked = function($input,param){
	var $radio = typeof param == 'undefined' ? $input.closest('.vgh-radio').addClass('radio-checked') : $input.closest('.vgh-radio').removeClass('radio-checked');
}

_proto.ripple = function($input){
	var focused = 'radio-focused';
	var $ripple = $input.closest('.vgh-radio').find('.radio-ripple');
	$ripple.addClass(focused)
	this.delay().then(() => $ripple.removeClass(focused) )
}

var vghradio = new VghRadioButton();

$(document).on('show.bs.modal',function(e){
	vghradio.delay(1000).then(() => { var vghradio = new VghRadioButton() })
})
})(window.jQuery);