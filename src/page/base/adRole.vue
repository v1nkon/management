<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click.stop="addRole">新增角色</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <el-table 
                    height="700"
                    border
                    :highlight-current-row="true" 
                    :data="tableData" 
                    style="width: 100%" 
                    @expand-change="expandedChange" 
                    v-loading="roleLoading" 
                    @sort-change="handleSort">
                    <el-table-column type="expand" style="background:#ddd">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <!-- <el-form-item label="角色ID">
                                    <span>{{ props.row.adRoleId }}</span>
                                </el-form-item>
                                <el-form-item label="用户ID">
                                    <span>{{ props.row.adUserId }}</span>
                                </el-form-item>
                                <el-form-item label="组织ID">
                                    <span>{{ props.row.adOrgId }}</span>
                                </el-form-item>
                                <el-form-item label="组织名称">
                                    <span>{{ props.row.adOrgName }}</span>
                                </el-form-item> -->
                                <el-row>
                                    <el-form-item label="可访问菜单">
                                        <span>{{ props.row.menuNames }}</span>
                                    </el-form-item>
                                </el-row>
                                <!-- <el-row>
                                    <el-form-item label="可访问菜单IDs" label-width="120px">
                                        <span>{{ props.row.menuIds }}</span>
                                    </el-form-item>
                                </el-row> -->
                                <el-form-item label="修改人">
                                    <span>{{ props.row.updatedByName }}</span>
                                </el-form-item>
                                <el-form-item label="修改时间">
                                    <span>{{ props.row.updated }}</span>
                                </el-form-item>
                                <el-row>
                                    <el-form-item label="说明">
                                        <span>{{ props.row.description }}</span>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色名" align="center" prop="name"> </el-table-column>
                    <!-- <el-table-column label="组织名" align="center" prop="adOrgName"> </el-table-column> -->
                    <el-table-column label="说明" align="center" prop="description"> </el-table-column>
                    <!-- <el-table-column label="是否活跃" align="center">
                        <template slot-scope="scope">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column label="修改人" align="center" prop="updatedBy"> </el-table-column>
                            <el-table-column sortable="custom" label="修改时间" align="center" prop="updated"> </el-table-column> -->
                    <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                    <el-table-column label="创建时间" sortable="custom" align="center" prop="created"> </el-table-column>

                    <el-table-column label="操作" align="center" width="170">
                        <!--fixed="right"-->
                        <template slot-scope="scope">
                            <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                            <el-button size="mini" type="primary" @click="updateRole(scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click="deleteRoleConfirm(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination @current-change="handleRoleCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                    </el-pagination>
                </div>
            </el-col>

            <el-dialog :title="isUpdate ? '修改角色' : '添加角色'" :visible.sync="dialogShow">
                <el-form :model="roleInfo" :rules="roleInfoRules" ref="RoleForm">

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="角色名" label-width="120px" prop="name">
                                <el-input v-model="roleInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="120px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="roleInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col>
                            <el-form-item label="角色可访问菜单" label-width="120px">
                                <el-input :readonly="true" @click.native="handleTreeOpen('menuIds','menuNames', 'menuHalfIds', 'menuHalfNames')" type="textarea" v-model="roleInfo.menuNames" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitRole('RoleForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>
            </el-dialog>
            <el-dialog  title="选择可访问菜单" :visible.sync="treeShow" v-loading="treeLoading">
                <el-row style="marginBottom:20px;">
                    <el-col :span="24">
                        <el-button size="max" type="primary" @click.stop="handleTreeSelectAll">确认选择</el-button>
                    </el-col>
                </el-row>
                <el-tree :show-checkbox="true" :check-strictly="false" ref="responsibleTree" :data="userTreeArray" node-key="uniqulId" :default-expanded-keys="[0]" :highlight-current="true">
                </el-tree>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import usertree from '../mixin/userTree'
import { getMenuTree, updateRole, deleteRole, addRole, getRole,  } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, usertree],
    data() {
        return {
            roleLoading: true,
            dialogShow: false,
            roleInfo: {
                name: '',
                isActive: '',
                parentId: '',
                parentName: '',
                menuNames:''
            },
            roleInfoRules: {
                name: [
                    { required: true, message: '角色名必填', trigger: 'blur' },
                ],
            },
            tableData: []
        }
    },
    computed: {
        menuConfig(){
            return this.roleInfo ? this.roleInfo.menuNames.split(',') : []
        }
    },
    created() {
        this.modleInfoName =  'roleInfo'
        this.getApi = getMenuTree
        this.treeId = "adMenuId"
        this.treeItemId = "adMenuId"
        // this.includeParent = true
        this.includehalfNode = true
    },
    methods: {
        initData() {
            this.getRole();
        },
        async getRole() {

            this.tableData = []

            this.roleLoading = true

            this.handleGet(this.tableData, getRole, this.pagin, this.adRoleId).then(() => {
                this.roleLoading = false
                this.tableData.forEach( (item, index) => {

                    let menuIds = []
                    let menuNames = []

                    item.menus.forEach( ( item2 , index ) => {
                        menuIds.push(item2.adMenuId)
                        menuNames.push(item2.name)
                    } )

                    item.menuIds = menuIds.join(',')
                    item.menuNames = menuNames.join(',')
                    item.menus = []

                } )
            })
        },

        addRole() {
            this.roleInfo = {}
            this.dialogShow = true
            this.handleAdd()
        },
        deleteRoleConfirm(row) {
            this.$confirm('确认删除？').then( _ => { this.deleteRole(row.adRoleId) })
        },
        async deleteRole(ids) {
            this.handleDelete(ids, deleteRole, () => { this.getRole() });
        },
        updateRole(row) {
            this.dialogShow = true
            this.handleUpdate(this.roleInfo, row)
        },
        submitRole(formName) {
            let params = Object.assign({}, { parentId: this.adRoleId }, this.roleInfo)
            this.handleSubmit(formName, params, addRole, updateRole).then( () => {
                this.dialogShow = false;
                this.getRole()
            } )
        },
        expandedChange(row){
            console.log(row)
        },
        handleRoleCurrentChange(current) {
            this.pagin.currentPage = current
            this.getRole()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getRole()
        },
        handleNodeClick(data, node, el) {
            let { id } = data
            this.adRoleId = id
            this.getRole()
        }
    },
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
