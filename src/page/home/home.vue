<template>
    <div class="my-job-bd">
		<section class="db_font_size" v-loading="loading" v-if="!loading">
			<header class="section_title head_style">我的工作</header>

			<el-row class="box_title_style" >
				<span class="desc-hd" id="leftSpan" v-if="requireList.length > 0">
					<span class="showHead">需求 </span>共<span class="stat_num">{{requireList.length}}</span>条,处理中<span class="stat_num">{{requireList[0] && requireList[0].ipStatusCount || 0}}</span>条，已暂停<span class="stat_num">{{ requireList[0] && requireList[0].spStatusCount}}</span>条，已完成<span class="stat_num">{{requireList[0] && requireList[0].coStatusCount || 0}}</span>条。
				</span>
				<span class="desc-hd">
					<span class="showHead">任务 </span>共<span class="stat_num">{{taskList.length}}</span>条，处理中<span class="stat_num">{{taskList[0] && taskList[0].ipStatusCount || 0}}</span>条，已完成<span class="stat_num">{{taskList[0] && taskList[0].coStatusCount || 0}}</span>条。
				</span>
				
			</el-row>

			<el-row :gutter="20" class="box_style" style="margin-left:3%;float:left;">
				<div id="requireList" class="box_head_style"><span style="margin-left:10px">需求清单</span><span class="countMess">数量:{{requireList.length}}</span></div>
				<el-col  class="box_content_style" style="padding-left: 0px; padding-right: 0px;">
					<ul>
						<li v-for=" ( item ,index ) in requireList" :key="index">
							<p style="height: 30px"><a class="name" href="" v-html="item.name" ></a><span v-html="item.created" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row>

			<el-row :gutter="20" class="box_style" style="margin-left:51%;">
				<div id="myTask" class="box_head_style"><span style="margin-left:10px">我的任务</span><span class="countMess">数量:{{taskList.length}}</span></div>
				<el-col class="box_content_style" style="padding-left: 0px; padding-right: 0px;">
					<ul>
						<li v-for=" ( item ,index ) in taskList " :key="index">
							<p style="height: 30px"><a class="name" href="" v-html="item.name" ></a><span v-html="item.updated" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row>
			

			<el-row class="box_title_style">
				<span class="desc-hd" id="leftSpan">
					<span class="showHead">我的故障单 </span>共<span class="stat_num">{{faultList.length}}</span>条，处理中<span class="stat_num">{{faultList[0] && faultList[0].ipStatusCount || 0}}</span>条，已完成<span class="stat_num">{{faultList[0] && faultList[0].coStatusCount || 0}}</span>条。
				</span>
				<span class="desc-hd">
					<span class="showHead">会议纪要 </span>共<span class="stat_num">{{summaryList.length}}</span>条,处理中<span class="stat_num">{{summaryList[0] && summaryList[0].ipStatusCount || 0}}</span>条，已暂停<span class="stat_num">{{summaryList[0] && summaryList[0].spStatusCount}}</span>条，已完成<span class="stat_num">{{summaryList[0] && summaryList[0].coStatusCount || 0}}</span>条。
				</span>
				
			</el-row>

			<el-row :gutter="20" class="box_style" style="margin-left:3%;float:left;">
				<div id="bugTask" class="box_head_style"><span style="margin-left:10px">我的故障单</span><span class="countMess">数量:{{faultList.length}}</span></div>
				<el-col class="box_content_style" style="padding-left: 0px; padding-right: 0px;">
					<ul>
						<li v-for=" ( item ,index ) in faultList " :key="index" >
							<p style="height: 30px"><a class="name" href="" v-html="item.name" ></a><span v-html="item.updated" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="box_style" style="margin-left:51%;">
				<div id="meetingList" class="box_head_style"><span style="margin-left:10px">会议纪要清单</span><span class="countMess">数量:{{summaryList.length}}</span></div>
				<el-col  class="box_content_style" style="padding-left: 0px; padding-right: 0px;" >
					<ul>
						<li v-for=" ( item ,index ) in summaryList" :key="index">
							<p><a class="name" href="" v-html="item.title" ></a><span v-html="item.updated" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row>

			

			<!-- <el-row class="box_title_style">
				<span id="leftSpan">
					<span class="showHead">思考问题</span>共<span class="stat_num">{{considerationList.length}}</span>个,开发中<span class="stat_num">{{considerationList[0] && considerationList[0].ipStatusCount || 0}}</span>个，已暂停<span class="stat_num">{{considerationList[0].spStatusCount}}</span>个，已完成<span class="stat_num">{{considerationList[0].coStatusCount}}</span>个。
				</span>
				<span>
					<span class="showHead">项目</span>共<span class="stat_num">{{projectList.length}}</span>个，处理中<span class="stat_num">{{projectList[0] && projectList[0].ipStatusCount || 0}}</span>个，已暂停<span class="stat_num">{{projectList[0].spStatusCount}}</span>个，已完成<span class="stat_num">{{projectList[0].coStatusCount}}</span>个。
				</span>
			</el-row>			 -->

			<!-- <el-row :gutter="20" class="box_style" style="margin-left:3%;float:left;">
				<div id="considerationList" class="box_head_style"><span style="margin-left:10px">思考问题清单</span><span class="countMess">数量:{{considerationList.length}}</span></div>
				<el-col  class="box_content_style" style="padding-left: 0px; padding-right: 0px;" >
					<ul>
						<li v-for=" ( item ,index ) in considerationList " :key="index">
							<p><a class="name" href="" v-html="item.name" ></a><span v-html="item.updated" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row> -->
			<el-row :gutter="20" class="box_style" style="margin-left:51%;">
				<div id="projectList"  class="box_head_style"><span style="margin-left:10px">项目清单</span><span class="countMess">数量:{{projectList.length}}</span></div>
				<el-col  class="box_content_style" style="padding-left: 0px; padding-right: 0px;">
					<ul>
						<li v-for=" ( item ,index ) in projectList " :key="index">
							<p><a class="name" href="" v-html="item.name" ></a><span v-html="item.updated" ></span><span v-html="item.statusName" class="task_staus"></span></p>
						</li>
					</ul>
				</el-col>
			</el-row>

		</section>
    </div>
