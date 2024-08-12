<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Products</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card border rounded-lg p-4"
      >
        <img
          :src="product.image"
          alt=""
          class="w-full h-48 object-cover mb-2"
        />
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-500">{{ product.price }}</p>
        <p class="text-gray-400 text-sm">{{ product.category }}</p>
        <router-link
          :to="`/product/${product.id}`"
          class="text-blue-500 hover:underline"
          >View Details</router-link
        >
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
