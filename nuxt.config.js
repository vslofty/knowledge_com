export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '知播-在线互动课堂教学工具，助力教育创业者实现互联网转型升级',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=0, width=device-width, initial-scale=1' },
      { name: 'keywords', content: '知播,直播教学,网络上课,在线教育互动课堂,直播课堂软件,一对多教学,一对一教学,教学直播课,直播课堂,微赞直播' },
      { hid: 'description', name: 'description', content: '全新一代在线互动课堂教学工具，整合多人连麦、在线教学、教务管理、招生营销等功能于一体，致力于为您提供一个低成本，高效率做在线教育的一站式解决工具。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '~/css/index.css' },
      { rel: 'stylesheet', href:'https://j.weizan.cn/zhibo/userlivecontent/vzan/plug/aos.css?v=637378363306613110'},
    ],
    script: [
      {
        id:'analysislog',//跳转登录埋点
        src: 'https://j.weizan.cn/zhibo/livecontent/log/analysis.js?cname=zhibo13&ver=20201113'
      },
      {
        src:"https://j.weizan.cn/zhibo/userlivecontent/vzan/plug/aos.js?v=637381974380594481"
      },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  static: {
    prefix: '/pages/'
  },
  router: {
    base: '/',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  }
}
