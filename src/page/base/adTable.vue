<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click.stop="addTable">新增表</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col>
                <el-table 
                    height="700"
                    border
                    :data="tableData" 
                    :highlight-current-row="true" 
                    style="width: 100%" 
                    @expand-change="expandedChange" 
                    v-loading="tableLoading" 
                    @sort-change="handleSort">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="表ID">
                                    <span>{{ props.row.adTableId }}</span>
                                </el-form-item>
                                <el-form-item label="用户ID">
                                    <span>{{ props.row.adUserId }}</span>
                                </el-form-item>
                                <el-form-item label="组织ID">
                                    <span>{{ props.row.adOrgId }}</span>
                                </el-form-item>
                                <el-form-item label="组织名">
                                    <span>{{ props.row.adOrgName }}</span>
                                </el-form-item>
                                <el-form-item label="组织名称">
                                    <span>{{ props.row.adOrgName }}</span>
                                </el-form-item>
                                <el-form-item label="修改人">
                                    <span>{{ props.row.updatedByName }}</span>
                                </el-form-item>
                                <el-form-item label="修改时间">
                                    <span>{{ props.row.updated }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="表名" align="center" prop="name"> </el-table-column>
                    <el-table-column label="表系统名" align="center" prop="tableName"> </el-table-column>
                    <!-- <el-table-column label="组织名" align="center" prop="adOrgName"> </el-table-column> -->
                    <el-table-column label="记录访问控制" align="center">
                        <template slot-scope="scope">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isRecordAccess"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="组织访问" align="center">
                        <template slot-scope="scope">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isOrgAccess"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否可写" align="center">
                        <template slot-scope="scope">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isWritable"></el-switch>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="修改人" align="center" prop="updatedBy"> </el-table-column>
                            <el-table-column sortable="custom" label="修改时间" align="center" prop="updated"> </el-table-column> -->
                    <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                    <el-table-column label="创建时间" sortable="custom" align="center" prop="created"> </el-table-column>

                    <el-table-column label="操作" align="center" width="170">
                        <!--fixed="right"-->
                        <template slot-scope="scope">
                            <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                            <el-button size="mini" type="primary" @click="updateTable(scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click="deleteTableConfirm(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination @current-change="handleTableCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                    </el-pagination>
                </div>
            </el-col>

            <el-dialog :title="isUpdate ? '修改表' : '添加表'" :visible.sync="dialogShow">
                <el-form :model="tableInfo" :rules="tableInfoRules" ref="tableForm">

                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="表名" label-width="120px" prop="name">
                                <el-input v-model="tableInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="表系统名" label-width="120px" prop="name">
                                <el-input v-model="tableInfo.tableName" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="记录访问控制" label-width="120px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="tableInfo.isRecordAccess"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="组织访问" label-width="120px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="tableInfo.isOrgAccess"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否可写" label-width="120px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="tableInfo.isWritable"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitTable('tableForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
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
import { getMenuTree, updateTable, deleteTable, addTable, getTable,  } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, usertree],
    data() {
        return {
            tableLoading: true,
            dialogShow: false,
            tableInfo: {
                name: '',
                isRecordAccess:'N',
                isOrgAccess: 'N',
                isWritable: 'N'
            },
            tableInfoRules: {
                name: [
                    { required: true, message: '表名必填', trigger: 'blur' },
                ],
            },
            tableData: []
        }
    },
    computed: {
        menuConfig(){
            return this.tableInfo ? this.tableInfo.menuNames.split(',') : []
        }
    },
    created() {
        this.modleInfoName =  'tableInfo'
        this.getApi = getMenuTree
        this.treeId = "adMenuId"
        this.treeItemId = "adMenuId"
        // this.includeParent = true
        this.includehalfNode = true
    },
    methods: {
        initData() {
            this.getTable();
        },
        async getTable() {

            this.tableData = []

            this.tableLoading = true

            this.handleGet(this.tableData, getTable, this.pagin, this.adTableId).then(() => {
                this.tableLoading = false
                this.tableData.forEach( (item, index) => {

                } ) 
            })
        },

        addTable() {
            this.tableInfo = {}
            this.dialogShow = true
            this.handleAdd()
        },
        deleteTableConfirm(row) {
            this.$confirm('确认删除？').then( _ => { this.deleteTable(row.adTableId) })
        },
        async deleteTable(ids) {
            this.handleDelete(ids, deleteTable, () => { this.getTable() });
        },
        updateTable(row) {
            this.dialogShow = true
            this.handleUpdate(this.tableInfo, row)
        },
        submitTable(formName) {
            let params = Object.assign({}, { parentId: this.adTableId }, this.tableInfo)
            this.handleSubmit(formName, params, addTable, updateTable).then( () => {
                this.dialogShow = false;
                this.getTable()
            } )
        },
        expandedChange(row){
            console.log(row)
        },
        handleTableCurrentChange(current) {
            this.pagin.currentPage = current
            this.getTable()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getTable()
        },
        handleNodeClick(data, node, el) {
            let { id } = data
            this.adTableId = id
            this.getTable()
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
