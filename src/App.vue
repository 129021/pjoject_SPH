<template>
  <div id="app">
   <Header></Header>
   我是根组件
   <Footer></Footer>
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
