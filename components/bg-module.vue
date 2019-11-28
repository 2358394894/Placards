<template>
	<view class="colour-module">
		<view class="colorTab">
			<!-- 头部 -->
			<view class="navbar">
				<!-- <view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
					{{ item }}
				</view> -->
				<view class="nav-item current">纯色</view>
			</view>
			<!-- 显示区域 -->
			<view class="list" v-if="tabCurrentIndex === 0">
				<view class="cItem" 
				v-for="(cItem,cIndex) in colorList" :key="cIndex" 
				:style="{backgroundColor: cItem.color}"
				@tap="optbgColor(cIndex)">
					<view :class="{ optColor: bgColor === cIndex }"></view>
				</view>
			</view>
			<view class="list list-theme" v-if="tabCurrentIndex === 1">
				<scroll-view class="slidingBox" scroll-x="true" @scroll="scroll" scroll-left="0">
					<view class="scroll-view-item_H" 
					v-for="(item, index) in themeLest" :key="index" 
					:style="{backgroundImage: 'url('+item.bgImage+')'}" 
					:class="{ maskLayer: themeIndex === index }"
					@tap="optbgTheme(index)">
						<view class="caption">
							<text>{{item.title[0]}}</text><text>{{item.title[1]}}</text><text>{{item.title[2]}}</text><text>{{item.title[3]}}</text>
						</view>
					</view>
					<view class="stay_tuned">
						<view class="caption">
							<text>敬</text><text>请</text><text>期</text><text>待</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			tabCurrentIndex: 0,
			themeIndex: null, // 默认主题背景
			old: {
				scrollTop: 0
			},
			navList: ['纯色', '主题'],
			bgColor: null, // 默认背景颜色
			themeLest: [
				{
					title: ['盛','夏','光','年'],
					bgImage: '../../static/images/themeIcon/highSummer_1.png'
				},
				{
					title: ['浪','漫','樱','落'],
					bgImage: '../../static/images/themeIcon/sakuraFall_2.png'
				},
				{
					title: ['秋','日','晚','霞'],
					bgImage: '../../static/images/themeIcon/autumnSunset_3.png'
				},
				{
					title: ['冬','季','初','雪'],
					bgImage: '../../static/images/themeIcon/snowInWinter_4.png'
				},
				{
					title: ['回','归','童','趣'],
					bgImage: '../../static/images/themeIcon/childlike_5.png'
				},
			],
			colorList: [
				{color: '#FFFFFF'},
				{color: '#F08496'},
				{color: '#2FD8ED'},
				{color: '#C492E8'},
				{color: '#FFC133'},
				{color: '#3A7579'},
				{color: '#663FC0'},
				{color: '#F7933E'},
				{color: '#E83928'},
				{color: '#8FC772'},
				{color: '#8E24AA'},
				{color: '#FCFF0E'},
				{color: '#129912'},
				{color: '#1D89E4'},
				{color: '#BA213A'},
				{color: '#FF6C00'},
				{color: '#00BCD7'},
				{color: '#4CB050'},
				{color: '#133763'},
				{color: '#333333'}
			]
		};
	},

	onLoad() {
		
	},

	methods: {
		//顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
		},
		// 主题滑动模块
		scroll: function(e) {
			// console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},
		// 选择背景颜色(纯色)
		optbgColor(index) {
			// 添加选中标记
			this.bgColor = index;
			let optColor = this.colorList[index].color;
			// 更新state数据
			this.$store.commit('changeBgColor', optColor);
			// 取消选中主题背景
			this.themeIndex = null;
		},
		// 选择背景颜色(主题)
		optbgTheme(index) {
			if (this.themeIndex == index) {
				return false;
			}
			this.themeIndex = index;
			this.$store.commit('changeBgTheme', index);
			// 取消选中背景颜色
			this.bgColor = null;
		}
	}
};
</script>

<style lang="scss" scoped>
	.colorTab{
		width: 100%;
		height: 210rpx;
		padding: 0 18rpx 0 38rpx;
		flex-direction: column;
	}
	
	// Tab切换
	.navbar {
		width: 100%;
		height: 58rpx;
		align-items: center;
	}
	.navbar .nav-item {
		margin-right: 44upx;
		font-size: 26upx;
		color: #666666;
	}
	.navbar .current {
		color: #000000;
	}
	
	/* 色块 */
	.list {
		width: 100%;
		height: 152rpx;
		
		// display: flex;
		flex-direction: row; // 项目的排列方向(默认值,主轴为水平方向,起点在左端)
		flex-wrap: wrap; // 轴线: 换行，第一行在上方。
		// justify-content 定义项目在主轴上的对齐方式
		// justify-content: space-between; // 两端对齐，项目之间的间隔都相等
		// align-content属性定义了多根轴线的对齐方式
		// align-content: stretch; // 轴线占满整个交叉轴
		// align-content: space-around; //每根轴线两侧的间隔都相等
		// align-items: center;
	}
	
	.list-theme {
		width: 100%;
	}
	
	.list .cItem {
		width: 68rpx;
		height: 62rpx;
		margin: 0 18rpx 14rpx 0;
		border-radius: 10rpx;
		position: relative;
	}
	
	.list .cItem .optColor {
		width: 30rpx;
		height: 30rpx;
		background-image: url(../static/images/icon_pitch_on.png);
		background-size: cover;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	/* 主题滑动模块 */
	.list .slidingBox {
		white-space: nowrap;
		width: 100%;
		height: 100%;
		padding-top: 4rpx;
		font-size: 30rpx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 132rpx;
		height: 132rpx;
		line-height: 132rpx;
		border-radius: 50%;
		margin-right: 22rpx;
		background-size: cover;
		
		position: relative;
	}
	
	// 遮罩层
	.maskLayer::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		// background-image: linear-gradient(120deg, #eaee44, #33d0ff);
		background-color: #000000;
		opacity: .5;
		z-index: 1; // 背景图叠加1和内容叠加100
	}
	
	.scroll-view-item_H .caption {
		position: absolute;
		z-index: 100;
		width: 72rpx;
		height: 70rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		color: #FFFFFF;
		
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		line-height: 36rpx;
	}
	
	.stay_tuned {
		display: inline-block;
		width: 60rpx;
		height: 132rpx;
		padding: 0 60rpx 0 20rpx;
		margin-left: 14rpx;
		border-left: 2rpx solid #666666;
		color: #666666;
		
		position: relative;
	}
	
	.stay_tuned .caption {
		position: absolute;
		width: 30rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		line-height: 32rpx;
	}
</style>