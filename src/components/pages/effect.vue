<template>
  <div class="effect">
  	<div class="conlist_show">
  		<div class="conlist_con">
  			<h2 v-show="xiaoguo" style="margin-bottom: 5px;margin-left:10px;margin-top: 5px;color: #b2c0c8;">辅助效果</h2>
		  	<!--<Row :gutter="16">
		  		<Col span="11" class="dada">
						<img src="../../assets/img/meijian.png" alt="" style="width:100%;" />
		      </Col>
		      <Col span="11" class="dada">
						<img src="../../assets/img/meijian.png" alt="" style="width:100%;" />
		      </Col>
		  	</Row>-->
		  	<ul v-show="xiaoguo">
		  		<li @click="change(1,'图形')">
		  			<div class="effectcon">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use  xlink:href="#icon-Group"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>图形</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(2,'色卡')">
		  			<div style="background-color: #678aed;" class="effectcon">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-color"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>色卡</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(3,'灯光')">
		  			<div style="background-color: #f8bf34;" class="effectcon">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-deng"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>灯光</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(4,'阴影')">
		  			<div class="effectcon" style="background-color: #5a6d8d;">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-shadow"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>阴影</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(5,'透视')">
		  			<div class="effectcon" style="background-color: #a08e80;">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-toushi"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>透视</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(6,'图标')">
		  			<div class="effectcon" style="background-color: #ed7291;">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-tubiao"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>图标</p>
		  				</div>
		  			</div>
		  		</li>
		  		<li  @click="change(7,'排版装饰')">
		  			<div class="effectcon" style="background-color: #4da2b9;">
		  				<div>
		  					<i>
		  						<svg class="icon" aria-hidden="true">
								  	<use xlink:href="#icon-paiban"></use>
									</svg>
		  					</i>
		  					<div></div>
		  					<p>排版装饰</p>
		  				</div>
		  			</div>
		  		</li>
		  	</ul>
		  	<div class="listShow" v-if="!xiaoguo">
		  		<p style="">
		  			<svg class="icon" @click="showEffect()" aria-hidden="true">
							<use xlink:href="#icon-left"></use>
						</svg>
						<span style="font-size: 20px;margin-left: 20px;">{{showTex}}</span>
		  		</p>
		  		<!--图形-->
		  		<div class="showIcon" v-if="showNum==1">
		  			<div class="showIconbox"  v-for="n in showNum1">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<embed width="90%" height="90%" :src="'/instatic/img/help/graph/'+n+'.svg'" type="image/svg+xml" />
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		
		  		<!--色卡-->
		  		<div class="showIcon" v-if="showNum==2">
		  			<div class="showIconbox"  v-for="n in showNum2">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<embed width="90%" height="90%" :src="'/instatic/img/help/color/'+n+'.svg'" type="image/svg+xml" />
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		
		  		<!--灯光-->
		  		<div class="showIcon" v-if="showNum==3">
		  			<div class="showIconbox light" v-for="n in showNum3">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event,3)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img" :style="'background-image:url(/instatic/img/help/light/'+n+'.png);background-size:contain;background-position:center center;background-repeat:no-repeat;'">
									<!--<img src="/instatic/img/help/light/1.png" :style="background-image: url(/instatic/img/help/light/1.png);" alt="" />-->
									<!--<embed width="90%" height="90%" :src="'/instatic/img/help/color/'+n+'.svg'" type="image/svg+xml" />-->
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		
		  		<!--阴影-->
		  		<div class="showIcon" v-if="showNum==4">
		  			<div class="showIconbox"  v-for="n in showNum4">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event,4)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img" :style="'background-image: url(/instatic/img/help/shadow/'+n+'.png);background-size:contain;background-position:center center;background-repeat:no-repeat;'">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<!--<embed width="90%" height="90%" :src="'/instatic/img/help/shadow/'+n+'.png'" type="image/svg+xml" />-->
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		
		  		<!--透视-->
		  		<div class="showIcon" v-if="showNum==5">
		  			<div class="showIconbox"  v-for="n in showNum5">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<embed width="90%" height="90%" :src="'/instatic/img/help/ray/'+n+'.svg'" type="image/svg+xml" />
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		
		  		<!--图标-->
		  		<div class="showIcon" v-if="showNum==6">
		  			<div class="showIconbox"  v-for="n in showNum6">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<embed width="90%" height="90%" :src="'/instatic/img/help/count/'+n+'.svg'" type="image/svg+xml" />
								</div>
		  				</div>
		  			</div>
		  		</div>
		  		
		  		<!--描述-->
		  		<div class="showIcon" v-if="showNum==7">
		  			<div class="showIconbox"  v-for="n in showNum7">
		  				<div class="boxcon">
		  					<div class="modal"></div>
			  				<div class="icon" @click="addCanvas($event,7)">
									<Icon size="24" type="android-exit"></Icon>
								</div>
								<div class="img" :style="'background-image: url(/instatic/img/help/des/'+n+'.png);background-size:contain;background-position:center center;background-repeat:no-repeat;'">
									<!--<svg width="100%" height="100%" xmlns="">
										<use x="0" y="0" xlink:href="../assets/img/help/graph/1.svg"></use>
									</svg>-->
									<!--<embed width="90%" height="90%" :src="'/instatic/img/help/shadow/'+n+'.png'" type="image/svg+xml" />-->
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
    name: 'effect',
    data () {
      return {
      	xiaoguo:true,
      	showTex:'图形',
      	showNum:1,
      	showNum1:19,
      	showNum2:15,
      	showNum3:83,
      	showNum4:24,
      	showNum5:6,
      	showNum6:28,
      	showNum7:209,
      }
    },
    mounted(){
    	$(document).ready(function(){
			$(document).on("mouseover",".showIconbox",function(){
					$('.boxcon').css('background-color','');
					$(".showIcon").find(".modal").hide();
					$(".showIcon").find(".icon").hide();
					$(this).find(".modal").show();
					$(this).find(".icon").show();
			});
		    $(document).on("mouseout",".showIconbox",function(){
					$(this).find(".modal").hide();
					$(this).find(".icon").hide();
					$('.boxcon').css('background-color','background-color: rgba(255,255,255,.2);');
		    });
		
		});
    },
    methods:{
    	change(num,Txt){
    		this.xiaoguo=false;
    		this.showNum=num;
    		this.showTex = Txt;
    	},
    	showEffect(){
    		this.xiaoguo=true;
    	},
    	addCanvas(e,num){
//  		console.log(e.currentTarget)
    		var url = $(e.currentTarget).siblings('.img').find("embed").attr("src");
				var host = window.location.host;
				var imgurl = "http://"+host+url;
				if(num==3||num==4||num==7){
    			imgurl = $(e.currentTarget).siblings('.img').css("background-image"); 
    			imgurl = imgurl.split('"')[1];
    		}
				this.$emit("imgdata",{url:imgurl})
    	},
    },
  }
