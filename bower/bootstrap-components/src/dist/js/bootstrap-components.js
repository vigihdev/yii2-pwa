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
// @ts-nocheck

(function($){

"use strict";

var TAG = 'Modal';

function nullOrEmpty(value){
	return value == undefined || value.length == 0;
}

function delay(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));
}

class ModalData{
    constructor(options){
    	this.data = options;
    }

    own(name){
    	return this.data.hasOwnProperty(name) ? this.data[name] : null;
    }

    get target(){
    	return this.own('target');
    }

    get title(){
    	return this.own('title');
    }

    get url(){
    	return this.own('url');
    }

    get icon(){
    	return this.own('icon');
    }

}

class ModalButtonCLose{
    constructor(){}
}

class ModalHeader{
    constructor($modal){
    	this.$title = $modal.find('.modal-header .header-title')
    }
}

class Event{
    constructor(){}

    static afterShow(options){
    	$(document).trigger('afterShow.bs.modal',[options])
    }

    static afterHide(options){
    	$(document).trigger('afterHide.bs.modal',[options])
    }

    static beforeShow(options){
    	$(document).trigger('beforeShow.bs.modal',[options])
    }
}

//
class ModalCenterStatic {
    constructor($element){
    	this.$element = $element;
    	this.$data = new ModalData($element.data());
    	this.$modal = $('#modal-center-static')
    	this.$header = new ModalHeader(this.$modal);
    	this.$body = this.$modal.find('.modal-body');

    	var self = this;
    	this.$element.get(0).addEventListener('click',(e) => {
    		e.preventDefault();
    		Event.beforeShow(self.$data);
    		self.onShow();
    		delay(500).then(() => {
    			Event.afterShow(self.$data);
    		})
    	})
    }

    onShow(){
        var self = this;

        console.log(this.$modal);
        this.$header.$title.text(this.$data.title)
        this.$body.load(this.$data.url)
        this.$modal.modal('show');
        this.onHide();
    }

    onHide(){
    	var self = this;
	    this.$modal.on('hidden.bs.modal',function(e){
	        self.$header.$title.empty()
	        self.$body.empty();
	        Event.afterHide(self.$data);
	    }) 
    }

    static validate(){
    	return true;
    }

    static instance(){
    	if (ModalCenterStatic.validate()) {
    		$('[data-toggle="modal"][data-target="modal-center-static"]').each(function(i, element) {
    			var self = new ModalCenterStatic($(element));
    		});
    	}
    }
}
ModalCenterStatic.instance();
//

class ModalStatics {
    constructor($element){
    	this.$element = $element;
    	this.$data = new ModalData($element.data());
    	this.$modal = $('#modal-bottom-static')
    	this.$header = new ModalHeader(this.$modal);
    	this.$body = this.$modal.find('.modal-body');

    	var self = this;
    	this.$element.get(0).addEventListener('click',(e) => {
    		e.preventDefault();
    		Event.beforeShow(self.$data);
    		self.onShow();
    		delay(500).then(() => {
    			Event.afterShow(self.$data);
    		})
    	})
    }

    onShow(){
        var self = this;
        this.$header.$title.text(this.$data.title)
        this.$body.load(this.$data.url)
        this.$modal.modal('show');
        this.onHide();
    }

    onHide(){
    	var self = this;
	    this.$modal.on('hidden.bs.modal',function(e){
	        self.$header.$title.empty()
	        self.$body.empty();
	        Event.afterHide(self.$data);
	    }) 
    }

    static validate(){
    	return true;
    }

    static instance(){
    	if (ModalStatics.validate()) {
    		$('[data-toggle="modal"][data-target="modal-bottom-static"]').each(function(i, element) {
    			var self = new ModalStatics($(element));
    		});
    	}
    }
}

ModalStatics.instance();
})(jQuery); 



(function($){

"use strict";

var TAG = 'MoneyInput';
var ELEMENT = $('.form-control.money-input');

var delay = function(ms,cb){
    var _ms = typeof ms === 'undefined' ? 700 : ms;
    var fn = new Promise(resolve => setTimeout(resolve, _ms));
    return fn.then(cb)
};

class Attribute{

}

Number.prototype.numberFormat = function(decimals, dec_point, thousands_sep) {
    dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
    thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

    var parts = this.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

    return parts.join(dec_point);
}

class Events{
    constructor() {}

    onCreate(){
    	var self = this;
        
    	this.$element
            .on('keydown',function(e){
                delay(500,() => {
                    var val1,val2,val3;
                    val1 = $(this).val().replace(/[^\d]/g, "");
                    val2 = isNaN(parseInt(val1)) ? '' : parseInt(val1).numberFormat(0)
                    $(this).val(val2 );
                    self.onComplete();

                })                
            })
            .on('change',function(e){
                delay(500,() => {
                    self.onComplete();
                })
        	})
            .on('completed',function(){
        		self.onComplete();
            });
    }

    onComplete(){
    	var value,textfield,values;
    	value = this.$element.val().replace(/[^0-9]/g, '');
    	textfield = this.$element.closest('.textfield')
    	textfield.find('input[type="hidden"][name]').val(value);
    }
}

class MoneyInput extends Events {
    constructor() {
        super();
        this.$element = $('.form-control.money-input');
        super.onCreate();
        this.runElement();
        // console.log(TAG);
    }

    runElement(){
    	var self = this;
        if (this.$element.val().length > 0 ) {
        	self.$element.trigger('keydown')
        }
    }

    static validate(){
        var exist = $(ELEMENT).length > 0;
        var exist2 = $('body .form-control.money-input').length > 0;
    	return exist || exist2;
    }

    static instance(){

    	if (MoneyInput.validate()) {

    		var self = new MoneyInput();
    		return self;
    	}
    }
}

MoneyInput.instance();
$(document).on('afterShow.bs.modal',function(e,data){
    MoneyInput.instance();
});

})(window.jQuery); 


