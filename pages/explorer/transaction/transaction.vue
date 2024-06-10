<template>
	<view class="bg">
		<u-navbar title="Transaction" height="50px" :autoBack="true">
		</u-navbar>
		<view class="brief">
			<view class="token-item">
				<u-cell :title="`Height`" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{tx.height}}</text>
				</u-cell>
				<u-cell :title="`TxHash`" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{subString(tx.tx_hash,10,7)}}</text>
				</u-cell>
				<u-cell :title="`TimeStamp`" :border="false" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{tx.timestamp}}</text>
				</u-cell>
				<u-cell :title="`KID`" :border="false" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{subString(tx.kid,10,6)}}</text>
				</u-cell>
				<u-cell :title="`Sender`" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{subString(tx.sender,10,6)}}</text>
				</u-cell>
				<u-cell :title="`Operation`" :border="false" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{tx.op}}</text>
				</u-cell>
				<u-cell v-if="tx.logs" :title="`Logs`" :border="false"
					:title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;" @click="goLogs(tx.logs)" >{{tx.logs.length}}</text>
				</u-cell>
				<u-cell :title="`Status`" :border="false" :title-style="{'font-size':'30rpx','font-weight':'450'}">
					<text slot="right-icon" style="font-size: 30rpx;">{{tx.status==1?'success':'fail'}}</text>
				</u-cell>
			</view>
		</view>
		<view class="report">
			<u--text align="left" size="33rpx" bold text="Input"></u--text>
			<u--textarea autoHeight :value="tx.input+''" placeholder="Input content" disabled></u--textarea>
		</view>
		<view class="report">
			<u--text align="left" size="33rpx" bold text="Out"></u--text>
			<u--textarea autoHeight :value="tx.op=='deploy'?tx.kid:tx.out?tx.out:'No output'+''" placeholder="Out content"
				disabled></u--textarea>
		</view>
	</view>
</template>

<script>
	import http from "../../../js_sdk/axios.js"
	
	export default {
		data() {
			return {
				txHash: '',
				tx: {}
			};
		},
		onLoad(e) {
			this.txHash = e.txHash
			this.getTx()
		},
		methods: {
			async getTx() {
				const status = this.getTxStatus(this.txHash)
				if (!status) {
					this.mempool(this.txHash)
				} else {
					this.getTransaction()
				}
			},
			async getTxStatus(txid) {
				try {
					const response = await http.get('https://mempool.space/testnet/api/tx/' + txid + '/status')
					return response.data.confirmed
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
				}

			},
			getTransaction() {
				uni.request({
					url: this.$indexer+"/api/tx/" + this.txHash,
					success: (res) => {
						if (res.data.data) {
							this.tx = res.data.data
							let hash = this.tx.tx_hash
							// this.tx.tx_hash = hash.substring(0, 10) + '...' + hash.substring(hash.length - 7,
							// 	hash.length)
							// let sender = this.tx.sender
							// this.tx.sender = sender.substring(0, 10) + '...' + sender.substring(sender.length -
							// 	6, sender.length)
							// let kid = this.tx.kid
							// this.tx.kid = kid.substring(0, 10) + '...' + kid.substring(kid.length -
							// 	6, kid.length)
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
			goLogs(logs){
				uni.navigateTo({
					url:'/pages/explorer/transaction/logs/logs?data='+JSON.stringify(logs)
				})
			},
			mempool(txid) {
				window.location.href = "https://mempool.space/tx/" + txid
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
	.bg {
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
		align-items: center;
		// justify-content: center;
		padding-bottom: 30rpx;
	}



	.brief {
		width: 93%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 70px;
		/* 添加边框阴影 */
		background-color: #FFF;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
	}

	.report {
		width: 93%;
		margin: 0 auto;
		margin-top: 15rpx;
		margin-bottom: 40rpx;
	}

	.token-item {
		width: 100%;
	}
</style>