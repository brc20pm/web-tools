<template>
	<view class="pager">
		<view class="search">
			<u-search placeholder="At Script Address" height="88rpx" search-icon-size="28" :showAction="false"
				:clearabled="false" @search="search" bgColor="#f3f3f7"></u-search>
		</view>

		<view class="brief">
			<u--text style="padding-top: 20rpx;" align="center" size="33rpx" bold text="Basic Info"></u--text>
			<view class="token-item">
				<u-cell-group :border="false">
					<u-cell :title="`Creator`" :title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{subString(script.creator,10,6)}}</text>
					</u-cell>
					<u-cell :title="`CreateTime`" :border="true"
						:title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{script.create_time}}</text>
					</u-cell>
					<u-cell :title="`CreateHash`" :border="false"
						:title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{subString(script.create_hash,10,7)}}</text>
					</u-cell>
				</u-cell-group>
			</view>

		</view>

		<view class="script">
			<u--form labelPosition="left" :model="model" ref="uForm">
				<u-form-item label="KID" labelWidth="auto" borderBottom>
					<u--input :adjustPosition="false" v-model="model.kid" disabled disabledColor="#ffffff"
						inputAlign="right" placeholder="Script address" border="none"></u--input>
				</u-form-item>
				<u-form-item label="Method" labelWidth="auto" borderBottom
					@click="model.kid?showMethod = true:''; hideKeyboard()">
					<u--input v-model="model.method" disabled disabledColor="#ffffff" placeholder="Please select method"
						inputAlign="right" border="none"></u--input>
					<u-icon slot="right" style="padding-left: 5px;" name="arrow-right"></u-icon>
				</u-form-item>

				<u-picker  confirmText="confirm" cancelText="cancel" :show="showMethod" :columns="methods" keyName="name" title="Please select method"
					@confirm="methodSelect" @close="showMethod = false" @cancel="showMethod = false"></u-picker>

				<u-form-item label="Params" labelWidth="auto" borderBottom @click="params.length==0?'':InputParams()">
					<!-- No parameters required -->
					<u--input disabled disabledColor="#ffffff"
						:placeholder="params.length==0?'No parameters needed':'Please enter parameters'"
						inputAlign="right"
						:value="model.params.length==params.length&&params.length!=0?'Parameters confirmed':''"
						border="none"></u--input>
					<u-icon slot="right" style="padding-left: 5px;" name="arrow-right"></u-icon>
				</u-form-item>

				<u-form-item v-show="op=='send'" label="Miner Fee" labelWidth="auto" borderBottom
					@click="showFee=true; hideKeyboard()">
					<u--input v-model="speed" disabled disabledColor="#ffffff" placeholder="Please select fee speed"
						inputAlign="right" border="none"></u--input>
					<u-icon slot="right" style="padding-left: 5px;" name="arrow-right"></u-icon>
				</u-form-item>

				<u-picker confirmText="confirm" cancelText="cancel" :show="showFee" :columns="fees" keyName="name" title="Please select speed"
					@confirm="feeSelect" @close="showFee = false" @cancel="showFee = false"></u-picker>

			</u--form>

			<u-button style="margin-top: 45rpx;height: 90rpx;" @click="showExcFalg = true" text="EXECUTE"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</view>

		<view class="report" v-show="showReport">
			<u--text align="left" size="33rpx" bold text="Report"></u--text>
			<u--textarea autoHeight :value="report" placeholder="Script Execution Report" disabled></u--textarea>
		</view>

		<u-popup :show="showParams" @close="popupClose">
			<view class="params-mode">
				<view class="btn">
					<u--text class="left" @click="popupClose" color="#909193" align="left" size="15px"
						text="cancel"></u--text>
					<u--text class="center" color="#303133" align="center" size="15px"
						text="Enter parameters"></u--text>
					<u--text class="right" @click="confirmParams" color="#3c9cff" align="right" size="15px"
						text="confirm"></u--text>
				</view>
				<u--form labelPosition="left" :mode="pForm" ref="pForm">
					<u-form-item style="line-height: 50rpx;" :label="param" labelWidth="auto" borderBottom
						v-for="param,index in params" :key="index">
						<u--input :adjustPosition="false" v-model="pForm[param]" disabledColor="#ffffff"
							inputAlign="right" placeholder="Please enter value" border="none"></u--input>
					</u-form-item>
				</u--form>
			</view>
		</u-popup>

		<u-popup :round="10" :show="showExcFalg" @close="showExcFalg = false" mode="center">
			<view class="excfalg">
				<u--form labelPosition="left" :model="model" ref="uForm">
					<u-form-item label="KID" labelWidth="auto" borderBottom>
						<u--input :adjustPosition="false" v-model="model.kid" disabled disabledColor="#ffffff"
							inputAlign="right" placeholder="Script address" border="none"></u--input>
					</u-form-item>
					<u-form-item label="Method" labelWidth="auto" borderBottom>
						<u--input v-model="model.method" disabled disabledColor="#ffffff"
							placeholder="Please select method" inputAlign="right" border="none"></u--input>
					</u-form-item>
					<view v-show="richText.length!=0">
						<u-form-item label="Params" labelWidth="auto">
							<u--input disabled disabledColor="#ffffff" inputAlign="left" border="none"></u--input>
							<u-icon slot="right" style="padding-left: 5px;" name="arrow-down"></u-icon>
						</u-form-item>
						<u-read-more textIndent="0">
							<rich-text :nodes="richText"></rich-text>
						</u-read-more>
					</view>
				</u--form>
				<view class="button-group">
					<u-button class="btn" style="margin-right: 20rpx;" @click="showExcFalg = false" text="Cancel"
						color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
					<u-button class="btn" style="margin-left: 20rpx;" @click="execute" text="Confirm"
						color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
				</view>
			</view>
		</u-popup>

		<u-modal title="Payment Sent" :show="showModal" content="Your    transaction    broadcasted"
			:closeOnClickOverlay="true" showCancelButton @close="showModal = false">
			<u-button slot="confirmButton" text="View Block Explorer" type="success" shape="circle" @click="mempool"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</u-modal>
	</view>
