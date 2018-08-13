<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click.stop="addModule">新增模块</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table height="700" border :data="tableData" stripe :highlight-current-row="true" v-loading="moduleLoading" style="width: 100%" label-width="120px">
                <el-table-column type="expand" label-width="120px">
                    <template slot-scope="props" label-width="120px">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="模块名称" label-width="120px">{{ props.row.name }}</el-form-item>
                            <!-- <el-form-item label="模块ID" label-width="120px">{{ props.row.mModuleId }}</el-form-item> -->
                            <el-form-item label="模块说明" label-width="120px">{{ props.row.description }}</el-form-item>
                            <el-form-item label="模块状态" label-width="120px">{{ props.row.moduleStatusName }}</el-form-item>
                            <el-form-item label="产品名称" label-width="120px">{{ props.row.mProductName }}</el-form-item>
                            <el-form-item label="项目名称" label-width="120px">{{ props.row.mProjectName }}</el-form-item>
                            <!-- <el-form-item label="产品ID" label-width="120px">{{ props.row.mProductId }}</el-form-item> -->
                            <!-- <el-form-item label="项目ID" label-width="120px">{{ props.row.mProjectId }}</el-form-item> -->

                            <el-form-item label="提出人" label-width="120px">{{ props.row.proposerName }}</el-form-item>
                            <el-form-item label="备注" label-width="120px">{{ props.row.remark }}</el-form-item>
                            <!-- <el-form-item label="组织ID" label-width="120px">{{ props.row.adOrgID }}</el-form-item> -->
                            <el-row>
                                <el-form-item label="计划开始时间" label-width="120px"> {{props.row.planStart}}</el-form-item>
                                <el-form-item label="计划结束时间" label-width="120px">{{ props.row.planEnd }}</el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="实际开始时间" label-width="120px">{{ props.row.actualStart }}</el-form-item>
                                <el-form-item label="实际结束时间" label-width="120px">{{ props.row.actualEnd }}</el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="修改时间" label-width="120px">{{ props.row.updated }}</el-form-item>
                                <el-form-item label="修改人" label-width="120px">{{ props.row.updatedByName }}</el-form-item>
                            </el-row>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="模块名称" align="center" prop="name"> </el-table-column>
                <el-table-column label="模块说明" align="center">
                    <template slot-scope="scope">
                        {{scope.row.description | shortBrif}}
                    </template>
                </el-table-column>
                <el-table-column label="模块状态" width="100" align="center" prop="moduleStatusName"> </el-table-column>
                <el-table-column label="产品名称" align="center" prop="mProductName"> </el-table-column>
                <el-table-column label="项目名称" align="center" prop="mProjectName"> </el-table-column>
                <!-- <el-table-column label="是否活跃" align="center">
                        <template slot-scope="scope">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                        </template>
                    </el-table-column> -->
                <el-table-column label="创建人" width="100" align="center" prop="createdByName"> </el-table-column>
                <el-table-column label="创建时间" width="210" align="center" prop="created"> </el-table-column>
                <el-table-column label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <!-- <el-button  size="max" type="success"  @click="addFood(scope.$index, scope.row)">新增</el-button> -->
                        <el-button size="mini" type="primary" @click="updateModule(scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteRequireConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                </el-pagination>
            </div>
            <el-dialog v-loading="selectInited" :title="isUpdate ? '修改模块' : '添加模块'" :visible.sync="moduleDialogShow">
                <el-form :model="moduleInfo" :rules="moduleInfoRules" ref="requireForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="模块名称" label-width="100px" prop="name">
                                <el-input v-model="moduleInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="模块状态" label-width="100px" prop="moduleStatus">
                                <el-select v-model="moduleInfo.moduleStatus">
                                    <el-option v-for="item in selectModuleData" :key="item.value" :label="item.name" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="产品名称" label-width="100px" prop="mProductId">
                                <el-select @change="selectProduct" v-model="moduleInfo.mProductId">
                                    <el-option v-for="item in selectProductData" :key="item.mProductId" :label="item.name" :value="item.mProductId">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目名称" label-width="100px" prop="mProjectId">
                                <el-select @change="selectProject" v-model="moduleInfo.mProjectId" clearable :disabled="productHasNotSelect" ref="projectRef">
                                    <el-option v-for="item in selectProjectData" :key="item.mProjectId" :label="item.name" :value="item.mProjectId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="moduleInfo.isActive"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-show="isCustomShow">
                            <el-form-item label="是否定制化开发" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="moduleInfo.isCustom"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="计划时间" label-width="100px">
                                <el-date-picker v-model="moduleInfo.planTime" type="datetimerange" range-separator="至" start-placeholder="计划开始时间" end-placeholder="计划结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="实际时间" label-width="100px">
                                <el-date-picker v-model="moduleInfo.actualTime" type="datetimerange" range-separator="至" start-placeholder="实际开始时间" end-placeholder="实际结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述" label-width="100px" prop="description">
                        <el-input type="textarea" v-model="moduleInfo.description" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="100px">
                        <el-input type="textarea" v-model="moduleInfo.remark" :rows="3"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" type="primary" @click="submitRequire('requireForm')" v-html="isUpdate ? '修 改' : '新 增'"></el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import { queryModule, updateModule, deleteModule, addModule, getModule, getChildStatus, getSelectChildStatus, getProjects, getProducts } from '@/api/getData'
