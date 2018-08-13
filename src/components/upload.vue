<template>
    <div>
        <el-upload 
            :drag="drag" 
            :limit="limit"
            :action="action" 
            :multiple="multiple" 
            :on-success="fileSuccess"
            :on-remove="fileRemove"
            :on-exceed="fileExceed"
            ref="fileUpload"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <ul class="el-upload-list el-upload-list--text" ref="oldFiles">
            <li v-for=" (item, index) in oldFileList" :data-url="item" :key="index"  class="el-upload-list__item is-success">
                <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                        <a :href="item" v-fileName="item"> {{ item }} </a>
                </a>
                <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                </label>
                <i class="el-icon-close" @click="deleteFile( index )"></i>
                <i class="el-icon-close-tip">按 delete 键可删除</i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        drag: {
            type: Boolean,
            default: true
        },
        limit: {
            type: Number,
            default: 5
        },
        action: {
            type: String,
            default: "/api/v1/file/upload"
        },
        multiple: {
            type: Boolean,
            default: true
        },
        refStr: {
            type: String,
            default: ''
        },
        oldFileList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            fileList: []
        }
    },
    beforeCreate () {
        console.log('beforeCreate')
    },
    created () {
        console.log('created')
    },
    beforeUpdate () {
        console.log('beforeUpdate')
    },
    updated () {
        console.log('updated')
    },
    beforeDestroy () {
        console.log('beforeDestroy')
    },
    methods: {
        clearFiles(){
            this.$refs.fileUpload.clearFiles()
        },
        //文件处理
        fileSuccess( result ){
            let { data } = result
            let { filePath } = data
            this.fileList.push(filePath)
        },
        fileRemove(file, fileList){
            console.log(file, fileList)
            this.fileList = []
            fileList.forEach( (item) => {
                this.fileList.push( item.response.data.filePath )
            } )
        },
        fileExceed(){
            this.$message({
                type: 'error',
                message: "最大上传5个"
            });
        },
        deleteFile( index ){
            this.oldFileList.splice( index, 1 )
        },
    },
}
</script>

<style>

</style>