//传递过来this,component,请求方式,
var hrml = "http://www.shatuhome.com:8181"
//export const postRequest = function(_this,component,params,success,err){
//	var weburl =hrml+'?service='+component;
//	_this.$http.jsonp(weburl, params,{ credentials: true })
//		.then(
//			success,err
//		)
//}
export const postRequest = function(component,params,success,err){
	var weburl =hrml+'?service='+component;
	$.ajax({
	      type:      'POST',
	      url:      weburl,
	      crossDomain: true,
	      data:      params,
	      dataType: "json",
	      success,err
	    });
}
