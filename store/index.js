import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";

Vue.use(Vuex);

export default ()=>{
  return new Vuex.Store({
    state,
    getters,
    mutations
  });
}