(function ($) {
    'use strict';

var TAG = 'PasswordVisibility';

class ModelPasswordVisibility {
    constructor(){

    }

    get $element(){
        return $('input.form-control[type="password"]').closest('.input-group').find('.password-visibility')
    }

    onVisibility($element){
    	$element.closest('.input-group').find('input.form-control[type="text"]')
    		.attr({
    			type:'password',
    		})
    	$element.find('.material-icons').text('visibility')
    }

    onNoVisibility($element){
    	$element.closest('.input-group').find('input.form-control[type="password"]')
    		.attr({
    			type:'text',
    		})
    	$element.find('.material-icons').text('visibility_off')    	
    }

}

class PasswordVisibility extends ModelPasswordVisibility {

    constructor(){
        super();
        this.init();
        var self = this;
        $(document).on('afterShow.bs.modal',function(e){
            self.init()
        })
        // console.log(TAG)
    }

    init(){
    	var self = this;
        this.$element.each(function(i,element){
            var $element = $(element)
            $element.on('click',function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                $(this).toggleClass('visibility')

            	if ($(this).hasClass('visibility')) {
            		self.onVisibility($(this))

            	}else {
            		self.onNoVisibility($(this))
            	}

            });
        })    	
    }
}
var passwordvisibility = new PasswordVisibility();

})(window.jQuery);
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
// @ts-nocheck
"use strict";
// ater remove only completion "/Users/thrubus/@types/index.ts"

var TAG = 'RadioCheckbox';
const ELEMENT = '.radio-checkbox';
function delay(ms){
	var _ms = typeof ms === 'undefined' ? 700 : ms;
	return new Promise(resolve => setTimeout(resolve, _ms));
}
const svgWrap = ''
    + '<div class="svg-wrap">'
    + '    <svg class="radio-svg-outer" focusable="false" viewBox="0 0 24 24" aria-hidden="true"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path> </svg>'
    + '    <svg class="radio-svg-inner" focusable="false" viewBox="0 0 24 24" aria-hidden="true"> <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path> </svg>'
    + '</div>';

class RadioCheckbox {

    constructor($element,option){
    	this.$element = $element;
        this.option = option;
        this.$element.find('.radio-checkbox-container').append(svgWrap)
        this.$element.find('input[type="checkbox"]').on('change',(e) => {
            const input = e.target;
            this.#onChangeInput(input)
        })
    }

    #onChangeInput(input){
        const $input = $(input);
        if($(input).prop('checked')){
            $input.closest(ELEMENT).addClass('checked');
            this.#setRadioRipple(input);
        }
        else
        {
            $input.closest(ELEMENT).removeClass('checked');
            this.#setRadioRipple(input);
        }
        
    }

    #setRadioRipple(input){
        const className = 'ripple';
        $(input).closest(ELEMENT).addClass(className);
        delay(500).then(() => {
            $(input).closest(ELEMENT).removeClass(className);
        })
    }

    static validate(){
        return $(ELEMENT).length > 0;
    }

    static intance(){ 
        if(RadioCheckbox.validate()){
            $(ELEMENT).each((i,element) => {
                new RadioCheckbox($(element),$(element).data())
            });
        }
    }

}
RadioCheckbox.intance();
(function($, window, document) {'use strict';

	var Selector = {
        PARENT_SELECTOR: '',
        RIPPLE_EFFECT: ".ripple-effect",
        INK: '.ink'
    };
    
	var ClassName = {
        ANIMATE: "animate"
    };
    
	var Event = {
        MOUSEDOWN: 'mousedown',
        TOUCHSTART: 'touchstart',
    };
    
	var Template = {
        SPAN: "<span class='ink'></span>"
    };

	/**
	 * ------------------------------------------------------------------------
	 * Functions
	 * ------------------------------------------------------------------------
	 */

	function onMouseDown(e) {
		var rippler = $(e.target);
		$(Selector.INK).remove();
		// create .ink element if it doesn't exist
		if (rippler.find(Selector.INK).length === 0) {
			rippler.append(Template.SPAN);
		}
		var ink = rippler.find(Selector.INK);
		// prevent quick double clicks
		ink.removeClass(ClassName.ANIMATE);
		// set .ink diametr
		if (!ink.height() && !ink.width()) {
			var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
			ink.css({ height: d, width: d });
		}
		// get click coordinates
		var x = e.pageX - rippler.offset().left - ink.width() / 2;
		var y = e.pageY - rippler.offset().top - ink.height() / 2;
		// set .ink position and add class .animate
		ink.css({
			top: y + 'px',
			left: x + 'px'
		}).addClass(ClassName.ANIMATE);

		setTimeout(function () {
			ink.remove();
		}, 1500);
	}

	$(document).on(Event.MOUSEDOWN+" "+Event.TOUCHSTART, Selector.RIPPLE_EFFECT,onMouseDown);
})(jQuery, window, document);

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



