<template>
    <div class="page-index">
        <div class="header-bg">
            <img src="https://j.weizan.cn/zhibo/microcourse/images/banner-bg.png">
        </div>
        <div class="header-box" :style="`height:${screenHeight}px`">
            <headers current="index"></headers>
            <h1 class="header-title">让知识传播更有价值</h1>
            <p class="header-subtitle">
                <span>全新一代在线互动课堂教学工具，整合多人连麦，在线教学，教务管理，招生营销等功能于一体，致力于为您提供</span>
                <span>一个解决方案，高效率做在线教育的一站式解决工具。</span>
            </p>
            <a-button class="build-btn" @click="goPcBackstage">
                <span>创建在线课堂</span>
                <img src="https://j.weizan.cn/zhibo/microcourse/images/right_arrow.png"/>
            </a-button>
            <div class="slide-tips">
                <div class="arrow-icon d-flex flex-dircol">
                    <span>︿</span>
                    <span>︿</span>
                </div>
                <p>上滑查看更多</p>
            </div>
        </div>
        <div class="body-box">
            <h2 class="main-title">知播，让教育更<span>简单</span></h2>
            <img class="bg-3" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-3.png"/>
            <img class="bg-5" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-5.png"/>
            <div class="main-content-1 d-flex ali-cen">
                <div class="main-img-box-1">
                    <img class="bg-1" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-1.png"/>

                    <img class="img-1" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-1.png"/>
                    <img class="img-2" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-2.png"/>
                    <img class="img-3" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-3.png"/>
                    <img class="img-4" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-4.png"/>
                </div>
                <div class="describe-box d-flex flex-dircol">
                    <img class="bg-2" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-2.png"/>
                    <h4 class="small-title">课堂互动更真实</h4>
                    <p class="sub-desc">满足多种教学形态，不管是1对1教学、课外兴趣小班课还是大型直播公开课，帮你轻松搭建属于自己的在线课堂；</p>
                    <p class="sub-desc">让教育打破时间和空间限制，助力教育创业者实现互联网转型升级。</p>
                </div>
            </div>
            <div class="main-content-2 d-flex ali-cen">
                <div class="describe-box d-flex flex-dircol">
                    <img class="bg-4" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-4.png"/>
                    <h4 class="small-title">教学管理更高效</h4>
                    <p class="sub-desc">不用购买服务器，也不用为维护硬件支付额外成本，更不用招招募研发团队进行产品设计和开发，一键即可拥有一套完整在线教学业务系统；</p>
                    <p class="sub-desc">从此让老师回归教育教学，专注于教学本身和学生成长。</p>
                </div>
                <div class="main-img-box-2">
                    <img class="img-5" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-5.png"/>
                    <img class="img-6" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-6.png"/>
                    <img class="img-7" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-7.png"/>
                </div>
            </div>
            <div class="main-content-3 d-flex ali-cen">
                <div class="main-img-box-3">
                    <img class="img-8" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-8.png"/>
                    <img class="img-9" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-9.png"/>
                    <img class="img-10" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-10.png"/>
                    <img class="img-11" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-11.png"/>
                </div>
                <div class="describe-box d-flex flex-dircol">
                    <img class="bg-6" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-6.png"/>
                    <h4 class="small-title">学员成长更清晰</h4>
                    <p class="sub-desc">数字化呈现学员成长的每一刻，成长过程清晰可见，让学员成为最好的自己；让老师更轻松，家长更放心；</p>
                </div>
            </div>
        </div>
        <div class="advert-box">
            <div class="container">
                <h1>一分钟<br/>创造自己的在线课堂</h1>
                <p>助力教育创业者实现互联网转型升级</p>
                <a-button @click="goPcBackstage">创建在线课堂</a-button>
            </div>
        </div>
        <footers></footers>
    </div>
</template>

<script>
import Headers from '@/common/Header.vue';
import Footers from '@/common/Footer.vue';
export default {
    data(){
        return {
            screenHeight: 960,//高度
        }
    },
    components: {
        Headers,Footers
    },
    methods: {
        goPcBackstage(){
            if(location.origin.includes('localhost')){
                window.location.href='http://zhibo-dev.vzan.com/know/';
            }else{
              window.location.href=`${location.origin}/know/`;
            }
        },
    },
    mounted(){
        this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    }
}
</script>

