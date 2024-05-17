<template>
	<view class="mint">

		<u--text style="padding-top: 80rpx;" align="center" size="45rpx" bold text="Basic Info"></u--text>
		<u-transition show mode="fade-right">
			<u--text style="padding-top: 30rpx;" size="35rpx" bold :text="value"></u--text>
		</u-transition>


		<view class="number">
			<u-count-to :startVal="30" :endVal="totalSuppy" fontSize="33"></u-count-to>
			<u--text align="center" size="45rpx" bold text="TotalSupply"></u--text>
		</view>

		<view class="info">
			<u--text mode="text" align="center" size="45rpx" bold text="BIP20·₿·400M"></u--text>
		</view>

		<view class="input">
			<u--input style="height: 60rpx;" placeholder="Please enter the invite address" border="surround"
				v-model="inviter"></u--input>
			<u-button @click="mint" style="margin-top: 30rpx;height: 90rpx;" text="Mint" shape="circle"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</view>

		<u-modal confirmText="Confirm" :show="showRule" title="AirDrop Rule" :content='rules' @confirm="showRule=false"
			@close="showRule=false" confirmColor="#000"></u-modal>

		<u-modal title="Payment Sent" :show="showModal" content="Your transaction has been successfully sent"
			:closeOnClickOverlay="true" showCancelButton @close="showModal = false">
			<u-button slot="confirmButton" text="View Block Explorer" type="success" shape="circle" @click="mempool"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</u-modal>


		<view style="display: flex;flex-direction: row;width: 100%;padding-top: 55rpx;">
			<u--text @click="showRule = true" align="left" size="33rpx" color="#8a8a8a" decoration="underline"
				text="AirDrop Rule"></u--text>

			<u--text @click="goBitScpt" align="center" size="33rpx" color="#8a8a8a" decoration="underline"
				text="OrdScript"></u--text>

			<u--text @click="share" align="right" size="33rpx" color="#8a8a8a" decoration="underline"
				text="Share't Twitter"></u--text>
		</view>

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
				showRule: false,
				rules: `A&B 
A-1000、B-1000

A&B&C
A-500、B-500、C-1000

A&B&C&D 
A-100、B-400、C-500、D-1000

MaxSupply: 400000000

The inviter's balance must be greater than or equal to 1000 ₿`,
				value: 'This is an experimental B20 token issued based on the OrdScript Everyone can freely mint, and it also has an invitation reward mechanism of up to 3 levels.',
				owner: '',
				kid: 'ord83633b22d3b7a211333081bece366c8f121994a',
				totalSuppy: 0,
				inviter: '',
				txid: '',
				showModal: false,
				speed: 'minimumFee',
			};
		},
		onLoad(e) {
			this.owner = uni.getStorageSync('wallet')
			this.getTotalSuppy()

			if (e.inviter) {
				this.inviter = e.inviter
			}
		},
		methods: {
			async share() {
				const result = await this.call({
					kid: this.kid,
					method: '$balanceOf',
					params: [this.owner]
				})

				const balance = result.data

				if (Number(balance) < 1000) {
					uni.showToast({
						icon: 'none',
						title: 'balance < 1000'
					})
					return
				}
				this.twitterShare()
			},
			twitterShare() {
				const content = encodeURIComponent(`
Based on the idea of ​​#Ordinals founder @rodarmor, used to extend #Bitcoin’s indexer protocol

#BitScpt Experimental B20 Token #AirDrop`)

				const url = encodeURIComponent(`
					
https://tool.ordscipt.com/#/pages/airdrop/airdrop?inviter=` + this.owner + `

`);

				const text = `${content}${url}`;

				const twitter = `https://twitter.com/intent/tweet?text=${text}`;

				window.location.href = twitter
			},
			async getTotalSuppy() {
				const result = await this.call({
					kid: this.kid,
					method: '$totalSupply',
				})

				this.totalSuppy = result.data
			},
			async mint() {
				if (!this.inviter) {
					uni.showToast({
						icon: 'none',
						title: 'Please enter the invite address'
					})
					return
				}

				const result = await this.call({
					kid: this.kid,
					method: '$balanceOf',
					params: [this.inviter]
				})

				if (result) {

					if (Number(result.data) < 100) {
						uni.showToast({
							icon: 'none',
							title: 'invalid invite address'
						})
						return
					}

					this.sendTapRoot({
						kid: this.kid,
						method: 'mint',
						params: [this.inviter]
					})

				}
			},
			async call(inc) {
				const r = await uni.request({
					url: this.$rpc,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: inc,
						id: uuidv4()
					}
				})

				return r[1].data.result
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
					console.log(fees)
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)
					const amount = Number(tapScript.fee) + 1500

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
			mempool() {
				switch (this.$network) {
					case "mainnet":
						window.location.href = "https://mempool.space/tx/" + this.txid
						break;
					case "testnet":
						window.location.href = "https://mempool.space/testnet/tx/" + this.txid
						break;
				}
			},
			goOrdScript() {
				window.location.href = "https://docs.ordscript.com"
			}

		}
	}
</script>

<style lang="scss">
	.mint {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		padding-top: 50rpx;
		height: 100%;

		.navbar {
			height: 50rpx;
			display: flex;
			flex-direction: row;
		}

		.textarea {
			width: 85vw;
		}

		.number {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 30rpx;
			margin-top: 30rpx;
		}

		.input {
			width: 93vw;
			margin: 0 auto;
			margin-top: 30rpx;
		}

		.info {
			width: 93vw;
			margin: 0 auto;
		}
	}
</style>