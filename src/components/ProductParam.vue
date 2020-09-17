<template>
  <div class="nav-bar" :class="{'productFixed':isFixed}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFixed: false,
    };
  },
  props: ["title"],
  // props: {
  //   title: { type: String },
  // },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  destroyed() {
    console.log("destroyed");
    window.removeEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let scrollTop = document.documentElement.scrollTop;
      this.isFixed = scrollTop > 150 ? true : false;
    },
  },
};
</script>

<style lang='scss'>
@import "./../../public/scss/base.scss";
@import "./../../public/scss/config.scss";
.nav-bar {
  z-index: 9;
  width: 100%;
  height: 70px;
  line-height: 70px;
  border: 1px solid #e5e5e5;
  transition: box-shadow 0.5s ease;
  &.productFixed {
    position: fixed;
    background-color: #fff;
    top: 0px;
    box-shadow: 0 5px 5px #ccc;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: 18px;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: 14px;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>