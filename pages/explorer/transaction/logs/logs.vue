<template>
	<view class="logs">
		<u-navbar title="Transaction Receipt Logs" height="50px" :autoBack="true">
		</u-navbar>

		<view class="brief" v-show="!loading">
			<view class="log" v-for="item,index in logs" :key="index">
				<view class="index">
					<u--text align="center" color="#FFF" :text="index+1"></u--text>
				</view>

				<view class="data">
					<view class="i">
						<u--text bold text="KID"></u--text>
						<u--text wordWrap="anywhere" :text="item.kid"></u--text>
					</view>

					<view class="i">
						<u--text bold color="#6c757d" text="Name"></u--text>
						<u--text wordWrap="anywhere" :text="item.name"></u--text>
					</view>

					<view class="i">
						<u--text bold color="#6c757d" text="Hash"></u--text>
						<u--text wordWrap="anywhere" :text="item.e_hash"></u--text>
					</view>

					<view class="i">
						<u--text bold color="#6c757d" text="Data"></u--text>
						<view class="params">
							<view class="item" v-for="value,key in item.args" :key="key">
								<text class="key">{{key}}:&nbsp</text>
								<u--text class="value" wordWrap="anywhere" :text="value"></u--text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-loading-page :loading="loading" :iconSize="35" loadingText="Loading..." bg-color="#fff"></u-loading-page>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hashList: [],
				logs: [],
				loading: true
			};
		},
		onLoad(e) {
			this.hashList = JSON.parse(e.data)
			if (this.hashList.length > 0) {
				this.getLogs()
			}
		},
		onShow() {
			setTimeout(() => {
				this.loading = false
			}, 1500)
		},
		methods: {
			getLogs() {
				uni.request({
					url: this.$Node + "/api/batch/log",
					data: {
						logs: this.hashList
					},
					method: 'POST',
					success: (res) => {
						if (res.data.data) {
							this.logs = res.data.data
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
		}
	}
</script>

<style lang="scss">
	.logs {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
		align-items: center;
		// justify-content: center;
		padding-bottom: 30rpx;
	}

	.brief {
		width: 85vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 70px;
		/* 添加边框阴影 */
		background-color: #FFF;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		padding: 30rpx;

		.log {
			width: 100%;
			display: flex;
			flex-direction: row;
			border-bottom: 1rpx solid #e9ecef;
			padding-bottom: 20rpx;
			padding-top: 20rpx;

			.index {
				width: 80rpx;
				height: 80rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-color: #000;
				border-radius: 50%;
			}

			.data {
				flex: 4;
				padding-left: 10rpx;

				.i {
					padding-bottom: 10rpx;

					.params {
						display: flex;
						flex-direction: column;
						flex: 1;
						padding: 9px;
						border-radius: 4px;
						border-width: 0.5px !important;
						border-color: #dadbde !important;
						border-style: solid;
						background-color: #f5f7fa;

						.item {

							// display: flex;
							.key {
								color: #6c757d;
							}

							.value {}
						}
					}

				}
			}
		}


	}
</style>