</template>


<script>
	import mixin from '@/page/mixin/mixin'
	import headTop from '@/components/headTop'
	import tendency from '@/components/tendency' 
	import dtime from 'time-formater'
	import { utils } from '@/util/util.js'
	import { mapState } from 'vuex'
	import { getProductStatistics} from '@/api/getData'

    export default {
		mixins: [mixin],
    	data(){
    		return {
				loading: true,
				tableData:[],
				productList:[],
				projectList:[],
				requireList:[],
				summaryList:[],
				faultList:[],
				taskList:[],
				considerationList:[]
    		}
		},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    	},
        computed: {
			...mapState({
				adUserId: ( state ) => state.menus.userInfo.adUserId
			})
        },
    	methods: {
			 initData() {
				 this.getProductStatistics()
			 },
			async getProductStatistics(){
				let result = await getProductStatistics( {userId: this.adUserId+''} )
				//console.log(result)
				this.productList.push( ...result.data.product )
				this.projectList.push( ...result.data.project )
				this.requireList.push( ...result.data.require )
				this.summaryList.push( ...result.data.summary )
				this.faultList.push( ...result.data.fault )
				this.taskList.push( ...result.data.task )
				let consideration = result.data.consideration ||[]
				this.considerationList.push( ...consideration)
				this.loading = false
				console.log(this.tableData)
			}
    	}
    }
</script>

<style scoped lang="less">
	@import '../../style/mixin';
	.my-job-bd {
		color: #606266;

		a {
			color: #606266;
		}
	}
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
			border-radius: 6px;
			background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;
            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background:crimson;
        }
        .all_head{
            background: #20A0FF;
		}
	}
    .wan{
        .sc(16px, #333)
	}

	.head_style {
		height: 60px;
		line-height: 60px;
		text-align:center;
		padding: 5px 2px;
		// color: #fff;
		font-size:36px;
		font-family: cursive;
		// background: -webkit-gradient(linear,0 0, 0 bottom,from(#C2C6C9),to(rgba(224,230,233,0.5)));
		box-shadow: 0 0 10px 1px #bfeaec;
	}
	.name{
		padding-left: 10px;
		color: 3f516e;
		width: 30%;
  		display: inline-block;
  		overflow: hidden;
  		text-overflow: ellipsis;
  		white-space: nowrap;
  		float: left;
	}
	.task_staus{
		float: right;
		margin-right:10px;
	}
	.task_staus_finish{
		color:dodgerblue;
		float: right;
		margin-right:10px;
	}
	.db_font_size{
		font-family: 微软雅黑;
	}
	.content_margin{
		margin-left: 20px;
	}
	.stat_num{
		font-size: 16px;
		color: #fb2f2f;
		// font-style: italic;
	}
	.box_title_style{
		font-size:18px;
		margin-left: 3%;
		margin-bottom:10px;
		margin-top:15px;
	}
	.box_style{
		margin-left:50%;
		width:40%;
		border:1px solid #E0E6E9;
		border-radius: 6px;
	}
	.box_head_style{
		line-height: 30px;
    	background: #bbdcef;
	}
	.box_content_style{
		margin-bottom: 10px; 
		line-height:30px;
		max-height:180px;
		overflow-y: auto;
		margin: 0;
		height: 180px;
		background: #dbf3fb;
	}
	#leftSpan{
		width: 50%;
		float: left;
	}
	.desc-hd {
		font-size: 14px;
	}
	.countMess{
		float:right;
		margin-right:10px;
	}
	.boxleft{
		margin-left:3%;
		float:left;
	}
	.boxright{
		margin-left:50%;
	}
	.showHead{
		color: #3f516e;
		font-weight: bold;
		font-size: 16px;
	}
	p {
		font-size: 14px;
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#fdfeff), to(rgba(232, 239, 243, 0.5)));
	}
	p:hover {
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#eae3d3), to(#f7d57b));
	}
</style>
