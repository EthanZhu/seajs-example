define(function(require,exports,module){
	var config = require('../config');
	var resizeTimer = config.resizeTimer;
	var block = require('./block.ua') ;
	//log
	//var $ = require('jquery');
	
	exports.init = function(){

		__action.__pageInit();		
	
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
		
		__pageInit : function(){
			$('body').focus();
			$(window).resize(function(e) {
					if(resizeTimer){
							clearTimeout(resizeTimer); 
					}
					resizeTimer = setTimeout(function(){__action.__pageHeight()},500);
				}
			);
			
			__action.__pageHeight();
			
			var agent = $.browser ;
			var version = agent.version;
			var blockVersion = config.uaVersion;
			//alert(version)
			if(config.isBlockUa && agent.msie && parseInt(version) < parseInt(blockVersion)){
			// if( agent.mozilla ){	
				this.__blockEarlyUa(version);
			}
			else{
				this.__formInit();
			}
		},
		__pageHeight : function(){
			this.log('__pageHeight');
			var windowHeight = $(window).height();
			this.log('pageHeight:'+windowHeight);
			if(windowHeight<574){
				$('body').height('574');
			}else{
				$('body').height(windowHeight);
			}
		},
		

		__creatCssLink	:	function(url){
			
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			$("head")[0].appendChild(link);
    		
		},

		
		__blockEarlyUa : function(version){
			//this.log('__blockEarlyUa is running');
			block.ua.ie(version);
		},
		
		__formInit : function(){
			var formInit = require('./forminit');
			formInit.init();
		}
	}
})
