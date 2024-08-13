import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [], // Array to store the list of products
    loading: false, // Loading state to indicate when products are being fetched
  }),
  actions: {
    async fetchProducts() {
      this.loading = true; // Set loading state to true before the API call
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data; // Store the fetched products in the state
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors encountered
      } finally {
        this.loading = false; // Set loading state to false after the API call is done
      }
    },
  },
});
