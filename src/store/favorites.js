// stores/favorites.js
import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    favorites: [],
  }),
  actions: {
    toggleFavorite(product) {
      const index = this.favorites.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(product);
      }
    },
    isFavorite(productId) {
      return this.favorites.some((item) => item.id === productId);
    },
  },
});
