import App from './App'
import Vue from 'vue'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


import wallet from './js_sdk/wallet'

import okx from './js_sdk/okx.js'

if (typeof window.okxwallet !== 'undefined') {
	Vue.prototype.$wallet = okx
}else{
	Vue.prototype.$wallet = wallet
}

Vue.prototype.$network = "mainnet"


Vue.prototype.$Node = "https://mainnet.brc20pm.com"


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()