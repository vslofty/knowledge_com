import { get } from "../http";
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
  
};
