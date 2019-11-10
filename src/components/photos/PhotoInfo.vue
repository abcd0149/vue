<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoinfo.click }}次</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->

    <!-- 图片内容区域 -->

    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <cmt-box :id="id">

    </cmt-box>
  </div>
</template>

<script>
// 引入评论区
import comment from '../comment.vue'

import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到的 图片Id
      photoinfo: {} //图片详情
    };
  },
  created() {
    this.getPhotoInfo();
  },
  methods: {
    getPhotoInfo() {
      axios
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(res => {
          if (res.data.status === 0) {
            this.photoinfo = res.data.message[0]
          }
        });
    }
  },
  components: {   //注册评论子组件
    'cmt-box': comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container{
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
