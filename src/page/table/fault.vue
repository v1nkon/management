<template>
    <div class="fillcontain">
        <div class="table_container">    
            <head-top />
            <add-btn 
                :auth="auth"
                :operate="addFault"
                :operateName="'新增故障'"/>
            <el-table 
                height="700"
                border
                :data="tableData" 
                :highlight-current-row="true" 
                v-loading="faultLoading" 
                style="width: 100%" 
                label-width="120px">
                <el-table-column type="expand" label-width="120px">
                    <template slot-scope="props" label-width="120px">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-row>
                                <el-col>
                                    <el-form-item label="故障内容" label-width="120px">
                                        <span>{{ props.row.content }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="故障原因" label-width="120px">
                                        <span>{{ props.row.reason }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="参考故障名称" label-width="120px">
                                <span>{{ props.row.refFaultNames }}</span>
                            </el-form-item>
                            <el-row>
                                <el-col>
                                    <el-form-item label="参考附件" label-width="120px" style="width: 100%">
                                        <a class="file-item" v-for=" (item, index) in props.row.faultRefUrl " :download="item" :key="index" :href="item" v-fileName="item">  </a>
                                    </el-form-item>    
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="原因参考附件" label-width="120px" style="width: 100%">
                                        <a class="file-item" v-for=" (item, index) in props.row.reasonRefUrl " :download="item" :key="index" :href="item" v-fileName="item">  </a>
                                    </el-form-item>    
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="解决参考附件" label-width="120px" style="width: 100%">
                                        <a class="file-item" v-for=" (item, index) in props.row.solutionRefUrl " :download="item" :key="index" :href="item" v-fileName="item">  </a>
                                    </el-form-item>    
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="验证参考附件" label-width="120px" style="width: 100%">
                                        <a class="file-item" v-for=" (item, index) in props.row.validationRefUrl " :download="item" :key="index" :href="item" v-fileName="item">  </a>
                                    </el-form-item>    
                                </el-col>
                            </el-row>
                            <el-form-item label="产品名称" label-width="120px">
                                <span>{{ props.row.mProductName }}</span>
                            </el-form-item>
                            <el-form-item label="项目名称" label-width="120px">
                                <span>{{ props.row.mProjectName }}</span>
                            </el-form-item>
                            <el-form-item label="备注" label-width="120px">
                                <span>{{ props.row.remark }}</span>
                            </el-form-item>
                            <el-form-item label="文档状态" label-width="120px">
                                <span>{{ props.row.docStatusName }}</span>
                            </el-form-item>

                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="指派人" label-width="120px">
                                        <span>{{ props.row.assignerName }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="指派时间" label-width="120px">
                                        <span>{{ props.row.assignTime }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="提出人" label-width="120px">
                                <span>{{ props.row.proposer }}</span>
                            </el-form-item>
                            <el-row>
                                <el-col>
                                    <el-form-item label="发送" label-width="120px">
                                        <span>{{ props.row.sendName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="抄送" label-width="120px">
                                        <span>{{ props.row.ccName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="呈报" label-width="120px">
                                        <span>{{ props.row.reportName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="责任人" label-width="120px">
                                        <span>{{ props.row.responsibleName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="验证人" label-width="120px">
                                        <span>{{ props.row.verifierName }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                            <el-row>
                                <el-col>
                                    <el-form-item label="原因参考附件" label-width="120px">
                                        <span>{{ props.row.reasonRefUrl }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="解决方法" label-width="120px">
                                        <span>{{ props.row.solution }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="解决参考附件" label-width="120px">
                                        <span>{{ props.row.solutionRefUrl }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="验证结果" label-width="120px">
                                        <span>{{ props.row.validationResult }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <el-form-item label="验证参考附件" label-width="120px">
                                        <span>{{ props.row.validationRefUrl }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="要求开始时间" label-width="120px">
                                <span>{{ props.row.FaultStart }}</span>
                            </el-form-item>
                            <el-form-item label="要求结束时间" label-width="120px">
                                <span>{{ props.row.FaultEnd }}</span>
                            </el-form-item>
                            <el-form-item label="计划开始时间" label-width="120px">
                                <span>{{props.row.planStart}}</span>
                            </el-form-item>
                            <el-form-item label="计划结束时间" label-width="120px">
                                <span>{{ props.row.planEnd }}</span>
                            </el-form-item>
                            <el-form-item label="实际开始时间" label-width="120px">
                                <span>{{ props.row.actualStart }}</span>
                            </el-form-item>
                            <el-form-item label="实际结束时间" label-width="120px">
                                <span>{{ props.row.actualEnd }}</span>
                            </el-form-item>
                            <el-form-item label="验证开始时间" label-width="120px">
                                <span>{{ props.row.validationStart }}</span>
                            </el-form-item>
                            <el-form-item label="验证结束时间" label-width="120px">
                                <span>{{ props.row.validationEnd }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间" label-width="120px">
                                <span>{{ props.row.created }}</span>
                            </el-form-item>
                            <el-form-item label="创建人" label-width="120px">
                                <span>{{ props.row.createdByName }}</span>
                            </el-form-item>
                            <el-form-item label="修改时间" label-width="120px">
                                <span>{{ props.row.updated }}</span>
                            </el-form-item>    
                            <el-form-item label="修改人" label-width="120px">
                                <span>{{ props.row.updatedByName }}</span>
                            </el-form-item>
                            </el-row>
                            
                            
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="故障名称" align="center" prop="name"> </el-table-column>
                <el-table-column label="故障内容" align="center">
                    <template slot-scope="scope">
                        {{scope.row.content | shortBrif}}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="产品名称" align="center" prop="mProductName"> </el-table-column> -->
                <!-- <el-table-column label="项目名称" align="center" prop="mProjectName"> </el-table-column> -->
                <el-table-column label="故障原因" align="center" prop="reason"> </el-table-column>
                <el-table-column label="提出人" align="center" prop="proposerName"> </el-table-column>
                
                <el-table-column label="故障状态" width="100" align="center" prop="faultStatusName"> </el-table-column>
                <!-- <el-table-column label="文档状态" align="center" prop="docStatusName"> </el-table-column> -->
                <!-- <el-table-column label="创建人" align="center" prop="createdBy"> </el-table-column> -->
                <el-table-column label="创建时间" width="210" align="center" prop="created"> </el-table-column>
                <el-table-column v-if="auth.delete || auth.update" label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                        <el-button v-if="auth.update" size="mini" type="primary" @click="updateFault(scope.row)">修改</el-button>
                        <el-button v-if="auth.delete" size="mini" type="danger" @click="deleteFaultConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                </el-pagination>
            </div>
            <el-dialog :title="isUpdate ? '修改故障' : '添加故障'" :visible.sync="faultDialogShow">
                <el-form :model="faultInfo" :rules="faultInfoRules" ref="FaultForm">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="故障名称" label-width="100px" prop="name">
                                <el-input v-model="faultInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="父故障名称" label-width="100px">
                                <el-select @change="selectProduct" v-model="faultInfo.parentFaultId">
                                    <el-option v-for="item in selectFaultTableData" :key="item.value" :label="item.name" :value="item.parentFaultId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="参考故障名称" label-width="100px">
                                <el-select v-model="faultInfo.refFaultIds">
                                    <el-option v-for="item in selectFaultTableData"  :key="item.value" :label="item.name" :value="item.refFaultIds">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="产品名称" label-width="100px" prop="mProductId">
                                <el-select @change="selectProduct" v-model="faultInfo.mProductId">
                                    <el-option v-for="item in selectProductData" :key="item.value" :label="item.name" :value="item.mProductId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称" label-width="100px" prop="mProjectId">
                                <el-select v-model="faultInfo.mProjectId" :disabled="productHasNotSelect">
                                    <el-option v-for="item in selectProjectData"  :key="item.value" :label="item.name" :value="item.mProjectId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="故障状态" label-width="100px">
                                <el-select v-model="faultInfo.FaultStatus">
                                    <el-option v-for="item in selectFaultData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="文档状态" label-width="100px">
                                <el-select v-model="faultInfo.docStatus">
                                    <el-option v-for="item in selectDocData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="faultInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否公开" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="faultInfo.isPublic"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    

                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="要求时间" label-width="100px">
                                <el-date-picker 
                                    v-model="faultInfo.requireTime" 
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
                                    v-model="faultInfo.planTime" 
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
                                    v-model="faultInfo.actualTime" 
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
                            <el-form-item label="指派人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('assigner', 'assignerName')" v-model="faultInfo.assignerName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="发送人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('send', 'sendName')" v-model="faultInfo.sendName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="抄送" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('cc','ccName')" v-model="faultInfo.ccName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="呈报" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('report', 'reportName')" v-model="faultInfo.reportName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="责任人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('responsible', 'responsibleName')" v-model="faultInfo.responsibleName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="验证人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('verifier','verifierName')" v-model="faultInfo.verifierName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="提出人" label-width="100px">
                                <el-input type="textarea" :readonly="true" @click.native="handleTreeOpen('proposer', 'proposerName')" v-model="faultInfo.proposerName" auto-complete="off" :rows="3"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="故障内容" label-width="100px">
                        <el-input type="textarea" v-model="faultInfo.content" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input type="textarea" v-model="faultInfo.remark" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="参考附件" label-width="100px">

                        <component-upload 
                            ref="refUrl"
                            :oldFileList="faultInfo.faultRefUrl"
                        />

                        <!-- <el-upload 
                            drag
                            :limit="5"
                            :on-exceed="fileExceed" 
                            action="/api/v1/file/upload" 
                            multiple 
                            :on-success="fileSuccess"
                            :on-remove="fileRemove"
                            ref="fileUpload"
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                        <ul class="el-upload-list el-upload-list--text" ref="oldFiles">
                            <li v-for=" (item, index) in faultInfo.faultRefUrl" :data-url="item" :key="index"  class="el-upload-list__item is-success">
                                <a class="el-upload-list__item-name">
                                    <i class="el-icon-document"></i>
                                        <a :href="item" v-fileName="item"> {{ item }} </a>
                                </a>
                                <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                                </label>
                                <i class="el-icon-close" @click="deleteFile(faultInfo.faultRefUrl, index)"></i>
                                <i class="el-icon-close-tip">按 delete 键可删除</i>
                            </li>
                        </ul> -->
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFault('FaultForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>
                
            </el-dialog>
            <el-dialog  title="选择人员" :visible.sync="treeShow">
                <el-row style="marginBottom:20px;">
                    <el-col :span="24">
                        <el-button size="max" type="primary" @click.stop="handleTreeSelect">确认选择</el-button>
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
import { updateFault, deleteFault, addFault ,getFault, getChildStatus, getProjects, getProducts } from '@/api/getData'
import { mapState } from 'vuex'
export default {
    mixins: [mixin, usertree],
    data() {
        return {
            faultDialogShow:false,
            productHasNotSelect:true,
            faultLoading: true,
            FaultStatusId: 26,
            docStatusId: 32,
            maxPage: 9999,
            selectInited: true,
            selectFaultData: [],
            selectDocData: [],
            selectProductData: [],
            selectProjectData:[],
            selectFaultTableData: [],
            faultInfo: {
                name: '',
                mProductId:'',
                mProjectId:'',
                faultStatus: '',
                docStatus: '',
                report: '',
                reportName: '',
                responsible: '',
                responsibleName: '',
                proposer:'',
                proposerName:'',
                isActive: '',
                isPublic: '',
                FaultStart: '',
                FaultEnd: '',
                planStart: '',
                planEnd: '',
                actualStart: '',
                actualEnd: '',
                content: '',
                remark: '',
                faultRefUrl: '',
            },
            faultInfoRules: {
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
                ],
            },
            tableData: []
        }
    },
    computed: {
        ...mapState(["isUpdate"])
    },
    created() {
        this.modleInfoName = 'faultInfo'
        this.initSelectFaultData()
        this.initSelectDocData()
        this.initSelectProductData()
    },
    methods: {
        initData() {
            this.getFault();
        },
        selectProduct(mProductId){
            this.initSelectProjectData(mProductId)
        },
        async getFault(order = {}) {
            this.tableData = []
            this.handleGet(this.tableData, getFault ).then(() => {
                this.faultLoading = false
                this.tableData.forEach(item => {
                    item.mProductId = item.mProductId >> 0
                    item.contentBrief = item.content.slice(0, 20)

                    let fileList = []
                    if(item.faultRefUrl.trim()){
                        item.faultRefUrl.split(',').forEach( (item)=>{
                            fileList.push(item)
                        } )
                    }
                    item.faultRefUrl =  fileList

                    item.requireStart ? (item.requireTime = [ item.requireStart, item.requireEnd ] ) : (item.requireTime = [] )
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )

                })
            })
        },
        addFault() {
            this.faultInfo = {
                faultRefUrl: []
            }
            this.faultDialogShow = true
            this.handleAdd()

            this.$nextTick( ()=>{
                this.$refs.refUrl.clearFiles()
            } )

            // this.$refs.fileUpload.clearFiles()
        },
        deleteFaultConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteFault(row.mFaultId) })
        },
        async deleteFault(mFaultId) {
            this.handleDelete(mFaultId, deleteFault, () => {this.getFault();});
        },
        updateFault(row) {
            this.faultDialogShow = true
            this.productHasNotSelect = false
            this.initSelectProjectData(row.mProductId)
            this.handleUpdate(this.faultInfo, row)
            this.$nextTick( ()=>{
                this.$refs.refUrl.clearFiles()
            } )
        },
        submitFault(formName) {
            let params = this.formatParams()
            if(params){
                this.handleSubmit(formName, params, addFault, updateFault).then( () => {this.faultDialogShow = false; this.getFault()} )
            }
        },

        formatParams(){
            let faultRefUrl = [].concat(this.$refs.refUrl._data.fileList, this.$refs.refUrl.oldFileList)
            if(faultRefUrl.length > 5){
                this.$message({
                    type:'error',
                    message: '附件最大上传量为5'
                })
                return false;
            }
            let requireStart,
                requireEnd,
                actualStart,
                actualEnd,
                planStart,
                planEnd;
            let { requireTime, actualTime, planTime  } = this.faultInfo
            requireTime && ( [ requireStart, requireEnd ] = requireTime )
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )
            let params = Object.assign({},this.faultInfo, { faultRefUrl: faultRefUrl.join(',') }, {
                requireStart,
                requireEnd,
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },

        async initSelectFaultData() {
            this.selectFaultData = []
            this.handleGet(this.selectFaultData, getChildStatus, {pageSize: this.maxPage}, this.FaultStatusId ).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectFaultTableData() {
            this.selectFaultData = []
            this.handleGet(this.selectFaultTableData, getFault, {pageSize: this.maxPage}).then(() => {
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

        handleCurrentChange(current) {
            this.pagin.currentPage = current;
            this.getFault()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getFault()
        },
    },
    components: {
        componentUpload
    }
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