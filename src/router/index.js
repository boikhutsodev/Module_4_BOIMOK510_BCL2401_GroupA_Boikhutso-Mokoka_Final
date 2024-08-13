import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import FavoritesPage from "../views/Favorites.vue";
import CartPage from "../views/Cart.vue";
import LoginPage from "../views/Login.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/product/:id", component: ProductDetail },
  { path: "/favorites", name: "Favorites", component: FavoritesPage },
  { path: "/cart", name: "Cart", component: CartPage },
  { path: "/login", name: "Login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
