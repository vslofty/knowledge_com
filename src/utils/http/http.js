import Vue from "vue";
import axios from "axios";
import { Ddebounce, removeLocal, getToken } from "@/utils/utils.js";



const _hostname = window.location.hostname;
let hostname = "";
if (_hostname === "localhost" || _hostname.includes("192.168.")) {
  hostname = "http://zhibo-dev.vzan.com";
} else {
  hostname = window.location.origin;
}

const CancelToken = axios.CancelToken;

class HttpRequest {
  constructor(baseUrl = "") {
    // this.headers = {
    //   lid,
    //   buid,
    // };
    this.baseURL = baseUrl;
    this.pending = {};
    // 当前正在请求的数量
    this.needLoadingRequestCount = 0;
  }

  // 显示loading
  showLoading() {
    if (this.needLoadingRequestCount === 0) {
      Vue.prototype.$antdMessage.loading({
        content: "请求中,请稍等...",
        background: "rgba(0, 0, 0, 0.7)",
        duration: 0
      });
    }
    this.needLoadingRequestCount++;
  }

  // 隐藏loading
  hideLoading() {
    this.needLoadingRequestCount--;
    this.needLoadingRequestCount = Math.max(this.needLoadingRequestCount, 0);
    if (this.needLoadingRequestCount === 0) {
      this.toHideLoading();
    }
  }

  //防抖: 将 500ms 间隔内的关闭 loading 便合并为一次。防止连续请求时, loading闪烁的问题。
  toHideLoading = Ddebounce(() => {
    Vue.prototype.$antdMessage.destroy();
  }, 500, false);

  // 获取axios配置
  getInsideConfig() {
    console.log(this.baseUrl)
    const config = {
      baseURL: this.baseUrl,
      timeout: 30000
    }
    return config;
  }

  removePending(key, isRequest = false) {
    if (this.pending[key] && isRequest) {
      this.pending[key]("取消重复请求" + key);
    }
    delete this.pending[key];
  }

  // 设定拦截器
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        // 判断当前请求是否设置了不显示 Loading
        if (config.showLoading !== false) {
          this.showLoading();
        }
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        if(!config.unshowtoken){
          console.log('getToken',config.url)
          config.headers["Authorization"] = `Bearer ${getToken()}`;
        }
        if (config.method.toLocaleLowerCase() === "get" || config.method.toLocaleLowerCase() === "delete") {
          config.params = config.data;
        }
        return config;
      },
      error => {
        // 判断当前请求是否设置了不显示 Loading
        if (error.config.showLoading !== false) {
          this.hideLoading();
        }
        return Promise.reject(error);
      }
    );

    // 响应请求的拦截器
    instance.interceptors.response.use(
      res => {
        // 判断当前请求是否设置了不显示 Loading
        if (res.config.showLoading !== false) {
          this.hideLoading();
        }
        // Any status code that lie within the range of 2xx cause this function to trigger
        // const key = `${res.config.url}&${res.config.method}`;
        // this.removePending(key);
        if (res.status === 200) {
          return Promise.resolve(res);
        } else {
          return Promise.reject(res);
        }
      },
      error => {
        // 判断当前请求是否设置了不显示 Loading
        if (error.config && error.config.showLoading !== false) {
          this.hideLoading();
        }
        return Promise.reject(error);
      }
    );
  }

  // 创建实例
  request(options) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance);
    return instance(newOptions);
  }

  get(url, config, showLoading) {
    const options = Object.assign({
      method: "get",
      url,
      showLoading,
    }, config);
    return this.request(options);
  }

  post(url, data, showLoading, config) {
    return this.request(Object.assign({
      method: "post",
      url,
      data,
      showLoading
    }, config));
  }

  put(url, data, showLoading) {
    return this.request({
      method: "put",
      url,
      data,
      showLoading
    });
  }

  delete(url, config, showLoading) {
    const options = Object.assign({
      method: "delete",
      url,
      showLoading
    }, config);
    return this.request(options);
  }

  patch(url, data, showLoading) {
    return this.request({
      method: "patch",
      url,
      data,
      showLoading
    });
  }
}

// 请求统一处理
function requst(options) {
  return new Promise((resolve, reject) => {
    options.then(res => {
      console.log(res.data)
      if (res.headers["content-type"] === "application/vnd.ms-excel") {
        resolve(res);
      } else if (res.data.isok) {
        // 旧接口逻辑处理
        const preUrl = ["/api/"];
        if (preUrl.filter( item => res.config.url.includes(item) ).length) {
          if(res.data.isok){
            resolve(res.data);
          }
        } else {
          const CODE = Number.parseInt(res.data.code);
          if (CODE === 0) {
            //请求成功
            return resolve(res.data);
          } else if (CODE === -1 || CODE === 1001) {
            // Token过期 || 账号不存在
            // 清除localStorage存储信息
            return window.location.href = `${hostname}/home/newzblogin?v=${Date.now()}`;
          }else if(CODE === 502){
            return window.location.href = `${hostname}/know/`;
          }
          reject(res.data.msg || res.data.Msg || "加载数据超时，请稍后重试");
        }
      } else {
        if(res.data.code === 502){
          return window.location.href = `${hostname}/know/`;
        }else{
          reject(res.data.msg || res.data.Msg || "加载数据超时，请稍后重试");
        }
      }
    }).catch(error => {
      console.log(error,JSON.stringify(error));
      if (error.config && error.message.includes(`timeout of ${error.config.timeout}ms exceeded`)) {
        reject("加载数据超时，请稍后重试");
      } else if (error.config && error.message.includes(`code 401`)) {
        Vue.prototype.$antdMessage.error("请先登录");
        window.location.href = `${window.location.origin}/know/`;
      } else {
        reject(error);
      }
    });
  });
}

const service = new HttpRequest();
// 挂载请求
Vue.prototype.$axios = service;

// get.post.put.del.patch请求方法提取
const get = (url, params, showLoading = true, options) => {
  return requst(service.get(url, Object.assign({ data: params }, options), showLoading));
};
const post = (url, params, showLoading = true, options) => {
  return requst(service.post(url, params, showLoading, options));
};
const put = (url, params, showLoading = true) => {
  return requst(service.put(url, params, showLoading));
};
const del = (url, params, showLoading = true) => {
  return requst(service.delete(url, { data: params }, showLoading));
};
const patch = (url, params, showLoading = true) => {
  return requst(service.patch(url, { data: params }, showLoading));
};

const axiosRequest = (url, method = 'GET', data = {}, options = {}) => {
  if (method === 'POST') {
    return requst(service.post(url, data, false, options));
  } else {
    return requst(service.get(url, Object.assign({ data }, options), false));
  }
};


export { service };
export { get, post, put, del, patch, axiosRequest };
