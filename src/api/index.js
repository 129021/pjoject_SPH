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