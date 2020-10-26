<template>
  <div>
    <menu-slider></menu-slider>
    <div class="content-box">
      <os-header :info="liveInfo"></os-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuSlider from "@/common/MenuSlider";
import osHeader from "@/common/OsHeader";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  components: {
    menuSlider,
    osHeader
  },
  computed: {
    ...mapGetters(['liveInfo'])
  },
};
</script>

<style lang="less" scoped>
</style>