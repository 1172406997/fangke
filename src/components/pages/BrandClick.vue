<template>
   <div class="container">
     <p><span  v-on:click="modalH()"><Icon type="close-round" color="#fff" size="20" class="ico"></Icon></span></p>
     <div class="mine">
     	<Row>
        	<Col span="16" class="dada">
        		<div class="left">
        			<div class="left_con">
        				<img src="../../assets/img/meijian.png" alt="" />
        			</div>
        		</div>
        	</Col>
       		<Col span="8">
       			<div class="right">
        			<div class="rightt">
        				<h1>未命名</h1>
        				<p>#简约</p>
        				<Button type="success" icon="edit" long class="btn">再创作</Button>
        				<Button type="primary" icon="android-add-circle" long class="btn">保存为模板</Button>
        			</div>
        			<div class="rightc">
        				<p>作者</p>
        				<div class="thrmb">
        					<img src="../../assets/img/meijian.png" alt="" />
        					<div class="info">
        						<span>南柯一梦</span>
        						<p>更新于</p>
        					</div>
        				</div>
        			</div>
        			<div class="rightb">
        				<p>5人赞了</p>
        				<div class="zan">
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        					<Tooltip content="收藏" placement="bottom">
        					<span><img src="../../assets/img/yizi.png" alt="" /></span>
        					</Tooltip>
        				</div>
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
            }
        },
        methods:{
			modalH:function(){
				this.$emit('modal',this.modal);
			},
        },
        
    }
</script>

<style scoped>
  .container {
  	position:absolute;
  	left: 5px;
  	right: 5px;
  	top:50px;
  	width: 1268px;
  	z-index: 20px;
    background-color:rgba(53,63,72,0.7);
    padding: 0 12px 0;
    
  }
  .container>p {
    height: 48px;
    position: relative;
  }
  .container>p i {
    /*position: absolute;
    left: 0;*/
    /*line-height: 48px;*/

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
  	padding: 0 48px;
  }
  .left{
  	border-bottom-left-radius: 10px;
  	border-top-left-radius: 10px;
  	overflow: hidden;
  	float: left;
  	background-color:#fff ;
  }
  .left_con{
  	margin: 12px;
  	min-height: 568px;
  	display: flex;
  	justify-content: center;
	align-items: center;
  }
  .left_con>img{
  	width: 100%;
  	height: 72%;
  }
  .endLine {
    color: #7e8e98;
    padding: 48px 0 96px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .right{
  	width: 100%;*/
  	border-top-right-radius: 12px;
  	border-bottom-right-radius: 12px;
  	float: left;
  	min-height: 592px;
  	overflow: hidden;
  	background-color: #fff;
  }
  .right .rightt{
  	width: 296px;
  	height: 192px;
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
  }
  .endLine:after,.endLine:before {
    content: '';
    flex-grow: 1;
    border-top: 1px solid #b2c0c8;
  }
</style>
