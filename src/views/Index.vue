<template>
    <div class="page-index" @mouseup='mouseup($event)'>
        <div class="header-bg">
            <img src="https://j.weizan.cn/zhibo/microcourse/images/banner-bg.png?v=20201028">
        </div>
        <div class="header-box" ref="time" :style="`height:${screenHeight}px`">
            <headers current="index"></headers>
            <h1 class="header-title" data-aos="fade-up" data-aos-delay="300">让知识传播更有价值</h1>
            <p class="header-subtitle" data-aos="fade-up" data-aos-delay="350">
                <!-- <span>全新一代在线互动课堂教学工具，整合多人连麦，在线教学，教务管理，招生营销等功能于一体，致力于为您提供</span>
                <span>一个低成本，高效率做在线教育的一站式解决工具。</span> -->
                <span>-  专属在线互动教学课堂，一键创建  -</span>
            </p>
            <a-button class="build-btn" data-aos="fade-up" data-aos-delay="400" @click="goPcBackstage">
                <span>创建在线课堂</span>
                <img src="https://j.weizan.cn/zhibo/microcourse/images/right_arrow.png"/>
            </a-button>
            <div class="slide-tips">
                <div class="arrow-icon d-flex flex-dircol" :style="IsIE&&'background-image:none;color:#fff;'">
                    <span>︿</span>
                    <span>︿</span>
                </div>
                <p :style="IsIE&&'background-image:none;color:#fff;'">上滑查看更多</p>
            </div>
        </div>
        <div class="body-box">
            <h2 class="main-title" data-aos="fade-up">知播在线互动课堂</h2>
            <p class="main-desc" data-aos="fade-up" data-aos-delay="200">以高效，正确地帮助教育培训机构或老师，解决多种培训教育场景</p>
            <div class="main-content-0 d-flex ali-cen">
                <img class="bg-1" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-1.png"/>
                <div class="case-box case-bg-1"><span>家教辅导</span></div>
                <div class="case-box case-bg-2"><span>绘画教育</span></div>
                <div class="case-box case-bg-3"><span>钢琴陪练</span></div>
                <div class="case-box case-bg-4"><span>语数英教学</span></div>
                <div class="case-box case-bg-5"><span>企业内部培训</span></div>
            </div>
            <img class="bg-2" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-2.png?v=1"/>
            <div class="main-content-1 d-flex ali-cen">
                <div class="main-img-box-1">
                    <img class="img-1" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-1.png"  data-aos="fade-up" data-aos-delay="200"/>
                    <img class="img-2" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-2.png" data-aos="fade-up" data-aos-delay="400"/>
                    <img class="img-3" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-3.png" data-aos="fade-up" data-aos-delay="600"/>
                    <img class="img-4" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-4.png" data-aos="fade-up" data-aos-delay="800"/>
                </div>
                <div class="describe-box d-flex flex-dircol">
                    <img class="desc-icon" src="https://j.weizan.cn/zhibo/microcourse/images/desc-icon-1.png"/>
                    <h4 class="small-title" data-aos="fade-up" data-aos-delay="100">课堂多人视频互动<br/>画质流畅稳定</h4>
                    <p class="sub-desc" data-aos="fade-up" data-aos-delay="300">老师电脑客户端授课，学生App上课，充分保障了课堂互动的真实，在弱网下也能流畅上课，保证教学效果</p>
                </div>
            </div>
            <div class="main-content-2 d-flex ali-end">
                <div class="describe-box d-flex flex-dircol">
                    <img class="desc-icon" src="https://j.weizan.cn/zhibo/microcourse/images/desc-icon-2.png"/>
                    <h4 class="small-title" data-aos="fade-up" data-aos-delay="100">
                        屏幕共享<br/>授课灵活自由
                        <img class="bg-3" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-3.png?v=1"/>
                    </h4>
                    <p class="sub-desc" data-aos="fade-up" data-aos-delay="300">屏幕一键共享，老师示范更方便，授课更灵活</p>
                </div>
                <div class="main-img-box-2">
                    <img class="img-5" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-5.png?v=1" data-aos="fade-up" data-aos-delay="200"/>
                    <img class="img-6" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-6.png?v=1" data-aos="fade-up" data-aos-delay="400"/>
                    <img class="img-7" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-7.png?v=1" data-aos="fade-up" data-aos-delay="600"/>
                </div>
            </div>
            <div class="main-content-3 d-flex ali-end">
                <div class="main-img-box-3">
                    <img class="img-8" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-8.png?v=1" data-aos="fade-up" data-aos-delay="200"/>
                    <img class="img-9" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-9.png?v=1" data-aos="fade-up" data-aos-delay="400"/>
                </div>
                <div class="describe-box d-flex flex-dircol">
                    <img class="desc-icon" src="https://j.weizan.cn/zhibo/microcourse/images/desc-icon-3.png"/>
                    <h4 class="small-title" data-aos="fade-up" data-aos-delay="100">多格式课件演示<br/>课堂内容更生动</h4>
                    <p class="sub-desc" data-aos="fade-up" data-aos-delay="300">支持视频，图片，PDF，Word，PPT等主流文档演示丰富画笔工具，讲到哪画到哪，重点知识统统圈起来</p>
                </div>
            </div>
            <div class="main-content-4 d-flex ali-center">
                <div class="describe-box d-flex flex-dircol juc-cen">
                    <img class="desc-icon" src="https://j.weizan.cn/zhibo/microcourse/images/desc-icon-4.png"/>
                    <h4 class="small-title" data-aos="fade-up" data-aos-delay="100">直播美颜<br/>让老师授课更舒心</h4>
                    <p class="sub-desc" data-aos="fade-up" data-aos-delay="300">人性化，灵活度高的课堂美颜，帮助老师轻松出镜，自信开课。</p>
                </div>
                <div class="main-img-box-4">
                    <!-- <img class="bg-4" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-bg-3.png"/> -->
                    <img class="img-10" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-10.png?v=1" data-aos="fade-up" data-aos-delay="600"/>
                    <div ref="beautyBox" class="beauty-img-box" data-aos="fade-up" data-aos-delay="800">
                        <img style="width:100%;height:100%;" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-11.png?v=1"/>
                        <img ref="sildeBtn" class="silde-btn" src="https://j.weizan.cn/zhibo/microcourse/images/silde-btn.png" @mousedown="mousedown($event)" />
                        <div ref="sildeBox" class="silde-box">
                            <img class="silde-beauty-img" src="https://j.weizan.cn/zhibo/microcourse/images/main-content-img-12.png?v=1"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="advert-box"> 
            <div class="advert-bg">
                <img src="https://j.weizan.cn/zhibo/microcourse/images/advert-bg.png?v=20201027"/>
            </div>
            <div class="container">
                <h1 data-aos="fade-up" data-aos-delay="300">一分钟创建专属<br/>在线互动课堂</h1>
                <p data-aos="fade-up" data-aos-delay="350">让知识传播更简单</p>
                <a-button class="buildclass" @click="goPcBackstage" data-aos="fade-up" data-aos-delay="400" v-html="buildtext"></a-button>
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
            buildtext: "创建在线课堂",
            IsIE: false
        }
    },
    components: {
        Headers,Footers
    },
    methods: {
        goPcBackstage(){
            try{
                window.analysis.log(0, 0, 1434, 1014, "","",11,"");
            }catch(err){ console.log(err) }
            if(location.origin.includes('localhost')){
                window.open('http://zhibo-dev.vzan.com/know/');
            }else{
              window.open(`${location.origin}/know/`);
            }
        },
        isIE(){
            if (!!window.ActiveXObject || "ActiveXObject" in window){
                return true;
            }else{
                return false;
            }
        },
        mousedown: function (event) {
            var event=event||window.event;
            var _target = event.target
            var startx=event.clientX;
            var sb_bkx=startx-event.target.offsetLeft;
            var ww=this.$refs.beautyBox.offsetWidth;
            if (event.preventDefault) {
                event.preventDefault();
            } else{
                event.returnValue=false;
            };
            this.$refs.beautyBox.onmousemove=(ev)=> {
                var event=ev||window.event;
                var _targetLeft=this.$refs.beautyBox.getBoundingClientRect().left;
                if (event.clientX < 0 || (event.clientX-_targetLeft) > ww) {
                    return false;
                };
                var endx=event.clientX-sb_bkx;
                _target.setAttribute('style', `left: ${endx}px !important`);
                this.$refs.sildeBox.setAttribute('style', `width: ${ww-endx-16}px !important`);
            }
        },
        mouseup: function (e) {
            this.$refs.beautyBox.onmousemove=null;
        }
    },
    mounted(){
        this.IsIE = this.isIE();
        this.buildtext = '<div><span>' + this.buildtext.split('').join('</span><span>') + '</span></div>';
        this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
		window.onresize = ()=> {
            this.$refs.sildeBtn.setAttribute('style', '');
            this.$refs.sildeBox.setAttribute('style', '');
		}
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
            &>span{
                transition: .6s;
                transform: translateX(20px);
            }
            &>img{
                width: 16px;
                height: 16px;
                padding: 12px;
                margin-left: 30px;
                background: #202124;
                border-radius: 50%;
                box-sizing: content-box;
                opacity: 0;
                transform: translateX(-15px);
                transition: .8s;
            }
        }
        .build-btn:hover{
            &>span{
                transform: translateX(0);
            }
            &>img{
                opacity: 1;
                transform: translateX(0);
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
                color: transparent;
                -webkit-background-clip: text;
                background-size: 100% 200%;
                animation: masked-animation-vertical 1s infinite linear;
                span{
                    margin: -7px 0;
                }
            }
            p{
                background-image: linear-gradient(to left, #fff 0%, rgba(255, 255, 255, 0.4) 50%,#fff 100%);
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
            margin-bottom: 15px;
        }
        .main-desc{
            color: #919499;
            font-size: 20px;
        }
        .main-content-0{
            position: relative;
            width: 1200px;
            padding: 53px 0 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .case-box{
                width: 224px;
                height: 260px;
                position: relative;
                span{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    font-size: 20px;
                }
            }
            .case-bg-1{
                background: url('https://j.weizan.cn/zhibo/microcourse/images/case-bg-1.png') no-repeat center center;
                background-size: cover;
            }
            .case-bg-2{
                background: url('https://j.weizan.cn/zhibo/microcourse/images/case-bg-2.png') no-repeat center center;
                background-size: cover;
            }
            .case-bg-3{
                background: url('https://j.weizan.cn/zhibo/microcourse/images/case-bg-3.png') no-repeat center center;
                background-size: cover;
            }
            .case-bg-4{
                background: url('https://j.weizan.cn/zhibo/microcourse/images/case-bg-4.png') no-repeat center center;
                background-size: cover;
            }
            .case-bg-5{
                background: url('https://j.weizan.cn/zhibo/microcourse/images/case-bg-5.png') no-repeat center center;
                background-size: cover;
            }
        }
        .describe-box{
            width: 460px;
            position: relative;
            .small-title{
                color: #252525;
                font-size: 40px;
                font-weight: bold;
                position: relative;
            }
            .sub-desc{
                color: #666;
                font-size: 18px;
                margin-bottom: 15px;
                line-height: 2;
                text-align: left;
            }
            .desc-icon{
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
            }
            .bg-3{
                position: absolute;
                left: 200px;
                bottom: -38px;
                width: 98px;
                height: 98px;
            }
        }
        .bg-1{
            position: absolute;
            left: -201px;
            top: -115px;
            width: 440px;
            // height: 440px;
        }
        .bg-2{
            position: absolute;
            right: 0;
            top: 900px;
            width: 253px;
            // height: 494px;
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
                // height: 555px;
            }
            .img-2{
                position: absolute;
                left: 113px;
                top: 0;
                width: 729px;
                // height: 338px;
            }
            .img-3{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 440px;
                // height: 480px;
            }
            .img-4{
                position: absolute;
                right: -10px;
                bottom: 20px;
                width: 420px;
                // height: 330px;
            }
        }
        .main-img-box-2{
            position: relative;
            width: 1085px;
            height: 629px;
            margin-left: -170px;
            margin-right: -120px;
            margin-bottom: -40px;
            .img-5{
                position: absolute;
                left: 205px;
                top: 170px;
                width: 740px;
                // height: 555px;
            }
            .img-6{
                position: absolute;
                left: 0;
                top: 0;
                width: 639px;
                // height: 369px;
            }
            .img-7{
                position: absolute;
                right: 0;
                bottom: 0;
                width: 554px;
                // height: 360px;
            }
        }
        .main-img-box-3{
            position: relative;
            width: 940px;
            height: 706px;
            margin-left: -106px;
            margin-top: 70px;
            margin-bottom: -140px;
            .img-8{
                position: absolute;
                left: 40px;
                top: 66px;
                width: 900px;
                // height: 555px;
            }
            .img-9{
                position: absolute;
                left: 0;
                top: 0;
                width: 526px;
                // height: 482px;
            }
        }
        .main-content-4{
            padding: 180px 0 150px;
            .main-img-box-4{
                position: relative;
                width: 704px;
                height: 462px;
                margin-left: 20px;
                .img-10{
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 3;
                    width: 196px;
                }
                .beauty-img-box{
                    position: absolute;
                    left: 164px;
                    top: 21px;
                    width: 540px;
                }
                .silde-btn{
                    position: absolute;
                    left: 252px;
                    top: 12px;
                    z-index: 6;
                    width: 36px;
                    height: 24px;
                    cursor: pointer;
                }
                .silde-box{
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2;
                    width: 270px;
                    height: 100%;
                    overflow: hidden;
                    border-left: 3px solid rgba(255,255,255,0.5);
                    .silde-beauty-img{
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 540px;
                        height: 100%;
                    }
                }
            }
        }
    }
    .advert-box{
        position: relative;
        width: 100%;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .advert-bg{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                height: 100%;
            }
        }
        .container{
            position: relative;
            z-index: 2;
        }
        h1{
            font-size: 60px;
            font-weight: bold;
            color: #252525;
        }
        p{
            color: #353535;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 50px;
        }
        button{
            width: 195px;
            height: 66px;
            color: #252525;
            font-size: 16px;
            border: none;
            background: linear-gradient(90deg, #FFFFFF 0%, #FFE29C 100%);
            border-radius: 35px;
        }
    }
}
</style>