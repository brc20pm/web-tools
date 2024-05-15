<template>
	<view class="explorer">
		<view class="search">
			<u-search placeholder="Explore transactions" bgColor="#FFF" inputAlign="left" height="88rpx"
				search-icon-size="28" :showAction="false" :clearabled="false" @search="search"></u-search>
		</view>
		<view class="online-txs">
			<u-icon name="" size="28" label-size="35rpx" label="Latest Transactions"></u-icon>
			<view v-if="latestTxs.length>0" class="txs">
				<view class="title">
					<u--text class="text" align="left" size="33rpx" bold text="TXID"></u--text>
					<u--text class="text" align="center" size="33rpx" bold text="Height"></u--text>
					<u--text class="text" align="right" size="33rpx" bold text="Status"></u--text>
				</view>
				<view class="list" v-for="tx,index in latestTxs" :key="index">
					<u--text @click="search(tx.tx_hash)" class="text" align="left" size="32rpx" :text="tx.tx_hash.substring(0, 5) + '...' + tx.tx_hash.substring(tx.tx_hash.length - 5,
								tx.tx_hash.length)"></u--text>
					<u--text class="text" align="center" size="32rpx" :text="tx.height"></u--text>
					<u--text class="text" align="right" size="32rpx" :text="tx.status==1?'success':'fail'"></u--text>
				</view>
			</view>
			<u-empty v-else mode="history" text="No transaction history" textSize="16">
			</u-empty>
		</view>
		<view class="local-txs">
			<u-icon name="" size="28" label-size="35rpx" label="Local Transactions"></u-icon>
			<view v-if="localTxs.length>0" class="txs">
				<view class="list">
					<u--text class="text" align="left" size="33rpx" bold text="TXID"></u--text>
					<u--text class="text" align="right" size="33rpx" bold text="Status"></u--text>
				</view>
				<view class="list" v-for="tx,index in localTxs" :key="index">
					<u--text class="text" align="left" size="32rpx" :text="tx.tx_hash.substring(0, 9) + '...' + tx.tx_hash.substring(tx.tx_hash.length - 7,
								tx.tx_hash.length)" @click="tx.status?search(tx.tx_hash):mempool(tx.tx_hash)"></u--text>
					<u--text class="text" align="right" size="32rpx"
						:text="tx.status?'Confirmed':'Unconfirmed'"></u--text>
				</view>
			</view>
			<u-empty v-else mode="history" text="No transaction history" textSize="16">
			</u-empty>
		</view>
	</view>
</template>

<script>
	import keyboard from '../../uni_modules/uview-ui/libs/config/props/keyboard';
	import {
		data
	} from '../../uni_modules/uview-ui/libs/mixin/mixin';

	import http from "../../js_sdk/axios.js"

	export default {
		data() {
			return {
				latestTxs: [],
				localTxs: []
			};
		},
		onShow() {
			this.latestBlocks()
			this.getLocalTxids()
		},
		methods: {
			getLocalTxids() {
				let txids = []
				const data = uni.getStorageSync("txids")
				if (data) {
					txids = JSON.parse(data)
				}

				if (txids.length > 6) {
					txids = txids.slice(0, 6)
				}

				let batchTxids = []

				let txs = []

				txids.forEach(async txid => {
					const confirmed = await this.getTxStatus(txid)
					txs.push({
						tx_hash: txid,
						status: confirmed
					})
				})

				this.localTxs = txs

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
			latestBlocks() {
				uni.request({
					url: this.$indexer+"/api/latest/blocks",
					success: (res) => {
						if (res.data.data) {
							let blocks = res.data.data
							let txids = [];
							blocks.forEach(block => {
								txids = getTransactionsToSix(txids, block.transactions);
								if (txids.length >= 6) {
									return;
								}
							})
							this.batchTx({
								txids: txids
							})
						}
					},
					fail(err) {
						uni.showToast({
							title: err.errMsg
						})
					}
				})
			},
			batchTx(txids) {
				uni.request({
					url: this.$indexer+"/api/batch/tx",
					method: "POST",
					data: txids,
					success: (res) => {
						if (res.data.data) {
							this.latestTxs = res.data.data
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
			search(value) {
				if (value) {
					uni.navigateTo({
						url: '/pages/explorer/transaction/transaction?txHash=' + value
					})
				}
			},
			mempool(txid) {
				switch (this.$network) {
					case "mainnet":
						window.location.href = "https://mempool.space/tx/" + txid
						break;
					case "testnet":
						window.location.href = "https://mempool.space/testnet/tx/" + txid
						break;
				}
			}
		}
	}

	function getTransactionsToSix(txids, data) {
		let txList = []
		if (data.length > 6) {
			txList = data.slice(data.length - 6, data.length);
		} else {
			txList = data;
		}

		if (txids.length + txList.length > 6) {
			let needSize = 6 - txids.length
			if (needSize == 0) {
				return txids
			}
			txList = txids.concat(txList.slice(txList.length - needSize, txList.length))
		}else{
			txList = txids.concat(txList);
		}
		return txList
	}
</script>

<style lang="scss">
	.explorer {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f2f2f2;
		padding-bottom: 25px;

		.search {
			width: 95%;
			margin: 0 auto;
			margin-top: 50rpx;
		}

		.online-txs {
			width: 87%;
			margin: 0 auto;
			margin-top: 45rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 25rpx;
			padding-top: 30rpx;
			border-radius: 15rpx;
			background-color: #fff;

			.txs {
				width: 100%;
				display: flex;
				flex-direction: column;

				.title {
					width: 100%;
					flex: 1;
					display: flex;
					flex-direction: row;
					margin-top: 25rpx;

					.text {
						flex: 1;
					}
				}

				.list {
					width: 100%;
					flex: 1;
					display: flex;
					flex-direction: row;
					margin-top: 30rpx;

					.text {
						flex: 1;
					}
				}
			}
		}

		.local-txs {
			width: 87%;
			margin: 0 auto;
			margin-top: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 25rpx;
			border-radius: 15rpx;
			background-color: #fff;

			.txs {
				width: 100%;
				display: flex;
				flex-direction: column;

				.title {
					width: 100%;
					flex: 1;
					display: flex;
					flex-direction: row;
					margin-top: 25rpx;

					.text {
						flex: 1;
					}
				}

				.list {
					width: 100%;
					flex: 1;
					display: flex;
					flex-direction: row;
					margin-top: 30rpx;

					.text {
						flex: 1;
					}
				}
			}
		}
	}
</style>