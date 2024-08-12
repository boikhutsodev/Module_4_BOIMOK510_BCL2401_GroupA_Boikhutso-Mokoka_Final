import { defineStore } from "pinia";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    comparison: [],
    user: null,
    jwt: localStorage.getItem("jwt") || "",
    loading: true,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          credentials,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const { token } = response.data;
        const user = jwtDecode(token);
        this.jwt = token;
        localStorage.setItem("jwt", token);
        this.user = user;
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    clearJWT() {
      this.jwt = "";
      localStorage.removeItem("jwt");
    },
  },
});
