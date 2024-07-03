<template>
	<view class="u-page">
		<view class="u-page__item">
			<u-navbar :fixed="false" title="Transfer B721" height="50px" :safeAreaInsetTop="false" :auto-back="true">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" size="19"></u-icon>
					<u-line direction="column" :hairline="false" length="16" margin="0 8px"></u-line>
					<u-icon name="home" size="20" @click="goHome"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="transfer">
			<view>
				<u--text style="padding-bottom: 15rpx;" bold text="Receiving Address"></u--text>
				<u--input class="input" fontSize="18px" border="nonce" placeholder="Enter of paste wallet address"
					v-model="to"></u--input>
			</view>
			<view style="margin-top: 50rpx;">
				<u--text style="padding-bottom: 15rpx;" bold text="NFT TokenId"></u--text>
				<view class="amount">
					<u--input class="input" :value="'#'+tokenId" fontSize="18px" border="nonce" placeholder="0"
						:readonly="true"></u--input>
				</view>
			</view>

			<view style="margin-top: 50rpx;">
				<u--text style="padding-bottom: 15rpx;" bold text="Miner Fee"></u--text>
				<view class="fee">
					<u--form>
						<u-form-item label="Speed" labelWidth="auto" @click="showFee=true; hideKeyboard()">
							<u--input v-model="speed" disabled disabledColor="#ffffff"
								placeholder="Please select fee speed" inputAlign="right" border="none"></u--input>
							<u-icon slot="right" style="padding-left: 5px;" name="arrow-right"></u-icon>
						</u-form-item>
						<u-picker confirmText="confirm" cancelText="cancel" :show="showFee" :columns="fees"
							keyName="name" title="Please select speed" @confirm="feeSelect" @close="showFee = false"
							@cancel="showFee = false"></u-picker>
					</u--form>
				</view>
			</view>

			<u-button class="btn" text="Confirm" type="success" size="large" @click="transfer"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</view>

		<u-modal title="Payment Sent" :show="showModal" :closeOnClickOverlay="true" showCancelButton
			@close="showModal = false">
			<u-button slot="confirmButton" text="View Block Explorer" type="success" shape="circle" @click="mempool"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</u-modal>
	</view>
</template>

<script>
	import Relayer from '../../../../js_sdk/taproot.js'

	export default {
		data() {
			return {
				kid: '',
				to: '',
				tokenId: '',
				txid: '',
				showModal: false,
				showFee: false,
				speed: '',
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
			};
		},
		onLoad(e) {
			this.kid = e.kid
			this.tokenId = e.tokenId
		},
		methods: {
			goHome() {
				uni.switchTab({
					url: '/pages/assets/assets'
				})
			},
			feeSelect(e) {
				this.speed = e.value[0].name
				this.showFee = false
			},
			async transfer() {
				if (!this.to) {
					uni.showToast({
						icon: 'none',
						title: 'Enter of paste wallet address'
					})
					return
				}

	
				if (!this.speed) {
					uni.showToast({
						icon: 'none',
						title: 'Please select fee speed'
					})
					return
				}

				const inc = {
					kid: this.kid,
					method: 'transfer',
					params: [this.to, this.tokenId]
				}
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
					console.log("fee->>>> ", amount)

					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()
					console.log(pTxid)

					if (pTxid) {
						const hex = await r.gen_TxHex(last.txid, last.vout, last.amount)

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
			hideKeyboard() {
				uni.hideKeyboard()
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
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	page {
		background-color: $u-bg-color;
	}

	/* #endif */

	.u-page {
		padding: 0;
		flex: 1;
		background-color: $u-bg-color;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}
		}
	}

	.u-nav-slot {
		@include flex;
		align-items: center;
		justify-content: space-between;
		border-width: 0.5px;
		border-radius: 100px;
		border-color: $u-border-color;
		padding: 3px 7px;
		opacity: 0.8;
		border: 1px solid #d6d7d9;
	}

	.transfer {
		width: 93vw;
		margin: 0 auto;
		margin-top: 50rpx;

		.fee {
			background-color: #FFF;
			padding-left: 19rpx;
			padding-right: 19rpx;
			border-radius: 15rpx;
		}

		.input {
			margin-top: 10rpx;
			background-color: #FFF;
			height: 80rpx;
			border-radius: 15rpx;
		}

		.amount {
			background-color: #FFF;
			border-radius: 15rpx;
			overflow: hidden;

			.balance {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 19rpx;
				height: 30px;
				border-top: 1rpx solid #d6d7d9;
			}

			.input {
				margin-top: 10rpx;
				background-color: #FFF;
				height: 80rpx;
			}
		}
	}

	.btn {
		margin-top: 100rpx;
		border-radius: 15rpx;
		height: 50px;
	}
</style>