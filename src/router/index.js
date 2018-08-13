import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login/login')), 'login');

//  主页面
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home');

//table

const summaryList = resolve => require(['@/page/table/summary/summaryList'],resolve)
const requirement = r => require.ensure([], () => r(require('@/page/table/requirement')), 'requirement');
const productList = r => require.ensure([], () => r(require('@/page/table/productList')), 'productList');
const projectList = r => require.ensure([], () => r(require('@/page/table/projectList')), 'projectList');
const moduleList = resolve => require(['@/page/table/moduleList'],resolve)
const command = r => require.ensure([], () => r(require('@/page/table/command')), 'command');
const task = r => require.ensure([], () => r(require('@/page/table/task')), 'task');
const fault = r => require.ensure([], () => r(require('@/page/table/fault')), 'fault');
const consideration = r => require.ensure([], () => r(require('@/page/table/consideration')), 'consideration');

//base
const summaryStatus = resolve => require(['@/page/base/summaryStatus'],resolve)
const adUser = resolve => require(['@/page/base/adUser'],resolve)
const adMenu = resolve => require(['@/page/base/adMenu'],resolve)
const adRole = resolve => require(['@/page/base/adRole'],resolve)
const adTable = resolve => require(['@/page/base/adTable'],resolve)
const org = r => require.ensure([], () => r(require('@/page/base/org')), 'org');


const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const userInfo = resolve => require(['@/page/userInfo'],resolve)


export const routes = [
	{
		path: '/login',
		component: login,
	},
	{
		path: '/',
		redirect: '/login',
	},
]
export const asyncRoutes = 
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [
			{
				path: '',
				refer: 'home',
				component: home,
				name:'all',
				meta: [],
			},
			{
				path: '/userInfo',
				refer: 'user',
				component: userInfo,
				meta:[],
				name: ['个人信息中心']
			},

			{
				path: '/summaryList',	
				component: summaryList,
				refer: 'main',
				titles:['系统数据管理', '会议纪要信息列表'],
				name: ['系统数据管理', '会议纪要信息列表'],
				meta: []
			},
			{
				path: '/requirement',
				component: requirement,
				refer: 'main',
				name: ['系统数据管理', '需求信息列表'],
				meta: []
			},
			{
				path: '/productList',
				component: productList,
				refer: 'main',
				name: ['系统数据管理', '产品信息列表'],
				meta: []
			},
			{
				path: '/projectList',
				component: projectList,
				refer: 'main',
				name: ['系统数据管理', '项目信息列表'],
				meta: []
			},
			{
				path: '/moduleList',
				component: moduleList,
				refer: 'main',
				name: ['系统数据管理', '模块列表'],
				meta: []
			},
			{
				path: '/command',
				component: command,
				refer: 'main',
				name: ['系统数据管理', '命令指令管理'],
				meta: []
			},
			{
				path: '/task',
				component: task,
				refer: 'main',
				name: ['系统数据管理', '任务'],
				meta: []
			},
			{
				path: '/fault',
				component: fault,
				refer: 'main',
				name: ['系统数据管理', '故障单管理'],
				meta: []
			},
			{
				path: '/consideration',
				component: consideration,
				refer: 'main',
				name: ['系统数据管理', '计划与思考'],
				meta: []
			},
			

			
			{
				path: '/summaryStatus',
				component: summaryStatus,
				refer: 'base',
				name: ['系统数据管理', '会议状态管理'],
				meta: []
			},
			{
				path: '/adUser',
				component: adUser,
				refer: 'base',
				name: ['系统基础表', '用户表'],
				meta: []
			},
			{
				path: '/adMenu',
				component: adMenu,
				refer: 'base',
				name: ['系统基础表', '菜单表'],
				meta: []
			},
			{
				path: '/adRole',
				component: adRole,
				refer: 'base',
				name: ['系统基础表', '角色表'],
				meta: []
			},
			{
				path: '/adTable',
				component: adTable,
				refer: 'base',
				name: ['系统基础表', '系统表'],
				meta: []
			},
			{
				path: '/org',
				component: org,
				refer: 'base',
				name: ['系统基础表', '组织表'],
				meta: []
			},

			{
				path: '/explain',
				component: explain,
				refer:'intro',
				names: ['说明', '说明'],
				meta:[],
			},
		]
	}


const router = new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})


export default router
