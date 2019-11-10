<template>
  <div>
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播图区域 -->
    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>

    <!-- 商品购买 -->
    <van-panel :title="goodsinfo.title">
      <div class="content-inner">
        <p class="price">
          市场价:
          <del>{{ goodsinfo.market_price }}</del> &nbsp;&nbsp;销售价格:
          <span class="now_price">{{ goodsinfo.sell_price }}</span>
        </p>
        <p class="numbox">
          购买数量:
          <!--  分析: 如何实现加入购物车时候,拿到 选择的数量 
                1. 经过分析发现:　　按钮属于goodsinfo 页面 数字 属于numberbox 组件
                2. 由于涉及到了父子组件的嵌套了,所以,无法直接在goodsinfo 页面中 获取到
                选中的商品数量值
                3. 怎么解决这个问题: 涉及到了 子组件向父组件传值了(事件调用机制)
                4. 事件调用的本质:　父向子传递方法，子调用这个方法，同时把　数据当作参数
                传递给这个方法
          -->
          <numbox class="numbox" @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
        </p>
        <p>
          <van-button color="#1E90FF">立即购买</van-button>
          <van-button color="#ff142c" @click="addToShopCar">加入购物车</van-button>
        </p>
      </div>
    </van-panel>

    <!-- 商品参数 -->
    <van-panel title="商品参数" desc>
      <p>商品货号:{{ goodsinfo.goods_no }}</p>
      <p>库存情况:{{ goodsinfo.stock_quantity }} 件</p>
      <p>上架时间: {{ goodsinfo.add_time }}</p>
      <!-- 
        后面加  | dateFormat 是设置的时间过滤器
        需要单独设置过滤器
      -->
    </van-panel>

    <div class="card-footer">
      <van-button plain type="primary" size="large" @click="goDesc(id)">图文介绍</van-button>
      <van-button plain type="primary" size="large" color="#ff142c" @click="goComment(id)">商品评论</van-button>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../swiper.vue";
// 导入数字选择框
import numbox from "../goods/GoodsInfo_numbox";
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data 上,方便后期调用
      lunbotu: [], // 轮播图的数据
      goodsinfo: {}, //获取到的商品信息
      ballFlag: false, // 隐藏小球动画的标识符
      selectedCount: 1,  // 保存用户选中的商品数量, 默认认为用户买了一个
    }
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      axios
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(res => {
          if (res.data.status === 0) {
            //  先循环轮播图数组的每一项,为 item 添加 img 属性 ,因为轮播图组建中,只认识 item.img ,不认识item.src
            res.data.message.forEach(item => {
              item.img_url = item.src;
            });
            this.lunbotu = res.data.message;
          }
        });
    },
    getGoodsInfo() {
      axios
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.goodsinfo = res.data.message[0];
          }
        });
    },
    goDesc(id) {
      // 点击使用编程式导航, 点击跳转到图文介绍
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路:
      // 1. 先分析导致 动画 不准确的 本质原因: 我们把 小球 最终位移的 位置,
      //  已经局限在了,某一分辨率下的 滚动条未滚动的情况
      // 2. 只要分辨率和 测试的时候不一样,或者 滚动条有一定滚动距离之后, 问题就出现了
      // 3. 因此,我们经过分析,得到结论: 不能把 位置的 横纵坐标 直接写死,应该根据不懂情况
      // 动态计算这个坐标值;
      // 4. 经过分析,得出解题思路: 先得到 徽标 的横纵坐标,再得到 小球的 横纵坐标 ,然后让
      //  y 值 求差, x 值也求差 得到的结果,就是横纵坐标要位移的距离
      // 5. domObject.getBoundingClientRect().top  获取的相对位置
      // 组件中操作 子组件 想要拿父组件的值  需要 传值
      // DOM中 只要 属于这个界面 都可以操作DOM拿到值

      //  获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist+48}px,${yDist}px)`;

      el.style.transition = "all 0.5s cubic-bezier(.45,.36,.84,.47)";

      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count){
      // 当子组件把 选中的数量传递给父组件的时候,把选中的值保存到 data 上

      this.selectedCount = count;
 
    


    }
  },
  components: {
    swiper,
    numbox: numbox
  }
};
</script>

<style lang="scss" scoped>
.now_price {
  color: red;
  font: 16px;
  font-weight: bold;
}
.numbox {
  display: inline-block;
}
.card-footer {
  margin: 0 0 60px 0;
  button {
    margin: 15px 0;
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  left: 112px;
  top: 362px;
  z-index: 99;
}
</style>