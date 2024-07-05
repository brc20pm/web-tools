<template>
	<view class="market">
		<u-subsection class="sub" :bold="false" :list="list" :current="curNow" @change="sectionChange" fontSize="40rpx"
			mode="subsection" bgColor="#000" activeColor="#000" inactiveColor="#000"></u-subsection>

		<view class="ui-swap" v-show="curNow == 0">
			<view class="swap">
				<view class="ui-swap-title">
					<view class="name">
						<u--text text="BRC20-Swap" :bold="true" size="19"></u--text>
					</view>
					<view class="icon">
						<u--image :class="refresh?'refresh':''" @click="refreshOutValue" :showLoading="true"
							src="../../static/refresh.png" width="40rpx" height="40rpx"></u--image>
					</view>
					<view class="icon">
						<u--image @click="showSwapSetting=true" :showLoading="true" src="../../static/setting.png"
							width="40rpx" height="40rpx"></u--image>
					</view>
				</view>
				<view class="ui-swap-input">
					<view class="input-item">
						<view class="title">
							<u--text text="Send" size="14"></u--text>
							<u--text :text="truncateDecimal(fromToken.amount)" align="right" size="14"></u--text>
						</view>
						<view class="input">
							<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
								border="nonce" class="from" placeholder="Enter amount" inputAlign="right"
								v-model="amountIn" :value="amountIn" type="digit">
								<template slot="prefix">
									<view class="select-btn" @click="isSend=true;showSwapToken()">
										<view class="avatar">
											<u-avatar shape="circle" size="30" :text="fromToken.symbol[0]"
												bgColor="#000" customStyle="margin: 3px 8px 3px 3px"></u-avatar>
											<u--text :text="fromToken.symbol" size="14" margin="0 5px 0 0"></u--text>
											<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
												height="30rpx"></u--image>
										</view>
									</view>
								</template>
							</u-input>
						</view>
					</view>
					<view class="swap-icon">
						<u--image @click="b2a" :showLoading="true" src="../../static/swap.png" width="35rpx"
							height="35rpx"></u--image>
					</view>
					<view class="input-item">
						<view class="title">
							<u--text text="Receive (Estimated)" size="14"></u--text>
							<u--text :text="truncateDecimal(toToken.amount)" align="right" size="14"></u--text>
						</view>
						<view class="input">
							<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
								border="nonce" class="from" placeholder="0.0000" inputAlign="right" :value="amountOut"
								:readonly="true" type="digit">
								<template slot="prefix">
									<view class="select-btn" @click="isSend=false;showSwapToken()">
										<view class="avatar">
											<u-avatar shape="circle" size="30" :text="toToken.symbol[0]" bgColor="#000"
												customStyle="margin: 3px 8px 3px 3px"></u-avatar>
											<u--text :text="toToken.symbol" size="14" margin="0 5px 0 0"></u--text>
											<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
												height="30rpx"></u--image>
										</view>
									</view>
								</template>
							</u-input>
						</view>
					</view>

					<u-button v-show="ApproveFrom" @click="approveToken(fromToken.kid,'approveFrom')" class="btn"
						text="Approve" color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>

					<u-button v-show="!ApproveFrom" class="btn" :disabled="amountIn?false:true" @click="swap"
						text="Swap" color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
				</view>

				<view class="ui-swap-tips" v-show="this.amountOut != ''">
					<view class="tips">
						<u--text text="Swap Price" size="25rpx"></u--text>
						<u-icon :label="price" labelPos="left" labelSize="28rpx" :bold="true" size="20"
							name="../../static/swap-icon.png"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Price Slippage" size="25rpx"></u--text>
						<u-icon :label="slippage == -1?customSlippage+'%':slippage+'%'" labelPos="left"
							labelSize="28rpx" :bold="true" size="20" name="../../static/slippage-icon.png"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Price Impact" size="25rpx"></u--text>
						<u-icon :label="impact" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>
					<view class="tips">
						<u--text text="Minimum Receive Amount" size="25rpx"></u--text>
						<u-icon :label="minimum" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>

					<view class="tips">
						<u--text text="Total Fee" size="25rpx"></u--text>
						<u-icon label="0.8%" labelPos="left" labelSize="28rpx" :bold="true" size="22"></u-icon>
					</view>
				</view>

			</view>
			<u-popup :show="showSwapTokens" closeable :round="10" mode="center" @close="showSwapTokens=false">
				<view class="swapTokens">
					<view class="title">
						<u--text text="Choose Token" align="center" size="17" bold></u--text>
					</view>
					<view class="view">
						<view class="input">
							<u--input style="height: 60rpx;"
								placeholder="Input token symbol or script address"></u--input>
						</view>
						<view class="tokens">
							<u-list height="300px">
								<u-list-item v-for="(item, index) in tokenList" :key="index">
									<view class="token-item">
										<u-cell @click="tokenClick(item)" :title="item.symbol"
											:title-style="{'font-size':'30rpx','font-weight':'450'}">
											<u-avatar slot="icon" shape="circle" size="40" :text="item.symbol[0]"
												bgColor="#000" customStyle="margin: -3px 5px -3px 0"></u-avatar>
											<text slot="label"
												style="font-size: 25rpx;">{{subString(item.kid,10,8)}}</text>
											<text slot="right-icon"
												style="font-size: 35rpx;">{{truncateDecimal(item.amount)}}</text>
										</u-cell>
									</view>
								</u-list-item>
							</u-list>
						</view>
					</view>
				</view>
			</u-popup>

			<u-popup :show="showSwapSetting" closeable :round="10" mode="bottom" @close="showSwapSetting=false">
				<view class="setting">
					<view class="title">
						<u--text text="Advanced Settings" align="center" size="17" bold></u--text>
					</view>
					<view class="view">
						<u--text text="Slippage Setting" align="left" size="15" bold></u--text>
						<u--text style="margin-top: 5rpx;"
							text="Setting a higher slippage can help your trade go through, but you may not get the best price. Please use with caution."
							align="left" size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="slippage==1?'bgFFF':'bgNonce'" @click="selectSlippage(1)">1%
							</view>
							<view class="item" :class="slippage==3?'bgFFF':'bgNonce'" @click="selectSlippage(3)">3%
							</view>
							<view class="item" :class="slippage==5?'bgFFF':'bgNonce'" @click="selectSlippage(5)">5%
							</view>
							<view class="item" :class="slippage==-1?'bgFFF':'bgNonce'" @click="selectSlippage(-1)">
								<u-input fontSize="25rpx" placeholder="Custom" type="digit" :value="customSlippage"
									@input="(v)=>{ customSlippage=v?Number(v):''}" inputAlign="left" border="nonce">
									<template slot="suffix">
										%
									</template>
								</u-input>
							</view>
						</view>

						<u--text text="Miner Fee" align="left" size="15" bold></u--text>
						<u--text style="margin-top: 5rpx;"
							text="Choosing a higher fee will help your transaction get processed faster" align="left"
							size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="minerFee==1?'bgFFF':'bgNonce'" @click="selectMinerFee(1)">
								Slow
							</view>
							<view class="item" :class="minerFee==2?'bgFFF':'bgNonce'" @click="selectMinerFee(2)">
								Avg
							</view>
							<view class="item" :class="minerFee==3?'bgFFF':'bgNonce'" @click="selectMinerFee(3)">
								Fast
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>


		<view class="ui-swap" v-show="curNow == 1">
			<view class="swap">
				<view class="ui-swap-title">
					<view class="name">
						<u--text text="Your Liquidity" :bold="true" size="19"></u--text>
					</view>
					<view class="icon">
						<u--image @click="showSwapSetting=true" :showLoading="true" src="../../static/setting.png"
							width="40rpx" height="40rpx"></u--image>
					</view>
				</view>

				<view class="ui-lp">
					<view v-if="holdLPs.length>0">
						<view class="item" v-for="(item,index) in holdLPs" :key="index">
							<view class="logo">
								<u--text class="symbols"
									:text="tokenMeta[item.token0].symbol+ '/'+tokenMeta[item.token1].symbol"
									:bold="true" size="18"></u--text>
								<u-tag text="Remove" @click="removeLiquidity(item)" bgColor="#3b3b3b"
									borderColor="#3b3b3b" shape="circle"></u-tag>
							</view>
							<view class="ui-lp-tips">
								<view class="tips">
									<u--text text="Token0" size="25rpx"></u--text>
									<u--text :text="subString(item.token0,10,8)" align="right" size="28rpx"></u--text>
								</view>
								<view class="tips">
									<u--text text="Token1" size="25rpx"></u--text>
									<u--text :text="subString(item.token1,10,8)" align="right" size="28rpx"></u--text>
								</view>
								<view class="tips">
									<u--text text="TotalSupply" size="25rpx"></u--text>
									<u--text :text="truncateDecimal(item.total)" align="right" size="28rpx"></u--text>
								</view>
								<view class="tips">
									<u--text text="Your Balance" size="25rpx"></u--text>
									<u--text :text="truncateDecimal(item.amount)" align="right" size="28rpx"></u--text>
								</view>
								<view class="tips">
									<u--text text="Percentage" size="25rpx"></u--text>
									<u--text :text="percentage(item.total,item.amount)+'%'" align="right"
										size="28rpx"></u--text>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<view class="item">
							<u--text text="No liquidity found" align="center" size="17" bold></u--text>
						</view>
					</view>
				</view>

				<u-button class="btn" @click="showAddLiquidity=true;checkAllowance()" text="Add Liquidity"
					color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>

			</view>

			<u-popup :show="showSwapSetting" closeable :round="10" mode="bottom" @close="showSwapSetting=false">
				<view class="setting">
					<view class="title">
						<u--text text="Advanced Settings" align="center" size="17" bold></u--text>
					</view>
					<view class="view">
						<u--text text="Slippage Setting" align="left" size="15" bold></u--text>
						<u--text style="margin-top: 5rpx;"
							text="Setting a higher slippage can help your trade go through, but you may not get the best price. Please use with caution."
							align="left" size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="slippage==1?'bgFFF':'bgNonce'" @click="selectSlippage(1)">1%
							</view>
							<view class="item" :class="slippage==3?'bgFFF':'bgNonce'" @click="selectSlippage(3)">3%
							</view>
							<view class="item" :class="slippage==5?'bgFFF':'bgNonce'" @click="selectSlippage(5)">5%
							</view>
							<view class="item" :class="slippage==-1?'bgFFF':'bgNonce'" @click="selectSlippage(-1)">
								<u-input fontSize="25rpx" placeholder="Custom" type="digit" :value="customSlippage"
									@input="(v)=>{ customSlippage=v?Number(v):''}" inputAlign="left" border="nonce">
									<template slot="suffix">
										%
									</template>
								</u-input>
							</view>
						</view>

						<u--text text="Miner Fee" align="left" size="15" bold></u--text>
						<u--text text="Choosing a higher fee will help your transaction get processed faster"
							align="left" size="14"></u--text>

						<view class="slipList">
							<view class="item" :class="minerFee==1?'bgFFF':'bgNonce'" @click="selectMinerFee(1)">
								Slow
							</view>
							<view class="item" :class="minerFee==2?'bgFFF':'bgNonce'" @click="selectMinerFee(2)">
								Avg
							</view>
							<view class="item" :class="minerFee==3?'bgFFF':'bgNonce'" @click="selectMinerFee(3)">
								Fast
							</view>
						</view>

					</view>
				</view>
			</u-popup>
		</view>

		<u-popup :show="showAddLiquidity" closeable :round="10" mode="bottom" @close="showAddLiquidity=false">
			<view class="add-lp">
				<view class="view-title">
					<u--text text="Add Liquidity" align="center" size="17" bold></u--text>
				</view>
				<view class="view">
					<u--text text="CHOOSE TOKEN PAIR" bold size="13"></u--text>
					<view class="ui-swap-input">
						<view class="input-item">
							<view class="title">
								<u--text :text="truncateDecimal(token0.amount)" align="right" size="14"></u--text>
							</view>
							<view class="input">
								<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
									border="nonce" class="from" placeholder="Enter token0 amount" inputAlign="right"
									v-model="amt0" :value="amt0" type="digit">
									<template slot="prefix">
										<view class="select-btn" @click="isToken0=true;showAddTokens=true">
											<view class="avatar">
												<u-avatar shape="circle" size="30" :text="token0.symbol[0]"
													bgColor="#000" customStyle="margin: 3px 8px 3px 3px"></u-avatar>
												<u--text :text="token0.symbol" size="14" margin="0 5px 0 0"></u--text>
												<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
													height="30rpx"></u--image>
											</view>
										</view>
									</template>
								</u-input>
							</view>
						</view>
						<view class="swap-icon">
							<u--image @click="b2a" :showLoading="true" src="../../static/swap.png" width="35rpx"
								height="35rpx"></u--image>
						</view>
						<view class="input-item">
							<view class="title">
								<u--text :text="truncateDecimal(token1.amount)" align="right" size="14"></u--text>
							</view>
							<view class="input">
								<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
									border="nonce" class="from" placeholder="Enter token1 amount" inputAlign="right"
									v-model="amt1" :value="amt1?truncateDecimal(amt1,8):amt1" type="digit">
									<template slot="prefix">
										<view class="select-btn" @click="isToken0=false;showAddTokens=true">
											<view class="avatar">
												<u-avatar shape="circle" size="30" :text="token1.symbol[0]"
													bgColor="#000" customStyle="margin: 3px 8px 3px 3px"></u-avatar>
												<u--text :text="token1.symbol" size="14" margin="0 5px 0 0"></u--text>
												<u--image :showLoading="true" src="../../static/down.png" width="30rpx"
													height="30rpx"></u--image>
											</view>
										</view>
									</template>
								</u-input>
							</view>
						</view>
					</view>

					<view class="approve-btn-group">
						<u-button v-show="needApprove0" class="btn btn-item"
							@click="approveToken(token0.kid,'approveToken0')" :text="token0.symbol+'\nApprove'"
							color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
						<u-button v-show="needApprove1" class="btn btn-item"
							@click="approveToken(token1.kid,'approveToken1')" :text="token1.symbol+'\nApprove'"
							color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
					</view>

					<u-button class="btn" :disabled="!amt0 || !amt1 || needApprove0 || needApprove1" @click="deposit"
						text="Confirm" color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
				</view>
			</view>
		</u-popup>

		<u-popup :show="showAddTokens" closeable :duration="0" :round="10" mode="bottom" @close="showAddTokens=false">
			<view class="add-lp">
				<view class="view-title">
					<u--text text="Choose Token" align="center" size="17" bold></u--text>
				</view>
				<view class="view">
					<view class="input">
						<u--input style="height: 60rpx;" placeholder="Input token symbol or script address"></u--input>
					</view>
					<view class="tokens">
						<u-list height="300px">
							<u-list-item v-for="(item, index) in tokenList" :key="index">
								<view class="token-item">
									<u-cell @click="tokenPairClick(item)" :title="item.symbol"
										:title-style="{'font-size':'30rpx','font-weight':'450'}">
										<u-avatar slot="icon" shape="circle" size="40" :text="item.symbol[0]"
											bgColor="#000" customStyle="margin: -3px 5px -3px 0"></u-avatar>
										<text slot="label" style="font-size: 25rpx;">{{subString(item.kid,10,8)}}</text>
										<text slot="right-icon"
											style="font-size: 35rpx;">{{truncateDecimal(item.amount)}}</text>
									</u-cell>
								</view>
							</u-list-item>
						</u-list>
					</view>
				</view>
			</view>
		</u-popup>

		<u-popup :show="showRmLiquidity" closeable :round="10" mode="bottom" @close="showRmLiquidity=false">
			<view class="add-lp">
				<view class="view-title">
					<u--text text="Remove Liquidity" align="center" size="17" bold></u--text>
				</view>
				<view class="view">
					<u--text text="Withdraw tokens" bold size="13"></u--text>
					<view class="ui-swap-input">
						<view class="input-item">
							<view class="title">
								<u--text :text="'Your LP Amount: '+truncateDecimal(removePair?removePair.amount:0)"
									align="right" size="14"></u--text>
							</view>
							<view class="input">
								<u-input style="padding: 6px 9px 6px 5px;border-radius: 10px;background-color: #f3f3f7;"
									border="nonce" class="from" placeholder="Enter liquidity amount" :value="rmAmtLP"
									@confirm="removeAmtLP" type="digit">
								</u-input>
							</view>
						</view>
						<view class="swap-icon">
							<u--image @click="b2a" :showLoading="true" src="../../static/x.png" width="50rpx"
								height="50rpx"></u--image>
						</view>
						<u--text text="Estimated" bold align="center" size="18"></u--text>
						<view class="rm-token-pair" v-if="removeTokens">
							<view class="rm-item">
								<view class="token-item">
									<u-cell :title="removeTokens[removePair.token0].symbol"
										:title-style="{'font-size':'30rpx','font-weight':'450'}">
										<u-avatar slot="icon" shape="circle" size="40"
											:text="removeTokens[removePair.token0].symbol[0]" bgColor="#000"
											customStyle="margin: -3px 5px -3px 0"></u-avatar>
										<text slot="label"
											style="font-size: 25rpx;">{{subString(removePair.token0,10,8)}}</text>
										<text slot="right-icon"
											style="font-size: 35rpx;">{{truncateDecimal(rm0Amt)}}</text>
									</u-cell>
									<u-cell :title="removeTokens[removePair.token1].symbol"
										:title-style="{'font-size':'30rpx','font-weight':'450'}" :border="false">
										<u-avatar slot="icon" shape="circle" size="40"
											:text="removeTokens[removePair.token1].symbol[0]" bgColor="#000"
											customStyle="margin: -3px 5px -3px 0"></u-avatar>
										<text slot="label"
											style="font-size: 25rpx;">{{subString(removePair.token1,10,8)}}</text>
										<text slot="right-icon"
											style="font-size: 35rpx;">{{truncateDecimal(rm1Amt)}}</text>
									</u-cell>
								</view>
							</view>
						</view>
					</view>
					<u-button class="btn" :disabled="!this.rmAmtLP" @click="withdraw" text="Confirm"
						color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
				</view>
			</view>
		</u-popup>

		<u-modal title="Payment Sent" :show="showModal" content="Your    transaction    broadcasted"
			:closeOnClickOverlay="true" showCancelButton @close="showModal = false">
			<u-button slot="confirmButton" text="View Block Explorer" type="success" shape="circle" @click="mempool"
				color="linear-gradient(to right, rgb(89, 89, 89), rgb(0, 0, 0))"></u-button>
		</u-modal>

	</view>
