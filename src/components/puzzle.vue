<template>
  <div class="puzzle">
        <header>
					<div class="body">
						<div class="title">
							<!--<Button style="float: right;position:relative;top:10px;" class="btn"><Icon type="ios-photos-outline"></Icon ">更多模板</Button>-->
							<div class="body_title">创作拼图</div>
							<div class="sub_title">选择一个模板开始你的设计</div>
						</div>
					</div>
				</header>
				<Menu mode="horizontal" active-name="10">
            <div class="layout-assistant">
            	<router-link :to="{ path: 'puzzle/'}">
                <Menu-item name="10">全部</Menu-item>
              </router-link>
              <!--<router-link to="/project">
                <Menu-item name="6">项目</Menu-item>
              </router-link>
              <router-link to="/puzzleson">
                <Menu-item name="7">拼图</Menu-item>
              </router-link>-->
							 <router-link to=""><Button @click="clickCreat()" style="float: right;position:relative;top:10px;" class="btn"><Icon type="ios-folder"></Icon>&nbsp;新建项目</Button></router-link>
            </div>
        </Menu>
				<main>
					<div class="layout-content">
						<div  class="left" style="width: 100%;">
						<!--瀑布流開始-->
						 <div class="body layout-content" style="">
						 	<div id="main" v-if="fileShowHide">
						 		
						 		<!--文件夹样式-->
						 		<!--<div class="box " v-for="item in Folder">
						 			<div class="boxcon filebox">
						 			<div class="fileboxcon">
						 				<img v-if="item.img!=null"  src="../img/1.png" alt="" />
							 			<div class="bg"></div>
							 			<div class="modal" @click="getFloderCon(item.id)"></div>
							 			<h2>{{item.name}}</h2>
						 			</div>
						 			<div class="pic">
						      	<div class="icon del">
							      	<Tooltip content="删除" @click.native="deleteFolder(item.id)" placement="bottom">
								      	<Icon type="trash-b"></Icon>
							        </Tooltip>
						      	</div>
						      	<Dropdown trigger="click">
						      	<div class="icon menu">
							      	<Tooltip content="菜单" placement="bottom">
								      	<Icon type="android-more-vertical"></Icon>
							        </Tooltip>
						      	</div>
							      	<DropdownMenu slot="list" style="z-index: 10;">
							      			<DropdownItem @click.native="">删除文件夹</DropdownItem>
							            
							        </DropdownMenu>
						      	</Dropdown>
						 			</div>
						 			</div>
						 		</div>-->
						 		<!--<DropdownItem>查看</DropdownItem>-->
							  <!--<DropdownItem >修改</DropdownItem>-->
						 		
						 		<div class="box"  v-for="item in getlikeitem">
						 			<div class="boxcon">
						 			<div class="pic">
						 				<img :src="'http://static.shatuhome.com/thumb/'+item.production.thumb"/>
						 				<div class="icon myedit">
							      	<Tooltip @click.native="edit(item.production.id)" content="编辑" placement="bottom">
								      	<Icon type="compose"></Icon>
							        </Tooltip>
						      	</div>
						      	<div class="icon del">
							      	<Tooltip content="删除" @click.native="deleteProduc(item.production.id)" placement="bottom">
								      	<Icon type="trash-b"></Icon>
							        </Tooltip>
						      	</div>
						      	<Dropdown trigger="click">
						      	<div class="icon menu">
							      	<Tooltip content="菜单" placement="bottom">
								      	<Icon type="android-more-vertical"></Icon>
							        </Tooltip>
						      	</div>
							      	<DropdownMenu slot="list">
							            <!--<DropdownItem>查看</DropdownItem>-->
							            <DropdownItem @click.native="moveToFolder()">移动到</DropdownItem>
							            <DropdownItem  @click.native="showDetail(item.production.id)">查看清单</DropdownItem>
							             <DropdownItem><a :href="'http://admin.shatuhome.com/pdfdownload/'+item.production.id">导出为pdf</a></DropdownItem>
							            <DropdownItem v-show ="item.production.status == 0" @click.native = "setStatus(0,item.production.id)">设置为公开</DropdownItem>
							            <DropdownItem v-show ="item.production.status == 1" @click.native = "setStatus(1,item.production.id)">设置为不公开</DropdownItem>
							        </DropdownMenu>
						      	</Dropdown>
						 				<div class="modal" @click="modalS(item)"></div>
						 			</div>
						 			<div class="footer">
						 				<div class="borderbox">

							 				<span class="thumb">
									 			<!--<img src="../assets/logo.png"/>-->
									 			<p>{{item.userinfo.username | Username}}</p>
									 		</span>
							 				<div style="width: 15px;"></div>
							 				<div class="box-txt">
							 					<p>{{item.production.name}}</p>
							 					<div style="height: 5px;"></div>
							 					<p>{{item.production.ctime | Time}}</p>
							 				</div>
							 				<ul>
						 						<!--<li><Icon type="heart"></Icon></li>-->
						 					</ul>
						 				</div>
						 			</div>
						 		</div>
						 		</div>
						 		
						 		
						 	</div>
						 	
						 	
						 	
						 	
						 	<!--文件夹内容显示-->
						 	<div id="main" v-if="!fileShowHide">
						 		<div class="box"  v-for="item in getlikeitem">
						 			<div class="boxcon">
						 			<div class="pic">
						 				<img :src="'http://static.shatuhome.com/thumb/'+item.production.thumb"/>
						 				<!--<div class="icon myedit">
							      	<Tooltip @click.native="edit(item.id)" content="编辑" placement="bottom">
								      	<Icon type="compose"></Icon>
							        </Tooltip>
						      	</div>-->
						      	<!--<div class="icon del">
							      	<Tooltip content="删除" placement="bottom">
								      	<Icon type="trash-b"></Icon>
							        </Tooltip>
						      	</div>-->
						      	<Dropdown trigger="click">
						      	<!--<div class="icon menu">
							      	<Tooltip content="菜单" placement="bottom">
								      	<Icon type="android-more-vertical"></Icon>
							        </Tooltip>
						      	</div>-->
							      	<!--<DropdownMenu slot="list">
							            <DropdownItem>查看</DropdownItem>
							            <DropdownItem >移动到</DropdownItem>
							            <DropdownItem >查看清单</DropdownItem>
							            <DropdownItem><a :href="'http://www.shatuhome.com/pdfdownload/'+item.id">导出为pdf</a></DropdownItem>
							            <DropdownItem>设置为公开不公开</DropdownItem>
							        </DropdownMenu>-->
						      	</Dropdown>
						 				<div class="modal" @click="modalS(item)"></div>
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
						 						<!--<li><Icon type="heart"></Icon></li>-->
						 						</ul>
						 					</div>
						 				</div>
						 			</div>
						 		</div>
						 		
						 		
						 	</div>
						</div>
					</div>
					<div class="modal"  ></div>
					 <Back-top></Back-top>
					</div>
          <modals v-if="this.modal=='modal'" :toson='toson'  @modal="getsonitem()"></modals >
          	<Modal v-model="ToFolder" title="请选择要移动到的文件夹" @on-ok="toFolderOk">
          		 <RadioGroup v-model="foldercheck" vertical>
					        <Radio v-for="item in Folder" >
					            <span>{{item.name}}</span>
					        </Radio>
					    </RadioGroup>
				        <!--<p >{{item.name}}</p>-->
    				</Modal>
				</main>
	</div>
