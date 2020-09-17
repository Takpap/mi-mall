
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;">
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="/#/login" v-if="!username" @click="login">登录</a>
            <a href="javascript:;" v-if="username" @click="logout">退出</a>
            <a href="/#/order/list" v-if="username">我的订单</a>
          </a>
          <a href="/#/cart" class="my-cart">
            <span class="icon-cart" />
            购物车({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a href="/#/product/31" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>小米电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-1.png" alt />
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.png" alt />
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt />
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.png" alt />
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.png" alt />
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt />
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrap">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneList: [],
    };
  },
  methods: {
    getPhoneList() {
      this.axios.get("/products?categoryId=100012&pageSize=6").then((res) => {
        this.phoneList = res.data.list;
      });
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$cookie.set("userId", "", { expires: "-1" });
        this.$store.dispatch("saveCartCount", "0");
        this.$store.dispatch("saveUsername", "");
        this.$message.success("退出登录成功!");
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = {}) => {
        this.$store.dispatch("saveCartCount", res.data);
      });
    },
  },
  mounted() {
    this.getPhoneList();
    this.$router.beforeEach((to, from, next) => {
      // 如果是去个人中心页，要确认本地存储是否有token
      if (from.path == "/login" && to.path === "/index") {
        this.axios.get("/carts/products/sum").then((res = {}) => {
          this.$store.dispatch("saveCartCount", res.data);
        });
      }
      // 放行。这里一定要有next()否则无法进行下一步操作
      next();
    });
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
    username() {
      return this.$store.state.username;
    },
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return "￥" + val.toFixed(2) + "元";
    },
  },
};
</script>

<style lang='scss' >
@import "./../../public/scss/base.scss";
@import "./../../public/scss/config.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    color: #b0b0b0;
    background-color: #333;
    .container {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          display: inline-block;
          width: 16px;
          height: 12px;
          background: url("/imgs/icon-cart-checked.png") no-repeat center;
          background-size: contain;
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .header-menu {
      display: inline-block;
      width: 643px;
      padding-left: 209px;
      .item-menu {
        display: inline-block;
        color: #333;
        font-weight: bold;
        font-size: 16px;
        line-height: 112px;
        margin-right: 20px;
        span {
          cursor: pointer;
        }
        &:hover {
          color: $colorA;
          .children {
            transition: height 0.5s ease;
            height: 220px;
            opacity: 1;
          }
        }
        .children {
          position: absolute;
          top: 112px;
          left: 0;
          width: 1226px;
          border-top: 1px solid #e5e5e5;
          height: 0;
          opacity: 0;
          overflow: hidden;
          background-color: #fff;
          transition: height 0.5s ease;
          box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.31);
          z-index: 10;
          .product {
            float: left;
            width: 16.6%;
            font-size: 12px;
            height: 220px;
            line-height: 12px;
            position: relative;
            text-align: center;
            a {
              display: inline-block;
              cursor: pointer;
            }
            img {
              height: 111px;
              width: auto;
              margin-top: 26px;
            }
            .pro-img {
              height: 137px;
            }
            .pro-name {
              font-weight: bold;
              margin-top: 19px;
              margin-bottom: 8px;
              color: $colorB;
              text-align: center;
            }
            .pro-price {
              color: $colorA;
              text-align: center;
            }
            &::before {
              content: "";
              position: absolute;
              top: 28px;
              right: 0;
              border-left: 1px solid $colorF;
              height: 100px;
              width: 1px;
            }
            &:last-child:before {
              border: none;
            }
          }
        }
      }
    }
    .header-search {
      width: 319px;
      .wrap {
        height: 50px;
        display: flex;
        align-items: center;
        input {
          border: none;
          border-right: 1px solid #e0e0e0;
          width: 264px;
          height: 50px;
          padding-left: 14px;
          box-sizing: border-box;
        }
        a {
          display: inline-block;
          width: 18px;
          height: 18px;
          background: url("/imgs/icon-search.png") no-repeat center;
          background-size: contain;
          margin-left: 17px;
        }
      }
    }
  }
}
</style>