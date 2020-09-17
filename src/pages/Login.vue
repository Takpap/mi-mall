<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form" @keydown.enter="login">
          <h3>
            <span class="checked">账号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="login">手机短信登录/注册</div>
            <div class="reg">
              立刻注册
              <span>|</span>忘记密码?
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="foot-link">
        <a href="javascript:;">主页</a>
        <a href="javascript:;">Vue全家桶课程</a>
        <a href="javascript:;">React全家桶课程</a>
        <a href="javascript:;">微信全家桶课程</a>
      </div>
      <div class="copyright">Copyright @2020 mi.futurefe.com All Rights Reverved</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    login() {
      let { username, password } = this;
      this.axios
        .post("/user/login", {
          username,
          password,
        })
        .then((res) => {
          this.$store.dispatch("saveUsername", res.data.username);
          this.$cookie.set("userId", res.data.id, { expires: "1M" });
          this.$router.push("/#/index");
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang='scss' >
@import "./../../public/scss/base.scss";
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.png") no-repeat center;
    .container {
      height: 576px;
    }
    .login-form {
      box-sizing: border-box;
      padding-left: 31px;
      padding-right: 31px;
      width: 410px;
      height: 510px;
      background-color: #fff;
      position: absolute;
      right: 0;
      bottom: 29px;
      h3 {
        line-height: 23px;
        font-size: 24px;
        text-align: center;
        margin: 40px auto 49px;
        .checked {
          color: #ff6600;
        }
        .sep-line {
          margin: 0 32px;
        }
      }
      .input {
        display: inline-block;
        width: 348px;
        height: 50px;
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          padding: 18px;
        }
      }
      .btn {
        width: 100%;
        line-height: 50px;
        margin-top: 10px;
        font-size: 16px;
      }
      .tips {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .sms {
          color: #ff6600;
        }
        .reg {
          color: #999;
          span {
            margin: 0 7px;
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999;
    font-size: 16px;
    text-align: center;
    .foot-link {
      a {
        color: #999;
        display: inline-block;
      }
      span {
        margin: 0 auto;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>