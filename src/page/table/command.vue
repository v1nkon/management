<template>
    <!-- 组织表 -->
    <div class="fillcontain">
        <div class="table_container" :v-loading="tableLoading">
            <head-top></head-top>

            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" @click="addCmdTable()" type="primary">新增指令</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-row>
                <el-table height="700" border :data="cmdTableData" @sort-change="sortCmdTable" :highlight-current-row="true" align="center" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="命令名称：">
                                    <span>{{props.row.name}}</span>
                                </el-form-item>
                                <el-form-item label="内容：">
                                    <span>{{props.row.content}}</span>
                                </el-form-item>
                                <el-form-item label="下指令者：">
                                    <span>{{ props.row.commanderName }}</span>
                                </el-form-item>
                                <el-form-item label="下指令时间：" label-width="100px">
                                    <span>{{ props.row.orderTime }}</span>
                                </el-form-item>
                                <el-form-item label="产品：">
                                    <span>{{ props.row.mProductName }}</span>
                                </el-form-item>
                                <el-form-item label="项目：">
                                    <span>{{ props.row.mProjectName }}</span>
                                </el-form-item>
                                <el-form-item label="责任人：">
                                    <span>{{ props.row.responsibleName }}</span>
                                </el-form-item>
                                <el-form-item label="指令状态：">
                                    <span>{{props.row.commandStatusName}}</span>
                                </el-form-item>
                                <el-form-item label="备注：">
                                    <span>{{props.row.remark}}</span>
                                </el-form-item>
                                <el-form-item label="文档状态：">
                                    <span>{{props.row.docStatusName}}</span>
                                </el-form-item>

                                <el-row>
                                    <el-form-item label-width="120px" label="计划开始时间：">
                                        <span>{{props.row.planStart}}</span>
                                    </el-form-item>
                                    <el-form-item label-width="120px" label="计划结束时间：">
                                        <span>{{props.row.planEnd}}</span>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label-width="120px" label="实际开始时间：">
                                        <span>{{props.row.actualStart}}</span>
                                    </el-form-item>
                                    <el-form-item label-width="120px" label="实际结束时间：">
                                        <span>{{props.row.actualEnd}}</span>
                                    </el-form-item>
                                </el-row>
                                <el-form-item label="是否活跃：">
                                    <span>{{props.row.isActive ? '是' : '否'}}</span>
                                </el-form-item>
                                <el-row>
                                    <el-form-item label-width="120px" label="创建时间：">
                                        <span>{{ props.row.created }}</span>
                                    </el-form-item>
                                    <el-form-item label-width="120px" label="创建人：">
                                        <span>{{ props.row.createdByName }}</span>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label-width="120px" label="修改时间：">
                                        <span>{{ props.row.updated }}</span>
                                    </el-form-item>
                                    <el-form-item label="修改人：">
                                        <span>{{ props.row.updatedByName }}</span>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="命令名称" align="center" prop="name"> </el-table-column>
                    <el-table-column label="内容" align="center">
                        <template slot-scope="scope">
                            {{scope.row.content | shortBrif}}
                        </template>
                    </el-table-column>
                    <el-table-column label="下指令者" width="100" align="center" prop="commanderName"> </el-table-column>
                    <el-table-column label="指令状态" width="100" align="center" prop="commandStatusName"> </el-table-column>
                    <el-table-column label="下指令时间" align="center" prop="orderTime"> </el-table-column>
                    <el-table-column label="创建时间" sortable="custom" width="210px" align="center" prop="created"> </el-table-column>
                    <!-- <el-table-column label="是否活跃" align="center" prop="isActive">
                            <template slot-scope="scope">
                                <el-switch :value="scope.row.isActive"></el-switch>
                            </template>
                        </el-table-column> -->
                    <el-table-column label="操作" align="center" width="170">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="updateTargetTabRow(scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click="deleteCmdConfirm(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="Pagination">
                    <el-pagination @current-change="pageChangeHandler" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <el-dialog :title="isUpdate ? '命令指令修改' : '命令指令新增'" :visible.sync="optDialogShow">
            <el-form v-loading="selectInited" :model="cmdInfo" :rules="cmdInfoRules" ref="cmdInfo">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="命令名称" label-width="100px">
                            <el-input v-model="cmdInfo.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="指令状态" label-width="100px">
                            <el-select v-model="cmdInfo.commandStatus">
                                <el-option v-for="(item, index) in cmdStatusList" :label="item.name" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="内容" label-width="100px">
                            <el-input type="textarea" :row="4" v-model="cmdInfo.content" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="下指令者" label-width="100px" prop="commanderName">
                            <el-input readonly v-model="cmdInfo.commanderName" auto-complete="off" @click.native="inputClickHandler('cmdInfo', 'commanderName', 'commander' )"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="下指令时间" label-width="100px" prop="orderTime">
                            <el-date-picker v-model="cmdInfo.orderTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" clearable suffix-icon="el-icon-datetime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属产品" label-width="100px">
                            <el-select @change="selectedProduct" v-model="cmdInfo.mProductId">
                                <el-option v-for="item in selectProductData" :key="item.value" :label="item.name" :value="item.mProductId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属项目" label-width="100px">
                            <el-select v-model="cmdInfo.mProjectId">
                                <el-option v-for="item in selectProjectData" :key="item.value" :label="item.name" :value="item.mProjectId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="责任人" label-width="100px">
                            <el-input readonly v-model="cmdInfo.responsibleName" auto-complete="off" @click.native="inputClickHandler('cmdInfo', 'responsibleName', 'responsible')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="文档状态" label-width="100px">
                            <el-select v-model="cmdInfo.docStatus">
                                <el-option v-for="(item, index) in cmdDocList" :label="item.name" :value="item.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="计划时间" label-width="100px">
                            <el-date-picker v-model="cmdInfo.planTime" type="datetimerange" range-separator="至" start-placeholder="计划开始时间" end-placeholder="计划结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="实际时间" label-width="100px">
                            <el-date-picker v-model="cmdInfo.actualTime" type="datetimerange" range-separator="至" start-placeholder="实际开始时间" end-placeholder="实际结束时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" clearable align="right" suffix-icon="el-icon-datetime">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" label-width="100px">
                            <el-input type="textarea" :row="3" v-model="cmdInfo.remark" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="" label-width="0px" style="text-align:right;">
                            <el-button type="primary" @click.stop="submitCmd('cmdInfo')" v-html="isUpdate ? '修改' : '新增' " class="submit_btn"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <user-select ref="userSelectDialog" nodeKey="uniqulId" :defaultExpandedKeys="['0^_^顶层']" :userTreeArray="userTreeArray" v-on:comfirSelectUser="comfirSelectUser"></user-select>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
import userSelect from '../../components/userSelect'
import userTreeMixin from '../mixin/userTree'
import mixin from '../mixin/mixin'
import { baseUrl, baseImgPath } from '@/config/env'
import { utils } from '@/util/util.js'
import { getCmd, addCmd, deleteCmd, updateCmd, getChildStatus, getProducts, getProjects } from '@/api/getData'
export default {
    mixins: [userTreeMixin, mixin],
    data() {
        return {
            requireInfo: {},
            tableLoading: false,
            cmdTableData: [],
            selectCmdTabData: [],
            optDialogShow: false,
            selectInited: false,
            cmdInfo: {
                commanderName: '',
                responsibleName: '',
                docStatus: '',
                commandStatus: ''
            },
            cmdInfoRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
            },
            treeCmd: [{
                id: 0,
                label: '顶层',
                children: []
            }],
            currentSelectNode: {},
            cmdStatusList: [],
            cmdDocList: [],
            docStatus: [],
            maxPageSize: 9999,
            selectProductData: [],
            selectProjectData: [],
        }
    },
    created() {
        this.getUserTree();
        this.initSelectData('selectProductData', getProducts, [{ pageSize: this.maxPageSize }]);
        this.initSelectData('cmdStatusList', getChildStatus, [{ pageSize: this.maxPageSize }, 41]);
        this.initSelectData('cmdDocList', getChildStatus, [{ pageSize: this.maxPageSize }, 22]);
    },
    components: {
        headTop,
        userSelect
    },
    methods: {
        initData() {
            this.getCmdTabInfo();
        },
        /*--------------------------------- 数据渲染 */
        async getCmdTabInfo() {

            this.cmdTableData = []

            this.tableLoading = true;

            this.handleGet(this.cmdTableData, getCmd, this.pagin).then(() => {

                this.tableLoading = false

                this.cmdTableData.forEach(item => {

                    item.mProductId = item.mProductId >> 0
                    item.mProjectId = item.mProjectId >> 0
                    item.contentBrief = item.content.slice(0, 20)

                    item.actualStart ? (item.actualTime = [ item.actualStart, item.actualEnd ] ) : (item.actualTime = [] )
                    item.planStart ? (item.planTime = [ item.planStart, item.planEnd ] ) : (item.planTime = [] )
                })

            })

        },
        addCmdTable() {
            this.optDialogShow = true;
            this.cmdInfo = { commanderName: '',parentId: this.currentSelectNode.id, responsibleName: '' };
            this.handleAdd()
        },
        deleteCmdConfirm(row) {
            this.$confirm('确认删除？').then(_ => { this.deleteTargetTabRow(row.mCommandId) })
        },
        async deleteTargetTabRow(ids) {
            this.handleDelete(ids, deleteCmd, () => { this.getCmdTabInfo() });
        },
        updateTargetTabRow(row) {

            this.optDialogShow = true;
            this.cmdInfo = Object.assign({}, this.handleUpdate(this.cmdInfo, row)) 

            if (this.cmdInfo.mProductId) {
                this.initSelectData('selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, this.cmdInfo.mProductId]);
            }

        },
        /* ------------------------------- 表单提交（修改OR保存） */

        submitCmd(formName) {
            let params = this.formatParams()
            this.handleSubmit(formName, params, addCmd, updateCmd).then(() => {
                this.optDialogShow = false;
                this.getCmdTabInfo()
            })
        },
        formatParams(){
            let actualStart,
                actualEnd,
                planStart,
                planEnd;
            let {  actualTime, planTime  } = this.cmdInfo
            actualTime && ( [ actualStart, actualEnd ] = actualTime )
            planTime && ( [ planStart, planEnd ] = planTime )
            let params = Object.assign({}, this.cmdInfo ,{
                actualStart,
                actualEnd,
                planStart,
                planEnd
            }) 
            return params
        },
        async initSelectData(selectDataName, apiName, params) {
            let { data, status, msg } = await apiName(...params);

            if (status == 200) {
                this[selectDataName] = data.data;
            }
        },
        /**-------------------------------- 表格操作 */
        sortCmdTable({ order }) {
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getCmdTabInfo()
        },



        /*--------------------------------- 分页响应 */
        pageChangeHandler(currentPage) {
            this.pagin.currentPage = currentPage;
            this.getCmdTabInfo()
        },


        selectedProduct(mProductId) {
            this.initSelectData('selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, mProductId]);
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
