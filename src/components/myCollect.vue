<template>
  <div class="header">
        <header>
			<div class="title">
				<Icon type="android-upload" style="color: #fff;"></Icon>&nbsp;我的收藏
			</div>
		</header>
				<Menu mode="horizontal" active-name="10">
		      <Menu-item name="10" class="my">全部</Menu-item>
        </Menu>
				<main>
					<div class="layout-content">
						    <!--<div class="dan" @click="modalS()">
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
							  <div class="dan" v-for="(item ,index) in getlikeitem" ref="abc"  >
						      <div class="img">
						      	<img :src="'http://www.shatuhome.com/material/'+item.filename" alt="" />
						      	<div class="modal" @click="modalS(item)"></div>
						      	<div class="icon"  @click="StoreLike(item.id)">
						      	<Tooltip content="收藏" placement="bottom">
							      	<Icon type="archive" ></Icon>
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
				</main>
				<modals v-if="this.modal=='modal'" :toson='toson'  @modal="getsonitem()"></modals>
		</div>
</template>

<script>
import modals from "../components/pages/Single" 

 export default {
  name: 'my',
  data () {
    return {
	   value13: '',
       select3: 'day',
       getlikeitem: '',
       modal:'',
       toson:'',
    }
  },
  created:function(){
	this.getlike();
  },
  mounted:function(){
	
  },
  components:{
  	modals
  },
  methods:{
  	//获取所有单品
  	getlike:function(){
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id"); 
  		var token = localStorage.getItem("token"); 
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
  		this.jsonpRequest(this,"Material.GetAllMaterial",params,function(res){
  					if(res){
								self.$set(self, 'getlikeitem', res.body.data.list);
								self.getlikeitem = res.body.data.list;
								console.log("toson111111111111111111")
								console.log(res);
								console.log("getlike:"+self.getlikeitem);
								console.log("toson111111111111111111")
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
		//enshrine end
			modalS:function(item){
				this.toson = item;
				this.modal="modal";
			},
			getsonitem:function(msg){
				this.modal=msg;
			},
  		},
 }

$(document).ready(function(){
	$(document).on("mouseover",".dan",function(){ 
			$(this).find(".modal").show();
			$(this).find(".icon").show();
			$(this).children(".nam").hide();
			$(this).children(".price").show();
	});
    $(document).on("mouseout",".dan",function(){
			$(this).find(".modal").hide();
			$(this).find(".icon").hide();
			$(this).children(".nam").show();
			$(this).children(".price").hide();
    });
});

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
    .my.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected{
    	z-index: 0;
    }
    .sub_title .grid{
    	width: 720px;
    	height: 64px;
    	border: 2px dashed #B2C0C8;
    	color: #B2C0C8;
    	font-size: 14px;
    	line-height: 64px;
    }
    .sub_title .grid:hover{
    	border: 2px dashed #fff;
    	color: #fff;
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
    .ivu-col.ivu-col-span-6.ivu-col-order-1{
    	/*background-color: #fff;*/
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
