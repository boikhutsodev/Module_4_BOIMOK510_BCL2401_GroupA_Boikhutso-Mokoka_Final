import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwtDecode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    comparison: [],
    user: null,
    jwt: localStorage.getItem("jwt") || "",
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
      const response = await axios.get("https://fakestoreapi.com/products");
      commit("setProducts", response.data);
    },
    async fetchCategories({ commit }) {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      commit("setCategories", response.data);
    },
    async login({ commit }, credentials) {
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
    },
  },
});
