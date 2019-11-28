<template>
	<view class="suit-module">
		<view class="list">
			<view class="scroll-view-item_H" 
			v-for="(item, index) in themePic" :key="index"
			:class="{ maskLayer: suitIndex === index }"
			@tap="optSuit(index)">
				<image :src="item.bgImage"></image>
				<view class="caption">
					<view>{{item.title}}</view>
					<!-- <view class="setting" v-if="suitIndex === index" @tap="openSetUp(index)"></view> -->
					<view class="setting" v-if="suitIndex === index"></view>
				</view>
			</view>
			<view class="stay_tuned">
				<text>敬请期待</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				suitIndex: 0, // 默认选中套装
				themePic: [{
					title: '害羞儿童',
					bgImage: '/static/images/peopleSuit.png'
				},{
					title: '小猫喵喵',
					bgImage: '/static/images/catSuit.png'
				}]
			};
		},
		methods: {
			optSuit(index) {
				var that = this;
				if (this.suitIndex == index) {
					var suitId = index;
					uni.navigateTo({
						//跳转到pages下setUp文件下面的setUp.vue文件
						url: '/pages/setUp/setUp?id='+suitId,
						// animationType: 'pop-in',
						// animationDuration: 500
					})
					return false;
				}
				// 当移动数组有值时, 提示用户切换套装位置重置
				if (this.$store.state.moveArray.length != 0) {
					uni.showModal({
						title: '提示',
						content: '套装位置将重置',
						success: function (res) {
							if (res.confirm) {
								that.suitIndex = index;
								that.$store.commit('changeSuitType', index);
								// console.log(that.$store.state.suit)
								
								// 清除移动位置信息
								var clearMove = [];
								that.$store.commit('changeMove', clearMove)
								// console.log(that.$store.state.moveArray)
								
								// 文本长度限制
								if (index == 0) {
									var num = 24;
									that.$store.commit('changeTextLen', num)
								} else if (index == 1) {
									var num = 20;
									that.$store.commit('changeTextLen', num)
								}
								
							} else if (res.cancel) {
								console.log('用户点击取消');
								return;
							}
						}
					});
				}
				// 当移动数组没有值自动切换,
				else {
					that.suitIndex = index;
					that.$store.commit('changeSuitType', index);
					// console.log(that.$store.state.suit)
					
					// 文本最大长度限制
					if (index == 0) {
						var num = 24;
						that.$store.commit('changeTextLen', num)
					} else if (index == 1) {
						var num = 20;
						that.$store.commit('changeTextLen', num)
					}
				}
			},
			// openSetUp(index) {
			// 	var suitId = index;
			// 	uni.navigateTo({
			// 		//跳转到pages下setUp文件下面的setUp.vue文件
			// 		url: '/pages/setUp/setUp?id='+suitId,
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width: 100%;
		height: 210rpx;
		margin: 40rpx 36rpx 0 38rpx;
		/* 设置套装定位 */
		position: relative;
	}
	
	.list .scroll-view-item_H {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
		margin-right: 40rpx;
		/* 设置遮罩层定位 */
		position: relative;
	}
	
	.list .scroll-view-item_H image {
		width: 170rpx;
		height: 170rpx;
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
		background-color: rgba(0, 0, 0, .5);
		// opacity: .5;
		z-index: 1; // 背景图叠加1和内容叠加100
	}
	.maskLayer .caption {
		color: #FFFFFF;
	}
	
	.scroll-view-item_H .caption {
		position: absolute;
		z-index: 100;
		width: 100%;
		height: auto;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}
	
	.setting {
		width: 36rpx;
		height: 38rpx;
		background-image: url('../static/images/setting.png');
		background-size: cover;
	}
	
	// 敬请关注
	.stay_tuned {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		
		width: 30rpx;
		height: 170rpx;
		padding: 0 0 0 30rpx;
		border-left: 2rpx dotted #666666;
		color: #666666;
		
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
		line-height: 42rpx;
	}
</style>
