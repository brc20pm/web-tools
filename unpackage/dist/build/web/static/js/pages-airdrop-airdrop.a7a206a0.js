(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-airdrop-airdrop"],{"0d09":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={"u-Text":n("4afa").default,uTransition:n("a072").default,uCountTo:n("3c7fd").default,"u-Input":n("a54f").default,uButton:n("2977").default,uModal:n("bca5").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"mint"},[n("u--text",{staticStyle:{"padding-top":"80rpx"},attrs:{align:"center",size:"45rpx",bold:!0,text:"Basic Info"}}),n("u-transition",{attrs:{show:!0,mode:"fade-right"}},[n("u--text",{staticStyle:{"padding-top":"30rpx"},attrs:{size:"35rpx",bold:!0,text:t.value}})],1),n("v-uni-view",{staticClass:"number"},[n("u-count-to",{attrs:{startVal:30,endVal:t.totalSuppy,fontSize:"33"}}),n("u--text",{attrs:{align:"center",size:"45rpx",bold:!0,text:"TotalSupply"}})],1),n("v-uni-view",{staticClass:"info"},[n("u--text",{attrs:{mode:"text",align:"center",size:"45rpx",bold:!0,text:"BIP20·₿·400M"}})],1),n("v-uni-view",{staticClass:"input"},[n("u--input",{staticStyle:{height:"60rpx"},attrs:{placeholder:"Please enter the invite address",border:"surround"},model:{value:t.inviter,callback:function(e){t.inviter=e},expression:"inviter"}}),n("u-button",{staticStyle:{"margin-top":"30rpx",height:"90rpx"},attrs:{text:"Mint",shape:"circle",color:"linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.mint.apply(void 0,arguments)}}})],1),n("u-modal",{attrs:{confirmText:"Confirm",show:t.showRule,title:"AirDrop Rule",content:t.rules,confirmColor:"#000"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.showRule=!1},close:function(e){arguments[0]=e=t.$handleEvent(e),t.showRule=!1}}}),n("u-modal",{attrs:{title:"Payment Sent",show:t.showModal,content:"Your transaction has been successfully sent",closeOnClickOverlay:!0,showCancelButton:!0},on:{close:function(e){arguments[0]=e=t.$handleEvent(e),t.showModal=!1}}},[n("u-button",{attrs:{slot:"confirmButton",text:"View Block Explorer",type:"success",shape:"circle",color:"linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.mempool.apply(void 0,arguments)}},slot:"confirmButton"})],1),n("v-uni-view",{staticStyle:{display:"flex","flex-direction":"row",width:"100%","padding-top":"55rpx"}},[n("u--text",{attrs:{align:"left",size:"33rpx",color:"#8a8a8a",decoration:"underline",text:"AirDrop Rule"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showRule=!0}}}),n("u--text",{attrs:{align:"center",size:"33rpx",color:"#8a8a8a",decoration:"underline",text:"OrdScript"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goBitScpt.apply(void 0,arguments)}}}),n("u--text",{attrs:{align:"right",size:"33rpx",color:"#8a8a8a",decoration:"underline",text:"Share't Twitter"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.share.apply(void 0,arguments)}}})],1)],1)},r=[]},"0e53":function(t,e,n){var a=n("800a"),i=n("0ed4"),r=i;r.v1=a,r.v4=i,t.exports=r},"0ed4":function(t,e,n){var a=n("8b8b"),i=n("3009");t.exports=function(t,e,n){var r=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null),t=t||{};var o=t.random||(t.rng||a)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var s=0;s<16;++s)e[r+s]=o[s];return e||i(o)}},"104d":function(t,e,n){"use strict";n.r(e);var a=n("5d45"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},1746:function(t,e,n){"use strict";var a=n("493e"),i=n.n(a);i.a},"18e3":function(t,e,n){"use strict";n.r(e);var a=n("9592"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"20ef":function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/* uni.scss */\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.mint[data-v-9052b08e]{display:flex;flex-direction:column;align-items:center;padding:%?20?%;padding-top:%?50?%;height:100%}.mint .navbar[data-v-9052b08e]{height:%?50?%;display:flex;flex-direction:row}.mint .textarea[data-v-9052b08e]{width:85vw}.mint .number[data-v-9052b08e]{display:flex;flex-direction:column;align-items:center;margin-bottom:%?30?%;margin-top:%?30?%}.mint .input[data-v-9052b08e]{width:93vw;margin:0 auto;margin-top:%?30?%}.mint .info[data-v-9052b08e]{width:93vw;margin:0 auto}',""]),t.exports=e},3009:function(t,e){for(var n=[],a=0;a<256;++a)n[a]=(a+256).toString(16).substr(1);t.exports=function(t,e){var a=e||0,i=n;return[i[t[a++]],i[t[a++]],i[t[a++]],i[t[a++]],"-",i[t[a++]],i[t[a++]],"-",i[t[a++]],i[t[a++]],"-",i[t[a++]],i[t[a++]],"-",i[t[a++]],i[t[a++]],i[t[a++]],i[t[a++]],i[t[a++]],i[t[a++]]].join("")}},"3c7fd":function(t,e,n){"use strict";n.r(e);var a=n("c60c"),i=n("18e3");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("1746");var o=n("828b"),s=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"0dd1b27e",null,!1,a["a"],void 0);e["default"]=s.exports},"493e":function(t,e,n){var a=n("f616");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("967d").default;i("301c1ae3",a,!0,{sourceMap:!1,shadowMode:!1})},"4e2d":function(t,e,n){"use strict";n("6a54"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa");var a={props:{startVal:{type:[String,Number],default:uni.$u.props.countTo.startVal},endVal:{type:[String,Number],default:uni.$u.props.countTo.endVal},duration:{type:[String,Number],default:uni.$u.props.countTo.duration},autoplay:{type:Boolean,default:uni.$u.props.countTo.autoplay},decimals:{type:[String,Number],default:uni.$u.props.countTo.decimals},useEasing:{type:Boolean,default:uni.$u.props.countTo.useEasing},decimal:{type:[String,Number],default:uni.$u.props.countTo.decimal},color:{type:String,default:uni.$u.props.countTo.color},fontSize:{type:[String,Number],default:uni.$u.props.countTo.fontSize},bold:{type:Boolean,default:uni.$u.props.countTo.bold},separator:{type:String,default:uni.$u.props.countTo.separator}}};e.default=a},"4f92":function(t,e,n){"use strict";n.r(e);var a=n("0d09"),i=n("104d");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("c1c6");var o=n("828b"),s=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"9052b08e",null,!1,a["a"],void 0);e["default"]=s.exports},"5d45":function(t,e,n){"use strict";(function(t){n("6a54");var a=n("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa"),n("c223");var i=a(n("2634")),r=a(n("2fdc")),o=a(n("030c")),s=n("0e53"),u=s.v4,l={data:function(){return{showRule:!1,rules:"A&B \nA-1000、B-1000\n\nA&B&C\nA-500、B-500、C-1000\n\nA&B&C&D \nA-100、B-400、C-500、D-1000\n\nMaxSupply: 400000000\n\nThe inviter's balance must be greater than or equal to 1000 ₿",value:"This is an experimental B20 token issued based on the OrdScript Everyone can freely mint, and it also has an invitation reward mechanism of up to 3 levels.",owner:"",kid:"ord83633b22d3b7a211333081bece366c8f121994a",totalSuppy:0,inviter:"",txid:"",showModal:!1,speed:"minimumFee"}},onLoad:function(t){this.owner=uni.getStorageSync("wallet"),this.getTotalSuppy(),t.inviter&&(this.inviter=t.inviter)},methods:{share:function(){var t=this;return(0,r.default)((0,i.default)().mark((function e(){var n,a;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.call({kid:t.kid,method:"$balanceOf",params:[t.owner]});case 2:if(n=e.sent,a=n.data,!(Number(a)<1e3)){e.next=7;break}return uni.showToast({icon:"none",title:"balance < 1000"}),e.abrupt("return");case 7:t.twitterShare();case 8:case"end":return e.stop()}}),e)})))()},twitterShare:function(){var t=encodeURIComponent("\nBased on the idea of ​​#Ordinals founder @rodarmor, used to extend #Bitcoin’s indexer protocol\n\n#BitScpt Experimental B20 Token #AirDrop"),e=encodeURIComponent("\n\t\t\t\t\t\nhttps://tool.ordscipt.com/#/pages/airdrop/airdrop?inviter="+this.owner+"\n\n"),n="".concat(t).concat(e),a="https://twitter.com/intent/tweet?text=".concat(n);window.location.href=a},getTotalSuppy:function(){var t=this;return(0,r.default)((0,i.default)().mark((function e(){var n;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.call({kid:t.kid,method:"$totalSupply"});case 2:n=e.sent,t.totalSuppy=n.data;case 4:case"end":return e.stop()}}),e)})))()},mint:function(){var t=this;return(0,r.default)((0,i.default)().mark((function e(){var n;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.inviter){e.next=3;break}return uni.showToast({icon:"none",title:"Please enter the invite address"}),e.abrupt("return");case 3:return e.next=5,t.call({kid:t.kid,method:"$balanceOf",params:[t.inviter]});case 5:if(n=e.sent,!n){e.next=11;break}if(!(Number(n.data)<100)){e.next=10;break}return uni.showToast({icon:"none",title:"invalid invite address"}),e.abrupt("return");case 10:t.sendTapRoot({kid:t.kid,method:"mint",params:[t.inviter]});case 11:case"end":return e.stop()}}),e)})))()},call:function(t){var e=this;return(0,r.default)((0,i.default)().mark((function n(){var a;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,uni.request({url:e.$rpc,method:"POST",data:{jsonrpc:"2.0",method:"ord_call",params:t,id:u()}});case 2:return a=n.sent,n.abrupt("return",a[1].data.result);case 4:case"end":return n.stop()}}),n)})))()},sendTapRoot:function(e){var n=this;return(0,r.default)((0,i.default)().mark((function a(){var r,s,u,l,c,d,p,f;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.log(e),a.prev=1,uni.showLoading({mask:!0}),r=new o.default(e,n.$network),a.next=6,r.getFeeRate();case 6:return s=a.sent,t.log(s),u=s[n.speed],t.log(u),l=r.gen_TapScript(u),c=Number(l.fee)+1500,t.log("relayer address->>>> ",l.address),t.log("fee->>>> ",c/1e8),a.next=16,n.$wallet.Send(l.address,c);case 16:if(d=a.sent,uni.hideLoading(),t.log(d),!d){a.next=26;break}return a.next=22,r.gen_TxHex(d,0,c);case 22:p=a.sent,t.log(p),f=r.Broadcast(p),f.then((function(e){t.log(e.data),n.addLocalTx(e.data),n.txid=e.data,n.showModal=!0})).catch((function(e){t.log(e),uni.showToast({icon:"none",title:e.response.data})}));case 26:a.next=31;break;case 28:a.prev=28,a.t0=a["catch"](1),uni.showToast({icon:"none",title:a.t0.message});case 31:case"end":return a.stop()}}),a,null,[[1,28]])})))()},mempool:function(){switch(this.$network){case"mainnet":window.location.href="https://mempool.space/tx/"+this.txid;break;case"testnet":window.location.href="https://mempool.space/testnet/tx/"+this.txid;break}},goOrdScript:function(){window.location.href="https://docs.ordscript.com"}}};e.default=l}).call(this,n("ba7c")["default"])},"79fe":function(t,e,n){var a=n("20ef");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("967d").default;i("339bc912",a,!0,{sourceMap:!1,shadowMode:!1})},"800a":function(t,e,n){var a,i,r=n("8b8b"),o=n("3009"),s=0,u=0;t.exports=function(t,e,n){var l=e&&n||0,c=e||[];t=t||{};var d=t.node||a,p=void 0!==t.clockseq?t.clockseq:i;if(null==d||null==p){var f=r();null==d&&(d=a=[1|f[0],f[1],f[2],f[3],f[4],f[5]]),null==p&&(p=i=16383&(f[6]<<8|f[7]))}var h=void 0!==t.msecs?t.msecs:(new Date).getTime(),m=void 0!==t.nsecs?t.nsecs:u+1,v=h-s+(m-u)/1e4;if(v<0&&void 0===t.clockseq&&(p=p+1&16383),(v<0||h>s)&&void 0===t.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=h,u=m,i=p,h+=122192928e5;var x=(1e4*(268435455&h)+m)%4294967296;c[l++]=x>>>24&255,c[l++]=x>>>16&255,c[l++]=x>>>8&255,c[l++]=255&x;var b=h/4294967296*1e4&268435455;c[l++]=b>>>8&255,c[l++]=255&b,c[l++]=b>>>24&15|16,c[l++]=b>>>16&255,c[l++]=p>>>8|128,c[l++]=255&p;for(var w=0;w<6;++w)c[l+w]=d[w];return e||o(c)}},"8b8b":function(t,e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var a=new Uint8Array(16);t.exports=function(){return n(a),a}}else{var i=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0===(3&e)&&(t=4294967296*Math.random()),i[e]=t>>>((3&e)<<3)&255;return i}}},9592:function(t,e,n){"use strict";n("6a54");var a=n("f5bd").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("64aa"),n("e838"),n("5c47"),n("0506"),n("a1c1");var i=a(n("4e2d")),r={name:"u-count-to",data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:Number(this.duration),startTime:null,timestamp:null,remaining:null,rAF:null,lastTime:0}},mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start()},methods:{easingFn:function(t,e,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+e},requestAnimationFrame:function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-this.lastTime)),a=setTimeout((function(){t(e+n)}),n);return this.lastTime=e+n,a},cancelAnimationFrame:function(t){clearTimeout(t)},start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=this.requestAnimationFrame(this.count)},reStart:function(){this.paused?(this.resume(),this.paused=!1):(this.stop(),this.paused=!0)},stop:function(){this.cancelAnimationFrame(this.rAF)},resume:function(){this.remaining&&(this.startTime=0,this.localDuration=this.remaining,this.localStartVal=this.printVal,this.requestAnimationFrame(this.count))},reset:function(){this.startTime=null,this.cancelAnimationFrame(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.endVal-this.localStartVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal)||0,e<this.localDuration?this.rAF=this.requestAnimationFrame(this.count):this.$emit("end")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=Number(t),t=t.toFixed(Number(this.decimals)),t+="";var e=t.split("."),n=e[0],a=e.length>1?this.decimal+e[1]:"",i=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))while(i.test(n))n=n.replace(i,"$1"+this.separator+"$2");return n+a},destroyed:function(){this.cancelAnimationFrame(this.rAF)}}};e.default=r},c1c6:function(t,e,n){"use strict";var a=n("79fe"),i=n.n(a);i.a},c60c:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-text",{staticClass:"u-count-num",style:{fontSize:this.$u.addUnit(this.fontSize),fontWeight:this.bold?"bold":"normal",color:this.color}},[this._v(this._s(this.displayValue))])},i=[]},f616:function(t,e,n){var a=n("c86c");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/* uni.scss */\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-0dd1b27e], uni-scroll-view[data-v-0dd1b27e], uni-swiper-item[data-v-0dd1b27e]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-count-num[data-v-0dd1b27e]{display:inline-flex;text-align:center}',""]),t.exports=e}}]);