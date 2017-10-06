<template>
   <div class="container">
     <p><span  v-on:click="modalH()"><Icon type="close-round" color="#fff" size="20" class="ico"></Icon></span></p>
     <div class="mine">
     	<Row>
        	<Col span="14" class="dada">
        		<div class="left">
        			<div class="left_con">
					 	<Carousel v-model="value1"  style="width: 500px;" height="400">
					        <Carousel-item>
					            <div class="demo-carousel">
					            	<img src="../../img/1.png" alt="" />
					            </div>
					        </Carousel-item>
					        <!--<Carousel-item>
					            <div class="demo-carousel">
					            	<img src="../../assets/logo.png"/>
					            </div>
					        </Carousel-item>
					        <Carousel-item>
					            <div class="demo-carousel">3</div>
					        </Carousel-item>
					        <Carousel-item>
					            <div class="demo-carousel">4</div>
					        </Carousel-item>-->
					    </Carousel> 				
        			</div>
        		</div>
        		
        	</Col>
       		<Col span="8">
       			<div class="right">
        			<div class="rightt">
        				<h1>{{parSon.name}}</h1>
        				<p>#{{parSon.style}}</p>
        				<!--<Button type="success" icon="edit" long class="btn">再创作</Button>-->
        				<Button type="primary"@click="StoreLike(parSon.id)" icon="android-add-circle" long class="btn">添加为收藏</Button>
        			</div>
        			<div class="rightc">
        				<!--<p>作者</p>-->
        				<div class="thrmb">
        					<img src="../../assets/img/meijian.png" alt="" />
        					<div class="info">
        						<span>尺寸</span>
        						<p>{{parSon.size}}</p>
        					</div>
        				</div>
        			</div>
        			<div class="rightb">
        				<!--<p>{{parSon.like}}人赞了</p>-->
        				<!--<div class="zan">
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        				</div>-->
        			</div>
        		</div>
       		</Col>
    	</Row>
     </div>
     <p class="endLine">
       <span>没有更多内容</span>
     </p>
   </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
            	modal:'',
            	value1:0,
            	parSon:'',
            }
        },
        props:['toson'],
        created(){
        	this.parSon = this.toson;
        	console.log(this.parSon);
        },
        mounted(){
        	this.parSon = this.toson;
        	console.log(this.parSon);
        },
        methods:{
			modalH:function(){
				this.$emit('modal',this.modal);
			},
			StoreLike:function(material_id) {
			var self = this;
			var str = this.Encrypt();
			var user_id = localStorage.getItem("user_id"); 
		  		var token = localStorage.getItem("token"); 
					var params = {
						params:{
							'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token,'material_id':material_id
						}
					};
					this.jsonpRequest(this,"Like.StoreLike",params,function(res){
		  					if(res){
										console.log(res);
										console.log("getlike:"+this.getlikeitem);
		  					}
		  		},function(err){
		  			console.log(err);
		  		});
			},
        },
        
    }
</script>

<style scoped>
  .container {
  	position:fixed;
  	left: 5px;
  	right: 5px;
  	top:47px;
  	min-width: 1268px;
  	width: 99.4%;
  	z-index: 20px;
    background-color:rgba(53,63,72,0.7);
    padding: 0 12px 0;
    
  }
  .container>p {
    height: 48px;
    position: relative;
  }
  .container>p i {

  }
  .container>p span{
  	overflow: hidden;
  	cursor: pointer;
  }
  .container>p .ico{
  	position: absolute;
  	text-align: center;
    left: 0;
    top:15px;
  	width: 30px;
  	height: 30px;
    line-height: 30px;
  }
  
  .mine{
  	padding:0px 48px 20px 48px;
  }
  .left{
  	width: 100%;
  	border-bottom-left-radius: 10px;
  	border-top-left-radius: 10px;
  	overflow: hidden;
  	float: left;
  	background-color:#fff ;
  }
  .left_con{
  	margin: 12px;
  	height: 480px;
  	display: flex;
  	justify-content: center;
	align-items: center;
	border: 1px solid #000;
  }
  .demo-carousel{
  		width: 500px;
        height: 330px;
        line-height: 330px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        /*background: #506b9e;*/
    }
  .left_con img{
  	width: 100%;
  	height: 100%;
  }
  .endLine {
    color: #7e8e98;
    padding: 48px 0 96px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .right{
  	width: 100%;
  	height: 504px;
  	border-top-right-radius: 12px;
  	border-bottom-right-radius: 12px;
  	float: left;
  	overflow: hidden;
  	background-color: #fff;
  }
  .right .rightt{
  	width: 296px;
  	height: 160px;
  	padding: 22px 12px 18px;
  }
  .rightt h1{
  	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
    font-size: 18px;
    color: #3b454c;
  }
  .rightt p{
  	margin-top: 8px;
  }
  
  .rightt .btn{
  	margin-top:16px ;
  	height: 40px;
  }
  .right .rightc{
  	padding:12px 12px 0px;
  	border-top:1px solid #999;
  	border-bottom:1px solid #999;
  }
  .rightc>p{
  	line-height: 1;
    font-size: 12px;
    color: #7e8e98;
  }
  .rightc .thrmb{
  	overflow: hidden;
  	padding: 12px 0px;
  }
  .thrmb img{
  	width: 48px;
  	height: 48px;
  	border-radius: 50%;
  	float: left;
  	overflow: hidden;
  }
  .thrmb .info{
  	float: left;
  	margin-left: 12px;
  	overflow: hidden;
  }
  .rightb{
  	padding:12px 12px 0px;
  }
  .rightb>p{
  	line-height: 1;
    font-size: 12px;
    color: #7e8e98;
  }
  .rightb .zan{
  	padding:12px 0;
  }
  .zan span{
  	display: inline-block;
  	position: relative;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 50%;
    left:50%;
    vertical-align: top;
    cursor: pointer;
    border: 1px solid #dee4e7;
    border-color: #fff;
  }
  .zan span img{
  	width: 100%;
  	height: 100%;
  }
  .info span{
  	vertical-align: middle;
    line-height: 20px;
    font-size: 14px;
    color: #3b454c;
    word-wrap: break-word;
    word-break: break-all;
  }
  .info>p{
  	margin-top: 6px;
    font-size: 12px;
    color: #b2c0c8;
  }
  .endLine span {
    width: 40%;
    text-align: center;
  }
  .endLine:after,.endLine:before {
    content: '';
    flex-grow: 1;
    border-top: 1px solid #b2c0c8;
  }
</style>
