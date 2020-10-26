const path = require("path");
const chalk = require("chalk");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const log = (str1, str2) => {
  console.log(chalk.green(chalk.blue.bold(str1) + chalk.black.bgGreen(str2)));
};

const ENV = process.env.VUE_APP_BUILD_FOR;
var pack_env = "";
console.log(chalk.red("************************************************"));
log("用户后台：", "微赞团队提供技术支持");
switch (ENV) {
  case "dev":
    pack_env = "本地服务";
    break;
  case "test":
    pack_env = "测试环境-zhibo-test";
    break;
  case "pre":
    pack_env = "预更新环境-zhibo-pre";
    break;
  case "prod":
    pack_env = "正式生产环境-zhibo";
    break;
}
log("当前打包为：", pack_env);
// 打包方式
const IS_DEV = ENV === 'dev'||ENV === 'test';
const IS_PREV = ENV === 'pre';

module.exports = {
    publicPath: process.env.outputDir,
    lintOnSave: true, // 是否开启eslint保存检测
    productionSourceMap: ENV !== "prod", // 是否生成sourcemap文件，生成环境不生成以加速生产环境构建
    assetsDir: "static",
    outputDir: path.resolve(__dirname, IS_DEV ? './dist-testvt' : IS_PREV ? './dist-prev' : './dist-prod' ),
    devServer: {
        // open: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                //target: "https://zhibo.vzan.com",//正式
                //target:"https://zhibo-pre.vzan.com",//预发布
                //target: "http://zhibo-test.vzan.com",//测试
                target: "https://zhibo-dev.vzan.com",//开发
                changeOrigin: true,
                ws: true
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'border-color-base': '#FFB400',
                        'primary-color': '#FFB400',
                        'link-color': '#FFB400',
                        'border-radius-base': '2px',
                        'text-color': '#FFB400',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === "test") {
            config.output
                .filename("static/js/[name].[hash:8].js")
                .chunkFilename("static/js/[name].[hash:8].js");
        }
    },
    configureWebpack: (config) => {
        if (ENV === "prod") {
            // 配置webpack 压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: /\.js$|\.html$|\.css$/,
                    // 超过4kb压缩
                    threshold: 4096,
                })
            );
        }
        config.externals = {
          "clipboard.js": "ClipboardJS",
        };
    },
};