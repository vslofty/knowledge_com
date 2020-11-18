<template>
    <div class="mobile-index">
        <div class="header-bg">
            <mobile-header></mobile-header>
            <h1 class="header-title">让知识传播更有价值</h1>
            <p class="header-subtitle">-  专属在线互动教学课堂，一键创建  -</p>
            <a-button class="build-btn" @click="goDownLoad">立即下载</a-button>
        </div>
        <div class="model-box">
            <h2>知播在线互动课堂</h2>
            <p>以高效，正确地帮助教育培训机构或老师，解决多种培训教育场景</p>
            <img class="mobile-img-1" src="https://j.weizan.cn/zhibo/microcourse/images/mobile/mobile-img-1.png"/>
        </div>
        <div class="model-box">
            <h3>1v1~16人在线视频互动，画质流畅稳定</h3>
            <p>老师电脑客户端授课，学生App上课，充分保障了课堂互动的真实，在弱网下也能流畅上课，保证教学效果</p>
            <img class="mobile-img-2" src="https://j.weizan.cn/zhibo/microcourse/images/mobile/mobile-img-2.png"/>
        </div>
        <div class="model-box">
            <h3>屏幕共享，授课灵活自由</h3>
            <p>屏幕一键共享，老师示范更方便，授课更灵活</p>
            <img class="mobile-img-3" src="https://j.weizan.cn/zhibo/microcourse/images/mobile/mobile-img-3.png"/>
        </div>
        <div class="model-box">
            <h3>多格式课件演示，课堂内容更生动</h3>
            <p>支持视频，图片，PDF，Word，PPT等主流文档演示丰富画笔工具，讲到哪画到哪，重点知识统统圈起来</p>
            <img class="mobile-img-4" src="https://j.weizan.cn/zhibo/microcourse/images/mobile/mobile-img-4.png"/>
        </div>
        <div class="model-box">
            <h3>直播美颜，让老师授课更舒心</h3>
            <p>人性化、灵活度高的课堂美颜，帮助老师轻松出镜，自信开课。</p>
            <img class="mobile-img-5" src="https://j.weizan.cn/zhibo/microcourse/images/mobile/mobile-img-5.png"/>
        </div>
        <div class="advert-box">
            <h1>一分钟创造自己的<br/>在线课堂</h1>
            <p>让知识传播更简单</p>
            <a-button class="buildclass" @click="goDownLoad">立即下载</a-button>
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/common/MobileHeader.vue';
import { mapGetters } from "vuex"
export default {
    data(){
        return {

        }
    },
    components: {
        MobileHeader
    },
    computed: {
        ...mapGetters(['generalInfo']),
    },
    methods: {
        goDownLoad(){
            window.location.href=this.generalInfo.DownAppTreasureURI;
        }
    }
}
</script>

<style lang="less" scoped>
.mobile-index{
    background: #F6F7F8;
    .header-bg{
        width: 100%;
        height: 9.6rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        background: url('https://j.weizan.cn/zhibo/microcourse/images/mobile/banner-bg.png') no-repeat center center;
        background-size: cover;
        .header-title{
            color: #fff;
            font-size: 0.66rem;
            font-weight: bold;
        }
        .header-subtitle{
            color: #DCD4D0;
            font-size: 0.28rem;
        }
        .build-btn{
            width: 3.6rem;
            height: 1rem;
            color: #252525;
            font-size: 0.28rem;
            font-weight: bold;
            border: none;
            margin-top: 2.62rem;
            margin-bottom: 1.54rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
            border-radius: 0.5rem;
        }
    }
    .model-box{
        position: relative;
        z-index: 9;
        width: 100%;
        margin-top: -0.33rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.66rem 0 0.33rem;
        background: linear-gradient(180deg, #FFFFFF 0%, #F5F6F7 100%);
        border-radius: 0.36rem 0.36rem 0 0;
        &>h2{
            padding: 0 0.3rem;
            font-size: 0.48rem;
            font-weight: bold;
            color: #27292E;
            margin-top: 0.4rem;
        }
        &>h3{
            padding: 0 0.3rem;
            font-size: 0.38rem;
            font-weight: bold;
            color: #27292E;
        }
        &>p{
            padding: 0 0.3rem;
            color: #919499;
            font-size: 0.28rem;
            text-align: center;
        }
        .mobile-img-1{
            width: 6.9rem;
            margin-top: 0.48rem;
            margin-bottom: 1rem;
        }
        .mobile-img-2{
            width: 100%;
        }
        .mobile-img-3{
            width: 100%;
            margin-top: -0.5rem;
            margin-bottom: 0.3rem;
        }
        .mobile-img-4{
            width: 100%;
            margin-top: -0.5rem;
        }
        .mobile-img-5{
            width: 100%;
        }
    }
    .advert-box{
        position: relative;
        width: 100%;
        height: 8.3rem;
        margin-top: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        background: url(https://j.weizan.cn/zhibo/microcourse/images/mobile/advert-bg.png) no-repeat center center;
        background-size: cover;
        h1{
            font-size: 0.54rem;
            font-weight: bold;
            color: #252525;
        }
        p{
            color: #353535;
            font-size: 0.28rem;
            margin-bottom: 0.8rem;
        }
        button{
            width: 3.6rem;
            height: 1rem;
            color: #252525;
            font-size: 0.28rem;
            margin-bottom: 0.86rem;
            border: none;
            background: linear-gradient(90deg, #FFFFFF 0%, #FFE29C 100%);
            border-radius: 0.5rem;
        }
    }
}
</style>