</template>

<script>
	const {
		v4: uuidv4
	} = require('uuid');

	import Relayer from '../../js_sdk/taproot.js'

	export default {
		data() {
			return {
				showMethod: false,
				showParams: false,
				showExcFalg: false,
				showReport: false,
				showModal: false,
				showFee: false,
				txid: '',
				speed: '',
				op: '',
				fees: [
					[{
							name: 'fastestFee'
						},
						{
							name: 'halfHourFee'
						}, {
							name: 'hourFee'
						}, {
							name: 'economyFee'
						},
						{
							name: 'minimumFee'
						}
					]
				],
				methods: [],
				params: [],
				pForm: {},
				richText: '',
				model: {
					kid: '',
					method: '',
					params: []
				},
				report: '',
				script: {}
			};
		},
		onLoad() {
			this.default()
		},
		methods: {
			default () {
				this.script = {
					kid: "ord83633b22d3b7a211333081bece366c8f121994a",
					script: `class Contract extends B20{_inviters;_creator;_maxTotal;_lastHash;init(){this._allowances=new Map,this._balances=new Map,this._inviters=new Map,this._name=\"BIP20\",this._symbol=\"₿\",this._maxTotal=SafeMath.val(4e8),this._creator=\"tb1pg5rkxtyrc7ctlg5yza5ddcchrxrpzx7zjuz3w85hn48w9zr6naaq7g9z80\",this._totalSupply=SafeMath.val(2e3),this._balances.setBucket(this._creator,2e3),this.event({name:\"Transfer\",from:\"Satoshi\",to:this._creator,amount:this._totalSupply})}mint(inviter){require(this._lastHash!=this.txHash,\"mint is locked\"),this._lastHash=this.txHash;var t,a=this._balances.getBucket(inviter),a=(require(SafeMath.gte(a,1e3),\"invalid inviter address\"),SafeMath.add(this._totalSupply,2e3)),a=(require(SafeMath.lte(a,this._maxTotal),\"maximum totalSupply: 40000000\"),this._msgSender());return this._inviters.set(a,inviter),this._mint(a,1e3),inviter!=this._creator?(a=this._inviters.get(inviter),t=this._inviters.get(a),this._mint(inviter,500),t?(this._mint(a,400),this._mint(t,100)):this._mint(a,500)):this._mint(inviter,1e3),!0}burn(amount){return this._burn(this._msgSender(),amount),!0}_mint(owner,amount){this._totalSupply=SafeMath.add(this._totalSupply,amount);var t=this._balances.getBucket(owner);this._balances.setBucket(owner,SafeMath.add(t,amount)),this.event({name:\"Transfer\",from:\"Satoshi\",to:owner,amount:amount})}_burn(owner,amount){var t=this._balances.getBucket(owner);require(SafeMath.gte(t,amount),\"B20: burn amount exceeds balance\"),this._totalSupply=SafeMath.sub(this._totalSupply,amount),this._balances.setBucket(owner,SafeMath.sub(t,amount)),this.event({name:\"Transfer\",from:owner,to:\"Satoshi\",amount:amount})}batchTransfer(toArray){return require(Array.isArray(toArray),\"param is not an array type\"),require(toArray.length<=100,\"maximum batch transfer is 100\"),forAny((_,item)=>{this.transfer(item.to,item.amount)},toArray),!0}}`,
					abi: "[{\"name\":\"mint\",\"params\":[\"inviter\"]},{\"name\":\"burn\",\"params\":[\"amount\"]},{\"name\":\"batchTransfer\",\"params\":[\"toArray\"]},{\"name\":\"$name\",\"params\":[]},{\"params\":[],\"name\":\"$symbol\"},{\"name\":\"$totalSupply\",\"params\":[]},{\"name\":\"$balanceOf\",\"params\":[\"account\"]},{\"name\":\"approve\",\"params\":[\"sender\",\"amount\"]},{\"name\":\"increaseAllowance\",\"params\":[\"spender\",\"addedValue\"]},{\"name\":\"decreaseAllowance\",\"params\":[\"spender\",\"subtractedValue\"]},{\"name\":\"$allowance\",\"params\":[\"owner\",\"sender\"]},{\"name\":\"transfer\",\"params\":[\"recipient\",\"amount\"]},{\"params\":[\"sender\",\"recipient\",\"amount\"],\"name\":\"transferFrom\"}]",
					creator: "tb1pfthhc50aqyqywq0pnh0xts6gkpwyg3nhnsuu062qqhgkdg2schqqa3fekr",
					create_hash: "c9bd8da158870aa6c27d755909b99d5edb2e45877e33ab062ca4b245423f20c6",
					create_time: 1715771586
				}
				this.model = {
					method: '',
					params: []
				}
				let kid = this.script.kid
				this.model.kid = kid.substring(0, 18) + '...' + kid.substring(kid.length -
					10, kid.length)

				this.methods = [JSON.parse(this.script.abi)]

				this.report = ''
			},
			execute() {
				if (!this.model.method) {
					return
				}

				const inc = {
					kid: this.script.kid,
					method: this.model.method,
					params: this.model.params
				}
				this.showExcFalg = false
				// this.params = []
				// this.model.method = ''
				// this.model.params = []
				// this.report = ''

				if (this.op == 'call') {
					this.call(inc)
				} else {
					this.sendTapRoot(inc)
				}
			},
			call(inc) {
				uni.showLoading({
					mask:true
				})
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: inc,
						id: uuidv4()
					},
					success: (res) => {
						this.report = res.data.result.data
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					},
					complete:()=>{
						uni.hideLoading()
					}
				})
			},
			async sendTapRoot(inc) {
				// console.log(window.crypto_utils)
				// console.log(window.tapscript)
				console.log(inc)
				try {
					uni.showLoading({
						mask: true
					})
					const r = new Relayer(inc, this.$network)

					const fees = await r.getFeeRate()
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)
					const amount = Number(tapScript.fee)

					console.log("relayer address->>>> ", tapScript.address)
					console.log("fee->>>> ", amount / 100000000)

					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()
					console.log(pTxid)
					if (pTxid) {

						const hex = await r.gen_TxHex(pTxid, 0, amount)

						console.log(hex)

						const result = r.Broadcast(hex)

						result.then(res => {
							console.log(res.data)
							this.addLocalTx(res.data)
							this.txid = res.data
							this.showModal = true
						}).catch(err => {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: err.response.data
							})
						})

					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
					//TODO handle the exception
				}
			},
			search(value) {
				this.default()
				if (value) {
					uni.request({
						url: this.$Node + "/api/script/" + value,
						success: (res) => {
							if (res.data.data) {
								this.script = res.data.data
								this.methods = [JSON.parse(this.script.abi)]
								let kid = this.script.kid
								this.model.kid = kid.substring(0, 18) + '...' + kid.substring(kid.length -
									10, kid.length)
							}
						},
						fail(err) {
							uni.showToast({
								icon: 'none',
								title: err.errMsg
							})
						}
					})

				}
			},
			methodSelect(e) {
				if (e.value[0].name != this.model.method) {
					this.model.method = e.value[0].name
					this.params = e.value[0].params
					this.clearFromp()

					if (this.model.method.startsWith("$")) {
						this.op = 'call'
						this.showReport = true
					} else {
						this.op = 'send'
						this.showReport = false
					}
				}
				this.showMethod = false
			},
			feeSelect(e) {
				this.speed = e.value[0].name
				this.showFee = false
			},
			InputParams() {
				if (this.model.method) {
					this.showParams = true
				} else {
					this.showMethod = true
				}
				this.hideKeyboard()
			},
			popupClose() {
				this.showParams = false;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			confirmParams() {
				this.richText = ''
				let params = []
				this.params.forEach(key => {
					params.push(this.pForm[key])
					this.richText += key + ': ' + this.pForm[key] + '<br/>'
				})
				this.model.params = params
				this.popupClose()
			},
			clearFromp() {
				this.pForm = {}
				this.richText = ''
				this.model.params = []
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			subString(data, begin, end) {
				if (data) {
					return data.substring(0, begin) + '...' + data.substring(
						data.length -
						end, data.length)
				}
				return ''
			},
			addLocalTx(txid) {
				let txids = []
				const data = uni.getStorageSync("txids")
				if (data) {
					txids = JSON.parse(data)
				}

				txids.unshift(txid)

				console.log(txids)

				uni.setStorageSync("txids", JSON.stringify(txids))
			},
			mempool() {
				switch (this.$network) {
					case "mainnet":
						window.location.href = "https://mempool.space/tx/" + this.txid
						break;
					case "testnet":
						window.location.href = "https://mempool.space/testnet/tx/" + this.txid
						break;
				}
			}
		},
	}
</script>

<style lang="scss">
	.pager {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #FFF;
		padding-bottom: 70px;
		
		.search {
			width: 92%;
			margin: 0 auto;
			margin-top: 50rpx;
		}

		.brief {
			flex: 1;
			width: 91vw;
			margin: 0 auto;
			margin-top: 50rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			/* 添加边框阴影 */
			box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);

			border-radius: 25rpx;

			.token-item {
				width: 100%;
			}
		}

		.script {
			flex: 1;
			width: 91vw;
			margin: 0 auto;
			margin-top: 15px;
		}

		.report {
			flex: 2;
			width: 91vw;
			margin: 0 auto;
			margin-top: 15px;
		}

	}

	.params-mode {
		padding: 30rpx;
		padding-bottom: 0px;

		.btn {
			display: flex;
			flex-direction: row;
			padding-top: 0px;
			padding-bottom: 8px;

			.left {
				flex: 1;
			}

			.center {
				flex: 4;
			}

			.right {
				flex: 1;
			}
		}


	}


	.excfalg {
		width: 90vw;
		padding: 20rpx;

		.button-group {
			display: flex;
			flex-direction: row;


			.btn {
				margin-top: 45rpx;
				height: 90rpx;
			}
		}
	}
</style>