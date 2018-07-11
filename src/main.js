// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import './assets/css/reset.css'

// 第三方库
import MuseUI from 'muse-ui' // Material Design UI 组件库
import 'muse-ui/dist/muse-ui.css' // MuseUI css
import VueProgressBar from 'vue-progressbar' // 加载进度条
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图
import 'swiper/dist/css/swiper.css' // swiper css
import VueLazyload from 'vue-lazyload' // 图片懒加载

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faListUl, faStepForward, faPlay, faPause, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faHeart, faBell, faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// mock数据
import './mock'

// 自定义组件
import Banner from './components/Banner' // 首页banner
import List from './components/List' // 首页列表
import MusicBar from './components/MusicBar' // 音乐播放组件
import Sheet from './components/Sheet' // 播放列表

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload)
Vue.use(VueProgressBar, {
  color: 'rgb(76,175,80)',
  failedColor: 'rgb(228,61,96)',
  height: '2px'
})

Vue.component('Banner', Banner)
Vue.component('List', List)
Vue.component('MusicBar', MusicBar)
Vue.component('Sheet', Sheet)
library.add(
  faPlayCircle, faHeart, faBell, faListUl,
  faPauseCircle, faStepForward, faPlay, faPause,
  faTimes, faEllipsisV
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// 全局过滤器
Vue.filter('secToDate', t => {
  // 秒转换成分秒 00:00
  if (t || t < 1) {
    // Math.floor 返回小于等于x的最大整数
    // Math.round 把数四舍五入为最接近的整数。
    var m = Math.floor(t / 60 % 60)
    var s = Math.floor(t % 60)
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return m + ':' + s
  } else {
    return t
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
