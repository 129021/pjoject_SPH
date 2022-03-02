import {
    reqGoodsInfo
} from "@/api";
const state = {
    goodInfo: {},
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({
        commit
    }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }

    },
};
const getters = {

    // 简化数据
    categoryView(state) {

        // state.goodInfo初始的状态是一个空对象，空对象没有categoryView属性，会返回undefined
        // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}