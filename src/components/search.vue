<template>
  <div class="header">
        <header>
					<div class="title">
						搜索你想要的
					</div>
					<div class="sub_title">
						<Input v-model="keyword" style="width:60%">
							<Select v-model="select1" slot="prepend" style="width: 80px">
								<Option value="puzz">拼图</Option>
								<!--<Option value="user">用户</Option>-->
								<Option value="brand">品牌</Option>
							</Select>
							<Button slot="append" icon="ios-search" @click="search(keyword)"></Button>
						</Input>
					</div>
				</header>
				<main>
					<div class="layout-content">
						<Spin size="large" class="layz"></Spin>
						<div class="content_con"  v-if="flag" v-show="this.fenlei=='fenlei'">
							<h2>分类标签</h2>
							<Row >
								<!--<div v-on:click="getclassify()">
								<Col span="4"  class="classify" v-on:click="getclassify()">
					        	<p>椅子</p>
					        	<img src="../assets/img/yizi.png" style="" alt="" />
					       </Col>
					       </div>-->
					        <Col span="4" class="classify" v-for="(itemd , index) in item" @click.native="getclassify(itemd.id)">
										<p>{{itemd.name}}</p>
					        	<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
					        </Col>
					    </Row>
						</div>
						<div class="content_con2" v-if="!flag">
							<div>
							<h2>更多分类 <p style="float: right;cursor: pointer;" @click="flag=true">返回</p></h2>
								<Row >
									<div v-on:click="getclassify()">
									<Col span="4"  class="classify" v-on:click="getclassify()">
						        	<!--<p>椅子</p>-->
						        	<img src="../assets/img/yizi.png" style="" alt="" />
						       </Col>
						       </div>
						        <Col span="4" class="classify" v-for="(itemd , index) in secClass" @click.native="getSecList(itemd.pid)">
											<!--<p>{{itemd.name}}</p>-->
						        	<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
						        </Col>
						    </Row>
						  </div>
							<h2>搜索结果</h2>
							<div >
								<!--<Col span="3" style="background-color: #fff;position:relative;" class="con2" >
					        	<img src="../assets/logo.png" alt="" />
					        	<p>一只一只</p>
					        	<div class="hover">
					        		<Icon type="ios-star" class="show" @click="collectid()"></Icon>
					        	</div>
					       </Col>-->
						       <div class="dan">
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
							    </div>
							</div>
						</div>
						<!--<div v-for="item in item">

						</div>-->
					</div>
				</main>
	</div>
</template>

<script>

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
    }
  },
  created:function(){
	this.getsearch();
  },
  methods:{
  	getsearch:function() {
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
			this.jsonpRequest(this,"Type.GetAllType",params,function(res){
  					if(res){
								this.$set(this, 'item', res.data);
								this.item = res.body.data.list;
								console.log("item:"+this.item);
								console.log(res)
  					}
  		},function(err){
  			console.log(err);
  		});
  	},
  	search:function(res){
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
  					if(res){
  						this.searchi = res.body.data.list;
							console.log("search:"+this.searchi);
							console.log("search"+1111111111111111111111)
							console.log(res);
							console.log("search"+1111111111111111111111)
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
  					if(res){
								console.log(res);
								console.log("getlike:"+this.getlikeitem);
  					}
  		},function(err){
  			console.log(err);
  		});
		},
  	getclassify:function(id){
  		this.flag=false;
			var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,"pid":id
				}
			};
			this.jsonpRequest(this,"Type.GetTypeByPid",params,function(res){
  					if(res){
							this.secClass = res.body.data.list;
							console.log("secClass1111111111111111111111111111111111");
							console.log(res);
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
  					if(res){
  						self.$set(this, 'item', res.data);
							self.item = res.data;
							console.log("item:"+self.item);
							console.log(res)
  					}
  		},function(err){
  			console.log(err);
  		});
  	},
  }
 }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header header{
    	width: 100%;
    	height: 180px;
    	background: #293036;
    	text-align: center;
    	color:#fff;
    }
    .header .title{
    	padding-top: 48px;
	    font-size: 32px;
	    line-height: 32px;
    }
    .header .sub_title{
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
</style>
