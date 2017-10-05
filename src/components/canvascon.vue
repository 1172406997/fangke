<template>
  <div class="header">
        <header>
					<div class="title">
						搜索你想要的
					</div>
					<div class="sub_title">
						<Input v-model="value11" style="width:60%">
							<Select v-model="select1" slot="prepend" style="width: 80px">
								<Option value="puzz">拼图</Option>
								<Option value="user">用户</Option>
								<Option value="brand">品牌</Option>
							</Select>
							<Button slot="append" icon="ios-search"></Button>
						</Input>
					</div>
				</header>
				<main>
					<div class="layout-content">
						
					</div>
				</main>
	</div>
</template>

<script>

export default {
  name: 'content',
  data () {
    return {
			 value11: '',
       select1: 'puzz'
    }
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
			display: flex;
			justify-content: center;
    }
    /*頭部*/
     main{
    	width: 100%;
    	padding:0 60px ;
    	background:#F2F2F4;
    	overflow: hidden;
    }
		.layout-content{
			overflow: hidden;
		}
		.ivu-menu-light{
    	z-index: -0;	
    }
    	
</style>	
