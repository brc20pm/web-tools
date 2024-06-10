<template>
	<view class="market">
		<u-subsection class="sub" :bold="false" :list="list" :current="curNow" @change="sectionChange" fontSize="40rpx"
			mode="subsection" bgColor="#000" activeColor="#000" inactiveColor="#000"></u-subsection>

		<view class="ui-swap">
			<view class="swap">
				<view class="ui-swap-title">
					<view class="name">
						<u--text text="BRC20-Swap" :bold="true" size="19"></u--text>
					</view>
					<view class="icon">
						<u--image :class="refresh?'refresh':''" @click="refreshOutValue" :showLoading="true"
							src="../../static/refresh.png" width="40rpx" height="40rpx"></u--image>
					</view>
					<view class="icon">
						<u--image @click="showSwapSetting=true" :showLoading="true" src="../../static/setting.png"
							width="40rpx" height="40rpx"></u--image>
					</view>
				</view>
				<view class="ui-swap-input">
					<view class="input-item">
						<view class="title">
							<u--text text="Send" size="14"></u--text>
							<u--text text="Balance: 100000.0000" align="right" size="14"></u--text>
						</view>
						<view class="input">
							<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
								border="nonce" class="from" placeholder="Input Amount" inputAlign="right">
								<template slot="prefix">
									<view class="select-btn" @click="isSend=true;showSwapToken()">
										<view class="avatar">
											<u-avatar shape="circle" size="30" :text="fromToken.symbol[0]"
												bgColor="#000" customStyle="margin: 3px 8px 3px 3px"></u-avatar>
											<u--text :text="fromToken.symbol" size="14" margin="0 5px 0 0"></u--text>
											<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
												height="30rpx"></u--image>
										</view>
									</view>
								</template>
							</u-input>
						</view>
					</view>
					<view class="swap-icon">
						<u--image :showLoading="true" src="../../static/swap.png" width="35rpx"
							height="35rpx"></u--image>
					</view>
					<view class="input-item">
						<view class="title">
							<u--text text="Receive (Estimated)" size="14"></u--text>
						</view>
						<view class="input">
							<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
								border="nonce" class="from" placeholder="0.0000" inputAlign="right">
								<template slot="prefix">
									<view class="select-btn" @click="isSend=false;showSwapToken()">
										<view class="avatar">
											<u-avatar shape="circle" size="30" :text="toToken.symbol[0]" bgColor="#000"
												customStyle="margin: 3px 8px 3px 3px"></u-avatar>
											<u--text :text="toToken.symbol" size="14" margin="0 5px 0 0"></u--text>
											<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
												height="30rpx"></u--image>
										</view>
									</view>
								</template>
							</u-input>
						</view>
					</view>

					<u-button class="btn" text="Choose Token"
						color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>

				</view>
				<view class="ui-swap-tips">
					<view class="tips">
						<u--text text="Swap Price" size="25rpx"></u--text>
						<u-icon label="1 $ORDI ≈ 1 $BTC" labelPos="left" labelSize="28rpx" :bold="true" size="20"
							name="../../static/swap-icon.png"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Price Slippage" size="25rpx"></u--text>
						<u-icon label="0.3%" labelPos="left" labelSize="28rpx" :bold="true" size="20"
							name="../../static/slippage-icon.png"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Price Impact" size="25rpx"></u--text>
						<u-icon label="-1.09%" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Minimum Receive Amount" size="25rpx"></u--text>
						<u-icon label="1 $BTC" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>

					<view class="tips">
						<u--text text="Service Fee" size="25rpx"></u--text>
						<u-icon label="0.3%" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>
				</view>
			</view>
			<u-popup :show="showSwapTokens" closeable :round="10" mode="center" @close="showSwapTokens=false">
				<view class="swapTokens">
					<view class="title">
						<u--text text="Choose Token" align="center" size="17" bold></u--text>
					</view>
					<view class="view">
						<view class="input">
							<u--input style="height: 60rpx;"
								placeholder="Input token symbol or script address"></u--input>
						</view>
						<view class="tokens">
							<u-list height="300px">
								<u-list-item v-for="(item, index) in tokenList" :key="index">
									<view class="token-item">
										<u-cell @click="tokenClick(item)" :title="item.symbol"
											:title-style="{'font-size':'30rpx','font-weight':'450'}">
											<u-avatar slot="icon" shape="circle" size="40" :text="item.symbol[0]"
												bgColor="#000" customStyle="margin: -3px 5px -3px 0"></u-avatar>
											<text slot="label" style="font-size: 25rpx;">{{item.name}}</text>
											<text slot="right-icon"
												style="font-size: 35rpx;">{{Number(item.amount).toFixed(4)+''}}</text>
										</u-cell>
									</view>
								</u-list-item>
							</u-list>
						</view>
					</view>
				</view>
			</u-popup>
			<u-popup :show="showSwapSetting" closeable :round="10" mode="bottom" @close="showSwapSetting=false">
				<view class="setting">
					<view class="title">
						<u--text text="Advanced Settings" align="center" size="17" bold></u--text>
					</view>
					<view class="view">
						<u--text text="Slippage Setting" align="left" size="15" bold></u--text>
						<u--text style="margin-top: 5rpx;"
							text="Setting a higher slippage can help your trade go through, but you may not get the best price. Please use with caution."
							align="left" size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="slippage==1?'bgFFF':'bgNonce'" @click="selectSlippage(1)">1%
							</view>
							<view class="item" :class="slippage==3?'bgFFF':'bgNonce'" @click="selectSlippage(3)">3%
							</view>
							<view class="item" :class="slippage==5?'bgFFF':'bgNonce'" @click="selectSlippage(5)">5%
							</view>
							<view class="item" :class="slippage==-1?'bgFFF':'bgNonce'" @click="selectSlippage(-1)">
								<u--input fontSize="25rpx" placeholder="Custom" inputAlign="left" border="nonce">
									<template slot="suffix">
										%
									</template>
								</u--input>
							</view>
						</view>

						<u--text text="Miner Fee" align="left" size="15" bold></u--text>
						<u--text style="margin-top: 5rpx;"
							text="Choosing a higher fee will help your transaction get processed faster" align="left"
							size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="minerFee==1?'bgFFF':'bgNonce'" @click="selectMinerFee(1)">
								Slow
							</view>
							<view class="item" :class="minerFee==2?'bgFFF':'bgNonce'" @click="selectMinerFee(2)">
								Avg
							</view>
							<view class="item" :class="minerFee==3?'bgFFF':'bgNonce'" @click="selectMinerFee(3)">
								Fast
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['Converter', 'Exchange'],
				curNow: 0,
				showSwapTokens: false,
				showSwapSetting: false,
				tokenList: [{
						"kid": "ord83633b22d3b7a211333081bece366c8f121994a",
						"name": "BIP20",
						"symbol": "₿",
						"amount": "15"
					},
					{
						"kid": "ord0726e221275bf170ef640676d22851338173c35",
						"name": "Flower Token",
						"symbol": "FLT",
						"amount": "30"
					},
					{
						"kid": "ord0726e221275bf170ef640676d22851338173c15",
						"name": "Test Token",
						"symbol": "TEST",
						"amount": "300.865"
					}
				],
				isSend: false,
				refresh: false,
				fromToken: {
					kid: "ord83633b22d3b7a211333081bece366c8f121994a",
					name: "BIP20",
					symbol: "₿",
					amount: "15"
				},
				toToken: {
					kid: "ord0726e221275bf170ef640676d22851338173c35",
					name: "Flower Token",
					symbol: "FLT",
					amount: "30"
				},
				slippage: 1,
				minerFee: 2,
			}
		},
		methods: {
			//刷新输出数量
			refreshOutValue() {
				this.refresh = true
				setTimeout(() => {
					this.refresh = false
				}, 3000)
			},
			selectMinerFee(index) {
				this.minerFee = index
			},
			//设置滑点
			selectSlippage(index) {
				this.slippage = index
			},
			sectionChange(index) {
				this.curNow = index;
			},
			tokenClick(item) {
				this.showSwapTokens = false
				if (this.isSend) {
					if (this.toToken.kid === item.kid) {
						return
					}
					this.fromToken = item
				} else {
					if (this.fromToken.kid === item.kid) {
						return
					}
					this.toToken = item
				}
			},
			showSwapToken() {
				this.showSwapTokens = true
			}

		}
	}
