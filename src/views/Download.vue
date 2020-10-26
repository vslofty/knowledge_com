<template>
    <div class="download">
        <headers current="download"></headers>
        <a-tabs :default-active-key="tabname" :tab-position="'bottom'" :tabBarGutter="400" @change="changeTab">
            <a-tab-pane :key="'teach'" :forceRender="true">
                <span slot="tab">
                    <i class="vzaniconfont iconjiangshiduan"></i>讲师端 PC版
                </span>
                <div class="tab-box">
                    <div class="left">
                        <h1>知播讲师端</h1>
                        <p class="desc">满足多种教学形态，不管是1对1教学、课外兴趣小班课还是大型直播公开课，帮你轻松搭建属于自己的在线课堂；</p>
                        <a-button class="download-window" @click="goToDownload">
                            <span class="vzaniconfont iconwindonws"></span>下载Windows版
                        </a-button>
                    </div>
                    <div class="right">
                        <img src="../assets/zhibo/images/tab-img-1.png" style="width:900px;height:480px; ">
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
                            <div class="download-scan" v-if="generalInfo.DownAppTreasureURI">
                                <vue-qr :text="generalInfo.DownAppTreasureURI" :size="100" :margin="5" class="invite-code"></vue-qr>
                                <span>扫码下载</span>
                            </div>
                            <div class="download-btn-group">
                                <a :href="generalInfo.DownIosURI" target="_blank">
                                    <i class="vzaniconfont iconbianzu1"></i>苹果下载
                                </a>
                                <a :href="generalInfo.DownIosURI" target="_blank">
                                    <i class="vzaniconfont iconbianzu"></i>安卓下载
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="../assets/zhibo/images/tab-img-2.png" style="width:829px;height:616px;">
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import headers from '@/common/Header.vue'
import CommonAjax from "@/utils/http/modules/common.request.js";
import vueQr from 'vue-qr'
export default {
    data(){
        return{
            tabname: 'teach',
            generalInfo: {}
        }
    },
    components: {
        headers,
        vueQr
    },
    methods: {
        async getGeneral(){
            try{
                let res = await CommonAjax.getGeneral();
                console.log(res)
                this.generalInfo = res.dataObj;
            } catch(error){
                error && this.$antdMessage.error(error);
            }
        },
        async goToDownload(){
            try{
                let res = await CommonAjax.getClientLink();
                console.log(res)
                var a = document.createElement('a')
                var event = new MouseEvent('click')
                a.href = res.dataObj&&res.dataObj.renewAdress;
                // 合成函数，执行下载
                a.dispatchEvent(event)
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
        this.getGeneral();
    }
}
</script>

<style lang="less" scoped>
.download{
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.36);
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
                font-size: 16px;
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
                    i{
                        font-size: 20px;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
}
</style>