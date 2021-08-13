<template>
    <div>
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel()"
        />
        <van-list>
            <van-cell v-for="data in computeCinemaList" :key=data.cinemaId>
                <div>{{data.name}}</div>
                <div class="address">{{data.address}}</div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
import Vue from 'vue'
import { Search, List, Cell } from 'vant'
import { mapActions, mapState } from 'vuex'

Vue.use(Search).use(List).use(Cell)

export default {
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    // console.log(this.$store.state.cinemaList)
    if (this.cinemaList.length === 0) {
      // vue 异步流程
      this.getCinemaList(this.cityId)
    } else {
      console.log('缓存')
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId']),
    computeCinemaList () {
      if (this.value === '') return []
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.includes(this.value))
    }
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    onSearch () {

    },
    onCancel () {
      this.$router.replace('/cinema')
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
</style>
