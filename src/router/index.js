//配置路由的地方

import Vue from 'vue';
import VueRouter from 'vue-router';

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

let router= new VueRouter({
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
router.beforeEach((to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由的信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行的函数,写法有几种：
    // next(); 代表直接放行

    

})



export default router;