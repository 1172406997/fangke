import { publicMsg } from "./publicMsg.js"
/* *
 * 
 * 判断是否登陆
 * 
 * 
 * */
export  const isLogin = function(_this,edition){
	
	var sTime = localStorage.getItem("start_time");
	
	var eTime = localStorage.getItem("end_time");
	
	var time = Date.parse(new Date())/1000;
	
	//刷新torken
	var refarsh = function(){
					_this.axios({
						url: weburl,
						method: 'post',
						data: params,
						headers: {
							'Content-Type': 'application/json'
						},
					}).then(function(res) {
							if(res.data.code){
								if(res.data.code==102){
									Message.error("登陆验证信息失效，请重新登陆");
//									_this.$router.push({path: '/'});
								}
								else{
									Message.error(publicMsg(res.data.code));
								}
							}else{
								var start_time = Date.parse(new Date())/1000;
								var end_time = Date.parse(new Date())/1000 + res.data.data.expire_time;
								localStorage.setItem("access_token",res.data.data.access_token);
								localStorage.setItem("refresh_token",res.data.data.refresh_token);
								localStorage.setItem('expire_time',res.data.data.expire_time);
								localStorage.setItem("start_time",start_time);
								localStorage.setItem('end_time',end_time);
							}
					}).catch(function(error){
//						loadingInstance.close();
					})
			}
	
	//验证torken 
	
	
	var weburl = "/wwwthings/api"+'/'+edition+'/'+"/refresh_token";//刷新token
	
	var testtoken = "/wwwthings/api"+'/'+edition+'/check_token';//刷新token
	
	var refresh_token = localStorage.getItem("refresh_token");
	
	var expire_time = localStorage.getItem("expire_time");
	
	var params = { "refresh_token":refresh_token,"expire_time":expire_time }
	
	if(sTime < time <eTime&&time<eTime/2){
		refarsh(_this);
	}else if(time>eTime || time<sTime){
//		_this.$router.push({path: '/'})
	}
	
}
//console.log(getHostUrl);

