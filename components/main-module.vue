<template>
	<view class="main">
		<movable-area class="content" v-if="suitId == 0">
			<movable-view class="figure figure_man"
			:x="x" :y="y" direction="all" 
			v-for="(item, index) in textLen" :key="index" 
			@change="onChange($event, index)"
			@touchend="onTouchEnd(index)"
			:style="{position: 'absolute', left: ''+item.x+'px', top: ''+item.y+'px'}">
				<image class="manImg" :src="'/static/images/people/people_'+((ManList.length > index) ? (ManList[index]) : (ManList[index%ManList.length]))+'.png'"></image>
				<!-- 当前三元运算符判断修改第一/第五个小人的牌子位置 -->
				<!-- 当前三元运算符：外层判断是否为需调整位置的id，内层判断对应id需设置的位置(left值) -->
				<view class="brand brand_man" :style="{color: ''+ txtColor +'', left: ''+ (ManList[index] == 1 || ManList[index] == 5 || ManList[index%ManList.length] == 1 || ManList[index%ManList.length] == 5 ? (ManList[index] == 1 || ManList[index%ManList.length] == 1 ? 0 : 2) : 5) +'px'}">
					<image :src="brandColor"></image>
					<image class="hand" src="/static/images/hand.png"></image>
					<view class="wenzi">{{ item.text }}</view>
				</view>
			</movable-view>
		</movable-area>
		<movable-area class="content" v-else>
			<movable-view class="figure figure_cat"
			:x="x" :y="y" direction="all" 
			v-for="(item, index) in textLen" :key="index"
			@change="onChange($event, index)"
			@touchend="onTouchEnd(index)"
			:style="{position: 'absolute', left: ''+item.cx+'px', top: ''+item.cy+'px'}">
				<image class="catImg" :src="'/static/images/cat/cat_'+((CatList.length > index) ? (CatList[index]) : (CatList[index%CatList.length]))+'.png'"></image>
				<view class="brand brand_cat" :style="{color: ''+ txtColor +''}">
					<image :src="brandColor"></image>
					<image class="hand" :src="'/static/images/catHand/catHand_'+((CatList.length > index) ? (CatList[index]) : (CatList[index%CatList.length]))+'.png'"></image>
					<view class="wenzi">{{ item.text }}</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textLen: {}, 		// 输入文本
				suitId: null, 		// 套装id
				x: 0, 				// 拖拽元素 x 轴
				y: 0, 				// 拖拽元素 y 轴
				offsetX: 0,			// 最新移动 x 轴坐标
				offsetY: 0,			// 最新移动 y 轴坐标
				offsetX_old: 0,		// 上一次移动的 x 轴坐标
				offsetY_old: 0,		// 上一次移动的 y 轴坐标
				moveObj: [],
				old: {x: 0, y: 0,},
				txtColor: '', 		// 文本颜色
				brandColor: '', 	// 牌子颜色
				ManList: [], 		// 人套装长度
				CatList: [], 		// 猫套装长度
			}
		},
		// 已安装（DOM已准备就绪并放置在页面内）
		mounted () {
			this.suitId = this.$store.state.suit;
			this.textLen = this.$store.state.textArray;
			this.txtColor = this.$store.state.textColor;
			this.brandColor = this.$store.state.brandColor;
			this.testObj = this.$store.state.textArray;
			
			if (this.textLen.length) {
				this.init()
			}
			
			//创建节点选择器
			// var query = wx.createSelectorQuery().in(this);
			// query.selectAll('.figure_man').boundingClientRect(function (rect) {
			// 	console.log(rect[0].height)
			// 	console.log(rect[0].width)
			// 	// this.setData({
			// 	// 	height: rect.width + 'px'
			// 	// })
			// }).exec();
		},
		methods: {
			init () { // 初始化数据
				// 设置拖拽区域信息
				let query = uni.createSelectorQuery().in(this);
				query.select('.main').boundingClientRect(data => {
					// let wrapW = data.width 				// 设置拖拽范围的总宽度
					// let wrapH = Math.ceil(data.height) 	// 设置拖拽范围的总高度
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// this.$store.commit('changeCanvasW', wrapW)
					// this.$store.commit('changeCanvasH', wrapH)
					// console.log('移动框宽高:', this.$store.state.canvasW, this.$store.state.canvasH)
					let wrapX = parseInt(data.left);	// 节点(图层移动框离)页面左侧的距离
					let wrapY = parseInt(data.top);		// 节点(图层移动框离)页面顶部的距离
					this.$store.commit('changeOffsetX', wrapX)
					this.$store.commit('changeOffsetY', wrapY)
					console.log('canvas绘图偏移量:', this.$store.state.offsetX, this.$store.state.offsetY)
				}).exec();
				if (this.suitId === 0) {
					this.ManList = this.$store.state.finalMan;
					console.log(this.ManList)
				} else if (this.suitId === 1) {
					this.CatList = this.$store.state.finalCat;
					console.log(this.CatList)
				}
			},
			onChange: function(e,value) {
				// this.old.x = e.detail.x
				// this.old.y = e.detail.y
				// console.log(value,e)
				this.offsetX = e.target.offsetLeft + e.target.x;
				this.offsetY = e.target.offsetTop + e.target.y;
			},
			onTouchEnd: function(index) {
				// console.log(this.suitId)
				
				// console.log(this.offsetX, this.offsetX_old, this.offsetY, this.offsetY_old)
				// 判断用户是否点击，位置不变则未移动，负责赋值位置信息
				if (this.offsetX == this.offsetX_old && this.offsetY == this.offsetY_old) {
					return false;
				} else {
					this.offsetX_old = this.offsetX;
					this.offsetY_old = this.offsetY;
				}
				
				if (this.$store.state.moveArray.length == 0) {
					this.moveObj = [];
				}
				console.log(index, 'x:'+this.offsetX, 'y:'+this.offsetY)
				var setVal = true;
				var dataArr = [];
				// 未移动时数组为空 -> 第一此插入
				if (this.moveObj == '') {
					if (this.suitId == 0) {
						dataArr[index] = {
							index: index,
							x: this.offsetX,
							y: this.offsetY,
							cx: 0,
							cy: 0,
						}
					} else if (this.suitId == 1) {
						dataArr[index] = {
							index: index,
							x: 0,
							y: 0,
							cx: this.offsetX,
							cy: this.offsetY,
						}
					}
					
					this.moveObj.push(dataArr[index]);
					// console.log(this.moveObj)
					this.$store.commit('changeMove', this.moveObj)
					console.log(this.$store.state.moveArray)
					return;
				}
				// 有数据时 直接循环数组 判断是否存在当前index
				for (var i = 0; i < this.moveObj.length; i++) {
					// 存在表示被二次移动, 更新当前对象的x y坐标
					if (index == this.moveObj[i].index) {
						if (this.suitId == 0) {
							this.moveObj[i].x = this.offsetX;
							this.moveObj[i].y = this.offsetY;
						} else if (this.suitId == 1) {
							this.moveObj[i].cx = this.offsetX;
							this.moveObj[i].cy = this.offsetY;
						}
						setVal = false;
					}
				}
				// 当数组不存在当前index对象时 则创建插入数据
				if (setVal) {
					if (this.suitId == 0) {
						dataArr[index] = {
							index: index,
							x: this.offsetX,
							y: this.offsetY,
							cx: 0,
							cy: 0,
						}
					} else if (this.suitId == 1) {
						dataArr[index] = {
							index: index,
							x: 0,
							y: 0,
							cx: this.offsetX,
							cy: this.offsetY,
						}
					}
					this.moveObj.push(dataArr[index])
				}
				// console.log(this.moveObj)
				this.$store.commit('changeMove', this.moveObj)
				console.log(this.$store.state.moveArray)
			}
		},
		
		//利用计算属性
		computed: {
			listData() {
				return this.$store.state.textArray;
			},
			getTextColor () {
				// return this.$store.getters.getTextColor;
				return this.$store.state.textColor;
			}
		},
		//监听执行
		watch: {
			listData(newval,oldval) {
				// this.textLen = newval
				this.textLen = this.$store.state.textArray
				console.log(this.textLen)
			},
			getTextColor () {
				this.txtColor = this.$store.state.textColor
			},
			'$store.state.brandColor': function () {
				this.brandColor = this.$store.state.brandColor
			},
			// 套装
			'$store.state.suit': function () {
				let index = this.$store.state.suit
				if (index === 0) {
					this.suitId = this.$store.state.suit
					this.ManList = this.$store.state.finalMan;
					console.log('套装类型:'+this.suitId, '当前套装数组:'+this.ManList)
				} else if (index === 1) {
					this.suitId = this.$store.state.suit
					this.CatList = this.$store.state.finalCat;
					console.log('套装类型:'+this.suitId, '当前套装数组:'+this.CatList)
				}
			},
			// ManList
			'$store.state.finalMan': function () {
				this.ManList = this.$store.state.finalMan;
				console.log(this.ManList.length, this.ManList)
			},
			// CatList
			'$store.state.finalCat': function () {
				this.CatList = this.$store.state.finalCat;
				console.log(this.CatList.length, this.CatList)
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 320px;
		height: 100%;
		/* background-color: rgba(255,255,255,.1); */
		
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		/* flex-start:交叉轴的起点对齐, center:交叉轴的中点对齐 */
		align-items: center;
		/* flex-start:与交叉轴的起点对齐 */
		align-content: flex-start;
	}
	
	/* .content:after {
		content: "";
		flex: auto;
		width: 15%;
	} */
	
	.main .figure, .brand, .hand {
		background-size: cover;
	}
	
	/* 人 */
	.main .figure {
		width: 90rpx;
		height: 146rpx;
		font-size: 34rpx;
		font-weight: bold;
		/* color: rgba(19, 55, 99, 1); */
		/* margin-bottom: 40rpx; */
		/* 默认值。没有定位 (重写) */
		position: static;
	}
	.main .figure_cat {
		width: 130rpx;
		height: 130rpx;
		/* margin-bottom: 44rpx; */
	}
	
	.main .figure .manImg {
		width: 90rpx;
		height: 146rpx;
	}
	.main .figure .catImg {
		width: 130rpx;
		height: 130rpx;
	}
	
	/* 牌 */
	.main .brand {
		display: flex;
		width: 72rpx;
		height: 58rpx;
		color: #133763;
		position: absolute;
		/* left: 50%; */
		/* top: 50%; */
		/* 定义项目在主轴上的对齐方式 */
		justify-content: center;
		/* 定义项目在交叉轴上如何对齐 */
		align-items: center;
	}
	
	.main .brand image {
		width: 72rpx;
		height: 58rpx;
	}
	
	.brand_man {
		/* transform: translate(-50%,-12%); */
		left: 5px;
		top: 33px;
	}
	.brand_cat {
		left: 50%;
		top: 50%;
		transform: translate(-70%,-15%);
	}
	
	/* 手 */
	.main .figure .hand {
		width: 76rpx;
		height: 10rpx;
		position: absolute;
		top: 14rpx;
		left: -2rpx;
	}
	
	.wenzi {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-55%);
	}
</style>
