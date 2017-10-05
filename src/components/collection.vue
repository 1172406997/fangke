<template>
  <div class="header">
        <header>
					<div class="body">
						<div class="title">
							<!--<Button style="float: right;position:relative;top:10px;" class="btn"><Icon type="ios-photos-outline"></Icon ">更多模板</Button>-->
							<div class="body_title">创作拼图</div>
							<div class="sub_title">选择一个模板开始你的设计</div>
						</div>
					</div>
				</header>
				<Menu mode="horizontal" active-name="10">
            <div class="layout-assistant">
            	<router-link :to="{ path: 'puzzle/'}">
                <Menu-item name="10">全部</Menu-item>
              </router-link>
              <!--<router-link to="/project">
                <Menu-item name="6">项目</Menu-item>
              </router-link>
              <router-link to="/puzzleson">
                <Menu-item name="7">拼图</Menu-item>
              </router-link>-->
							 <router-link to="/canvas"><Button style="float: right;position:relative;top:10px;" class="btn"><Icon type="ios-folder"></Icon>&nbsp;新建项目</Button></router-link>
            </div>
        </Menu>
				<main>
					<div class="layout-content">
						<router-view></router-view>
					</div>
				</main>
	</div>
</template>

<script>

export default {
  name: 'content',
  data () {
    return {
			 value13: '',
       select3: 'day'
    }
  },
  methods:{
  	//获取作品信息
  	GetProductionByUserId:function (){
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id"); 
  		var token = localStorage.getItem("token"); 
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
			this.jsonpRequest(this,"Production.GetProductionByUserId",params,function(res){
  					if(res){
  						console.log(res)
  					}
  		},function(err){
  			console.log(err);
  		});
//			this.$http.jsonp('http://api.xinciji.com?service=Production.GetProductionByUserId',
//			{
//				params:{
//					'signature': sha,'timestamp':timestamp,'nonce':nonce,'user_id':user_id,'token':token}
//				},)
//			.then(
//				function(res){
//					console.log(res)
//					},
//					function(err){
//						console.log("err");
//					}
//			)
  	},
  	
  },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header header{
    	width: 100%;
    	/*height: 310px;*/
    	padding:0 60px 24px;
    	background: #293036;
    	/*text-align: center;*/
    	color:#fff;
    	box-sizing: border-box;
    }
    .header .body{
    	width: 100%;
    	padding-top: 24px;
    	margin-bottom: 12px;
    }
    .title .body_title{
    	font-size: 32px;
	    line-height: 32px;
	    margin-bottom: 12px;
    }
    .title .sub_title{
	    font-size: 14px;
	    line-height: 14px;
    }
    .ivu-menu.ivu-menu-light.ivu-menu-horizontal{
    	padding:0px 60px;
    }
    .ivu-menu.ivu-menu-light.ivu-menu-horizontal,.ivu-menu-item{
    	height: 50px;
    	line-height: 50px;
    }
    .title .btn{
    	width: 88px;
    	height: 32px;
    	text-align: center;
    	color: #fff;
    	/*padding: 0px 10px;*/
    	background-color: #20262B;
    	border: none;
    	font-size: 10px;
    }
    .title .btn:hover{
    	background-color:#000 ;
    }
    .layout-assistant>.btn{
    	margin-top: 10px;
    }
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 60px ;
    	background:#F2F2F4;
    	overflow: hidden;
    }
		.layout-content{
			overflow: hidden;
		}
    .ivu-menu-light{
    	z-index: -0;	
    }
</style>	
