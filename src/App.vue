<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { getLocal } from '@/utils/utils';
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import CommonAjax from "@/utils/http/modules/common.request.js";
import muTypes from "@/store/mutation-types.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      zhCN,
    };
  },
  methods: {
    async getGeneral(){
      try{
        let res = await CommonAjax.getGeneral();
        this.updateGeneralInfo(res.dataObj);
      } catch(error){
        error && this.$antdMessage.error(error);
      }
    },
    ...mapMutations({
      updateGeneralInfo: muTypes.generalInfo,
    }),
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
            window.open(`http://localhost:8081/know/index.html#/class/${tokenInfo.LiveId}`);
            // location.href = `http://localhost:8081/know/#/class/${tokenInfo.LiveId}`;
          }else{
            window.open(`${location.origin}/know/index.html#/class/${tokenInfo.LiveId}`);
          }
        }else if(type=='build'){
          if(location.origin.includes('localhost')){
            window.open(`http://localhost:8081/know/index.html#/class/add/${tokenInfo.LiveId}`);
            // location.href = `http://localhost:8081/know/#/class/add/${tokenInfo.LiveId}`;
          }else{
            window.open(`${location.origin}/know/index.html#/class/add/${tokenInfo.LiveId}`);
          }
        }
      }else{
        if(location.origin.includes('localhost')){
          window.open('http://localhost:8081/know/');
          // location.href = 'http://localhost:8081/know/';
        }else{
          window.open(`${location.origin}/know/`);
        }
      }
    },
  },
  mounted(){
    try{
      window.analysis.log(0, 0, 1434, 1015, "","",11,"");
    }catch(err){ console.log(err) }
    this.getGeneral();

    this.$bus.$off("jump");
    this.$bus.$on("jump", (type) => {
      this.goPcBackstage(type);
    });
  }
}
</script>