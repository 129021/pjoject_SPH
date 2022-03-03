// 这里是登录和注册的小仓库
import {
    reqGetCode,
    reqUserRegister,
    reqUserLogin,
} from '@/api';

const state = {
    code: '',
    token:'',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

    USERLOGIN(state,token){
        state.token=token;
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
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
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