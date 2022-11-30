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
                    self.#clearCheked(e.target);
                    self.#addCheked($(e.target).closest(RADIO_BUTTON).get(0))
                }
            });

            if(this.$inputRadio.is(':' + CHECKED)){
                this.$inputRadio.trigger('change');
            }
        }

        #clearCheked(inputRadio){
            $(inputRadio).closest(ELEMENT).find(RADIO_BUTTON).each(function(i,radio){
                $(radio).removeClass(CHECKED);
            });
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

