(function($){

"use strict";

var TAG = 'FooterMenu';

class Request {
    constructor(){
    	this.location = window.document.location
    }

    get(name){
    	return this.location.hasOwnProperty(name) ? this.location[name] : null;
    }

	get hash(){}

	get host(){
		return this.get('host');
	}

	get hostname(){
		return this.get('hostname');
	}

	get href(){
		return this.get('href');
	}

	get origin(){
		return this.get('origin');
	}

	get pathname(){
		return this.get('pathname');
	}

	get protocol(){
		return this.get('protocol');
	}
}

class ModelFooterMenu {
    constructor(){
    }

    get $element(){
        return $('.footer-menu .list-menu .list-menu-item')
    }

    hrefMenu($element){
    	return $element.find('a').attr('href')
    }

    hasMatchPathname($element){
    	var param = this.hrefMenu($element);
    	return (new Request()).pathname.match(param) != null;
    }

    hasMatchHome($element){
    	var param = this.hrefMenu($element);
    	return (new Request()).pathname == '/';
    }
}

class FooterMenu extends ModelFooterMenu{
	static FOOTER_MENU_ACTIVE = 'footer-menu-active';

    constructor(){
        super();
        this.request = new Request();
        this.init();
    }

    init(){
        var self = this;
        this.$element.each(function(i,element){
            var $element = $(element)
        	if (!self.activeMenuHome($element)) {
            	self.activeMenuByPathname($element)
        	}
        })
    }

    activeMenuHome($element){
        var self = this;

    	if ( this.request.pathname === '/') {
	        this.$element.each(function(i,element){
	            var $element = $(element)
	            var origin = self.hrefMenu($element);
	            if (origin === self.request.origin) {
    				$element.addClass(FooterMenu.FOOTER_MENU_ACTIVE) 
	            }
	        })
	        return true;
    	}
    	return false;
    }

    activeMenuByPathname($element){
        var self = this;

    	$element.removeClass(FooterMenu.FOOTER_MENU_ACTIVE)
    	if ( self.hasMatchPathname($element)) {
    		$element.addClass(FooterMenu.FOOTER_MENU_ACTIVE) 
    	}
    }

    delay(ms){
        var _ms = typeof ms === 'undefined' ? 1000 : ms;
        return new Promise((resolve, reject) => {setTimeout(() => {resolve(this); }, _ms); });
    }

}

let footer = new FooterMenu();
})(window.jQuery); 

