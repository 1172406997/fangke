<template>
  <div class="showList">
  	<div class="Main_container">
  		<div class="Main_containe_3W">
  			<div class="MyBoard_board_nav">
  			
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'content',
  data () {
    return {
    }
  },
   components: {

   },
  created:function(){
	},
	methods:{
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.Main_container{
		flex: 1;
    	position: relative;
    	background: #f4f4f4;
	}
	.Main_container_3W{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top:0;
	}
	.MyBoard_board_nav{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0px;
	}
</style>	
