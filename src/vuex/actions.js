/**
 * 包含n个用于间接更新状态数据的方法的对象
 * 可以包含异步/逻辑操作代码
 */
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqAutoLogin,
  reqGoods,
  reqInfo,
  reqRatings,
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,

} from './mutation-types'
export default {
  /**
   * 请求获取当前地址信息的异步action
   */
  async getAddress({ commit, state }, callback) {
    // 1. 发异步ajax请求
    const { longitude, latitude } = state
    const result = await reqAddress(longitude, latitude)
    // 2. 请求成功后, 提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
      typeof callback === 'function' && callback()
    }
  },


  /**
   * 请求获取商品分类列表的异步action
   */
  async getCategorys({ commit, state }, callback) {
    // 1. 发异步ajax请求
    const result = await reqFoodCategorys()
    // 2. 请求成功后, 提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
      typeof callback === 'function' && callback()
    }
  },


  /**
   * 请求获取商家列表的异步action
   */
  async getShops({ commit, state }, callback) {
    // 1. 发异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShops({ longitude, latitude })
    // 2. 请求成功后, 提交mutation
    if (result && result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
      // 在commit()更新状态数据之后调用回调函数
      typeof callback === 'function' && callback()
    }
  },

  /**
   * 保存用户的同步action
   */
  saveUser({ commit }, user) {
    // 将token保存local中
    const token = user.token
    localStorage.setItem('token_key', user.token)
    delete user.token
    commit(RECEIVE_USER, { user })
    commit(RECEIVE_TOKEN, { token })
  },

  /**
   * 退出登录
   */
  logout({ commit }) {
    // 清除local中的token
    localStorage.removeItem('token_key');
    // 清除state中user和token信息
    commit(LOGOUT)
  },

  /**
   * 自动登录的异步action
   */
  async autoLogin({ commit }) {
    const result = await reqAutoLogin()
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER, { user })
    }
  },

  /**
   * 异步获取商家信息
   */
  async getShopInfo({ commit }, callback) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
      typeof callback === 'function' && callback()
    }
  },

  /**
   * 异步获取商家评价列表
   */
  async getShopRatings({ commit }, callback) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      typeof callback === 'function' && callback()
    }
  },

  /**
   * 异步获取商家商品列表
   */
  async getShopGoods({commit}, callback) {
    const result = await reqGoods()
    if(result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      typeof callback === 'function' && callback()
    }
  }

}