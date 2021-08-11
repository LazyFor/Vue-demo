<template>
    <div>
        <film-swiper>
            <div class="swiper-slide" v-for="(data,index) in imgList" :key="index">
                <div :style="{backgroundImage:'url('+data+')'}" style="height:200px;background-size:cover"></div>
            </div>
        </film-swiper>
        <film-header style="position:sticky;top:0;background:white;"></film-header>

        <router-view></router-view>
    </div>
</template>

<script>

import filmHeader from './film/FilmHeader.vue'
import filmSwiper from './film/FilmSwiper.vue'
export default {
  data () {
    return {
      imgList: []
    }
  },
  components: {
    filmHeader,
    filmSwiper
  }
}
</script>

<style scoped lang="scss">
    // .swiper-wrapper{
    //     img{
    //         width: 100%;
    //     }
    // }
</style>
