<template>
  <div id="musicBar" v-if="audio_data">
    <div class="sound">
      <audio id="audio" autoplay :src="audio_data.sound.source"></audio>
      <mu-container>
        <mu-row gutter>
          <mu-col span='2'>
            <router-link :to="{name: 'Detail', params: {id: audio_data.sound.id}}">
              <img class="img" :src="audio_data.sound.pic_100" alt="">
            </router-link>
          </mu-col>
          <mu-col span='5' class="info">
            <p>{{audio_data.sound.song_info.name.name}}</p>
            <p>{{audio_data.sound.user.name}}</p>
          </mu-col>
          <mu-col span='5'>
            <mu-row class="control">
              <mu-col span='4' tag='span'>
                <font-awesome-icon icon="list-ul" />
              </mu-col>
              <mu-col span='4' tag='span' @click.stop="set_audio_play(!audio_play)">
                <!-- <font-awesome-icon v-if="audio.play" :icon="['far', 'pause-circle']" /> -->
                <!-- <font-awesome-icon v-else :icon="['far', 'play-circle']" /> -->
                <font-awesome-icon :icon="audio_play ? 'pause' : 'play'" />
              </mu-col>
              <mu-col span='4' tag='span'>
                <font-awesome-icon icon="step-forward" />
              </mu-col>
            </mu-row>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
    <!-- 进度条 -->
    <mu-flex>
      <mu-linear-progress mode="determinate" :size="2" color="green"
        :value="$store.getters.audio_progress"
      />
    </mu-flex>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MusicBar',
  data () {
    return {
    }
  },
  // 计算属性
  computed: {
    // mapState辅助函数
    ...mapState([
      'audio'
    ]),
    ...mapState({
      audio_data: state => state.audio.data,
      audio_play: state => state.audio.play
    })
  },
  created () {
    console.log(this)
  },
  // 侦听器
  watch: {
    // 如果 `audio_data` 数据发生改变，这个函数就会运行
    audio_data (val) {
      if (val) {
        this.$nextTick(() => {
          this.audio_init()
        })
      }
    },
    audio_play (val) {
      val ? this.audio.ele.play() : this.audio.ele.pause()
    }
  },
  // 自定义方法
  methods: {
    // mapMutations辅助函数
    ...mapMutations([
      'set_audio_ele',
      'set_audio_play',
      'set_audio_duration',
      'set_audio_currentTime'
    ]),

    // 初始化
    audio_init () {
      console.log('init')

      let _audio = this.$el.querySelector('#audio')
      this.set_audio_ele(_audio) // 设置音乐元素

      // 当浏览器可以播放音频/视频时
      _audio.oncanplay = () => {
        _audio.play()
        this.set_audio_duration(_audio.duration)
      }
      // 当目前的播放位置已更改时
      // 可以使用 ~~ 转换整数
      _audio.ontimeupdate = () => {
        this.set_audio_currentTime(_audio.currentTime)
      }
      // 播放
      _audio.onplay = () => {
        this.set_audio_play(true)
      }
      // 暂停
      _audio.onpause = () => {
        this.set_audio_play(false)
      }
      // 结束
      _audio.onended = () => {
        this.set_audio_play(false)
      }
    }

  }

}
</script>

<style lang="stylus">
// 播放控件
#musicBar
  width 100%
  position fixed
  bottom 0
  background rgba(255,255,255, .95)
  box-shadow 0 -2px 8px rgba(0,0,0,.15)
  height toRem(50)
  .sound
    padding toRem(6) 0
    img
      width toRem(36)
      height toRem(36)
    .info
      padding-left 0
      p
        font-size toRem(12)
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .control
      .col
        text-align center
        color #666
        font-size toRem(14)
        height toRem(36)
        line-height toRem(36)

</style>
