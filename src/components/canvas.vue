<template>
	<div class="layout canvas">
		<Row type="flex">
			<i-col :span="spanLeft" class="layout-menu-left">
				<Menu active-name="2" style="text-align: center;" theme="dark" width="100%" @on-select="forname" class="layout-left left">
					<!--<div class="layout-logo-left"></div>-->
					<Tooltip content="退出" style="width:100%;" placement="bottom">
						<Menu-item name="1" @click.native="backUp">
							<Icon type="arrow-left-a" size='24'></Icon>
							<!--<Icon type="arrow-left-a" size='24'></Icon>-->
							<!--<span class="layout-text">退出</span>-->
						</Menu-item>
					</Tooltip>
					<Tooltip content="搜索" style="width:100%;" placement="bottom">
					<Menu-item name="2">
						<Icon type="ios-search-strong" size='24'></Icon>
						<!--<Icon type="ios-search-strong" size='24'></Icon>-->
						<!--<span class="layout-text">搜索</span>-->
					</Menu-item>
					</Tooltip>
					<Tooltip style="width:100%;" content="单品" placement="bottom">
					<Menu-item name="3" on-select="unitemy()">
						<Icon type="ios-box" size='24'></Icon>
						<!--<span class="layout-text">单品</span>-->
					</Menu-item>
					</Tooltip>
					<Tooltip content="辅助效果" placement="bottom">
					<Menu-item name="5" @click="add()" on-select="effectmy">
						<Icon type="wand" size='22'></Icon>
						<!--<span class="layout-text">选项 1</span>-->
						<!--<span class="layout-text">辅助</span>-->
					</Menu-item>
					</Tooltip>
					<Tooltip content="拼图"  placement="bottom">
					<Menu-item name="4" @click.native="noticeShow()" on-select="puzzmy">
						<Icon type="images" size='22'></Icon>
						<!--<span class="layout-text">拼图</span>-->
						<!--<Icon type="ios-navigate" :size="iconSize"></Icon>-->
					</Menu-item>
					</Tooltip>
					<Tooltip content="详情" placement="bottom">
					<Menu-item name="6" @click.native="noticeShow()" on-select="detailmy">
						<Icon type="information-circled" size='22'></Icon>
						<!--<span class="layout-text">详情</span>-->
						<!--<span class="layout-text">选项 1</span>-->
					</Menu-item>
					</Tooltip>
				</Menu>
			</i-col>
			<i-col :span="spanRight" class="left" width="100%">
				<!--<div class="layout-header">-->
				<div class="layout-ceiling">
					<div class="layout-ceiling-main">
						<a href="javascript:;" @click="writeName">保存</a> |
						<a href="#" @click="exportImg" id="downloadFtsetBtn">导出高清大图</a> |
						<!--<a href="#">服务大厅</a>   | -->
						<a href="javascript:;" @click="Clear">清空</a> |
						<a href="javascript:;" @click="">
							<Dropdown trigger="click">
								<a href="javascript:;">画布设置</a>
								<DropdownMenu slot="list">
									<DropdownItem @click.native="setCanvasSize(Canvas,1103,780)">A3(横)</DropdownItem>
									<DropdownItem @click.native="setCanvasSize(Canvas,546,780)">A3(竖)</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</a>
						<div class="right" style="margin-right: 20px;">
							<!--<a href="#" class="left">片羽时光</a> -->
							<!--<a href="#" class="left">显示菜单</a>-->
							<a href="javascript:;" class="left">
								<i-switch size="large" v-model="state" @click.native="changState(state)" style="position: relative;bottom: 2;">
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
						<div class="search" v-show="name==2">
							<div class="search-title">
								<Input v-model="value1" style="width: 90%; margin-top: 10px;">
								<Select v-model="select1" slot="prepend" style="width: 80px">
									<Option value="day">单品</Option>
								</Select>
								<Button slot="append" icon="ios-search" @click="searchBy(value1)"></Button>
								</Input>
								<div class="search-content">
									<!--搜索信息列表-->
									<div class="content_con" v-if="flag">
										<h2 style="margin-top: 10px;">分类标签</h2>
										<Row>
											<!-- -->
											<div class="conlist_show">
												<div class="conlist_con">
													<div class="conlist_content">
														<!--<Col span="11" class="classify" v-for="(itemd , index) in item"
                                 @click.native="getclassify(itemd.id)">-->
														<!--<p>{{itemd.name}}</p>-->
														<!--<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt=""/>
                            </Col>-->
														<div class="searchclassfy" v-for="(itemd , index) in item" @click="getclassify(itemd.id)">
															<img :src="'http://static.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
														</div>
													</div>
												</div>
											</div>
										</Row>
									</div>
									<!--搜索结果列表-->
									<div class="content_con2" v-if="!flag">
										<h2 style="margin-top: 10px;margin-right: 20px;">搜索结果 <span style="cursor:pointer;float: right;" @click="backSearch()">退出</span></h2>
										<div class="conlist_show">
											<!--<div class="conlist_con">
						                        <Col span="6" style="background-color: #fff;position:relative;" class="con2">
						                        <img src="../assets/logo.png" alt=""/>
						                        <p>一只一只</p>
						                        </Col>
						                        <Col span="6" v-for="(itemd , index) in searchi"
						                             style="background-color: #fff;position:relative;" class="con2">
						                        <img :src="itemd.path" alt=""/>
						                        <p>一只一只</p>
						                        </Col>-->
                        				<div class="conlist_con">
											<div class="dan" @click="" v-for="item in searchi">
												<div class="img" :style="'background-image: url(http://static.shatuhome.com/material/thumbNew/'+item.thumbNew+');background-position:center center;background-repeat:no-repeat;background-size:contain;'">
													<!--<img :src="'http://static.shatuhome.com/material/'+item.filename" alt="" />-->
													<div class="modal" style="display: none;"></div>
													<div class="icon">
														<Tooltip content="添加" @click.native="searchAddImg(item.filename,item.id)" placement="bottom">
													      	<Icon type="android-exit"></Icon>
												        </Tooltip>
													</div>
												</div>
												<div class="nam">
													{{item.name}}
												</div>
												<div class="price" style="display: none;">
													{{item.price}}￥
												</div>
											</div>
										</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					<div class="my" v-show="name==3">
						<canvasmy @imgdata="getChildImg"></canvasmy>
					</div>
					<!--<div class="puzz" v-show="name==4">
						<brand></brand>
					</div>-->
					<div class="effect" v-show="name==5">
						<effect @imgdata="getChildImg"></effect>
					</div>
					<!--<div class="detail" v-show="name==6">
		              <detail></detail>
		            </div>-->
				</div>
	</div>
	<div class="layout-content" style="padding:0px">
		<div class="layout-content-style ">
			<div class="menubox" v-if="menu_1==1">
				<Tooltip content="裁剪" @click.native="Clip" placement="bottom">
					<!--<svg class="icon" style="fill:currentcolor;transform:scale(1.1)">
						<use xlink:href="#icon-shoucang"></use>
					</svg>-->
					<Icon type="crop"></Icon>
				</Tooltip>
				<Tooltip content="变形"@click.native="twistImg" placement="bottom">
                    <Icon type="android-map"></Icon>
                </Tooltip>
				<Tooltip content="锁定" @click.native="lockImg" placement="bottom">
					<!--<svg class="icon" v-show='imgLock' style="fill:currentcolor;transform:scale(1.1)">
						<use xlink:href="#icon-suo_faaa_siyou"></use>
					</svg>
					<svg class="icon" v-show='!imgLock' style="fill:currentcolor;transform:scale(1.1)">
						<use xlink:href="#icon-suo_faaa_gongkai"></use>
					</svg>-->
					<Icon type="locked" v-show='imgLock'></Icon>
					<Icon type="unlocked" v-show='!imgLock'></Icon>
				</Tooltip>
				<Tooltip content="镜像" @click.native="flippHor" placement="bottom">
					<!--<svg class="icon" v-show='!imgLock' style="fill:currentcolor;transform:scale(1.1)">
						<use xlink:href="#icon-jingxiang"></use>
					</svg>-->
					<Icon type="arrow-swap"></Icon>
				</Tooltip>
				<Tooltip content="复制" @click.native="copyImg" placement="bottom">
					<Icon type="images"></Icon>
				</Tooltip>
				<!--<Poptip title="" content="" placement="bottom-start">-->
				<Tooltip content="滤镜" @click.native="showFilter" placement="bottom">
					<Icon type="ios-settings-strong"></Icon>
				</Tooltip>
				<Dropdown trigger="click">
					<Tooltip content="上下层级" placement="bottom">
						<Icon type="navicon-round"></Icon>
					</Tooltip>
					<DropdownMenu slot="list">
						<DropdownItem @click.native="UpLayer">上移一层</DropdownItem>
						<DropdownItem @click.native="DownLayer">下移一层</DropdownItem>
						<DropdownItem @click.native="FirstLayer">置顶</DropdownItem>
						<DropdownItem @click.native="LastLayer">置底</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<!--<Tooltip content="颜色" placement="bottom">
					<ColorPicker v-model="color5" @on-change="changeColor"/>
				</Tooltip>-->
				<Tooltip content="关闭" @click.native="closeNone" style="float: right;color: #ccc;" placement="bottom">
					<Icon type="close-round"></Icon>
				</Tooltip>
				<Tooltip content="删除" style="float: right;color: #ccc;" @click.native="elemRemove" placement="bottom">
					<Icon type="trash-b"></Icon>
				</Tooltip>
			</div>
			<div class="menubox" v-if="menu_1==2" style="padding:0 150px 0 150px;">
				<Tooltip content="取消" @click.native="menuNone" placement="bottom">
					<Icon type="close-round"></Icon>
				</Tooltip>
				<Poptip title="" style="float: right;" v-model="filterVisible" v-if="filterMenu" content="" placement="bottom-start">
					<Tooltip content="滤镜" @click.native="Filter" placement="bottom">
						<Icon type="ios-settings-strong"></Icon>
					</Tooltip>
					<div slot="content" style="width: 180px;">
						颜色：<br/><input type="color" @change="onColorChange()" style="width: 100%;margin-top: 2px;" v-model="color" value="#400000"/><br/><br/>
						亮度：
						<Slider class="slid" @on-input="brightnessFilter" v-model="brightness" :min="-100" :max="100" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
						对比度：
						<Slider class="slid" @on-input="contrastFilter" v-model="contrast" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
						清晰度：
						<Slider class="slid" @on-input="blurFilter" v-model="blur" :min="0" :max="100" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
						饱和度：
						<Slider class="slid" @on-input="saturationFilter" v-model="saturation" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
						透明度：
           				<Slider class="slid" @on-input="lucencyImg" v-model="lucency" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
					</div>
				</Poptip>
				<Tooltip content="保存" @click.native="menuYes" style="float: right;color: #9ACD32;" placement="bottom">
					<Icon type="checkmark-round"></Icon>
				</Tooltip>

			</div>
			<div class="menubox" v-if="menu_1==3" style="padding:0 150px 0 150px;">
				<Tooltip content="取消" @click.native="imgToBack()" placement="bottom">
					<Icon type="close-round"></Icon>
				</Tooltip>
				<Tooltip content="保存" @click.native="imgToSave()" style="float: right;color: #9ACD32;" placement="bottom">
					<Icon type="checkmark-round"></Icon>
				</Tooltip>
			</div>
			<div class="layout-content-main">
				<div class="parent" >
					<canvas class="one box" id="parent" ></canvas>
				</div>
				<div id="div" >
					<canvas id="canvas" height="800" width="800"></canvas>
    				<canvas id="canvas-2d" height="800" width="800"></canvas>
				</div>
			</div>
		</div>
	</div>
	</i-col>
	</Row>
	<Modal v-model="backYeaOrNo" title="退出提示" @on-ok="ok" @on-cancel="cancel"> <p>您需要保存么？</p></Modal>
	<!--<Modal v-model="noticeShowlist" title="提示" ><h1>功能正在开发中，敬请期待！</h1></Modal>-->
	</div>
