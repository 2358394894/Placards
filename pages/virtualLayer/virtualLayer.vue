<template>
	<view class="content">
		<view class="title-contents">
			<view class="top-view status"></view>
			<view class="titles">
				<view class="back" @click="backButton"><view class="backIcon"></view></view>
				<view class="titleText">图片预览</view>
			</view>
		</view>
		<view class="main">
			<!-- 5:4大小 小程序分享海报图 -->
			<canvas canvas-id="canvas" style="position: absolute; top: -1000px; left: -1000px; width: 640px; height: 640px;"></canvas>
			<!-- 预览图 -->
			<canvas canvas-id="myCanvas" :style="{width: ''+ w +'px', height: ''+ h +'px', position: 'absolute', top: '-1000px', left: '-1000px'}"></canvas>
			<!-- 通过css属性将原本占位的canvas移出可视区域 -->
			<!-- v-if="isShowSrc", (w/h) * 0.7: 等比缩放显示预览图 -->
			<image class="previewImg" :src="tempPath" v-if="isShowSrc" :style="{width: ''+ (w * 0.7) +'px', height: ''+ (h * 0.7) +'px'}" @tap="checkImg"></image>
			<view class="finish" v-if="isShowSrc"><view class="remind"></view>制作成功!</view>
		</view>
		<view class="btn" v-if="isShowSrc">
			<!-- #ifdef APP-PLUS -->
			<button @tap="openShare">立即分享</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="share">分享</button>
			<!-- #endif -->
			<button @tap="save">保存图片</button>
		</view>
		
		<!-- app分享模态框 -->
		<!-- #ifdef APP-PLUS -->
		<view class="outerLayer" v-if="layer">
			<view class="nvMask" @tap="exitShare"></view>
			<view class="nvImageMenu">
				<view class="title">分享</view>
				<view class="iconList">
					<image class="iconItem" @tap="shareWay(0)" src="/static/images/share/wxM.png"></image>
					<image class="iconItem" @tap="shareWay(1)" src="/static/images/share/wxF.png"></image>
					<image class="iconItem" @tap="shareWay(2)" src="/static/images/share/qq.png"></image>
					<image class="iconItem" @tap="shareWay(3)" src="/static/images/share/wb.png"></image>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				w: this.$store.state.windowsW,		// 屏幕宽度 -> 画布宽
				h: this.$store.state.windowsH - 100,		// 屏幕宽度 -> 画布高
				offsetX: this.$store.state.offsetX,	// x轴偏移位置
				offsetY: this.$store.state.offsetY,	// y轴偏移位置
				bgColor: this.$store.state.bgColor,
				suitList: [],
				moveList: [],
				suitId: this.$store.state.suit,
				textList: this.$store.state.textArray,
				brandColor: this.$store.state.brandColor, 	// 牌子颜色
				hand: '/static/images/hand.png',			// 手(人)
				textColor: this.$store.state.textColor, 	// 文本颜色
				tempPath: '' ,	// 图片临时路径
				isShowSrc: 0,	// 是否显示预览图片
				clipImage: '',	// 5:4图片临时路径
				pixelRatio: 1,	//像素密度
				
				layer: false, // 分享层
			}
		},
		onLoad: function () {
			var _this = this;
			
			// 设备信息
			uni.getSystemInfo({
				success(res) {
					_this.pixelRatio = res.pixelRatio    //像素比
				}
			})
			
			uni.showLoading({
				title: '资源加载中...',
			})
			const ctx = uni.createCanvasContext('myCanvas')
			
			// 生成背景
			ctx.save()
			ctx.setFillStyle(this.bgColor);			//填充颜色
			ctx.fillRect(0, 0, this.w, this.h);		//画出矩形背景
			ctx.restore()
			
			// 背景图层
			ctx.drawImage("/static/images/bgdj.png", 0, 0, this.w, this.h)
			//小程序码
			ctx.drawImage("/static/images/SmallProgramCode.jpg", this.offsetX, (this.h-75), 70, 70)
			
			// 设置字体
			ctx.font = "bold 15px uniicons";
			// 设置颜色
			ctx.fillStyle = this.textColor;
			// 设置水平对齐方式
			ctx.textAlign = "center";
			// 设置垂直对齐方式
			ctx.textBaseline = "middle";
			
			// 获取移动位置数组
			this.moveList = this.$store.state.moveArray;
			
			// 获取套装数组
			if (this.suitId == 0) {
				this.suitList = this.$store.state.finalMan;
			} else if (this.suitId == 1) {
				this.suitList = this.$store.state.finalCat;
			}
			
			// 数组初始化
			var testObj = [];
			var isAdd = false;
			for (var i = 0; i < this.textList.length; i++) {
				isAdd = false;
				for (var j = 0; j < this.moveList.length; j++) {
					if (i == this.moveList[j].index) {
						// console.log(i)
						// 如果初始位置数组i[对象下标] 等于 移动位置数组index[对象下标] 则赋值x y坐标
						// this.(moveList / textList)[(j / i)].(x / cx)：位置以可移动框大小为参考，以屏幕宽为画布宽，则其位置需加上左侧偏移量this.offsetX
						testObj[i] = {
							text: this.textList[i].text,
							x: this.suitId == 0 ? (this.moveList[j].x + this.offsetX) : (this.textList[i].x + this.offsetX),
							y: this.suitId == 0 ? (this.moveList[j].y + this.offsetY) : (this.textList[i].y + this.offsetY),
							cx: this.suitId == 0 ? (this.textList[i].cx + this.offsetX) : (this.moveList[j].cx + this.offsetX),
							cy: this.suitId == 0 ? (this.textList[i].cy + this.offsetY) : (this.moveList[j].cy + this.offsetY),
						}
						isAdd = true;
					}
				}
				if (isAdd) {
					// 跳出当期for循环
					continue;
				}
				// 不等于时 创建新数据
				testObj[i] = {
					text: this.textList[i].text,
					x: (this.textList[i].x + this.offsetX),
					y: (this.textList[i].y + this.offsetY),
					cx: (this.textList[i].cx + this.offsetX),
					cy: (this.textList[i].cy + this.offsetY),
				}
			}
			// 对象数组创建完毕
			// console.log(testObj)
			
			// 画图 xx
			if (this.suitId == 0) {
				console.log(this.suitList)
				var brandOX, handOX, textOX = 0;
				
				for (var i = 0; i < testObj.length; i++) {
					if (this.suitList.length > i) {
						ctx.drawImage("/static/images/people/people_"+this.suitList[i]+".png", testObj[i].x, testObj[i].y, 45, 73)
					} else {
						ctx.drawImage("/static/images/people/people_"+this.suitList[i%this.suitList.length]+".png", testObj[i].x, testObj[i].y, 45, 73)
					}
					// 牌、手、字 位置设置
					if (this.suitList[i] == 1 || this.suitList[i] == 5 || this.suitList[i%this.suitList.length] == 1 || this.suitList[i%this.suitList.length] == 5) {
						if (this.suitList[i] == 1 || this.suitList[i%this.suitList.length] == 1) {
							brandOX = testObj[i].x+0
							handOX = testObj[i].x-1
							textOX = testObj[i].x+18
						}
						else {
							brandOX = testObj[i].x+2
							handOX = testObj[i].x+1
							textOX = testObj[i].x+20
						}
					} else {
						brandOX = testObj[i].x+5
						handOX = testObj[i].x+4
						textOX = testObj[i].x+23
					}
					
					// 绘制牌子
					ctx.drawImage(this.brandColor, brandOX, testObj[i].y+33, 36, 29)
					// 绘制手
					ctx.drawImage(this.hand, handOX, testObj[i].y+40, 38, 6)
					// 绘制文字（参数：要写的字，x坐标，y坐标）
					ctx.fillText(testObj[i].text, textOX, testObj[i].y+48);
				}
			}
			else if (this.suitId == 1) {
				console.log(this.suitList)
				
				for (var i = 0; i < testObj.length; i++) {
					if (this.suitList.length > i) {
						ctx.drawImage("/static/images/cat/cat_"+this.suitList[i]+".png", testObj[i].cx, testObj[i].cy, 65, 65)
						// 绘制牌子
						ctx.drawImage(this.brandColor, testObj[i].cx+7, testObj[i].cy+28, 36, 29)
						ctx.drawImage("/static/images/catHand/catHand_"+this.suitList[i]+".png", testObj[i].cx+5, testObj[i].cy+32, 41, 6)
					} else {
						ctx.drawImage("/static/images/cat/cat_"+this.suitList[i%this.suitList.length]+".png", testObj[i].cx, testObj[i].cy, 65, 65)
						// 绘制牌子
						ctx.drawImage(this.brandColor, testObj[i].cx+7, testObj[i].cy+28, 36, 29)
						ctx.drawImage("/static/images/catHand/catHand_"+this.suitList[i%this.suitList.length]+".png", testObj[i].cx+5, testObj[i].cy+32, 41, 6)
					}
					// 绘制文字（参数：要写的字，x坐标，y坐标）
					ctx.fillText(testObj[i].text, testObj[i].cx+25, testObj[i].cy+43);
				}
			}
			
			// ctx.draw()
			// 绘制并生成图片，绘制时添加定时器防止页面切换时卡顿
			setTimeout(function() {
				// 加个定时器(1500ms以上)，等待所有资源绘制完全
				ctx.draw(false, setTimeout(function() {
					uni.canvasToTempFilePath({
						width: _this.w,
						height: _this.h,
						destWidth: _this.w * _this.pixelRatio * 2,	//乘以像素比*2，防止模糊,
						destHeight: _this.h * _this.pixelRatio * 2,
						canvasId:'myCanvas',
						fileType: 'png',
						success: function(res){
							_this.tempPath = res.tempFilePath;
							_this.isShowSrc = 1;
							uni.hideLoading();
							// console.log(_this)
							// console.log(this)
							// console.log('海报生成成功，临时路径:'+_this.tempPath)
							
							// #ifdef MP-WEIXIN
							
							// 绘制 5:4 的封面图
							uni.showLoading({
								title: '封面图绘制中...',
							})
							var ctx = wx.createCanvasContext('canvas');
							// _this.w: 320, _this.h: 400 图片大小
							var canvasW = _this.w, canvasH = _this.h;
							// 宽长比不等于5:4
							if (_this.w / _this.h != 5 / 4) {
								canvasW = parseInt(_this.h * 5 / 4);
							}
							console.log('5:4画布宽高:', canvasW, canvasH);
							// 将图片绘制到画布
							// ctx.drawImage(_this.tempPath, 0, 0, canvasW, canvasH)
							// (canvasW - _this.w) / (2或4) : 使图片居中显示
							ctx.drawImage(_this.tempPath, (canvasW - _this.w) / 2.4, 0, _this.w, _this.h)
							// draw()必须要用到，并且需要在绘制成功后导出图片
							// 加个定时器，防止图为黑屏
							ctx.draw(false, setTimeout(() => {
								//  导出图片
								uni.canvasToTempFilePath({
									width: canvasW,
									height: canvasH,
									destWidth: canvasW * _this.pixelRatio,	//乘以像素比，防止模糊,
									destHeight: canvasH * _this.pixelRatio,
									canvasId: 'canvas',
									fileType: 'png',
									success: (res) => {
										// res.tempFilePath为导出的图片路径
										console.log('5:4分享封面图生成成功，临时路径:'+res.tempFilePath)
										_this.clipImage = res.tempFilePath;
										uni.hideLoading();
									}
								})
							}, 500))
							
							// #endif
						}
					})
				}, 1500))
			}, 1000);
		},
		
		// 小程序分享
		onShareAppMessage: function (res) {
			var titleVal = '';
			if (res.from === 'button') {
				// 来自页面内转发按钮
				// console.log(res.target)
				titleVal = '告白小人2D'
			} else if (res.from === 'menu') {
				titleVal = '告白小人2D MP-WEIXIN'
			}
			return {
				title: titleVal,
				// desc: '最具人气的小程序开发联盟!',
				path: '/pages/index/index',
				// imageUrl: '../../static/images/pitch_on.png',
				imageUrl: this.clipImage,
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
			backButton() {
				uni.navigateBack();
			},
			
			// #ifdef APP-PLUS
			openShare: function () {
				console.log('分享');
				this.layer = true;
			},
			exitShare: function() { // 退出分享
				this.layer = false;
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
						imageUrl: this.tempPath,
						success: function (res) {
							console.log("success:" + JSON.stringify(res));
							uni.showToast({
								title: '分享成功',
								duration: 2000
							})
						},
						fail: function (err) {
							uni.showToast({
								title: '转发失败:' + err.errMsg,
								icon: 'none'
							})
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			// #endif
			
			// 预览图片
			checkImg: function () {
				uni.previewImage({
					urls: [this.tempPath],
					// longPressActions: {
					// 	itemList: ['发送给朋友', '保存图片', '收藏'],
					// 	success: function(data) {
					// 		console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					// 	},
					// 	fail: function(err) {
					// 		console.log(err.errMsg);
					// 	}
					// }
				});
			},
			
			// 保存图片
			save() {
				if (this.tempPath == '') {
					uni.showToast({
						title: '资源准备中，请稍后...',
						icon: 'none'
					})
					return false;
				}
				uni.showLoading({
					title: '图片生成中...',
				})
				uni.canvasToTempFilePath({
					width: this.w,
					height: this.h,
					destWidth: this.w * this.pixelRatio * 2,	//乘以像素比*2，防止模糊,
					destHeight: this.h * this.pixelRatio * 2,
					canvasId:'myCanvas',
					fileType: 'png',
					success: function(res){
						setTimeout(function() {
							uni.hideLoading()
							// console.log(res.tempFilePath)
							uni.saveImageToPhotosAlbum({
								filePath:res.tempFilePath,
								success : function(res){
									uni.showToast({title : '已保存至相册'})
								}
							})
						}, 1500);
					},
					fail(e) {
						console.log(e);
						uni.showToast({
							title: '生成海报失败',
							icon: 'none'
						});
					}
				})
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
	.main canvas {
		// border: 1px solid #c3c3c3;
		margin: 0 auto;
		// zoom: 80%;
	}
	
	/* 预览图 */
	.previewImg {
		border: 1px solid #FF5369;
		margin: 40px auto;
	}
	.finish {
		position: absolute;
		bottom: 200rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 150rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 16px;
		color: #FF5369;
		border: 1px solid #FF5369;
		border-radius: 100rpx;
		padding: 0 30rpx 0 90rpx;
	}
	.finish .remind {
		position: absolute;
		top: 10rpx;
		left: 10rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-image: url('../../static/images/complete.png');
		background-size: cover;
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
	
	/* #ifdef APP-PLUS */
	/* app分享框 */
	.outerLayer {
		position: fixed;
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
		z-index: 9999;
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
		justify-content: center;
		align-items: center;
	}
	/* 图标 */
	.nvImageMenu .iconList {
		width: 100%;
		height: 100%;
		padding: 0 60rpx;
		justify-content: space-between;
	}
	.nvImageMenu .iconList .iconItem {
		width: 118rpx;
		height: 118rpx;
	}
	/* #endif */
</style>
