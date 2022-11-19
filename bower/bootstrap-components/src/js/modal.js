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
// 
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
})(window.jQuery); 


