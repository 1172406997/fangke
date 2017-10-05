<template>
  <div class="canvasmy">
  	<Menu mode="horizontal" :theme="theme1" active-name="15" style="background-color: #353F48;">
        <Menu-item name="15">
            <!--<Icon type="ios-paper"></Icon>-->
                        全部
        </Menu-item>
    </Menu>
    <div class="content_con2">
			<h2>单品</h2>
			<div>
				<Col span="6" style="background-color: #fff;position:relative;" class="con2">
				<img src="../../assets/logo.png" alt="" />
				<p>一只一只</p>
				</Col>
				<Col span="6" v-for="(itemd , index) in searchi" style="background-color: #fff;position:relative;" class="con2">
				<img :src="'http://www.shatuhome.com/material/'+item.filename" alt="" />
				<p>一只一只</p>
				</Col>
			</div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
				
    }
  },
  created:function(){
		this.getlike();
  },
  components: {
  	
  },
  methods:{
  	getlike:function(){
  		var self = this;
  		var str = this.Encrypt();
  		var user_id = localStorage.getItem("user_id"); 
  		var token = localStorage.getItem("token"); 
  		var params = {
				params:{
					'signature': str.sha,'timestamp':str.timestamp,'nonce':str.nonce,'user_id':user_id,'token':token
				}
			};
  		this.jsonpRequest(this,"Material.GetAllMaterial",params,function(res){
  					if(res){
								self.$set(self, 'getlikeitem', res.body.data.list);
								self.getlikeitem = res.body.data.list;
								console.log(res);
								console.log("getlike:"+self.getlikeitem);
  					}
  		},function(err){
  			console.log(err);
  		});
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content_con2{
			margin: 10px;
		}
		.content_con2 h2{
			height: 30px;
		}
		.con2{
			text-align: center;
			line-height:none;
			cursor: pointer;
		}
		.con2>img{
			max-width: 90%;
			max-height: 90%;
		}
		.con2>p{
			padding:5px 14px;
			font-size: 0.3em;
			margin: 0;
			width: 90%;
			/*height: 10%;*/
			line-height: 16px;
			/*margin-bottom: 15px;*/
			text-align: left;
			color: #000;
			z-index: 10;
		}
</style>	
