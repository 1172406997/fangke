<template>

	<div class="layout-l" >
    <canvas id="c" style="position: relative;left:10px;right:30px;"></canvas>
    <!--<img src="../../dist/instatic/img/1.d80e543.png" id="taget"/>-->
    </div>
</template>

<script>
	import 'fabric/dist/fabric.js'
export default {
	data () {
		return{
			isActive:false,
		}
	},
	mounted(){
    var self = this;
    var startPoint = new fabric.Point();
    var endPoint = new fabric.Point();

    var canvas = new fabric.Canvas('c', {
      backgroundColor: 'rgba(127,255,170,0.2)',
      width: 500,
      height: 400,
    });
    fabric.Image.fromURL("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507817322315&di=947aa54914cd1aa8d140d091b5e66e56&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa6efce1b9d16fdfab6fb9f8bbe8f8c5494ee7b3b.jpg", function(oImg) {

      oImg.set('width', 500);
      oImg.set('height', 400);
      oImg.selectable = false;
      oImg.evented = false;
      oImg.lockMovementX = true;
      oImg.lockMovementY = true;
      oImg.lockRotation = true;
      oImg.lockScalingX = true;
      oImg.lockScalingY = true;
      oImg.lockUniScaling = true;
      oImg.hasControls = false;
      oImg.hasBorders = false;
      canvas.add(oImg);
      canvas.defaultCursor = 'crosshair';
      var rect = new fabric.Rect({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        fill: 'rgba(0,0,0,0.1)',
      });
      canvas.add(rect);
      canvas.on('mouse:down', function(options){
        startPoint = options.e;
      });
      canvas.on('mouse:up', function(options){
        endPoint = options.e;
        var _width = endPoint.clientX - startPoint.clientX;
        var _height = endPoint.clientY - startPoint.clientY;
        rect.set({
          width: _width,
          height: _height,
          left: startPoint.clientX,
          top: startPoint.clientY,
          fill: 'rgba(0,0,0,0.1)',
        });
        oImg.set({
          left: 0,
          top: 0,
          //width:_width,
          //height:_height,
          //裁剪，原位置在中心，要定位在左上
          clipTo: function (ctx) {
            ctx.rect(parseInt(startPoint.clientX)-(oImg.getWidth()/2), parseInt(startPoint.clientY)-(oImg.getHeight()/2),
              _width, _height);
          }
        });
      });
    });

  },
	methods:{
		routerTo(url){
			this.$router.push({path: url});
		},
		init(){},
	}

}
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
	textarea{
		    border: 0;
		    outline: none;
		    -webkit-tap-highlight-color: transparent;
		    -webkit-appearance: none;
		    -moz-appearance: none;
		    appearance: none;
	}
	 .layout{
        border: 1px solid #d7dde4;
        background: #293036;
        line-height: 48px;
    	height: 48px;
    	min-width: 900px;
    }
    .top.ivu-menu.ivu-menu-dark.ivu-menu-horizontal{
    	line-height: 48px;
    	height: 48px;
    	background: #293036;
    	min-width: 900px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 8px;
        left: 20px;
        margin-right: 30px;
    }
    .layout-nav{
        /*width: 420px;*/
        /*margin: 0 auto;*/
       margin-left: 30px;
    }
    .layout-text{
    	font-size: 12px;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        margin-left: 30px;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 10px;
        color: #9ea7b4;
    }

    .myintro{
    	width: 208px;
    	box-sizing: border-box;
    	overflow: hidden;
    }
    .myintro textarea{
    	padding: 6px 12px;
	    width: 216px;
	    height: 165px;
	    color: #b2c0c8;
	    font-size: 12px;
	    line-height: 24px;
	    overflow-y: auto;
	    border-radius: 2px;
	    background-color: #f2f2f3;
	    resize: none;
	    border: none;
	    box-sizing: border-box;
    }
    .myintro span.text{
    	display: inline-block;
	    width: 150px;
	    height: 32px;
	    line-height: 16px;
	    font-size: 12px;
	    color: #b2c0c8;
	    word-wrap:break-word;
	    word-break:break-all;
    }
    .creat{
    	width: 120px;
    }
    .creat>.top{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    	border-bottom: 1px solid #f4f4f4;
    }
    .creat>.bottom{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    }
   	.ivu-menu-light{
    	z-index: -0;
    }
</style>