export default {
    mixins: [mixin],
    data() {
        return {
            productHasNotSelect: true,
            moduleLoading: true,
            isCustomShow: false,
            moduleStatusId: 26,
            maxPage: 9999,
            selectInited: true,
            moduleDialogShow: false,
            selectModuleData: [],
            selectDocData: [],
            selectProductData: [],
            selectProjectData: [],
            selectRefModuleData: [],
            moduleInfo: {
                actualStart: '',
                actualEnd: '',
                planStart: '',
                planEnd: '',
                isActive: 'N',
                isCustom: 'N',
                mProjectId: '',
                mProductId: '',
                moduleStatus: ''
            },
            moduleInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入模块名称',
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
                moduleStatus: [
                    {
                        required: true,
                        message: '请选择模块状态',
                        trigger: 'blur'
                    }
                ],
                planStart: [
                    {
                        required: true,
                        message: '时间必填',
                        trigger: 'blur'
                    }
                ],
                planEnd: [
                    {
                        required: true,
                        message: '时间必填',
                        trigger: 'blur'
                    }
                ],
                actualStart: [
                    {
                        required: true,
                        message: '时间必填',
                        trigger: 'blur'
                    }
                ],
                actualEnd: [
                    {
                        required: true,
                        message: '时间必填',
                        trigger: 'blur'
                    }
                ],
                description: [
                    {
                        required: true,
                        message: '描述必填',
                        trigger: 'blur'
                    }
                ]
            },
            tableData: []
        }
    },
    created() {
        // this.initSelectModuleData()

        this.initSelectStatusData('selectModuleData', 'ModuleStatus')

        this.initSelectProductData()
    },
    methods: {
        initData() {
            this.getModule();
        },
        selectProduct(mProductId) {
            this.initSelectProjectData(mProductId)
            // this.moduleInfo.mProjectId = null
            if (!this.productHasNotSelect) {
                this.moduleInfo.mProjectId = null
            }
            this.isCustomShow = false
            // Object.assign(this.moduleInfo, {mProjectId: ''})
            console.log(this.moduleInfo)
        },
        selectProject() {
            this.isCustomShow = true
        },
        async getModule(order = {}) {
            this.tableData = []
            this.handleGet(this.tableData, getModule).then(() => {
                this.moduleLoading = false
                this.tableData.forEach(item => {
                    item.mProductId = item.mProductId >> 0
                    item.mProjectId = item.mProjectId >> 0
                    item.descriptionBrief = item.description.slice(0, 20)
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )
                })
            })
        },
        addModule() {
            this.moduleInfo = {}
            this.moduleDialogShow = true
            this.handleAdd()
            // o
        },
        deleteRequireConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteRequire(row.mModuleId) })
        },
        async deleteRequire(mModuleId) {
            this.handleDelete(mModuleId, deleteModule, () => { this.getModule(); });
        },
        updateModule(row) {
            this.moduleDialogShow = true
            this.productHasNotSelect = false
            this.initSelectProjectData(row.mProductId)
            this.handleUpdate(this.moduleInfo, row)
        },
        submitRequire(formName) {
            let params = this.formatParams()

            this.handleSubmit(formName, params, addModule, updateModule).then(() => { this.moduleDialogShow = false; this.getModule() })
        },
        formatParams(){
            let actualStart,
                actualEnd,
                planStart,
                planEnd;
            let {  actualTime, planTime  } = this.moduleInfo
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )
            let params = Object.assign({}, this.moduleInfo ,{
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },
        initSelectStatusData(selectName, statusName) {
            this[selectName] = []
            this.handleGet(this[selectName], getSelectChildStatus, { pageSize: this.maxPage }, statusName).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectProductData() {
            this.selectProductData = []
            this.handleGet(this.selectProductData, getProducts, { pageSize: this.maxPage }).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectProjectData(mProductId) {
            this.selectProjectData = []
            this.handleGet(this.selectProjectData, getProjects, { pageSize: this.maxPage }, mProductId).then(() => {
                this.selectInited = false
                this.productHasNotSelect = false
            })
        },

        handleCurrentChange(current) {
            this.pagin.currentPage = current;
            this.getModule()
        },
        handleSort({ prop, order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getModule()
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

.table_container {
    padding: 20px;
    position: relative;
    .actions-top {
        position: absolute;
        right: 25px;
        top: 30px;
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
