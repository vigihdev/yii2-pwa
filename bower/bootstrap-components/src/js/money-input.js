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

