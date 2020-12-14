import types from "./mutation-types.js";

export default {
  [types.generalInfo](state, data) {
    state.generalInfo = data;
  },
  [types.token](state, data) {
    console.log('mutation',data)
    state.token = data;
  },
};
