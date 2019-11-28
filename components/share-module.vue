<template>
	<view class="outerLayer">
		<view class="nvMask" @tap="show"></view>
		<view class="nvImageMenu">
			<view class="title">分享</view>
			<view class="iconList">
				<view class="iconItem" @tap="shareWay(0)"></view>
				<view class="iconItem" @tap="shareWay(1)"></view>
				<view class="iconItem" @tap="shareWay(2)"></view>
				<view class="iconItem" @tap="shareWay(3)"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			show: function() { // 退出分享
				this.$store.commit('changeShareLayer', false);
			},
			shareWay: function (index) {
				var iClickIndex = index;
				var strProvider = "", strScene = "";
				switch (iClickIndex) {
					case 0: // 分享到微信朋友圈
						strProvider = "weixin"
						strScene = "WXSenceTimeline"
						break;
					case 1: // 分享到微信好友
						strProvider = "weixin"
						strScene = "WXSceneSession"
						break;
					case 2: // 分享到qq
						strProvider = "qq"
						break;
					case 3: // 分享到微博
						strProvider = "sinaweibo"
						break;
				}
				if (strProvider!="") {
					uni.share({
						provider: strProvider,	// 分享服务提供商
						scene: strScene,		// 分享场景
						type: 2,				// 分享类型 纯图片
						imageUrl: "../../static/images/share/wxMoments.png",
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			}
		},
	}
</script>

<style scoped>
	.outerLayer {
		height: 100%;
		width: 100%;
		background-color: #007AFF;
	}

	.nvMask {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.nvImageMenu {
		position: absolute;
		bottom: 0px;
		left: 0px;
		height: 270rpx;
		width: 100%;
		background-color: rgb(255, 255, 255);
		flex-wrap: wrap;
	}
	
	.nvImageMenu .title {
		width: 100%;
		height: 112rpx;
		font-size: 36rpx;
		font-weight: normal;
	}
	
	.nvImageMenu .iconList {
		width: 100%;
		height: 100%;
		padding: 0 60rpx;
		justify-content: space-between;
	}
	.nvImageMenu .iconList .iconItem {
		width: 118rpx;
		height: 118rpx;
		background-size: cover;
	}
	.iconItem:nth-child(1) {
		background-image: url('../static/images/share/wxMoments.png');
	}
	.iconItem:nth-child(2) {
		background-image: url('../static/images/share/wxFriends.png');
	}
	.iconItem:nth-child(3) {
		background-image: url('../static/images/share/qq.png');
	}
	.iconItem:nth-child(4) {
		background-image: url('../static/images/share/wb.png');
	}
</style>
