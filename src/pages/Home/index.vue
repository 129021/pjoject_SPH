<template>
  <div>
    <!-- 三级联动的全局组件  已经注册为全局组件，不需要再引入了-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
  
    <Brand/>

<!-- 

    <button @click="add">点击我加1</button>
    <span>仓库的数据{{count}}</span>
    <button>点击我减1</button> -->
  </div>
</template>

<script>

// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'


import {mapState} from 'vuex'



export default {
name:'Home',
components:{
  ListContainer,
  Recommend,
  Rank,
  Like,
  Floor,
  Brand,

},
computed:{
  // ...mapState(['count'])

  ...mapState({
    floorList:state=>state.home.floorList
  })
},
methods: {
  // add(){
  //   // 派发action
  //   this.$store.dispatch('add')
  // },
},
mounted() {
  // 派发action，获取floor组件的数据
  this.$store.dispatch('getFloorList');



  // 获取用户信息在首页进行展示
  // this.$store.dispatch('getUserInfo')

},
}
</script>

<style scoped>

</style>