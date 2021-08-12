<template>
    <van-index-bar :index-list="computedCityList" highlight-color="pink" @select="handleSelect">
        <div v-for="data in cityList" :key="data.type">
            <van-index-anchor :index="data.type" />
            <van-cell :title="item.name"  v-for="(item,index) in data.list" :key="index" @click="handleChangePage(item.name)" />
        </div>
    </van-index-bar>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '@/util/http'

Vue.use(IndexBar).use(Cell)
Vue.use(IndexAnchor)
export default {
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedCityList () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: '/gateway?k=4499040',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)

      this.cityList = this.handleCityData(res.data.data.cities)
    })
  },
  methods: {
    handleCityData (cities) {
      // 输入原始数据，输出目标数据
      // console.log(cities)

      const letterArr = []
      const newCities = []
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code))
      }
      letterArr.forEach((letter) => {
        const list = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        // console.log(list)
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list
          })
        }
      })
      // console.log(newCities)
      return newCities
    },
    handleSelect (index) {
      // console.log(index)
      Toast(index)
    },
    handleChangePage (name) {
      this.$store.state.cityName = name
      this.$router.back()
    }
  }
}
</script>
