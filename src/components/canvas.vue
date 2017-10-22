<template>
  <div class="layout">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="2" theme="dark" width="100%" @on-select="forname" class="left">
          <!--<div class="layout-logo-left"></div>-->
            <Menu-item name="1"  @click.native="backUp">
              <Icon type="arrow-left-a"></Icon>
              <span class="layout-text">退出</span>
            </Menu-item>
          <Menu-item name="2">
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
          <Menu-item name="5" @click="add()" on-select="effectmy">
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
            <a href="javascript:;" @click="writeName">保存</a> |
            <a href="#" @click = "exportImg">导出高清大图</a> |
            <!--<a href="#">服务大厅</a>   | -->
            <a href="javascript:;" @click="Clear">清空</a> |
            <a href="javascript:;" @click="Clear">
            	<Dropdown trigger="click">
	               <a href="javascript:;">画布设置</a>
                <DropdownMenu slot="list">
                  <DropdownItem @click.native="setCanvasDimension(Canvas,1103,780)">A3(横)</DropdownItem>
                  <DropdownItem @click.native="setCanvasDimension(Canvas,546,780)">A3(竖)</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </a>
            <div class="right" style="margin-right: 20px;">
              <!--<a href="#" class="left">片羽时光</a> -->
              <!--<a href="#" class="left">显示菜单</a>-->
              <a href="javascript:;" class="left">
                <i-switch size="large" v-model="state" @click.native="changState(state)"
                          style="position: relative;bottom: 2;">
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
                <Button slot="append" icon="ios-search" @click="search(value1)"></Button>
                </Input>
                <!--搜索列表-->
                <div class="layout-content">
										<Spin size="large" class="layz"></Spin>
										<div class="content_con"  v-if="flag" >
											<Row >
												<h2>分类标签</h2>
												<!--<div v-on:click="getclassify()">
												<Col span="4"  class="classify" v-on:click="getclassify()">
									        	<p>椅子</p>
									        	<img src="../assets/img/yizi.png" style="" alt="" />
									       </Col>
									       </div>-->
									       <div class="searchclassfy" v-for="(itemd , index) in item" @click="getclassify(itemd.id)">
									       		<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
									       </div>
									        <!--<Col span="4" class="classify" v-for="(itemd , index) in item" @click.native="getclassify(itemd.id)">
									        	<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
									        </Col>-->
									    </Row>
										</div>
										<div class="content_con2" v-if="!flag">
											<div v-show="fenlei=='fenlei'">
											<h2>更多分类 <p style="float: right;cursor: pointer;" @click="flag=true">返回</p></h2>
												<Row >
													<div v-on:click="getclassify()">
													<!--<Col span="4"  class="classify" v-on:click="getclassify()">-->
										        	<!--<p>椅子</p>-->
										        	<!--<img src="../assets/img/yizi.png" style="" alt="" />-->
										       <!--</Col>-->
										       </div>
										       <div class="searchclassfy" v-for="(itemd , index) in secClass" @click="getByTermal(itemd.id)">
									       			<img :src="'http://www.shatuhome.com/typeimg/'+itemd.image" style="" alt="" />
									       		</div>
										    </Row>
										  	</div>
										  	<div >
											<h2>搜索结果<p style="float: right;cursor: pointer;" @click="flag=true">返回</p></h2>
												<div >
											       <!--<div class="dan">
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
														<div class="dan" @click="listenClick(item.id)" v-for="item in searchi">
												      <div class="img">
												      	<img :src="'http://static.shatuhome.com/material/'+item.filename" alt="" />
												      	<div class="modal" @click="modalS(item)" style="display: none;"></div>
												        <div class="icon">
												      	<Tooltip content="收藏" placement="bottom">
													      	<Icon type="archive" @click.native="StoreLike(item.id)"></Icon>
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
            <div class="puzz" v-show="name==4">
              <!--<brand></brand>-->
            </div>
            <!--<div class="effect" v-show="name==5">
              <effect></effect>
            </div>-->
            <div class="detail" v-show="name==6">
              <detail></detail>
            </div>
          </div>
        </div>
        <div class="layout-content" style="padding:0px">
          <div class="layout-content-style ">
            <div class="menubox" v-if="menu_1==1">
              <Tooltip content="裁剪" @click.native="Clip" placement="bottom">
                <Icon type="crop"></Icon>
              </Tooltip>
              <!--<Tooltip content="变形"@click.native="twistImg" placement="bottom">
                              <Icon type="android-map"></Icon>
                          </Tooltip>-->
              <Tooltip content="锁定" @click.native="lockImg" placement="bottom">
                <Icon type="locked" v-show='imgLock'></Icon>
                <Icon type="unlocked" v-show='!imgLock'></Icon>
              </Tooltip>
              <Tooltip content="镜像" @click.native="flippHor" placement="bottom">
                <Icon type="arrow-swap"></Icon>
              </Tooltip>
              <Tooltip content="复制" @click.native="copyImg" placement="bottom">
                <Icon type="images"></Icon>
              </Tooltip>
              <!--<Poptip title="" content="" placement="bottom-start">-->
              <Tooltip content="滤镜" @click.native="showFilter" placement="bottom">
                <Icon type="ios-settings-strong"></Icon>
              </Tooltip>
              <!--<div slot="content" style="width: 180px;">
                              颜色：<br/><input type="color" style="width: 100%;margin-top: 2px;" v-model="color" value="#400000" /><br/><br/>
                              亮度：<Slider class="slid" @on-input="brightnessFilter" v-model="brightness" :min="0" :max="100" :step="1" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                              对比度：<Slider class="slid" @on-input="contrastFilter" v-model="contrast" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                              饱和度：<Slider class="slid" @on-input="blurFilter" v-model="blur" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                              清晰度：<Slider class="slid" @on-input="saturationFilter" v-model="saturation" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                              透明度：<Slider class="slid" oninput="xxxxx" v-model="lucency" style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                          </div>-->
              <!--</Poptip>-->
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
                   	 <!--颜色：<br/><input type="color" style="width: 100%;margin-top: 2px;" v-model="color"
                                 value="#400000"/><br/><br/>-->
                  	亮度：
                  <Slider class="slid" @on-input="brightnessFilter" v-model="brightness" :min="-100" :max="100"
                          style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                 	 对比度：
                  <Slider class="slid" @on-input="contrastFilter" v-model="contrast"
                          style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                  	饱和度：
                  <Slider class="slid" @on-input="blurFilter" v-model="blur" :min="0" :max="100"
                          style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                  	清晰度：
                  <Slider class="slid" @on-input="saturationFilter" v-model="saturation"
                          style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>
                  	<!--透明度：
                  <Slider class="slid" oninput="xxxxx" v-model="lucency"
                          style="width: 88%;padding-left: 10px;margin-top: 2px;"></Slider>-->
                </div>
              </Poptip>
              <Tooltip content="保存" @click.native="menuYes" style="float: right;color: #9ACD32;" placement="bottom">
                <Icon type="checkmark-round"></Icon>
              </Tooltip>

            </div>
            <div class="layout-content-main">
              <div class="parent" style="width: 320px;height: 720px;">
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
  /*import brand from "../components/pages/Brand"*/
  import effect from "../components/pages/effect"
  import detail from "../components/pages/detail"

  export default {
    data() {
      return {
        spanLeft: 2,
        spanRight: 22,
        select1: "",
        value1: '',
        name: 2,
        item: {},
        flag: true,
        childUrl: '',
        Canvas: '',
        selectItem: "",
        imgLock: true,
        brightness: 50,
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
        filterMenu:false,
        filterVisible:true,
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 2 ? 14 : 24;
      },
    },
    watch: {
      'idData'(val, Val1) {
      },
    },
    components: {
      canvasmy, effect, detail
    },
    created: function () {
      this.getsearch();
      console.log();
    },
    mounted() {
      this.getCanvas();
      if(this.$route.params.id){
      	this.getProducId()
      }
    },
    methods: {
      writeName() {
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
            if (this.value == '') {
              this.$Message.warning('名称不能为空');

            } else {
              this.saveCanvas();
            }
          },
          onCancel: () => {
            this.$Message.info('取消保存');
          },
        })
      },
			//如果有id直接获取数据初始化到画布      
      getProducId(){
      	var id = this.$route.params.id;
      	var str = this.Encrypt();
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
        var params = {
          params: {
            'signature': str.sha, 'timestamp': str.timestamp, 'nonce': str.nonce, 'user_id': user_id, 'token': token,production_id:id,
          }
        };
        this.jsonpRequest(this, "Production.GetProductionById", params, function (res) {
        	console.log(res)
          if (res.body.data.code == 0) {
            console.log(res)
          } else {
            console.log(res);
            if (res.body.ret == 401) {
              self.toLogin(this, 401);
            }
          }
        }, function (err) {
          console.log(err);
        });
      },
      saveCanvas() {
        var self = this;
        var svg = this.Canvas.toDataURL();
        var data = this.Canvas.toJSON().toString();
//      var svg = this.Canvas.toDataURL({format: 'jpeg'});

        console.log(this.Canvas)
        console.log(svg);
        var str = this.Encrypt();
        var items = [];
        var imgdate = this.Canvas.getObjects("image");
        for (let i = 0; i < imgdate.length; i++) {
          if ($.inArray(imgdate[i].imgId, items) == -1) {
            items.push(imgdate[i].imgId)
          }
        }
        var titems = items.join(',');
        console.log(typeof(titems));
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
        this.postRequest("Production.StoreProduction", params, function (res) {
        	console.log(res.data.code)
          if (res.data.code == 0) {
						
          } else {
            console.log(res);
            if (res.body.ret == 401) {
              self.toLogin(this, 401);
            }
          }
        }, function (err) {
          console.log(err);
        });
      },
      changState(state) {
        if (state) {
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
        self.setCanvasDimension(self.Canvas, 1103, 780);
//        self.Canvas.setWidth(800);
//        self.Canvas.setHeight(800);
        self.Canvas.on('object:selected', function (opt) {
        self.selectItem = opt;
        self.menu_1 = 1;
        self.imgActive = opt.target;
        self.imgLock = opt.target.selectable;
        self.selectItem.target.imgLock = self.selectItem.target.hasControls;
//          console.log("--------------------");
//          console.log(self.selectItem.target.imgLock);
//          console.log("--------------------");
        });

      },
      add: function () {
        var oParent = document.getElementById('#parent');
        var additem = '<div class="div1" onmousemove="posMove(this.className)"></div>';
        oParent.append(additem);
      },
      elemRemove: function () {
        var self = this;
        self.Canvas.remove(self.selectItem.target);
      },
      //水平翻转
      flippHor: function () {
        var self = this;
        if (!self.Canvas.getActiveObject()) {
          return;
        }
//        console.log(this.selectItem);

        self.selectItem.target.flipX = !self.selectItem.target.flipX;
        //hasControls
        self.Canvas.renderAll();
      },
      //lock and unlock
      lockImg: function () {
        var self = this;
        if (!self.Canvas.getActiveObject()) {
          return;
        }
        if (self.selectItem.target.imgLock) {
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
      twistImg: function () {
        var self = this;
        console.log(self.selectItem.target.aCoords.bl)
        self.Canvas.renderAll();
      },
      //copy
      copyImg: function () {
        var self = this;
        if (!self.Canvas.getActiveObject()) {
          return;
        }
        ;
        self.selectItem.target.clone(
          function (oImg) {
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
      setCanvasDimension (canvas, width, height){
        canvas.setWidth(width);
        canvas.setHeight(height);
      },
      exportImg(){
      	var self = this;
      	self.Canvas.toDataURL();
      },
      getsearch: function () {
        var str = this.Encrypt();
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
        var params = {
          params: {
            'signature': str.sha, 'timestamp': str.timestamp, 'nonce': str.nonce, 'user_id': user_id, 'token': token
          }
        };
        this.jsonpRequest(this, "Type.GetAllType", params, function (res) {
          if (res.body.data.code == 0) {
            this.$set(this, 'item', res.data);
            this.item = res.body.data.list;
            console.log("item:" + this.item);
            console.log(res)
          } else {
            console.log(res);
            if (res.body.ret == 401) {
              self.toLogin(this, 401);
            }
          }
        }, function (err) {
          console.log(err);
        });
      },
       getProductionBy: function () {
        var str = this.Encrypt();
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
        var production_id = this.$router.params.id;
        var params = {
          params: {
            'signature': str.sha, 'timestamp': str.timestamp, 'nonce': str.nonce, 'user_id': user_id, 'token': token,'production_id':production_id,
          }
        };
        this.jsonpRequest(this, "Production.GetProductionById", params, function (res) {
          if (res.body.data.code == 0) {
            console.log(res)
          } else {
            console.log(res);
            if (res.body.ret == 401) {
              self.toLogin(this, 401);
            }
          }
        }, function (err) {
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
      UpdateImg(item, canvas) {
      },
      ApplyFilter(item, index, filt) {
        if (!item || item.filters[index]) {
          return;
        }
        item.filters[index] = filt;
      },
      ApplyFilterValue(item, index, name, value, canvas) {
        if (item && item.filters[index]) {
          item.filters[index][name] = value;
          item.applyFilters();
          canvas.renderAll();
          console.log(item);
        }
      },
      showFilter() {
        var self = this;
        if (!self.Canvas.getActiveObject()) {
          return;
        }
        self.Canvas.setWidth(0);
        self.Canvas.setHeight(0);
        self.filterMenu = true;
        self.menu_1 = 2;
        self.Filter();
      },
      //滤镜
      Filter() {
        var self = this;
        if (!self.Canvas.getActiveObject()) {
          return;
        }
        self.menu_1 = 2;
        if ($("#secCanvas").length <= 0) {
          var newdom = $("<canvas id='secCanvas' style='z-index: 50'></canvas>");
          $('.parent').append(newdom);
        }
        var clip = new fabric.Canvas("secCanvas", {
//          backgroundColor: 'rgba(255,255,255,0.2)',
        });
        self.secCanvas = clip;
        self.secCanvas.setWidth(800);
        self.secCanvas.setHeight(800);
        self.imgActive.clone(function (oImg) {
          var _img = oImg;
          _img.left = 0;
          _img.top = 0;
          self.ApplyFilter(_img, 0, new fabric.Image.filters.Brightness({'brightness':parseFloat(self.brightness/100)}));
          self.ApplyFilter(_img, 1, new fabric.Image.filters.Contrast());
          self.ApplyFilter(_img, 2, new fabric.Image.filters.Blur({'blur': 0}));
          self.ApplyFilter(_img, 3, new fabric.Image.filters.Saturation());
          _img.applyFilters();
          self.secCanvas.add(_img);
//        self.Canvas.remove(self.imgActive);
        })
      },
      brightnessFilter: function () {
        var self = this;
        var _img = self.secCanvas.getObjects()[0];
//        self.ApplyFilterValue(_img, 0, 'brightness', parseFloat((self.brightness) / 50 - 1), self.secCanvas);
        console.log(self.brightness/100);
        self.ApplyFilterValue(_img, 0, 'brightness', parseFloat(self.brightness/100), self.secCanvas);
      },
      contrastFilter() {
        var self = this;
        var _img = self.secCanvas.getObjects()[0];
        console.log(parseFloat((self.contrast) / 50 - 1));

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
        console.log(parseFloat(self.saturation / 50 - 1));

        self.ApplyFilterValue(_img, 3, 'saturation', parseFloat(self.saturation / 50 - 1), self.secCanvas);
      },
      Clip() {
        var self = this;
        var startPoint = new fabric.Point();
        var endPoint = new fabric.Point();
//        console.log(self.Canvas.getActiveObject());
        if (!self.Canvas.getActiveObject()) {
          return;
        }
        if ($("#secCanvas").length <= 0) {
          var newdom = $("<canvas id='secCanvas' style='z-index: 50'></canvas>");
          $('.parent').append(newdom);
        }
        self.menu_1 = 2;
        self.Canvas.setWidth(0);
        self.Canvas.setHeight(0);
        var clip = new fabric.Canvas("secCanvas", {
          backgroundColor: 'rgba(255,255,255,0.2)',
        });
        self.secCanvas = clip;
        self.imgActive.clone(function (oImg) {
          clip.setWidth(oImg.width / 2);
          clip.setHeight(oImg.height / 2);
          oImg.left = 0;
          oImg.top = 0;
          oImg.fill = 'rgba(0, 255, 0, 1)';
//          oImg.scale(0.5);
          console.log(oImg);
          self.Canvas.remove(self.imgActive);
          clip.add(oImg);
          var beforeImg = oImg;
          beforeImg.evented = false;
          beforeImg.lockMovementX = true;
          beforeImg.lockMovementY = true;
          beforeImg.lockRotation = true;
          beforeImg.lockScalingX = true;
          beforeImg.lockScalingY = true;
          beforeImg.lockUniScaling = true;
          beforeImg.hasControls = false;
          beforeImg.hasBorders = false;
          clip.defaultCursor = 'crosshair';
          var rect = new fabric.Rect({
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            fill: 'rgba(0,0,0,0.1)',
          });
          clip.on('mouse:down', function (options) {
            var getPoint = clip.getPointer(options.e, true);
//            console.log(getPoint);
            startPoint = getPoint;
//            console.log('startPoint' + parseInt(startPoint.x));
//            console.log('startPoint' + parseInt(startPoint.y));
//            startPoint.x = 0;
//            startPoint.y = 10;
          });
          clip.on('mouse:up', function (options) {
            var getPoint = clip.getPointer(options.e, true);
//            console.log(getPoint);
            endPoint = getPoint;
//            console.log('end' + parseInt(endPoint.x));
//            console.log('end' + parseInt(endPoint.x));
            var _width = parseInt(endPoint.x) - parseInt(startPoint.x);
            var _height = parseInt(endPoint.y) - parseInt(startPoint.y);
            clip.add(rect);
            rect.set({
              width: _width,
              height: _height,
              left: parseInt(startPoint.x),
              top: parseInt(startPoint.y),
              fill: 'rgba(0,0,0,0.1)',
            });
            beforeImg.scale(0.5).set({
//                      left: 0,
//                      top: 0,
              //width:_width,
              //height:_height,
              //裁剪，原位置在中心，要定位在左上
              clipTo: function (ctx) {
                ctx.rect((parseInt(startPoint.x) - (beforeImg.width / 4))*2, (parseInt(startPoint.y) - (beforeImg.height / 4))*2,
                  _width * 2, _height * 2);
              }
            });
//            beforeImg.relStartPoint = (parseInt(startPoint.x) - (beforeImg.width / 4))*2;
//            beforeImg.relEndPoint = (parseInt(startPoint.y) - (beforeImg.height / 4))*2;
//            beforeImg.relClipWidth = _width * 2;
//            beforeImg.relClipHeight = _height * 2;
            console.log(beforeImg);
          })
        });
      },
      search: function (keyword) {
        this.flag = false;
        var self = this;
        //		var self = this;
        var str = this.Encrypt();
        var user_id = localStorage.getItem("user_id");
        var token = localStorage.getItem("token");
        var params = {
          'signature': str.sha,
          'timestamp': str.timestamp,
          'nonce': str.nonce,
          'user_id': user_id,
          'token': token,
          'keyword': keyword
        };
        this.postRequest("Material.GetMaterialByKeyWord", params, function (res) {
          if (res.body.data.code == 0) {
            self.searchi = res.body.data.list;
            console.log("search:" + self.searchi);
            console.log(res);
          } else {
            console.log(res);
            if (res.body.ret == 401) {
              self.toLogin(this, 401);
            }
          }
        }, function (err) {
          console.log(err);
        });
      },
      forname(name) {
        this.name = name;
      },
      getChildImg(item) {
        this.childUrl = item.url;
        var self = this;
        this.idData.push(item.id);
        fabric.Image.fromURL(item.url, function (oImg) {
          oImg.scale(0.5);
          oImg.imgId = item.id;
          self.Canvas.add(oImg);
        });
      },
      menuNone() {
        var self = this;
        self.filterMenu=false;
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
        this.secCanvas.setWidth(0);
        this.secCanvas.setHeight(0);
        this.Canvas.setWidth(800);
        this.Canvas.setHeight(800);
        this.menu_1 = 1;
      },
      menuYes() {
        var self = this;
        self.filterMenu=false;
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
        this.Canvas.setWidth(800);
        this.Canvas.setHeight(800);
        this.secCanvas.setWidth(0);
        this.secCanvas.setHeight(0);
        this.secCanvas.clear();
        this.secCanvas.dispose();
        this.imgActive.evented = true;
        this.imgActive.lockMovementX = false;
        this.imgActive.lockMovementY = false;
        this.imgActive.lockRotation = false;
        this.imgActive.lockScalingX = false;
        this.imgActive.lockScalingY = false;
        this.imgActive.lockUniScaling = false;
        this.imgActive.hasControls = true;
        this.imgActive.hasBorders = true;
        console.log(getObjImg);
//        getObjImg.scale(0.5).set({
//          //裁剪，原位置在中心，要定位在左上
//          clipTo: function (ctx) {
//            ctx.rect(this.relStartPoint, this.relEndPoint,
//              this.relClipWidth, this.relClipHeight);
//          }
//        });
        this.Canvas.add(getObjImg);
        this.menu_1 = 1;
        },
        backUp() {
        		this.$Modal.confirm({
        			title: '退出提示',
        			content: '请选择是否保存',
        			onOk: () => {
        				this.saveCanvas();
        				this.$router.push({name:'content'});
        			},
        			onCancel: () => {
        				this.$router.push({name:'content'});
        			}
        		});
        	},
        	closeNone() {
        		this.menu_1 = false;
        	},
        	Clear() {
        		this.Canvas.clear();
        	},
        },

        }</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .layout {
    height: 709px;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .ivu-menu-light {
    z-index: -0;
  }

  .layout-ceiling {
    background: #293036;
    padding: 10px 0;
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
    width: 30%;
    min-height: 672px;
  }

  .layout-content {
    /*position: relative;*/
    /*margin: 0 auto;*/
    display: flex;
    justify-content: center;
    float: left;
    width: 70%;
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
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #293036;
    height: 710px;
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
    font-size: 12px;
  }

  li.ivu-menu-item {
    height: 37.6px;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .aside {
    float: left;
    width: 100%;
    min-height: 672px;
    background-color: #353F48;
    overflow-y: auto;
  }

  .search-title {
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .search-content > div > p {
    line-height: 48px;
    font-size: 12px;
  }

  .con2 {
    position: relative;
    overflow: hidden;
    margin: 10px;
  }

  .con2 > img {
    max-width: 90%;
    max-height: 90%;
    float: right;
  }

  .con2 > p {
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

  .content-con2 > h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .my > div > p {
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

  .classify > p {
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
    box-shadow: 2px 2px 5px #888888;;
  }
  /*搜索样式*/
   .searchclassfy{
   	position: relative;
   	width:185px;
   	height: 124px;
   	border-radius: 10px;
   	margin: 5px;
		cursor: pointer;
		float: left;
   }
  .searchclassfy img{
   	position: absolute;
   	left: 0;
   	top: 0;
   	width: 100%;
   	height: 100%;
   	border-radius: 5px;
   }
   .searchclassfy:hover{
			box-shadow: 2px 2px 5px #888888;;
		}

  .con2 > img {
    max-width: 90%;
    max-height: 90%;
  }

  .con2 > p {
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

  .classify > img {
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
    width: 203px;
    height: 227px;
    padding: 12px 12px 0px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    margin: 10px;
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
    width: 179px;
    height: 179px;
  }

  .img > img {
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
    line-height: 36px;
  }

  .price {
    width: 100%;
    display: none;
    line-height: 36px;
  }

  .icon:hover {
    color: #3B454C;
  }

  .ivu-menu-light {
    z-index: -0;
  }

  /*滚动显示样式*/
  .conlist_show {
    width: 100%;
    overflow: hidden;
    height: 732px;
  }

  .conlist_con {
    width: calc(100% + 20px);
    height: 570px;
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
</style>

