import shop from '@/api/shop.js'

export default {
    state:{
        items: [],
    },
    getters:{
        availableProducts(state){
            return state.items.filter( product => product.inventory > 0)
        },
        productIsInStock(){
            return product => product.inventory > 0
        }
    },

    actions:{
        fetchProducts(context){

            return new Promise((resolve) => {
      
              shop.getProducts( products => {
                context.commit('setProducts', products)
              })
      
              resolve()
      
            })
        },
    },

    mutations: {
        setProducts(state, products) {
            state.items = products
        },
          
        decrementProductInventory(state, product){
            product.inventory--
        },
    }
}