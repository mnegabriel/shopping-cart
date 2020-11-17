<template>
  <div class="cart">
      <h1>Shopping cart</h1>
      <ul>
          <li v-for="product in products" :key='product.id'>
              {{product.title}}  x{{product.quantity}} = R${{product.price * product.quantity}}
          </li>
      </ul>
      <h3>Total: R${{cartTotal}}</h3>
  </div>
</template>

<script>
export default {
    name: "Cart",
    computed: {
        products(){
            return this.$store.getters.cartProducts
        },
        cartTotal(){
            return this.$store.getters.cartTotal
        }
    }
}
</script>

<style>

</style>