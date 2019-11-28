<template>
	<view class="outerLayer">
		<view class="nvMask" @tap="show"></view>
		<view class="nvImageMenu">
			<view class="title">保存到相册，请选择图片大小</view>
			<view class="iconList">
				<button @tap="normal">普 通</button>
				<button @tap="highDefinition">高 清</button>
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
			show: function() { // 退出保存遮罩层
				this.$store.commit('changeImageLayer', false);
			},
			normal: function() {
				console.log('ceshi')
			},
			highDefinition: function() {
				
			}
		}
	}
</script>

<style scoped>
	.outerLayer {
		height: 100%;
		width: 100%;
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
		height: 214rpx;
		width: 100%;
		background-color: rgb(255, 255, 255);
		flex-wrap: wrap;
	}
	
	.nvImageMenu .title {
		width: 100%;
		height: 96rpx;
		font-size: 36rpx;
		font-weight: normal;
	}
	
	.nvImageMenu .iconList {
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}
	.nvImageMenu .iconList button {
		width: 318rpx;
		height: 78rpx;
		line-height: 78rpx;
		background-color: #FF5369;
		color: #FFFFFF;
		font-size: 34rpx;
		border-radius: 50rpx;
	}
</style>
