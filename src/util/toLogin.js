import { publicMsg } from "./publicMsg.js"
/* *
 * 
 * 判断是否登陆
 * 
 * 
 * */
export  const toLogin = function(_this,res){
	if(res==401){
		localStorage.clear();
		_this.$router.path("/Login");
		_this.flag == false;
	}
}
//console.log(getHostUrl);

