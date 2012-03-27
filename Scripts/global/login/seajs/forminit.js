define(function(require,exports){
	var config = require('../config');
	//var initRemember = require('global/remember');
	var tipMessage = require('./tipmessage');
	var initPassword = require('./initpassword');
	
	
	var //_formClass = config.formAction,
		_inputClass = config.inputClass,
		_labelClass = config.labelClass,
		_formItem = config.formItem,
		_formID = config.formID,
		_rememberLabel = config.rememberLabel,
		_rememberBox = config.rememberBox,
		_submitButton = config.submitButton,
		_submitMaster = config.submitMaster;
		
	
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
			
				this.log('input init start');
				$( _formID + ' ' + _inputClass ).each(function () {
						var items = $(this).parent( _formItem);
						//__action.log(items);
						$(this).on('keypress focusin focusout blur change', function (event) {
								var type = event.type; //获取事件类型 
							//alert(type);
								if ($(this).attr("id") == "userpass") {
									config.isInputPass = true;
								}
								if (type == 'keypress'){
									items.children(_labelClass).addClass('vh');
								}
								else if (type == 'focusin') {
									if (items.hasClass('error')) {
										$(this).val("");
										items.children( _labelClass ).removeClass('vh');
										items.removeClass('error');
									}
								//alert(items.index());
									var tipIndex = items.index();
									var taghtml = null ;
									if(tipIndex==0) {
											taghtml = config.nameTipHtml;
										}else if(tipIndex==1){ 
											taghtml = config.passTipHtml;
										}
									if(taghtml){ 
											__action.__focusTipMessage(tipIndex,taghtml,0);
										}
									items.addClass('focus');
								}
								else if(type=="focusout"){
									items.removeClass('onshow');
								}
								else if (!$(this).val()) {
									items.children( _labelClass ).removeClass('vh');
									items.removeClass('focus correct onshow');
								}
							})
					});
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
				this.__boxChangeChecked( _rememberBox , !_isRemember );
			}
			
			var _events = $(_rememberLabel).data('events');
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
			this.log(_rememberLabel +' have been binded click event ');
			$(_rememberLabel).on('click',function(){
				var _this = __action;
				_this.log(_rememberLabel+" have been clicked");
				_this.__boxChangeChecked( _rememberBox , $(_rememberBox).attr('checked') );
			});
		},
		
		__setInputValue : function(inputs){
			this.log('set input values from cookie')
			$(config.nameInput).val(inputs.username);
			$(config.passInput).val(inputs.password);
			this.__checkInputValue();
		},	
		
		__checkInputValue : function(){
			this.log('check input styles');
			$(_formItem).each(function(){
				if($(this).children(_inputClass).val()){
					$(this).addClass("focus");
					$(this).children(_labelClass).addClass('vh');
				}
			})
		},
		__disabledInput : function(){
			$(_formID+' input').attr('disabled', true);
			$(_rememberLabel).off('click');
			$(_submitButton).off('click');
			//$(_submitMaster).addClass("visibility");
		},
		__enabledInput : function(){
			$(_formID+' input').attr('disabled', false);
			this.__rememberBind();
			$(_submitMaster).removeClass("visibility");
		},
		__focusTipMessage : function(index,tipHtml,tag){
			tipMessage.focusTipMessage(index,tipHtml,tag);
		},
		
		__initPassword : function(){
			initPassword.init();
		}
		
	}
})
