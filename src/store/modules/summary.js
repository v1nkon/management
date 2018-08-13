import { querySummaryItem } from '@/api/getData';

const state = {
    selectTable: {},
    summaryItemData: [],
}

const getters = {

}

const mutations = {
    setSummarySelectTable( state, payload ){
        state.selectTable = Object.assign(payload.selectTable);
    },
    setSummaryItemData( state, payload ){
        state.summaryItemData = Object.assign(payload.summaryItemData);
    },
    updataSummaryItem2Local( state, payLoad ){
        if (payLoad.ctx.isSummaryItemAdd) {

            state.summaryItemData.push(payLoad.selectSummaryItemData)

            payLoad.ctx.showDialogSubSummaryItem = false;

        } else {

            state.summaryItemData[this.targetSummaryIndex] = payLoad.selectSummaryItemData
            
            payLoad.ctx.isSummaryItemUpdate = false;
        }
    }
}

const actions = {
    async getTargetSummaryItem( { commit, state }, mSummaryId ){
    
        // 先清空
        state.summaryItemData = [];
        let { data, status, msg } = await querySummaryItem( mSummaryId );

        if ( status == 200 ){

            state.summaryItemData = Object.assign(data);

        } else {
            this.$message( { type: 'error', message: msg } );
            state.summaryItemData = [];
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}