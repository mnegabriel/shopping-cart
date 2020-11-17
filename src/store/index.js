import Vue from 'vue'
import Vuex from 'vuex'

import shop from '@/api/shop.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //data
    products: [],
    cart: []
  },

  getters: { //computed properties
    availableProducts(state){
      return state.products.filter( product => product.inventory > 0)
    },
    cartProducts(state){
      return state.cart.map( cartItem => {
        const product = state.products.find( item => item.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        }
      })
    },
    cartTotal(state,getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity, 0
      )
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

    addProductToCart(context, product){
      if(product.inventory > 0){
        const cartItem = context.state.cart.find( item => item.id === product.id)
        if(!cartItem){
          context.commit("pushProductToCart", product.id)
        }
        else {
          context.commit('incrementItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)

      }
    }
  },

  mutations: { //update state 
    setProducts(state, products) {
      state.products = products
    },
    pushProductToCart(state, productId){
      state.cart.push({
        id: productId,
        quantity:1
      })
    },
    incrementItemQuantity(state, cartItem){
      cartItem.quantity++
    },
    decrementProductInventory(state, product){
      product.inventory--
    }
  },
  modules: { 
    
  }
})
