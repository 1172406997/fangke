<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <login ></login>
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

	}
	html,body{
		height:auto;
	}
</style>
