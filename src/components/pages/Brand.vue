<template>
  <div class="brand">
  	<div class="conlist_show">
					<div class="conlist_con">
					   <div class="box">
							<div class="boxcon">
								<div class="pic">
									<img src="../../img/1.png" />
									<div class="modal"></div>
								</div>
								<div class="footer">
									<div class="borderbox">
										<span class="thumb">
												<img src="../../assets/logo.png"/>
										</span>
										<div style="width: 15px;"></div>
										<div class="box-txt">
											<p>用户名</p>
											<div style="height: 5px;"></div>
											<p>介绍</p>
										</div>
										<ul>
											<li>
												<Icon type="heart"></Icon>
											</li>
										</ul>
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
  export default {
    name: 'brand',
    data () {
      return {}
    }
  }
</script>

<style scoped>
  .brand {
    background-color: #353F48;
    padding-top: 10px;
    padding-left: 10px;
  }

  .box{
    	padding:10px;
    	width: 100%;
    	float: left;
    	overflow: hidden;
    }
    .pic {
    	position: relative;
    	border: 1px solid #CCC;
    	box-shadow: 0 0 5px #ccc;
    	margin: 0;
    	padding: 0;
    }
    
    .modal {
    	position: absolute;
    	top: 0;
    	left: 0;
    	bottom: 0;
    	right: 0;
    	/*background-color: rgba(0,0,0,.3);*/
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
    	cursor: pointer;
    	display: flex;
    	align-items: center;
    }
    .boxcon {
    	padding: 10px;
    	cursor: pointer;
    	background-color: #fff;
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
  /*滚动显示样式*/
   .conlist_show{
   		width: 100%;
   		overflow: hidden;
   		height: 732px;
   		padding-top: 20px;
   }
   .conlist_con{
   	width:calc(100% + 20px);
   	height: 610px;
   	overflow-x: hidden;
   	overflow-y: scroll;
   }
</style>
