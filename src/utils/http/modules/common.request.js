import { get,post } from "../http";
import qs from "qs";
import store from '@/store/index.js'
// let base = 'http://tliveapi.vzan.com';
// const buildFor = process.env.VUE_APP_BUILD_FOR;
// switch(buildFor){
//   case 'dev':
//   case 'wtest':
//   case 'homeuser':
//     base = 'http://tliveapi.vzan.com';
//     // base = 'https://liveauth.vzan.com';
//     break;
//   case 'tuser':
//     base = 'https://liveauth-pre.vzan.com';
//     break;
//   case 'prod':
//     base = 'https://liveauth.vzan.com';
//     break;
// }
export default {
  /**
   * @method 获取配置信息
   */
  getGeneral: () => get("/api/setting/general",{},false,{unshowtoken:true}),


  /**
   * @method 知播客户端app下载
   * @param {*} zid  直播间id
   */
  getClientLink: () => get(`/api/setting/appversioninfo?versionCode=00.00.00.01&deviceType=3`),
  
  /**
   * @method 添加反馈
   * @param {*} content  反馈内容
   * @param {*} contact  反馈联系方式
   * @param {*} imgurls  反馈图片
   * @param {*} type  反馈类型
   * @param {*} tail  来源（官网：1000，PC后台：1001，PC客户端：1002，app安卓：1003，appIOS：1004）
   */
  addFeedback: (params) => post(`/api/universal/v1/feedback/feedback`,qs.stringify(params),false,store.state.token?{
    token: store.state.token
  }:{}),

  /**
  * @method 获取文章目录
  */
  getCatalog: () => post(`/api/universal/v1/article/catalog`,{},false),

  /**
  * @method 获取文章详情
   * @param {*} articleid  文章id
  */
  getArticleDetail: (params) => post(`/api/universal/v1/article/article`,qs.stringify(params),false),
};
