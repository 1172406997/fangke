<template>
  <div class="header">
        <header>
					<div class="title">
						尋找你的創作靈感
					</div>
					<div class="sub_title">
						瀏覽其他設計師的作品，分享你的設計傑作
					</div>
				</header>
				<main>
				<div class="layout-content">
					<div  class="left" style="width: 100%;">
						<div class="left_title" >
							拼圖精選
						</div>
						<!--瀑布流開始-->
						 <div class="body layout-content" style="">
						 	<div id="main">
						 		<div class="box" v-for ="item in bigs">
						 			<div class="boxcon">
								 			<div class="pic" @click="modalS(item)">
								 				<img :src="'http://static.shatuhome.com/thumb/'+item.production.thumb"/>
								 				<!--<div class="icon">
								      	<Tooltip content="收藏" placement="bottom">
									      	<Icon type="archive"></Icon>
								        </Tooltip>
								      	</div>-->
								 				<div class="modal"></div>
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
								 						<li class="show-icon">
								 							<Tooltip content="点赞" @click.native="addClick(event)" placement="bottom">
							      						<Icon type="heart"></Icon>
						       	 					</Tooltip>
								 						</li>
								 					</ul>
								 				</div>
								 			</div>
						 				</div>
						 		</div>
						 		
						 		
						 	</div>
						</div>
					</div>
					<div class="modal" v-show="this.modal=='modal'"></div>
					 <Back-top></Back-top>
				</div>
        <modals v-if="this.modalz=='modal'" :toson='toson'  @modal="getsonitem()"></modals >
				<div class="layout-copy">
					2011-2017 &copy; TalkingData
				</div>
				</main>
	</div>
</template>

<script scoped>
  import modals from "../components/pages/Single"

