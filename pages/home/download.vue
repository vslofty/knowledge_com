<template>
    <div class="page-download" v-cloak>
        <headers current="download"></headers>
        <a-tabs :default-active-key="tabname" :tab-position="'bottom'" :tabBarGutter="mRight" @change="changeTab">
            <a-tab-pane :key="'teach'" :forceRender="true">
                <span slot="tab">
                    <i class="vzaniconfont iconjiangshiduan"></i>讲师端 PC版
                </span>
                <div class="tab-box">
                    <div class="left">
                        <h1>知播讲师端</h1>
                        <p class="desc">满足多种教学形态，不管是1对1教学、课外兴趣小班课还是大型直播公开课，帮你轻松搭建属于自己的在线课堂；</p>
                        <a-button class="download-window" @click="goToDownload">
                            <span class="vzaniconfont iconwindonws"></span>
                            <div v-html="downloadtext"></div>
                        </a-button>
                    </div>
                    <div class="right">
                        <img src="https://j.weizan.cn/zhibo/microcourse/images/tab-img-1.png?v=20201028" class="tab-img-1">
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane :key="'student'" :forceRender="true">
                <span slot="tab">
                    <i class="vzaniconfont iconxueshengduan"></i>学生端 APP版
                </span>
                <div class="tab-box">
                    <div class="left">
                        <h1>知播学生端</h1>
                        <p class="desc">满足多种教学形态，不管是1对1教学、课外兴趣小班课还是大型直播公开课，帮你轻松搭建属于自己的在线课堂；</p>
                        <div class="student-download">
                            <div class="download-scan" v-if="generalInfo&&generalInfo.DownAppTreasureURI">
                                <vue-qr :text="generalInfo&&generalInfo.DownAppTreasureURI" :size="200" :margin="5" class="invite-code"></vue-qr>
                                <span>扫码下载</span>
                            </div>
                            <div class="download-btn-group">
                                <a :href="generalInfo&&generalInfo.DownIosURI" target="_blank" v-if="generalInfo&&generalInfo.DownIosURI">
                                    <i class="vzaniconfont iconbianzu1"></i><span>苹果下载</span>
                                </a>
                                <a :href="generalInfo&&generalInfo.DownAndroidURI" target="_blank" v-if="generalInfo&&generalInfo.DownAndroidURI">
                                    <i class="vzaniconfont iconbianzu"></i><span>安卓下载</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="https://j.weizan.cn/zhibo/microcourse/images/tab-img-2.png" class="tab-img-2">
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import headers from '@/components/Header.vue'
import CommonAjax from "@/assets/utils/http/modules/common.request.js";
import vueQr from 'vue-qr'
import { mapGetters } from "vuex"
export default {
    head:{
        title: "知播-下载中心",
    },
    data(){
        return{
            tabname: 'teach',
            mRight: 400,
            downloadtext: "下载Windows版"
        }
    },
    components: {
        headers,
        vueQr
    },
    computed: {
        ...mapGetters(['generalInfo']),
    },
    methods: {
        async goToDownload(){
            try{
                let res = await CommonAjax.getClientLink();
                console.log(res)
                if(res.dataObj){
                    var url = res.dataObj.renewAdress.includes('https')?res.dataObj.renewAdress:res.dataObj.renewAdress.replace('http','https');
                    console.log(url)
                    window.open(res.dataObj.renewAdress)
                    // window.location.href = url;
                    // let aLink = document.createElement("a");
                    // aLink.style.display = "none";
                    // aLink.href = res.dataObj&&res.dataObj.renewAdress;
                    // document.body.appendChild(aLink);
                    // aLink.click();
                    // document.body.removeChild(aLink);
                    // window.URL.revokeObjectURL(url);
                }else{
                    this.$antdMessage.warning('暂无下载地址')
                }
                // var a = document.createElement('a')
                // var event = new MouseEvent('click')
                // a.href = res.dataObj&&res.dataObj.renewAdress;
                // // 合成函数，执行下载
                // a.dispatchEvent(event)
            }catch(error){
                error&&this.$antdMessage.error(error)
            }
        },
        changeTab(val){
            console.log(val)
            this.tabname = val;
        }
    },
    mounted() {
        console.log(document.documentElement.offsetWidth || document.body.offsetWidth)
        this.downloadtext = '<div><span>' + this.downloadtext.split('').join('</span><span>') + '</span></div>';
        if((document.documentElement.offsetWidth || document.body.offsetWidth)<=1000){
            this.mRight = 160;
        }
    }
}
</script>

<style lang="less" scoped>
.page-download{
    width: 100%;
    height: 100vh;
    background: url(https://j.weizan.cn/zhibo/microcourse/images/download-bg.png?v=20201028) no-repeat center center;
    background-size: cover;
    /deep/ .ant-tabs{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    /deep/ .ant-tabs .ant-tabs-top-content.ant-tabs-content-animated, /deep/ .ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated{
        flex: 1;
    }
    /deep/ .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane,/deep/ .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane{
        display: inline-flex;
    }
    /deep/ .ant-tabs-bar{
        height: 129px;
        border-top: 1px solid rgba(255,255,255,.15);
        margin: 0;
        .ant-tabs-nav-scroll{
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .ant-tabs-nav{
            height: 129px;
            &>div{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .ant-tabs-tab{
                height: 129px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                padding: 0 40px;
                &>span{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    i{
                        font-size: 36px;
                    }
                }
            }
            .ant-tabs-tab-active,
            .ant-tabs-tab:hover{
                color: #FFA800;
            }
            .ant-tabs-ink-bar{
                background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
            }
        }
    }
    .tab-box{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .left{
            width: 400px;
            height: 100%;
            padding-top: 180px;
            color: #fff;
            display: flex;
            flex-direction: column;
            h1{
                color: #fff;
                font-size: 40px;
                font-weight: bold;
                margin-bottom: 12px;
            }
            .version{
                font-size: 16px;
            }
            .desc{
                font-size: 18px;
                line-height: 2;
                margin-top: 35px;
                margin-bottom: 50px;
            }
            .download-window{
                width: 200px;
                height: 60px;
                border: none;
                color: #252525;
                font-size: 15px;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
                border-radius: 8px;
                .vzaniconfont{
                    font-size: 22px;
                    margin-right: 6px;
                }
            }
        }
        .right{
            .tab-img-1{
                width: 900px;
            }
            .tab-img-2{
                width: 829px;
            }
        }
        .student-download{
            display: flex;
            .download-scan{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 16px;
                color: #fff;
                margin-right: 16px;
                img{
                    width: 136px;
                    height: 136px;
                    margin-bottom: 16px;
                }
            }
            .download-btn-group{
                height: 136px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                button,a{
                    position: relative;
                    width: 160px;
                    height: 60px;
                    background: transparent;
                    color: #fff;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid rgb(255,255,255,0.3);
                    border-radius: 6px;
                    transition: .4s;
                    overflow: hidden;
                    span{
                        position: relative;
                    }
                    i{
                        position: relative;
                        font-size: 20px;
                        margin-right: 8px;
                    }
                    &::before{
                        content: "";
                        position: absolute;
                        left: -100%;
                        top: 0;
                        z-index: 0;
                        width: 100%;
                        height: 100%;
                        background: #fff;
                        transition: .6s;
                    }
                    &:hover{
                        color: #333;
                    }
                    &:hover::before{
                        left: 0%;
                    }
                }
            }
        }
    }
}
</style>