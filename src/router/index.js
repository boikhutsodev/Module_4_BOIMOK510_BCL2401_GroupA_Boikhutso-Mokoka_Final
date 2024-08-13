import { createRouter, createWebHistory } from "vue-router"; // Use named imports
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";
import Comparison from "../views/Comparison.vue"; // Ensure this view exists

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/comparison", component: Comparison },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for history mode
  routes,
});

export default router;
