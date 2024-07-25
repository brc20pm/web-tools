var walletAddr = null

export default {
	async Connect() {
		try {
			const result = await okxwallet.bitcoin.connect()
			walletAddr = result.address
			return walletAddr
		} catch (e) {
			console.log(e)
		}
	},
	async GetBalance() {
		let res = await okxwallet.bitcoin.getBalance();
		return res.total / 100000000
	},
	async GetAccount() {
		return walletAddr;
	},
	async Send(to, sat) {
		let txid = await okxwallet.bitcoin.sendBitcoin(
			to,
			sat
		);

		return txid
	},
	async Broadcast(hex) {
		try {
			let txid = await okxwallet.bitcoin.pushTx(hex);
			return txid;
		} catch (e) {
			console.log(e);
		}
	}
}