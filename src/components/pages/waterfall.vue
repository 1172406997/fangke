<template>
  <div class="waterfall">
  	<div>
  		<img src="http://m1.cdn.imeijian.cn/f36db042a2cde64f6ee1b712857964ba@!250wh" alt="" />
  	</div>
  </div>
</template>

<script>
//var h = document.documentElement.clientHeight || document.body.clientHeight;
//var big = document.getElementsByClassName(".big")[0];
//big.style.height=h+"px";
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
  name: 'login',
  data () {
    return {
				
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header header{
    	width: 100%;
    	height: 180px;
    	background: #293036;
    	text-align: center;
    	color:#fff;
    }
    .header .title{
    	padding-top: 48px;
	    font-size: 32px;
	    line-height: 32px;
    }
    .header .sub_title{
    	padding-top: 20px;
	    font-size: 14px;
	    line-height: 14px;
    }
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 60px ;
    }
    .layout-content .left {
    	float: left;
    	overflow: hidden;
    }
    .layout-content .right{
    	float: left;
    	overflow: hidden;
    }
    .layout-content .left_title{
    	font-size: 24px;
    	color: #7e8e98;
    	line-height: 72px;
    	
    }
    .layout-content .right_title{
    	font-size: 24px;
    	color: #7e8e98;
    	line-height: 72px;
    	
    }
    .layout-content .right_title span{
    	font-size: 12px;float:right;cursor: pointer;
    }
    .layout-content .right_title span:hover{
    	color:#3C464D ;
    }
    /*end*/
    .layout-copy{
    	text-align: center;
    	}
    	
</style>	
