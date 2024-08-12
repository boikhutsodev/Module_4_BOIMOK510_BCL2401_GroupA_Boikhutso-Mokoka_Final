<template>
  <div>
    <h1>Products</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" alt="" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.price }}</p>
        <p>{{ product.category }}</p>
        <router-link :to="`/product/${product.id}`">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  async created() {
    await this.fetchProducts();
    this.loading = false;
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
}
</style>
