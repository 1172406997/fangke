<template>
	<div class="layout-l" style="margin-top: 50px;">
		<img src="../../dist/instatic/img/1.d80e543.png" id="target"/>
    </div>
</template>

<script>
	import 'fabric/dist/fabric.js'
	import "@/assets/dark/css/darkroom.css"
	import '@/assets/dark/css/_layout.css'
	import '@/assets/dark/css/_toolbar.css'
	import "@/assets/dark/js/core/bootstrap.js"
	import "@/assets/dark/js/core/darkroom.js"
	import "@/assets/dark/js/core/ui.js"
	import "@/assets/dark/js/core/transformation.js"
	import "@/assets/dark/js/core/utils.js"
	import "@/assets/dark/js/core/plugin.js"
	import "@/assets/dark/js/plugins/darkroom.crop.js"
	import "@/assets/dark/js/plugins/darkroom.history.js"
	import "@/assets/dark/js/plugins/darkroom.rotate.js"
	import "@/assets/dark/js/plugins/darkroom.save.js"
export default {
	data () {
		return{
			isActive:false,
		}
	},
	mounted(){
		var dkrm = new Darkroom('#target', {
	      // Size options
	      minWidth: 100,
	      minHeight: 100,
	      maxWidth: 600,
	      maxHeight: 500,
	      ratio: 4/3,
	      backgroundColor: '#000',
	      initialize: function() {}
	    });
	},
	methods:{
		routerTo(url){
			this.$router.push({path: url});
		},
		init(){
			var dkrm = new Darkroom('#target', {
		      // Size options
		      minWidth: 100,
		      minHeight: 100,
		      maxWidth: 600,
		      maxHeight: 500,
		      ratio: 4/3,
		      backgroundColor: '#000',
		      initialize: function() {}
		    });
		},
	}
    
}
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
	textarea{
		    border: 0;
		    outline: none;
		    -webkit-tap-highlight-color: transparent;
		    -webkit-appearance: none;
		    -moz-appearance: none;
		    appearance: none;
	}
	 .layout{
        border: 1px solid #d7dde4;
        background: #293036;
        line-height: 48px;
    	height: 48px;
    	min-width: 900px;
    }
    .top.ivu-menu.ivu-menu-dark.ivu-menu-horizontal{
    	line-height: 48px;
    	height: 48px;
    	background: #293036;
    	min-width: 900px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 8px;
        left: 20px;
        margin-right: 30px;
    }
    .layout-nav{
        /*width: 420px;*/
        /*margin: 0 auto;*/
       margin-left: 30px;
    }
    .layout-text{
    	font-size: 12px;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        margin-left: 30px;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 10px;
        color: #9ea7b4;
    }
    
    .myintro{
    	width: 208px;
    	box-sizing: border-box;
    	overflow: hidden;
    }
    .myintro textarea{
    	padding: 6px 12px;
	    width: 216px;
	    height: 165px;
	    color: #b2c0c8;
	    font-size: 12px;
	    line-height: 24px;
	    overflow-y: auto;
	    border-radius: 2px;
	    background-color: #f2f2f3;
	    resize: none;
	    border: none;
	    box-sizing: border-box;
    }
    .myintro span.text{
    	display: inline-block;
	    width: 150px;
	    height: 32px;
	    line-height: 16px;
	    font-size: 12px;
	    color: #b2c0c8;
	    word-wrap:break-word;
	    word-break:break-all;
    }
    .creat{
    	width: 120px;
    }
    .creat>.top{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    	border-bottom: 1px solid #f4f4f4;
    }
    .creat>.bottom{
    	width: 100%;
    	height: 120px;
    	padding-top: 36px;
    	text-align: center;
    }
   	.ivu-menu-light{
    	z-index: -0;	
    }	
</style>