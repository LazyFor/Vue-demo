<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="已经到底了" @load="onLoad" :immediate-check="false">
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
              <img :src="data.poster" />
                <h4>{{data.name}}</h4>
                <div>观众评分：<span style="color:orange">{{data.grade}}</span></div>
                <p style="overflow: hidden;text-overflow: ellipsis;white-space:nowrap">主演：{{data.actors | actorFilter}}</p>
                <p>{{data.nation}} | {{data.runtime}}分钟</p>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import { List, Cell } from 'vant'

Vue.use(List).use(Cell)

Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})

export default {
  data () {
    return {
      datalist: [],
      loading: false, // 是否正在加载中,防止多次触发问题
      finished: false,
      current: 1,
      total: 0 // 总数据长度
    }
  },
  methods: {
    onLoad () {
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        this.finished = true
        return
      }
      // console.log('到底了')
      // 1.ajax请求新页面数据，2.合并新数据到老数据，3.this.loading=false
      this.current++
      http({
        url: `/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=136082`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // ES6 合并数据
        this.datalist = [...this.datalist, ...res.data.data.films]

        this.loading = false
      })
    },
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
      this.total = res.data.data.total
    })
  }
}
</script>

<style scoped lang="scss">
  .van-cell{
    overflow: hidden;
    img{
      float: left;
      width: 100px;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
    }
    p{
      color: #797d82;
      font-size: 13px;
    }
  }
</style>
