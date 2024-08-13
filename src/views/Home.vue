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
          />
        </router-link>
        <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        <p class="text-gray-500">{{ product.price }}</p>
        <p class="text-gray-400 text-sm">{{ product.category }}</p>
        <!-- Ratings -->
        <div class="flex items-center mb-2">
          <span class="text-yellow-500">{{ product.rating.rate }}</span>
          <span class="ml-1 text-gray-500"
            >({{ product.rating.count }} reviews)</span
          >
        </div>

        <!-- Cart, Favorite, and Compare Buttons -->
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
          <button
            @click="addToCompare(product)"
            :class="isInComparison(product.id) ? 'bg-blue-500' : 'bg-gray-500'"
            class="text-white px-4 py-2 rounded"
          >
            {{
              isInComparison(product.id)
                ? "Remove from Compare"
                : "Add to Compare"
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../store/products";
import { useCartStore } from "../store/cart";
import { useFavoriteStore } from "../store/favorites";
import { useComparisonStore } from "../store/comparison"; // Import the comparison store

export default {
  setup() {
    const store = useProductStore();
    const products = computed(() => store.products);
    const loading = computed(() => store.loading);
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();
    const comparisonStore = useComparisonStore(); // Initialize the comparison store

    onMounted(() => {
      store.fetchProducts();
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

    const addToCompare = (product) => {
      if (isInComparison(product.id)) {
        comparisonStore.removeProductFromCompare(product.id);
      } else {
        comparisonStore.addProductToCompare(product);
      }
    };

    const isInComparison = (productId) => {
      return comparisonStore.isProductInComparison(productId);
    };

    return {
      products,
      loading,
      addToCart,
      toggleFavorite,
      isFavorite,
      addToCompare,
      isInComparison,
    };
  },
};
</script>
