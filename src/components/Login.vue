<template>
  <div >
  	<div class="login" v-if="!flag" style="overflow: hidden;">
  		<div class="big"></div>
	    <div class="con">
	    	<div><img src="../assets/img/meijian.png" alt="" style="width:30%;transform: translateY(-50%);" /></div>
	    	<div v-if="clickr">
		    	<p style=" margin-top: 10px;font-size: 24px;color:#fff">欢迎回来</p>
		    	<div style="width: 60%; margin-top: 10px;color: red;" v-if="show">&nbsp;用户名密码错误</div>
		    	<Input v-model="username" placeholder="请输入用户名" style="width: 60%; margin-top: 10px;"></Input><br/>
		    	<Input v-model="password" type="password"  placeholder="请输入密码" style="width:60%; margin-top: 10px;"></Input><br/>
		    	<a style="margin-top: 10px;display: block;color: #B2C0C8;text-decoration: underline;font-size: 12px;"v-on:click="changes(this.clickr)">忘记密码？</a>
		    	<Button style="width:60%;margin-top: 10px;" v-on:click="getitem()">登录</Button><br/>
	    	</div>
	    	<div v-if="!clickr">
		    	<span style=" margin-top: 10px;font-size: 24px;color:#fff">请联系您的上级代理</span><br/>
		    	<Button class="fan" style="width:60%;margin-top: 10px;" v-on:click="changes(this.clickr)">返回登录</Button><br/>
	    	</div>
	    	<!--<a>免费注册</a>-->
	    </div>
  	</div>
    <div v-if="flag">
    	    <router-view ></router-view>
    </div>
  </div>
</template>

<script>
//var h = document.documentElement.clientHeight || document.body.clientHeight;
//var big = document.getElementsByClassName(".big")[0];
//big.style.height=h+"px";
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      clickr:true,
      show:false,
      flag:false,

    }
  },
  mounted(){
    this.isLogin();
  },
  methods:{
  	changes(res){
  		if(this.clickr==true){
  			this.clickr=false;
  		}else{
  			this.clickr=true;
  		}
  	},
    isLogin(){
      var userId = localStorage.getItem("user_id");
      var token = localStorage.getItem("token");
      if(userId!="null"&&token!="null"){
        this.flag=true;
      }else{
         this.flag=false;
       }
    },
  	getitem(){
  		var self = this;
  		var str = this.Encrypt();
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'username':this.username,'password':this.password
				}
			};
  		this.jsonpRequest(this,"User_User_Login.Web",params,function(res){
  			console.log(res);
  					if(res.body.data.code == 0){
  						self.flag=true;
							var locsl = {};
							locsl = res.data.data.info;
							localStorage.setItem("user_id", locsl.user_id);
							localStorage.setItem("token", locsl.token);
  					}else{
              this.$Message.error('用户名或者密码有误，请重新检查输入！');
  					}
  		},function(err){
  			console.log(err);
  		});
			},
		},
	}
  	</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body{
		font-family: HanHei SC,PingFang SC,Helvetica,Microsoft YaHei,\\9ED1\4F53;
	    -webkit-font-smoothing: antialiased;
	}
	.login{
		position: absolute;
		left:0px;
		top: 0px;
		bottom: 0px;
		right: 0px;
		/*width: 100%;*/
		/*height: 100%;*/
		overflow-x: hidden;
	}
	.big{
		width: 4096px;
    height: 2560px;
		background: url(http://s2.cdn.imeijian.cn/img/bg_login.0d50e6d779659d9614816c8267803783.jpg) dimgray repeat;
		animation: userlogin_bg 30s ease-out .5s infinite alternate;
		-webkit-animation: userlogin_bg 30s ease-out .5s infinite alternate ;
	}
	.con {
		position:absolute;
		top:0px;
		left:0px;
		right:0px;
		bottom: 0px;
		width: 340px;
		height: 460px;
		margin: auto;
		background-color: #3B454C;
		border-radius: 4PX;
		text-align: center;
		box-sizing: border-box;
		}
		.con>div>img{
			transform: translateY(-50%);
		}
	@keyframes userlogin_bg{
		0%{
			transform: translate(0);
		}
		100%{
			transform: translateY(-250px);
		}
	}
</style>
