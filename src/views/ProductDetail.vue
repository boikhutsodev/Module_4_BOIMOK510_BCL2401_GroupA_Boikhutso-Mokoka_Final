<template>
  <div class="container mx-auto px-10 py-20">
    <button
      @click="goBack"
      class="fixed bg-gray-300 text-gray-800 px-4 py-2 rounded mb-4"
    >
      &larr; Back
    </button>
    <h1 class="text-3xl font-bold mb-4 pt-12">Product Details</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="product-details border rounded-lg p-4">
      <img :src="product.image" alt="" class="w-64 h-64 object-cover mb-4" />
      <h2 class="text-2xl font-semibold mb-2">{{ product.title }}</h2>
      <p class="text-gray-600 text-xl mb-2">{{ product.price }}</p>
      <p class="text-gray-500 text-sm mb-4">{{ product.category }}</p>
      <div class="flex items-center mb-4">
        <span class="text-yellow-500">{{ product.rating.rate }}</span>
        <span class="ml-1 text-gray-500"
          >({{ product.rating.count }} reviews)</span
        >
      </div>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <div class="flex space-x-2">
        <button
          @click="addToCart(product)"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
        <button
          @click="toggleFavorite(product)"
          :class="isFavorite(product.id) ? 'bg-red-500' : 'bg-gray-500'"
          class="text-white px-4 py-2 rounded"
        >
          {{
            isFavorite(product.id)
              ? "Remove from Favorites"
              : "Add to Favorites"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Import useRouter
import { useProductStore } from "../store/products"; // Adjust the path to your store
import { useCartStore } from "../store/cart";
import { useFavoriteStore } from "../store/favorites";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter(); // Initialize useRouter
    const store = useProductStore();
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();

    const productId = ref(route.params.id); // Get product ID from route params
    const product = computed(() =>
      store.products.find((p) => p.id === parseInt(productId.value))
    );
    const loading = computed(() => store.loading);

    onMounted(() => {
      store.fetchProducts(); // Ensure products are fetched on mount
    });

    const addToCart = (product) => {
      cartStore.addProduct(product);
    };

    const toggleFavorite = (product) => {
      favoriteStore.toggleFavorite(product);
    };

    const isFavorite = (productId) => {
      return favoriteStore.isFavorite(productId);
    };

    const goBack = () => {
      router.back(); // Navigate back to the previous page
    };

    return {
      product,
      loading,
      addToCart,
      toggleFavorite,
      isFavorite,
      goBack,
    };
  },
};
</script>
