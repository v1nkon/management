<template>
    <!-- 组织表 -->
    <div class="fillcontain">
        <div class="table_container" :v-loading="tableLoading" style="height: calc(100% - 40px)">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" @click="addOrgTable" type="primary">新增组织</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-row :gutter="5" style="height: calc( 100% - 110px );">
                <el-col :span="4" style="height: 100%; overflow: auto">
                    <el-tree
                        :data="treeOrg"
                        node-key="label"
                        :highlight-current-row="true" 
                        :default-expanded-keys="['顶层']"
                        @node-click="nodeClickHandler"
                    >
                    </el-tree>
                </el-col>
                <el-col :span="20">
                    <el-table 
                        border
                     
                        :data="orgNowTableData" 
                        align="center" 
                        v-show="orgNowTableData[0]"
                        style="width: 100%;margin-bottom:20px">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <!-- <el-form-item label="组织ID"><span>{{ props.row.adOrgId }}</span></el-form-item> -->
                                    <el-form-item label="名字"><span>{{ props.row.name }}</span></el-form-item>
                                    <el-form-item label="负责人"><span>{{ props.row.supervisorName }}</span></el-form-item>
                                    <el-form-item label="地址"><span>{{ props.row.address }}</span></el-form-item>
                                    <el-form-item label="区划名称"><span>{{ props.row.administrativeName }}</span></el-form-item>
                                    <el-form-item label="区划编码"><span>{{ props.row.administrativeCode }}</span></el-form-item>
                                    <el-form-item label="是业务伙伴"><span>{{props.row.isPartner ? '是' : '否'}}</span> </el-form-item>
                                    <el-form-item label="创建人"><span>{{ props.row.createdByName }}</span></el-form-item>
                                    <el-form-item label="创建时间"><span>{{ props.row.created }}</span></el-form-item>
                                    <el-form-item label="修改人"><span>{{ props.row.updatedByName }}</span></el-form-item>
                                    <el-form-item label="修改时间"><span>{{ props.row.updated }}</span></el-form-item>
                                    <el-form-item label="是否活跃"><span>{{props.row.isActive ? '是' : '否'}}</span></el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="名字" align="center" prop="name"> </el-table-column>
                        <el-table-column label="区划名称" align="center" prop="administrativeName"> </el-table-column>
                        <!-- <el-table-column label="组织ID" align="center" prop="adOrgId"> </el-table-column> -->
                        <!-- <el-table-column label="负责人" align="center" prop="supervisorName"> </el-table-column> -->
                        <el-table-column label="地址" align="center" prop="address"> </el-table-column>
                        <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                        <el-table-column label="创建时间" sortable="custom" width="210px" align="center" prop="created"> </el-table-column>
                        <!-- <el-table-column label="是否活跃" align="center" prop="isActive">
                            <template slot-scope="scope">
                                <el-switch :value="scope.row.isActive"></el-switch>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="操作" align="center" width="170">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="updateTargetTabRow(scope.row)">修改</el-button>
                                <el-button size="mini" type="danger" @click="deleteTargetTabRow(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-table 
                        height="550"
                        border
                        v-show="orgTableData[0]"
                        :data="orgTableData" 
                        @sort-change="sortOrgTable" 
                        align="center" 
                        style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <!-- <el-form-item label="组织ID"><span>{{ props.row.adOrgId }}</span></el-form-item> -->
                                    <el-form-item label="名字"><span>{{ props.row.name }}</span></el-form-item>
                                    <el-form-item label="负责人"><span>{{ props.row.supervisorName }}</span></el-form-item>
                                    <el-form-item label="地址"><span>{{ props.row.address }}</span></el-form-item>
                                    <el-form-item label="区划名称"><span>{{ props.row.administrativeName }}</span></el-form-item>
                                    <el-form-item label="区划编码"><span>{{ props.row.administrativeCode }}</span></el-form-item>
                                    <el-form-item label="是业务伙伴"><span>{{props.row.isPartner ? '是' : '否'}}</span> </el-form-item>
                                    <el-form-item label="创建人"><span>{{ props.row.createdByName }}</span></el-form-item>
                                    <el-form-item label="创建时间"><span>{{ props.row.created }}</span></el-form-item>
                                    <el-form-item label="修改人"><span>{{ props.row.updatedByName }}</span></el-form-item>
                                    <el-form-item label="修改时间"><span>{{ props.row.updated }}</span></el-form-item>
                                    <el-form-item label="是否活跃"><span>{{props.row.isActive ? '是' : '否'}}</span></el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="名字" align="center" prop="name"> </el-table-column>
                        <el-table-column label="区划名称" align="center" prop="administrativeName"> </el-table-column>
                        <!-- <el-table-column label="组织ID" align="center" prop="adOrgId"> </el-table-column> -->
                        <!-- <el-table-column label="负责人" align="center" prop="supervisorName"> </el-table-column> -->
                        <el-table-column label="地址" align="center" prop="address"> </el-table-column>
                        <el-table-column label="创建人" align="center" prop="createdByName"> </el-table-column>
                        <el-table-column label="创建时间" sortable="custom" width="210px" align="center" prop="created"> </el-table-column>
                        <!-- <el-table-column label="是否活跃" align="center" prop="isActive">
                            <template slot-scope="scope">
                                <el-switch :value="scope.row.isActive"></el-switch>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="操作" align="center" width="170">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="updateTargetTabRow(scope.row)">修改</el-button>
                                <el-button size="mini" type="danger" @click="deleteTargetTabRow(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-show="orgTableData[0]" class="Pagination">
                        <el-pagination @current-change="pageChangeHandler" :current-page="pagin.currentPage" :page-size="pagin.pageSize" layout="total, prev, pager, next" :total="pagin.totalPage">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog :title="isUpdate ? '组织修改' : '组织新增'" :visible.sync="optDialogShow">
            <header class="form_header">组织信息</header>
            <el-form v-loading="selectInited" :model="orgInfo" :rules="orgInfoRules" ref="orgInfo">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名字" label-width="100px" prop="name">
                            <el-input v-model="orgInfo.name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="负责人" label-width="100px" prop="supervisorName">
                            <el-input readonly 
                                v-model="orgInfo.supervisorName"
                                auto-complete="off" 
                                @click.native="inputClickHandler('orgInfo', 'supervisorName', 'supervisor')"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="父组织" label-width="100px" prop="parentId">
                            <el-input @click.native="openOrgTree" :readonly="true" v-model="orgInfo.parentName"> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区划" label-width="100px" prop="administrativeName">
                            <el-input @click.native="openOrgCityCode" :readonly="true" v-model="orgInfo.administrativeName"> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="地址" label-width="100px" prop="address">
                            <el-input v-model="orgInfo.address" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="是否业务伙伴" label-width="100px">
                            <el-switch v-model="orgInfo.isPartner" active-text="是" inactive-text="否" active-value="Y" inactive-value="N"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否活跃" label-width="100px">
                            <el-switch active-value="Y" inactive-value="N" v-model="orgInfo.isActive"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="" label-width="0px" style="text-align:right;">
                            <el-button type="primary" @click.stop="submitOrg('orgInfo')" v-html="isUpdate ? '修改' : '新增' " class="submit_btn"></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <el-dialog :append-to-body="true"  title="选择组织" :visible.sync="orgTree" ref="orgTree">
            <el-tree :data="treeOrg" 
                node-key="uniqulId" 
                :default-expanded-keys="['顶层']" 
                v-model="orgInfo.parentName" 
                @node-click="selectOrg" 
                :highlight-current="true">
            </el-tree>
        </el-dialog>
        <user-select 
            ref="userSelectDialog"
            nodeKey="uniqulId"
            :defaultExpandedKeys="['0^_^顶层']"
            :userTreeArray="userTreeArray"
            v-on:comfirSelectUser="comfirSelectUser"
        ></user-select>
        <el-dialog :append-to-body="true"  title="选择区划" :visible.sync="cityCodeTree" ref="cityCodeTree">
            <el-tree :data="cityCodeOrg" 
                node-key="uniqulId" 
                :default-expanded-keys="['顶层']" 
                v-model="orgInfo.parentName" 
                @node-click="selectCityCode" 
                :highlight-current="true">
            </el-tree>
        </el-dialog>
    </div>
