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
import Footer from "./components/Footer/index.vue"

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
</style>
