<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <div class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(subItem,subIndex) in item" :key="subIndex">
                    <a :href="subItem?'/#/product/'+subItem.id:''">
                      <img :src="subItem?subItem.img:'/imgs/item-box-1.png'" alt />
                      {{subItem?subItem.name : '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children"></div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children"></div>
            </li>
          </div>
        </div>
        <swiper v-if="sliderList && sliderList.length > 0" ref="mySwiper" :options="swiperOption">
          <swiper-slide v-for="(item,index) in sliderList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrap">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.png'" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(item, index) in phoneList" :key="index">
              <div class="item" v-for="(subItem,subIndex) in item" :key="subIndex">
                <span :class="{'new-pro':subIndex%2==0}">新品</span>
                <div class="item-img" @click="jumpProduct(subItem.id)">
                  <img v-lazy="subItem.mainImage" />
                </div>
                <div class="item-info">
                  <h3>{{subItem.name}}</h3>
                  <p>{{subItem.subtitle}}</p>
                  <p class="price" @click="addCart(subItem.id)">{{subItem.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goCart"
      @cancel="showModal=false"
    >
      <template v-slot:body>
        <p>添加购物车成功</p>
      </template>
    </modal>
  </div>
</template>

<script >
import "swiper/swiper-bundle.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ServiceBar from "./../components/ServiceBar";
import Modal from "./../components/Modal";

export default {
  name: "nav-index",
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        effect: "cube",
        cubeEffect: {
          slideShadows: false,
          shadow: false,
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        },
      },
      sliderList: [
        {
          id: "42",
          img: "/imgs/slider/slide-1.png",
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.png",
        },
        {
          id: "44",
          img: "/imgs/slider/slide-3.png",
        },
        {
          id: "46",
          img: "/imgs/slider/slide-4.png",
        },
        {
          id: "47",
          img: "/imgs/slider/slide-5.png",
        },
      ],
      menuList: [
        [
          {
            id: 30,
            img: "/imgs/item-box-1.png",
            name: "小米CC9",
          },
          {
            id: 31,
            img: "/imgs/item-box-2.png",
            name: "小米8青春版",
          },
          {
            id: 32,
            img: "/imgs/item-box-3.png",
            name: "Redmi K20 Pro",
          },
          {
            id: 33,
            img: "/imgs/item-box-4.png",
            name: "移动4G专区",
          },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        { id: 33, img: "/imgs/ads/ads-1.png" },
        { id: 48, img: "/imgs/ads/ads-2.png" },
        { id: 45, img: "/imgs/ads/ads-3.png" },
        { id: 47, img: "/imgs/ads/ads-4.png" },
      ],
      phoneList: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
      ],
      showModal: false,
    };
  },
  components: { ServiceBar, swiper, swiperSlide, Modal },
  mounted() {
    this.init();
  },
  methods: {
    handleClickSlide() {
      console.log("handleClickSlide");
    },
    init() {
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          res.list = res.data.list.slice(6, 14);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
        });
    },
    addCart(id) {
      this.axios
        .post("/carts", {
          productId: id,
          selected: true,
        })
        .then(() => {
          this.showModal = true;
        })
        .catch(() => {
          this.$router.push("/index");
        });
    },
    goCart() {
      this.$router.push("/cart");
    },
    jumpProduct(id) {
      this.$router.push("/product/" + id);
    },
  },
};
</script>

<style lang='scss'>
@import "./../../public/scss/mixin.scss";
@import "./../../public/scss/config.scss";
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      z-index: 2;
      width: 264px;
      height: 451px;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          // position: relative;
          a {
            font-size: 16px;
            color: #fff;
            padding-left: 30px;
            position: relative;
            display: block;
            &:after {
              content: "";
              position: absolute;
              right: 30px;
              top: 17.5px;
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: #ff6600;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        // border: 5px solid red;
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    margin-top: 14px;
    margin-bottom: 31px;
    @include flex();
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      color: $colorB;
      height: 21px;
      line-height: 21px;
      font-size: $fontF;
      margin-bottom: 20px;
    }
    .wrap {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: #fff;
            text-align: center;
            span {
              display: inline-block;
              font-size: 14px;
              width: 67px;
              height: 24px;
              line-height: 24px;
              color: #fff;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                height: 195px;
                // height: 100%;
                width: 100%;
              }
            }
            .item-info {
              h3 {
                font-size: 14px;
                color: #333;
                line-height: 14px;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &::after {
                  content: "";
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>