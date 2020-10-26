<template>
  <div class="sidebar">
    <div class="d-flex flex-dircol">
      <img src="http://j.weizan.cn/zhibo/microcourse/imgs/zb-logo.png" style="display:block;width:163px;margin:32px auto 5px;"/>
      <p style="color: #838383;font-size: 14px;text-align:center;">知播-让知识传播更有价值</p>
      <ul>
        <li class="main_menu">直播课堂</li>
        <li class="active">
          <router-link :to="`/class/${zbid}`">
            <img src="http://j.weizan.cn/zhibo/microcourse/imgs/class-manage-icon.png"/>课节管理
          </router-link>
        </li>
      </ul>
    </div>
    <div class="d-flex flex-dircol ali-cen online-custom-box">
      <a target="_blank" href="https://zanshang.kf5.com/kchat/45235?from=在线支持&group=0" class="online-custom d-flex ali-cen juc-cen"><img src="http://j.weizan.cn/zhibo/microcourse/imgs/online-custorm-icon.png"/>在线客服</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      items: []
    };
  },
  computed: {
    ...mapGetters(['zbid','liveInfo']),
  },
  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar ul{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  li{
    width: 100%;
    height: 60px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img{
      width: 24px;
      margin-right: 2px;
    }
    &.active{
      background: #FEFBEA;
      color: #FFA800;
    }
    &.active::after{
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 3px;
      height: 60px;
      background: #FFA800;
    }
  }
  .main_menu{
    height: 110px;
    color: #000;
    font-size: 22px;
  }
}
.sidebar ul::-webkit-scrollbar {
  width: 0;
}
.nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  position: relative;
  img {
    position: absolute;
    left: 12px;
    top: 12px;
    transition: 0.5;
    opacity: 0;
  }
  .show {
    opacity: 1;
  }
}
.online-custom-box{
  .online-custom{
    width: 136px;
    height: 46px;
    border-radius: 25px;
    border: 1px solid #6C6964;
    font-size: 14px;
    color: #414141;
    margin-bottom: 22px;
    img{
      width: 18px;
      margin-right: 4px;
    }
  }
}

</style>