</script>

<style lang="scss">
	.market {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f7;

		.sub {
			width: 92%;
			margin: 0 auto;
			margin-top: 50rpx;
			height: 88rpx;
		}

		.ui-swap {
			width: 87%;
			margin: 0 auto;
			margin-top: 40rpx;
			height: 880rpx;
			background-color: #FFF;
			border-radius: 30rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;

			.swapTokens {
				width: 95vw;
				height: 65vh;

				.title {
					border-bottom: 1rpx solid #cfcfd0;
					margin-bottom: 20rpx;
					padding-top: 25rpx;
					padding-bottom: 15rpx;
				}

				.view {
					.input {
						padding: 20rpx;
						padding-top: 0px;
						padding-bottom: 20rpx;
					}

					.tokens {
						width: 100%;
					}
				}
			}



			.swap {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100%;

				.ui-swap-title {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					padding-bottom: 28rpx;

					.name {
						flex: 1;
					}

					.icon {
						margin-left: 30rpx;
					}
				}

				.ui-swap-input {
					// flex: 5;
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.swap-icon {
						margin-top: 25rpx;
					}

					.input-item {
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.title {
							width: 100%;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding-bottom: 8rpx;
						}

						.input {
							width: 100%;

							.from {
								height: 90rpx;

								.select-btn {
									min-width: 180rpx;
									height: 70rpx;
									border-radius: 15rpx;
									padding: 10rpx;
									background-color: #FFF;
									display: flex;
									flex-direction: row;
									align-items: center;
									justify-content: start;

									.avatar {
										display: flex;
										flex-direction: row;
										align-items: center;
										justify-content: center;
									}
								}
							}
						}
					}

					.btn {
						margin-top: 35rpx;
						height: 88rpx;
						border-radius: 20rpx;
					}
				}

				.ui-swap-tips {
					flex: 2;
					width: 95%;
					border: 1px solid #f3f3f7;
					background-color: #fcfcff;
					border-radius: 10rpx;
					margin-top: 35rpx;
					padding: 15rpx;

					.tips {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						line-height: 50rpx;
					}
				}
			}

			.setting {
				.title {
					border-bottom: 1rpx solid #cfcfd0;
					margin-bottom: 15rpx;
					padding-top: 25rpx;
					padding-bottom: 15rpx;
				}

				.view {
					padding: 30rpx;
					padding-top: 8rpx;

					.slipList {
						width: 100%;
						height: 90rpx;
						background-color: #f3f3f7;
						border-radius: 15rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-top: 10rpx;
						margin-bottom: 20rpx;

						.item {
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
	}

	.bgFFF {
		background-color: #FFF;
	}

	.bgNonce {
		background-color: transparent;
	}



	.refresh {
	    animation: rotate360 1s ease-in-out infinite;
	}

	@keyframes rotate360 {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>