// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";

/**
 * The routes for the application.
 *
 * @type {Array<Object>}
 */

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
];

/**
 * Creates and configures the router.
 *
 * @returns {Router} The router instance.
 */

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
