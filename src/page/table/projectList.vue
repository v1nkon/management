<template>
    <div>
        <transition name="project-animation">
            <div title="项目" class="inner-dialog" v-show="isprojectShow">
                <div class="project-container table_container">
                    <head-top v-if="single"></head-top>
                    <el-col v-if="single" :span="24" class='actions-top'>
                        <el-form class="demo-form-inline">
                            <el-form-item>
                                <el-button size="small" @click="addProject()" type="primary">新增项目</el-button>
                                <el-button size="small" @click="deleteprojectConfirm()" type="primary">删除项目</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-table 
                        v-loading="projectLoading" 
                        :height=" single ? 500 : 250" 
                        :data="projectData" 
                        align="center" 
                        border
                        @selection-change="projectSelect">
                        <el-table-column v-if="single" type="selection" width="55" class="adRefListId">

                        </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <!-- <el-form-item label="项目ID"><span>{{ props.row.mProjectId }}</span>
                                    </el-form-item>
                                    <el-form-item label="产品ID"><span>{{ props.row.mProductId }}</span>
                                    </el-form-item>
                                    <el-form-item label="组织ID"><span>{{ props.row.adOrgId }}</span>
                                    </el-form-item> -->
                                    <el-form-item label="备注" style="width: 100%">
                                        <span>{{ props.row.remark }}</span>
                                    </el-form-item>
                                    <el-form-item label="说明" style="width: 100%"><span>{{ props.row.description }}</span>
                                    </el-form-item>
                                    <el-form-item label="是否活跃"><span>{{ props.row.isActiveCN }}</span>
                                    </el-form-item>
                                    <el-form-item label="状态编码"><span>{{ props.row.projectStatusName }}</span></el-form-item>
                                    <el-form-item label-width="150px" label="计划开始时间"><span>{{ props.row.planStart }}</span>
                                    </el-form-item>
                                    <el-form-item label-width="150px" label="计划结束时间">
                                        <span>{{ props.row.planEnd }}</span>
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
                        <!-- <el-table-column label="引用ID" prop="adReferenceId"> </el-table-column> -->
                        <el-table-column label="项目名称" align="center" prop="name"> </el-table-column>
                        <el-table-column label="说明" align="center" prop="descriptionBrief"> </el-table-column>
                        <el-table-column label="项目状态" width="100"  align="center" prop="statusName"> </el-table-column>
                        <el-table-column label="实际开始时间" align="center" prop="actualStart"> </el-table-column>
                        <el-table-column label="实际结束时间" align="center" prop="actualEnd"> </el-table-column>
                        <!-- <el-table-column label="是否活跃" align="center">
                            <template slot-scope="scope">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="创建人" width="110" align="center" prop="createdByName"> </el-table-column>
                        <el-table-column sortable="custom" label="创建时间" align="center" prop="created"> </el-table-column>
                        <el-table-column v-if="single" label="操作" align="center" width="170">
                            <template slot-scope="scope">
                                <!-- <el-button size="max" type="success" @click="addprojectTable(scope.$index, scope.row)">新增</el-button> -->
                                <el-button size="mini" type="success" @click="updateProject(scope.row)">修改</el-button>
                                <!-- <el-button size="max" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="Pagination">
                        <el-pagination @current-change="handleprojectCurrentChange" :current-page="projectPagin.currentPage" :page-size="projectPagin.pageSize" layout="total, prev, pager, next" :total="projectPagin.totalPage">
                        </el-pagination>
                    </div>
                </div>

            </div>
        </transition>
        <el-dialog :title="isUpdate ? '项目修改' : '项目新增' " size="" :visible.sync="addProjectShow">
            <header class="form_header">项目信息</header>

            <el-form :model="projectInfo" ref="projectInfo" :rules="projectInfoRules">
                <el-row>
                    <el-col>
                        <el-form-item label="项目名称" label-width="100px" prop="name">
                            <el-input v-model="projectInfo.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属产品" label-width="100px" prop="mProductId">
                            <el-select v-model="projectInfo.mProductId">
                                <el-option v-for="item in selectProductData" :key="item.mProductId" :label="item.name" :value="item.mProductId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="12">
                        <el-form-item label="是否活跃" label-width="100px">
                            <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="projectInfo.isActive" auto-complete="off"></el-switch>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="项目状态" label-width="100px">
                            <el-select v-model="projectInfo.projectStatus">
                                <el-option v-for="item in selectProjectData" :key="item.value" :label="item.name" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="项目描述" label-width="100px">
                            <el-input type="textarea" v-model="projectInfo.description" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="备注" label-width="100px">
                            <el-input type="textarea" v-model="projectInfo.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="预计时间" label-width="100px">
                            <el-date-picker 
                                v-model="projectInfo.planTime" 
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
                                v-model="projectInfo.actualTime" 
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
                    <el-col>
                        <el-form-item label="" label-width="0px" style="text-align:center;">
                            <el-button type="primary" @click="subProjectForm('projectInfo')" class="submit_btn" v-html="isUpdate ? '修改' : '新增' "></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import { getChildStatus, updateProjects, deleteProjects, addProjects, getAllProjects, getProducts } from '@/api/getData'
