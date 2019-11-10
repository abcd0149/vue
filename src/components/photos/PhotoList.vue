<template>
  <div>
    <van-tabs>
      <van-tab
        v-for="item in cates"
        :key="item.id"
        :title="item.title"
        @click="getPhotoList(item.id)"
      ></van-tab>
    </van-tabs>
    <ul class="photo-list">
      <router-link
        v-for="item in imageList"
        tag="li"
        :key="item.id"
        :to="'/home/photoinfo/' + item.id"
      >
        <img v-lazy="item.img_url" loading />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cates: [],
      imageList: []
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoList(0);
  },
  methods: {
    getAllCategory() {
      axios
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(res => {
          if (res.data.status === 0) {
            res.data.message.unshift({ title: "全部", id: 0 });
            this.cates = res.data.message;
          }
        });
    },
    getPhotoList(cateId) {
      axios
        .get("http://www.liulongbin.top:3005/api/getimages/" + cateId)
        .then(res1 => {
          if (res1.data.status === 0) {
            this.imageList = res1.data.message;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  vertical-align: middle;
}
.photo-list {
  padding: 10px;
  li {
    box-shadow: 0 0 9px #999;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    .info {
      position: absolute;
      bottom: 0px;
      background-color: rgb(0, 0, 0, 0.4);
      color: #fff;
      text-align: left;
      max-height: 84px;
      .info-title {
        font-size: 14px;
        padding: 0;
        margin: 0;
      }
      .info-body {
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
}
</style>
