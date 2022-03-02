## 1. 分页功能实现
为什么很多项目采用分页功能：比如电商平台同时展示的数据有很多（1w+）,采用分页功能
ElementUI有相应的分页组件，使用起来超级简单，但是前台组件目前不用（希望可以掌握自定义分页功能）

## 2. 分页器展示，需要哪些数据（条件）

- 当前是第几页：pageNo字段代表当前页数
- 每一页需要展示多少条数据：pageSize字段进行代表
- 整个分页器一共有多少条数据：total字段进行代表
- 分页器连续页码的个数：continues一般是5个或者7个（因为对称）


总结：对于分页器而言，自定义前提需要知道四个前提条件



## 3. 自定义分页器调试
自定义分页器在开发的时候先自己传递假的数据进行调试，直到调试成功以后再用服务器的数据


## 4. 连续页码起始和结束的数字
对于分页器而言，很重要的一个地方即为算出连续页码起始数字和结束数字

当前是第8页:
6 7 8 9 10

## 5. 分页器的动态展示
分页器分为上中下三部分结构

中间部分：
v-for:可以遍历数字、数组、字符串、对象

## 6. 开发详情页面
基本步骤：
1. 静态组件（详情页组件还没有注册为路由组件）
2. 发请求
3. Vuex
4. 动态展示组件


### 6.1. 静态组件
在点击图片的时候，跳转到详情页面，在路由跳转的时候需要带上产品的ID给详情页面


当跳转到详情页面的时候，要使滚动条滚动到页面最顶部，使用vue-router的滚动行为可以解决：
```js
const router = createRouter({
//   history: createWebHashHistory(),
//   routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
具体内容见vue-router文档

### 6.2. 发请求
```js
export const reqGoodsInfo = (skuId) => requests({
    url: `item/${skuId}`,
    method: 'get',

})
```
### 6.3. Vuex
Detail是一个新的组件
Vuex需要新增一个新的仓库：detail

```js
const state={};
const mutations={};
const actions={};
const getters={};

export default {
    state,
    mutations,
    actions,
    getters,
}
```

小仓库需要在大仓库中进行合并

