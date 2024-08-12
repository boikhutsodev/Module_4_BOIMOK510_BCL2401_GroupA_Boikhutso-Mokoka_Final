<template>
  <div class="container mx-auto py-4">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
      <img :src="product.image" alt="" class="w-full h-96 object-cover mb-4" />
      <p class="text-gray-700 mb-2">{{ product.description }}</p>
      <p class="text-xl font-semibold">{{ product.price }}</p>
      <p class="text-gray-400 mb-2">{{ product.category }}</p>
      <p class="text-gray-500">
        {{ product.rating.rate }} ({{ product.rating.count }} reviews)
      </p>
      <router-link to="/" class="text-blue-500 hover:underline"
        >Back to Products</router-link
      >
    </div>
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
