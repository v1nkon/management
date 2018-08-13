<template>
    <div class="fillcontain">
        <div class="table_container" v-loading="mainLoading">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click.stop="addMainStatus()">新增主表</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            
            <el-table 
                height="700"
                border
                :data="tableData" 
                @row-click="checkChildTable" 
                :highlight-current-row="true" 
                style="width: 100%"
                @sort-change="handleMainSort">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="引用ID">
                                <span>{{ props.row.adReferenceId }}</span>
                            </el-form-item>
                            <el-form-item label="组织ID">
                                <span>{{ props.row.adOrgId }}</span>
                            </el-form-item>
                            <el-form-item label="创建人">
                                <span>{{ props.row.createdByName }}</span>
                            </el-form-item>
                            <!-- <el-form-item label="创建时间">
                                        <span>{{ props.row.created }}</span>
                                    </el-form-item> -->
                            <el-form-item label="修改时间">
                                <span>{{ props.row.updated }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="引用ID" prop="adReferenceId"> </el-table-column> -->
                <el-table-column label="名字" prop="name"> </el-table-column>
                <el-table-column label="说明" prop="description"> </el-table-column>
                <!-- <el-table-column label="组织ID" prop="adOrgId"> </el-table-column> -->
                <!-- <el-table-column label="是否活跃" prop="isactive"> </el-table-column> -->
                <!-- <el-table-column label="是否活跃" align="center">
                    <template slot-scope="scope">
                        <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isactive"></el-switch>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="创建人" prop="createdBy"> </el-table-column> -->
                <el-table-column label="修改人" prop="updatedByName"> </el-table-column>
                <!-- <el-table-column label="修改时间" prop="updated"> </el-table-column> -->
                <el-table-column sortable="custom" label="创建时间" prop="created"> </el-table-column>
                <el-table-column label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <!-- <el-button size="max" type="success" @click.stop="addMainTable(scope.row)">新增</el-button> -->
                        <el-button size="mini" type="primary" @click.stop="updateMainStatus(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click.stop="deleteMainStatusConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleMainCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                </el-pagination>
            </div>

            <el-dialog :title="isUpdate ? '主表修改' : '主表新增'" :visible.sync="mainDialogShow">
                <header class="form_header">主表信息</header>
                <el-form :model="mainStatusInfo" :rules="infoTableRulus" ref="mainTable">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名字" label-width="100px" prop="name">
                                <el-input v-model="mainStatusInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="说明" label-width="100px">
                                <el-input v-model="mainStatusInfo.description" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="isUpdate">
                        <el-col>
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="mainStatusInfo.isactive" auto-complete="off"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="" label-width="0px" style="text-align:center;">
                                <el-button type="primary" @click="submitMainStatus('mainTable')" v-html="isUpdate ? '修改' : '新增' " class="submit_btn">新增</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <transition name="child-animation">
                <div class="inner-dialog" v-show="isChildShow">
                    <header class="table-header">子表信息——{{childTableName}}</header>
                    <div class="child-container" v-loading="childLoading">
                        <el-col :span="24" class='x'>
                            <el-form class="demo-form-inline">
                                <el-form-item>
                                    <el-button size="small" @click="addChildStatus()" type="primary">新增字表</el-button>
                                    <el-button size="small" @click="deleteChildStatusConfirm()" type="primary">删除字表</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-table :data="childTableData" @sort-change="handleChildSort" align="center" @selection-change="childSelect">
                            <el-table-column type="selection" width="55" class="adRefListId">

                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="引用ID">
                                            <span>{{ props.row.adReferenceId }}</span>
                                        </el-form-item>
                                        <el-form-item label="说明">
                                            <span>{{ props.row.description }}</span>
                                        </el-form-item>
                                        <el-form-item label="创建人">
                                            <span>{{ props.row.createdByName }}</span>
                                        </el-form-item>
                                        <!-- <el-form-item label="创建时间">
                                                    <span>{{ props.row.created }}</span>
                                                </el-form-item> -->
                                        <el-form-item label="修改时间">
                                            <span>{{ props.row.created }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label="状态ID" align="center" prop="adRefListId"> </el-table-column>
                            <!-- <el-table-column label="引用ID" prop="adReferenceId"> </el-table-column> -->
                            <el-table-column label="名字" align="center" prop="name"> </el-table-column>
                            <!-- <el-table-column label="说明" prop="description"> </el-table-column> -->
                            <el-table-column label="类别" align="center" prop="category"> </el-table-column>
                            <el-table-column label="值" align="center" prop="value"> </el-table-column>
                            <el-table-column label="组织ID" prop="adOrgId"> </el-table-column>
                            <!-- <el-table-column label="是否活跃" align="center">
                                <template slot-scope="scope">
                                    <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isactive"></el-switch>
                                </template>
                            </el-table-column> -->
                            <!-- <el-table-column label="创建人" prop="createdBy"> </el-table-column> -->
                            <!-- <el-table-column label="创建时间" prop="created"> </el-table-column> -->
                            <el-table-column label="修改人" prop="updatedByName"> </el-table-column>
                            <!-- <el-table-column label="修改时间" sortable="custom" min-width="210px" align="center" prop="updated"> </el-table-column> -->
                            <el-table-column label="创建时间" sortable="custom" min-width="210px" align="center" prop="created"> </el-table-column>
                            <el-table-column label="操作" align="center" width="170">
                                <template slot-scope="scope">
                                    <!-- <el-button size="max" type="success" @click="addChildTable(scope.$index, scope.row)">新增</el-button> -->
                                    <el-button size="mini" type="success" @click="updateChildStatus(scope.row)">修改</el-button>
                                    <!-- <el-button size="max" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination @current-change="handleChildCurrentChange" :current-page="childPagin.currentPage" :page-size="childPagin.pageSize" layout="total, prev, pager, next" :total="childPagin.totalPage">
                            </el-pagination>
                        </div>
                    </div>

                </div>
            </transition>
            <el-dialog :title="isUpdate ? '字表修改' : '字表新增' " :visible.sync="childDialogShow">
                <header class="form_header">子表信息</header>

                <el-form :model="childStatusInfo" ref="childTable" :rules="childInfoTableRulus">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名字" label-width="100px" prop="name">
                                <el-input v-model="childStatusInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="值" label-width="100px">
                                <el-input v-model="childStatusInfo.value" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-show="isUpdate">
                        <el-col>
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="childStatusInfo.isactive" auto-complete="off"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="说明" label-width="100px">
                                <el-input type="textarea" v-model="childStatusInfo.description" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="" label-width="0px" style="text-align:center;">
                                <el-button type="primary" @click="submitChildStatus('childTable')" class="submit_btn" v-html="isUpdate ? '修改' : '新增' "></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import { updateChildStatus, deleteChildStatus, addChildStatus, getChildStatus, updateMainStatus, deleteMainStatus, addMainStatus, getMainStatus, cityGuess, getSummarys, getSummarysCount, updateSummary, searchplace, deleteSummary } from '@/api/getData'
export default {
    mixins: [mixin],
    data() {
        return {
            mainDialogShow:false, //主表弹窗
            childDialogShow:false,//字表弹窗


            mainLoading: true,//主表的加载中
            childLoading:true,//字表表的加载中
            
            beforeAdReferenceId: null, //上一个父表ID
            adReferenceId: null,//当前点击主表ID


            mainStatusInfo: {//主表新增model
                name: '',
                value: '',
                description: '',
                isactive: false,
                adRefListId: ''
            },
            childStatusInfo: {//字表新增model
                name: '',
                value: '',
                description: '',
                isactive: false,
                adRefListId: ''
            },

            isChildShow: false, //字表是否显示
            isChildShowFlag: false, //字表是否显示
            
            
            infoTableRulus: {//主表model规则
                name: [
                    {
                        required: true,
                        message: '请输入会议标题',
                        trigger: 'blur'
                    }
                ]
            },
            childInfoTableRulus: {//字表model规则
                name: [
                    {
                        required: true,
                        message: '请输入字表名称',
                        trigger: 'blur'
                    }
                ]
            },
            selectChild: [],//被选中的字表
            //表格数据
            tableData: [],
            childTableData: [],
            
            childTableName:'',
            
            childPagin: {
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
                sortType: 'desc'
            }
        }
    },
    methods: {
        initData(){
            this.getMainStatus();
        },

        //主表的获取 增删改
        async getMainStatus(order = {}) {
            this.tableData = []
            this.handleGet(this.tableData, getMainStatus ).then(() => {
                this.mainLoading = false
                this.tableData.forEach(item => {
                    let {isactive} = item
                    // item.isactive = (isactive == 'Y' ? true : false)
                })
            })
            return ;
        },
        addMainStatus(){
            this.mainStatusInfo = {}
            this.mainDialogShow = true
            this.handleAdd()
        },
        deleteMainStatusConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteMainStatus(row.adReferenceId) })
        },
        deleteMainStatus(ids) {
            this.handleDelete(ids, deleteMainStatus, () => {this.getMainStatus()});
        },
        updateMainStatus(row) {
            this.mainDialogShow = true
            this.handleUpdate(this.mainStatusInfo, row)
        },
        submitMainStatus(formName) {
            let params = Object.assign({},this.mainStatusInfo)
            let {isactive} = params
            // params.isactive = (isactive ? 'Y' : 'N');
            this.handleSubmit(formName, params, addMainStatus, updateMainStatus).then( () => {this.mainDialogShow = false; this.getMainStatus()} )
        },
        handleMainCurrentChange(ev) {
            this.pagin.currentPage = ev
            this.getMainStatus()
        },
        handleMainSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getMainStatus()
        },

        //字表的获取  增删改
        getChildStatus() {
            this.childTableData = []
            this.childLoading = true
            this.handleGet(this.childTableData, getChildStatus, this.childPagin, this.adReferenceId).then(() => {
                this.childLoading = false
                this.childTableData.forEach(item => {
                    let {isactive} = item
                    item.isactive = (isactive == 'Y' ? true : false)
                })
            })
        },
        addChildStatus(){
            this.childStatusInfo = {}
            this.childDialogShow = true
            this.handleAdd()
        },
        deleteChildStatusConfirm() {
            if (this.selectChild.length == 0) {
                this.$message({
                    type: 'error',
                    message: '请选择要删除的字表'
                });
                return;
            }
            this.$confirm('确认删除？').then(_ => { this.deleteChildStatus() })
        },
        deleteChildStatus() {
            let ids = this.selectChild.join(',')
            this.handleDelete(ids, deleteChildStatus, () => {this.getChildStatus()});
        },
        updateChildStatus(row) {
            this.childDialogShow = true
            this.handleUpdate(this.childStatusInfo, row)
        },
        submitChildStatus(formName) {
            let params = Object.assign({},{adReferenceId:this.adReferenceId,...this.childStatusInfo})
            let {isactive} = params
            params.isactive = (isactive ? 'Y' : 'N');
            this.handleSubmit(formName, params, addChildStatus, updateChildStatus).then( () => {this.childDialogShow = false; this.getChildStatus()} )
        },
        handleChildCurrentChange(ev) {
            this.childPagin.currentPage = ev
            this.getChildStatus()
        },
        handleChildSort({ prop, order }) {
            this.childPagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getChildStatus()
        },


        
        childSelect(args) {
            let arr = [...args]
            this.selectChild = []
            arr.forEach((item, i) => {
                this.selectChild.push(item.adRefListId)
            })
        },
        //toggle字表的显示隐藏
        checkChildTable(scope) {
            this.childPagin.currentPage = 1//重置当前页
            let id = scope.adReferenceId
            if (this.adReferenceId) {
                this.beforeAdReferenceId = this.adReferenceId
            }
            this.adReferenceId = id
            this.childTableName = scope.name
            this.isChildShowFlag = !this.isChildShowFlag
            this.getChildStatus(id)
            if (this.adReferenceId != this.beforeAdReferenceId) {
                this.isChildShow = true
            } else {
                this.isChildShow = this.isChildShowFlag
            }
        }
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

.tr-slide-enter-active,
.tr-slide-leave-active {
    transition: all 1s;
}

.tr-slide-enter,
.tr-slide-leave-active {
    opacity: 0;
    transform: translateY(30px);
}

.form_header {
    text-align: center;
    margin-bottom: 10px;
}

.inner-dialog {
   /* margin-top: 30px;*/

    .el-dialog {
        width: 1100px;
    }
}

.child-animation-enter-active,
.child-animation-leave-active {
    transition: all .5s;
}

.child-animation-enter,
.child-animation-leave-active {
    opacity: 0;
}
</style>
