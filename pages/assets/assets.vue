<template>
	<view class="assets">
		<view class="tab">
			<fui-segmented-control color="#000" :height="88" :size="40" :values="values"
				@click="changeTab"></fui-segmented-control>
		</view>

		<view class="tokens">
			<u-list v-if="current==0" @scrolltolower="scrolltolower">
				<u-list-item v-for="(item, index) in tokenList" :key="index">
					<view class="token-item">
						<u-cell @click="tokenClick(item)" :title="item.symbol"
							:title-style="{'font-size':'30rpx','font-weight':'450'}">
							<u-avatar slot="icon" shape="circle" size="40" :text="item.symbol[0]" bgColor="#000"
								customStyle="margin: -3px 5px -3px 0"></u-avatar>
							<text slot="label" style="font-size: 25rpx;">{{item.name}}</text>
							<text slot="right-icon"
								style="font-size: 35rpx;">{{Number(item.amount).toFixed(4)+''}}</text>
						</u-cell>
					</view>
				</u-list-item>
			</u-list>

			<liu-waterfall class="nftlist" v-else :dataList="nftList" :column="2" @click="nftClick"></liu-waterfall>

		</view>
	</view>
</template>

<script>
	import fuiSegmentedControl from "@/components/fui-segmented-control/fui-segmented-control.vue"

	import wallet from "../../js_sdk/wallet";
	
	export default {
		components: {
			fuiSegmentedControl
		},
		data() {
			return {
				wallet: '',
				values: ['B20 Tokens', 'B721 Tokens'],
				current: 0,
				tokenList: [],
				nftList: []
			};
		},
		async onShow() {
			this.wallet = await this.$wallet.GetAccount()
			if(!this.wallet){
				this.wallet =  await this.$wallet.Connect()
				this.getAssets()
				uni.setStorageSync('wallet', this.wallet)
			}else{
				this.getAssets()
			}
		},
		methods: {
			changeTab(e) {
				this.current = e.index
			},
			nftClick(e) {
				uni.navigateTo({
					url: '/pages/assets/tokenIds/tokenIds?kid=' + e.kid
				})
			},
			tokenClick(e) {
				uni.navigateTo({
					url: '/pages/assets/token-details/token-details?data=' + JSON.stringify(e)
				})
			},
			scrolltolower() {
				this.loadmore()
			},
			getAssets() {
				uni.request({
					url: this.$market + "/api/wallet/" + this.wallet,
					success: (res) => {
						if (res.data.data) {
							if (res.data.data.t20) {
								this.tokenList = res.data.data.t20
							}
							if (res.data.data.t721) {
								this.nftList = res.data.data.t721
							}
						}
					},
					fail(err) {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
		},
	}

	function formatNumber(num, decimalPlaces) {
		const multiplier = Math.pow(10, decimalPlaces);
		return (Math.round(num * multiplier) / multiplier).toString();
	}
	
	for (var i = 0; i < 1; i++) {
		
	}
</script>

<style lang="scss">
	.assets {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #FFF;
		padding-bottom: 70px;
		.tab {
			width: 95%;
			margin: 0 auto;
			margin-top: 50rpx;
		}

		.tokens {
			width: 100%;
			margin-top: 20rpx;

			// border: 1px solid red;
			.token-item {
				// border: 1px solid red;
				// display: r;
				// flex-direction: row;
				// align-items: center;
			}

			.nftlist {
				height: 100vh;
			}
		}

	}
</style>