/* *
 * 
 * 判断是否登陆
 * 
 * 
 * */
export  const toLogin = function(_this,res){
	if(res==401){
		_this.$Message.error('您还未登陆,请重新登陆');
		localStorage.clear();
		_this.$router.push({name:"login"});
		_this.flag == false;
	}
}
//console.log(getHostUrl);

