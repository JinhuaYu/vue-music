<template>
  <div id="musicBar" v-if="audio_data">

    <!-- sound -->
    <div class="sound">
      <audio id="audio" autoplay :src="audio_data.sound.source"></audio>
      <mu-container>
        <mu-row gutter>
          <mu-col span='2' class="sound-img">
            <router-link :to="{name: 'Detail', params: {id: audio_data.sound.id}}">
              <img class="img" :src="audio_data.sound.pic_100" alt="">
            </router-link>
          </mu-col>
          <mu-col span='5' class="sound-info">
            <p>{{audio_data.sound.name}}</p>
            <p>{{audio_data.sound.user.name}}</p>
          </mu-col>
          <mu-col span='5'>
            <mu-row class="control">
              <!-- 列表按钮 -->
              <mu-col span='4' tag='span'>
                <mu-button icon @click.stop="$refs.sheet.openSheet()">
                  <font-awesome-icon icon="list-ul" />
                </mu-button>
              </mu-col>
              <!-- 播放按钮 -->
              <mu-col span='4' tag='span'>
                <mu-button icon @click.stop="set_audio_play(!audio_play)">
                  <font-awesome-icon :icon="audio_play ? 'pause' : 'play'" />
                </mu-button>
              </mu-col>
              <!-- 下一首按钮 -->
              <mu-col span='4' tag='span'>
                <mu-button icon @click.stop="nextSound()">
                  <font-awesome-icon icon="step-forward" />
                </mu-button>
              </mu-col>
            </mu-row>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <mu-flex>
        <mu-linear-progress mode="determinate" :size="2" color="green" :value="$store.getters.audio_progress"/>
      </mu-flex>
    </div>

    <!-- 播放列表 -->
    <Sheet ref="sheet"></Sheet>

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
      'audio',
      'playMode',
      'playList'
    ]),
    ...mapState({
      audio_data: state => state.audio.data,
      audio_play: state => state.audio.play
    })
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
      'set_audio_data',
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
    },

    // 下一首歌
    nextSound () {
      // 查找当前歌曲在playLis的currentIndex
      // findIndex()函数也是查找目标元素，找到就返回元素的位置，找不到就返回-1
      let currentIndex = this.playList.findIndex((n) => n.sound.id === this.audio.data.sound.id)
      // currentIndex是结尾的话？ 返回0 ， 否则 +1
      if (currentIndex > -1) { // 存在数组
        let nextIndex
        currentIndex === this.playList.length - 1 ? nextIndex = 0 : nextIndex = currentIndex + 1
        if (this.playList[nextIndex].sound.id === this.audio.data.sound.id) {
          this.audio.ele.load()
          this.audio.ele.play()
        } else {
          this.set_audio_data(this.playList[nextIndex])
        }
      } else {
        // 正常逻辑不会来到这里
        console.warn('Playlist is empty')
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
  z-index 20180706
  background #fff
  height toRem(50)
  &:before
    content ' '
    position absolute
    top 0
    height 1px
    width 100%
    background #e6e6e6
    display inline-block
  .sound
    .sound-img
      padding-right 0
      padding-top toRem(6)
      img
        width toRem(36)
        height toRem(36)
    .sound-info
      padding-left 0
      margin-left -8px
      padding-top toRem(7)
      p
        font-size toRem(12)
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .control
      .col
        text-align center
        color #666
        svg
          font-size toRem(16)
  .progress-bar
    position absolute
    bottom 0
    left  0
    width 100%
    height toRem(2)
    z-index 10001
</style>
