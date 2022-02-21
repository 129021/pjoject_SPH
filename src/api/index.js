// 当前这个模块对所有的API接口进行统一管理

import requests from './request'


// 三级联动的接口

export const reqCategoryList = () =>requests({url:'/product/getBaseCategoryList'})
