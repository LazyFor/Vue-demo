<template>
    <div>
        <ul>
            <li v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
              <img :src="data.poster" />
                <h4>{{data.name}}</h4>
                <p>观众评分：{{data.grade}}</p>
                <p style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap">主演：{{data.actors | actorFilter}}</p>
                <p>{{data.nation}} | {{data.runtime}}分钟</p>
            </li>
        </ul>
    </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'

Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})

export default {
  data () {
    return {
      datalist: []
    }
  },
  methods: {
    handleClick (id) {
      // console.log(id)
      // location.href = '#/center'
      // 1- 路径
      this.$router.push(`/detail/${id}`)// 编程式导航

      // 2-路由名字
      /* this.$router.push({
        name: 'kiki',
        params: {
          myid: id
        }
      }) */

      // 3- query方式跳转
    //   this.$router.push(`/detail?id=${id}`)
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=136082',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
      // method:"get"
    }).then(res => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style scoped lang="scss">
  li{
    overflow: hidden;
    padding: 10px;
    img{
      float: left;
      width: 100px;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
      margin-top: 10px;
    }
    p{
      color: #797d82;
      font-size: 13px;
      margin: 5px;
    }
  }
</style>
