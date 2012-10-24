define({
		name : /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/,
		pass : /^(\w){5,21}$/  ,
		email : /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
		phone : /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
		mobile : /^1[3|4|5|8][0-9]\d{4,8}$/,
		money : /^([+]?)((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/,
		weburl : /(https?:\/\/)?(.+(\..+)+)(.+)*/,  //allow Chinese
		postcode : /^[a-zA-Z0-9 ]{3,12}$/,
		seachkey : /^[^`~!@#$%^&*()+=|\\\][\]\{\}:;'\,.<>/?]{1}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]{0,19}$/,
		nums : /^[0-9]{1,20}$/
});
