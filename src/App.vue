<template>
  <div>
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
// ES6 模块导出
export default {
  data () {
    return {
    }
  },
  components: { tabbar },
  methods: {
  }
}
</script>

<style>
  ul{
    list-style: none;
  }
</style>
