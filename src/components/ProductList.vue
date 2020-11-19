<template>
  <div class="product-list">
      <h1>Product List</h1>
      <ul>
        <li v-for="product of products" :key='product.id'>
          {{product.title}} - R${{product.price}}
          <button 
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
          >
          add</button>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductList',
  data() {
    return {
      loading:false
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.items
    }),
    ...mapGetters({
      productIsInStock: 'productIsInStock'
    }),

    // products() {
    //   return this.$store.state.products
    // },

    // productIsInStock() {
    //   return this.$store.getters.productIsInStock
    // }
  },

  methods: {
    ...mapActions([
      'addProductToCart', 
      'fetchProducts'
    ])

    // addProductToCart(product){
    //   this.$store.dispatch('addProductToCart',product)
    // }
  },
  
  created() {
    this.loading = true
    this.fetchProducts()
      .then( () => this.loading = false)
  }

}
</script>

<style>

</style>