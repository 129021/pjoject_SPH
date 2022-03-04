// 这是入口文件


import Vue from 'vue'
import App from './App.vue'

import {
  Button,
  MessageBox
} from 'element-ui';

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'


import Carousel from '@/components/Carousel'


// 引入分页器
import Pagination from '@/components/Pagination';
// 注册全局组件
Vue.component(TypeNav.name, TypeNav)

Vue.component(Carousel.name, Carousel)

Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

// 引入路由
import router from '@/router'



// 引入仓库
import store from '@/store'

// 测试
// import {reqCategoryList} from '@/api'

// reqCategoryList();



// 引入mockServer.js来mock数据
import '@/mock/mockServer';




// 引入Swiper样式
import "swiper/css/swiper.css"











// 测试：
import {
  reqGetSearchInfo
} from '@/api'
// console.log(reqGetSearchInfo({}));
// console.log();



// 统一接收api文件夹里面全部请求函数
import * as API from '@/api'

// console.log(API);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;



    // ElementUI注册组件的时候，还有一种写法：挂载到原型上
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;

  },

  // 注册路由(底下的写法是kV一致省略V，router是小写)
  router,



  // 注册仓库store
  // 注册完成后组件实例的身上会多一个属性：$store
  store,
}).$mount('#app')