export default {
    props: {
        single: {
            type: Boolean,
            default: true
        },
        getApi: {
            type: Function,
            default: getAllProjects
        }
    },
    mixins: [mixin],
    data() {
        return {
            adReferenceId: 25,//产品的状态ID
            maxPage: 9999,
            selectInited: true,
            mProductId: '',
            projectLoading: true,
            addProjectShow: false,
            beforeMProductId: '',
            isprojectShow: true,
            projectName: '',
            projectData: [],
            projectInfo: {
                name: '',
                description: '',
                projectStatus: '',
                isActive: false,
                planStart: '',
                planEnd: '',
                actualStart: '',
                actualEnd: '',
                remark: '',
                mProductId:''
            },
            projectInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入会议标题',
                        trigger: 'blur'
                    }
                ],
                mProductId: [
                    {
                        required: true,
                        message: '请选择产品',
                        trigger: 'blur'
                    }
                ]
            },
            selectProject: [],
            projectPagin: {
                totalPage: 0,
                currentPage: 1,
                pageSize: 10
            },
            selectProductData: [],
            selectProjectData: []
        }
    },
    methods: {
        initData() {
            this.initSelectProjectData()
            this.initSelectProductData()
            if( this.single ) {
                this.getProjects()
            }
        },
        
        async getProjects(order = {}) {

            this.projectData = []
            this.handleGet(this.projectData, this.getApi, this.projectPagin, this.mProductId).then(() => {
                this.projectLoading = false
                
                this.projectData.forEach( item => {
                    item.descriptionBrief = item.description.slice(0, 20)
                    item.isActiveCN = item.isActive == 'N' ? '否' : '是' 
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )
                } )
            })

        },
        addProject() {
            this.addProjectShow = true
            this.projectInfo = {}
            this.handleAdd()
        },

        deleteprojectConfirm(){
            if( this.selectProject.length == 0 ){
                this.$notify.error({
                        title: '错误',
                        message: '请选中需要删除的项目',
                        offset: 100
                    });
                return 
            }
            this.$confirm('确认删除？').then( _ => { this.deleteProjects() })
        },
        deleteProjects(){
            let id  = this.selectProject.join(',')
            this.handleDelete(id, deleteProjects, () => {this.getProjects();});
        },
        updateProject(row) {

            this.addProjectShow = true
            this.projectInfo = Object.assign({}, this.handleUpdate(this.projectInfo, row))
            
        },
        async subProjectForm(formName) {

            let params = this.formatParams()
            this.handleSubmit(formName, params, addProjects, updateProjects).then(() => { this.getProjects(); this.addProjectShow = false; })

        },
        formatParams(){
            let actualStart,
                actualEnd,
                planStart,
                planEnd;
            let {  actualTime, planTime  } = this.projectInfo
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )
            let params = Object.assign({}, {mProductId: this.mProductId}, this.projectInfo ,{
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },

        sortProductTable({ prop, order }) {
            let sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getProducts({ sortType })
        },
        projectSelect(args){
            let arr = [...args]
            this.selectProject = []
            arr.forEach((item, i) => {
                this.selectProject.push(item.mProjectId)
            })
        },

        async initSelectProductData() {
            this.selectProductData = []
            this.handleGet(this.selectProductData, getProducts, { pageSize: this.maxPage }, 25).then(() => {
                this.selectInited = false;
            })
        },
        async initSelectProjectData() {
            this.selectProjectData = []
            this.handleGet(this.selectProjectData, getChildStatus, { pageSize: this.maxPage }, 25).then(() => {
                this.productHasNotSelect = false
            })
        },
        checkProjectTable(scope) {
            this.projectLoading = true
            this.projectPagin.currentPage = 1//重置当前页
            let id = scope.mProductId
            if (this.mProductId) {
                this.beforeMProductId = this.mProductId
            }
            this.mProductId = id
            this.projectName = scope.name
            this.isprojectShowFlag = !this.isprojectShowFlag
            this.getProjects()
            if (this.mProductId != this.beforeMProductId) {
                this.isprojectShow = true
            } else {
                this.isprojectShow = this.isprojectShowFlag
            }
        },
        handleprojectCurrentChange(currentPage) {
            this.projectPagin.currentPage = currentPage
            this.getProjects()
        },


    }
}
</script>

<style lang="less">
@import '../../style/mixin';
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 110px;
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

.form_header {
    text-align: center;
    margin-bottom: 10px;
}

.table-header {
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
}
</style>
