import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router.js'

Vue.use(VueRouter)
Vue.use(Vant)
Vue.use(MintUI)

Vue.config.productionTip = false

Vue.filter('dateFormat', function (dataStr, pattern) {

})

// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})
