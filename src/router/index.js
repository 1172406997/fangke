import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import content from '@/components/content'
import search from '@/components/search'
import puzzle from '@/components/puzzle'
import my from '@/components/my'
import all from '@/components/all'
//import project from '@/components/project'
//import puzzleson from '@/components/puzzleson'
import canvas from '@/components/canvas'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
            { path: '/', component: my},
            { path: '/search', component: search},
            { path: '/puzzle', component: puzzle,
	            children:[
	            	{path: '/', component: all},
//	            	{path: '/project', component: project},
//	            	{path: '/puzzleson', component: puzzleson},
	            ]
            },
            { path: '/content', component: content},
        ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/canvas', component: canvas, meta:{isActive:true}},
    
  ]
})