</template>

<script>
  import modals from "../components/pages/Single"

  export default {
  name: 'content',
  data () {
    return {
	   value13: '',
       select3: 'day',
       getlikeitem: '',
       modal:'',
       toson:'',
       fileShowHide:true,
       toson:'',
       Folder:'',
       ToFolder:false,
       foldercheck: ''
    }
  },
    components:{
      modals,
    },
    mounted(){
    	if(this.$route.path=='/puzzle'){
    		$(document).ready(function(){
					$(document).on("mouseover",".puzzle .box",function(){
							$(this).find(".modal").show();
							$(this).find(".icon").show();
					});
				    $(document).on("mouseout",".puzzle .box",function(){
							$(this).find(".modal").hide();
							$(this).find(".icon").hide();
				    });
				});
    	}
    	this.getFolder();
    	this.GetProductionByUserId();
    	this.movingPos();
			this.colorRand();
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
  	methods:{
  	colorRand() {
			console.log($("#main").find(".thumb"));
			setTimeout(function () {
					$("#main").find(".thumb").each(function(){
						var ranColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
						$(this).css("background", ranColor);
					})
			},500)
		},
  	//点击创建文件夹按钮
  	clickCreat() {
  		var self = this;
  		this.$Modal.confirm({
  			render: (h) => {
  				return h('Input', {
  					props: {
  						value: this.value,
  						autofocus: true,
  						placeholder: '请输入要创建的文件夹名称'
  					},
  					on: {
  						input: (val) => {
  							this.value = val;
  						}
  					},
  				})
  			},
  			onOk: () => {
  				self.creatFolder();
        },
        onCancel: () => {
          this.$Message.info('已取消');
        }
  		})
  	},
  	//获取文件夹
  	getFolder(){
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'limit':0,'start':0,'type':1
				}
			};
			this.jsonpRequest(this,"Folder.GetFolderList",params,function(res){
  			console.log(res);
  					if(res.body.data.code==0){
  						console.log(res);
  						self.Folder = res.body.data.data;
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  			console.log("resresresresresres");
  		});
  	},
  	//获取文件夹内元素
  	getFloderCon(id){
  		alert(id);
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'folderId':id,type:1
				}
			};
			this.jsonpRequest(this,"Folder.GetFolderDetail",params,function(res){
  			console.log(res);
  					if(res.body.data.code==0){
  						console.log(res);
  					}else{
							console.log(res);
							if(res.body.ret==401){
								self.toLogin(this,401);
							}
						}
  		},function(err){
  			console.log(err);
  			console.log("resresresresresres");
  		});
  	},
  	//创建文件夹
  	creatFolder(){
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'folderName':self.value,'type':1
				}
			};
			this.jsonpRequest(this,"Folder.CreateFolder",params,function(res){
  			console.log(res);
  					if(res.body.data.code==0){
  						console.log(res);
  						this.$Message.info('创建文件夹成功');
  						self.getFolder();
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
  	//删除文件夹
  	deleteFolder(id){
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,user_id:user_id,token:token,'folderId':id
				}
			};
			this.jsonpRequest(this,"Folder.DelFolder",params,function(res){
  			console.log(res);
  					if(res.body.data.code==0){
  						this.$Message.info('删除文件夹成功！');
  						self.getFolder();
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
  	//添加文件到文件夹
  	addProdFolder(){
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'imgId':imgId,'folderId':folderId
				}
			};
			this.jsonpRequest(this,"Folder.StoreImg",params,function(res){
  			console.log(res);
  					if(res.body.data.code==0){
  						console.log(res);
  						this.$Message.info('添加文件夹成功！');
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
  	edit(id){
  		this.$router.push({name:'canvas',params:{id:id}});
  	},
  	//获取作品信息
  	GetProductionByUserId:function (){
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
  			console.log(res);
  					if(res.body.data.code==0){
  						self.getlikeitem = res.body.data.list;
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
  	//删除作品信息
  	deleteProduc(id){
  		var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'production_id':id
				}
			};
			this.jsonpRequest(this,"Production.DeleteProduction",params,function(res){
  					console.log(res);
  					if(res.body.data.code==0){
  						self.$Message.info("删除成功!");
  						self.GetProductionByUserId();
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
  	topdf(){
  		window.location.href="";
  	},
    modalS:function(item){
    	this.toson = item,
      this.modal="modal";
    },
    getsonitem:function(msg){
      this.modal=msg;
    },
    checkScrollSlide(){
				var self = this;
				 if(this.$route.name=='content'){
				var oParent=document.getElementById('main');
        var oBoxs=self.getByClass(oParent,'.box');
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
							        var oBoxs=self.getByClass(oParent,'.box');
							        //计算整个页面的显示雷氏（页面/box的宽）
							        var oBoxW=$this[0].offsetWidth;
											var winW = oParent.offsetWidth;
							        var cols=Math.floor(winW/oBoxW);
							        console.log(cols);
							        console.log("colscolscols")
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
			}, 200);   
		},
		getByClass(parent,clsName){
    		 var boxArr=new Array(),//用来存储获取到的所有class为Box的元素
        	oElements=parent.getElementsByTagName('*');
        boxArr = $(parent).find(clsName)
//	        for(var i=0;i<oElements.length;i++){
////							console.log($(oElements[i]).hasClass("clsName"));
//	            if (oElements[i].className==clsName) {
//	                boxArr.push(oElements[i]);
//	            }
//	        }
	        return boxArr;
    },
    getMinhIndex(arr,val){
        for(var i in arr){
            if(arr[i]==val){
                return i;
            }
        }
    },
    //设置作品公开，不公开
    setStatus(num,id){
    	if(num==0){
    		var strText = "Production.UpdateProductionPublic"
    	}else{
    		var strText = "Production.UpdateProductionPrivate"
    	}
    	var self = this;
  		var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id");
  		var token = localStorage.getItem("token");
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'production_id':id
				}
			};
			this.jsonpRequest(this,strText,params,function(res){
  					console.log(res);
  					if(res.body.data.code==0){
  						self.$Message.info("修改状态成功!");
						self.GetProductionByUserId();
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
    showDetail(id){
    	this.$router.push({name:'showList',params:{productId:id}});
    },
    moveToFolder(){
    	
    },
    toFolderOk(){
    	
    },
  },
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.puzzle header{
    	width: 100%;
    	/*height: 310px;*/
    	padding:0 60px 24px;
    	background: #293036;
    	/*text-align: center;*/
    	color:#fff;
    	box-sizing: border-box;
    }
    .puzzle .body{
    	width: 100%;
    	padding-top: 24px;
    	margin-bottom: 12px;
    }
    .title .body_title{
    	font-size: 32px;
	    line-height: 32px;
	    margin-bottom: 12px;
    }
    .title .sub_title{
	    font-size: 14px;
	    line-height: 14px;
    }
    .ivu-menu.ivu-menu-light.ivu-menu-horizontal{
    	padding:0px 60px;
    }
    .ivu-menu.ivu-menu-light.ivu-menu-horizontal,.ivu-menu-item{
    	height: 50px;
    	line-height: 50px;
    }
    .title .btn{
    	width: 88px;
    	height: 32px;
    	text-align: center;
    	color: #fff;
    	/*padding: 0px 10px;*/
    	background-color: #20262B;
    	border: none;
    	font-size: 10px;
    }
    .title .btn:hover{
    	background-color:#000 ;
    }
    .layout-assistant>.btn{
    	margin-top: 10px;
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
    .ivu-menu-light{
    	z-index: -0;
    }
    .puzzle header{
    	width: 100%;
    	height: 180px;
    	background: #293036;
    	text-align: center;
    	color:#fff;
    }
    .puzzle .title{
    	padding-top: 48px;
	    font-size: 32px;
	    line-height: 32px;
    }
    .puzzle .sub_title {
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
    	min-height: 280px;
    	
    }
    .filebox{
    	height: 338px;
    	border-radius: 4px;
    	position: relative;
    	cursor: pointer;
    	/*overflow: hidden;*/
    }
    .filebox .fileboxcon{
    	position: absolute;
    	left: 0;
    	right: 0;
    	top: 0;
    	bottom: 0;
    	border-radius: 4px;
    	overflow: hidden;
    }
    .filebox h2{
    	position: absolute;
    	display: inline;
    	font-size: 32px;
    	top: 50%;
    	transform: translateY(-50%);
    	color: #fff;
    	margin-left: 10px;
    	z-index: 3;
    }
    .filebox .bg{
    	position: absolute;
    	left:0;
    	right:0;
    	bottom:0;
    	top:0;
    	z-index: 2;
    	background-color: rgba(134,156,170,.9);
    }
    .filebox .modal{
    	position:absolute;
    	left:0;
    	right:0;
    	top:0;
    	bottom: 0;
    	z-index: 2;
    	cursor: pointer;
    	background-color: rgba(0,0,0,.3);
    }
    .filebox img{
    	position: absolute;
    	z-index: 1;
    	left:50%;
    	top:50%;
    	transform: translate(-50%,-50%);
    	width: 100%;
    }
    .pic {
    	position: relative;
    	/*display: flex;*/
    	/*justify-content: center;*/
    	/*align-content: center;*/
    	/*border: 1px solid #CCC;*/
    	/*box-shadow: 0 0 5px #ccc;*/
    	min-width: 100%;
    	min-height: 180px;
    	margin: 0;
    	padding: 0;
    	overflow: hidden;
    	cursor: pointer;
    	
    }

    .modal {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	background-color: rgba(0,0,0,.3);
    	display: none;
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
    	display: flex;
    	align-items: center;
    }
    
    .boxcon {
    	padding: 10px;
    	/*cursor: pointer;*/
    	/*margin: 15px 0 0 15px;*/
    	background-color: #fff;
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
    color: #8a8989;
  }
  .boxcon .footer .thumb {
  	display: inline-block;
  	width: 66px;
  	height: 32px;
  	text-align:center;
  	line-height:32px;
  	border-radius: 4px;
  	/*background-color: ;*/
  }

  .boxcon .footer .thumb p{
  	text-align: center;
  	/*line-height: 35px;*/
  	font-size: 18px;
  	color: #fff;
  	font-weight: 500;
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
  .box-txt .ivu-icon{
  	cursor: pointer;
  }
  .box-txt .ivu-icon:hover{
  	color: red;
  }

    /*頭部*/
     main{
    	width: 100%;
    	padding:0 50px ;
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
    /*瀑布流*/
   .pic .icon{
	   	width: 40px;
	    height: 40px;
    	text-align: center;
    	line-height: 40px;
    	font-size: 20px;
    	background-color: #fff;
    	/*right:10px;*/
    	z-index: 5;
    	border-radius: 5px;
    	color: #7E8E98;
    	display: none;
    	cursor: pointer;
    	color: #999;
   }
   .pic div.myedit{
   	position: absolute;
   		top:10px;
   		left:10px;
   		color: #fff;
   		background-color:#72c043;
   }
    .pic div.myedit .ivu-icon{
    	color: #fff;
    }
    .pic div.menu:hover{
    	color: #3B454C;
    }
   .pic div.myedit:hover{
   		background-color:#5c9a37;
   }
   .pic .ivu-dropdown{
   	    position: absolute;
   	    top:10px;
		    right:10px;
		    z-index: 10;
   }
   .pic div.del{
   	position: absolute;
   	top:10px;
   	right: 60px;
   	color: #696969;
   }
   .pic div.del:hover{
   	color: #3B454C;
   }
    .layout-copy{
    	text-align: center;
    }
    .ivu-menu-light{
    	z-index: -0;
    }
    /*.ivu-icon{
    	color: #999;
    }*/
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
