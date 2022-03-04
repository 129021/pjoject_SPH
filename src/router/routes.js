// 引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'

import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';




// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';


// 路由的具体配置信息
export default [{
        path: '/home',
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {
            show: true
        },
        name: 'search',
    },
    {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: '/addcartsuccess',

        name: 'addcartsuccess',

        name: 'addcartsuccess',

        component: AddCartSuccess,
        meta: {
            show: true
        }
    },

    {
        path: '/shopcart',
        // name: 'ShopCart',
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: '/trade',
        // name: 'ShopCart',
        component: Trade,
        meta: {
            show: true
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: '/center',
        component: Center,
        meta: {
            show: true
        },

        // 二级路由组件
        children: [{
                // 这里的路径要么写全：
                // path:'/center/myorder',
                // 要么不写/
                path: 'myorder',
                component: myOrder,
            },
            {
                path: 'grouporder',
                component: groupOrder,
            },

            // 重定向
            {
                path:'/center',
                redirect:'/center/myorder',
            }
        ],
    },







    // 重定向，在项目跑起来的时候，当访问/的时候，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'

    }

]