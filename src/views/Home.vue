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
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const loading = ref(true);

    const products = computed(() => store.state.products);

    const fetchProducts = async () => {
      await store.dispatch("fetchProducts");
      loading.value = false;
    };

    onMounted(() => {
      fetchProducts();
    });

    return {
      loading,
      products,
    };
  },
};
</script>
