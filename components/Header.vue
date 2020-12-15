<template>
  <div class="header" :class="showwhitebg&&'white-bg'" :style="headerbgcolor">
    <nuxt-link to="/" class="logo">
      <img src="https://j.weizan.cn/zhibo/microcourse/images/logo.png" class="logo" v-if="show&&!showwhitebg"/>
      <img src="https://j.weizan.cn/zhibo/microcourse/images/logo-black.png" class="logo" v-else/>
    </nuxt-link>
    <ul class="nav">
      <li :class="(current=='index')&&'active'"><nuxt-link to="/" :style="headercolor">首页</nuxt-link></li>
      <li :class="(current=='download')&&'active'"><nuxt-link to="/home/download/" :style="headercolor">下载中心</nuxt-link></li>
      <li :class="(current=='help')&&'active'"><nuxt-link to="/home/helpcenter/" :style="headercolor">帮助文档</nuxt-link></li>
      <li :class="(current=='feedback')&&'active'"><nuxt-link to="/home/feedback/?type=1000" :style="headercolor">产品反馈</nuxt-link></li>
    </ul>
    <div class="header-btn-group">
      <!-- <a class="btn1 onlinecusmter" target="_blank" :href="generalInfo&&generalInfo.CustomServiceURI" v-html="onlinetext"></a> -->
      <a-button class="btn2 freeuse" @click="goPcBackstage('login')" v-html="freeusetext"></a-button>
    </div>
  </div>
</template>

<script>
// import config from '@/config';
import { getLocal } from '@/assets/utils/utils';
import { mapGetters } from "vuex"

export default {
  props: {
    current: String,
    showwhitebg: Boolean
  },
  data() {
    return {
      headerbgcolor: "",
      headercolor: "",
      show: true,
      onlinetext: "在线客服",
      freeusetext: "登录注册",
    };
  },
  computed: {
    ...mapGetters(['generalInfo']),
  },
  created(){
    this.onlinetext = '<div><span>' + this.onlinetext.split('').join('</span><span>') + '</span></div>';
    this.freeusetext = '<div><span>' + this.freeusetext.split('').join('</span><span>') + '</span></div>';
  },
  methods: {
    // 跳转pc后台
    goPcBackstage(type){
      try{
          window.analysis.log(0, 0, 1434, 1014, "","",11,"");
      }catch(err){ console.log(err) }
      
      const tokenInfo = getLocal('TokenInfo');
      console.log(tokenInfo)
      if(tokenInfo&&tokenInfo.TokenExpires&&(new Date().getTime()<new Date(tokenInfo.TokenExpires).getTime())){
        if(type=='login'){
          if(location.origin.includes('localhost')){
            window.open(`http://zhibo-test.vzan.com/know/index.html#/class/${tokenInfo.LiveId}`);
          }else{
            window.open(`${location.origin}/know/index.html#/class/${tokenInfo.LiveId}`);
          }
        }else if(type=='build'){
            if(location.origin.includes('localhost')){
                window.open(`http://zhibo-test.vzan.com/know/index.html#/class/add/${tokenInfo.LiveId}`);
            }else{
                window.open(`${location.origin}/know/index.html#/class/add/${tokenInfo.LiveId}`);
            }
        }
      }else{
        if(location.origin.includes('localhost')){
            window.open('http://zhibo-test.vzan.com/know/');
        }else{
            window.open(`${location.origin}/know/`);
        }
      }
    },
    headerScroll(){
      if(this.showwhitebg) return;
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if(this.scroll>100){
        this.headerbgcolor="background:rgba(255,255,255,1)";
        this.headercolor="color:rgba(0,0,0,1)";
        this.show = false;
        return;
      }else{
        this.headerbgcolor=`background:rgba(255,255,255,${this.scroll/100})`;
        if(this.scroll<50){
          this.headercolor=`color:rgba(255,255,255,${1-(this.scroll/100)+0.5})`;
          this.show = true;
        }else{
          this.headercolor=`color:rgba(0,0,0,${1-(this.scroll/100)+0.5})`;
          this.show = false;
        }
      }
    },
  },
  mounted(){
    window.addEventListener('scroll', this.headerScroll)
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  min-width: 800px;
  height: 60px;
  padding: 0 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #000;
  .logo{
    width: 95px;
  }
  .nav{
    display: flex;
    margin: 0;
    li{
      height: 100%;
      font-size: 16px;
      padding: 0 40px;
      list-style: none;
      a,span{
        color: #fff;
        cursor: pointer;
      }
      &:hover>a,
      &:hover>span{
        color: #FFA800!important;
      }
      &.active>a,
      &.active>span{
        position: relative;
        font-weight: 800;
        color: #FFA800!important;
        &::after{
          content: "";
          position: absolute;
          left: 50%;
          bottom: -8px;
          padding: 0 8px;
          transform: translateX(-50%);
          height: 2px;
          background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
          border-radius: 1px;
        }
      }
    }
  }
  .header-btn-group{
    button,a{
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 96px;
      height: 40px;
      font-size: 14px;
      border: none;
      border-radius: 35px;
      margin-left: 20px;
    }
    .btn1{
      color: #FFA802;
      background: #252525;
    }
    .btn2{
      color: #252525;
      background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
    }
  }
}

.white-bg{
  background: #fff;
  border-bottom: 1px solid #F5F6F7;
  .nav{
    li{
      a,span{
        color: #000;
      }
    }
  }
}
</style>
