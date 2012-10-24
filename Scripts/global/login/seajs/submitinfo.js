define(function(require,exports){
	var config = require('../config')
	var _submitButton = config.submitButton;
	var initInput = require('./forminit');
	var tipMessage = require('./tipmessage');
	var initPassword = require('./initpassword');
	
	exports.init = function(){
			__action.__bindButtonSubmit();
		};
	
	var __action = {
		
		// log : function () {
			// if (config.debug)
				// console.log.apply('', arguments);
		// },
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		
		__bindButtonSubmit : function(){
			$(_submitButton).on('click',function(){
				__action.__btnSubmitClick()
			});
		},
		__btnSubmitClick : function(){
			var _inputs = {
				username:	$("#username").val() ,
				password:	$("#userpass").val() ,
				remember:	$("#remember-box").attr('checked'),
				checkcode: null
			};
			tipMessage.showTipMessage(_inputs)
			var _inputTipNums = config.inputTipNums;
			//this.log(_inputTipNums);
			if( !_inputTipNums.nameNum && !_inputTipNums.passNum ){
				require('jquery.md5');
				var md5Pass = _inputs.password;
				//_this.debug(items.isInputPass);
				if (config.isInputPass) {
					md5Pass = $.md5(md5Pass);
					_inputs.password = md5Pass;
					$("#userpass").val(md5Pass);
					//_this.debug("user input password :"+items.isInputPass);
					config.isInputPass = false;
				}
				this.log(_inputs);
				initInput.disabledInput();
				$(config.submitMaster).addClass("visibility");
				__action.__ajaxCheckLogin(_inputs)
			}
			
		},
		__ajaxCheckLogin : function(_inputs){
			var $params ={
						username:_inputs.username,
						password:_inputs.password,
						remember:_inputs.remember
				};
			if(!_inputs.remember)
				$params.remember = 0;
			//this.log($params);
			// initPassword.success($params);
			// initInput.enabledInput();
			// __action.__bindButtonSubmit();
			$.ajax({
					type	:	'POST',
					contentType:'application/json',
					dataType:	'jsonp',
					url		:	config.loginUrl,
					data	:	$params,
					success	: function(data, status){
						if(data.success){
							initPassword.success($params,true);
						}
						else{
							initInput.enabledInput();
							var _nums = config.inputTipNums;
							_nums.nameNum = data.nameNum;
							_nums.passNum = data.passNum;
							tipMessage.getTipMessage(0, config.nameTipHtml, _nums.nameNum);
							tipMessage.getTipMessage(1, config.passTipHtml, _nums.passNum);
							__action.__bindButtonSubmit();
						}
					},
					error	: function(){
						//initPassword.success($params);
						initInput.enabledInput();
						__action.__bindButtonSubmit();
						tipMessage.ajaxErrorTip(0, config.nameTipHtml,7);
					}
				});	
		}
	}
	
})
