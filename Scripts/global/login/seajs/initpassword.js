define(function(require,exports){
	require('jquery.cookie');
	var config = require('../config');
	var initInput = require('./forminit');
	var submitInfo = require('./submitinfo');
	
	exports.init = function(){
		__action.__loadCookieInfo();
	};
	exports.success = function(inputs,tag){
		__action.__successLogin(inputs,tag);
		
	}
	
	var __action = {

		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__loadCookieInfo : function(){
			var isLogout = $.cookie('isLogout');
			var cookieRemember = $.cookie('remember');
			this.log('load cookie informations')
			if(cookieRemember){
				var _inputs = {
						username : '',
						password : '',
						remember : ''
					}
				_inputs.username = $.cookie("username");
				_inputs.remember = $.cookie("remember");
				if (isLogout) {
					$.cookie("isLogout", null)
				}else{
					_inputs.password = $.cookie("password");
					config.isInputPass = false;
				}
				this.log(_inputs)
				config.isRemember = true;
				initInput.rememberInit();
				initInput.setInputValue(_inputs);
			}
			this.__submitInfo();
		},
		
		__submitInfo : function(){
			submitInfo.init();
		},
		
		__successLogin : function(params,tag){
			if(params.remember){
				$.cookie('username', params.username, { expires: 7, path:'/' });
				$.cookie('password', params.password, { expires: 7, path:'/' });
				$.cookie('remember', params.remember, { expires: 7, path:'/' });
			}else{
				$.cookie('username', null,{ expires: -1, path:'/' });
				$.cookie('password', null,{ expires: -1, path:'/' });
				$.cookie('remember', null,{ expires: -1, path:'/' });
			}
		}
		
	}
})
