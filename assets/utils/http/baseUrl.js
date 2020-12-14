// 获取环境
const ENV = process.env.VUE_APP_BUILD_FOR;

// 通用域名
var assetBase_uri = "";
// 家具域名
var homemini_uri = "";
// 鉴权域名
var liveauth_uri = "";

// 直播间装修请求 API
let FIXUP_URL = "";

// switch(buildFor){
//   case 'dev':
//   case 'wtest':
//   case 'homeuser':
//     base = 'http://10.0.0.2:1041';
//     // base = 'https://live-liveapi-pre.vzan.com';
//     break;
//   case 'tuser':
//     base = 'https://live-liveapi-pre.vzan.com';
//     break;
//   case 'prod':
//     base = 'https://live-liveapi.vzan.com';
//     break;
// }

switch (ENV) {
  case "dev":
  case "wtest":
  case "homeuser":
    assetBase_uri = "https://assets-dev.vzan.com";
    homemini_uri = "http://homeminiapi-test.vzan.com";
    liveauth_uri = "http://zhibovt.vzan.com";
    FIXUP_URL = "https://live-liveapi-test.vzan.com";
    break;
  case "tuser":
    assetBase_uri = "https://assets-pre.vzan.com";
    homemini_uri = "https://marketing-api-pre.vzan.com";
    liveauth_uri = "https://liveauth.vzan.com";
    FIXUP_URL = "https://live-liveapi-pre.vzan.com";
    break;
  case "prod":
    assetBase_uri = "https://assets.vzan.com";
    homemini_uri = "https://marketing-api.vzan.com";
    liveauth_uri = "https://liveauth.vzan.com";
    FIXUP_URL = "https://live-liveapi.vzan.com";
    break;
  default:
    assetBase_uri = "https://assets.vzan.com";
    liveauth_uri = "https://liveauth.vzan.com";
    homemini_uri = "https://marketing-api.vzan.com";
    FIXUP_URL = "https://live-liveapi-test.vzan.com";
}

export const assetBase = assetBase_uri;
export const homemini = homemini_uri;
export const liveauth = liveauth_uri;

export { FIXUP_URL };
