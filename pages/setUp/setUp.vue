<template>
	<view class="content">
		<view class="title-contents">
			<view class="top-view status"></view>
			<view class="titles">
				<view class="back" @click="backButton"><view class="backIcon"></view></view>
				<view class="titleText">设置</view>
			</view>
		</view>
		<view class="main">
			<!-- 套装：人 -->
			<view class=".inner-center" v-if="suitId == 0">
				<view class="figure man"
				v-for="(item, index) in suitList" :key="index"
				@tap="optItem(index)">
					<image :src="item.bgImage"></image>
					<!-- 当前三元运算符：外层判断是否为需调整位置的id，内层判断对应id需设置的位置(left值) -->
					<view class="brand" :class="{ maskLayer: index == optMan[index]-1 }" :style="{left: ''+ (index === 0 || index === 4 ? (index === 0 ? 42 : 45) : 50) +'%'}">
					<!-- <view class="brand maskLayer"> -->
						<image class="hand" src="/static/images/hand.png"></image>
					</view>
				</view>
			</view>
			<!-- :style="{backgroundImage: 'url(../../static/images/people/people_1.png)'}" -->
			<!-- 套装：猫 -->
			<view class=".inner-center" v-else>
				<view class="figure cat"
				v-for="(item, index) in suitList" :key="index"
				@tap="optItem(index)">
					<image :src="item.bgImage"></image>
					<view class="brand" :class="{ maskLayer: index == optCat[index]-1 }">
						<image class="hand" :src="item.handImg"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<button @tap="selectAll">全选</button>
			<button @tap="save">完成</button>
		</view>
	</view>
</template>

