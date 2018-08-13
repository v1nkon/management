export const utils = {
    formatDate( time ){
        if(time == 0 || !time){
            return null
        }
        var date = new Date(time)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hms = date.toTimeString().match(/\d{2}:\d{2}\:\d{2}/)[0]

        month = month.toString().length == 1 ? '0' + month : month
        day = day.toString().length == 1 ? '0' + day : day

        return year + '-' + month + '-' + day + ' ' + hms
    },
    cloneDeep( targetObj ){

        let newObj = targetObj instanceof Array ? [] : {};

        if ( typeof targetObj !== 'object' ) {
            return targetObj;
        } else {
            for ( var i in targetObj ) {
                newObj[i] = typeof targetObj[i] == 'object' ? this.cloneDeep( targetObj[i] ) : targetObj[i];
            }
            return newObj;
        }
    }
}

/**
 * 
 * @param { FetchName } apiName 
 * @param { Array } params 
 */
export const getSelectData = async ( ctx, targetName, apiName, id, params = {},  ) => {
    let { data, status, msg } = await apiName( { pageSize: 9999, ...params }, id );

    if ( status == 200 ) {
        ctx[targetName] =  data.data;
    }
}