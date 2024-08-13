// stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addProduct(product) {
      this.cart.push(product);
    },
    // Add more methods as needed
  },
});
