import App from './App'
import Vue from 'vue'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


import wallet from './js_sdk/wallet'


Vue.prototype.$wallet = wallet

Vue.prototype.$network = "testnet"

// Vue.prototype.$market = "/market"

// Vue.prototype.$indexer = "/indexer"
 
// Vue.prototype.$rpc = "/rpc" 

Vue.prototype.$market = "https://37526sxcj546.vicp.fun"

Vue.prototype.$indexer = "https://testnet.ordscript.com"

Vue.prototype.$rpc = "https://testnet.ordscript.com"





Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()