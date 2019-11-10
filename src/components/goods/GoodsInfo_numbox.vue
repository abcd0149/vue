<template>
  <div>
    <!-- 
      问题: 我们不知道什么时候能拿到 max 值,但是,总归有一刻,会得到一个真正的 max 值
      我们可以 使用 watch 属性监听,来 监听 父组件传递过来的 max 值,不管watch会被触发几次
      但是最后一次,肯定是一个  合法的 max 数值

    -->
    <van-stepper v-model="value" @change="countChanged" ref="numbox" max="60" />
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
      //  每当 文本框的 数据被修改的时候, 立即把 最新的数据,通过事件调用,传递给父组件
      this.$emit("getcount", parseInt(this.$refs.numbox.value + 1));
    }
  },
  props: ["max"]
  // watch: {
  //   'max' : function(newVal,oldVal){
  //     this.newVal = max
  //   }
  // },
};
</script>

<style lang="scss" scoped>
</style>