
<template>
    <el-tree :data="treeOrg" node-key="uniqulId"  :default-expand-all="true" @node-click="nodeClick" :highlight-current="true">
    </el-tree>
</template>

<script>
import mixin from '@@/mixin/mixin'
import { getOrgTreeData } from '@/api/getData'
export default {
    props: {
        getApi: {
            type: Function,
            default: getOrgTreeData
        },
        nodeClick: {
            type: Function,
            default: _ => {}
        },
        expand: {
            type: Boolean,
            default: true
        }
    },
    mixins: [mixin],
    data() {
        return {
            treeOrg: [{
                id: 0,
                label: '顶层',
                children: [],
                uniqulId: '0^_^顶层'
            }],
        }
    },
    created() {
        this.initData()
        console.log('created')
    },
    beforeCreate () {
        console.log('beforeCreate')
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
        async initData(){
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
        }
    }
}
</script>
<style>

</style>


