<template>
<div id="detail" v-if="audio.data">
  <!-- 发布用户 -->
  <mu-row class="sound-user">
    <mu-col span="2" tag='span' class="user-img">
      <img :src="audio.data.sound.user.avatar_50">
    </mu-col>
    <mu-col span="7" tag='span' class="user-name">{{audio.data.sound.user.name}}</mu-col>
    <mu-col span="3" tag='span' class="user-fans"><em>{{audio.data.sound.user.followed_count}}</em> 粉丝</mu-col>
  </mu-row>
  <!-- 播放控制 -->
  <div class="sound-cover">
    <div class="danmu"></div>
    <!-- 进度条 -->
    <div class="progress-bar" @click="getPos()">
      <span :style="{width: this.$store.getters.audio_progress + '%'}"></span>
      <em>{{audio.currentTime | secToDate}} / {{audio.duration | secToDate}}</em>
    </div>
    <!-- 音乐播放 -->
    <div class="controls">
      <mu-row>
        <mu-col span='2' class="pause">
          <span class="playBtn" @click="set_audio_play(!audio.play)">
            <font-awesome-icon :icon="audio.play ? 'pause' : 'play' " />
          </span>
        </mu-col>
        <mu-col span='7' class="info">
          <p class="f14 text-ellipsis">{{audio.data.sound.name}}</p>
          <p class="f12">
            <em class="text-green">{{audio.data.sound.user.name}}</em> 发布在
            <em class="text-green">{{audio.data.sound.channel.name}}</em> 频道
          </p>
        </mu-col>
        <mu-col span='3'></mu-col>
      </mu-row>
    </div>
    <img :src="audio.data.sound.pic_500" alt="">
  </div>
  <!-- 音乐详情 -->
  <mu-container class="sound-info">
    <!--  -->
    <mu-row gutter class="info-bar">
      <mu-col span="4" tag='span'>
        <font-awesome-icon :icon="['far', 'play-circle']" />
        <em>{{audio.data.sound.view_count}}</em> 播放
      </mu-col>
      <mu-col span="4" tag='span'>
        <font-awesome-icon :icon="['far', 'heart']" />
        <em>{{audio.data.sound.like_count}}</em> 喜欢
      </mu-col>
      <mu-col span="4" class="toBell" tag='a'>
        <font-awesome-icon :icon="['far', 'bell']" /> 设为铃声
      </mu-col>
    </mu-row>
    <!-- 歌词 -->
    <div class="info-lyric">
      <div v-if="audio.data.sound.song_info">
        <!-- 歌曲 -->
        <p v-if="audio.data.sound.song_info.name"><em class="c-aaa">{{audio.data.sound.song_info.name.type}}：</em>{{audio.data.sound.song_info.name.name}}</p>
        <!-- 音乐人 -->
        <p v-if="audio.data.sound.song_info.author"><em class="c-aaa">{{audio.data.sound.song_info.author.type}}：</em>{{audio.data.sound.song_info.author.name}}</p>
        <!-- 专辑 -->
        <p v-if="audio.data.sound.song_info.album_name"><em class="c-aaa">{{audio.data.sound.song_info.album_name.type}}：</em>{{audio.data.sound.song_info.album_name.name}}</p>
      </div>
      <!-- 歌词 -->
      <div v-if="audio.data.sound.lyrics" v-html="audio.data.sound.lyrics"></div>
      <div v-else class="nothing">没有相关的歌词T^T~ </div>
    </div>
  </mu-container>

  <!-- 更多 -->
  <div class="sound-more">
    <div class="more-tabs">相关推荐</div>
    <div class="recommends">
      <div class="channel">

      </div>
      <List :json="otherJson" />
    </div>
  </div>
</div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      otherJson: []
    }
  },
  computed: {
    ...mapState(['audio'])
  },

  watch: {
    $route (to, from) {
      // 对路由变化作出响应...
      if (this.$route.path.includes('detail')) {
        this.init()
      }
    }
  },
  methods: {
    ...mapMutations([
      'set_audio_data',
      'set_audio_play',
      'set_audio_currentTime'
    ]),

    ...mapActions([
      'get_music_data',
      'get_other_data'
    ]),
    // 获取音乐详情
    get_sound () {
      this.get_music_data(this.$route.params.id)
        .then(res => {
          if (res) {
            this.set_audio_data(res)
          }
        })
        .catch(err => {
          console.log('get_sound', err)
        })
    },

    // 获取相关推荐
    get_other () {
      this.get_other_data()
        .then(res => {
          this.otherJson = res.data
        })
        .catch(err => {
          console.log('get_other', err)
        })
    },

    // 控制播放进度
    getPos (event) {
      var e = event || window.event
      var precent = (e.offsetX / document.body.offsetWidth).toFixed(2)
      this.audio.ele.currentTime = this.audio.ele.duration * precent
      // console.log({'x': x, 'w': offsetWidth, 'precent': precent, 'val': val})
    },

    // 初始化
    init () {
      this.get_sound()
      this.get_other()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus">
_green = #6ed56c
#detail
  background #f6f6f6
  padding-bottom toRem(60)
  // 发布人部分
  .sound-user
    font-size toRem(12)
    height toRem(50)
    line-height toRem(50)
    padding 0 toRem(8)
    color #666
    .user-img
      img
        width toRem(36)
        height toRem(36)
        border-radius 50%
        vertical-align middle
    .user-fans
      text-align right
      em
        color _green
  // 封面&弹幕&音乐播放
  .sound-cover
    position relative
    height toRem(375)
    img
      width 100%
    // 进度条 / 时间
    .progress-bar
      position absolute
      bottom toRem(55)
      width 100%
      height toRem(14)
      line-height toRem(14)
      background rgba(0,0,0,.2)
      overflow hidden
      span
        position absolute
        top 0
        left 0
        display inline-block
        height 100%
        width 0%
        background rgba(110, 213, 108, .4)
        &::after
          position absolute
          content ' '
          display inline-block
          width toRem(4)
          right toRem(-4)
          height 100%
          background rgba(110, 213, 108, .9)
      em
        font-size toRem(12)
        color #fff
        position absolute
        left toRem(10)
    // 播放音乐
    .controls
      position absolute
      bottom 0
      width 100%
      height toRem(55)
      background rgba(0,0,0, .5)
      padding toRem(7.5) 0
      .pause
        font-size toRem(16)
        text-align center
        .playBtn
          color #fff
          display inline-block
          width toRem(36)
          height toRem(36)
          line-height toRem(38)
          border-radius 50%
          border 1px solid #fff
          margin-top toRem(2)
          svg
            vertical-align 0
            margin-left toRem(1)
      .info
        color #fff
  // 歌曲信息&歌词
  .sound-info
    margin-bottom 10px
    background #fff
    .info-bar
      font-size toRem(12)
      color #a9a9a9
      height toRem(50)
      line-height toRem(50)
      border-bottom 1px solid #e8e8e8
      text-align center
      em
        color #666
      svg
        color #aaa
        font-size toRem(10)
      .toBell
        text-align center
        font-size toRem(13)
        color _green
        svg
          color _green
          font-size toRem(16)
    .info-lyric
      padding 15px 0
      font-size toRem(14)
      white-space pre-wrap

  // 更多
  .sound-more
    background #fff
    .more-tabs
      color _green
      height toRem(50)
      line-height toRem(50)
      text-align center
      font-size toRem(14)
      border-bottom 1px solid #e8e8e8
    .recommends
      margin-top 10px
</style>
