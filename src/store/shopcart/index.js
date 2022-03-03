import {
    reqCartList,
    reqDeleteCartById,
    reqUpdateCheckedById,
} from '@/api'

const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;

    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({
        commit
    }) {
        let result = await reqCartList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }

    },


    // 删除购物车某一个产品
    async reqDeleteCartListBySkuId({
        commit
    }, skuId) {
        let result = await reqDeleteCartById(skuId);

        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },


    // 删除全部勾选的产品
    deleteAllCheckedCart({
        dispatch,
        getters
    }) {
        // alert('删除选中')
        // 在此action中多次调用上一个action： reqDeleteCartListBySkuId
        // console.log(context);
        // 可以把context理解成小仓库，包含commit（提交mutations修改state）getters,dispatch(派发action),state(当前仓库数据)

        //    获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            // console.log(123);
            let promise = item.isChecked == 1 ? dispatch('reqDeleteCartListBySkuId', item.skuId) : '';
            // 将每一次返回的promise返回到数组PromiseAll当中
            PromiseAll.push(promise);

        });
        // 所有的promise都成功才返回成功结果，但凡有一个失败就返回失败结果
        return Promise.all(PromiseAll);


    },


    // 修改商品选中的状态(带两个参数，要传一个对象)
    async updateCheckedById({
        commit
    }, {
        skuId,
        isChecked
    }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },


    // 修改全选的状态
    updateAllCartIsChecked({
        dispatch,
        state
    }, isChecked) {
        let PromiseAll = [];
        // console.log(state);
        // console.log(isChecked);
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {
                skuId: item.skuId,
                isChecked
            });

            PromiseAll.push(promise);
        });
        // 最终返回结果
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}