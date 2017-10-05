<template>
  <div class="layout" >
			<Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left" >
                <Menu active-name="2" theme="dark" width="100%" @on-select="forname" class="left">
                    <!--<div class="layout-logo-left"></div>-->
                    <router-link to="/">
				                <Menu-item name="1" >
				                        <Icon type="arrow-left-a"></Icon>
				                        <span class="layout-text">退出</span>
				                </Menu-item>
                    </router-link>
				                <Menu-item name="2" >
										<Icon type="ios-search-strong"></Icon>
				                        <span class="layout-text">搜索</span>
				                </Menu-item>
				                <Menu-item name="3" on-select="unitemy()">
				                        <Icon type="ios-box"></Icon>
				                        <span class="layout-text">单品</span>
				                </Menu-item>
				                <Menu-item name="4" on-select="puzzmy">
				                	<Icon type="images"></Icon>
				                  <span class="layout-text">拼图</span>
				                  <!--<Icon type="ios-navigate" :size="iconSize"></Icon>-->
				                </Menu-item>
				                <Menu-item name="5" @click="add()"  on-select="effectmy">
				                        <Icon type="wand"></Icon>
				                        <!--<span class="layout-text">选项 1</span>-->
				                        <span class="layout-text">辅助</span>
				                </Menu-item>
				                <Menu-item name="6" on-select="detailmy">
           									<Tooltip content="当前详情" placement="bottom">
				                        <Icon type="information-circled"></Icon>
				                        <span class="layout-text">详情</span>
				                        <!--<span class="layout-text">选项 1</span>-->
           									</Tooltip>
				                </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="left" width="100%">
                <!--<div class="layout-header">-->
                    <div class="layout-ceiling">
										<div class="layout-ceiling-main">
											<a href="#">清空</a> |
											<!--<a href="#">上传</a> |-->
											<!--<a href="#">下载高清大图</a> |-->
											<a href="#">服务大厅</a>
											<div class="right" style="margin-right: 20px;">
												<a href="#" class="left">片羽时光</a> 
												<a href="#" class="left">列表详情</a> 
												<a href="javascript:;" class="left">
													<i-switch size="large" style="position: relative;bottom: 2;">
										        <span slot="open">公开</span>
										        <span slot="close">私有</span>
										    	</i-switch>
												</a>
											</div>
										</div>
										</div>
                <!--</div>-->
                <div class="layout-breadcrumb">
                	<div class="aside">
                		<div class="search"  v-show="name==2">
                			<div class="search-title">
                				<Input v-model="value1" style="width: 90%; margin-top: 10px;">
										        <Select v-model="select1" slot="prepend" style="width: 80px">
										            <Option value="day">单品</Option>
										        </Select>
										        <Button slot="append" icon="ios-search" @click="search(value1)"></Button>
										    </Input>
										    <div class="search-content">
										    	<!--搜索信息列表-->
										    	<div class="content_con"  v-if="flag">
										    	<p>分类标签</p>
														<Row ><!-- -->
															<Col span="6" style="background-color: #fff;position:relative;margin: 5px;cursor: pointer;" @click="getclassify(itemd.name)" class="classify con2">
												        	<p>椅子</p>
												        	<img src="../assets/img/yizi.png" alt="" />
												        </Col>
												        <Col span="6" v-for="(itemd , index) in item" style="background-color: #fff;position:relative;margin: 5px;cursor: pointer;" @click="getclassify(itemd.name)" class="classify">
												        	<p>{{itemd.name}}-{{index}}</p>
												        	<img :src="'http://www.shatuhome.com/material/'+itemd.filename" alt="" />
												        </Col>
												   </Row>
													</div>
													<!--搜索结果列表-->
													<div class="content_con2" v-if="!flag">
														<h2>搜索结果</h2>
														<div >
															<Col span="6" style="background-color: #fff;position:relative;" class="con2" >
												        	<img src="../assets/logo.png" alt="" />
												        	<p>一只一只</p>
												       </Col>
												       <Col span="6" v-for="(itemd , index) in searchi" style="background-color: #fff;position:relative;" class="con2" >
												        	<img :src="itemd.path" alt="" />
												        	<p>一只一只</p>
												       </Col>
														</div>
													</div>												
										    </div>
                			</div>
                		</div>
                		<div class="my" v-show="name==3" >
                			<canvasmy @imgurl="getChildImg"></canvasmy>
                		</div>
                		<div class="puzz" v-show="name==4">
                			<brand></brand>
                		</div>
                		<div class="effect" v-show="name==5">
                			<div>effect</div>
                			<brandcli></brandcli>
                		</div>
                		<div class="detail" v-show="name==6">
                			<div>detail</div>
                		</div>
                	</div>
                </div>
                <div class="layout-content" style="padding:0px">
                	<div class="layout-content-style " >
                		<div class="menubox">
                				<Tooltip content="裁剪" placement="bottom">
							      	<Icon type="crop"></Icon>
								</Tooltip>
								<Tooltip content="变形" placement="bottom">
								<Icon type="android-map"></Icon>
								</Tooltip>
								<Tooltip content="抠图" placement="bottom">
							      	<Icon type="wand"></Icon>
								</Tooltip>
								<Tooltip content="锁定" placement="bottom">
							      	<Icon type="locked"></Icon>
								</Tooltip>
								<Tooltip content="镜像" placement="bottom">
								<Icon type="arrow-swap"></Icon>
								</Tooltip>
								<Tooltip content="复制" placement="bottom">
							      	<Icon type="images"></Icon>
								</Tooltip>
								<Tooltip content="滤镜" placement="bottom">
									<Icon type="ios-settings-strong"></Icon>
								</Tooltip>
								<Tooltip content="上下层级" placement="bottom">
									<Icon type="navicon-round"></Icon>
								</Tooltip>
								
						        <Tooltip content="关闭" style="float: right;color: #ccc;" placement="bottom">
							      	<Icon type="close-round"></Icon>
						        </Tooltip>
						        <Tooltip content="删除" style="float: right;color: #ccc;" @click.native="elemRemove"  placement="bottom">
							      	<Icon type="trash-b"></Icon>
						        </Tooltip>
						        
                		</div>
                		<div class="layout-content-main">
                			<div class="parent"style="width: 320px;height: 720px;">
                				<canvas class="one box" id="parent" style="width: 320px;height：720px"></canvas>
                				</div>
                				
                			</div>
                	</div>
                </div>
            </i-col>
        </Row>
        
		</div>
