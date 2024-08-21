<template>
  <div class="container mx-auto py-4">
    <h1
      class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4 mt-20"
    >
      Products
    </h1>

    <div class="flex justify-between items-center flex-wrap mb-4">
      <select
        v-model="selectedCategory"
        class="border p-2 rounded mb-2 sm:mb-0"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <div class="flex items-center mb-2 sm:mb-0">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="border p-2 rounded-l"
        />
        <button
          @click="searchProducts"
          class="bg-white text-black border border-l-0 p-2 rounded-r"
        >
          Search
        </button>
      </div>

      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="default">Default</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="card w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <router-link :to="`/product/${product.id}`">
          <img
            class="w-64 h-64 p-8 rounded-t-lg"
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
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
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
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">
              ${{ product.price }}
            </span>
          </div>

          <!-- Cart, Favorite, and Compare Buttons -->
          <div class="flex space-x-2 mt-4 mb-4">
            <button
              @click="addToCart(product)"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
            <button
              @click="toggleFavorite(product)"
              :class="isFavorite(product.id) ? 'bg-red-500' : 'bg-gray-500'"
              class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {{ isFavorite(product.id) ? "- Favorites" : "+ Favorites" }}
            </button>
            <button
              @click="addToCompare(product)"
              :class="
                isInComparison(product.id) ? 'bg-blue-500' : 'bg-gray-500'
              "
              class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
    const categories = ref([]);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortOrder = ref("");
    const products = computed(() => store.products);
    const loading = computed(() => store.loading);
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();
    const comparisonStore = useComparisonStore(); // Initialize the comparison store

    /**
     * Fetches product categories from the API.
     */
    const fetchCategories = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      categories.value = data;
    };

    /**
     * Computes the filtered and sorted products based on category, sort order, and search query.
     *
     * @returns {Array<Object>} The filtered and sorted products.
     */
    const filteredProducts = computed(() => {
      let prods = products.value;
      if (selectedCategory.value) {
        prods = prods.filter(
          (product) => product.category === selectedCategory.value
        );
      }
      if (sortOrder.value === "asc") {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === "desc") {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === "default") {
        prods = prods.sort((a, b) => a.id - b.id);
      }
      if (searchQuery.value) {
        prods = prods.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    onMounted(() => {
      store.fetchProducts();
      fetchCategories();
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
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      filteredProducts,
    };
  },
};
</script>