</template>

<script>
	import canvasmy from "../components/pages/canvasmy.vue"
   	import brand from "../components/pages/Brand"
	import effect from "../components/pages/effect"
	import detail from "../components/pages/detail"

	export default {
		data() {
			return {
				spanLeft: 1,
				spanRight: 23,
				select1: "",
				value1: '',
				name: 2,
				item: {},
				flag: true,
				childUrl: '',
				Canvas: '',
				selectItem: "",
				imgLock: true,
				brightness: -50,
				contrast: 50,
				blur: 50,
				saturation: 50,
				lucency: 50,
				color: '',
				value: '',
				data: '',
				status: 0,
				item: '',
				thumb: "",
				state: false,
				idData: [],
				menu_1: 1,
				secCAnvas: '',
				imgActive: '',
				filterMenu: false,
				filterVisible: true,
				//搜索相关
				//一级id
				fasClass: "",
				//搜索结果，单品
				searchi: "",
				backYeaOrNo:false,
				noticeShowlist:false,
				filterVisible1:true,
				color5:'#000',
				cropItemid:0,
				winWidth:1103,
				winHeight:780,
			}
		},
		computed: {
			iconSize() {
				return this.spanLeft === 1 ? 12 : 24;
			},
		},
		watch: {
			'idData' (val, Val1) {},
		},
		components: {
			canvasmy,
			effect,
			detail,
			brand,
		},
		created: function() {
			this.getsearch();
		},
		mounted() {
			this.getCanvas();
			if(this.$route.params.id) {
				this.getProducId();
			}
			if(this.$route.path=='/canvas'){
    		$(document).ready(function(){
					$(document).on("mouseover",".canvas .search .dan",function(){
							$(this).find(".modal").show();
							$(this).find(".icon").show();
							$(this).children(".nam").hide();
							$(this).children(".price").show();
					});
				    $(document).on("mouseout",".canvas .search .dan",function(){
							$(this).find(".modal").hide();
							$(this).find(".icon").hide();
							$(this).children(".nam").show();
							$(this).children(".price").hide();
				    });
				});
    		}
		},
		methods: {
			setCanvasSize(canvas,width,height){
				this.setCanvasDimension(canvas,width,height);
				this.winWidth = width;
				this.winHeight = height;
				this.toDate(canvas);
			},
			toDate(canvas){
				var list = this.Canvas.toJSON();
				this.Canvas.loadFromJSON(list);
				canvas.renderAll();
			},
			onColorChange(){
//				alert(this.color);
				this.colorFilter();
			},
			noticeShow(){
//				this.noticeShowlist = true;
				 this.$Modal.confirm({
                    title: '提示',
                    content: '<p>功能正在开发中，敬请期待！</p>',
                    okText: 'OK',
                });
			},
			writeName() {
				if(this.$route.params.id&&this.$route.params.up!='up') {
					this.UpDate(this.$route.params.id);
					return;
				}
				this.$Modal.confirm({
					render: (h) => {
						return h('Input', {
							props: {
								value: this.value,
								autofocus: true,
								placeholder: '请输入作品名称'
							},
							on: {
								input: (val) => {
									this.value = val;
								}
							},

						})
					},
					onOk: () => {
						if(this.value == '') {
							this.$Message.warning('名称不能为空');

						} else {
							this.saveCanvas();
//							this.$router.push({name: 'content'});
						}
					},
					onCancel: () => {
						this.$Message.info('取消保存');
					},
				})
			},
			//再编辑更新接口
			UpDate(id){
				var self = this;
				var svg = this.Canvas.toDataURL();
				var data = this.Canvas.toJSON();

				data = JSON.stringify(data);

				//      var svg = this.Canvas.toDataURL({format: 'jpeg'});
				var str = self.Encrypt();
				var items = [];
				var imgdate = this.Canvas.getObjects("image");
				for(let i = 0; i < imgdate.length; i++) {
					if($.inArray(imgdate[i].imgId, items) == -1) {
						items.push(imgdate[i].imgId)
					}
				}
				var titems = items.join(',');
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var params = {
					'signature': str.sha,
					'timestamp': str.timestamp,
					'nonce': str.nonce,
					'user_id': user_id,
					'token': token,
					'production_id':id,
					'name': this.value,
					'data': data,
					'thumb': svg,
					'items': titems,
					'status': self.status,
				};
				this.postRequest("Production.UpdateProduction",params, function(res) {
					console.log(res)
					if(res.data.code == 0) {
//						var list = res.body.data.list[0].production.data;
//						self.Canvas.loadFromJSON(list);
						self.$Message.info('保存成功！');
						self.$router.push({
							name: 'content'
						});
//						console.log(res.body.data.list[0].production.data);
					} else {
						console.log(res);
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
					this.$Message.info('网络有问题，请刷新重试！');
				});
			},
			//如果有id直接获取数据初始化到画布
			getProducId() {
				var self = this;
				var id = this.$route.params.id;
				var str = this.Encrypt();
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var params = {
					params: {
						'signature': str.sha,
						'timestamp': str.timestamp,
						'nonce': str.nonce,
						'user_id': user_id,
						'token': token,
						 'production_id': id,
					}
				};
				this.jsonpRequest(this, "Production.GetProductionById", params, function(res) {
					console.log(res);
					if(res.body.data.code == 0) {
						var list = res.body.data.list[0].production.data;
						self.value = res.body.data.list[0].production.name;
            console.log(list);
            list = JSON.parse(list);
            console.log(list);
            for (var i = 0; i<list.objects.length; i++) {
              if (list.objects[i].clipPos){
                console.log(list.objects[i].clipTo);
                list.objects[i].clipTo = function(ctx) {
                  ctx.rect((parseInt(this.clipPos.clipStartPoint.x) - (this.width / 4)) * 2, (parseInt(this.clipPos.clipStartPoint.y) - (this.height / 4)) * 2,
                    this.clipPos.clipWidth * 2, this.clipPos.clipHeight * 2);
                };
                console.log(list.objects[i].clipTo);
              }
            }
						self.Canvas.loadFromJSON(list);
					} else {
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
			},
			saveCanvas() {
				var self = this;
				var svg = this.Canvas.toDataURL();
				var data = this.Canvas.toJSON(['clipPos','positions']);
        for (var i = 0; i<data.objects.length; i++) {
          console.log(data.objects[i].clipTo);
          data.objects[i].clipTo = null;
          console.log(data.objects[i].clipTo);
        }
				data = JSON.stringify(data);
				//      var svg = this.Canvas.toDataURL({format: 'jpeg'});
				var str = this.Encrypt();
				var items = [];
				var imgdate = this.Canvas.getObjects("image");
				for(let i = 0; i < imgdate.length; i++) {
					if($.inArray(imgdate[i].imgId, items) == -1) {
						items.push(imgdate[i].imgId)
					}
				}
				var titems = items.join(',');
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var params = {
					'signature': str.sha,
					'timestamp': str.timestamp,
					'nonce': str.nonce,
					'user_id': user_id,
					'token': token,
					'name': this.value,
					'data': data,
					'thumb': svg,
					'items': titems,
					'status': self.status,
				};
				this.postRequest("Production.StoreProduction", params, function(res) {
					console.log(res.data.code);
					if(res.data.code == 0) {
						self.$Message.info("保存成功！");
					} else {
						console.log(res);
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
			},
			changState(state) {
				if(state) {
					this.status = 1;
				} else {
					this.status = 0;
				}
			},
			getCanvas() {
				var self = this
				var staticCanvas = new fabric.Canvas('parent');
				self.Canvas = staticCanvas;
				self.Canvas.preserveObjectStacking = true;
				self.setCanvasDimension(self.Canvas, self.winWidth, self.winHeight);
				self.Canvas.backgroundColor = "#fff";
				self.Canvas.on('object:selected', function(opt) {
					self.selectItem = opt;
					self.menu_1 = 1;
					self.imgActive = opt.target;
					self.imgLock = opt.target.selectable;
					self.selectItem.target.imgLock = self.selectItem.target.hasControls;
					console.log(opt.target);
					//          console.log("--------------------");
					//          console.log(self.selectItem.target.imgLock);
					//          console.log("--------------------");
				});

			},
			add: function() {
				var oParent = document.getElementById('#parent');
				var additem = '<div class="div1" onmousemove="posMove(this.className)"></div>';
				oParent.append(additem);
			},
			elemRemove: function() {
				var self = this;
				self.Canvas.remove(self.selectItem.target);
			},
			//水平翻转
			flippHor: function() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
				//        console.log(this.selectItem);

				self.selectItem.target.flipX = !self.selectItem.target.flipX;
				//hasControls
				self.Canvas.renderAll();
			},
			//lock and unlock
			lockImg: function() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
				if(self.selectItem.target.imgLock) {
					self.imgActive.lockMovementX = true;
					self.imgActive.lockMovementY = true;
					self.imgActive.lockRotation = true;
					self.imgActive.lockScalingX = true;
					self.imgActive.lockScalingY = true;
					self.imgActive.lockUniScaling = true;
					self.imgActive.hasControls = false;
					self.imgActive.hasBorders = false;
				} else {
					self.imgActive.lockMovementX = false;
					self.imgActive.lockMovementY = false;
					self.imgActive.lockRotation = false;
					self.imgActive.lockScalingX = false;
					self.imgActive.lockScalingY = false;
					self.imgActive.lockUniScaling = false;
					self.imgActive.hasControls = true;
					self.imgActive.hasBorders = true;
				}
				//        self.imgLock = !self.imgLock;
				self.selectItem.target.imgLock = !self.selectItem.target.imgLock;
				//	        		self.selectItem.target.selectable = self.imgLock;
				self.Canvas.renderAll();
			},
			twistImg: function() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				};
//				console.log(self.Canvas.getActiveObject().toDataURL({
//					format: 'png'
//				}));
				$(".parent").hide();
				$("#div").show();
				this.menu_1 = 3;
				//给img.src设置图片的地址,设置完成打开页面即可显示需要显示的内容
			    var _obj = self.Canvas.getActiveObject();
			    self.cropItemid = _obj.imgId;
//			    img.src = "http://www.quanjing.com/image/2017index/lx4.png";
			    var _objSrc = _obj.toDataURL({
					format: 'png'
				});
				
				console.log(addImage());
				if (_obj.positions)
				{
					addImage(_obj.positions.canvas.data,_obj.positions);
				}else
				{
					addImage(_objSrc);
				}


//			    img.onload = imgLoad;


	//		    调用save("图片的名称")方法，浏览器即可自动保存,接受传值，为下载后的图片的名字

			},
			imgToSave(){
				var self = this;
				save(function(_img){
	        		self.Canvas.remove(self.Canvas.getActiveObject());

					fabric.Image.fromURL(_img.data, function(oImg) {
						$(".parent").show();
						$("#div").hide();
						self.Canvas.add(oImg);
						oImg.positions = _img.position;
						oImg.imgId = self.cropItemid;
						console.log(oImg);

					});
				});



			},
			imgToBack(){
				this.menu_1 = 1;
				$(".parent").show();
				$("#div").hide();
			},
			//copy
			copyImg: function() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
				var _active = self.Canvas.getActiveObject();
        _active.clone(
					function(oImg) {
					  console.log(_active);
					  console.log(oImg);
					  if (_active.clipPos) {
              oImg.clipPos = _active.clipPos;
            }
						self.Canvas.add(oImg);
					}
				)
				self.Canvas.renderAll();
			},
			//设置canvas的宽高
			//以下数据来自美间
			// A3 横版 1103*780
			// A3 竖版 546*780
			// 1:1 780*780
			//16:9 1350*759
			setCanvasDimension(canvas, width, height) {
//				var list = this.Canvas.toJSON();
				canvas.setWidth(width);
				canvas.setHeight(height);
//				this.Canvas.loadFromJSON(list);
//				canvas.renderAll();
			},
			exportImg() {
				var self = this;
				var con = self.Canvas.toDataURL({
					format: 'png'
				});
				//    	javascript:void(window.open().location = con);
				//    	var image = new Image();
				// canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
				// 指定格式 PNG
				//		    image.src = con;
				this._download("down", con);
			},
			_download: function(filename, content) {
				//  		var blob = new Blob([content], {type: 'image/jpeg'});
				var a = document.getElementById('downloadFtsetBtn');
				a.download = "fileName";
				a.href = content;
				//      console.log(a);
				//      try{
				//          var URL=window.URL || window.webkitURL;
				//          a.href=URL.createObjectURL(blob);
				//          a.download = filename;
				//          if (typeof navigator.msSaveBlob == "function"){  //IE
				//              navigator.msSaveBlob(blob,filename);
				//　　　　　　 }
				//       		a.click();
				//       	}
				//	        catch(e){
				//
				//	       	}

			},
			//搜索相关方法
			//获取type
			getsearch: function() {
				var str = this.Encrypt();
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var params = {
					params: {
						'signature': str.sha,
						'timestamp': str.timestamp,
						'nonce': str.nonce,
						'user_id': user_id,
						'token': token
					}
				};
				this.jsonpRequest(this, "Type.GetAllType", params, function(res) {
					if(res.body.data.code == 0) {
						this.$set(this, 'item', res.data);
						this.item = res.body.data.list;
					} else {
						console.log(res);
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
			},
			//通过类型获取单品
			getclassify: function(id) {
				var self = this;
				this.flag = false;
				this.fasClass = id;
				var str = this.Encrypt();
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var params = {
					params: {
						'signature': str.sha,
						'timestamp': str.timestamp,
						'nonce': str.nonce,
						'user_id': user_id,
						'token': token,
						"type_id": id
					}
				};
				this.jsonpRequest(this, "Material.GetMaterial", params, function(res) {
					if(res.body.data.code == 0) {
						this.searchi = res.body.data.list;
						console.log(res);
						self.flag = false;
					} else {
						console.log(res);
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
				//		this.getByTermal(id);
			},
			//通过keyword 查询
			//通过typeId 和 keyword 查询
			searchBy(res) {
				if(this.fasClass != '') {
					this.secSearch(res);
				} else {
					this.flag = false;
					var str = this.Encrypt();
					var user_id = localStorage.getItem("user_id");
					var token = localStorage.getItem("token");
					var params = {
						params: {
							'signature': str.sha,
							'timestamp': str.timestamp,
							'nonce': str.nonce,
							'user_id': user_id,
							'token': token,
							"keyword": res
						}
					};
					this.jsonpRequest(this, "Material.GetMaterialByKeyWord", params, function(res) {
						if(res.body.data.code == 0) {
							this.searchi = res.body.data.list;
						} else {
							if(res.body.ret == 401) {
								self.toLogin(this, 401);
							}
						}
					}, function(err) {
						console.log(err);
					});
				}
			},
			secSearch(res) {
				var self = this;
				var str = this.Encrypt();
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				this.flag = false;
				var params = {
					params: {
						'signature': str.sha,
						'timestamp': str.timestamp,
						'nonce': str.nonce,
						'user_id': user_id,
						'token': token,
						"keyword": res,
						'type_id': self.fasClass
					}
				};
				this.jsonpRequest(this, "Material.GetMaterialByKeyWordAndTypeId", params, function(res) {
					if(res.body.data.code == 0) {
						this.searchi = res.body.data.list;
						console.log("search:" + this.searchi);
					} else {
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
			},
			getProductionBy: function() {
				var str = this.Encrypt();
				var user_id = localStorage.getItem("user_id");
				var token = localStorage.getItem("token");
				var production_id = this.$router.params.id;
				var params = {
					params: {
						'signature': str.sha,
						'timestamp': str.timestamp,
						'nonce': str.nonce,
						'user_id': user_id,
						'token': token,
						'production_id': production_id,
					}
				};
				this.jsonpRequest(this, "Production.GetProductionById", params, function(res) {
					if(res.body.data.code == 0) {
						//          console.log(res)
					} else {
						console.log(res);
						if(res.body.ret == 401) {
							self.toLogin(this, 401);
						}
					}
				}, function(err) {
					console.log(err);
				});
			},
			UpLayer() {
				var self = this;
				var _item = self.Canvas.getActiveObject();
				self.Canvas.bringForward(_item);
			},
			DownLayer() {
				var self = this;
				var _item = self.Canvas.getActiveObject();
				self.Canvas.sendBackwards(_item);
			},
			FirstLayer() {
				var self = this;
				var _item = self.Canvas.getActiveObject();
				self.Canvas.bringToFront(_item);

			},
			LastLayer() {
				var self = this;
				var _item = self.Canvas.getActiveObject();
				self.Canvas.sendToBack(_item);
			},
			UpdateImg(item, canvas) {},
			ApplyFilter(item, index, filt) {
				if(!item || item.filters[index]) {
					return;
				}
				item.filters[index] = filt;
			},
			ApplyFilterValue(item, index, name, value, canvas) {
				if(item && item.filters[index]) {
					item.filters[index][name] = value;
					item.applyFilters();
					canvas.renderAll();
//					console.log(item);
				}
			},
			showFilter() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
//				self.Canvas.setWidth(0);
//				self.Canvas.setHeight(0);
				self.setCanvasDimension(self.Canvas, 0, 0);
				self.filterMenu = true;
				self.menu_1 = 2;
				self.Filter();
			},
			//滤镜
			Filter() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
				self.menu_1 = 2;
				if($("#secCanvas").length <= 0) {
					var newdom = $("<canvas id='secCanvas' style='z-index: 50'></canvas>");
					$('.parent').append(newdom);
				}
				var clip = new fabric.Canvas("secCanvas", {
					//          backgroundColor: 'rgba(255,255,255,0.2)',
				});
				self.secCanvas = clip;
//				self.secCanvas.setWidth(1103);
//				self.secCanvas.setHeight(780);
				
				self.setCanvasDimension(self.secCanvas, self.winWidth, self.winHeight);
				self.imgActive.clone(function(oImg) {
          if (self.imgActive.clipPos) {
            oImg.clipPos = self.imgActive.clipPos;
          }
          var _img = oImg;

          _img.left = 0;
					_img.top = 0;
					self.ApplyFilter(_img, 0, new fabric.Image.filters.Brightness({
						'brightness': parseFloat(self.brightness / 100)
					}));
					self.ApplyFilter(_img, 1, new fabric.Image.filters.Contrast());
					self.ApplyFilter(_img, 2, new fabric.Image.filters.Blur({
						'blur': 0
					}));
					self.ApplyFilter(_img, 3, new fabric.Image.filters.Saturation());
					self.ApplyFilter(_img, 4, new fabric.Image.filters.BlendColor({
		            color: '#fff',
		            mode: 'add',
		            alpha: 0.5
		          }));
					_img.applyFilters();
					_img.lockMovementX = true;
					_img.lockMovementY = true;
					_img.lockRotation = true;
					_img.lockScalingX = true;
					_img.lockScalingY = true;
					_img.lockUniScaling = true;
					_img.hasControls = false;
					_img.hasBorders = false;
					self.secCanvas.add(_img);
//          self.Canvas.remove(self.imgActive);
				})
			},
		      colorFilter(){
		        var self = this;
		        var _img = self.secCanvas.getObjects()[0];
		        console.log(self.color);
		        self.ApplyFilterValue(_img, 4, 'color', self.color, self.secCanvas);
		      },
			changeColor(){
				var self = this;
				console.log(this.color5);
				console.log(self.imgActive);
				var _img = self.imgActive;
				if (!_img.filters[4])
				{
					self.ApplyFilter(_img, 4, new fabric.Image.filters.BlendColor({
			            color: self.color5,
			            mode: 'add',
			            alpha: 1
		          	}));
				}
				self.ApplyFilterValue(_img, 4, 'color', self.color5, self.Canvas);
//				self.Canvas.renderAll();


			},
			brightnessFilter: function() {
				var self = this;
				var _img = self.secCanvas.getObjects()[0];
				//        self.ApplyFilterValue(_img, 0, 'brightness', parseFloat((self.brightness) / 50 - 1), self.secCanvas);
//				console.log(self.brightness / 100);
				self.ApplyFilterValue(_img, 0, 'brightness', parseFloat(self.brightness / 100), self.secCanvas);
			},
			contrastFilter() {
				var self = this;
				var _img = self.secCanvas.getObjects()[0];
//				console.log(parseFloat((self.contrast) / 50 - 1));

				self.ApplyFilterValue(_img, 1, 'contrast', parseFloat((self.contrast) / 50 - 1), self.secCanvas);
			},
			blurFilter() {
				var self = this;
				var _img = self.secCanvas.getObjects()[0];
				self.ApplyFilterValue(_img, 2, 'blur', parseFloat(self.blur / 100, 10), self.secCanvas);
			},
			saturationFilter() {
				var self = this;
				var _img = self.secCanvas.getObjects()[0];
//				console.log(parseFloat(self.saturation / 50 - 1));

				self.ApplyFilterValue(_img, 3, 'saturation', parseFloat(self.saturation / 50 - 1), self.secCanvas);
			},
      lucencyImg(){
        var self = this;
        var _img = self.secCanvas.getObjects()[0];
        console.log(parseFloat(1-self.lucency/100));
        _img.set({opacity: parseFloat(1-self.lucency/100)});
        self.secCanvas.renderAll();
      },
			Clip() {
				var self = this;
				if(!self.Canvas.getActiveObject()) {
					return;
				}
				if($("#secCanvas").length <= 0) {
					var newdom = $("<canvas id='secCanvas' style='z-index: 50'></canvas>");
					$('.parent').append(newdom);
				}
        self.menu_1 = 2;
//				self.Canvas.setWidth(0);
//				self.Canvas.setHeight(0);
				self.setCanvasDimension(self.Canvas, 0, 0);
				var clip = new fabric.Canvas("secCanvas", {
					backgroundColor: 'rgba(255,255,255,0.2)',
				});
				self.secCanvas = clip;
				self.imgActive.clone(function(oImg) {
          		oImg.scale(0.5);
         		 oImg.clipTo = null;
          		oImg.clipPos = null;
					clip.setWidth(oImg.width / 2);
					clip.setHeight(oImg.height / 2);
					oImg.left = 0;
					oImg.top = 0;
					clip.add(oImg);
			          oImg.evented = false;
			          oImg.lockMovementX = true;
			          oImg.lockMovementY = true;
			          oImg.lockRotation = true;
			          oImg.lockScalingX = true;
			          oImg.lockScalingY = true;
			          oImg.lockUniScaling = true;
			          oImg.hasControls = false;
			          oImg.hasBorders = false;
			          oImg.clipPos = {};
			          oImg.clipPos.clipStartPoint = new fabric.Point();
			          oImg.clipPos.clipEndPoint = new fabric.Point();
			          self.clipitemId = oImg.imgId;
					clip.defaultCursor = 'crosshair';
					var rect = new fabric.Rect({
						width: 0,
						height: 0,
						left: 0,
						top: 0,
						fill: 'rgba(0,0,0,0.1)',
					});
					clip.on('mouse:down', function(options) {
						var getPoint = clip.getPointer(options.e, true);
            oImg.clipPos.clipStartPoint = getPoint;
					});
					clip.on('mouse:up', function(options) {
						var getPoint = clip.getPointer(options.e, true);
            oImg.clipPos.clipEndPoint = getPoint;
            oImg.clipPos.clipWidth = parseInt(oImg.clipPos.clipEndPoint.x) - parseInt(oImg.clipPos.clipStartPoint.x);
            oImg.clipPos.clipHeight = parseInt(oImg.clipPos.clipEndPoint.y) - parseInt(oImg.clipPos.clipStartPoint.y);
						clip.add(rect);
						rect.set({
							width: oImg.clipPos.clipWidth,
							height: oImg.clipPos.clipHeight,
							left: parseInt(oImg.clipPos.clipStartPoint.x),
							top: parseInt(oImg.clipPos.clipStartPoint.y),
							fill: 'rgba(0,0,0,0.1)',
						});
            oImg.scale(0.5).set({
							//裁剪，原位置在中心，要定位在左上
							clipTo: function(ctx) {
								ctx.rect((parseInt(this.clipPos.clipStartPoint.x) - (this.width / 4)) * 2, (parseInt(this.clipPos.clipStartPoint.y) - (this.height / 4)) * 2,
                  this.clipPos.clipWidth * 2, this.clipPos.clipHeight * 2);
							}
						});
					})
				});
			},
			forname(name) {
				if(name==4||name==6){
					return;
				}
				this.name = name;
			},
			getChildImg(item) {
				this.childUrl = item.url;
				var self = this;
				if(item.id){
					this.idData.push(item.id);
				}
				fabric.Image.fromURL(item.url, function(oImg) {
					console.log(oImg)
					console.log(oImg.crossOrigin)
					oImg.crossOrigin="anonymous";
					oImg.scale(0.5);
					oImg.imgId = item.id;
					self.Canvas.add(oImg);
				},null,'crossOrigin=anonymous');
			},
			searchAddImg(name,id){
				var item = {url:'http://www.shatuhome.com/material/'+name,id:id};
				this.childUrl = item.url;
				var self = this;
				this.idData.push(item.id);
				fabric.Image.fromURL(item.url, function(oImg) {
					oImg.scale(0.5);
					oImg.crossOrigin = "anonymous";
					oImg.imgId = item.id;
					self.Canvas.add(oImg);
				});
			},
			menuNone() {
				var self = this;
				self.filterMenu = false;
				this.imgActive.evented = true;
				this.imgActive.lockMovementX = false;
				this.imgActive.lockMovementY = false;
				this.imgActive.lockRotation = false;
				this.imgActive.lockScalingX = false;
				this.imgActive.lockScalingY = false;
				this.imgActive.lockUniScaling = false;
				this.imgActive.hasControls = true;
				this.imgActive.hasBorders = true;
				this.secCanvas.clear();
				this.secCanvas.dispose();
//				this.secCanvas.setWidth(0);
//				this.secCanvas.setHeight(0);
//				this.Canvas.setWidth(1103);
//				this.Canvas.setHeight(780);
				self.setCanvasDimension(self.secCanvas, 0, 0);
				self.setCanvasDimension(self.Canvas, self.winWidth, self.winHeight);
				this.menu_1 = 1;
			},
			menuYes() {
				var self = this;
				self.filterMenu = false;
				var getObjImgs = this.secCanvas.getObjects("image");
				var getObjImg = getObjImgs[0];
				getObjImg.evented = true;
				getObjImg.lockMovementX = false;
				getObjImg.lockMovementY = false;
				getObjImg.lockRotation = false;
				getObjImg.lockScalingX = false;
				getObjImg.lockScalingY = false;
				getObjImg.lockUniScaling = false;
				getObjImg.hasControls = true;
				getObjImg.hasBorders = true;

        self.imgActive.evented = true;
        self.imgActive.lockMovementX = false;
        self.imgActive.lockMovementY = false;
        self.imgActive.lockRotation = false;
        self.imgActive.lockScalingX = false;
        self.imgActive.lockScalingY = false;
        self.imgActive.lockUniScaling = false;
        self.imgActive.hasControls = true;
        self.imgActive.hasBorders = true;
        self.Canvas.remove(self.imgActive);

        self.Canvas.add(getObjImg);
//      self.secCanvas.setWidth(0);
//      self.secCanvas.setHeight(0);
        self.secCanvas.clear();
        self.secCanvas.dispose();
//				self.Canvas.setWidth(1103);
//				self.Canvas.setHeight(780);
			self.setCanvasDimension(self.secCanvas, 0, 0);
			self.setCanvasDimension(self.Canvas, self.winWidth, self.winHeight);
//        self.setCanvasDimension(self.Canvas, 1103, 780);

				this.menu_1 = 1;
			},
			backUp() {
				var self = this;
				this.backYeaOrNo = true
//				this.$Modal.confirm({
//					title: '退出提示',
//					content: '您需要保存么？',
//					onOk: () => {
//						this.writeName();
//					},
//					onCancel: () => {
//						this.$router.push({
//							name: 'content'
//						});
//					}
//				});
			},
			closeNone() {
				this.menu_1 = false;
			},
			Clear() {
				this.Canvas.clear();
			},
			backSearch(){
				this.flag = true;
			},
			ok () {
               this.writeName();
            },
            cancel () {
                this.$router.push({
					name: 'content'
				});
            },
		},

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.layout {
		min-width: 1650px;
		min-height: 709px;
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: absolute;
		left:0;
		right: 0;
		top: 0;
		bottom: 0;
		border-radius: 4px;
		overflow: hidden;
	}

	.ivu-menu-light {
		z-index: -0;
	}

	.layout-ceiling {
		background: #293036;
		/*padding: 10px 0;*/
		height: 55px;
		line-height: 55px;
		overflow: hidden;
	}

	.layout-ceiling-main {
		margin-right: 15px;
	}

	.ivu-menu-item {
		background-color: #293036;
	}

	.layout-ceiling .layout-ceiling-main a {
		margin-left: 10px;
		color: #fff;
	}

	.layout-breadcrumb {
		float: left;
		min-width: 200px;
		width: 23%;
		min-height: 672px;
		height: 100%;
	}

	.layout-content {
		/*position: relative;*/
		/*margin: 0 auto;*/
		display: flex;
		justify-content: center;
		float: left;
		width: 77%;
		overflow: hidden;
		min-height: 600px;
		padding: 0px 0px 10px 5px;
		/*margin-top: 15px;*/
		overflow: hidden;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.layout-content-style {
		width: 100%;
		min-height: 700px;
		background-color: #fff;
	}

	.layout-content-main {
		padding: 10px;
		overflow: auto;
	}

	.layout-copy {
		text-align: center;
		padding: 10px 0 20px;
		color: #9ea7b4;
	}

	.layout-menu-left {
		background: #293036;
		min-height: 710px;
		float: left;
	}

	.layout-header {
		height: 60px;
		background: #fff;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
	}

	.layout-logo-left {
		width: 90%;
		height: 30px;
		background: #293036;
		border-radius: 3px;
		margin: 15px auto;
	}

	.layout-ceiling-main a {
		color: #293036;
	}

	.layout-hide-text .layout-text {
		display: none;
	}

	.layout-text {
		/*font-size: 12px;*/
	}

	li.ivu-menu-item {
		/*height: 37.6px;*/
	}

	.ivu-col {
		overflow: hidden;
		transition: width .2s ease-in-out;
		/*height: 100%;*/
	}
	.ivu-row-flex{
		height: 100%;
	}
	.aside {
		float: left;
		width: 100%;
		min-height: 672px;
		background-color: #353F48;
		overflow-y: auto;
		height: 100%;
	}

	.search-title {
		margin-left: 20px;
		margin-bottom: 20px;
	}

	.search-content>div>p {
		line-height: 48px;
		/*font-size: 12px;*/
	}

	.con2 {
		position: relative;
		overflow: hidden;
		margin: 10px;
	}

	.con2>img {
		max-width: 90%;
		max-height: 90%;
		float: right;
	}

	.con2>p {
		padding: 5px 10px;
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

	.content-con2>h2 {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.my>div>p {
		line-height: 48px;
		color: #fff;
		margin-left: 20px;
	}

	#parent {
		position: relative;
		width: 300px;
		height: 500px;
	}

	.parent {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.parent .one {
		width: 388px;
		height: 554px;
		border-radius: 25px;
		box-shadow: 1px 2px 5px #293036;
		overflow: hidden;
	}

	.div1 {
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
		border: 1px dashed #666;
		cursor: col-resize;
	}

	.box .t,
	.box .b {
		width: 100%;
		/*height: 2px;*/
		border: 1px dashed #666;
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

	.menubox {
		width: 100%;
		box-shadow: 0 0 5px #ccc;
		height: 42px;
		float: left;
		margin-bottom: 20px;
		line-height: 42px;
		padding: 0 20px 0 10px;
		font-size: 24px;
	}

	.menubox .ivu-icon {
		margin-left: 10px;
		cursor: pointer;
		/*margin-left: 10px;*/
	}
	/*search 样式*/

	.classify>p {
		position: absolute;
		display: inline;
		/*width: auto;*/
		/*height: 17px;*/
		top: 10px;
		left: 10px;
		font-size: 16px;
		z-index: 1;
	}

	.layout-content {
		position: relative;
		height: 100%;
	}

	.layz {
		position: absolute;
		top: 0px;
		left: 50%;
		display: none;
	}

	.con-content2 {
		padding: 0 24px;
	}

	.con2 {
		text-align: center;
		line-height: none;
		cursor: pointer;
	}

	.classify {
		background-color: #fff;
		position: relative;
		height: 112px;
		margin: 5px;
		cursor: pointer;
		border-radius: 2px;
	}

	.classify:hover {
		box-shadow: 2px 2px 5px #888888;
		;
	}
	/*搜索样式*/

	.searchclassfy {
		position: relative;
		/*width: 130px;
		height: 87px;*/
		width: 9.5vw;
		height: 7.2vw;
		border-radius: 10px;
		margin: 5px;
		cursor: pointer;
		float: left;
	}

	.searchclassfy img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.searchclassfy:hover {
		box-shadow: 2px 2px 5px #888888;
		;
	}

	.con2>img {
		max-width: 90%;
		max-height: 90%;
	}

	.con2>p {
		padding: 5px 14px;
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

	.con2 .show {
		display: block;
		position: absolute;
		top: 10px;
		font-size: 1.5em;
		right: 10px;
		width: 30px;
		height: 30px;
		line-height: 30px;
		background-color: #fff;
		z-index: 2;
	}

	.con2 .hover {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: none;
		/*margin: 0 auto;*/
		background-color: rgba(0, 0, 0, .1);
	}

	.classify>img {
		position: absolute;
		width: 100%;
		height: 100%;
		right: 0px;
		border-radius: 2px;
		z-index: 0;
		bottom: 0px;
	}

	.ivu-menu-light {
		z-index: -0;
	}

	.dan {
		width: 9vw;
		height: 11vw;
		padding: 12px 12px 0px;
		background-color: #fff;
		border-radius: 5px;
		position: relative;
		margin: 5px;
		/*margin-left: 60px;*/
		cursor: pointer;
		float: left;
		overflow: hidden;
	}

	.dan:hover {
		box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
		-webkit-box-shadow: 0 4px 12px rgba(6, 31, 50, .24);
	}

	.img {
		position: relative;
		width: 100%;
		height: 80%;
		margin-bottom: 5px;
	}

	.img>img {
		width: 100%;
		height: 100%;
	}

	.modal {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: none;
		border-radius: 2px;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.icon {
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		color: #7E8E98;
		background-color: #fff;
		border-radius: 5px;
		position: absolute;
		top: 10px;
		right: 10px;
		display: none;
		cursor: pointer;
	}

	.nam {
		width: 100%;
		line-height: 18px;
	}

	.price {
		width: 100%;
		display: none;
		line-height: 18px;
	}

	.icon:hover {
		color: #3B454C;
	}

	.ivu-menu-light {
		z-index: -0;
	}
	.content_con2{
		position: relative;
	}
	/*滚动显示样式*/

	.conlist_show {
		position: absolute;
		width: 100%;
		overflow: hidden;
		height: 732px;
	}

	.conlist_con {
		width: calc(100% + 20px);
		min-height: 570px;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	/*滑动框样式*/

	.slid .ivu-slider-wrap {
		margin-top: 7px;
	}
	/*clip*/

	#clip {
		position: absolute;
	}

	.canvas-container {
		poaition: absolute;
		left: 0;
		top: 0;
	}
	/*侧边滑动*/
	.layout-left  ul li{
		cousor:pointer;
	}
	/*padding调整*/
	/*.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
		padding:0;
	}
	.ivu-menu-item>i {
		line-height: 37.6px;
	}
	.ivu-tooltip{
		width: 100%;
	}
	.ivu-icon .ivu-icon-ios-box{
		width: 100%;
	}
	.ivu-tooltip .ivu-tooltip-rel{
		width: 100% !important;
	}
	.ivu-menu-item{
		width: 100%;
	}*/
	#div{
		position: relative;
		display: none;
	}
	canvas {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
