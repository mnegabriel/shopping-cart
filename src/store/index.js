import Vue from 'vue'
import Vuex from 'vuex'

import shop from '@/api/shop.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //data
    products: []
  },

  getters: { //computed properties
    availableProducts(state){
      return state.products.filter( product => product.inventory > 0)
    }
  },

  actions: { // methods
    fetchProducts(context){

      return new Promise((resolve) => {

        shop.getProducts( products => {
          context.commit('setProducts', products)
        })

        resolve()

      })
    },

    // addToCart(context, product){
    //   if(product.inventory > 0){
    //     context.commit('pushProducttoCart', product)
    //   } else {
    //     //send out of stock messsage
    //   }
    // }
  },

  mutations: { //update state 
    setProducts(state, products) {
      state.products = products
    }
  },
  modules: { 
    
  }
})
