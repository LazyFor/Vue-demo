<template>
    <div>
        detail
    </div>
</template>

<script>
export default {
  mounted () {
    // this.$route 当前匹配的路由对象
    console.log('利用获取的id，Ajax请求后端接口', this.$route.params.myid)

    // console.log(this.$route.query.id)
  }
}
</script>
