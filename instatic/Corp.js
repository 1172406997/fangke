// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current
 */
function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log('Failed to create program');
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
    // Create shader object
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // Create a program object
    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
    // Create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }

    // Set the shader program
    gl.shaderSource(shader, source);

    // Compile the shader
    gl.compileShader(shader);

    // Check the result of compilation
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
    // Get the rendering context for WebGL
    var gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) return null;

    // if opt_debug is explicitly false, create the context for debugging
    if (arguments.length < 2 || opt_debug) {
        gl = WebGLDebugUtils.makeDebugContext(gl);
    }

    return gl;
}

//点击下载事件
function save(name) {
    var a = document.createElement("a");
    a.href = document.querySelector("#canvas").toDataURL();
    a.download = name;
    a.click();
}

/*第一部分顶点着色器接收顶点的纹理坐标，传递给片元着色器*/
var VSHADER_SOURCE = "" +
    "attribute vec4 a_Position;\n" +//
    "varying vec2 v_Position;\n" +
    "void main(){\n" +
    "   gl_Position = a_Position;\n" +
    "   v_Position = vec2(a_Position);\n" +
    "}\n";

var FSHADER_SOURCE = "" +
    "precision mediump float;\n" +//
    "uniform sampler2D u_Sampler;\n" +//
    "varying vec2 v_Position;\n" +
    "uniform vec2 u_point0;\n" +
    "uniform vec2 u_point1;\n" +
    "uniform vec2 u_point2;\n" +
    "uniform vec2 u_point3;\n" +
    "float calc(vec2 p1,vec2 p2,vec2 p3,vec2 p4,vec2 p0){\n" +
    //如果不是平行的两条直线
    "   float p12Xlen = p2.x-p1.x;\n" +
    "   float p12Ylen = p2.y-p1.y;\n" +
    "   float p34Xlen = p4.x-p3.x;\n" +
    "   float p34Ylen = p4.y-p3.y;\n" +
    "   float a = p12Xlen*p34Ylen-p12Ylen*p34Xlen;\n" +
    "   float b = p1.x*p34Ylen+p3.y*p12Xlen-p0.y*p12Xlen-p3.x*p12Ylen+p0.y*p34Xlen-p1.y*p34Xlen+p0.x*(p12Ylen-p34Ylen);\n" +
    "   float c = p3.x*p0.y-p3.x*p1.y+p1.x*p3.y-p1.x*p0.y+p0.x*(p1.y-p3.y);\n" +
    //两条线都垂直于x轴或者y轴的情况下
    "   if(a == 0.0){\n" +
    "       return -c/b;\n" +
    "   }\n" +
    //两条线不平行的情况下
    "   float endA = (-b+sqrt(b*b-4.0*a*c))/(2.0*a);\n" +
    "   float endB = (-b-sqrt(b*b-4.0*a*c))/(2.0*a);\n" +
    "   if(endA > 0.0 && endA < 1.0){\n" +
    "       return endA;\n" +
    "   }\n" +
    "   if(endB > 0.0 && endB < 1.0){\n" +
    "       return endB;\n" +
    "   }\n" +
    "   else {\n" +
    "       return -c/b;\n" +
    "   }\n" +
    "}\n" +
    "" +
    //两个点的位置，第一个calc（v0,v2,v1,v3,p0） 第二个calc(v1,v0,v3,v2,p0)
    "void main(){\n" +
    "   gl_FragColor = texture2D(u_Sampler,vec2(calc(u_point0,u_point2,u_point1,u_point3,v_Position),calc(u_point1,u_point0,u_point3,u_point2,v_Position)));\n" +//
    "}\n";

//四个顶点的位置
var v0, v1, v2, v3, gl, imgSrc;

