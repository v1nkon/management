
<template>
    <el-col 
        v-if="auth.add" 
        :span="24" 
        class='actions-top'>
        <el-form 
            class="demo-form-inline">
            <el-form-item>
                <el-button 
                    size="small" 
                    type="primary" 
                    @click.stop="operate"
                    v-html="operateName"
                /></el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
export default {
    props: {
        operate: {
            type: Function,
            default: () => {}
        },
        operateName: {
            type: String,
            default: '新增'
        },
        auth: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>

</style>