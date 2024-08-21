<template>
  <div class="max-w-sm mx-auto">
    <h1 class="text-3xl font-bold mt-20 mb-5">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium mb-1"
          >Username</label
        >
        <input
          v-model="username"
          id="username"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium mb-1"
          >Password</label
        >
        <input
          v-model="password"
          id="password"
          type="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div class="flex items-center mb-4">
        <input
          v-model="showPassword"
          type="checkbox"
          id="show-password"
          class="mr-2"
        />
        <label for="show-password" class="text-sm">Show Password</label>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth"; // Adjust the path to your store

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const error = ref("");

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push("/"); // Redirect to home or previous page
      } catch (err) {
        error.value = "Invalid username or password";
      }
    };

    return {
      username,
      password,
      showPassword,
      error,
      login,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
