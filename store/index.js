import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// textArray: ["写", "下", "你", "想", "说", "的", "一", "些", "话", ",", "小", "人", "可", "随", "意", "拖","拽"],
		// 文字数组与小人初始位置
		textArray: [
			// 第一排 x:0+45+10 , cx: 0+65+20 , cy: 0+65+15
			{
				text: '写',
				x: 0,
				y: 0,
				cx: 0,
				cy: 0
			},
			{
				text: '下',
				x: 55,
				y: 0,
				cx: 85,
				cy: 0
			},
			{
				text: '你',
				x: 110,
				y: 0,
				cx: 170,
				cy: 0
			},
			{
				text: '想',
				x: 165,
				y: 0,
				cx: 255,
				cy: 0
			},
			{
				text: '说',
				x: 220,
				y: 0,
				cx: 0,
				cy: 80
			},
			{
				text: '的',
				x: 275,
				y: 0,
				cx: 85,
				cy: 80
			},
			// 第二排 y: 73+20
			{
				text: '一',
				x: 0,
				y: 93,
				cx: 170,
				cy: 80
			},
			{
				text: '些',
				x: 55,
				y: 93,
				cx: 255,
				cy: 80
			},
			{
				text: '话',
				x: 110,
				y: 93,
				cx: 0,
				cy: 160
			},
			{
				text: '小',
				x: 165,
				y: 93,
				cx: 85,
				cy: 160
			},
			{
				text: '人',
				x: 220,
				y: 93,
				cx: 170,
				cy: 160
			},
			{
				text: '可',
				x: 275,
				y: 93,
				cx: 255,
				cy: 160
			},
			// 第三排 y: (73+20)*2
			{
				text: '随',
				x: 0,
				y: 186,
				cx: 0,
				cy: 240
			},
			{
				text: '意',
				x: 55,
				y: 186,
				cx: 85,
				cy: 240
			},
			{
				text: '拖',
				x: 110,
				y: 186,
				cx: 170,
				cy: 240
			},
			{
				text: '拽',
				x: 165,
				y: 186,
				cx: 255,
				cy: 240
			},
			// {text:'拽', x:220, y:186, cx: 0, cy: 320},
			// {text:'写', x:275, y:186, cx: 85, cy: 320},
			// 第四排
			// {text:'下', x:0,   y:279, cx: 170, cy: 320},
			// {text:'你', x:55,  y:279, cx: 255, cy: 320}
		],
		moveArray: [],			// 小人移动位置集合 (动态改变)
		windowsW: 0, 			// 屏幕宽度 (画布宽)
		windowsH: 0, 			// 屏幕高度 (画布高)
		offsetX: 0,				// 绘图 x轴 偏移量 (移动框相对屏幕左边距离)
		offsetY: 0,				// 绘图 y轴 偏移量
		textColor: '#133763',	// 文本颜色
		brandColor: '/static/images/brand/brand_1.png',	// 牌子图片(颜色)
		bgColor: '#FF8D8D', 	// 背景颜色
		bgTheme: '', 			// 主题背景
		suit: 0, 				// 套装类型
		textLength: 24, 		// 文本长度
		finalCat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],	// 套装(猫)
		// finalMan: [1,2,3,4,5,6,7,8,9,10,11,12],
		finalMan: [4],			// 套装(人) [1,4,5]
		shareLayer: false,		// 分享遮罩层
		// token: '',
	},
	// getters: {
	// 	getTextColor: state => {
	// 		return state.textColor;
	// 	}
	// },
	mutations: {
		changeMsg(state, msg) {
			state.textArray = msg
		},
		changeTextColor(state, msg) {
			state.textColor = msg
		},
		changeBrandColor(state, msg) {
			state.brandColor = msg
		},
		changeBgColor(state, msg) {
			state.bgColor = msg
			state.bgTheme = '../../static/images/bgdj.png';
		},
		changeBgTheme(state, msg) {
			state.bgTheme = '../../static/images/theme/' + (msg + 1) + '.png'
		},
		changeSuitType(state, msg) {
			state.suit = msg
		},
		changeFinalCat(state, msg) {
			state.finalCat = msg
		},
		changeFinalMan(state, msg) {
			state.finalMan = msg
		},
		changeShareLayer: (state, msg) => {
			state.shareLayer = msg
		},

		changeWindowsW: (state, msg) => {
			state.windowsW = msg
		},
		changeWindowsH: (state, msg) => {
			state.windowsH = msg
		},
		changeOffsetX: (state, msg) => {
			state.offsetX = msg
		},
		changeOffsetY: (state, msg) => {
			state.offsetY = msg
		},

		changeMove: (state, msg) => {
			state.moveArray = msg
		},

		changeTextLen: (state, msg) => {
			state.textLength = msg
		},
		// changeTextColor: (state, msg) => {state.textColor = msg},
	}
})

export default store
