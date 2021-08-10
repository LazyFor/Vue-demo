<template>
    <div>
        Nowplaying
        <ul>
            <li v-for="data in datalist" :key="data.id" @click="handleClick(data.id)">
                {{data.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      datalist: [
        {
          id: 1,
          title: '冰河时代'
        },
        {
          id: 2,
          title: '机器人总动员'
        },
        {
          id: 3,
          title: '爱宠大机密'
        }
      ]
    }
  },
  methods: {
    handleClick (id) {
      console.log(id)
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
  }
}
</script>
