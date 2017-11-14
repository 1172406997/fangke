<template>
  <div class="search">
        <header>
					<div class="title">
						搜索你想要的
					</div>
					<div class="sub_title">
						<Input v-model="keyword" style="width:60%">
							<Select v-model="select1" slot="prepend" style="width: 80px">
								<Option value="puzz">单品</Option>
								<!--<Option value="user">用户</Option>-->
								<!--<Option value="brand">品牌</Option>-->
							</Select>
							<Button slot="append" icon="ios-search" @click="search(keyword)"></Button>
						</Input>
					</div>
				</header>
				<main>
					<div class="layout-content">
						<Spin size="large" class="layz"></Spin>
						<div class="content_con"  v-if="flag" style="padding-bottom: 20px;">
							<Row >
								<h2  style="margin-bottom: 2em;">分类标签</h2>
								<!--<div v-on:click="getclassify()">
								<Col span="4"  class="classify" v-on:click="getclassify()">
					        	<p>椅子</p>
					        	<img src="../assets/img/yizi.png" style="" alt="" />
					       </Col>
					       </div>-->
					       <div class="searchclassfy" v-for="(itemd , index) in item" @click="getclassify(itemd.id)">
					       		<img :src="'http://static.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
					       </div>
					        <!--<Col span="4" class="classify" v-for="(itemd , index) in item" @click.native="getclassify(itemd.id)">
					        	<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
					        </Col>-->
					    </Row>
						</div>
						<div class="content_con2" v-if="!flag">
							<div v-show="fenlei=='fenlei'">
							<h2 >更多分类 <p style="float: right;cursor: pointer;" @click="backKeyWord()">返回</p></h2>
								<Row >
									<div v-on:click="getclassify()">
									<!--<Col span="4"  class="classify" v-on:click="getclassify()">-->
						        	<!--<p>椅子</p>-->
						        	<!--<img src="../assets/img/yizi.png" style="" alt="" />-->
						       <!--</Col>-->
						       </div>
						       <div class="searchclassfy" v-for="(itemd , index) in secClass" @click="getByTermal(itemd.id)">
					       			<img :src="'http://static.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
					       		</div>
						    </Row>
						  	</div>
						  	<div >
							<h2>搜索结果<p style="float: right;cursor: pointer;" @click="backKeyWord()">返回</p></h2>
								<div >
							       <!--<div class="dan">
								      <div class="img">
								      	<img src="../assets/img/meijian.png" alt="" />
								      	<div class="modal" style="display: none;"></div>
								        <div class="icon">
								      	<Tooltip content="收藏" placement="bottom">
									      	<Icon type="archive" @click="StoreLike()"></Icon>
								        </Tooltip>
								      	</div>
								      </div>
								      <div class="nam">
								      	我叫小明
								      </div>
								      <div class="price" style="display: none;">
								      	圆圆圆
								      </div>
								    </div>-->
										<div class="dan" @click="listenClick(item.id)" v-for="item in searchi">
								      <div class="img"  :style="'background-image: url(http://static.shatuhome.com/material/thumbNew/'+item.thumbNew+');background-position:center center;background-repeat:no-repeat;background-size:contain;'">
								      	<img src="" alt="" />
								      	<div class="modal" @click="modalS(item)" style="display: none;"></div>
								        <div class="icon">
								      	<Tooltip content="收藏" style="z-index: 10;" placement="bottom">
									      	<Icon type="archive" @click.native="StoreLike(item.id)"></Icon>
								        </Tooltip>
								      	</div>
								      </div>
								      <div class="nam">
								      	{{item.name}}
								      </div>
								      <div class="price" style="display: none;">
								      	{{item.price}}￥
								      </div>
								    </div>
								</div>
							</div>
							
							
						</div>
						<modals v-if="this.modalz=='modal'" :toson='toson'  @modal="getsonitem()"></modals >
						<BackTop :height="100" :bottom="50">
		        </BackTop>
					</div>
				</main>
				<div class="ifyBUtton" style="padding:10px 24px">
					<h2>风格标签</h2>
					<div class="btncon" style="margin-top: 20px;">
						<div class="btnconlist">
							<button style=" background-color: #3fb5be;">北欧</button>
							<button style=" background-color: #3a9294;">后现代</button>
							<button style=" background-color: #44928e;">美式</button>
							<button style=" background-color: #378480;">简美</button>
						<!--</div>
						<div class="btnconlist">-->
							<button style=" background-color: #3fb5be;">美式田园</button>
							<button style=" background-color: #3a9294;">港式</button>
							<button style=" background-color: #44928e;">现代简约</button>
							<button style=" background-color: #378480;">地中海</button>
						<!--</div>
						<div class="btnconlist">-->
							<button style=" background-color: #3fb5be;">巴洛克</button>
							<button style=" background-color: #3a9294;">古典欧式</button>
							<button style=" background-color: #44928e;">新古典</button>
							<button style=" background-color: #378480;">简欧</button>
						<!--</div>
						<div class="btnconlist">-->
							<button style=" background-color: #3fb5be;">普罗旺斯</button>
							<button style=" background-color: #3a9294;">洛可可</button>
							<button style=" background-color: #44928e;">摩洛哥</button>
							<button style=" background-color: #378480;">明清</button>
						<!--</div>
						<div class="btnconlist">-->
							<button style=" background-color: #3fb5be;">普罗旺斯</button>
							<button style=" background-color: #3a9294;">洛可可</button>
							<button style=" background-color: #44928e;">摩洛哥</button>
							<button style=" background-color: #378480;">明清</button>
							
							
							<button style=" background-color: #3fb5be;">新中式</button>
							<button style=" background-color: #3a9294;">东南亚</button>
							<button style=" background-color: #44928e;">Loft</button>
							<button style=" background-color: #378480;">泰式</button>
							
							<button style=" background-color: #3fb5be;">法式古典</button>
							<button style=" background-color: #3a9294;">简法</button>
							<button style=" background-color: #44928e;">日韩</button>
						</div>
					</div>
				</div>
				<!--<BackTop :height="100" :bottom="200">
        	<div class="backtop">
        		<Icon type="ios-arrow-up"></Icon>
        	</div>
    		</BackTop>-->
	</div>
