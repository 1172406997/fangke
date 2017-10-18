<template>
  <div class="header">
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
							 <router-link to=""><Button @click="creatFile()" style="float: right;position:relative;top:10px;" class="btn"><Icon type="ios-folder"></Icon>&nbsp;新建项目</Button></router-link>
            </div>
        </Menu>
				<main>
					<div class="layout-content">
						<div  class="left" style="width: 100%;">
						<!--瀑布流開始-->
						 <div class="body layout-content" style="">
						 	<div id="main">
						 		
						 		<!--文件夹样式-->
						 		<div class="box filebox">
						 			<div class="fileboxcon">
						 				<img src="../../dist/instatic/img/1.d80e543.png" alt="" />
							 			<div class="bg"></div>
							 			<div class="modal"></div>
							 			<h2>Title</h2>
						 			</div>
						 			<div class="pic">
						      	<div class="icon del">
							      	<Tooltip content="删除" placement="bottom">
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
							            <!--<DropdownItem>查看</DropdownItem>-->
							            <DropdownItem >修改</DropdownItem>
							            <!--<DropdownItem>冰糖葫芦</DropdownItem>
							            <DropdownItem>北京烤鸭</DropdownItem>-->
							        </DropdownMenu>
						      	</Dropdown>
						 			</div>
						 		</div>
						 		
						 		
						 		<div class="box" >
						 			<div class="boxcon">
						 			<div class="pic">
						 				<img src="../img/1.png"/>
						 				<div class="icon myedit">
							      	<Tooltip content="编辑" placement="bottom">
								      	<Icon type="compose"></Icon>
							        </Tooltip>
						      	</div>
						      	<div class="icon del">
							      	<Tooltip content="删除" placement="bottom">
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
							            <DropdownItem >移动到</DropdownItem>
							            <DropdownItem >查看清单</DropdownItem>
							            <DropdownItem >查看清单</DropdownItem>
							            <DropdownItem @click="topdf(id)">导出为pdf</DropdownItem>
							            <DropdownItem>设置为公开不公开</DropdownItem>
							            <!--<DropdownItem>冰糖葫芦</DropdownItem>
							            <DropdownItem>北京烤鸭</DropdownItem>-->
							        </DropdownMenu>
						      	</Dropdown>
						 				<div class="modal" @click="modalS()"></div>
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
    }
  },
    components:{
      modals,
    },
  methods:{
  	//创建文件夹
  	creatFile() {
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
          this.$Message.info('点击了确定');
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        }
  		})
  	},//获取作品信息
  	GetProductionByUserId:function (){
  		var self = this;
  		var str = this.Encrypt();
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
			this.jsonpRequest(this,"Production.GetProductionByUserId",params,function(res){
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
  		});
  	},
  	topdf(){
  		window.location.href="";
  	},
    modalS:function(){
//      this.toson = item;
      this.modal="modal";
    },
    getsonitem:function(msg){
      this.modal=msg;
    },
  },
 }


$(document).ready(function(){
	$(document).on("mouseover",".box",function(){
			$(this).find(".modal").show();
			$(this).find(".icon").show();
	});
    $(document).on("mouseout",".box",function(){
			$(this).find(".modal").hide();
			$(this).find(".icon").hide();
    });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header header{
    	width: 100%;
    	/*height: 310px;*/
    	padding:0 60px 24px;
    	background: #293036;
    	/*text-align: center;*/
    	color:#fff;
    	box-sizing: border-box;
    }
    .header .body{
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
    	min-height: 280px;
    }
    .filebox{
    	height: 338px;
    	border-radius: 4px;
    	position: relative;
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
    	font-size: 32px;
    	color: #fff;
    	line-height: 338px;
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
    	border: 1px solid #CCC;
    	box-shadow: 0 0 5px #ccc;
    	margin: 0;
    	padding: 0;
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
  .box-txt .ivu-icon{
  	cursor: pointer;
  }
  .box-txt .ivu-icon:hover{
  	color: red;
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
</style>
