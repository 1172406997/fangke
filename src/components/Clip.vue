<template>

	<div class="layout-l" >
	<!--<img src="../img/thumbnails/3dOcean_tn.jpg" alt="" />-->
    <canvas id="scale" style="position: relative;left:10px;right:30px;width:1000px;height: 600px;"></canvas>
    <!--<img src="../../dist/instatic/img/1.d80e543.png" id="taget"/>-->
    </div>
</template>

<script>
	import "@/assets/scale/matrix.js"
//	import "@/assets/scale/demo1.js"
export default {
	data () {
		return{
			isActive:false,
			ctx:'',
			canvas:'',
			dots:'',
			dotscopy:'',
			idots: '',
			count:'',
			img:'',
			hasRect:false,
			hasPic:true,
			hasDot:false,
		}
	},
	mounted(){
// 		 //是否显示点的checkbox
//	    var dotChoose = document.getElementById("dot");
//	    //是否显示方格的checkbox
//	    var rectChoose = document.getElementById("rect");
//	    //是否显示贴图的checkbox
//	    var picChoose = document.getElementById("pic");
//	    //将图片分割的分数控制
//	    var countChoose = document.getElementById("count");
		var self = this;
	    var hasDot = false,
	        hasRect = false,
	        hasPic = true;
        self.count = 30;
	
	    // dotChoose.onchange = function(){ hasDot = this.checked;render(); };
	    // rectChoose.onchange = function(){ hasRect = this.checked;render(); };
	    // picChoose.onchange = function(){ hasPic = this.checked;render(); };
	    // countChoose.onchange = function(){
	    //     count = getSelected();
	    //     //count更改后需要重新计算所有点的初始位置
	    //     idots = rectsplit(count, dotscopy[0], dotscopy[1], dotscopy[2], dotscopy[3]);
	    //     render();
	    // };
	    // //获取平分length
	    // function getSelected(){
	    //     var ops = countChoose.getElementsByTagName("OPTION") ,op;
	    //     for(var i=0;i<ops.length;i++){
	    //         op = ops[i];
	    //         if(op.selected)return +op.value;
	    //     }
	    // }
	
	    var canvas = document.getElementById("scale");
	    self.ctx = canvas.getContext("2d");
		this.canvas = canvas;
	    self.dots = [];
//	    self.dotscopy , 	
//	    self.idots;
	
	    var img = new Image();
	    img.src = '/instatic/img/img.1e49d7d.png';
	    img.onload = function(){
	        var img_w = img.width/2;
	        var img_h = img.height/2;
	        var left = (canvas.width - img_w)/2;
	        var top = (canvas.height - img_h)/2;
	
	        img.width = img_w;
	        img.height = img_h;
	
	        self.dots = [
	            { x:left, y:top },
	            { x:left + img_w, y:top },
	            { x:left + img_w, y:top + img_h},
	            { x:left, y:top + img_h}
	        ];
	
	        //保存一份不变的拷贝
	        self.dotscopy = [
	            { x:left, y:top },
	            { x:left + img_w, y:top },
	            { x:left + img_w, y:top + img_h},
	            { x:left, y:top + img_h}
	        ];
		   self.img = img;
	        //获得所有初始点坐标
	      self.idots = self.rectsplit(self.count, self.dotscopy[0], self.dotscopy[1], self.dotscopy[2], self.dotscopy[3]);
	      self.render();
    	};
    	
    /**
     * 鼠标拖动事件绑定
     * @param e
     */
    window.onmousedown = function(e){
        if(!self.dots.length)return;

        var area = self.getArea(e);
        var dot,i;
        //鼠标事件触发区域
        var qy = 40;

        for (i = 0; i < self.dots.length; i++) {
            dot = self.dots[i];
            if (area.t >= (dot.y - qy) && area.t <= (dot.y + qy) && area.l >= (dot.x - qy) && area.l <= (dot.x + qy)) {
                break;
            } else {
                dot = null;
            }
        }

        if(!dot) return;

        window.onmousemove = function(e){
            var narea = self.getArea(e);
            var nx = narea.l-area.l;
            var ny = narea.t-area.t;

            dot.x += nx;
            dot.y += ny;

            area = narea;

            self.render();
        };

        window.onmouseup = function(){
            window.onmousemove = null;
            window.onmouseup = null;
        }
    	};
  	},
	methods:{
		routerTo(url){
		},
		 /**
	     * 获取鼠标点击/移过的位置
	     * @param e
	     * @returns {{t: number, l: number}}
	     */
	     getArea(e){
	     	var self = this;
	        e = e || window.event;
	        return {
	            t : e.clientY - self.canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop,
	            l : e.clientX - self.canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft
	        }
	    },
	    render(){
	    var self = this;
        this.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

        var ndots = self.rectsplit(self.count, self.dots[0], self.dots[1], self.dots[2], self.dots[3]);

        ndots.forEach(function(d , i){
            //获取平行四边形的四个点
            var dot1 = ndots[i];
            var dot2 = ndots[i + 1];
            var dot3 = ndots[i + self.count + 2];
            var dot4 = ndots[i + self.count + 1];

            //获取初始平行四边形的四个点
            var idot1 = self.idots[i];
            var idot2 = self.idots[i + 1];
            var idot3 = self.idots[i + self.count + 2];
            var idot4 = self.idots[i + self.count + 1];

            if (dot2 && dot3 && i%(self.count+1)<self.count){
                //绘制三角形的下半部分
                self.renderImage(idot3, dot3, idot2, dot2, idot4, dot4);

                //绘制三角形的上半部分
                self.renderImage(idot1, dot1, idot2, dot2, idot4, dot4);
            }
	            //出现红点
	            if(self.hasDot){
	                self.ctx.save();
	                self.ctx.fillStyle = "red";
	                self.ctx.fillRect(d.x-1 , d.y-1 , 2 , 2);
	                self.ctx.save();
	            }
       		});
    	},
    	/**
     * 计算矩阵，同时渲染图片
     * @param arg_1
     * @param _arg_1
     * @param arg_2
     * @param _arg_2
     * @param arg_3
     * @param _arg_3
     */
    renderImage(arg_1 , _arg_1 , arg_2 , _arg_2 , arg_3 , _arg_3){
    	var self = this;
        this.ctx.save();
        //根据变换后的坐标创建剪切区域
        this.ctx.beginPath();
        this.ctx.moveTo(_arg_1.x, _arg_1.y);
        this.ctx.lineTo(_arg_2.x, _arg_2.y);
        this.ctx.lineTo(_arg_3.x, _arg_3.y);
        this.ctx.closePath();
        //出现红线
        if(self.hasRect){
            self.ctx.lineWidth = 2;
            self.ctx.strokeStyle = "red";
            self.ctx.stroke();
        }
        this.ctx.clip();

        if(self.hasPic){
            //传入变换前后的点坐标，计算变换矩阵
            var result = matrix.getMatrix.apply(this , arguments);

            //变形
            this.ctx.transform(result.a , result.b , result.c , result.d , result.e , result.f);

            //绘制图片
            this.ctx.drawImage(self.img , self.idots[0].x , self.idots[0].y , self.img.width , self.img.height);
        }

        this.ctx.restore();
    	},
    	
    	 /**
     * 将abcd四边形分割成n的n次方份，获取n等分后的所有点坐标
     * @param n     多少等分
     * @param a     a点坐标
     * @param b     b点坐标
     * @param c     c点坐标
     * @param d     d点坐标
     * @returns {Array}
     */
    rectsplit(n , a , b , c , d){
        //ad向量方向n等分
        var ad_x = (d.x - a.x)/n;
        var ad_y = (d.y - a.y)/n;
        //bc向量方向n等分
        var bc_x = (c.x - b.x)/n;
        var bc_y = (c.y - b.y)/n;

        var ndots = [];
        var x1, y1, x2, y2, ab_x, ab_y;

        //左边点递增，右边点递增，获取每一次递增后的新的向量，继续n等分，从而获取所有点坐标
        for(var i=0;i<=n;i++){
            //获得ad向量n等分后的坐标
            x1 = a.x + ad_x * i;
            y1 = a.y + ad_y * i;
            //获得bc向量n等分后的坐标
            x2 = b.x + bc_x * i;
            y2 = b.y + bc_y * i;

            for(var j=0;j<=n;j++){
                //ab向量为：[x2 - x1 , y2 - y1]，所以n等分后的增量为除于n
                ab_x = (x2 - x1)/n;
                ab_y = (y2 - y1)/n;

                ndots.push({
                    x: x1 + ab_x * j,
                    y: y1 + ab_y * j
                })
            }
        }
        return ndots;
	}
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
