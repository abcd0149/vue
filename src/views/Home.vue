<template>
  <div class="home">
    <!-- 原始轮播图 -->
    <!-- <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img_url" />
      </van-swipe-item>
    </van-swipe>-->

    <!-- 组件化轮播图 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <van-grid :column-num="3" :gutter="10">
      <van-grid-item icon="phone-o" to="/home/newList" text="新闻中心" />
      <van-grid-item icon="shopping-cart-o" to="/home/photolist" text="图片分享" />
      <van-grid-item icon="gift-o" to="/home/goodslist" text="商品购买" />
      <van-grid-item icon="gold-coin-o" text="留言反馈" />
      <van-grid-item icon="apps-o" text="视频专区" />
      <van-grid-item icon="friends-o" text="联系我们" />
    </van-grid>
  </div>
</template>

<script>
import axios from "axios";

import swiper from "../components/swiper.vue";

export default {
  name: "home",
  data() {
    return {
      lunbotuList: []
    };
  },
  methods: {},
  created() {
    axios.get("http://www.liulongbin.top:3005/api/getnewslist").then(res => {
      this.lunbotuList = res.data.message;
    });
  },
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
</style>
