<template>
  <div class="abnor_box f fv fc fc-h ph20" :class="show ? 'abs' : 'rel'">
    <img class="abnor__image" v-if="abnorImg" :src="abnorImg" />
    <div class="abnor__text f14 c909" v-if="abnorTit">{{ abnorTit }}</div>
    <div class="abnor__tip f12 c606" v-if="abnorTip">{{ abnorTip }}</div>
    <div class="abnor__btn" v-if="abnorBtn" @click="emitAbnorTap">
      {{ abnorBtn }}
    </div>
  </div>
</template>

<script>
import _config from "@/lib/config";
export default {
  name: "Abnor",
  props: {
    show: Boolean,
    type: String,
    image: String,
    title: String,
    tip: String,
    button: String
  },
  data() {
    return {
      abnorImg: "",
      abnorTit: "",
      abnorBtn: "",
      abnorTip: ""
    };
  },
  mounted() {
    if (this.type && _config.default[this.type]) {
      this.abnorImg = this.image || _config.default[this.type].image;
      this.abnorTit = this.title || _config.default[this.type].title;
      this.abnorBtn = this.button || _config.default[this.type].button;
      this.abnorTip = this.tip || _config.default[this.type].tip;
    }
  },
  methods: {
    emitAbnorTap(event) {
      var detail = event.detail;
      var option = {};
      this.$emit("abnortap", detail, option);
    }
  }
};
</script>

<style scoped lang="less">
.abnor_box {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 270px;
  background: transparent;
  .abnor__image {
    width: 140px;
    background: transparent no-repeat;
    background-size: cover;
    margin: 20px auto;
  }
  .abnor__text {
    text-align: center;
    line-height: 1.5;
  }
  .abnor__tip {
    margin-top: 20rpx;
  }
  .abnor__btn {
    min-width: 218px;
    height: 86px;
    line-height: 86px;
    margin-top: 30px;
    padding: 0 30px;
    border: 0 none;
    border-radius: 10px;
    color: #fff;
    font-size: 32px;
    text-align: center;
    overflow: hidden;
  }
  .abnor__btn:active {
    background-color: #f5456e;
  }
}
</style>
