webpackJsonp([0],{IHPB:function(t,n,e){"use strict";n.__esModule=!0;var o,a=e("kfHR"),r=(o=a)&&o.__esModule?o:{default:o};n.default=function(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return(0,r.default)(t)}},kfHR:function(t,n,e){t.exports={default:e("qQfv"),__esModule:!0}},kksE:function(t,n,e){"use strict";var o=e("lIiZ"),a=e("go9Q");t.exports=function(t,n,e){n in t?o.f(t,n,a(0,e)):t[n]=e}},qQfv:function(t,n,e){e("IsPG"),e("yrDz"),t.exports=e("AKd3").Array.from},rPUH:function(t,n){},tlXl:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e("IHPB"),a=e.n(o),r=e("4YfN"),i=e.n(r),s=e("9rMa"),d={name:"Index",data:function(){return{bannerJson:[],recommendJson:[],page:1,loading:!1,loadingText:"",loadAll:!1}},computed:i()({},Object(s.d)(["audio","playList"])),methods:i()({},Object(s.c)(["set_audio_data","set_playList"]),Object(s.b)(["get_banner_data","get_recommend_data"]),{get_banner:function(){var t=this;this.get_banner_data().then(function(n){n.data&&(t.bannerJson=n.data)}).catch(function(t){console.log("get_banner",t)})},get_recommend:function(){var t=this;this.get_recommend_data(this.page).then(function(n){n.data&&(t.recommendJson=n.data,console.log(t.recommendJson),t.page=2)}).catch(function(t){console.log("get_recommend",t)})},getMore_recommend:function(){var t=this;this.loading=!0,this.get_recommend_data(this.page).then(function(n){var e;n.data?(t.loading=!1,(e=t.recommendJson).push.apply(e,a()(n.data)),t.page++):(t.loading=!1,t.loadAll=!0)}).catch(function(t){console.log("get_recommend",t)})},loadMore:function(){this.getMore_recommend()},playAll:function(){this.set_playList(this.recommendJson),this.audio.data&&this.recommendJson[0].sound.id===this.audio.data.id?(this.audio.ele.load(),this.audio.ele.play()):this.set_audio_data(this.recommendJson[0])}}),mounted:function(){this.get_banner(),this.get_recommend()}},l={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"index"}},[e("Banner",{attrs:{json:t.bannerJson}}),t._v(" "),e("div",{staticClass:"recommend"},[e("h3",{staticClass:"recommend-tt"},[t._v("echo每日推荐")]),t._v(" "),e("mu-button",{staticClass:"btn-playAll",attrs:{fab:"",small:"",color:"success"},on:{click:function(n){n.stopPropagation(),t.playAll()}}},[e("font-awesome-icon",{attrs:{icon:"play"}})],1),t._v(" "),e("mu-load-more",{attrs:{loading:t.loading,"loaded-all":t.loadAll},on:{load:t.loadMore}},[e("List",{attrs:{json:t.recommendJson}}),t._v(" "),t.loadAll?e("div",{staticClass:"nothing"},[t._v("没有数据了T^T")]):t._e()],1)],1)],1)},staticRenderFns:[]};var c=e("vSla")(d,l,!1,function(t){e("rPUH")},null,null);n.default=c.exports},yrDz:function(t,n,e){"use strict";var o=e("WwGG"),a=e("FITv"),r=e("OXaN"),i=e("kDTw"),s=e("V2W7"),d=e("CFGK"),l=e("kksE"),c=e("YW8S");a(a.S+a.F*!e("75+0")(function(t){Array.from(t)}),"Array",{from:function(t){var n,e,a,u,f=r(t),m="function"==typeof this?this:Array,_=arguments.length,h=_>1?arguments[1]:void 0,g=void 0!==h,v=0,p=c(f);if(g&&(h=o(h,_>2?arguments[2]:void 0,2)),void 0==p||m==Array&&s(p))for(e=new m(n=d(f.length));n>v;v++)l(e,v,g?h(f[v],v):f[v]);else for(u=p.call(f),e=new m;!(a=u.next()).done;v++)l(e,v,g?i(u,h,[a.value,v],!0):a.value);return e.length=v,e}})}});
//# sourceMappingURL=0.4f64a61d21acda156468.js.map