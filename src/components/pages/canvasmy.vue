<template>
  <div class="canvasmy">
  	<Menu mode="horizontal"  active-name="15" style="background-color: #353F48;">
        <Menu-item name="15">
            <!--<Icon type="ios-paper"></Icon>-->
                        全部
        </Menu-item>
    </Menu>
    <div class="content_con2">
			<h2>单品</h2>
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
						 <div class="dan" v-for="(item ,index) in getlikeitem" ref="abc"  >
								      <div class="img" :style="'background-image: url(http://static.shatuhome.com/material/thumbNew/'+item.thumbNew+');background-position:center center;background-repeat:no-repeat;background-size:contain;'">
								      	<!--<img :src="'http://static.shatuhome.com/material/thumbNew/'+item.thumbNew" alt="" />-->
								      	<div class="modal" ></div>
								      	<div class="icon"  @click="addCanvas(item.filename,item.id)">
								      	<Tooltip content="添加" placement="bottom">
									      	<Icon type="android-exit"></Icon>
								        </Tooltip>
								      	</div>
								      </div>
								      <div class="nam">
								      	{{item.name}}
								      </div>
								      <div class="price" >
								      	￥{{item.price}}
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
  name: 'canvasmy',
  data () {
    return {
				getlikeitem:'',
    }
  },
  created:function(){
		this.getlike();
  },
  components: {
  	
  },
  mounted(){
  	if(this.$route.path=="/canvas"){
  		$(document).ready(function(){
					$(document).on("mouseover",".canvasmy .dan",function(){
							$(this).find(".modal").show();
							$(this).find(".icon").show();
					});
				    $(document).on("mouseout",".canvasmy .dan",function(){
							$(this).find(".modal").hide();
							$(this).find(".icon").hide();
				    });
				});
  	}
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
//		
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
    	width: 8vw;
    	/*height: 136px;*/
    	height: 9vw;
    	padding: 12px 12px 0px;
    	background-color: #fff;
    	border-radius: 5px;
    	position: relative;
    	margin: 5px;
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
    	height: 80%;
    	margin-bottom: 5px;
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
</style>	
