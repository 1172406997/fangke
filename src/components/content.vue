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
						 			<div class="boxcon">
						 			<div class="pic">
						 				<img src="../img/1.png"/>
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
						 		</div>
						 	</div>
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
//	 window.onscroll=function(){this.menu};
// window.addEventListener("scroll", this.menu);
// window.onload=function(){ 
    this.Load();
// }
  
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
		//瀑布流相关事件
		Load(){
			var self = this;
        self.waterfall('main','box');  
        var dataInt={"data":[{"src":'1.png'},{"src":'2.png'},{"src":'3.jpg'},{"src":'4.jpg'}]}  
        //滚动添加  
        window.onscroll=function(){  
            if(self.checkScrollSlide()){  
                var oParent=document.getElementById('main')  
                //将数据库渲染到当前页面的尾部  
//              for(var i=0;i<dataInt.data.length;i++){  
//                  var oBox=document.createElement('div');  
//                  oBox.className='box';  
//                  oParent.appendChild(oBox);  
//                  var oPic=document.createElement('div');  
//                  oPic.className='pic';  
//                  oBox.appendChild(oPic);  
//                  var oImg=document.createElement('img');  
//                  oImg.src="img/"+dataInt.data[i].src;  
//                  oPic.appendChild(oImg);  
//										var box = `<div class="box" ><div class="boxcon"><div class="pic"><img src="${'/static/img/1.d80e543.d80e543.png'}"/><div class="modal"></div></div><div class="footer"><div class="borderbox"><span class="thumb"><img src="${'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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'}"/></span><div style="width: 15px;"></div><div class="box-txt"><p>用户名</p><div style="height: 5px;"></div><p>介绍</p></div><ul><li><Icon type="heart"></Icon></li></ul></div></div></div>`
//						 			$("#main").append(box);
//              }  
                self.waterfall('main','box');  
            }  
        }  
		},
		waterfall(parent,box){  
			var self = this;
        //将main下的所有class为box的元素取出来  
        var oParent=document.getElementById(parent);  
        var oBoxs=self.getByClass(oParent,box);  
        //计算整个页面的显示雷氏（页面/box的宽）  
        var oBoxW=oBoxs[0].offsetWidth;  
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
    },
    getByClass(parent,clsName){  
        var boxArr=new Array(),//用来存储获取到的所有class为Box的元素  
            oElements=parent.getElementsByTagName('*');  
        for(var i=0;i<oElements.length;i++){  
            if (oElements[i].className==clsName) {  
                boxArr.push(oElements[i]);  
            }  
        }  
        return boxArr;  
    },
    getMinhIndex(arr,val){  
        for(var i in arr){  
            if(arr[i]==val){  
                return i;  
            }  
        }  
  
    },
		checkScrollSlide(){
				var self = this;
				var oParent=document.getElementById('main');  
        var oBoxs=self.getByClass(oParent,'box');  
        var lastBoxH=oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);  
        var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;  
        var height=document.body.clientHeight || document.documentElement.clientHeight;  
        return (lastBoxH<scrollTop+height)?true:false;  
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
    	width: 30%;
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
    .water .waterfot .footer{
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
    .ivu-icon{
    	color: #999;
    }
</style>	
