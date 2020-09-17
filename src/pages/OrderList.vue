<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请确认填写收货地址</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="showLoading"></loading>
          <div class="order" v-for="(item,index) in orderList" :key="index" v-else>
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                {{item.orderNo}}
                <span>|</span>
                在线支付
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(subItem,subIndex) in item.orderItemVoList"
                  :key="subIndex"
                >
                  <div class="good-img">
                    <img
                      src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4c87947d104ee5833913e4c520108f16.jpg"
                      v-lazy="subItem.productImage"
                    />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{subItem.productName}}</div>
                    <div class="p-money">{{subItem.currentUnitPrice}} x {{subItem.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
          <no-data v-if="!showLoading && orderList.length==0"></no-data>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <service-bar />
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import ServiceBar from "./../components/ServiceBar";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";

export default {
  components: { OrderHeader, ServiceBar, Loading, NoData },

  data() {
    return {
      orderList: [],
      showLoading: true,
      pageNum: 1,
      total: 0,
    };
  },
  mounted() {
    this.initOrderList();
  },
  methods: {
    initOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize: 2,
            pageNum: this.pageNum,
          },
        })
        .then((res) => {
          this.orderList = res.data.list;
          this.showLoading = false;
          this.total = res.data.total;
        });
    },
    handleCurrentChange: function (val) {
      this.pageNum = val;
      this.initOrderList();
    },
  },
};
</script>

<style lang="scss">
@import "./../../public/scss/mixin.scss";
@import "./../../public/scss/config.scss";

.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>