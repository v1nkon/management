<template>
    <div class="fillcontain">
        
        <div class="table_container sss">
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
                            @click.stop="addRequirement">新增需求</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table 
                :data="tableData" 
                border
                height="500" 
                :highlight-current-row="true" 
                v-loading="requireLoading" 
                style="width: 100%" 
                label-width="120px">
                <el-table-column 
                    type="expand" 
                    label-width="120px">
                    <template 
                        slot-scope="props" 
                        label-width="120px">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="需求名称" label-width="120px">{{ props.row.name }}</el-form-item>
                            <el-form-item label="参考需求名称" label-width="120px">{{ props.row.refRequirementNames }}</el-form-item>
                            <el-form-item label="需求状态" label-width="120px">{{ props.row.requirementStatusName }}</el-form-item>
                            <el-form-item label="提出人" label-width="120px">{{ props.row.proposerName }}</el-form-item>
                            <el-form-item label="会议内容" label-width="120px">{{ props.row.content }}</el-form-item>
                            <el-row>
                                <el-col>
                                    <el-form-item label="参考附件" label-width="120px" style="width: 100%">
                                        <a class="file-item" v-for=" (item, index) in props.row.refUrl " :download="item" :key="index" :href="item" v-fileName="item">  </a>
                                    </el-form-item>    
                                </el-col>
                            </el-row>
                            <el-form-item label="备注" label-width="120px">{{ props.row.remark }}</el-form-item>
                            <!-- <el-form-item label="需求ID" label-width="120px">{{ props.row.mRequirementId }}</el-form-item> -->
                            <!-- <el-form-item label="会议纪要ID" label-width="120px"> {{ props.row.mSummaryId }}</el-form-item> -->
                            <!-- <el-form-item label="会议纪要项ID" label-width="120px">{{ props.row.mSummaryItemId }}</el-form-item> -->
                            <el-row>
                                <el-form-item label="要求开始时间" label-width="120px">{{ props.row.requireStart }}</el-form-item>
                                <el-form-item label="要求结束时间" label-width="120px">{{ props.row.requireEnd }}</el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="计划开始时间" label-width="120px"> {{props.row.planStart}}</el-form-item>
                                <el-form-item label="计划结束时间" label-width="120px">{{ props.row.planEnd }}</el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="实际开始时间" label-width="120px">{{ props.row.actualStart }}</el-form-item>
                                <el-form-item label="实际结束时间" label-width="120px">{{ props.row.actualEnd }}</el-form-item>
                            </el-row>
                            <!-- <el-form-item label="参考需求Id" label-width="120px"> {{ props.row.refRequirementIDs }}</el-form-item> -->
                            <el-form-item label="分析人" label-width="120px">{{ props.row.analyst }}</el-form-item>
                            <el-form-item label="产品名称" label-width="120px">{{ props.row.mProductName }}</el-form-item>
                            <el-form-item label="项目名称" label-width="120px">{{ props.row.mProjectName }}</el-form-item>
                            <!-- <el-form-item label="产品ID" label-width="120px">{{ props.row.mProductId }}</el-form-item> -->
                            <!-- <el-form-item label="项目ID" label-width="120px">{{ props.row.mProjectId }}</el-form-item> -->
                            <!-- <el-form-item label="组织ID" label-width="120px">{{ props.row.adOrgID }}</el-form-item> -->
                            <el-form-item label="是否活跃" label-width="120px"> {{props.row.isActiveCN}} </el-form-item>
                            <el-form-item label="是否公开" label-width="120px"> {{props.row.isPublicCN}} </el-form-item>
                            
                            <el-form-item label="文档状态" label-width="120px">{{ props.row.docStatusName }}
                            </el-form-item>
                            
                            <el-row>
                                <el-col>
                                    <el-form-item label="发送" label-width="120px">
                                        {{ props.row.sendName }}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="抄送" label-width="120px">
                                        {{ props.row.ccName }}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="呈报" label-width="120px">
                                        {{ props.row.reportName }}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="责任人" label-width="120px">
                                        {{ props.row.responsibleName }}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="分析人" label-width="120px">
                                        {{ props.row.analystName }}
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="修改人" label-width="120px">{{ props.row.updatedByName }}
                            </el-form-item>
                            <el-form-item label="修改时间" label-width="120px">
                                {{ props.row.updated }}
                            </el-form-item>
                            
                            
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="需求名称" align="center" prop="name"> </el-table-column>
                <el-table-column label="会议内容" align="center" prop="contentBrief">
                    <template slot-scope="scope">
                        {{scope.row.content | shortBrif}}
                    </template>
                </el-table-column>
                <el-table-column label="参考需求名称" width="150" align="center" prop="refRequirementNames"> </el-table-column>
                <el-table-column label="需求状态" width="100" align="center" prop="requirementStatusName"> </el-table-column>
                <!-- <el-table-column label="产品名称" align="center" prop="mProductName"> </el-table-column>
                <el-table-column label="项目名称" align="center" prop="mProjectName"> </el-table-column> -->
                <el-table-column label="提出人" width="100" align="center" prop="proposerName"> </el-table-column>
                <!-- <el-table-column label="是否活跃" align="center">
                    <template slot-scope="scope">
                        <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="是否公开" align="center">
                    <template slot-scope="scope">
                        <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isPublic"></el-switch>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="创建人" width="100" align="center" prop="createdByName"> </el-table-column> -->
                <el-table-column label="创建时间" width="210" align="center" prop="created"> </el-table-column>
                <el-table-column label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                        <el-button size="mini" type="primary" @click="updateRequirement(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteRequireConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                </el-pagination>
            </div>
            <el-dialog :title="isUpdate ? '修改需求' : '添加需求'" :visible.sync="requireDialogShow">
                <el-form :model="requireInfo" :rules="requireInfoRules" ref="requireForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="需求名称" label-width="100px" prop="name">
                                <el-input v-model="requireInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="参考需求名称" label-width="100px">
                                <el-select filterable remote clearable :remote-method="this.initSelectRefRequirementData" v-model="requireInfo.refRequirementIDs">
                                    <el-option v-for="item in selectRefRequirementData" :key="item.mRequirementId" :label="item.name" :value="item.mRequirementId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="产品名称" label-width="100px" prop="mProductId">
                                <el-select clearable @change="selectProduct" v-model="requireInfo.mProductId">
                                    <el-option v-for="item in selectProductData" :key="item.mProductId" :label="item.name" :value="item.mProductId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称"  label-width="100px" prop="mProjectId">
                                <el-select clearable v-model="requireInfo.mProjectId" :disabled="productHasNotSelect">
                                    <el-option v-for="item in selectProjectData"  :key="item.mProjectId" :label="item.name" :value="item.mProjectId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="requireInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否公开" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="requireInfo.isPublic"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="需求状态" label-width="100px">
                                <el-select v-model="requireInfo.requirementStatus">
                                    <el-option v-for="item in selectRequireData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="文档状态" label-width="100px">
                                <el-select v-model="requireInfo.docStatus">
                                    <el-option v-for="item in selectDocData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="要求时间" label-width="100px">
                                <el-date-picker 
                                    v-model="requireInfo.requireTime" 
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="要求开始时间" 
                                    end-placeholder="要求结束时间" 
                                    format="yyyy-MM-dd HH:mm:ss" 
                                    value-format="yyyy-MM-dd HH:mm:ss" 
                                    placeholder="选择时间" 
                                    clearable
                                    align="right" 
                                    suffix-icon="el-icon-datetime">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="计划时间" label-width="100px">
                                <el-date-picker 
                                    v-model="requireInfo.planTime" 
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="计划开始时间" 
                                    end-placeholder="计划结束时间" 
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
                                    v-model="requireInfo.actualTime" 
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
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="提出人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('proposer','proposerName')" v-model="requireInfo.proposerName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="呈报" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('report','reportName')" v-model="requireInfo.reportName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="责任人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('responsible','responsibleName')" v-model="requireInfo.responsibleName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="分析人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('analyst','analystName')" v-model="requireInfo.analystName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="抄送" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('cc','ccName')" v-model="requireInfo.ccName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="发送人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('send','sendName')" v-model="requireInfo.sendName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="会议内容" label-width="100px">
                        <el-input type="textarea" v-model="requireInfo.content" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input type="textarea" v-model="requireInfo.remark" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="参考附件" label-width="100px">
                        <!-- <el-input type="textarea" v-model="requireInfo.refUrl" :rows="3"></el-input> -->
                        <component-upload 
                            ref="refUrl"
                            :oldFileList="requireInfo.refUrl"
                        />
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" type="primary" @click="submitRequire('requireForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>
                
            </el-dialog>
            <el-dialog  title="选择人员" :visible.sync="treeShow">
                <el-row style="marginBottom:20px;">
                    <el-col :span="24">
                        <el-button size="small" type="primary" @click.stop="handleTreeSelect">确认选择</el-button>
                    </el-col>
                </el-row>
                <el-tree :show-checkbox="true" ref="responsibleTree" :data="userTreeArray" node-key="uniqulId" :default-expanded-keys="[0]" :highlight-current="true">
                </el-tree>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import usertree from '../mixin/userTree'
import componentUpload from '@/components/upload'
import { queryRequirement ,updateRequirement, deleteRequirement, addRequirement ,getRequirement, getChildStatus, getProjects, getProducts } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, usertree],
    data() {
        return {
            reportShow: false,
            responsibleShow:false,
            productHasNotSelect:true,
            requireLoading: true,
            requirementStatusId: 26,
            docStatusId: 22,
            maxPage: 9999,
            selectInited: true,
            requireDialogShow: false,
            selectRequireData: [],
            selectDocData: [],
            selectProductData: [],
            selectProjectData:[],
            selectRefRequirementData: [],
            requireInfo: {
                name: '',
                mProductId:'',
                mProjectId:'',
                requirementStatus: '',
                docStatus: '',
                report: '',
                reportName: '',
                responsible: '',
                responsibleName: '',
                proposer:'',
                proposerName:'',
                send:'',
                sendName:'',
                isActive: '',
                isPublic: '',
                requireStart: '',
                requireEnd: '',
                planStart: '',
                planEnd: '',
                actualStart: '',
                actualEnd: '',
                content: '',
                remark: '',
                refUrl: '',
                contentBrief: ''
            },
            requireInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入需求名称',
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
                mProjectId: [
                    {
                        required: true,
                        message: '请选择项目',
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
        this.getRouterParams()
        this.initSelectRequireData()
        this.initSelectDocData()
        this.initSelectProductData()
        this.initSelectRefRequirementData()
    },
    methods: {
        initData() {
            this.getRequirement();
        },
        getRouterParams(){
            let summaryItemData = sessionStorage.summaryItemData
            console.log(this.$route)
            if(summaryItemData){
                summaryItemData = JSON.parse(summaryItemData)
                Object.assign( this.requireInfo, summaryItemData )
                delete sessionStorage.summaryItemData
                this.$nextTick( () => {
                    this.requireDialogShow = true
                })
            }

        },
        selectProduct(mProductId){
            // this.requireInfo.mProjectId = ''
            this.initSelectProjectData(mProductId)
            if( !this.productHasNotSelect ){
                this.requireInfo.mProjectId = null
            }
        },
        async getRequirement(order = {}) {
            this.tableData = []
            this.handleGet(this.tableData, getRequirement ).then(() => {
                this.requireLoading = false
                this.tableData.forEach(item => {
                    item.mProductId = item.mProductId >> 0
                    item.mProjectId = item.mProjectId >> 0
                    item.isActiveCN = item.isActive === 'N' ? '否' : '是'
                    item.isPublicCN = item.isPublic === 'N' ? '否' : '是'
                    let fileList = []
                    if(item.refUrl.trim()){
                        item.refUrl.split(',').forEach( (item)=>{
                            fileList.push(item)
                        } )
                    }
                    item.refUrl =  fileList
                    item.requireStart ? (item.requireTime = [ item.requireStart, item.requireEnd ] ) : (item.requireTime = [] )
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )
                })
            })
        },
        addRequirement() {
            this.requireInfo = {
                refUrl: []
            }
            this.productHasNotSelect = true
            this.requireDialogShow = true
            this.handleAdd()
            this.$nextTick( ()=>{
                this.$refs.refUrl.clearFiles()
            } )
        },
        deleteRequireConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteRequire(row.mRequirementId) })
        },
        async deleteRequire(mRequirementId) {
            this.handleDelete(mRequirementId, deleteRequirement, () => {this.getRequirement();});
        },
        updateRequirement(row) {
            this.requireDialogShow = true
            this.productHasNotSelect = false
            this.initSelectProjectData(row.mProductId)
            this.requireInfo = Object.assign({}, this.handleUpdate(this.requireInfo, row)); 
            this.$nextTick( () => {
                this.$refs.refUrl.clearFiles()
            } )
        },
        submitRequire(formName) {
            let params = this.formatParams()
            this.handleSubmit(formName, params, addRequirement, updateRequirement).then(() => {this.requireDialogShow = false; this.getRequirement(); this.initSelectRefRequirementData() })
        },
        formatParams(){
            let refUrl = [].concat(this.$refs.refUrl._data.fileList, this.$refs.refUrl.oldFileList)
            let requireStart,
                requireEnd,
                actualStart,
                actualEnd,
                planStart,
                planEnd,
                refRequirementNames;
            let { requireTime, actualTime, planTime  } = this.requireInfo
            requireTime && ( [ requireStart, requireEnd ] = requireTime )
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )

            let selectRefRequirement = this.selectRefRequirementData.filter( item => {
                return item.mRequirementId == this.requireInfo.refRequirementIds
            } )

            refRequirementNames = selectRefRequirement[0] && selectRefRequirement[0].name;
            
            let params = Object.assign({},this.requireInfo, { refUrl: refUrl.join(',') }, {
                requireStart,
                requireEnd,
                actualStart,
                actualEnd,
                planStart,
                planEnd,
                refRequirementNames
            }) 
            return params
        },
        async initSelectRequireData() {
            this.selectRequireData = []
            this.handleGet(this.selectRequireData, getChildStatus, {pageSize: this.maxPage}, this.requirementStatusId ).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectDocData() {
            this.selectDocData = []
            this.handleGet(this.selectDocData, getChildStatus, {pageSize: this.maxPage}, this.docStatusId ).then(() => {
                this.selectInited = false;
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
        async initSelectRefRequirementData(keyword = '') {
            this.selectRefRequirementData = []
            let { data } = await queryRequirement({ keyword })
            this.selectRefRequirementData.push(...data)
        },
        handleCurrentChange(current) {
            this.pagin.currentPage = current;
            this.getRequirement()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getRequirement()
        },
    },
    components: {
        componentUpload
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
.file-item{
    margin-right: 25px;
}
</style>
