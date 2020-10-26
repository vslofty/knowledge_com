<template>
  <div class="msg_box f fv">
    <p class="title f34 mainColor f fc fc-h">{{ msgTip.title }}</p>
    <div class="tc" :class="extraCalss" v-if="msgTip.message">
      {{ msgTip.message }}
    </div>
    <slot></slot>
    <div class="bottom f f34 c666">
      <div
        class="bottom_btn f1 f fc fc-h"
        v-if="msgTip.type === 'confirm'"
        @click="mutate('cancel')"
      >
        {{ msgTip.cancelText }}
      </div>
      <div
        class="bottom_btn confirm_btn f1 f fc fc-h"
        @click="mutate('confirm')"
      >
        {{ msgTip.confirmText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgBox",
  props: {
    extraCalss: String,
    show: Boolean,
    msgTip: Object
  },
  data() {
    return {};
  },
  methods: {
    mutate(type) {
      // console.log(type);
      this.$emit(type)
    }
  }
};
</script>

<style scoped lang="less">
.msg_box {
  width: 5.4rem;
  .title {
    height: 1.12rem;
    font-weight: bold;
  }
  .bottom {
    height: 1rem;
    .bottom_btn {
      background: #edeff2;
    }
    .confirm_btn {
      background: #f5c076;
      color: #333440;
    }
  }
}
</style>
