<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="" />
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods2.png" />
            <div class="item-msg">
              华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰
            </div>
          </li>
       
          <li class="cart-list-con4">
            <span class="price">5622.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">5622</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="" />
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods3.png" />
            <div class="item-msg">
              iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用
            </div>
          </li>
     
          <li class="cart-list-con4">
            <span class="price">11399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">11399</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// lodash节流
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartList"]),

    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },

    // 计算购买产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        // console.log(item);
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },

    // 是否全选
    isAllCheck() {
      // 判断底部的复选框是否勾选，当全部的商品都选中时它才勾选

      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },

    // 修改某一个产品的个数
    // async handler(type, disNum, cart) {
    //   // type是为了区分这三个元素
    //   // 目前的disNum形参：+变化量（1）   -变化量(-1)   input最终的个数（并不是变化量）
    //   // cart:判断是哪一个产品，chat身上有skuId
    //   // console.log('派发action，通知服务器修改产品个数',type,disNum,cart);

    //   switch (type) {
    //     // 加号
    //     case "add":
    //       // 带给服务器变化的量
    //       disNum = 1;
    //       break;
    //     case "minus":
    //       // 判断产品的个数大于1，才可以传递给服务器-1
    //       // if (cart.skuNum > 1) {
    //       //   disNum = -1;
    //       // } else {
    //       //   // 产品的个数小于等于1,传递给服务器的disNum=0
    //       //   disNum = 0;
    //       // }
    //       disNum = cart.skuNum > 1 ? -1 : 0;
    //       break;
    //     case "change":
    //       // 如果用户输入进来的量是非法的，disNum=0（也就是不变）
    //       if (isNaN(disNum) || disNum < 1) {
    //         disNum = 0;
    //       } else {
    //         disNum = parseInt(disNum) - cart.skuNum;
    //       }
    //   }

    //   // 派发action
    //   try {
    //     // 代表的是修改成功
    //     await this.$store.dispatch("addOrUpdateShopCart", {
    //       skuId: cart.skuId,
    //       skuNum: disNum,
    //     });
    //     this.getData();
    //     //  再一次获取服务器最新的数据进行展示
    //   } catch (error) {}
    // },

    // 修改某一个产品的个数（加入lodash节流）
    handler: throttle(async function (type, disNum, cart) {
      // type是为了区分这三个元素
      // 目前的disNum形参：+变化量（1）   -变化量(-1)   input最终的个数（并不是变化量）
      // cart:判断是哪一个产品，chat身上有skuId
      // console.log('派发action，通知服务器修改产品个数',type,disNum,cart);

      switch (type) {
        // 加号
        case "add":
          // 带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          // 判断产品的个数大于1，才可以传递给服务器-1
          // if (cart.skuNum > 1) {
          //   disNum = -1;
          // } else {
          //   // 产品的个数小于等于1,传递给服务器的disNum=0
          //   disNum = 0;
          // }
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 如果用户输入进来的量是非法的，disNum=0（也就是不变）
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
      }

      // 派发action
      try {
        // 代表的是修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
        //  再一次获取服务器最新的数据进行展示
      } catch (error) {}
    }, 200),

    // 删除某一个产品的操作
    async deleteCartById(cart) {
      try {
        // 如果删除成功再次发请求获取新的数据进行展示
        await this.$store.dispatch("reqDeleteCartListBySkuId", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改某个产品的勾选状态
    async updateChecked(cart, event) {
      // 带给服务器的参数isChecked不是布尔值，应该是0或者1
      // console.log(event.target.checked);
      // 而$event监听到的checked状态是以Boolean值来表示的，所以这里需要将Boolean值转化为0和1
      try {
        // 如果成功，再次获取服务器数据进行展示
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });

        this.getData();
      } catch (error) {
        // 如果失败，提示
        alert(error.message);
      }
    },

    // 删除全部选中的产品
    // 这个回调函数没办法收集到有用的数据
    async deleteAllCheckedCart() {
      try {
        // 派发一个action
        await this.$store.dispatch("deleteAllCheckedCart");

        // 再发一次请求获取购物车列表数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 修改全选的状态
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        // console.log(checked);

        // 派发action
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        // alert(123)

        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>