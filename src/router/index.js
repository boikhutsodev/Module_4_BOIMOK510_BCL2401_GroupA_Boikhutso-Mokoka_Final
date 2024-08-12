import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/comparison", component: Comparison },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
