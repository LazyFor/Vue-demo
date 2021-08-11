<template>
  <div>
    <tabbar></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
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
  },
  mounted () {
    // 1-后端配置好 cors,没有跨域限制
    // axios.get('').then(res=>{console.log(res.data)})

    // 2-maoyan 反向代理跨域问题
    // axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=D1AF33E0FA5011EBAC4917E38CAEDD9DD3F03A866CFA44FAB2161B074D62CD38&optimus_risk_level=71&optimus_code=10').then(res => (console.log(res.data)))
  }
  // 3- maizuo 有跨域限制而且配置header验证
  // axios({
  //   url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=136082',
  //   headers: {
  //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596502176387264316178433","bc":"310100"}',
  //     'X-Host': 'mall.film-ticket.film.list'
  //   }
  //   // method:"get"
  // }).then(res => {
  //   console.log(res.data)
  // })
}
</script>

<style>
 li{
    list-style: none;
  }
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    /* height: 100%; */
    width: 100%;
  }
  section{
    margin-bottom: 50px;
  }
</style>
