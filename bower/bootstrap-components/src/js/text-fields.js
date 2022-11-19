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







