<template>

</template>

<script>
import headTop from '../../components/headTop'
import addBtn from '@/components/addBtn'
import { getMenuInfo } from '@/api/getData'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            timeoutId: null,
            auth:{
                add: false,
                delete: false,
                update: false
            },
            pagin: {
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
                sortType: 'desc'
            }
        }
    },
    created () {
        let TOKEN = sessionStorage.getItem('TOKEN')
        if(TOKEN){
            this.initData()
        }
    },
    beforeRouteEnter(to, from, next) {
        next( vm => {
            Object.assign(vm.auth, to.meta[0])
            vm.setUpdate(false)
            vm.setGap(Date.now())
        } )
    },
    computed: {
        ...mapState(['isUpdate', 'expires', 'MAX_GAP', 'autoIncrement']),
        ...mapState({
            menusHasFinished: state => state.menus.menusHasFinished
        })
    },
    methods: {
        ...mapMutations(['setUpdate', 'setGap', 'setAutoIncrement']),
        async handleGet(tableData, getApi, pagin, id) {
            pagin = pagin || this.pagin
            let { data, status, message, isError } = await getApi({ ...pagin }, id)
            if(isError) {
                Promise.resolve('');
            }
            if(data){
                let { totalPage, currentPage } = data
                Object.assign(pagin, { totalPage, currentPage })
                tableData.push(...data.data)
            }
            return new Promise((resolve) => {
                resolve();
            })
        },
        handleAdd() {
            this.setUpdate(false)
        },
        async handleDelete(ids, deleteApi, callback) {
            let {isError, message} = await deleteApi(ids)
            if(isError){
                return
            }
            callback();
            this.setAutoIncrement()
            this.$message({
                type: 'success',
                message: "删除成功"
            });
        },
        handleUpdate(tableInfo = {}, row = {}) {
            this.setUpdate(true)
            return Object.assign(tableInfo, row)
        },
        handleSubmit(formName, tableInfo, addApi, updateApi, addMessage) {
            return new Promise((resolve, reject)=>{
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let result = ''
                        let message = ''
                        if (!this.isUpdate) {
                            message = addMessage || '添加成功'
                            result = await addApi({...tableInfo})
                        } else {
                            message = '修改成功'
                            result = await updateApi({...tableInfo})
                        }
                        
                        if(result.isError){
                            reject();
                            return ;
                        }
                        resolve(result);
                        this.setAutoIncrement()
                        this.$message({
                            type: 'success',
                            message: message
                        });
                     
    
                    } else {
                        console.log('xxxxxx')
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        reject();
                    }
                });

            })
        },
        throttle(fn,context){
			var args = Array.prototype.slice.call(arguments,2);//获取剩余参数 fn调用需要的参数
			if(this.timeoutId){
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(function(){
				fn.apply(context,args)
			},200)
		},
    },
    components: {
        headTop,
        addBtn
    },
    watch: {
        expires(newGap){
            if( newGap > this.MAX_GAP && this.menusHasFinished){

                this.throttle( this.initData, this )

            }
        },
        autoIncrement(){
            
            if(this.menusHasFinished){

                this.throttle( this.initData, this )

            }
        }
    },
    filters: {
        shortBrif: function(value){
            let content = value.slice(0, 20)
            if( value.length > 20 ){
                content += '...'
            }
            return content
        }
    }
}
</script>
<style>

</style>