</template>

<script>
  import modals from "../components/pages/Matral"
  
export default {
  name: 'search',
  data () {
    return {
//			 value11: '',
       select1: 'puzz',
       //选项
       item:{},
       //获取到的搜索all信息放入这里
       searchi:{},
       //获取到的搜索信息
       keyword:'',
       //搜索关键字
       flag:true,
       //显示隐藏
       fenlei:'fenlei',
       //二级分类
       secClass:'',
       fasClass:'',
       keyWord:'',
       modalz:'',
    }
  },
  components: {
    modals
  },
  created:function(){
	this.getsearch();
  },
  mounted(){
  	if(this.$route.path=='/search'){
    		$(document).ready(function(){
					$(document).on("mouseover",".search .dan",function(){
							$(this).find(".modal").show();
							$(this).find(".icon").show();
							$(this).children(".nam").hide();
							$(this).children(".price").show();
					});
				    $(document).on("mouseout",".search .dan",function(){
							$(this).find(".modal").hide();
							$(this).find(".icon").hide();
							$(this).children(".nam").show();
							$(this).children(".price").hide();
				    });
				});
    	}
  },
  methods:{
  	backKeyWord(){
  		this.flag=true;
  		this.fasClass = '';
  	},
  	getsearch:function() {
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
			this.jsonpRequest(this,"Type.GetAllType",params,function(res){
  					if(res.body.data.code==0){
								this.$set(this, 'item', res.data);
								this.item = res.body.data.list;
								console.log("item:"+this.item);
								console.log(res)
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
  	search:function(res){
  		var self = this;
  		if(this.fasClass!=''){
  			this.secSearch(res);
  		}else{
  			this.fenlei = false;
  			this.flag=false;
  			var str = this.Encrypt();
  			var user_id = localStorage.getItem("user_id");
  			var token = localStorage.getItem("token");
  			var params = {
						params:{
							'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,"keyword":res
						}
					};
					this.jsonpRequest(this,"Material.GetMaterialByKeyWord",params,function(res){
		  					if(res.body.data.code==0){
		  						this.searchi = res.body.data.list;
									console.log("search:"+this.searchi);
									console.log("search"+1111111111111111111111)
									console.log(res);
									console.log("search"+1111111111111111111111)
		  					}else{
									console.log(res);
									if(res.body.ret==401){
										self.toLogin(this,401);
									}
								}
		  		},function(err){
		  			console.log(err);
		  		});
  		}
  	},
  	secSearch(res){
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		this.fenlei = 'fenlei';
  			this.flag=false;
  			var params = {
						params:{
							'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,"keyword":res,'type_id':self.fasClass
						}
					};
					this.jsonpRequest(this,"Material.GetMaterialByKeyWordAndTypeId",params,function(res){
		  					if(res.body.data.code==0){
		  						this.searchi = res.body.data.list;
									console.log("search:"+this.searchi);
									console.log("search"+1111111111111111111111)
									console.log(res);
									console.log("search"+1111111111111111111111)
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
  	StoreLike:function(material_id) {
			var self = this;
			var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
			var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'material_id':material_id
				}
			};
			this.jsonpRequest(this,"Like.StoreLike",params,function(res){
  					if(res.body.data.code==0){
								console.log(res);
								console.log("getlike:"+this.getlikeitem);
								self.$Message.success("收藏成功！");
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  			self.$Message.error("网络问题，请重试！");
  		});
		},
  	getclassify:function(id){
  		var self = this;
  		this.flag=false;
  		this.fenlei = 'fenlei';
  		this.fasClass = id;
			var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
			params:{
				'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,"pid":id
			}
		};
		this.jsonpRequest(this,"Type.GetTypeByPid",params,function(res){
  					if(res.body.data.code==0){
							this.secClass = res.body.data.list;
//							console.log("secClass1111111111111111111111111111111111");
							console.log(res);
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  		});
  		this.getByTermal(id);
  	},
  	getByTermal(id){
  		var self = this;
  		this.flag=false;
  		this.fenlei = 'fenlei';
  		this.fasClass = id;
			var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var Material = {
			params:{
				'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,"type_id":id
			}
			};
  		this.jsonpRequest(this,"Material.GetMaterial",Material,function(res){
  					if(res.body.data.code==0){
						console.log("GetMaterial1111111111111111111111111111111111");
						self.searchi = res.body.data.list;
						console.log(res);
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
  	over:function(el){
		var hover = document.getElemntsByClassName("hover");
		alert(hover);
  	},
  	collectid:function(){
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'keyword':this.keyword
				}
			};
			this.jsonpRequest(this,"Material.GetMaterialByKeyWord",params,function(res){
  					if(res.body.data.code==0){
  						self.$set(this, 'item', res.data);
							self.item = res.data;
							console.log("item:"+self.item);
							console.log(res)
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
  	listenClick(material_id){
  		var self = this;
			var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
			var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'material_id':material_id
				}
			};
			this.jsonpRequest(this,"Like.Click",params,function(res){
  					if(res.body.data.code==0){
//								console.log(res);
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  			self.$Message.error("网络问题，请重试！");
  		});
  	},
  	modalS:function(item){
        this.toson = item;
      this.modalz="modal";
    },
    getsonitem:function(msg){
      this.modalz=msg;
    },
  }
 }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search header{
    	width: 100%;
    	height: 180px;
    	background: #293036;
    	text-align: center;
    	color:#fff;
    }
    .search .title{
    	padding-top: 48px;
	    font-size: 32px;
	    line-height: 32px;
    }
    .search .sub_title{
    	padding-top: 20px;
	    font-size: 14px;
	    line-height: 14px;
			display: flex;
			justify-content: center;
    }
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 24px 40px;
    	background:#F2F2F4;
    	overflow: hidden;
    }
		.layout-content{
			overflow: hidden;
		}
		 div.layout main{
			line-height:1.5em;
		}
		main h2{
			line-height: 48px;
		}

		.classify>p{
			position:absolute;
			display: inline;
			/*width: auto;*/
			/*height: 17px;*/
			top: 10px;
			left: 10px;
			font-size: 16px;
			z-index: 1;
		}
		.layout-content{
			position: relative;
		}
		.layz{
			position: absolute;
			top:0px;
			left:50%;
			display: none;
		}
		.con-content2{
			padding: 0 24px;
		}
		.con2{
			text-align: center;
			line-height:none;
			cursor: pointer;
		}
		.classify{
			background-color: #fff;
			position:relative;
			height: 124px;
			margin: 5px;
			cursor: pointer;
			border-radius: 2px;
		}
		.classify:hover{
			box-shadow: 2px 2px 5px #888888;;
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
		.con2 .show{
			display: block;
			position: absolute;
			top:10px;
			font-size: 1.5em;
			right:10px;
			width: 30px;
			height: 30px;
			line-height: 30px;
			background-color: #fff;
			z-index: 2;
		}
		.con2 .hover{
			position: absolute;
			left: 0;
			top:0;
			width: 100%;
			height: 100%;
			display: none;
			/*margin: 0 auto;*/
			background-color: rgba(0,0,0,.1);
		}
    .classify>img{
    	position:absolute;
    	width: 100%;
    	height: 100%;
			right: 0px;
			border-radius: 2px;
			z-index: 0;
			bottom: 0px;
    }
    .ivu-menu-light{
    	z-index: -0;
    }
    .dan{
    	width: 203px;
    	height: 227px;
    	padding: 12px 12px 0px;
    	background-color: #fff;
    	border-radius: 5px;
    	position: relative;
    	margin: 10px;
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
    	width: 179px;
    	height: 179px;
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
    	line-height: 36px;
    }
    .price{
    	width: 100%;
    	display: none;
    	line-height: 36px;
    }
    .icon:hover{
    	color: #3B454C;
    }
    .ivu-menu-light{
    	z-index: -0;
    }
    
    /*搜索样式*/
   .searchclassfy{
   	position: relative;
   	/*width:223px;*/
   	/*height: 148px;*/
   	width: 12vw;
   	height: 8.2vw;
   	border-radius: 10px;
   	margin: 5px;
		cursor: pointer;
		float: left;
   }
   .searchclassfy img{
   	position: absolute;
   	left: 0;
   	top: 0;
   	width: 100%;
   	height: 100%;
   	border-radius: 5px;
   }
   .searchclassfy:hover{
			box-shadow: 2px 2px 5px #888888;;
		}
		.btnconlist{
			/*float: left;*/
			display: inline-block;
			margin-bottom: 10px;
		}
		.btnconlist button{
			margin-bottom: 10px;
			height: 34px;
			border-radius: 5px;
			line-height: 34px;
			text-align: center;
			/*background-color: #3a9294;*/
			color: #fff;font-size:14px;
			padding:0 20px;
			border: none;
			margin-right: 20px;
		}
		/*返回上层*/
		.backtop{
   	width: 40px;
   	height: 40px;
   	background-color: #a6a6a6;
   	color: #fff;
   	text-align: center;
   	line-height: 40px;
   	border-radius: 50%;
   }
   .backtop .ivu-icon{
   	color: #fff;
   	font-weight: 600;
   }
</style>
