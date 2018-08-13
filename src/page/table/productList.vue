<template>
    <div class="fillcontain">
        <div class="table_container">
            <head-top></head-top>
            <el-col :span="24" class='actions-top'>
                <el-form class="demo-form-inline">
                    <el-form-item>
                        <el-button size="small" type="primary" @click="addProduct">新增产品</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-table 
                v-loading="mainLoading" 
                :highlight-current-row="true" 
                height="400"
                border
                :data="productData" 
                @row-click="checkProjectTable" 
                style="width: 100%" 
                @sort-change="sortProductTable">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item v-show="false" label="产品id">
                                <span>{{ props.row.mProductId }}</span>
                            </el-form-item>
                            <!-- <el-form-item label="产品名称"> <span>{{ props.row.name }}</span> </el-form-item> -->
                            <!-- <el-form-item label="状态"> <span>{{ props.row.statusName }}</span> </el-form-item> -->
                            <!-- <el-form-item label="创建时间"> <span>{{ props.row.created }}</span> </el-form-item> -->
                            <!-- <el-form-item label="创建人"> <span>{{ props.row.createdBy }}</span> </el-form-item> -->
                            <el-form-item label="产品描述">
                                <span>{{ props.row.description }}</span>
                            </el-form-item>
                            <el-form-item label="状态编码">
                                <span>{{ props.row.productStatusName }}</span>
                            </el-form-item>
                            <el-form-item label="是否活跃">
                                <span>{{ props.row.isActiveCN }}</span>
                            </el-form-item>
                            <el-row>
                                <el-form-item label="修改时间">
                                    <span>{{ props.row.updated }}</span>
                                </el-form-item>
                                <el-form-item label="修改人">
                                    <span>{{ props.row.updatedByName }}</span>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="产品名称" align="center"  prop="name"> </el-table-column>
                <el-table-column label="产品描述" align="center">
                    <template slot-scope="scope">
                        {{scope.row.description | shortBrif}}
                    </template>
                </el-table-column>
                <!-- <el-table-column label="产品描述" prop="description"> </el-table-column> -->
                <!-- <el-table-column label="是否活跃" align="center">
                    <template slot-scope="scope">
                        <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" :value="scope.row.isActive"></el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column width="100" label="产品状态" prop="statusName"> </el-table-column>
                <el-table-column width="150" label="创建人" prop="createdByName"> </el-table-column>
                <el-table-column width="180" sortable="custom" label="创建时间" prop="created"> </el-table-column>
                <el-table-column label="操作" align="center" width="170">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click.stop="updateProducts(scope.row)">修改</el-button>
                        <el-button size="mini" v-if="isDelete(scope.row)" type="danger" @click.stop="deleteProductsConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="productPagin.currentPage" :page-size="productPagin.pageSize" layout="total, prev, pager, next" :total="productPagin.totalPage">
                </el-pagination>
            </div>
            <el-dialog :title="isUpdate ? '产品修改' : '产品新增'" :visible.sync="addDialogShow">
                <header class="form_header">产品信息</header>
                <el-form v-loading="selectInited"  :model="productInfo" :rules="productInfoRules" ref="productInfo">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="名字" label-width="100px" prop="name">
                                <el-input v-model="productInfo.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否活跃" label-width="100px">
                                <el-switch active-text="是" inactive-text="否" active-value="Y" inactive-value="N" v-model="productInfo.isActive" auto-complete="off"></el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="产品状态" label-width="100px">
                                <el-select v-model="productInfo.productStatus">
                                    <el-option
                                        v-for="item in selectProductData"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
						            </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="说明" label-width="100px">
                                <el-input type="textarea" v-model="productInfo.description" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="" label-width="0px" style="text-align:center;">
                                <el-button type="primary" @click.stop="subProductForm('productInfo')" v-html="isUpdate ? '修改' : '新增' " class="submit_btn"></el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <project-list 
                :single="false"
                :get-api="getProjects" 
                ref="project" 
                v-show="projectListShow" 
            />

        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
