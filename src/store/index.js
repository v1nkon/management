import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo, signout} from '@/api/getData'
import {
    Message
} from 'element-ui'
import summary from './modules/summary'
import menus from './modules/menus'
Vue.use(Vuex)

const state = {
	autoIncrement: 0 ,
	isUpdate:false,
	MAX_GAP: 1000 * 60 * 3,
	gap: Date.now(),
	expires: '',
	adminInfo: {avatar: 'default.jpg'},
	slideLimits: {
		
	},
	addRoutes:[],
	menu:{
		table:[
			{
				name: '会议纪要管理',
				url: '/summaryList'
			},
			{
				name: '需求管理',
				url: '/requirement'
			},
			{
				name: '产品管理',
				url: '/productList'
			},
			{
				name: '项目管理',
				url: '/projectList'
			},
			{
				name: '故障单',
				url: '/fault'
			},
			{
				name: '命令指令',
				url: '/command'
			},
			{
				name: '任务',
				url: '/task'
			}
		],
		base:[
			{
				name:'状态管理',
				url: '/summaryStatus'
			},
			{
				name:'用户表',
				url: '/adUser'
			},
			{
				name:'菜单表',
				url: '/adMenu'
			},
			{
				name: '组织表',
				url: '/org'
			},
			{
				name: '角色表',
				url: '/adRole'
			}
			
		]
	},
	roles:'',
	isLogOut: false
}

const mutations = {
	setAutoIncrement( state ){
		state.autoIncrement += 1
	},
	setIsLogOut( state, bool ){
		state.isLogOut = bool
	},
	setGap(state, payload){
		state.expires = payload - state.gap
		state.gap = payload
    },
	saveToken(state, adminInfo){
		// state.adminInfo = adminInfo;
		Object.assign( state.adminInfo, adminInfo )
		sessionStorage.setItem( 'TOKEN', adminInfo.token );
	},
	clearAdminInfo(state){
		state.adminInfo = {avatar: 'default'}
		sessionStorage.removeItem('TOKEN')
	},
	addMenus(state, menus){
		state.menu.table.unshift(...menus)
	},
	setUpdate(state, isUpdate){
		state.isUpdate = isUpdate
	}
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			console.log('==============================')
			console.log(res)
			if (res.status == 200) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	async logOut( { commit, dispatch, state } ){
		const res = await signout()
		if (res.status == 200) {
			commit( 'clearAdminInfo' )
			commit( 'setMenusHasFinished' , false)
			Message.success({
				message: '退出成功'
			})
			return Promise.resolve()
		}else{
			Message.Error({
				message: '失败'
			})
			return Promise.reject()
		}
	}
}
const getters = {

}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {
		summary,
		menus
	}
})