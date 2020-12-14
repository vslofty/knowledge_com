import axios from "axios";
import config from "./config.js";
import qs from "qs";
//import router from "../../router/router";
import { getLocal, removeLocal, Ddebounce } from "../utils";
import { Loading } from "element-ui";

const stateRequest = {
    // loading对象
    loading: null,
    // 当前正在请求的数量
    needLoadingRequestCount: 0
};

// 显示loading
function showLoading() {
    // !loading添加这个条件, 因为关闭时加了抖动, 此时loading对象可能还存在, 但needLoadingRequestCount已经变成0, 避免这种情况下会重新创建个loading
    if (stateRequest.needLoadingRequestCount === 0 && !stateRequest.loading) {
        stateRequest.loading = Loading.service({
            lock: true,
            text: "请求中,请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
    }
    stateRequest.needLoadingRequestCount++;
}

// 隐藏loading
function hideLoading() {
    stateRequest.needLoadingRequestCount--;
    stateRequest.needLoadingRequestCount = Math.max(stateRequest.needLoadingRequestCount, 0);
    if (stateRequest.needLoadingRequestCount === 0) {
        toHideLoading();
    }
}

//防抖: 将 500ms 间隔内的关闭 loading 便合并为一次。防止连续请求时, loading闪烁的问题。
var toHideLoading = Ddebounce(() => {
    stateRequest.loading && stateRequest.loading.close();
    stateRequest.loading = null;
}, 500, false);

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout,
            headers: config.headers
        });

        // 请求拦截器
        instance.interceptors.request.use(
            config => {
                const token = getLocal("token");
                const accountId = getLocal("accountId");
                // 判断当前请求是否设置了不显示 Loading
                if (config.headers.showLoading) {
                    showLoading();
                }
                // 判断 token是否存在(请求需要带上token, 登录除外)
                if (token) {
                    config.headers.token = token;
                    config.headers.accountId = accountId;
                    if (config.method.toLocaleLowerCase() === "post" || config.method.toLocaleLowerCase() === "put" || config.method.toLocaleLowerCase() === "delete") {
                        //config.data.token = token;
                        config.data = qs.stringify(config.data);
                    } else {
                        //config.url += `?token=${encodeURIComponent(token)}`;
                    }
                } else {
                    config.data = qs.stringify(config.data);
                }
                return config;
            },
            error => {
                // 判断当前请求是否设置了不显示 Loading
                if (config.headers.showLoading) {
                    hideLoading();
                }
                return Promise.reject(error);
            }
        );

        // 返回拦截器
        instance.interceptors.response.use(
            response => {
                // 判断当前请求是否设置了不显示 Loading
                if (response.config.headers.showLoading) {
                    hideLoading();
                }
                // 签名过期情况处理
                if (!response.data.isok && (response.data.Msg === "签名已过期" || response.data.Msg === "非法请求" || response.data.code === '-100')) {
                    removeLocal("token");
                    router.push("/auth");
                }
                return response;
            },
            error => {
                // 判断当前请求是否设置了不显示 Loading
                if (error.config.headers.showLoading) {
                    hideLoading();
                }
                return Promise.reject(error);
            }
        );

        //请求处理
        instance(options)
            .then(res => {
                // 接口异常处理
                if (res.data.isok) {
                    resolve(res.data);
                } else {
                    reject(res.data.Msg || "接口异常,请联系后端同事");
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}