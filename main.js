import App from './App'
import Vue from 'vue'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


import wallet from './js_sdk/wallet'


Vue.prototype.$wallet = wallet

Vue.prototype.$network = "testnet"


Vue.prototype.$Node = "https://testnet.brc20pm.com"
 

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()