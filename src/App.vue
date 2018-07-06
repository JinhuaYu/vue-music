<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- Music -->
    <MusicBar></MusicBar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
  .f12
    font-size toRem(12)
  .f14
    font-size toRem(14)
  .c-aaa
    color #aaa
  .text-green
    color #6ed56c
  .text-ellipsis
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  .nothing
    width 100%
    height 50px
    line-height 50px
    font-size 14px
    color #999
    text-align center
</style>
