// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import iView from 'iview';
import $ from 'jquery'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import '../src/assets/item-factory.js';
import '../src/assets/style.css';
import 'font-awesome/css/font-awesome.css'
import { jsonpRequest } from "@/util/jsonp_request.js"
import { Encrypt } from "@/util/encrypt.js"
import VueResource from 'vue-resource';
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);

Vue.config.productionTip = false
//Vue.prototype.axios = axios;
Vue.prototype.jsonpRequest = jsonpRequest;
Vue.prototype.Encrypt = Encrypt;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
