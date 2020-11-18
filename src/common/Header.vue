<template>
  <div class="header" :class="showwhitebg&&'white-bg'" :style="headerbgcolor">
    <router-link to="/" class="logo">
      <img src="https://j.weizan.cn/zhibo/microcourse/images/logo.png" class="logo" v-if="show&&!showwhitebg"/>
      <img src="https://j.weizan.cn/zhibo/microcourse/images/logo-black.png" class="logo" v-else/>
    </router-link>
    <ul class="nav">
      <li :class="(!wrapCss&&current=='index')&&'active'"><router-link to="/" :style="headercolor">首页</router-link></li>
      <li :class="(!wrapCss&&current=='download')&&'active'"><router-link to="/download/" :style="headercolor">下载中心</router-link></li>
      <li :class="(!wrapCss&&current=='help')&&'active'"><router-link to="/help/0" :style="headercolor">帮助文档</router-link></li>
      <a-popover placement="bottom" trigger="click" :visible="feedVisible" @visibleChange="handleClickChange">
        <template slot="content">
          <feedback></feedback>
        </template>
        <li :class="wrapCss&&'active'"><span :style="headercolor">产品反馈</span></li>
      </a-popover>
      
    </ul>
    <div class="header-btn-group">
      <!-- <a class="btn1 onlinecusmter" target="_blank" :href="generalInfo&&generalInfo.CustomServiceURI" v-html="onlinetext"></a> -->
      <a-button class="btn2 freeuse" @click="goPcBackstage" v-html="freeusetext"></a-button>
    </div>

    <!-- <a-drawer width="448px" placement="right" :closable="false" :visible="feedVisible" @close="feedVisible=false">
      <feedback></feedback>
    </a-drawer> -->
  </div>
</template>

<script>
// import config from '@/config';
// import { removeLocal } from '@/utils/utils';
import { mapGetters } from "vuex"
import Feedback from '@/common/Feedback.vue'

export default {
  props: {
    current: String,
    showwhitebg: Boolean
  },
  components: {
    Feedback
  },
  data() {
    return {
      headerbgcolor: "",
      headercolor: "",
      show: true,
      onlinetext: "在线客服",
      freeusetext: "免费使用",
      feedVisible: false,
      wrapCss: ""
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
    // 打开反馈
    productFeedback(){
      this.$bus.$emit('clearfeedback',true);
      this.feedVisible = true;
    },
    handleClickChange(visible){
      this.feedVisible = visible;
    }
  },
  mounted(){
    window.addEventListener('scroll', this.headerScroll)
  },
  watch: {
    feedVisible: {
      deep: true,
      handler(val){
        if(val){
          this.wrapCss = "height:100vh;overflow:hidden;";
        }else{
          this.wrapCss = "";
        }
        this.$bus.$emit('fixedheight',this.wrapCss)
      }
    }
  }
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
