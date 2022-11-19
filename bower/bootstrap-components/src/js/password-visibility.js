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