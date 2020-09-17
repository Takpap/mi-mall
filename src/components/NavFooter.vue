
<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">主页</a>
      <span>|</span>
      <a href="javascript:;">VUE全家桶</a>
      <span>|</span>
      <a href="javascript:;">React全家桶</a>
      <span>|</span>
      <a href="javascript:;">Angular全家桶</a>
      <span>|</span>
      <a href="javascript:;">小程序全家桶</a>
      <span>|</span>
    </div>
    <div class="copyright">
      Copyright ©2020
      <span class="domain">mi.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  height: 234px;
  border-top: 4px solid #ff6600;
  background-color: #333;
  color: #999;
  font-size: 16px;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      display: inline-block;
      color: #999;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    .domain {
      color: #ff6600;
    }
  }
}
</style>