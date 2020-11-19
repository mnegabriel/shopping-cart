<template>
  <div class="cart">
      <h1>Shopping cart</h1>
      <ul>
          <li v-for="product in products" :key='product.id'>
              {{product.title}}  x{{product.quantity}} = R${{product.price * product.quantity}}
          </li>
      </ul>
      <h3>Total: R${{total}}</h3>
      <button @click="checkout">Checkout</button>
      <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
    name: "Cart",
    computed: {
        ...mapGetters({
            products: 'cartProducts',
            total: "cartTotal"
        }),
        // products(){
        //     return this.$store.getters.cartProducts
        // },
        // cartTotal(){
        //     return this.$store.getters.cartTotal
        // }
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        })
    },
    methods:{
        ...mapActions(['checkout'])
    }
}
</script>

<style>

</style>