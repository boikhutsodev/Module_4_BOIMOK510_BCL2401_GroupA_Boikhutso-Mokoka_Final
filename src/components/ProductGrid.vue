<!-- src/components/ProductGrid.vue -->

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="product in products"
      :key="product.id"
      class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <router-link
        :to="`/product/${product.id}`"
        class="flex justify-center items-center"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="w-400px h-48 object-cover mb-5 rounded"
        />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
        <p class="text-gray-500">{{ product.category }}</p>
        <p class="text-gray-700 mb-4">
          Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
        </p>
        <div class="mt-auto flex justify-evenly items-center">
          <button @click="toggleFavorite(product.id)" class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="w-6 h-6"
              :class="{
                'text-red-500': isFavorite(product.id),
                'text-gray-300': !isFavorite(product.id),
              }"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
          <button
            class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200"
          >
            Add To Cart +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

/**
 * The product grid component.
 *
 * @component
 * @param {Array<Object>} products - The list of products to display.
 */

export default {
  props: {
    products: Array,
  },
  setup() {
    const favorites = ref([]);

    onMounted(() => {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites);
      }
    });

    /**
     * Toggles the favorite status of a product.
     *
     * @param {number} productId - The ID of the product to toggle.
     */

    function toggleFavorite(productId) {
      if (favorites.value.includes(productId)) {
        favorites.value = favorites.value.filter((id) => id !== productId);
      } else {
        favorites.value.push(productId);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites.value));
    }

    /**
     * Checks if a product is marked as a favorite.
     *
     * @param {number} productId - The ID of the product to check.
     * @returns {boolean} True if the product is a favorite, otherwise false.
     */

    function isFavorite(productId) {
      return favorites.value.includes(productId);
    }

    return {
      toggleFavorite,
      isFavorite,
    };
  },
};
</script>
