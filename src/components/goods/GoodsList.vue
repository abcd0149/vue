<template>
  <div class="goods-list">
    <!-- 最开始使用方法
      <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
      <img :src="item.img_url" alt />
      <div class="title">{{item.title}}</div>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>-->
    
    <!-- 改造版
      在网页中,有两种跳转方式
      方式1: 使用 a 标签的 形式 叫做标签跳转
      方式2: 使用window.location.href 的形式,叫做编程式跳转
    -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <div class="title">{{item.title}}</div>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <van-button class="loading-button" type="primary" size="large" color="red" @click="getMore">加载更多</van-button>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    // data  是往自己组件内部,挂载一些私有数据的
    return {
      pageindex: 1,
      goodslist: []
    };
  },
  methods: {
    getGoodsList() {
      axios
        .get(
          "http://www.liulongbin.top:3005/api/getgoods?pageindex=" +
            this.pageindex
        )
        .then(res => {
          if (res.data.status === 0) {
            this.goodslist = res.data.message;
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      // 使用js的形式进行路由导航
      // 注意: 一定要区分 this.$route 和 this.$route 这两个对象
      // 其中: this.$route 是路由参数对象,所以路由中的参数,params, query都属于它
      // 其中:　this.$router 是一个路由导航对象,用它可以方便的使用 JS 代码,实现路由的前进、后退、跳转
      // 到新的 URL 地址

      // 第一种  最简单的
      // this.$router.push('/home/goodsinfo/'+ id);

      // 第二种  传递对象
      // this.$router.push({path: "'/home/goodsinfo/'+ id"});

      // 第三种 传递命名的路由
      this.$router.push({ name: "goodsinfo", params: { id: id } });
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>


<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      padding: 8px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-size: 14px;
          font-weight: 900;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
  .loading-button {
    margin: 0px 0 40px 0;
  }
}
</style>