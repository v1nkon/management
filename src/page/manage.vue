<template>
	<div class="manage_page fillcontain">
		<el-row>
			<el-col>
				<main-header></main-header>
			</el-col>
		</el-row>
		<el-row style="height: calc(100% - 80px);">
	  		<el-col :span="4"  style="height: 100%;overflow:auto; background-color: #324057;">
				<el-menu :default-active="$route.path" mode="vertical" background-color="#324057" text-color="#fff"  style="min-height: 100%;border:0;" router>
					<el-submenu v-if="menu[1] && menu[1].children.length" index="2">
						<template slot="title"><i class="el-icon-document"></i>{{menu[1].name}}</template>
						<!--<el-menu-item index="userList">用户管理</el-menu-item>-->
						<!-- <el-menu-item index="/summaryList">会议纪要管理</el-menu-item>
						<el-menu-item index="/requireList">需求管理</el-menu-item>
						<el-menu-item index="/productList">产品管理</el-menu-item> -->
						<el-menu-item v-for="(item, index) in menu[1].children"
						      :index="item.url"
							  :key="index"
						      v-html="item.name"></el-menu-item>
					</el-submenu>
					<el-submenu v-if="menu[0] && menu[0].children.length" index="10">
						<template slot="title"><i class="el-icon-document"></i>{{menu[0].name}}</template>
						<el-menu-item v-for="(item, index) in menu[0].children"
						      :index="item.url"
							  :key="index"
						      v-html="item.name"></el-menu-item>
						<!-- <el-menu-item index="/summaryStatus">状态管理</el-menu-item> -->
					</el-submenu>
					<el-submenu index="20">
						<template slot="title"><i class="el-icon-warning"></i>设置</template>
						<el-menu-item index="/explain">说明</el-menu-item>
						<el-menu-item index="/userInfo">个人信息中心</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view :key="key"></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import mainHeader from '../components/mainHeader'
	import {mapState, mapMutations} from 'vuex'
    export default {
		data(){
			return {
				expires: Date.now(),
			}
		},
		created(){
	
		},
		mounted () {
			window.onunload = ()=>{
				console.log( '============================================' );
				this.$confirm('sdf')
			}
			
		},
		components: {
			mainHeader,
		},
		methods: {
			compareDate( newVal ){
				if ( newVal - this.expires > 10 * 1000 && !this.isLogOut ) {
					this.expires = Date.now();
				}
			}
		},
		computed: {
			// ...mapState(['menu']),
			...mapState({
				menu : state => state.menus.menu,
				isLogOut: state => state.isLogOut,
        	}),
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
			key(newVal){
				console.log(this.$route.path);
				this.compareDate( Date.now() );
				return this.$route.path + "-" + this.expires
			}
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
	.el-submenu .el-menu-item {
		min-width: 180px;
	}
</style>
