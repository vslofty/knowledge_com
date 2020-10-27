import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "babel-polyfill";

Vue.config.productionTip = false;


// 全局注册 Event Bus
Vue.prototype.$bus = new Vue();

// ant-design-vue UI 组件相关
import Antd from "ant-design-vue";
import { message, notification, Modal } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);
Vue.prototype.$antdMessage = message;
Vue.prototype.$antdNotification = notification;
Vue.prototype.$antdModalInfo = Modal.info;
Vue.prototype.$antdModalSuccess = Modal.success;
Vue.prototype.$antdModalError = Modal.error;
Vue.prototype.$antdModalWarning = Modal.warning;
Vue.prototype.$antdModalConfirm = Modal.confirm;
Vue.prototype.$antdModalDestroyAll = Modal.destroyAll;
import "./assets/css/index.less";

// import animated from 'animate.css';
// Vue.use(animated)

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  duration: 1200,
  once: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
