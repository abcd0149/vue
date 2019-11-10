<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <!-- 将来,谁使用此轮播图组件,谁为我们传递 lunbotuList -->
      <!-- 此时,lunbotuList 应该是 父组件向子组件传值来设置  -->
      <van-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img_url" :class="{'full': isfull}"/>
      </van-swipe-item>
    </van-swipe>
  </div>

  <!--  
    分析: 为什么 商品评论中的轮播图那么丑
    1. 首页中的图片, 它的宽和高,都是使用了100%
    2. 在商品详情页面中,轮播图的图片,如果也使用宽高100%的话,页面不好看
    3. 高度100%, 宽度自适应
    4. 既然两个轮播图,其他方面都没有冲突,只是宽度有分歧,那么,我们可以定义一个属性,让使用轮播图的调用者,手动指定是否为100%宽度
    5. 设置一个full的样式, 把isfull 传给 子组件 判断是true 还是 false 
  -->
</template>

<script>
export default {
  props: ["lunbotuList", "isfull"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.van-swipe {
  height: 200px;
  text-align: center;
  img {
    // width: 100%;
    height: 100%;
  }
}
.full {
    width: 100%;
}
</style>