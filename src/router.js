import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Member from './views/Member.vue'
import Search from './views/Search.vue'
import Shopcar from './views/Shopcar.vue'
import NewList from './components/NewList.vue'
import NewsInfo from './components/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home', component: Home
    }, {
      path: '/member', component: Member
    }, {
      path: '/shopcar', component: Shopcar
    }, {
      path: '/search', component: Search
    }, {
      path: '/home/newslist', component: NewList
    }, {
      path: '/home/newsinfo/:id', component: NewsInfo
    }, {
      path: '/home/photolist', component: PhotoList
    }, {
      path: '/home/photoinfo/:id', component: PhotoInfo
    }, {
      path: '/home/goodslist', component: GoodsList
    }, {
      path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'
    }, {
      path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'
    }, {
      path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'
    }
  ]
})
