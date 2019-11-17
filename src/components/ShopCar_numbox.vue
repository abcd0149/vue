<template>
  <div style="height:25px">
    <!-- 
      问题: 我们不知道什么时候能拿到 max 值,但是,总归有一刻,会得到一个真正的 max 值
      我们可以 使用 watch 属性监听,来 监听 父组件传递过来的 max 值,不管watch会被触发几次
      但是最后一次,肯定是一个  合法的 max 数值

    -->
    <van-stepper class="numbox" v-model="initcount" @change="countChanged" ref="numbox" max="60" />
  </div>
  <!--  分析: 子组件 什么时候把数据 传递给父组件 

  -->
</template>

<script>
export default {
  data() {
    return {
      value: 1
    };
  },
  methods: {
    countChanged() {
      //  数量改变了
      //  每当数量值改变, 则立即把最新的数量同步到 购物车的 store 中,覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ["max","initcount","goodsid"]
  // watch: {
  //   'max' : function(newVal,oldVal){
  //     this.newVal = max
  //   }
  // },
};
</script>

<style lang="scss" scoped>

</style>