define(function(require,exports){
	var config = require('../config');
	//var initRemember = require('global/remember');
	var tipMessage = require('./tipmessage');
	var initPassword = require('./initpassword');
		
	
	exports.init = function(){
			__action.__inputInit();
			__action.__rememberInit();
			__action.__checkInputValue();
			__action.__initPassword();
			//__action.__submitInfo();
	};
	exports.rememberInit = function(){
		__action.__rememberInit();
	};
	exports.checkInputValue = function(){
		__action.__checkInputValue();
	}
	exports.setInputValue = function(inputs){
		__action.__setInputValue(inputs);
	};
	exports.disabledInput = function(){
		__action.__disabledInput();
	};
	exports.enabledInput = function(){
		__action.__enabledInput();
	}
	
	var __action = {
		
		// log : function () {
			// if (config.debug)
				// console.log.apply('', arguments);
		// },
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__inputInit : function(){
			$(config.formID).delegate('input'+config.inputClass,'keypress focusin focusout', function(event){
				var _config = config;
				var $this = this;
				var $obj = $(this);
				var $items = $obj.parent(_config.formItem);
				var type = event.type;
				if($this.type=='password') _config.isInputPass = true;
				if(type == 'keypress') $items.find(_config.labelClass).addClass('vh');
				else if(type=='focusin'){
					if($items.hasClass('error')){
						$this.value='';
						$items.removeClass('error').find(_config.labelClass).removeClass('vh');
					}
					var tipIndex = $items.index();
					var taghtml = null ;
					if(tipIndex==0) taghtml = _config.nameTipHtml;
					else if(tipIndex==1) taghtml = _config.passTipHtml;
					if(taghtml) __action.__focusTipMessage(tipIndex,taghtml,0);
					$items.addClass('focus');
				}
				else if(type=="focusout"){
					if(!$this.value) $items.removeClass('focus correct onshow').find(_config.labelClass).removeClass('vh');
					else $items.removeClass('onshow');
				}
				_config = null;
			})
			
		},
		
		__boxChangeChecked : function(objBox,isChecked){
			this.log( objBox+"'s attribute checked changed from "+ isChecked );
			if(isChecked){
				$(objBox).attr('checked',false)
			}else{
				$(objBox).attr('checked',true)
			}
		},
		
		__rememberInit	:	function(){
			var _isRemember = config.isRemember
			if( _isRemember ){
				this.__boxChangeChecked( config.rememberBox , !_isRemember );
			}
			
			var _events = $(config.rememberLabel).data('events');
			var _eventClick = null;
			if(!_events){
				this.__rememberBind();
			}else{
				_eventClick = _events['click'];
				//this.log(_eventClick);
				if(!_eventClick)
					this.__rememberBind();
			}
		},
		
		__rememberBind : function(){
			this.log(config.rememberLabel +' have been binded click event ');
			$(config.rememberLabel).on('click',function(){
				var _this = __action;
				var _config = config;
				_this.__boxChangeChecked( _config.rememberBox , $(_config.rememberBox).attr('checked') );
				_this = _config =null;
			});
			
		},
		
		__setInputValue : function(inputs){
			this.log('set input values from cookie')
			$(config.nameInput).val(inputs.username);
			$(config.passInput).val(inputs.password);
			this.__checkInputValue();
		},	
		
		__checkInputValue : function(){
			//this.log('check input styles');
			$(config.formItem).each(function(){
				var _config = config;
				if($(this).children(_config.inputClass).val()){
					$(this).addClass("focus");
					$(this).find(_config.labelClass).addClass('vh');
				}
				_config = null;
			});
		},
		__disabledInput : function(){
			var _config = config;
			$(_config.formID).find('input').attr('disabled', true);
			$(_config.rememberLabel).off('click');
			$(_config.submitButton).off('click');
			//$(_submitMaster).addClass("visibility");
		},
		__enabledInput : function(){
			var _config = config;
			$(_config.formID).find('input').attr('disabled', false);
			this.__rememberBind();
			$(config.submitMaster).removeClass("visibility");
		},
		__focusTipMessage : function(index,tipHtml,tag){
			tipMessage.focusTipMessage(index,tipHtml,tag);
		},
		
		__initPassword : function(){
			initPassword.init();
		}
		
	}
})
