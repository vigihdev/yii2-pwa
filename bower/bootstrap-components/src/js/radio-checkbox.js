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