<template>
	<view class="container">
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :data-current="index" @click="tapTab(index)">{{tab}}</view>
				<view class="swiper-tab-list createImg" @tap="CreateImage">生成图片</view>
			</scroll-view>
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item>
					<text-module></text-module>
				</swiper-item>
				<swiper-item>
					<colour-module></colour-module>
				</swiper-item>
				<swiper-item>
					<bg-module></bg-module>
				</swiper-item>
				<swiper-item>
					<suit-module></suit-module>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
// import util from '../common/util.js';
import textModule from './text-module.vue'
import colourModule from './colour-module.vue'
import bgModule from './bg-module.vue'
import suitModule from './suit-module.vue'

export default {
	components: { // 组件命名
		'text-module': textModule,
		'colour-module': colourModule,
		'bg-module': bgModule,
		'suit-module': suitModule
	},
	data() {
		return {
			tabBars: ['文本', '颜色', '背景', '套装'],
			scrollLeft: 0,
			isClickChange: false,
			tabIndex: 0,
		};
	},
	methods: {
		changeTab(e) { // 滑动swiper-item
			let index = e.detail.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = this.getElSize("tab-bar"),
				tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;
		
			for (let i = 0; i < index; i++) {
				let result = this.getElSize(this.tabBars[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = this.getElSize(this.tabBars[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		tapTab(index) { //点击tab-bar
			console.log(index);
			if (this.tabIndex === index) {
				return false;
			} else {
				let tabBar = this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = index;
			}
		},
		getElSize(id) { //得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery().select('#' + id).fields({
					size: true,
					scrollOffset: true
				}, (data) => {
					res(data);
				}).exec();
			});
		},
		
		// #ifdef APP-PLUS
		// share() {
		// 	// console.log('分享');
		// 	this.$store.commit('changeShareLayer', true);
		// },
		// #endif
		// 截屏
		CreateImage: function () {
			uni.navigateTo({
				//跳转到pages下virtualLayer文件下面的virtualLayer.vue文件
				url: '/pages/virtualLayer/virtualLayer',
				animationType: 'pop-in',
				animationDuration: 500
			})
		}
	}
};
</script>
<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 380rpx;
		// height: 400rpx;
		// flex: 1;
		// justify-content: center;
		/* align-items: center; */
		background-color: rgba(255, 255, 255, .3);
	}
	
	.uni-swiper-tab {
		background-color: rgba(255, 255, 255, .4);
		border-bottom: 0;
		line-height: 88rpx;
		/* 在这里设置导航条高度 */
		height: 88rpx;
		border-bottom: 1px solid rgba(102, 102, 102, .1);
	}
	
	.swiper-tab-list {
		display: inline-block;
		width: 20%;
		height: 100%;
		line-height: 88rpx;
		font-size: 30rpx;
		color: #666666;
	}
	
	.uni-tab-bar .active {
		color: #000000;
		// 设置内边框
		box-sizing: border-box;
		border-bottom: 2px solid #FFFFFF;
	}
	
	/* 滑动区域 */
	.swiper-box {
		// background-color: rgba(255, 200, 200, 0.1);
	}
	.swiper-box swiper-item {
		// flex: 1;
		// width: 100%;
		// height: auto;
	}
	
	/* 生成图片 */
	.createImg {
		position: absolute;
		top: 20rpx;
		width: 19%;
		height: 54rpx;
		line-height: 56rpx;
		border-radius: 10rpx;
		background-color: #FF5369;
		color: #FFFFFF;
	}
</style>
