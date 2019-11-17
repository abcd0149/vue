<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="card-content">
          <div class="card-caontent-inner">
            <van-switch v-model="checked" @input="onInput" />
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title}}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!--  
                  问题: 如何从购物车中获取商品的数量
                  1. 我们可以先创建一个 空对象,然后循环购物车中所有商品的数据, 把 当前循环这条商品的 id ,作为 对象的
                  属性名, count值作为 对象的 属性值, 这样,当把所有的商品循环一遍,就会得到一个对象: { 88:2, 89:1, 90:4 }
                 -->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <van-panel>
        <div class="jisuan">
        <div class="left">
          <p>总计(不含运费)</p>
          <p>已勾选商品 <span class="red">0</span> 件, 总价<span class="red">￥0</span></p>
        </div>
        <van-button type="default" color="#FF473D">去结算</van-button>

        </div>
      </van-panel>
    </div>
  </div>
</template>
<script>
import numbox from "../components/ShopCar_numbox.vue";
import axios from "axios";
export default {
  data() {
    return {
      checked: true,
      goodslist: [] // 购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1. 获取到 store 中所有的商品的ID, 然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果 购物车中没有商品, 则直接返回,不需要请求数据接口,否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表
      axios
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(res => {
          if (res.data.status === 0) {
            this.goodslist = res.data.message;
          }
        });
    },
    remove(id, index){
      // 点击删除,把商品从 store 中根据 传递的id 删除,同时把当前组件中的 goodslist 中,对应要删除的那个商品, 使用
      //  index 来删除
      this.goodslist.splice(index,1);
      this.$store.commit('removeFormCar',id);
    },
     onInput(checked){

      //  vant 开关的 状态 设置

     }
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.goods-list {
  .card-caontent-inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
  }
  h1 {
    font-size: 13px;
  }
  .info {
    .price {
      color: red;
      font-weight: bold;
    }
  }
}
.jisuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .red{
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>