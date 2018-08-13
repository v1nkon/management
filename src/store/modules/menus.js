import {
    getUserInfo,
    getMenuInfo,
    isSuper
} from '@/api/getData';
import router, { asyncRoutes } from '../../router'
const state = {
    menusHasFinished: false,
    menu: [],
    permission: [],
    userInfo: {},
    menuInfo:{

    },
    authObj: {

    },
    isSuper:false,
    permission: ['/login', '/manage', '/userInfo', '/explain', '/', '']
}

const getters = {
    realName: state => state.userInfo.realName
}
const arrayToTreeData = (data, id) => {

    let dataTemp = [];

    data.forEach((item, index) => {
        if (item.parentId == id) {

            let children = arrayToTreeData(data, item.adMenuId)
            let uniqulId = item.adMenuId + '^_^' + item.name
            dataTemp.push({
                url:item.url,
                name:item.name,
                seqNo:item.seqNo,
                children: children
            })
        }
    })

    return dataTemp;
}
const mutations = {

    classifyMenu(state, menu) {
        let authObj = {}
        menu = arrayToTreeData(menu, 0)
        menu.sort( (a, b) => b.seqNo - a.seqNo )
        menu.forEach( item => {
            item.children.sort( (a, b) => a.seqNo - b.seqNo )
            item.children.forEach( (item2) => {
                let obj = {}
                state.permission.push(item2.url)
                item2.children.forEach( (item3) => {
                    obj[item3.url] = true
                } )
                authObj[item2.url] = {...obj}
            })
        } )
        state.menu = menu
        state.authObj = authObj
    },
    saveUserInfo(state, payload) {
        state.userInfo = payload
    },
    setMenu(state, payload) {
        state.menu[payload.type] = [...payload.children]
    },
    setMenusHasFinished(state, payload) {
        state.menusHasFinished = payload
    },
    addRouter(state, { router, asyncRoutes }){
		asyncRoutes.children = asyncRoutes.children.filter( item => state.permission.indexOf(item.path) != -1 )
		router.addRoutes([asyncRoutes])
    },
    setIsSuper(state, payload){
        state.isSuper = payload
    }
}

const actions = {
    async initMenus({
        commit,
        state,
        dispatch
    }, callback) {
        let {
            data
        } = await getUserInfo()
        let menus = data ? data.menus : []
        let realName = data && data.realName
        commit('saveUserInfo', data)
        commit('classifyMenu', menus)
        commit('addRouter', { router, asyncRoutes})
        commit('setMenusHasFinished', true)
        dispatch('getIsSuper')
        callback && callback()
    },
    async getIsSuper({
        commit,
        state,
        dispatch
    }) {
        let {data} = await isSuper()
        commit( 'setIsSuper', data )
    },
    async getMenuAuth({
        commit,
        state,
        dispatch
    }, to) {
        if(to.meta.length == 0){
            let result = state.authObj[to.path] || {}
            to.meta.push(result)
        }
        return Promise.resolve()
    },
    async getUserInfo({
        commit,
        state,
        dispatch
    }, callback) {
        let {
            data
        } = await getUserInfo()
        commit('saveUserInfo', data)
        return Promise.resolve()
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
