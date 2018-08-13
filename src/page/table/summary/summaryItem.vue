<template>
    <div class="fillcontain summary-item-bd">
        <el-form-item class="el-summary-item" :span="24" label="会议纪要项：" v-show="!isUpdate" :label-width="labelWidth">
            <ul class="dialog-sumaryItemList clear">
                <li class="dialog-sumaryItem" v-for="(item, index) in summaryItemData " :key="index" @click="checkTargetSummaryItem(item, index)" >
                    <span :title="item.title" >{{item.title}}</span><i class="el-icon-close-summaryItem el-icon-circle-close" @click.stop="delSummaryItemConfirm(item, index)"></i>
                </li>
                <el-button class="sumary-item_add" type="primary" icon="el-icon-plus" @click="addSummaryItem"></el-button>
            </ul>
        </el-form-item>
        <el-dialog title="会议纪要项" :visible.sync="showDialogSubSummaryItem" :append-to-body="true">
            <el-form :model="selectSummaryItemData" :rules="summaryItemInfoRules" ref="summaryItemInfo">
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="标题：" label-width="100px" prop="title">
                                <el-input v-model="selectSummaryItemData.title" auto-complete="off" v-show="isSummaryItemUpdate"></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.title}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="提出人：" label-width="100px" prop="applicantNames">
                                <el-input readonly v-model="selectSummaryItemData.applicantNames" auto-complete="off" v-show="isSummaryItemUpdate" @click.native="inputClickHandler('selectSummaryItemData','applicantNames', 'applicantIds')"></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.applicantNames}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                            <el-form-item label="建议：" label-width="100px" prop="proposal">
                                <el-input v-model="selectSummaryItemData.proposal" auto-complete="off" v-show="isSummaryItemUpdate"></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.proposal}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="是否公开：" label-width="100px" prop="isPublic">
                                <el-switch active-value="Y" inactive-value="N" v-model="selectSummaryItemData.isPublic" v-show="isSummaryItemUpdate"></el-switch>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.isPublic ? '是' : '否'}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="发送人：" label-width="100px" prop="send">
                            <el-input readonly 
                                v-model="selectSummaryItemData.sendName" 
                                auto-complete="off" 
                                v-show="isSummaryItemUpdate"  
                                @click.native="inputClickHandler('selectSummaryItemData','sendName', 'send')"
                            ></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.sendName}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="抄送人：" label-width="100px" prop="cc">
                            <el-input readonly 
                                v-model="selectSummaryItemData.ccName" 
                                auto-complete="off" 
                                v-show="isSummaryItemUpdate"  
                                @click.native="inputClickHandler('selectSummaryItemData','ccName', 'cc')"
                            ></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.ccName}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="呈报人：" label-width="100px" prop="report">
                            <el-input readonly 
                                v-model="selectSummaryItemData.reportName" 
                                auto-complete="off" 
                                v-show="isSummaryItemUpdate"
                                @click.native="inputClickHandler('selectSummaryItemData','reportName', 'report')"
                            ></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.reportName}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="状态：" label-width="100px" prop="summaryStatus">
                            <el-select v-model="selectSummaryItemData.summaryStatus" v-show="isSummaryItemUpdate">
                                <el-option v-for="(item, index) in statusList" :label="item.name" :value="item.value" :key="index"></el-option>
                            </el-select>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.summaryStatusName}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="反馈情况：" label-width="100px" prop="response">
                                <el-input v-model="selectSummaryItemData.response" auto-complete="off" v-show="isSummaryItemUpdate"></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.response}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                            <el-form-item label="备注：" label-width="100px" prop="remark">
                                <el-input v-model="selectSummaryItemData.remark" auto-complete="off" v-show="isSummaryItemUpdate"></el-input>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.remark}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="是否活跃：" label-width="100px" prop="isActive">
                                <el-switch active-value="Y" inactive-value="N" v-model="selectSummaryItemData.isActive" v-show="isSummaryItemUpdate"></el-switch>
                                <span v-show="!isSummaryItemUpdate">{{selectSummaryItemData.isActive ? '是' : '否'}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="!isSummaryItemUpdate">
                    <el-col :span="12">
                            <el-form-item label="创建人：" label-width="100px" prop="createdBy">
                                <span>{{selectSummaryItemData.createdByName}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="创建时间：" label-width="100px" prop="created">
                                <span>{{selectSummaryItemData.created}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="!isSummaryItemUpdate">
                    <el-col :span="12">
                            <el-form-item label="修改人：" label-width="100px" prop="updatedBy">
                                <span>{{selectSummaryItemData.updatedByName}}</span>
                            </el-form-item>
                    </el-col>
                    <el-col :span="12">
                            <el-form-item label="修改时间：" label-width="100px" prop="updated">
                                <span>{{selectSummaryItemData.updated}}</span>
                            </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.stop="comfireUpdateSummaryItem('summaryItemInfo')" v-show="isSummaryItemUpdate">确 定</el-button>
                <el-button @click.stop="cancelUpdateSummaryItem" v-show="isSummaryItemUpdate" >取 消</el-button>
                <el-button @click="updateSummaryItem" v-show="!isSummaryItemUpdate" >修 改</el-button>
                <el-button v-show="!isSummaryItemUpdate" @click="transfer2Need">转需求</el-button>
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
</template>

<script>

import userSelect from '@/components/userSelect' 
import userMixin from '@/page/mixin/userTree'
import { utils, getSelectData } from '@/util/util.js'
import { mapActions, mapState, mapMutations } from 'vuex'
import { querySummaryItem, addSummaryItem, deleteSummaryItem, updateSummaryItem,
        getProjects, getProducts, getSelectChildStatus } from '@/api/getData'
export default {
    mixins: [userMixin],
    props: {
        isToHost: { type: Boolean, default: false },
        isUpdate: { type: Boolean, default: false },
        labelWidth: { type: String, default: '100px' },
        mSummaryId: { }
    },
    data(){
        return {
            defaultItem: {
                applicantNames: '',
                sendName: '',
                ccName: '',
                reportName: ''
            },
            selectSummaryItemData: {},
            showDialogSubSummaryItem: false,
            summaryItemInfoRules: {
                title: [
                    { required: true, message: '请输入会议标题', trigger: 'blur' }
                ]
            },
            statusList: [],
            isSummaryItemAdd: false,
            isSummaryItemUpdate: true
        }
    },
    components: {
        userSelect
    },
    computed: {
        ...mapState({
            summaryItemData: state => state.summary.summaryItemData,
        })
    },
    created(){
        this.getUserTree();
        getSelectData( this, 'statusList' , getSelectChildStatus, "SummaryStatus");
    },
    methods:{
        ...mapMutations(['setSummaryItemData', 'updataSummaryItem2Local']),
        ...mapActions(['getTargetSummaryItem']),
        checkTargetSummaryItem( targetSummaryItemData, index ){
            
            this.targetSummaryIndex = index;                     // 存储数据之与数组索引

            // 非修改 新增
            this.isSummaryItemUpdate = false;                   
            this.isSummaryItemAdd = false;                         
            this.selectSummaryItemData = {...this.defaultItem, ...targetSummaryItemData, };  // 赋值择选之子项数据
            this.showDialogSubSummaryItem = true;                // open dialog
        },
        addSummaryItem(){

            // 修改但是新增
            this.isSummaryItemAdd = true;
            this.isSummaryItemUpdate = true;

            this.showDialogSubSummaryItem = true;
            this.selectSummaryItemData = {...this.defaultItem};
        },
        updateSummaryItem(){

            // 修改但不是新增
            this.isSummaryItemAdd = false;
            this.isSummaryItemUpdate = true;

            this.cacheSelectSummaryItemData = Object.assign( {}, this.selectSummaryItemData );
            this.cacheSummaryItemData = utils.cloneDeep( this.summaryItemData );
        },
        cancelUpdateSummaryItem(){

            // 针对业务 退出修改而展示
            this.isSummaryItemUpdate = false;

            if (this.isSummaryItemAdd) {
                this.showDialogSubSummaryItem = false;
            } else {
                this.selectSummaryItemData = Object.assign( {}, this.cacheSelectSummaryItemData );
                this.setSummaryItemData({ summaryItemData: utils.cloneDeep( this.cacheSummaryItemData ) });
            }

        },
        transfer2Need(){
            this.showDialogSubSummaryItem = false;
            let data = Object.assign({}, this.selectSummaryItemData);
            let params = {
                name: data.title,
                report: data.report,
                reportName: data.reportName,
                isActive: data.isActive,
                isPublic: data.isPublic,
                content: data.proposal,
                remark: data.remark,
                send: data.send,
                sendName: data.sendName,
                cc: data.cc,
                ccName: data.ccName
            };
            
            this.$router.push( { path: 'requirement', params } )

            sessionStorage.summaryItemData = JSON.stringify( params )
        },
        comfireUpdateSummaryItem( formName ){

            this.$refs[ formName ].validate( async (valid)=>{
                if (valid) {

                    if ( this.isToHost ){

                        this.updataSummaryItem2Host();

                    } else {
                        
                        let selectSummaryItemData = this.selectSummaryItemData;
                        let ctx = this;

                        this.updataSummaryItem2Local( { selectSummaryItemData, ctx } );
                    }

                }
            })
        },
        async updataSummaryItem2Host(){

            let mSummaryId = this.mSummaryId;

            if (this.isSummaryItemAdd) {

                var { status, data, msg } = await addSummaryItem( {...this.selectSummaryItemData, mSummaryId } );
                this.showDialogSubSummaryItem = false;

            } else {
        
                var { status, data, msg } = await updateSummaryItem( {...this.selectSummaryItemData } );
                this.isSummaryItemUpdate = false;
            }
            if ( status == 200) {
                this.$message( {type: 'success', message: '操作成功'} )
                this.getTargetSummaryItem( mSummaryId )

            } else {
                this.$message( {type: 'error', message: msg} )
            }
        },
        delSummaryItemConfirm(targetRow, index){
            this.$confirm('确认删除？').then( _ => { this.delSummaryItem(targetRow, index) })
        },
        async delSummaryItem( targetRow, index ) {

            if ( this.isToHost ) {
                let { mSummaryId ,mSummaryItemId } = targetRow;
                let { status, msg, data } = await deleteSummaryItem( mSummaryItemId );
    
                if ( status == 200) {
                    this.$message( {type: 'success', message: '操作成功'} )
                    this.getTargetSummaryItem( mSummaryId )
                } else {
                    this.$message( {type: 'error', message: msg} )
                }
            } else {
                this.summaryItemData.splice(index, 1);
            }

        },
    }
}
</script>
<style lang="less" scoped>
.demo-table-expand .el-form-item.el-summary-item {
    width: 100%
}

.dialog-sumaryItem {
    position: relative;
    float: left;
    height: 24px;
    line-height: 24px;
    padding: 5px 7px;
    margin-right: 5px;
    color: #1f2d3d;
    border: 1px solid #bfcbd9;
    border-radius: 4px;

    &:hover {
        cursor: pointer;
        color: #20a0ff;
    }
}
.el-icon-close-summaryItem {
    position: absolute;
    top: -6px;
    right: -8px;
    color: #adb2bb;
    width: 16px;
    height: 16px;

    &:hover {
        color: #20a0ff;
        cursor: pointer;
    }
}
.sumary-item_add {
    float: left;
    padding: 10px;
}
</style>
