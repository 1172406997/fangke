import { publicMsg } from "./publicMsg.js"
//var hrml = "http://192.168.0.99:9094/api";
//传递过来this,component,请求方式,
export const postRequest = function(_this,component,params,callback){
	var weburl =hrml+'/'+component;
//	var loadingInstance = _this.Loading.service("options");

	_this.axios({
		url: weburl,
		method: 'post',
		data: params,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin':'/',
		}
	}).then(
		function(res){
			if(res.data.code){
				if(res.data.code==102){
					_this.$router.push({path:"/"})
				}else if(res.data.code == 1001){
					return
				}else{
					_this.Message.error(publicMsg(res.data.code))
				}
			}
			callback(res);
//			loadingInstance.close();
		}
	)
//	.catch(function(){
//		_this.Message.error("网络环境有问题")
//	})
}
