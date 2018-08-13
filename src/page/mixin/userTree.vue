<template>

</template>

<script>
import {
    getUserTree
} from '@/api/getData'
export default {
    data() {
        return {
            getApi: getUserTree,
            treeShow: false,
            treeLoading: true,
            treeId: 'adUserId',
            treeItemId: 'adOrgId',
            modleInfoName: 'requireInfo',
            idKey: '',
            nameKey: '',
            hasInitialed: false,
            userTreeArray: [],
            includeParent: false,
            includehalfNode: false
        }
    },
    methods: {
        async getUserTree(id, name) {
            let {
                data,
                status,
                msg
            } = await this.getApi();
            if (status == 200) {
                this.userTreeArray.push({
                    id: 0,
                    [this.treeId]: -1,
                    label: '顶层',
                    children: [],
                    uniqulId: '0^_^顶层'
                })
                this.userTreeArray[0]['children'] = this.arrayToUserTree(data, 0);
                return Promise.resolve()
            } else {
                this.$message({
                    type: 'error',
                    message: msg
                });
            }

        },
        handleTreeOpen(id, name, halfId, halfName) {
            this.treeShow = true
            if (!this.hasInitialed) {
                this.getUserTree().then(() => {
                    this.hasInitialed = true
                    this.treeLoading = false
                    this.handleTreeOpenAfter(id, name, halfId, halfName)
                })
            } else {
                this.handleTreeOpenAfter(id, name, halfId, halfName)
            }
        },
        handleTreeOpenAfter(id, name, halfId, halfName) {
            this.treeShow = true
            this.idKey = id;
            this.nameKey = name;
            this.halfId = halfId
            this.halfName = halfName
            this.$nextTick(() => {
                this.$refs.responsibleTree.setCheckedKeys([])
                let idsArr = this[this.modleInfoName][this.idKey] ? this[this.modleInfoName][this.idKey].split(',') : [];
                let namesArr = this[this.modleInfoName][this.nameKey] ? this[this.modleInfoName][this.nameKey].split(',') : [];
                let keyArr = []
                for (let i = 0, len = idsArr.length; i < len; i++) {
                    let key = idsArr[i] + '^_^' + namesArr[i]
                    keyArr.push(key)
                }
                this.$refs.responsibleTree.setCheckedKeys(keyArr)
            })
        },
        handleTreeSelect() {
            let arr = this.$refs.responsibleTree.getCheckedNodes(!this.includeParent)
            let idsArr = []
            let namesArr = []
            arr.forEach((item) => {
                if (item[this.treeId] != 0 && item[this.treeId] != -1) {
                    idsArr.push(item[this.treeId])
                    namesArr.push(item.label)
                }
            })
            this[this.modleInfoName][this.idKey] = idsArr.join(',')
            this[this.modleInfoName][this.nameKey] = namesArr.join(',')
            this.treeShow = false
        },
        handleTreeSelectAll() {
            let arr = this.$refs.responsibleTree.getCheckedNodes(true)
            let arr2 = this.$refs.responsibleTree.getHalfCheckedNodes(true)
            let idsArr = []
            let namesArr = []
            let halfIdArr = []
            let halfNameArr = []
            arr.forEach((item) => {
                if (item[this.treeId] != 0 && item[this.treeId] != -1) {
                    idsArr.push(item[this.treeId])
                    namesArr.push(item.label)
                }
            })
            arr2.forEach( (item) => {
                if (item[this.treeId] != 0 && item[this.treeId] != -1) {
                    halfIdArr.push(item[this.treeId])
                    namesArr.push(item.label)
                }
            } )
            this[this.modleInfoName][this.halfId] = halfIdArr.join(',')
            this[this.modleInfoName][this.halfName] = halfNameArr.join(',')
            this[this.modleInfoName][this.idKey] = idsArr.join(',')
            this[this.modleInfoName][this.nameKey] = namesArr.join(',')
            this.treeShow = false
        },
        arrayToUserTree(data, id) {

            let dataTemp = []

            data.forEach((item, index) => {

                if (item.parentId == id) {

                    let children = []
                    if (this.treeId === 'adMenuId') {
                        children = this.arrayToUserTree(data, item[this.treeItemId])
                    } else {
                        children = item[this.treeId] != -1 ? [] : this.arrayToUserTree(data, item[this.treeItemId]);
                    }
                    let uniqulId = item[this.treeId] + '^_^' + item.name

                    dataTemp.push({
                        uniqulId,
                        children,
                        id: item[this.treeId],
                        parentId: item.parentId,
                        [this.treeId]: item[this.treeId],
                        label: item.name,
                    })
                }

            })

            return dataTemp

        },
        inputClickHandler(selectUserModelName, inputName, inputId) {
            this.targetSelectUserName = inputName;
            this.targetSelectUserId = inputId;
            this.targetSelectModelName = selectUserModelName;

            let names = this[this.targetSelectModelName][this.targetSelectUserName] || '';
            let ids = this[this.targetSelectModelName][this.targetSelectUserId] || '';

            this.$refs.userSelectDialog && this.$refs.userSelectDialog.clickInputHandler(names, ids);
        },
        /**-------------------------用户选择 */
        comfirSelectUser(el, names, ids) {

            setTimeout(() => {

                this[this.targetSelectModelName][this.targetSelectUserName] = names.join(',');
                this[this.targetSelectModelName][this.targetSelectUserId] = ids.join(',');

            }, 0)


        },
    }
}
</script>
<style>

</style>
