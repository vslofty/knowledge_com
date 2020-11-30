import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "babel-polyfill";

Vue.config.productionTip = false;


// 全局注册 Event Bus
Vue.prototype.$bus = new Vue();

// ant-design-vue UI 组件相关
import { ConfigProvider, Radio, Input, Upload, Icon, Button, Drawer, Tabs, Menu, Breadcrumb, message, notification, Modal } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(ConfigProvider).use(Radio).use(Input).use(Upload).use(Icon).use(Button).use(Drawer).use(Tabs).use(Menu).use(Breadcrumb).use(Modal);
Vue.prototype.$antdMessage = message;
Vue.prototype.$antdNotification = notification;
Vue.prototype.$antdModalInfo = Modal.info;
Vue.prototype.$antdModalSuccess = Modal.success;
Vue.prototype.$antdModalError = Modal.error;
Vue.prototype.$antdModalWarning = Modal.warning;
Vue.prototype.$antdModalConfirm = Modal.confirm;
Vue.prototype.$antdModalDestroyAll = Modal.destroyAll;
import "./assets/css/index.less";


import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  duration: 1200,
  once: true
});

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?757214507be6d272229637ca83de39f7";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
