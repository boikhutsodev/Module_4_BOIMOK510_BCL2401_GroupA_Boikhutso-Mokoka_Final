import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import FavoritesPage from "../views/Favorites.vue";
import CartPage from "../views/Cart.vue";
import LoginPage from "../views/Login.vue";
import Comparison from "../views/Comparison.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  {
    path: "/comparison",
    name: "Comparison",
    component: Comparison,
    meta: { requiresAuth: true },
  },
  { path: "/product/:id", component: ProductDetail },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = !!localStorage.getItem("token"); // or any other auth check
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
