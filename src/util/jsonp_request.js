//传递过来this,component,请求方式,
var hrml = "http://api.shatuhome.com"
export const jsonpRequest = function(_this,component,params,success,err){
	var weburl =hrml+'?service='+component;
	_this.$http.jsonp(weburl, params, )
		.then(
			success,err
		)
}
