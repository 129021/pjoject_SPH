## 1. 登录过后首页用户信息的展示
### 1.1. 当用户注册完成，用户登录
用户携带用户名+密码想服务器发请求（组件派发aciton：userLogin)

登录成功：获取到token，存储于仓库（Vuex）当中，但是Vuex当中的存储是非持久化的
之后路由跳转到Home首页

## 1.2. 在首页当中（mounted）派发action：getUserInfo
派发action获取用户信息，以及动态展示header组件内容

## 1.3. 刷新首页，用户信息获取不到了

因为Vuex是非持久化存储的

所以这里要持久化存储token

## 2. 持久化存储token

- 存在问题1：多个组件展示用户信息需要在每一个组件的mounted中触发action:
```js
  // 获取用户信息在首页进行展示
  this.$store.dispatch('getUserInfo')
```

这种方法很累，不可取

- 存在问题2：用户已经登录了，就应该不再可以回登录页面

## 2. 退出登录
1. 需要发请求，通知服务器退出登录（清除一些数据）
2. 清除项目当中的数据（userInfo,token等）

## 3. 导航守卫

用户已经登录，就不应该还能回login页面

导航：表示路由正在发生改变。进行路由跳转

守卫：看门的

全局守卫：
- 前置全局守卫
- 全局后置钩子
举例子：紫禁城大门守卫全要排查，不管你到紫禁城中的哪个地方


路由独享守卫：
 是相应的路上的守卫

组件内守卫：



## 4. 整个项目，游客（uuid）与用户（token），后台老师以token为大

## 5. 统一登录的账号
13700000000
111111



## 6. 获取交易页面信息

需要先登录，统一登录账号

