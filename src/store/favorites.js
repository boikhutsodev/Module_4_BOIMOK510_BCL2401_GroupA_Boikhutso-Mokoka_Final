import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  }),
  actions: {
    toggleFavorite(product) {
      const index = this.favorites.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(product);
      }
      this.saveFavorites();
    },
    removeFavorite(productId) {
      const index = this.favorites.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        this.saveFavorites(); // Ensure the updated favorites are saved
      }
    },
    isFavorite(productId) {
      return this.favorites.some((item) => item.id === productId);
    },
    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
