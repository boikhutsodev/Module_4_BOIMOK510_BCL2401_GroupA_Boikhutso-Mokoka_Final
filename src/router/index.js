import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import ProductDetail from "@/views/ProductDetail.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: ProductDetail },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
