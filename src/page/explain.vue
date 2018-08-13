<template>
    <div class="fillcontain">
        <p class="explain_text">vue后台管理系统</p>
        <p class="explain_text">前台使用比较流行的MVVM框架来做展示</p>
        <p class="explain_text">目前已开发的功能有会议纪要管理、需求管理、产品管理、项目管理</p>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