export default {
  name: 'content',
  data () {
    return {
			 bigs:[],
			 index:0,
			 defaul:true,
			 path:'',
        getlikeitem: '',
        modalz:'',
        toson:'',
    }
  },
  components: {
    modals
  },
  filters:{
  	Time(val){
  		console.log(typeof(val))
  		val = new Date(parseInt(val)*1000);
  		return val.format("yyyy-MM-dd hh:mm:ss");
		},
		Username(val){
			return val.substr(0,1);
		},
},
created: function() {},
	mounted: function() {
		this.falls();
		this.path = this.$route.path;
		this.movingPos();
		this.colorRand();
	},
	methods: {
		colorRand() {
			console.log(1111111111111111111111)
			console.log($("#main").find(".thumb"));
			var ranColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
			setTimeout(function () {
					$("#main").find(".thumb").each(function(){
						$(this).css("background", ranColor);
					})
			},500)
			
		},
		falls: function() {
			var self = this;
			var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'start':this.index,'num':30
				}
			};
			this.jsonpRequest(this,"Production.GetProductionLimit",params,function(res){
					if(res.body.data.code==0){
						var a = res;
						self.$set(self, 'bigs', res);
						self.bigs = res.body.data.list;
						console.log("bigs:"+self.bigs);
						console.log(res);
					}else{
						if(res.body.ret==401){
							self.toLogin(this,401);
						}
					}
			},function(err){
				console.log(err)
			})
		},
		//点击添加收藏
		enshrine:function(material_id){
			var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'material_id':material_id,
				}
			};
			this.jsonpRequest(this,"Like.DeleteLike",params,function(res){
					if(res.body.data.code==0){
						console.log(res)
						this.defaul = false;
						this.$Message.success("添加收藏成功！");
					}else{
						console.log(res);
						if(res.body.ret==401){
							self.toLogin(this,401);
						}
					}
			},function(err){
				console.log(err)
			})
		},
		//点击删除收藏
		unenshrine:function(material_id){
			var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'material_id':material_id,
				}
			};
			this.jsonpRequest(this,"Like.DeleteLike",params,function(res){
					if(res.body.data.code==0){
						console.log(res)
						this.defaul = true;
						this.$Message.info('删除成功！');
					}else{
						console.log(res);
						if(res.body.ret==401){
							self.toLogin(this,401);
						}
					}
			},function(err){
				console.log(err)
			})
		},
		//点击通过作品id获取用户信息
		GetProductionById:function(production_id){
			var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'production_id':production_id,
				}
			};
			this.jsonpRequest(this,"GetProductionById",params,function(res){
				if(res.body.data.code==0){
						console.log(res)
					}else{
						console.log(res);
						if(res.body.ret==401){
							self.toLogin(this,401);
						}
					}
			},function(err){
				console.log(err)
			})
		},
		//模态框
		modal:function(){
			$(".water").append("<div class='modal'></div>");
			console.log("modal");
//			$(".modal").
		},
		checkScrollSlide(){
				var self = this;
				 if(this.$route.name=='content'){
				var oParent=document.getElementById('main');
        var oBoxs=self.getByClass(oParent,'box');
        var lastBoxH=oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
        var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        var height=document.body.clientHeight || document.documentElement.clientHeight;
        return (lastBoxH<scrollTop+height)?true:false;
       }else{
       		return
       }
		},
		movingPos(){
			var self = this;
			setTimeout(function () {
          $("#main").children(".box").each(function (index, val) {
                 var $this = $(this);
									var $img = $this.find("img").first();
									$img.on("load", function () {
							        //将main下的所有class为box的元素取出来
							        var oParent=document.getElementById('main');
							        var oBoxs=self.getByClass(oParent,'box');
							        //计算整个页面的显示雷氏（页面/box的宽）
							        var oBoxW=$this[0].offsetWidth;
											var winW = oParent.offsetWidth;
							        var cols=Math.floor(winW/oBoxW);
							        //console.log(cols);
							        //设置main的宽
							//      oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
							        var hArr=[];//存放每一列高度
							        for(var i=0;i<oBoxs.length;i++){
							            if(i<cols){
							                hArr.push(oBoxs[i].offsetHeight);
							            }
							            else{
							                var minH=Math.min.apply(null,hArr);
							                var index=self.getMinhIndex(hArr,minH);
							                oBoxs[i].style.position="absolute";
							                oBoxs[i].style.top=minH+'px';
							                oBoxs[i].style.left=oBoxW*index+'px';
							                hArr[index]+=oBoxs[i].offsetHeight;
							            }
							        }
									});
          	})
			}, 0);   
		},
		getByClass(parent,clsName){
    	if(this.$route.name == 'content'){
    		 var boxArr=new Array(),//用来存储获取到的所有class为Box的元素
        	oElements=parent.getElementsByTagName('*');
        	console.log("boxarr")
	        for(var i=0;i<oElements.length;i++){
	            if (oElements[i].className==clsName) {
	                boxArr.push(oElements[i]);
	            }
	        }
	        return boxArr;
    	}else{
    		return;
    	}
    },
    getMinhIndex(arr,val){
        for(var i in arr){
            if(arr[i]==val){
                return i;
            }
        }
    },
    modalS:function(item){
        this.toson = item;
      this.modalz="modal";
    },
    getsonitem:function(msg){
      this.modalz=msg;
    },
    addClick(){
//  	console.log();
			if($(event.srcElement).hasClass('pink')){
				$(event.srcElement).removeClass("pink")
			}else{
				$(event.srcElement).addClass("pink")
			}
			
//  	$(".box").each(function(){
//  		$(this).find(".ivu-icon").addClass("pink");
//  	})
//  	$(".show-icon").find(".ivu-icon").addClass("pink");
    },
	}
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
    .header .sub_title {
    	padding-top: 20px;
    	font-size: 14px;
    	line-height: 14px;
    }

    .body {
    	overflow: auto;
    	height: 1000px;
    	margin: 0;
    	padding: 0;
    }

    #main {
    	width: 100%;
    	position: relative;
    }

    .box{
    	padding:10px;
    	width: 340px;
    	float: left;
    }
    .pic {
    	position: relative;
    	border: 1px solid #CCC;
    	box-shadow: 0 0 5px #ccc;
    	margin: 0;
    	padding: 0;
    }

    .modal {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	/*background-color: rgba(0,0,0,.3);*/
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
    	cursor: pointer;
    	display: flex;
    	align-items: center;
    }
    .boxcon {
    	padding: 10px;
    	cursor: pointer;
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
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 50px ;
    	background:#F2F2F4;
    	overflow: hidden;
    }
		huantaipingyang-content{
			min-height:900px;
		}
    .layout-content .left {
    	float: left;
    	margin-bottom: 10px;
    }
    .layout-content .right{
    	float: left;
    	overflow: hidden;
    	margin-bottom: 10px;
    }
    .layout-content .left_title{
    	font-size: 24px;
    	color: #7e8e98;
    	line-height: 72px;

    }
    .layout-content .right_title{
    	font-size: 24px;
    	color: #7e8e98;
    	line-height: 72px;

    }
    .layout-content .right_title span{
    	font-size: 12px;float:right;cursor: pointer;
    }
    .layout-content .right_title span:hover{
    	color:#3C464D ;
    }
    /*//瀑布流*/
    .vue-waterfall-slot{
     	border:5px solid #F2F2F4;
    }
     .left .water{

    	padding: 18px 18px 0px 18px ;
    	width: 30%;
    	margin: 0;
    	/*border: 1px solid #;*/
    	box-shadow: 0px 1px 4px rgba(6,31,50,.12);
    	background-color: #fff;
    	cursor: pointer;
    }
    .water:hover{
    	box-shadow: 0px 12px 12px rgba(6,31,50,.24);
    	-webkit-box-shadow:0px 12px 12px rgba(6,31,50,.24);
    }
    .water>img{
    	width: 100%;
    	margin: 0;
    	padding: 0;
    }
    .water .text {
    	line-height: 16px;
    }
    .water .waterfot{
    	width: 100%;
    	height: 56px;
    	display: flex;
    	align-items: center;
    	position: relative;
    }
    .waterfot>img{
    	width: 40px;
    	height: 40px;
    	margin-right: 10px;
    	border-radius: 50%;
    	border: none;
    }
    .water .waterfot .icon {
    	/*align-self: stretch;*/
    	position: absolute;
    	top:30px;
    	right: 30px;
    	font-size:18px;
    	line-height: 0px;
    	/*margin-bottom: 50%;*/
    }
    .water .waterfot .title{
    	    font-size: 14px;
    			color: #3b454c;
    			white-space:nowrap;
    			line-height: 14px;
    }
    /*.modal{
    	position: absolute;
    	top:40px;
    	left:0px;
    	right:0px;
    	bottom:0px;
    	z-index: 5;
    	background-color: rgba(0,0,0,0.7);
    }*/
    /*end*/
    .layout-copy{
    	text-align: center;
    }
    .ivu-menu-light{
    	z-index: -0;
    }
    .ivu-icon{
    	color: #999;
    }
    .show-icon .ivu-icon.pink{
    	color: #FF556A;
    }
    /*.show-icon .ivu-icon-heart:before {
    	color: #FF556A;
    }*/
</style>