</template>

<script>
import headTop from '../../components/headTop'
import userSelect from '../../components/userSelect' 
import userTreeMixin from '../mixin/userTree'
import mixin from '../mixin/mixin'
import { baseUrl, baseImgPath } from '@/config/env'
import { utils } from '@/util/util.js'
import { getNowOrg, getOrg, addOrg, deleteOrg, updateOrg, getOrgTreeData, getCityCodeData } from '@/api/getData'
export default {
    mixins: [userTreeMixin, mixin],
    data() {
        return {
            orgTree: false,
            tableLoading: false,
            adParentId: -1,
            orgTabParams: {
                sortBy: 'created',
                sortType: 'desc',
                parentId: '0'
            },
            orgTableData: [],
            orgNowTableData: [],
            selectOrgTabData: [],
            optDialogShow: false,
            selectInited: false,
            orgInfo: {

            },
            orgInfoRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                administrativeName: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
            },
            treeOrg: [{
                id: 0,
                label: '顶层',
                uniqulId: '顶层',
                children: []
            }],
            cityCodeOrg: [{
                id: 0,
                label: '顶层',
                uniqulId: '顶层',
                children: []
            }],
            currentSelectNode: {},
            cityCodeTree: false,

        }
    },
    computed: {
        hasParent(){
            console.log(this.orgNowTableData)
            console.log(this.orgNowTableData[0] ? true : false)
            return this.orgNowTableData[0] ? true : false
        },
        hasOrg(){
            return this.orgNowTableData[0] ? true : false
        }
    },
    components: {
        headTop,
        userSelect
    },
    methods: {
        initData(){
            this.getUserTree();
            this.getOrgTree();
            this.getOrgTabInfo();
        },
        /* -----------------------树形控件 数据渲染 */
        async getOrgTree(){
            let { data, status, msg } = await getOrgTreeData();

            if ( status == 200 ) {
                this.treeOrg[0]['children'] = this.arrayToTreeData(data, 0);
            } else {
                this.$message({ type: 'error', message: msg });
            }
        },
        arrayToTreeData( data, id ){

            let dataTemp = [];
  
            data.forEach( (item, index)=>{
                if ( item.parentId == id ) {
                    
                    let children = this.arrayToTreeData(data, item.adOrgId)
                    dataTemp.push({
                        id: item.adOrgId,
                        parentId: item.parentId,
                        label: item.name,
                        children: children,
                        uniqulId: item.adOrgId
                    })
                }
            } )

            return dataTemp;
        },
        /* -------------------------- 行政区划*/
        async getCityCodeTree(){
            let { data, status, msg } = await getCityCodeData();

            if ( status == 200 ) {
                this.cityCodeOrg[0]['children'] = this.arrayToTreeDataForCityCode(data, 0);
                console.log(this.cityCodeOrg)
            } else {
                this.$message({ type: 'error', message: msg });
            }
        },
        arrayToTreeDataForCityCode( data, code ){

            let dataTemp = [];
  
            data.forEach( (item, index)=>{
                if ( item.parentCode == code ) {
                    
                    let children = this.arrayToTreeDataForCityCode(data, item.code)
                    dataTemp.push({
                        id: item.code,
                        parentId: item.parentCode,
                        label: item.name,
                        children: children,
                        uniqulId: item.code
                    })
                }
            } )

            return dataTemp;
        },
        /*--------------------------------- 数据渲染 */
        async getOrgTabInfo(){

            this.orgTableData = []

            this.orgNowTableData = []
            this.tableLoading = true

            this.handleGet(this.orgTableData, getOrg, this.pagin, this.adParentId).then(() => {

                this.tableLoading = false

                this.orgTableData.forEach( (item, index) => {

                    item.supervisorName = ''

                } )

            })

            //获取当前的组织

            this.handleGet( this.orgNowTableData, getNowOrg, this.pagin, this.adParentId ).then( () => {

                // this.orgNowTableData.forEach( (item, index) => {

                //     item.supervisorName = ''

                // } )
            } ) 
        },
        addOrgTable(){
            this.orgInfo = {parentId: this.currentSelectNode.id, parentName: this.currentSelectNode.label, supervisorName: ''};
            this.optDialogShow = true;
            this.handleAdd()
        },
        async deleteTargetTabRow( index, row ) {

            this.handleDelete(  
                row.adOrgId, 
                deleteOrg, 
                () => { 
                    this.getOrgTabInfo();
                    this.getOrgTree(); 
                }
            );
        },
        
        updateTargetTabRow( row ) {
            
            this.optDialogShow = true;
            this.handleUpdate(this.orgInfo, Object.assign({ parentName: this.currentSelectNode.label }, row))
            // this.isUpdate = true;
            // this.orgInfo = Object.assign({ parentName: this.currentSelectNode.label }, row);
        },

        submitOrg(formName) {
            let params = Object.assign({}, this.orgInfo)
            this.handleSubmit(formName, params, addOrg, updateOrg).then( () => { this.optDialogShow = false; this.getOrgTabInfo(); this.getOrgTree() } )
        },
        /**-------------------------------- 表格操作 */
        sortOrgTable( { order } ){
            this.pagin.sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getOrgTabInfo()
        },
        
        
        
        /*--------------------------------- 分页响应 */
        pageChangeHandler(currentPage) {
            this.pagin.currentPage = currentPage;
            this.getOrgTabInfo()
        },
        /*-------------------------------- 树形控件操作 */
        nodeClickHandler( data, node, el ) {
            let { id, children } = data;
            this.adParentId = id
            this.currentSelectNode = { ...data };

            // if ( !children || children.length == 0 ) {
            //     this.orgTableData = [];
            //     return;
            // }

            this.orgTabParams.parentId = id;
            this.getOrgTabInfo();
        },
        async getOrgTree(){
            let { data, status, msg } = await getOrgTreeData();

            if ( status == 200 ) {
                this.treeOrg[0]['children'] = this.arrayToTreeData(data, 0);
            } else {
                this.$message({ type: 'error', message: msg });
            }
        },
        arrayToTreeData( data, id ){

            let dataTemp = [];
  
            data.forEach( (item, index)=>{
                if ( item.parentId == id ) {
                    
                    let children = this.arrayToTreeData(data, item.adOrgId)
                    let uniqulId = item.adUserId + '^_^' + item.name 
                    dataTemp.push({
                        uniqulId,
                        id: item.adOrgId,
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
        },
        async openOrgCityCode(){
            if ( this.cityCodeOrg[0]['children'].length == 0 ) {
                await this.getCityCodeTree();
            }
            this.cityCodeTree = true
        },
        selectOrg(data, node, el){
            let {id, label} = data
            this.orgInfo.parentId = id
            this.orgInfo.parentName = label
            this.orgTree = false
        },
        selectCityCode( data, node, el ){
            let {id, label} = data
            this.orgInfo.administrativeCode = id
            this.orgInfo.administrativeName = label
            this.cityCodeTree = false
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
