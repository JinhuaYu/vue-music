import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../utils/request.js'

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
      page
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
  async get_music_data ({state, dispatch}, id) {
    if (!state.listJson[id]) {
      await dispatch('get_recommend_data')
      await dispatch('get_banner_data')
      await dispatch('get_other_data')
    }
    let res = state.listJson[id]
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