//声明一个img对象，并在img对象内回调
function imgLoad() {
    imgSrc = this.src;
    //首先处理canvas的大小和图片的绘制大小
    var canvas = document.querySelector("#canvas");
    var div = document.querySelector("#div");
    //首先判断当前图片的大小
    var image = this;
    if (image.width / 2 > 800 && image.height / 2 > 800) {
        //图片的高度和宽度除以二都比800大
        canvas.width = image.width / 2;
        canvas.height = image.height / 2;
        canvas.style.width = image.width / 2 + "px";
        canvas.style.height = image.height / 2 + "px";
        //设置四个顶点的位置
        v0 = {x: -1.0, y: 1.0};
        v1 = {x: -1.0, y: -1.0};
        v2 = {x: 1.0, y: 1.0};
        v3 = {x: 1.0, y: -1.0};
    }
    else if (image.width / 2 > 800) {
        //图片的宽度除以二比800大，高度不大
        canvas.width = image.width / 2;
        canvas.height = 800;
        canvas.style.width = image.width / 2 + "px";
        canvas.style.height = "800px";
        //求出y的坐标
        var y = image.height / 2 / 800;
        //设置四个顶点的位置
        v0 = {x: -1.0, y: y};
        v1 = {x: -1.0, y: -y};
        v2 = {x: 1.0, y: y};
        v3 = {x: 1.0, y: -y};
    }
    else if (image.height / 2 > 800) {
        //图片的高度除以二比800大，宽度不大
        canvas.width = 800;
        canvas.height = image.height / 2;
        canvas.style.width = "800px";
        canvas.style.height = image.height / 2 + "px";
        //求出x的比例
        var x = image.width / 2 / 800;
        //设置四个顶点的位置
        v0 = {x: -x, y: 1.0};
        v1 = {x: -x, y: -1.0};
        v2 = {x: x, y: 1.0};
        v3 = {x: x, y: -1.0};
    }
    else {
        //图片的高度宽度除以二都没有800大

        var x = image.width / 2 / 800;
        var y = image.height / 2 / 800;

        v0 = {x: -x, y: y};
        v1 = {x: -x, y: -y};
        v2 = {x: x, y: y};
        v3 = {x: x, y: -y};
    }
    //设置外部盒子的大小
    div.style.width = canvas.width + "px";
    div.style.height = canvas.height + "px";
    //给四个顶点添加是name
    v0.name = "v0";
    v1.name = "v1";
    v2.name = "v2";
    v3.name = "v3";

    main();
};

/*第二部分 main()方法 初始化着色器，设置顶点信息，调用配置纹理方法*/
function main() {
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    if (!gl) {
        console.log("你的电脑不支持WebGL！");
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("初始化着色器失败！");
        return;
    }

    //设置顶点的相关信息
    var n = initVertexBuffers(gl);

    if (n < 0) {
        console.log("无法获取到点的数据");
        return;
    }

    //配置纹理
    if (!initTextures(gl, n)) {
        console.log("无法配置纹理");
        return;
    }

}

/*第三部分 initVertexBuffers() 设置顶点坐标和纹理坐标 调用initTextures()进行下一步处理*/
function initVertexBuffers(gl) {
    /*
        *   v0-------v2
        *   |         |
        *   |         |
        *   |         |
        *   v1-------v3
        *
        *   [v0.x,v0.y,v1.x,v1.y,v2.x,v2.y,v3.x,v3.y]
        *   config.Positions[0].Config 数组由八个数据组成，代表四个点的位置，距离中心点的偏移量
        * */
    var verticesSizes = new Float32Array([
        //四个顶点的位置
        v0.x, v0.y,
        v1.x, v1.y,
        v2.x, v2.y,
        v3.x, v3.y
    ]);

    initArrayBuffer(gl, verticesSizes, 2, gl.FLOAT, "a_Position");

    //将四个顶点位置传入
    var point0 = gl.getUniformLocation(gl.program, "u_point0");
    var point1 = gl.getUniformLocation(gl.program, "u_point1");
    var point2 = gl.getUniformLocation(gl.program, "u_point2");
    var point3 = gl.getUniformLocation(gl.program, "u_point3");
    if (point0 < 0) {
        alert("无法获取到存储的位置");
    }
    gl.uniform2f(point0, v0.x, v0.y);
    gl.uniform2f(point1, v1.x, v1.y);
    gl.uniform2f(point2, v2.x, v2.y);
    gl.uniform2f(point3, v3.x, v3.y);

    var indexSize = new Uint8Array([0, 1, 3, 0, 2, 3]);

    //将索引写入缓冲区对象
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexSize, gl.STATIC_DRAW);

    return indexSize.length;
}

//创建变量缓冲区
function initArrayBuffer(gl, data, num, type, attribute) {
    //创建缓冲区对象
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.log("无法创建缓冲区对象");
        return -1;
    }

    //绑定缓冲区对象并写入数据
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    //获取顶点位置变量位置
    var a_attribue = gl.getAttribLocation(gl.program, attribute);
    if (a_attribue < 0) {
        console.log("无法获取顶点位置的存储变量");
        return -1;
    }

    //对位置的顶点数据进行分配，并开启
    gl.vertexAttribPointer(a_attribue, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribue);
}

/*第四部分 initTextures() 创建纹理对象 并调用纹理绘制方法*/
function initTextures(gl, n) {
    var texture = gl.createTexture();//创建纹理对象
    if (!texture) {
        console.log("无法创建纹理对象");
        return;
    }

    //获取u_Sampler的存储位置
    var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
    if (u_Sampler < 0) {
        console.log("无法获取变量的存储位置");
        return;
    }

    //创建Image对象，并绑定加载完成事件
    var image = new Image();
    image.onload = function () {
        //初始化交互事件
        initMoveBtn();
        loadTexture(gl, n, texture, u_Sampler, image);
    };

    image.src = imgSrc;
    return true;
}

