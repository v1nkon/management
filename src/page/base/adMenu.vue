<template>
    <div class="fillcontain">
        <div class="table_container">
         <head-top></head-top>
            <add-btn 
                :auth="auth"
                :operate="addMenu"
                :operateName="'新增菜单'"
            />
            <el-row :gutter="5">
                <el-col :span="4" style="height:700px;overflow: auto;">
                    <el-tree :data="treeOrg" node-key="uniqulId" :default-expanded-keys="['0^_^顶层']" @node-click="handleNodeClick" :highlight-current="true">
                    </el-tree>
                    
                </el-col>
                <el-col :span="20">
                    <el-table 
                        height="700"
                        border
                        :highlight-current-row="true" 
                        :data="tableData" 
                        style="width: 100%" 
                        v-loading="menuLoading" 
                        @sort-change="handleSort">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <!-- <el-form-item label="菜单ID">
                                        <span>{{ props.row.adMenuId }}</span>
                                    </el-form-item>
                                    <el-form-item label="父菜单ID">
                                        <span>{{ props.row.parentId }}</span>
                                    </el-form-item>
                                    <el-form-item label="组织ID">
                                        <span>{{ props.row.adOrgId }}</span>
                                    </el-form-item> -->
                                    <!-- <el-form-item label="组织名称">
                                        <span>{{ props.row.adOrgName }}</span>
                                    </el-form-item> -->
                                    
                                    <el-form-item label="修改时间">
                                        <span>{{ props.row.updated }}</span>
                                    </el-form-item>
                                    <el-form-item label="修改人">
                                        <span>{{ props.row.updatedByName }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="菜单名" align="center" prop="name"> </el-table-column>
                        <!-- <el-table-column label="父菜单名" align="center" prop="parentName"> </el-table-column> -->
                        <el-table-column label="菜单对应的路径" align="center" prop="url"> </el-table-column>
                        <el-table-column label="优先级" align="center" prop="seqNo"> </el-table-column>
                        <el-table-column label="菜单图表" align="center" prop="lconUrl"> </el-table-column>
                        <el-table-column label="菜单类型" align="center" width="150" prop="typeCN" >
                            <!-- <template slot-scope="scope">
                                <el-switch active-text="功能" inactive-text="路由" :active-value="1" :inactive-value="0" :value="scope.row.type"></el-switch>
                            </template> -->
                        </el-table-column>
                        <!-- <el-table-column label="修改人" align="center" prop="updatedBy"> </el-table-column>
                        <el-table-column sortable="custom" label="修改时间" align="center" prop="updated"> </el-table-column> -->
                        <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                        <el-table-column label="创建时间" width="210" sortable="custom" align="center" prop="created"> </el-table-column>

                        <el-table-column label="操作" align="center" width="170">
                            <!--fixed="right"-->
                            <template slot-scope="scope">
                                <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                                <el-button size="mini" type="primary" @click="updateMenu(scope.row)">修改</el-button>
                                <el-button size="mini" type="danger" @click="deleteMenuConfirm(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination @current-change="handleMenuCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

            <el-dialog  :title="isUpdate ? '修改菜单' : '添加菜单'" :visible.sync="dialogShow">
                <el-form :model="menuInfo" :rules="menuInfoRules" ref="MenuForm">

                    <el-row>
                        <el-col>
                            <el-form-item label="菜单名" label-width="130px" prop="loginName">
                                <el-input v-model="menuInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="菜单对应的路径" label-width="130px" prop="name">
                                <el-input v-model="menuInfo.url" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单图表" label-width="130px" >
                                <el-input v-model="menuInfo.lconUrl" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="130px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="menuInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="菜单类型" label-width="130px">
                                <el-switch active-text="功能" inactive-text="路由" :active-value="1" :inactive-value="0" v-model="menuInfo.type"></el-switch>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="父菜单" label-width="130px">
                                <el-input @click.native="openOrgTree" :readonly="true" v-model="menuInfo.parentName"> </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="优先级" label-width="130px">
                                <el-input v-model="menuInfo.seqNo"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitMenu('MenuForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>

                <el-dialog :append-to-body="true"  title="选择父菜单" :visible.sync="orgTree" ref="orgTree">
                    <el-tree :data="treeOrg" node-key="uniqulId" :default-expand-all="true" v-model="menuInfo.adOrgId" :default-expanded-keys="[0]" @node-click="selectOrg" :highlight-current="true">
                    </el-tree>
                </el-dialog>
            </el-dialog>
            
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import { getMenuTree, updateMenu, deleteMenu, addMenu, getMenu } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin],
    data() {
        return {
            orgTree:false,
            adMenuId:0,
            menuLoading: true,
            dialogShow: false,
            menuInfo: {
                name: '',
                isActive: '',
                parentId: '',
                parentName: '',
                type: 0
            },
            menuInfoRules: {
                name: [
                    {required:true, message: '菜单名必填', trigger: 'blur'},                    
                ],
            },
            tableData: [],
            treeOrg: [{
                id: 0,
                adMenuId: 0,
                label: '顶层',
                uniqulId: '0^_^顶层',
                children: []
            }],
        }
    },
    created () {
        this.getMenuTree()
    },
    methods: {
        initData() {
            this.getMenu();
        },
        async getMenu() {
            this.tableData = []
            this.menuLoading = true
            this.handleGet(this.tableData, getMenu, this.pagin, this.adMenuId).then(() => {
                this.tableData.forEach( ( item ) => {
                    item.typeCN = item.type == 0 ? '路由' : '功能'
                } )
                this.menuLoading = false
            })
        },

        addMenu() {
            this.menuInfo = {
                parentId: this.adMenuId,
                parentName: this.adMenuName
            }
            this.dialogShow = true
            this.handleAdd()
        },
        deleteMenuConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteMenu(row.adMenuId) })
        },
        async deleteMenu(ids) {
            this.handleDelete(ids, deleteMenu, () => { this.getMenu();this.getMenuTree(); });
        },
        updateMenu(row) {
            this.dialogShow = true
            Object.assign(row, {parentId: this.adMenuId,parentName: this.adMenuName})
            this.handleUpdate(this.menuInfo, row)
        },
        submitMenu(formName) {
            let params = Object.assign({}, {parentId: this.adMenuId}, this.menuInfo)
            this.handleSubmit(formName, params, addMenu, updateMenu).then( () => {   
                this.getMenuTree()
                this.dialogShow = false; 
                this.getMenu()
            } )
        },
        handleMenuCurrentChange(current) {
            this.pagin.currentPage = current
            this.getMenu()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getMenu()
        },
        handleNodeClick(data, node, el){
            let { id, label } = data
            this.adMenuId = id
            this.adMenuName = label
            this.getMenu()
        },
        async getMenuTree(){
            let { data, status, msg } = await getMenuTree();

            if ( status == 200 ) {
                this.treeOrg[0]['children'] = this.arrayToTreeData(data, 0);
            } else {
                this.$message({ type: 'error', message: msg });
            }
            console.log(this.treeOrg)
        },
        arrayToTreeData( data, id ){

            let dataTemp = [];
  
            data.forEach( (item, index)=>{
                if ( item.parentId == id ) {
                    
                    let children = this.arrayToTreeData(data, item.adMenuId)
                    let uniqulId = item.adMenuId + '^_^' + item.name 
                    dataTemp.push({
                        uniqulId,
                        id: item.adMenuId,
                        parentId: item.parentId,
                        label: item.name,
                        children: children
                    })
                }
            } )

            return dataTemp;
        },
        openOrgTree(){
            this.orgTree = true
            this.$refs.orgTree.style.zIndex = 2000
        },
        selectOrg(data,node,el){
            let {id, label} = data
            this.menuInfo.parentId = id
            this.menuInfo.parentName = label
            this.orgTree = false
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
