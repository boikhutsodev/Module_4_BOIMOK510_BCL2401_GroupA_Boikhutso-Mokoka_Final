import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.saveCart();
    },
    removeProduct(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      this.saveCart();
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
});
