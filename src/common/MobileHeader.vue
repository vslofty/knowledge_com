<template>
  <div class="mobile-header" :class="showwhitebg && 'white-bg'" :style="headerbgcolor">
    <router-link to="/mobile/" class="logo">
      <img
        src="https://j.weizan.cn/zhibo/microcourse/images/mobile/logo.png"
        class="logo"
        v-if="show && !showwhitebg"
      />
      <img src="https://j.weizan.cn/zhibo/microcourse/images/mobile/logo-black.png" class="logo" v-else/>
    </router-link>
    <img src="https://j.weizan.cn/zhibo/microcourse/images/mobile/menu-icon.png" class="menu-btn" v-if="show && !showwhitebg" @click="menuVisible=true" />
    <img src="https://j.weizan.cn/zhibo/microcourse/images/mobile/menu-black-icon.png" class="menu-btn" v-else @click="menuVisible=true" />

    <a-drawer wrapClassName="menu-box" width="100%" placement="top" :maskStyle="{'background':'transparent'}" :closable="false" height="5.46rem" :visible="menuVisible" @close="menuVisible=false">
        <div class="head">
            <img src="https://j.weizan.cn/zhibo/microcourse/images/mobile/logo.png" class="logo" />
            <img src="https://j.weizan.cn/zhibo/microcourse/images/mobile/close-menu-icon.png" class="menu-btn" @click="menuVisible=false" />
        </div>
      <ul class="nav">
        <li><router-link to="/mobile/help/">帮助文档</router-link></li>
        <li><router-link to="/mobile/feedback/?type=1000">产品反馈</router-link></li>
        <li @click="goDownLoad"><span>下载APP</span></li>
      </ul>
    </a-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    showwhitebg: Boolean,
  },
  data() {
    return {
      headerbgcolor: '',
      show: true,
      menuVisible: false,
    };
  },
  computed: {
    ...mapGetters(['generalInfo']),
  },
  methods: {
    goDownLoad() {
      window.location.href = this.generalInfo.DownAppTreasureURI;
    },
    headerScroll() {
      if (this.showwhitebg) return;
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scroll > 100) {
        this.headerbgcolor = 'background:rgba(255,255,255,1)';
        this.show = false;
        return;
      } else {
        this.headerbgcolor = `background:rgba(255,255,255,${this.scroll /
          100})`;
        if (this.scroll < 50) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    },
  },
  mounted() {
      window.addEventListener('scroll', this.headerScroll)
  },
};
</script>

<style lang="less" scoped>
.mobile-header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 0.88rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .logo {
    width: 1.06rem;
  }
  .menu-btn {
    width: 0.48rem;
    height: 0.48rem;
  }
}

.white-bg {
  background: #fff;
}
</style>