</template>

<script>
	const {
		v4: uuidv4
	} = require('uuid');

	import Relayer from '../../js_sdk/taproot.js';
	import utils from '../../js_sdk/utils.js';

	const DEX_KID = 'ord8f66a22ea3416e18f27f56395b0f716592223ef';

	export default {
		data() {
			return {
				list: ['Exchange', 'Liquidity'],
				curNow: 0,
				showSwapTokens: false,
				showSwapSetting: false,
				showAddLiquidity: false,
				showRmLiquidity: false,
				showAddTokens: false,
				showModal: false,
				isSend: false,
				refresh: false,
				ApproveFrom: false,
				ApproveTo: false,
				wallet: '',
				txid: '',
				tokenList: [],
				fromToken: {
					"kid": "ordc75f1897ee853fc1b8a482eedb1ca2e4df7b17c",
					"name": "Test Token - ORDI",
					"symbol": "$ORDI",
					"amount": "0.0000"
				},
				toToken: {
					"kid": "ord16e5311f15f3c74aa41a2262b0a39b4c5261348",
					"name": "Test Token - PIZZA",
					"symbol": "$PIZZA",
					"amount": "0.0000"
				},

				pair: null,
				amountIn: '',
				amountOut: '',
				slippage: 5,
				customSlippage: null,
				minerFee: 2,
				speed: 'halfHourFee',

				holdLPs: [],
				tokenMeta: {},
				isToken0: false,
				token0: {
					"kid": "ordc75f1897ee853fc1b8a482eedb1ca2e4df7b17c",
					"name": "Test Token - ORDI",
					"symbol": "$ORDI",
					"amount": "0.0000"
				},
				token1: {
					"kid": "ord16e5311f15f3c74aa41a2262b0a39b4c5261348",
					"name": "Test Token - PIZZA",
					"symbol": "$PIZZA",
					"amount": "0.0000"
				},
				approve0: 0,
				approve1: 0,
				needApprove0: false,
				needApprove1: false,
				amt0: '',
				amt1: '',
				addPair: null,
				removePair: null,
				removeTokens: null,
				rmAmtLP: '',
				rm0Amt: '',
				rm1Amt: ''
			}
		},
		async onShow() {
			this.getPair();
			this.wallet = await this.$wallet.GetAccount()
			if (!this.wallet) {
				this.wallet = await this.$wallet.Connect()
				uni.setStorageSync('wallet', this.wallet)
			}
			this.getAssets()
		},
		computed: {
			price() {
				if (this.amountOut) {
					return '1 ' + this.fromToken.symbol + ' ≈ ' + utils.truncateDecimal(this.amountOut / this.amountIn,
						5) + this.toToken.symbol

				}
				return '0 ' + this.fromToken.symbol + ' ≈ ' + '0 ' + this.toToken.symbol
			},
			impact() {
				if (this.amountOut) {
					let [reserve0, reserve1] = [Number(this.pair.reserve0), Number(this.pair.reserve1)]
					if (this.pair.token0 != this.fromToken.kid) {
						[reserve0, reserve1] = [reserve1, reserve0];
					}

					let amount0 = 1;
					let oldQuote = amount0 * reserve1 / reserve0

					if (this.pair.token0 != this.fromToken.kid) {
						reserve0 -= Number(this.amountIn)
						reserve1 += Number(this.amountOut)
					} else {
						reserve0 += Number(this.amountIn)
						reserve1 -= Number(this.amountOut)
					}


					let newQuote = amount0 * reserve1 / reserve0

					// 计算涨跌幅
					let change = (oldQuote - newQuote) / oldQuote;

					// 将涨跌幅转换为百分比
					let percentageChange = change * 100;
					let p = utils.truncateDecimal(percentageChange, 2)
					return p > 0 ? '+' + p + '%' : p + '%';
				}
			},
			minimum() {
				if (this.amountOut) {
					let slippage = 5;
					if (this.slippage == -1) {
						slippage = this.customSlippage
					} else {
						slippage = this.slippage
					}

					return utils.truncateDecimal(this.amountOut * (100 - slippage) / 100, 4) + ' ' + this.toToken.symbol
				}
				return 0 + this.toToken.symbol

			}
		},
		watch: {
			amountIn(newVal, oldVal) {
				let value = newVal
				if (value) {
					if (Number(value) < 0 || Number(value) > Number(this.fromToken.amount)) {
						return
					}
					this.amountIn = value;
					//刷新输出量
					this.refreshOutValue()
				}
			},
			amt0(newVal, oldVal) {
				this.addPair = null;
				if (Number.isNaN(this.approve0)) {
					this.needApprove0 = true
					return
				}
				if (Number(newVal) > Number(this.approve0)) {
					this.needApprove0 = true
				} else {
					this.needApprove0 = false
				}

				this.getPairForTokens(this.token0.kid, this.token1.kid)
			},
			amt1(newVal, oldVal) {
				this.addPair = null;
				if (Number.isNaN(this.approve1)) {
					this.needApprove1 = true
					return
				}
				if (Number(newVal) > Number(this.approve1)) {
					this.needApprove1 = true
				} else {
					this.needApprove1 = false
				}
				this.getPairForTokens(this.token0.kid, this.token1.kid)
			},
		},
		methods: {
			//授权代币
			async approveToken(kid, tag) {
				const inc = {
					kid: kid,
					method: 'approve',
					params: [DEX_KID, '10000000000000']
				}
				console.log(inc)
				try {
					uni.showLoading({
						mask: true,
					})

					const r = new Relayer(inc, this.$network)

					const fees = await r.getFeeRate()
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)

					const amount = Number(tapScript.fee)

					console.log("relayer address->>>> ", tapScript.address)
					console.log("fee->>>> ", amount)


					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()

					console.log(pTxid)
					if (pTxid) {

						const hex = await r.gen_TxHex(pTxid, 0, amount)

						console.log(hex)

						const result = r.Broadcast(hex)

						result.then(res => {
							console.log(res.data)
							this.addLocalTx(res.data)
							this.txid = res.data
							this.showModal = true
						}).catch(err => {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: err.response.data
							})
						})
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
					//TODO handle the exception
				}


				switch (tag) {
					case 'approveFrom':
						this.ApproveFrom = false
						break;
					case 'approveToken0':
						this.needApprove0 = false
						break;
					case 'approveToken1':
						this.needApprove1 = false
						break;
				}
			},

			async deposit() {

				if (Number(this.amt0) > Number(this.token0.amount) || Number(this.amt1) > Number(this.token1.amount)) {
					uni.showToast({
						icon: 'none',
						title: 'Insufficient balance'
					})
					return
				}

				const inc = {
					kid: DEX_KID,
					method: 'addLiquidity',
					params: [
						this.token0.kid,
						this.token1.kid,
						this.amt0,
						this.amt1,
						0,
						0,
						Math.floor(Date.now() / 1000) + (24 * 60 * 60)
					]
				}
				console.log(inc)
				try {
					uni.showLoading({
						mask: true,
					})

					const r = new Relayer(inc, this.$network)

					const fees = await r.getFeeRate()
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)

					const amount = Number(tapScript.fee)

					console.log("relayer address->>>> ", tapScript.address)
					console.log("fee->>>> ", amount)


					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()

					console.log(pTxid)
					if (pTxid) {

						const hex = await r.gen_TxHex(pTxid, 0, amount)

						console.log(hex)

						const result = r.Broadcast(hex)

						result.then(res => {
							console.log(res.data)
							this.addLocalTx(res.data)
							this.txid = res.data
							this.showModal = true
						}).catch(err => {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: err.response.data
							})
						})
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
					//TODO handle the exception
				}

				this.showAddLiquidity = false
				this.amt0 = ''
				this.amt1 = ''
			},
			//检查即将添加的交易对
			//授权额度是否充足
			checkAllowance() {
				//查询token0授权额度
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: this.token0.kid,
							method: '$allowance',
							params: [this.wallet, DEX_KID]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							console.log(res.data.result.data)
							this.approve0 = Number(res.data.result.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: 'Failed to get quote'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
				//查询token1授权额度
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: this.token1.kid,
							method: '$allowance',
							params: [this.wallet, DEX_KID]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							console.log(res.data.result.data)
							this.approve1 = Number(res.data.result.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: 'Failed to get quote'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})

			},
			//获取指定交易对
			getPairForTokens(token0, token1) {
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: DEX_KID,
							method: '$getPair',
							params: [token0, token1]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							if (res.data.result.data === 'null') {
								return
							}
							this.addPair = JSON.parse(res.data.result.data)
							//获取报价
							this.getQuote()
						} else {
							uni.showToast({
								icon: 'none',
								title: 'No liquidity pool found'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
			//移除流动性
			removeLiquidity(item) {
				this.getRmTokensData(item)
				this.removePair = item;
				this.showRmLiquidity = true;
			},
			//获取当前移除交易对的代币信息
			getRmTokensData(item) {
				this.removeTokens = {}
				let kids = []
				if (this.tokenMeta[item.token0]) {
					this.removeTokens[item.token0] = this.tokenMeta[item.token0]
				} else {
					kids.push(item.token0)
				}

				if (this.tokenMeta[item.token1]) {
					this.removeTokens[item.token1] = this.tokenMeta[item.token1]
				} else {
					kids.push(item.token1)
				}
				// console.log(this.removeTokens)
				if (kids.length == 0) {
					return
				}
				uni.request({
					url: this.$Node + '/api/token/batch',
					method: "POST",
					data: {
						kids: [item.token0, item.token1]
					},
					success: (res) => {
						if (res.data.data) {
							this.removePair = res.data.data
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})

			},
			removeAmtLP(value) {
				if (value) {
					if (Number(value) < 0 || Number(value) > Number(this.removePair.amount)) {
						return
					}
					this.rmAmtLP = value
				}
				//计算可移除的份额数量
				this.getRemoveTokensAmount()
			},
			getRemoveTokensAmount() {
				console.log(this.removePair.total)
				console.log(this.rmAmtLP)

				const p = this.rmAmtLP / this.removePair.total
				console.log(p)
				this.rm0Amt = this.removePair.balance0 * p
				this.rm1Amt = this.removePair.balance1 * p

				console.log(this.rm0Amt)
				console.log(this.rm1Amt)
			},
			async withdraw() {
				let slippage = 5;
				if (this.slippage == -1) {
					slippage = this.customSlippage
				} else {
					slippage = this.slippage
				}

				const inc = {
					kid: DEX_KID,
					method: 'removeLiquidity',
					params: [
						this.removePair.token0,
						this.removePair.token1,
						this.rmAmtLP,
						this.rm0Amt * (100 - slippage) / 100,
						this.rm1Amt * (100 - slippage) / 100,
						Math.floor(Date.now() / 1000) + (24 * 60 * 60)
					]
				}
				console.log(inc)
				try {
					uni.showLoading({
						mask: true,
					})

					const r = new Relayer(inc, this.$network)

					const fees = await r.getFeeRate()
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)

					const amount = Number(tapScript.fee)

					console.log("relayer address->>>> ", tapScript.address)
					console.log("fee->>>> ", amount)


					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()

					console.log(pTxid)
					if (pTxid) {

						const hex = await r.gen_TxHex(pTxid, 0, amount)

						console.log(hex)

						const result = r.Broadcast(hex)

						result.then(res => {
							console.log(res.data)
							this.addLocalTx(res.data)
							this.txid = res.data
							this.showModal = true
						}).catch(err => {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: err.response.data
							})
						})
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
					//TODO handle the exception
				}

				this.showRmLiquidity = false
				this.rmAmtLP = ''
				this.rm0Amt = ''
				this.rm1Amt = ''
			},
			//获取报价
			getQuote() {
				if (!this.amt0) {
					this.amt0 = 1
				}
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: DEX_KID,
							method: '$quote',
							params: [this.amt0, this.addPair.reserve0, this.addPair.reserve1]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							this.amt1 = res.data.result.data
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
			//获取交易对
			getPair() {
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: DEX_KID,
							method: '$getPair',
							params: [this.fromToken.kid, this.toToken.kid]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							if (res.data.result.data === 'null') {
								return
							}
							this.pair = JSON.parse(res.data.result.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: 'No liquidity pool found'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
			//获取输出量
			getAmountOut() {
				let [reserve0, reserve1] = [this.pair.reserve0, this.pair.reserve1];

				//如果fromToken不对应交易对的token0则交换位置
				if (this.fromToken.kid != this.pair.token0) {
					[reserve0, reserve1] = [reserve1, reserve0]
				}

				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: DEX_KID,
							method: '$getAmountOut',
							params: [this.amountIn, reserve0, reserve1]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							let outValue = res.data.result.data
							this.amountOut = utils.truncateDecimal(outValue, 9)

							console.log(this.fromToken.symbol, '(' + this.fromToken.kid + ')', '\nswap',
								'\n' +
								this.toToken.symbol, '(' + this.toToken.kid + ')', '\namountIn: ', this
								.amountIn, '\namountOut: ', outValue)

							//获取授权额度
							this.getFromAllowance()
						} else {
							uni.showToast({
								icon: 'none',
								title: 'Failed to get quote'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
			//获取收取额度
			getFromAllowance() {
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: this.fromToken.kid,
							method: '$allowance',
							params: [this.wallet, DEX_KID]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							if (Number(res.data.result.data) < Number(this.amountIn)) {
								this.ApproveFrom = true
							}
							console.log(res.data.result.data)
						} else {
							uni.showToast({
								icon: 'none',
								title: 'Failed to get quote'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})

			},
			//发起兑换
			async swap() {
				let slippage = 5;
				if (this.slippage == -1) {
					slippage = this.customSlippage
				} else {
					slippage = this.slippage
				}

				// console.log(this.fromToken.kid)
				// console.log(this.toToken.kid)
				// console.log(this.amountIn)
				// console.log(this.amountOut * (100 - slippage) / 100)
				// console.log(this.wallet)
				// console.log(Math.floor(Date.now() / 1000) + (24 * 60 * 60))

				const inc = {
					kid: DEX_KID,
					method: 'swap',
					params: [
						this.fromToken.kid,
						this.toToken.kid,
						this.amountIn,
						this.amountOut * (100 - slippage) / 100,
						this.wallet,
						Math.floor(Date.now() / 1000) + (24 * 60 * 60)
					]
				}
				console.log(inc)
				try {
					uni.showLoading({
						mask: true,
					})

					const r = new Relayer(inc, this.$network)

					const fees = await r.getFeeRate()
					const fee = fees[this.speed]
					console.log(fee)
					const tapScript = r.gen_TapScript(fee)

					const amount = Number(tapScript.fee)

					console.log("relayer address->>>> ", tapScript.address)
					console.log("fee->>>> ", amount)


					const pTxid = await this.$wallet.Send(tapScript.address, amount)
					uni.hideLoading()

					console.log(pTxid)
					if (pTxid) {

						const hex = await r.gen_TxHex(pTxid, 0, amount)

						console.log(hex)

						const result = r.Broadcast(hex)

						result.then(res => {
							console.log(res.data)
							this.addLocalTx(res.data)
							this.txid = res.data
							this.showModal = true
						}).catch(err => {
							console.log(err)
							uni.showToast({
								icon: 'none',
								title: err.response.data
							})
						})
					}
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e.message
					})
					//TODO handle the exception
				}

				this.amountIn = ''
				this.amountOut = ''
			},
			//获取用户流动性
			getOwnerLP() {
				uni.request({
					url: this.$Node,
					method: "POST",
					data: {
						jsonrpc: "2.0",
						method: "ord_call",
						params: {
							kid: DEX_KID,
							method: '$getOwnerLP',
							params: [this.wallet, 0]
						},
						id: uuidv4()
					},
					success: (res) => {
						if (res.data.result.data) {
							try {
								let data = JSON.parse(res.data.result.data)
								console.log('Number of pairs: ', data.maxIndex)
								console.log('Your of pairs: ', data.holds.length)
								this.holdLPs = data.holds;

								this.holdLPs.forEach(item => {
									if (undefined == this.tokenMeta[item.token0]) {
										this.tokenMeta[item.token0] = {}
									}
									if (undefined == this.tokenMeta[item.token1]) {
										this.tokenMeta[item.token1] = {}
									}
								})

								this.getBatchToken()

							} catch (e) {
								throw e
							}
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err.errMsg
						})
					}
				})
			},
			getBatchToken() {
				let kids = Object.keys(this.tokenMeta)
				uni.request({
					url: this.$Node + "/assets/token/batch",
					method: 'POST',
					data: {
						kids
					},
					success: (res) => {
						if (res.data.data) {
							this.tokenMeta = res.data.data
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
			addLocalTx(txid) {
				let txids = []
				const data = uni.getStorageSync("txids")
				if (data) {
					txids = JSON.parse(data)
				}

				txids.unshift(txid)

				console.log(txids)

				uni.setStorageSync("txids", JSON.stringify(txids))
			},
			//刷新输出数量
			refreshOutValue() {
				if (!this.pair) {
					uni.showToast({
						icon: 'none',
						title: 'No liquidity pool found'
					})
					return
				}

				if (!this.amountIn) {
					return
				}

				this.refresh = true
				this.getAmountOut();

				setTimeout(() => {
					this.refresh = false
				}, 3000)

				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
			getAssets() {
				uni.request({
					url: this.$Node + "/assets/wallet/" + this.wallet,
					success: (res) => {
						if (res.data.data) {
							if (res.data.data.t20) {
								this.tokenList = res.data.data.t20
								this.tokenList.filter(item => {
									switch (item.kid) {
										case this.fromToken.kid:
											this.fromToken.amount = item.amount;
											break;
										case this.toToken.kid:
											this.toToken.amount = item.amount;
											break;
									}

									switch (item.kid) {
										case this.token0.kid:
											this.token0.amount = item.amount;
											break;
										case this.token1.kid:
											this.token1.amount = item.amount;
											break;
									}

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
			selectMinerFee(index) {
				switch (index) {
					case 3:
						this.speed = 'fastestFee'
						break;
					case 2:
						this.speed = 'halfHourFee'
						break
					case 1:
						this.speed = 'hourFee'
						break
				}
				this.minerFee = index
			},
			//设置滑点
			selectSlippage(index) {
				if (index != -1) {
					this.customSlippage = ''
				}
				this.slippage = index
			},
			sectionChange(index) {
				this.curNow = index;
				switch (index) {
					case 0:
						this.getPair()
						break;
					case 1:
						this.getOwnerLP()
						break;
				}
			},
			tokenClick(item) {
				this.showSwapTokens = false
				if (this.isSend) {
					if (this.toToken.kid === item.kid) {
						return
					}
					this.fromToken = item
				} else {
					if (this.fromToken.kid === item.kid) {
						return
					}
					this.toToken = item
				}

				this.pair = null
				this.amountIn = ''
				this.amountOut = ''
				//获取交易对
				this.getPair();
			},
			tokenPairClick(item) {
				this.showAddTokens = false
				if (this.isToken0) {
					if (this.token1.kid === item.kid) {
						return
					}
					this.token0 = item
				} else {
					if (this.token0.kid === item.kid) {
						return
					}
					this.token1 = item
				}

				this.amt0 = ''
				this.amt1 = ''
				this.checkAllowance()
			},
			showSwapToken() {
				this.showSwapTokens = true
			},
			subString(data, begin, end) {
				if (data) {
					return data.substring(0, begin) + '...' + data.substring(
						data.length -
						end, data.length)
				}
				return ''
			},
			percentage(total, amount) {
				let percentageChange = (amount / total) * 100;
				let p = utils.truncateDecimal(percentageChange, 4)
				return p
			},
			truncateDecimal(v) {
				return utils.truncateDecimal(v, 5)
			},
			b2a() {
				[this.fromToken, this.toToken] = [this.toToken, this.fromToken]
				this.amountIn = ''
				this.amountOut = ''
			},
			mempool() {
				switch (this.$network) {
					case "mainnet":
						window.location.href = "https://mempool.space/tx/" + this.txid
						break;
					case "testnet":
						window.location.href = "https://mempool.space/testnet/tx/" + this.txid
						break;
				}
			}

		}
	}
</script>

<style lang="scss">
	.market {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f3f3f7;

		.sub {
			width: 92%;
			margin: 0 auto;
			margin-top: 50rpx;
			height: 88rpx;
		}

		.ui-swap {
			width: 87%;
			margin: 0 auto;
			margin-top: 50rpx;
			// height: 880rpx;
			background-color: #FFF;
			border-radius: 30rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 40rpx;
			padding-bottom: 50rpx;

			.swapTokens {
				width: 95vw;
				height: 65vh;

				.title {
					border-bottom: 1rpx solid #cfcfd0;
					margin-bottom: 20rpx;
					padding-top: 25rpx;
					padding-bottom: 15rpx;
				}

				.view {
					.input {
						padding: 20rpx;
						padding-top: 0px;
						padding-bottom: 20rpx;
					}

					.tokens {
						width: 100%;
					}
				}
			}



			.swap {
				display: flex;
				flex-direction: column;
				align-items: center;
				// justify-content: center;	
				height: 100%;

				.ui-swap-title {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					padding-bottom: 28rpx;

					.name {
						flex: 1;
					}

					.icon {
						margin-left: 30rpx;
					}
				}



				.ui-swap-tips {
					flex: 2;
					width: 95%;
					border: 1px solid #f3f3f7;
					background-color: #fcfcff;
					border-radius: 10rpx;
					margin-top: 35rpx;
					padding: 15rpx;
					display: flex;
					flex-direction: column;
					// align-items: center;
					justify-content: center;

					.tips {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						line-height: 50rpx;
					}
				}


				.ui-lp {
					width: 100%;

					.item {
						border-radius: 25rpx;
						background-color: #f3f3f7;
						padding: 25rpx;
						// box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
						margin-bottom: 30rpx;

						.logo {
							display: flex;
							flex-direction: row;
						}

						.ui-lp-tips {
							width: 100%;
							display: flex;
							flex-direction: column;
							justify-content: center;
							margin-top: 20rpx;
							border-top: 1rpx solid #afafaf;
							padding-top: 15rpx;

							.tips {
								display: flex;
								flex-direction: row;
								align-items: center;
								justify-content: center;
								line-height: 45rpx;
							}
						}

					}
				}
			}

			.setting {
				.title {
					border-bottom: 1rpx solid #cfcfd0;
					margin-bottom: 15rpx;
					padding-top: 25rpx;
					padding-bottom: 15rpx;
				}

				.view {
					padding: 30rpx;

					.slipList {
						width: 100%;
						height: 90rpx;
						background-color: #f3f3f7;
						border-radius: 15rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-top: 10rpx;
						margin-bottom: 20rpx;

						.item {
							flex: 1;
							// padding: 15rpx;
							padding-top: 15rpx;
							padding-bottom: 15rpx;
							height: 45rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 0rpx 10rpx;
							border-radius: 10rpx;
							font-size: 25rpx;
						}
					}

				}


			}
		}
	}

	.bgFFF {
		background-color: #FFF;
	}

	.bgNonce {
		background-color: transparent;
	}

	.add-lp {
		// height: 800rpx;
		padding-bottom: 20rpx;

		.view-title {
			border-bottom: 1rpx solid #cfcfd0;
			margin-bottom: 15rpx;
			padding-top: 25rpx;
			padding-bottom: 15rpx;
		}

		.view {
			padding: 20rpx;

			.pair {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
	}


	.select-btn {
		min-width: 180rpx;
		height: 70rpx;
		border-radius: 15rpx;
		padding: 10rpx;
		background-color: #FFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;

		.avatar {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}

	.ui-swap-input {
		// flex: 5;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.swap-icon {
			margin-top: 25rpx;
		}

		.input-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.title {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding-bottom: 8rpx;
			}

			.input {
				width: 100%;

				.from {
					height: 90rpx;
				}
			}
		}
	}

	.btn {
		margin-top: 35rpx;
		height: 88rpx;
		border-radius: 20rpx;
	}

	.rm-token-pair {
		width: 100%;
		margin-top: 20rpx;
		border-radius: 15rpx;
		background-color: #f3f3f7;
	}

	.approve-btn-group {
		display: flex;
		flex-direction: row;

		.btn-item {
			margin-left: 10rpx;
			margin-right: 10rpx;
			padding-top: 8rpx;
			padding-bottom: 8rpx;
		}
	}

	.refresh {
		animation: rotate360 1s ease-in-out infinite;
	}

	@keyframes rotate360 {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>