//配置路由的地方

import Vue from 'vue';
import VueRouter from 'vue-router';


import store from '@/store';
// 使用插件
Vue.use(VueRouter);

// // 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'

import routes from './routes'
// 重写push和replace方法

// 1. 先把VueRouter原型对象的Push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 2. 重写push和replace方法

// push方法第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调函数
// 第三个参数：失败的回调函数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call/apply区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}





// 配置路由

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            top: 0
        }
    },

    // 配置路由
    // routes: [{
    //         path: '/home',
    //         component: Home,
    //         meta: {
    //             show: true
    //         }
    //     },
    //     {
    //         path: '/search/:keyword?',
    //         component: Search,
    //         meta: {
    //             show: true
    //         },
    //         name: 'search',
    //     },
    //     {
    //         path: '/login',
    //         component: Login,
    //         meta: {
    //             show: false
    //         }
    //     },
    //     {
    //         path: '/register',
    //         component: Register,
    //         meta: {
    //             show: false
    //         }
    //     },
    //     {
    //         path: '/detail/:skuid',
    //         component: Detail,
    //         meta: {
    //             show: true
    //         }
    //     },

    //     // 重定向，在项目跑起来的时候，当访问/的时候，立马让他定向到首页
    //     {
    //         path: '*',
    //         redirect: '/home'

    //     }

    // ]
});


// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到哪个路由的信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行的函数,写法有几种：
    // next(); 代表直接放行
    // next(path) 如：next('/login')  代表放行到指定的路由
    // next(false) 代表中断当前的导航


    // 用户登录了才会有token，未登录一定不会有token
    // console.log(store.state.user.token);
    let token = store.state.user.token;

    // 用户信息
    let name = store.state.user.userInfo.name;

    if (token) {
        // 用户已经登录了，还想去login,不可以，要使其停留在首页
        // next(false);
        if (to.path == '/login'||to.path=='/register') {
            next('/home')
        } else {
            // 登录了，但是去的不是login或者register,放行
            // next();
            if (name) {
                // 如果已有用户信息，放行
                next();
            } else {
                // 如果没有用户信息，派发action，让仓库存储用户信息之后再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');

                    // 放行
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息，需要重新登录

                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }

            }
        }
    } else {
        // 未登录,暂时没有处理完毕，先这个样子后期再处理
        next();

    }

})



export default router;