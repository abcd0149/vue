import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 每次刚进入 网站,肯定会 调用 main和store.js 在刚调用的时候, 先从本地存储中,把购物车的数据读出来
// 放到 store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

export default new Vuex.Store({
  state: {
    // this.$store.state.***
    //  可以把 state 想象成 组建中的 data 专门用来储存数据
    car: car // 将购物车中的商品数据,用一个数组储存起来, 在 car 数组中,储存一些商品的对象
    // 咱们可以暂时将这个商品对象,设计成这个样子 对象 id: 商品的id, count: 要购买的数量, price: 商品的单价
    // selected: false  商品是否被选中
  },
  mutations: {
    //   this.$store.commit('方法名称','按需传递唯一的参数')
    addToCar (state, goodsinfo) {
      // 点击加入购物车,把商品信息,保存到 store 中的 car 上
      // 分析:
      // 1. 如果购物车,之前就已经有这个对应的商品了,那么,只需更新数量
      // 2. 如果没有,则直接把 商品数据, push 到 car 中即可

      // 假设 在购物车中,没有找到对应的商品
      var flag = false
      state.car.some(item => {
        // eslint-disable-next-line eqeqeq
        if (item.id == goodsinfo.id) {
          item.cunt += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      // 如果最终,循环完毕,得到的 flag 还是 false, 则把商品数量直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当 更新 car 之后,把 car 数组, 存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo (state, goodsinfo) {
      // 修改购物车的数量值
      // 分析
      state.car.some(item => {
        // eslint-disable-next-line eqeqeq
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //  当修改完商品的数量, 把最新的购物车数据,保存到 本地的 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar (state, id) {
      //  根据id,从 store 中的 购物车中删除对应的那条 商品数据
      state.car.some((item, i) => {
        // eslint-disable-next-line eqeqeq
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      //  将删除完商品的数量, 最新的购物车数据,保存到 本地的 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    undateGoodsSelected (state, info) {
      state.car.some(item => {
        // eslint-disable-next-line eqeqeq
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的购物车状态,保存到 本地的 localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    //   this.$store.getters.***
    //   相当于 计算属性 ,也相当于 filters
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount (state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  },
  actions: {

  }
})
