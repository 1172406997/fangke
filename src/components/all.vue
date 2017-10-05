<template>
  <div class="all">
					<div class="wat">
						<waterfall 
							  :watch="all"
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
						    v-for="(item ,index) in all"
						    width="280"
						    height="280"
						    :key="item.id"
						  >
							   <div class="water">
							   		<img :src="item.production.thumb==''?'../img/1.png':item.production.avatar" alt="" />
							   		<div >{{item.production.thumb}}</div>
							   		<div class="waterfot">
							   			<img v-bind:src="item.production.avatar==''?'../img/2.png':item.production.avatar" alt="" style="float:left;"  />
							   			<div class="text" style="float:left;">
							   				<span class="title">{{item.production.name}}</span><br/>
							   				<span class="title">{{item.production.id}}-{{index}}</span><br/>
							   				<span class="footer">点击查看点赞人数</span>
							   			</div>
							   		</div>
							   </div>
							   <!--<div class="item" :style="item.style" :index="item.index"></div>-->
						  </waterfall-slot>
						</waterfall>
					</div>
	</div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'content',
  data () {
    return {
				all:[],
    }
  },
   components: {
    Waterfall,
    WaterfallSlot
  },
  created:function(){
	  		this.project();
	},
	methods:{
		//通过用户id获取作品信息
		project:function(){
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
  						self.$set(self,'all',res.body.data.list)
  						self.getlikeitem = res.body.data.list;
  						console.log(res);
  					}
  		},function(err){
  			console.log("err");
  		});
		},
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	
    /*頭部*/
    .all{
    	width: 100%;
    	padding:0 60px ;
    	background:#F2F2F4;
    	overflow: hidden;
    }
    .ivu-menu-light{
    	z-index: -0;	
    }
		.layout-content{
			/*overflow: hidden;*/
		}
    .vue-waterfall-slot{
     	border:5px solid #F2F2F4;
    }
    .water{
    	padding: 18px 18px 0px 18px ;
    	width: 33%;
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
    	/*width: 100%;*/
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
</style>	
