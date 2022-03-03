import Vue from 'vue'
import Vuex from 'vuex'



// 需要使用插件一次
Vue.use(Vuex)


// 引入小仓库
import home from './home';
import search from './search'
import detail from './detail';
import shopcart from './shopcart';
import user from './user';


// const state={
//     count:1
// };
// const mutations={
//     // ADD(state,count){
//     //     state.count++
//     // }
// };
// const actions={
//     // 这里可以书写业务逻辑，但是不能直接修改state
//     // add({commit}){
//     //     commit("ADD")

//     // }
// };
// const getters={};




// 对外暴露store类的一个实例

export default new Vuex.Store({
    // state:{}, 仓库存储数据的地方
    // mutations:{}, 修改state的唯一手段
    // actions:{}, 处理action，可以书写自己的业务逻辑，也可以处理异步
    // getters:{}, 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

    // state,
    // mutations,
    // actions,
    // getters,



    // 实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        
        

    }


})