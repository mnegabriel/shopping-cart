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
import shop from '@/api/shop.js'
export default {
  name: 'ProductList',
  data() {
    return {
      products: []
      }
  },
  created() {
    shop.getProducts( products => this.products = products)
  }

}
</script>

<style>

</style>