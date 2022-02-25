// home 模块的小仓库
import {
    reqCategoryList,
    reqBannerList,
    reqFloorList,
} from '@/api';


const state = {
    // state中的数据默认初始值别瞎写，服务器返回对象，服务器返回数组（根据接口的返回值初始化数据）
    categoryList: [],

    bannerList: [],

    floorList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {

        // 这里应该有16条数据，但是接口数据被人修改变成了17条，为了能够展示，这里只取前16条
        state.categoryList = categoryList.slice(0, 16)
    },


    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },

    
    FLOORLIST(state,floorList){
        state.floorList=floorList;
    }


};
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({
        commit
    }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }

    },



    // 获取首页轮播图的数据
    async getBannerList({
        commit
    }) {
        let result = await reqBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },





    // 获取floor数据
    async getFloorList({
        commit
    }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
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