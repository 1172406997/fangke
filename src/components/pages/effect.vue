<template>
  <div class="effect">
  	<h2 style="margin-bottom: 5px;">辅助效果</h2>
  	<Row :gutter="16">
  		<Col span="11" class="dada">
				<img src="../../assets/img/meijian.png" alt="" style="width:100%;" />
      </Col>
      <Col span="11" class="dada">
				<img src="../../assets/img/meijian.png" alt="" style="width:100%;" />
      </Col>
  	</Row>
  </div>
</template>

<script>
  export default {
    name: 'effect',
    data () {
      return {}
    }
  }
</script>

<style scoped>
 .effect{
 	padding-left:10px;
 	padding-top:10px;
 }
</style>
