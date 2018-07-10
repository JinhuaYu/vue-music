<template>
<div class="sheet">
  <mu-bottom-sheet class='playSheet' :open.sync="open" overlayColor='#000' :overlayOpacity="0.4">

    <mu-sub-header class="head">
      播放列表
      <span class="f12">({{playList.length}}首)</span>
      <mu-button icon class="btn-playMode">
        <font-awesome-icon icon="ellipsis-v"></font-awesome-icon>
      </mu-button>
    </mu-sub-header>

    <mu-list v-if="playList.length > 0" class="playlist">
      <!-- item -->
      <mu-list-item button
        v-for="(item, index) in playList"
        :key="index"
        :class="{active: item.sound.id === audio.data.sound.id}"
        @click.stop="set_audio_data(item)"
      >
        <mu-list-item-action v-if="item.sound.id === audio.data.sound.id" class="iconaction">
          <font-awesome-icon :icon="['far', 'play-circle']"></font-awesome-icon>
        </mu-list-item-action>
        <mu-list-item-title>{{item.sound.name}}</mu-list-item-title>
        <mu-list-item-action class="btn-delete" @click.stop="deleteOne(index)">
          <mu-button icon>
            <font-awesome-icon icon="times"></font-awesome-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item><!-- item end -->
    </mu-list>
    <div v-else class="nothing">
      什么都没有了 T^T
    </div>

  </mu-bottom-sheet>
</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      open: false // 是否打开sheet 默认：false
    }
  },
  computed: {
    ...mapState([
      'audio',
      'playList'
    ])
  },
  methods: {
    ...mapMutations([
      'set_audio_data',
      'set_playList'
    ]),
    openSheet () {
      this.open = !this.open
    },

    // 从列表中删除歌曲
    deleteOne (index) {
      this.playList.splice(index, 1)
      this.set_playList(this.playList)
    }
  }
}
</script>

<style lang='stylus'>
sheet_height = toRem(250)
sheet_hd_height = toRem(48)
sheet_list_height = sheet_height - sheet_hd_height
.playSheet
  max-height sheet_height
  bottom toRem(50)
  box-shadow 0 -2px 8px rgba(0, 0, 0, .15)
  .head
    position relative
    border-bottom 1px solid #e8e8e8
    .btn-playMode
      position absolute
      width toRem(48)
      height toRem(48)
      right 0
      font-size toRem(14)
  .playlist
    max-height sheet_list_height
    li
      .mu-item
        color #999
        .mu-item-title
          font-size toRem(14)
        svg
          font-size toRem(14)
          color #999
        .iconaction
          min-width 24px
        .btn-delete
          svg
            color #999

    li.active
      .mu-item
        color _green
        svg
          color _green
</style>
