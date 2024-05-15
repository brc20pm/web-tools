export default {
	async Connect() {
		try {
			const result = await okxwallet.bitcoin.connect()
			return result
		} catch (e) {
			console.log(e)
		}
	},
	async GetBalance() {
		let res = await okxwallet.bitcoin.getBalance();
		return res.total / 100000000
	},
	async GetAccounts() {
		try {
			let res = await okxwallet.bitcoin.getAccounts();
			return res[0];
		} catch (e) {
			console.log(e);
		}
	},
	async Send(to, sat) {
		let txid = await okxwallet.bitcoin.sendBitcoin(
			to,
			sat
		);

		return txid
	}
}