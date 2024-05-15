import {
	getProviders,
	getProviderById
} from 'sats-connect'

var Wallet = null
var walletAddr = null

export default {
	async Connect() {
		try {
			const providers = getProviders();

			const firstProvider = providers[0];

			Wallet = getProviderById(firstProvider.id);
			// 连接钱包
			const result = await Wallet.request('getAccounts', {
				purposes: ['payment'],
				message: 'Address for receiving payments'
			});

			if (result.result) {
				if (result.result.length > 0) {
					walletAddr = result.result[0].address
					return walletAddr
				}
			}

			if (result.error) {
				throw new Error(result.error.message)
			}

		} catch (e) {
			//TODO handle the exception
			throw e
		}
	},
	GetAccount() {
		return walletAddr
	},
	async Send(recipient, amount) {
		try {
			// 发送比特币
			const result = await Wallet.request("sendTransfer", {
				recipients: [{
					address: recipient,
					amount: Number(amount),
				}]
			});
			if (result.result) {
				return result.result.txid
			}
			if (result.error) {
				throw new Error(result.error.message)
			}
		} catch (e) {
			throw e
		}

	}
}