<script>
	import dataList from '@/common/suit-list.json'
	
	export default {
		data() {
			return {
				suitId: null, // 默认选中套装
				optCat: [],
				optMan: [],
				suitList: []
			}
		},
		onLoad: function (option) {
			// 获取页面传递的参数
			this.suitId = option.id; // String
			// console.log(this.suitId)
			if (this.suitId == 0) {
				this.suitList = dataList.man;
				var tempArray = []; // 临时数组
				for (var i = 0; i < 12; i++) {
					var keyValue = i + 1;
					// 判断 finalMan中是否存在 keyValue, -1表示不存在
					if(this.$store.state.finalMan.indexOf(keyValue) != -1) {
						tempArray.push(keyValue);
					} else {
						tempArray.push(' ');
					}
				}
				this.optMan = tempArray;
				console.log(this.optMan)
			} else if (this.suitId == 1) {
				this.suitList = dataList.cat;
				var tempArray = [];
				for (var i = 0; i < 10; i++) {
					var keyValue = i + 1;
					if (this.$store.state.finalCat.indexOf(keyValue) != -1) {
						tempArray.push(keyValue);
					} else{
						tempArray.push(' ');
					}
				}
				this.optCat = tempArray;
				console.log(this.optCat)
			}
		},
		methods: {
			backButton() {
				uni.navigateBack();
			},
			// 选择
			optItem(index) {
				// console.log('点击元素下标:'+index)
				if (this.suitId == 0) { // this.suitId==0 人
					if (this.optMan[index] != ' ') {
						this.$set(this.optMan,index,' ');
					} else if (this.optMan[index] == ' ') {
						this.$set(this.optMan,index,index+1);
					}
					// console.log(this.optMan, '数组总长度:'+this.optMan.length)
				}
				else if (this.suitId == 1) { // this.suitId==1 猫
					if (this.optCat[index] != ' ') {
						this.$set(this.optCat,index,' ');
					} else if (this.optCat[index] == ' ') {
						this.$set(this.optCat,index,index+1);
					}
					// console.log(typeof(this.optCat[index]), this.optCat[index], '数组总长度:'+this.optCat.length)
				}
			},
			// 全选
			selectAll() {
				// console.log(this.optMan)
				if (this.suitId == 0) {
					this.optMan.forEach((item,index)=>{
						// console.log(item, index);
						this.$set(this.optMan,index,index+1);
					});
				} else if (this.suitId == 1) {
					this.optCat.forEach((item,index)=>{
						// console.log(item, index);
						this.$set(this.optCat,index,index+1);
					});
				}
			},
			// 完成
			save() {
				if (this.suitId == 0) {
					// console.log(this.optMan)
					var suitArr = this.optMan;
					var convertArr = [];
					for (var i = 0; i < suitArr.length; i++) {
						if (suitArr[i] != ' ') {
							convertArr.push(suitArr[i])
						}
					}
					if (convertArr.length != 0) {
						this.$store.commit('changeFinalMan', convertArr);
						console.log(this.$store.state.finalMan)
						uni.navigateBack();
					} else{
						uni.showModal({
							title: '提示',
							content: '请至少选择一个图像'
						});
						return;
					}
				} else if (this.suitId == 1) {
					var convertArr = [];
					for (var i = 0; i < this.optCat.length; i++) {
						if (this.optCat[i] != ' ') {
							convertArr.push(this.optCat[i])
						}
					}
					if (convertArr.length != 0) {
						this.$store.commit('changeFinalCat', convertArr);
						console.log(this.$store.state.finalCat)
						uni.navigateBack();
					} else{
						uni.showModal({
							title: '提示',
							content: '请至少选择一个图像'
						});
						return;
					}
				}
			}
		},
		//计算属性
		computed:{},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	
	/* 自定义导航栏 */
	.title-contents{
		width: 100%;
		height: 64px;
		padding-bottom: 14rpx;
		background-color: #FF5369;
	}
	/* 状态栏 */
	.status{
		height: var(--status-bar-height);
	}
	.top-view{
		width: 100%;
		position: fixed;
		top: 0;
	}
	/* 导航栏 */
	.titles{
		position: fixed;
		top: var(--status-bar-height);
		width: 100%;
		height: calc(64px - var(--status-bar-height));
	}
	/* 返回按钮 */
	.titles .back {
		position: absolute;
		width: calc(64px - var(--status-bar-height));
		height: 100%;
	}
	.titles .back .backIcon {
		width: 38rpx;
		height: 38rpx;
		background-image: url('../../static/images/back.png');
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	/* 标题 */
	.titles .titleText{
		align-items: center;
		justify-content: center;
		width: 100%;
		line-height: 100%;
		font-size: 36rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	/* 列表 */
	.main {
		width: 100%;
		height: 100%;
	}
	.inner-center{
		width: 100%;
		height: auto;
		margin: 34rpx 30rpx 140rpx 30rpx;
		// border: 1px solid red;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.figure {
		width: 216rpx;
		height: 216rpx;
		// border: 1px solid lightpink;
		position: relative;
	}
	.cat image {
		width: 90%;
		height: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.man image {
		width: 65%;
		height: 100%;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	/* 牌子 */
	.figure .brand{
		background-color: #FFFFFF;
		border-radius: 6rpx;
		position: absolute;
	}
	.man .brand {
		width: 96rpx;
		height: 72rpx;
		border: 2rpx solid #CCCCCC;
		top: 48%;
		left: 50%;
		transform: translateX(-50%);
	}
	.cat .brand {
		width: 108rpx;
		height: 84rpx;
		top: 94rpx;
		left: 34rpx;
	}
	
	/* 遮罩层 */
	.maskLayer::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-image: url('../../static/images/pitch_on.png');
		background-size: cover;
		z-index: 1; // 背景图叠加1和内容叠加100
	}
	
	/* 手 */
	.figure .brand .hand{
		position: absolute;
		// top: 10rpx;
		// left: -6rpx;
	}
	.man .hand {
		top: 8px;
		width: 106rpx;
		height: 16rpx;
	}
	.cat .hand {
		top: 10px;
		width: 116rpx;
		height: 18rpx;
	}
	
	/* 底部按钮 */
	.btn {
		width: 100%;
		height: 140rpx;
		border-top: 2rpx solid #CCCCCC;
		position: fixed;
		bottom: 0;
		align-items: center;
	}
	
	.btn button {
		width: 318rpx;
		height: 78rpx;
		background-color: #FF5369;
		color: #FFFFFF;
		font-size: 32upx;
		line-height: 78upx;
		border-radius: 40upx;
	}
</style>
