// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'

import ShopCart from '@/pages/ShopCart'

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

        name:'addcartsuccess',

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


    // 重定向，在项目跑起来的时候，当访问/的时候，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'

    }

]