<template>
  <div class="container mx-auto py-4">
    <h1 class="text-3xl font-bold mb-4">Favorites</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="favorites.length === 0" class="text-center">
      You have no favorites yet.
    </div>
    <div v-else>
      <div
        v-for="item in favorites"
        :key="item.id"
        class="border rounded-lg p-4 mb-4 flex items-center space-x-4"
      >
        <img :src="item.image" alt="" class="w-24 h-24 object-cover" />
        <div class="flex-1">
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-gray-500">{{ item.price }}</p>
        </div>
        <button
          @click="removeFromFavorites(item)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Remove from Favorites
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useFavoriteStore } from "../store/favorites"; // Adjust the path to your store

export default {
  setup() {
    const favoriteStore = useFavoriteStore();
    const favorites = computed(() => favoriteStore.favorites);
    const loading = computed(() => favoriteStore.loading);

    const removeFromFavorites = (item) => {
      favoriteStore.removeFavorite(item.id); // Ensure you're passing the correct identifier
    };

    return {
      favorites,
      loading,
      removeFromFavorites,
    };
  },
};
</script>
