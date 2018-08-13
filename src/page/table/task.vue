<template>
    <!-- 组织表 -->
    <div class="fillcontain">
        <div class="table_container" :v-loading="tableLoading">
            <head-top></head-top>

                <el-col :span="24" class='actions-top'>
                    <el-form class="demo-form-inline">
                        <el-form-item>
                            <el-button size="small" @click="addTaskTable" type="primary">新增任务</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
   
            <el-row>
                <el-table 
                    ref="taskTable"
                    height="700"
                    border
                    :data="taskTableData" 
                    @sort-change="sortTaskTable" 
                    @row-click="expandRow"
                    :highlight-current-row="true" 
                    align="center" 
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="任务名称"><span>{{ props.row.name }}</span></el-form-item>
                                <el-form-item label="任务状态"><span>{{ props.row.taskStatusName }}</span></el-form-item>
                                <el-form-item style="width:100%" label="内容"><span>{{ props.row.content }}</span></el-form-item>
                                <el-form-item style="width:100%" label="备注"><span>{{props.row.remark}}</span> </el-form-item>
                                <el-form-item label="产品"><span>{{ props.row.mProductName }}</span></el-form-item>
                                <el-form-item label="项目"><span>{{ props.row.mProjectName }}</span></el-form-item>
                                <el-form-item label="来源需求"><span>{{ props.row.mRequirementName }}</span></el-form-item>

                                <el-form-item label="责任人"><span>{{ props.row.responsibleName }}</span></el-form-item>
                                <el-form-item label="文档状态"><span>{{props.row.docStatusName}}</span> </el-form-item>
                                <el-form-item label="是否活跃"><span>{{props.row.isActive ? '是' : '否'}}</span></el-form-item>
                                <el-row>
                                    <el-form-item label-width="100px" label="计划开始时间"><span>{{props.row.planStart}}</span> </el-form-item>
                                    <el-form-item label-width="100px" label="计划结束时间"><span>{{props.row.planEnd}}</span> </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label-width="100px" label="实际开始时间"><span>{{props.row.actualStart}}</span> </el-form-item>
                                    <el-form-item label-width="100px" label="实际结束时间"><span>{{props.row.actualEnd}}</span> </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="创建时间"><span>{{ props.row.created }}</span></el-form-item>
                                    <el-form-item label="创建人"><span>{{ props.row.createdByName }}</span></el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="修改时间"><span>{{ props.row.updated }}</span></el-form-item>
                                    <el-form-item label="修改人"><span>{{ props.row.updatedByName }}</span></el-form-item>
                                </el-row>
                                
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="任务名称" align="center" prop="name"> </el-table-column>
                    <el-table-column label="内容" align="center">
                        <template slot-scope="scope">
                            {{scope.row.content | shortBrif}}
                        </template>
                    </el-table-column>
                    <el-table-column  width="100" label="任务状态" align="center" prop="taskStatusName"> </el-table-column>
                    <el-table-column width="100" label="责任人" align="center" prop="responsibleName"> </el-table-column>
                    <el-table-column label="创建时间" sortable="custom" width="210px" align="center" prop="created"> </el-table-column>
                    <!-- <el-table-column label="是否活跃" align="center" prop="isActive">
                        <template slot-scope="scope">
                            <el-switch :value="scope.row.isActive"></el-switch>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作" align="center" width="170">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click.stop="updateTask(scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click.stop="deleteTaskConfirm(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination @current-change="pageChangeHandler" :current-page="tabPagin.currentPage" :page-size="tabPagin.pageSize" layout="total, prev, pager, next" :total="tabPagin.totalPage">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <el-dialog :title="isUpdate ? '任务修改' : '任务新增'" :visible.sync="optDialogShow">
            <el-form v-loading="selectInited" :model="taskInfo" :rules="taskInfoRules" ref="taskInfo">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="任务名称" label-width="100px" prop="name">
                            <el-input v-model="taskInfo.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="任务状态" label-width="100px" prop="orderTime">
                            <el-select v-model="taskInfo.taskStatus" >
                                <el-option v-for="(item, index) in taskStatusList" :label="item.name" :value="item.value" :key="index"></el-option>
                            </el-select></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="所属产品" label-width="100px">
                                <el-select @change="selectedProduct" v-model="taskInfo.mProductId">
                                    <el-option v-for="item in selectProductData" :key="item.mProductId" :label="item.name" :value="item.mProductId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属项目" label-width="100px">
                                <el-select v-model="taskInfo.mProjectId">
                                    <el-option v-for="item in selectProjectData" :key="item.mProjectId" :label="item.name" :value="item.mProjectId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="来源需求" label-width="100px">
                            <el-select v-model="taskInfo.mRequirementId">
                                <el-option v-for="(item, index) in selectRefRequirementData" :key="index" :label="item.name" :value="item.mRequirementId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="责任人" label-width="100px">
                            <el-input readonly 
                                v-model="taskInfo.responsibleName"
                                auto-complete="off" 
                                @click.native="inputClickHandler('taskInfo', 'responsibleName', 'responsible')"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容" label-width="100px">
                            <el-input v-model="taskInfo.content" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="计划时间" label-width="100px">
                            <el-date-picker v-model="taskInfo.planTime" type="datetimerange" range-separator="至" start-placeholder="计划开始时间" end-placeholder="计划结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="实际时间" label-width="100px">
                            <el-date-picker v-model="taskInfo.actualTime" type="datetimerange" range-separator="至" start-placeholder="实际开始时间" end-placeholder="实际结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" label-width="100px">
                            <el-input type="textarea" :row="3" v-model="taskInfo.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="文档状态" label-width="100px">
                            <el-select v-model="taskInfo.docStatus" >
                                <el-option v-for="(item, index) in taskDocList" :label="item.name" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="" label-width="0px" style="text-align:right;">
                            <el-button type="primary" @click.stop="submitTask('taskInfo')" v-html="isUpdate ? '修改' : '新增' " class="submit_btn"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
        </el-dialog>
        <user-select 
            ref="userSelectDialog"
            nodeKey="uniqulId"
            :defaultExpandedKeys="['0^_^顶层']"
            :userTreeArray="userTreeArray"
            v-on:comfirSelectUser="comfirSelectUser"
        ></user-select>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
import userSelect from '../../components/userSelect' 
import userTreeMixin from '../mixin/userTree'
import mixin from '../mixin/mixin'
import { baseUrl, baseImgPath } from '@/config/env'
import { utils } from '@/util/util.js'
import { getTask, addTask, deleteTask, updateTask, getChildStatus, getProducts, getProjects, queryRequirement } from '@/api/getData'
export default {
    mixins: [userTreeMixin, mixin],
    data() {
        return {
            requireInfo: {},
            tableLoading: false,
            tabPagin: {
                pageSize: 10,
                currentPage: 1,
                totalPage: 1
            },
            taskTabParams: {
                sortBy: 'created',
                sortType: 'desc',
            },
            taskTableData: [],
            selectTaskTabData: [],
            optDialogShow: false,
            selectInited: false,
            taskInfo: {},
            taskInfoRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
            },
            treeTask: [{
                id: 0,
                label: '顶层',
                children: []
            }],
            currentSelectNode: {},
            taskStatusList: [],
            taskDocList: [],
            docStatus: [],
            maxPageSize: 9999,
            selectProductData: [],
            selectProjectData: [],
            selectRefRequirementData: []
        }
    },
    created() {
        this.getUserTree();
        
        this.initSelectData( 'selectProductData', getProducts, [ { pageSize: this.maxPageSize } ] );
        this.initSelectData('taskStatusList', getChildStatus, [ { pageSize: this.maxPageSize }, 27 ]);
        this.initSelectData('taskDocList', getChildStatus, [ { pageSize: this.maxPageSize }, 22 ]);
        this.initSelectRequirementData();
    },
    components: {
        headTop,
        userSelect
    },
    methods: {
        initData(){
            this.getTaskTabInfo();
        },
        /*--------------------------------- 数据渲染 */
        async getTaskTabInfo(){

            this.taskTableData = []

            this.tableLoading = true

            this.handleGet(this.taskTableData, getTask, this.pagin).then(() => {
                
                this.tableLoading = false

                this.taskTableData.forEach( item => {
                    item.contentBrief = item.content.slice(0, 20)
                    item.mRequirementId = item.mRequirementId.toString();
                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )

                } )
                this.tabPagin.totalPage = this.taskTableData.length
                console.log(this.taskTableData)
            })
        },

        addTaskTable(){
            // this.isUpdate = false;
            this.optDialogShow = true;
            this.taskInfo = {parentId: this.currentSelectNode.id, responsibleName: ''};
            this.handleAdd()
        },
        deleteTaskConfirm(row) {
            this.$confirm('确认删除？').then( _ => { this.deleteTask(row.mTaskId) })
        },
        async deleteTask(ids) {
            this.handleDelete(ids, deleteTask, () => { this.getTaskTabInfo() });
        },

        updateTask( row ) {
            
            this.optDialogShow = true;

            this.taskInfo = Object.assign({}, this.handleUpdate( this.taskInfo, row )) 
            this.handleUpdate( )
            if ( this.taskInfo.mProductId ){
                this.initSelectData( 'selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, this.taskInfo.mProductId] );
            }

        },

        /* ------------------------------- 表单提交（修改OR保存） */
        submitTask( formName ) {

            let params = this.formatParams()
            this.handleSubmit(formName, params, addTask, updateTask).then( () => {
                this.optDialogShow = false;
                this.getTaskTabInfo()
            } )

        },
        formatParams(){
            let actualStart,
                actualEnd,
                planStart,
                planEnd;

            let {  actualTime, planTime, mRequirementId  } = this.taskInfo
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )

            let params = Object.assign({}, this.taskInfo ,{
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },
        async initSelectData( selectDataName, apiName, params ){
            let { data, status, msg } = await apiName( ...params );

            if ( status == 200 ) {
                this[selectDataName] = data.data;
            }
        },
        /**-------------------------------- 表格操作 */
        sortTaskTable( { order } ){
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc');
            this.getTaskTabInfo()
        },
        
        async initSelectRequirementData(){
            let { data } = await queryRequirement();
            this.selectRefRequirementData = [...data];
        },
        /*--------------------------------- 分页响应 */
        pageChangeHandler(currentPage) {
            this.pagin.currentPage = currentPage;
            this.getTaskTabInfo()
        },
        
        selectedProduct( mProductId ){
            this.initSelectData( 'selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, mProductId] );
        },
        expandRow(row){
            this.$refs.taskTable.toggleRowExpansion( row )
        }
    }
}
</script>

<style lang="less">
@import '../../style/mixin';
.demo-table-expand {
    font-size: 0;
}

el-form.demo-table-expand label {
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
