<!-- src/App.vue -->

<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

/**
 * The root component of the application.
 *
 * @component
 */

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
@import "./style.css";
</style>
