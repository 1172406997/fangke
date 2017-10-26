<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<login ></login>-->
    <router-view></router-view>
  </div>
</template>

<script>

import login from './components/Login';

			export default {
			  name: 'app',
				data(){
					return{

					}
				},
				components:{ login },
				props:{
				},

			}
</script>

<style>
	#app{
		height: 100%;
	}
	html,body{
		position: relative;
		margin: 0;
		padding: 0;
		height: 100% !important;
		width: 100% !important;
	}
</style>
