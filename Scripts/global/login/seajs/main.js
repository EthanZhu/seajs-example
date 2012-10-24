seajs.config({
  alias: {
//    	'order'				:	'require/plugin/order',
//    	'global'			:	'../global/login/require',
//		'config'			:	'../global/login/require/config',
    	'jquery'			:	'jquery/1.7.2/jquery.sea',
    	'LABjs'				:	'LABjs/2.0.3/LAB.sea',
//    	'jquery.min'		:	'jquery/1.7.2/jquery.min',
    	'jquery.cookie'		:	'jquery.cookie/jquery.cookie.module',
    	'jquery.md5'		:	'jquery.md5/jquery.md5.module',
		'jquery.blockUI'	:	'jquery.blockUI/2.39/jquery.blockUI.module'
//		'ui.dialog'			:	'jquery.ui/1.8.18/ui.sea/jquery.ui.dialog'
  },
  debug : 2
});

define(function(require,exports,module){
	//var $ = require('jquery');
	//var $LAB = require('LABjs');
/* 
	var config = require('./config');
	var Module = module.constructor;
	
	Module.prototype.log = function() {
		if (config.debug)
			console.log.apply('', arguments);    
			
	    var id = this.id;
	    var parts = id.split('/');
	    return parts[parts.length - 1];

	  };
*/
/*
	$LAB
		.script('./Scripts/libs/jquery/1.7.2/jquery.min.js')//.wait()
		.wait(function(){
			
			$(function(){
				var startpage = require('./startpage');
				startpage.init();
			})
		})
*/
	$(function(){
		var startpage = require('./startpage');
		startpage.init();
	})
})