<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.name" :key="index" >{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'
	import avatar from '@/img/default.jpg'
    export default {
    	data(){
    		return {
				avatar,
    			baseImgPath,
    		}
    	},
    	created(){
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		mounted () {
			console.log('namesnamesnamesnamesnamesnamesnamesnamesnames')
			console.log(this.$route.name)
		},
    	computed: {
			...mapState(['adminInfo']),
			...mapGetters(['realName'])
    	},
		methods: {
			...mapActions(['getAdminData']),
			...mapMutations(['clearAdminInfo', 'setMenusHasFinished']),
			async handleCommand(command) {
				if (command == 'home') {

					this.$router.push('/manage');

				}else if(command == 'singout'){

					console.log('signout')
					
					const res = await signout()
					if (res.status == 200) {
						this.clearAdminInfo();
						this.setMenusHasFinished(false);
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/login');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		border-bottom:2px solid  #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		margin-bottom: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown{
		float: right;
		span{
			margin-top: 5px;
    		float: left;
    		margin-right: 15px;
		}
		img{
			float: right;
		}
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
