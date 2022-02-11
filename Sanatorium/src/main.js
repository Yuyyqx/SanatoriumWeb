// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './style/main.css';
import * as echarts from 'echarts';
Vue.component('v-chart', echarts)
Vue.use(elementUi)
Vue.prototype.$ajax = axios
axios.defaults.baseURL = 'https://www.tangyihan.top'
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false

import moment from 'moment'
 
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'dd4cc5f831b67cde767de9a65f983650',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD'){
  return moment(dateStr).format(pattern);
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
