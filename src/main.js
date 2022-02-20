import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),

  // 注册路由(底下的写法是kV一致省略V，router是小写)
  router
}).$mount('#app')
