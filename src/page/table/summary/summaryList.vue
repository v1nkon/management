<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click="addSummary">新增会议</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table
                ref="summaryTable"
                :data="summaryData"
                style="width: 100%"
                height="500" 
                border
                :highlight-current-row="true" 
                v-loading="loadingSummary"
                @expand-change="expandedChange"
                @sort-change="sortTableByUpdated" >
                <transition name="tr-slide">
                    <el-table-column type="expand" >
                        <template slot-scope="props">
                            <el-form label-position="right" inline class="demo-table-expand">
                                <el-form-item label="标题："> <span>{{ props.row.title }}</span> </el-form-item>
                                <el-form-item label="内容：" class="expanded-content"> <span>{{props.row.content}}</span> </el-form-item>
                                <el-form-item label="会议时间："> <span>{{ props.row.dateTime }}</span> </el-form-item>
                                <el-form-item label="地点："><span>{{props.row.place}}</span> </el-form-item>
                                <el-form-item label="所属产品："><span>{{props.row.mProductName}}</span> </el-form-item>
                                <el-form-item label="所属项目："><span>{{props.row.mProjectName}}</span> </el-form-item>
                                <el-row :span="24">
                                    <summary-item
                                        :mSummaryId="props.row.mSummaryId"
                                        :isToHost="true"
                                        label-widht="110px"
                                    ></summary-item>
                                </el-row>
                                <el-form-item label="提出人："><span>{{props.row.applicantNames}}</span> </el-form-item>
                                <el-form-item label="出席人："><span>{{props.row.attenseeNames}}</span> </el-form-item>
                                <el-form-item label="发送人："><span>{{props.row.sendName}}</span> </el-form-item>
                                <el-form-item label="抄送人："><span>{{props.row.ccName}}</span> </el-form-item>
                                <el-form-item label="呈报人："><span>{{props.row.reportName}}</span> </el-form-item>
                                <el-form-item label="状态："><span>{{props.row.summaryStatusName}}</span> </el-form-item>
                                <el-form-item label="是否公开："><span>{{props.row.isPublic ? '是' : '否'}}</span> </el-form-item>
                                
                                <el-form-item label="反馈信息："> <span>{{ props.row.response }}</span> </el-form-item>
                                <el-form-item label="备注：" class="expanded-content"><span>{{props.row.remark}}</span> </el-form-item>
                                <el-row>
                                    <el-form-item label="创建时间："><span>{{ props.row.created }}</span></el-form-item>
                                    <el-form-item label="创建人："><span>{{ props.row.createdByName }}</span></el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="修改时间："><span>{{ props.row.updated }}</span></el-form-item>
                                    <el-form-item label="修改人："><span>{{ props.row.updatedByName }}</span></el-form-item>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                </transition>
                <el-table-column align="center" label="标题" prop="title"> </el-table-column>
                <el-table-column label="内容" align="center" prop="contentBrief">
                    <template slot-scope="scope">
                        {{scope.row.content | shortBrif}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="地点"  prop="place"> </el-table-column>
                <el-table-column align="center" label="会议时间" width="210" prop="dateTime"> </el-table-column>
                <el-table-column align="center" label="创建时间" width="210" prop="created" sortable="custom"> </el-table-column>
                <el-table-column align="center" label="操作" width="280">
				<template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <!-- <el-button size="mini" type="success"  @click="viewHistory(scope.$index, scope.row)">操作记录</el-button> -->
                    <el-button size="mini" type="success"  @click="viewOperHistory(scope.row)">历史</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="handleSize"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>

            <el-dialog title="操作历史" :visible.sync="showDialogSummaryHistory" :append-to-body="true">
                <el-table v-loading="loadingSummaryLog"  :data="selectSummaryItemLogData"  @expand-change="expandedChange" @sort-change="sortTableByUpdated" >
                    <el-table-column align="center" label="所属模块" prop="moduleName"> </el-table-column>
                    <el-table-column align="center" label="更新内容" prop="operContent"> </el-table-column>
                    <el-table-column align="center" label="操作人" prop="username"> </el-table-column>
                    <el-table-column align="center" label="操作时间" prop="operDate"> </el-table-column>
                </el-table>
            </el-dialog>


            <el-dialog :title="isUpdate ? '修改会议纪要信息': '新增会议纪要信息'" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable" :rules="summaryInfoRules" ref="summaryInfo">
                    <el-row>
				        <el-col :span="12">
                             <el-form-item label="标题" label-width="100px" prop="title">
                                 <el-input v-model="selectTable.title" auto-complete="off"></el-input>
                             </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="会议时间" label-width="100px">
                                <el-date-picker prop="dateTime" v-model="selectTable.dateTime" type="datetime"
                                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择时间" clearable suffix-icon="el-icon-dateTime" ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
				        <el-col :span="12">
                            <el-form-item label="地点" label-width="100px">
                                <el-input v-model="selectTable.place"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否公开"  label-width="100px">
                                <el-switch active-value="Y" inactive-value="N" v-model="selectTable.isPublic"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="内容" label-width="100px">
						<el-input type="textarea" v-model="selectTable.content" :rows="3"></el-input>
					</el-form-item>
                    <el-row>
				        <el-col :span="12">
                            <el-form-item label="出席人" label-width="100px">
                                <el-input readonly 
                                    v-model="selectTable.attenseeNames" 
                                    auto-complete="off" 
                                    @click.native="inputClickHandler('selectTable','attenseeNames', 'attenseeIds')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="提出人" label-width="100px">
                                <el-input readonly 
                                    v-model="selectTable.applicantNames" 
                                    auto-complete="off" 
                                    @click.native="inputClickHandler('selectTable','applicantNames', 'applicantIds')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
				        <el-col :span="12">
                            <el-form-item label="所属产品" label-width="100px">
                                <el-select @change="selectedProduct" v-model="selectTable.mProductId">
                                    <el-option v-for="(item, index) in selectProductData" :key="index" :label="item.name" :value="item.mProductId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属项目" label-width="100px">
                                <el-select v-model="selectTable.mProjectId">
                                    <el-option v-for="item in selectProjectData" :key="item.value" :label="item.name" :value="item.mProjectId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
				        <el-col :span="12">
                            <el-form-item label="状态" label-width="100px">
                                <el-select v-model="selectTable.summaryStatus">
                                    <el-option v-for="(item, index) in statusList" :label="item.name" :value="item.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="抄送人" label-width="100px">
                                <el-input readonly 
                                    v-model="selectTable.ccName" 
                                    auto-complete="off" 
                                    @click.native="inputClickHandler('selectTable','ccName', 'cc')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
				        <el-col :span="12">
                            <el-form-item label="呈报人" label-width="100px">
                                <el-input readonly 
                                    v-model="selectTable.reportName" 
                                    auto-complete="off" 
                                    @click.native="inputClickHandler('selectTable','reportName', 'report')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="发送人"  label-width="100px">
                                <el-input readonly 
                                    v-model="selectTable.sendName" 
                                    auto-complete="off" 
                                    @click.native="inputClickHandler('selectTable','sendName', 'send')"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="反馈" label-width="100px">
						<el-input type="textarea" v-model="selectTable.response" :rows="3"></el-input>
					</el-form-item>
                    <summary-item :isUpdate="isUpdate" labelWidth="100px"></summary-item>
                    <el-form-item label="备注" label-width="100px">
						<el-input type="textarea" v-model="selectTable.remark" :rows="3"></el-input>
					</el-form-item>
                    <el-form-item label="参考附件" label-width="100px">
						<el-upload class="upload" drag action="/manager/fileupload/" multiple :on-success="uploadSuccess" :on-error="uploadError" :on-change="uploadChange" :on-preview="download">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							<!-- <div class="el-upload__tip" slot="tip">只能上传~~~</div> -->
						</el-upload>
					</el-form-item>
                    <!--<el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>-->
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop="subSummaryForm('summaryInfo')" >确 定</el-button>
              </div>
            </el-dialog>
            <user-select 
                ref="userSelectDialog"
                nodeKey="uniqulId"
                :defaultExpandedKeys="['0^_^顶层']"
                :userTreeArray="userTreeArray"
                v-on:comfirSelectUser="comfirSelectUser"
            ></user-select>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import userSelect from '@/components/userSelect' 
    import summaryItem from './summaryItem'
    import  userMixin  from '@/page/mixin/userTree'
    import mixin from '@/page/mixin/mixin'
    import {baseUrl, baseImgPath} from '@/config/env'
    import { mapActions, mapState, mapMutations } from 'vuex'
    import { utils } from '@/util/util.js'
    import {cityGuess, getSummarys, getSummarysCount, updateSummary, deleteSummary, addSummary, 
            querySummaryItem, addSummaryItem, deleteSummaryItem, updateSummaryItem,
            getProjects, getProducts, getSelectChildStatus,getSummaryLogs } from '@/api/getData'
    export default {
        mixins: [userMixin, mixin],
        data(){
            console.log('data')
            return {
                maxPageSize: 99999,
                loadingSummary: true,
                loadingSummaryLog:true,
                baseUrl,
                baseImgPath,
                city: {},
                count: 0,
                summaryData: [],
                handleSize: 10,
                currentPage: 1,
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                userList: [],
                summaryInfoRules: {
                    title: [
                        { required: true, message: '请输入会议标题', trigger: 'blur' }
                    ],
                    dateTime: [
                        { required: true, message: '请选择时间', trigger: 'blur' }
                    ]
                },
                summaryItemInfoRules: {
                    title: [
                        { required: true, message: '请输入会议标题', trigger: 'blur' }
                    ]
                },
                showDialogSubSummaryItem: false,
                selectSummaryItemData: {},
                selectSummaryItemLogData:[],
                isSummaryItemUpdate: false,
                isSummaryItemAdd: false,
                showDialogSummaryHistory:false,
                cacheSelectSummaryItemData: {},
                selectProductData: [],
                selectProjectData: [],
                statusList: [],
                targetRow: {},
                testTitle:'',
                testContent:'',
                testOperUser:'',
                testOperTime:'',
                defaultSelectTable: {
                    applicantNames: '',
                    sendName: '',
                    ccName: '',
                    reportName: '',
                    attenseeNames: ''
                }
            }
        },
        created(){
            console.log( 'created' );
        },
        mounted(){
            console.log( 'mounted' );
            this.getUserTree();
            this.getSummarys();
            this.initSelectData( 'selectProductData', getProducts, [ { pageSize: this.maxPageSize } ] );
            this.initSelectData( 'statusList', getSelectChildStatus, [ { pageSize: this.maxPageSize }, "SummaryStatus" ] );
        },
    	components: {
            headTop,
            userSelect,
            summaryItem
        },
        computed: {
            ...mapState({
                selectTable: state => state.summary.selectTable,
                summaryItemData: state => state.summary.summaryItemData
            })
        },
        methods: {
            ...mapMutations(['setSummarySelectTable', 'setSummaryItemData']),
            ...mapActions(['getTargetSummaryItem']),
            initData(){

            },
            async initSelectData( selectDataName, apiName, params ){
                let { data, status, msg } = await apiName( ...params );

                if ( status == 200 ) {
                    this[selectDataName] = data.data;
                }
            },
            async getSummarys( order = {} ){

                const params = {
                    currentPage: this.currentPage, 
                    pageSize: this.handleSize,
                    ...order
                }

                this.loadingSummary = true;
                let { data, status, msg } = await getSummarys({ ...params });
                this.loadingSummary = false;

                if ( status == 200 ) {
                    let dataTemp = [];

                    this.count = data.totalPage;
                    this.currentPage = data.currentPage;

                    data.data.forEach(item => {
                        item.mProductId = + item.mProductId
                        item.contentBrief = item.content.slice(0,20)

                        dataTemp.push( item );
                    })
    
                    this.summaryData = dataTemp;
                } else {
                    this.$message( { type: 'error', message: msg } )
                }
            },
            selectedProduct( mProductId ){
                this.initSelectData( 'selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, mProductId] );
                this.selectTable.mProjectId = null;
                this.setSummarySelectTable( { selectTable: {...this.selectTable, mProjectId: null} } )
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSummarys()
            },
            addSummary() {

                let nowDate = utils.formatDate( (new Date()).getTime() )

                this.setSummarySelectTable( { selectTable: { dateTime: nowDate, ...this.defaultSelectTable} } );
                this.address = {};
                this.setSummaryItemData({ summaryItemData: [] });
                this.dialogFormVisible = true;
                this.handleAdd()
            },
            handleEdit(index, row) {

                this.setSummarySelectTable( { selectTable: {...row} } );
                this.initSelectData( 'selectProjectData', getProjects, [{ pageSize: this.maxPageSize }, this.selectTable.mProductId] );
                this.dialogFormVisible = true;
                this.handleUpdate()
            },
            async viewOperHistory(row){
                console.log(JSON.stringify(row));
                this.selectSummaryItemLogData = [];
                this.showDialogSummaryHistory = true;
                this.loadingSummaryLog = true;
                this.handleGet(this.selectSummaryItemLogData, getSummaryLogs,{...this.pagin, param :"summary"},row.mSummaryId).then(() => {
                    this.loadingSummaryLog = false
                })
                console.log(this.selectSummaryItemLogData);
            },
            sortTableByUpdated( { order } ){
                let sortType = (order === 'ascending' ? 'asc' : 'desc')
                this.getSummarys({ sortType })
            },
            async handleDelete(index, row) {
                this.$confirm('确认删除？').then(async _ => { 
                    try{
                        const res = await deleteSummary(row.mSummaryId);
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '会议纪要删除成功'
                            });
                            this.getSummarys();
                        }else{
                            throw new Error(res.message)
                        }
                    }catch(err){
                        this.$message({
                            type: 'error',
                            message: err.message
                        });
                        console.log('会议纪要删除失败')
                    }
                })
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            },
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.setSummarySelectTable( { selectTable: { ...this.selectTable, image_path: res.image_path } } );
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async subSummaryForm( formRef ){

                this.$refs[ formRef ].validate( async (valid)=>{
                    if (valid) {
                        this.dialogFormVisible = false;
                        try{
    
                            if ( this.isUpdate ){
                                var res = await updateSummary( this.selectTable );
                            } else {
                          
                                this.setSummarySelectTable( { selectTable: { ...this.selectTable, summaryItems: utils.cloneDeep(this.summaryItemData) } } );
                                var res = await addSummary( this.selectTable );
                            }
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                });
                                this.getSummarys();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.message
                                });
                            }
                            console.log(this.selectTable)
                        }catch(err){
                            console.log('操作失败', err);
                        }
                    }
                } )
            },
            expandedChange( targetData, expandedRows ){

                // 保证展开的行只有一个 并且目前是必须的
                if ( targetData.mSummaryId != this.targetRow.mSummaryId ) {
                    this.$refs.summaryTable.toggleRowExpansion(this.targetRow, false);
                }
                // 只有展开时才请求，同时 由于上面toggleRowExpansion方法会触发本函数，因此，要保证当前目标行不是上次展开的行
                if ( expandedRows.length != 0 && targetData.mSummaryId != this.targetRow.mSummaryId ) {
                    
                    this.getTargetSummaryItem( targetData.mSummaryId );
                }
                this.targetRow = targetData;
            },
            uploadChange() {

            },
            uploadError() {

            },
            uploadSuccess() {

            },
            download() {

            },
        },
    }
</script>

<style lang="less">
	@import '../../../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;

        &.expanded-content {
            width: 100%;
        }
    }
    .Pagination{
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
    .tr-slide-enter-active,.tr-slide-leave-active{
        transition: all 1s;
    }
    .tr-slide-enter, .tr-slide-leave-active{
        opacity: 0;
        transform: translateY(30px);
    }
    .dialog-sumaryItemList {
        float: left;
        margin-right: 5px;
    }
    .demo-table-expand .el-form-item{
        position: relative;
        padding-left: 100px;
        min-height: 40px;

        .dialog-sumaryItem {
            margin-bottom: 5px;
        }
    }
    .demo-table-expand .el-form-item > label {
        position: absolute;
        left: 0;
    }
</style>
