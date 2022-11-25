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



(function ($) {
    'use strict';

var TAG = 'PasswordVisibility';
const VISIBILITY = 'visibility';
const VISIBILITY_OFF = 'visibility_off';
const INPUT_PASSWORD = 'input.form-control[type="password"]';

class PasswordVisibility{

    constructor(element){
        this.$element = $(element);
        const self = this;
        const icon = $(element).find('.input-group-append .material-icons').text();
        $(element).find('.input-group-append .input-group-text').addClass('ripple-effect');

        $(element).find('.input-group-append').addClass('ripple-effect').on('click',function(e){
            if($(this).find('.material-icons').text() === VISIBILITY){
                self.#runVisibility();
                return;
            }

            if($(this).find('.material-icons').text() === VISIBILITY_OFF){
                self.#runVisibilityOff();
            }
        });

    }

    #runVisibility(){
        this.$element.find('input[id]').attr({type:'text'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY_OFF);
    }

    #runVisibilityOff(){
        this.$element.find('input[id]').attr({type:'password'});
        this.$element.find('.input-group-append .material-icons').text(VISIBILITY);
    }

	static validate(){
		return $(INPUT_PASSWORD).length > 0;
	}

	static instance(){
		if (PasswordVisibility.validate()) {
            $(INPUT_PASSWORD).each((i,element) => {
                const $append = $(element).closest('.input-group').find('.input-group-append');
                if($append.length > 0){
                    if($append.find('.material-icons').length > 0 ){
                        new PasswordVisibility( $(element).closest('.input-group').get(0) )
                    }
                }
            });
		}
	}
}
PasswordVisibility.instance();

})(jQuery);
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

// @ts-nocheck
(function ($) {
    "use strict";
    const ELEMENT = '.switch-root'
    const INPUT_ELEMENT = 'input.switch-checkbox-form-control[type="checkbox"]';
    const SWITCH_RIPPLE = 'switch-ripple';
    const CHECKED = 'checked';

    function delay(ms){
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class Switch {

        constructor(element) {
            this.$element = $(element);
            this.$inputCheckbox = $(element).find(INPUT_ELEMENT);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                self.addRipple(context);
                if(e.target.checked){
                    context.addClass(CHECKED)
                }
                else
                {
                    context.removeClass(CHECKED)
                }
            });

            if(this.$inputCheckbox.is(':' + CHECKED)){
                const context = this.$inputCheckbox.closest(ELEMENT);
                context.addClass(CHECKED);
                self.addRipple(context);
            }
        }

        addRipple(context){
            context.addClass(SWITCH_RIPPLE);
            delay(1000).then(() => context.removeClass(SWITCH_RIPPLE))
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (Switch.validate()) {
                $(ELEMENT).each((i, element) => {
                    new Switch(element);
                });
            }
        }
    }
    Switch.instance();
})(jQuery); 

// RadioButton
(function ($) {
    "use strict";
    const ELEMENT = '.radio-button-group';
    const RADIO_BUTTON = '.radio-button';
    const RADIO_RIPPLE = 'button-ripple';
    const CHECKED = 'checked';
    const INPUT_RADIO = 'input.radio-button-form-control[type="radio"]';

    function delay(ms){
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class RadioButton {

        constructor(inputRadio) {
            this.$element = $(ELEMENT);
            this.$listRadioButton = $(ELEMENT).find(RADIO_BUTTON);
            const self = this;
            this.$inputRadio = $(inputRadio);
            this.$inputRadio.on('change',function(e){
                if(e.target.checked){
                    self.#clearCheked();
                    self.#addCheked($(e.target).closest(RADIO_BUTTON).get(0))
                }
            });

            if(this.$inputRadio.is(':' + CHECKED)){
                this.$inputRadio.trigger('change');
            }
        }

        #clearCheked(){
            this.$listRadioButton.removeClass(CHECKED);
            return this;
        }

        #addCheked(radioButton){
            $(radioButton).addClass(CHECKED).addClass(RADIO_RIPPLE);
            delay(1000).then(() => $(radioButton).removeClass(RADIO_RIPPLE));
        }

        #handleRadioCheked(inputRadio){
            this.$element.find(INPUT_RADIO).each(function(i,input){
                input.checked = false;
            });
            inputRadio.checked = true;
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (RadioButton.validate()) {
                $(ELEMENT).find(INPUT_RADIO).each((i, element) => {
                    new RadioButton(element);
                });
            }
        }
    }
    RadioButton.instance();
})(jQuery); 