<style lang="less" scoped>
.page-index{
    .header-bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        img{
            width: 100%;
        }
    }
    .header-box{
        position: relative;
        width: 100%;
        height: 960px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .header-title{
            font-size: 80px;
            font-weight: bold;
            color: #fff;
        }
        .header-subtitle{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 18px;
            line-height: 2.4;
            color: #E7E0D9;
            margin-bottom: 120px;
        }
        .build-btn{
            width: 240px;
            height: 70px;
            color: #252525;
            font-size: 20px;
            font-weight: bold;
            border: none;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
            border-radius: 40px;
            &>img{
                width: 16px;
                height: 16px;
                padding: 12px;
                margin-left: 30px;
                background: #202124;
                border-radius: 50%;
                box-sizing: content-box;
            }
        }
        .slide-tips{
            position: absolute;
            bottom: 26px;
            left: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .arrow-icon{
                margin-bottom: 20px;
                background-image: linear-gradient(to bottom, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
                background-image: -webkit-linear-gradient(to bottom, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
                color: transparent;
                -webkit-background-clip: text;
                background-size: 100% 200%;
                animation: masked-animation-vertical 1s infinite linear;
                span{
                    margin: -7px 0;
                }
            }
            p{
                background-image: linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
                background-image: -webkit-linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0.4) 100%);
                color: transparent;
                -webkit-background-clip: text;
                background-size: 200% 100%;
                animation: masked-animation 2.2s infinite linear;
            }
        }
        
    }
    .body-box{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
        .main-title{
            color: #202124;
            font-size: 54px;
            font-weight: bold;
            margin-top: 120px;
            span{
                color: #FFA800;
            }
        }
        .describe-box{
            width: 460px;
            position: relative;
            .small-title{
                color: #252525;
                font-size: 40px;
                font-weight: bold;
            }
            .sub-desc{
                color: #666;
                font-size: 18px;
                margin-bottom: 15px;
                text-align: left;
            }
            .bg-2{
                position: absolute;
                left: 0;
                top: -48px;
                width: 98px;
                height: 98px;
            }
            .bg-4{
                position: absolute;
                right: 132px;
                top: -48px;
                width: 98px;
                height: 98px;
            }
            .bg-6{
                position: absolute;
                left: 225px;
                top: -30px;
                width: 89px;
                height: 89px;
            }
        }
        .bg-3{
            position: absolute;
            right: 0;
            top: 570px;
            width: 253px;
            height: 494px;
        }
        .bg-5{
            position: absolute;
            left: 0;
            bottom: 300px;
            width: 475px;
            height: 395px;
        }
        .main-img-box-1{
            position: relative;
            width: 890px;
            height: 654px;
            .img-1{
                position: absolute;
                left: 80px;
                top: 69px;
                width: 800px;
                height: 555px;
            }
            .img-2{
                position: absolute;
                left: 113px;
                top: 0;
                width: 729px;
                height: 338px;
            }
            .img-3{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 440px;
                height: 480px;
            }
            .img-4{
                position: absolute;
                right: -10px;
                bottom: 20px;
                width: 420px;
                height: 330px;
            }
            .bg-1{
                position: absolute;
                left: -51px;
                top: -56px;
                width: 440px;
                height: 440px;
            }
        }
        .main-img-box-2{
            position: relative;
            width: 870px;
            height: 648px;
            margin-right: -170px;
            .img-5{
                position: absolute;
                left: 23px;
                top: 43px;
                width: 800px;
                height: 555px;
            }
            .img-6{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 420px;
                height: 369px;
            }
            .img-7{
                position: absolute;
                right: 0;
                top: 0;
                width: 340px;
                height: 360px;
            }
        }
        .main-img-box-3{
            position: relative;
            width: 905px;
            height: 710px;
            .img-8{
                position: absolute;
                left: 23px;
                top: 43px;
                width: 800px;
                height: 555px;
            }
            .img-9{
                position: absolute;
                left: 0;
                top: 38px;
                width: 460px;
                height: 482px;
            }
            .img-10{
                position: absolute;
                right: 0;
                top: 0;
                width: 380px;
                height: 406px;
            }
            .img-11{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 480px;
                height: 398px;
            }
        }
    }
    .advert-box{
        position: relative;
        width: 100%;
        height: 600px;
        background: url(https://j.weizan.cn/zhibo/microcourse/images/advert-bg.png) no-repeat center top;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1{
            font-size: 60px;
            font-weight: bold;
            color: #252525;
        }
        p{
            color: #353535;
            font-size: 20px;
            margin-bottom: 50px;
        }
        button{
            width: 195px;
            height: 66px;
            color: #252525;
            font-size: 18px;
            border: none;
            background: linear-gradient(90deg, #FFFFFF 0%, #FFE29C 100%);
            border-radius: 35px;
        }
    }
}
</style>