<template>
	<view class="details">
		<u-navbar :title="token.name" height="50px" :autoBack="true">
		</u-navbar>

		<view class="brief">
			<view class="info">
				<u-avatar class="logo" :size="50" :text="token.symbol[0]" bgColor="#000"></u-avatar>
				<u--text class="text" align="center" size="35rpx" bold :text="token.symbol"></u--text>
			</view>
			<view class="token-item">
				<u-cell-group :border="false">
					<u-cell :title="`Creator`" :title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{subString(script.creator,10,6)}}</text>
					</u-cell>
					<u-cell :title="`CreateTime`" :border="true"
						:title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{script.create_time}}</text>
					</u-cell>
					<u-cell :title="`CreateHash`" :border="true"
						:title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{subString(script.create_hash,10,7)}}</text>
					</u-cell>
					<u-cell :title="`KID`" :border="true" :title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{subString(script.kid,18,10)}}</text>
					</u-cell>
					<u-cell :title="`TotalSupply`" :border="false"
						:title-style="{'font-size':'30rpx','font-weight':'450'}">
						<text slot="right-icon" style="font-size: 30rpx;">{{token.totalSupply}}</text>
					</u-cell>
				</u-cell-group>
			</view>
		</view>

		<view class="title">
			<u--text align="center" size="33rpx" bold text="Holders"></u--text>
		</view>

		<view class="holding">
			<view class="hold-item">
				<u-cell-group :border="false">
					<u-cell v-for="item,index in holders" :key="index">
						<view slot="title">
							<u--text :text="'#'+(index+1)" size="33rpx" bold></u--text>
						</view>
						<view slot="label">
							<u--text :text="subString(item.owner,10,8)" size="33rpx"></u--text>
						</view>
						<view slot="right-icon">
							<u--text :text="item.amount" align="right" size="33rpx"></u--text>
							<u--text :text="(Number(item.amount/token.totalSupply*100).toFixed(4))+'%'" align="right"
								size="30rpx"></u--text>
						</view>
					</u-cell>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kid: '',
				token: {},
				script: {},
				transactions: [],
				holders: []
			};
		},
		onLoad(e) {
			this.kid = e.kid
			this.getToken()
			this.getScript()
			this.getTokenDist()
		},
		methods: {
			getToken() {
				uni.request({
					url: this.$market+"/api/token/" + this.kid,
					success: (res) => {
						if (res.data.data) {
							this.token = res.data.data
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
			getScript() {
				uni.request({
					url: this.$indexer+"/api/script/" + this.kid,
					success: (res) => {
						if (res.data.data) {
							this.script = res.data.data
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
			getTokenDist() {
				uni.request({
					url: this.$market+"/api/dist/721/" + this.kid,
					success: (res) => {
						if (res.data.data) {
							this.holders = res.data.data
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
			subString(data, begin, end) {
				if (data) {
					return data.substring(0, begin) + '...' + data.substring(
						data.length -
						end, data.length)
				}
				return ''
			},
		}
	}
</script>

<style lang="scss">
	.details {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #fff;



		.brief {
			flex: 1;
			width: 93%;
			margin: 0 auto;
			margin-top: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* 添加边框阴影 */
			box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
			border-radius: 15rpx;
			padding-bottom: 25rpx;
			padding-top: 30rpx;
			background-color: #FFF;

			.info {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-top: 20rpx;

				.logo {
					margin-bottom: 15rpx;
				}
			}

			.token-item {
				width: 100%;
			}
		}


		.title {
			width: 93%;
			margin: 0 auto;
			margin-top: 50rpx;
			margin-bottom: 10rpx;
		}

		.holding {
			flex: 1;
			width: 93%;
			margin: 0 auto;
			border-radius: 15rpx;
			background-color: #FFF;
		}
	}
</style>