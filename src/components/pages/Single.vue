<template>
   <div class="container">
   	<div class="modals"></div>
     <p><Icon @click.native="modalH()" type="close-round" color="#fff" size="20" class="ico"></Icon></p>
     <div class="mine">
     	<!--<div class="col">-->
        	<!--<Col span="14" class="dada">-->
        		<div class="left">
        			<div class="left_con">
					 	<Carousel v-model="value1"  style="width: 100%;">
					        <Carousel-item>
					            <div class="demo-carousel">
					            	<img v-show="toson.production.thumb!=null" :src="'http://static.shatuhome.com/thumb/'+toson.production.thumb" alt="" />
					            </div>
					        </Carousel-item>
					    </Carousel>
        			</div>
        		</div>
        	<!--</div>-->
        	<!--</Col>-->
       		<!--<div class="col">-->
       			<div class="right">
        			<div class="rightt">
        				<h1 style="font-size: 24px;font-weight:400;color: #9c9c9c;">{{toson.production.name}}</h1>
        				<!--<p>创建时间:{{toson.production.ctime |Time}}</p>-->
        				<Button style="" @click="editer(toson.production.id)" icon="edit" long class="btn">再编辑创作</Button>
        				<!--<Button type="primary" @click="saveTemplate()"  icon="android-add-circle" long class="btn">保存为模板</Button>-->
        			</div>
        			<div class="rightc">
        				<!--<p>作者</p>-->
        				<div class="thrmb">
        					<!--<img src="../../assets/img/meijian.png" alt="" />-->
        					<div class="info">
        						<!--<span>修改时间</span>-->
        						<!--<p>{{toson.production.utime |Time}}</p>-->
        						<p>创建时间:{{toson.production.ctime |Time}}</p>
        					</div>
        				</div>
        			</div>
        			<div class="rightb">
        				<!--<p>{{toson.production.like}}人赞了</p>-->
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
        		<!--</div>-->
       		<!--</Col>-->
       		</div>
     </div>
     <!--<p class="endLine">
       <span>没有更多内容</span>
     </p>-->
   </div>
</template>

<script>
    export default {
        name: 'modals',
        data () {
            return {
            	modal:'',
            	value1:0,
            	parSon:'',
            }
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
        props:['toson'],
        created(){
//        	this.parSon = this.;
          	console.log(this.toson);
        },
        mounted(){
//        	this.parSon = this.toson;
//        	console.log(this.parSon);
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
			saveTemplate(){
				this.$Modal.confirm({
                    title: '提示',
                    content: '<h2>功能正在开发中，敬请期待</h2>',
                    onOk: () => {
                    },
                    onCancel: () => {
                    }
                });
			},
			editer(id){
				this.$router.push({name:'canvas',params:{id:id,up:'up'}});
			},
        },

    }
</script>

<style scoped>
  .container {
  	position:fixed;
  	left: 0px;
  	right: 0px;
  	top:47px;
  	min-width: 1268px;
  	width: 100%;
  	z-index: 30;
  	bottom: 0;
    background-color:rgba(53,63,72,0.7);
    padding: 0 12px 0;
    padding-top: 80px;
  }
  .modals{
  	position: absolute;
  	top: 0;
  	left: 0;
  	bottom: 0;
  	right: 0;
  }
  .container>p {
    height: 48px;
    width: 100%;
  }
  .container>p:first-of-type {
    height: 48px;
    width: 100%;
    background-color: rgba(53,63,72,0.7);
    position: absolute;
    top: 0;
    left:0;
    line-height: 48px;
  }
  .container>p:first-of-type i{
  	position: absolute;
  	left: 95%;
  	/*right: 10px;*/
	/*top:10px;*/
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
  	/*margin-top: 50px;*/
  	position: absolute;
  	width: 100%;
  	height: 90%;
  	padding:0px 48px 20px 48px;
  }
  /*.col{
  	position: absolute;
  	width: 100%;
  	height: 100%;
  }*/
  .left{
  	width: 70%;
  	height:inherit;
  	border-bottom-left-radius: 10px;
  	border-top-left-radius: 10px;
  	overflow: hidden;
  	float: left;
  	background-color:#fff ;
  }
  .left_con{
  	width: 100%;
  	margin: 12px;
  	height: 100%;
  	padding: 20px;
  	display: flex;
  	justify-content: center;
	align-items: center;
	/*border: 1px solid #000;*/
  }
  .demo-carousel{
  		/*width: 500px;*/
        /*height: 330px;*/
        /*line-height: 330px;*/
        text-align: center;
        color: #fff;
        font-size: 20px;
        /*background: #506b9e;*/
    }
  .left_con img{
  	width: 75%;
  	/*height: 100%;*/
  }
  .endLine {
    color: #7e8e98;
    padding: 48px 0 96px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .right{
  	width: 25%;
  	height:inherit;
  	/*height: 624px;*/
  	border-top-right-radius: 12px;
  	border-bottom-right-radius: 12px;
  	float: left;
  	overflow: hidden;
  	background-color: #fff;
  	border-left:1px solid #777;
  }
  .right .rightt{
  	width: 296px;
  	height: 180px;
  	padding: 22px 18px 18px;
  }
  .rightt h1{
  	/*overflow: hidden;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 22px;
    font-size: 20px;
    color: #3b454c;
  }
  .rightt p{
  	margin-top: 8px;
  }

  .rightt .btn{
  	margin-top:40px ;
  	height: 60px;
  	background-color: #50a9b5;
  	width: 80%;
  	height: 40%;
  	color: #fff;
  	font-size: 16px;
  }
  .right .rightc{
  	/*padding:12px 12px 0px;*/
  	border-top:1px solid #999;
  	border-bottom:1px solid #999;
  	min-height: 75px;
  	line-height: 75px;
  }
  .rightc>p{
  	line-height: 1;
    /*font-size: 12px;*/
    color: #7e8e98;
    font-size: 18px;
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
    font-size: 18px;
    color: #b2c0c8;
  }
  .endLine{
  	position: absolute;
  	bottom:0;
  	left:0;
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
