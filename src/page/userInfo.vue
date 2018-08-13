<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-row>
                <el-col :span="12">
                    <div class="user-info">
                        <el-form :model="userInfo" :rules="userInfoRules" ref="userInfoForm">
                            <el-row>
                                <el-col>
                                    <el-form-item label="登录名" label-width="100px" prop="name">
                                        <el-input v-show="!!isUpdate" v-model="userInfo.loginName" auto-complete="off"></el-input>
                                        <span v-show="!!!isUpdate" v-html="userInfo.loginName"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="密码" label-width="100px">
                                        <span> ****** </span>
                                        <a v-if="!isSuper" @click="updateUserPassword(userInfo.adUserId)" href="javascript:void(0)">修改密码 </a>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="昵称" label-width="100px" prop="name">
                                        <el-input v-show="isUpdate" v-model="userInfo.name" auto-complete="off"></el-input>
                                        <span v-show="!isUpdate" v-html="userInfo.name"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="真实名称" label-width="100px" prop="name">
                                        <el-input v-show="isUpdate" v-model="userInfo.realName" auto-complete="off"></el-input>
                                        <span v-show="!isUpdate" v-html="userInfo.realName"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="邮箱" label-width="100px">
                                        <el-input v-show="isUpdate" v-model="userInfo.email" auto-complete="off"></el-input>
                                        <span v-show="!isUpdate" v-html="userInfo.email"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="手机号码" label-width="100px">
                                        <el-input v-show="isUpdate" v-model="userInfo.mobile1" auto-complete="off"></el-input>
                                        <span v-show="!isUpdate" v-html="userInfo.mobile1"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="部门名称" label-width="100px">
                                        <span v-html="userInfo.adOrgName"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="角色名称" label-width="100px">
                                        <span v-html="userInfo.adRole && userInfo.adRole.name"> </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <div slot="footer" class="dialog-footer" v-if="!isSuper">
                            <el-button size="small" type="primary" v-show="!isUpdate" @click="updateUserInfo" v-html="'修 改'"></el-button>
                            <el-button size="small" type="primary"  v-show="isUpdate" @click="submitUserInfo('userInfoForm')" v-html="'保 存'"></el-button>
                            <el-button size="small" type="primary" v-show="isUpdate" @click="calcelUserInfo('userInfoForm')" v-html="'取 消'"></el-button>
                        </div>
                    </div>
                </el-col>
                <!-- <el-col :span="12">
                    <el-tree :show-checkbox="true" :default-expand-all="true" ref="responsibleTree" :data="userTreeArray" node-key="uniqulId" :default-expanded-keys="[0]" :highlight-current="true">
                    </el-tree>
                </el-col> -->
            </el-row>
            <passworld
                ref="pwdDialog"
                :ad-user-id = "adUserId"
                @callback="updatePwdCallback"
            />
        </div>
    </div>
</template>

<script>
import mixin from './mixin/mixin'
import userTree from './mixin/userTree'
import validate from './mixin/validate.js'
import passworld from '@/components/password' 
import { mapState, mapActions } from 'vuex'
import { updateUserInfo, updatePwd } from '@/api/getData' 
export default {
    mixins: [mixin, validate, userTree],
    data() {
        return {
            toggle: false,
            userInfo: {

            },
            adUserId: 0,
            userInfoRules: {
                name: [
                    { required: true, message: '名称必填', trigger: 'blur' },
                ],
                mobile1: [
                    {validator: this.checkPhone, trigger: 'blur'}
                ],
                email: [
                    {validator: this.checkEmail, trigger: 'blur'}
                ]
            },
        }
    },
    computed: {
        ...mapState({
            userInfoStore : state => state.menus.userInfo,
            isSuper: state => state.menus.isSuper
        }),
    },
    created () {
        this.getUserTree()
        this.userInfo = Object.assign( {} , this.userInfoStore)
    },
    methods: {
        ...mapActions(['getUserInfo', 'logOut']),
        initData() {
            // this.getIsSuper()
        },
        updateUserInfo(){
            this.handleUpdate()
        },
        submitUserInfo(formName) {
            let params = Object.assign({},this.userInfo)
            this.handleSubmit(formName, params, updateUserInfo, updateUserInfo, "修改成功").then(() => {  this.handleAdd(); this.getUserInfo(); })
        },
        calcelUserInfo(){
            this.handleAdd()
        },
        updateUserPassword(adUserId){
            this.adUserId = adUserId
            this.$refs.pwdDialog.openUpdatePwd()
        },
        updatePwdCallback(){
            this.logOut().then( ()=> this.$router.push('login') )
        },
    },
    components: {
        passworld
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.explain_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}
.user-info{
    padding: 20px 100px;
    border-radius: 5px;
    display: flex;
}
</style>
