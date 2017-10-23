<template>
  <div class="brand">
  	<Menu mode="horizontal"  active-name="15" style="background-color: #353F48;">
        <Menu-item name="15">
            <!--<Icon type="ios-paper"></Icon>-->
                        全部
        </Menu-item>
    </Menu>
    <div class="content_con2">
			<h2>我的拼图</h2>
			<div>
				<!--<Col span="6" style="background-color: #fff;position:relative;" class="con2">
				<img src="../../assets/logo.png" alt="" />
				<p>一只一只</p>
				</Col>
				<Col span="6" v-for="(itemd , index) in searchi" style="background-color: #fff;position:relative;" class="con2">
				<img :src="'http://www.shatuhome.com/material/'+item.filename" alt="" />
				<p>一只一只</p>
				</Col>-->
				<div class="conlist_show">
					<div class="conlist_con">
						<div class=""  v-for="item in getlikeitem">
						 			<div class="boxcon">
						 			<div class="pic">
						 				<img :src="'http://www.shatuhome.com/thumb/'+item.production.thumb"/>
						 				<div class="icon myedit">
							      	<Tooltip @click.native="edit(item.production.id)" content="编辑" placement="bottom">
								      	<Icon type="compose"></Icon>
							        </Tooltip>
						      	</div>
						      	<div class="icon del">
							      	<Tooltip content="删除" @click.native="deleteProduc(item.production.id)" placement="bottom">
								      	<Icon type="trash-b"></Icon>
							        </Tooltip>
						      	</div>
						      	<Dropdown trigger="click">
						      	<div class="icon menu">
							      	<Tooltip content="菜单" placement="bottom">
								      	<Icon type="android-more-vertical"></Icon>
							        </Tooltip>
						      	</div>
							      	<DropdownMenu slot="list">
							            <!--<DropdownItem>查看</DropdownItem>-->
							            <DropdownItem @click.native="moveToFolder()">移动到</DropdownItem>
							            <DropdownItem  @click.native="showDetail(item.production.id)">查看清单</DropdownItem>
							             <DropdownItem><a :href="'http://www.shatuhome.com/pdfdownload/'+item.production.id">导出为pdf</a></DropdownItem>
							            <DropdownItem v-show ="item.production.status == 0" @click.native = "setStatus(0,item.production.id)">设置为公开</DropdownItem>
							            <DropdownItem v-show ="item.production.status == 1" @click.native = "setStatus(1,item.production.id)">设置为不公开</DropdownItem>
							        </DropdownMenu>
						      	</Dropdown>
						 				<div class="modal" @click="modalS(item)"></div>
						 			</div>
						 			<div class="footer">
						 				<div class="borderbox">

							 				<span class="thumb">
									 			<!--<img src="../assets/logo.png"/>-->
									 			<p>{{item.userinfo.username | Username}}</p>
									 		</span>
							 				<div style="width: 15px;"></div>
							 				<div class="box-txt">
							 					<p>{{item.userinfo.username}}</p>
							 					<div style="height: 5px;"></div>
							 					<p>{{item.production.ctime | Time}}</p>
							 				</div>
							 				<ul>
						 						<!--<li><Icon type="heart"></Icon></li>-->
						 					</ul>
						 				</div>
						 			</div>
						 		</div>
						 		</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'brand',
  data () {
    return {
				getlikeitem:'',
    }
  },
  created:function(){
  	this.GetProductionByUserId();
		this.getlike();
  },
  components: {
  	
  },
  methods:{
  	getlike:function(){
  		//
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id"); 
  		var token = localStorage.getItem("token"); 
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
  		this.jsonpRequest(this,"Like.GetLike",params,function(res){
  				if(res.body.data.code==0){
							self.$set(self, 'getlikeitem', res.body.data.list);
								self.getlikeitem = res.body.data.list;
								console.log("toson111111111111111111")
								console.log(res);
								console.log("getlike:"+self.getlikeitem);
								console.log("toson111111111111111111")
					}else{
						console.log(res);
						if(res.body.ret==401){
							self.toLogin(this,401);
						}
					}
  		},function(err){
  			console.log(err);
  		});
//		var self = this;
//		var str = this.Encrypt();
//		var user_id = localStorage.getItem("user_id"); 
//		var token = localStorage.getItem("token"); 
//		var params = {
//				params:{
//					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
//				}
//			};
//		this.jsonpRequest(this,"Like.GetLike",params,function(res){
//					if(res.body.data.code==0){
//								self.$set(self, 'getlikeitem', res.body.data.list);
//								self.getlikeitem = res.body.data.list;
//					}else{
//							if(res.body.ret==401){
//								self.toLogin(this,401);
//							}
//					}
//		},function(err){
//			console.log(err);
//		});
		},
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
  			console.log(res);
  					if(res.body.data.code==0){
  						self.getlikeitem = res.body.data.list;
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  		});
  	},
		addCanvas(url,id){
			var imgurl = "http://www.shatuhome.com/material/"+url
			this.$emit("imgdata",{url:imgurl,id:id})
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content_con2{
			margin: 10px;
		}
		.content_con2 h2{
			height: 30px;
		}
		.con2{
			text-align: center;
			line-height:none;
			cursor: pointer;
		}
		.con2>img{
			max-width: 90%;
			max-height: 90%;
		}
		.con2>p{
			padding:5px 14px;
			font-size: 0.3em;
			margin: 0;
			width: 90%;
			/*height: 10%;*/
			line-height: 16px;
			/*margin-bottom: 15px;*/
			text-align: left;
			color: #000;
			z-index: 10;
		}
		.dan{
    	width: 122px;
    	height: 136px;
    	padding: 12px 12px 0px;
    	background-color: #fff;
    	border-radius: 5px;
    	position: relative;
    	margin: 10px;
    	/*margin-left: 60px;*/
    	cursor:pointer;
    	float: left;
    	overflow: hidden;
    }
    .dan:hover{
        box-shadow: 0 4px 12px rgba(6,31,50,.24);
   	 		-webkit-box-shadow: 0 4px 12px rgba(6,31,50,.24);
    }
    .img{
    	position: relative;
    	width: 100%;
    	height: 107px;
    }
    .img>img{
    	width: 100%;
    	height: 100%;
    }
    .modal{
    	position: absolute;
    	width: 100%;
    	height: 100%;
    	left:0;
    	top: 0;
    	display: none;
    	border-radius: 2px;
    	background-color: rgba(0,0,0,0.1);
    }
    .icon{
    	width: 40px;
    	height: 40px;
    	text-align: center;
    	line-height: 40px;
    	font-size: 20px;
    	color: #7E8E98;
    	background-color: #fff;
    	border-radius: 5px;
    	position: absolute;
    	top:10px;
    	right:10px;
    	display: none;
    	cursor: pointer;
    }
    .nam{
    	width: 100%;
    	line-height: 18px;
    }
    .price{
    	width: 100%;
    	display: none;
    	line-height: 18px;
    }
    .icon:hover{
    	color: #3B454C;
    }
    .ivu-menu-light{
    	z-index: -0;	
    }	
    /*滚动显示样式*/
   .conlist_show{
   		width: 100%;
   		overflow: hidden;
   		position: relative;
   		min-height: 732px;
   		padding-top: 20px;
   }
   .conlist_con {
		width: calc(100% + 20px);
		min-height: 570px;
		height: 100%;
		position: absolute;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	/*box 相关样式*/
	 .box{
    	padding:10px;
    	width: 272px;
    	float: left;
    	min-height: 224px;
    }
    .filebox{
    	height: 338px;
    	border-radius: 4px;
    	position: relative;
    	cursor: pointer;
    	/*overflow: hidden;*/
    }
    .filebox .fileboxcon{
    	position: absolute;
    	left: 0;
    	right: 0;
    	top: 0;
    	bottom: 0;
    	border-radius: 4px;
    	overflow: hidden;
    }
    .filebox h2{
    	position: absolute;
    	display: inline;
    	font-size: 32px;
    	top: 50%;
    	transform: translateY(-50%);
    	color: #fff;
    	margin-left: 10px;
    	z-index: 3;
    }
    .filebox .bg{
    	position: absolute;
    	left:0;
    	right:0;
    	bottom:0;
    	top:0;
    	z-index: 2;
    	background-color: rgba(134,156,170,.9);
    }
    .filebox .modal{
    	position:absolute;
    	left:0;
    	right:0;
    	top:0;
    	bottom: 0;
    	z-index: 2;
    	cursor: pointer;
    	background-color: rgba(0,0,0,.3);
    }
    .filebox img{
    	position: absolute;
    	z-index: 1;
    	left:50%;
    	top:50%;
    	transform: translate(-50%,-50%);
    	width: 100%;
    }
    .pic {
    	position: relative;
    	border: 1px solid #CCC;
    	box-shadow: 0 0 5px #ccc;
    	margin: 0;
    	padding: 0;
    	cursor: pointer;
    }

    .modal {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	background-color: rgba(0,0,0,.3);
    	display: none;
    }

    .pic img {
    	width: 100%;
    	height: auto;
    	margin: 0;
    	padding: 0;
    }

    .boxcon:hover {
    	box-shadow: 0px 0px 10px rgba(6, 31, 50, .24);
    	-webkit-box-shadow: 0px 0px 10px rgba(6, 31, 50, .24);
    }

    .boxcon .footer {
    	margin: 10px 0 0px 0px;
    /*padding: 10px;*/
    }
    .borderbox {
    	/*position: absolute;*/
    	/*width: calc(100% - 44px);*/

    	height: 100%;
    	display: flex;
    	align-items: center;
    }
    
    .boxcon {
    	background-color: #fff;
    	padding: 10px;
    	/*cursor: pointer;*/
    	/*margin: 15px 0 0 15px;*/
    	border-radius: 2px;
    	box-shadow: 0 0 5px rgba(6, 31, 50, .24);
    }
  .box-txt {
  	width: calc(100% - 20px);
  	/*width: 100%;*/
  	font-size: 14px;
  	color: #3b454c;
  	white-space: nowrap;
  	font-size: 14px;
    color: #3b454c;
    white-space: nowrap;
  }

  .box-txt>div {
  	display: flex;
  	align-items: center;
  	margin-bottom: 5px;

  }
  .box-txt p:first-of-type{
    overflow: hidden;
    height: 16px;
    line-height: 16px;
    text-overflow: ellipsis;
  }
  .box-txt p:last-of-type{
  	line-height: 12px;
    font-size: 12px;
    color: #b2c0c8;
  }
  .boxcon .footer .thumb {
  	display: inline-block;
  	width: 66px;
  	height: 32px;
  	border-radius: 50%;
  	/*background-color: ;*/
  }

  .boxcon .footer .thumb p{
  	text-align: center;
  	line-height: 35px;
  	font-size: 18px;
  	color: #fff;
  	font-weight: 500;
  }

  .boxcon .footer .thumb img {
  	width: 32px;
  	height: 32px;
  	border-radius: 50%;
  }

  .boxcon .footer ul {
  	display: block;
  	width: 100%;
    height: 100%;
  }

  .boxcon .footer ul li:first-child {
  	cursor: pointer;
  	font-size: 24px;
  	position: relative;
    top: 50%;
    vertical-align: top;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    /*background: #add8e6;*/
    display: inline-block;
    min-width: 20px;
    height: 20px;
    float: right;
  }
  .box-txt .ivu-icon{
  	cursor: pointer;
  }
  .box-txt .ivu-icon:hover{
  	color: red;
  }
</style>	
