// 引入一级路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'

// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';




// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';




// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
// const foo=()=>{
//     return import('@/pages/Home')
// }

// 路由的具体配置信息
export default [{
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {
            show: true
        },
        name: 'search',
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuId',
        component: () => import('@/pages/Detail'),
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',

        name: 'addcartsuccess',

        // name: 'addcartsuccess',

        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            show: true
        }
    },

    {
        path: '/shopcart',
        // name: 'ShopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        // name: 'ShopCart',
        component: () => import('@/pages/Trade'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车页面而来
            if (from.path == "/shopcart") {
                next();
            } else {
                //   从其他的路由组件而来的会停留在当前
                next(false);
            }
        },
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/trade") {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path == "/pay") {
                next()
            } else {
                next(false);
            }
        }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            show: true
        },

        // 二级路由组件
        children: [{
                // 这里的路径要么写全：
                // path:'/center/myorder',
                // 要么不写/
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder'),
            },

            // 重定向
            {
                path: '/center',
                redirect: '/center/myorder',
            }
        ],
    },







    // 重定向，在项目跑起来的时候，当访问/的时候，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'

    }

]