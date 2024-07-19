<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.loadScripts()
		},
		onShow: function() {
			console.log('App Show')
		}, 
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			loadScripts() {
				let cUtils = document.createElement('script');
				cUtils.src = "https://unpkg.com/@cmdcode/crypto-utils";
				document.head.appendChild(cUtils);
				
				let tapScript = document.createElement('script');
				tapScript.src = "https://unpkg.com/@cmdcode/tapscript";
				document.head.appendChild(tapScript);
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	
	// page{
	//  background-color: #151515;
	// }
	

</style>