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
    component: Index
  },
  {
    path: '/download',
    name: 'Download',
    component: Download
  },
  {
    path: '/help/:id',
    name: 'HelpCenter',
    component: HelpCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
