<template>
	<div class="login_page fillcontain" v-loading="logLoading">
		<section class="box_contianer" v-show="showLogin" >
			<transition name="from-header-fade" mode="in-out">
				<div class="manage_tip" v-show="showLogin">
					<p>项目需求管理系统</p>
				</div>
			</transition>
			<transition name="form-fade" mode="in-out">
				<div class="el-form-container form_contianer" v-show="showLogin">
					<el-form v-show="showLogin" :model="loginForm" @keyup.native.13="submitForm('loginForm')" :rules="rules" ref="loginForm">
						<el-form-item prop="loginName">
							<el-input v-model="loginForm.loginName" autofocus placeholder="用户名">
								<span>dsfsf</span>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
						</el-form-item>
					</el-form>
					<p class="tip" style="display:none">温馨提示：</p>
					<p class="tip" style="display:none">未登录过的新用户，自动注册</p>
					<p class="tip" style="display:none">注册过的用户可凭账号密码登录</p>

				</div>
				
			</transition>

		</section>

	</div>
</template>

<script>
import mixin from '../mixin/mixin'
import { login, getAdminInfo } from '@/api/getData'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
	mixins: [mixin],
	data() {
		return {
			loginForm: {
				loginName: '',
				password: '',
			},
			rules: {
				loginName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
			},
			showLogin: false,
			logLoading: false
		}
	},
	mounted() {
		this.showLogin = true;
		console.log(this.adminInfo)
	},
	computed: {
		...mapState(['adminInfo', 'isLogOut']),
		...mapState({
            menusHasFinished : state => state.menus.menusHasFinished
        })
	},
	methods: {
		...mapActions(['initMenus']),
		...mapMutations(['saveToken', 'setMenusHasFinished', 'setIsLogOut']),
		initData(){
			
		},
		async submitForm(formName) {
			this.setMenusHasFinished(false)
			let params = Object.assign({},this.loginForm)
			this.logLoading = true;
            this.handleSubmit(formName, params, login, login, "登陆成功").then(( res ) => {
				this.logLoading = false;
				this.setIsLogOut(false);
				this.saveToken({...res});
				this.initMenus();
			}, ()=> { this.logLoading = false; })
		},
		getAdminInfo(){
			
		},
		initData(){}
	},
	watch: {
		adminInfo: function(newValue) {
			if (newValue.id) {
				this.$message({
					type: 'success',
					message: '检测到您之前登录过，将自动登录'
				});
				this.$router.push('manage')
			}
		},
		menusHasFinished: function(flag){
			if(flag){
				let historyRouter = sessionStorage.getItem('historyRouter') || ''
				historyRouter = historyRouter.slice(1)
				if(historyRouter && historyRouter != 'login' ){
					sessionStorage.removeItem('historyRouter')
					this.$router.push(historyRouter);
				}else{
					this.$router.push('manage');
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../style/mixin';
.login_page {
	background-color: #324057;
}

.manage_tip {
	width: 100%;
	margin-bottom: 30px;
	p {
		font-size: 34px;
		color: #fff;
	}
}
.box_contianer {
	.wh(370px, 300px);
	.ctp(370px, 300px);
	padding: 25px;
	border-radius: 5px;
	text-align: center;
	.submit_btn {
		width: 100%;
		font-size: 16px;
	}
}
.form_contianer {
	.wh(320px, 210px);
	padding: 25px;
	border-radius: 5px;
	text-align: center;
	background-color: #fff;
	.submit_btn {
		width: 100%;
		font-size: 16px;
	}
}

.tip {
	font-size: 12px;
	color: red;
}
.from-header-fade-enter-active,
.from-header-fade-leave-active {
	transition: all 1s;
}

.from-header-fade-enter,
.from-header-fade-leave-active {
	transform: translate3d(0, -50px, 0);
	opacity: 0;
}

.form-fade-enter-active,
.form-fade-leave-active {
	transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
	transform: translate3d(0, 50px, 0);
	opacity: 0;
}
</style>
