import Vue from 'vue'
import App from './App'
import pageFoot from './components/page-foot.vue'

import store from './store'
Vue.prototype.$store = store

// import common from './common/common.js'
// Vue.prototype.global_common = common;

Vue.config.productionTip = false

Vue.component('page-foot',pageFoot)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
