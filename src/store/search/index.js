// search 模块的小仓库

import {
    reqGetSearchInfo
} from "@/api";



const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;

    }
};
const actions = {
    // 获取search模块数据
    async getSearchList({
        commit
    }, params = {}) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）

        // params:是当用户派发action的时候，第二个参数传过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)

        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};



// 计算属性，在项目当中是为了简化数据而生
// 可以把我们将来在组件中需要用的数据简化一下，（将来组件在获取数据的时候就方便了
const getters = {
    goodsList(state) {

        // 如果服务器数据回来了,没问题，这是一个数组，但是假如网络较差，或者没有网络，应该返回都是undefined
        return state.searchList.goodsList ||undefined ;
    },


    trademarkList(state){
        return state.searchList.trademarkList
    },


    attrsList(state){
        return state.searchList.attrsList
    },


};


export default {
    state,
    mutations,
    actions,
    getters,
}