<template>
  <div class="goodsdesc-container">
    <h3>
      {{ info.title }}
    </h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {} // 图文接收
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      axios
        .get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.id)
        .then(res => {
          console.log(res);
          if (res.data.status === 0) {
            this.info = res.data.message[0];
          }
        });
    }
  }
};
</script>

<style lang="scss">
.goodsdesc-container {
  h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
}
.content {
  img {
    width: 100%;
  }
}
</style>