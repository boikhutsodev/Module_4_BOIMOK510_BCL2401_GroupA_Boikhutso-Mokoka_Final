import { createStore } from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default createStore({
  state() {
    return {
      products: [],
      categories: [],
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      comparison: [],
      user: null,
      jwt: localStorage.getItem("jwt") || "",
    };
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCart(state, cart) {
      state.cart = cart;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    setComparison(state, comparison) {
      state.comparison = comparison;
    },
    setUser(state, user) {
      state.user = user;
    },
    setJWT(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem("jwt", jwt);
    },
    clearJWT(state) {
      state.jwt = "";
      localStorage.removeItem("jwt");
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        commit("setProducts", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        commit("setCategories", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async login({ commit }, credentials) {
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
        commit("setJWT", token);
        commit("setUser", user);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
});
