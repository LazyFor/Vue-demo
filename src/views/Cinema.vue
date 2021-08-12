<template>
    <div>
        <van-nav-bar title="标题" @click-left="handleLeft()" @click-right="handleRight()">
            <template #left>
                {{$store.state.cityName}}<van-icon name="arrow-down" size="6"  color="#2c3e50"/>
            </template>
            <template #right>
                <van-icon name="search" size="18" color="#2c3e50"/>
            </template>
        </van-nav-bar>
        <div class="cinema" :style="{height:height}">
            <ul>
                <li v-for="data in cinemaList" :key=data.cinemaId>
                    <div>{{data.name}}</div>
                    <div class="address">{{data.address}}</div>

                </li>
            </ul>
    </div>
    </div>
</template>

<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { NavBar, Icon } from 'vant'

Vue.use(NavBar).use(Icon)
export default {
  data () {
    return {
      cinemaList: [],
      height: 0
    }
  },
  mounted () {
    //
    this.height = document.documentElement.clientHeight - 100 + 'px'
    http({
      url: '/gateway?cityId=110100&ticketFlag=1&k=9231963',
      headers: { 'X-Host': 'mall.film-ticket.cinema.list' }
    }).then(res => {
    //   console.log(res.data)
      this.cinemaList = res.data.data.cinemas

      // 状态立即更改，但是dom异步渲染
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
  },
  methods: {
    handleLeft () {
      this.$router.push('/city')
    }
  }
}
</script>

<style scoped lang="scss">
    li{
        padding: 5px;
        .address{
            font-size: 12px;
            color: #797d82;
        }
    }
    .cinema{
        overflow: hidden;
        position: relative;// 修正滚动条的位置
    }
</style>
