const ec = new TextEncoder();
import http from "./axios.js"

const serviceFee = 2500;

class Relayer {

	network;

	secret;
	seckey;
	pubkey;
	data;

	tapScript;

	constructor(data, network = 'mainnet') {
		if (typeof data != 'object') {
			throw new Error('data is not object')
		}

		this.network = network;

		this.data = JSON.stringify(data);

		// Create a keypair to use for testing.
		this.secret = window.crypto_utils.util.random(32).hex;


		this.seckey = window.crypto_utils.keys.get_seckey(this.secret);
		this.pubkey = window.crypto_utils.keys.get_pubkey(this.seckey, true);
	}

	//输入字节费率
	gen_TapScript(feeRate = 1) {
		//协议标识符
		const marker = ec.encode('ord')
		//操作标识符 send - deploy
		const op = ec.encode('send')
		//操作
		const data = ec.encode(this.data)

		// Basic format of an 'inscription' script.
		const script = [
			this.pubkey, 'OP_CHECKSIG', 'OP_0', 'OP_IF', marker, '01', op, 'OP_0', data,
			'OP_ENDIF'
		]

		// For tapscript spends, we need to convert this script into a 'tapleaf'.
		const tapleaf = window.tapscript.Tap.encodeScript(script);
		// Generate a tapkey that includes our leaf script. Also, create a merlke proof 
		// (cblock) that targets our leaf and proves its inclusion in the tapkey.
		const [tpubkey, cblock] = window.tapscript.Tap.getPubKey(this.pubkey, {
			target: tapleaf
		});
		// A taproot address is simply the tweaked public key, encoded in bech32 format.

		// A taproot address is simply the tweaked public key, encoded in bech32 format.
		const address = window.tapscript.Address.p2tr.fromPubKey(tpubkey, this.network);

		const txsize = 200 + (this.data.length / 2);
		const fee = Math.round(feeRate * txsize) + serviceFee;

		this.tapScript = { 
			script,
			tapleaf,
			tpubkey,
			cblock,
			address,
			fee
		}

		return this.tapScript
	}

	async gen_TxHex(txid, vout, value) {
		if (!this.tapScript) {
			throw new Error('Build tapscript first')
		}

		const tAddress = this.getTargetAddr()

		const tx_data = await window.tapscript.Tx.create({
			version: 2,
			vin: [{
				// Use the txid of the funding transaction used to send the sats.
				txid: txid,
				// Specify the index value of the output that you are going to spend from.
				vout: vout,
				// Also include the value and script of that ouput.
				prevout: {
					// Feel free to change this if you sent a different amount.
					value: value,
					// This is what our address looks like in script form.
					scriptPubKey: window.tapscript.Address.toScriptPubKey(this.tapScript.address)
				},
				witness: []
			}],
			vout: [{
				// We are leaving behind 1000 sats as a fee to the miners.
				value: 2500,
				// This is the new script that we are locking our funds to.
				scriptPubKey: window.tapscript.Address.toScriptPubKey(tAddress)
			}]
		})

		// For this example, we are signing for input 0 of our transaction,
		// using the untweaked secret key. We are also extending the signature 
		// to include a commitment to the tapleaf script that we wish to use.
		const sig = await window.tapscript.Signer.taproot.sign(this.seckey, tx_data, 0, {
			extension: this.tapScript.tapleaf
		})

		// Add the signature to our witness data for input 0, along with the script
		// and merkle proof (cblock) for the script.
		tx_data.vin[0].witness = [sig, this.tapScript.script, this.tapScript.cblock]

		// Check if the signature is valid for the provided public key, and that the
		// transaction is also valid (the merkle proof will be validated as well).
		const isValid = window.tapscript.Signer.taproot.verify(tx_data, 0, {
			pubkey: this.pubkey,
			throws: true
		})

		if (!isValid) {
			throw new Error("invalid transactions")
		}
		let txHex = await window.tapscript.Tx.encode(tx_data).hex
		return txHex
	}

	async getLastVout(address) {
		let lastVoutTx = null
		let url = "https://mempool.space/testnet/api/address/" + address + "/txs"

		switch (this.network) {
			case "testnet":
				url = "https://mempool.space/testnet/api/address/" + address + "/txs"
				break;
			case "mainnet":
				url = "https://mempool.space/api/address/" + address + "/txs"
				break;
		}


		let response = await http.get(url);
		if (response) {
			let txList = response.data
			if (txList) {
				for (let i = 0; i < txList.length; i++) {
					const tx = txList[i];
					for (let index = 0; index < tx.vout.length; index++) {
						const output = tx.vout[index];
						if (output["scriptpubkey_address"] == address) {
							lastVoutTx = {
								txid: tx["txid"],
								vout: index,
								amount: output["value"]
							}
							break; // 找到符合条件的输出后退出循环
						}
					}
					if (lastVoutTx) { // 如果找到了，提前退出外部循环
						break;
					}
				}
			}
		}

		return lastVoutTx;
	}


	async getFeeRate() {
		let response = null;
		switch (this.network) {
			case "testnet":
				response = await http.get("https://mempool.space/testnet/api/v1/fees/recommended");
				break;
			case "mainnet":
				response = await http.get("https://mempool.space/api/v1/fees/recommended");
				break;
		}

		let fees = response.data;
		return fees;
	}

	Broadcast(data) {
		let response = null;
		switch (this.network) {
			case "testnet":
				response = http.post2("https://mempool.space/testnet/api/tx", data);
				break;
			case "mainnet":
				response = http.post2("https://mempool.space/api/tx", data);
				break;
		}

		return response;
	}

	getTargetAddr() {
		switch (this.network) {
			case 'mainnet':
				return '3LAoUiU2X2cKRURL3hTHMufHM15Xrk2K9s'
			case 'testnet':
				return '2N4vkrW97TmqdtdkHvMpfuRMqJF17CSvbFC'
			default:
				throw new Error('Unsupported networks')
		}
	}
}






export default Relayer