// @ts-nocheck
(function($){
    'use strict';
	var delay = function(ms){
		var _ms = typeof ms === 'undefined' ? 700 : ms;
		return new Promise(resolve => setTimeout(resolve, _ms));
	};

	var Textfields = function($element,option){
		this.perfix = 'textfield-floating-label-';
		this.$element = $element
		this.option = option;
		this.init()
	}

	var _proto = Textfields.prototype;

	_proto.init = function(){
		var self = this;

		self.textfieldComplete().init();
		this.$element.on('focus',function(){
			self.textfieldMouseover().init()
			self.textfieldActive().add()
			self.textfieldComplete().add()
		}).on('focusout',function(){
			self.textfieldActive().remove()
			self.textfieldComplete().init()
		})

		this.formGroup().on('mouseout',function(){
			$(this).removeClass('mouseover')
		}).on('mouseover',function(){
			$(this).addClass('mouseover')
		})

		this.cleared()
	}

	_proto.textfieldMouseover = function(){
		var self = this;
		var options = {
			init : function(){
				self.formGroup().addClass('mouseover');
				delay(500).then(() => {
					self.formGroup().removeClass('mouseover')
				})
			},
		}
		return options;		
	}

	_proto.textfieldActive = function(){
		var self = this;
		var options = {
			add : function(){
				self.formGroup().addClass(self.perfix + 'active');
				return this;
			},
			remove : function(){
				self.formGroup().removeClass(self.perfix + 'active');
				return this;
			},
		}
		return options;
	}

	_proto.textfieldComplete = function(){
		var self = this;
		var options = {
			add : function(){
				self.formGroup().addClass(self.perfix + 'completed');
				return this;
			},
			remove : function(){
				self.formGroup().removeClass(self.perfix + 'completed');
				return this;
			},
			init : function(){
				var _this = this;
				setTimeout(function(){
					if ( self.$element.val().length > 0 ) {
						_this.add();
						return;
					}
					_this.remove();
				},1000);
				
			},
		}
		return options;		
	}

	_proto.formGroup = function(){
		return this.$element.closest('.form-group.textfield')
	}

	_proto.cleared = function(){
		var self = this;
		var cleared = this.formGroup().find('.textfield-cleared');

		if ( cleared.length == 0) {
			return;
		}
		var inputValue = function(){
			return self.$element.val(); 
		}

		cleared.hide();

		cleared.on('click',function(){
			cleared.hide('slow');
			self.$element.val(null)
			self.$element.typeahead('val','')
			self.$element.focus()
		});

		if ( this.formGroup().length > 0 ) {
			this.formGroup()
			.on('mouseover',function(e){
				if ( inputValue().length > 2 ) {
					cleared.show('slow');
				}				
			})
			.on('mouseout',function(e){
				
			});
		}

		this.$element.on('keydown change focus',function(e){
			if ( inputValue().length > 2 ) {
				cleared.show('slow');
			}
		})

		this.$element.on('focusout',function(){
			if ( self.$element.val().length > 0 ) {
				cleared.show('slow');
				delay(2000).then(() => cleared.hide('slow') );
			}
		})	
	}

	var initialize = function(){
		var selector = $('input.form-control[name]')
		var textArea = $('textarea.form-control[name]')

		selector.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())

		});

		textArea.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())
		});	
				
	}

	var afterShowBsModal = function(options){

		if (typeof options != 'object' || options.target == 'undefined' ) {
			return;
		}
		var $form = $('#' + options.target).find('form')
		var selector = $form.find('input.form-control[name]')
		var textArea = $form.find('textarea.form-control[name]')

		selector.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())

		});

		textArea.each(function(i,element){
			var $element = $(element);
			new Textfields($element,$element.data())
		});					
	}

	initialize();
	$(document).on('afterShow.bs.modal',function(e,options){
		afterShowBsModal(options);
	})
	
})(window.jQuery);







