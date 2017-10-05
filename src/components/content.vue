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
						 		<div class="box" >
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
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
							 					<img src="../assets/logo.png"/>
							 				</span>
							 				<div style="width: 15px;"></div>
							 				<div class="box-txt">
							 					<p>用户名</p>
							 					<div style="height: 5px;"></div>
							 					<p>介绍</p>
							 				</div>
							 				<ul>
						 						<li><Icon type="heart"></Icon></li>
						 					</ul>
						 				</div>
						 				
						 			</div>
						 		</div>
						 		<div class="box">
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
						 			</div>
						 		</div>
						 		<div class="box">
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
						 			</div>
						 		</div>
						 		<div class="box">
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
						 			</div>
						 		</div>
						 		<div class="box">
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
						 			</div>
						 		</div>
						 		<div class="box">
						 			<div class="pic">
						 				<img src="../../dist/static/img/1.d80e543.png"/>
						 			</div>
						 		</div>
						 	</div>
						 	<!--<div class="water">-->
							   		<!--<img src="../img/1.png" alt="" />
							   		<div class="waterfot">
							   			<img src="../img/2.png" alt="" style="float:left;"/><div class="text" style="float:left;">
							   				<span class="title">我叫大白</span><br/>
							   				<span class="footer">幾隻點贊</span>
							   			</div>
							   			<div class="icon">
							   				<Icon type="ios-heart-outline" v-if=""></Icon>
							   			</div>
							   		</div>
							   </div>-->
							<!--<waterfall 
							  :watch="bigs"
							  :line-gap="280"
							  :min-line-gap="200"
							  :max-line-gap="220"
							   >
								精彩马上出现
						   <div class="water">
							   		<img src="../img/1.png" alt="" />
							   		<div class="waterfot">
							   			<img src="../img/2.png" alt="" style="float:left;"/><div class="text" style="float:left;">
							   				<span class="title">我叫大白</span><br/>
							   				<span class="footer">幾隻點贊</span>
							   			</div>
							   			<div class="icon">
							   				<Icon type="ios-heart-outline" v-if=""></Icon>
							   			</div>
							   		</div>
							   </div>
							   
						  <waterfall-slot
						    v-for="(item ,index) in bigs"
						    width="280"
						    height="280"
						    :key="item.production.id"
						  >
							   <div class="water">
							   		<img :src="'http://www.shatuhome.com/thumb/'+item.production.thumb" alt="" />
							   		<div @click="modal()">{{item.production.thumb}}</div>
							   		<div class="waterfot">
							   			<img v-bind:src="'http://www.shatuhome.com/avatar/'+item.production.avatar==''?'../img/2.png':item.production.avatar" alt="" style="float:left;"  />
							   			<div class="text" style="float:left;">
							   				<span class="title">{{item.production.name}}</span><br/>
							   				<span class="title">{{item.production.id}}-{{index}}</span><br/>
							   				<span class="footer">点击查看点赞人数</span>
							   			</div>
							   			<div class="icon" @click="enshrine(item.production.id)">
							   				<Icon type="ios-heart-outline" v-if="defaul" ></Icon>
							   			</div>
							   			<div class="icon" @click="unenshrine()">
							   				<Icon type="ios-heart-outline" v-if="!defaul" style="color: red;" @click="this.defaul=true"></Icon>
							   			</div>
							   		</div>
							   </div>
						  </waterfall-slot>
						</waterfall>-->
						</div>
					</div>
					<div class="modal" v-show="this.modal=='modal'"></div>
					 <Back-top></Back-top>
				</div>
				<div class="layout-copy">
					2011-2017 &copy; TalkingData
				</div>
				</main>
	</div>
</template>

<script scoped>

import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'content',
  data () {
    return {
			 bigs:[],
			 index:0,
			 defaul:true,
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
  created:function(){
	  		this.falls();
	},
	mounted:function(){
	 window.onscroll=function(){this.menu};
   window.addEventListener("scroll", this.menu);
   console.log(window.addEventListener);
},
	methods:{
		//瀑布流获取作品信息
		falls:function(){
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
					var a = res;
					self.$set(self, 'bigs', res);
					self.bigs = res.body.data.list;
					console.log("bigs:"+self.bigs);
					console.log(res);
			},function(err){
				console.log(err)
			})
		},
		//滚动监听事件
		menu:function(){
			console.log(1);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop|| window.pageY0ffset
        if (scrollTop + window.innerHeight >= document.body.clientHeight) {
          this.index = this.index++;
          this.falls();
          console.log(this.index);
        }
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
					console.log(res)
					this.defaul = false;
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
					console.log(res)
					this.defaul = true;
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
					console.log(res)
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
    .header .sub_title{
    	padding-top: 20px;
	    font-size: 14px;
	    line-height: 14px;
    }
     .body{  
        overflow: scroll;  
        height: 1000px;  
    }  
        #main{  
            position: relative;  
        }  
        .pic{  
        		position: relative;
            border:1px solid #CCC;  
            box-shadow: 0 0 5px #ccc;  
            margin: 0;
            padding: 0;
        }  
        .modal{
        	position:absolute;
        	top:0;
        	left:0;
        	bottom:0;
        	right:0;
        	/*background-color: rgba(0,0,0,.3);*/
        }
        .pic img{  
            width: 100%;  
            height: auto;  
            margin: 0;
            padding: 0;
        }  
      .box:hover{
    	box-shadow: 0px 0px 7px rgba(6,31,50,.24);
    	-webkit-box-shadow:0px 0px 7px rgba(6,31,50,.24);
    }
    .box .footer{
    	margin:10px 0 0px 0px;
    	/*padding: 10px;*/
    }
    .borderbox{
    	/*position: absolute;*/
	    /*width: calc(100% - 44px);*/
	    height: 100%;
	    cursor: pointer;
	    display: flex;
	    align-items: center;
	}
	.box{  
            padding: 10px;  
            float: left;  
            width: 30%;
            cursor: pointer;
            margin:15px 0 0 15px;
            border-radius: 2px;  
            box-shadow: 0 0 5px #ccc;
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
  
  .box .footer .thumb img {
  	width: 32px;
  	height: 32px;
  	border-radius: 50%;
  }
  
  .box .footer ul {
  	display: block;
  	width: 100%;
    height: 100%;
  }
  
  .box .footer ul li:first-child {
  	cursor: pointer;
  	font-size: 24px;
  	position: relative;
    top: 50%;
    vertical-align: top;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background: #add8e6;
    display: inline-block;
    min-width: 20px;
    height: 20px;
    float: right;
  }
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 60px ;
    	background:#F2F2F4;
    	overflow: hidden;
    }
		.layout-content{
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
    .water .waterfot .footer{`
    	    line-height: 12px;
    			font-size: 12px;
    			color: #b2c0c8;
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
</style>	
