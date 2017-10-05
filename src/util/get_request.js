import { publicMsg } from "./publicMsg.js"
//传递过来this,component,请求方式,
export const getRequest = function(_this,edition,component,params,callback){
	var weburl =hrml+'/'+component;
	var loadingInstance = _this.Loading.service("options");
	
	_this.axios({
		url: weburl,
		method: 'get',
		params: params,
		headers: {
//			'Content-Type': 'application/json'	
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	}).then(
		function(res){
			if(res.data.code){
				_this.Message.error(publicMsg(res.data.code))
				if(res.data.code==102){
					_this.$router.push({path:"/"})
					loadingInstance.close();
				}
			}
			callback(res);
			loadingInstance.close();
		}
	).catch(function(error){
		loadingInstance.close();
	})
}
