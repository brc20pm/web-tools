(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-assets-token-details-transfer-transfer"],{"00e2":function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa");var a={props:{safeAreaInsetTop:{type:Boolean,default:uni.$u.props.navbar.safeAreaInsetTop},placeholder:{type:Boolean,default:uni.$u.props.navbar.placeholder},fixed:{type:Boolean,default:uni.$u.props.navbar.fixed},border:{type:Boolean,default:uni.$u.props.navbar.border},leftIcon:{type:String,default:uni.$u.props.navbar.leftIcon},leftText:{type:String,default:uni.$u.props.navbar.leftText},rightText:{type:String,default:uni.$u.props.navbar.rightText},rightIcon:{type:String,default:uni.$u.props.navbar.rightIcon},title:{type:[String,Number],default:uni.$u.props.navbar.title},bgColor:{type:String,default:uni.$u.props.navbar.bgColor},titleWidth:{type:[String,Number],default:uni.$u.props.navbar.titleWidth},height:{type:[String,Number],default:uni.$u.props.navbar.height},leftIconSize:{type:[String,Number],default:uni.$u.props.navbar.leftIconSize},leftIconColor:{type:String,default:uni.$u.props.navbar.leftIconColor},autoBack:{type:Boolean,default:uni.$u.props.navbar.autoBack},titleStyle:{type:[String,Object],default:uni.$u.props.navbar.titleStyle}}};e.default=a},"0624":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uNavbar:n("b4b6").default,uIcon:n("396a").default,uLine:n("98aa").default,"u-Text":n("4afa").default,"u-Input":n("a54f").default,"u-Form":n("9b2f").default,uFormItem:n("e1ac").default,uPicker:n("1462").default,uButton:n("2977").default,uModal:n("bca5").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-page"},[n("v-uni-view",{staticClass:"u-page__item"},[n("u-navbar",{attrs:{fixed:!1,title:"Transfer B20",height:"50px",safeAreaInsetTop:!1,"auto-back":!0}},[n("v-uni-view",{staticClass:"u-nav-slot",attrs:{slot:"left"},slot:"left"},[n("u-icon",{attrs:{name:"arrow-left",size:"19"}}),n("u-line",{attrs:{direction:"column",hairline:!1,length:"16",margin:"0 8px"}}),n("u-icon",{attrs:{name:"home",size:"20"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goHome.apply(void 0,arguments)}}})],1)],1)],1),n("v-uni-view",{staticClass:"transfer"},[n("v-uni-view",[n("u--text",{staticStyle:{"padding-bottom":"15rpx"},attrs:{bold:!0,text:"Receiving Address"}}),n("u--input",{staticClass:"input",attrs:{fontSize:"18px",border:"nonce",placeholder:"Enter of paste wallet address"},model:{value:t.to,callback:function(e){t.to=e},expression:"to"}})],1),n("v-uni-view",{staticStyle:{"margin-top":"50rpx"}},[n("u--text",{staticStyle:{"padding-bottom":"15rpx"},attrs:{bold:!0,text:"Transfer Amount"}}),n("v-uni-view",{staticClass:"amount"},[n("u--input",{staticClass:"input",attrs:{fontSize:"18px",border:"nonce",placeholder:"0"},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}}),n("v-uni-view",{staticClass:"balance"},[n("u--text",{attrs:{text:"Balance",align:"left"}}),n("u--text",{attrs:{text:t.balance,align:"right"}})],1)],1)],1),n("v-uni-view",{staticStyle:{"margin-top":"50rpx"}},[n("u--text",{staticStyle:{"padding-bottom":"15rpx"},attrs:{bold:!0,text:"Miner Fee"}}),n("v-uni-view",{staticClass:"fee"},[n("u--form",[n("u-form-item",{attrs:{label:"Speed",labelWidth:"auto"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showFee=!0,t.hideKeyboard()}}},[n("u--input",{attrs:{disabled:!0,disabledColor:"#ffffff",placeholder:"Please select fee speed",inputAlign:"right",border:"none"},model:{value:t.speed,callback:function(e){t.speed=e},expression:"speed"}}),n("u-icon",{staticStyle:{"padding-left":"5px"},attrs:{slot:"right",name:"arrow-right"},slot:"right"})],1),n("u-picker",{attrs:{confirmText:"confirm",cancelText:"cancel",show:t.showFee,columns:t.fees,keyName:"name",title:"Please select speed"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.feeSelect.apply(void 0,arguments)},close:function(e){arguments[0]=e=t.$handleEvent(e),t.showFee=!1},cancel:function(e){arguments[0]=e=t.$handleEvent(e),t.showFee=!1}}})],1)],1)],1),n("u-button",{staticClass:"btn",attrs:{disabled:t.amount<=0,text:"Confirm",type:"success",size:"large",color:"linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.transfer.apply(void 0,arguments)}}})],1),n("u-modal",{attrs:{title:"Payment Sent",show:t.showModal,content:"Your transaction has been successfully sent",closeOnClickOverlay:!0,showCancelButton:!0},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.showModal=!1}}},[n("u-button",{attrs:{slot:"confirmButton",text:"View Block Explorer",type:"success",shape:"circle",color:"linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.mempool.apply(void 0,arguments)}},slot:"confirmButton"})],1)],1)},o=[]},"0e53":function(t,e,n){var a=n("800a"),r=n("0ed4"),o=r;o.v1=a,o.v4=r,t.exports=o},"0ed4":function(t,e,n){var a=n("8b8b"),r=n("3009");t.exports=function(t,e,n){var o=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null),t=t||{};var i=t.random||(t.rng||a)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var s=0;s<16;++s)e[o+s]=i[s];return e||r(i)}},"185e":function(t,e,n){"use strict";n.r(e);var a=n("0624"),r=n("78c0");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("9e6f");var i=n("828b"),s=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"75e04344",null,!1,a["a"],void 0);e["default"]=s.exports},2812:function(t,e,n){"use strict";n.r(e);var a=n("bc83"),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},3009:function(t,e){for(var n=[],a=0;a<256;++a)n[a]=(a+256).toString(16).substr(1);t.exports=function(t,e){var a=e||0,r=n;return[r[t[a++]],r[t[a++]],r[t[a++]],r[t[a++]],"-",r[t[a++]],r[t[a++]],"-",r[t[a++]],r[t[a++]],"-",r[t[a++]],r[t[a++]],"-",r[t[a++]],r[t[a++]],r[t[a++]],r[t[a++]],r[t[a++]],r[t[a++]]].join("")}},"40c1":function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/* uni.scss */\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-5302c461], uni-scroll-view[data-v-5302c461], uni-swiper-item[data-v-5302c461]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-navbar--fixed[data-v-5302c461]{position:fixed;left:0;right:0;top:0;z-index:11}.u-navbar__content[data-v-5302c461]{display:flex;flex-direction:row;align-items:center;height:44px;background-color:#9acafc;position:relative;justify-content:center}.u-navbar__content__left[data-v-5302c461], .u-navbar__content__right[data-v-5302c461]{padding:0 13px;position:absolute;top:0;bottom:0;display:flex;flex-direction:row;align-items:center}.u-navbar__content__left[data-v-5302c461]{left:0}.u-navbar__content__left--hover[data-v-5302c461]{opacity:.7}.u-navbar__content__left__text[data-v-5302c461]{font-size:15px;margin-left:3px}.u-navbar__content__title[data-v-5302c461]{text-align:center;font-size:16px;color:#303133}.u-navbar__content__right[data-v-5302c461]{right:0}.u-navbar__content__right__text[data-v-5302c461]{font-size:15px;margin-left:3px}',""]),t.exports=e},"4d66":function(t,e,n){var a=n("40c1");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("967d").default;r("36941cb9",a,!0,{sourceMap:!1,shadowMode:!1})},"78c0":function(t,e,n){"use strict";n.r(e);var a=n("e9c8"),r=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},"800a":function(t,e,n){var a,r,o=n("8b8b"),i=n("3009"),s=0,u=0;t.exports=function(t,e,n){var l=e&&n||0,c=e||[];t=t||{};var d=t.node||a,f=void 0!==t.clockseq?t.clockseq:r;if(null==d||null==f){var p=o();null==d&&(d=a=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==f&&(f=r=16383&(p[6]<<8|p[7]))}var v=void 0!==t.msecs?t.msecs:(new Date).getTime(),b=void 0!==t.nsecs?t.nsecs:u+1,h=v-s+(b-u)/1e4;if(h<0&&void 0===t.clockseq&&(f=f+1&16383),(h<0||v>s)&&void 0===t.nsecs&&(b=0),b>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=v,u=b,r=f,v+=122192928e5;var g=(1e4*(268435455&v)+b)%4294967296;c[l++]=g>>>24&255,c[l++]=g>>>16&255,c[l++]=g>>>8&255,c[l++]=255&g;var m=v/4294967296*1e4&268435455;c[l++]=m>>>8&255,c[l++]=255&m,c[l++]=m>>>24&15|16,c[l++]=m>>>16&255,c[l++]=f>>>8|128,c[l++]=255&f;for(var x=0;x<6;++x)c[l+x]=d[x];return e||i(c)}},"8b8b":function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var a=new Uint8Array(16);t.exports=function(){return n(a),a}}else{var r=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0===(3&e)&&(t=4294967296*Math.random()),r[e]=t>>>((3&e)<<3)&255;return r}}},"8f2d":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uStatusBar:n("80f7").default,uIcon:n("396a").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-navbar"},[t.fixed&&t.placeholder?n("v-uni-view",{staticClass:"u-navbar__placeholder",style:{height:t.$u.addUnit(t.$u.getPx(t.height)+t.$u.sys().statusBarHeight,"px")}}):t._e(),n("v-uni-view",{class:[t.fixed&&"u-navbar--fixed"]},[t.safeAreaInsetTop?n("u-status-bar",{attrs:{bgColor:t.bgColor}}):t._e(),n("v-uni-view",{staticClass:"u-navbar__content",class:[t.border&&"u-border-bottom"],style:{height:t.$u.addUnit(t.height),backgroundColor:t.bgColor}},[n("v-uni-view",{staticClass:"u-navbar__content__left",attrs:{"hover-class":"u-navbar__content__left--hover","hover-start-time":"150"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.leftClick.apply(void 0,arguments)}}},[t._t("left",[t.leftIcon?n("u-icon",{attrs:{name:t.leftIcon,size:t.leftIconSize,color:t.leftIconColor}}):t._e(),t.leftText?n("v-uni-text",{staticClass:"u-navbar__content__left__text",style:{color:t.leftIconColor}},[t._v(t._s(t.leftText))]):t._e()])],2),t._t("center",[n("v-uni-text",{staticClass:"u-line-1 u-navbar__content__title",style:[{width:t.$u.addUnit(t.titleWidth)},t.$u.addStyle(t.titleStyle)]},[t._v(t._s(t.title))])]),t.$slots.right||t.rightIcon||t.rightText?n("v-uni-view",{staticClass:"u-navbar__content__right",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.rightClick.apply(void 0,arguments)}}},[t._t("right",[t.rightIcon?n("u-icon",{attrs:{name:t.rightIcon,size:"20"}}):t._e(),t.rightText?n("v-uni-text",{staticClass:"u-navbar__content__right__text"},[t._v(t._s(t.rightText))]):t._e()])],2):t._e()],2)],1)],1)},o=[]},"900d":function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/* uni.scss */\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-75e04344]{background-color:#f3f4f6}body.?%PAGE?%[data-v-75e04344]{background-color:#f3f4f6}.u-page[data-v-75e04344]{padding:0;flex:1;background-color:#f3f4f6}.u-page__item__title[data-v-75e04344]{color:#909193;background-color:#f3f4f6;padding:15px;font-size:15px}.u-page__item__title__slot-title[data-v-75e04344]{color:#3c9cff;font-size:14px}.u-nav-slot[data-v-75e04344]{display:flex;flex-direction:row;align-items:center;justify-content:space-between;border-width:.5px;border-radius:100px;border-color:#dadbde;padding:3px 7px;opacity:.8;border:1px solid #d6d7d9}.transfer[data-v-75e04344]{width:93vw;margin:0 auto;margin-top:%?50?%}.transfer .fee[data-v-75e04344]{background-color:#fff;padding-left:%?19?%;padding-right:%?19?%;border-radius:%?15?%}.transfer .input[data-v-75e04344]{margin-top:%?10?%;background-color:#fff;height:%?80?%;border-radius:%?15?%}.transfer .amount[data-v-75e04344]{background-color:#fff;border-radius:%?15?%;overflow:hidden}.transfer .amount .balance[data-v-75e04344]{display:flex;flex-direction:row;align-items:center;justify-content:center;padding:%?19?%;height:30px;border-top:%?1?% solid #d6d7d9}.transfer .amount .input[data-v-75e04344]{margin-top:%?10?%;background-color:#fff;height:%?80?%}.btn[data-v-75e04344]{margin-top:%?100?%;border-radius:%?15?%;height:50px}',""]),t.exports=e},"9e6f":function(t,e,n){"use strict";var a=n("d5b21"),r=n.n(a);r.a},a438:function(t,e,n){"use strict";var a=n("4d66"),r=n.n(a);r.a},b4b6:function(t,e,n){"use strict";n.r(e);var a=n("8f2d"),r=n("2812");for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("a438");var i=n("828b"),s=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"5302c461",null,!1,a["a"],void 0);e["default"]=s.exports},bc83:function(t,e,n){"use strict";n("6a54");var a=n("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("00e2")),o={name:"u-navbar",mixins:[uni.$u.mpMixin,uni.$u.mixin,r.default],data:function(){return{}},methods:{leftClick:function(){this.$emit("leftClick"),this.autoBack&&uni.navigateBack()},rightClick:function(){this.$emit("rightClick")}}};e.default=o},d5b21:function(t,e,n){var a=n("900d");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=n("967d").default;r("93396fdc",a,!0,{sourceMap:!1,shadowMode:!1})},e9c8:function(t,e,n){"use strict";(function(t){n("6a54");var a=n("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa"),n("3efd"),n("d4b5");var r=a(n("2634")),o=a(n("2fdc")),i=a(n("030c")),s=n("0e53"),u=s.v4,l={data:function(){return{kid:"",owner:"",balance:0,to:"",amount:"",txid:"",showModal:!1,showFee:!1,speed:"",fees:[[{name:"fastestFee"},{name:"halfHourFee"},{name:"hourFee"},{name:"economyFee"},{name:"minimumFee"}]]}},onLoad:function(t){this.kid=t.kid,this.owner=uni.getStorageSync("wallet"),this.getBalance()},methods:{getBalance:function(){var t=this;uni.request({url:this.$rpc,method:"POST",data:{jsonrpc:"2.0",method:"ord_call",params:{kid:this.kid,method:"$balanceOf",params:[this.owner]},id:u()},success:function(e){t.balance=e.data.result.data},fail:function(t){uni.showToast({icon:"none",title:t.errMsg})}})},goHome:function(){uni.switchTab({url:"/pages/assets/assets"})},feeSelect:function(t){this.speed=t.value[0].name,this.showFee=!1},transfer:function(){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,o,s,u,l,c,d,f,p;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.to){n.next=3;break}return uni.showToast({icon:"none",title:"Enter of paste wallet address"}),n.abrupt("return");case 3:if(!(Number(e.amount)>Number(e.balance))){n.next=6;break}return uni.showToast({icon:"none",title:"transfer amount exceeds balance"}),n.abrupt("return");case 6:if(e.speed){n.next=9;break}return uni.showToast({icon:"none",title:"Please select fee speed"}),n.abrupt("return");case 9:return a={kid:e.kid,method:"transfer",params:[e.to,e.amount]},t.log(a),n.prev=11,uni.showLoading({mask:!0}),o=new i.default(a,e.$network),n.next=16,o.getFeeRate();case 16:return s=n.sent,u=s[e.speed],t.log(u),l=o.gen_TapScript(u),c=Number(l.fee),t.log("relayer address->>>> ",l.address),t.log("fee->>>> ",c),n.next=25,e.$wallet.Send(l.address,c);case 25:if(d=n.sent,uni.hideLoading(),t.log(d),!d){n.next=35;break}return n.next=31,o.gen_TxHex(d,0,c);case 31:f=n.sent,t.log(f),p=o.Broadcast(f),p.then((function(n){t.log(n.data),e.addLocalTx(n.data),e.txid=n.data,e.showModal=!0})).catch((function(e){t.log(e),uni.showToast({icon:"none",title:e.response.data})}));case 35:n.next=40;break;case 37:n.prev=37,n.t0=n["catch"](11),uni.showToast({icon:"none",title:n.t0.message});case 40:case"end":return n.stop()}}),n,null,[[11,37]])})))()},hideKeyboard:function(){uni.hideKeyboard()},addLocalTx:function(e){var n=[],a=uni.getStorageSync("txids");a&&(n=JSON.parse(a)),n.unshift(e),t.log(n),uni.setStorageSync("txids",JSON.stringify(n))},mempool:function(){switch(this.$network){case"mainnet":window.location.href="https://mempool.space/tx/"+this.txid;break;case"testnet":window.location.href="https://mempool.space/testnet/tx/"+this.txid;break}}}};e.default=l}).call(this,n("ba7c")["default"])}}]);