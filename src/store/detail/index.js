import {
    reqAddOrUpdateShopCart,
    reqGoodsInfo,
} from "@/api";

// 封装一个游客身份的模块uuid，用来生成一个随机的字符串（但是生成一次就不能再变了）
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},


    // 游客的临时身份
    uuid_token:getUUID(),
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


    // 将产品添加到购物车中
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {

        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 发送请求加入购物车成功之后，前台将参数带给服务器，服务器写入数据成功，并没有返回其他的数据，返回code=200,代表这次操作成功
        // 因为服务器没有返回其余的数据，所以不需要三连环存储数据
        // console.log(result);
        // 当前这个函数如果执行返回promise

        if (result.code == 200) {
            // 代表服务器中商品加入购物车成功
            return "ok";
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error("fail"));
        }

    }
};
const getters = {

    // 简化数据
    categoryView(state) {

        // state.goodInfo初始的状态是一个空对象，空对象没有categoryView属性，会返回undefined
        // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {};
    },

    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },

    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}