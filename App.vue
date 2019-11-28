<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	page, view {
		display: flex;
	}
	page {
		width: 100%;
		height: 100%;
		/* background-color: #FF8D8D; */
		/* background-image: url('static/images/xie.png'); */
		/* background-size: cover; */
	}
</style>
