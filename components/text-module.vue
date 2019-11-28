<template>
	<view class="textBox">
		<!-- ifdef: 仅在XXX出现, ifndef: 不在XXX出现 -->
		<!-- #ifdef APP-PLUS -->
		<textarea :maxlength="textMaxLen" v-model="texts" rows="2" placeholder="請輸入您要留言的內容" placeholder-class="plac" @input="conInput"></textarea>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="wxTextarea">
			<textarea type="text" :maxlength="textMaxLen" v-model="texts" @input="conInput" placeholder="請輸入您要留言的內容" ></textarea>
		</view>
		<!-- #endif -->
		
		<view class='text_right'>
			<view class="em" style='color:red'>{{textSum}}</view><view class="span">/{{textMaxLen}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				texts: '',
				textSum: this.$store.state.textArray.length,
				textMaxLen: this.$store.state.textLength
			};
		},
		mounted: function() {
			for (let item of this.$store.state.textArray) {
				this.texts += item.text
			}
			// console.log(this.texts)
		},
		methods:{
			conInput(){
				this.textSum = this.texts.length;
				if(this.textSum == this.textMaxLen){
					uni.showToast({
						icon: 'none',
						title: '最多只能輸入'+this.textMaxLen+'個字'
					});
					// return;
				}
				var dataArr = [];
				for (var i = 0; i < this.texts.length; i++) {
					dataArr[i] = {
						text: this.texts[i],
						x: i < 6 ? i * 55 : (i % 6) * 55,
						y: parseInt(i/6)*93,
						cx: i < 4 ? i * 85 : (i % 4) * 85,
						cy: parseInt(i/4)*80,
					}
				}
				// console.log(dataArr)
				// 向vuex中提交数据
				this.$store.commit('changeMsg', dataArr)
				// 从vuex中取数据
				// console.log(this.$store.state.textArray)
			}
		},
		watch: {
			// 监听文本长度变化
			'$store.state.textLength': function () {
				this.textMaxLen = this.$store.state.textLength
				// 文本长度限制,超出时截取数组
				if (this.$store.state.textArray.length > 20 && this.$store.state.suit == 1) {
					var textList = this.$store.state.textArray.slice(0,20)
					this.texts = '';
					for (let item of textList) {
						this.texts += item.text
					}
					// 当前文本长度
					this.textSum = this.texts.length;
					// 更新文本数组
					this.$store.commit('changeMsg', textList)
				}
				// console.log(this.$store.state.textArray)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.textBox {
		width: 100%;
		height: 100%;
	}
	
	/* #ifdef MP-WEIXIN */
	.wxTextarea {
		width: 100%;
		height: 176rpx;
	}
	/* #endif */
	
	/* #ifdef APP-PLUS || MP-WEIXIN */
	.textBox textarea {
		width: 100%;
		height: 176rpx;
		padding: 20rpx;
		margin: 36rpx 36rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		border: 2rpx solid #C2A6A6;
		font-size: 28rpx;
	}
	/* #endif */
	
	.textBox .text_right {
		position: absolute;
		right: 60rpx;
		bottom: 40rpx;
		font-size: 14px;
		color: #666666;
	}
</style>