(function ($) {
    "use strict";
    const ELEMENT = '.radio-checkbox';
    const INPUT_ELEMENT = 'input.radio-checkbox-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-ripple';

    function delay(ms){
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class RadioCheckbox {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if(e.target.checked){
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else
                {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if(this.$inputCheckbox.is(':' + CHECKED)){
                this.$inputCheckbox.trigger('change');
            }

        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (RadioCheckbox.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function(i,inputCheckbox){
                    new RadioCheckbox(inputCheckbox)
                });
            }
        }
    }
    RadioCheckbox.instance();
})(jQuery); 

(function ($) {
    "use strict";
    const ELEMENT = '.checkbox-outline';
    const INPUT_ELEMENT = 'input.checkbox-outline-form-control[type="checkbox"]';
    const CHECKED = 'checked';
    const CHECKBOX_RIPPLE = 'checkbox-outline-ripple';

    function delay(ms){
        var _ms = typeof ms === 'undefined' ? 700 : ms;
        return new Promise(resolve => setTimeout(resolve, _ms));
    }

    class CheckboxOutline {

        constructor(inputCheckbox) {
            this.$inputCheckbox = $(inputCheckbox);
            const self = this;
            this.$inputCheckbox.on('change', function (e) {
                const context = $(e.target).closest(ELEMENT);
                if(e.target.checked){
                    context.addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
                else
                {
                    context.removeClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                    delay(1000).then(() => context.removeClass(CHECKBOX_RIPPLE));
                }
            });

            if(this.$inputCheckbox.is(':' + CHECKED)){
                this.$inputCheckbox.closest(ELEMENT).addClass(CHECKED).addClass(CHECKBOX_RIPPLE);
                delay(1000).then(() => this.$inputCheckbox.closest(ELEMENT).removeClass(CHECKBOX_RIPPLE));
            }

        }

        #controlLabel(){
            $(ELEMENT).on('click','label',function(e){
                console.log(e);
            })
        }

        static validate() {
            return $(ELEMENT).length > 0;
        }

        static instance() {
            if (CheckboxOutline.validate()) {
                $(ELEMENT).find(INPUT_ELEMENT).each(function(i,inputCheckbox){
                    new CheckboxOutline(inputCheckbox)
                });
            }
        }
    }
    CheckboxOutline.instance();
})(jQuery); 


// @ts-nocheck
(function($){
"use strict";
const ELEMENT_INPUT = '.form-control'
const TEXTFIELD_FLOATING = 'textfield-floating-label'
const TEXTFIELD_FLOATING_ACTIVE = 'textfield-floating-label-active'
const TEXTFIELD_FLOATING_COMPLETED = 'textfield-floating-label-completed'

class Textfield{

	constructor($textfield) {
		const $input = $textfield.find('input.form-control');
		$input
			.on('focus',(e) => {
				$(e.target).closest('.' + TEXTFIELD_FLOATING)
					.addClass(TEXTFIELD_FLOATING_ACTIVE)
					.addClass(TEXTFIELD_FLOATING_COMPLETED)
			})
			.on('focusout',(e) => {
				$(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_ACTIVE);
				let value = $(e.target).val();
				if(value.length === 0){
					$(e.target).closest('.' + TEXTFIELD_FLOATING).removeClass(TEXTFIELD_FLOATING_COMPLETED);
				}
			});
		
		if( $input.val().length > 0 ){
			$input.closest('.' + TEXTFIELD_FLOATING).addClass(TEXTFIELD_FLOATING_COMPLETED)
			
		}
	}

	static validate(){
		return $(ELEMENT_INPUT).length > 0;
	}

	static instance(){
		if (Textfield.validate()) {
			$("." + TEXTFIELD_FLOATING).each((i,element) => {
				new Textfield($(element));
			});
		}
	}
}
Textfield.instance();
})(jQuery); 