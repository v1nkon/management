<template>
    <div class="fillcontain">
        <div class="table_container" style="height: calc( 100% - 40px );">
            <head-top></head-top>
                <el-col :span="24" class='actions-top' v-show="isNotParent">
                    <el-form class="demo-form-inline">
                        <el-form-item>
                            <el-button size="small" type="primary" @click.stop="addUser">新增用户</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            
            <el-row :gutter="5" style="height: calc( 100% - 108px );">
                <el-col :span="4" style="height: 100%; overflow: auto">
                    <aside-tree 
                        :node-click= "handleNodeClick"
                    />
                </el-col>
                <el-col :span="20">
                    <el-table 
                        height="700"
                        border
                        :data="tableData" 
                        :highlight-current-row="true" 
                        style="width: 100%" 
                        v-loading="userLoading" 
                        @sort-change="handleSort">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="编号">
                                        <span>{{ props.row.code }}</span>
                                    </el-form-item>
                                    <el-form-item label="组织名称">
                                        <span>{{ props.row.assignmentOrgName }}</span>
                                    </el-form-item>
                                    <el-form-item style="width:100%" label="可访问菜单名" label-width="120px">
                                        <span>{{ props.row.menuNames }}</span>
                                    </el-form-item>
                                    <el-form-item label="手机号1">
                                        <span>{{ props.row.mobile1 }}</span>
                                    </el-form-item>
                                    <el-form-item label="手机号2">
                                        <span>{{ props.row.mobile2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="座机">
                                        <span>{{ props.row.telePhone }}</span>
                                    </el-form-item>
                                    <el-form-item label="邮箱">
                                        <span>{{ props.row.email }}</span>
                                    </el-form-item>
                                    
                                    <el-form-item label="修改时间">
                                        <span>{{ props.row.updated }}</span>
                                    </el-form-item>
                                    <el-form-item label="修改人">
                                        <span>{{ props.row.updatedByName }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="登陆名" align="center" prop="loginName"> </el-table-column>
                        <el-table-column label="角色名" align="center" prop="roleName"> </el-table-column>
                        <el-table-column label="昵称" align="center" prop="name"> </el-table-column>
                        <el-table-column label="真实名" align="center" prop="realName"> </el-table-column>
                        <el-table-column label="是否员工" align="center" prop="isEmployeeCN"> </el-table-column>
                        <!-- <el-table-column label="组织名称" align="center" prop="adOrgName"> </el-table-column> -->
                        <el-table-column label="邮箱" align="center" prop="email"> </el-table-column>
                        <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                        <el-table-column label="创建时间" width="210" sortable="custom" align="center" prop="created"> </el-table-column>

                        <el-table-column label="操作" align="center" width="170">
                            <!--fixed="right"-->
                            <template slot-scope="scope">
                                <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                                <el-button size="mini" type="primary" @click="updateUser(scope.row)">修改</el-button>
                                <el-button size="mini" type="danger" @click="deleteUserConfirm(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination @current-change="handleUserCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

            <el-dialog v-loading="selectInited"  :title="isUpdate ? '修改用户' : '添加用户'" :visible.sync="dialogShow">
                <el-form :model="userInfo" :rules="userInfoRules" ref="UserForm">

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="登陆名" label-width="100px" prop="loginName">
                                <el-input v-model="userInfo.loginName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="12" v-if="!isUpdate">
                            <el-form-item label="密码" label-width="100px" prop="password">
                                <el-input type="password" v-model="userInfo.password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-else>
                            <el-form-item label="密码" label-width="100px">
                                <span> ****** </span>
                                <a v-if="isSuper" @click="updateUserPassword(userInfo.adUserId)" href="javascript:void(0)">修改密码 </a>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="角色名" label-width="100px" prop="roleId">
                                <el-select v-model="userInfo.roleId">
                                    <el-option v-for="item in selectRoleData" :key="item.adRoleId" :label="item.name" :value="item.adRoleId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="12">
                            <el-form-item label="真实名" label-width="100px" prop="realName">
                                <el-input v-model="userInfo.realName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否员工" label-width="100px">
                                <el-switch v-model="userInfo.isEmployee" active-text="是" inactive-text="否" active-value="Y" inactive-value="N"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="userInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="昵称" label-width="100px">
                                <el-input v-model="userInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="组织" label-width="100px">
                                <el-input @click.native="openOrgTree" :readonly="true" v-model="userInfo.assignmentOrgName"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="手机1" label-width="100px" prop="mobile1">
                                <el-input v-model="userInfo.mobile1" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机2" label-width="100px">
                                <el-input v-model="userInfo.mobile2" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="邮箱" label-width="100px" prop="email">
                                <el-input v-model="userInfo.email" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="座机" label-width="100px">
                                <el-input v-model="userInfo.telephone" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitUser('UserForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>

            </el-dialog>
            <el-dialog :append-to-body="true"  title="选择组织" :visible.sync="orgTree" ref="orgTree">

                <aside-tree 
                    :node-click = "selectOrg"
                    :expand = "true"
                />

            </el-dialog>
            <passworld
                ref="pwdDialog"
                :ad-user-id = "adUserId"
                @callback="updatePwdCallback"
            />
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import asideTree from '@components/asideTree'
import passworld from '@/components/password' 
import validate from '../mixin/validate.js'
import { getOrgTreeData, updateUser, deleteUser, addUser, getUser, getChildStatu,getRole } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, validate],
    data() {
        return {
            maxPage: 9999,
            pwdDialogShow:false,
            adUserId: 0,
            isNotParent:false,
            orgTree:false,
            assignmentOrgId:0,
            adOrgName: '顶层',
            userLoading: true,
            dialogShow: false,
            selectInited: true,
            userInfo: {
                name: '',
                realName: '',
                mobile1: '',
                mobile2: '',
                telephone: '',
                password: '',
                isEmployee: '',
                isActive: '',
                email: '',
                roleId:0,
                roleName:''
            },
            userInfoRules: {
                loginName: [
                    {required:true, validator: this.checkName, trigger: 'blur'},                    
                ],
                roleId: [
                    {required:true, message: '角色必选', trigger: 'blur'},                    
                ],
                mobile1: [
                    {validator: this.checkPhone, trigger: 'blur'}
                ],
                mobile2: [
                   {validator: this.checkPhone, trigger: 'blur'}
                ],
                email: [
                    {validator: this.checkEmail, trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
            },
            tableData: [],
            selectRoleData: []
        }
    },
    computed: {
        ...mapState({
            isSuper: state => state.menus.isSuper
        }),
    },
    methods: {
        initData() {
            this.getUser();
            this.initSelectRoleData();
        },
        async getUser(id = 0) {
            this.tableData = []
            this.userLoading = true
            this.handleGet(this.tableData, getUser, this.pagin, id).then(() => {
                this.userLoading = false
                this.tableData.forEach(item => {
                    let menuNames = []
                    let { adRole, menus, adOrg} = item
                    if(menus){
                        menus.forEach( (menu) => {
                            menuNames.push(menu.name)
                        } )
                        item.menuNames = menuNames.join(',')
                    }
                    item.isEmployeeCN = item.isEmployee === 'N' ? '否' : '是'
                    if(adRole){
                        Object.assign( item, {roleId: adRole.adRoleId, roleName: adRole.name} )
                    } 
                    if(adOrg){
                        Object.assign( item, {assignmentOrgId: adOrg.adOrgId, assignmentOrgName: adOrg.name} )
                    }
                })
            })
        },

        addUser() {
            this.userInfo = {
                assignmentOrgName : this.assignmentOrgName,
                assignmentOrgId: this.assignmentOrgId
            }
            this.dialogShow = true
            this.handleAdd()
        },
        deleteUserConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteUser(row.adUserId) })
        },
        async deleteUser(ids) {
            this.handleDelete(ids, deleteUser, () => { this.getUser() });
        },
        updateUser(row) {
            this.dialogShow = true
            this.handleUpdate(this.userInfo, row)
        },
        submitUser(formName) {
            let params = Object.assign({}, this.userInfo)
            this.handleSubmit(formName, params, addUser, updateUser).then( () => { this.dialogShow = false; this.getUser() } )
        },
        handleUserCurrentChange(current) {
            this.pagin.currentPage = current
            this.getUser()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getUser()
        },
        handleNodeClick(data, node, el){
            let { id, label } = data
            this.getUser( id )
            if(id !== 0 ) {
                this.isNotParent = true
            }else{
                this.isNotParent = false
            }
        },
        openOrgTree(){
            this.orgTree = true
            this.$refs.orgTree.style.zIndex = 2000
        },
        selectOrg( data, node, el ){

            let {id, label} = data

            this.userInfo.assignmentOrgId = id
            this.userInfo.assignmentOrgName = label
            this.orgTree = false
        },
        initSelectRoleData() {
            this.selectRoleData = []
            this.handleGet(this.selectRoleData, getRole, {pageSize: this.maxPage}).then(() => {
                this.selectInited = false;
            })
        },
        updateUserPassword(adUserId){
            this.adUserId = adUserId
            this.$refs.pwdDialog.openUpdatePwd()
        },
        updatePwdCallback(){
            // this.pwdDialogShow = false
            
        }
    },
    components: {
        asideTree,
        passworld
    }
}
</script>

<style lang="less">
@import '../../style/mixin';
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.table_container{
    padding: 20px;
    position:relative;
    .actions-top{
        position: absolute;
        right:25px;
        top:30px;
        width: auto;
    }
}
.Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}

.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
