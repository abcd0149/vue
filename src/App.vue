<template>
  <div class="app-container" id="app">
    <!-- 顶部区域 -->
    <mt-header fixed title="我爱学习-Vue项目"></mt-header>
    <!-- 中间的路由区域 -->

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部区域 -->

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/member" icon="friends-o">会员</van-tabbar-item>
      <van-tabbar-item replace to="/shopcar" icon="shopping-cart-o" info="0"  id="badge">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.mint-header {
  z-index: 999;
}
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
