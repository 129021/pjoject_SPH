// 当前这个模块对所有的API接口进行统一管理

import requests from './request'

import mockRequests from './mockAjax';


// 三级联动的接口

export const reqCategoryList = () =>requests({url:'/product/getBaseCategoryList'})




// 获取banner（Home首页轮播图接口）
export const reqBannerList=()=>mockRequests.get('/banner')



// 获取floor数据

export const reqFloorList=()=>mockRequests.get('/floor')