</script>

<style scoped>
	.effect{
		width: 100%;
		padding: 5px;
	}
/*滚动样式*/
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
	ul {
		overflow: hidden;
	}
	ul li {
		float: left;
		margin: 10px;
	}
 .effectcon{
 		width: 10.5vw;
 		height: 10.5vw;
 		position: relative;
 		border-radius: 4px;
 		background-color: #19BE6B;
 		cursor: pointer;
 }
 .effectcon>div{
 	position: absolute;
 	left: 0;
 	right: 0;
 	top: 0;
 	bottom: 0;
 	display: flex;
 	justify-content: center;
 	align-items: center;
 	flex-flow: column;
 }
 .effectcon>div i svg{
 	transform: scale(4);
 	fill: #fff;
 }
  .effectcon:nth-of-type(5)>div i svg{
 	transform: scale(2);
 }
  .effectcon:nth-of-type(6)>div i svg{
 	transform: scale(2);
 }
  .effectcon:nth-of-type(7)>div i svg{
 	transform: scale(2);
 }
  .effectcon>div>div{
 	height: 15px;
 }
 .effectcon>div p{
 	font-size: 16px;
 	color: #fff;
 }
 .listShow>p{
 	width: 100%;
 	display: block;
 	height: 50px;
 	line-height: 55px;
 	color: #b2c0c8;
 	position: relative;
 }
 .listShow>p>svg{
 	margin-left: 20px;
 	transform: scale(2.5);
 	cursor: pointer;
 }
  .listShow>p span{
  	position: absolute;
  	top: 50%;
  	transform: translateY(-45%);
  }
  .showIcon{
  	overflow: hidden;
  }
  .showIcon .showIconbox{
  	width:10.5vw;
  	height:10.5vw;
  	padding:17px;
  	margin: 10px;
  	background-color: #fff;
  	border-radius: 4px;
  	cursor: pointer;
  	float: left;
  }
  .showIcon .showIconbox .modal{
  	display: none;
  	position: absolute;
  	width: 100%;
  	height: 100%;
  	background-color: rgba(0,0,0,0.2);
  	z-index: 2;
  }
  .showIcon .showIconbox .icon{
  	position: absolute;
  	right: 5px;
  	top: 5px;
  	width: 40px;
  	height: 40px;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	background-color: #fff;
  	border-radius: 4px;
  	z-index: 3;
  	visibility: none;
  }
  .boxcon{
  	position: relative;
  	width: 100%;
  	height: 100%;
  }
  .showIcon .img{
  	position: absolute;
  	width:100%;
  	height:100%;
  	z-index: 1;
  	display: flex;
  	justify-content: center;
  	align-content: center;
  }
  .showIcon .light{
  	width: 10.5vw;
  	height: 10.5vw;
  	background-color:#293036;
  	margin: 10px;
  	padding: 17px;
  	border-radius: 4px;
  }
  .showIcon .light .boxcon{
  	background-color: rgba(255,255,255,.2);
  	border-radius: 2px;
  }
  .showIcon .img img{
  	width: 100%;
  	height: 100%;
  	position: absolute;
  	z-index: 1;
  }
  /*.showIcon .box .icon .ivu-icon{
  	position: absolute;
  	top: 50%;
  	transform:translateY(-50%);
  }*/
</style>
