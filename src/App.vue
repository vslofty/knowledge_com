<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
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
  },
  mounted(){
    try{
      window.analysis.log(0, 0, 1434, 1015, "","",11,"");
    }catch(err){ console.log(err) }
    this.getGeneral();
  }
}
</script>