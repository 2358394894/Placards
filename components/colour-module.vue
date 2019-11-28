<template>
	<view class="colour-module">
		<view class="colorTab">
			<!-- 头部 -->
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @tap="tabClick(index)">
					{{ item }}
				</view>
			</view>
			<!-- 显示区域 -->
			<view class="list" v-if="tabCurrentIndex === 0">
				<view class="cItem" 
				v-for="(cItem,cIndex) in colorList" :key="cIndex" 
				:style="{backgroundColor: cItem.color}" 
				@tap="optTextColor(cIndex)">
					<view :class="{ optColor: textColor === cIndex }"></view>
				</view>
			</view>
			<view class="list" v-if="tabCurrentIndex === 1">
				<view class="cItem" 
				v-for="(cItem,cIndex) in colorList" :key="cIndex" 
				:style="{backgroundColor: cItem.color}" 
				@tap="optBrandColor(cIndex)">
					<view :class="{ optColor: brandColor === cIndex }"></view>
				</view>
			</view>
			<!-- <view class="list" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index"></view> -->
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			tabCurrentIndex: 0, // 选择栏目
			textColor: 18, // 默认字体颜色
			brandColor: 0, // 默认牌子颜色
			navList: ['文本颜色', '举牌颜色'],
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
		// 页面显示是默认选中第一个
		this.tabCurrentIndex = 0;
	},

	methods: {
		// 顶部tab点击
		tabClick(index) {
			this.tabCurrentIndex = index;
			// console.log(this.tabCurrentIndex)
		},
		// 选择文本颜色
		optTextColor(index) {
			// 添加选中标记
			this.textColor = index;
			let optColor = this.colorList[index].color;
			// 更新state数据
			this.$store.commit('changeTextColor', optColor);
			// console.log(this.$store.state.textColor)
		},
		// 选择牌子颜色
		optBrandColor(index) {
			this.brandColor = index;
			let optColor = '/static/images/brand/brand_'+(index + 1)+'.png';
			this.$store.commit('changeBrandColor', optColor);
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
	
	.list .cItem {
		width: 68rpx;
		height: 62rpx;
		margin: 0 18rpx 14rpx 0;
		border-radius: 10rpx;
		position: relative;
	}
	/* 选中文本 */
	.list .cItem .optColor {
		width: 30rpx;
		height: 30rpx;
		background-image: url(../static/images/icon_pitch_on.png);
		background-size: cover;
		position: absolute;
		right: 0;
		bottom: 0;
	}
</style>