function initMoveBtn() {
    var canvas = document.querySelector("#canvas");
    var div = document.querySelector("#div");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    addBtn(v0);
    addBtn(v1);
    addBtn(v2);
    addBtn(v3);

    function addBtn(obj) {
        var x = (obj.x + 1) / 2;
        var y = 1 - (obj.y + 1) / 2;

        var btn = document.createElement("div");
        btn.id = obj.name;
        btn.style.cssText = "height:10px; width:10px; margin-left:-5px; margin-top:-5px; position:absolute; background:green; cursor:pointer;";
        btn.style.left = x * canvasWidth + "px";
        btn.style.top = y * canvasHeight + "px";
        div.appendChild(btn);

        var downX, downY, btnX, btnY;

        btn.addEventListener("mousedown", function (event) {
            event.preventDefault();
            //鼠标按下时的位置
            downX = event.clientX;
            downY = event.clientY;

            //按下时btn的位置
            btnX = parseFloat(btn.style.left);
            btnY = parseFloat(btn.style.top);

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        function move(event) {
            event.preventDefault();
            var moveX = event.clientX;
            var moveY = event.clientY;

            var x = moveX - downX + btnX;
            var y = moveY - downY + btnY;
            /*
                    *   v0-------v2
                    *   |         |
                    *   |         |
                    *   |         |
                    *   v1-------v3
                    *
                    *   [v0.x,v0.y,v1.x,v1.y,v2.x,v2.y,v3.x,v3.y]
                    *   config.Positions[0].Config 数组由八个数据组成，代表四个点的位置，距离中心点的偏移量
                    * */
            //保证点的位置在一定的范围内
            switch (obj.name) {
                case "v0":

                    //v0 v1 v3
                    var e = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseInt(getDomById("v1").style.left), y: parseInt(getDomById("v1").style.top)},
                        {x: parseInt(getDomById("v3").style.left), y: parseInt(getDomById("v3").style.top)}
                    );
                    x = e.x;
                    y = e.y;

                    //v0 v3 v2
                    var f = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseInt(getDomById("v3").style.left), y: parseInt(getDomById("v3").style.top)},
                        {x: parseInt(getDomById("v2").style.left), y: parseInt(getDomById("v2").style.top)}
                    );
                    x = f.x;
                    y = f.y;

                    //v0 v1 v2
                    var d = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseInt(getDomById("v1").style.left), y: parseInt(getDomById("v1").style.top)},
                        {x: parseInt(getDomById("v2").style.left), y: parseInt(getDomById("v2").style.top)}
                    );
                    x = d.x;
                    y = d.y;

                    break;
                case "v1":
                    //v1 v3 v2
                    var e = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v3").style.left), y: parseFloat(getDomById("v3").style.top)},
                        {x: parseFloat(getDomById("v2").style.left), y: parseFloat(getDomById("v2").style.top)}
                    );
                    x = e.x;
                    y = e.y;

                    //v0 v2 v0
                    var f = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v2").style.left), y: parseFloat(getDomById("v2").style.top)},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)}
                    );
                    x = f.x;
                    y = f.y;

                    //v1 v3 v0
                    var d = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v3").style.left), y: parseFloat(getDomById("v3").style.top)},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)}
                    );
                    x = d.x;
                    y = d.y;

                    break;
                case "v2":
                    //v2 v0 v1
                    var e = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)},
                        {x: parseFloat(getDomById("v1").style.left), y: parseFloat(getDomById("v1").style.top)}
                    );
                    x = e.x;
                    y = e.y;

                    //v2 v1 v3
                    var f = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v1").style.left), y: parseFloat(getDomById("v1").style.top)},
                        {x: parseFloat(getDomById("v3").style.left), y: parseFloat(getDomById("v3").style.top)}
                    );
                    x = f.x;
                    y = f.y;

                    //v2 v0 v3
                    var d = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)},
                        {x: parseFloat(getDomById("v3").style.left), y: parseFloat(getDomById("v3").style.top)}
                    );
                    x = d.x;
                    y = d.y;

                    break;
                case "v3":
                    //v3 v2 v0
                    var e = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v2").style.left), y: parseFloat(getDomById("v2").style.top)},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)}
                    );
                    x = e.x;
                    y = e.y;

                    //v3 v0 v1
                    var f = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v0").style.left), y: parseFloat(getDomById("v0").style.top)},
                        {x: parseFloat(getDomById("v1").style.left), y: parseFloat(getDomById("v1").style.top)}
                    );
                    x = f.x;
                    y = f.y;

                    //v3 v2 v1
                    var d = getCrossoverPoint(
                        {x: x, y: y},
                        {x: parseFloat(getDomById("v2").style.left), y: parseFloat(getDomById("v2").style.top)},
                        {x: parseFloat(getDomById("v1").style.left), y: parseFloat(getDomById("v1").style.top)}
                    );
                    x = d.x;
                    y = d.y;

                    break;
            }


            //处理xy两个坐标不能超过界
            if (x < 0.01) {
                x = 0.01;
            }
            else if (x > canvasWidth) {
                x = canvasWidth;
            }
            if (y < 0.01) {
                y = 0.01;
            }
            else if (y > canvasHeight) {
                y = canvasHeight;
            }

            btn.style.left = x + "px";
            btn.style.top = y + "px";

            obj.x = x / canvasWidth * 2 - 1;
            obj.y = (1 - y / canvasHeight) * 2 - 1;

            //重新绘制
            reload();
        }

        function up() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        }
    }
}

