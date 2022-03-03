// 这里是登录和注册的小仓库
import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
    reqUserInfo,
    reqLogout,

} from '@/api';

const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

    USERLOGIN(state, token) {
        state.token = token;
    },

    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },


    // 清除本地的数据
    CLEARALL(state) {
        // 把Vuex相关信息清空
        state.token = '';
        state.userInfo = {};

        // 本地存储token清空
        localStorage.removeItem('TOKEN')
    }
};
const actions = {
    // 获取验证码
    async getCode({
        commit
    }, phone) {
        // 获取验证码的这个接口，把验证码返回了，但是正常情况下，应该是后台把验证码发到用户的手机上
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },


    // 用户注册
    async userRegister({
        commit
    }, user) {
        let result = await reqUserRegister(user);
        // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },



    // 用户登录
    async userLogin({
        commit
    }, data) {
        let result = await reqUserLogin(data);
        console.log(result);

        // 服务器下发token，用户唯一标识符
        // 将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            // 本地持久化存储token
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },


    // 获取用户信息
    async getUserInfo({
        commit
    }) {
        let result = await reqUserInfo();
        // console.log(result);
        if (result.code == 200) {
            // 用户已经登录成功且获取到token
            commit('GETUSERINFO', result.data);




        }
    },


    // 退出登录
    async userLogout({
        commit
    }) {
        //   只是向服务器发起一次请求，通知服务器清除token
        const result = await reqLogout();
        // action里面不能操作state，需要提交mutation
        if (result.code == 200) {
            commit('CLEARALL');
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }

    }
};
const getters = {};


export default {
    state,
    mutations,
    actions,
    getters
}