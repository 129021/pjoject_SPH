<template>
  <div id="app">
    <Header></Header>

    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <!-- Footer组件在Home和Search是显示的，在Login和Register是隐藏的 -->

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 根组件的mounted只会执行一次
    // console.log('我是根组件');

    //通知Vuex发请求，获取数据，存储于仓库当中

    // 派发一个action,获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped>
</style>
