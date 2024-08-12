<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h1>{{ product.title }}</h1>
    <img :src="product.image" alt="" />
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
    <p>{{ product.category }}</p>
    <p>{{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
    <router-link to="/">Back to Products</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      loading: true,
    };
  },
  async created() {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${this.$route.params.id}`
    );
    this.product = response.data;
    this.loading = false;
  },
};
</script>
