// home 模块的小仓库
import {reqCategoryList} from '@/api'


const state = {
    // state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组（根据接口的返回值初始化数据）
    categoryList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
   async categoryList({commit}){
        let result =await reqCategoryList();
        // console.log(result);
        if(result.code==20){
            commit("CATEGORYLIST",result.data)
        }

    }
};
const getters = {};


export default {
    state,
    mutations,
    actions,
    getters,
}