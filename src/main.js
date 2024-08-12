//src/main.vue

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

/**
 * Initializes the Vue application and mounts it to the DOM.
 */

createApp(App).use(router).mount("#app");
