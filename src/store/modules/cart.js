import shop from '@/api/shop.js'

export default {
    state:{
        items: [],
        checkoutStatus: null
    },

    getters:{
        cartProducts(state, getters, rootState){
            return state.items.map( cartItem => {
                const product = rootState.products.items.find( item => item.id === cartItem.id)
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
        },
    },

    actions:{
        addProductToCart(context, product){
            if(context.getters.productIsInStock(product)){
                const cartItem = context.state.items.find( item => item.id === product.id)
                if(!cartItem){
                    context.commit("pushProductToCart", product.id)
                }
                else {
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)      
            }
        },
      
        checkout(context) {
            shop.buyProducts(
                context.state.items,
                () => { 
                    context.commit('emptyCart')
                    context.commit('setCheckoutStatus', 'success')
                },
                () => {
                    context.commit('setCheckoutStatus', 'failed')
                }
            )
        }
    },

    mutations: {
        pushProductToCart(state, productId){
            state.items.push({
                id: productId,
                quantity:1
            })
        },
    
        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },
    
    
        emptyCart(state) {
            state.items = []
        },
    
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    }
}