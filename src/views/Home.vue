<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Products</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card border rounded-lg p-4"
      >
        <router-link
          :to="`/product/${product.id}`"
          class="text-blue-500 hover:underline"
        >
          <img
            :src="product.image"
            alt=""
            class="w-400px h-48 object-cover mb-2"
        /></router-link>
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-500">{{ product.price }}</p>
        <p class="text-gray-400 text-sm">{{ product.category }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useProductStore } from "../store/products"; // Adjust the path to where your store is located

export default {
  setup() {
    const store = useProductStore();
    const products = computed(() => store.products);
    const loading = computed(() => store.loading);

    onMounted(() => {
      store.fetchProducts();
    });

    return {
      products,
      loading,
    };
  },
};
</script>
