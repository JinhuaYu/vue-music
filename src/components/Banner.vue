<template>
  <div id="banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in json" :key="index">
        <router-link :to="{name: 'Detail', params: {id: item.sound.id}}">
          <img v-lazy="item.sound.pic_640" alt="">
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true,
        autoplayDisableOnInteraction: false
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
_height = toRem(144)
#banner
  width 100%
  padding 10px
  background-color #e8e8e8
  .swiper-container
    height _height
    img
      width 100%
      height auto
    .swiper-pagination
      bottom  toRem(5)

</style>
