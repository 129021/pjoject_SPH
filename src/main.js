import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/pages/Home/TypeNav'
// 注册全局组件
Vue.component(TypeNav.name,TypeNav)

// 引入路由
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  // 注册路由(底下的写法是kV一致省略V，router是小写)
  router
}).$mount('#app')
