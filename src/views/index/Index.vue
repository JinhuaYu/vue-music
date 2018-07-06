<template>
  <div id="index">
    <!-- Banner -->
    <Banner :json="bannerJson"></Banner>
    <!-- 每日推荐 -->
    <div class="recommend">
      <h3 class="recommend-tt">echo每日推荐</h3>
      <!-- 列表 -->
      <mu-load-more :loading="loading" @load="loadMore" :loaded-all="loadAll">
        <List :json="recommendJson"></List>
        <div v-if="loadAll" class="nothing">没有数据了T^T</div>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      bannerJson: [],
      recommendJson: [],
      page: 1,
      loading: false,
      loadingText: '',
      loadAll: false
    }
  },
  /*
  计算属性将被混入到 Vue 实例中。
  所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
  */
  computed: {

  },
  // methods
  methods: {
    ...mapActions([
      'get_banner_data',
      'get_recommend_data'
    ]),
    // 获取banner数据
    get_banner () {
      // debugger
      this.get_banner_data()
        .then(res => {
          if (res.data) {
            this.bannerJson = res.data
          }
        })
        .catch(err => {
          console.log('get_banner', err)
        })
    },

    // 获取commend数据
    get_recommend () {
      this.get_recommend_data(this.page)
        .then(res => {
          if (res.data) {
            this.recommendJson = res.data
            console.log(this.recommendJson)
            this.page = 2
          }
        })
        .catch(err => {
          console.log('get_recommend', err)
        })
    },

    // 向下加载数据
    getMore_recommend () {
      this.loading = true
      this.get_recommend_data(this.page)
        .then(res => {
          if (res.data) {
            this.loading = false
            this.recommendJson.push(...res.data) // 把新数据拼接到数组
            this.page++ // 模拟翻页
          } else {
            this.loading = false // 加载完毕
            this.loadAll = true // 数据已全部加载
          }
        })
        .catch(err => {
          console.log('get_recommend', err)
        })
    },

    loadMore () {
      this.getMore_recommend()
    }

  },

  mounted () {
    this.get_banner() // 获取banner
    this.get_recommend()
  }
}
</script>

<style lang="stylus">
.recommend-tt
  font-size 12px
  font-weight 400
  text-align center
  width toRem(130)
  height toRem(26)
  line-height toRem(26)
  border-radius toRem(26)
  margin 10px auto
  color #639e5e
  background-color #d6ffd6
</style>
