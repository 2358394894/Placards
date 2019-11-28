<template>
	<view class="content" :style="{backgroundColor: ''+bgColor+''}">
		<image class="bgImg" :src="imageURL"></image>
		<!-- 保留一个状态栏的view占位 -->
		<view class="status-contents">
			<view class="status top-view"></view>
		</view>
		<view class="title">
			<text>{{title}}</text>
		</view>
		
		<main-module></main-module>
		
		<page-foot></page-foot>
	</view>
</template>

<script>
	import mainModule from '../../components/main-module.vue'
	export default {
		components: {
			'main-module': mainModule,
		},
		data() {
			return {
				title: '告白小人2D',
				imageURL: '/static/images/bgdj.png',
				bgColor: this.$store.state.bgColor, // 背景颜色
			}
		},
		onLoad() {
			
		},
		// 已安装（DOM已准备就绪并放置在页面内）
		mounted () {
			// 设置拖拽区域信息
			let query = uni.createSelectorQuery().in(this);
			query.select('.content').boundingClientRect(data => {
				let wrapW = parseInt(data.width) // 页面总宽度
				let wrapH = parseInt(data.height) // 页面总高度
				// console.log("节点离页面顶部的距离为" + data.top);
				// console.log("得到布局位置信息" + JSON.stringify(data));
				this.$store.commit('changeWindowsW', wrapW)
				this.$store.commit('changeWindowsH', wrapH)
				console.log('屏幕宽高:', this.$store.state.windowsW, this.$store.state.windowsH)
			}).exec();
		},
		// 小程序分享
		onShareAppMessage: function (res) {
			var titleVal = '';
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
				titleVal = '告白小人2D'
			} else if (res.from === 'menu') {
				titleVal = '告白小人2D'
			}
			return {
				title: titleVal,
				// desc: '最具人气的小程序开发联盟!',
				path: '/pages/index/index',
				// imageUrl: '../../static/images/RomanticSakuraFall.png',
				success: function (res) {
					// 转发成功
					uni.showToast({
						title: '分享成功',
						duration: 2000
					})
					console.log("转发成功:" + JSON.stringify(res));
				},
				fail: function (res) {
					// 转发失败
					console.log("转发失败:" + JSON.stringify(res));
				}
			}
		},
		methods: {
			
		},
		watch: {
			'$store.state.bgColor': function () {
				this.bgColor = this.$store.state.bgColor
			},
			'$store.state.bgTheme': function() {
				this.imageURL = this.$store.state.bgTheme
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* height: auto; */
		height: 100%;
		background-size: cover;
		/* 预留手机状态栏的位置 */
		/* padding-top: var(--status-bar-height); */
		position: relative;
	}
	
	.content .bgImg {
		position: fixed;
		width: 100%;
		height: 100%;
	}
	
	/* 保留一个状态栏的view占位---begin */
	.status-contents{
		height: var(--status-bar-height);
	}
	.top-view{
		width: 100%;
		position: fixed;
		top: 0;
	}
	.status{
		height:var(--status-bar-height);
	}
	/* 保留一个状态栏的view占位---end */
	
	.title {
		/* display: flex; */
		align-items: center;
		justify-content: center;
		width: 100%;
		/* padding-top: var(--status-bar-height); */
		/* margin-top: var(--status-bar-height); */
		height: calc(var(--status-bar-height) + 36upx);
		font-size: 36upx;
		font-weight: 600;
	}
	
	/* 中部文字 */
	main-module {
		flex: 1;
		position: relative;
		
		/* margin: 50rpx 72rpx 0rpx 74rpx; */
		/* margin: 50rpx 10.41% 0rpx 10.13%; */
		width: 100%;
		height: auto;
		/* background-color: #576B95; */
		/* flex-wrap: wrap; */
	}
</style>