</template>

<script>
import canvasmy from "../components/pages/canvasmy.vue"
import brand from "../components/pages/Brand"
import brandcli from "../components/pages/BrandClick" 

	export default {
	   data() {
	            return {
	                spanLeft: 2,
	                spanRight: 22,
	                select1:"",
	                value1:'',
	                name:2,
	                item:{},
	                flag:true,
	                childUrl:'',
	                Canvas:'',
	                selectItem:"",
	            }
	        },
	         computed: {
	            iconSize () {
	                return this.spanLeft === 2 ? 14 : 24;
	            },
	        },
	        components: {
  					canvasmy,brand,
  				},
	        created:function(){
	        	this.getsearch();
	        },
	        mounted(){
						this.getCanvas();
	        },
	        methods:{
	        	getCanvas(){
	        		var self = this
	        		var staticCanvas = new fabric.Canvas('parent');
	        		self.Canvas = staticCanvas;
	        		self.Canvas.setWidth(800);
	        		self.Canvas.setHeight(800);
	        		self.Canvas.on('object:selected', function(opt){
	        			self.selectItem = opt
	        		});
	        		
	        	},
	        	add:function(){
	        		var oParent = document.getElementById('#parent');
					   	var additem='<div class="div1" onmousemove="posMove(this.className)"></div>';
					   	oParent.append(additem); 
	        	},
	        	elemRemove:function(){
	        		var self = this
	        		self.Canvas.remove(self.selectItem.target);
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
							this.jsonpRequest(this,"Material.GetAllMaterial",params,function(res){
				  					if(res){
				  						self.$set(self, 'item', res.body.data.list);
											self.item = res.body.data.list;
											console.log("item:"+self.item);
											console.log(1111111111111111111111)
											console.log(res)
											console.log(1111111111111111111111)
				  					}
				  		},function(err){
				  			console.log(err);
				  		});
				  	},
				  	search:function(keyword){
				  		this.flag=false;
								//		var self = this;
				  		var str = this.Encrypt();
				  		var user_id = localStorage.getItem("user_id"); 
				  		var token = localStorage.getItem("token"); 
				  		var params = {
								params:{
									'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'keyword':keyword
								}
							};
							this.jsonpRequest(this,"Material.GetMaterialByKeyWord",params,function(res){
				  					if(res){
				  						self.searchi = res.body.data.list;
				//					this.bigs = res.bodyText.data.list;
				//					this.newslist = response.body.newslist
										console.log("search:"+self.searchi);
										console.log(res);
				  					}
				  		},function(err){
				  			console.log(err);
				  		});
				  	},
				  	forname(name){
				  		this.name = name;
				  	},
				  	getChildImg(url){
				  		this.childUrl = url
				  		var self = this;
				  		fabric.Image.fromURL(url, function(oImg) {
							  oImg.scale(0.5).set('flipX', true);
							  self.Canvas.add(oImg);
							});
				  	}
	  		},
	  		
	 }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.layout{
				height: 709px;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-menu-light{
    	z-index: -0;	
    }
    .layout-ceiling{
        background: #293036;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        margin-right: 15px;
    }
    .ivu-menu-item{
    	background-color: #293036;
    }
    .layout-ceiling .layout-ceiling-main a{
    	margin-left: 10px;
        color: #fff;
    }
    .layout-breadcrumb{
    		float:left;
        min-width: 200px;
        width: 30%;
        min-height:672px;
    }
    .layout-content{
    		/*position: relative;*/
    		/*margin: 0 auto;*/
    		display: flex;
    		justify-content: center;
    		float: left;
    		width: 70%;
    		overflow: hidden;
        min-height: 600px;
        padding:0px 0px 10px 5px;
        /*margin-top: 15px;*/
        overflow: hidden;
        border-radius: 4px;
    		box-sizing: border-box;
    }
    .layout-content-style{
    	width: 100%;
      min-height: 700px;
			background-color: #fff;    	
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #293036;
        height:710px;
        float:left;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #293036;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #293036;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .layout-text{
    	font-size: 12px;
    }
    li.ivu-menu-item{
    	height: 37.6px;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .aside{
    	float:left;
    	width: 100%;
    	min-height: 672px;
    	background-color: #353F48;
    	overflow-y: auto;
    }
    .search-title{
    margin-left: 20px;
    margin-bottom: 20px;
    }
    .search-content>div>p{
    	line-height: 48px;
    	font-size: 12px;
    }
    .con2{
    	position: relative;
    	overflow: hidden;
    	margin: 10px;
    }
    .con2>img{
			max-width: 90%;
			max-height: 90%;
			float: right;
		}
		.con2>p{
			padding:5px 10px;
			font-size: 0.3em;
			margin: 0;
			width: 90%;
			/*height: 10%;*/
			line-height: 16px;
			/*margin-bottom: 15px;*/
			text-align: left;
			color: #9EA7B4;
			z-index: 10;
		}
		.content-con2>h2{
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.my>div>p{
			line-height: 48px;
			color: #fff;
			margin-left:20px;
		}
		#parent{
			position: relative;
			width: 300px;
			height: 500px;
		}
		.parent{
			display: flex;
			justify-content: center;
		}
		.parent .one{
			width: 388px;
			height: 554px;
			border-radius:25px ;
			box-shadow: 1px 2px 5px #293036;
			overflow: hidden;
		}
		.div1{
			min-width: 50px;
			min-height: 50px;
			background-color: #20262B;
			position: absolute;
			/*cursor: nwse-resize;*/
			cursor: pointer;
		} 
		/*//改变大小*/
		.box .t,
        .box .b,
        .box .l,
        .box .r {
            position: absolute;
            z-index: 1;
            /*background:#666;*/
        }
    .box .l,
        .box .r {
            /*width: 2px;*/
            height: 100%;
            border:1px dashed #666; 
            cursor: col-resize;
        }
 
        .box .t,
        .box .b {
            width: 100%;
            /*height: 2px;*/
            border:1px dashed #666; 
            cursor: row-resize;
        }
 
        .box .t {
            top: 0;
        }
 
        .box .b {
            bottom: 0;
        }
 
        .box .l {
            left: 0;
        }
 
        .box .r {
            right: 0;
        }
 
        /*四角*/
        .box .tl,
        .box .bl,
        .box .br,
        .box .tr {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            position: absolute;
            background: #CCC;
            z-index: 2;
            cursor: nwse-resize
        }
 
        .box .tl,
        .box .bl {
            left: -5px;
        }
 
        .box .tr,
        .box .br {
            right: -5px;
        }
 
        .box .br,
        .box .bl {
            bottom: -5px;
        }
 
        .box .tl,
        .box .tr {
            top: -5px;
        }
 
        .box .tr,
        .box .bl {
            cursor: nesw-resize;
        } 
			.menubox{
				width: 100%;
				box-shadow: 0 0 5px #ccc;
				height: 42px;
				float: left;
				margin-bottom: 20px;
				line-height: 42px;
				padding:0 20px 0 10px;
				font-size: 24px;
			}    
			.menubox .ivu-icon{
				margin-left: 10px;
				cursor: pointer;
			}    
</style>	
