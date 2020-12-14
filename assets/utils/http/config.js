export default {
    method: "post",
    // 基础url前缀
    // baseURL: process.env.VUE_APP_URL,
    baseURL: "/",
    // 请求头信息
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        showLoading: true
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 20000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: "json"
};