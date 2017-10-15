import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import content from '@/components/content'
import search from '@/components/search'
import puzzle from '@/components/puzzle'
import my from '@/components/my'
//import all from '@/components/all'
import myCollect from '@/components/myCollect'
//import project from '@/components/project'
//import puzzleson from '@/components/puzzleson'
import canvas from '@/components/canvas'
import Clip from '@/components/Clip'

Vue.use(Router)
export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      children:[
		      {
		      path: '/',
		      name: 'Hello',
		      component: Hello,
		      children: [
		            // { path: '/', component: my},
		            { path: '/search', component: search},
		            { path: '/puzzle', component: puzzle,
			            children:[
		//	            	{path: '/', component: all},
		//	            	{path: '/project', component: project},
		//	            	{path: '/puzzleson', component: puzzleson},
			            ]
		            },
		            { path: '/', component: content},
		            { path: '/myCollect', component: myCollect},
		            { path: '/Clip', component: Clip},
		        ]
		   }
      ]
    },
    
    { path: '/canvas', component: canvas, meta:{isActive:true}},

  ]
})
