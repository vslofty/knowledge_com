import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)

import { ConfigProvider, Radio, Input, Upload, Icon, Button, Drawer, Tabs, Menu, Breadcrumb, message, notification, Modal } from "ant-design-vue";
Vue.use(ConfigProvider).use(Radio).use(Input).use(Upload).use(Icon).use(Button).use(Drawer).use(Tabs).use(Menu).use(Breadcrumb).use(Modal);
Vue.prototype.$antdMessage = message;
Vue.prototype.$antdNotification = notification;
Vue.prototype.$antdModalInfo = Modal.info;
Vue.prototype.$antdModalSuccess = Modal.success;
Vue.prototype.$antdModalError = Modal.error;
Vue.prototype.$antdModalWarning = Modal.warning;
Vue.prototype.$antdModalConfirm = Modal.confirm;
Vue.prototype.$antdModalDestroyAll = Modal.destroyAll;
