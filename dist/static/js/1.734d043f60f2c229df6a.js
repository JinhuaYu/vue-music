webpackJsonp([1],{L69B:function(a,t){},VeAG:function(a,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("4YfN"),n=s.n(o),i=s("9rMa"),e={name:"Detail",data:function(){return{otherJson:[]}},computed:n()({},Object(i.d)(["audio"])),watch:{$route:function(a,t){this.$route.path.includes("detail")&&this.init()}},methods:n()({},Object(i.c)(["set_audio_data","set_audio_play","set_audio_currentTime"]),Object(i.b)(["get_music_data","get_other_data"]),{get_sound:function(){var a=this;this.get_music_data(this.$route.params.id).then(function(t){t&&a.set_audio_data(t)}).catch(function(a){console.log("get_sound",a)})},get_other:function(){var a=this;this.get_other_data().then(function(t){a.otherJson=t.data}).catch(function(a){console.log("get_other",a)})},getPos:function(a){var t=((a||window.event).offsetX/document.body.offsetWidth).toFixed(2);this.audio.ele.currentTime=this.audio.ele.duration*t},init:function(){this.get_sound(),this.get_other()}}),mounted:function(){this.init()}},u={render:function(){var a=this,t=a.$createElement,s=a._self._c||t;return a.audio.data?s("div",{attrs:{id:"detail"}},[s("mu-row",{staticClass:"sound-user"},[s("mu-col",{staticClass:"user-img",attrs:{span:"2",tag:"span"}},[s("img",{attrs:{src:a.audio.data.sound.user.avatar_50}})]),a._v(" "),s("mu-col",{staticClass:"user-name",attrs:{span:"7",tag:"span"}},[a._v(a._s(a.audio.data.sound.user.name))]),a._v(" "),s("mu-col",{staticClass:"user-fans",attrs:{span:"3",tag:"span"}},[s("em",[a._v(a._s(a.audio.data.sound.user.followed_count))]),a._v(" 粉丝")])],1),a._v(" "),s("div",{staticClass:"sound-cover"},[s("div",{staticClass:"danmu"}),a._v(" "),s("div",{staticClass:"progress-bar",on:{click:function(t){a.getPos()}}},[s("span",{style:{width:this.$store.getters.audio_progress+"%"}}),a._v(" "),s("em",[a._v(a._s(a._f("secToDate")(a.audio.currentTime))+" / "+a._s(a._f("secToDate")(a.audio.duration)))])]),a._v(" "),s("div",{staticClass:"controls"},[s("mu-row",[s("mu-col",{staticClass:"pause",attrs:{span:"2"}},[s("span",{staticClass:"playBtn",on:{click:function(t){a.set_audio_play(!a.audio.play)}}},[s("font-awesome-icon",{attrs:{icon:a.audio.play?"pause":"play"}})],1)]),a._v(" "),s("mu-col",{staticClass:"info",attrs:{span:"7"}},[s("p",{staticClass:"f14 text-ellipsis"},[a._v(a._s(a.audio.data.sound.name))]),a._v(" "),s("p",{staticClass:"f12 text-ellipsis"},[s("em",{staticClass:"text-green"},[a._v(a._s(a.audio.data.sound.user.name))]),a._v(" 发布在\n            "),s("em",{staticClass:"text-green"},[a._v(a._s(a.audio.data.sound.channel.name))]),a._v(" 频道\n          ")])]),a._v(" "),s("mu-col",{attrs:{span:"3"}})],1)],1),a._v(" "),s("img",{attrs:{src:a.audio.data.sound.pic_500,alt:""}})]),a._v(" "),s("mu-container",{staticClass:"sound-info"},[s("mu-row",{staticClass:"info-bar",attrs:{gutter:""}},[s("mu-col",{attrs:{span:"4",tag:"span"}},[s("font-awesome-icon",{attrs:{icon:["far","play-circle"]}}),a._v(" "),s("em",[a._v(a._s(a.audio.data.sound.view_count))]),a._v(" 播放\n      ")],1),a._v(" "),s("mu-col",{attrs:{span:"4",tag:"span"}},[s("font-awesome-icon",{attrs:{icon:["far","heart"]}}),a._v(" "),s("em",[a._v(a._s(a.audio.data.sound.like_count))]),a._v(" 喜欢\n      ")],1),a._v(" "),s("mu-col",{staticClass:"toBell",attrs:{span:"4",tag:"a"}},[s("font-awesome-icon",{attrs:{icon:["far","bell"]}}),a._v(" 设为铃声\n      ")],1)],1),a._v(" "),s("div",{staticClass:"info-lyric"},[a.audio.data.sound.song_info?s("div",[a.audio.data.sound.song_info.name?s("p",[s("em",{staticClass:"c-aaa"},[a._v(a._s(a.audio.data.sound.song_info.name.type)+"：")]),a._v(a._s(a.audio.data.sound.song_info.name.name))]):a._e(),a._v(" "),a.audio.data.sound.song_info.author?s("p",[s("em",{staticClass:"c-aaa"},[a._v(a._s(a.audio.data.sound.song_info.author.type)+"：")]),a._v(a._s(a.audio.data.sound.song_info.author.name))]):a._e(),a._v(" "),a.audio.data.sound.song_info.album_name?s("p",[s("em",{staticClass:"c-aaa"},[a._v(a._s(a.audio.data.sound.song_info.album_name.type)+"：")]),a._v(a._s(a.audio.data.sound.song_info.album_name.name))]):a._e()]):a._e(),a._v(" "),a.audio.data.sound.lyrics?s("div",{domProps:{innerHTML:a._s(a.audio.data.sound.lyrics)}}):s("div",{staticClass:"nothing"},[a._v("没有相关的歌词T^T~ ")])])],1),a._v(" "),s("div",{staticClass:"sound-more"},[s("div",{staticClass:"more-tabs"},[a._v("相关推荐")]),a._v(" "),s("div",{staticClass:"recommends"},[s("div",{staticClass:"channel"}),a._v(" "),s("List",{attrs:{json:a.otherJson}})],1)])],1):a._e()},staticRenderFns:[]};var d=s("vSla")(e,u,!1,function(a){s("L69B")},null,null);t.default=d.exports}});
//# sourceMappingURL=1.734d043f60f2c229df6a.js.map