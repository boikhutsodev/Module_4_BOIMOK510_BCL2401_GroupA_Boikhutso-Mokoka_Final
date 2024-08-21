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
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <router-link :to="`/product/${product.id}`">
          <img
            class="p-8 rounded-t-lg"
            :src="product.image"
            :alt="product.title"
          />
        </router-link>
        <div class="px-5 pb-5">
          <router-link :to="`/product/${product.id}`">
            <h5
              class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.title }}
            </h5>
          </router-link>
          <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                :class="{
                  'text-yellow-300': i <= Math.round(product.rating.rate),
                  'text-gray-200 dark:text-gray-600':
                    i > Math.round(product.rating.rate),
                }"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
            </div>
            <span
              class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
            >
              {{ product.rating.rate }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              ${{ product.price }}
            </span>
          </div>

          <!-- Cart, Favorite, and Compare Buttons -->
          <div class="flex space-x-2 mt-4">
            <button
              @click="addToCart(product)"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
            <button
              @click="toggleFavorite(product)"
              :class="isFavorite(product.id) ? 'bg-red-500' : 'bg-gray-500'"
              class="text-white font-medium rounded-lg text-sm px-4 py-2.5"
            >
              {{ isFavorite(product.id) ? "- Favorites" : "+ Favorites" }}
            </button>
            <button
              @click="addToCompare(product)"
              :class="
                isInComparison(product.id) ? 'bg-blue-500' : 'bg-gray-500'
              "
              class="text-white font-medium rounded-lg text-sm px-4 py-2.5"
            >
              {{ isInComparison(product.id) ? "- Compare" : "+ Compare" }}
            </button>
          </div>
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
