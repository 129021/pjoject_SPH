// 当前这个模块对所有的API接口进行统一管理

import requests from './request'

import mockRequests from './mockAjax';


// 三级联动的接口

export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList'
})




// 获取banner（Home首页轮播图接口）
export const reqBannerList = () => mockRequests.get('/banner')



// 获取floor数据

export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据  地址：/api/list    方式：post
// 需要带参数：
// category1Id
// category2Id
// category3Id
// categoryName
// keyword
// props
// trademark
// order
// pageNo
// pageSize

// 当前这个接口，给服务器传递参数params,至少是一个空对象
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认的参数，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params,
})


// 获取产品详情页面信息的接口


// URL:/api/item/{ skuId }
// 请求方式：get
// 参数：skuId（必须带）

export const reqGoodsInfo = (skuId) => requests({
    url: `item/${skuId}`,
    method: 'get',

})




// 将产品添加到购物车中（或者更新某一个产品的个数）
// URL:   /api/cart/addToCart/{ skuId }/{ skuNum }
// 请求方式：post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',

})




// 获取购物车列表数据接口
// URL:/api/cart/cartList
// 请求方式：get
// 参数：无

export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get',

})



// 删除购物产品的接口
// /api/cart/deleteCart/{skuId}
// 请求方式：delete
// 参数：skuId

export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",

})



// 修改商品选中的状态
// URL:/api/cart/checkCart/{skuId}/{isChecked}

export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
})



// 获取验证码
// URL:/api/user/passport/sendCode/{phone}
// 请求方式：get

export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
})



// 用户注册
// URL:/api/user/passport/register
// 请求方式：post
// 参数：全为必选
// phone
// password
// code

export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post',
})




// 用户登录
// URL:/api/user/passport/login
// 请求方式：post
// 参数：全选
// phone
// password

export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    data,
    method:'post',
})



// 获取用户信息（需要带着用户的token向服务器要用户信息）
// URL:/api/user/passport/auth/getUserInfo
// 请求方式：get
export const reqUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get',
})





// 退出登录
// URL:/api/user/passport/logout
// 请求方式：get

export const reqLogout=()=>requests({
    url:'/user/passport/logout',
    method:'get',

    
})




// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList
// 请求方式：get
export const reqAddressInfo=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get',
})



// 获取订单交易页信息
// URL:/api/order/auth/trade
// 请求方式：get
export const reqOrderInfo=()=>requests({
    url:'/order/auth/trade',
    method:'get',
})