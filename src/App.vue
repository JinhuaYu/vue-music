<template>
  <div id="app" :class="{'hasmusic': audio.data}">
    <keep-alive exclude="Detail, MusicBar">
      <router-view/>
    </keep-alive>
    <!-- Music -->
    <MusicBar></MusicBar>
    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['audio'])
  },

  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      // if (to.meta.progress !== undefined) {
      //   let meta = to.meta.progress
      //   // parse meta tags
      //   this.$Progress.parseMeta(meta)
      // }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },

  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  }
}
</script>

<style lang="stylus">
#app
  &.hasmusic
    padding-bottom toRem(50)
.f12
  font-size toRem(12)
.f14
  font-size toRem(14)
.c-aaa
  color #aaa
.text-green
  color _green
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
svg
  font-size toRem(14)
</style>
