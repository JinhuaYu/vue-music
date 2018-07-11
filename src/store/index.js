import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../utils/request.js'
import cache from '../utils/cache.js'

Vue.use(Vuex)

const state = {
  audio: {
    ele: null, // audio元素
    data: null, // audio音乐数据
    play: false, // audio播放状态
    currentTime: 0, // audio当前播放位置
    duration: 0 // audio音频长度
  },
  playMode: 'default', // 播放模式
  playList: [], // 播放列表
  listJson: {} // 数据存放
}

const getters = {
  // 播放进度百分比
  audio_progress: state => {
    return parseFloat((state.audio.currentTime / state.audio.duration * 100).toFixed(2))
  }
}

const mutations = {
  // 设置所有数据
  set_listJson (state, val) {
    state.listJson = val
    cache.setSession('listJson', val)
  },

  // 设置音乐元素
  set_audio_ele (state, val) {
    state.audio.ele = val
  },

  // 设置音乐媒体数据
  set_audio_data (state, data) {
    state.audio.data = data
  },

  // 设置播放状态
  set_audio_play (state, status) {
    state.audio.play = status
  },

  // 设置audio当前播放位置
  set_audio_currentTime (state, val) {
    state.audio.currentTime = val
  },
  // 设置audio音频长度
  set_audio_duration (state, val) {
    state.audio.duration = val
  },

  // 设置播放列表
  set_playList (state, val) {
    state.playList = val.slice()
    cache.setSession('playList', val)
  },

  // 获取应用缓存
  set_app_cache (state) {
    let listJson = JSON.parse(cache.getSession('listJson'))
    let playList = JSON.parse(cache.getSession('playList'))
    if (listJson) {
      state.listJson = listJson
    }
    if (playList) {
      state.playList = playList
    }
  }

}

const actions = {
  // 获取banner数据
  async get_banner_data ({dispatch}) {
    let res = await request('GET', 'banner')
    dispatch('pushToList', res)
    return res
  },

  // 获取推荐数据
  async get_recommend_data ({dispatch}, page = 1) {
    let params = {
      page // es6简写赋值的方法
    }
    let res = await request('GET', 'recommend', params)
    dispatch('pushToList', res)
    return res
  },

  // 获取相关推荐
  async get_other_data ({dispatch}) {
    let res = await request('GET', 'other')
    dispatch('pushToList', res)
    return res
  },

  // 获取音乐数据
  // 此处数据是从listJson里获取对应id的sound数据， 真实获取数据是直接发送ajax请求就可以了
  async get_music_data ({state, commit, dispatch}, id) {
    if (!state.listJson[id]) {
      await dispatch('get_recommend_data')
      await dispatch('get_banner_data')
      await dispatch('get_other_data')
    }
    let res = state.listJson[id]
    // 设置playList
    let isHas = false
    // 找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
    if (state.playList.find((n) => n.sound.id === id)) {
      isHas = true
    }
    if (!isHas) {
      state.playList.unshift(res) // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
      commit('set_playList', state.playList)
    }
    return res
  },

  // 数组转换成以id为属性的对象，方便调试 vue-devtools
  pushToList ({state, commit}, res) {
    if (res.data) {
      let list = {}
      res.data.forEach(item => {
        list[item.sound.id] = item
      })
      list = { ...state.listJson, ...list } // es6 拼接
      commit('set_listJson', list)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
