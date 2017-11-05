<template>

  <div id="div" class="layout-l">
  	<canvas id="canvas" height="800" width="800"></canvas>
    <canvas id="canvas-2d" height="800" width="800"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    mounted() {
    	//给img.src设置图片的地址,设置完成打开页面即可显示需要显示的内容
	    var img = new Image();
	    img.src = "http://www.quanjing.com/image/2017index/lx4.png";
	    img.onload = imgLoad;
	    //调用save("图片的名称")方法，浏览器即可自动保存,接受传值，为下载后的图片的名字
	    setTimeout(function () {
//	        save("11111111");
	    },5000)
    },
    methods: {
      routerTo(url) {
      },
      Cancel(){},
      Save(){
        var self = this;
//        self.render();
//        var _left = self.dots[0].x < self.dots[3].x?self.dots[0].x : self.dots[3].x;
//        var _top = self.dots[0].y < self.dots[1].x?self.dots[0].y : self.dots[1].y;
//        var _relWidth = (self.dots[1].x - self.dots[0].x) > (self.dots[2].x - self.dots[3].x) ?
//                           self.dots[1].x - self.dots[0].x:self.dots[2].x - self.dots[3].x;
//        var _relHeight = (self.dots[3].y - self.dots[0].y) > (self.dots[2].y - self.dots[1].y) ?
//                            self.dots[3].y - self.dots[0].y : self.dots[2].y - self.dots[1].y;
//        var _width = self.img.width;
//        var _height = self.img.height;
//        var imgData = self.ctx.getImageData(_left,_top,_relWidth,_relHeight);
//        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
//        self.ctx.putImageData(imgData,0,0);
//        self.fabricCanvas = document.getElementById("fabCanvas");
//        self.fabricCanvas.width = _width;
//        self.fabricCanvas.height = _height;
//        self._ctx = self.fabricCanvas.getContext("2d");
//        self._ctx.putImageData(imgData,0,0);
        self.canvas.width = 0;
        self.canvas.height = 0;
//        console.log(self.img);
//
//        self.fabricCanvas = new fabric.Canvas("fabCanvas",{
//          width:1000,
//          height:500
//        });
//        fabric.Image.fromElement(self.img,function(oImg){
//          console.log(oImg);
//          self.fabricCanvas.add(oImg);
//        });
      },
      /**
       * 获取鼠标点击/移过的位置
       * @param e
       * @returns {{t: number, l: number}}
       */
      getArea(e) {
        var self = this;
        e = e || window.event;
        return {
          t : e.clientY - self.canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop,
          l : e.clientX - self.canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft
        }
      },
      render() {
        var self = this;
        this.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        this.fabricCtx.clearRect(0, 0, self.canvas.width, self.canvas.height);

        var ndots = self.rectsplit(self.count, self.dots[0], self.dots[1], self.dots[2], self.dots[3]);
        ndots.forEach(function (d, i) {
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

          if (dot2 && dot3 && i % (self.count + 1) < self.count) {
            //绘制三角形的下半部分
            self.renderImage(idot3, dot3, idot2, dot2, idot4, dot4);

            //绘制三角形的上半部分
            self.renderImage(idot1, dot1, idot2, dot2, idot4, dot4);
          }
          //出现红点
          if (self.hasDot) {
            for (var i = 0; i < self.dots.length; i++) {

              if (d.x == self.dots[i].x && d.y == self.dots[i].y){
                self.ctx.save();
                self.ctx.fillStyle = "red";
                self.ctx.fillRect(d.x - 1, d.y - 1, 5, 5);
                self.ctx.save();
              }
            }
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
      renderImage(arg_1, _arg_1, arg_2, _arg_2, arg_3, _arg_3) {
        var self = this;
        this.ctx.save();
        //根据变换后的坐标创建剪切区域
        this.ctx.beginPath();
        this.ctx.moveTo(_arg_1.x, _arg_1.y);
        this.ctx.lineTo(_arg_2.x, _arg_2.y);
        this.ctx.lineTo(_arg_3.x, _arg_3.y);
        this.ctx.closePath();
        this.ctx.clip();

        this.fabricCtx.save();
        //根据变换后的坐标创建剪切区域
        this.fabricCtx.beginPath();
        this.fabricCtx.moveTo(_arg_1.x, _arg_1.y);
        this.fabricCtx.lineTo(_arg_2.x, _arg_2.y);
        this.fabricCtx.lineTo(_arg_3.x, _arg_3.y);
        this.fabricCtx.closePath();
        this.fabricCtx.clip();


        //传入变换前后的点坐标，计算变换矩阵
        self.result = matrix.getMatrix.apply(this, arguments);

        //变形
        this.ctx.transform(self.result.a, self.result.b, self.result.c, self.result.d, self.result.e, self.result.f);
        this.fabricCtx.transform(self.result.a, self.result.b, self.result.c, self.result.d, self.result.e, self.result.f);

        //绘制图片
        this.ctx.drawImage(self.img, self.idots[0].x, self.idots[0].y, self.img.width, self.img.height);
        this.fabricCtx.drawImage(self.img, self.idots[0].x, self.idots[0].y, self.img.width, self.img.height);


        this.ctx.restore();
        this.fabricCtx.restore();
      },

      /**
       * 将abcd四边形分割成n的n次方份，获取n等分后的所有点坐标
       * @param n     多少等分
       * @param a     a点坐标 左上
       * @param b     b点坐标 右上
       * @param c     c点坐标 右下
       * @param d     d点坐标 左下
       * @returns {Array}
       */
      rectsplit(n, a, b, c, d) {
        //ad向量方向n等分
        var ad_x = (d.x - a.x) / n;
        var ad_y = (d.y - a.y) / n;
        //bc向量方向n等分
        var bc_x = (c.x - b.x) / n;
        var bc_y = (c.y - b.y) / n;

        var ndots = [];
        var x1, y1, x2, y2, ab_x, ab_y;

        //左边点递增，右边点递增，获取每一次递增后的新的向量，继续n等分，从而获取所有点坐标
        for (var i = 0; i <= n; i++) {
          //获得ad向量n等分后的坐标
          x1 = a.x + ad_x * i;
          y1 = a.y + ad_y * i;
          //获得bc向量n等分后的坐标
          x2 = b.x + bc_x * i;
          y2 = b.y + bc_y * i;
          for (var j = 0; j <= n; j++) {
            //ab向量为：[x2 - x1 , y2 - y1]，所以n等分后的增量为除于n
            ab_x = (x2 - x1) / n;
            ab_y = (y2 - y1) / n;
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
	 body {
            margin: 0;
            text-align: center;
            background-color: antiquewhite;
        }

        canvas {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
        }

        #div {
            position: relative;
            margin: 0 auto;
        }
	button{
		width: 120px;
		height: 50px;
		background-color: #009E6B;
		border-radius: 5px;
		font-size: 24px;
		color: #fff;
	}
  textarea {
    border: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #293036;
    line-height: 48px;
    height: 48px;
    min-width: 900px;
  }

  .top.ivu-menu.ivu-menu-dark.ivu-menu-horizontal {
    line-height: 48px;
    height: 48px;
    background: #293036;
    min-width: 900px;
  }

  .layout-logo {
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

  .layout-nav {
    /*width: 420px;*/
    /*margin: 0 auto;*/
    margin-left: 30px;
  }

  .layout-text {
    font-size: 12px;
  }

  .layout-assistant {
    width: 300px;
    margin: 0 auto;
    margin-left: 30px;
    height: inherit;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 10px;
    color: #9ea7b4;
  }

  .myintro {
    width: 208px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .myintro textarea {
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

  .myintro span.text {
    display: inline-block;
    width: 150px;
    height: 32px;
    line-height: 16px;
    font-size: 12px;
    color: #b2c0c8;
    word-wrap: break-word;
    word-break: break-all;
  }

  .creat {
    width: 120px;
  }

  .creat > .top {
    width: 100%;
    height: 120px;
    padding-top: 36px;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
  }

  .creat > .bottom {
    width: 100%;
    height: 120px;
    padding-top: 36px;
    text-align: center;
  }

  .ivu-menu-light {
    z-index: -0;
  }
</style>