import projectList from './projectList'
import { baseUrl, baseImgPath } from '@/config/env'
import { getChildStatus, updateProducts, deleteProducts, addProducts, getProducts, getProjects } from '@/api/getData'
export default {
    mixins: [mixin],
    data() {
        return {
            getProjects,
            adReferenceId: 25,//产品的状态ID
            projectListShow: false,
            maxPage:9999,
            selectInited: true,
            mProductId: '',
            projectLoading:true,
            addDialogShow: false,
            addProjectShow:false,
            beforeMProductId:'',
            isprojectShow:false,
            projectName:'',
            productData: [],
            productInfo: {
                name: '',
                descreption: '',
                productStatus: '',
                isActive: false
            },
            productInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入会议标题',
                        trigger: 'blur'
                    }
                ]
            },
            mainLoading: true,
            productPagin: {
                totalPage: 0,
                currentPage: 1,
                pageSize: 10
            },
            projectData:[],
            projectInfo: {
                name: '',
                description: '',
                projectStatus: '',
                isActive: false,
                planStart: '',
                planEnd:'',
                actualStart: '',
                actualEnd: '',
                remark :'',
            },
            projectInfoRules: {
                name: [
                    {
                        required: true,
                        message: '请输入会议标题',
                        trigger: 'blur'
                    }
                ]
            },
            selectProject:[],
            projectPagin: {
                totalPage: 0,
                currentPage: 1,
                pageSize: 10
            },
            baseUrl,
            baseImgPath,
            city: {},
            offset: 0,
            limit: 20,
            count: 0,
            
            selectTable: {},
            dialogFormVisible: false,
            categoryOptions: [],
            selectedCategory: [],
            address: {},

            selectProductData: [],
            selectProjectData: []
        }
    },
    methods: {
        initData(){
            this.getProducts();
            this.initSelectProductData()
        },
        getProducts(order = {}) {
            this.mainLoading = true
            this.productData = []
            this.handleGet(this.productData, getProducts, this.productPagin).then(() => {
                this.mainLoading = false
                this.isActiveCN = this.isActive === 'N' ? '否' : '是'
                this.descriptionBrief = this.description && this.description.slice(0, 20)
            })
        },
        addProduct() {
            this.addDialogShow = true
            this.handleAdd(this.productInfo)
        },
        deleteProductsConfirm(row){
            this.$confirm('确认删除？').then( _ => { this.deleteProducts(row.mProductId) })
        },
        deleteProducts(mProductId){
            this.handleDelete(mProductId, deleteProducts, () => {this.getProducts();});
        },
        updateProducts(row){

            this.addDialogShow = true
            this.mProductId = row.mProductId
            this.productInfo = Object.assign({}, this.handleUpdate(this.productInfo, row))

        },
        async subProductForm(formName) {
            let params = Object.assign({},this.productInfo)
            this.handleSubmit(formName, params, addProducts, updateProducts).then(() => {this.addDialogShow = false; this.getProducts()})
        },
        handleCurrentChange(val) {
            this.productPagin.currentPage = val;
            this.getProducts()
        },

        handleprojectCurrentChange(currentPage){
            this.projectPagin.currentPage = currentPage
        },
        
        checkProjectTable(scope) {
            this.projectListShow = true
            this.$nextTick( ( ) => {
                this.$refs.project.checkProjectTable(scope)
            } )
        },
        sortProductTable({ prop, order }) {
            let sortType = (order === 'ascending' ? 'asc' : 'desc')
            this.getProducts({ sortType })
        },
        isDelete(row){
            let {productStatus} = row
            let isDelete = {
                '??': false,
                RD: true,
                AP:true,
                NA:true,
                IP:false,
                CO:true,
                CL:true,
                IN:true,
                SP:true,
                TN:true
            }
            return true
        },
        
        async initSelectProductData() {
            this.selectProductData = []
            this.handleGet(this.selectProductData, getChildStatus, {pageSize: this.maxPage}, 25).then(() => {
                this.selectInited = false;
            })
        },
    },
    components: {
        projectList
    }
}
</script>

<style lang="less">
@import '../../style/mixin';
.demo-table-expand {
    font-size: 0;
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
