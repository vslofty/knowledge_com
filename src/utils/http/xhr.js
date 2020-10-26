import axios from 'axios';
import qs from 'qs';
import { getNewToken } from "@/utils/utils.js";

class XRH {
  constructor (config) {
    this.config = {
      baseURL: '/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": getNewToken()
      },
      withCredentials: true,
      crossDomain: true,
    };
    // 初始化 请求实例
    this.config = Object.assign(this.config, config);
    this.$request = axios.create(this.config);
  }

  get (url, data) {
    return this.request(url, data, 'GET');
  }

  post (url, data, config = {}) {
    return this.request(url, data, 'POST', config);
  }

  request (url, data, method = 'GET', option) {
    // 格式化参数
    if (typeof data === 'string') {
      method = data;
      data = {};
    }
    const config = { url, method };
    // 区分 post get
    if (method === 'GET') {
      config.params = data;
    } else {
      if (option.json) {
        config.headers = {
          'Content-Type': 'application/json; charset=utf-8'
        };
        config.data = data;
      } else {
        config.data = qs.stringify(data);
      }
    }
    // 发起请求
    return this.$request(config).then(({ data }) => {
      if (this.config.allRes) {
        return data;
      } else {
        if (data && data.isok) {
          const resulte = {
            Msg: data.Msg|| data.msg,
            data: data.dataObj || data.data || data.list,
            Amout: parseInt(data.Amout || data.amout || 0),
            code: parseInt(data.code || 0)
          }
          return resulte;
        } else {
          if (typeof data === 'string') {
            return Promise.reject(data);
          } else if (data.code || data.dataObj) {
            return Promise.reject(data);
          } else {
            return Promise.reject(data.Msg);
          }
        }
      }
    }).catch((error) => {
      let errorMsg = error && error.toString();
      if (errorMsg && errorMsg.includes('Error:') || errorMsg.includes('<html')) {
        errorMsg = '加载数据超时，请稍后重试！';
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    });
  }
}

export default XRH;
