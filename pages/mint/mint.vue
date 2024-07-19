	<template>
		<view class="mint">
			<!-- <u-sticky customNavHeight="0px">
				<view class="header">
					123
				</view>
			</u-sticky> -->


			<view class="title">
				<text class="text-top title-top">
					BRC20
				</text>
				<text class="text-bottom title-bottom">
					Programmable Module
				</text>
			</view>


			<view class="content">
				<view class="item">
					<u--text align="center" color="#9d78ff" size="40rpx" :text="balance"></u--text>
					<u--text align="center" color="#FFF" size="35rpx" text="Your Balance"></u--text>
				</view>
				<view class="item">
					<view class="tags">
						<view class="tag tag-left">
							<text class="text-top">1000</text>
							<text class="text-bottom">per Mint</text>
						</view>
						<view class="tag tag-center">
							<text class="text-top">200,000</text>
							<text class="text-bottom">Cap</text>
						</view>
						<view class="tag tag-right">
							<text class="text-top">{{mints}}</text>
							<text class="text-bottom">Mints</text>
						</view>
					</view>
					<view class="progress">
						<u-line-progress :percentage="percentage" activeColor="#8152ff" height="29">
							<text class="u-percentage-slot">{{percentage}}%</text>
						</u-line-progress>
					</view>
					<view class="tags">
						<view class="tag-left">
							<u--text align="left" color="#b2b4b7" size="28rpx" :text="'Supply: '+totalSupply"></u--text>
						</view>
						<view class="tag-right">
							<u--text align="right" color="#b2b4b7" size="28rpx" text="Total: 400,000,000"></u--text>
						</view>
					</view>
				</view>

				<view class="item">
					<view class="rm-title">
						<text style="color: #FFF;font-size: 15px;">Repeat Mint</text>
						<text style="margin-left: 8rpx;color: #b2b4b7;font-size: 15px">(Max 100)</text>
					</view>
					<view class="mint-amount">
						<u-input class="from amount" color="#9a9b9e" border="nonce" inputAlign="right" value="1,000/mint"
							:readonly="true">
							<template slot="prefix">
								<text style="font-size: 14px;text-align: left;color: #FFF;">{{count}}</text>
							</template>
						</u-input>
						<u-slider class="slider" activeColor="#9d78ff" blockColor="#9d78ff" max="100" min="1"
							v-model="count"></u-slider>
					</view>

				</view>

				<view class="item">
					<u--text text="Miner Fee" color="#FFF" align="left" size="15"></u--text>
					<view class="slipList">
						<view class="fee-item" :class="minerFee==1?'bgFFF':'bgNonce'" @click="selectMinerFee(1)">
							Slow
						</view>
						<view class="fee-item" :class="minerFee==2?'bgFFF':'bgNonce'" @click="selectMinerFee(2)">
							Avg
						</view>
						<view class="fee-item" :class="minerFee==3?'bgFFF':'bgNonce'" @click="selectMinerFee(3)">
							Fast
						</view>
					</view>
				</view>

				<view style="width: 100%;">
					<u-input class="from" style="height: 65rpx;" color="#FFF"
						placeholder="Please enter the inviter's address" v-model="rec"></u-input>
				</view>

				<u-button class="btn" @click="mint" color="linear-gradient(130deg,#6954ff,#9f77fb)">
					<text style="font-size: 15px;">Complete</text>
				</u-button>
			</view>


			<view class="collapse-panel">
				<u--text align="center" color="#fff" bold size="45rpx" text="More Information"></u--text>
				<u-collapse class="collapse" accordion :border="false">
					<u-collapse-item title="What is BRC20pm?" :clickable="false">
						<view class="rule">
							<u--text class="text" color="#b2b4b7" size="26rpx"
								text="BRC20pm is the abbreviation of BRC20 programmable module, and its vision is to make BRC20 have the same Turing-complete functionality as Ethereum."></u--text>
						</view>
					</u-collapse-item>
					<u-collapse-item title="How are rewards distributed?" :clickable="false">
						<view class="rule">
							<u--text class="text" color="#b2b4b7" size="26rpx"
								text="When you (A) directly invite your friend (B) to contribute, you will get 50% of the quota. When your directly invited friend (B) invites others (C) to contribute, you (A) will get 40% of the quota and your friend (B) will get 50% of the quota.">
							</u--text>
						</view>
					</u-collapse-item>
					<u-collapse-item title="Solemnly declare" :clickable="false">
						<view class="rule">
							<u--text class="text" color="#b2b4b7" size="26rpx"
								text="This is just a small experiment to prove the achievements of BRC20 programmable technology. It has no value. The only benefit is the AMM Swap fee dividend based on the BRC20 programmable module. Please treat it rationally."></u--text>
						</view>
					</u-collapse-item>
				</u-collapse>

			</view>


			<u-modal :overlayStyle="{background:'#444956'}" title="Payment Sent" :show="showModal"
				:closeOnClickOverlay="true" showCancelButton @close="showModal = false">
				<u-button slot="confirmButton" text="View Block Explorer" type="success" shape="circle" @click="mempool"
					color="linear-gradient(130deg,#6954ff,#9f77fb)"></u-button>
			</u-modal>

		</view>
	</template>

	<script>
		const {
			v4: uuidv4,
			MAX
		} = require('uuid');


		import Relayer from '../../js_sdk/taproot.js'
		import utils from '../../js_sdk/utils.js';

		const TOKEN_KID = "ord015755ddd77555cb9c5dae6bdb8cd3837b3c6db"
		const MaxTotal = 400000000

		export default {
			data() {
				return {
					showModal: false,
					txid: '',

					wallet: null,
					speed: 'fastestFee',
					minerFee: 2,
					rec: '',

					balance: '0',

					percentage: 0,

					count: 1,

					mints: 0,
					totalSupply: '0'
				};
			},
			onLoad(e) {
				console.log(e)
			},
			async onShow() {
				this.wallet = await this.$wallet.GetAccount()
				if (!this.wallet) {
					this.wallet = await this.$wallet.Connect()
				}

				let b1 = await this.getBalance(this.wallet)
				this.balance = formatNumberWithCommas(utils.truncateDecimal(b1, 4).toString())

				this.getTotalSupply()
			},
			methods: {
				//获取用户余额
				async getBalance(address) {
					const result = await uni.request({
						url: this.$Node,
						method: "POST",
						data: {
							jsonrpc: "2.0",
							method: "ord_call",
							params: {
								kid: TOKEN_KID,
								method: '$balanceOf',
								params: [address]
							},
							id: uuidv4()
						}
					})

					if (result[1].data.error) {
						uni.showToast({
							icon: 'none',
							title: result[1].data.error.message
						})
						return 0
					}

					return result[1].data.result.data
				},
				//获取当前供应量
				getTotalSupply() {
					uni.request({
						url: this.$Node,
						method: "POST",
						data: {
							jsonrpc: "2.0",
							method: "ord_call",
							params: {
								kid: TOKEN_KID,
								method: '$totalSupply',
							},
							id: uuidv4()
						},
						success: (res) => {
							let balance = res.data.result.data
							this.percentage = Number(balance) / MaxTotal * 100
							this.totalSupply = formatNumberWithCommas(balance)
							this.mints = formatNumberWithCommas((Number(balance) / 2000).toString())

						},
						fail: (err) => {
							uni.showToast({
								icon: 'none',
								title: err.errMsg
							})
						}
					})

				},
				//铸造
				async mint() {
					let b2 = await this.getBalance(this.rec)
					if (Number(b2) < 1000) {
						uni.showToast({
							icon: 'none',
							title: 'invalid inviter address'
						})
						return
					}


					const inc = {
						kid: TOKEN_KID,
						method: 'mint',
						params: [this.rec, this.count]
					}

					console.log(inc)

					try {
						uni.showLoading({
							mask: true,
						})

						const r = new Relayer(inc, this.$network)

						const fees = await r.getFeeRate()
						const fee = fees[this.speed]
						const tapScript = r.gen_TapScript(fee, this.count * 2000)

						const amount = Number(tapScript.fee)

						console.log("relayer address->>>> ", tapScript.address)
						console.log("fee->>>> ", amount)


						const pTxid = await this.$wallet.Send(tapScript.address, amount)
						uni.hideLoading()

						console.log(pTxid)
						if (pTxid) {

							const hex = await r.gen_TxHex(pTxid, 0, amount)

							console.log(hex)

							const result = r.Broadcast(hex)

							result.then(res => {
								console.log(res.data)
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
				selectMinerFee(index) {
					switch (index) {
						case 3:
							this.speed = 'fastestFee'
							break;
						case 2:
							this.speed = 'halfHourFee'
							break
						case 1:
							this.speed = 'hourFee'
							break
					}
					this.minerFee = index
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


		function formatNumberWithCommas(numStr) {
			// 去除任何可能存在的逗号
			numStr = numStr.replace(/,/g, '');
			// 分割整数部分和小数部分（如果有）
			let parts = numStr.split('.');
			let integerPart = parts[0];
			let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

			// 在每三位数字后添加逗号
			let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			// 合并整数部分和小数部分（如果有）
			return formattedIntegerPart + decimalPart;
		}
	</script>

	<style lang="scss" scoped>
		.mint {
			margin: 0 auto;
			background-color: #151515;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 100rpx;

			.header {
				width: 100vw;
				height: 70px;
				background-color: #14191f;
			}

			.title {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 30rpx 0rpx 30rpx 0rpx;
				margin-top: 100rpx;
			}

			.content {
				width: 85%;
				margin: 0 auto;
				max-width: 375px;

				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 15rpx;
				background-color: red;
				padding: 30rpx;
				background-color: #20252f;
				margin-top: 70rpx;


				.item {
					width: 94%;
					border-radius: 10rpx;
					padding: 25rpx 20rpx 25rpx 20rpx;
					margin-bottom: 30rpx;
					background: linear-gradient(180deg, #2f344e, rgba(47, 52, 78, .14));

					.rm-title {
						display: flex;
						flex-direction: row;
					}

					.mint-amount {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-top: 12px;

						.amount {
							border-radius: 5px;
							background-color: transparent;
							border: 1px solid #56545b;
							margin-right: 10px;
						}

						.slider {
							flex: 1.9;
						}
					}

					.tags {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;

						.tag {
							display: flex;
							flex-direction: column;
						}

						.tag-left {
							flex: 1;
							align-items: flex-start;
						}

						.tag-center {
							flex: 2;
							align-items: center;
						}

						.tag-right {
							flex: 1;
							align-items: flex-end;
						}


					}

					.progress {
						margin-top: 20rpx;
						margin-bottom: 20rpx;

						.u-percentage-slot {
							font-size: 20rpx;
						}
					}


					.slipList {
						width: 100%;
						height: 90rpx;
						background-color: #444956;
						border-radius: 15rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-top: 12px;
						margin-bottom: 20rpx;

						.fee-item {
							flex: 1;
							// padding: 15rpx;
							padding-top: 15rpx;
							padding-bottom: 15rpx;
							height: 45rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 0rpx 10rpx;
							border-radius: 10rpx;
							font-size: 25rpx;
						}
					}

				}

			}
		}

		.rule {
			.text {
				line-height: 45rpx;
			}
		}



		.text-top {
			font-size: 36rpx;
			color: #fff;
		}

		.text-bottom {
			font-size: 28rpx;
			color: #b2b4b7;
		}

		.title-top {
			font-size: 100rpx;
			font-weight: bold;
		}

		.title-bottom {
			line-height: 45rpx;
			font-size: 50rpx;
			font-weight: 500px;
		}

		.bgFFF {
			color: #FFF;
			font-weight: bold;
			background-color: #8152ff;
		}

		.bgNonce {
			color: #FFF;
			background-color: transparent;
		}

		.btn {
			margin-top: 35rpx;
			height: 50px;
			border-radius: 10rpx;
		}


		.collapse-panel {
			width: 90%;
			margin: 0 auto;
			margin-top: 100rpx;

			.collapse {
				max-width: 410px;
				margin: 0 auto;
				margin-top: 20rpx;
			}
		}

		/* 使用深度选择器来覆盖带有 data-v- 前缀的类 */
		::v-deep .u-cell__body {
			padding: 10px 0px 10px 0px;
		}

		::v-deep .u-collapse-item__content__text {
			padding: 10px 0px 10px 0px;
		}

		::v-deep .u-cell__title-text {
			color: #f1f1f1;
		}

		::v-deep uni-slider {
			margin: 10px 0px 10px 10px;
		}

		::v-deep .uni-input-input {
			background-color: transparent;
			font-size: 12px;
			line-height: 40px;
			font-weight: 400;
			padding-right: 2px;
		}

		::v-deep .u-border {
			border-width: 0.5px !important;
			border-color: #56545b !important;
			border-style: solid;
		}
	</style>