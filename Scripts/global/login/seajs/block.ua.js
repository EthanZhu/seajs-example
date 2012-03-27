define(function(require,exports){
	
	//module.log('block ui')
	var config = require('../config');
	//var $ = require('jquery');
	
	exports.ua = {
		ie : function(version){
			__action.__blockIE(version);
		}
	};
	
	var __action = {
		log : function (info) {
			if (config.debug)
				console.log(info);
		},
		__blockIE :　function(version){
			this.log('blockIE isrunning');
			//require('jquery');
			require('jquery.blockUI');
			require('../../../../Content/libs/jquery.ui/blitzer/jquery.ui.core.css');
			require('../../../../Content/libs/jquery.ui/blitzer/jquery.ui.theme.css');
			require('../../../../Content/libs/jquery.ui/blitzer/jquery.ui.dialog.css');
			require('./forminit').disabledInput();
			$.blockUI({
						theme:  true,             
						title:  '浏览器版本太低',             
						message:'<p>您的浏览器核心是 <strong class="red">IE'+ version +'</strong>，被禁止使用此系统。<br>' +
							'低核心的IE浏览器漏洞较多，用户体验较差，微软官方已经停止后续支持。<br>' +
							'为了账户安全和获取最佳用户体验，建议你根据自身需求升级至' +
							'<a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-8" target="_blank" class="red">' +
							'<strong>IE8.0</strong></a>以上版本或者使用 ' +
							'<a href="http://firefox.com.cn/" target="_blank" class="red"><strong>火狐</strong></a>、' +
							'<a href="http://www.google.cn/chrome/" target="_blank" class="red"><strong>Chrome</strong></a> 等浏览器</p>'
			});
		}
	}
})