/*第五部分 设置纹理相关信息供WebGL使用，并进行绘制*/
function loadTexture(gl, n, texture, u_Sampler, image) {
    //对纹理图像进行y轴反转
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    //开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    //向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    //将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0);

    draw(n);

}

//重新绘制的方法
function reload() {

    var n = initVertexBuffers(gl);

    //绘制
    draw(n);
}

function draw(n) {
    //绘制
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    //开启混合功能
    gl.enable(gl.BLEND);
    //指定混合函数
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

    //使用canvas2d绘制四个点之间的线
    var canvas = document.querySelector("#canvas-2d");
    var ctx = canvas.getContext("2d");
    //先清除原来的像素
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    var arr = ["v0", "v1", "v3", "v2", "v0"];
    ctx.beginPath();
    for (var i = 0, len = arr.length; i < len; i++) {
        //首先获取到点的dom对象，通过dom对象获取到位置
        var dom = document.querySelector("#" + arr[i]);
        var x = parseFloat(dom.style.left);
        var y = parseFloat(dom.style.top);
        if (i == 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}

//通过三个点的坐标获取通过第一个点垂直于第二个点和第三个点的直线的焦点的坐标
/*function getCrossoverPoint(a, b, c) {
    //获取通过a点垂直于bc的交点的坐标

    //先获取三条线的
    var ab = getDistance(a, b);
    var bc = getDistance(b, c);
    var ac = getDistance(a, c);

    //获取到交点d距离b点的距离
    var bd = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * bc);

    //获取bd占bc的比例
    var percentBd = bd / bc;

    //计算出来d点的位置
    return {x: (c.x - b.x) * percentBd + b.x, y: (c.y - b.y) * percentBd + b.y};
}*/
function getCrossoverPoint(a, b, c) {
    //获取通过a点垂直于bc的交点的坐标

    //先获取三条线的
    var ab = getDistance(a, b);
    var bc = getDistance(b, c);
    var ac = getDistance(a, c);

    //获取到交点d距离b点的距离
    var bd = (Math.pow(ab, 2) + Math.pow(bc, 2) - Math.pow(ac, 2)) / (2 * bc);

    //获取bd占bc的比例
    var percentBd = bd / bc;
    //if(ac > ab && ac > bc) percentBd = -percentBd;

    //计算出来d点的位置
    var d =  {x: (c.x - b.x) * percentBd + b.x, y: (c.y - b.y) * percentBd + b.y};

    //判断直线bc在a点的哪个方向
    if(b.x<c.x && b.y > c.y){
        //右下角方向
        if(a.x > d.x) a.x = d.x;
        if(a.y > d.y) a.y = d.y;
    }
    else if(b.x > c.x && b.y > c.y){
        //在右上角方向
        if(a.x > d.x) a.x = d.x;
        if(a.y < d.y) a.y = d.y;
    }
    else if(b.x < c.x && b.y < c.y){
        //在左下角
        if(a.x < d.x) a.x = d.x;
        if(a.y > d.y) a.y = d.y;
    }
    else if(b.x > c.x && b.y < c.y){
        //在左上角
        if(a.x < d.x) a.x = d.x;
        if(a.y < d.y) a.y = d.y;
    }
    else if(b.y == c.y){
        //bc平行于x轴
        if(b.x < c.x){
            //在a的下面
            if(a.y > d.y) a.y = d.y;
        }
        else{
            //bc在a点的上面
            if(a.y < d.y) a.y = d.y;
        }
    }
    else if(b.x == c.x){
        //bc平行于y轴
        if(b.y > c.y){
            //bc在a的右边
            if(a.x > d.x){
                a.x = d.x
            };
        }
        else{
            //bc在a的左边
            if(a.x < d.x) a.x = d.x;
        }
    }

    return a;
}

//获取亮点之间的距离的方法
function getDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

//通过id获取dom对象
function getDomById(id) {
    return document.getElementById(id);
}

//求数组的最小值


