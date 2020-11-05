import types from "./mutation-types.js";

export default {
  [types.generalInfo](state, data) {
    state.generalInfo = data;
  },
};
