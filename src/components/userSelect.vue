<template>

    <el-dialog  title="人员选择" :visible.sync="showUserSelectDialog" :append-to-body="true">
        <el-row style="marginBottom:20px;">
            <el-col :span="24">
                <el-button size="max" type="primary" @click.stop="selectUser">确认选择</el-button>
            </el-col>
        </el-row>
        <el-tree 
            ref="userSelectTree" 
            :node-key="nodeKey" 
            :show-checkbox="true" 
            :data="userTreeArray" 
            :default-expanded-keys="defaultExpandedKeys" 
            :highlight-current="true"
        >
        </el-tree>
    </el-dialog>
</template>

<script>

export default {
    props: ['defaultExpandedKeys', 'nodeKey', 'userTreeArray'],
    data(){
        return {
            showUserSelectDialog: false
        }
    },
    methods: {
        selectUser(){

            let selectNode =  this.$refs.userSelectTree.getCheckedNodes(true);

            let names = [], 
                ids   = [];

            selectNode.forEach( item => {
                if ( item.adUserId != -1 ) {
                    names.push( item.label );
                    ids.push( item.id );
                }
            } )

            this.$emit( 'comfirSelectUser', event.target, names, ids );
            this.showUserSelectDialog = false;
        },
        // invoke
        clickInputHandler( names, ids ){

            this.showUserSelectDialog = true;

            setTimeout( ()=>{
                let uniqulId = [];
    
                names = names ? names.split(',') : [];
                ids = ids ? ids.split(',') : [];
    
                for ( let i = 0, len = names.length; i < len; i++ ){
                    uniqulId.push( ids[i] + '^_^' + names[i] );
                }
                this.$refs.userSelectTree && this.$refs.userSelectTree.setCheckedKeys( uniqulId );
            }, 10 )
        
        }
    }
}
</script>

<style>

</style>

