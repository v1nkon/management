<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col 
                :span="24" 
                class='actions-top'>
                <el-form 
                    class="demo-form-inline">
                    <el-form-item>
                        <el-button 
                            size="small" 
                            type="primary" 
                            @click.stop="addConsideration">新增思考</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table 
                height="700"
                border
                :data="tableData" 
                :highlight-current-row="true" 
                stripe 
                v-loading="considerationLoading" 
                style="width: 100%" 
                label-width="120px">
                <el-table-column 
                    type="expand" 
                    label-width="120px">
                    <template 
                        slot-scope="props" 
                        label-width="120px">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="思考名称" label-width="120px">{{ props.row.name }}</el-form-item>
                            <el-form-item label="思考者" label-width="120px">{{ props.row.thinkerName }}</el-form-item>
                            <el-form-item style="width: 100%" label="内容" label-width="120px">{{ props.row.content }}</el-form-item>
                            <el-form-item label="提出人" label-width="120px">{{ props.row.proposerName }}</el-form-item>
                            <!-- <el-form-item label="思考Id" label-width="120px">{{ props.row.mConsiderationId }}</el-form-item> -->
                            <el-form-item label="思考时间" label-width="120px">{{ props.row.thinkTime }}</el-form-item>
                            <el-form-item label="优先级" label-width="120px">{{ props.row.priorityName }}</el-form-item>
                            <el-form-item label="问题状态" label-width="120px">{{ props.row.problemStatusName }}</el-form-item>
                            <el-form-item label="产品名称" label-width="120px">{{ props.row.mProductName }}</el-form-item>
                            <el-form-item label="项目名称" label-width="120px">{{ props.row.mProjectName }}</el-form-item>
                            <el-form-item label="模块名称" label-width="120px">{{ props.row.mModuleName }}</el-form-item>
                            <!-- <el-form-item label="模块ID" label-width="120px">{{ props.row.mModuleId }}</el-form-item>
                            <el-form-item label="产品ID" label-width="120px">{{ props.row.mProductId }}</el-form-item>
                            <el-form-item label="项目ID" label-width="120px">{{ props.row.mProjectId }}</el-form-item> -->
                            <el-row>
                                <el-form-item label="计划开始时间" label-width="120px"> {{props.row.planStart}}</el-form-item>
                                <el-form-item label="计划结束时间" label-width="120px">{{ props.row.planEnd }}</el-form-item>
                            </el-row>
                            <el-form-item label="实际开始时间" label-width="120px">{{ props.row.actualStart }}</el-form-item>
                            <el-form-item label="实际结束时间" label-width="120px">{{ props.row.actualEnd }}</el-form-item>
                            <el-form-item style="width: 100%" label="备注" label-width="120px">{{ props.row.remark }}</el-form-item>  
                            <!-- <el-form-item label="组织ID" label-width="120px">{{ props.row.adOrgID }}</el-form-item> -->
                            <el-row>
                                <el-form-item label="修改时间" label-width="120px">{{ props.row.updated }}</el-form-item>
                                <el-form-item label="修改人" label-width="120px">{{ props.row.updatedByName }}</el-form-item>
                            </el-row>
                            
                            
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="思考名称" align="center" prop="name"> </el-table-column>
                <el-table-column label="内容" align="center">
                    <template slot-scope="scope">
                        {{scope.row.content | shortBrif}}
                    </template>
                </el-table-column>
                <el-table-column label="思考者" width="110" align="center" prop="thinkerName"> </el-table-column>
                <el-table-column label="问题状态" width="100" align="center" prop="problemStatusName"> </el-table-column>
                <el-table-column label="优先级" width="120" align="center" prop="priorityName"> </el-table-column>
                <!-- <el-table-column label="是否活跃" align="center">
                    <template slot-scope="scope">
                        <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column label="创建人" width="80"  align="center" prop="createdByName"> </el-table-column>
                <!-- <el-table-column label="思考时间" align="center" prop="thinkTime"> </el-table-column> -->
                <el-table-column label="创建时间" width="210" align="center" prop="created"> </el-table-column>
                <el-table-column label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                        <el-button size="mini" type="primary" @click="updateConsideration(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteConsiderationConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                </el-pagination>
            </div>
            <el-dialog :title="isUpdate ? '修改思考' : '添加思考'" :visible.sync="considerationDialogShow">
                <el-form :model="considerationInfo" :rules="considerationInfoRules" ref="ConsiderationForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="思考名称" label-width="100px" prop="name">
                                <el-input v-model="considerationInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="产品名称" label-width="100px" prop="mProductId">
                                <el-select @change="selectProduct" v-model="considerationInfo.mProductId">
                                    <el-option v-for="item in selectProductData" :key="item.mProductId" :label="item.name" :value="item.mProductId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="项目名称" label-width="100px">
                                <el-select @change="selectProject" v-model="considerationInfo.mProjectId" :disabled="productHasNotSelect">
                                    <el-option v-for="item in selectProjectData"  :key="item.mProjectId" :label="item.name" :value="item.mProjectId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="模块名称" label-width="100px">
                                <el-select v-model="considerationInfo.mModuleId" :disabled="productHasNotSelect">
                                    <el-option v-for="item in selectModuleData" :key="item.mModuleId" :label="item.name" :value="item.mModuleId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="问题状态" label-width="100px">
                                <el-select v-model="considerationInfo.problemStatus">
                                    <el-option v-for="item in selectProblemData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="优先级" label-width="100px">
                                <el-select v-model="considerationInfo.priority">
                                    <el-option v-for="item in selectPriorityData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="思考者" label-width="100px" prop="thinker">
                                <el-input :readonly="true" @click.native="handleTreeOpen('thinker','thinkerName')" v-model="considerationInfo.thinkerName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="思考时间" label-width="100px">
                                <el-date-picker v-model="considerationInfo.thinkTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" clearable suffix-icon="el-icon-datetime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row>
                    <el-col :span="24">
                        <el-form-item label="预计时间" label-width="100px">
                            <el-date-picker 
                                v-model="considerationInfo.planTime" 
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="预计开始时间" 
                                end-placeholder="预计结束时间" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                value-format="yyyy-MM-dd HH:mm:ss" 
                                clearable
                                align="right" 
                                suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="实际时间" label-width="100px">
                            <el-date-picker 
                                v-model="considerationInfo.actualTime" 
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="实际开始时间" 
                                end-placeholder="实际结束时间" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                value-format="yyyy-MM-dd HH:mm:ss" 
                                clearable
                                align="right" 
                                suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-form-item label="备注" label-width="100px">
                        <el-input type="textarea" v-model="considerationInfo.remark" :rows="3"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" type="primary" @click="submitConsideration('ConsiderationForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>
                
            </el-dialog>
            <el-dialog  title="选择人员" :visible.sync="treeShow">
                <el-row style="marginBottom:20px;">
                    <el-col :span="24">
                        <el-button size="small" type="primary" @click.stop="handleTreeSelect">确认选择</el-button>
                    </el-col>
                </el-row>
                <el-tree :show-checkbox="true" :default-expand-all="true" ref="responsibleTree" :data="userTreeArray" node-key="uniqulId" :default-expanded-keys="[0]" :highlight-current="true">
                </el-tree>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import usertree from '../mixin/userTree'
import { updateConsideration, deleteConsideration, addConsideration ,getConsideration, getSelectChildStatus, getProjects, getProducts, getModuleByProjectId, getModuleByProductId } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, usertree],
    data() {
        return {
            productHasNotSelect:true,
            considerationLoading: true,
            considerationName: 'Consideration',
            priorityName: 'Priority',
            docStatusId: 22,
            maxPage: 9999,
            selectInited: true,
            considerationDialogShow: false,
            selectPriorityData: [],
            selectProblemData: [],
            selectProductData: [],
            selectProjectData:[],
            selectModuleData: [],
            considerationInfo: {
                mModuleId: '',
            },
            considerationInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入思考名称',
                        trigger: 'blur'
                    }
                ],
                mProductId: [
                    {
                        required: true,
                        message: '请选择产品',
                        trigger: 'blur'
                    }
                ],
                thinker: [
                    {
                        required: true,
                        message: '请选择思考者',
                        trigger: 'blur'
                    }
                ]
            },
            tableData: []
        }
    },
    computed: {
        ...mapState(["isUpdate"])
    },
    created() {

        this.initSelectStatusData( 'selectPriorityData', 'Priority' )
        this.initSelectStatusData( 'selectProblemData', 'ProblemStatus' )

        this.initSelectProductData()

        this.modleInfoName = 'considerationInfo'
    },
    methods: {
        initData() {
            this.getConsideration();
        },
        selectProduct(mProductId){

            this.initSelectProjectData(mProductId)
            this.initSelectModuleData(mProductId, getModuleByProductId)
            if( !this.productHasNotSelect ) {
                this.considerationInfo.mProjectId = null
                this.considerationInfo.mModuleId = null
            }
            
        },
        selectProject(mProjectId){
            this.initSelectModuleData(mProjectId, getModuleByProjectId)
            this.considerationInfo.mModuleId = null
        },
        async getConsideration( ) {
            this.tableData = []
            this.handleGet(this.tableData, getConsideration ).then(() => {
                this.considerationLoading = false
                this.tableData.forEach(item => {
                    item.mProductId = item.mProductId >> 0
                    item.mProjectId = item.mProjectId >> 0
                    item.mModuleId = item.mModuleId >> 0
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )
                })
            })
        },
        addConsideration() {
            this.considerationInfo = {}
            this.considerationDialogShow = true
            this.handleAdd()
            // o
        },
        deleteConsiderationConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteConsideration(row.mConsiderationId) })
        },
        async deleteConsideration(mConsiderationId) {
            this.handleDelete(mConsiderationId, deleteConsideration, () => {this.getConsideration();});
        },
        updateConsideration(row) {
            this.considerationDialogShow = true
            this.productHasNotSelect = false
            this.initSelectProjectData(row.mProductId)
            this.handleUpdate(this.considerationInfo, row)
        },
        submitConsideration(formName) {
            let params = this.formatParams()
            this.handleSubmit(formName, params, addConsideration, updateConsideration).then(() => {this.considerationDialogShow = false; this.getConsideration() })
        },
        formatParams(){
            let actualStart,
                actualEnd,
                planStart,
                planEnd;
            let {  actualTime, planTime  } = this.considerationInfo
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )
            let params = Object.assign({}, this.considerationInfo ,{
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },
        initSelectStatusData(selectName, statusName){
            this[selectName] = []
            this.handleGet(this[selectName], getSelectChildStatus, {pageSize: this.maxPage}, statusName ).then(() => {
                this.selectInited = false;
            })
        },
        initSelectModuleData(id, getApi) {
            this.selectModuleData = []
            this.handleGet(this.selectModuleData, getApi, {pageSize: this.maxPage}, id).then(() => {
                this.selectInited = false
            })
        },
        async initSelectProductData() {
            this.selectProductData = []
            this.handleGet(this.selectProductData, getProducts, {pageSize: this.maxPage}).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectProjectData(mProductId) {
            this.selectProjectData = []
            this.handleGet(this.selectProjectData, getProjects, {pageSize: this.maxPage}, mProductId).then(() => {
                this.productHasNotSelect = false
            })
        },
        
        handleCurrentChange(current) {
            this.pagin.currentPage = current;
            this.getConsideration()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getConsideration()
        },
    },
}
</script>

<style scoped lang="less">
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
