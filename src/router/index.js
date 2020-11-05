import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Download from '../views/Download.vue'
import HelpCenter from '../views/HelpCenter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { title: "知播-在线互动课堂教学工具，助力教育创业者实现互联网转型升级" }
  },
  {
    path: '/download',
    name: 'Download',
    component: Download,
    meta: { title: "知播-下载中心" }
  },
  {
    path: '/help/:id',
    name: 'HelpCenter',
    component: HelpCenter,
    meta: { title: "知播-帮助文档" }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next)=>{
  // 根据路由元信息设置文档标题
  window.document.title = to.meta.title;
  if (_hmt) {
      if (to.path) {
          _hmt.push(['_trackPageview', '/#' + to.fullPath]);
      }
  }
  next()
})

export default router
