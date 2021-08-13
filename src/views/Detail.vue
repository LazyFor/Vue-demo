<template>
    <div v-if="filminfo">
      <detail-header v-top :title="filminfo.name"></detail-header>
        <div :style="{backgroundImage:'url('+filminfo.poster+')'}" style="height:230px;background-size:cover;background-position:center"></div>

        <h3>{{filminfo.name}}{{filminfo.filmType.name}}</h3>
        <div class="fontstyle">
          {{filminfo.category}}
        </div>
        <div class="fontstyle">
          {{filminfo.premiereAt | dataFilter}}上映
        </div>
        <div class="fontstyle">
          {{filminfo.nation}}|{{filminfo.runtime}}
        </div>
        <div class="fontstyle" :class="isShow?'':'synopsis'">{{filminfo.synopsis}}</div>
        <div style="text-align:center"><i class="iconfont" :class="isShow?'icon-less':'icon-moreunfold'" @click="isShow=!isShow"></i></div>

        <h3>演职人员</h3>
        <detail-swiper :perslide="4" swiperclass="swiper-actors">
            <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
              <div :style="{backgroundImage:'url('+data.avatarAddress+')'}" style="height:102px;background-size:cover;background-position:center"></div>
              <div style="text-align:center">
                <div style="font-size:12px">{{data.name}}</div>
                <div class="fontstyle">{{data.role}}</div>
              </div>
            </div>
        </detail-swiper>

        <h3>剧照</h3>
        <detail-swiper :perslide="2" swiperclass="swiper-photos">
            <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index" @click="handlePreview(index)">
              <div :style="{backgroundImage:'url('+data+')'}" style="height:100px;background-size:cover;background-position:center"></div>
            </div>
        </detail-swiper>
    </div>
</template>

<script>
import http from '@/util/http' // 别名 @ ==> src的绝对路径
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper.vue'
import detailHeader from './detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
import { mapMutations } from 'vuex'

Vue.filter('dataFilter', (date) => {
  // 日期处理函数 - moment
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      // console.log(document.documentElement.scrollTop)
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 10) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})

export default {
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  methods: {
    ...mapMutations('TabbarModule', ['show', 'hide']),
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  mounted () {
    // 隐藏底部导航栏
    // this.$store.commit("hide")
    this.hide()

    // this.$route 当前匹配的路由对象
    // console.log('利用获取的id，Ajax请求后端接口', this.$route.params.myid)

    // console.log(this.$route.query.id)
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=298657`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filminfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // 显示底部导航栏
    // this.$store.commit("show")
    this.show()
  },
  components: {
    detailSwiper, detailHeader
  }
}
</script>

<style scoped>
 h3{
      font-weight: normal;
      font-size: 18px;
      margin: 0 7px 0 0;
    }
  .fontstyle{
    color: #797d82;
    font-size: 13px;
    margin: 5px;
  }
  .synopsis{
    height: 37px;
    overflow: hidden;
  }

</style>
