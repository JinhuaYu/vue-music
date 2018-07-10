<template>
<div id="recommendList">
  <mu-container>
    <mu-row gutter>
      <mu-col span="6" v-for="(item, index) in json" :key="index">
        <router-link class="coverimg" :to="{name: 'Detail', params: {id: item.sound.id}}">
          <img v-lazy="item.sound.pic_500" alt="" srcset="">
          <span class="fire" v-if="item.sound.is_hot" :class="classFire(item.sound.is_hot)"></span>
          <h4>{{item.sound.name}}</h4>
        </router-link>
        <mu-row class="channel" tag="p">
          <mu-col span="10" tag="span" class="name">{{item.sound.channel.name}}</mu-col>
          <mu-col span="2" tag="span" class="c-aaa">频道</mu-col>
        </mu-row>
      </mu-col>
    </mu-row>
  </mu-container>
</div>
</template>

<script>
export default {
  name: 'recommendList',
  data () {
    return {

    }
  },
  props: {
    json: Array
  },

  methods: {
    classFire (key) {
      switch (key) {
        case 1:
          return 'fire-red'
        case 3:
          return 'fire-yellow'
        case 4:
          return 'fire-blue'
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
#recommendList
  .coverimg
    img
      width 100%
      background #f6f6f6
    h4
      padding 6px 0 2px
      font-weight normal
      font-size toRem(14)
      color #666
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  .channel
    padding-bottom 10px
    span
      font-size toRem(12)
    .name
      color #7dd97f

.fire
  position absolute
  top 15px
  right 18px
  width 22px
  height 22px
  &.fire-red
    display block
    background-position -162px -215px
  &.fire-yellow
    display block
    background-position 0px -215px
  &.fire-blue
    display block
    background-position -299px -215px
</style>
<style>
.fire{
  background-image: url(~@/assets/imgs/echo_mobile_sprites.png);
  background-repeat: no-repeat;
  background-size: 320px;
}
</style>
