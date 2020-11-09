<template>
  <div class="product-list">
      <h1>Product List</h1>
      <ul>
        <li v-for="product of products" :key='product.name'>
          {{product.title}} - R${{product.price}}
          </li>
      </ul>
  </div>
</template>

<script>

export default {
  name: 'ProductList',
  data() {
    return {
      loading:false
    }
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts
    }
  },
  
  created() {
    this.loading = true
    this.$store.dispatch('fetchProducts')
      .then( () => this.loading = false)
  }

}
</script>

<style>

</style>