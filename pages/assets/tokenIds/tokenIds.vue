<template>
	<view>
		<u-navbar title="NFTs" height="50px" right-text="Details" @rightClick="rightClick" :autoBack="true">
		</u-navbar>
		<liu-waterfall class="nftlist" :dataList="nftList" :column="2" @click="nftClick"></liu-waterfall>

		<u-action-sheet :actions="actions" @select="selectClick" @close="show = false" title="Want to transfer NFT?"
			cancelText="Cancel" :show="show" safeAreaInsetBottom closeOnClickOverlay></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wallet: '',
				kid: '',
				tokenId: '',
				nftList: [],

				show: false,
				actions: [],

			};
		},
		onLoad(e) {
			this.wallet = uni.getStorageSync('wallet')
			this.kid = e.kid
			//
			this.getTokenIds()
		},
		methods: {
			getTokenIds() {
				uni.request({
					url: "/market/api/tokenIds?kid=" + this.kid + '&owner=' + this.wallet,
					success: (res) => {
						if (res.data.data) {
							let tokenIds = res.data.data
							if (tokenIds) {
								tokenIds.forEach(t => {
									let data = JSON.parse(t.data)
									this.nftList.push({
										symbol: '#' + t.tokenId,
										logo: data.url
									})
								})
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
			nftClick(e) {
				this.tokenId = e.symbol.substring(1, e.symbol.length)
				this.actions = [{
					name: 'Transfer(#' + this.tokenId + ')'
				}]
				this.show = true
			},
			rightClick() {
				uni.navigateTo({
					url: '/pages/assets/tokenIds/details/details?kid=' + this.kid
				})
			},
			selectClick(e) {
				uni.navigateTo({
					url: '/pages/assets/tokenIds/transfer/transfer?kid=' + this.kid + '&tokenId=' + this.tokenId
				})
			}
		}
	}
</script>

<style lang="scss">
	.nftlist {
		margin-top: 50px;
		height: 100vh;
	}
</style>