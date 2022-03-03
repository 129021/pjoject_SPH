import {
    reqCartList,reqDeleteCartById
} from '@/api'

const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList=cartList;

    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList({
        commit
    }) {
        let result = await reqCartList();
        // console.log(result);
        if(result.code==200){
            commit('GETCARTLIST',result.data);
        }

    },


    // 删除购物车某一个产品
   async reqDeleteCartListBySkuId({commit},skuId){
      let result=  await reqDeleteCartById(skuId);

      if (result.code==200){
          return 'ok'
      }else{
          return Promise.reject(new Error('fail'))
      }
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}