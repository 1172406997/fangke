<template>
  <div class="header">
				<main>
					<div class="layout-content">
						<div>project</div>
					</div>
				</main>
	</div>
</template>

<script>

export default {
  name: 'content',
  data () {
    return {
			 value13: '',
       select3: 'day'
    }
  },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
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
