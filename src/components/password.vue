
<template>
    <el-dialog title="修改密码" :visible.sync="dialogShow">
        <el-form :model="passwordInfo" :rules="passwordInfoRules" ref="passwordForm">
            <el-row>
                <el-col>
                    <el-form-item label="密码" label-width="120px" prop="password">
                        <el-input type="password" v-model="passwordInfo.password" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="请再次输入密码" label-width="120px" prop="password2">
                        <el-input type="password" v-model="passwordInfo.password2" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitUserPassword('passwordForm')" v-html="'修 改'"></el-button>
        </div>
    </el-dialog>
</template>

<script>
import mixin from '@/page/mixin/mixin'
import { updatePwd } from '@/api/getData'
export default {
    mixins: [mixin],
    props: {
        adUserId: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            dialogShow: false,
            passwordInfo: {
                password: '',
                password2: '',
                adUserId: ''
            },
            passwordInfoRules: {
                password: [
                    { validator: this.validatePass, trigger: 'blur' }
                ],
                password2: [
                    {validator: this.validatePass2, trigger: 'blur'}
                ],
            }
        }
    },
    computed: {
        dialogShowSelf(){
            return this.dialogShow
        }
    },
    methods: {
        initData(){
        
        },
        openUpdatePwd(){
            this.dialogShow = true
        },
        submitUserPassword(formName){
            let params = Object.assign({},this.passwordInfo, { adUserId: this.adUserId })
            this.handleSubmit(formName, params, updatePwd, updatePwd, "修改成功").then(
                () => {
                    this.dialogShow = false
                    this.$emit( 'callback' )
                }
            )
        },
        
    }
}
</script>

<style>

</style>