// @ts-nocheck
(function($){
    'use strict';
var VghCheckBoxs = function(){
	this.classChecked = 'checkbox-checked rippleed';
	var self = this;
	var $element = $('.vgh-checkbox');

	$element.each(function(i,checkbox){
		var $checkbox = $(checkbox);
		var $input = $checkbox.find('input[type="checkbox"]');

		if ( $input.length > 0 ) {
			var ID = $input.attr('id')
			$checkbox.attr({for:ID}).find('.checkbox-label').attr({for:ID});

			$input.on('change',function(e){
				// e.preventDefault();
				// e.stopImmediatePropagation();

				if ( $input.is(':checked') ) {
					self.add($checkbox).checkeds().rippleed()
					self.delay().then(() => self.remove($checkbox).rippleed());
					$(this).attr({checked:true,value:'1'})				
					return;
				}

				$(this).attr({checked:false,value:'0'})				
				self.add($checkbox).rippleed()
				self.remove($checkbox).checkeds()
				self.delay().then(() => self.remove($checkbox).rippleed());					

			});
		}

		if ( $input.is(':checked')) {
			$input.attr({value:'1'})
			self.add($checkbox).checkeds().rippleed();
			self.delay().then(() => self.remove($checkbox).rippleed());	
		}

		$checkbox.find('.checkbox-label').on('click',function(e){
		}).on('hover',function(e){})

	});

}

var _proto = VghCheckBoxs.prototype;
_proto.init = function(){}

_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 1000 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}

_proto.add = function($checkbox){
	var self = this;
	var $input = $checkbox.find('input[type="checkbox"]')
	var options = {
		checkeds:function(){
			$checkbox.addClass('checkbox-checked')
			$input.attr({checked:true})
			return this;
		},
		rippleed:function(){
			$checkbox.addClass('rippleed')
			return this
		}
	};
	return options
}

_proto.remove = function($checkbox){
	var self = this;
	var $input = $checkbox.find('input[type="checkbox"]')
	var options = {
		checkeds:function(){
			$checkbox.removeClass('checkbox-checked');
			$input.removeAttr('checked');
			return this;
		},
		rippleed:function(){
			$checkbox.removeClass('rippleed')
			return this;
		}
	};
	return options
}

var vghCheckboxs = new VghCheckBoxs();
$(document).on('show.bs.modal',function(e){
	vghCheckboxs.delay(1000).then(() => { var vghCheckboxs = new VghCheckBoxs() })
})
//=============== END VGHCHECKBOXS
//=================================================
var SwitchSlideToggles = function(){
	var self = this;
	var $element = $('.toggle-switch');

	$element.each(function(i,checkbox){
		var $toggle = $(checkbox);
		var $input = $toggle.find('input[type="checkbox"]');
		var slide = self.get.call(checkbox)

		if ( $input.length > 0 ) {
			var ID = $input.attr('id')
			$toggle.find('.slide-toggle-thumb').attr({for:ID});
			$toggle.find('.toggle-switch-label').attr({for:ID});

			$input.on('change',function(e){
				// e.preventDefault();
				// e.stopImmediatePropagation();

				if ( $input.is(':checked') ) {
					slide.$element().addClass('checked');
					slide.container().addClass('checked');
					slide.thumb().addClass('checked');
					slide.ripple().css({opacity:'.4'}).addClass('mouseover');
					slide.input().attr({checked:true,value:'1'});
					self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });					
					return;
				}
				slide.$element().removeClass('checked');
				slide.container().removeClass('checked');
				slide.thumb().removeClass('checked');
				slide.ripple().css({opacity:'.4'}).addClass('mouseover');
				slide.input().attr({checked:false,value:'0'});
				self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });
			});
		}

		if ( $input.is(':checked')) {

			slide.$element().addClass('checked');
			slide.container().addClass('checked');
			slide.thumb().addClass('checked');
			slide.ripple().css({opacity:'.4'}).addClass('mouseover');
			slide.input().attr({checked:true,value:'1'});
			self.delay().then(() => {slide.ripple().removeAttr('style').removeClass('mouseover') });
		}

	});
}

var _proto = SwitchSlideToggles.prototype;
_proto.init = function(){}
_proto.delay = function(ms){
	var _ms = typeof ms === 'undefined' ? 1000 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));	
}

_proto.get = function(){
	var _this = $(this)
	var o = {
		$element : function(){
			return _this;
		},
		container : function(){
			return _this.find('.slide-toggle-thumb-container');
		},
		thumb : function(){
			return _this.find('.slide-toggle-thumb');
		},
		ripple : function(){
			return _this.find('.slide-toggle-ripple')
		},
		input : function(){
			var name = _this.find('input[type="checkbox"]').attr('name')
			return _this.find('input[type="checkbox"],input[type="hidden"][name=\"'+name+'\"]')
		}
	}
	return o;
}

var slideToggle = new SwitchSlideToggles();
$(document).on('show.bs.modal',function(e){
	slideToggle.delay(1000).then(() => { var slideToggle = new SwitchSlideToggles() })
})
//=============== END SWITCHSLIDETOGGLES
//=================================================
})(window.jQuery); 